/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,t=Symbol(),i=new WeakMap;class r{constructor(e,i,r){if(this._$cssResult$=!0,r!==t)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=i}get styleSheet(){let t=this.o;const r=this.t;if(e&&void 0===t){const e=void 0!==r&&1===r.length;e&&(t=i.get(r)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(r,t))}return t}toString(){return this.cssText}}const n=(e,...i)=>{const n=1===e.length?e[0]:i.reduce(((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1]),e[0]);return new r(n,e,t)},s=e?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let i="";for(const t of e.cssRules)i+=t.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,t))(i)})(e):e;var o;const a=window.trustedTypes,l=a?a.emptyScript:"",d=window.reactiveElementPolyfillSupport,c={toAttribute(e,t){switch(t){case Boolean:e=e?l:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},h=(e,t)=>t!==e&&(t==t||e==e),u={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:h};class p extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;null!==(t=this.h)&&void 0!==t||(this.h=[]),this.h.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const r=this._$Ep(i,t);void 0!==r&&(this._$Ev.set(r,i),e.push(r))})),e}static createProperty(e,t=u){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const n=this[e];this[t]=r,this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||u}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),r=window.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=u){var r,n;const s=this.constructor._$Ep(e,i);if(void 0!==s&&!0===i.reflect){const o=(null!==(n=null===(r=i.converter)||void 0===r?void 0:r.toAttribute)&&void 0!==n?n:c.toAttribute)(t,i.type);this._$El=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$El=null}}_$AK(e,t){var i,r;const n=this.constructor,s=n._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=n.getPropertyOptions(s),o=e.converter,a=null!==(r=null!==(i=null==o?void 0:o.fromAttribute)&&void 0!==i?i:"function"==typeof o?o:null)&&void 0!==r?r:c.fromAttribute;this._$El=s,this[s]=a(t,e.type),this._$El=null}}requestUpdate(e,t,i){let r=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||h)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var v;p.finalized=!0,p.elementProperties=new Map,p.elementStyles=[],p.shadowRootOptions={mode:"open"},null==d||d({ReactiveElement:p}),(null!==(o=globalThis.reactiveElementVersions)&&void 0!==o?o:globalThis.reactiveElementVersions=[]).push("1.3.3");const f=globalThis.trustedTypes,m=f?f.createPolicy("lit-html",{createHTML:e=>e}):void 0,g=`lit$${(Math.random()+"").slice(9)}$`,y="?"+g,b=`<${y}>`,$=document,_=(e="")=>$.createComment(e),A=e=>null===e||"object"!=typeof e&&"function"!=typeof e,w=Array.isArray,x=e=>{var t;return w(e)||"function"==typeof(null===(t=e)||void 0===t?void 0:t[Symbol.iterator])},E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,S=/-->/g,k=/>/g,C=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,R=/'/g,U=/"/g,O=/^(?:script|style|textarea|title)$/i,P=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),T=P(1),j=(P(2),Symbol.for("lit-noChange")),I=Symbol.for("lit-nothing"),M=new WeakMap,N=$.createTreeWalker($,129,null,!1),D=(e,t)=>{const i=e.length-1,r=[];let n,s=2===t?"<svg>":"",o=E;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===E?"!--"===l[1]?o=S:void 0!==l[1]?o=k:void 0!==l[2]?(O.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=C):void 0!==l[3]&&(o=C):o===C?">"===l[0]?(o=null!=n?n:E,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?C:'"'===l[3]?U:R):o===U||o===R?o=C:o===S||o===k?o=E:(o=C,n=void 0);const h=o===C&&e[t+1].startsWith("/>")?" ":"";s+=o===E?i+b:d>=0?(r.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+g+h):i+g+(-2===d?(r.push(void 0),t):h)}const a=s+(e[i]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==m?m.createHTML(a):a,r]};class H{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let n=0,s=0;const o=e.length-1,a=this.parts,[l,d]=D(e,t);if(this.el=H.createElement(l,i),N.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(r=N.nextNode())&&a.length<o;){if(1===r.nodeType){if(r.hasAttributes()){const e=[];for(const t of r.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(g)){const i=d[s++];if(e.push(t),void 0!==i){const e=r.getAttribute(i.toLowerCase()+"$lit$").split(g),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?W:"?"===t[1]?K:"@"===t[1]?Q:V})}else a.push({type:6,index:n})}for(const t of e)r.removeAttribute(t)}if(O.test(r.tagName)){const e=r.textContent.split(g),t=e.length-1;if(t>0){r.textContent=f?f.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],_()),N.nextNode(),a.push({type:2,index:++n});r.append(e[t],_())}}}else if(8===r.nodeType)if(r.data===y)a.push({type:2,index:n});else{let e=-1;for(;-1!==(e=r.data.indexOf(g,e+1));)a.push({type:7,index:n}),e+=g.length-1}n++}}static createElement(e,t){const i=$.createElement("template");return i.innerHTML=e,i}}function z(e,t,i=e,r){var n,s,o,a;if(t===j)return t;let l=void 0!==r?null===(n=i._$Cl)||void 0===n?void 0:n[r]:i._$Cu;const d=A(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,r)),void 0!==r?(null!==(o=(a=i)._$Cl)&&void 0!==o?o:a._$Cl=[])[r]=l:i._$Cu=l),void 0!==l&&(t=z(e,l._$AS(e,t.values),l,r)),t}class L{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:r}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:$).importNode(i,!0);N.currentNode=n;let s=N.nextNode(),o=0,a=0,l=r[0];for(;void 0!==l;){if(o===l.index){let t;2===l.type?t=new B(s,s.nextSibling,this,e):1===l.type?t=new l.ctor(s,l.name,l.strings,this,e):6===l.type&&(t=new F(s,this,e)),this.v.push(t),l=r[++a]}o!==(null==l?void 0:l.index)&&(s=N.nextNode(),o++)}return n}m(e){let t=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class B{constructor(e,t,i,r){var n;this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cg=null===(n=null==r?void 0:r.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=z(this,e,t),A(e)?e===I||null==e||""===e?(this._$AH!==I&&this._$AR(),this._$AH=I):e!==this._$AH&&e!==j&&this.$(e):void 0!==e._$litType$?this.T(e):void 0!==e.nodeType?this.k(e):x(e)?this.S(e):this.$(e)}M(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.M(e))}$(e){this._$AH!==I&&A(this._$AH)?this._$AA.nextSibling.data=e:this.k($.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:r}=e,n="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=H.createElement(r.h,this.options)),r);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.m(i);else{const e=new L(n,this),t=e.p(this.options);e.m(i),this.k(t),this._$AH=e}}_$AC(e){let t=M.get(e.strings);return void 0===t&&M.set(e.strings,t=new H(e)),t}S(e){w(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const n of e)r===t.length?t.push(i=new B(this.M(_()),this.M(_()),this,this.options)):i=t[r],i._$AI(n),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cg=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class V{constructor(e,t,i,r,n){this.type=1,this._$AH=I,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const n=this.strings;let s=!1;if(void 0===n)e=z(this,e,t,0),s=!A(e)||e!==this._$AH&&e!==j,s&&(this._$AH=e);else{const r=e;let o,a;for(e=n[0],o=0;o<n.length-1;o++)a=z(this,r[i+o],t,o),a===j&&(a=this._$AH[o]),s||(s=!A(a)||a!==this._$AH[o]),a===I?e=I:e!==I&&(e+=(null!=a?a:"")+n[o+1]),this._$AH[o]=a}s&&!r&&this.C(e)}C(e){e===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class W extends V{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===I?void 0:e}}const q=f?f.emptyScript:"";class K extends V{constructor(){super(...arguments),this.type=4}C(e){e&&e!==I?this.element.setAttribute(this.name,q):this.element.removeAttribute(this.name)}}class Q extends V{constructor(e,t,i,r,n){super(e,t,i,r,n),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=z(this,e,t,0))&&void 0!==i?i:I)===j)return;const r=this._$AH,n=e===I&&r!==I||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==I&&(r===I||n);n&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class F{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){z(this,e)}}const G={L:"$lit$",P:g,V:y,I:1,N:D,R:L,j:x,D:z,H:B,F:V,O:K,W:Q,B:W,Z:F},X=window.litHtmlPolyfillSupport;var J,Y;null==X||X(H,B),(null!==(v=globalThis.litHtmlVersions)&&void 0!==v?v:globalThis.litHtmlVersions=[]).push("2.2.6");class Z extends p{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var r,n;const s=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:t;let o=s._$litPart$;if(void 0===o){const e=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;s._$litPart$=o=new B(t.insertBefore(_(),e),e,void 0,null!=i?i:{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return j}}Z.finalized=!0,Z._$litElement$=!0,null===(J=globalThis.litElementHydrateSupport)||void 0===J||J.call(globalThis,{LitElement:Z});const ee=globalThis.litElementPolyfillSupport;null==ee||ee({LitElement:Z}),(null!==(Y=globalThis.litElementVersions)&&void 0!==Y?Y:globalThis.litElementVersions=[]).push("3.2.1");const te=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:r}=t;return{kind:i,elements:r,finisher(t){window.customElements.define(e,t)}}})(e,t),ie=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function re(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):ie(e,t)}function ne(e){return re({...e,state:!0})}function se(e,t){return(({finisher:e,descriptor:t})=>(i,r)=>{var n;if(void 0===r){const r=null!==(n=i.originalKey)&&void 0!==n?n:i.key,s=null!=t?{kind:"method",placement:"prototype",key:r,descriptor:t(i.key)}:{...i,key:r};return null!=e&&(s.finisher=function(t){e(t,r)}),s}{const n=i.constructor;void 0!==t&&Object.defineProperty(i,r,t(r)),null==e||e(n,r)}})({descriptor:i=>{const r={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;r.get=function(){var i,r;return void 0===this[t]&&(this[t]=null!==(r=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==r?r:null),this[t]}}return r}})}var oe,ae;function*le(e,t){if(void 0!==e){let i=0;for(const r of e)yield t(r,i++)}}null===(oe=window.HTMLSlotElement)||void 0===oe||oe.prototype.assignedElements;class de{constructor(e){"name"in e&&(this.name=e.name),"source"in e&&(this.source=e.source),"format"in e&&(this.format=e.format),"size"in e&&(this.size=Number(e.size))}}!function(e){e[e.TEXTS=0]="TEXTS",e[e.ETREE=1]="ETREE",e[e.AUDIO=2]="AUDIO",e[e.MOVIES=3]="MOVIES",e[e.SOFTWARE=4]="SOFTWARE",e[e.IMAGE=5]="IMAGE",e[e.DATA=6]="DATA",e[e.WEB=7]="WEB",e[e.COLLECTION=8]="COLLECTION",e[e.ACCOUNT=9]="ACCOUNT"}(ae||(ae={}));class ce{constructor(e){"review_id"in e&&(this.id=e.review_id),"reviewer"in e&&(this.reviewer=e.reviewer),"reviewtitle"in e&&(this.title=e.reviewtitle),"reviewbody"in e&&(this.body=e.reviewbody),"reviewdate"in e&&(this.lastEditDate=new Date(e.reviewdate)),"createdate"in e&&(this.createdDate=new Date(e.createdate)),"stars"in e&&(this.stars=Number(e.stars),Number.isNaN(this.stars)&&(this.stars=0))}}class he{constructor(e){var t;if(this.files=[],this.reviews=[],"metadata"in e&&"object"==typeof e.metadata){const i=e.metadata;for(const e of["identifier","title","uploader"])this[e]=null!==(t=i[e])&&void 0!==t?t:null;"description"in i&&(this.description=i.description),"addeddate"in i&&(this.addedDate=new Date(i.addeddate)),"creator"in i&&(this.creator=i.creator),"date"in i&&(this.publicationDate=new Date(i.date)),"language"in i&&(this.language=i.language),"licenseurl"in i&&(this.licenseURL=i.licenseurl),"mediatype"in i&&(this.mediaType=function(e){const t=e.toUpperCase();return t in ae?ae[t]:null}(i.mediatype)),"subject"in i&&(Array.isArray(i.subject)?this.subjectTags=i.subject:this.subjectTags=i.subject.split(/;\s?/));const r=[...Object.entries(i)].filter((([e])=>!he.MAPPED_METADATA_KEYS.has(e)));this.otherMetadata=new Map(r)}if("files"in e&&Array.isArray(e.files))for(const t of e.files)try{this.files.push(new de(t))}catch(e){console.error("Invalid file data, skipping:",t)}if("reviews"in e&&Array.isArray(e.reviews))for(const t of e.reviews)try{this.reviews.push(new ce(t))}catch(e){console.error("Invalid review data, skipping:",t)}}toString(){return JSON.stringify(this,((e,t)=>t instanceof Map?[...t]:t),2)}}he.MAPPED_METADATA_KEYS=new Set(["identifier","addeddate","creator","date","description","language","licenseurl","mediatype","subject","title","uploader"]);class ue extends he{constructor(e){const t={};if("_id"in e&&(t.identifier=e._id),"_source"in e){const i=e._source;"title"in i&&(t.title=ue.normalizeArrayProperty(i.title)),"description"in i&&(t.description=i.description),"downloads"in i&&(t.downloads=String(ue.normalizeArrayProperty(i.downloads))),"collection"in i&&(t.collection=i.collection),"creatorSorter"in i&&(t.creator=i.creatorSorter),"publicdate"in i&&(t.date=ue.normalizeArrayProperty(i.publicdate)),"mediatype"in i&&(t.mediatype=ue.normalizeArrayProperty(i.mediatype)),"subjectSorter"in i&&(t.subject=i.subjectSorter)}super({metadata:t})}static normalizeArrayProperty(e){return Array.isArray(e)?e[0]:e}}var pe=function(e,t,i,r){return new(i||(i=Promise))((function(n,s){function o(e){try{l(r.next(e))}catch(e){s(e)}}function a(e){try{l(r.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(o,a)}l((r=r.apply(e,t||[])).next())}))};class ve{constructor(){}fetchItemMetadata(e){return pe(this,void 0,void 0,(function*(){const t=yield fetch(`https://archive.org/metadata/${encodeURIComponent(e)}`),i=yield t.json();return new he(i)}))}fetchRelatedItems(e){return pe(this,void 0,void 0,(function*(){const t=yield fetch(`https://be-api.us.archive.org/mds/v1/get_related/all/${encodeURIComponent(e)}`),i=yield t.json();let r;if("hits"in i){const e=i.hits;"hits"in e&&(r=e.hits)}if(Array.isArray(r))return r.map((e=>new ue(e)));throw new TypeError("Unexpected data from related items API:"+r)}))}itemImageURL(e){return e?`https://archive.org/services/img/${encodeURIComponent(e)}`:""}itemEmbedURL(e){return e?`https://archive.org/embed/${encodeURIComponent(e)}`:""}}var fe=function(e,t,i,r){var n,s=arguments.length,o=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o};let me=class extends Z{constructor(){super(...arguments),this._api=new ve}_changeItem(e){var t;return function(e,t,i,r){return new(i||(i=Promise))((function(n,s){function o(e){try{l(r.next(e))}catch(e){s(e)}}function a(e){try{l(r.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(o,a)}l((r=r.apply(e,t||[])).next())}))}(this,void 0,void 0,(function*(){this._header.classList.remove("full-height"),null===(t=this.renderRoot.querySelector("#predefined-searches"))||void 0===t||t.remove(),this._searchQuery=e,this._loading=!0;const[i,r]=yield Promise.all([this._api.fetchItemMetadata(e),this._api.fetchRelatedItems(e)]);i.identifier?(this._item=i,this._relatedItems=r):(this._item=null,this._relatedItems=[]),this._loading=!1}))}_handleSearchEvent(e){this._onSearch(e.detail.query)}_onSearch(e){e!==this._searchQuery&&e.length>0&&this._changeItem(e)}render(){var e;const t=T`
      <div id="predefined-searches">
        Or try one of these:
        ${le(["InformationM","MoonlightSonata_606","arcade_tetris"],(e=>T`<a href="#" @click=${()=>this._onSearch(e)}>${e}</a>`))}
      </div>
    `;let i;return i=this._loading?T`<loading-spinner id="loading"></loading-spinner>`:this._item?T`
        <item-details
          .item=${this._item}
          .relatedItems=${this._relatedItems}
          .embedURL=${this._api.itemEmbedURL(this._searchQuery)}
          @changeitem=${e=>this._onSearch(e.detail.identifier)}
        >
        </item-details>
      `:T`<div id="invalid-item-message">No item found with ID ${this._searchQuery}</div>`,T`
      <header class="full-height">
        <div id="search-container">
          <item-search-bar
            .value=${null!==(e=this._searchQuery)&&void 0!==e?e:""}
            @search=${this._handleSearchEvent}
          >
          </item-search-bar>
        </div>
        ${t}
      </header>
      <main>
        ${i}
      </main>
    `}};me.styles=n`
    :host {
      --header-height: 5rem;
      --search-height: 3rem;

      --opaque-sky-blue: #87ceeb;
      --transparent-sky-blue: #87ceebe8;
      --off-white: #f8f8f8;

      --system-font-stack: -apple-system, system-ui, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
    }

    header {
      position: sticky;
      top: 0;
      height: var(--header-height);

      display: flex;
      flex-direction: column;
      justify-content: center;
      
      background: var(--transparent-sky-blue);
      backdrop-filter: blur(4px);
      text-align: center;
      z-index: 1;

      transition: height 0.8s ease, background-color 0.8s ease;
    }

    /* If the user prefers reduced motion, make the header transition imperceptible */
    @media (prefers-reduced-motion) {
      header {
        transition-duration: 0.001s;
      }
    }

    .full-height {
      height: 100vh;
      background: var(--opaque-sky-blue);
    }

    #search-container {
      height: var(--search-height);
    }

    #predefined-searches {
      margin-top: 2rem;
      font-family: var(--system-font-stack);
    }

    #predefined-searches a {
      margin: 0 0.1875rem;
    }

    main {
      background: var(--off-white);
    }

    #loading,
    #invalid-item-message {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100vh;
      
      display: flex;
      justify-content: center;
      align-items: center;

      background: transparent;
      font-family: var(--system-font-stack);
      color: #888888;
    }
  `,fe([se("header")],me.prototype,"_header",void 0),fe([ne()],me.prototype,"_searchQuery",void 0),fe([ne()],me.prototype,"_item",void 0),fe([ne()],me.prototype,"_loading",void 0),me=fe([te("item-viewer")],me);var ge=function(e,t,i,r){var n,s=arguments.length,o=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o};let ye=class extends Z{constructor(){super(...arguments),this.value=""}_clear(){this._searchBar.value="",this._updateValue(),this._searchBar.focus()}_handleInputKeyup(e){"Enter"!==e.key&&13!==e.keyCode||this._handleSubmit()}_updateValue(){this.value=this._searchBar.value}_handleSubmit(){const e=this._searchBar.value.trim();e.length>0&&this.dispatchEvent(new CustomEvent("search",{detail:{query:e}}))}render(){var e;return T`
      <div id="container">
        <div id="search-outer">
          <div id="search-inner">
            <input
              id="search-bar"
              type="text" 
              placeholder="Enter an archive.org item ID (e.g., InformationM)"
              spellcheck="false"
              autofocus
              .value=${this.value}
              @keyup=${this._handleInputKeyup}
              @input=${this._updateValue}
            >
            <button
              id="clear-btn"
              aria-label="Clear search bar"
              ?hidden=${0==(null===(e=this.value)||void 0===e?void 0:e.length)}
              @click=${this._clear}>
            </button>
          </div>
          <button id="go-btn" aria-label="Search" @click=${this._handleSubmit}>Go!</button>
        </div>
      </div>
    `}};ye.styles=n`
    :host {
      --container-width: 50%;

      --search-padding-v: 0.25rem;
      --search-padding-h: 0.5rem;

      --search-font-size: 1.25rem;
      --clear-font-size: 1.5rem;
      
      --bg-color: #ffffff;
      --accent-color: #e0e0e0;
      --accent-color-darker: #d0d0d0;

      --go-btn-color: #dcdcdc;
      --go-btn-color-hover: #d0d0d0;
      --go-btn-color-pressed: #c8c8c8;

      --system-font-stack: -apple-system, system-ui, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
    }

    #container {
      position: relative;
      display: inline-block;
      height: 100%;
      width: var(--container-width);
    }

    #search-outer {
      position: relative;
      display: flex;
      flex-grow: 1;
      height: 100%;
      box-shadow: grey 0px 1px 2px 0px;
    }

    #search-inner {
      position: relative;
      flex-grow: 1;
      height: 100%;
    }
    
    #search-bar {
      height: 100%;
      width: 100%;

      padding: var(--search-padding-v) max(var(--search-padding-h), 3rem) var(--search-padding-v) var(--search-padding-h);
      border: 0;
      box-sizing: border-box;

      background: var(--bg-color);
      font-family: var(--system-font-stack);
      font-size: var(--search-font-size);
    }

    #clear-btn {
      position: absolute;
      top: 1px;
      right: 1px;
      height: calc(100% - 2px);
      aspect-ratio: 1; /* aspect-ratio is a fairly recent feature -- might be better to just hard-code a width for better browser support? */

      display: flex;
      justify-content: center;
      align-items: center;

      padding: 0.75rem;
      border: 0;
      border-radius: 50%;

      background: var(--bg-color);
      font-size: var(--clear-font-size);

      cursor: pointer;

      transition: background-color 0.2s ease;
    }

    #clear-btn[hidden] {
      display: none;
    }

    #clear-btn::before {
      /* U+2715 Multiplication X */
      content: "\u2715"
    }

    #clear-btn:hover,
    #clear-btn:focus {
      background: var(--accent-color);
    }

    #clear-btn:active {
      background: var(--accent-color-darker);
      transition-duration: 0.05s;
    }

    #go-btn {
      height: 100%;
      padding: 0 1rem;
      border: none;
      border-left: 1px solid darkgrey;
      border-radius: 0 4px 4px 0;

      background: var(--go-btn-color);
      font-size: 1rem;

      cursor: pointer;
    }

    #go-btn:hover,
    #go-btn:focus {
      background: var(--go-btn-color-hover);
    }

    #go-btn:active {
      background: var(--go-btn-color-pressed);
    }
  `,ge([se("#search-bar")],ye.prototype,"_searchBar",void 0),ge([re({type:String})],ye.prototype,"value",void 0),ye=ge([te("item-search-bar")],ye);const be=e=>(...t)=>({_$litDirective$:e,values:t});class $e{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const{H:_e}=G,Ae=()=>document.createComment(""),we=(e,t,i)=>{var r;const n=e._$AA.parentNode,s=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=n.insertBefore(Ae(),s),r=n.insertBefore(Ae(),s);i=new _e(t,r,e,e.options)}else{const t=i._$AB.nextSibling,o=i._$AM,a=o!==e;if(a){let t;null===(r=i._$AQ)||void 0===r||r.call(i,e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==o._$AU&&i._$AP(t)}if(t!==s||a){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;n.insertBefore(e,s),e=t}}}return i},xe=(e,t,i=e)=>(e._$AI(t,i),e),Ee={},Se=e=>{var t;null===(t=e._$AP)||void 0===t||t.call(e,!1,!0);let i=e._$AA;const r=e._$AB.nextSibling;for(;i!==r;){const e=i.nextSibling;i.remove(),i=e}},ke=(e,t,i)=>{const r=new Map;for(let n=t;n<=i;n++)r.set(e[n],n);return r},Ce=be(class extends $e{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let r;void 0===i?i=t:void 0!==t&&(r=t);const n=[],s=[];let o=0;for(const t of e)n[o]=r?r(t,o):o,s[o]=i(t,o),o++;return{values:s,keys:n}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,r]){var n;const s=e._$AH,{values:o,keys:a}=this.dt(t,i,r);if(!Array.isArray(s))return this.ut=a,o;const l=null!==(n=this.ut)&&void 0!==n?n:this.ut=[],d=[];let c,h,u=0,p=s.length-1,v=0,f=o.length-1;for(;u<=p&&v<=f;)if(null===s[u])u++;else if(null===s[p])p--;else if(l[u]===a[v])d[v]=xe(s[u],o[v]),u++,v++;else if(l[p]===a[f])d[f]=xe(s[p],o[f]),p--,f--;else if(l[u]===a[f])d[f]=xe(s[u],o[f]),we(e,d[f+1],s[u]),u++,f--;else if(l[p]===a[v])d[v]=xe(s[p],o[v]),we(e,s[u],s[p]),p--,v++;else if(void 0===c&&(c=ke(a,v,f),h=ke(l,u,p)),c.has(l[u]))if(c.has(l[p])){const t=h.get(a[v]),i=void 0!==t?s[t]:null;if(null===i){const t=we(e,s[u]);xe(t,o[v]),d[v]=t}else d[v]=xe(i,o[v]),we(e,s[u],i),s[t]=null;v++}else Se(s[p]),p--;else Se(s[u]),u++;for(;v<=f;){const t=we(e,d[f+1]);xe(t,o[v]),d[v++]=t}for(;u<=p;){const e=s[u++];null!==e&&Se(e)}return this.ut=a,((e,t=Ee)=>{e._$AH=t})(e,d),j}});function Re(e,t,i){return e?t():null==i?void 0:i()}var Ue=function(e,t,i,r){var n,s=arguments.length,o=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o};let Oe=class extends Z{_onRelatedItemClick(e){e.stopPropagation(),this.dispatchEvent(new CustomEvent(e.type,{detail:e.detail}))}render(){var e;return T`
      <div id="outer-container">
        <div id="left-container">
          ${Re(this.embedURL,(()=>T`
            <iframe
              src=${this.embedURL}
              id="item-embed"
              width="640"
              height="480"
              frameborder="0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowfullscreen
              @load=${()=>this._embedIframe.setAttribute("height",""+9*this._embedIframe.getBoundingClientRect().width/16)}
            >
          `))}
          <item-metadata-card id="metadata-container" .item=${this.item}></item-metadata-card>
          <h3>Reviews:</h3>
          <div id="reviews">
            ${le(null===(e=this.item)||void 0===e?void 0:e.reviews,(e=>T`<review-card .review=${e}></review-card>`))}
          </div>
        </div>
        <div id="right-container">
          <h3>Related items:</h3>
          ${Ce(this.relatedItems,(e=>e.identifier),(e=>T`<related-item-card .item=${e} @changeitem=${this._onRelatedItemClick}></related-item-card>`))}
        </div>
      </div>
    `}};Oe.styles=n`
    :host {
      /* System UI font stack */
      --system-font-stack: -apple-system, system-ui, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
    }

    h3 {
      margin: 0.125rem 0 0.5rem;
    }

    #outer-container {
      display: flex;
      flex-direction: row;
      justify-content: center;

      padding: 1rem 5%;

      font-family: var(--system-font-stack);
    }

    #left-container {
      display: flex;
      flex-direction: column;
      flex-basis: calc(100% * 2 / 3);
      max-width: 1280px;
    }

    #right-container {
      flex-basis: calc(100% / 3);
      max-width: 640px;
      
      margin-left: 1.5rem;
    }

    @media (max-width: 1200px) {
      #outer-container {
        flex-direction: column;
      }

      #left-container,
      #right-container {
        flex-basis: unset;
      }
    }

    #item-embed {
      width: 100%;
    }

    #metadata-container {
      margin-bottom: 1rem;
      padding: 0 0.375rem;
      border: 1px solid #d8d8d8;
    }

    #reviews {
      margin: 0 0 1rem;
      padding: 0;
    }
  `,Ue([se("#item-embed")],Oe.prototype,"_embedIframe",void 0),Ue([re({type:he})],Oe.prototype,"item",void 0),Ue([re({type:Array})],Oe.prototype,"relatedItems",void 0),Ue([re({type:String})],Oe.prototype,"embedURL",void 0),Oe=Ue([te("item-details")],Oe);let Pe=class extends Z{render(){return T`
      <div id="load-spinner-outer">
        <div id="load-spinner-inner">
        </div>
      </div>
    `}};Pe.styles=n`
    /* The outer div constantly spins 3x slower than the inner one, for a bit more visual variety */
    #load-spinner-outer {
      width: 75px;
      height: 75px;
      box-sizing: content-box;
      animation: spin 3.6s infinite linear
    }

    #load-spinner-inner {
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-top: 6px solid grey;
      border-radius: 50%;
      box-sizing: border-box;
      animation: spin 1.2s infinite cubic-bezier(0.36, -0.26, 0.21, 1.41);
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  `,Pe=function(e,t,i,r){var n,s=arguments.length,o=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o}([te("loading-spinner")],Pe);var Te=function(e,t,i,r){var n,s=arguments.length,o=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o};let je=class extends Z{constructor(){super(...arguments),this.tags=[],this.maxtags=1/0}render(){var e;return T`
      <ul id="tags-container">
        ${le(this.tags.slice(0,this.maxtags),(e=>T`<li class="tag">${e}</li>`))}<!--
     -->${Re((null===(e=this.tags)||void 0===e?void 0:e.length)>this.maxtags,(()=>T`<li class="more-tag">...</li>`))}
      </ul>
    `}};je.styles=n`
    #tags-container {
      display: inline;
      padding: 0;
    }

    .tag, .more-tag {
      display: inline-block;
      margin: 0 0.125rem;
      padding: 0.25rem;
      font-size: 0.75rem;
    }

    .tag {
      background: #d8d8d8;
    }
  `,Te([re({type:Array})],je.prototype,"tags",void 0),Te([re({type:Number})],je.prototype,"maxtags",void 0),je=Te([te("subject-tags")],je);var Ie=function(e,t,i,r){var n,s=arguments.length,o=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o};let Me=class extends Z{_onClick(e){var t;this.dispatchEvent(new CustomEvent("changeitem",{detail:{identifier:null===(t=this.item)||void 0===t?void 0:t.identifier}})),e.preventDefault()}render(){var e,t,i,r;return T`
      <a href="#" @click=${this._onClick}>
        <div id="related-item">
          <div id="img-container">
            <img
              src="https://archive.org/services/img/${null===(e=this.item)||void 0===e?void 0:e.identifier}"
              width="180"
              height="135">
          </div>
          <div id="related-item-metadata">
            <p id="related-item-title">${(null===(t=this.item)||void 0===t?void 0:t.title)||"Untitled"}</p>
            <p id="related-item-id">${null===(i=this.item)||void 0===i?void 0:i.identifier}</p>
            ${Re(null===(r=this.item)||void 0===r?void 0:r.subjectTags,(()=>{var e;return T`<subject-tags id="related-item-tags" .tags=${null===(e=this.item)||void 0===e?void 0:e.subjectTags} .maxtags=${6}></subject-tags>`}))}
          </div>
        </div>
      </a>
    `}};Me.styles=n`
    a {
      color: inherit;
      text-decoration: inherit;
    }

    #related-item {
      display: flex;
      margin: 0.5rem 0;

      background: #ffffff;
      box-shadow: #d8d8d8 1px 1px 3px 1px;

      cursor: pointer;
      transition: background-color 0.15s ease, box-shadow 0.15s ease;
    }

    #related-item:hover {
      background: #f8f8f8;
      box-shadow: #d8d8d8 2px 2px 3px 1px;
    }

    #img-container {
      margin-bottom: -4px;
    }

    #related-item img {
      object-fit: cover;
      object-position: top;
    }

    #related-item-metadata {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      padding: 0 0.375rem;
      overflow-x: hidden;
    }

    #related-item-title {
      margin: 0.125rem 0;
      font-weight: bold;

      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }

    #related-item-id {
      flex-grow: 1;
      margin: 0.25rem 0;
      color: darkgrey;
      font-size: smaller;
    }

    #related-item-tags {
      margin-bottom: 0.5rem;
    }
  `,Ie([re({type:ue})],Me.prototype,"item",void 0),Me=Ie([te("related-item-card")],Me);class Ne extends $e{constructor(e){if(super(e),this.it=I,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===I||null==e)return this.ft=void 0,this.it=e;if(e===j)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this.ft;this.it=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Ne.directiveName="unsafeHTML",Ne.resultType=1;const De=be(Ne);var He=function(e,t,i,r){var n,s=arguments.length,o=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o};let ze=class extends Z{render(){var e,t,i,r,n,s,o,a,l,d,c,h,u,p,v,f;const m=[].concat(null===(e=this.item)||void 0===e?void 0:e.description).join("<br>").replace(/\n/g,"<br>"),g=De(DOMPurify.sanitize(m)),y=null===(i=null===(t=this.item)||void 0===t?void 0:t.publicationDate)||void 0===i?void 0:i.getFullYear(),b=null===(n=null===(r=this.item)||void 0===r?void 0:r.addedDate)||void 0===n?void 0:n.toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),$=function(e){switch(e){case ae.TEXTS:return"📖";case ae.ETREE:return"🎸";case ae.AUDIO:return"🎧";case ae.MOVIES:return"🎞️";case ae.SOFTWARE:return"💿";case ae.IMAGE:return"🖼️";case ae.DATA:return"📊";case ae.WEB:return"🌐";case ae.COLLECTION:return"📂";case ae.ACCOUNT:return"👤";default:return""}}(null===(s=this.item)||void 0===s?void 0:s.mediaType),_=(null===(a=ae[null===(o=this.item)||void 0===o?void 0:o.mediaType])||void 0===a?void 0:a.toLowerCase())+" media";return T`
      <div id="title-container">
        ${Re(null===(l=this.item)||void 0===l?void 0:l.title,(()=>T`
            <h1 id="title">
              ${this.item.title} ${Re(y,(()=>`(${y})`))}
              <span aria-label=${_} title=${_}>${$}</span>
            </h1>
          `),(()=>{var e;return T`
            <h1 id="title">
              Untitled (${null===(e=this.item)||void 0===e?void 0:e.identifier}) 
              <span aria-label=${_} title=${_}>${$}</span>
            </h1>
          `}))}
        ${Re(null===(d=this.item)||void 0===d?void 0:d.subjectTags,(()=>T`<subject-tags .tags=${this.item.subjectTags} .maxtags=${6}></subject-tags>`))}
      </div>
      ${Re(null===(c=this.item)||void 0===c?void 0:c.creator,(()=>T`<h2>Created by: ${[].concat(this.item.creator).join(", ")}</h2>`))}
      <p id="description">${g}</p>
      <p class="subtle-metadata">
        Uploaded${Re(b,(()=>" "+b))} by ${Re(null===(h=this.item)||void 0===h?void 0:h.uploader,(()=>this.item.uploader),(()=>"Unknown User"))}
      </p>
      ${Re(null===(u=this.item)||void 0===u?void 0:u.language,(()=>T`<p class="subtle-metadata">Language: ${this.item.language}</p>`))}
      ${Re(null===(p=this.item)||void 0===p?void 0:p.licenseURL,(()=>T`
        <p class="subtle-metadata">
          License info: 
          <a href=${this.item.licenseURL} rel="noopener noreferrer" target="_blank">${this.item.licenseURL}</a>
        </p>
      `))}
      <div id="metadata-divider"></div>
      <div id="other-metadata">
        <h3>Other metadata:</h3>
        <dl>
          <dt>Identifier</dt>
          <dd>${null===(v=this.item)||void 0===v?void 0:v.identifier}</dd>
          ${le(null===(f=this.item)||void 0===f?void 0:f.otherMetadata,(([e,t])=>T`
            <dt>${e}</dt>
            <dd>${[].concat(t).join(", ")}</dd>
          `))}
        </dl>
      </div>
    `}};ze.styles=n`
    :host {
      background: #ffffff;
    }

    h1, h2 {
      margin: 0.25rem 0;
    }

    h3 {
      margin: 0.125rem 0 0.5rem;
    }

    a {
      color: inherit;
    }

    dl {
      display: flex;
      flex-wrap: wrap;
      width: 80%;
    }

    dt, dd {
      display: inline-block;
      margin: 1px 0;
    }

    dt {
      flex-basis: 25%;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    dd {
      flex-basis: 75%;
    }

    #title-container {
      display: flex;
      align-items: center;
    }

    #title {
      display: inline-block;
      margin-right: 1.5rem;
    }

    #title-container subject-tags {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .subtle-metadata {
      font-size: smaller;
      color: #808080;
      margin: 0;
    }

    .subtle-metadata:last-of-type {
      margin-bottom: 1rem;
    }
  `,He([re({type:he})],ze.prototype,"item",void 0),ze=He([te("item-metadata-card")],ze);var Le=function(e,t,i,r){var n,s=arguments.length,o=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o};let Be=class extends Z{render(){var e,t,i,r,n;return T`
      <div id="container">
        <p id="title">${null===(e=this.review)||void 0===e?void 0:e.title} <span id="stars">(${null===(t=this.review)||void 0===t?void 0:t.stars}/5 stars)</span></p>
        <p id="author">by ${null===(i=this.review)||void 0===i?void 0:i.reviewer}</p>
        <p id="body">${null===(n=null===(r=this.review)||void 0===r?void 0:r.body)||void 0===n?void 0:n.replace(/\n/g,"<br>")}</p>
      </div>
    `}};Be.styles=n`
    #container {
      display: block;
      margin: 0.5rem 0;
      padding: 4px;

      background: #ffffff;
      box-shadow: #d8d8d8 1px 1px 3px 1px;
      font-size: 0.875rem;
    }

    #title {
      margin: 0.25rem 0;

      font-weight: bold;
    }

    #stars {
      font-weight: normal;
    }

    #author {
      margin: 0.125rem 0;
      font-size: smaller;
      color: #808080;
    }
  `,Le([re({type:ce})],Be.prototype,"review",void 0),Be=Le([te("review-card")],Be)})();