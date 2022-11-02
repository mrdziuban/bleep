"use strict";(self.webpackChunkbleep_site=self.webpackChunkbleep_site||[]).push([[228],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>d});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,l=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),m=p(r),d=o,v=m["".concat(c,".").concat(d)]||m[d]||u[d]||l;return r?n.createElement(v,a(a({ref:t},s),{},{components:r})):n.createElement(v,a({ref:t},s))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=r.length,a=new Array(l);a[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var p=2;p<l;p++)a[p]=r[p];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},6842:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var n=r(7462),o=(r(7294),r(3905));const l={},a="Managing compile-servers",i={unversionedId:"usage/compile-servers",id:"usage/compile-servers",title:"Managing compile-servers",description:"Bleep uses Bloop to compile and run your projects.",source:"@site/docs/usage/compile-servers.mdx",sourceDirName:"usage",slug:"/usage/compile-servers",permalink:"/docs/usage/compile-servers",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"More stable builds",permalink:"/docs/usage/stable-builds"},next:{title:"Dependencies",permalink:"/docs/usage/dependencies"}},c={},p=[{value:"1) Bleep will keep compile-server running between each invocation",id:"1-bleep-will-keep-compile-server-running-between-each-invocation",level:2},{value:"2) Bleep will start a compile-server for each invocation",id:"2-bleep-will-start-a-compile-server-for-each-invocation",level:2}],s={toc:p};function u(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"managing-compile-servers"},"Managing compile-servers"),(0,o.kt)("p",null,"Bleep uses ",(0,o.kt)("a",{parentName:"p",href:"https://scalacenter.github.io/bloop/"},"Bloop")," to compile and run your projects."),(0,o.kt)("p",null,"Roughly there are two modes of operation:"),(0,o.kt)("h2",{id:"1-bleep-will-keep-compile-server-running-between-each-invocation"},"1) Bleep will keep compile-server running between each invocation"),(0,o.kt)("p",null,"This is the default behaviour, but if you need to change back this is the command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ bleep compile-server auto-shutdown-disable\n")),(0,o.kt)("p",null,"Note that since projects can specify the exact JVM they will be compiled with, and Bloop run the Scala compiler on the JVM it is started with, more than one compile servers may be started if necessary."),(0,o.kt)("p",null,"If you want to stop all running Bloop servers started by Bleep, this is the command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ bleep compile-server stop-all\n")),(0,o.kt)("h2",{id:"2-bleep-will-start-a-compile-server-for-each-invocation"},"2) Bleep will start a compile-server for each invocation"),(0,o.kt)("p",null,"This is slower, but will conserve memory."),(0,o.kt)("p",null,"To enable this mode run this command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ bleep compile-server auto-shutdown-enable\n")))}u.isMDXComponent=!0}}]);