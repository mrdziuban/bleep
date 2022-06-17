package bleep
package commands

import bleep.bsp.{BloopLogger, CompileServerMode, SetupBloopRifle}
import bleep.internal.{FileUtils, Lazy}
import bleep.logging.Logger

import scala.build.blooprifle.BloopRifle
import scala.concurrent.ExecutionContext

case class CompileServerStop(logger: Logger, userPaths: UserPaths, lazyResolver: Lazy[CoursierResolver]) extends BleepCommand {
  override def run(): Either[BuildException, Unit] =
    BleepConfig
      .rewritePersisted(logger, userPaths) { bleepConfig =>
        bleepConfig.compileServerMode match {
          case CompileServerMode.NewEachInvocation =>
            logger.warn("Nothing to stop")
            bleepConfig

          case mode @ CompileServerMode.Shared =>
            val rifleConfig = SetupBloopRifle(JvmCmd(logger, bleepConfig.compileServerJvm, ExecutionContext.global), userPaths, lazyResolver, mode)
            val rifleLogger = new BloopLogger(logger)
            if (BloopRifle.check(rifleConfig, rifleLogger)) {
              BloopRifle.exit(rifleConfig, FileUtils.TempDir, rifleLogger)
            } else
              logger.info("bloop server was not running")

            bleepConfig.copy(compileServerMode = CompileServerMode.NewEachInvocation)
        }
      }
      .map(_ => ())
}
