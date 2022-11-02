"use strict";(self.webpackChunkbleep_site=self.webpackChunkbleep_site||[]).push([[584],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var a=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var i=a.createContext({}),c=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(n),m=l,g=d["".concat(i,".").concat(m)]||d[m]||u[m]||r;return n?a.createElement(g,o(o({ref:t},p),{},{components:n})):a.createElement(g,o({ref:t},p))}));function m(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,o=new Array(r);o[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:l,o[1]=s;for(var c=2;c<r;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5603:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var a=n(7462),l=(n(7294),n(3905));const r={},o="Dependencies",s={unversionedId:"usage/dependencies",id:"usage/dependencies",title:"Dependencies",description:"Dependencies in Bleep are specified almost like in sbt, mill and so on",source:"@site/docs/usage/dependencies.mdx",sourceDirName:"usage",slug:"/usage/dependencies",permalink:"/docs/usage/dependencies",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Managing compile-servers",permalink:"/docs/usage/compile-servers"},next:{title:"Selecting projects",permalink:"/docs/usage/selecting-projects"}},i={},c=[{value:"Java dependency",id:"java-dependency",level:2},{value:"Scala dependency",id:"scala-dependency",level:2},{value:"Scala.js / Scala Native dependency",id:"scalajs--scala-native-dependency",level:2},{value:"But that&#39;s not like sbt does it!?",id:"but-thats-not-like-sbt-does-it",level:3},{value:"Long form",id:"long-form",level:2},{value:"Dependency upon sbt plugins",id:"dependency-upon-sbt-plugins",level:2},{value:"Limitations",id:"limitations",level:2}],p={toc:c};function u(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"dependencies"},"Dependencies"),(0,l.kt)("p",null,"Dependencies in Bleep are specified ",(0,l.kt)("em",{parentName:"p"},"almost")," like in sbt, mill and so on"),(0,l.kt)("h2",{id:"java-dependency"},"Java dependency"),(0,l.kt)("p",null,"Java dependencies separate coordinate parts by colon (like sbt's ",(0,l.kt)("inlineCode",{parentName:"p"},"%"),")"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"- org.scalameta:svm-subs:101.0.0\n")),(0,l.kt)("h2",{id:"scala-dependency"},"Scala dependency"),(0,l.kt)("p",null,"Scala dependencies use two colons after organization (similar to sbt's ",(0,l.kt)("inlineCode",{parentName:"p"},"%%"),")"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"- com.monovore::decline:2.3.1\n")),(0,l.kt)("h2",{id:"scalajs--scala-native-dependency"},"Scala.js / Scala Native dependency"),(0,l.kt)("p",null,"Surprise! These also use two colons, not three like in sbt."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"    - com.lihaoyi::pprint:0.8.0\n")),(0,l.kt)("h3",{id:"but-thats-not-like-sbt-does-it"},"But that's not like sbt does it!?"),(0,l.kt)("p",null,"Bleep flips the default, the easiest syntax should be used for the most common thing."),(0,l.kt)("p",null,"If you want to add such a Scala JVM dependency to a JS/Native project, you can use the long form and a boolean flag"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"- forceJvm: true\n  module: com.softwaremill.sttp.client3::httpclient-backend-fs2:3.3.18\n")),(0,l.kt)("h2",{id:"long-form"},"Long form"),(0,l.kt)("p",null,"As seen above, if you manually change this short form"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"- org.scala-sbt::librarymanagement-core:1.7.1\n")),(0,l.kt)("p",null,"to this long form:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"- module: org.scala-sbt::librarymanagement-core:1.7.1\n")),(0,l.kt)("p",null,"you can now tweak the dependency further."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"}," - exclusions:\n     org.scala-sbt: util-logging_2.13\n   for3Use213: true\n   module: org.scala-sbt::librarymanagement-core:1.7.1\n")),(0,l.kt)("p",null,"You'll also get IDE support for navigating this:"),(0,l.kt)("video",{controls:"true",src:"https://user-images.githubusercontent.com/247937/199452270-50f5452a-8e18-41c1-80e9-9234b6883d5d.mp4"}),(0,l.kt)("h2",{id:"dependency-upon-sbt-plugins"},"Dependency upon sbt plugins"),(0,l.kt)("p",null,"This lets you build sbt plugins with bleep (note that publishing is not implemented yet)"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"    dependencies:\n    - isSbtPlugin: true\n      module: ch.epfl.scala:sbt-scalajs-bundler:0.20.0\n    - configuration: provided\n      module: org.scala-sbt:sbt:1.5.5\n")),(0,l.kt)("h2",{id:"limitations"},"Limitations"),(0,l.kt)("p",null,"Note that Bleep has shed support for the most intricate ivyisms. What is left makes the structure much more cacheable, and should be enough for 99% of projects."))}u.isMDXComponent=!0}}]);