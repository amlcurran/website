(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{183:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(191),i=a(189);t.default=function(e){e.data;var t=r.a.createElement(i.a,{title:"Not tech",keywords:["hands","developer","engineer","pottery","soap"],description:"Here's what I get up to when I'm not coding",key:"SEO"});return r.a.createElement(o.b,{seo:t},"This part of my website will be coming soon...")}},187:function(e,t,a){var n;e.exports=(n=a(188))&&n.default||n},188:function(e,t,a){"use strict";a.r(t);a(33);var n=a(0),r=a.n(n),o=a(4),i=a.n(o),s=a(59),l=a(2),c=function(e){var t=e.location,a=l.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(s.a,Object.assign({location:t,pageResources:a},a.json))};c.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},t.default=c},189:function(e,t,a){"use strict";var n=a(190),r=a(0),o=a.n(r),i=a(4),s=a.n(i),l=a(194),c=a.n(l);function m(e){var t=e.description,a=e.lang,r=e.meta,i=e.keywords,s=e.title,l=n.data.site,m=t||l.siteMetadata.description;return o.a.createElement(c.a,{htmlAttributes:{lang:a},title:s,titleTemplate:"%s | "+l.siteMetadata.title,meta:[{name:"description",content:m},{property:"og:title",content:s},{property:"og:description",content:m},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:l.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:m}].concat(i.length>0?{name:"keywords",content:i.join(", ")}:[]).concat(r)})}m.defaultProps={lang:"en",meta:[],keywords:[]},m.propTypes={description:s.a.string,lang:s.a.string,meta:s.a.array,keywords:s.a.arrayOf(s.a.string),title:s.a.string.isRequired},t.a=m},190:function(e){e.exports={data:{site:{siteMetadata:{title:"Alex Curran",description:"The portfolio website for Alex Curran, mobile developer",author:"Alex Curran"}}}}},191:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=(a(192),a(33),a(4)),i=a.n(o),s=a(32),l=a.n(s);a(187),r.a.createContext({});i.a.object,i.a.string.isRequired,i.a.func,i.a.func;var c={backgroundColor:"rgb(255, 102, 0)"},m={fontSize:32,paddingTop:12,paddingBottom:12,fontWeight:700,fontFamily:"Raleway, sans-serif",letterSpacing:"0.15rem"},u={display:"flex",alignItems:"center",marginTop:0,marginBottom:12,minHeight:56},d={textAlign:"center",fontFamily:"Raleway, sans-serif",letterSpacing:"0.15rem"},p=Object.assign({flexGrow:1},d),g=function(e){var t=e.to,a=e.text,n=e.current;return r.a.createElement(l.a,{to:t,style:{flexGrow:1}},r.a.createElement("div",{style:d},function(e,t){return t&&t.href.endsWith(e)?"● ":""}(t,n)+a))};var f=function(){var e="undefined"!=typeof window?window.location:null;return r.a.createElement("header",null,r.a.createElement("div",{style:Object.assign({},w,m)},"I am Alex Curran."),r.a.createElement("div",{style:c,className:"emphasisBox"},r.a.createElement("div",{style:Object.assign({},w,u)},r.a.createElement(g,{to:"/",text:"Home",current:e}),r.a.createElement(g,{to:"/portfolio",text:"Portfolio",current:e}),r.a.createElement(g,{to:"/talks",text:"Talks",current:e}),r.a.createElement(g,{to:"/not-tech",text:"Not tech",current:e}),r.a.createElement("a",{href:"https://www.medium.com/@amlcurran",style:p,target:"_blank"},"⎋ Blog"))))};a(193);a.d(t,"a",function(){return w});var w={maxWidth:960,marginLeft:"auto",marginRight:"auto",padding:"0px 1.0875rem 0px 1.0875rem"};t.b=function(e){var t=e.children,a=e.seo;return r.a.createElement(r.a.Fragment,null,a,r.a.createElement(f,null),r.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},r.a.createElement("main",null,t),r.a.createElement("footer",{style:{marginTop:32}},"© ",(new Date).getFullYear(),", Built with"," ",r.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby"))))}}}]);
//# sourceMappingURL=component---src-pages-not-tech-tsx-6284073ce053f05bf81a.js.map