(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let $t=class extends Event{constructor(t,e,i){super("context-request",{bubbles:!0,composed:!0}),this.context=t,this.callback=e,this.subscribe=i??!1}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let st=class{constructor(t,e,i,s){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(n,o)=>{this.unsubscribe&&(this.unsubscribe!==o&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=n,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(n,o)),this.unsubscribe=o},this.host=t,e.context!==void 0){const n=e;this.context=n.context,this.callback=n.callback,this.subscribe=n.subscribe??!1}else this.context=e,this.callback=i,this.subscribe=s??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new $t(this.context,this.t,this.subscribe))}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let St=class{get value(){return this.o}set value(t){this.setValue(t)}setValue(t,e=!1){const i=e||!Object.is(t,this.o);this.o=t,i&&this.updateObservers()}constructor(t){this.subscriptions=new Map,this.updateObservers=()=>{for(const[e,{disposer:i}]of this.subscriptions)e(this.o,i)},t!==void 0&&(this.value=t)}addCallback(t,e,i){if(!i)return void t(this.value);this.subscriptions.has(t)||this.subscriptions.set(t,{disposer:()=>{this.subscriptions.delete(t)},consumerHost:e});const{disposer:s}=this.subscriptions.get(t);t(this.value,s)}clearCallbacks(){this.subscriptions.clear()}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Pt=class extends Event{constructor(t){super("context-provider",{bubbles:!0,composed:!0}),this.context=t}},it=class extends St{constructor(t,e,i){var s,n;super(e.context!==void 0?e.initialValue:i),this.onContextRequest=o=>{const h=o.composedPath()[0];o.context===this.context&&h!==this.host&&(o.stopPropagation(),this.addCallback(o.callback,h,o.subscribe))},this.onProviderRequest=o=>{const h=o.composedPath()[0];if(o.context!==this.context||h===this.host)return;const a=new Set;for(const[l,{consumerHost:d}]of this.subscriptions)a.has(l)||(a.add(l),d.dispatchEvent(new $t(this.context,l,!0)));o.stopPropagation()},this.host=t,e.context!==void 0?this.context=e.context:this.context=e,this.attachListeners(),(n=(s=this.host).addController)==null||n.call(s,this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new Pt(this.context))}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ct({context:r}){return(t,e)=>{const i=new WeakMap;if(typeof e=="object")return e.addInitializer(function(){i.set(this,new it(this,{context:r}))}),{get(){return t.get.call(this)},set(s){var n;return(n=i.get(this))==null||n.setValue(s),t.set.call(this,s)},init(s){var n;return(n=i.get(this))==null||n.setValue(s),s}};{t.constructor.addInitializer(o=>{i.set(o,new it(o,{context:r}))});const s=Object.getOwnPropertyDescriptor(t,e);let n;if(s===void 0){const o=new WeakMap;n={get:function(){return o.get(this)},set:function(h){i.get(this).setValue(h),o.set(this,h)},configurable:!0,enumerable:!0}}else{const o=s.set;n={...s,set:function(h){i.get(this).setValue(h),o==null||o.call(this,h)}}}return void Object.defineProperty(t,e,n)}}}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Z({context:r,subscribe:t}){return(e,i)=>{typeof i=="object"?i.addInitializer(function(){new st(this,{context:r,callback:s=>{this[i.name]=s},subscribe:t})}):e.constructor.addInitializer(s=>{new st(s,{context:r,callback:n=>{s[i]=n},subscribe:t})})}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=globalThis,Q=M.ShadowRoot&&(M.ShadyCSS===void 0||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol(),rt=new WeakMap;let ft=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==X)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Q&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=rt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&rt.set(e,t))}return t}toString(){return this.cssText}};const Ot=r=>new ft(typeof r=="string"?r:r+"",void 0,X),Y=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((i,s,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1],r[0]);return new ft(e,r,X)},Dt=(r,t)=>{if(Q)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=M.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}},nt=Q?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Ot(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ut,defineProperty:Tt,getOwnPropertyDescriptor:Rt,getOwnPropertyNames:jt,getOwnPropertySymbols:Mt,getPrototypeOf:Ht}=Object,g=globalThis,ot=g.trustedTypes,Nt=ot?ot.emptyScript:"",B=g.reactiveElementPolyfillSupport,P=(r,t)=>r,H={toAttribute(r,t){switch(t){case Boolean:r=r?Nt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},tt=(r,t)=>!Ut(r,t),at={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:tt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),g.litPropertyMetadata??(g.litPropertyMetadata=new WeakMap);class A extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=at){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Tt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=Rt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return s==null?void 0:s.call(this)},set(o){const h=s==null?void 0:s.call(this);n.call(this,o),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??at}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;const t=Ht(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){const e=this.properties,i=[...jt(e),...Mt(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(nt(s))}else t!==void 0&&e.push(nt(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Dt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){var n;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const o=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:H).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){var n;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const o=i.getPropertyOptions(s),h=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:H;this._$Em=s,this[s]=h.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??(i=this.constructor.getPropertyOptions(t)),!(i.hasChanged??tt)(this[t],e))return;this.P(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(e)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[P("elementProperties")]=new Map,A[P("finalized")]=new Map,B==null||B({ReactiveElement:A}),(g.reactiveElementVersions??(g.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis,N=C.trustedTypes,ht=N?N.createPolicy("lit-html",{createHTML:r=>r}):void 0,yt="$lit$",y=`lit$${(Math.random()+"").slice(9)}$`,gt="?"+y,Lt=`<${gt}>`,v=document,O=()=>v.createComment(""),D=r=>r===null||typeof r!="object"&&typeof r!="function",bt=Array.isArray,It=r=>bt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",J=`[ 	
\f\r]`,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ct=/-->/g,lt=/>/g,b=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),dt=/'/g,ut=/"/g,_t=/^(?:script|style|textarea|title)$/i,kt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),p=kt(1),E=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),pt=new WeakMap,_=v.createTreeWalker(v,129);function vt(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ht!==void 0?ht.createHTML(t):t}const Vt=(r,t)=>{const e=r.length-1,i=[];let s,n=t===2?"<svg>":"",o=S;for(let h=0;h<e;h++){const a=r[h];let l,d,c=-1,m=0;for(;m<a.length&&(o.lastIndex=m,d=o.exec(a),d!==null);)m=o.lastIndex,o===S?d[1]==="!--"?o=ct:d[1]!==void 0?o=lt:d[2]!==void 0?(_t.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=b):d[3]!==void 0&&(o=b):o===b?d[0]===">"?(o=s??S,c=-1):d[1]===void 0?c=-2:(c=o.lastIndex-d[2].length,l=d[1],o=d[3]===void 0?b:d[3]==='"'?ut:dt):o===ut||o===dt?o=b:o===ct||o===lt?o=S:(o=b,s=void 0);const f=o===b&&r[h+1].startsWith("/>")?" ":"";n+=o===S?a+Lt:c>=0?(i.push(l),a.slice(0,c)+yt+a.slice(c)+y+f):a+y+(c===-2?h:f)}return[vt(r,n+(r[e]||"<?>")+(t===2?"</svg>":"")),i]};class U{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const h=t.length-1,a=this.parts,[l,d]=Vt(t,e);if(this.el=U.createElement(l,i),_.currentNode=this.el.content,e===2){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=_.nextNode())!==null&&a.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(yt)){const m=d[o++],f=s.getAttribute(c).split(y),j=/([.?@])?(.*)/.exec(m);a.push({type:1,index:n,name:j[2],strings:f,ctor:j[1]==="."?qt:j[1]==="?"?Bt:j[1]==="@"?Jt:k}),s.removeAttribute(c)}else c.startsWith(y)&&(a.push({type:6,index:n}),s.removeAttribute(c));if(_t.test(s.tagName)){const c=s.textContent.split(y),m=c.length-1;if(m>0){s.textContent=N?N.emptyScript:"";for(let f=0;f<m;f++)s.append(c[f],O()),_.nextNode(),a.push({type:2,index:++n});s.append(c[m],O())}}}else if(s.nodeType===8)if(s.data===gt)a.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf(y,c+1))!==-1;)a.push({type:7,index:n}),c+=y.length-1}n++}}static createElement(t,e){const i=v.createElement("template");return i.innerHTML=t,i}}function w(r,t,e=r,i){var o,h;if(t===E)return t;let s=i!==void 0?(o=e._$Co)==null?void 0:o[i]:e._$Cl;const n=D(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((h=s==null?void 0:s._$AO)==null||h.call(s,!1),n===void 0?s=void 0:(s=new n(r),s._$AT(r,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=w(r,s._$AS(r,t.values),s,i)),t}class zt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??v).importNode(e,!0);_.currentNode=s;let n=_.nextNode(),o=0,h=0,a=i[0];for(;a!==void 0;){if(o===a.index){let l;a.type===2?l=new T(n,n.nextSibling,this,t):a.type===1?l=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(l=new Wt(n,this,t)),this._$AV.push(l),a=i[++h]}o!==(a==null?void 0:a.index)&&(n=_.nextNode(),o++)}return _.currentNode=v,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class T{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),D(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):It(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==u&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(v.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=U.createElement(vt(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(e);else{const o=new zt(s,this),h=o.u(this.options);o.p(e),this.T(h),this._$AH=o}}_$AC(t){let e=pt.get(t.strings);return e===void 0&&pt.set(t.strings,e=new U(t)),e}k(t){bt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new T(this.S(O()),this.S(O()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(n===void 0)t=w(this,t,e,0),o=!D(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{const h=t;let a,l;for(t=n[0],a=0;a<n.length-1;a++)l=w(this,h[i+a],e,a),l===E&&(l=this._$AH[a]),o||(o=!D(l)||l!==this._$AH[a]),l===u?t=u:t!==u&&(t+=(l??"")+n[a+1]),this._$AH[a]=l}o&&!s&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class qt extends k{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}class Bt extends k{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}}class Jt extends k{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??u)===E)return;const i=this._$AH,s=t===u&&i!==u||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==u&&(i===u||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Wt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}}const W=C.litHtmlPolyfillSupport;W==null||W(U,T),(C.litHtmlVersions??(C.litHtmlVersions=[])).push("3.1.2");const Gt=(r,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const n=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new T(t.insertBefore(O(),n),n,void 0,e??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class $ extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Gt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return E}}var mt;$._$litElement$=!0,$.finalized=!0,(mt=globalThis.litElementHydrateSupport)==null||mt.call(globalThis,{LitElement:$});const G=globalThis.litElementPolyfillSupport;G==null||G({LitElement:$});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Kt={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:tt},Ft=(r=Kt,t,e)=>{const{kind:i,metadata:s}=e;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),n.set(e.name,r),i==="accessor"){const{name:o}=e;return{set(h){const a=t.get.call(this);t.set.call(this,h),this.requestUpdate(o,a,r)},init(h){return h!==void 0&&this.P(o,void 0,r),h}}}if(i==="setter"){const{name:o}=e;return function(h){const a=this[o];t.call(this,h),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+i)};function et(r){return(t,e)=>typeof e=="object"?Ft(r,t,e):((i,s,n)=>{const o=s.hasOwnProperty(n);return s.constructor.createProperty(n,o?{...i,wrapped:!0}:i),o?Object.getOwnPropertyDescriptor(s,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function V(r){return et({...r,state:!0,attribute:!1})}var Zt=Object.defineProperty,Qt=Object.getOwnPropertyDescriptor,z=(r,t,e,i)=>{for(var s=i>1?void 0:i?Qt(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&Zt(t,e,s),s};let x=class extends ${constructor(){super(),this.myStatus="",this.numberValue=0,this.tags=[],this.numberValue=0}render(){return p`
      <div class="container">
        <div>My Child Works!</div>
        <input
          autocomplete="off"
          style="width: 100%"
          @input="${this._handleInput}"
          name="name"
          type="text"
          placeholder="update me and i will update the name property"
        />
        <!--<input @change="${this._handleInputDate}" type="date" />-->
        <my-grandchild></my-grandchild>
        <button class="purple" @click="${this._handleButtonClick}">
          This is in the child. Click me to see magic happen
        </button>
        <button
          class="status-change ${this.myStatus.toUpperCase()==="REJECTED"?"success":"danger"}"
          @click="${this._handleStatusUpdate}"
        >
          ${this.myStatus.toUpperCase()==="REJECTED"?"APPROVE":"REJECT"}
        </button>
      </div>
    `}_createEvent(r,t){const e=new CustomEvent(r,{bubbles:!0,composed:!0,detail:t});this.dispatchEvent(e)}_handleStatusUpdate(){this._createEvent("status-update",this.myStatus.toUpperCase()==="REJECTED"?"APPROVED":"REJECTED")}_handleInput(){var r;this._createEvent("input-text-changed",((r=this.shadowRoot)==null?void 0:r.querySelector("input[type=text]")).value||"")}_handleInputDate(){var r;this._createEvent("input-date-changed",((r=this.shadowRoot)==null?void 0:r.querySelector("input[type=date]")).value||"")}_handleButtonClick(){this.tags.push(`Tag-${this.numberValue}`),this.numberValue++,this._createEvent("button-pushed",this.tags)}};x.styles=[Y`
      .container {
        display: flex;
        gap: 1rem;
        flex-direction: column;
      }
      button {
        border-radius: 10px;
        padding: 1rem;
        cursor: pointer;
        color: #fff;
      }

      .purple {
        background: rebeccapurple;
      }

      .success {
        background: green;
      }

      .danger {
        background: tomato;
      }
    `];z([et({type:String,attribute:"my-status"})],x.prototype,"myStatus",2);z([V()],x.prototype,"numberValue",2);z([V()],x.prototype,"tags",2);x=z([R("my-child")],x);const q=Symbol("my-context");var Xt=Object.defineProperty,Yt=Object.getOwnPropertyDescriptor,At=(r,t,e,i)=>{for(var s=i>1?void 0:i?Yt(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&Xt(t,e,s),s};let K=class extends ${constructor(){super(...arguments),this.myData={}}render(){var r;return p`
      <div>Test my grandchild</div>
      <div style="color: rebeccapurple; font-weight: 600;">
        This is in the grand child component btw
        <!--<code>${JSON.stringify(this.myData)}</code>-->
        ${(r=this.myData)!=null&&r.name?p`
              <h3>Hello, my name is ${this.myData.name}</h3>
            `:p``}
      </div>
      <slot></slot>
      <my-great-grandchild></my-great-grandchild>
    `}};At([Z({context:q,subscribe:!0}),V()],K.prototype,"myData",2);K=At([R("my-grandchild")],K);var te=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,Et=(r,t,e,i)=>{for(var s=i>1?void 0:i?ee(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&te(t,e,s),s};let L=class extends ${constructor(){super(...arguments),this.myData={}}render(){return p`
      <code>${JSON.stringify(this.myData)}</code>
      <div class="wrapper">
        <h2>Metadata and Tagging</h2>
        <div class="wrapper-item">
          Status:
          <div
            class="status ${this.myData.metadata.status.toUpperCase()==="REJECTED"?"danger":"success"}"
          >
            ${this.myData.metadata.status.toUpperCase()}
          </div>
        </div>
        <div class="wrapper-item">
          <div class="tags">
            ${this.myData.tags.map(r=>p`
                  <div>${r}</div>
                `)}
          </div>
        </div>
      </div>
    `}};L.styles=[Y`
      .wrapper {
        display: grid;
        gap: 1rem;
        position: relative;
        margin-block: 2rem;
      }

      .wrapper-item {
        align-items: center;
        display: flex;
        flex-direction: row;
        gap: 1rem;
      }

      .tags {
        display: grid;
        gap: 0.5rem;
        grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
        width: 100%;
      }

      .tags div {
        background: lightgrey;
        border-radius: 10px;
        padding: 0.5rem;
      }

      .status {
        padding: 1rem;
        border: 1px solid lightgrey;
        border-radius: 15px;
        width: fit-content;
        font-weight: 800;
      }

      .danger {
        background: tomato;
        color: #fff;
      }

      .success {
        background: green;
        color: #fff;
      }
    `];Et([Z({context:q,subscribe:!0})],L.prototype,"myData",2);L=Et([R("my-great-grandchild")],L);var se=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,wt=(r,t,e,i)=>{for(var s=i>1?void 0:i?ie(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&se(t,e,s),s};let F=class extends ${constructor(){super(...arguments),this.myData={}}render(){return p`
      ${this.myData.metadata.date?p`<h2>Test my Great Grandchild</h2>
    The Status is: ${this.myData.metadata.status.toUpperCase()}
    <!--The Date set is: ${this.myData.metadata.date}-->
    </div>`:p`
            <!--<my-great-great-grandchild></my-great-great-grandchild>-->
          `}
    `}};wt([Z({context:q,subscribe:!0}),V()],F.prototype,"myData",2);F=wt([R("my-great-great-grandchild")],F);var re=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,xt=(r,t,e,i)=>{for(var s=i>1?void 0:i?ne(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(s=(i?o(t,e,s):o(s))||s);return i&&s&&re(t,e,s),s};let I=class extends ${constructor(){super(...arguments),this.myDataObject={name:"",title:"",description:"",metadata:{date:"",time:"",status:"REJECTED"},tags:[]}}connectedCallback(){var r,t,e,i;super.connectedCallback(),(r=this.shadowRoot)==null||r.addEventListener("button-pushed",s=>{this.myDataObject={...this.myDataObject,tags:s.detail}}),(t=this.shadowRoot)==null||t.addEventListener("input-text-changed",s=>{this.myDataObject={...this.myDataObject,name:s.detail}}),(e=this.shadowRoot)==null||e.addEventListener("input-date-changed",s=>{this.myDataObject={...this.myDataObject,metadata:{...this.myDataObject.metadata,date:s.detail}}}),(i=this.shadowRoot)==null||i.addEventListener("status-update",s=>{this.myDataObject={...this.myDataObject,metadata:{...this.myDataObject.metadata,status:s.detail}}})}render(){return p`
      <div class="container">
        <p>This Root works!</p>
        <p>I am only handling the data and the events</p>
        <code>${JSON.stringify(this.myDataObject)}</code>
        <my-child my-status="${this.myDataObject.metadata.status}"></my-child>
      </div>
    `}};I.styles=[Y`
      .container {
        display: flex;
        gap: 1rem;
        flex-direction: column;
        overflow-wrap: break-word;
      }
    `];xt([Ct({context:q}),et({attribute:!1})],I.prototype,"myDataObject",2);I=xt([R("my-element")],I);
