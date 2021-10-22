package bleep

import bleep.model.Platform
import bloop.config.Config
import coursier.core.Configuration
import coursier.parse.JavaOrScalaDependency
import coursier.{Dependency, Module, ModuleName, Organization}

import java.net.URI
import java.nio.file.{Files, Path, Paths}
import java.util.stream.Collectors
import scala.jdk.CollectionConverters._

object importBloopFilesFromSbt {
  def apply(buildDir: Path): model.Build = {
    val bloopFilesDir = buildDir / Defaults.BloopFolder

    if (Files.exists(bloopFilesDir / ".digest")) {
      sys.error(s"It's not useful to import bloop files generated by bleep. delete $bloopFilesDir, run `sbt bloopInstall` and try again")
    }

    val projectNames: List[model.ProjectName] =
      Files
        .list(bloopFilesDir)
        .filter(Files.isRegularFile(_))
        .map(path => model.ProjectName(path.getFileName.toString.replace(".json", "")))
        .collect(Collectors.toList[model.ProjectName])
        .asScala
        .toList

    val bloopProjectFiles: Map[model.ProjectName, Config.File] =
      projectNames.map(name => name -> readBloopFile(bloopFilesDir, name)).toMap

    val resolvers: List[URI] =
      bloopProjectFiles
        .flatMap { case (projectName, bloopFile) =>
          bloopFile.project.resolution
            .getOrElse(sys.error(s"Expected bloop file for ${projectName.value} to have resolution"))
            .modules
            .map { mod =>
              val initialOrg = Paths.get(mod.organization.split("\\.").head)
              val uriFragments = mod.artifacts.head.path.iterator().asScala.dropWhile(_ != Paths.get("https")).drop(1).takeWhile(_ != initialOrg)
              URI.create(uriFragments.map(_.toString).mkString("https://", "/", ""))
            }
        }
        .toList
        .distinct
        .filterNot(_ == Defaults.MavenCentral)

    val scalas: Map[model.ScalaId, model.Scala] =
      bloopProjectFiles
        .flatMap { case (_, p) => p.project.scala.map(translateScala) }
        .groupBy(_.version.map(_.binVersion))
        .flatMap {
          case (None, _) => Map.empty
          case (Some(binVersion), scalaConfigs) =>
            val intersected = scalaConfigs.tail.foldLeft(scalaConfigs.head)(_.intersect(_))
            Map(model.ScalaId(binVersion) -> intersected)
        }

    val projectHasFiles = bloopProjectFiles.flatMap { case (projectName, bloopFile) =>
      def hasFiles(path: Path): Boolean = Files.exists(path) && Files.walk(path).findFirst().isPresent
      if ((bloopFile.project.sources ++ bloopFile.project.resources.getOrElse(Nil)) exists hasFiles) Some(projectName)
      else None
    }.toSet

    val projects = bloopProjectFiles.collect {
      case (projectName, bloopFile) if projectHasFiles(projectName) =>
        val bloopProject = bloopFile.project

        val folder: Option[RelPath] = {
          RelPath.relativeTo(buildDir, bloopProject.directory) match {
            case RelPath(List(projectName.value)) => None
            case relPath                          => Some(relPath)
          }
        }

        val dependsOn: Option[JsonList[model.ProjectName]] =
          Some(JsonList(bloopProject.dependencies.map(model.ProjectName.apply).filter(projectHasFiles)))

        val scalaVersion: Option[Versions.Scala] =
          bloopProject.scala.map(s => Versions.Scala(s.version))

        val isTest = projectName.value.endsWith("-test")
        val scope = if (isTest) "test" else "main"

        val sourcesRelPaths: List[RelPath] =
          bloopProject.sources.map(absoluteDir => RelPath.relativeTo(bloopProject.directory, absoluteDir))

        val resourcesRelPaths: List[RelPath] =
          bloopProject.resources.getOrElse(Nil).map(absoluteDir => RelPath.relativeTo(bloopProject.directory, absoluteDir))

        val resolution = bloopProject.resolution
          .getOrElse(sys.error(s"Expected bloop file for ${projectName.value} to have resolution"))

        val dependencies: List[JavaOrScalaDependency] =
          resolution.modules.map { mod =>
            def withConf(dep: Dependency): Dependency =
              mod.configurations.foldLeft(dep)((dep, c) => dep.withConfiguration(Configuration(c)))

            def java: JavaOrScalaDependency.JavaDependency = {
              val dep = Dependency(Module(Organization(mod.organization), ModuleName(mod.name)), mod.version)
              JavaOrScalaDependency.JavaDependency(withConf(dep), Set.empty)
            }

            val sdep: JavaOrScalaDependency = scalaVersion match {
              case Some(scalaVersion) =>
                val full = mod.name.indexOf("_" + scalaVersion.scalaVersion)
                val scala = mod.name.indexOf("_" + scalaVersion.binVersion)
                val platform = {
                  val sjs1 = mod.name.indexOf("_sjs1")
                  val sjs06 = mod.name.indexOf("_sjs0.6")
                  if (sjs1 != -1) sjs1 else sjs06
                }

                List(full, scala, platform).filterNot(_ == -1).minOption match {
                  case None => java
                  case Some(modNameEndIdx) =>
                    val dep = Dependency(Module(Organization(mod.organization), ModuleName(mod.name.take(modNameEndIdx))), mod.version)
                    JavaOrScalaDependency.ScalaDependency(
                      withConf(dep),
                      fullCrossVersion = full != -1,
                      withPlatformSuffix = platform != -1,
                      Set.empty
                    )
                }
              case None =>
                java
            }

            import io.circe.syntax._
            import model.Project.{decodesDep, encodesDep}
            io.circe.parser.decode[JavaOrScalaDependency](sdep.asJson.spaces2) match {
              case Left(x)  => throw x
              case Right(x) => x
            }
          }

        val configuredJava: Option[model.Java] =
          bloopProject.java.map(java => model.Java(options = Some(JsonList(java.options))))

        val configuredScala: Option[model.Scala] =
          bloopProject.scala.map { scalaConfig =>
            val translated = translateScala(scalaConfig)
            translated.version match {
              case Some(version) =>
                val scalaId = model.ScalaId(version.binVersion)
                val shared = scalas(scalaId)
                translated.removeAll(shared).copy(`extends` = Some(scalaId))

              case None => translated
            }
          }

        // todo: platform is still wip
        val configuredPlatform: Option[Platform.Jvm] =
          bloopProject.platform.flatMap {
            case Config.Platform.Js(config, mainClass) => None
            case Config.Platform.Jvm(config, mainClass, runtimeConfig, classpath, resources) =>
              val newConfig = model.JvmConfig(options = config.options)
              val newRuntimeConfig = runtimeConfig.map(c => model.JvmConfig(options = c.options))
              Some(model.Platform.Jvm(Some(newConfig), mainClass, newRuntimeConfig))
            case Config.Platform.Native(config, mainClass) => None
          }

        projectName -> model.Project(
          folder = folder,
          dependsOn = dependsOn,
          sources = Some(JsonList(sourcesRelPaths)),
          resources = Some(JsonList(resourcesRelPaths)),
          dependencies = Some(JsonList(dependencies)),
          java = configuredJava,
          scala = configuredScala,
          platform = configuredPlatform,
          `source-layout` = None,
          `sbt-scope` = Some(scope)
        )
    }

    model.Build("1", projects, Some(scalas), None, None, resolvers = Some(JsonList(resolvers)))
  }

  def translateScala(s: Config.Scala): model.Scala =
    model.Scala(
      `extends` = None,
      version = Some(Versions.Scala(s.version)),
      // todo: compiler plugins
      options = Some(Options(s.options)),
      setup = s.setup.map(setup =>
        model.CompileSetup(
          order = Some(setup.order).filterNot(_ == Config.CompileSetup.empty.order),
          addLibraryToBootClasspath = Some(setup.addLibraryToBootClasspath).filterNot(_ == Config.CompileSetup.empty.addLibraryToBootClasspath),
          addCompilerToClasspath = Some(setup.addCompilerToClasspath).filterNot(_ == Config.CompileSetup.empty.addCompilerToClasspath),
          addExtraJarsToClasspath = Some(setup.addExtraJarsToClasspath).filterNot(_ == Config.CompileSetup.empty.addExtraJarsToClasspath),
          manageBootClasspath = Some(setup.manageBootClasspath).filterNot(_ == Config.CompileSetup.empty.manageBootClasspath),
          filterLibraryFromClasspath = Some(setup.filterLibraryFromClasspath).filterNot(_ == Config.CompileSetup.empty.filterLibraryFromClasspath)
        )
      )
    )
}