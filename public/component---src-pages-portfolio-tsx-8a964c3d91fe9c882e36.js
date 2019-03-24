(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{186:function(e,t,n){"use strict";n.r(t);n(83),n(84);var a=n(0),r=n.n(a),o={display:"flex",flexDirection:"column",alignItems:"center",minWidth:40,justifyContent:"space-around",marginLeft:16,marginTop:8,fontSize:12,textTransform:"uppercase",fontWeight:"bold"},i=function(e){var t=e.text,n=e.component;return r.a.createElement("div",{style:o},n,t)},l=n(191),c=n(189),s=n(203),m=n.n(s),d=n(204),u=n.n(d);n.d(t,"pageQuery",function(){return f});function p(e){var t,n,a,o=e.node;return r.a.createElement("div",{key:o.frontmatter.title},r.a.createElement("div",{style:{display:"flex",marginBottom:24}},r.a.createElement("div",{style:{flexGrow:1}},r.a.createElement("h5",null,o.frontmatter.date),r.a.createElement("h3",{style:{marginBottom:0}},o.frontmatter.title)),r.a.createElement(i,{text:"Devs",component:r.a.createElement("div",{style:{fontWeight:700,fontSize:20}},o.frontmatter.team)}),(t=o.frontmatter,n=t.platforms.includes("iOS")?r.a.createElement(i,{text:"iOS",component:r.a.createElement(m.a,{style:{fill:"white"}})}):null,a=t.platforms.includes("android")?r.a.createElement(i,{text:"Android",component:r.a.createElement(u.a,{height:"24px",style:{fill:"white"}})}):null,r.a.createElement(r.a.Fragment,null,n,a))),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:o.html}}))}var f="2088654688";t.default=function(e){var t=e.data.allMarkdownRemark.edges.map(p),n=r.a.createElement(c.a,{title:"Portfolio",keywords:["portfolio","developer","engineer","mobile","ios","android"],description:"A series of my most popular projects",key:"SEO"});return r.a.createElement(l.b,{seo:n},t)}},187:function(e,t,n){var a;e.exports=(a=n(188))&&a.default||a},188:function(e,t,n){"use strict";n.r(t);n(33);var a=n(0),r=n.n(a),o=n(4),i=n.n(o),l=n(59),c=n(2),s=function(e){var t=e.location,n=c.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(l.a,Object.assign({location:t,pageResources:n},n.json))};s.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},t.default=s},189:function(e,t,n){"use strict";var a=n(190),r=n(0),o=n.n(r),i=n(4),l=n.n(i),c=n(194),s=n.n(c);function m(e){var t=e.description,n=e.lang,r=e.meta,i=e.keywords,l=e.title,c=a.data.site,m=t||c.siteMetadata.description;return o.a.createElement(s.a,{htmlAttributes:{lang:n},title:l,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{name:"description",content:m},{property:"og:title",content:l},{property:"og:description",content:m},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:c.siteMetadata.author},{name:"twitter:title",content:l},{name:"twitter:description",content:m}].concat(i.length>0?{name:"keywords",content:i.join(", ")}:[]).concat(r)})}m.defaultProps={lang:"en",meta:[],keywords:[]},m.propTypes={description:l.a.string,lang:l.a.string,meta:l.a.array,keywords:l.a.arrayOf(l.a.string),title:l.a.string.isRequired},t.a=m},190:function(e){e.exports={data:{site:{siteMetadata:{title:"Alex Curran",description:"The portfolio website for Alex Curran, mobile developer",author:"Alex Curran"}}}}},191:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=(n(192),n(33),n(4)),i=n.n(o),l=n(32),c=n.n(l);n(187),r.a.createContext({});i.a.object,i.a.string.isRequired,i.a.func,i.a.func;var s={backgroundColor:"rgb(255, 102, 0)"},m={fontSize:32,paddingTop:12,paddingBottom:12,fontWeight:700,fontFamily:"Raleway, sans-serif",letterSpacing:"0.15rem"},d={display:"flex",alignItems:"center",marginTop:0,marginBottom:12,minHeight:56},u={textAlign:"center",fontFamily:"Raleway, sans-serif",letterSpacing:"0.15rem"},p=Object.assign({flexGrow:1},u),f=function(e){var t=e.to,n=e.text,a=e.current;return r.a.createElement(c.a,{to:t,style:{flexGrow:1}},r.a.createElement("div",{style:u},function(e,t){return t&&t.href.endsWith(e)?"● ":""}(t,a)+n))};var g=function(){var e="undefined"!=typeof window?window.location:null;return r.a.createElement("header",null,r.a.createElement("div",{style:Object.assign({},v,m)},"I am Alex Curran."),r.a.createElement("div",{style:s,className:"emphasisBox"},r.a.createElement("div",{style:Object.assign({},v,d)},r.a.createElement(f,{to:"/",text:"Home",current:e}),r.a.createElement(f,{to:"/portfolio",text:"Portfolio",current:e}),r.a.createElement(f,{to:"/talks",text:"Talks",current:e}),r.a.createElement(f,{to:"/not-tech",text:"Not tech",current:e}),r.a.createElement("a",{href:"https://www.medium.com/@amlcurran",style:p,target:"_blank"},"⎋ Blog"))))};n(193);n.d(t,"a",function(){return v});var v={maxWidth:960,marginLeft:"auto",marginRight:"auto",padding:"0px 1.0875rem 0px 1.0875rem"};t.b=function(e){var t=e.children,n=e.seo;return r.a.createElement(r.a.Fragment,null,n,r.a.createElement(g,null),r.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},r.a.createElement("main",null,t),r.a.createElement("footer",{style:{marginTop:32}},"© ",(new Date).getFullYear(),", Built with"," ",r.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby"))))}},203:function(e,t,n){var a=n(0);function r(e){return a.createElement("svg",e,a.createElement("path",{d:"m150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zm-31.26-123.01c0 8.1021-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.3113 11.45-8.597 4.62-2.2516 8.99-3.4968 13.1-3.71 0.12 1.0831 0.17 2.1663 0.17 3.2409z"}))}r.defaultProps={width:"24px",viewBox:"0 0 170 170",version:"1.1",height:"24px"},e.exports=r,r.default=r},204:function(e,t,n){var a=n(0);function r(e){return a.createElement("svg",e,[a.createElement("style",{type:"text/css",key:0},"\n\t.st0{fill:#FFFFFF;}\n\t.st1{fill:#77C159;}\n"),a.createElement("path",{className:"st0",d:"M265.6,107.1c-8.3,0-15.7,3.7-20.8,9.5v-4.9c0-0.1,0-0.2,0-0.4c0-0.2,0-0.4,0-0.6c0-31.6-17.4-59.6-43.9-75.9\n\tl11-19.8c2.7-4.9,0.9-11-3.9-13.7h0c-4.9-2.7-11-0.9-13.7,3.9l-11.5,20.7c-11.2-4.1-23.4-6.4-36.2-6.4s-25,2.3-36.2,6.4L99,5.2\n\tc-2.7-4.9-8.9-6.6-13.7-3.9l0,0C80.4,4,78.6,10.1,81.3,15l11,19.8c-26.4,16.4-43.9,44.3-43.9,75.9c0,0.2,0,0.4,0,0.6\n\tc0,0.1,0,0.2,0,0.4v4.9c-5.1-5.8-12.5-9.5-20.8-9.5C12.4,107.1,0,119.5,0,134.7v85c0,15.2,12.4,27.6,27.6,27.6\n\tc8.3,0,15.7-3.7,20.8-9.5v11.9c0,16.1,13.1,29.2,29.2,29.2H85v37.8c0,15.2,12.4,27.6,27.6,27.6s27.6-12.4,27.6-27.6v-37.8H153v37.8\n\tc0,15.2,12.4,27.6,27.6,27.6s27.6-12.4,27.6-27.6v-37.8h7.4c16.1,0,29.2-13.1,29.2-29.2v-11.9c5.1,5.8,12.5,9.5,20.8,9.5\n\tc15.2,0,27.6-12.4,27.6-27.6v-85C293.2,119.5,280.8,107.1,265.6,107.1z",key:1}),a.createElement("path",{className:"st1",d:"M265.6,114.3c-11.2,0-20.4,9.2-20.4,20.4v85c0,11.2,9.2,20.4,20.4,20.4s20.4-9.2,20.4-20.4v-85\n\tC286,123.4,276.8,114.3,265.6,114.3z M27.6,114.3c-11.2,0-20.4,9.2-20.4,20.4v85c0,11.2,9.2,20.4,20.4,20.4S48,230.9,48,219.7v-85\n\tC48,123.4,38.8,114.3,27.6,114.3z M237.6,117.8v131.9c0,12.2-9.8,22-22,22H201v45c0,11.2-9.2,20.4-20.4,20.4s-20.4-9.2-20.4-20.4\n\tv-45H133v45c0,11.2-9.2,20.4-20.4,20.4s-20.4-9.2-20.4-20.4v-45H77.6c-12.2,0-22-9.8-22-22V117.8H237.6z M191.2,37.5l14.4-26\n\tc0.8-1.4,0.3-3.2-1.1-3.9c-0.4-0.2-0.9-0.4-1.4-0.4c-1,0-2,0.5-2.5,1.5L186,34.9c-11.9-5.3-25.3-8.3-39.4-8.3\n\tc-14.1,0-27.5,3-39.4,8.3L92.7,8.7c-0.8-1.4-2.5-1.9-3.9-1.1c-1.4,0.8-1.9,2.5-1.1,3.9l14.4,26c-27.7,14.4-46.3,41.7-46.4,73.1h182\n\tC237.6,79.2,218.9,51.9,191.2,37.5z M104.6,77.3c-4.2,0-7.6-3.4-7.6-7.6s3.4-7.6,7.6-7.6s7.6,3.4,7.6,7.6S108.8,77.3,104.6,77.3z\n\t M188.6,77.3c-4.2,0-7.6-3.4-7.6-7.6s3.4-7.6,7.6-7.6s7.6,3.4,7.6,7.6S192.8,77.3,188.6,77.3z",key:2})])}r.defaultProps={version:"1.1",id:"Livello_1",x:"0px",y:"0px",viewBox:"0 0 293.2 344.3",style:{enableBackground:"new 0 0 293.2 344.3"},xmlSpace:"preserve"},e.exports=r,r.default=r}}]);
//# sourceMappingURL=component---src-pages-portfolio-tsx-8a964c3d91fe9c882e36.js.map