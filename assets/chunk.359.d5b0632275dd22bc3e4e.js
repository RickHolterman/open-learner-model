"use strict";(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[359],{953:(e,t,n)=>{n.r(t),n.d(t,{afterMain:()=>x,afterRead:()=>b,afterWrite:()=>M,applyStyles:()=>L,arrow:()=>Q,auto:()=>f,basePlacements:()=>s,beforeMain:()=>w,beforeRead:()=>y,beforeWrite:()=>_,bottom:()=>o,clippingParents:()=>l,computeStyles:()=>ne,createPopper:()=>ke,createPopperBase:()=>Ue,createPopperLite:()=>Le,detectOverflow:()=>ye,end:()=>c,eventListeners:()=>oe,flip:()=>ge,hide:()=>Oe,left:()=>a,main:()=>O,modifierPhases:()=>P,offset:()=>xe,placements:()=>m,popper:()=>p,popperGenerator:()=>Ee,popperOffsets:()=>_e,preventOverflow:()=>je,read:()=>g,reference:()=>h,right:()=>i,start:()=>u,top:()=>r,variationPlacements:()=>v,viewport:()=>d,write:()=>j})
var r="top",o="bottom",i="right",a="left",f="auto",s=[r,o,i,a],u="start",c="end",l="clippingParents",d="viewport",p="popper",h="reference",v=s.reduce((function(e,t){return e.concat([t+"-"+u,t+"-"+c])}),[]),m=[].concat(s,[f]).reduce((function(e,t){return e.concat([t,t+"-"+u,t+"-"+c])}),[]),y="beforeRead",g="read",b="afterRead",w="beforeMain",O="main",x="afterMain",_="beforeWrite",j="write",M="afterWrite",P=[y,g,b,w,O,x,_,j,M]
function A(e){return e?(e.nodeName||"").toLowerCase():null}function D(e){if(null==e)return window
if("[object Window]"!==e.toString()){var t=e.ownerDocument
return t&&t.defaultView||window}return e}function E(e){return e instanceof D(e).Element||e instanceof Element}function U(e){return e instanceof D(e).HTMLElement||e instanceof HTMLElement}function k(e){return"undefined"!=typeof ShadowRoot&&(e instanceof D(e).ShadowRoot||e instanceof ShadowRoot)}const L={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state
Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e]
U(o)&&A(o)&&(Object.assign(o.style,n),Object.keys(r).forEach((function(e){var t=r[e]
!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}}
return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],o=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{})
U(r)&&A(r)&&(Object.assign(r.style,i),Object.keys(o).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]}
function I(e){return e.split("-")[0]}var R=Math.max,S=Math.min,W=Math.round
function T(){var e=navigator.userAgentData
return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function C(){return!/^((?!chrome|android).)*safari/i.test(T())}function B(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1)
var r=e.getBoundingClientRect(),o=1,i=1
t&&U(e)&&(o=e.offsetWidth>0&&W(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&W(r.height)/e.offsetHeight||1)
var a=(E(e)?D(e):window).visualViewport,f=!C()&&n,s=(r.left+(f&&a?a.offsetLeft:0))/o,u=(r.top+(f&&a?a.offsetTop:0))/i,c=r.width/o,l=r.height/i
return{width:c,height:l,top:u,right:s+c,bottom:u+l,left:s,x:s,y:u}}function H(e){var t=B(e),n=e.offsetWidth,r=e.offsetHeight
return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function V(e,t){var n=t.getRootNode&&t.getRootNode()
if(e.contains(t))return!0
if(n&&k(n)){var r=t
do{if(r&&e.isSameNode(r))return!0
r=r.parentNode||r.host}while(r)}return!1}function q(e){return D(e).getComputedStyle(e)}function N(e){return["table","td","th"].indexOf(A(e))>=0}function F(e){return((E(e)?e.ownerDocument:e.document)||window.document).documentElement}function z(e){return"html"===A(e)?e:e.assignedSlot||e.parentNode||(k(e)?e.host:null)||F(e)}function X(e){return U(e)&&"fixed"!==q(e).position?e.offsetParent:null}function Y(e){for(var t=D(e),n=X(e);n&&N(n)&&"static"===q(n).position;)n=X(n)
return n&&("html"===A(n)||"body"===A(n)&&"static"===q(n).position)?t:n||function(e){var t=/firefox/i.test(T())
if(/Trident/i.test(T())&&U(e)&&"fixed"===q(e).position)return null
var n=z(e)
for(k(n)&&(n=n.host);U(n)&&["html","body"].indexOf(A(n))<0;){var r=q(n)
if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n
n=n.parentNode}return null}(e)||t}function G(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function $(e,t,n){return R(e,S(t,n))}function J(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function K(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}const Q={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,f=e.name,u=e.options,c=n.elements.arrow,l=n.modifiersData.popperOffsets,d=I(n.placement),p=G(d),h=[a,i].indexOf(d)>=0?"height":"width"
if(c&&l){var v=function(e,t){return J("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:K(e,s))}(u.padding,n),m=H(c),y="y"===p?r:a,g="y"===p?o:i,b=n.rects.reference[h]+n.rects.reference[p]-l[p]-n.rects.popper[h],w=l[p]-n.rects.reference[p],O=Y(c),x=O?"y"===p?O.clientHeight||0:O.clientWidth||0:0,_=b/2-w/2,j=v[y],M=x-m[h]-v[g],P=x/2-m[h]/2+_,A=$(j,P,M),D=p
n.modifiersData[f]=((t={})[D]=A,t.centerOffset=A-P,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n
null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&V(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]}
function Z(e){return e.split("-")[1]}var ee={top:"auto",right:"auto",bottom:"auto",left:"auto"}
function te(e){var t,n=e.popper,f=e.popperRect,s=e.placement,u=e.variation,l=e.offsets,d=e.position,p=e.gpuAcceleration,h=e.adaptive,v=e.roundOffsets,m=e.isFixed,y=l.x,g=void 0===y?0:y,b=l.y,w=void 0===b?0:b,O="function"==typeof v?v({x:g,y:w}):{x:g,y:w}
g=O.x,w=O.y
var x=l.hasOwnProperty("x"),_=l.hasOwnProperty("y"),j=a,M=r,P=window
if(h){var A=Y(n),E="clientHeight",U="clientWidth"
A===D(n)&&"static"!==q(A=F(n)).position&&"absolute"===d&&(E="scrollHeight",U="scrollWidth"),(s===r||(s===a||s===i)&&u===c)&&(M=o,w-=(m&&A===P&&P.visualViewport?P.visualViewport.height:A[E])-f.height,w*=p?1:-1),s!==a&&(s!==r&&s!==o||u!==c)||(j=i,g-=(m&&A===P&&P.visualViewport?P.visualViewport.width:A[U])-f.width,g*=p?1:-1)}var k,L=Object.assign({position:d},h&&ee),I=!0===v?function(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1
return{x:W(n*o)/o||0,y:W(r*o)/o||0}}({x:g,y:w},D(n)):{x:g,y:w}
return g=I.x,w=I.y,p?Object.assign({},L,((k={})[M]=_?"0":"",k[j]=x?"0":"",k.transform=(P.devicePixelRatio||1)<=1?"translate("+g+"px, "+w+"px)":"translate3d("+g+"px, "+w+"px, 0)",k)):Object.assign({},L,((t={})[M]=_?w+"px":"",t[j]=x?g+"px":"",t.transform="",t))}const ne={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,f=n.roundOffsets,s=void 0===f||f,u={placement:I(t.placement),variation:Z(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy}
null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,te(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:s})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,te(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:s})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}}
var re={passive:!0}
const oe={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=void 0===o||o,a=r.resize,f=void 0===a||a,s=D(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper)
return i&&u.forEach((function(e){e.addEventListener("scroll",n.update,re)})),f&&s.addEventListener("resize",n.update,re),function(){i&&u.forEach((function(e){e.removeEventListener("scroll",n.update,re)})),f&&s.removeEventListener("resize",n.update,re)}},data:{}}
var ie={left:"right",right:"left",bottom:"top",top:"bottom"}
function ae(e){return e.replace(/left|right|bottom|top/g,(function(e){return ie[e]}))}var fe={start:"end",end:"start"}
function se(e){return e.replace(/start|end/g,(function(e){return fe[e]}))}function ue(e){var t=D(e)
return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function ce(e){return B(F(e)).left+ue(e).scrollLeft}function le(e){var t=q(e),n=t.overflow,r=t.overflowX,o=t.overflowY
return/auto|scroll|overlay|hidden/.test(n+o+r)}function de(e){return["html","body","#document"].indexOf(A(e))>=0?e.ownerDocument.body:U(e)&&le(e)?e:de(z(e))}function pe(e,t){var n
void 0===t&&(t=[])
var r=de(e),o=r===(null==(n=e.ownerDocument)?void 0:n.body),i=D(r),a=o?[i].concat(i.visualViewport||[],le(r)?r:[]):r,f=t.concat(a)
return o?f:f.concat(pe(z(a)))}function he(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function ve(e,t,n){return t===d?he(function(e,t){var n=D(e),r=F(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,f=0,s=0
if(o){i=o.width,a=o.height
var u=C();(u||!u&&"fixed"===t)&&(f=o.offsetLeft,s=o.offsetTop)}return{width:i,height:a,x:f+ce(e),y:s}}(e,n)):E(t)?function(e,t){var n=B(e,!1,"fixed"===t)
return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(t,n):he(function(e){var t,n=F(e),r=ue(e),o=null==(t=e.ownerDocument)?void 0:t.body,i=R(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=R(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),f=-r.scrollLeft+ce(e),s=-r.scrollTop
return"rtl"===q(o||n).direction&&(f+=R(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:f,y:s}}(F(e)))}function me(e){var t,n=e.reference,f=e.element,s=e.placement,l=s?I(s):null,d=s?Z(s):null,p=n.x+n.width/2-f.width/2,h=n.y+n.height/2-f.height/2
switch(l){case r:t={x:p,y:n.y-f.height}
break
case o:t={x:p,y:n.y+n.height}
break
case i:t={x:n.x+n.width,y:h}
break
case a:t={x:n.x-f.width,y:h}
break
default:t={x:n.x,y:n.y}}var v=l?G(l):null
if(null!=v){var m="y"===v?"height":"width"
switch(d){case u:t[v]=t[v]-(n[m]/2-f[m]/2)
break
case c:t[v]=t[v]+(n[m]/2-f[m]/2)}}return t}function ye(e,t){void 0===t&&(t={})
var n=t,a=n.placement,f=void 0===a?e.placement:a,u=n.strategy,c=void 0===u?e.strategy:u,v=n.boundary,m=void 0===v?l:v,y=n.rootBoundary,g=void 0===y?d:y,b=n.elementContext,w=void 0===b?p:b,O=n.altBoundary,x=void 0!==O&&O,_=n.padding,j=void 0===_?0:_,M=J("number"!=typeof j?j:K(j,s)),P=w===p?h:p,D=e.rects.popper,k=e.elements[x?P:w],L=function(e,t,n,r){var o="clippingParents"===t?function(e){var t=pe(z(e)),n=["absolute","fixed"].indexOf(q(e).position)>=0&&U(e)?Y(e):e
return E(n)?t.filter((function(e){return E(e)&&V(e,n)&&"body"!==A(e)})):[]}(e):[].concat(t),i=[].concat(o,[n]),a=i[0],f=i.reduce((function(t,n){var o=ve(e,n,r)
return t.top=R(o.top,t.top),t.right=S(o.right,t.right),t.bottom=S(o.bottom,t.bottom),t.left=R(o.left,t.left),t}),ve(e,a,r))
return f.width=f.right-f.left,f.height=f.bottom-f.top,f.x=f.left,f.y=f.top,f}(E(k)?k:k.contextElement||F(e.elements.popper),m,g,c),I=B(e.elements.reference),W=me({reference:I,element:D,strategy:"absolute",placement:f}),T=he(Object.assign({},D,W)),C=w===p?T:I,H={top:L.top-C.top+M.top,bottom:C.bottom-L.bottom+M.bottom,left:L.left-C.left+M.left,right:C.right-L.right+M.right},N=e.modifiersData.offset
if(w===p&&N){var X=N[f]
Object.keys(H).forEach((function(e){var t=[i,o].indexOf(e)>=0?1:-1,n=[r,o].indexOf(e)>=0?"y":"x"
H[e]+=X[n]*t}))}return H}const ge={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,c=e.name
if(!t.modifiersData[c]._skip){for(var l=n.mainAxis,d=void 0===l||l,p=n.altAxis,h=void 0===p||p,y=n.fallbackPlacements,g=n.padding,b=n.boundary,w=n.rootBoundary,O=n.altBoundary,x=n.flipVariations,_=void 0===x||x,j=n.allowedAutoPlacements,M=t.options.placement,P=I(M),A=y||(P!==M&&_?function(e){if(I(e)===f)return[]
var t=ae(e)
return[se(e),t,se(t)]}(M):[ae(M)]),D=[M].concat(A).reduce((function(e,n){return e.concat(I(n)===f?function(e,t){void 0===t&&(t={})
var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,f=n.flipVariations,u=n.allowedAutoPlacements,c=void 0===u?m:u,l=Z(r),d=l?f?v:v.filter((function(e){return Z(e)===l})):s,p=d.filter((function(e){return c.indexOf(e)>=0}))
0===p.length&&(p=d)
var h=p.reduce((function(t,n){return t[n]=ye(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[I(n)],t}),{})
return Object.keys(h).sort((function(e,t){return h[e]-h[t]}))}(t,{placement:n,boundary:b,rootBoundary:w,padding:g,flipVariations:_,allowedAutoPlacements:j}):n)}),[]),E=t.rects.reference,U=t.rects.popper,k=new Map,L=!0,R=D[0],S=0;S<D.length;S++){var W=D[S],T=I(W),C=Z(W)===u,B=[r,o].indexOf(T)>=0,H=B?"width":"height",V=ye(t,{placement:W,boundary:b,rootBoundary:w,altBoundary:O,padding:g}),q=B?C?i:a:C?o:r
E[H]>U[H]&&(q=ae(q))
var N=ae(q),F=[]
if(d&&F.push(V[T]<=0),h&&F.push(V[q]<=0,V[N]<=0),F.every((function(e){return e}))){R=W,L=!1
break}k.set(W,F)}if(L)for(var z=function(e){var t=D.find((function(t){var n=k.get(t)
if(n)return n.slice(0,e).every((function(e){return e}))}))
if(t)return R=t,"break"},X=_?3:1;X>0&&"break"!==z(X);X--);t.placement!==R&&(t.modifiersData[c]._skip=!0,t.placement=R,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}}
function be(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function we(e){return[r,i,o,a].some((function(t){return e[t]>=0}))}const Oe={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=ye(t,{elementContext:"reference"}),f=ye(t,{altBoundary:!0}),s=be(a,r),u=be(f,o,i),c=we(s),l=we(u)
t.modifiersData[n]={referenceClippingOffsets:s,popperEscapeOffsets:u,isReferenceHidden:c,hasPopperEscaped:l},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":c,"data-popper-escaped":l})}},xe={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,o=e.name,f=n.offset,s=void 0===f?[0,0]:f,u=m.reduce((function(e,n){return e[n]=function(e,t,n){var o=I(e),f=[a,r].indexOf(o)>=0?-1:1,s="function"==typeof n?n(Object.assign({},t,{placement:e})):n,u=s[0],c=s[1]
return u=u||0,c=(c||0)*f,[a,i].indexOf(o)>=0?{x:c,y:u}:{x:u,y:c}}(n,t.rects,s),e}),{}),c=u[t.placement],l=c.x,d=c.y
null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=d),t.modifiersData[o]=u}},_e={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name
t.modifiersData[n]=me({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},je={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,f=e.name,s=n.mainAxis,c=void 0===s||s,l=n.altAxis,d=void 0!==l&&l,p=n.boundary,h=n.rootBoundary,v=n.altBoundary,m=n.padding,y=n.tether,g=void 0===y||y,b=n.tetherOffset,w=void 0===b?0:b,O=ye(t,{boundary:p,rootBoundary:h,padding:m,altBoundary:v}),x=I(t.placement),_=Z(t.placement),j=!_,M=G(x),P="x"===M?"y":"x",A=t.modifiersData.popperOffsets,D=t.rects.reference,E=t.rects.popper,U="function"==typeof w?w(Object.assign({},t.rects,{placement:t.placement})):w,k="number"==typeof U?{mainAxis:U,altAxis:U}:Object.assign({mainAxis:0,altAxis:0},U),L=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,W={x:0,y:0}
if(A){if(c){var T,C="y"===M?r:a,B="y"===M?o:i,V="y"===M?"height":"width",q=A[M],N=q+O[C],F=q-O[B],z=g?-E[V]/2:0,X=_===u?D[V]:E[V],J=_===u?-E[V]:-D[V],K=t.elements.arrow,Q=g&&K?H(K):{width:0,height:0},ee=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},te=ee[C],ne=ee[B],re=$(0,D[V],Q[V]),oe=j?D[V]/2-z-re-te-k.mainAxis:X-re-te-k.mainAxis,ie=j?-D[V]/2+z+re+ne+k.mainAxis:J+re+ne+k.mainAxis,ae=t.elements.arrow&&Y(t.elements.arrow),fe=ae?"y"===M?ae.clientTop||0:ae.clientLeft||0:0,se=null!=(T=null==L?void 0:L[M])?T:0,ue=q+ie-se,ce=$(g?S(N,q+oe-se-fe):N,q,g?R(F,ue):F)
A[M]=ce,W[M]=ce-q}if(d){var le,de="x"===M?r:a,pe="x"===M?o:i,he=A[P],ve="y"===P?"height":"width",me=he+O[de],ge=he-O[pe],be=-1!==[r,a].indexOf(x),we=null!=(le=null==L?void 0:L[P])?le:0,Oe=be?me:he-D[ve]-E[ve]-we+k.altAxis,xe=be?he+D[ve]+E[ve]-we-k.altAxis:ge,_e=g&&be?function(e,t,n){var r=$(e,t,n)
return r>n?n:r}(Oe,he,xe):$(g?Oe:me,he,g?xe:ge)
A[P]=_e,W[P]=_e-he}t.modifiersData[f]=W}},requiresIfExists:["offset"]}
function Me(e,t,n){void 0===n&&(n=!1)
var r,o,i=U(t),a=U(t)&&function(e){var t=e.getBoundingClientRect(),n=W(t.width)/e.offsetWidth||1,r=W(t.height)/e.offsetHeight||1
return 1!==n||1!==r}(t),f=F(t),s=B(e,a,n),u={scrollLeft:0,scrollTop:0},c={x:0,y:0}
return(i||!i&&!n)&&(("body"!==A(t)||le(f))&&(u=(r=t)!==D(r)&&U(r)?{scrollLeft:(o=r).scrollLeft,scrollTop:o.scrollTop}:ue(r)),U(t)?((c=B(t,!0)).x+=t.clientLeft,c.y+=t.clientTop):f&&(c.x=ce(f))),{x:s.left+u.scrollLeft-c.x,y:s.top+u.scrollTop-c.y,width:s.width,height:s.height}}function Pe(e){var t=new Map,n=new Set,r=[]
function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e)
r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}var Ae={placement:"bottom",modifiers:[],strategy:"absolute"}
function De(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Ee(e){void 0===e&&(e={})
var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,o=t.defaultOptions,i=void 0===o?Ae:o
return function(e,t,n){void 0===n&&(n=i)
var o,a,f={placement:"bottom",orderedModifiers:[],options:Object.assign({},Ae,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},s=[],u=!1,c={state:f,setOptions:function(n){var o="function"==typeof n?n(f.options):n
l(),f.options=Object.assign({},i,f.options,o),f.scrollParents={reference:E(e)?pe(e):e.contextElement?pe(e.contextElement):[],popper:pe(t)}
var a,u,d=function(e){var t=Pe(e)
return P.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((a=[].concat(r,f.options.modifiers),u=a.reduce((function(e,t){var n=e[t.name]
return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(u).map((function(e){return u[e]}))))
return f.orderedModifiers=d.filter((function(e){return e.enabled})),f.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect
if("function"==typeof o){var i=o({state:f,name:t,instance:c,options:r})
s.push(i||function(){})}})),c.update()},forceUpdate:function(){if(!u){var e=f.elements,t=e.reference,n=e.popper
if(De(t,n)){f.rects={reference:Me(t,Y(n),"fixed"===f.options.strategy),popper:H(n)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach((function(e){return f.modifiersData[e.name]=Object.assign({},e.data)}))
for(var r=0;r<f.orderedModifiers.length;r++)if(!0!==f.reset){var o=f.orderedModifiers[r],i=o.fn,a=o.options,s=void 0===a?{}:a,l=o.name
"function"==typeof i&&(f=i({state:f,options:s,name:l,instance:c})||f)}else f.reset=!1,r=-1}}},update:(o=function(){return new Promise((function(e){c.forceUpdate(),e(f)}))},function(){return a||(a=new Promise((function(e){Promise.resolve().then((function(){a=void 0,e(o())}))}))),a}),destroy:function(){l(),u=!0}}
if(!De(e,t))return c
function l(){s.forEach((function(e){return e()})),s=[]}return c.setOptions(n).then((function(e){!u&&n.onFirstUpdate&&n.onFirstUpdate(e)})),c}}var Ue=Ee(),ke=Ee({defaultModifiers:[oe,_e,ne,L,xe,ge,je,Q,Oe]}),Le=Ee({defaultModifiers:[oe,_e,ne,L]})},679:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"NIL",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(t,"parse",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"stringify",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"v1",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(t,"v3",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"v4",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"v5",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(t,"validate",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"version",{enumerable:!0,get:function(){return s.default}})
var r=d(n(999)),o=d(n(231)),i=d(n(647)),a=d(n(25)),f=d(n(996)),s=d(n(928)),u=d(n(163)),c=d(n(982)),l=d(n(729))
function d(e){return e&&e.__esModule?e:{default:e}}},792:(e,t)=>{function n(e){return 14+(e+64>>>9<<4)+1}function r(e,t){const n=(65535&e)+(65535&t)
return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function o(e,t,n,o,i,a){return r((f=r(r(t,e),r(o,a)))<<(s=i)|f>>>32-s,n)
var f,s}function i(e,t,n,r,i,a,f){return o(t&n|~t&r,e,t,i,a,f)}function a(e,t,n,r,i,a,f){return o(t&r|n&~r,e,t,i,a,f)}function f(e,t,n,r,i,a,f){return o(t^n^r,e,t,i,a,f)}function s(e,t,n,r,i,a,f){return o(n^(t|~r),e,t,i,a,f)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,t.default=function(e){if("string"==typeof e){const t=unescape(encodeURIComponent(e))
e=new Uint8Array(t.length)
for(let n=0;n<t.length;++n)e[n]=t.charCodeAt(n)}return function(e){const t=[],n=32*e.length,r="0123456789abcdef"
for(let o=0;o<n;o+=8){const n=e[o>>5]>>>o%32&255,i=parseInt(r.charAt(n>>>4&15)+r.charAt(15&n),16)
t.push(i)}return t}(function(e,t){e[t>>5]|=128<<t%32,e[n(t)-1]=t
let o=1732584193,u=-271733879,c=-1732584194,l=271733878
for(let n=0;n<e.length;n+=16){const t=o,d=u,p=c,h=l
o=i(o,u,c,l,e[n],7,-680876936),l=i(l,o,u,c,e[n+1],12,-389564586),c=i(c,l,o,u,e[n+2],17,606105819),u=i(u,c,l,o,e[n+3],22,-1044525330),o=i(o,u,c,l,e[n+4],7,-176418897),l=i(l,o,u,c,e[n+5],12,1200080426),c=i(c,l,o,u,e[n+6],17,-1473231341),u=i(u,c,l,o,e[n+7],22,-45705983),o=i(o,u,c,l,e[n+8],7,1770035416),l=i(l,o,u,c,e[n+9],12,-1958414417),c=i(c,l,o,u,e[n+10],17,-42063),u=i(u,c,l,o,e[n+11],22,-1990404162),o=i(o,u,c,l,e[n+12],7,1804603682),l=i(l,o,u,c,e[n+13],12,-40341101),c=i(c,l,o,u,e[n+14],17,-1502002290),u=i(u,c,l,o,e[n+15],22,1236535329),o=a(o,u,c,l,e[n+1],5,-165796510),l=a(l,o,u,c,e[n+6],9,-1069501632),c=a(c,l,o,u,e[n+11],14,643717713),u=a(u,c,l,o,e[n],20,-373897302),o=a(o,u,c,l,e[n+5],5,-701558691),l=a(l,o,u,c,e[n+10],9,38016083),c=a(c,l,o,u,e[n+15],14,-660478335),u=a(u,c,l,o,e[n+4],20,-405537848),o=a(o,u,c,l,e[n+9],5,568446438),l=a(l,o,u,c,e[n+14],9,-1019803690),c=a(c,l,o,u,e[n+3],14,-187363961),u=a(u,c,l,o,e[n+8],20,1163531501),o=a(o,u,c,l,e[n+13],5,-1444681467),l=a(l,o,u,c,e[n+2],9,-51403784),c=a(c,l,o,u,e[n+7],14,1735328473),u=a(u,c,l,o,e[n+12],20,-1926607734),o=f(o,u,c,l,e[n+5],4,-378558),l=f(l,o,u,c,e[n+8],11,-2022574463),c=f(c,l,o,u,e[n+11],16,1839030562),u=f(u,c,l,o,e[n+14],23,-35309556),o=f(o,u,c,l,e[n+1],4,-1530992060),l=f(l,o,u,c,e[n+4],11,1272893353),c=f(c,l,o,u,e[n+7],16,-155497632),u=f(u,c,l,o,e[n+10],23,-1094730640),o=f(o,u,c,l,e[n+13],4,681279174),l=f(l,o,u,c,e[n],11,-358537222),c=f(c,l,o,u,e[n+3],16,-722521979),u=f(u,c,l,o,e[n+6],23,76029189),o=f(o,u,c,l,e[n+9],4,-640364487),l=f(l,o,u,c,e[n+12],11,-421815835),c=f(c,l,o,u,e[n+15],16,530742520),u=f(u,c,l,o,e[n+2],23,-995338651),o=s(o,u,c,l,e[n],6,-198630844),l=s(l,o,u,c,e[n+7],10,1126891415),c=s(c,l,o,u,e[n+14],15,-1416354905),u=s(u,c,l,o,e[n+5],21,-57434055),o=s(o,u,c,l,e[n+12],6,1700485571),l=s(l,o,u,c,e[n+3],10,-1894986606),c=s(c,l,o,u,e[n+10],15,-1051523),u=s(u,c,l,o,e[n+1],21,-2054922799),o=s(o,u,c,l,e[n+8],6,1873313359),l=s(l,o,u,c,e[n+15],10,-30611744),c=s(c,l,o,u,e[n+6],15,-1560198380),u=s(u,c,l,o,e[n+13],21,1309151649),o=s(o,u,c,l,e[n+4],6,-145523070),l=s(l,o,u,c,e[n+11],10,-1120210379),c=s(c,l,o,u,e[n+2],15,718787259),u=s(u,c,l,o,e[n+9],21,-343485551),o=r(o,t),u=r(u,d),c=r(c,p),l=r(l,h)}return[o,u,c,l]}(function(e){if(0===e.length)return[]
const t=8*e.length,r=new Uint32Array(n(t))
for(let n=0;n<t;n+=8)r[n>>5]|=(255&e[n/8])<<n%32
return r}(e),8*e.length))}},788:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var n={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)}
t.default=n},996:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,t.default="00000000-0000-0000-0000-000000000000"},729:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var r,o=(r=n(163))&&r.__esModule?r:{default:r}
t.default=function(e){if(!(0,o.default)(e))throw TypeError("Invalid UUID")
let t
const n=new Uint8Array(16)
return n[0]=(t=parseInt(e.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(e.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(e.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(e.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n}},300:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,t.default=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i},402:(e,t)=>{let n
Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){if(!n&&(n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!n))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported")
return n(r)}
const r=new Uint8Array(16)},702:(e,t)=>{function n(e,t,n,r){switch(e){case 0:return t&n^~t&r
case 1:case 3:return t^n^r
case 2:return t&n^t&r^n&r}}function r(e,t){return e<<t|e>>>32-t}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,t.default=function(e){const t=[1518500249,1859775393,2400959708,3395469782],o=[1732584193,4023233417,2562383102,271733878,3285377520]
if("string"==typeof e){const t=unescape(encodeURIComponent(e))
e=[]
for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n))}else Array.isArray(e)||(e=Array.prototype.slice.call(e))
e.push(128)
const i=e.length/4+2,a=Math.ceil(i/16),f=new Array(a)
for(let n=0;n<a;++n){const t=new Uint32Array(16)
for(let r=0;r<16;++r)t[r]=e[64*n+4*r]<<24|e[64*n+4*r+1]<<16|e[64*n+4*r+2]<<8|e[64*n+4*r+3]
f[n]=t}f[a-1][14]=8*(e.length-1)/Math.pow(2,32),f[a-1][14]=Math.floor(f[a-1][14]),f[a-1][15]=8*(e.length-1)&4294967295
for(let s=0;s<a;++s){const e=new Uint32Array(80)
for(let t=0;t<16;++t)e[t]=f[s][t]
for(let t=16;t<80;++t)e[t]=r(e[t-3]^e[t-8]^e[t-14]^e[t-16],1)
let i=o[0],a=o[1],u=o[2],c=o[3],l=o[4]
for(let o=0;o<80;++o){const f=Math.floor(o/20),s=r(i,5)+n(f,a,u,c)+l+t[f]+e[o]>>>0
l=c,c=u,u=r(a,30)>>>0,a=i,i=s}o[0]=o[0]+i>>>0,o[1]=o[1]+a>>>0,o[2]=o[2]+u>>>0,o[3]=o[3]+c>>>0,o[4]=o[4]+l>>>0}return[o[0]>>24&255,o[0]>>16&255,o[0]>>8&255,255&o[0],o[1]>>24&255,o[1]>>16&255,o[1]>>8&255,255&o[1],o[2]>>24&255,o[2]>>16&255,o[2]>>8&255,255&o[2],o[3]>>24&255,o[3]>>16&255,o[3]>>8&255,255&o[3],o[4]>>24&255,o[4]>>16&255,o[4]>>8&255,255&o[4]]}},982:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,t.unsafeStringify=a
var r,o=(r=n(163))&&r.__esModule?r:{default:r}
const i=[]
for(let f=0;f<256;++f)i.push((f+256).toString(16).slice(1))
function a(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0
return(i[e[t+0]]+i[e[t+1]]+i[e[t+2]]+i[e[t+3]]+"-"+i[e[t+4]]+i[e[t+5]]+"-"+i[e[t+6]]+i[e[t+7]]+"-"+i[e[t+8]]+i[e[t+9]]+"-"+i[e[t+10]]+i[e[t+11]]+i[e[t+12]]+i[e[t+13]]+i[e[t+14]]+i[e[t+15]]).toLowerCase()}t.default=function(e){const t=a(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:0)
if(!(0,o.default)(t))throw TypeError("Stringified UUID is invalid")
return t}},999:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var r,o=(r=n(402))&&r.__esModule?r:{default:r},i=n(982)
let a,f,s=0,u=0
t.default=function(e,t,n){let r=t&&n||0
const c=t||new Array(16)
let l=(e=e||{}).node||a,d=void 0!==e.clockseq?e.clockseq:f
if(null==l||null==d){const t=e.random||(e.rng||o.default)()
null==l&&(l=a=[1|t[0],t[1],t[2],t[3],t[4],t[5]]),null==d&&(d=f=16383&(t[6]<<8|t[7]))}let p=void 0!==e.msecs?e.msecs:Date.now(),h=void 0!==e.nsecs?e.nsecs:u+1
const v=p-s+(h-u)/1e4
if(v<0&&void 0===e.clockseq&&(d=d+1&16383),(v<0||p>s)&&void 0===e.nsecs&&(h=0),h>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec")
s=p,u=h,f=d,p+=122192928e5
const m=(1e4*(268435455&p)+h)%4294967296
c[r++]=m>>>24&255,c[r++]=m>>>16&255,c[r++]=m>>>8&255,c[r++]=255&m
const y=p/4294967296*1e4&268435455
c[r++]=y>>>8&255,c[r++]=255&y,c[r++]=y>>>24&15|16,c[r++]=y>>>16&255,c[r++]=d>>>8|128,c[r++]=255&d
for(let o=0;o<6;++o)c[r+o]=l[o]
return t||(0,i.unsafeStringify)(c)}},231:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var r=i(n(125)),o=i(n(792))
function i(e){return e&&e.__esModule?e:{default:e}}var a=(0,r.default)("v3",48,o.default)
t.default=a},125:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.URL=t.DNS=void 0,t.default=function(e,t,n){function r(e,r,a,f){var s
if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e))
const t=[]
for(let n=0;n<e.length;++n)t.push(e.charCodeAt(n))
return t}(e)),"string"==typeof r&&(r=(0,i.default)(r)),16!==(null===(s=r)||void 0===s?void 0:s.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)")
let u=new Uint8Array(16+e.length)
if(u.set(r),u.set(e,r.length),u=n(u),u[6]=15&u[6]|t,u[8]=63&u[8]|128,a){f=f||0
for(let e=0;e<16;++e)a[f+e]=u[e]
return a}return(0,o.unsafeStringify)(u)}try{r.name=e}catch(e){}return r.DNS=a,r.URL=f,r}
var r,o=n(982),i=(r=n(729))&&r.__esModule?r:{default:r}
const a="6ba7b810-9dad-11d1-80b4-00c04fd430c8"
t.DNS=a
const f="6ba7b811-9dad-11d1-80b4-00c04fd430c8"
t.URL=f},647:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var r=a(n(788)),o=a(n(402)),i=n(982)
function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){if(r.default.randomUUID&&!t&&!e)return r.default.randomUUID()
const a=(e=e||{}).random||(e.rng||o.default)()
if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t){n=n||0
for(let e=0;e<16;++e)t[n+e]=a[e]
return t}return(0,i.unsafeStringify)(a)}},25:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var r=i(n(125)),o=i(n(702))
function i(e){return e&&e.__esModule?e:{default:e}}var a=(0,r.default)("v5",80,o.default)
t.default=a},163:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var r,o=(r=n(300))&&r.__esModule?r:{default:r}
t.default=function(e){return"string"==typeof e&&o.default.test(e)}},928:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var r,o=(r=n(163))&&r.__esModule?r:{default:r}
t.default=function(e){if(!(0,o.default)(e))throw TypeError("Invalid UUID")
return parseInt(e.slice(14,15),16)}}}])
