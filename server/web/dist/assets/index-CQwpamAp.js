function Cv(t,e){for(var n=0;n<e.length;n++){const i=e[n];if(typeof i!="string"&&!Array.isArray(i)){for(const r in i)if(r!=="default"&&!(r in t)){const s=Object.getOwnPropertyDescriptor(i,r);s&&Object.defineProperty(t,r,s.get?s:{enumerable:!0,get:()=>i[r]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function bv(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Pv={exports:{}},Wu={},Lv={exports:{}},st={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Lo=Symbol.for("react.element"),Qy=Symbol.for("react.portal"),Jy=Symbol.for("react.fragment"),ex=Symbol.for("react.strict_mode"),tx=Symbol.for("react.profiler"),nx=Symbol.for("react.provider"),ix=Symbol.for("react.context"),rx=Symbol.for("react.forward_ref"),sx=Symbol.for("react.suspense"),ax=Symbol.for("react.memo"),ox=Symbol.for("react.lazy"),Fp=Symbol.iterator;function lx(t){return t===null||typeof t!="object"?null:(t=Fp&&t[Fp]||t["@@iterator"],typeof t=="function"?t:null)}var Dv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Uv=Object.assign,Iv={};function Ma(t,e,n){this.props=t,this.context=e,this.refs=Iv,this.updater=n||Dv}Ma.prototype.isReactComponent={};Ma.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ma.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Nv(){}Nv.prototype=Ma.prototype;function ph(t,e,n){this.props=t,this.context=e,this.refs=Iv,this.updater=n||Dv}var mh=ph.prototype=new Nv;mh.constructor=ph;Uv(mh,Ma.prototype);mh.isPureReactComponent=!0;var Op=Array.isArray,Fv=Object.prototype.hasOwnProperty,gh={current:null},Ov={key:!0,ref:!0,__self:!0,__source:!0};function kv(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)Fv.call(e,i)&&!Ov.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),u=0;u<o;u++)l[u]=arguments[u+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:Lo,type:t,key:s,ref:a,props:r,_owner:gh.current}}function ux(t,e){return{$$typeof:Lo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function vh(t){return typeof t=="object"&&t!==null&&t.$$typeof===Lo}function cx(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var kp=/\/+/g;function gc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?cx(""+t.key):e.toString(36)}function zl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case Lo:case Qy:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+gc(a,0):i,Op(r)?(n="",t!=null&&(n=t.replace(kp,"$&/")+"/"),zl(r,e,n,"",function(u){return u})):r!=null&&(vh(r)&&(r=ux(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(kp,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",Op(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+gc(s,o);a+=zl(s,e,n,l,r)}else if(l=lx(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+gc(s,o++),a+=zl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function Wo(t,e,n){if(t==null)return t;var i=[],r=0;return zl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function fx(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Sn={current:null},Bl={transition:null},dx={ReactCurrentDispatcher:Sn,ReactCurrentBatchConfig:Bl,ReactCurrentOwner:gh};function zv(){throw Error("act(...) is not supported in production builds of React.")}st.Children={map:Wo,forEach:function(t,e,n){Wo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Wo(t,function(){e++}),e},toArray:function(t){return Wo(t,function(e){return e})||[]},only:function(t){if(!vh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};st.Component=Ma;st.Fragment=Jy;st.Profiler=tx;st.PureComponent=ph;st.StrictMode=ex;st.Suspense=sx;st.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=dx;st.act=zv;st.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Uv({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=gh.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)Fv.call(e,l)&&!Ov.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var u=0;u<l;u++)o[u]=arguments[u+2];i.children=o}return{$$typeof:Lo,type:t.type,key:r,ref:s,props:i,_owner:a}};st.createContext=function(t){return t={$$typeof:ix,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:nx,_context:t},t.Consumer=t};st.createElement=kv;st.createFactory=function(t){var e=kv.bind(null,t);return e.type=t,e};st.createRef=function(){return{current:null}};st.forwardRef=function(t){return{$$typeof:rx,render:t}};st.isValidElement=vh;st.lazy=function(t){return{$$typeof:ox,_payload:{_status:-1,_result:t},_init:fx}};st.memo=function(t,e){return{$$typeof:ax,type:t,compare:e===void 0?null:e}};st.startTransition=function(t){var e=Bl.transition;Bl.transition={};try{t()}finally{Bl.transition=e}};st.unstable_act=zv;st.useCallback=function(t,e){return Sn.current.useCallback(t,e)};st.useContext=function(t){return Sn.current.useContext(t)};st.useDebugValue=function(){};st.useDeferredValue=function(t){return Sn.current.useDeferredValue(t)};st.useEffect=function(t,e){return Sn.current.useEffect(t,e)};st.useId=function(){return Sn.current.useId()};st.useImperativeHandle=function(t,e,n){return Sn.current.useImperativeHandle(t,e,n)};st.useInsertionEffect=function(t,e){return Sn.current.useInsertionEffect(t,e)};st.useLayoutEffect=function(t,e){return Sn.current.useLayoutEffect(t,e)};st.useMemo=function(t,e){return Sn.current.useMemo(t,e)};st.useReducer=function(t,e,n){return Sn.current.useReducer(t,e,n)};st.useRef=function(t){return Sn.current.useRef(t)};st.useState=function(t){return Sn.current.useState(t)};st.useSyncExternalStore=function(t,e,n){return Sn.current.useSyncExternalStore(t,e,n)};st.useTransition=function(){return Sn.current.useTransition()};st.version="18.3.1";Lv.exports=st;var $=Lv.exports;const hx=bv($),px=Cv({__proto__:null,default:hx},[$]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mx=$,gx=Symbol.for("react.element"),vx=Symbol.for("react.fragment"),_x=Object.prototype.hasOwnProperty,yx=mx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,xx={key:!0,ref:!0,__self:!0,__source:!0};function Bv(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)_x.call(e,i)&&!xx.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:gx,type:t,key:s,ref:a,props:r,_owner:yx.current}}Wu.Fragment=vx;Wu.jsx=Bv;Wu.jsxs=Bv;Pv.exports=Wu;var ie=Pv.exports,Hv={exports:{}},Hn={},Vv={exports:{}},Gv={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(P,J){var te=P.length;P.push(J);e:for(;0<te;){var le=te-1>>>1,Ee=P[le];if(0<r(Ee,J))P[le]=J,P[te]=Ee,te=le;else break e}}function n(P){return P.length===0?null:P[0]}function i(P){if(P.length===0)return null;var J=P[0],te=P.pop();if(te!==J){P[0]=te;e:for(var le=0,Ee=P.length,Ze=Ee>>>1;le<Ze;){var W=2*(le+1)-1,K=P[W],fe=W+1,de=P[fe];if(0>r(K,te))fe<Ee&&0>r(de,K)?(P[le]=de,P[fe]=te,le=fe):(P[le]=K,P[W]=te,le=W);else if(fe<Ee&&0>r(de,te))P[le]=de,P[fe]=te,le=fe;else break e}}return J}function r(P,J){var te=P.sortIndex-J.sortIndex;return te!==0?te:P.id-J.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],u=[],c=1,d=null,h=3,m=!1,_=!1,y=!1,p=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(P){for(var J=n(u);J!==null;){if(J.callback===null)i(u);else if(J.startTime<=P)i(u),J.sortIndex=J.expirationTime,e(l,J);else break;J=n(u)}}function M(P){if(y=!1,v(P),!_)if(n(l)!==null)_=!0,Y(R);else{var J=n(u);J!==null&&ne(M,J.startTime-P)}}function R(P,J){_=!1,y&&(y=!1,f(C),C=-1),m=!0;var te=h;try{for(v(J),d=n(l);d!==null&&(!(d.expirationTime>J)||P&&!E());){var le=d.callback;if(typeof le=="function"){d.callback=null,h=d.priorityLevel;var Ee=le(d.expirationTime<=J);J=t.unstable_now(),typeof Ee=="function"?d.callback=Ee:d===n(l)&&i(l),v(J)}else i(l);d=n(l)}if(d!==null)var Ze=!0;else{var W=n(u);W!==null&&ne(M,W.startTime-J),Ze=!1}return Ze}finally{d=null,h=te,m=!1}}var A=!1,S=null,C=-1,B=5,x=-1;function E(){return!(t.unstable_now()-x<B)}function z(){if(S!==null){var P=t.unstable_now();x=P;var J=!0;try{J=S(!0,P)}finally{J?V():(A=!1,S=null)}}else A=!1}var V;if(typeof g=="function")V=function(){g(z)};else if(typeof MessageChannel<"u"){var j=new MessageChannel,Z=j.port2;j.port1.onmessage=z,V=function(){Z.postMessage(null)}}else V=function(){p(z,0)};function Y(P){S=P,A||(A=!0,V())}function ne(P,J){C=p(function(){P(t.unstable_now())},J)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(P){P.callback=null},t.unstable_continueExecution=function(){_||m||(_=!0,Y(R))},t.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<P?Math.floor(1e3/P):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(P){switch(h){case 1:case 2:case 3:var J=3;break;default:J=h}var te=h;h=J;try{return P()}finally{h=te}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(P,J){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var te=h;h=P;try{return J()}finally{h=te}},t.unstable_scheduleCallback=function(P,J,te){var le=t.unstable_now();switch(typeof te=="object"&&te!==null?(te=te.delay,te=typeof te=="number"&&0<te?le+te:le):te=le,P){case 1:var Ee=-1;break;case 2:Ee=250;break;case 5:Ee=1073741823;break;case 4:Ee=1e4;break;default:Ee=5e3}return Ee=te+Ee,P={id:c++,callback:J,priorityLevel:P,startTime:te,expirationTime:Ee,sortIndex:-1},te>le?(P.sortIndex=te,e(u,P),n(l)===null&&P===n(u)&&(y?(f(C),C=-1):y=!0,ne(M,te-le))):(P.sortIndex=Ee,e(l,P),_||m||(_=!0,Y(R))),P},t.unstable_shouldYield=E,t.unstable_wrapCallback=function(P){var J=h;return function(){var te=h;h=J;try{return P.apply(this,arguments)}finally{h=te}}}})(Gv);Vv.exports=Gv;var Sx=Vv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mx=$,Bn=Sx;function oe(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Wv=new Set,uo={};function fs(t,e){la(t,e),la(t+"Capture",e)}function la(t,e){for(uo[t]=e,t=0;t<e.length;t++)Wv.add(e[t])}var Hi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Cf=Object.prototype.hasOwnProperty,Ex=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,zp={},Bp={};function wx(t){return Cf.call(Bp,t)?!0:Cf.call(zp,t)?!1:Ex.test(t)?Bp[t]=!0:(zp[t]=!0,!1)}function Tx(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Ax(t,e,n,i){if(e===null||typeof e>"u"||Tx(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Mn(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var rn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){rn[t]=new Mn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];rn[e]=new Mn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){rn[t]=new Mn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){rn[t]=new Mn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){rn[t]=new Mn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){rn[t]=new Mn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){rn[t]=new Mn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){rn[t]=new Mn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){rn[t]=new Mn(t,5,!1,t.toLowerCase(),null,!1,!1)});var _h=/[\-:]([a-z])/g;function yh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(_h,yh);rn[e]=new Mn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(_h,yh);rn[e]=new Mn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(_h,yh);rn[e]=new Mn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){rn[t]=new Mn(t,1,!1,t.toLowerCase(),null,!1,!1)});rn.xlinkHref=new Mn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){rn[t]=new Mn(t,1,!1,t.toLowerCase(),null,!0,!0)});function xh(t,e,n,i){var r=rn.hasOwnProperty(e)?rn[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Ax(e,n,r,i)&&(n=null),i||r===null?wx(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var $i=Mx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,jo=Symbol.for("react.element"),Fs=Symbol.for("react.portal"),Os=Symbol.for("react.fragment"),Sh=Symbol.for("react.strict_mode"),bf=Symbol.for("react.profiler"),jv=Symbol.for("react.provider"),Xv=Symbol.for("react.context"),Mh=Symbol.for("react.forward_ref"),Pf=Symbol.for("react.suspense"),Lf=Symbol.for("react.suspense_list"),Eh=Symbol.for("react.memo"),sr=Symbol.for("react.lazy"),Yv=Symbol.for("react.offscreen"),Hp=Symbol.iterator;function Ra(t){return t===null||typeof t!="object"?null:(t=Hp&&t[Hp]||t["@@iterator"],typeof t=="function"?t:null)}var It=Object.assign,vc;function Ya(t){if(vc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);vc=e&&e[1]||""}return`
`+vc+t}var _c=!1;function yc(t,e){if(!t||_c)return"";_c=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var i=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){i=u}t.call(e.prototype)}else{try{throw Error()}catch(u){i=u}t()}}catch(u){if(u&&i&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{_c=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ya(t):""}function Rx(t){switch(t.tag){case 5:return Ya(t.type);case 16:return Ya("Lazy");case 13:return Ya("Suspense");case 19:return Ya("SuspenseList");case 0:case 2:case 15:return t=yc(t.type,!1),t;case 11:return t=yc(t.type.render,!1),t;case 1:return t=yc(t.type,!0),t;default:return""}}function Df(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Os:return"Fragment";case Fs:return"Portal";case bf:return"Profiler";case Sh:return"StrictMode";case Pf:return"Suspense";case Lf:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Xv:return(t.displayName||"Context")+".Consumer";case jv:return(t._context.displayName||"Context")+".Provider";case Mh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Eh:return e=t.displayName||null,e!==null?e:Df(t.type)||"Memo";case sr:e=t._payload,t=t._init;try{return Df(t(e))}catch{}}return null}function Cx(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Df(e);case 8:return e===Sh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Tr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function $v(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function bx(t){var e=$v(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Xo(t){t._valueTracker||(t._valueTracker=bx(t))}function qv(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=$v(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function ou(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Uf(t,e){var n=e.checked;return It({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Vp(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Tr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Kv(t,e){e=e.checked,e!=null&&xh(t,"checked",e,!1)}function If(t,e){Kv(t,e);var n=Tr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Nf(t,e.type,n):e.hasOwnProperty("defaultValue")&&Nf(t,e.type,Tr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Gp(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Nf(t,e,n){(e!=="number"||ou(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var $a=Array.isArray;function Qs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Tr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Ff(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(oe(91));return It({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Wp(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(oe(92));if($a(n)){if(1<n.length)throw Error(oe(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Tr(n)}}function Zv(t,e){var n=Tr(e.value),i=Tr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function jp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Qv(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Of(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Qv(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Yo,Jv=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Yo=Yo||document.createElement("div"),Yo.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Yo.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function co(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ja={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Px=["Webkit","ms","Moz","O"];Object.keys(Ja).forEach(function(t){Px.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ja[e]=Ja[t]})});function e_(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Ja.hasOwnProperty(t)&&Ja[t]?(""+e).trim():e+"px"}function t_(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=e_(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var Lx=It({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function kf(t,e){if(e){if(Lx[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(oe(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(oe(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(oe(61))}if(e.style!=null&&typeof e.style!="object")throw Error(oe(62))}}function zf(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Bf=null;function wh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Hf=null,Js=null,ea=null;function Xp(t){if(t=Io(t)){if(typeof Hf!="function")throw Error(oe(280));var e=t.stateNode;e&&(e=qu(e),Hf(t.stateNode,t.type,e))}}function n_(t){Js?ea?ea.push(t):ea=[t]:Js=t}function i_(){if(Js){var t=Js,e=ea;if(ea=Js=null,Xp(t),e)for(t=0;t<e.length;t++)Xp(e[t])}}function r_(t,e){return t(e)}function s_(){}var xc=!1;function a_(t,e,n){if(xc)return t(e,n);xc=!0;try{return r_(t,e,n)}finally{xc=!1,(Js!==null||ea!==null)&&(s_(),i_())}}function fo(t,e){var n=t.stateNode;if(n===null)return null;var i=qu(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(oe(231,e,typeof n));return n}var Vf=!1;if(Hi)try{var Ca={};Object.defineProperty(Ca,"passive",{get:function(){Vf=!0}}),window.addEventListener("test",Ca,Ca),window.removeEventListener("test",Ca,Ca)}catch{Vf=!1}function Dx(t,e,n,i,r,s,a,o,l){var u=Array.prototype.slice.call(arguments,3);try{e.apply(n,u)}catch(c){this.onError(c)}}var eo=!1,lu=null,uu=!1,Gf=null,Ux={onError:function(t){eo=!0,lu=t}};function Ix(t,e,n,i,r,s,a,o,l){eo=!1,lu=null,Dx.apply(Ux,arguments)}function Nx(t,e,n,i,r,s,a,o,l){if(Ix.apply(this,arguments),eo){if(eo){var u=lu;eo=!1,lu=null}else throw Error(oe(198));uu||(uu=!0,Gf=u)}}function ds(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function o_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Yp(t){if(ds(t)!==t)throw Error(oe(188))}function Fx(t){var e=t.alternate;if(!e){if(e=ds(t),e===null)throw Error(oe(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Yp(r),t;if(s===i)return Yp(r),e;s=s.sibling}throw Error(oe(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(oe(189))}}if(n.alternate!==i)throw Error(oe(190))}if(n.tag!==3)throw Error(oe(188));return n.stateNode.current===n?t:e}function l_(t){return t=Fx(t),t!==null?u_(t):null}function u_(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=u_(t);if(e!==null)return e;t=t.sibling}return null}var c_=Bn.unstable_scheduleCallback,$p=Bn.unstable_cancelCallback,Ox=Bn.unstable_shouldYield,kx=Bn.unstable_requestPaint,zt=Bn.unstable_now,zx=Bn.unstable_getCurrentPriorityLevel,Th=Bn.unstable_ImmediatePriority,f_=Bn.unstable_UserBlockingPriority,cu=Bn.unstable_NormalPriority,Bx=Bn.unstable_LowPriority,d_=Bn.unstable_IdlePriority,ju=null,Si=null;function Hx(t){if(Si&&typeof Si.onCommitFiberRoot=="function")try{Si.onCommitFiberRoot(ju,t,void 0,(t.current.flags&128)===128)}catch{}}var di=Math.clz32?Math.clz32:Wx,Vx=Math.log,Gx=Math.LN2;function Wx(t){return t>>>=0,t===0?32:31-(Vx(t)/Gx|0)|0}var $o=64,qo=4194304;function qa(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function fu(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=qa(o):(s&=a,s!==0&&(i=qa(s)))}else a=n&~r,a!==0?i=qa(a):s!==0&&(i=qa(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-di(e),r=1<<n,i|=t[n],e&=~r;return i}function jx(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Xx(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-di(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=jx(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function Wf(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function h_(){var t=$o;return $o<<=1,!($o&4194240)&&($o=64),t}function Sc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Do(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-di(e),t[e]=n}function Yx(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-di(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Ah(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-di(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var vt=0;function p_(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var m_,Rh,g_,v_,__,jf=!1,Ko=[],pr=null,mr=null,gr=null,ho=new Map,po=new Map,lr=[],$x="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function qp(t,e){switch(t){case"focusin":case"focusout":pr=null;break;case"dragenter":case"dragleave":mr=null;break;case"mouseover":case"mouseout":gr=null;break;case"pointerover":case"pointerout":ho.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":po.delete(e.pointerId)}}function ba(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Io(e),e!==null&&Rh(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function qx(t,e,n,i,r){switch(e){case"focusin":return pr=ba(pr,t,e,n,i,r),!0;case"dragenter":return mr=ba(mr,t,e,n,i,r),!0;case"mouseover":return gr=ba(gr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return ho.set(s,ba(ho.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,po.set(s,ba(po.get(s)||null,t,e,n,i,r)),!0}return!1}function y_(t){var e=$r(t.target);if(e!==null){var n=ds(e);if(n!==null){if(e=n.tag,e===13){if(e=o_(n),e!==null){t.blockedOn=e,__(t.priority,function(){g_(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Hl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Xf(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Bf=i,n.target.dispatchEvent(i),Bf=null}else return e=Io(n),e!==null&&Rh(e),t.blockedOn=n,!1;e.shift()}return!0}function Kp(t,e,n){Hl(t)&&n.delete(e)}function Kx(){jf=!1,pr!==null&&Hl(pr)&&(pr=null),mr!==null&&Hl(mr)&&(mr=null),gr!==null&&Hl(gr)&&(gr=null),ho.forEach(Kp),po.forEach(Kp)}function Pa(t,e){t.blockedOn===e&&(t.blockedOn=null,jf||(jf=!0,Bn.unstable_scheduleCallback(Bn.unstable_NormalPriority,Kx)))}function mo(t){function e(r){return Pa(r,t)}if(0<Ko.length){Pa(Ko[0],t);for(var n=1;n<Ko.length;n++){var i=Ko[n];i.blockedOn===t&&(i.blockedOn=null)}}for(pr!==null&&Pa(pr,t),mr!==null&&Pa(mr,t),gr!==null&&Pa(gr,t),ho.forEach(e),po.forEach(e),n=0;n<lr.length;n++)i=lr[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<lr.length&&(n=lr[0],n.blockedOn===null);)y_(n),n.blockedOn===null&&lr.shift()}var ta=$i.ReactCurrentBatchConfig,du=!0;function Zx(t,e,n,i){var r=vt,s=ta.transition;ta.transition=null;try{vt=1,Ch(t,e,n,i)}finally{vt=r,ta.transition=s}}function Qx(t,e,n,i){var r=vt,s=ta.transition;ta.transition=null;try{vt=4,Ch(t,e,n,i)}finally{vt=r,ta.transition=s}}function Ch(t,e,n,i){if(du){var r=Xf(t,e,n,i);if(r===null)Lc(t,e,i,hu,n),qp(t,i);else if(qx(r,t,e,n,i))i.stopPropagation();else if(qp(t,i),e&4&&-1<$x.indexOf(t)){for(;r!==null;){var s=Io(r);if(s!==null&&m_(s),s=Xf(t,e,n,i),s===null&&Lc(t,e,i,hu,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Lc(t,e,i,null,n)}}var hu=null;function Xf(t,e,n,i){if(hu=null,t=wh(i),t=$r(t),t!==null)if(e=ds(t),e===null)t=null;else if(n=e.tag,n===13){if(t=o_(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return hu=t,null}function x_(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(zx()){case Th:return 1;case f_:return 4;case cu:case Bx:return 16;case d_:return 536870912;default:return 16}default:return 16}}var fr=null,bh=null,Vl=null;function S_(){if(Vl)return Vl;var t,e=bh,n=e.length,i,r="value"in fr?fr.value:fr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return Vl=r.slice(t,1<i?1-i:void 0)}function Gl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Zo(){return!0}function Zp(){return!1}function Vn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Zo:Zp,this.isPropagationStopped=Zp,this}return It(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Zo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Zo)},persist:function(){},isPersistent:Zo}),e}var Ea={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ph=Vn(Ea),Uo=It({},Ea,{view:0,detail:0}),Jx=Vn(Uo),Mc,Ec,La,Xu=It({},Uo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Lh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==La&&(La&&t.type==="mousemove"?(Mc=t.screenX-La.screenX,Ec=t.screenY-La.screenY):Ec=Mc=0,La=t),Mc)},movementY:function(t){return"movementY"in t?t.movementY:Ec}}),Qp=Vn(Xu),eS=It({},Xu,{dataTransfer:0}),tS=Vn(eS),nS=It({},Uo,{relatedTarget:0}),wc=Vn(nS),iS=It({},Ea,{animationName:0,elapsedTime:0,pseudoElement:0}),rS=Vn(iS),sS=It({},Ea,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),aS=Vn(sS),oS=It({},Ea,{data:0}),Jp=Vn(oS),lS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},uS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},cS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function fS(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=cS[t])?!!e[t]:!1}function Lh(){return fS}var dS=It({},Uo,{key:function(t){if(t.key){var e=lS[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Gl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?uS[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Lh,charCode:function(t){return t.type==="keypress"?Gl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Gl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),hS=Vn(dS),pS=It({},Xu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),em=Vn(pS),mS=It({},Uo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Lh}),gS=Vn(mS),vS=It({},Ea,{propertyName:0,elapsedTime:0,pseudoElement:0}),_S=Vn(vS),yS=It({},Xu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),xS=Vn(yS),SS=[9,13,27,32],Dh=Hi&&"CompositionEvent"in window,to=null;Hi&&"documentMode"in document&&(to=document.documentMode);var MS=Hi&&"TextEvent"in window&&!to,M_=Hi&&(!Dh||to&&8<to&&11>=to),tm=" ",nm=!1;function E_(t,e){switch(t){case"keyup":return SS.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function w_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ks=!1;function ES(t,e){switch(t){case"compositionend":return w_(e);case"keypress":return e.which!==32?null:(nm=!0,tm);case"textInput":return t=e.data,t===tm&&nm?null:t;default:return null}}function wS(t,e){if(ks)return t==="compositionend"||!Dh&&E_(t,e)?(t=S_(),Vl=bh=fr=null,ks=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return M_&&e.locale!=="ko"?null:e.data;default:return null}}var TS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function im(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!TS[t.type]:e==="textarea"}function T_(t,e,n,i){n_(i),e=pu(e,"onChange"),0<e.length&&(n=new Ph("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var no=null,go=null;function AS(t){F_(t,0)}function Yu(t){var e=Hs(t);if(qv(e))return t}function RS(t,e){if(t==="change")return e}var A_=!1;if(Hi){var Tc;if(Hi){var Ac="oninput"in document;if(!Ac){var rm=document.createElement("div");rm.setAttribute("oninput","return;"),Ac=typeof rm.oninput=="function"}Tc=Ac}else Tc=!1;A_=Tc&&(!document.documentMode||9<document.documentMode)}function sm(){no&&(no.detachEvent("onpropertychange",R_),go=no=null)}function R_(t){if(t.propertyName==="value"&&Yu(go)){var e=[];T_(e,go,t,wh(t)),a_(AS,e)}}function CS(t,e,n){t==="focusin"?(sm(),no=e,go=n,no.attachEvent("onpropertychange",R_)):t==="focusout"&&sm()}function bS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Yu(go)}function PS(t,e){if(t==="click")return Yu(e)}function LS(t,e){if(t==="input"||t==="change")return Yu(e)}function DS(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var mi=typeof Object.is=="function"?Object.is:DS;function vo(t,e){if(mi(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Cf.call(e,r)||!mi(t[r],e[r]))return!1}return!0}function am(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function om(t,e){var n=am(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=am(n)}}function C_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?C_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function b_(){for(var t=window,e=ou();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=ou(t.document)}return e}function Uh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function US(t){var e=b_(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&C_(n.ownerDocument.documentElement,n)){if(i!==null&&Uh(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=om(n,s);var a=om(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var IS=Hi&&"documentMode"in document&&11>=document.documentMode,zs=null,Yf=null,io=null,$f=!1;function lm(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;$f||zs==null||zs!==ou(i)||(i=zs,"selectionStart"in i&&Uh(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),io&&vo(io,i)||(io=i,i=pu(Yf,"onSelect"),0<i.length&&(e=new Ph("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=zs)))}function Qo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Bs={animationend:Qo("Animation","AnimationEnd"),animationiteration:Qo("Animation","AnimationIteration"),animationstart:Qo("Animation","AnimationStart"),transitionend:Qo("Transition","TransitionEnd")},Rc={},P_={};Hi&&(P_=document.createElement("div").style,"AnimationEvent"in window||(delete Bs.animationend.animation,delete Bs.animationiteration.animation,delete Bs.animationstart.animation),"TransitionEvent"in window||delete Bs.transitionend.transition);function $u(t){if(Rc[t])return Rc[t];if(!Bs[t])return t;var e=Bs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in P_)return Rc[t]=e[n];return t}var L_=$u("animationend"),D_=$u("animationiteration"),U_=$u("animationstart"),I_=$u("transitionend"),N_=new Map,um="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Cr(t,e){N_.set(t,e),fs(e,[t])}for(var Cc=0;Cc<um.length;Cc++){var bc=um[Cc],NS=bc.toLowerCase(),FS=bc[0].toUpperCase()+bc.slice(1);Cr(NS,"on"+FS)}Cr(L_,"onAnimationEnd");Cr(D_,"onAnimationIteration");Cr(U_,"onAnimationStart");Cr("dblclick","onDoubleClick");Cr("focusin","onFocus");Cr("focusout","onBlur");Cr(I_,"onTransitionEnd");la("onMouseEnter",["mouseout","mouseover"]);la("onMouseLeave",["mouseout","mouseover"]);la("onPointerEnter",["pointerout","pointerover"]);la("onPointerLeave",["pointerout","pointerover"]);fs("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fs("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fs("onBeforeInput",["compositionend","keypress","textInput","paste"]);fs("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fs("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));fs("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ka="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),OS=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ka));function cm(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,Nx(i,e,void 0,t),t.currentTarget=null}function F_(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,u=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;cm(r,o,u),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,u=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;cm(r,o,u),s=l}}}if(uu)throw t=Gf,uu=!1,Gf=null,t}function Tt(t,e){var n=e[Jf];n===void 0&&(n=e[Jf]=new Set);var i=t+"__bubble";n.has(i)||(O_(e,t,2,!1),n.add(i))}function Pc(t,e,n){var i=0;e&&(i|=4),O_(n,t,i,e)}var Jo="_reactListening"+Math.random().toString(36).slice(2);function _o(t){if(!t[Jo]){t[Jo]=!0,Wv.forEach(function(n){n!=="selectionchange"&&(OS.has(n)||Pc(n,!1,t),Pc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Jo]||(e[Jo]=!0,Pc("selectionchange",!1,e))}}function O_(t,e,n,i){switch(x_(e)){case 1:var r=Zx;break;case 4:r=Qx;break;default:r=Ch}n=r.bind(null,e,n,t),r=void 0,!Vf||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Lc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=$r(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}a_(function(){var u=s,c=wh(n),d=[];e:{var h=N_.get(t);if(h!==void 0){var m=Ph,_=t;switch(t){case"keypress":if(Gl(n)===0)break e;case"keydown":case"keyup":m=hS;break;case"focusin":_="focus",m=wc;break;case"focusout":_="blur",m=wc;break;case"beforeblur":case"afterblur":m=wc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=Qp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=tS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=gS;break;case L_:case D_:case U_:m=rS;break;case I_:m=_S;break;case"scroll":m=Jx;break;case"wheel":m=xS;break;case"copy":case"cut":case"paste":m=aS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=em}var y=(e&4)!==0,p=!y&&t==="scroll",f=y?h!==null?h+"Capture":null:h;y=[];for(var g=u,v;g!==null;){v=g;var M=v.stateNode;if(v.tag===5&&M!==null&&(v=M,f!==null&&(M=fo(g,f),M!=null&&y.push(yo(g,M,v)))),p)break;g=g.return}0<y.length&&(h=new m(h,_,null,n,c),d.push({event:h,listeners:y}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",h&&n!==Bf&&(_=n.relatedTarget||n.fromElement)&&($r(_)||_[Vi]))break e;if((m||h)&&(h=c.window===c?c:(h=c.ownerDocument)?h.defaultView||h.parentWindow:window,m?(_=n.relatedTarget||n.toElement,m=u,_=_?$r(_):null,_!==null&&(p=ds(_),_!==p||_.tag!==5&&_.tag!==6)&&(_=null)):(m=null,_=u),m!==_)){if(y=Qp,M="onMouseLeave",f="onMouseEnter",g="mouse",(t==="pointerout"||t==="pointerover")&&(y=em,M="onPointerLeave",f="onPointerEnter",g="pointer"),p=m==null?h:Hs(m),v=_==null?h:Hs(_),h=new y(M,g+"leave",m,n,c),h.target=p,h.relatedTarget=v,M=null,$r(c)===u&&(y=new y(f,g+"enter",_,n,c),y.target=v,y.relatedTarget=p,M=y),p=M,m&&_)t:{for(y=m,f=_,g=0,v=y;v;v=gs(v))g++;for(v=0,M=f;M;M=gs(M))v++;for(;0<g-v;)y=gs(y),g--;for(;0<v-g;)f=gs(f),v--;for(;g--;){if(y===f||f!==null&&y===f.alternate)break t;y=gs(y),f=gs(f)}y=null}else y=null;m!==null&&fm(d,h,m,y,!1),_!==null&&p!==null&&fm(d,p,_,y,!0)}}e:{if(h=u?Hs(u):window,m=h.nodeName&&h.nodeName.toLowerCase(),m==="select"||m==="input"&&h.type==="file")var R=RS;else if(im(h))if(A_)R=LS;else{R=bS;var A=CS}else(m=h.nodeName)&&m.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(R=PS);if(R&&(R=R(t,u))){T_(d,R,n,c);break e}A&&A(t,h,u),t==="focusout"&&(A=h._wrapperState)&&A.controlled&&h.type==="number"&&Nf(h,"number",h.value)}switch(A=u?Hs(u):window,t){case"focusin":(im(A)||A.contentEditable==="true")&&(zs=A,Yf=u,io=null);break;case"focusout":io=Yf=zs=null;break;case"mousedown":$f=!0;break;case"contextmenu":case"mouseup":case"dragend":$f=!1,lm(d,n,c);break;case"selectionchange":if(IS)break;case"keydown":case"keyup":lm(d,n,c)}var S;if(Dh)e:{switch(t){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else ks?E_(t,n)&&(C="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(M_&&n.locale!=="ko"&&(ks||C!=="onCompositionStart"?C==="onCompositionEnd"&&ks&&(S=S_()):(fr=c,bh="value"in fr?fr.value:fr.textContent,ks=!0)),A=pu(u,C),0<A.length&&(C=new Jp(C,t,null,n,c),d.push({event:C,listeners:A}),S?C.data=S:(S=w_(n),S!==null&&(C.data=S)))),(S=MS?ES(t,n):wS(t,n))&&(u=pu(u,"onBeforeInput"),0<u.length&&(c=new Jp("onBeforeInput","beforeinput",null,n,c),d.push({event:c,listeners:u}),c.data=S))}F_(d,e)})}function yo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function pu(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=fo(t,n),s!=null&&i.unshift(yo(t,s,r)),s=fo(t,e),s!=null&&i.push(yo(t,s,r))),t=t.return}return i}function gs(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function fm(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,u=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&u!==null&&(o=u,r?(l=fo(n,s),l!=null&&a.unshift(yo(n,l,o))):r||(l=fo(n,s),l!=null&&a.push(yo(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var kS=/\r\n?/g,zS=/\u0000|\uFFFD/g;function dm(t){return(typeof t=="string"?t:""+t).replace(kS,`
`).replace(zS,"")}function el(t,e,n){if(e=dm(e),dm(t)!==e&&n)throw Error(oe(425))}function mu(){}var qf=null,Kf=null;function Zf(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Qf=typeof setTimeout=="function"?setTimeout:void 0,BS=typeof clearTimeout=="function"?clearTimeout:void 0,hm=typeof Promise=="function"?Promise:void 0,HS=typeof queueMicrotask=="function"?queueMicrotask:typeof hm<"u"?function(t){return hm.resolve(null).then(t).catch(VS)}:Qf;function VS(t){setTimeout(function(){throw t})}function Dc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),mo(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);mo(e)}function vr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function pm(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var wa=Math.random().toString(36).slice(2),yi="__reactFiber$"+wa,xo="__reactProps$"+wa,Vi="__reactContainer$"+wa,Jf="__reactEvents$"+wa,GS="__reactListeners$"+wa,WS="__reactHandles$"+wa;function $r(t){var e=t[yi];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Vi]||n[yi]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=pm(t);t!==null;){if(n=t[yi])return n;t=pm(t)}return e}t=n,n=t.parentNode}return null}function Io(t){return t=t[yi]||t[Vi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Hs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(oe(33))}function qu(t){return t[xo]||null}var ed=[],Vs=-1;function br(t){return{current:t}}function Rt(t){0>Vs||(t.current=ed[Vs],ed[Vs]=null,Vs--)}function Et(t,e){Vs++,ed[Vs]=t.current,t.current=e}var Ar={},pn=br(Ar),Cn=br(!1),ns=Ar;function ua(t,e){var n=t.type.contextTypes;if(!n)return Ar;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function bn(t){return t=t.childContextTypes,t!=null}function gu(){Rt(Cn),Rt(pn)}function mm(t,e,n){if(pn.current!==Ar)throw Error(oe(168));Et(pn,e),Et(Cn,n)}function k_(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(oe(108,Cx(t)||"Unknown",r));return It({},n,i)}function vu(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Ar,ns=pn.current,Et(pn,t),Et(Cn,Cn.current),!0}function gm(t,e,n){var i=t.stateNode;if(!i)throw Error(oe(169));n?(t=k_(t,e,ns),i.__reactInternalMemoizedMergedChildContext=t,Rt(Cn),Rt(pn),Et(pn,t)):Rt(Cn),Et(Cn,n)}var Ui=null,Ku=!1,Uc=!1;function z_(t){Ui===null?Ui=[t]:Ui.push(t)}function jS(t){Ku=!0,z_(t)}function Pr(){if(!Uc&&Ui!==null){Uc=!0;var t=0,e=vt;try{var n=Ui;for(vt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ui=null,Ku=!1}catch(r){throw Ui!==null&&(Ui=Ui.slice(t+1)),c_(Th,Pr),r}finally{vt=e,Uc=!1}}return null}var Gs=[],Ws=0,_u=null,yu=0,Xn=[],Yn=0,is=null,Ni=1,Fi="";function Br(t,e){Gs[Ws++]=yu,Gs[Ws++]=_u,_u=t,yu=e}function B_(t,e,n){Xn[Yn++]=Ni,Xn[Yn++]=Fi,Xn[Yn++]=is,is=t;var i=Ni;t=Fi;var r=32-di(i)-1;i&=~(1<<r),n+=1;var s=32-di(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,Ni=1<<32-di(e)+r|n<<r|i,Fi=s+t}else Ni=1<<s|n<<r|i,Fi=t}function Ih(t){t.return!==null&&(Br(t,1),B_(t,1,0))}function Nh(t){for(;t===_u;)_u=Gs[--Ws],Gs[Ws]=null,yu=Gs[--Ws],Gs[Ws]=null;for(;t===is;)is=Xn[--Yn],Xn[Yn]=null,Fi=Xn[--Yn],Xn[Yn]=null,Ni=Xn[--Yn],Xn[Yn]=null}var zn=null,kn=null,Pt=!1,ui=null;function H_(t,e){var n=Kn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function vm(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,zn=t,kn=vr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,zn=t,kn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=is!==null?{id:Ni,overflow:Fi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Kn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,zn=t,kn=null,!0):!1;default:return!1}}function td(t){return(t.mode&1)!==0&&(t.flags&128)===0}function nd(t){if(Pt){var e=kn;if(e){var n=e;if(!vm(t,e)){if(td(t))throw Error(oe(418));e=vr(n.nextSibling);var i=zn;e&&vm(t,e)?H_(i,n):(t.flags=t.flags&-4097|2,Pt=!1,zn=t)}}else{if(td(t))throw Error(oe(418));t.flags=t.flags&-4097|2,Pt=!1,zn=t}}}function _m(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;zn=t}function tl(t){if(t!==zn)return!1;if(!Pt)return _m(t),Pt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Zf(t.type,t.memoizedProps)),e&&(e=kn)){if(td(t))throw V_(),Error(oe(418));for(;e;)H_(t,e),e=vr(e.nextSibling)}if(_m(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(oe(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){kn=vr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}kn=null}}else kn=zn?vr(t.stateNode.nextSibling):null;return!0}function V_(){for(var t=kn;t;)t=vr(t.nextSibling)}function ca(){kn=zn=null,Pt=!1}function Fh(t){ui===null?ui=[t]:ui.push(t)}var XS=$i.ReactCurrentBatchConfig;function Da(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(oe(309));var i=n.stateNode}if(!i)throw Error(oe(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(oe(284));if(!n._owner)throw Error(oe(290,t))}return t}function nl(t,e){throw t=Object.prototype.toString.call(e),Error(oe(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function ym(t){var e=t._init;return e(t._payload)}function G_(t){function e(f,g){if(t){var v=f.deletions;v===null?(f.deletions=[g],f.flags|=16):v.push(g)}}function n(f,g){if(!t)return null;for(;g!==null;)e(f,g),g=g.sibling;return null}function i(f,g){for(f=new Map;g!==null;)g.key!==null?f.set(g.key,g):f.set(g.index,g),g=g.sibling;return f}function r(f,g){return f=Sr(f,g),f.index=0,f.sibling=null,f}function s(f,g,v){return f.index=v,t?(v=f.alternate,v!==null?(v=v.index,v<g?(f.flags|=2,g):v):(f.flags|=2,g)):(f.flags|=1048576,g)}function a(f){return t&&f.alternate===null&&(f.flags|=2),f}function o(f,g,v,M){return g===null||g.tag!==6?(g=Bc(v,f.mode,M),g.return=f,g):(g=r(g,v),g.return=f,g)}function l(f,g,v,M){var R=v.type;return R===Os?c(f,g,v.props.children,M,v.key):g!==null&&(g.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===sr&&ym(R)===g.type)?(M=r(g,v.props),M.ref=Da(f,g,v),M.return=f,M):(M=Kl(v.type,v.key,v.props,null,f.mode,M),M.ref=Da(f,g,v),M.return=f,M)}function u(f,g,v,M){return g===null||g.tag!==4||g.stateNode.containerInfo!==v.containerInfo||g.stateNode.implementation!==v.implementation?(g=Hc(v,f.mode,M),g.return=f,g):(g=r(g,v.children||[]),g.return=f,g)}function c(f,g,v,M,R){return g===null||g.tag!==7?(g=ts(v,f.mode,M,R),g.return=f,g):(g=r(g,v),g.return=f,g)}function d(f,g,v){if(typeof g=="string"&&g!==""||typeof g=="number")return g=Bc(""+g,f.mode,v),g.return=f,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case jo:return v=Kl(g.type,g.key,g.props,null,f.mode,v),v.ref=Da(f,null,g),v.return=f,v;case Fs:return g=Hc(g,f.mode,v),g.return=f,g;case sr:var M=g._init;return d(f,M(g._payload),v)}if($a(g)||Ra(g))return g=ts(g,f.mode,v,null),g.return=f,g;nl(f,g)}return null}function h(f,g,v,M){var R=g!==null?g.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return R!==null?null:o(f,g,""+v,M);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case jo:return v.key===R?l(f,g,v,M):null;case Fs:return v.key===R?u(f,g,v,M):null;case sr:return R=v._init,h(f,g,R(v._payload),M)}if($a(v)||Ra(v))return R!==null?null:c(f,g,v,M,null);nl(f,v)}return null}function m(f,g,v,M,R){if(typeof M=="string"&&M!==""||typeof M=="number")return f=f.get(v)||null,o(g,f,""+M,R);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case jo:return f=f.get(M.key===null?v:M.key)||null,l(g,f,M,R);case Fs:return f=f.get(M.key===null?v:M.key)||null,u(g,f,M,R);case sr:var A=M._init;return m(f,g,v,A(M._payload),R)}if($a(M)||Ra(M))return f=f.get(v)||null,c(g,f,M,R,null);nl(g,M)}return null}function _(f,g,v,M){for(var R=null,A=null,S=g,C=g=0,B=null;S!==null&&C<v.length;C++){S.index>C?(B=S,S=null):B=S.sibling;var x=h(f,S,v[C],M);if(x===null){S===null&&(S=B);break}t&&S&&x.alternate===null&&e(f,S),g=s(x,g,C),A===null?R=x:A.sibling=x,A=x,S=B}if(C===v.length)return n(f,S),Pt&&Br(f,C),R;if(S===null){for(;C<v.length;C++)S=d(f,v[C],M),S!==null&&(g=s(S,g,C),A===null?R=S:A.sibling=S,A=S);return Pt&&Br(f,C),R}for(S=i(f,S);C<v.length;C++)B=m(S,f,C,v[C],M),B!==null&&(t&&B.alternate!==null&&S.delete(B.key===null?C:B.key),g=s(B,g,C),A===null?R=B:A.sibling=B,A=B);return t&&S.forEach(function(E){return e(f,E)}),Pt&&Br(f,C),R}function y(f,g,v,M){var R=Ra(v);if(typeof R!="function")throw Error(oe(150));if(v=R.call(v),v==null)throw Error(oe(151));for(var A=R=null,S=g,C=g=0,B=null,x=v.next();S!==null&&!x.done;C++,x=v.next()){S.index>C?(B=S,S=null):B=S.sibling;var E=h(f,S,x.value,M);if(E===null){S===null&&(S=B);break}t&&S&&E.alternate===null&&e(f,S),g=s(E,g,C),A===null?R=E:A.sibling=E,A=E,S=B}if(x.done)return n(f,S),Pt&&Br(f,C),R;if(S===null){for(;!x.done;C++,x=v.next())x=d(f,x.value,M),x!==null&&(g=s(x,g,C),A===null?R=x:A.sibling=x,A=x);return Pt&&Br(f,C),R}for(S=i(f,S);!x.done;C++,x=v.next())x=m(S,f,C,x.value,M),x!==null&&(t&&x.alternate!==null&&S.delete(x.key===null?C:x.key),g=s(x,g,C),A===null?R=x:A.sibling=x,A=x);return t&&S.forEach(function(z){return e(f,z)}),Pt&&Br(f,C),R}function p(f,g,v,M){if(typeof v=="object"&&v!==null&&v.type===Os&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case jo:e:{for(var R=v.key,A=g;A!==null;){if(A.key===R){if(R=v.type,R===Os){if(A.tag===7){n(f,A.sibling),g=r(A,v.props.children),g.return=f,f=g;break e}}else if(A.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===sr&&ym(R)===A.type){n(f,A.sibling),g=r(A,v.props),g.ref=Da(f,A,v),g.return=f,f=g;break e}n(f,A);break}else e(f,A);A=A.sibling}v.type===Os?(g=ts(v.props.children,f.mode,M,v.key),g.return=f,f=g):(M=Kl(v.type,v.key,v.props,null,f.mode,M),M.ref=Da(f,g,v),M.return=f,f=M)}return a(f);case Fs:e:{for(A=v.key;g!==null;){if(g.key===A)if(g.tag===4&&g.stateNode.containerInfo===v.containerInfo&&g.stateNode.implementation===v.implementation){n(f,g.sibling),g=r(g,v.children||[]),g.return=f,f=g;break e}else{n(f,g);break}else e(f,g);g=g.sibling}g=Hc(v,f.mode,M),g.return=f,f=g}return a(f);case sr:return A=v._init,p(f,g,A(v._payload),M)}if($a(v))return _(f,g,v,M);if(Ra(v))return y(f,g,v,M);nl(f,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,g!==null&&g.tag===6?(n(f,g.sibling),g=r(g,v),g.return=f,f=g):(n(f,g),g=Bc(v,f.mode,M),g.return=f,f=g),a(f)):n(f,g)}return p}var fa=G_(!0),W_=G_(!1),xu=br(null),Su=null,js=null,Oh=null;function kh(){Oh=js=Su=null}function zh(t){var e=xu.current;Rt(xu),t._currentValue=e}function id(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function na(t,e){Su=t,Oh=js=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Rn=!0),t.firstContext=null)}function Jn(t){var e=t._currentValue;if(Oh!==t)if(t={context:t,memoizedValue:e,next:null},js===null){if(Su===null)throw Error(oe(308));js=t,Su.dependencies={lanes:0,firstContext:t}}else js=js.next=t;return e}var qr=null;function Bh(t){qr===null?qr=[t]:qr.push(t)}function j_(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Bh(e)):(n.next=r.next,r.next=n),e.interleaved=n,Gi(t,i)}function Gi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var ar=!1;function Hh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function X_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function zi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function _r(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,mt&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Gi(t,n)}return r=i.interleaved,r===null?(e.next=e,Bh(i)):(e.next=r.next,r.next=e),i.interleaved=e,Gi(t,n)}function Wl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Ah(t,n)}}function xm(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Mu(t,e,n,i){var r=t.updateQueue;ar=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,u=l.next;l.next=null,a===null?s=u:a.next=u,a=l;var c=t.alternate;c!==null&&(c=c.updateQueue,o=c.lastBaseUpdate,o!==a&&(o===null?c.firstBaseUpdate=u:o.next=u,c.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;a=0,c=u=l=null,o=s;do{var h=o.lane,m=o.eventTime;if((i&h)===h){c!==null&&(c=c.next={eventTime:m,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var _=t,y=o;switch(h=e,m=n,y.tag){case 1:if(_=y.payload,typeof _=="function"){d=_.call(m,d,h);break e}d=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=y.payload,h=typeof _=="function"?_.call(m,d,h):_,h==null)break e;d=It({},d,h);break e;case 2:ar=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[o]:h.push(o))}else m={eventTime:m,lane:h,tag:o.tag,payload:o.payload,callback:o.callback,next:null},c===null?(u=c=m,l=d):c=c.next=m,a|=h;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;h=o,o=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(c===null&&(l=d),r.baseState=l,r.firstBaseUpdate=u,r.lastBaseUpdate=c,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);ss|=a,t.lanes=a,t.memoizedState=d}}function Sm(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(oe(191,r));r.call(i)}}}var No={},Mi=br(No),So=br(No),Mo=br(No);function Kr(t){if(t===No)throw Error(oe(174));return t}function Vh(t,e){switch(Et(Mo,e),Et(So,t),Et(Mi,No),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Of(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Of(e,t)}Rt(Mi),Et(Mi,e)}function da(){Rt(Mi),Rt(So),Rt(Mo)}function Y_(t){Kr(Mo.current);var e=Kr(Mi.current),n=Of(e,t.type);e!==n&&(Et(So,t),Et(Mi,n))}function Gh(t){So.current===t&&(Rt(Mi),Rt(So))}var Lt=br(0);function Eu(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ic=[];function Wh(){for(var t=0;t<Ic.length;t++)Ic[t]._workInProgressVersionPrimary=null;Ic.length=0}var jl=$i.ReactCurrentDispatcher,Nc=$i.ReactCurrentBatchConfig,rs=0,Ut=null,Xt=null,Qt=null,wu=!1,ro=!1,Eo=0,YS=0;function an(){throw Error(oe(321))}function jh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!mi(t[n],e[n]))return!1;return!0}function Xh(t,e,n,i,r,s){if(rs=s,Ut=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,jl.current=t===null||t.memoizedState===null?ZS:QS,t=n(i,r),ro){s=0;do{if(ro=!1,Eo=0,25<=s)throw Error(oe(301));s+=1,Qt=Xt=null,e.updateQueue=null,jl.current=JS,t=n(i,r)}while(ro)}if(jl.current=Tu,e=Xt!==null&&Xt.next!==null,rs=0,Qt=Xt=Ut=null,wu=!1,e)throw Error(oe(300));return t}function Yh(){var t=Eo!==0;return Eo=0,t}function vi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Qt===null?Ut.memoizedState=Qt=t:Qt=Qt.next=t,Qt}function ei(){if(Xt===null){var t=Ut.alternate;t=t!==null?t.memoizedState:null}else t=Xt.next;var e=Qt===null?Ut.memoizedState:Qt.next;if(e!==null)Qt=e,Xt=t;else{if(t===null)throw Error(oe(310));Xt=t,t={memoizedState:Xt.memoizedState,baseState:Xt.baseState,baseQueue:Xt.baseQueue,queue:Xt.queue,next:null},Qt===null?Ut.memoizedState=Qt=t:Qt=Qt.next=t}return Qt}function wo(t,e){return typeof e=="function"?e(t):e}function Fc(t){var e=ei(),n=e.queue;if(n===null)throw Error(oe(311));n.lastRenderedReducer=t;var i=Xt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,u=s;do{var c=u.lane;if((rs&c)===c)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:t(i,u.action);else{var d={lane:c,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(o=l=d,a=i):l=l.next=d,Ut.lanes|=c,ss|=c}u=u.next}while(u!==null&&u!==s);l===null?a=i:l.next=o,mi(i,e.memoizedState)||(Rn=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,Ut.lanes|=s,ss|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Oc(t){var e=ei(),n=e.queue;if(n===null)throw Error(oe(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);mi(s,e.memoizedState)||(Rn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function $_(){}function q_(t,e){var n=Ut,i=ei(),r=e(),s=!mi(i.memoizedState,r);if(s&&(i.memoizedState=r,Rn=!0),i=i.queue,$h(Q_.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Qt!==null&&Qt.memoizedState.tag&1){if(n.flags|=2048,To(9,Z_.bind(null,n,i,r,e),void 0,null),Jt===null)throw Error(oe(349));rs&30||K_(n,e,r)}return r}function K_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Ut.updateQueue,e===null?(e={lastEffect:null,stores:null},Ut.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Z_(t,e,n,i){e.value=n,e.getSnapshot=i,J_(e)&&e0(t)}function Q_(t,e,n){return n(function(){J_(e)&&e0(t)})}function J_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!mi(t,n)}catch{return!0}}function e0(t){var e=Gi(t,1);e!==null&&hi(e,t,1,-1)}function Mm(t){var e=vi();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:wo,lastRenderedState:t},e.queue=t,t=t.dispatch=KS.bind(null,Ut,t),[e.memoizedState,t]}function To(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=Ut.updateQueue,e===null?(e={lastEffect:null,stores:null},Ut.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function t0(){return ei().memoizedState}function Xl(t,e,n,i){var r=vi();Ut.flags|=t,r.memoizedState=To(1|e,n,void 0,i===void 0?null:i)}function Zu(t,e,n,i){var r=ei();i=i===void 0?null:i;var s=void 0;if(Xt!==null){var a=Xt.memoizedState;if(s=a.destroy,i!==null&&jh(i,a.deps)){r.memoizedState=To(e,n,s,i);return}}Ut.flags|=t,r.memoizedState=To(1|e,n,s,i)}function Em(t,e){return Xl(8390656,8,t,e)}function $h(t,e){return Zu(2048,8,t,e)}function n0(t,e){return Zu(4,2,t,e)}function i0(t,e){return Zu(4,4,t,e)}function r0(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function s0(t,e,n){return n=n!=null?n.concat([t]):null,Zu(4,4,r0.bind(null,e,t),n)}function qh(){}function a0(t,e){var n=ei();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&jh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function o0(t,e){var n=ei();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&jh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function l0(t,e,n){return rs&21?(mi(n,e)||(n=h_(),Ut.lanes|=n,ss|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Rn=!0),t.memoizedState=n)}function $S(t,e){var n=vt;vt=n!==0&&4>n?n:4,t(!0);var i=Nc.transition;Nc.transition={};try{t(!1),e()}finally{vt=n,Nc.transition=i}}function u0(){return ei().memoizedState}function qS(t,e,n){var i=xr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},c0(t))f0(e,n);else if(n=j_(t,e,n,i),n!==null){var r=yn();hi(n,t,i,r),d0(n,e,i)}}function KS(t,e,n){var i=xr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(c0(t))f0(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,mi(o,a)){var l=e.interleaved;l===null?(r.next=r,Bh(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=j_(t,e,r,i),n!==null&&(r=yn(),hi(n,t,i,r),d0(n,e,i))}}function c0(t){var e=t.alternate;return t===Ut||e!==null&&e===Ut}function f0(t,e){ro=wu=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function d0(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Ah(t,n)}}var Tu={readContext:Jn,useCallback:an,useContext:an,useEffect:an,useImperativeHandle:an,useInsertionEffect:an,useLayoutEffect:an,useMemo:an,useReducer:an,useRef:an,useState:an,useDebugValue:an,useDeferredValue:an,useTransition:an,useMutableSource:an,useSyncExternalStore:an,useId:an,unstable_isNewReconciler:!1},ZS={readContext:Jn,useCallback:function(t,e){return vi().memoizedState=[t,e===void 0?null:e],t},useContext:Jn,useEffect:Em,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Xl(4194308,4,r0.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Xl(4194308,4,t,e)},useInsertionEffect:function(t,e){return Xl(4,2,t,e)},useMemo:function(t,e){var n=vi();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=vi();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=qS.bind(null,Ut,t),[i.memoizedState,t]},useRef:function(t){var e=vi();return t={current:t},e.memoizedState=t},useState:Mm,useDebugValue:qh,useDeferredValue:function(t){return vi().memoizedState=t},useTransition:function(){var t=Mm(!1),e=t[0];return t=$S.bind(null,t[1]),vi().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=Ut,r=vi();if(Pt){if(n===void 0)throw Error(oe(407));n=n()}else{if(n=e(),Jt===null)throw Error(oe(349));rs&30||K_(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Em(Q_.bind(null,i,s,t),[t]),i.flags|=2048,To(9,Z_.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=vi(),e=Jt.identifierPrefix;if(Pt){var n=Fi,i=Ni;n=(i&~(1<<32-di(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Eo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=YS++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},QS={readContext:Jn,useCallback:a0,useContext:Jn,useEffect:$h,useImperativeHandle:s0,useInsertionEffect:n0,useLayoutEffect:i0,useMemo:o0,useReducer:Fc,useRef:t0,useState:function(){return Fc(wo)},useDebugValue:qh,useDeferredValue:function(t){var e=ei();return l0(e,Xt.memoizedState,t)},useTransition:function(){var t=Fc(wo)[0],e=ei().memoizedState;return[t,e]},useMutableSource:$_,useSyncExternalStore:q_,useId:u0,unstable_isNewReconciler:!1},JS={readContext:Jn,useCallback:a0,useContext:Jn,useEffect:$h,useImperativeHandle:s0,useInsertionEffect:n0,useLayoutEffect:i0,useMemo:o0,useReducer:Oc,useRef:t0,useState:function(){return Oc(wo)},useDebugValue:qh,useDeferredValue:function(t){var e=ei();return Xt===null?e.memoizedState=t:l0(e,Xt.memoizedState,t)},useTransition:function(){var t=Oc(wo)[0],e=ei().memoizedState;return[t,e]},useMutableSource:$_,useSyncExternalStore:q_,useId:u0,unstable_isNewReconciler:!1};function ai(t,e){if(t&&t.defaultProps){e=It({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function rd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:It({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Qu={isMounted:function(t){return(t=t._reactInternals)?ds(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=yn(),r=xr(t),s=zi(i,r);s.payload=e,n!=null&&(s.callback=n),e=_r(t,s,r),e!==null&&(hi(e,t,r,i),Wl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=yn(),r=xr(t),s=zi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=_r(t,s,r),e!==null&&(hi(e,t,r,i),Wl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=yn(),i=xr(t),r=zi(n,i);r.tag=2,e!=null&&(r.callback=e),e=_r(t,r,i),e!==null&&(hi(e,t,i,n),Wl(e,t,i))}};function wm(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!vo(n,i)||!vo(r,s):!0}function h0(t,e,n){var i=!1,r=Ar,s=e.contextType;return typeof s=="object"&&s!==null?s=Jn(s):(r=bn(e)?ns:pn.current,i=e.contextTypes,s=(i=i!=null)?ua(t,r):Ar),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Qu,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Tm(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Qu.enqueueReplaceState(e,e.state,null)}function sd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Hh(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Jn(s):(s=bn(e)?ns:pn.current,r.context=ua(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(rd(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Qu.enqueueReplaceState(r,r.state,null),Mu(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function ha(t,e){try{var n="",i=e;do n+=Rx(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function kc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function ad(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var eM=typeof WeakMap=="function"?WeakMap:Map;function p0(t,e,n){n=zi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Ru||(Ru=!0,gd=i),ad(t,e)},n}function m0(t,e,n){n=zi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){ad(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){ad(t,e),typeof i!="function"&&(yr===null?yr=new Set([this]):yr.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function Am(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new eM;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=pM.bind(null,t,e,n),e.then(t,t))}function Rm(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Cm(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=zi(-1,1),e.tag=2,_r(n,e,1))),n.lanes|=1),t)}var tM=$i.ReactCurrentOwner,Rn=!1;function vn(t,e,n,i){e.child=t===null?W_(e,null,n,i):fa(e,t.child,n,i)}function bm(t,e,n,i,r){n=n.render;var s=e.ref;return na(e,r),i=Xh(t,e,n,i,s,r),n=Yh(),t!==null&&!Rn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Wi(t,e,r)):(Pt&&n&&Ih(e),e.flags|=1,vn(t,e,i,r),e.child)}function Pm(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!ip(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,g0(t,e,s,i,r)):(t=Kl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:vo,n(a,i)&&t.ref===e.ref)return Wi(t,e,r)}return e.flags|=1,t=Sr(s,i),t.ref=e.ref,t.return=e,e.child=t}function g0(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(vo(s,i)&&t.ref===e.ref)if(Rn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(Rn=!0);else return e.lanes=t.lanes,Wi(t,e,r)}return od(t,e,n,i,r)}function v0(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},Et(Ys,Fn),Fn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,Et(Ys,Fn),Fn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,Et(Ys,Fn),Fn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,Et(Ys,Fn),Fn|=i;return vn(t,e,r,n),e.child}function _0(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function od(t,e,n,i,r){var s=bn(n)?ns:pn.current;return s=ua(e,s),na(e,r),n=Xh(t,e,n,i,s,r),i=Yh(),t!==null&&!Rn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Wi(t,e,r)):(Pt&&i&&Ih(e),e.flags|=1,vn(t,e,n,r),e.child)}function Lm(t,e,n,i,r){if(bn(n)){var s=!0;vu(e)}else s=!1;if(na(e,r),e.stateNode===null)Yl(t,e),h0(e,n,i),sd(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,u=n.contextType;typeof u=="object"&&u!==null?u=Jn(u):(u=bn(n)?ns:pn.current,u=ua(e,u));var c=n.getDerivedStateFromProps,d=typeof c=="function"||typeof a.getSnapshotBeforeUpdate=="function";d||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==u)&&Tm(e,a,i,u),ar=!1;var h=e.memoizedState;a.state=h,Mu(e,i,a,r),l=e.memoizedState,o!==i||h!==l||Cn.current||ar?(typeof c=="function"&&(rd(e,n,c,i),l=e.memoizedState),(o=ar||wm(e,n,o,i,h,l,u))?(d||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=u,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,X_(t,e),o=e.memoizedProps,u=e.type===e.elementType?o:ai(e.type,o),a.props=u,d=e.pendingProps,h=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=Jn(l):(l=bn(n)?ns:pn.current,l=ua(e,l));var m=n.getDerivedStateFromProps;(c=typeof m=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==d||h!==l)&&Tm(e,a,i,l),ar=!1,h=e.memoizedState,a.state=h,Mu(e,i,a,r);var _=e.memoizedState;o!==d||h!==_||Cn.current||ar?(typeof m=="function"&&(rd(e,n,m,i),_=e.memoizedState),(u=ar||wm(e,n,u,i,h,_,l)||!1)?(c||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,_,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,_,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),a.props=i,a.state=_,a.context=l,i=u):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return ld(t,e,n,i,s,r)}function ld(t,e,n,i,r,s){_0(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&gm(e,n,!1),Wi(t,e,s);i=e.stateNode,tM.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=fa(e,t.child,null,s),e.child=fa(e,null,o,s)):vn(t,e,o,s),e.memoizedState=i.state,r&&gm(e,n,!0),e.child}function y0(t){var e=t.stateNode;e.pendingContext?mm(t,e.pendingContext,e.pendingContext!==e.context):e.context&&mm(t,e.context,!1),Vh(t,e.containerInfo)}function Dm(t,e,n,i,r){return ca(),Fh(r),e.flags|=256,vn(t,e,n,i),e.child}var ud={dehydrated:null,treeContext:null,retryLane:0};function cd(t){return{baseLanes:t,cachePool:null,transitions:null}}function x0(t,e,n){var i=e.pendingProps,r=Lt.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),Et(Lt,r&1),t===null)return nd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=tc(a,i,0,null),t=ts(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=cd(n),e.memoizedState=ud,t):Kh(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return nM(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Sr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=Sr(o,s):(s=ts(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?cd(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=ud,i}return s=t.child,t=s.sibling,i=Sr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Kh(t,e){return e=tc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function il(t,e,n,i){return i!==null&&Fh(i),fa(e,t.child,null,n),t=Kh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function nM(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=kc(Error(oe(422))),il(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=tc({mode:"visible",children:i.children},r,0,null),s=ts(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&fa(e,t.child,null,a),e.child.memoizedState=cd(a),e.memoizedState=ud,s);if(!(e.mode&1))return il(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(oe(419)),i=kc(s,i,void 0),il(t,e,a,i)}if(o=(a&t.childLanes)!==0,Rn||o){if(i=Jt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Gi(t,r),hi(i,t,r,-1))}return np(),i=kc(Error(oe(421))),il(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=mM.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,kn=vr(r.nextSibling),zn=e,Pt=!0,ui=null,t!==null&&(Xn[Yn++]=Ni,Xn[Yn++]=Fi,Xn[Yn++]=is,Ni=t.id,Fi=t.overflow,is=e),e=Kh(e,i.children),e.flags|=4096,e)}function Um(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),id(t.return,e,n)}function zc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function S0(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(vn(t,e,i.children,n),i=Lt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Um(t,n,e);else if(t.tag===19)Um(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(Et(Lt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Eu(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),zc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Eu(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}zc(e,!0,n,null,s);break;case"together":zc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Yl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Wi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),ss|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(oe(153));if(e.child!==null){for(t=e.child,n=Sr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Sr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function iM(t,e,n){switch(e.tag){case 3:y0(e),ca();break;case 5:Y_(e);break;case 1:bn(e.type)&&vu(e);break;case 4:Vh(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;Et(xu,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(Et(Lt,Lt.current&1),e.flags|=128,null):n&e.child.childLanes?x0(t,e,n):(Et(Lt,Lt.current&1),t=Wi(t,e,n),t!==null?t.sibling:null);Et(Lt,Lt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return S0(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),Et(Lt,Lt.current),i)break;return null;case 22:case 23:return e.lanes=0,v0(t,e,n)}return Wi(t,e,n)}var M0,fd,E0,w0;M0=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};fd=function(){};E0=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Kr(Mi.current);var s=null;switch(n){case"input":r=Uf(t,r),i=Uf(t,i),s=[];break;case"select":r=It({},r,{value:void 0}),i=It({},i,{value:void 0}),s=[];break;case"textarea":r=Ff(t,r),i=Ff(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=mu)}kf(n,i);var a;n=null;for(u in r)if(!i.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var o=r[u];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(uo.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in i){var l=i[u];if(o=r!=null?r[u]:void 0,i.hasOwnProperty(u)&&l!==o&&(l!=null||o!=null))if(u==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(u,n)),n=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(uo.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&Tt("scroll",t),s||o===l||(s=[])):(s=s||[]).push(u,l))}n&&(s=s||[]).push("style",n);var u=s;(e.updateQueue=u)&&(e.flags|=4)}};w0=function(t,e,n,i){n!==i&&(e.flags|=4)};function Ua(t,e){if(!Pt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function on(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function rM(t,e,n){var i=e.pendingProps;switch(Nh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return on(e),null;case 1:return bn(e.type)&&gu(),on(e),null;case 3:return i=e.stateNode,da(),Rt(Cn),Rt(pn),Wh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(tl(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,ui!==null&&(yd(ui),ui=null))),fd(t,e),on(e),null;case 5:Gh(e);var r=Kr(Mo.current);if(n=e.type,t!==null&&e.stateNode!=null)E0(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(oe(166));return on(e),null}if(t=Kr(Mi.current),tl(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[yi]=e,i[xo]=s,t=(e.mode&1)!==0,n){case"dialog":Tt("cancel",i),Tt("close",i);break;case"iframe":case"object":case"embed":Tt("load",i);break;case"video":case"audio":for(r=0;r<Ka.length;r++)Tt(Ka[r],i);break;case"source":Tt("error",i);break;case"img":case"image":case"link":Tt("error",i),Tt("load",i);break;case"details":Tt("toggle",i);break;case"input":Vp(i,s),Tt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},Tt("invalid",i);break;case"textarea":Wp(i,s),Tt("invalid",i)}kf(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&el(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&el(i.textContent,o,t),r=["children",""+o]):uo.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&Tt("scroll",i)}switch(n){case"input":Xo(i),Gp(i,s,!0);break;case"textarea":Xo(i),jp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=mu)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Qv(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[yi]=e,t[xo]=i,M0(t,e,!1,!1),e.stateNode=t;e:{switch(a=zf(n,i),n){case"dialog":Tt("cancel",t),Tt("close",t),r=i;break;case"iframe":case"object":case"embed":Tt("load",t),r=i;break;case"video":case"audio":for(r=0;r<Ka.length;r++)Tt(Ka[r],t);r=i;break;case"source":Tt("error",t),r=i;break;case"img":case"image":case"link":Tt("error",t),Tt("load",t),r=i;break;case"details":Tt("toggle",t),r=i;break;case"input":Vp(t,i),r=Uf(t,i),Tt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=It({},i,{value:void 0}),Tt("invalid",t);break;case"textarea":Wp(t,i),r=Ff(t,i),Tt("invalid",t);break;default:r=i}kf(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?t_(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Jv(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&co(t,l):typeof l=="number"&&co(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(uo.hasOwnProperty(s)?l!=null&&s==="onScroll"&&Tt("scroll",t):l!=null&&xh(t,s,l,a))}switch(n){case"input":Xo(t),Gp(t,i,!1);break;case"textarea":Xo(t),jp(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Tr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Qs(t,!!i.multiple,s,!1):i.defaultValue!=null&&Qs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=mu)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return on(e),null;case 6:if(t&&e.stateNode!=null)w0(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(oe(166));if(n=Kr(Mo.current),Kr(Mi.current),tl(e)){if(i=e.stateNode,n=e.memoizedProps,i[yi]=e,(s=i.nodeValue!==n)&&(t=zn,t!==null))switch(t.tag){case 3:el(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&el(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[yi]=e,e.stateNode=i}return on(e),null;case 13:if(Rt(Lt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Pt&&kn!==null&&e.mode&1&&!(e.flags&128))V_(),ca(),e.flags|=98560,s=!1;else if(s=tl(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(oe(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(oe(317));s[yi]=e}else ca(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;on(e),s=!1}else ui!==null&&(yd(ui),ui=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Lt.current&1?$t===0&&($t=3):np())),e.updateQueue!==null&&(e.flags|=4),on(e),null);case 4:return da(),fd(t,e),t===null&&_o(e.stateNode.containerInfo),on(e),null;case 10:return zh(e.type._context),on(e),null;case 17:return bn(e.type)&&gu(),on(e),null;case 19:if(Rt(Lt),s=e.memoizedState,s===null)return on(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)Ua(s,!1);else{if($t!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=Eu(t),a!==null){for(e.flags|=128,Ua(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return Et(Lt,Lt.current&1|2),e.child}t=t.sibling}s.tail!==null&&zt()>pa&&(e.flags|=128,i=!0,Ua(s,!1),e.lanes=4194304)}else{if(!i)if(t=Eu(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Ua(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!Pt)return on(e),null}else 2*zt()-s.renderingStartTime>pa&&n!==1073741824&&(e.flags|=128,i=!0,Ua(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=zt(),e.sibling=null,n=Lt.current,Et(Lt,i?n&1|2:n&1),e):(on(e),null);case 22:case 23:return tp(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Fn&1073741824&&(on(e),e.subtreeFlags&6&&(e.flags|=8192)):on(e),null;case 24:return null;case 25:return null}throw Error(oe(156,e.tag))}function sM(t,e){switch(Nh(e),e.tag){case 1:return bn(e.type)&&gu(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return da(),Rt(Cn),Rt(pn),Wh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Gh(e),null;case 13:if(Rt(Lt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(oe(340));ca()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Rt(Lt),null;case 4:return da(),null;case 10:return zh(e.type._context),null;case 22:case 23:return tp(),null;case 24:return null;default:return null}}var rl=!1,cn=!1,aM=typeof WeakSet=="function"?WeakSet:Set,Ce=null;function Xs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Ft(t,e,i)}else n.current=null}function dd(t,e,n){try{n()}catch(i){Ft(t,e,i)}}var Im=!1;function oM(t,e){if(qf=du,t=b_(),Uh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,u=0,c=0,d=t,h=null;t:for(;;){for(var m;d!==n||r!==0&&d.nodeType!==3||(o=a+r),d!==s||i!==0&&d.nodeType!==3||(l=a+i),d.nodeType===3&&(a+=d.nodeValue.length),(m=d.firstChild)!==null;)h=d,d=m;for(;;){if(d===t)break t;if(h===n&&++u===r&&(o=a),h===s&&++c===i&&(l=a),(m=d.nextSibling)!==null)break;d=h,h=d.parentNode}d=m}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Kf={focusedElem:t,selectionRange:n},du=!1,Ce=e;Ce!==null;)if(e=Ce,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Ce=t;else for(;Ce!==null;){e=Ce;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var y=_.memoizedProps,p=_.memoizedState,f=e.stateNode,g=f.getSnapshotBeforeUpdate(e.elementType===e.type?y:ai(e.type,y),p);f.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(oe(163))}}catch(M){Ft(e,e.return,M)}if(t=e.sibling,t!==null){t.return=e.return,Ce=t;break}Ce=e.return}return _=Im,Im=!1,_}function so(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&dd(e,n,s)}r=r.next}while(r!==i)}}function Ju(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function hd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function T0(t){var e=t.alternate;e!==null&&(t.alternate=null,T0(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[yi],delete e[xo],delete e[Jf],delete e[GS],delete e[WS])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function A0(t){return t.tag===5||t.tag===3||t.tag===4}function Nm(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||A0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function pd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=mu));else if(i!==4&&(t=t.child,t!==null))for(pd(t,e,n),t=t.sibling;t!==null;)pd(t,e,n),t=t.sibling}function md(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(md(t,e,n),t=t.sibling;t!==null;)md(t,e,n),t=t.sibling}var tn=null,oi=!1;function Zi(t,e,n){for(n=n.child;n!==null;)R0(t,e,n),n=n.sibling}function R0(t,e,n){if(Si&&typeof Si.onCommitFiberUnmount=="function")try{Si.onCommitFiberUnmount(ju,n)}catch{}switch(n.tag){case 5:cn||Xs(n,e);case 6:var i=tn,r=oi;tn=null,Zi(t,e,n),tn=i,oi=r,tn!==null&&(oi?(t=tn,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):tn.removeChild(n.stateNode));break;case 18:tn!==null&&(oi?(t=tn,n=n.stateNode,t.nodeType===8?Dc(t.parentNode,n):t.nodeType===1&&Dc(t,n),mo(t)):Dc(tn,n.stateNode));break;case 4:i=tn,r=oi,tn=n.stateNode.containerInfo,oi=!0,Zi(t,e,n),tn=i,oi=r;break;case 0:case 11:case 14:case 15:if(!cn&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&dd(n,e,a),r=r.next}while(r!==i)}Zi(t,e,n);break;case 1:if(!cn&&(Xs(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){Ft(n,e,o)}Zi(t,e,n);break;case 21:Zi(t,e,n);break;case 22:n.mode&1?(cn=(i=cn)||n.memoizedState!==null,Zi(t,e,n),cn=i):Zi(t,e,n);break;default:Zi(t,e,n)}}function Fm(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new aM),e.forEach(function(i){var r=gM.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function ni(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:tn=o.stateNode,oi=!1;break e;case 3:tn=o.stateNode.containerInfo,oi=!0;break e;case 4:tn=o.stateNode.containerInfo,oi=!0;break e}o=o.return}if(tn===null)throw Error(oe(160));R0(s,a,r),tn=null,oi=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(u){Ft(r,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)C0(e,t),e=e.sibling}function C0(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(ni(e,t),gi(t),i&4){try{so(3,t,t.return),Ju(3,t)}catch(y){Ft(t,t.return,y)}try{so(5,t,t.return)}catch(y){Ft(t,t.return,y)}}break;case 1:ni(e,t),gi(t),i&512&&n!==null&&Xs(n,n.return);break;case 5:if(ni(e,t),gi(t),i&512&&n!==null&&Xs(n,n.return),t.flags&32){var r=t.stateNode;try{co(r,"")}catch(y){Ft(t,t.return,y)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Kv(r,s),zf(o,a);var u=zf(o,s);for(a=0;a<l.length;a+=2){var c=l[a],d=l[a+1];c==="style"?t_(r,d):c==="dangerouslySetInnerHTML"?Jv(r,d):c==="children"?co(r,d):xh(r,c,d,u)}switch(o){case"input":If(r,s);break;case"textarea":Zv(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var m=s.value;m!=null?Qs(r,!!s.multiple,m,!1):h!==!!s.multiple&&(s.defaultValue!=null?Qs(r,!!s.multiple,s.defaultValue,!0):Qs(r,!!s.multiple,s.multiple?[]:"",!1))}r[xo]=s}catch(y){Ft(t,t.return,y)}}break;case 6:if(ni(e,t),gi(t),i&4){if(t.stateNode===null)throw Error(oe(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(y){Ft(t,t.return,y)}}break;case 3:if(ni(e,t),gi(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{mo(e.containerInfo)}catch(y){Ft(t,t.return,y)}break;case 4:ni(e,t),gi(t);break;case 13:ni(e,t),gi(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Jh=zt())),i&4&&Fm(t);break;case 22:if(c=n!==null&&n.memoizedState!==null,t.mode&1?(cn=(u=cn)||c,ni(e,t),cn=u):ni(e,t),gi(t),i&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!c&&t.mode&1)for(Ce=t,c=t.child;c!==null;){for(d=Ce=c;Ce!==null;){switch(h=Ce,m=h.child,h.tag){case 0:case 11:case 14:case 15:so(4,h,h.return);break;case 1:Xs(h,h.return);var _=h.stateNode;if(typeof _.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(y){Ft(i,n,y)}}break;case 5:Xs(h,h.return);break;case 22:if(h.memoizedState!==null){km(d);continue}}m!==null?(m.return=h,Ce=m):km(d)}c=c.sibling}e:for(c=null,d=t;;){if(d.tag===5){if(c===null){c=d;try{r=d.stateNode,u?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=d.stateNode,l=d.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=e_("display",a))}catch(y){Ft(t,t.return,y)}}}else if(d.tag===6){if(c===null)try{d.stateNode.nodeValue=u?"":d.memoizedProps}catch(y){Ft(t,t.return,y)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;c===d&&(c=null),d=d.return}c===d&&(c=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:ni(e,t),gi(t),i&4&&Fm(t);break;case 21:break;default:ni(e,t),gi(t)}}function gi(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(A0(n)){var i=n;break e}n=n.return}throw Error(oe(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(co(r,""),i.flags&=-33);var s=Nm(t);md(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=Nm(t);pd(t,o,a);break;default:throw Error(oe(161))}}catch(l){Ft(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function lM(t,e,n){Ce=t,b0(t)}function b0(t,e,n){for(var i=(t.mode&1)!==0;Ce!==null;){var r=Ce,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||rl;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||cn;o=rl;var u=cn;if(rl=a,(cn=l)&&!u)for(Ce=r;Ce!==null;)a=Ce,l=a.child,a.tag===22&&a.memoizedState!==null?zm(r):l!==null?(l.return=a,Ce=l):zm(r);for(;s!==null;)Ce=s,b0(s),s=s.sibling;Ce=r,rl=o,cn=u}Om(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Ce=s):Om(t)}}function Om(t){for(;Ce!==null;){var e=Ce;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:cn||Ju(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!cn)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:ai(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Sm(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Sm(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var c=u.memoizedState;if(c!==null){var d=c.dehydrated;d!==null&&mo(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(oe(163))}cn||e.flags&512&&hd(e)}catch(h){Ft(e,e.return,h)}}if(e===t){Ce=null;break}if(n=e.sibling,n!==null){n.return=e.return,Ce=n;break}Ce=e.return}}function km(t){for(;Ce!==null;){var e=Ce;if(e===t){Ce=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Ce=n;break}Ce=e.return}}function zm(t){for(;Ce!==null;){var e=Ce;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Ju(4,e)}catch(l){Ft(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Ft(e,r,l)}}var s=e.return;try{hd(e)}catch(l){Ft(e,s,l)}break;case 5:var a=e.return;try{hd(e)}catch(l){Ft(e,a,l)}}}catch(l){Ft(e,e.return,l)}if(e===t){Ce=null;break}var o=e.sibling;if(o!==null){o.return=e.return,Ce=o;break}Ce=e.return}}var uM=Math.ceil,Au=$i.ReactCurrentDispatcher,Zh=$i.ReactCurrentOwner,Qn=$i.ReactCurrentBatchConfig,mt=0,Jt=null,Gt=null,nn=0,Fn=0,Ys=br(0),$t=0,Ao=null,ss=0,ec=0,Qh=0,ao=null,An=null,Jh=0,pa=1/0,Di=null,Ru=!1,gd=null,yr=null,sl=!1,dr=null,Cu=0,oo=0,vd=null,$l=-1,ql=0;function yn(){return mt&6?zt():$l!==-1?$l:$l=zt()}function xr(t){return t.mode&1?mt&2&&nn!==0?nn&-nn:XS.transition!==null?(ql===0&&(ql=h_()),ql):(t=vt,t!==0||(t=window.event,t=t===void 0?16:x_(t.type)),t):1}function hi(t,e,n,i){if(50<oo)throw oo=0,vd=null,Error(oe(185));Do(t,n,i),(!(mt&2)||t!==Jt)&&(t===Jt&&(!(mt&2)&&(ec|=n),$t===4&&ur(t,nn)),Pn(t,i),n===1&&mt===0&&!(e.mode&1)&&(pa=zt()+500,Ku&&Pr()))}function Pn(t,e){var n=t.callbackNode;Xx(t,e);var i=fu(t,t===Jt?nn:0);if(i===0)n!==null&&$p(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&$p(n),e===1)t.tag===0?jS(Bm.bind(null,t)):z_(Bm.bind(null,t)),HS(function(){!(mt&6)&&Pr()}),n=null;else{switch(p_(i)){case 1:n=Th;break;case 4:n=f_;break;case 16:n=cu;break;case 536870912:n=d_;break;default:n=cu}n=O0(n,P0.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function P0(t,e){if($l=-1,ql=0,mt&6)throw Error(oe(327));var n=t.callbackNode;if(ia()&&t.callbackNode!==n)return null;var i=fu(t,t===Jt?nn:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=bu(t,i);else{e=i;var r=mt;mt|=2;var s=D0();(Jt!==t||nn!==e)&&(Di=null,pa=zt()+500,es(t,e));do try{dM();break}catch(o){L0(t,o)}while(!0);kh(),Au.current=s,mt=r,Gt!==null?e=0:(Jt=null,nn=0,e=$t)}if(e!==0){if(e===2&&(r=Wf(t),r!==0&&(i=r,e=_d(t,r))),e===1)throw n=Ao,es(t,0),ur(t,i),Pn(t,zt()),n;if(e===6)ur(t,i);else{if(r=t.current.alternate,!(i&30)&&!cM(r)&&(e=bu(t,i),e===2&&(s=Wf(t),s!==0&&(i=s,e=_d(t,s))),e===1))throw n=Ao,es(t,0),ur(t,i),Pn(t,zt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(oe(345));case 2:Hr(t,An,Di);break;case 3:if(ur(t,i),(i&130023424)===i&&(e=Jh+500-zt(),10<e)){if(fu(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){yn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Qf(Hr.bind(null,t,An,Di),e);break}Hr(t,An,Di);break;case 4:if(ur(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-di(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=zt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*uM(i/1960))-i,10<i){t.timeoutHandle=Qf(Hr.bind(null,t,An,Di),i);break}Hr(t,An,Di);break;case 5:Hr(t,An,Di);break;default:throw Error(oe(329))}}}return Pn(t,zt()),t.callbackNode===n?P0.bind(null,t):null}function _d(t,e){var n=ao;return t.current.memoizedState.isDehydrated&&(es(t,e).flags|=256),t=bu(t,e),t!==2&&(e=An,An=n,e!==null&&yd(e)),t}function yd(t){An===null?An=t:An.push.apply(An,t)}function cM(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!mi(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ur(t,e){for(e&=~Qh,e&=~ec,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-di(e),i=1<<n;t[n]=-1,e&=~i}}function Bm(t){if(mt&6)throw Error(oe(327));ia();var e=fu(t,0);if(!(e&1))return Pn(t,zt()),null;var n=bu(t,e);if(t.tag!==0&&n===2){var i=Wf(t);i!==0&&(e=i,n=_d(t,i))}if(n===1)throw n=Ao,es(t,0),ur(t,e),Pn(t,zt()),n;if(n===6)throw Error(oe(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Hr(t,An,Di),Pn(t,zt()),null}function ep(t,e){var n=mt;mt|=1;try{return t(e)}finally{mt=n,mt===0&&(pa=zt()+500,Ku&&Pr())}}function as(t){dr!==null&&dr.tag===0&&!(mt&6)&&ia();var e=mt;mt|=1;var n=Qn.transition,i=vt;try{if(Qn.transition=null,vt=1,t)return t()}finally{vt=i,Qn.transition=n,mt=e,!(mt&6)&&Pr()}}function tp(){Fn=Ys.current,Rt(Ys)}function es(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,BS(n)),Gt!==null)for(n=Gt.return;n!==null;){var i=n;switch(Nh(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&gu();break;case 3:da(),Rt(Cn),Rt(pn),Wh();break;case 5:Gh(i);break;case 4:da();break;case 13:Rt(Lt);break;case 19:Rt(Lt);break;case 10:zh(i.type._context);break;case 22:case 23:tp()}n=n.return}if(Jt=t,Gt=t=Sr(t.current,null),nn=Fn=e,$t=0,Ao=null,Qh=ec=ss=0,An=ao=null,qr!==null){for(e=0;e<qr.length;e++)if(n=qr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}qr=null}return t}function L0(t,e){do{var n=Gt;try{if(kh(),jl.current=Tu,wu){for(var i=Ut.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}wu=!1}if(rs=0,Qt=Xt=Ut=null,ro=!1,Eo=0,Zh.current=null,n===null||n.return===null){$t=1,Ao=e,Gt=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=nn,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,c=o,d=c.tag;if(!(c.mode&1)&&(d===0||d===11||d===15)){var h=c.alternate;h?(c.updateQueue=h.updateQueue,c.memoizedState=h.memoizedState,c.lanes=h.lanes):(c.updateQueue=null,c.memoizedState=null)}var m=Rm(a);if(m!==null){m.flags&=-257,Cm(m,a,o,s,e),m.mode&1&&Am(s,u,e),e=m,l=u;var _=e.updateQueue;if(_===null){var y=new Set;y.add(l),e.updateQueue=y}else _.add(l);break e}else{if(!(e&1)){Am(s,u,e),np();break e}l=Error(oe(426))}}else if(Pt&&o.mode&1){var p=Rm(a);if(p!==null){!(p.flags&65536)&&(p.flags|=256),Cm(p,a,o,s,e),Fh(ha(l,o));break e}}s=l=ha(l,o),$t!==4&&($t=2),ao===null?ao=[s]:ao.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var f=p0(s,l,e);xm(s,f);break e;case 1:o=l;var g=s.type,v=s.stateNode;if(!(s.flags&128)&&(typeof g.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(yr===null||!yr.has(v)))){s.flags|=65536,e&=-e,s.lanes|=e;var M=m0(s,o,e);xm(s,M);break e}}s=s.return}while(s!==null)}I0(n)}catch(R){e=R,Gt===n&&n!==null&&(Gt=n=n.return);continue}break}while(!0)}function D0(){var t=Au.current;return Au.current=Tu,t===null?Tu:t}function np(){($t===0||$t===3||$t===2)&&($t=4),Jt===null||!(ss&268435455)&&!(ec&268435455)||ur(Jt,nn)}function bu(t,e){var n=mt;mt|=2;var i=D0();(Jt!==t||nn!==e)&&(Di=null,es(t,e));do try{fM();break}catch(r){L0(t,r)}while(!0);if(kh(),mt=n,Au.current=i,Gt!==null)throw Error(oe(261));return Jt=null,nn=0,$t}function fM(){for(;Gt!==null;)U0(Gt)}function dM(){for(;Gt!==null&&!Ox();)U0(Gt)}function U0(t){var e=F0(t.alternate,t,Fn);t.memoizedProps=t.pendingProps,e===null?I0(t):Gt=e,Zh.current=null}function I0(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=sM(n,e),n!==null){n.flags&=32767,Gt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{$t=6,Gt=null;return}}else if(n=rM(n,e,Fn),n!==null){Gt=n;return}if(e=e.sibling,e!==null){Gt=e;return}Gt=e=t}while(e!==null);$t===0&&($t=5)}function Hr(t,e,n){var i=vt,r=Qn.transition;try{Qn.transition=null,vt=1,hM(t,e,n,i)}finally{Qn.transition=r,vt=i}return null}function hM(t,e,n,i){do ia();while(dr!==null);if(mt&6)throw Error(oe(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(oe(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Yx(t,s),t===Jt&&(Gt=Jt=null,nn=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||sl||(sl=!0,O0(cu,function(){return ia(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Qn.transition,Qn.transition=null;var a=vt;vt=1;var o=mt;mt|=4,Zh.current=null,oM(t,n),C0(n,t),US(Kf),du=!!qf,Kf=qf=null,t.current=n,lM(n),kx(),mt=o,vt=a,Qn.transition=s}else t.current=n;if(sl&&(sl=!1,dr=t,Cu=r),s=t.pendingLanes,s===0&&(yr=null),Hx(n.stateNode),Pn(t,zt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Ru)throw Ru=!1,t=gd,gd=null,t;return Cu&1&&t.tag!==0&&ia(),s=t.pendingLanes,s&1?t===vd?oo++:(oo=0,vd=t):oo=0,Pr(),null}function ia(){if(dr!==null){var t=p_(Cu),e=Qn.transition,n=vt;try{if(Qn.transition=null,vt=16>t?16:t,dr===null)var i=!1;else{if(t=dr,dr=null,Cu=0,mt&6)throw Error(oe(331));var r=mt;for(mt|=4,Ce=t.current;Ce!==null;){var s=Ce,a=s.child;if(Ce.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var u=o[l];for(Ce=u;Ce!==null;){var c=Ce;switch(c.tag){case 0:case 11:case 15:so(8,c,s)}var d=c.child;if(d!==null)d.return=c,Ce=d;else for(;Ce!==null;){c=Ce;var h=c.sibling,m=c.return;if(T0(c),c===u){Ce=null;break}if(h!==null){h.return=m,Ce=h;break}Ce=m}}}var _=s.alternate;if(_!==null){var y=_.child;if(y!==null){_.child=null;do{var p=y.sibling;y.sibling=null,y=p}while(y!==null)}}Ce=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,Ce=a;else e:for(;Ce!==null;){if(s=Ce,s.flags&2048)switch(s.tag){case 0:case 11:case 15:so(9,s,s.return)}var f=s.sibling;if(f!==null){f.return=s.return,Ce=f;break e}Ce=s.return}}var g=t.current;for(Ce=g;Ce!==null;){a=Ce;var v=a.child;if(a.subtreeFlags&2064&&v!==null)v.return=a,Ce=v;else e:for(a=g;Ce!==null;){if(o=Ce,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:Ju(9,o)}}catch(R){Ft(o,o.return,R)}if(o===a){Ce=null;break e}var M=o.sibling;if(M!==null){M.return=o.return,Ce=M;break e}Ce=o.return}}if(mt=r,Pr(),Si&&typeof Si.onPostCommitFiberRoot=="function")try{Si.onPostCommitFiberRoot(ju,t)}catch{}i=!0}return i}finally{vt=n,Qn.transition=e}}return!1}function Hm(t,e,n){e=ha(n,e),e=p0(t,e,1),t=_r(t,e,1),e=yn(),t!==null&&(Do(t,1,e),Pn(t,e))}function Ft(t,e,n){if(t.tag===3)Hm(t,t,n);else for(;e!==null;){if(e.tag===3){Hm(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(yr===null||!yr.has(i))){t=ha(n,t),t=m0(e,t,1),e=_r(e,t,1),t=yn(),e!==null&&(Do(e,1,t),Pn(e,t));break}}e=e.return}}function pM(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=yn(),t.pingedLanes|=t.suspendedLanes&n,Jt===t&&(nn&n)===n&&($t===4||$t===3&&(nn&130023424)===nn&&500>zt()-Jh?es(t,0):Qh|=n),Pn(t,e)}function N0(t,e){e===0&&(t.mode&1?(e=qo,qo<<=1,!(qo&130023424)&&(qo=4194304)):e=1);var n=yn();t=Gi(t,e),t!==null&&(Do(t,e,n),Pn(t,n))}function mM(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),N0(t,n)}function gM(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(oe(314))}i!==null&&i.delete(e),N0(t,n)}var F0;F0=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Cn.current)Rn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Rn=!1,iM(t,e,n);Rn=!!(t.flags&131072)}else Rn=!1,Pt&&e.flags&1048576&&B_(e,yu,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Yl(t,e),t=e.pendingProps;var r=ua(e,pn.current);na(e,n),r=Xh(null,e,i,t,r,n);var s=Yh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,bn(i)?(s=!0,vu(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Hh(e),r.updater=Qu,e.stateNode=r,r._reactInternals=e,sd(e,i,t,n),e=ld(null,e,i,!0,s,n)):(e.tag=0,Pt&&s&&Ih(e),vn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Yl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=_M(i),t=ai(i,t),r){case 0:e=od(null,e,i,t,n);break e;case 1:e=Lm(null,e,i,t,n);break e;case 11:e=bm(null,e,i,t,n);break e;case 14:e=Pm(null,e,i,ai(i.type,t),n);break e}throw Error(oe(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ai(i,r),od(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ai(i,r),Lm(t,e,i,r,n);case 3:e:{if(y0(e),t===null)throw Error(oe(387));i=e.pendingProps,s=e.memoizedState,r=s.element,X_(t,e),Mu(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=ha(Error(oe(423)),e),e=Dm(t,e,i,n,r);break e}else if(i!==r){r=ha(Error(oe(424)),e),e=Dm(t,e,i,n,r);break e}else for(kn=vr(e.stateNode.containerInfo.firstChild),zn=e,Pt=!0,ui=null,n=W_(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ca(),i===r){e=Wi(t,e,n);break e}vn(t,e,i,n)}e=e.child}return e;case 5:return Y_(e),t===null&&nd(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,Zf(i,r)?a=null:s!==null&&Zf(i,s)&&(e.flags|=32),_0(t,e),vn(t,e,a,n),e.child;case 6:return t===null&&nd(e),null;case 13:return x0(t,e,n);case 4:return Vh(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=fa(e,null,i,n):vn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ai(i,r),bm(t,e,i,r,n);case 7:return vn(t,e,e.pendingProps,n),e.child;case 8:return vn(t,e,e.pendingProps.children,n),e.child;case 12:return vn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,Et(xu,i._currentValue),i._currentValue=a,s!==null)if(mi(s.value,a)){if(s.children===r.children&&!Cn.current){e=Wi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=zi(-1,n&-n),l.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var c=u.pending;c===null?l.next=l:(l.next=c.next,c.next=l),u.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),id(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(oe(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),id(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}vn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,na(e,n),r=Jn(r),i=i(r),e.flags|=1,vn(t,e,i,n),e.child;case 14:return i=e.type,r=ai(i,e.pendingProps),r=ai(i.type,r),Pm(t,e,i,r,n);case 15:return g0(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ai(i,r),Yl(t,e),e.tag=1,bn(i)?(t=!0,vu(e)):t=!1,na(e,n),h0(e,i,r),sd(e,i,r,n),ld(null,e,i,!0,t,n);case 19:return S0(t,e,n);case 22:return v0(t,e,n)}throw Error(oe(156,e.tag))};function O0(t,e){return c_(t,e)}function vM(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Kn(t,e,n,i){return new vM(t,e,n,i)}function ip(t){return t=t.prototype,!(!t||!t.isReactComponent)}function _M(t){if(typeof t=="function")return ip(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Mh)return 11;if(t===Eh)return 14}return 2}function Sr(t,e){var n=t.alternate;return n===null?(n=Kn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Kl(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")ip(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case Os:return ts(n.children,r,s,e);case Sh:a=8,r|=8;break;case bf:return t=Kn(12,n,e,r|2),t.elementType=bf,t.lanes=s,t;case Pf:return t=Kn(13,n,e,r),t.elementType=Pf,t.lanes=s,t;case Lf:return t=Kn(19,n,e,r),t.elementType=Lf,t.lanes=s,t;case Yv:return tc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case jv:a=10;break e;case Xv:a=9;break e;case Mh:a=11;break e;case Eh:a=14;break e;case sr:a=16,i=null;break e}throw Error(oe(130,t==null?t:typeof t,""))}return e=Kn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function ts(t,e,n,i){return t=Kn(7,t,i,e),t.lanes=n,t}function tc(t,e,n,i){return t=Kn(22,t,i,e),t.elementType=Yv,t.lanes=n,t.stateNode={isHidden:!1},t}function Bc(t,e,n){return t=Kn(6,t,null,e),t.lanes=n,t}function Hc(t,e,n){return e=Kn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function yM(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Sc(0),this.expirationTimes=Sc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Sc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function rp(t,e,n,i,r,s,a,o,l){return t=new yM(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Kn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Hh(s),t}function xM(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Fs,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function k0(t){if(!t)return Ar;t=t._reactInternals;e:{if(ds(t)!==t||t.tag!==1)throw Error(oe(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(bn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(oe(171))}if(t.tag===1){var n=t.type;if(bn(n))return k_(t,n,e)}return e}function z0(t,e,n,i,r,s,a,o,l){return t=rp(n,i,!0,t,r,s,a,o,l),t.context=k0(null),n=t.current,i=yn(),r=xr(n),s=zi(i,r),s.callback=e??null,_r(n,s,r),t.current.lanes=r,Do(t,r,i),Pn(t,i),t}function nc(t,e,n,i){var r=e.current,s=yn(),a=xr(r);return n=k0(n),e.context===null?e.context=n:e.pendingContext=n,e=zi(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=_r(r,e,a),t!==null&&(hi(t,r,a,s),Wl(t,r,a)),a}function Pu(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Vm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function sp(t,e){Vm(t,e),(t=t.alternate)&&Vm(t,e)}function SM(){return null}var B0=typeof reportError=="function"?reportError:function(t){console.error(t)};function ap(t){this._internalRoot=t}ic.prototype.render=ap.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(oe(409));nc(t,e,null,null)};ic.prototype.unmount=ap.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;as(function(){nc(null,t,null,null)}),e[Vi]=null}};function ic(t){this._internalRoot=t}ic.prototype.unstable_scheduleHydration=function(t){if(t){var e=v_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<lr.length&&e!==0&&e<lr[n].priority;n++);lr.splice(n,0,t),n===0&&y_(t)}};function op(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function rc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Gm(){}function MM(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var u=Pu(a);s.call(u)}}var a=z0(e,i,t,0,null,!1,!1,"",Gm);return t._reactRootContainer=a,t[Vi]=a.current,_o(t.nodeType===8?t.parentNode:t),as(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var u=Pu(l);o.call(u)}}var l=rp(t,0,!1,null,null,!1,!1,"",Gm);return t._reactRootContainer=l,t[Vi]=l.current,_o(t.nodeType===8?t.parentNode:t),as(function(){nc(e,l,n,i)}),l}function sc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=Pu(a);o.call(l)}}nc(e,a,t,r)}else a=MM(n,e,t,r,i);return Pu(a)}m_=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=qa(e.pendingLanes);n!==0&&(Ah(e,n|1),Pn(e,zt()),!(mt&6)&&(pa=zt()+500,Pr()))}break;case 13:as(function(){var i=Gi(t,1);if(i!==null){var r=yn();hi(i,t,1,r)}}),sp(t,1)}};Rh=function(t){if(t.tag===13){var e=Gi(t,134217728);if(e!==null){var n=yn();hi(e,t,134217728,n)}sp(t,134217728)}};g_=function(t){if(t.tag===13){var e=xr(t),n=Gi(t,e);if(n!==null){var i=yn();hi(n,t,e,i)}sp(t,e)}};v_=function(){return vt};__=function(t,e){var n=vt;try{return vt=t,e()}finally{vt=n}};Hf=function(t,e,n){switch(e){case"input":if(If(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=qu(i);if(!r)throw Error(oe(90));qv(i),If(i,r)}}}break;case"textarea":Zv(t,n);break;case"select":e=n.value,e!=null&&Qs(t,!!n.multiple,e,!1)}};r_=ep;s_=as;var EM={usingClientEntryPoint:!1,Events:[Io,Hs,qu,n_,i_,ep]},Ia={findFiberByHostInstance:$r,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},wM={bundleType:Ia.bundleType,version:Ia.version,rendererPackageName:Ia.rendererPackageName,rendererConfig:Ia.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:$i.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=l_(t),t===null?null:t.stateNode},findFiberByHostInstance:Ia.findFiberByHostInstance||SM,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var al=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!al.isDisabled&&al.supportsFiber)try{ju=al.inject(wM),Si=al}catch{}}Hn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=EM;Hn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!op(e))throw Error(oe(200));return xM(t,e,null,n)};Hn.createRoot=function(t,e){if(!op(t))throw Error(oe(299));var n=!1,i="",r=B0;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=rp(t,1,!1,null,null,n,!1,i,r),t[Vi]=e.current,_o(t.nodeType===8?t.parentNode:t),new ap(e)};Hn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(oe(188)):(t=Object.keys(t).join(","),Error(oe(268,t)));return t=l_(e),t=t===null?null:t.stateNode,t};Hn.flushSync=function(t){return as(t)};Hn.hydrate=function(t,e,n){if(!rc(e))throw Error(oe(200));return sc(null,t,e,!0,n)};Hn.hydrateRoot=function(t,e,n){if(!op(t))throw Error(oe(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=B0;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=z0(e,null,t,1,n??null,r,!1,s,a),t[Vi]=e.current,_o(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new ic(e)};Hn.render=function(t,e,n){if(!rc(e))throw Error(oe(200));return sc(null,t,e,!1,n)};Hn.unmountComponentAtNode=function(t){if(!rc(t))throw Error(oe(40));return t._reactRootContainer?(as(function(){sc(null,null,t,!1,function(){t._reactRootContainer=null,t[Vi]=null})}),!0):!1};Hn.unstable_batchedUpdates=ep;Hn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!rc(n))throw Error(oe(200));if(t==null||t._reactInternals===void 0)throw Error(oe(38));return sc(t,e,n,!1,i)};Hn.version="18.3.1-next-f1338f8080-20240426";function H0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(H0)}catch(t){console.error(t)}}H0(),Hv.exports=Hn;var lp=Hv.exports;const TM=bv(lp),AM=Cv({__proto__:null,default:TM},[lp]);var V0,Wm=lp;V0=Wm.createRoot,Wm.hydrateRoot;/**
 * @remix-run/router v1.23.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function bt(){return bt=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)({}).hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},bt.apply(null,arguments)}var Vt;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(Vt||(Vt={}));const jm="popstate";function RM(t){t===void 0&&(t={});function e(i,r){let{pathname:s,search:a,hash:o}=i.location;return Ro("",{pathname:s,search:a,hash:o},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(i,r){return typeof r=="string"?r:ls(r)}return bM(e,n,null,t)}function it(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function os(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function CM(){return Math.random().toString(36).substr(2,8)}function Xm(t,e){return{usr:t.state,key:t.key,idx:e}}function Ro(t,e,n,i){return n===void 0&&(n=null),bt({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?Lr(e):e,{state:n,key:e&&e.key||i||CM()})}function ls(t){let{pathname:e="/",search:n="",hash:i=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),i&&i!=="#"&&(e+=i.charAt(0)==="#"?i:"#"+i),e}function Lr(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let i=t.indexOf("?");i>=0&&(e.search=t.substr(i),t=t.substr(0,i)),t&&(e.pathname=t)}return e}function bM(t,e,n,i){i===void 0&&(i={});let{window:r=document.defaultView,v5Compat:s=!1}=i,a=r.history,o=Vt.Pop,l=null,u=c();u==null&&(u=0,a.replaceState(bt({},a.state,{idx:u}),""));function c(){return(a.state||{idx:null}).idx}function d(){o=Vt.Pop;let p=c(),f=p==null?null:p-u;u=p,l&&l({action:o,location:y.location,delta:f})}function h(p,f){o=Vt.Push;let g=Ro(y.location,p,f);u=c()+1;let v=Xm(g,u),M=y.createHref(g);try{a.pushState(v,"",M)}catch(R){if(R instanceof DOMException&&R.name==="DataCloneError")throw R;r.location.assign(M)}s&&l&&l({action:o,location:y.location,delta:1})}function m(p,f){o=Vt.Replace;let g=Ro(y.location,p,f);u=c();let v=Xm(g,u),M=y.createHref(g);a.replaceState(v,"",M),s&&l&&l({action:o,location:y.location,delta:0})}function _(p){let f=r.location.origin!=="null"?r.location.origin:r.location.href,g=typeof p=="string"?p:ls(p);return g=g.replace(/ $/,"%20"),it(f,"No window.location.(origin|href) available to create URL for href: "+g),new URL(g,f)}let y={get action(){return o},get location(){return t(r,a)},listen(p){if(l)throw new Error("A history only accepts one active listener");return r.addEventListener(jm,d),l=p,()=>{r.removeEventListener(jm,d),l=null}},createHref(p){return e(r,p)},createURL:_,encodeLocation(p){let f=_(p);return{pathname:f.pathname,search:f.search,hash:f.hash}},push:h,replace:m,go(p){return a.go(p)}};return y}var gt;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(gt||(gt={}));const PM=new Set(["lazy","caseSensitive","path","id","index","children"]);function LM(t){return t.index===!0}function Lu(t,e,n,i){return n===void 0&&(n=[]),i===void 0&&(i={}),t.map((r,s)=>{let a=[...n,String(s)],o=typeof r.id=="string"?r.id:a.join("-");if(it(r.index!==!0||!r.children,"Cannot specify children on an index route"),it(!i[o],'Found a route id collision on id "'+o+`".  Route id's must be globally unique within Data Router usages`),LM(r)){let l=bt({},r,e(r),{id:o});return i[o]=l,l}else{let l=bt({},r,e(r),{id:o,children:void 0});return i[o]=l,r.children&&(l.children=Lu(r.children,e,a,i)),l}})}function Wr(t,e,n){return n===void 0&&(n="/"),Zl(t,e,n,!1)}function Zl(t,e,n,i){let r=typeof e=="string"?Lr(e):e,s=ji(r.pathname||"/",n);if(s==null)return null;let a=G0(t);UM(a);let o=null,l=WM(s);for(let u=0;o==null&&u<a.length;++u)o=VM(a[u],l,i);return o}function DM(t,e){let{route:n,pathname:i,params:r}=t;return{id:n.id,pathname:i,params:r,data:e[n.id],handle:n.handle}}function G0(t,e,n,i){e===void 0&&(e=[]),n===void 0&&(n=[]),i===void 0&&(i="");let r=(s,a,o)=>{let l={relativePath:o===void 0?s.path||"":o,caseSensitive:s.caseSensitive===!0,childrenIndex:a,route:s};l.relativePath.startsWith("/")&&(it(l.relativePath.startsWith(i),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+i+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(i.length));let u=Bi([i,l.relativePath]),c=n.concat(l);s.children&&s.children.length>0&&(it(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),G0(s.children,e,c,u)),!(s.path==null&&!s.index)&&e.push({path:u,score:BM(u,s.index),routesMeta:c})};return t.forEach((s,a)=>{var o;if(s.path===""||!((o=s.path)!=null&&o.includes("?")))r(s,a);else for(let l of W0(s.path))r(s,a,l)}),e}function W0(t){let e=t.split("/");if(e.length===0)return[];let[n,...i]=e,r=n.endsWith("?"),s=n.replace(/\?$/,"");if(i.length===0)return r?[s,""]:[s];let a=W0(i.join("/")),o=[];return o.push(...a.map(l=>l===""?s:[s,l].join("/"))),r&&o.push(...a),o.map(l=>t.startsWith("/")&&l===""?"/":l)}function UM(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:HM(e.routesMeta.map(i=>i.childrenIndex),n.routesMeta.map(i=>i.childrenIndex)))}const IM=/^:[\w-]+$/,NM=3,FM=2,OM=1,kM=10,zM=-2,Ym=t=>t==="*";function BM(t,e){let n=t.split("/"),i=n.length;return n.some(Ym)&&(i+=zM),e&&(i+=FM),n.filter(r=>!Ym(r)).reduce((r,s)=>r+(IM.test(s)?NM:s===""?OM:kM),i)}function HM(t,e){return t.length===e.length&&t.slice(0,-1).every((i,r)=>i===e[r])?t[t.length-1]-e[e.length-1]:0}function VM(t,e,n){n===void 0&&(n=!1);let{routesMeta:i}=t,r={},s="/",a=[];for(let o=0;o<i.length;++o){let l=i[o],u=o===i.length-1,c=s==="/"?e:e.slice(s.length)||"/",d=Du({path:l.relativePath,caseSensitive:l.caseSensitive,end:u},c),h=l.route;if(!d&&u&&n&&!i[i.length-1].route.index&&(d=Du({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},c)),!d)return null;Object.assign(r,d.params),a.push({params:r,pathname:Bi([s,d.pathname]),pathnameBase:$M(Bi([s,d.pathnameBase])),route:h}),d.pathnameBase!=="/"&&(s=Bi([s,d.pathnameBase]))}return a}function Du(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,i]=GM(t.path,t.caseSensitive,t.end),r=e.match(n);if(!r)return null;let s=r[0],a=s.replace(/(.)\/+$/,"$1"),o=r.slice(1);return{params:i.reduce((u,c,d)=>{let{paramName:h,isOptional:m}=c;if(h==="*"){let y=o[d]||"";a=s.slice(0,s.length-y.length).replace(/(.)\/+$/,"$1")}const _=o[d];return m&&!_?u[h]=void 0:u[h]=(_||"").replace(/%2F/g,"/"),u},{}),pathname:s,pathnameBase:a,pattern:t}}function GM(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),os(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let i=[],r="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,o,l)=>(i.push({paramName:o,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(i.push({paramName:"*"}),r+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":t!==""&&t!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,e?void 0:"i"),i]}function WM(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return os(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function ji(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,i=t.charAt(n);return i&&i!=="/"?null:t.slice(n)||"/"}const jM=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,XM=t=>jM.test(t);function YM(t,e){e===void 0&&(e="/");let{pathname:n,search:i="",hash:r=""}=typeof t=="string"?Lr(t):t,s;if(n)if(XM(n))s=n;else{if(n.includes("//")){let a=n;n=fp(n),os(!1,"Pathnames cannot have embedded double slashes - normalizing "+(a+" -> "+n))}n.startsWith("/")?s=$m(n.substring(1),"/"):s=$m(n,e)}else s=e;return{pathname:s,search:qM(i),hash:KM(r)}}function $m(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function Vc(t,e,n,i){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(i)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function j0(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function up(t,e){let n=j0(t);return e?n.map((i,r)=>r===n.length-1?i.pathname:i.pathnameBase):n.map(i=>i.pathnameBase)}function cp(t,e,n,i){i===void 0&&(i=!1);let r;typeof t=="string"?r=Lr(t):(r=bt({},t),it(!r.pathname||!r.pathname.includes("?"),Vc("?","pathname","search",r)),it(!r.pathname||!r.pathname.includes("#"),Vc("#","pathname","hash",r)),it(!r.search||!r.search.includes("#"),Vc("#","search","hash",r)));let s=t===""||r.pathname==="",a=s?"/":r.pathname,o;if(a==null)o=n;else{let d=e.length-1;if(!i&&a.startsWith("..")){let h=a.split("/");for(;h[0]==="..";)h.shift(),d-=1;r.pathname=h.join("/")}o=d>=0?e[d]:"/"}let l=YM(r,o),u=a&&a!=="/"&&a.endsWith("/"),c=(s||a===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(u||c)&&(l.pathname+="/"),l}const fp=t=>t.replace(/\/\/+/g,"/"),Bi=t=>fp(t.join("/")),$M=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),qM=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,KM=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;class Uu{constructor(e,n,i,r){r===void 0&&(r=!1),this.status=e,this.statusText=n||"",this.internal=r,i instanceof Error?(this.data=i.toString(),this.error=i):this.data=i}}function Co(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const X0=["post","put","patch","delete"],ZM=new Set(X0),QM=["get",...X0],JM=new Set(QM),eE=new Set([301,302,303,307,308]),tE=new Set([307,308]),Gc={state:"idle",location:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},nE={state:"idle",data:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},Na={state:"unblocked",proceed:void 0,reset:void 0,location:void 0},dp=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,iE=t=>({hasErrorBoundary:!!t.hasErrorBoundary}),Y0="remix-router-transitions";function rE(t){const e=t.window?t.window:typeof window<"u"?window:void 0,n=typeof e<"u"&&typeof e.document<"u"&&typeof e.document.createElement<"u",i=!n;it(t.routes.length>0,"You must provide a non-empty routes array to createRouter");let r;if(t.mapRouteProperties)r=t.mapRouteProperties;else if(t.detectErrorBoundary){let L=t.detectErrorBoundary;r=O=>({hasErrorBoundary:L(O)})}else r=iE;let s={},a=Lu(t.routes,r,void 0,s),o,l=t.basename||"/",u=t.dataStrategy||lE,c=t.patchRoutesOnNavigation,d=bt({v7_fetcherPersist:!1,v7_normalizeFormMethod:!1,v7_partialHydration:!1,v7_prependBasename:!1,v7_relativeSplatPath:!1,v7_skipActionErrorRevalidation:!1},t.future),h=null,m=new Set,_=null,y=null,p=null,f=t.hydrationData!=null,g=Wr(a,t.history.location,l),v=!1,M=null;if(g==null&&!c){let L=Tn(404,{pathname:t.history.location.pathname}),{matches:O,route:X}=sg(a);g=O,M={[X.id]:L}}g&&!t.hydrationData&&lt(g,a,t.history.location.pathname).active&&(g=null);let R;if(g)if(g.some(L=>L.route.lazy))R=!1;else if(!g.some(L=>L.route.loader))R=!0;else if(d.v7_partialHydration){let L=t.hydrationData?t.hydrationData.loaderData:null,O=t.hydrationData?t.hydrationData.errors:null;if(O){let X=g.findIndex(ae=>O[ae.route.id]!==void 0);R=g.slice(0,X+1).every(ae=>!Sd(ae.route,L,O))}else R=g.every(X=>!Sd(X.route,L,O))}else R=t.hydrationData!=null;else if(R=!1,g=[],d.v7_partialHydration){let L=lt(null,a,t.history.location.pathname);L.active&&L.matches&&(v=!0,g=L.matches)}let A,S={historyAction:t.history.action,location:t.history.location,matches:g,initialized:R,navigation:Gc,restoreScrollPosition:t.hydrationData!=null?!1:null,preventScrollReset:!1,revalidation:"idle",loaderData:t.hydrationData&&t.hydrationData.loaderData||{},actionData:t.hydrationData&&t.hydrationData.actionData||null,errors:t.hydrationData&&t.hydrationData.errors||M,fetchers:new Map,blockers:new Map},C=Vt.Pop,B=!1,x,E=!1,z=new Map,V=null,j=!1,Z=!1,Y=[],ne=new Set,P=new Map,J=0,te=-1,le=new Map,Ee=new Set,Ze=new Map,W=new Map,K=new Set,fe=new Map,de=new Map,Be;function Fe(){if(h=t.history.listen(L=>{let{action:O,location:X,delta:ae}=L;if(Be){Be(),Be=void 0;return}os(de.size===0||ae!=null,"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");let pe=q({currentLocation:S.location,nextLocation:X,historyAction:O});if(pe&&ae!=null){let Ue=new Promise(Ge=>{Be=Ge});t.history.go(ae*-1),xe(pe,{state:"blocked",location:X,proceed(){xe(pe,{state:"proceeding",proceed:void 0,reset:void 0,location:X}),Ue.then(()=>t.history.go(ae))},reset(){let Ge=new Map(S.blockers);Ge.set(pe,Na),Ve({blockers:Ge})}});return}return et(O,X)}),n){ME(e,z);let L=()=>EE(e,z);e.addEventListener("pagehide",L),V=()=>e.removeEventListener("pagehide",L)}return S.initialized||et(Vt.Pop,S.location,{initialHydration:!0}),A}function We(){h&&h(),V&&V(),m.clear(),x&&x.abort(),S.fetchers.forEach((L,O)=>we(O)),S.blockers.forEach((L,O)=>I(O))}function dt(L){return m.add(L),()=>m.delete(L)}function Ve(L,O){O===void 0&&(O={}),S=bt({},S,L);let X=[],ae=[];d.v7_fetcherPersist&&S.fetchers.forEach((pe,Ue)=>{pe.state==="idle"&&(K.has(Ue)?ae.push(Ue):X.push(Ue))}),K.forEach(pe=>{!S.fetchers.has(pe)&&!P.has(pe)&&ae.push(pe)}),[...m].forEach(pe=>pe(S,{deletedFetchers:ae,viewTransitionOpts:O.viewTransitionOpts,flushSync:O.flushSync===!0})),d.v7_fetcherPersist?(X.forEach(pe=>S.fetchers.delete(pe)),ae.forEach(pe=>we(pe))):ae.forEach(pe=>K.delete(pe))}function U(L,O,X){var ae,pe;let{flushSync:Ue}=X===void 0?{}:X,Ge=S.actionData!=null&&S.navigation.formMethod!=null&&li(S.navigation.formMethod)&&S.navigation.state==="loading"&&((ae=L.state)==null?void 0:ae._isRedirect)!==!0,Te;O.actionData?Object.keys(O.actionData).length>0?Te=O.actionData:Te=null:Ge?Te=S.actionData:Te=null;let be=O.loaderData?ig(S.loaderData,O.loaderData,O.matches||[],O.errors):S.loaderData,Ae=S.blockers;Ae.size>0&&(Ae=new Map(Ae),Ae.forEach((ut,T)=>Ae.set(T,Na)));let Ie=B===!0||S.navigation.formMethod!=null&&li(S.navigation.formMethod)&&((pe=L.state)==null?void 0:pe._isRedirect)!==!0;o&&(a=o,o=void 0),j||C===Vt.Pop||(C===Vt.Push?t.history.push(L,L.state):C===Vt.Replace&&t.history.replace(L,L.state));let Qe;if(C===Vt.Pop){let ut=z.get(S.location.pathname);ut&&ut.has(L.pathname)?Qe={currentLocation:S.location,nextLocation:L}:z.has(L.pathname)&&(Qe={currentLocation:L,nextLocation:S.location})}else if(E){let ut=z.get(S.location.pathname);ut?ut.add(L.pathname):(ut=new Set([L.pathname]),z.set(S.location.pathname,ut)),Qe={currentLocation:S.location,nextLocation:L}}Ve(bt({},O,{actionData:Te,loaderData:be,historyAction:C,location:L,initialized:!0,navigation:Gc,revalidation:"idle",restoreScrollPosition:en(L,O.matches||S.matches),preventScrollReset:Ie,blockers:Ae}),{viewTransitionOpts:Qe,flushSync:Ue===!0}),C=Vt.Pop,B=!1,E=!1,j=!1,Z=!1,Y=[]}async function sn(L,O){if(typeof L=="number"){t.history.go(L);return}let X=xd(S.location,S.matches,l,d.v7_prependBasename,L,d.v7_relativeSplatPath,O==null?void 0:O.fromRouteId,O==null?void 0:O.relative),{path:ae,submission:pe,error:Ue}=qm(d.v7_normalizeFormMethod,!1,X,O),Ge=S.location,Te=Ro(S.location,ae,O&&O.state);Te=bt({},Te,t.history.encodeLocation(Te));let be=O&&O.replace!=null?O.replace:void 0,Ae=Vt.Push;be===!0?Ae=Vt.Replace:be===!1||pe!=null&&li(pe.formMethod)&&pe.formAction===S.location.pathname+S.location.search&&(Ae=Vt.Replace);let Ie=O&&"preventScrollReset"in O?O.preventScrollReset===!0:void 0,Qe=(O&&O.flushSync)===!0,ut=q({currentLocation:Ge,nextLocation:Te,historyAction:Ae});if(ut){xe(ut,{state:"blocked",location:Te,proceed(){xe(ut,{state:"proceeding",proceed:void 0,reset:void 0,location:Te}),sn(L,O)},reset(){let T=new Map(S.blockers);T.set(ut,Na),Ve({blockers:T})}});return}return await et(Ae,Te,{submission:pe,pendingError:Ue,preventScrollReset:Ie,replace:O&&O.replace,enableViewTransition:O&&O.viewTransition,flushSync:Qe})}function at(){if(me(),Ve({revalidation:"loading"}),S.navigation.state!=="submitting"){if(S.navigation.state==="idle"){et(S.historyAction,S.location,{startUninterruptedRevalidation:!0});return}et(C||S.historyAction,S.navigation.location,{overrideNavigation:S.navigation,enableViewTransition:E===!0})}}async function et(L,O,X){x&&x.abort(),x=null,C=L,j=(X&&X.startUninterruptedRevalidation)===!0,Nt(S.location,S.matches),B=(X&&X.preventScrollReset)===!0,E=(X&&X.enableViewTransition)===!0;let ae=o||a,pe=X&&X.overrideNavigation,Ue=X!=null&&X.initialHydration&&S.matches&&S.matches.length>0&&!v?S.matches:Wr(ae,O,l),Ge=(X&&X.flushSync)===!0;if(Ue&&S.initialized&&!Z&&pE(S.location,O)&&!(X&&X.submission&&li(X.submission.formMethod))){U(O,{matches:Ue},{flushSync:Ge});return}let Te=lt(Ue,ae,O.pathname);if(Te.active&&Te.matches&&(Ue=Te.matches),!Ue){let{error:D,notFoundMatches:k,route:H}=re(O.pathname);U(O,{matches:k,loaderData:{},errors:{[H.id]:D}},{flushSync:Ge});return}x=new AbortController;let be=vs(t.history,O,x.signal,X&&X.submission),Ae;if(X&&X.pendingError)Ae=[jr(Ue).route.id,{type:gt.error,error:X.pendingError}];else if(X&&X.submission&&li(X.submission.formMethod)){let D=await je(be,O,X.submission,Ue,Te.active,{replace:X.replace,flushSync:Ge});if(D.shortCircuited)return;if(D.pendingActionResult){let[k,H]=D.pendingActionResult;if(On(H)&&Co(H.error)&&H.error.status===404){x=null,U(O,{matches:D.matches,loaderData:{},errors:{[k]:H.error}});return}}Ue=D.matches||Ue,Ae=D.pendingActionResult,pe=Wc(O,X.submission),Ge=!1,Te.active=!1,be=vs(t.history,be.url,be.signal)}let{shortCircuited:Ie,matches:Qe,loaderData:ut,errors:T}=await St(be,O,Ue,Te.active,pe,X&&X.submission,X&&X.fetcherSubmission,X&&X.replace,X&&X.initialHydration===!0,Ge,Ae);Ie||(x=null,U(O,bt({matches:Qe||Ue},rg(Ae),{loaderData:ut,errors:T})))}async function je(L,O,X,ae,pe,Ue){Ue===void 0&&(Ue={}),me();let Ge=xE(O,X);if(Ve({navigation:Ge},{flushSync:Ue.flushSync===!0}),pe){let Ae=await Wt(ae,O.pathname,L.signal);if(Ae.type==="aborted")return{shortCircuited:!0};if(Ae.type==="error"){let Ie=jr(Ae.partialMatches).route.id;return{matches:Ae.partialMatches,pendingActionResult:[Ie,{type:gt.error,error:Ae.error}]}}else if(Ae.matches)ae=Ae.matches;else{let{notFoundMatches:Ie,error:Qe,route:ut}=re(O.pathname);return{matches:Ie,pendingActionResult:[ut.id,{type:gt.error,error:Qe}]}}}let Te,be=Za(ae,O);if(!be.route.action&&!be.route.lazy)Te={type:gt.error,error:Tn(405,{method:L.method,pathname:O.pathname,routeId:be.route.id})};else if(Te=(await Q("action",S,L,[be],ae,null))[be.route.id],L.signal.aborted)return{shortCircuited:!0};if(Zr(Te)){let Ae;return Ue&&Ue.replace!=null?Ae=Ue.replace:Ae=eg(Te.response.headers.get("Location"),new URL(L.url),l,t.history)===S.location.pathname+S.location.search,await se(L,Te,!0,{submission:X,replace:Ae}),{shortCircuited:!0}}if(hr(Te))throw Tn(400,{type:"defer-action"});if(On(Te)){let Ae=jr(ae,be.route.id);return(Ue&&Ue.replace)!==!0&&(C=Vt.Push),{matches:ae,pendingActionResult:[Ae.route.id,Te]}}return{matches:ae,pendingActionResult:[be.route.id,Te]}}async function St(L,O,X,ae,pe,Ue,Ge,Te,be,Ae,Ie){let Qe=pe||Wc(O,Ue),ut=Ue||Ge||og(Qe),T=!j&&(!d.v7_partialHydration||!be);if(ae){if(T){let Ke=Xe(Ie);Ve(bt({navigation:Qe},Ke!==void 0?{actionData:Ke}:{}),{flushSync:Ae})}let Ne=await Wt(X,O.pathname,L.signal);if(Ne.type==="aborted")return{shortCircuited:!0};if(Ne.type==="error"){let Ke=jr(Ne.partialMatches).route.id;return{matches:Ne.partialMatches,loaderData:{},errors:{[Ke]:Ne.error}}}else if(Ne.matches)X=Ne.matches;else{let{error:Ke,notFoundMatches:Bt,route:ct}=re(O.pathname);return{matches:Bt,loaderData:{},errors:{[ct.id]:Ke}}}}let D=o||a,[k,H]=Zm(t.history,S,X,ut,O,d.v7_partialHydration&&be===!0,d.v7_skipActionErrorRevalidation,Z,Y,ne,K,Ze,Ee,D,l,Ie);if(ye(Ne=>!(X&&X.some(Ke=>Ke.route.id===Ne))||k&&k.some(Ke=>Ke.route.id===Ne)),te=++J,k.length===0&&H.length===0){let Ne=rt();return U(O,bt({matches:X,loaderData:{},errors:Ie&&On(Ie[1])?{[Ie[0]]:Ie[1].error}:null},rg(Ie),Ne?{fetchers:new Map(S.fetchers)}:{}),{flushSync:Ae}),{shortCircuited:!0}}if(T){let Ne={};if(!ae){Ne.navigation=Qe;let Ke=Xe(Ie);Ke!==void 0&&(Ne.actionData=Ke)}H.length>0&&(Ne.fetchers=b(H)),Ve(Ne,{flushSync:Ae})}H.forEach(Ne=>{Oe(Ne.key),Ne.controller&&P.set(Ne.key,Ne.controller)});let F=()=>H.forEach(Ne=>Oe(Ne.key));x&&x.signal.addEventListener("abort",F);let{loaderResults:ue,fetcherResults:he}=await De(S,X,k,H,L);if(L.signal.aborted)return{shortCircuited:!0};x&&x.signal.removeEventListener("abort",F),H.forEach(Ne=>P.delete(Ne.key));let Se=ol(ue);if(Se)return await se(L,Se.result,!0,{replace:Te}),{shortCircuited:!0};if(Se=ol(he),Se)return Ee.add(Se.key),await se(L,Se.result,!0,{replace:Te}),{shortCircuited:!0};let{loaderData:Pe,errors:ze}=ng(S,X,ue,Ie,H,he,fe);fe.forEach((Ne,Ke)=>{Ne.subscribe(Bt=>{(Bt||Ne.done)&&fe.delete(Ke)})}),d.v7_partialHydration&&be&&S.errors&&(ze=bt({},S.errors,ze));let ke=rt(),Le=qe(te),ft=ke||Le||H.length>0;return bt({matches:X,loaderData:Pe,errors:ze},ft?{fetchers:new Map(S.fetchers)}:{})}function Xe(L){if(L&&!On(L[1]))return{[L[0]]:L[1].data};if(S.actionData)return Object.keys(S.actionData).length===0?null:S.actionData}function b(L){return L.forEach(O=>{let X=S.fetchers.get(O.key),ae=Fa(void 0,X?X.data:void 0);S.fetchers.set(O.key,ae)}),new Map(S.fetchers)}function w(L,O,X,ae){if(i)throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");Oe(L);let pe=(ae&&ae.flushSync)===!0,Ue=o||a,Ge=xd(S.location,S.matches,l,d.v7_prependBasename,X,d.v7_relativeSplatPath,O,ae==null?void 0:ae.relative),Te=Wr(Ue,Ge,l),be=lt(Te,Ue,Ge);if(be.active&&be.matches&&(Te=be.matches),!Te){Je(L,O,Tn(404,{pathname:Ge}),{flushSync:pe});return}let{path:Ae,submission:Ie,error:Qe}=qm(d.v7_normalizeFormMethod,!0,Ge,ae);if(Qe){Je(L,O,Qe,{flushSync:pe});return}let ut=Za(Te,Ae),T=(ae&&ae.preventScrollReset)===!0;if(Ie&&li(Ie.formMethod)){G(L,O,Ae,ut,Te,be.active,pe,T,Ie);return}Ze.set(L,{routeId:O,path:Ae}),ee(L,O,Ae,ut,Te,be.active,pe,T,Ie)}async function G(L,O,X,ae,pe,Ue,Ge,Te,be){me(),Ze.delete(L);function Ae(ge){if(!ge.route.action&&!ge.route.lazy){let Ct=Tn(405,{method:be.formMethod,pathname:X,routeId:O});return Je(L,O,Ct,{flushSync:Ge}),!0}return!1}if(!Ue&&Ae(ae))return;let Ie=S.fetchers.get(L);_e(L,SE(be,Ie),{flushSync:Ge});let Qe=new AbortController,ut=vs(t.history,X,Qe.signal,be);if(Ue){let ge=await Wt(pe,new URL(ut.url).pathname,ut.signal,L);if(ge.type==="aborted")return;if(ge.type==="error"){Je(L,O,ge.error,{flushSync:Ge});return}else if(ge.matches){if(pe=ge.matches,ae=Za(pe,X),Ae(ae))return}else{Je(L,O,Tn(404,{pathname:X}),{flushSync:Ge});return}}P.set(L,Qe);let T=J,k=(await Q("action",S,ut,[ae],pe,L))[ae.route.id];if(ut.signal.aborted){P.get(L)===Qe&&P.delete(L);return}if(d.v7_fetcherPersist&&K.has(L)){if(Zr(k)||On(k)){_e(L,rr(void 0));return}}else{if(Zr(k))if(P.delete(L),te>T){_e(L,rr(void 0));return}else return Ee.add(L),_e(L,Fa(be)),se(ut,k,!1,{fetcherSubmission:be,preventScrollReset:Te});if(On(k)){Je(L,O,k.error);return}}if(hr(k))throw Tn(400,{type:"defer-action"});let H=S.navigation.location||S.location,F=vs(t.history,H,Qe.signal),ue=o||a,he=S.navigation.state!=="idle"?Wr(ue,S.navigation.location,l):S.matches;it(he,"Didn't find any matches after fetcher action");let Se=++J;le.set(L,Se);let Pe=Fa(be,k.data);S.fetchers.set(L,Pe);let[ze,ke]=Zm(t.history,S,he,be,H,!1,d.v7_skipActionErrorRevalidation,Z,Y,ne,K,Ze,Ee,ue,l,[ae.route.id,k]);ke.filter(ge=>ge.key!==L).forEach(ge=>{let Ct=ge.key,ht=S.fetchers.get(Ct),Dn=Fa(void 0,ht?ht.data:void 0);S.fetchers.set(Ct,Dn),Oe(Ct),ge.controller&&P.set(Ct,ge.controller)}),Ve({fetchers:new Map(S.fetchers)});let Le=()=>ke.forEach(ge=>Oe(ge.key));Qe.signal.addEventListener("abort",Le);let{loaderResults:ft,fetcherResults:Ne}=await De(S,he,ze,ke,F);if(Qe.signal.aborted)return;Qe.signal.removeEventListener("abort",Le),le.delete(L),P.delete(L),ke.forEach(ge=>P.delete(ge.key));let Ke=ol(ft);if(Ke)return se(F,Ke.result,!1,{preventScrollReset:Te});if(Ke=ol(Ne),Ke)return Ee.add(Ke.key),se(F,Ke.result,!1,{preventScrollReset:Te});let{loaderData:Bt,errors:ct}=ng(S,he,ft,void 0,ke,Ne,fe);if(S.fetchers.has(L)){let ge=rr(k.data);S.fetchers.set(L,ge)}qe(Se),S.navigation.state==="loading"&&Se>te?(it(C,"Expected pending action"),x&&x.abort(),U(S.navigation.location,{matches:he,loaderData:Bt,errors:ct,fetchers:new Map(S.fetchers)})):(Ve({errors:ct,loaderData:ig(S.loaderData,Bt,he,ct),fetchers:new Map(S.fetchers)}),Z=!1)}async function ee(L,O,X,ae,pe,Ue,Ge,Te,be){let Ae=S.fetchers.get(L);_e(L,Fa(be,Ae?Ae.data:void 0),{flushSync:Ge});let Ie=new AbortController,Qe=vs(t.history,X,Ie.signal);if(Ue){let k=await Wt(pe,new URL(Qe.url).pathname,Qe.signal,L);if(k.type==="aborted")return;if(k.type==="error"){Je(L,O,k.error,{flushSync:Ge});return}else if(k.matches)pe=k.matches,ae=Za(pe,X);else{Je(L,O,Tn(404,{pathname:X}),{flushSync:Ge});return}}P.set(L,Ie);let ut=J,D=(await Q("loader",S,Qe,[ae],pe,L))[ae.route.id];if(hr(D)&&(D=await hp(D,Qe.signal,!0)||D),P.get(L)===Ie&&P.delete(L),!Qe.signal.aborted){if(K.has(L)){_e(L,rr(void 0));return}if(Zr(D))if(te>ut){_e(L,rr(void 0));return}else{Ee.add(L),await se(Qe,D,!1,{preventScrollReset:Te});return}if(On(D)){Je(L,O,D.error);return}it(!hr(D),"Unhandled fetcher deferred data"),_e(L,rr(D.data))}}async function se(L,O,X,ae){let{submission:pe,fetcherSubmission:Ue,preventScrollReset:Ge,replace:Te}=ae===void 0?{}:ae;O.response.headers.has("X-Remix-Revalidate")&&(Z=!0);let be=O.response.headers.get("Location");it(be,"Expected a Location header on the redirect Response"),be=eg(be,new URL(L.url),l,t.history);let Ae=Ro(S.location,be,{_isRedirect:!0});if(n){let k=!1;if(O.response.headers.has("X-Remix-Reload-Document"))k=!0;else if(dp.test(be)){const H=t.history.createURL(be);k=H.origin!==e.location.origin||ji(H.pathname,l)==null}if(k){Te?e.location.replace(be):e.location.assign(be);return}}x=null;let Ie=Te===!0||O.response.headers.has("X-Remix-Replace")?Vt.Replace:Vt.Push,{formMethod:Qe,formAction:ut,formEncType:T}=S.navigation;!pe&&!Ue&&Qe&&ut&&T&&(pe=og(S.navigation));let D=pe||Ue;if(tE.has(O.response.status)&&D&&li(D.formMethod))await et(Ie,Ae,{submission:bt({},D,{formAction:be}),preventScrollReset:Ge||B,enableViewTransition:X?E:void 0});else{let k=Wc(Ae,pe);await et(Ie,Ae,{overrideNavigation:k,fetcherSubmission:Ue,preventScrollReset:Ge||B,enableViewTransition:X?E:void 0})}}async function Q(L,O,X,ae,pe,Ue){let Ge,Te={};try{Ge=await uE(u,L,O,X,ae,pe,Ue,s,r)}catch(be){return ae.forEach(Ae=>{Te[Ae.route.id]={type:gt.error,error:be}}),Te}for(let[be,Ae]of Object.entries(Ge))if(mE(Ae)){let Ie=Ae.result;Te[be]={type:gt.redirect,response:dE(Ie,X,be,pe,l,d.v7_relativeSplatPath)}}else Te[be]=await fE(Ae);return Te}async function De(L,O,X,ae,pe){let Ue=L.matches,Ge=Q("loader",L,pe,X,O,null),Te=Promise.all(ae.map(async Ie=>{if(Ie.matches&&Ie.match&&Ie.controller){let ut=(await Q("loader",L,vs(t.history,Ie.path,Ie.controller.signal),[Ie.match],Ie.matches,Ie.key))[Ie.match.route.id];return{[Ie.key]:ut}}else return Promise.resolve({[Ie.key]:{type:gt.error,error:Tn(404,{pathname:Ie.path})}})})),be=await Ge,Ae=(await Te).reduce((Ie,Qe)=>Object.assign(Ie,Qe),{});return await Promise.all([_E(O,be,pe.signal,Ue,L.loaderData),yE(O,Ae,ae)]),{loaderResults:be,fetcherResults:Ae}}function me(){Z=!0,Y.push(...ye()),Ze.forEach((L,O)=>{P.has(O)&&ne.add(O),Oe(O)})}function _e(L,O,X){X===void 0&&(X={}),S.fetchers.set(L,O),Ve({fetchers:new Map(S.fetchers)},{flushSync:(X&&X.flushSync)===!0})}function Je(L,O,X,ae){ae===void 0&&(ae={});let pe=jr(S.matches,O);we(L),Ve({errors:{[pe.route.id]:X},fetchers:new Map(S.fetchers)},{flushSync:(ae&&ae.flushSync)===!0})}function ce(L){return W.set(L,(W.get(L)||0)+1),K.has(L)&&K.delete(L),S.fetchers.get(L)||nE}function we(L){let O=S.fetchers.get(L);P.has(L)&&!(O&&O.state==="loading"&&le.has(L))&&Oe(L),Ze.delete(L),le.delete(L),Ee.delete(L),d.v7_fetcherPersist&&K.delete(L),ne.delete(L),S.fetchers.delete(L)}function Ye(L){let O=(W.get(L)||0)-1;O<=0?(W.delete(L),K.add(L),d.v7_fetcherPersist||we(L)):W.set(L,O),Ve({fetchers:new Map(S.fetchers)})}function Oe(L){let O=P.get(L);O&&(O.abort(),P.delete(L))}function Re(L){for(let O of L){let X=ce(O),ae=rr(X.data);S.fetchers.set(O,ae)}}function rt(){let L=[],O=!1;for(let X of Ee){let ae=S.fetchers.get(X);it(ae,"Expected fetcher: "+X),ae.state==="loading"&&(Ee.delete(X),L.push(X),O=!0)}return Re(L),O}function qe(L){let O=[];for(let[X,ae]of le)if(ae<L){let pe=S.fetchers.get(X);it(pe,"Expected fetcher: "+X),pe.state==="loading"&&(Oe(X),le.delete(X),O.push(X))}return Re(O),O.length>0}function _t(L,O){let X=S.blockers.get(L)||Na;return de.get(L)!==O&&de.set(L,O),X}function I(L){S.blockers.delete(L),de.delete(L)}function xe(L,O){let X=S.blockers.get(L)||Na;it(X.state==="unblocked"&&O.state==="blocked"||X.state==="blocked"&&O.state==="blocked"||X.state==="blocked"&&O.state==="proceeding"||X.state==="blocked"&&O.state==="unblocked"||X.state==="proceeding"&&O.state==="unblocked","Invalid blocker state transition: "+X.state+" -> "+O.state);let ae=new Map(S.blockers);ae.set(L,O),Ve({blockers:ae})}function q(L){let{currentLocation:O,nextLocation:X,historyAction:ae}=L;if(de.size===0)return;de.size>1&&os(!1,"A router only supports one blocker at a time");let pe=Array.from(de.entries()),[Ue,Ge]=pe[pe.length-1],Te=S.blockers.get(Ue);if(!(Te&&Te.state==="proceeding")&&Ge({currentLocation:O,nextLocation:X,historyAction:ae}))return Ue}function re(L){let O=Tn(404,{pathname:L}),X=o||a,{matches:ae,route:pe}=sg(X);return ye(),{notFoundMatches:ae,route:pe,error:O}}function ye(L){let O=[];return fe.forEach((X,ae)=>{(!L||L(ae))&&(X.cancel(),O.push(ae),fe.delete(ae))}),O}function Me(L,O,X){if(_=L,p=O,y=X||null,!f&&S.navigation===Gc){f=!0;let ae=en(S.location,S.matches);ae!=null&&Ve({restoreScrollPosition:ae})}return()=>{_=null,p=null,y=null}}function ot(L,O){return y&&y(L,O.map(ae=>DM(ae,S.loaderData)))||L.key}function Nt(L,O){if(_&&p){let X=ot(L,O);_[X]=p()}}function en(L,O){if(_){let X=ot(L,O),ae=_[X];if(typeof ae=="number")return ae}return null}function lt(L,O,X){if(c)if(L){if(Object.keys(L[0].params).length>0)return{active:!0,matches:Zl(O,X,l,!0)}}else return{active:!0,matches:Zl(O,X,l,!0)||[]};return{active:!1,matches:null}}async function Wt(L,O,X,ae){if(!c)return{type:"success",matches:L};let pe=L;for(;;){let Ue=o==null,Ge=o||a,Te=s;try{await c({signal:X,path:O,matches:pe,fetcherKey:ae,patch:(Ie,Qe)=>{X.aborted||Jm(Ie,Qe,Ge,Te,r)}})}catch(Ie){return{type:"error",error:Ie,partialMatches:pe}}finally{Ue&&!X.aborted&&(a=[...a])}if(X.aborted)return{type:"aborted"};let be=Wr(Ge,O,l);if(be)return{type:"success",matches:be};let Ae=Zl(Ge,O,l,!0);if(!Ae||pe.length===Ae.length&&pe.every((Ie,Qe)=>Ie.route.id===Ae[Qe].route.id))return{type:"success",matches:null};pe=Ae}}function ti(L){s={},o=Lu(L,r,void 0,s)}function Go(L,O){let X=o==null;Jm(L,O,o||a,s,r),X&&(a=[...a],Ve({}))}return A={get basename(){return l},get future(){return d},get state(){return S},get routes(){return a},get window(){return e},initialize:Fe,subscribe:dt,enableScrollRestoration:Me,navigate:sn,fetch:w,revalidate:at,createHref:L=>t.history.createHref(L),encodeLocation:L=>t.history.encodeLocation(L),getFetcher:ce,deleteFetcher:Ye,dispose:We,getBlocker:_t,deleteBlocker:I,patchRoutes:Go,_internalFetchControllers:P,_internalActiveDeferreds:fe,_internalSetRoutes:ti},A}function sE(t){return t!=null&&("formData"in t&&t.formData!=null||"body"in t&&t.body!==void 0)}function xd(t,e,n,i,r,s,a,o){let l,u;if(a){l=[];for(let d of e)if(l.push(d),d.route.id===a){u=d;break}}else l=e,u=e[e.length-1];let c=cp(r||".",up(l,s),ji(t.pathname,n)||t.pathname,o==="path");if(r==null&&(c.search=t.search,c.hash=t.hash),(r==null||r===""||r===".")&&u){let d=pp(c.search);if(u.route.index&&!d)c.search=c.search?c.search.replace(/^\?/,"?index&"):"?index";else if(!u.route.index&&d){let h=new URLSearchParams(c.search),m=h.getAll("index");h.delete("index"),m.filter(y=>y).forEach(y=>h.append("index",y));let _=h.toString();c.search=_?"?"+_:""}}return i&&n!=="/"&&(c.pathname=c.pathname==="/"?n:Bi([n,c.pathname])),ls(c)}function qm(t,e,n,i){if(!i||!sE(i))return{path:n};if(i.formMethod&&!vE(i.formMethod))return{path:n,error:Tn(405,{method:i.formMethod})};let r=()=>({path:n,error:Tn(400,{type:"invalid-body"})}),s=i.formMethod||"get",a=t?s.toUpperCase():s.toLowerCase(),o=K0(n);if(i.body!==void 0){if(i.formEncType==="text/plain"){if(!li(a))return r();let h=typeof i.body=="string"?i.body:i.body instanceof FormData||i.body instanceof URLSearchParams?Array.from(i.body.entries()).reduce((m,_)=>{let[y,p]=_;return""+m+y+"="+p+`
`},""):String(i.body);return{path:n,submission:{formMethod:a,formAction:o,formEncType:i.formEncType,formData:void 0,json:void 0,text:h}}}else if(i.formEncType==="application/json"){if(!li(a))return r();try{let h=typeof i.body=="string"?JSON.parse(i.body):i.body;return{path:n,submission:{formMethod:a,formAction:o,formEncType:i.formEncType,formData:void 0,json:h,text:void 0}}}catch{return r()}}}it(typeof FormData=="function","FormData is not available in this environment");let l,u;if(i.formData)l=Md(i.formData),u=i.formData;else if(i.body instanceof FormData)l=Md(i.body),u=i.body;else if(i.body instanceof URLSearchParams)l=i.body,u=tg(l);else if(i.body==null)l=new URLSearchParams,u=new FormData;else try{l=new URLSearchParams(i.body),u=tg(l)}catch{return r()}let c={formMethod:a,formAction:o,formEncType:i&&i.formEncType||"application/x-www-form-urlencoded",formData:u,json:void 0,text:void 0};if(li(c.formMethod))return{path:n,submission:c};let d=Lr(n);return e&&d.search&&pp(d.search)&&l.append("index",""),d.search="?"+l,{path:ls(d),submission:c}}function Km(t,e,n){n===void 0&&(n=!1);let i=t.findIndex(r=>r.route.id===e);return i>=0?t.slice(0,n?i+1:i):t}function Zm(t,e,n,i,r,s,a,o,l,u,c,d,h,m,_,y){let p=y?On(y[1])?y[1].error:y[1].data:void 0,f=t.createURL(e.location),g=t.createURL(r),v=n;s&&e.errors?v=Km(n,Object.keys(e.errors)[0],!0):y&&On(y[1])&&(v=Km(n,y[0]));let M=y?y[1].statusCode:void 0,R=a&&M&&M>=400,A=v.filter((C,B)=>{let{route:x}=C;if(x.lazy)return!0;if(x.loader==null)return!1;if(s)return Sd(x,e.loaderData,e.errors);if(aE(e.loaderData,e.matches[B],C)||l.some(V=>V===C.route.id))return!0;let E=e.matches[B],z=C;return Qm(C,bt({currentUrl:f,currentParams:E.params,nextUrl:g,nextParams:z.params},i,{actionResult:p,actionStatus:M,defaultShouldRevalidate:R?!1:o||f.pathname+f.search===g.pathname+g.search||f.search!==g.search||$0(E,z)}))}),S=[];return d.forEach((C,B)=>{if(s||!n.some(j=>j.route.id===C.routeId)||c.has(B))return;let x=Wr(m,C.path,_);if(!x){S.push({key:B,routeId:C.routeId,path:C.path,matches:null,match:null,controller:null});return}let E=e.fetchers.get(B),z=Za(x,C.path),V=!1;h.has(B)?V=!1:u.has(B)?(u.delete(B),V=!0):E&&E.state!=="idle"&&E.data===void 0?V=o:V=Qm(z,bt({currentUrl:f,currentParams:e.matches[e.matches.length-1].params,nextUrl:g,nextParams:n[n.length-1].params},i,{actionResult:p,actionStatus:M,defaultShouldRevalidate:R?!1:o})),V&&S.push({key:B,routeId:C.routeId,path:C.path,matches:x,match:z,controller:new AbortController})}),[A,S]}function Sd(t,e,n){if(t.lazy)return!0;if(!t.loader)return!1;let i=e!=null&&e[t.id]!==void 0,r=n!=null&&n[t.id]!==void 0;return!i&&r?!1:typeof t.loader=="function"&&t.loader.hydrate===!0?!0:!i&&!r}function aE(t,e,n){let i=!e||n.route.id!==e.route.id,r=t[n.route.id]===void 0;return i||r}function $0(t,e){let n=t.route.path;return t.pathname!==e.pathname||n!=null&&n.endsWith("*")&&t.params["*"]!==e.params["*"]}function Qm(t,e){if(t.route.shouldRevalidate){let n=t.route.shouldRevalidate(e);if(typeof n=="boolean")return n}return e.defaultShouldRevalidate}function Jm(t,e,n,i,r){var s;let a;if(t){let u=i[t];it(u,"No route found to patch children into: routeId = "+t),u.children||(u.children=[]),a=u.children}else a=n;let o=e.filter(u=>!a.some(c=>q0(u,c))),l=Lu(o,r,[t||"_","patch",String(((s=a)==null?void 0:s.length)||"0")],i);a.push(...l)}function q0(t,e){return"id"in t&&"id"in e&&t.id===e.id?!0:t.index===e.index&&t.path===e.path&&t.caseSensitive===e.caseSensitive?(!t.children||t.children.length===0)&&(!e.children||e.children.length===0)?!0:t.children.every((n,i)=>{var r;return(r=e.children)==null?void 0:r.some(s=>q0(n,s))}):!1}async function oE(t,e,n){if(!t.lazy)return;let i=await t.lazy();if(!t.lazy)return;let r=n[t.id];it(r,"No route found in manifest");let s={};for(let a in i){let l=r[a]!==void 0&&a!=="hasErrorBoundary";os(!l,'Route "'+r.id+'" has a static property "'+a+'" defined but its lazy function is also returning a value for this property. '+('The lazy route property "'+a+'" will be ignored.')),!l&&!PM.has(a)&&(s[a]=i[a])}Object.assign(r,s),Object.assign(r,bt({},e(r),{lazy:void 0}))}async function lE(t){let{matches:e}=t,n=e.filter(r=>r.shouldLoad);return(await Promise.all(n.map(r=>r.resolve()))).reduce((r,s,a)=>Object.assign(r,{[n[a].route.id]:s}),{})}async function uE(t,e,n,i,r,s,a,o,l,u){let c=s.map(m=>m.route.lazy?oE(m.route,l,o):void 0),d=s.map((m,_)=>{let y=c[_],p=r.some(g=>g.route.id===m.route.id);return bt({},m,{shouldLoad:p,resolve:async g=>(g&&i.method==="GET"&&(m.route.lazy||m.route.loader)&&(p=!0),p?cE(e,i,m,y,g,u):Promise.resolve({type:gt.data,result:void 0}))})}),h=await t({matches:d,request:i,params:s[0].params,fetcherKey:a,context:u});try{await Promise.all(c)}catch{}return h}async function cE(t,e,n,i,r,s){let a,o,l=u=>{let c,d=new Promise((_,y)=>c=y);o=()=>c(),e.signal.addEventListener("abort",o);let h=_=>typeof u!="function"?Promise.reject(new Error("You cannot call the handler for a route which defines a boolean "+('"'+t+'" [routeId: '+n.route.id+"]"))):u({request:e,params:n.params,context:s},..._!==void 0?[_]:[]),m=(async()=>{try{return{type:"data",result:await(r?r(y=>h(y)):h())}}catch(_){return{type:"error",result:_}}})();return Promise.race([m,d])};try{let u=n.route[t];if(i)if(u){let c,[d]=await Promise.all([l(u).catch(h=>{c=h}),i]);if(c!==void 0)throw c;a=d}else if(await i,u=n.route[t],u)a=await l(u);else if(t==="action"){let c=new URL(e.url),d=c.pathname+c.search;throw Tn(405,{method:e.method,pathname:d,routeId:n.route.id})}else return{type:gt.data,result:void 0};else if(u)a=await l(u);else{let c=new URL(e.url),d=c.pathname+c.search;throw Tn(404,{pathname:d})}it(a.result!==void 0,"You defined "+(t==="action"?"an action":"a loader")+" for route "+('"'+n.route.id+"\" but didn't return anything from your `"+t+"` ")+"function. Please return a value or `null`.")}catch(u){return{type:gt.error,result:u}}finally{o&&e.signal.removeEventListener("abort",o)}return a}async function fE(t){let{result:e,type:n}=t;if(Z0(e)){let d;try{let h=e.headers.get("Content-Type");h&&/\bapplication\/json\b/.test(h)?e.body==null?d=null:d=await e.json():d=await e.text()}catch(h){return{type:gt.error,error:h}}return n===gt.error?{type:gt.error,error:new Uu(e.status,e.statusText,d),statusCode:e.status,headers:e.headers}:{type:gt.data,data:d,statusCode:e.status,headers:e.headers}}if(n===gt.error){if(ag(e)){var i,r;if(e.data instanceof Error){var s,a;return{type:gt.error,error:e.data,statusCode:(s=e.init)==null?void 0:s.status,headers:(a=e.init)!=null&&a.headers?new Headers(e.init.headers):void 0}}return{type:gt.error,error:new Uu(((i=e.init)==null?void 0:i.status)||500,void 0,e.data),statusCode:Co(e)?e.status:void 0,headers:(r=e.init)!=null&&r.headers?new Headers(e.init.headers):void 0}}return{type:gt.error,error:e,statusCode:Co(e)?e.status:void 0}}if(gE(e)){var o,l;return{type:gt.deferred,deferredData:e,statusCode:(o=e.init)==null?void 0:o.status,headers:((l=e.init)==null?void 0:l.headers)&&new Headers(e.init.headers)}}if(ag(e)){var u,c;return{type:gt.data,data:e.data,statusCode:(u=e.init)==null?void 0:u.status,headers:(c=e.init)!=null&&c.headers?new Headers(e.init.headers):void 0}}return{type:gt.data,data:e}}function dE(t,e,n,i,r,s){let a=t.headers.get("Location");if(it(a,"Redirects returned/thrown from loaders/actions must have a Location header"),!dp.test(a)){let o=i.slice(0,i.findIndex(l=>l.route.id===n)+1);a=xd(new URL(e.url),o,r,!0,a,s),t.headers.set("Location",a)}return t}function eg(t,e,n,i){let r=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];if(dp.test(t)){let s=t,a=s.startsWith("//")?new URL(e.protocol+s):new URL(s);if(r.includes(a.protocol))throw new Error("Invalid redirect location");let o=ji(a.pathname,n)!=null;if(a.origin===e.origin&&o)return fp(a.pathname)+a.search+a.hash}try{let s=i.createURL(t);if(r.includes(s.protocol))throw new Error("Invalid redirect location")}catch{}return t}function vs(t,e,n,i){let r=t.createURL(K0(e)).toString(),s={signal:n};if(i&&li(i.formMethod)){let{formMethod:a,formEncType:o}=i;s.method=a.toUpperCase(),o==="application/json"?(s.headers=new Headers({"Content-Type":o}),s.body=JSON.stringify(i.json)):o==="text/plain"?s.body=i.text:o==="application/x-www-form-urlencoded"&&i.formData?s.body=Md(i.formData):s.body=i.formData}return new Request(r,s)}function Md(t){let e=new URLSearchParams;for(let[n,i]of t.entries())e.append(n,typeof i=="string"?i:i.name);return e}function tg(t){let e=new FormData;for(let[n,i]of t.entries())e.append(n,i);return e}function hE(t,e,n,i,r){let s={},a=null,o,l=!1,u={},c=n&&On(n[1])?n[1].error:void 0;return t.forEach(d=>{if(!(d.route.id in e))return;let h=d.route.id,m=e[h];if(it(!Zr(m),"Cannot handle redirect results in processLoaderData"),On(m)){let _=m.error;c!==void 0&&(_=c,c=void 0),a=a||{};{let y=jr(t,h);a[y.route.id]==null&&(a[y.route.id]=_)}s[h]=void 0,l||(l=!0,o=Co(m.error)?m.error.status:500),m.headers&&(u[h]=m.headers)}else hr(m)?(i.set(h,m.deferredData),s[h]=m.deferredData.data,m.statusCode!=null&&m.statusCode!==200&&!l&&(o=m.statusCode),m.headers&&(u[h]=m.headers)):(s[h]=m.data,m.statusCode&&m.statusCode!==200&&!l&&(o=m.statusCode),m.headers&&(u[h]=m.headers))}),c!==void 0&&n&&(a={[n[0]]:c},s[n[0]]=void 0),{loaderData:s,errors:a,statusCode:o||200,loaderHeaders:u}}function ng(t,e,n,i,r,s,a){let{loaderData:o,errors:l}=hE(e,n,i,a);return r.forEach(u=>{let{key:c,match:d,controller:h}=u,m=s[c];if(it(m,"Did not find corresponding fetcher result"),!(h&&h.signal.aborted))if(On(m)){let _=jr(t.matches,d==null?void 0:d.route.id);l&&l[_.route.id]||(l=bt({},l,{[_.route.id]:m.error})),t.fetchers.delete(c)}else if(Zr(m))it(!1,"Unhandled fetcher revalidation redirect");else if(hr(m))it(!1,"Unhandled fetcher deferred data");else{let _=rr(m.data);t.fetchers.set(c,_)}}),{loaderData:o,errors:l}}function ig(t,e,n,i){let r=bt({},e);for(let s of n){let a=s.route.id;if(e.hasOwnProperty(a)?e[a]!==void 0&&(r[a]=e[a]):t[a]!==void 0&&s.route.loader&&(r[a]=t[a]),i&&i.hasOwnProperty(a))break}return r}function rg(t){return t?On(t[1])?{actionData:{}}:{actionData:{[t[0]]:t[1].data}}:{}}function jr(t,e){return(e?t.slice(0,t.findIndex(i=>i.route.id===e)+1):[...t]).reverse().find(i=>i.route.hasErrorBoundary===!0)||t[0]}function sg(t){let e=t.length===1?t[0]:t.find(n=>n.index||!n.path||n.path==="/")||{id:"__shim-error-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:e}],route:e}}function Tn(t,e){let{pathname:n,routeId:i,method:r,type:s,message:a}=e===void 0?{}:e,o="Unknown Server Error",l="Unknown @remix-run/router error";return t===400?(o="Bad Request",r&&n&&i?l="You made a "+r+' request to "'+n+'" but '+('did not provide a `loader` for route "'+i+'", ')+"so there is no way to handle the request.":s==="defer-action"?l="defer() is not supported in actions":s==="invalid-body"&&(l="Unable to encode submission body")):t===403?(o="Forbidden",l='Route "'+i+'" does not match URL "'+n+'"'):t===404?(o="Not Found",l='No route matches URL "'+n+'"'):t===405&&(o="Method Not Allowed",r&&n&&i?l="You made a "+r.toUpperCase()+' request to "'+n+'" but '+('did not provide an `action` for route "'+i+'", ')+"so there is no way to handle the request.":r&&(l='Invalid request method "'+r.toUpperCase()+'"')),new Uu(t||500,o,new Error(l),!0)}function ol(t){let e=Object.entries(t);for(let n=e.length-1;n>=0;n--){let[i,r]=e[n];if(Zr(r))return{key:i,result:r}}}function K0(t){let e=typeof t=="string"?Lr(t):t;return ls(bt({},e,{hash:""}))}function pE(t,e){return t.pathname!==e.pathname||t.search!==e.search?!1:t.hash===""?e.hash!=="":t.hash===e.hash?!0:e.hash!==""}function mE(t){return Z0(t.result)&&eE.has(t.result.status)}function hr(t){return t.type===gt.deferred}function On(t){return t.type===gt.error}function Zr(t){return(t&&t.type)===gt.redirect}function ag(t){return typeof t=="object"&&t!=null&&"type"in t&&"data"in t&&"init"in t&&t.type==="DataWithResponseInit"}function gE(t){let e=t;return e&&typeof e=="object"&&typeof e.data=="object"&&typeof e.subscribe=="function"&&typeof e.cancel=="function"&&typeof e.resolveData=="function"}function Z0(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.headers=="object"&&typeof t.body<"u"}function vE(t){return JM.has(t.toLowerCase())}function li(t){return ZM.has(t.toLowerCase())}async function _E(t,e,n,i,r){let s=Object.entries(e);for(let a=0;a<s.length;a++){let[o,l]=s[a],u=t.find(h=>(h==null?void 0:h.route.id)===o);if(!u)continue;let c=i.find(h=>h.route.id===u.route.id),d=c!=null&&!$0(c,u)&&(r&&r[u.route.id])!==void 0;hr(l)&&d&&await hp(l,n,!1).then(h=>{h&&(e[o]=h)})}}async function yE(t,e,n){for(let i=0;i<n.length;i++){let{key:r,routeId:s,controller:a}=n[i],o=e[r];t.find(u=>(u==null?void 0:u.route.id)===s)&&hr(o)&&(it(a,"Expected an AbortController for revalidating fetcher deferred result"),await hp(o,a.signal,!0).then(u=>{u&&(e[r]=u)}))}}async function hp(t,e,n){if(n===void 0&&(n=!1),!await t.deferredData.resolveData(e)){if(n)try{return{type:gt.data,data:t.deferredData.unwrappedData}}catch(r){return{type:gt.error,error:r}}return{type:gt.data,data:t.deferredData.data}}}function pp(t){return new URLSearchParams(t).getAll("index").some(e=>e==="")}function Za(t,e){let n=typeof e=="string"?Lr(e).search:e.search;if(t[t.length-1].route.index&&pp(n||""))return t[t.length-1];let i=j0(t);return i[i.length-1]}function og(t){let{formMethod:e,formAction:n,formEncType:i,text:r,formData:s,json:a}=t;if(!(!e||!n||!i)){if(r!=null)return{formMethod:e,formAction:n,formEncType:i,formData:void 0,json:void 0,text:r};if(s!=null)return{formMethod:e,formAction:n,formEncType:i,formData:s,json:void 0,text:void 0};if(a!==void 0)return{formMethod:e,formAction:n,formEncType:i,formData:void 0,json:a,text:void 0}}}function Wc(t,e){return e?{state:"loading",location:t,formMethod:e.formMethod,formAction:e.formAction,formEncType:e.formEncType,formData:e.formData,json:e.json,text:e.text}:{state:"loading",location:t,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0}}function xE(t,e){return{state:"submitting",location:t,formMethod:e.formMethod,formAction:e.formAction,formEncType:e.formEncType,formData:e.formData,json:e.json,text:e.text}}function Fa(t,e){return t?{state:"loading",formMethod:t.formMethod,formAction:t.formAction,formEncType:t.formEncType,formData:t.formData,json:t.json,text:t.text,data:e}:{state:"loading",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:e}}function SE(t,e){return{state:"submitting",formMethod:t.formMethod,formAction:t.formAction,formEncType:t.formEncType,formData:t.formData,json:t.json,text:t.text,data:e?e.data:void 0}}function rr(t){return{state:"idle",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:t}}function ME(t,e){try{let n=t.sessionStorage.getItem(Y0);if(n){let i=JSON.parse(n);for(let[r,s]of Object.entries(i||{}))s&&Array.isArray(s)&&e.set(r,new Set(s||[]))}}catch{}}function EE(t,e){if(e.size>0){let n={};for(let[i,r]of e)n[i]=[...r];try{t.sessionStorage.setItem(Y0,JSON.stringify(n))}catch(i){os(!1,"Failed to save applied view transitions in sessionStorage ("+i+").")}}}/**
 * React Router v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Iu(){return Iu=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)({}).hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},Iu.apply(null,arguments)}const Fo=$.createContext(null),mp=$.createContext(null),Dr=$.createContext(null),gp=$.createContext(null),qi=$.createContext({outlet:null,matches:[],isDataRoute:!1}),Q0=$.createContext(null);function wE(t,e){let{relative:n}=e===void 0?{}:e;Oo()||it(!1);let{basename:i,navigator:r}=$.useContext(Dr),{hash:s,pathname:a,search:o}=ac(t,{relative:n}),l=a;return i!=="/"&&(l=a==="/"?i:Bi([i,a])),r.createHref({pathname:l,search:o,hash:s})}function Oo(){return $.useContext(gp)!=null}function ko(){return Oo()||it(!1),$.useContext(gp).location}function J0(t){$.useContext(Dr).static||$.useLayoutEffect(t)}function ey(){let{isDataRoute:t}=$.useContext(qi);return t?zE():TE()}function TE(){Oo()||it(!1);let t=$.useContext(Fo),{basename:e,future:n,navigator:i}=$.useContext(Dr),{matches:r}=$.useContext(qi),{pathname:s}=ko(),a=JSON.stringify(up(r,n.v7_relativeSplatPath)),o=$.useRef(!1);return J0(()=>{o.current=!0}),$.useCallback(function(u,c){if(c===void 0&&(c={}),!o.current)return;if(typeof u=="number"){i.go(u);return}let d=cp(u,JSON.parse(a),s,c.relative==="path");t==null&&e!=="/"&&(d.pathname=d.pathname==="/"?e:Bi([e,d.pathname])),(c.replace?i.replace:i.push)(d,c.state,c)},[e,i,a,s,t])}const AE=$.createContext(null);function RE(t){let e=$.useContext(qi).outlet;return e&&$.createElement(AE.Provider,{value:t},e)}function CE(){let{matches:t}=$.useContext(qi),e=t[t.length-1];return e?e.params:{}}function ac(t,e){let{relative:n}=e===void 0?{}:e,{future:i}=$.useContext(Dr),{matches:r}=$.useContext(qi),{pathname:s}=ko(),a=JSON.stringify(up(r,i.v7_relativeSplatPath));return $.useMemo(()=>cp(t,JSON.parse(a),s,n==="path"),[t,a,s,n])}function bE(t,e,n,i){Oo()||it(!1);let{navigator:r}=$.useContext(Dr),{matches:s}=$.useContext(qi),a=s[s.length-1],o=a?a.params:{};a&&a.pathname;let l=a?a.pathnameBase:"/";a&&a.route;let u=ko(),c;c=u;let d=c.pathname||"/",h=d;if(l!=="/"){let y=l.replace(/^\//,"").split("/");h="/"+d.replace(/^\//,"").split("/").slice(y.length).join("/")}let m=Wr(t,{pathname:h});return IE(m&&m.map(y=>Object.assign({},y,{params:Object.assign({},o,y.params),pathname:Bi([l,r.encodeLocation?r.encodeLocation(y.pathname).pathname:y.pathname]),pathnameBase:y.pathnameBase==="/"?l:Bi([l,r.encodeLocation?r.encodeLocation(y.pathnameBase).pathname:y.pathnameBase])})),s,n,i)}function PE(){let t=kE(),e=Co(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,r={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return $.createElement($.Fragment,null,$.createElement("h2",null,"Unexpected Application Error!"),$.createElement("h3",{style:{fontStyle:"italic"}},e),n?$.createElement("pre",{style:r},n):null,null)}const LE=$.createElement(PE,null);class DE extends $.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?$.createElement(qi.Provider,{value:this.props.routeContext},$.createElement(Q0.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function UE(t){let{routeContext:e,match:n,children:i}=t,r=$.useContext(Fo);return r&&r.static&&r.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=n.route.id),$.createElement(qi.Provider,{value:e},i)}function IE(t,e,n,i){var r;if(e===void 0&&(e=[]),n===void 0&&(n=null),i===void 0&&(i=null),t==null){var s;if(!n)return null;if(n.errors)t=n.matches;else if((s=i)!=null&&s.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let a=t,o=(r=n)==null?void 0:r.errors;if(o!=null){let c=a.findIndex(d=>d.route.id&&(o==null?void 0:o[d.route.id])!==void 0);c>=0||it(!1),a=a.slice(0,Math.min(a.length,c+1))}let l=!1,u=-1;if(n&&i&&i.v7_partialHydration)for(let c=0;c<a.length;c++){let d=a[c];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(u=c),d.route.id){let{loaderData:h,errors:m}=n,_=d.route.loader&&h[d.route.id]===void 0&&(!m||m[d.route.id]===void 0);if(d.route.lazy||_){l=!0,u>=0?a=a.slice(0,u+1):a=[a[0]];break}}}return a.reduceRight((c,d,h)=>{let m,_=!1,y=null,p=null;n&&(m=o&&d.route.id?o[d.route.id]:void 0,y=d.route.errorElement||LE,l&&(u<0&&h===0?(BE("route-fallback"),_=!0,p=null):u===h&&(_=!0,p=d.route.hydrateFallbackElement||null)));let f=e.concat(a.slice(0,h+1)),g=()=>{let v;return m?v=y:_?v=p:d.route.Component?v=$.createElement(d.route.Component,null):d.route.element?v=d.route.element:v=c,$.createElement(UE,{match:d,routeContext:{outlet:c,matches:f,isDataRoute:n!=null},children:v})};return n&&(d.route.ErrorBoundary||d.route.errorElement||h===0)?$.createElement(DE,{location:n.location,revalidation:n.revalidation,component:y,error:m,children:g(),routeContext:{outlet:null,matches:f,isDataRoute:!0}}):g()},null)}var ty=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(ty||{}),ny=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(ny||{});function NE(t){let e=$.useContext(Fo);return e||it(!1),e}function FE(t){let e=$.useContext(mp);return e||it(!1),e}function OE(t){let e=$.useContext(qi);return e||it(!1),e}function iy(t){let e=OE(),n=e.matches[e.matches.length-1];return n.route.id||it(!1),n.route.id}function kE(){var t;let e=$.useContext(Q0),n=FE(ny.UseRouteError),i=iy();return e!==void 0?e:(t=n.errors)==null?void 0:t[i]}function zE(){let{router:t}=NE(ty.UseNavigateStable),e=iy(),n=$.useRef(!1);return J0(()=>{n.current=!0}),$.useCallback(function(r,s){s===void 0&&(s={}),n.current&&(typeof r=="number"?t.navigate(r):t.navigate(r,Iu({fromRouteId:e},s)))},[t,e])}const lg={};function BE(t,e,n){lg[t]||(lg[t]=!0)}function HE(t,e){t==null||t.v7_startTransition,(t==null?void 0:t.v7_relativeSplatPath)===void 0&&(!e||e.v7_relativeSplatPath),e&&(e.v7_fetcherPersist,e.v7_normalizeFormMethod,e.v7_partialHydration,e.v7_skipActionErrorRevalidation)}function VE(t){return RE(t.context)}function GE(t){let{basename:e="/",children:n=null,location:i,navigationType:r=Vt.Pop,navigator:s,static:a=!1,future:o}=t;Oo()&&it(!1);let l=e.replace(/^\/*/,"/"),u=$.useMemo(()=>({basename:l,navigator:s,static:a,future:Iu({v7_relativeSplatPath:!1},o)}),[l,o,s,a]);typeof i=="string"&&(i=Lr(i));let{pathname:c="/",search:d="",hash:h="",state:m=null,key:_="default"}=i,y=$.useMemo(()=>{let p=ji(c,l);return p==null?null:{location:{pathname:p,search:d,hash:h,state:m,key:_},navigationType:r}},[l,c,d,h,m,_,r]);return y==null?null:$.createElement(Dr.Provider,{value:u},$.createElement(gp.Provider,{children:n,value:y}))}new Promise(()=>{});function WE(t){let e={hasErrorBoundary:t.ErrorBoundary!=null||t.errorElement!=null};return t.Component&&Object.assign(e,{element:$.createElement(t.Component),Component:void 0}),t.HydrateFallback&&Object.assign(e,{hydrateFallbackElement:$.createElement(t.HydrateFallback),HydrateFallback:void 0}),t.ErrorBoundary&&Object.assign(e,{errorElement:$.createElement(t.ErrorBoundary),ErrorBoundary:void 0}),e}/**
 * React Router DOM v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ma(){return ma=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)({}).hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},ma.apply(null,arguments)}function ry(t,e){if(t==null)return{};var n={};for(var i in t)if({}.hasOwnProperty.call(t,i)){if(e.indexOf(i)!==-1)continue;n[i]=t[i]}return n}function jE(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function XE(t,e){return t.button===0&&(!e||e==="_self")&&!jE(t)}const YE=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],$E=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],qE="6";try{window.__reactRouterVersion=qE}catch{}function KE(t,e){return rE({basename:void 0,future:ma({},void 0,{v7_prependBasename:!0}),history:RM({window:void 0}),hydrationData:ZE(),routes:t,mapRouteProperties:WE,dataStrategy:void 0,patchRoutesOnNavigation:void 0,window:void 0}).initialize()}function ZE(){var t;let e=(t=window)==null?void 0:t.__staticRouterHydrationData;return e&&e.errors&&(e=ma({},e,{errors:QE(e.errors)})),e}function QE(t){if(!t)return null;let e=Object.entries(t),n={};for(let[i,r]of e)if(r&&r.__type==="RouteErrorResponse")n[i]=new Uu(r.status,r.statusText,r.data,r.internal===!0);else if(r&&r.__type==="Error"){if(r.__subType){let s=window[r.__subType];if(typeof s=="function")try{let a=new s(r.message);a.stack="",n[i]=a}catch{}}if(n[i]==null){let s=new Error(r.message);s.stack="",n[i]=s}}else n[i]=r;return n}const sy=$.createContext({isTransitioning:!1}),JE=$.createContext(new Map),ew="startTransition",ug=px[ew],tw="flushSync",cg=AM[tw];function nw(t){ug?ug(t):t()}function Oa(t){cg?cg(t):t()}class iw{constructor(){this.status="pending",this.promise=new Promise((e,n)=>{this.resolve=i=>{this.status==="pending"&&(this.status="resolved",e(i))},this.reject=i=>{this.status==="pending"&&(this.status="rejected",n(i))}})}}function rw(t){let{fallbackElement:e,router:n,future:i}=t,[r,s]=$.useState(n.state),[a,o]=$.useState(),[l,u]=$.useState({isTransitioning:!1}),[c,d]=$.useState(),[h,m]=$.useState(),[_,y]=$.useState(),p=$.useRef(new Map),{v7_startTransition:f}=i||{},g=$.useCallback(C=>{f?nw(C):C()},[f]),v=$.useCallback((C,B)=>{let{deletedFetchers:x,flushSync:E,viewTransitionOpts:z}=B;C.fetchers.forEach((j,Z)=>{j.data!==void 0&&p.current.set(Z,j.data)}),x.forEach(j=>p.current.delete(j));let V=n.window==null||n.window.document==null||typeof n.window.document.startViewTransition!="function";if(!z||V){E?Oa(()=>s(C)):g(()=>s(C));return}if(E){Oa(()=>{h&&(c&&c.resolve(),h.skipTransition()),u({isTransitioning:!0,flushSync:!0,currentLocation:z.currentLocation,nextLocation:z.nextLocation})});let j=n.window.document.startViewTransition(()=>{Oa(()=>s(C))});j.finished.finally(()=>{Oa(()=>{d(void 0),m(void 0),o(void 0),u({isTransitioning:!1})})}),Oa(()=>m(j));return}h?(c&&c.resolve(),h.skipTransition(),y({state:C,currentLocation:z.currentLocation,nextLocation:z.nextLocation})):(o(C),u({isTransitioning:!0,flushSync:!1,currentLocation:z.currentLocation,nextLocation:z.nextLocation}))},[n.window,h,c,p,g]);$.useLayoutEffect(()=>n.subscribe(v),[n,v]),$.useEffect(()=>{l.isTransitioning&&!l.flushSync&&d(new iw)},[l]),$.useEffect(()=>{if(c&&a&&n.window){let C=a,B=c.promise,x=n.window.document.startViewTransition(async()=>{g(()=>s(C)),await B});x.finished.finally(()=>{d(void 0),m(void 0),o(void 0),u({isTransitioning:!1})}),m(x)}},[g,a,c,n.window]),$.useEffect(()=>{c&&a&&r.location.key===a.location.key&&c.resolve()},[c,h,r.location,a]),$.useEffect(()=>{!l.isTransitioning&&_&&(o(_.state),u({isTransitioning:!0,flushSync:!1,currentLocation:_.currentLocation,nextLocation:_.nextLocation}),y(void 0))},[l.isTransitioning,_]),$.useEffect(()=>{},[]);let M=$.useMemo(()=>({createHref:n.createHref,encodeLocation:n.encodeLocation,go:C=>n.navigate(C),push:(C,B,x)=>n.navigate(C,{state:B,preventScrollReset:x==null?void 0:x.preventScrollReset}),replace:(C,B,x)=>n.navigate(C,{replace:!0,state:B,preventScrollReset:x==null?void 0:x.preventScrollReset})}),[n]),R=n.basename||"/",A=$.useMemo(()=>({router:n,navigator:M,static:!1,basename:R}),[n,M,R]),S=$.useMemo(()=>({v7_relativeSplatPath:n.future.v7_relativeSplatPath}),[n.future.v7_relativeSplatPath]);return $.useEffect(()=>HE(i,n.future),[i,n.future]),$.createElement($.Fragment,null,$.createElement(Fo.Provider,{value:A},$.createElement(mp.Provider,{value:r},$.createElement(JE.Provider,{value:p.current},$.createElement(sy.Provider,{value:l},$.createElement(GE,{basename:R,location:r.location,navigationType:r.historyAction,navigator:M,future:S},r.initialized||n.future.v7_partialHydration?$.createElement(sw,{routes:n.routes,future:n.future,state:r}):e))))),null)}const sw=$.memo(aw);function aw(t){let{routes:e,future:n,state:i}=t;return bE(e,void 0,i,n)}const ow=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",lw=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,ay=$.forwardRef(function(e,n){let{onClick:i,relative:r,reloadDocument:s,replace:a,state:o,target:l,to:u,preventScrollReset:c,viewTransition:d}=e,h=ry(e,YE),{basename:m}=$.useContext(Dr),_,y=!1;if(typeof u=="string"&&lw.test(u)&&(_=u,ow))try{let v=new URL(window.location.href),M=u.startsWith("//")?new URL(v.protocol+u):new URL(u),R=ji(M.pathname,m);M.origin===v.origin&&R!=null?u=R+M.search+M.hash:y=!0}catch{}let p=wE(u,{relative:r}),f=cw(u,{replace:a,state:o,target:l,preventScrollReset:c,relative:r,viewTransition:d});function g(v){i&&i(v),v.defaultPrevented||f(v)}return $.createElement("a",ma({},h,{href:_||p,onClick:y||s?i:g,ref:n,target:l}))}),fg=$.forwardRef(function(e,n){let{"aria-current":i="page",caseSensitive:r=!1,className:s="",end:a=!1,style:o,to:l,viewTransition:u,children:c}=e,d=ry(e,$E),h=ac(l,{relative:d.relative}),m=ko(),_=$.useContext(mp),{navigator:y,basename:p}=$.useContext(Dr),f=_!=null&&fw(h)&&u===!0,g=y.encodeLocation?y.encodeLocation(h).pathname:h.pathname,v=m.pathname,M=_&&_.navigation&&_.navigation.location?_.navigation.location.pathname:null;r||(v=v.toLowerCase(),M=M?M.toLowerCase():null,g=g.toLowerCase()),M&&p&&(M=ji(M,p)||M);const R=g!=="/"&&g.endsWith("/")?g.length-1:g.length;let A=v===g||!a&&v.startsWith(g)&&v.charAt(R)==="/",S=M!=null&&(M===g||!a&&M.startsWith(g)&&M.charAt(g.length)==="/"),C={isActive:A,isPending:S,isTransitioning:f},B=A?i:void 0,x;typeof s=="function"?x=s(C):x=[s,A?"active":null,S?"pending":null,f?"transitioning":null].filter(Boolean).join(" ");let E=typeof o=="function"?o(C):o;return $.createElement(ay,ma({},d,{"aria-current":B,className:x,ref:n,style:E,to:l,viewTransition:u}),typeof c=="function"?c(C):c)});var Ed;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(Ed||(Ed={}));var dg;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(dg||(dg={}));function uw(t){let e=$.useContext(Fo);return e||it(!1),e}function cw(t,e){let{target:n,replace:i,state:r,preventScrollReset:s,relative:a,viewTransition:o}=e===void 0?{}:e,l=ey(),u=ko(),c=ac(t,{relative:a});return $.useCallback(d=>{if(XE(d,n)){d.preventDefault();let h=i!==void 0?i:ls(u)===ls(c);l(t,{replace:h,state:r,preventScrollReset:s,relative:a,viewTransition:o})}},[u,l,c,i,r,n,t,s,a,o])}function fw(t,e){e===void 0&&(e={});let n=$.useContext(sy);n==null&&it(!1);let{basename:i}=uw(Ed.useViewTransitionState),r=ac(t,{relative:e.relative});if(!n.isTransitioning)return!1;let s=ji(n.currentLocation.pathname,i)||n.currentLocation.pathname,a=ji(n.nextLocation.pathname,i)||n.nextLocation.pathname;return Du(r.pathname,a)!=null||Du(r.pathname,s)!=null}function hg({isActive:t}){return`text-sm ${t?"text-slate-100":"text-slate-400 hover:text-slate-200"}`}function dw(){return ie.jsxs("div",{className:"min-h-screen bg-slate-950 text-slate-100",children:[ie.jsx("nav",{className:"border-b border-slate-800 bg-slate-900",children:ie.jsxs("div",{className:"mx-auto flex max-w-6xl items-center gap-6 px-6 py-3",children:[ie.jsx("span",{className:"font-semibold text-slate-100",children:"Photogrammetry Inspector"}),ie.jsx(fg,{to:"/",end:!0,className:hg,children:"Dashboard"}),ie.jsx(fg,{to:"/settings",className:hg,children:"Settings"})]})}),ie.jsx("main",{className:"mx-auto max-w-6xl px-6 py-8",children:ie.jsx(VE,{})})]})}const oc="/api";async function vp(t){const e=`${oc}${t}`,n=await fetch(e);if(!n.ok)throw new Error(`GET ${e} failed: ${n.status} ${n.statusText}`);return await n.json()}async function hw(){return vp("/scans")}async function pg(t){return vp(`/scans/${t}`)}async function pw(t){const e=`${oc}/scans/${t}`,n=await fetch(e,{method:"DELETE"});if(!n.ok)throw new Error(`DELETE ${e} failed: ${n.status} ${n.statusText}`)}async function mw(t){const e=`${oc}/scans/${t}/reprocess`,n=await fetch(e,{method:"POST"});if(!n.ok)throw new Error(`POST ${e} failed: ${n.status} ${n.statusText}`)}function oy(t,e){return`${oc}/files/${t}/${e}`}async function gw(){return vp("/health")}const vw={pending:"bg-slate-700 text-slate-200",processing:"bg-blue-600 text-white animate-pulse",completed:"bg-green-600 text-white",failed:"bg-red-600 text-white"};function ly({status:t}){return ie.jsx("span",{"data-testid":"status-badge","data-status":t,className:`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${vw[t]}`,children:t})}function uy(t,e=Date.now()){const n=Date.parse(t);if(Number.isNaN(n))return t;const i=Math.max(0,Math.round((e-n)/1e3));if(i<60)return`${i}s ago`;const r=Math.round(i/60);if(r<60)return`${r}m ago`;const s=Math.round(r/60);return s<24?`${s}h ago`:`${Math.round(s/24)}d ago`}const _w={space:"🏠",object:"📦"};function yw({scan:t}){return ie.jsxs(ay,{to:`/scans/${t.id}`,className:"block rounded-xl border border-slate-800 bg-slate-900 p-4 transition hover:border-slate-600 hover:bg-slate-800",children:[ie.jsxs("div",{className:"flex items-center justify-between",children:[ie.jsxs("span",{className:"flex items-center gap-2 text-sm font-medium capitalize text-slate-200",children:[ie.jsx("span",{"aria-hidden":!0,children:_w[t.mode]}),t.mode]}),ie.jsx(ly,{status:t.status})]}),ie.jsx("div",{className:"mt-2 font-mono text-xs text-slate-500",children:t.id}),ie.jsx("div",{className:"mt-1 text-xs text-slate-400",children:uy(t.created_at)}),t.raw_stats&&ie.jsxs("div",{className:"mt-3 grid grid-cols-2 gap-1 text-xs text-slate-400",children:[ie.jsxs("span",{children:[t.raw_stats.keyframe_count," keyframes"]}),ie.jsxs("span",{children:[t.raw_stats.anchor_count," anchors"]}),ie.jsxs("span",{children:[t.raw_stats.point_count," points"]}),ie.jsxs("span",{children:[t.raw_stats.face_count," faces"]})]})]})}function xw(){const[t,e]=$.useState([]),[n,i]=$.useState("loading"),[r,s]=$.useState(""),a=$.useCallback(async()=>{i("loading");try{const o=await hw();e(o),i("loaded")}catch(o){s(o instanceof Error?o.message:String(o)),i("error")}},[]);return $.useEffect(()=>{a()},[a]),ie.jsxs("div",{children:[ie.jsxs("div",{className:"mb-6 flex items-center justify-between",children:[ie.jsx("h1",{className:"text-2xl font-semibold text-slate-100",children:"Scans"}),ie.jsx("button",{type:"button",onClick:()=>void a(),className:"rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700",children:"Refresh"})]}),n==="loading"&&ie.jsx("p",{className:"text-slate-400",children:"Loading scans…"}),n==="error"&&ie.jsxs("p",{className:"text-red-400",children:["Failed to load scans: ",r]}),n==="loaded"&&t.length===0&&ie.jsx("p",{className:"text-slate-400",children:"No scans yet — capture one from the iPhone app."}),n==="loaded"&&t.length>0&&ie.jsx("div",{className:"grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",children:t.map(o=>ie.jsx(yw,{scan:o},o.id))})]})}function Sw(t,e,n){const i=new EventSource(`/api/scans/${t}/events`);return i.onmessage=r=>{const s=Mw(r.data);s&&e(s)},i.onerror=r=>{},()=>i.close()}function Mw(t){try{return JSON.parse(t)}catch{return null}}function Ew(t){return t.type==="log"?typeof t.data=="string"?t.data:JSON.stringify(t.data):t.type==="completed"?"✓ processing completed":t.type==="failed"?`✗ processing failed${t.data?`: ${String(t.data)}`:""}`:null}function ww(t){if(typeof t=="number")return t;if(t&&typeof t=="object"&&"fraction"in t){const e=t.fraction;return typeof e=="number"?e:null}return null}function Tw({scanId:t}){const[e,n]=$.useState([]),[i,r]=$.useState(null),[s,a]=$.useState("streaming"),o=$.useRef(null);return $.useEffect(()=>(n([]),r(null),a("streaming"),Sw(t,u=>{if(u.type==="progress"){const d=ww(u.data);d!==null&&r(d);return}u.type==="completed"&&a("completed"),u.type==="failed"&&a("failed");const c=Ew(u);c&&n(d=>[...d,c])})),[t]),$.useEffect(()=>{var l,u;(u=(l=o.current)==null?void 0:l.scrollIntoView)==null||u.call(l,{behavior:"smooth"})},[e.length]),ie.jsxs("div",{children:[ie.jsxs("div",{className:"mb-2 flex items-center gap-3",children:[ie.jsx("span",{"data-testid":"stream-state",className:`text-sm font-medium ${s==="failed"?"text-red-400":s==="completed"?"text-green-400":"text-blue-400"}`,children:s}),i!==null&&ie.jsxs("span",{className:"text-xs text-slate-400",children:[Math.round(i*100),"%"]})]}),i!==null&&ie.jsx("div",{className:"mb-2 h-1.5 w-full overflow-hidden rounded bg-slate-800",children:ie.jsx("div",{className:"h-full bg-blue-500 transition-all",style:{width:`${Math.min(100,Math.round(i*100))}%`}})}),ie.jsxs("div",{className:"h-72 overflow-y-auto rounded-lg border border-slate-800 bg-black/50 p-3 font-mono text-xs text-slate-300",children:[e.length===0?ie.jsx("p",{className:"text-slate-600",children:"Waiting for log output…"}):e.map((l,u)=>ie.jsx("div",{className:"whitespace-pre-wrap",children:l},u)),ie.jsx("div",{ref:o})]})]})}function ll({label:t,value:e}){return ie.jsxs("div",{className:"rounded-lg border border-slate-800 bg-slate-900 p-4",children:[ie.jsx("div",{className:"text-2xl font-semibold text-slate-100",children:e}),ie.jsx("div",{className:"mt-1 text-xs uppercase tracking-wide text-slate-400",children:t})]})}function Aw({urls:t}){const[e,n]=$.useState(null);return t.length===0?ie.jsx("p",{className:"text-sm text-slate-500",children:"No keyframes available."}):ie.jsxs(ie.Fragment,{children:[ie.jsx("div",{className:"flex gap-2 overflow-x-auto pb-2",children:t.map(i=>ie.jsx("button",{type:"button",onClick:()=>n(i),className:"shrink-0 rounded-md border border-slate-800 hover:border-slate-500",children:ie.jsx("img",{src:i,alt:"keyframe thumbnail",className:"h-24 w-32 rounded-md object-cover"})},i))}),e&&ie.jsx("div",{role:"dialog","aria-modal":"true",onClick:()=>n(null),className:"fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6",children:ie.jsx("img",{src:e,alt:"keyframe full size",className:"max-h-full max-w-full rounded-lg"})})]})}const Rw=/^raw\/keyframe_.*\.jpg$/,Cw=/^raw\/images\/.*\.(jpg|jpeg|png)$/i;function bw(t,e){return t.raw_files.filter(n=>e.test(n)).map(n=>oy(t.id,n))}function Pw({scan:t}){const e=t.mode==="space",n=bw(t,e?Rw:Cw);return ie.jsxs("div",{className:"space-y-6",children:[e&&t.raw_stats&&ie.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4",children:[ie.jsx(ll,{label:"Anchors",value:t.raw_stats.anchor_count}),ie.jsx(ll,{label:"Keyframes",value:t.raw_stats.keyframe_count}),ie.jsx(ll,{label:"Points",value:t.raw_stats.point_count}),ie.jsx(ll,{label:"Faces",value:t.raw_stats.face_count})]}),ie.jsxs("section",{children:[ie.jsx("h3",{className:"mb-2 text-sm font-medium text-slate-300",children:e?"Keyframes":`Images (${n.length})`}),ie.jsx(Aw,{urls:n})]}),ie.jsxs("section",{children:[ie.jsx("h3",{className:"mb-2 text-sm font-medium text-slate-300",children:"Raw files"}),ie.jsx("ul",{className:"space-y-1 text-sm",children:t.raw_files.map(i=>ie.jsx("li",{children:ie.jsx("a",{href:oy(t.id,i),download:!0,className:"font-mono text-blue-400 hover:underline",children:i})},i))})]})]})}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _p="169",ra={ROTATE:0,DOLLY:1,PAN:2},$s={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Lw=0,mg=1,Dw=2,cy=1,Uw=2,Li=3,Xi=0,Ln=1,Ii=2,Mr=0,sa=1,gg=2,vg=3,_g=4,Iw=5,Xr=100,Nw=101,Fw=102,Ow=103,kw=104,zw=200,Bw=201,Hw=202,Vw=203,wd=204,Td=205,Gw=206,Ww=207,jw=208,Xw=209,Yw=210,$w=211,qw=212,Kw=213,Zw=214,Ad=0,Rd=1,Cd=2,ga=3,bd=4,Pd=5,Ld=6,Dd=7,yp=0,Qw=1,Jw=2,Er=0,eT=1,tT=2,nT=3,iT=4,rT=5,sT=6,aT=7,fy=300,va=301,_a=302,Ud=303,Id=304,lc=306,Nu=1e3,Qr=1001,Nd=1002,Zn=1003,oT=1004,ul=1005,ci=1006,jc=1007,Jr=1008,Yi=1009,dy=1010,hy=1011,bo=1012,xp=1013,us=1014,Oi=1015,zo=1016,Sp=1017,Mp=1018,ya=1020,py=35902,my=1021,gy=1022,fi=1023,vy=1024,_y=1025,aa=1026,xa=1027,yy=1028,Ep=1029,xy=1030,wp=1031,Tp=1033,Ql=33776,Jl=33777,eu=33778,tu=33779,Fd=35840,Od=35841,kd=35842,zd=35843,Bd=36196,Hd=37492,Vd=37496,Gd=37808,Wd=37809,jd=37810,Xd=37811,Yd=37812,$d=37813,qd=37814,Kd=37815,Zd=37816,Qd=37817,Jd=37818,eh=37819,th=37820,nh=37821,nu=36492,ih=36494,rh=36495,Sy=36283,sh=36284,ah=36285,oh=36286,lT=3200,uT=3201,My=0,cT=1,cr="",Yt="srgb",Ur="srgb-linear",Ap="display-p3",uc="display-p3-linear",Fu="linear",At="srgb",Ou="rec709",ku="p3",_s=7680,yg=519,fT=512,dT=513,hT=514,Ey=515,pT=516,mT=517,gT=518,vT=519,lh=35044,xg="300 es",ki=2e3,zu=2001;class hs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],iu=Math.PI/180,uh=180/Math.PI;function wr(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ln[t&255]+ln[t>>8&255]+ln[t>>16&255]+ln[t>>24&255]+"-"+ln[e&255]+ln[e>>8&255]+"-"+ln[e>>16&15|64]+ln[e>>24&255]+"-"+ln[n&63|128]+ln[n>>8&255]+"-"+ln[n>>16&255]+ln[n>>24&255]+ln[i&255]+ln[i>>8&255]+ln[i>>16&255]+ln[i>>24&255]).toLowerCase()}function _n(t,e,n){return Math.max(e,Math.min(n,t))}function _T(t,e){return(t%e+e)%e}function Xc(t,e,n){return(1-n)*t+n*e}function xi(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function yt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const yT={DEG2RAD:iu};class He{constructor(e=0,n=0){He.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(_n(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nt{constructor(e,n,i,r,s,a,o,l,u){nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,u)}set(e,n,i,r,s,a,o,l,u){const c=this.elements;return c[0]=e,c[1]=r,c[2]=o,c[3]=n,c[4]=s,c[5]=l,c[6]=i,c[7]=a,c[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],u=i[1],c=i[4],d=i[7],h=i[2],m=i[5],_=i[8],y=r[0],p=r[3],f=r[6],g=r[1],v=r[4],M=r[7],R=r[2],A=r[5],S=r[8];return s[0]=a*y+o*g+l*R,s[3]=a*p+o*v+l*A,s[6]=a*f+o*M+l*S,s[1]=u*y+c*g+d*R,s[4]=u*p+c*v+d*A,s[7]=u*f+c*M+d*S,s[2]=h*y+m*g+_*R,s[5]=h*p+m*v+_*A,s[8]=h*f+m*M+_*S,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],u=e[7],c=e[8];return n*a*c-n*o*u-i*s*c+i*o*l+r*s*u-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],u=e[7],c=e[8],d=c*a-o*u,h=o*l-c*s,m=u*s-a*l,_=n*d+i*h+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/_;return e[0]=d*y,e[1]=(r*u-c*i)*y,e[2]=(o*i-r*a)*y,e[3]=h*y,e[4]=(c*n-r*l)*y,e[5]=(r*s-o*n)*y,e[6]=m*y,e[7]=(i*l-u*n)*y,e[8]=(a*n-i*s)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),u=Math.sin(s);return this.set(i*l,i*u,-i*(l*a+u*o)+a+e,-r*u,r*l,-r*(-u*a+l*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(Yc.makeScale(e,n)),this}rotate(e){return this.premultiply(Yc.makeRotation(-e)),this}translate(e,n){return this.premultiply(Yc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Yc=new nt;function wy(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Po(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function xT(){const t=Po("canvas");return t.style.display="block",t}const Sg={};function ru(t){t in Sg||(Sg[t]=!0,console.warn(t))}function ST(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function MT(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function ET(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Mg=new nt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Eg=new nt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ka={[Ur]:{transfer:Fu,primaries:Ou,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t,fromReference:t=>t},[Yt]:{transfer:At,primaries:Ou,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[uc]:{transfer:Fu,primaries:ku,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.applyMatrix3(Eg),fromReference:t=>t.applyMatrix3(Mg)},[Ap]:{transfer:At,primaries:ku,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.convertSRGBToLinear().applyMatrix3(Eg),fromReference:t=>t.applyMatrix3(Mg).convertLinearToSRGB()}},wT=new Set([Ur,uc]),pt={enabled:!0,_workingColorSpace:Ur,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!wT.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=ka[e].toReference,r=ka[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return ka[t].primaries},getTransfer:function(t){return t===cr?Fu:ka[t].transfer},getLuminanceCoefficients:function(t,e=this._workingColorSpace){return t.fromArray(ka[e].luminanceCoefficients)}};function oa(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function $c(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let ys;class TT{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ys===void 0&&(ys=Po("canvas")),ys.width=e.width,ys.height=e.height;const i=ys.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ys}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Po("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=oa(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(oa(n[i]/255)*255):n[i]=oa(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let AT=0;class Ty{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:AT++}),this.uuid=wr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(qc(r[a].image)):s.push(qc(r[a]))}else s=qc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function qc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?TT.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let RT=0;class hn extends hs{constructor(e=hn.DEFAULT_IMAGE,n=hn.DEFAULT_MAPPING,i=Qr,r=Qr,s=ci,a=Jr,o=fi,l=Yi,u=hn.DEFAULT_ANISOTROPY,c=cr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:RT++}),this.uuid=wr(),this.name="",this.source=new Ty(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=l,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fy)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Nu:e.x=e.x-Math.floor(e.x);break;case Qr:e.x=e.x<0?0:1;break;case Nd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Nu:e.y=e.y-Math.floor(e.y);break;case Qr:e.y=e.y<0?0:1;break;case Nd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=fy;hn.DEFAULT_ANISOTROPY=1;class Dt{constructor(e=0,n=0,i=0,r=1){Dt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,u=l[0],c=l[4],d=l[8],h=l[1],m=l[5],_=l[9],y=l[2],p=l[6],f=l[10];if(Math.abs(c-h)<.01&&Math.abs(d-y)<.01&&Math.abs(_-p)<.01){if(Math.abs(c+h)<.1&&Math.abs(d+y)<.1&&Math.abs(_+p)<.1&&Math.abs(u+m+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(u+1)/2,M=(m+1)/2,R=(f+1)/2,A=(c+h)/4,S=(d+y)/4,C=(_+p)/4;return v>M&&v>R?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=A/i,s=S/i):M>R?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=A/r,s=C/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=S/s,r=C/s),this.set(i,r,s,n),this}let g=Math.sqrt((p-_)*(p-_)+(d-y)*(d-y)+(h-c)*(h-c));return Math.abs(g)<.001&&(g=1),this.x=(p-_)/g,this.y=(d-y)/g,this.z=(h-c)/g,this.w=Math.acos((u+m+f-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class CT extends hs{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Dt(0,0,e,n),this.scissorTest=!1,this.viewport=new Dt(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ci,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new hn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new Ty(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cs extends CT{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Ay extends hn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Zn,this.minFilter=Zn,this.wrapR=Qr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class bT extends hn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Zn,this.minFilter=Zn,this.wrapR=Qr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ei{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],u=i[r+1],c=i[r+2],d=i[r+3];const h=s[a+0],m=s[a+1],_=s[a+2],y=s[a+3];if(o===0){e[n+0]=l,e[n+1]=u,e[n+2]=c,e[n+3]=d;return}if(o===1){e[n+0]=h,e[n+1]=m,e[n+2]=_,e[n+3]=y;return}if(d!==y||l!==h||u!==m||c!==_){let p=1-o;const f=l*h+u*m+c*_+d*y,g=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){const R=Math.sqrt(v),A=Math.atan2(R,f*g);p=Math.sin(p*A)/R,o=Math.sin(o*A)/R}const M=o*g;if(l=l*p+h*M,u=u*p+m*M,c=c*p+_*M,d=d*p+y*M,p===1-o){const R=1/Math.sqrt(l*l+u*u+c*c+d*d);l*=R,u*=R,c*=R,d*=R}}e[n]=l,e[n+1]=u,e[n+2]=c,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],u=i[r+2],c=i[r+3],d=s[a],h=s[a+1],m=s[a+2],_=s[a+3];return e[n]=o*_+c*d+l*m-u*h,e[n+1]=l*_+c*h+u*d-o*m,e[n+2]=u*_+c*m+o*h-l*d,e[n+3]=c*_-o*d-l*h-u*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,u=o(i/2),c=o(r/2),d=o(s/2),h=l(i/2),m=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=h*c*d+u*m*_,this._y=u*m*d-h*c*_,this._z=u*c*_+h*m*d,this._w=u*c*d-h*m*_;break;case"YXZ":this._x=h*c*d+u*m*_,this._y=u*m*d-h*c*_,this._z=u*c*_-h*m*d,this._w=u*c*d+h*m*_;break;case"ZXY":this._x=h*c*d-u*m*_,this._y=u*m*d+h*c*_,this._z=u*c*_+h*m*d,this._w=u*c*d-h*m*_;break;case"ZYX":this._x=h*c*d-u*m*_,this._y=u*m*d+h*c*_,this._z=u*c*_-h*m*d,this._w=u*c*d+h*m*_;break;case"YZX":this._x=h*c*d+u*m*_,this._y=u*m*d+h*c*_,this._z=u*c*_-h*m*d,this._w=u*c*d-h*m*_;break;case"XZY":this._x=h*c*d-u*m*_,this._y=u*m*d-h*c*_,this._z=u*c*_+h*m*d,this._w=u*c*d+h*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],u=n[2],c=n[6],d=n[10],h=i+o+d;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(c-l)*m,this._y=(s-u)*m,this._z=(a-r)*m}else if(i>o&&i>d){const m=2*Math.sqrt(1+i-o-d);this._w=(c-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+u)/m}else if(o>d){const m=2*Math.sqrt(1+o-i-d);this._w=(s-u)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+c)/m}else{const m=2*Math.sqrt(1+d-i-o);this._w=(a-r)/m,this._x=(s+u)/m,this._y=(l+c)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(_n(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,u=n._z,c=n._w;return this._x=i*c+a*o+r*u-s*l,this._y=r*c+a*l+s*o-i*u,this._z=s*c+a*u+i*l-r*o,this._w=a*c-i*o-r*l-s*u,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-n;return this._w=m*a+n*this._w,this._x=m*i+n*this._x,this._y=m*r+n*this._y,this._z=m*s+n*this._z,this.normalize(),this}const u=Math.sqrt(l),c=Math.atan2(u,o),d=Math.sin((1-n)*c)/u,h=Math.sin(n*c)/u;return this._w=a*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,n=0,i=0){N.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(wg.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(wg.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,u=2*(a*r-o*i),c=2*(o*n-s*r),d=2*(s*i-a*n);return this.x=n+l*u+a*d-o*c,this.y=i+l*c+o*u-s*d,this.z=r+l*d+s*c-a*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Kc.copy(this).projectOnVector(e),this.sub(Kc)}reflect(e){return this.sub(Kc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(_n(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Kc=new N,wg=new Ei;class Ta{constructor(e=new N(1/0,1/0,1/0),n=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(ii.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(ii.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=ii.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ii):ii.fromBufferAttribute(s,a),ii.applyMatrix4(e.matrixWorld),this.expandByPoint(ii);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),cl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),cl.copy(i.boundingBox)),cl.applyMatrix4(e.matrixWorld),this.union(cl)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ii),ii.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(za),fl.subVectors(this.max,za),xs.subVectors(e.a,za),Ss.subVectors(e.b,za),Ms.subVectors(e.c,za),Qi.subVectors(Ss,xs),Ji.subVectors(Ms,Ss),Ir.subVectors(xs,Ms);let n=[0,-Qi.z,Qi.y,0,-Ji.z,Ji.y,0,-Ir.z,Ir.y,Qi.z,0,-Qi.x,Ji.z,0,-Ji.x,Ir.z,0,-Ir.x,-Qi.y,Qi.x,0,-Ji.y,Ji.x,0,-Ir.y,Ir.x,0];return!Zc(n,xs,Ss,Ms,fl)||(n=[1,0,0,0,1,0,0,0,1],!Zc(n,xs,Ss,Ms,fl))?!1:(dl.crossVectors(Qi,Ji),n=[dl.x,dl.y,dl.z],Zc(n,xs,Ss,Ms,fl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ii).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ii).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ti=[new N,new N,new N,new N,new N,new N,new N,new N],ii=new N,cl=new Ta,xs=new N,Ss=new N,Ms=new N,Qi=new N,Ji=new N,Ir=new N,za=new N,fl=new N,dl=new N,Nr=new N;function Zc(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){Nr.fromArray(t,s);const o=r.x*Math.abs(Nr.x)+r.y*Math.abs(Nr.y)+r.z*Math.abs(Nr.z),l=e.dot(Nr),u=n.dot(Nr),c=i.dot(Nr);if(Math.max(-Math.max(l,u,c),Math.min(l,u,c))>o)return!1}return!0}const PT=new Ta,Ba=new N,Qc=new N;class Bo{constructor(e=new N,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):PT.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ba.subVectors(e,this.center);const n=Ba.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Ba,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ba.copy(e.center).add(Qc)),this.expandByPoint(Ba.copy(e.center).sub(Qc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ai=new N,Jc=new N,hl=new N,er=new N,ef=new N,pl=new N,tf=new N;class Ho{constructor(e=new N,n=new N(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ai)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ai.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ai.copy(this.origin).addScaledVector(this.direction,n),Ai.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Jc.copy(e).add(n).multiplyScalar(.5),hl.copy(n).sub(e).normalize(),er.copy(this.origin).sub(Jc);const s=e.distanceTo(n)*.5,a=-this.direction.dot(hl),o=er.dot(this.direction),l=-er.dot(hl),u=er.lengthSq(),c=Math.abs(1-a*a);let d,h,m,_;if(c>0)if(d=a*l-o,h=a*o-l,_=s*c,d>=0)if(h>=-_)if(h<=_){const y=1/c;d*=y,h*=y,m=d*(d+a*h+2*o)+h*(a*d+h+2*l)+u}else h=s,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*l)+u;else h=-s,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*l)+u;else h<=-_?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-l),s),m=-d*d+h*(h+2*l)+u):h<=_?(d=0,h=Math.min(Math.max(-s,-l),s),m=h*(h+2*l)+u):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-l),s),m=-d*d+h*(h+2*l)+u);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Jc).addScaledVector(hl,h),m}intersectSphere(e,n){Ai.subVectors(e.center,this.origin);const i=Ai.dot(this.direction),r=Ai.dot(Ai)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const u=1/this.direction.x,c=1/this.direction.y,d=1/this.direction.z,h=this.origin;return u>=0?(i=(e.min.x-h.x)*u,r=(e.max.x-h.x)*u):(i=(e.max.x-h.x)*u,r=(e.min.x-h.x)*u),c>=0?(s=(e.min.y-h.y)*c,a=(e.max.y-h.y)*c):(s=(e.max.y-h.y)*c,a=(e.min.y-h.y)*c),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Ai)!==null}intersectTriangle(e,n,i,r,s){ef.subVectors(n,e),pl.subVectors(i,e),tf.crossVectors(ef,pl);let a=this.direction.dot(tf),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;er.subVectors(this.origin,e);const l=o*this.direction.dot(pl.crossVectors(er,pl));if(l<0)return null;const u=o*this.direction.dot(ef.cross(er));if(u<0||l+u>a)return null;const c=-o*er.dot(tf);return c<0?null:this.at(c/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class wt{constructor(e,n,i,r,s,a,o,l,u,c,d,h,m,_,y,p){wt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,u,c,d,h,m,_,y,p)}set(e,n,i,r,s,a,o,l,u,c,d,h,m,_,y,p){const f=this.elements;return f[0]=e,f[4]=n,f[8]=i,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=u,f[6]=c,f[10]=d,f[14]=h,f[3]=m,f[7]=_,f[11]=y,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Es.setFromMatrixColumn(e,0).length(),s=1/Es.setFromMatrixColumn(e,1).length(),a=1/Es.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),u=Math.sin(r),c=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=a*c,m=a*d,_=o*c,y=o*d;n[0]=l*c,n[4]=-l*d,n[8]=u,n[1]=m+_*u,n[5]=h-y*u,n[9]=-o*l,n[2]=y-h*u,n[6]=_+m*u,n[10]=a*l}else if(e.order==="YXZ"){const h=l*c,m=l*d,_=u*c,y=u*d;n[0]=h+y*o,n[4]=_*o-m,n[8]=a*u,n[1]=a*d,n[5]=a*c,n[9]=-o,n[2]=m*o-_,n[6]=y+h*o,n[10]=a*l}else if(e.order==="ZXY"){const h=l*c,m=l*d,_=u*c,y=u*d;n[0]=h-y*o,n[4]=-a*d,n[8]=_+m*o,n[1]=m+_*o,n[5]=a*c,n[9]=y-h*o,n[2]=-a*u,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const h=a*c,m=a*d,_=o*c,y=o*d;n[0]=l*c,n[4]=_*u-m,n[8]=h*u+y,n[1]=l*d,n[5]=y*u+h,n[9]=m*u-_,n[2]=-u,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const h=a*l,m=a*u,_=o*l,y=o*u;n[0]=l*c,n[4]=y-h*d,n[8]=_*d+m,n[1]=d,n[5]=a*c,n[9]=-o*c,n[2]=-u*c,n[6]=m*d+_,n[10]=h-y*d}else if(e.order==="XZY"){const h=a*l,m=a*u,_=o*l,y=o*u;n[0]=l*c,n[4]=-d,n[8]=u*c,n[1]=h*d+y,n[5]=a*c,n[9]=m*d-_,n[2]=_*d-m,n[6]=o*c,n[10]=y*d+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(LT,e,DT)}lookAt(e,n,i){const r=this.elements;return In.subVectors(e,n),In.lengthSq()===0&&(In.z=1),In.normalize(),tr.crossVectors(i,In),tr.lengthSq()===0&&(Math.abs(i.z)===1?In.x+=1e-4:In.z+=1e-4,In.normalize(),tr.crossVectors(i,In)),tr.normalize(),ml.crossVectors(In,tr),r[0]=tr.x,r[4]=ml.x,r[8]=In.x,r[1]=tr.y,r[5]=ml.y,r[9]=In.y,r[2]=tr.z,r[6]=ml.z,r[10]=In.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],u=i[12],c=i[1],d=i[5],h=i[9],m=i[13],_=i[2],y=i[6],p=i[10],f=i[14],g=i[3],v=i[7],M=i[11],R=i[15],A=r[0],S=r[4],C=r[8],B=r[12],x=r[1],E=r[5],z=r[9],V=r[13],j=r[2],Z=r[6],Y=r[10],ne=r[14],P=r[3],J=r[7],te=r[11],le=r[15];return s[0]=a*A+o*x+l*j+u*P,s[4]=a*S+o*E+l*Z+u*J,s[8]=a*C+o*z+l*Y+u*te,s[12]=a*B+o*V+l*ne+u*le,s[1]=c*A+d*x+h*j+m*P,s[5]=c*S+d*E+h*Z+m*J,s[9]=c*C+d*z+h*Y+m*te,s[13]=c*B+d*V+h*ne+m*le,s[2]=_*A+y*x+p*j+f*P,s[6]=_*S+y*E+p*Z+f*J,s[10]=_*C+y*z+p*Y+f*te,s[14]=_*B+y*V+p*ne+f*le,s[3]=g*A+v*x+M*j+R*P,s[7]=g*S+v*E+M*Z+R*J,s[11]=g*C+v*z+M*Y+R*te,s[15]=g*B+v*V+M*ne+R*le,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],u=e[13],c=e[2],d=e[6],h=e[10],m=e[14],_=e[3],y=e[7],p=e[11],f=e[15];return _*(+s*l*d-r*u*d-s*o*h+i*u*h+r*o*m-i*l*m)+y*(+n*l*m-n*u*h+s*a*h-r*a*m+r*u*c-s*l*c)+p*(+n*u*d-n*o*m-s*a*d+i*a*m+s*o*c-i*u*c)+f*(-r*o*c-n*l*d+n*o*h+r*a*d-i*a*h+i*l*c)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],u=e[7],c=e[8],d=e[9],h=e[10],m=e[11],_=e[12],y=e[13],p=e[14],f=e[15],g=d*p*u-y*h*u+y*l*m-o*p*m-d*l*f+o*h*f,v=_*h*u-c*p*u-_*l*m+a*p*m+c*l*f-a*h*f,M=c*y*u-_*d*u+_*o*m-a*y*m-c*o*f+a*d*f,R=_*d*l-c*y*l-_*o*h+a*y*h+c*o*p-a*d*p,A=n*g+i*v+r*M+s*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/A;return e[0]=g*S,e[1]=(y*h*s-d*p*s-y*r*m+i*p*m+d*r*f-i*h*f)*S,e[2]=(o*p*s-y*l*s+y*r*u-i*p*u-o*r*f+i*l*f)*S,e[3]=(d*l*s-o*h*s-d*r*u+i*h*u+o*r*m-i*l*m)*S,e[4]=v*S,e[5]=(c*p*s-_*h*s+_*r*m-n*p*m-c*r*f+n*h*f)*S,e[6]=(_*l*s-a*p*s-_*r*u+n*p*u+a*r*f-n*l*f)*S,e[7]=(a*h*s-c*l*s+c*r*u-n*h*u-a*r*m+n*l*m)*S,e[8]=M*S,e[9]=(_*d*s-c*y*s-_*i*m+n*y*m+c*i*f-n*d*f)*S,e[10]=(a*y*s-_*o*s+_*i*u-n*y*u-a*i*f+n*o*f)*S,e[11]=(c*o*s-a*d*s-c*i*u+n*d*u+a*i*m-n*o*m)*S,e[12]=R*S,e[13]=(c*y*r-_*d*r+_*i*h-n*y*h-c*i*p+n*d*p)*S,e[14]=(_*o*r-a*y*r-_*i*l+n*y*l+a*i*p-n*o*p)*S,e[15]=(a*d*r-c*o*r+c*i*l-n*d*l-a*i*h+n*o*h)*S,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,u=s*a,c=s*o;return this.set(u*a+i,u*o-r*l,u*l+r*o,0,u*o+r*l,c*o+i,c*l-r*a,0,u*l-r*o,c*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,u=s+s,c=a+a,d=o+o,h=s*u,m=s*c,_=s*d,y=a*c,p=a*d,f=o*d,g=l*u,v=l*c,M=l*d,R=i.x,A=i.y,S=i.z;return r[0]=(1-(y+f))*R,r[1]=(m+M)*R,r[2]=(_-v)*R,r[3]=0,r[4]=(m-M)*A,r[5]=(1-(h+f))*A,r[6]=(p+g)*A,r[7]=0,r[8]=(_+v)*S,r[9]=(p-g)*S,r[10]=(1-(h+y))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Es.set(r[0],r[1],r[2]).length();const a=Es.set(r[4],r[5],r[6]).length(),o=Es.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ri.copy(this);const u=1/s,c=1/a,d=1/o;return ri.elements[0]*=u,ri.elements[1]*=u,ri.elements[2]*=u,ri.elements[4]*=c,ri.elements[5]*=c,ri.elements[6]*=c,ri.elements[8]*=d,ri.elements[9]*=d,ri.elements[10]*=d,n.setFromRotationMatrix(ri),i.x=s,i.y=a,i.z=o,this}makePerspective(e,n,i,r,s,a,o=ki){const l=this.elements,u=2*s/(n-e),c=2*s/(i-r),d=(n+e)/(n-e),h=(i+r)/(i-r);let m,_;if(o===ki)m=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===zu)m=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=c,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=ki){const l=this.elements,u=1/(n-e),c=1/(i-r),d=1/(a-s),h=(n+e)*u,m=(i+r)*c;let _,y;if(o===ki)_=(a+s)*d,y=-2*d;else if(o===zu)_=s*d,y=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=y,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Es=new N,ri=new wt,LT=new N(0,0,0),DT=new N(1,1,1),tr=new N,ml=new N,In=new N,Tg=new wt,Ag=new Ei;class fn{constructor(e=0,n=0,i=0,r=fn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],u=r[5],c=r[9],d=r[2],h=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(_n(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-_n(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(_n(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-_n(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(_n(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,u),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-_n(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-c,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Tg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Tg,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Ag.setFromEuler(this),this.setFromQuaternion(Ag,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fn.DEFAULT_ORDER="XYZ";class Rp{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let UT=0;const Rg=new N,ws=new Ei,Ri=new wt,gl=new N,Ha=new N,IT=new N,NT=new Ei,Cg=new N(1,0,0),bg=new N(0,1,0),Pg=new N(0,0,1),Lg={type:"added"},FT={type:"removed"},Ts={type:"childadded",child:null},nf={type:"childremoved",child:null};class Ot extends hs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:UT++}),this.uuid=wr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ot.DEFAULT_UP.clone();const e=new N,n=new fn,i=new Ei,r=new N(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new wt},normalMatrix:{value:new nt}}),this.matrix=new wt,this.matrixWorld=new wt,this.matrixAutoUpdate=Ot.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return ws.setFromAxisAngle(e,n),this.quaternion.multiply(ws),this}rotateOnWorldAxis(e,n){return ws.setFromAxisAngle(e,n),this.quaternion.premultiply(ws),this}rotateX(e){return this.rotateOnAxis(Cg,e)}rotateY(e){return this.rotateOnAxis(bg,e)}rotateZ(e){return this.rotateOnAxis(Pg,e)}translateOnAxis(e,n){return Rg.copy(e).applyQuaternion(this.quaternion),this.position.add(Rg.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Cg,e)}translateY(e){return this.translateOnAxis(bg,e)}translateZ(e){return this.translateOnAxis(Pg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?gl.copy(e):gl.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ha.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(Ha,gl,this.up):Ri.lookAt(gl,Ha,this.up),this.quaternion.setFromRotationMatrix(Ri),r&&(Ri.extractRotation(r.matrixWorld),ws.setFromRotationMatrix(Ri),this.quaternion.premultiply(ws.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Lg),Ts.child=e,this.dispatchEvent(Ts),Ts.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(FT),nf.child=e,this.dispatchEvent(nf),nf.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Lg),Ts.child=e,this.dispatchEvent(Ts),Ts.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ha,e,IT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ha,NT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let u=0,c=l.length;u<c;u++){const d=l[u];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,u=this.material.length;l<u;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),u=a(e.textures),c=a(e.images),d=a(e.shapes),h=a(e.skeletons),m=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),c.length>0&&(i.images=c),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const l=[];for(const u in o){const c=o[u];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Ot.DEFAULT_UP=new N(0,1,0);Ot.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const si=new N,Ci=new N,rf=new N,bi=new N,As=new N,Rs=new N,Dg=new N,sf=new N,af=new N,of=new N,lf=new Dt,uf=new Dt,cf=new Dt;class qn{constructor(e=new N,n=new N,i=new N){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),si.subVectors(e,n),r.cross(si);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){si.subVectors(r,n),Ci.subVectors(i,n),rf.subVectors(e,n);const a=si.dot(si),o=si.dot(Ci),l=si.dot(rf),u=Ci.dot(Ci),c=Ci.dot(rf),d=a*u-o*o;if(d===0)return s.set(0,0,0),null;const h=1/d,m=(u*l-o*c)*h,_=(a*c-o*l)*h;return s.set(1-m-_,_,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,bi.x),l.addScaledVector(a,bi.y),l.addScaledVector(o,bi.z),l)}static getInterpolatedAttribute(e,n,i,r,s,a){return lf.setScalar(0),uf.setScalar(0),cf.setScalar(0),lf.fromBufferAttribute(e,n),uf.fromBufferAttribute(e,i),cf.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(lf,s.x),a.addScaledVector(uf,s.y),a.addScaledVector(cf,s.z),a}static isFrontFacing(e,n,i,r){return si.subVectors(i,n),Ci.subVectors(e,n),si.cross(Ci).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return si.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),si.cross(Ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return qn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return qn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;As.subVectors(r,i),Rs.subVectors(s,i),sf.subVectors(e,i);const l=As.dot(sf),u=Rs.dot(sf);if(l<=0&&u<=0)return n.copy(i);af.subVectors(e,r);const c=As.dot(af),d=Rs.dot(af);if(c>=0&&d<=c)return n.copy(r);const h=l*d-c*u;if(h<=0&&l>=0&&c<=0)return a=l/(l-c),n.copy(i).addScaledVector(As,a);of.subVectors(e,s);const m=As.dot(of),_=Rs.dot(of);if(_>=0&&m<=_)return n.copy(s);const y=m*u-l*_;if(y<=0&&u>=0&&_<=0)return o=u/(u-_),n.copy(i).addScaledVector(Rs,o);const p=c*_-m*d;if(p<=0&&d-c>=0&&m-_>=0)return Dg.subVectors(s,r),o=(d-c)/(d-c+(m-_)),n.copy(r).addScaledVector(Dg,o);const f=1/(p+y+h);return a=y*f,o=h*f,n.copy(i).addScaledVector(As,a).addScaledVector(Rs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ry={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},nr={h:0,s:0,l:0},vl={h:0,s:0,l:0};function ff(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class $e{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pt.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=pt.workingColorSpace){return this.r=e,this.g=n,this.b=i,pt.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=pt.workingColorSpace){if(e=_T(e,1),n=_n(n,0,1),i=_n(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=ff(a,s,e+1/3),this.g=ff(a,s,e),this.b=ff(a,s,e-1/3)}return pt.toWorkingColorSpace(this,r),this}setStyle(e,n=Yt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Yt){const i=Ry[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=oa(e.r),this.g=oa(e.g),this.b=oa(e.b),this}copyLinearToSRGB(e){return this.r=$c(e.r),this.g=$c(e.g),this.b=$c(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return pt.fromWorkingColorSpace(un.copy(this),e),Math.round(_n(un.r*255,0,255))*65536+Math.round(_n(un.g*255,0,255))*256+Math.round(_n(un.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=pt.workingColorSpace){pt.fromWorkingColorSpace(un.copy(this),n);const i=un.r,r=un.g,s=un.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,u;const c=(o+a)/2;if(o===a)l=0,u=0;else{const d=a-o;switch(u=c<=.5?d/(a+o):d/(2-a-o),a){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=u,e.l=c,e}getRGB(e,n=pt.workingColorSpace){return pt.fromWorkingColorSpace(un.copy(this),n),e.r=un.r,e.g=un.g,e.b=un.b,e}getStyle(e=Yt){pt.fromWorkingColorSpace(un.copy(this),e);const n=un.r,i=un.g,r=un.b;return e!==Yt?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(nr),this.setHSL(nr.h+e,nr.s+n,nr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(nr),e.getHSL(vl);const i=Xc(nr.h,vl.h,n),r=Xc(nr.s,vl.s,n),s=Xc(nr.l,vl.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const un=new $e;$e.NAMES=Ry;let OT=0;class wi extends hs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:OT++}),this.uuid=wr(),this.name="",this.type="Material",this.blending=sa,this.side=Xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wd,this.blendDst=Td,this.blendEquation=Xr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=ga,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_s,this.stencilZFail=_s,this.stencilZPass=_s,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==sa&&(i.blending=this.blending),this.side!==Xi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==wd&&(i.blendSrc=this.blendSrc),this.blendDst!==Td&&(i.blendDst=this.blendDst),this.blendEquation!==Xr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ga&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==yg&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_s&&(i.stencilFail=this.stencilFail),this.stencilZFail!==_s&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==_s&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class cc extends wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=yp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ht=new N,_l=new He;class pi{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=lh,this.updateRanges=[],this.gpuType=Oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)_l.fromBufferAttribute(this,n),_l.applyMatrix3(e),this.setXY(n,_l.x,_l.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ht.fromBufferAttribute(this,n),Ht.applyMatrix3(e),this.setXYZ(n,Ht.x,Ht.y,Ht.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ht.fromBufferAttribute(this,n),Ht.applyMatrix4(e),this.setXYZ(n,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ht.fromBufferAttribute(this,n),Ht.applyNormalMatrix(e),this.setXYZ(n,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ht.fromBufferAttribute(this,n),Ht.transformDirection(e),this.setXYZ(n,Ht.x,Ht.y,Ht.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=xi(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=yt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=xi(n,this.array)),n}setX(e,n){return this.normalized&&(n=yt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=xi(n,this.array)),n}setY(e,n){return this.normalized&&(n=yt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=xi(n,this.array)),n}setZ(e,n){return this.normalized&&(n=yt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=xi(n,this.array)),n}setW(e,n){return this.normalized&&(n=yt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=yt(n,this.array),i=yt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=yt(n,this.array),i=yt(i,this.array),r=yt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=yt(n,this.array),i=yt(i,this.array),r=yt(r,this.array),s=yt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==lh&&(e.usage=this.usage),e}}class Cy extends pi{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class by extends pi{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Mt extends pi{constructor(e,n,i){super(new Float32Array(e),n,i)}}let kT=0;const Wn=new wt,df=new Ot,Cs=new N,Nn=new Ta,Va=new Ta,Zt=new N;class xn extends hs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kT++}),this.uuid=wr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wy(e)?by:Cy)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new nt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wn.makeRotationFromQuaternion(e),this.applyMatrix4(Wn),this}rotateX(e){return Wn.makeRotationX(e),this.applyMatrix4(Wn),this}rotateY(e){return Wn.makeRotationY(e),this.applyMatrix4(Wn),this}rotateZ(e){return Wn.makeRotationZ(e),this.applyMatrix4(Wn),this}translate(e,n,i){return Wn.makeTranslation(e,n,i),this.applyMatrix4(Wn),this}scale(e,n,i){return Wn.makeScale(e,n,i),this.applyMatrix4(Wn),this}lookAt(e){return df.lookAt(e),df.updateMatrix(),this.applyMatrix4(df.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cs).negate(),this.translate(Cs.x,Cs.y,Cs.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Mt(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ta);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Nn.setFromBufferAttribute(s),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const i=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];Va.setFromBufferAttribute(o),this.morphTargetsRelative?(Zt.addVectors(Nn.min,Va.min),Nn.expandByPoint(Zt),Zt.addVectors(Nn.max,Va.max),Nn.expandByPoint(Zt)):(Nn.expandByPoint(Va.min),Nn.expandByPoint(Va.max))}Nn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Zt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Zt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let u=0,c=o.count;u<c;u++)Zt.fromBufferAttribute(o,u),l&&(Cs.fromBufferAttribute(e,u),Zt.add(Cs)),r=Math.max(r,i.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pi(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<i.count;C++)o[C]=new N,l[C]=new N;const u=new N,c=new N,d=new N,h=new He,m=new He,_=new He,y=new N,p=new N;function f(C,B,x){u.fromBufferAttribute(i,C),c.fromBufferAttribute(i,B),d.fromBufferAttribute(i,x),h.fromBufferAttribute(s,C),m.fromBufferAttribute(s,B),_.fromBufferAttribute(s,x),c.sub(u),d.sub(u),m.sub(h),_.sub(h);const E=1/(m.x*_.y-_.x*m.y);isFinite(E)&&(y.copy(c).multiplyScalar(_.y).addScaledVector(d,-m.y).multiplyScalar(E),p.copy(d).multiplyScalar(m.x).addScaledVector(c,-_.x).multiplyScalar(E),o[C].add(y),o[B].add(y),o[x].add(y),l[C].add(p),l[B].add(p),l[x].add(p))}let g=this.groups;g.length===0&&(g=[{start:0,count:e.count}]);for(let C=0,B=g.length;C<B;++C){const x=g[C],E=x.start,z=x.count;for(let V=E,j=E+z;V<j;V+=3)f(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const v=new N,M=new N,R=new N,A=new N;function S(C){R.fromBufferAttribute(r,C),A.copy(R);const B=o[C];v.copy(B),v.sub(R.multiplyScalar(R.dot(B))).normalize(),M.crossVectors(A,B);const E=M.dot(l[C])<0?-1:1;a.setXYZW(C,v.x,v.y,v.z,E)}for(let C=0,B=g.length;C<B;++C){const x=g[C],E=x.start,z=x.count;for(let V=E,j=E+z;V<j;V+=3)S(e.getX(V+0)),S(e.getX(V+1)),S(e.getX(V+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new pi(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new N,s=new N,a=new N,o=new N,l=new N,u=new N,c=new N,d=new N;if(e)for(let h=0,m=e.count;h<m;h+=3){const _=e.getX(h+0),y=e.getX(h+1),p=e.getX(h+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,y),a.fromBufferAttribute(n,p),c.subVectors(a,s),d.subVectors(r,s),c.cross(d),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,y),u.fromBufferAttribute(i,p),o.add(c),l.add(c),u.add(c),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(p,u.x,u.y,u.z)}else for(let h=0,m=n.count;h<m;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),a.fromBufferAttribute(n,h+2),c.subVectors(a,s),d.subVectors(r,s),c.cross(d),i.setXYZ(h+0,c.x,c.y,c.z),i.setXYZ(h+1,c.x,c.y,c.z),i.setXYZ(h+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Zt.fromBufferAttribute(e,n),Zt.normalize(),e.setXYZ(n,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(o,l){const u=o.array,c=o.itemSize,d=o.normalized,h=new u.constructor(l.length*c);let m=0,_=0;for(let y=0,p=l.length;y<p;y++){o.isInterleavedBufferAttribute?m=l[y]*o.data.stride+o.offset:m=l[y]*c;for(let f=0;f<c;f++)h[_++]=u[m++]}return new pi(h,c,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new xn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],u=e(l,i);n.setAttribute(o,u)}const s=this.morphAttributes;for(const o in s){const l=[],u=s[o];for(let c=0,d=u.length;c<d;c++){const h=u[c],m=e(h,i);l.push(m)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const u=a[o];n.addGroup(u.start,u.count,u.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],c=[];for(let d=0,h=u.length;d<h;d++){const m=u[d];c.push(m.toJSON(e.data))}c.length>0&&(r[l]=c,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const u in r){const c=r[u];this.setAttribute(u,c.clone(n))}const s=e.morphAttributes;for(const u in s){const c=[],d=s[u];for(let h=0,m=d.length;h<m;h++)c.push(d[h].clone(n));this.morphAttributes[u]=c}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let u=0,c=a.length;u<c;u++){const d=a[u];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ug=new wt,Fr=new Ho,yl=new Bo,Ig=new N,xl=new N,Sl=new N,Ml=new N,hf=new N,El=new N,Ng=new N,wl=new N;class dn extends Ot{constructor(e=new xn,n=new cc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){El.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const c=o[l],d=s[l];c!==0&&(hf.fromBufferAttribute(d,e),a?El.addScaledVector(hf,c):El.addScaledVector(hf.sub(n),c))}n.add(El)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),yl.copy(i.boundingSphere),yl.applyMatrix4(s),Fr.copy(e.ray).recast(e.near),!(yl.containsPoint(Fr.origin)===!1&&(Fr.intersectSphere(yl,Ig)===null||Fr.origin.distanceToSquared(Ig)>(e.far-e.near)**2))&&(Ug.copy(s).invert(),Fr.copy(e.ray).applyMatrix4(Ug),!(i.boundingBox!==null&&Fr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Fr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,u=s.attributes.uv,c=s.attributes.uv1,d=s.attributes.normal,h=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,y=h.length;_<y;_++){const p=h[_],f=a[p.materialIndex],g=Math.max(p.start,m.start),v=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let M=g,R=v;M<R;M+=3){const A=o.getX(M),S=o.getX(M+1),C=o.getX(M+2);r=Tl(this,f,e,i,u,c,d,A,S,C),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),y=Math.min(o.count,m.start+m.count);for(let p=_,f=y;p<f;p+=3){const g=o.getX(p),v=o.getX(p+1),M=o.getX(p+2);r=Tl(this,a,e,i,u,c,d,g,v,M),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,y=h.length;_<y;_++){const p=h[_],f=a[p.materialIndex],g=Math.max(p.start,m.start),v=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let M=g,R=v;M<R;M+=3){const A=M,S=M+1,C=M+2;r=Tl(this,f,e,i,u,c,d,A,S,C),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),y=Math.min(l.count,m.start+m.count);for(let p=_,f=y;p<f;p+=3){const g=p,v=p+1,M=p+2;r=Tl(this,a,e,i,u,c,d,g,v,M),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}}}function zT(t,e,n,i,r,s,a,o){let l;if(e.side===Ln?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Xi,o),l===null)return null;wl.copy(o),wl.applyMatrix4(t.matrixWorld);const u=n.ray.origin.distanceTo(wl);return u<n.near||u>n.far?null:{distance:u,point:wl.clone(),object:t}}function Tl(t,e,n,i,r,s,a,o,l,u){t.getVertexPosition(o,xl),t.getVertexPosition(l,Sl),t.getVertexPosition(u,Ml);const c=zT(t,e,n,i,xl,Sl,Ml,Ng);if(c){const d=new N;qn.getBarycoord(Ng,xl,Sl,Ml,d),r&&(c.uv=qn.getInterpolatedAttribute(r,o,l,u,d,new He)),s&&(c.uv1=qn.getInterpolatedAttribute(s,o,l,u,d,new He)),a&&(c.normal=qn.getInterpolatedAttribute(a,o,l,u,d,new N),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const h={a:o,b:l,c:u,normal:new N,materialIndex:0};qn.getNormal(xl,Sl,Ml,h.normal),c.face=h,c.barycoord=d}return c}class Vo extends xn{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],u=[],c=[],d=[];let h=0,m=0;_("z","y","x",-1,-1,i,n,e,a,s,0),_("z","y","x",1,-1,i,n,-e,a,s,1),_("x","z","y",1,1,e,i,n,r,a,2),_("x","z","y",1,-1,e,i,-n,r,a,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Mt(u,3)),this.setAttribute("normal",new Mt(c,3)),this.setAttribute("uv",new Mt(d,2));function _(y,p,f,g,v,M,R,A,S,C,B){const x=M/S,E=R/C,z=M/2,V=R/2,j=A/2,Z=S+1,Y=C+1;let ne=0,P=0;const J=new N;for(let te=0;te<Y;te++){const le=te*E-V;for(let Ee=0;Ee<Z;Ee++){const Ze=Ee*x-z;J[y]=Ze*g,J[p]=le*v,J[f]=j,u.push(J.x,J.y,J.z),J[y]=0,J[p]=0,J[f]=A>0?1:-1,c.push(J.x,J.y,J.z),d.push(Ee/S),d.push(1-te/C),ne+=1}}for(let te=0;te<C;te++)for(let le=0;le<S;le++){const Ee=h+le+Z*te,Ze=h+le+Z*(te+1),W=h+(le+1)+Z*(te+1),K=h+(le+1)+Z*te;l.push(Ee,Ze,K),l.push(Ze,W,K),P+=6}o.addGroup(m,P,B),m+=P,h+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Sa(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function gn(t){const e={};for(let n=0;n<t.length;n++){const i=Sa(t[n]);for(const r in i)e[r]=i[r]}return e}function BT(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Py(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:pt.workingColorSpace}const HT={clone:Sa,merge:gn};var VT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,GT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rr extends wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=VT,this.fragmentShader=GT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Sa(e.uniforms),this.uniformsGroups=BT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Ly extends Ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wt,this.projectionMatrix=new wt,this.projectionMatrixInverse=new wt,this.coordinateSystem=ki}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ir=new N,Fg=new He,Og=new He;class $n extends Ly{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=uh*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(iu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return uh*2*Math.atan(Math.tan(iu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){ir.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ir.x,ir.y).multiplyScalar(-e/ir.z),ir.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ir.x,ir.y).multiplyScalar(-e/ir.z)}getViewSize(e,n){return this.getViewBounds(e,Fg,Og),n.subVectors(Og,Fg)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(iu*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,u=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/u,r*=a.width/l,i*=a.height/u}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const bs=-90,Ps=1;class WT extends Ot{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new $n(bs,Ps,e,n);r.layers=this.layers,this.add(r);const s=new $n(bs,Ps,e,n);s.layers=this.layers,this.add(s);const a=new $n(bs,Ps,e,n);a.layers=this.layers,this.add(a);const o=new $n(bs,Ps,e,n);o.layers=this.layers,this.add(o);const l=new $n(bs,Ps,e,n);l.layers=this.layers,this.add(l);const u=new $n(bs,Ps,e,n);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const u of n)this.remove(u);if(e===ki)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===zu)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of n)this.add(u),u.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,u,c]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,a),e.setRenderTarget(i,2,r),e.render(n,o),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,u),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(n,c),e.setRenderTarget(d,h,m),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Dy extends hn{constructor(e,n,i,r,s,a,o,l,u,c){e=e!==void 0?e:[],n=n!==void 0?n:va,super(e,n,i,r,s,a,o,l,u,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class jT extends cs{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Dy(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:ci}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Vo(5,5,5),s=new Rr({name:"CubemapFromEquirect",uniforms:Sa(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ln,blending:Mr});s.uniforms.tEquirect.value=n;const a=new dn(r,s),o=n.minFilter;return n.minFilter===Jr&&(n.minFilter=ci),new WT(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}const pf=new N,XT=new N,YT=new nt;class or{constructor(e=new N(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=pf.subVectors(i,n).cross(XT.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(pf),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||YT.getNormalMatrix(e),r=this.coplanarPoint(pf).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Or=new Bo,Al=new N;class Cp{constructor(e=new or,n=new or,i=new or,r=new or,s=new or,a=new or){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=ki){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],u=r[4],c=r[5],d=r[6],h=r[7],m=r[8],_=r[9],y=r[10],p=r[11],f=r[12],g=r[13],v=r[14],M=r[15];if(i[0].setComponents(l-s,h-u,p-m,M-f).normalize(),i[1].setComponents(l+s,h+u,p+m,M+f).normalize(),i[2].setComponents(l+a,h+c,p+_,M+g).normalize(),i[3].setComponents(l-a,h-c,p-_,M-g).normalize(),i[4].setComponents(l-o,h-d,p-y,M-v).normalize(),n===ki)i[5].setComponents(l+o,h+d,p+y,M+v).normalize();else if(n===zu)i[5].setComponents(o,d,y,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Or.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Or)}intersectsSprite(e){return Or.center.set(0,0,0),Or.radius=.7071067811865476,Or.applyMatrix4(e.matrixWorld),this.intersectsSphere(Or)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Al.x=r.normal.x>0?e.max.x:e.min.x,Al.y=r.normal.y>0?e.max.y:e.min.y,Al.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Al)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Uy(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function $T(t){const e=new WeakMap;function n(o,l){const u=o.array,c=o.usage,d=u.byteLength,h=t.createBuffer();t.bindBuffer(l,h),t.bufferData(l,u,c),o.onUploadCallback();let m;if(u instanceof Float32Array)m=t.FLOAT;else if(u instanceof Uint16Array)o.isFloat16BufferAttribute?m=t.HALF_FLOAT:m=t.UNSIGNED_SHORT;else if(u instanceof Int16Array)m=t.SHORT;else if(u instanceof Uint32Array)m=t.UNSIGNED_INT;else if(u instanceof Int32Array)m=t.INT;else if(u instanceof Int8Array)m=t.BYTE;else if(u instanceof Uint8Array)m=t.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)m=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:h,type:m,bytesPerElement:u.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,u){const c=l.array,d=l.updateRanges;if(t.bindBuffer(u,o),d.length===0)t.bufferSubData(u,0,c);else{d.sort((m,_)=>m.start-_.start);let h=0;for(let m=1;m<d.length;m++){const _=d[h],y=d[m];y.start<=_.start+_.count+1?_.count=Math.max(_.count,y.start+y.count-_.start):(++h,d[h]=y)}d.length=h+1;for(let m=0,_=d.length;m<_;m++){const y=d[m];t.bufferSubData(u,y.start*c.BYTES_PER_ELEMENT,c,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=e.get(o);(!c||c.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const u=e.get(o);if(u===void 0)e.set(o,n(o,l));else if(u.version<o.version){if(u.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,o,l),u.version=o.version}}return{get:r,remove:s,update:a}}class fc extends xn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),u=o+1,c=l+1,d=e/o,h=n/l,m=[],_=[],y=[],p=[];for(let f=0;f<c;f++){const g=f*h-a;for(let v=0;v<u;v++){const M=v*d-s;_.push(M,-g,0),y.push(0,0,1),p.push(v/o),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let g=0;g<o;g++){const v=g+u*f,M=g+u*(f+1),R=g+1+u*(f+1),A=g+1+u*f;m.push(v,M,A),m.push(M,R,A)}this.setIndex(m),this.setAttribute("position",new Mt(_,3)),this.setAttribute("normal",new Mt(y,3)),this.setAttribute("uv",new Mt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fc(e.width,e.height,e.widthSegments,e.heightSegments)}}var qT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,KT=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ZT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,QT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,JT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,e1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,t1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,n1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,i1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,r1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,s1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,a1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,o1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,l1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,u1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,c1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,f1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,d1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,h1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,p1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,m1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,g1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,v1=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,_1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,y1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,x1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,S1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,M1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,E1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,w1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,T1="gl_FragColor = linearToOutputTexel( gl_FragColor );",A1=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,R1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,C1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,b1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,P1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,L1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,D1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,U1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,I1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,N1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,F1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,O1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,k1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,z1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,B1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,H1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,V1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,G1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,W1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,j1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,X1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Y1=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,q1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,K1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Z1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Q1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,J1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eA=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,iA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,rA=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,aA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,oA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,uA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cA=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,fA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,hA=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,pA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vA=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,_A=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,SA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,MA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,EA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,wA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,TA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,AA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,RA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,CA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,PA=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,LA=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,DA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,UA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,IA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,NA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,FA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,OA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,kA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,BA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,HA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,VA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,GA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,WA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,XA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,YA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $A=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ZA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,QA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,JA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,tR=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,nR=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,iR=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,rR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sR=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aR=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,oR=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,uR=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cR=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fR=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dR=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,hR=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pR=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,mR=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,gR=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vR=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_R=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,yR=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xR=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,SR=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MR=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ER=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wR=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,TR=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,AR=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,RR=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tt={alphahash_fragment:qT,alphahash_pars_fragment:KT,alphamap_fragment:ZT,alphamap_pars_fragment:QT,alphatest_fragment:JT,alphatest_pars_fragment:e1,aomap_fragment:t1,aomap_pars_fragment:n1,batching_pars_vertex:i1,batching_vertex:r1,begin_vertex:s1,beginnormal_vertex:a1,bsdfs:o1,iridescence_fragment:l1,bumpmap_pars_fragment:u1,clipping_planes_fragment:c1,clipping_planes_pars_fragment:f1,clipping_planes_pars_vertex:d1,clipping_planes_vertex:h1,color_fragment:p1,color_pars_fragment:m1,color_pars_vertex:g1,color_vertex:v1,common:_1,cube_uv_reflection_fragment:y1,defaultnormal_vertex:x1,displacementmap_pars_vertex:S1,displacementmap_vertex:M1,emissivemap_fragment:E1,emissivemap_pars_fragment:w1,colorspace_fragment:T1,colorspace_pars_fragment:A1,envmap_fragment:R1,envmap_common_pars_fragment:C1,envmap_pars_fragment:b1,envmap_pars_vertex:P1,envmap_physical_pars_fragment:H1,envmap_vertex:L1,fog_vertex:D1,fog_pars_vertex:U1,fog_fragment:I1,fog_pars_fragment:N1,gradientmap_pars_fragment:F1,lightmap_pars_fragment:O1,lights_lambert_fragment:k1,lights_lambert_pars_fragment:z1,lights_pars_begin:B1,lights_toon_fragment:V1,lights_toon_pars_fragment:G1,lights_phong_fragment:W1,lights_phong_pars_fragment:j1,lights_physical_fragment:X1,lights_physical_pars_fragment:Y1,lights_fragment_begin:$1,lights_fragment_maps:q1,lights_fragment_end:K1,logdepthbuf_fragment:Z1,logdepthbuf_pars_fragment:Q1,logdepthbuf_pars_vertex:J1,logdepthbuf_vertex:eA,map_fragment:tA,map_pars_fragment:nA,map_particle_fragment:iA,map_particle_pars_fragment:rA,metalnessmap_fragment:sA,metalnessmap_pars_fragment:aA,morphinstance_vertex:oA,morphcolor_vertex:lA,morphnormal_vertex:uA,morphtarget_pars_vertex:cA,morphtarget_vertex:fA,normal_fragment_begin:dA,normal_fragment_maps:hA,normal_pars_fragment:pA,normal_pars_vertex:mA,normal_vertex:gA,normalmap_pars_fragment:vA,clearcoat_normal_fragment_begin:_A,clearcoat_normal_fragment_maps:yA,clearcoat_pars_fragment:xA,iridescence_pars_fragment:SA,opaque_fragment:MA,packing:EA,premultiplied_alpha_fragment:wA,project_vertex:TA,dithering_fragment:AA,dithering_pars_fragment:RA,roughnessmap_fragment:CA,roughnessmap_pars_fragment:bA,shadowmap_pars_fragment:PA,shadowmap_pars_vertex:LA,shadowmap_vertex:DA,shadowmask_pars_fragment:UA,skinbase_vertex:IA,skinning_pars_vertex:NA,skinning_vertex:FA,skinnormal_vertex:OA,specularmap_fragment:kA,specularmap_pars_fragment:zA,tonemapping_fragment:BA,tonemapping_pars_fragment:HA,transmission_fragment:VA,transmission_pars_fragment:GA,uv_pars_fragment:WA,uv_pars_vertex:jA,uv_vertex:XA,worldpos_vertex:YA,background_vert:$A,background_frag:qA,backgroundCube_vert:KA,backgroundCube_frag:ZA,cube_vert:QA,cube_frag:JA,depth_vert:eR,depth_frag:tR,distanceRGBA_vert:nR,distanceRGBA_frag:iR,equirect_vert:rR,equirect_frag:sR,linedashed_vert:aR,linedashed_frag:oR,meshbasic_vert:lR,meshbasic_frag:uR,meshlambert_vert:cR,meshlambert_frag:fR,meshmatcap_vert:dR,meshmatcap_frag:hR,meshnormal_vert:pR,meshnormal_frag:mR,meshphong_vert:gR,meshphong_frag:vR,meshphysical_vert:_R,meshphysical_frag:yR,meshtoon_vert:xR,meshtoon_frag:SR,points_vert:MR,points_frag:ER,shadow_vert:wR,shadow_frag:TR,sprite_vert:AR,sprite_frag:RR},ve={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new nt}},envmap:{envMap:{value:null},envMapRotation:{value:new nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new nt},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0},uvTransform:{value:new nt}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}}},_i={basic:{uniforms:gn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:gn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new $e(0)}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:gn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:gn([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:gn([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new $e(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:gn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:gn([ve.points,ve.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:gn([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:gn([ve.common,ve.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:gn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:gn([ve.sprite,ve.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new nt}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distanceRGBA:{uniforms:gn([ve.common,ve.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distanceRGBA_vert,fragmentShader:tt.distanceRGBA_frag},shadow:{uniforms:gn([ve.lights,ve.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};_i.physical={uniforms:gn([_i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new nt},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new nt},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new nt},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new nt},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new nt},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new nt}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const Rl={r:0,b:0,g:0},kr=new fn,CR=new wt;function bR(t,e,n,i,r,s,a){const o=new $e(0);let l=s===!0?0:1,u,c,d=null,h=0,m=null;function _(g){let v=g.isScene===!0?g.background:null;return v&&v.isTexture&&(v=(g.backgroundBlurriness>0?n:e).get(v)),v}function y(g){let v=!1;const M=_(g);M===null?f(o,l):M&&M.isColor&&(f(M,1),v=!0);const R=t.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(t.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function p(g,v){const M=_(v);M&&(M.isCubeTexture||M.mapping===lc)?(c===void 0&&(c=new dn(new Vo(1,1,1),new Rr({name:"BackgroundCubeMaterial",uniforms:Sa(_i.backgroundCube.uniforms),vertexShader:_i.backgroundCube.vertexShader,fragmentShader:_i.backgroundCube.fragmentShader,side:Ln,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,A,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),kr.copy(v.backgroundRotation),kr.x*=-1,kr.y*=-1,kr.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(kr.y*=-1,kr.z*=-1),c.material.uniforms.envMap.value=M,c.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(CR.makeRotationFromEuler(kr)),c.material.toneMapped=pt.getTransfer(M.colorSpace)!==At,(d!==M||h!==M.version||m!==t.toneMapping)&&(c.material.needsUpdate=!0,d=M,h=M.version,m=t.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(u===void 0&&(u=new dn(new fc(2,2),new Rr({name:"BackgroundMaterial",uniforms:Sa(_i.background.uniforms),vertexShader:_i.background.vertexShader,fragmentShader:_i.background.fragmentShader,side:Xi,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=M,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.toneMapped=pt.getTransfer(M.colorSpace)!==At,M.matrixAutoUpdate===!0&&M.updateMatrix(),u.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||h!==M.version||m!==t.toneMapping)&&(u.material.needsUpdate=!0,d=M,h=M.version,m=t.toneMapping),u.layers.enableAll(),g.unshift(u,u.geometry,u.material,0,0,null))}function f(g,v){g.getRGB(Rl,Py(t)),i.buffers.color.setClear(Rl.r,Rl.g,Rl.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(g,v=1){o.set(g),l=v,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(g){l=g,f(o,l)},render:y,addToRenderList:p}}function PR(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(x,E,z,V,j){let Z=!1;const Y=d(V,z,E);s!==Y&&(s=Y,u(s.object)),Z=m(x,V,z,j),Z&&_(x,V,z,j),j!==null&&e.update(j,t.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,M(x,E,z,V),j!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function l(){return t.createVertexArray()}function u(x){return t.bindVertexArray(x)}function c(x){return t.deleteVertexArray(x)}function d(x,E,z){const V=z.wireframe===!0;let j=i[x.id];j===void 0&&(j={},i[x.id]=j);let Z=j[E.id];Z===void 0&&(Z={},j[E.id]=Z);let Y=Z[V];return Y===void 0&&(Y=h(l()),Z[V]=Y),Y}function h(x){const E=[],z=[],V=[];for(let j=0;j<n;j++)E[j]=0,z[j]=0,V[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:z,attributeDivisors:V,object:x,attributes:{},index:null}}function m(x,E,z,V){const j=s.attributes,Z=E.attributes;let Y=0;const ne=z.getAttributes();for(const P in ne)if(ne[P].location>=0){const te=j[P];let le=Z[P];if(le===void 0&&(P==="instanceMatrix"&&x.instanceMatrix&&(le=x.instanceMatrix),P==="instanceColor"&&x.instanceColor&&(le=x.instanceColor)),te===void 0||te.attribute!==le||le&&te.data!==le.data)return!0;Y++}return s.attributesNum!==Y||s.index!==V}function _(x,E,z,V){const j={},Z=E.attributes;let Y=0;const ne=z.getAttributes();for(const P in ne)if(ne[P].location>=0){let te=Z[P];te===void 0&&(P==="instanceMatrix"&&x.instanceMatrix&&(te=x.instanceMatrix),P==="instanceColor"&&x.instanceColor&&(te=x.instanceColor));const le={};le.attribute=te,te&&te.data&&(le.data=te.data),j[P]=le,Y++}s.attributes=j,s.attributesNum=Y,s.index=V}function y(){const x=s.newAttributes;for(let E=0,z=x.length;E<z;E++)x[E]=0}function p(x){f(x,0)}function f(x,E){const z=s.newAttributes,V=s.enabledAttributes,j=s.attributeDivisors;z[x]=1,V[x]===0&&(t.enableVertexAttribArray(x),V[x]=1),j[x]!==E&&(t.vertexAttribDivisor(x,E),j[x]=E)}function g(){const x=s.newAttributes,E=s.enabledAttributes;for(let z=0,V=E.length;z<V;z++)E[z]!==x[z]&&(t.disableVertexAttribArray(z),E[z]=0)}function v(x,E,z,V,j,Z,Y){Y===!0?t.vertexAttribIPointer(x,E,z,j,Z):t.vertexAttribPointer(x,E,z,V,j,Z)}function M(x,E,z,V){y();const j=V.attributes,Z=z.getAttributes(),Y=E.defaultAttributeValues;for(const ne in Z){const P=Z[ne];if(P.location>=0){let J=j[ne];if(J===void 0&&(ne==="instanceMatrix"&&x.instanceMatrix&&(J=x.instanceMatrix),ne==="instanceColor"&&x.instanceColor&&(J=x.instanceColor)),J!==void 0){const te=J.normalized,le=J.itemSize,Ee=e.get(J);if(Ee===void 0)continue;const Ze=Ee.buffer,W=Ee.type,K=Ee.bytesPerElement,fe=W===t.INT||W===t.UNSIGNED_INT||J.gpuType===xp;if(J.isInterleavedBufferAttribute){const de=J.data,Be=de.stride,Fe=J.offset;if(de.isInstancedInterleavedBuffer){for(let We=0;We<P.locationSize;We++)f(P.location+We,de.meshPerAttribute);x.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let We=0;We<P.locationSize;We++)p(P.location+We);t.bindBuffer(t.ARRAY_BUFFER,Ze);for(let We=0;We<P.locationSize;We++)v(P.location+We,le/P.locationSize,W,te,Be*K,(Fe+le/P.locationSize*We)*K,fe)}else{if(J.isInstancedBufferAttribute){for(let de=0;de<P.locationSize;de++)f(P.location+de,J.meshPerAttribute);x.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let de=0;de<P.locationSize;de++)p(P.location+de);t.bindBuffer(t.ARRAY_BUFFER,Ze);for(let de=0;de<P.locationSize;de++)v(P.location+de,le/P.locationSize,W,te,le*K,le/P.locationSize*de*K,fe)}}else if(Y!==void 0){const te=Y[ne];if(te!==void 0)switch(te.length){case 2:t.vertexAttrib2fv(P.location,te);break;case 3:t.vertexAttrib3fv(P.location,te);break;case 4:t.vertexAttrib4fv(P.location,te);break;default:t.vertexAttrib1fv(P.location,te)}}}}g()}function R(){C();for(const x in i){const E=i[x];for(const z in E){const V=E[z];for(const j in V)c(V[j].object),delete V[j];delete E[z]}delete i[x]}}function A(x){if(i[x.id]===void 0)return;const E=i[x.id];for(const z in E){const V=E[z];for(const j in V)c(V[j].object),delete V[j];delete E[z]}delete i[x.id]}function S(x){for(const E in i){const z=i[E];if(z[x.id]===void 0)continue;const V=z[x.id];for(const j in V)c(V[j].object),delete V[j];delete z[x.id]}}function C(){B(),a=!0,s!==r&&(s=r,u(s.object))}function B(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:C,resetDefaultState:B,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:S,initAttributes:y,enableAttribute:p,disableUnusedAttributes:g}}function LR(t,e,n){let i;function r(u){i=u}function s(u,c){t.drawArrays(i,u,c),n.update(c,i,1)}function a(u,c,d){d!==0&&(t.drawArraysInstanced(i,u,c,d),n.update(c,i,d))}function o(u,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,c,0,d);let m=0;for(let _=0;_<d;_++)m+=c[_];n.update(m,i,1)}function l(u,c,d,h){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<u.length;_++)a(u[_],c[_],h[_]);else{m.multiDrawArraysInstancedWEBGL(i,u,0,c,0,h,0,d);let _=0;for(let y=0;y<d;y++)_+=c[y];for(let y=0;y<h.length;y++)n.update(_,i,h[y])}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function DR(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const S=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(S){return!(S!==fi&&i.convert(S)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(S){const C=S===zo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(S!==Yi&&i.convert(S)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==Oi&&!C)}function l(S){if(S==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=n.precision!==void 0?n.precision:"highp";const c=l(u);c!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",c,"instead."),u=c);const d=n.logarithmicDepthBuffer===!0,h=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(h===!0){const S=e.get("EXT_clip_control");S.clipControlEXT(S.LOWER_LEFT_EXT,S.ZERO_TO_ONE_EXT)}const m=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=t.getParameter(t.MAX_TEXTURE_SIZE),p=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),f=t.getParameter(t.MAX_VERTEX_ATTRIBS),g=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),v=t.getParameter(t.MAX_VARYING_VECTORS),M=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),R=_>0,A=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:u,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:m,maxVertexTextures:_,maxTextureSize:y,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:g,maxVaryings:v,maxFragmentUniforms:M,vertexTextures:R,maxSamples:A}}function UR(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new or,o=new nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const m=d.length!==0||h||i!==0||r;return r=h,i=d.length,m},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){n=c(d,h,0)},this.setState=function(d,h,m){const _=d.clippingPlanes,y=d.clipIntersection,p=d.clipShadows,f=t.get(d);if(!r||_===null||_.length===0||s&&!p)s?c(null):u();else{const g=s?0:i,v=g*4;let M=f.clippingState||null;l.value=M,M=c(_,h,v,m);for(let R=0;R!==v;++R)M[R]=n[R];f.clippingState=M,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=g}};function u(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function c(d,h,m,_){const y=d!==null?d.length:0;let p=null;if(y!==0){if(p=l.value,_!==!0||p===null){const f=m+y*4,g=h.matrixWorldInverse;o.getNormalMatrix(g),(p===null||p.length<f)&&(p=new Float32Array(f));for(let v=0,M=m;v!==y;++v,M+=4)a.copy(d[v]).applyMatrix4(g,o),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,p}}function IR(t){let e=new WeakMap;function n(a,o){return o===Ud?a.mapping=va:o===Id&&(a.mapping=_a),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ud||o===Id)if(e.has(a)){const l=e.get(a).texture;return n(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const u=new jT(l.height);return u.fromEquirectangularTexture(t,a),e.set(a,u),a.addEventListener("dispose",r),n(u.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class bp extends Ly{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,a=s+u*this.view.width,o-=c*this.view.offsetY,l=o-c*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const qs=4,kg=[.125,.215,.35,.446,.526,.582],Yr=20,mf=new bp,zg=new $e;let gf=null,vf=0,_f=0,yf=!1;const Vr=(1+Math.sqrt(5))/2,Ls=1/Vr,Bg=[new N(-Vr,Ls,0),new N(Vr,Ls,0),new N(-Ls,0,Vr),new N(Ls,0,Vr),new N(0,Vr,-Ls),new N(0,Vr,Ls),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class Hg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){gf=this._renderer.getRenderTarget(),vf=this._renderer.getActiveCubeFace(),_f=this._renderer.getActiveMipmapLevel(),yf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(gf,vf,_f),this._renderer.xr.enabled=yf,e.scissorTest=!1,Cl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===va||e.mapping===_a?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),gf=this._renderer.getRenderTarget(),vf=this._renderer.getActiveCubeFace(),_f=this._renderer.getActiveMipmapLevel(),yf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:ci,minFilter:ci,generateMipmaps:!1,type:zo,format:fi,colorSpace:Ur,depthBuffer:!1},r=Vg(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vg(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=NR(s)),this._blurMaterial=FR(s,e,n)}return r}_compileMaterial(e){const n=new dn(this._lodPlanes[0],e);this._renderer.compile(n,mf)}_sceneToCubeUV(e,n,i,r){const o=new $n(90,1,n,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],c=this._renderer,d=c.autoClear,h=c.toneMapping;c.getClearColor(zg),c.toneMapping=Er,c.autoClear=!1;const m=new cc({name:"PMREM.Background",side:Ln,depthWrite:!1,depthTest:!1}),_=new dn(new Vo,m);let y=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,y=!0):(m.color.copy(zg),y=!0);for(let f=0;f<6;f++){const g=f%3;g===0?(o.up.set(0,l[f],0),o.lookAt(u[f],0,0)):g===1?(o.up.set(0,0,l[f]),o.lookAt(0,u[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,u[f]));const v=this._cubeSize;Cl(r,g*v,f>2?v:0,v,v),c.setRenderTarget(r),y&&c.render(_,o),c.render(e,o)}_.geometry.dispose(),_.material.dispose(),c.toneMapping=h,c.autoClear=d,e.background=p}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===va||e.mapping===_a;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gg());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new dn(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Cl(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,mf)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Bg[(r-s-1)%Bg.length];this._blur(e,s-1,s,a,o)}n.autoClear=i}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const l=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,d=new dn(this._lodPlanes[r],u),h=u.uniforms,m=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Yr-1),y=s/_,p=isFinite(s)?1+Math.floor(c*y):Yr;p>Yr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Yr}`);const f=[];let g=0;for(let S=0;S<Yr;++S){const C=S/y,B=Math.exp(-C*C/2);f.push(B),S===0?g+=B:S<p&&(g+=2*B)}for(let S=0;S<f.length;S++)f[S]=f[S]/g;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=f,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:v}=this;h.dTheta.value=_,h.mipInt.value=v-i;const M=this._sizeLods[r],R=3*M*(r>v-qs?r-v+qs:0),A=4*(this._cubeSize-M);Cl(n,R,A,3*M,2*M),l.setRenderTarget(n),l.render(d,mf)}}function NR(t){const e=[],n=[],i=[];let r=t;const s=t-qs+1+kg.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);n.push(o);let l=1/o;a>t-qs?l=kg[a-t+qs-1]:a===0&&(l=0),i.push(l);const u=1/(o-2),c=-u,d=1+u,h=[c,c,d,c,d,d,c,c,d,d,c,d],m=6,_=6,y=3,p=2,f=1,g=new Float32Array(y*_*m),v=new Float32Array(p*_*m),M=new Float32Array(f*_*m);for(let A=0;A<m;A++){const S=A%3*2/3-1,C=A>2?0:-1,B=[S,C,0,S+2/3,C,0,S+2/3,C+1,0,S,C,0,S+2/3,C+1,0,S,C+1,0];g.set(B,y*_*A),v.set(h,p*_*A);const x=[A,A,A,A,A,A];M.set(x,f*_*A)}const R=new xn;R.setAttribute("position",new pi(g,y)),R.setAttribute("uv",new pi(v,p)),R.setAttribute("faceIndex",new pi(M,f)),e.push(R),r>qs&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Vg(t,e,n){const i=new cs(t,e,n);return i.texture.mapping=lc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Cl(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function FR(t,e,n){const i=new Float32Array(Yr),r=new N(0,1,0);return new Rr({name:"SphericalGaussianBlur",defines:{n:Yr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Pp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function Gg(){return new Rr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function Wg(){return new Rr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function Pp(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function OR(t){let e=new WeakMap,n=null;function i(o){if(o&&o.isTexture){const l=o.mapping,u=l===Ud||l===Id,c=l===va||l===_a;if(u||c){let d=e.get(o);const h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return n===null&&(n=new Hg(t)),d=u?n.fromEquirectangular(o,d):n.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const m=o.image;return u&&m&&m.height>0||c&&m&&r(m)?(n===null&&(n=new Hg(t)),d=u?n.fromEquirectangular(o):n.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let l=0;const u=6;for(let c=0;c<u;c++)o[c]!==void 0&&l++;return l===u}function s(o){const l=o.target;l.removeEventListener("dispose",s);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function a(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:a}}function kR(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&ru("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function zR(t,e,n,i){const r={},s=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);for(const _ in h.morphAttributes){const y=h.morphAttributes[_];for(let p=0,f=y.length;p<f;p++)e.remove(y[p])}h.removeEventListener("dispose",a),delete r[h.id];const m=s.get(h);m&&(e.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,n.memory.geometries++),h}function l(d){const h=d.attributes;for(const _ in h)e.update(h[_],t.ARRAY_BUFFER);const m=d.morphAttributes;for(const _ in m){const y=m[_];for(let p=0,f=y.length;p<f;p++)e.update(y[p],t.ARRAY_BUFFER)}}function u(d){const h=[],m=d.index,_=d.attributes.position;let y=0;if(m!==null){const g=m.array;y=m.version;for(let v=0,M=g.length;v<M;v+=3){const R=g[v+0],A=g[v+1],S=g[v+2];h.push(R,A,A,S,S,R)}}else if(_!==void 0){const g=_.array;y=_.version;for(let v=0,M=g.length/3-1;v<M;v+=3){const R=v+0,A=v+1,S=v+2;h.push(R,A,A,S,S,R)}}else return;const p=new(wy(h)?by:Cy)(h,1);p.version=y;const f=s.get(d);f&&e.remove(f),s.set(d,p)}function c(d){const h=s.get(d);if(h){const m=d.index;m!==null&&h.version<m.version&&u(d)}else u(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:c}}function BR(t,e,n){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,m){t.drawElements(i,m,s,h*a),n.update(m,i,1)}function u(h,m,_){_!==0&&(t.drawElementsInstanced(i,m,s,h*a,_),n.update(m,i,_))}function c(h,m,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,h,0,_);let p=0;for(let f=0;f<_;f++)p+=m[f];n.update(p,i,1)}function d(h,m,_,y){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<h.length;f++)u(h[f]/a,m[f],y[f]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,h,0,y,0,_);let f=0;for(let g=0;g<_;g++)f+=m[g];for(let g=0;g<y.length;g++)n.update(f,i,y[g])}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=u,this.renderMultiDraw=c,this.renderMultiDrawInstances=d}function HR(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function VR(t,e,n){const i=new WeakMap,r=new Dt;function s(a,o,l){const u=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=c!==void 0?c.length:0;let h=i.get(o);if(h===void 0||h.count!==d){let x=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",x)};var m=x;h!==void 0&&h.texture.dispose();const _=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let M=0;_===!0&&(M=1),y===!0&&(M=2),p===!0&&(M=3);let R=o.attributes.position.count*M,A=1;R>e.maxTextureSize&&(A=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const S=new Float32Array(R*A*4*d),C=new Ay(S,R,A,d);C.type=Oi,C.needsUpdate=!0;const B=M*4;for(let E=0;E<d;E++){const z=f[E],V=g[E],j=v[E],Z=R*A*4*E;for(let Y=0;Y<z.count;Y++){const ne=Y*B;_===!0&&(r.fromBufferAttribute(z,Y),S[Z+ne+0]=r.x,S[Z+ne+1]=r.y,S[Z+ne+2]=r.z,S[Z+ne+3]=0),y===!0&&(r.fromBufferAttribute(V,Y),S[Z+ne+4]=r.x,S[Z+ne+5]=r.y,S[Z+ne+6]=r.z,S[Z+ne+7]=0),p===!0&&(r.fromBufferAttribute(j,Y),S[Z+ne+8]=r.x,S[Z+ne+9]=r.y,S[Z+ne+10]=r.z,S[Z+ne+11]=j.itemSize===4?r.w:1)}}h={count:d,texture:C,size:new He(R,A)},i.set(o,h),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let _=0;for(let p=0;p<u.length;p++)_+=u[p];const y=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(t,"morphTargetBaseInfluence",y),l.getUniforms().setValue(t,"morphTargetInfluences",u)}l.getUniforms().setValue(t,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",h.size)}return{update:s}}function GR(t,e,n,i){let r=new WeakMap;function s(l){const u=i.render.frame,c=l.geometry,d=e.get(l,c);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==u&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return d}function a(){r=new WeakMap}function o(l){const u=l.target;u.removeEventListener("dispose",o),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:s,dispose:a}}class Iy extends hn{constructor(e,n,i,r,s,a,o,l,u,c=aa){if(c!==aa&&c!==xa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&c===aa&&(i=us),i===void 0&&c===xa&&(i=ya),super(null,r,s,a,o,l,c,i,u),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=o!==void 0?o:Zn,this.minFilter=l!==void 0?l:Zn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const Ny=new hn,jg=new Iy(1,1),Fy=new Ay,Oy=new bT,ky=new Dy,Xg=[],Yg=[],$g=new Float32Array(16),qg=new Float32Array(9),Kg=new Float32Array(4);function Aa(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Xg[r];if(s===void 0&&(s=new Float32Array(r),Xg[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function qt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Kt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function dc(t,e){let n=Yg[e];n===void 0&&(n=new Int32Array(e),Yg[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function WR(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function jR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(qt(n,e))return;t.uniform2fv(this.addr,e),Kt(n,e)}}function XR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(qt(n,e))return;t.uniform3fv(this.addr,e),Kt(n,e)}}function YR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(qt(n,e))return;t.uniform4fv(this.addr,e),Kt(n,e)}}function $R(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(qt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Kt(n,e)}else{if(qt(n,i))return;Kg.set(i),t.uniformMatrix2fv(this.addr,!1,Kg),Kt(n,i)}}function qR(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(qt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Kt(n,e)}else{if(qt(n,i))return;qg.set(i),t.uniformMatrix3fv(this.addr,!1,qg),Kt(n,i)}}function KR(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(qt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Kt(n,e)}else{if(qt(n,i))return;$g.set(i),t.uniformMatrix4fv(this.addr,!1,$g),Kt(n,i)}}function ZR(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function QR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(qt(n,e))return;t.uniform2iv(this.addr,e),Kt(n,e)}}function JR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(qt(n,e))return;t.uniform3iv(this.addr,e),Kt(n,e)}}function eC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(qt(n,e))return;t.uniform4iv(this.addr,e),Kt(n,e)}}function tC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function nC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(qt(n,e))return;t.uniform2uiv(this.addr,e),Kt(n,e)}}function iC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(qt(n,e))return;t.uniform3uiv(this.addr,e),Kt(n,e)}}function rC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(qt(n,e))return;t.uniform4uiv(this.addr,e),Kt(n,e)}}function sC(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(jg.compareFunction=Ey,s=jg):s=Ny,n.setTexture2D(e||s,r)}function aC(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Oy,r)}function oC(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||ky,r)}function lC(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Fy,r)}function uC(t){switch(t){case 5126:return WR;case 35664:return jR;case 35665:return XR;case 35666:return YR;case 35674:return $R;case 35675:return qR;case 35676:return KR;case 5124:case 35670:return ZR;case 35667:case 35671:return QR;case 35668:case 35672:return JR;case 35669:case 35673:return eC;case 5125:return tC;case 36294:return nC;case 36295:return iC;case 36296:return rC;case 35678:case 36198:case 36298:case 36306:case 35682:return sC;case 35679:case 36299:case 36307:return aC;case 35680:case 36300:case 36308:case 36293:return oC;case 36289:case 36303:case 36311:case 36292:return lC}}function cC(t,e){t.uniform1fv(this.addr,e)}function fC(t,e){const n=Aa(e,this.size,2);t.uniform2fv(this.addr,n)}function dC(t,e){const n=Aa(e,this.size,3);t.uniform3fv(this.addr,n)}function hC(t,e){const n=Aa(e,this.size,4);t.uniform4fv(this.addr,n)}function pC(t,e){const n=Aa(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function mC(t,e){const n=Aa(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function gC(t,e){const n=Aa(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function vC(t,e){t.uniform1iv(this.addr,e)}function _C(t,e){t.uniform2iv(this.addr,e)}function yC(t,e){t.uniform3iv(this.addr,e)}function xC(t,e){t.uniform4iv(this.addr,e)}function SC(t,e){t.uniform1uiv(this.addr,e)}function MC(t,e){t.uniform2uiv(this.addr,e)}function EC(t,e){t.uniform3uiv(this.addr,e)}function wC(t,e){t.uniform4uiv(this.addr,e)}function TC(t,e,n){const i=this.cache,r=e.length,s=dc(n,r);qt(i,s)||(t.uniform1iv(this.addr,s),Kt(i,s));for(let a=0;a!==r;++a)n.setTexture2D(e[a]||Ny,s[a])}function AC(t,e,n){const i=this.cache,r=e.length,s=dc(n,r);qt(i,s)||(t.uniform1iv(this.addr,s),Kt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||Oy,s[a])}function RC(t,e,n){const i=this.cache,r=e.length,s=dc(n,r);qt(i,s)||(t.uniform1iv(this.addr,s),Kt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||ky,s[a])}function CC(t,e,n){const i=this.cache,r=e.length,s=dc(n,r);qt(i,s)||(t.uniform1iv(this.addr,s),Kt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||Fy,s[a])}function bC(t){switch(t){case 5126:return cC;case 35664:return fC;case 35665:return dC;case 35666:return hC;case 35674:return pC;case 35675:return mC;case 35676:return gC;case 5124:case 35670:return vC;case 35667:case 35671:return _C;case 35668:case 35672:return yC;case 35669:case 35673:return xC;case 5125:return SC;case 36294:return MC;case 36295:return EC;case 36296:return wC;case 35678:case 36198:case 36298:case 36306:case 35682:return TC;case 35679:case 36299:case 36307:return AC;case 35680:case 36300:case 36308:case 36293:return RC;case 36289:case 36303:case 36311:case 36292:return CC}}class PC{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=uC(n.type)}}class LC{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=bC(n.type)}}class DC{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const xf=/(\w+)(\])?(\[|\.)?/g;function Zg(t,e){t.seq.push(e),t.map[e.id]=e}function UC(t,e,n){const i=t.name,r=i.length;for(xf.lastIndex=0;;){const s=xf.exec(i),a=xf.lastIndex;let o=s[1];const l=s[2]==="]",u=s[3];if(l&&(o=o|0),u===void 0||u==="["&&a+2===r){Zg(n,u===void 0?new PC(o,t,e):new LC(o,t,e));break}else{let d=n.map[o];d===void 0&&(d=new DC(o),Zg(n,d)),n=d}}}class su{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),a=e.getUniformLocation(n,s.name);UC(s,a,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function Qg(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const IC=37297;let NC=0;function FC(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}function OC(t){const e=pt.getPrimaries(pt.workingColorSpace),n=pt.getPrimaries(t);let i;switch(e===n?i="":e===ku&&n===Ou?i="LinearDisplayP3ToLinearSRGB":e===Ou&&n===ku&&(i="LinearSRGBToLinearDisplayP3"),t){case Ur:case uc:return[i,"LinearTransferOETF"];case Yt:case Ap:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function Jg(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+FC(t.getShaderSource(e),a)}else return r}function kC(t,e){const n=OC(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function zC(t,e){let n;switch(e){case eT:n="Linear";break;case tT:n="Reinhard";break;case nT:n="Cineon";break;case iT:n="ACESFilmic";break;case sT:n="AgX";break;case aT:n="Neutral";break;case rT:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const bl=new N;function BC(){pt.getLuminanceCoefficients(bl);const t=bl.x.toFixed(4),e=bl.y.toFixed(4),n=bl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function HC(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qa).join(`
`)}function VC(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function GC(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function Qa(t){return t!==""}function ev(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function tv(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const WC=/^[ \t]*#include +<([\w\d./]+)>/gm;function ch(t){return t.replace(WC,XC)}const jC=new Map;function XC(t,e){let n=tt[e];if(n===void 0){const i=jC.get(e);if(i!==void 0)n=tt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return ch(n)}const YC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nv(t){return t.replace(YC,$C)}function $C(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function iv(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function qC(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===cy?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===Uw?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===Li&&(e="SHADOWMAP_TYPE_VSM"),e}function KC(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case va:case _a:e="ENVMAP_TYPE_CUBE";break;case lc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ZC(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case _a:e="ENVMAP_MODE_REFRACTION";break}return e}function QC(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case yp:e="ENVMAP_BLENDING_MULTIPLY";break;case Qw:e="ENVMAP_BLENDING_MIX";break;case Jw:e="ENVMAP_BLENDING_ADD";break}return e}function JC(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function eb(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=qC(n),u=KC(n),c=ZC(n),d=QC(n),h=JC(n),m=HC(n),_=VC(s),y=r.createProgram();let p,f,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Qa).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Qa).join(`
`),f.length>0&&(f+=`
`)):(p=[iv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qa).join(`
`),f=[iv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Er?"#define TONE_MAPPING":"",n.toneMapping!==Er?tt.tonemapping_pars_fragment:"",n.toneMapping!==Er?zC("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,kC("linearToOutputTexel",n.outputColorSpace),BC(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Qa).join(`
`)),a=ch(a),a=ev(a,n),a=tv(a,n),o=ch(o),o=ev(o,n),o=tv(o,n),a=nv(a),o=nv(o),n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",n.glslVersion===xg?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===xg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const v=g+p+a,M=g+f+o,R=Qg(r,r.VERTEX_SHADER,v),A=Qg(r,r.FRAGMENT_SHADER,M);r.attachShader(y,R),r.attachShader(y,A),n.index0AttributeName!==void 0?r.bindAttribLocation(y,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function S(E){if(t.debug.checkShaderErrors){const z=r.getProgramInfoLog(y).trim(),V=r.getShaderInfoLog(R).trim(),j=r.getShaderInfoLog(A).trim();let Z=!0,Y=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(Z=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,y,R,A);else{const ne=Jg(r,R,"vertex"),P=Jg(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+z+`
`+ne+`
`+P)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(V===""||j==="")&&(Y=!1);Y&&(E.diagnostics={runnable:Z,programLog:z,vertexShader:{log:V,prefix:p},fragmentShader:{log:j,prefix:f}})}r.deleteShader(R),r.deleteShader(A),C=new su(r,y),B=GC(r,y)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let B;this.getAttributes=function(){return B===void 0&&S(this),B};let x=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(y,IC)),x},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=NC++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=R,this.fragmentShader=A,this}let tb=0;class nb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new ib(e),n.set(e,i)),i}}class ib{constructor(e){this.id=tb++,this.code=e,this.usedTimes=0}}function rb(t,e,n,i,r,s,a){const o=new Rp,l=new nb,u=new Set,c=[],d=r.logarithmicDepthBuffer,h=r.reverseDepthBuffer,m=r.vertexTextures;let _=r.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return u.add(x),x===0?"uv":`uv${x}`}function f(x,E,z,V,j){const Z=V.fog,Y=j.geometry,ne=x.isMeshStandardMaterial?V.environment:null,P=(x.isMeshStandardMaterial?n:e).get(x.envMap||ne),J=P&&P.mapping===lc?P.image.height:null,te=y[x.type];x.precision!==null&&(_=r.getMaxPrecision(x.precision),_!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",_,"instead."));const le=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Ee=le!==void 0?le.length:0;let Ze=0;Y.morphAttributes.position!==void 0&&(Ze=1),Y.morphAttributes.normal!==void 0&&(Ze=2),Y.morphAttributes.color!==void 0&&(Ze=3);let W,K,fe,de;if(te){const Wt=_i[te];W=Wt.vertexShader,K=Wt.fragmentShader}else W=x.vertexShader,K=x.fragmentShader,l.update(x),fe=l.getVertexShaderID(x),de=l.getFragmentShaderID(x);const Be=t.getRenderTarget(),Fe=j.isInstancedMesh===!0,We=j.isBatchedMesh===!0,dt=!!x.map,Ve=!!x.matcap,U=!!P,sn=!!x.aoMap,at=!!x.lightMap,et=!!x.bumpMap,je=!!x.normalMap,St=!!x.displacementMap,Xe=!!x.emissiveMap,b=!!x.metalnessMap,w=!!x.roughnessMap,G=x.anisotropy>0,ee=x.clearcoat>0,se=x.dispersion>0,Q=x.iridescence>0,De=x.sheen>0,me=x.transmission>0,_e=G&&!!x.anisotropyMap,Je=ee&&!!x.clearcoatMap,ce=ee&&!!x.clearcoatNormalMap,we=ee&&!!x.clearcoatRoughnessMap,Ye=Q&&!!x.iridescenceMap,Oe=Q&&!!x.iridescenceThicknessMap,Re=De&&!!x.sheenColorMap,rt=De&&!!x.sheenRoughnessMap,qe=!!x.specularMap,_t=!!x.specularColorMap,I=!!x.specularIntensityMap,xe=me&&!!x.transmissionMap,q=me&&!!x.thicknessMap,re=!!x.gradientMap,ye=!!x.alphaMap,Me=x.alphaTest>0,ot=!!x.alphaHash,Nt=!!x.extensions;let en=Er;x.toneMapped&&(Be===null||Be.isXRRenderTarget===!0)&&(en=t.toneMapping);const lt={shaderID:te,shaderType:x.type,shaderName:x.name,vertexShader:W,fragmentShader:K,defines:x.defines,customVertexShaderID:fe,customFragmentShaderID:de,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:_,batching:We,batchingColor:We&&j._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&j.instanceColor!==null,instancingMorph:Fe&&j.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Be===null?t.outputColorSpace:Be.isXRRenderTarget===!0?Be.texture.colorSpace:Ur,alphaToCoverage:!!x.alphaToCoverage,map:dt,matcap:Ve,envMap:U,envMapMode:U&&P.mapping,envMapCubeUVHeight:J,aoMap:sn,lightMap:at,bumpMap:et,normalMap:je,displacementMap:m&&St,emissiveMap:Xe,normalMapObjectSpace:je&&x.normalMapType===cT,normalMapTangentSpace:je&&x.normalMapType===My,metalnessMap:b,roughnessMap:w,anisotropy:G,anisotropyMap:_e,clearcoat:ee,clearcoatMap:Je,clearcoatNormalMap:ce,clearcoatRoughnessMap:we,dispersion:se,iridescence:Q,iridescenceMap:Ye,iridescenceThicknessMap:Oe,sheen:De,sheenColorMap:Re,sheenRoughnessMap:rt,specularMap:qe,specularColorMap:_t,specularIntensityMap:I,transmission:me,transmissionMap:xe,thicknessMap:q,gradientMap:re,opaque:x.transparent===!1&&x.blending===sa&&x.alphaToCoverage===!1,alphaMap:ye,alphaTest:Me,alphaHash:ot,combine:x.combine,mapUv:dt&&p(x.map.channel),aoMapUv:sn&&p(x.aoMap.channel),lightMapUv:at&&p(x.lightMap.channel),bumpMapUv:et&&p(x.bumpMap.channel),normalMapUv:je&&p(x.normalMap.channel),displacementMapUv:St&&p(x.displacementMap.channel),emissiveMapUv:Xe&&p(x.emissiveMap.channel),metalnessMapUv:b&&p(x.metalnessMap.channel),roughnessMapUv:w&&p(x.roughnessMap.channel),anisotropyMapUv:_e&&p(x.anisotropyMap.channel),clearcoatMapUv:Je&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:ce&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Ye&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:Oe&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:rt&&p(x.sheenRoughnessMap.channel),specularMapUv:qe&&p(x.specularMap.channel),specularColorMapUv:_t&&p(x.specularColorMap.channel),specularIntensityMapUv:I&&p(x.specularIntensityMap.channel),transmissionMapUv:xe&&p(x.transmissionMap.channel),thicknessMapUv:q&&p(x.thicknessMap.channel),alphaMapUv:ye&&p(x.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(je||G),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:j.isPoints===!0&&!!Y.attributes.uv&&(dt||ye),fog:!!Z,useFog:x.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:h,skinning:j.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Ze,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:t.shadowMap.enabled&&z.length>0,shadowMapType:t.shadowMap.type,toneMapping:en,decodeVideoTexture:dt&&x.map.isVideoTexture===!0&&pt.getTransfer(x.map.colorSpace)===At,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ii,flipSided:x.side===Ln,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Nt&&x.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Nt&&x.extensions.multiDraw===!0||We)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return lt.vertexUv1s=u.has(1),lt.vertexUv2s=u.has(2),lt.vertexUv3s=u.has(3),u.clear(),lt}function g(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const z in x.defines)E.push(z),E.push(x.defines[z]);return x.isRawShaderMaterial===!1&&(v(E,x),M(E,x),E.push(t.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function v(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function M(x,E){o.disableAll(),E.supportsVertexTextures&&o.enable(0),E.instancing&&o.enable(1),E.instancingColor&&o.enable(2),E.instancingMorph&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),E.dispersion&&o.enable(20),E.batchingColor&&o.enable(21),x.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reverseDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.alphaToCoverage&&o.enable(20),x.push(o.mask)}function R(x){const E=y[x.type];let z;if(E){const V=_i[E];z=HT.clone(V.uniforms)}else z=x.uniforms;return z}function A(x,E){let z;for(let V=0,j=c.length;V<j;V++){const Z=c[V];if(Z.cacheKey===E){z=Z,++z.usedTimes;break}}return z===void 0&&(z=new eb(t,E,x,s),c.push(z)),z}function S(x){if(--x.usedTimes===0){const E=c.indexOf(x);c[E]=c[c.length-1],c.pop(),x.destroy()}}function C(x){l.remove(x)}function B(){l.dispose()}return{getParameters:f,getProgramCacheKey:g,getUniforms:R,acquireProgram:A,releaseProgram:S,releaseShaderCache:C,programs:c,dispose:B}}function sb(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,l){t.get(a)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function ab(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function rv(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function sv(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(d,h,m,_,y,p){let f=t[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:m,groupOrder:_,renderOrder:d.renderOrder,z:y,group:p},t[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=m,f.groupOrder=_,f.renderOrder=d.renderOrder,f.z=y,f.group=p),e++,f}function o(d,h,m,_,y,p){const f=a(d,h,m,_,y,p);m.transmission>0?i.push(f):m.transparent===!0?r.push(f):n.push(f)}function l(d,h,m,_,y,p){const f=a(d,h,m,_,y,p);m.transmission>0?i.unshift(f):m.transparent===!0?r.unshift(f):n.unshift(f)}function u(d,h){n.length>1&&n.sort(d||ab),i.length>1&&i.sort(h||rv),r.length>1&&r.sort(h||rv)}function c(){for(let d=e,h=t.length;d<h;d++){const m=t[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:c,sort:u}}function ob(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new sv,t.set(i,[a])):r>=s.length?(a=new sv,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function lb(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new N,color:new $e};break;case"SpotLight":n={position:new N,direction:new N,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new N,color:new $e,distance:0,decay:0};break;case"HemisphereLight":n={direction:new N,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":n={color:new $e,position:new N,halfWidth:new N,halfHeight:new N};break}return t[e.id]=n,n}}}function ub(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let cb=0;function fb(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function db(t){const e=new lb,n=ub(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new N);const r=new N,s=new wt,a=new wt;function o(u){let c=0,d=0,h=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let m=0,_=0,y=0,p=0,f=0,g=0,v=0,M=0,R=0,A=0,S=0;u.sort(fb);for(let B=0,x=u.length;B<x;B++){const E=u[B],z=E.color,V=E.intensity,j=E.distance,Z=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)c+=z.r*V,d+=z.g*V,h+=z.b*V;else if(E.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(E.sh.coefficients[Y],V);S++}else if(E.isDirectionalLight){const Y=e.get(E);if(Y.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){const ne=E.shadow,P=n.get(E);P.shadowIntensity=ne.intensity,P.shadowBias=ne.bias,P.shadowNormalBias=ne.normalBias,P.shadowRadius=ne.radius,P.shadowMapSize=ne.mapSize,i.directionalShadow[m]=P,i.directionalShadowMap[m]=Z,i.directionalShadowMatrix[m]=E.shadow.matrix,g++}i.directional[m]=Y,m++}else if(E.isSpotLight){const Y=e.get(E);Y.position.setFromMatrixPosition(E.matrixWorld),Y.color.copy(z).multiplyScalar(V),Y.distance=j,Y.coneCos=Math.cos(E.angle),Y.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),Y.decay=E.decay,i.spot[y]=Y;const ne=E.shadow;if(E.map&&(i.spotLightMap[R]=E.map,R++,ne.updateMatrices(E),E.castShadow&&A++),i.spotLightMatrix[y]=ne.matrix,E.castShadow){const P=n.get(E);P.shadowIntensity=ne.intensity,P.shadowBias=ne.bias,P.shadowNormalBias=ne.normalBias,P.shadowRadius=ne.radius,P.shadowMapSize=ne.mapSize,i.spotShadow[y]=P,i.spotShadowMap[y]=Z,M++}y++}else if(E.isRectAreaLight){const Y=e.get(E);Y.color.copy(z).multiplyScalar(V),Y.halfWidth.set(E.width*.5,0,0),Y.halfHeight.set(0,E.height*.5,0),i.rectArea[p]=Y,p++}else if(E.isPointLight){const Y=e.get(E);if(Y.color.copy(E.color).multiplyScalar(E.intensity),Y.distance=E.distance,Y.decay=E.decay,E.castShadow){const ne=E.shadow,P=n.get(E);P.shadowIntensity=ne.intensity,P.shadowBias=ne.bias,P.shadowNormalBias=ne.normalBias,P.shadowRadius=ne.radius,P.shadowMapSize=ne.mapSize,P.shadowCameraNear=ne.camera.near,P.shadowCameraFar=ne.camera.far,i.pointShadow[_]=P,i.pointShadowMap[_]=Z,i.pointShadowMatrix[_]=E.shadow.matrix,v++}i.point[_]=Y,_++}else if(E.isHemisphereLight){const Y=e.get(E);Y.skyColor.copy(E.color).multiplyScalar(V),Y.groundColor.copy(E.groundColor).multiplyScalar(V),i.hemi[f]=Y,f++}}p>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=d,i.ambient[2]=h;const C=i.hash;(C.directionalLength!==m||C.pointLength!==_||C.spotLength!==y||C.rectAreaLength!==p||C.hemiLength!==f||C.numDirectionalShadows!==g||C.numPointShadows!==v||C.numSpotShadows!==M||C.numSpotMaps!==R||C.numLightProbes!==S)&&(i.directional.length=m,i.spot.length=y,i.rectArea.length=p,i.point.length=_,i.hemi.length=f,i.directionalShadow.length=g,i.directionalShadowMap.length=g,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=g,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=M+R-A,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=S,C.directionalLength=m,C.pointLength=_,C.spotLength=y,C.rectAreaLength=p,C.hemiLength=f,C.numDirectionalShadows=g,C.numPointShadows=v,C.numSpotShadows=M,C.numSpotMaps=R,C.numLightProbes=S,i.version=cb++)}function l(u,c){let d=0,h=0,m=0,_=0,y=0;const p=c.matrixWorldInverse;for(let f=0,g=u.length;f<g;f++){const v=u[f];if(v.isDirectionalLight){const M=i.directional[d];M.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(p),d++}else if(v.isSpotLight){const M=i.spot[m];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(p),m++}else if(v.isRectAreaLight){const M=i.rectArea[_];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(p),a.identity(),s.copy(v.matrixWorld),s.premultiply(p),a.extractRotation(s),M.halfWidth.set(v.width*.5,0,0),M.halfHeight.set(0,v.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),_++}else if(v.isPointLight){const M=i.point[h];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(p),h++}else if(v.isHemisphereLight){const M=i.hemi[y];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(p),y++}}}return{setup:o,setupView:l,state:i}}function av(t){const e=new db(t),n=[],i=[];function r(c){u.camera=c,n.length=0,i.length=0}function s(c){n.push(c)}function a(c){i.push(c)}function o(){e.setup(n)}function l(c){e.setupView(n,c)}const u={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:u,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function hb(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new av(t),e.set(r,[o])):s>=a.length?(o=new av(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}class pb extends wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lT,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class mb extends wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const gb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function _b(t,e,n){let i=new Cp;const r=new He,s=new He,a=new Dt,o=new pb({depthPacking:uT}),l=new mb,u={},c=n.maxTextureSize,d={[Xi]:Ln,[Ln]:Xi,[Ii]:Ii},h=new Rr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:gb,fragmentShader:vb}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const _=new xn;_.setAttribute("position",new pi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new dn(_,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cy;let f=this.type;this.render=function(A,S,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const B=t.getRenderTarget(),x=t.getActiveCubeFace(),E=t.getActiveMipmapLevel(),z=t.state;z.setBlending(Mr),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const V=f!==Li&&this.type===Li,j=f===Li&&this.type!==Li;for(let Z=0,Y=A.length;Z<Y;Z++){const ne=A[Z],P=ne.shadow;if(P===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;r.copy(P.mapSize);const J=P.getFrameExtents();if(r.multiply(J),s.copy(P.mapSize),(r.x>c||r.y>c)&&(r.x>c&&(s.x=Math.floor(c/J.x),r.x=s.x*J.x,P.mapSize.x=s.x),r.y>c&&(s.y=Math.floor(c/J.y),r.y=s.y*J.y,P.mapSize.y=s.y)),P.map===null||V===!0||j===!0){const le=this.type!==Li?{minFilter:Zn,magFilter:Zn}:{};P.map!==null&&P.map.dispose(),P.map=new cs(r.x,r.y,le),P.map.texture.name=ne.name+".shadowMap",P.camera.updateProjectionMatrix()}t.setRenderTarget(P.map),t.clear();const te=P.getViewportCount();for(let le=0;le<te;le++){const Ee=P.getViewport(le);a.set(s.x*Ee.x,s.y*Ee.y,s.x*Ee.z,s.y*Ee.w),z.viewport(a),P.updateMatrices(ne,le),i=P.getFrustum(),M(S,C,P.camera,ne,this.type)}P.isPointLightShadow!==!0&&this.type===Li&&g(P,C),P.needsUpdate=!1}f=this.type,p.needsUpdate=!1,t.setRenderTarget(B,x,E)};function g(A,S){const C=e.update(y);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new cs(r.x,r.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,t.setRenderTarget(A.mapPass),t.clear(),t.renderBufferDirect(S,null,C,h,y,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,t.setRenderTarget(A.map),t.clear(),t.renderBufferDirect(S,null,C,m,y,null)}function v(A,S,C,B){let x=null;const E=C.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(E!==void 0)x=E;else if(x=C.isPointLight===!0?l:o,t.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){const z=x.uuid,V=S.uuid;let j=u[z];j===void 0&&(j={},u[z]=j);let Z=j[V];Z===void 0&&(Z=x.clone(),j[V]=Z,S.addEventListener("dispose",R)),x=Z}if(x.visible=S.visible,x.wireframe=S.wireframe,B===Li?x.side=S.shadowSide!==null?S.shadowSide:S.side:x.side=S.shadowSide!==null?S.shadowSide:d[S.side],x.alphaMap=S.alphaMap,x.alphaTest=S.alphaTest,x.map=S.map,x.clipShadows=S.clipShadows,x.clippingPlanes=S.clippingPlanes,x.clipIntersection=S.clipIntersection,x.displacementMap=S.displacementMap,x.displacementScale=S.displacementScale,x.displacementBias=S.displacementBias,x.wireframeLinewidth=S.wireframeLinewidth,x.linewidth=S.linewidth,C.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const z=t.properties.get(x);z.light=C}return x}function M(A,S,C,B,x){if(A.visible===!1)return;if(A.layers.test(S.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===Li)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,A.matrixWorld);const V=e.update(A),j=A.material;if(Array.isArray(j)){const Z=V.groups;for(let Y=0,ne=Z.length;Y<ne;Y++){const P=Z[Y],J=j[P.materialIndex];if(J&&J.visible){const te=v(A,J,B,x);A.onBeforeShadow(t,A,S,C,V,te,P),t.renderBufferDirect(C,null,V,te,A,P),A.onAfterShadow(t,A,S,C,V,te,P)}}}else if(j.visible){const Z=v(A,j,B,x);A.onBeforeShadow(t,A,S,C,V,Z,null),t.renderBufferDirect(C,null,V,Z,A,null),A.onAfterShadow(t,A,S,C,V,Z,null)}}const z=A.children;for(let V=0,j=z.length;V<j;V++)M(z[V],S,C,B,x)}function R(A){A.target.removeEventListener("dispose",R);for(const C in u){const B=u[C],x=A.target.uuid;x in B&&(B[x].dispose(),delete B[x])}}}const yb={[Ad]:Rd,[Cd]:Ld,[bd]:Dd,[ga]:Pd,[Rd]:Ad,[Ld]:Cd,[Dd]:bd,[Pd]:ga};function xb(t){function e(){let I=!1;const xe=new Dt;let q=null;const re=new Dt(0,0,0,0);return{setMask:function(ye){q!==ye&&!I&&(t.colorMask(ye,ye,ye,ye),q=ye)},setLocked:function(ye){I=ye},setClear:function(ye,Me,ot,Nt,en){en===!0&&(ye*=Nt,Me*=Nt,ot*=Nt),xe.set(ye,Me,ot,Nt),re.equals(xe)===!1&&(t.clearColor(ye,Me,ot,Nt),re.copy(xe))},reset:function(){I=!1,q=null,re.set(-1,0,0,0)}}}function n(){let I=!1,xe=!1,q=null,re=null,ye=null;return{setReversed:function(Me){xe=Me},setTest:function(Me){Me?fe(t.DEPTH_TEST):de(t.DEPTH_TEST)},setMask:function(Me){q!==Me&&!I&&(t.depthMask(Me),q=Me)},setFunc:function(Me){if(xe&&(Me=yb[Me]),re!==Me){switch(Me){case Ad:t.depthFunc(t.NEVER);break;case Rd:t.depthFunc(t.ALWAYS);break;case Cd:t.depthFunc(t.LESS);break;case ga:t.depthFunc(t.LEQUAL);break;case bd:t.depthFunc(t.EQUAL);break;case Pd:t.depthFunc(t.GEQUAL);break;case Ld:t.depthFunc(t.GREATER);break;case Dd:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}re=Me}},setLocked:function(Me){I=Me},setClear:function(Me){ye!==Me&&(t.clearDepth(Me),ye=Me)},reset:function(){I=!1,q=null,re=null,ye=null}}}function i(){let I=!1,xe=null,q=null,re=null,ye=null,Me=null,ot=null,Nt=null,en=null;return{setTest:function(lt){I||(lt?fe(t.STENCIL_TEST):de(t.STENCIL_TEST))},setMask:function(lt){xe!==lt&&!I&&(t.stencilMask(lt),xe=lt)},setFunc:function(lt,Wt,ti){(q!==lt||re!==Wt||ye!==ti)&&(t.stencilFunc(lt,Wt,ti),q=lt,re=Wt,ye=ti)},setOp:function(lt,Wt,ti){(Me!==lt||ot!==Wt||Nt!==ti)&&(t.stencilOp(lt,Wt,ti),Me=lt,ot=Wt,Nt=ti)},setLocked:function(lt){I=lt},setClear:function(lt){en!==lt&&(t.clearStencil(lt),en=lt)},reset:function(){I=!1,xe=null,q=null,re=null,ye=null,Me=null,ot=null,Nt=null,en=null}}}const r=new e,s=new n,a=new i,o=new WeakMap,l=new WeakMap;let u={},c={},d=new WeakMap,h=[],m=null,_=!1,y=null,p=null,f=null,g=null,v=null,M=null,R=null,A=new $e(0,0,0),S=0,C=!1,B=null,x=null,E=null,z=null,V=null;const j=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,Y=0;const ne=t.getParameter(t.VERSION);ne.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(ne)[1]),Z=Y>=1):ne.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),Z=Y>=2);let P=null,J={};const te=t.getParameter(t.SCISSOR_BOX),le=t.getParameter(t.VIEWPORT),Ee=new Dt().fromArray(te),Ze=new Dt().fromArray(le);function W(I,xe,q,re){const ye=new Uint8Array(4),Me=t.createTexture();t.bindTexture(I,Me),t.texParameteri(I,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(I,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let ot=0;ot<q;ot++)I===t.TEXTURE_3D||I===t.TEXTURE_2D_ARRAY?t.texImage3D(xe,0,t.RGBA,1,1,re,0,t.RGBA,t.UNSIGNED_BYTE,ye):t.texImage2D(xe+ot,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ye);return Me}const K={};K[t.TEXTURE_2D]=W(t.TEXTURE_2D,t.TEXTURE_2D,1),K[t.TEXTURE_CUBE_MAP]=W(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[t.TEXTURE_2D_ARRAY]=W(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),K[t.TEXTURE_3D]=W(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),a.setClear(0),fe(t.DEPTH_TEST),s.setFunc(ga),at(!1),et(mg),fe(t.CULL_FACE),U(Mr);function fe(I){u[I]!==!0&&(t.enable(I),u[I]=!0)}function de(I){u[I]!==!1&&(t.disable(I),u[I]=!1)}function Be(I,xe){return c[I]!==xe?(t.bindFramebuffer(I,xe),c[I]=xe,I===t.DRAW_FRAMEBUFFER&&(c[t.FRAMEBUFFER]=xe),I===t.FRAMEBUFFER&&(c[t.DRAW_FRAMEBUFFER]=xe),!0):!1}function Fe(I,xe){let q=h,re=!1;if(I){q=d.get(xe),q===void 0&&(q=[],d.set(xe,q));const ye=I.textures;if(q.length!==ye.length||q[0]!==t.COLOR_ATTACHMENT0){for(let Me=0,ot=ye.length;Me<ot;Me++)q[Me]=t.COLOR_ATTACHMENT0+Me;q.length=ye.length,re=!0}}else q[0]!==t.BACK&&(q[0]=t.BACK,re=!0);re&&t.drawBuffers(q)}function We(I){return m!==I?(t.useProgram(I),m=I,!0):!1}const dt={[Xr]:t.FUNC_ADD,[Nw]:t.FUNC_SUBTRACT,[Fw]:t.FUNC_REVERSE_SUBTRACT};dt[Ow]=t.MIN,dt[kw]=t.MAX;const Ve={[zw]:t.ZERO,[Bw]:t.ONE,[Hw]:t.SRC_COLOR,[wd]:t.SRC_ALPHA,[Yw]:t.SRC_ALPHA_SATURATE,[jw]:t.DST_COLOR,[Gw]:t.DST_ALPHA,[Vw]:t.ONE_MINUS_SRC_COLOR,[Td]:t.ONE_MINUS_SRC_ALPHA,[Xw]:t.ONE_MINUS_DST_COLOR,[Ww]:t.ONE_MINUS_DST_ALPHA,[$w]:t.CONSTANT_COLOR,[qw]:t.ONE_MINUS_CONSTANT_COLOR,[Kw]:t.CONSTANT_ALPHA,[Zw]:t.ONE_MINUS_CONSTANT_ALPHA};function U(I,xe,q,re,ye,Me,ot,Nt,en,lt){if(I===Mr){_===!0&&(de(t.BLEND),_=!1);return}if(_===!1&&(fe(t.BLEND),_=!0),I!==Iw){if(I!==y||lt!==C){if((p!==Xr||v!==Xr)&&(t.blendEquation(t.FUNC_ADD),p=Xr,v=Xr),lt)switch(I){case sa:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case gg:t.blendFunc(t.ONE,t.ONE);break;case vg:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case _g:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case sa:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case gg:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case vg:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case _g:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}f=null,g=null,M=null,R=null,A.set(0,0,0),S=0,y=I,C=lt}return}ye=ye||xe,Me=Me||q,ot=ot||re,(xe!==p||ye!==v)&&(t.blendEquationSeparate(dt[xe],dt[ye]),p=xe,v=ye),(q!==f||re!==g||Me!==M||ot!==R)&&(t.blendFuncSeparate(Ve[q],Ve[re],Ve[Me],Ve[ot]),f=q,g=re,M=Me,R=ot),(Nt.equals(A)===!1||en!==S)&&(t.blendColor(Nt.r,Nt.g,Nt.b,en),A.copy(Nt),S=en),y=I,C=!1}function sn(I,xe){I.side===Ii?de(t.CULL_FACE):fe(t.CULL_FACE);let q=I.side===Ln;xe&&(q=!q),at(q),I.blending===sa&&I.transparent===!1?U(Mr):U(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),s.setFunc(I.depthFunc),s.setTest(I.depthTest),s.setMask(I.depthWrite),r.setMask(I.colorWrite);const re=I.stencilWrite;a.setTest(re),re&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),St(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?fe(t.SAMPLE_ALPHA_TO_COVERAGE):de(t.SAMPLE_ALPHA_TO_COVERAGE)}function at(I){B!==I&&(I?t.frontFace(t.CW):t.frontFace(t.CCW),B=I)}function et(I){I!==Lw?(fe(t.CULL_FACE),I!==x&&(I===mg?t.cullFace(t.BACK):I===Dw?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):de(t.CULL_FACE),x=I}function je(I){I!==E&&(Z&&t.lineWidth(I),E=I)}function St(I,xe,q){I?(fe(t.POLYGON_OFFSET_FILL),(z!==xe||V!==q)&&(t.polygonOffset(xe,q),z=xe,V=q)):de(t.POLYGON_OFFSET_FILL)}function Xe(I){I?fe(t.SCISSOR_TEST):de(t.SCISSOR_TEST)}function b(I){I===void 0&&(I=t.TEXTURE0+j-1),P!==I&&(t.activeTexture(I),P=I)}function w(I,xe,q){q===void 0&&(P===null?q=t.TEXTURE0+j-1:q=P);let re=J[q];re===void 0&&(re={type:void 0,texture:void 0},J[q]=re),(re.type!==I||re.texture!==xe)&&(P!==q&&(t.activeTexture(q),P=q),t.bindTexture(I,xe||K[I]),re.type=I,re.texture=xe)}function G(){const I=J[P];I!==void 0&&I.type!==void 0&&(t.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function ee(){try{t.compressedTexImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function se(){try{t.compressedTexImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{t.texSubImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function De(){try{t.texSubImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function me(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _e(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Je(){try{t.texStorage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ce(){try{t.texStorage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function we(){try{t.texImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ye(){try{t.texImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Oe(I){Ee.equals(I)===!1&&(t.scissor(I.x,I.y,I.z,I.w),Ee.copy(I))}function Re(I){Ze.equals(I)===!1&&(t.viewport(I.x,I.y,I.z,I.w),Ze.copy(I))}function rt(I,xe){let q=l.get(xe);q===void 0&&(q=new WeakMap,l.set(xe,q));let re=q.get(I);re===void 0&&(re=t.getUniformBlockIndex(xe,I.name),q.set(I,re))}function qe(I,xe){const re=l.get(xe).get(I);o.get(xe)!==re&&(t.uniformBlockBinding(xe,re,I.__bindingPointIndex),o.set(xe,re))}function _t(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),u={},P=null,J={},c={},d=new WeakMap,h=[],m=null,_=!1,y=null,p=null,f=null,g=null,v=null,M=null,R=null,A=new $e(0,0,0),S=0,C=!1,B=null,x=null,E=null,z=null,V=null,Ee.set(0,0,t.canvas.width,t.canvas.height),Ze.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),a.reset()}return{buffers:{color:r,depth:s,stencil:a},enable:fe,disable:de,bindFramebuffer:Be,drawBuffers:Fe,useProgram:We,setBlending:U,setMaterial:sn,setFlipSided:at,setCullFace:et,setLineWidth:je,setPolygonOffset:St,setScissorTest:Xe,activeTexture:b,bindTexture:w,unbindTexture:G,compressedTexImage2D:ee,compressedTexImage3D:se,texImage2D:we,texImage3D:Ye,updateUBOMapping:rt,uniformBlockBinding:qe,texStorage2D:Je,texStorage3D:ce,texSubImage2D:Q,texSubImage3D:De,compressedTexSubImage2D:me,compressedTexSubImage3D:_e,scissor:Oe,viewport:Re,reset:_t}}function ov(t,e,n,i){const r=Sb(i);switch(n){case my:return t*e;case vy:return t*e;case _y:return t*e*2;case yy:return t*e/r.components*r.byteLength;case Ep:return t*e/r.components*r.byteLength;case xy:return t*e*2/r.components*r.byteLength;case wp:return t*e*2/r.components*r.byteLength;case gy:return t*e*3/r.components*r.byteLength;case fi:return t*e*4/r.components*r.byteLength;case Tp:return t*e*4/r.components*r.byteLength;case Ql:case Jl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case eu:case tu:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Od:case zd:return Math.max(t,16)*Math.max(e,8)/4;case Fd:case kd:return Math.max(t,8)*Math.max(e,8)/2;case Bd:case Hd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Vd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Gd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Wd:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case jd:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Xd:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Yd:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case $d:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case qd:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Kd:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Zd:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Qd:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Jd:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case eh:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case th:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case nh:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case nu:case ih:case rh:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Sy:case sh:return Math.ceil(t/4)*Math.ceil(e/4)*8;case ah:case oh:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Sb(t){switch(t){case Yi:case dy:return{byteLength:1,components:1};case bo:case hy:case zo:return{byteLength:2,components:1};case Sp:case Mp:return{byteLength:2,components:4};case us:case xp:case Oi:return{byteLength:4,components:1};case py:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function Mb(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new He,c=new WeakMap;let d;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,w){return m?new OffscreenCanvas(b,w):Po("canvas")}function y(b,w,G){let ee=1;const se=Xe(b);if((se.width>G||se.height>G)&&(ee=G/Math.max(se.width,se.height)),ee<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const Q=Math.floor(ee*se.width),De=Math.floor(ee*se.height);d===void 0&&(d=_(Q,De));const me=w?_(Q,De):d;return me.width=Q,me.height=De,me.getContext("2d").drawImage(b,0,0,Q,De),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+Q+"x"+De+")."),me}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),b;return b}function p(b){return b.generateMipmaps&&b.minFilter!==Zn&&b.minFilter!==ci}function f(b){t.generateMipmap(b)}function g(b,w,G,ee,se=!1){if(b!==null){if(t[b]!==void 0)return t[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let Q=w;if(w===t.RED&&(G===t.FLOAT&&(Q=t.R32F),G===t.HALF_FLOAT&&(Q=t.R16F),G===t.UNSIGNED_BYTE&&(Q=t.R8)),w===t.RED_INTEGER&&(G===t.UNSIGNED_BYTE&&(Q=t.R8UI),G===t.UNSIGNED_SHORT&&(Q=t.R16UI),G===t.UNSIGNED_INT&&(Q=t.R32UI),G===t.BYTE&&(Q=t.R8I),G===t.SHORT&&(Q=t.R16I),G===t.INT&&(Q=t.R32I)),w===t.RG&&(G===t.FLOAT&&(Q=t.RG32F),G===t.HALF_FLOAT&&(Q=t.RG16F),G===t.UNSIGNED_BYTE&&(Q=t.RG8)),w===t.RG_INTEGER&&(G===t.UNSIGNED_BYTE&&(Q=t.RG8UI),G===t.UNSIGNED_SHORT&&(Q=t.RG16UI),G===t.UNSIGNED_INT&&(Q=t.RG32UI),G===t.BYTE&&(Q=t.RG8I),G===t.SHORT&&(Q=t.RG16I),G===t.INT&&(Q=t.RG32I)),w===t.RGB_INTEGER&&(G===t.UNSIGNED_BYTE&&(Q=t.RGB8UI),G===t.UNSIGNED_SHORT&&(Q=t.RGB16UI),G===t.UNSIGNED_INT&&(Q=t.RGB32UI),G===t.BYTE&&(Q=t.RGB8I),G===t.SHORT&&(Q=t.RGB16I),G===t.INT&&(Q=t.RGB32I)),w===t.RGBA_INTEGER&&(G===t.UNSIGNED_BYTE&&(Q=t.RGBA8UI),G===t.UNSIGNED_SHORT&&(Q=t.RGBA16UI),G===t.UNSIGNED_INT&&(Q=t.RGBA32UI),G===t.BYTE&&(Q=t.RGBA8I),G===t.SHORT&&(Q=t.RGBA16I),G===t.INT&&(Q=t.RGBA32I)),w===t.RGB&&G===t.UNSIGNED_INT_5_9_9_9_REV&&(Q=t.RGB9_E5),w===t.RGBA){const De=se?Fu:pt.getTransfer(ee);G===t.FLOAT&&(Q=t.RGBA32F),G===t.HALF_FLOAT&&(Q=t.RGBA16F),G===t.UNSIGNED_BYTE&&(Q=De===At?t.SRGB8_ALPHA8:t.RGBA8),G===t.UNSIGNED_SHORT_4_4_4_4&&(Q=t.RGBA4),G===t.UNSIGNED_SHORT_5_5_5_1&&(Q=t.RGB5_A1)}return(Q===t.R16F||Q===t.R32F||Q===t.RG16F||Q===t.RG32F||Q===t.RGBA16F||Q===t.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function v(b,w){let G;return b?w===null||w===us||w===ya?G=t.DEPTH24_STENCIL8:w===Oi?G=t.DEPTH32F_STENCIL8:w===bo&&(G=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===us||w===ya?G=t.DEPTH_COMPONENT24:w===Oi?G=t.DEPTH_COMPONENT32F:w===bo&&(G=t.DEPTH_COMPONENT16),G}function M(b,w){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==Zn&&b.minFilter!==ci?Math.log2(Math.max(w.width,w.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?w.mipmaps.length:1}function R(b){const w=b.target;w.removeEventListener("dispose",R),S(w),w.isVideoTexture&&c.delete(w)}function A(b){const w=b.target;w.removeEventListener("dispose",A),B(w)}function S(b){const w=i.get(b);if(w.__webglInit===void 0)return;const G=b.source,ee=h.get(G);if(ee){const se=ee[w.__cacheKey];se.usedTimes--,se.usedTimes===0&&C(b),Object.keys(ee).length===0&&h.delete(G)}i.remove(b)}function C(b){const w=i.get(b);t.deleteTexture(w.__webglTexture);const G=b.source,ee=h.get(G);delete ee[w.__cacheKey],a.memory.textures--}function B(b){const w=i.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(w.__webglFramebuffer[ee]))for(let se=0;se<w.__webglFramebuffer[ee].length;se++)t.deleteFramebuffer(w.__webglFramebuffer[ee][se]);else t.deleteFramebuffer(w.__webglFramebuffer[ee]);w.__webglDepthbuffer&&t.deleteRenderbuffer(w.__webglDepthbuffer[ee])}else{if(Array.isArray(w.__webglFramebuffer))for(let ee=0;ee<w.__webglFramebuffer.length;ee++)t.deleteFramebuffer(w.__webglFramebuffer[ee]);else t.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&t.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&t.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ee=0;ee<w.__webglColorRenderbuffer.length;ee++)w.__webglColorRenderbuffer[ee]&&t.deleteRenderbuffer(w.__webglColorRenderbuffer[ee]);w.__webglDepthRenderbuffer&&t.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const G=b.textures;for(let ee=0,se=G.length;ee<se;ee++){const Q=i.get(G[ee]);Q.__webglTexture&&(t.deleteTexture(Q.__webglTexture),a.memory.textures--),i.remove(G[ee])}i.remove(b)}let x=0;function E(){x=0}function z(){const b=x;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),x+=1,b}function V(b){const w=[];return w.push(b.wrapS),w.push(b.wrapT),w.push(b.wrapR||0),w.push(b.magFilter),w.push(b.minFilter),w.push(b.anisotropy),w.push(b.internalFormat),w.push(b.format),w.push(b.type),w.push(b.generateMipmaps),w.push(b.premultiplyAlpha),w.push(b.flipY),w.push(b.unpackAlignment),w.push(b.colorSpace),w.join()}function j(b,w){const G=i.get(b);if(b.isVideoTexture&&je(b),b.isRenderTargetTexture===!1&&b.version>0&&G.__version!==b.version){const ee=b.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ze(G,b,w);return}}n.bindTexture(t.TEXTURE_2D,G.__webglTexture,t.TEXTURE0+w)}function Z(b,w){const G=i.get(b);if(b.version>0&&G.__version!==b.version){Ze(G,b,w);return}n.bindTexture(t.TEXTURE_2D_ARRAY,G.__webglTexture,t.TEXTURE0+w)}function Y(b,w){const G=i.get(b);if(b.version>0&&G.__version!==b.version){Ze(G,b,w);return}n.bindTexture(t.TEXTURE_3D,G.__webglTexture,t.TEXTURE0+w)}function ne(b,w){const G=i.get(b);if(b.version>0&&G.__version!==b.version){W(G,b,w);return}n.bindTexture(t.TEXTURE_CUBE_MAP,G.__webglTexture,t.TEXTURE0+w)}const P={[Nu]:t.REPEAT,[Qr]:t.CLAMP_TO_EDGE,[Nd]:t.MIRRORED_REPEAT},J={[Zn]:t.NEAREST,[oT]:t.NEAREST_MIPMAP_NEAREST,[ul]:t.NEAREST_MIPMAP_LINEAR,[ci]:t.LINEAR,[jc]:t.LINEAR_MIPMAP_NEAREST,[Jr]:t.LINEAR_MIPMAP_LINEAR},te={[fT]:t.NEVER,[vT]:t.ALWAYS,[dT]:t.LESS,[Ey]:t.LEQUAL,[hT]:t.EQUAL,[gT]:t.GEQUAL,[pT]:t.GREATER,[mT]:t.NOTEQUAL};function le(b,w){if(w.type===Oi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===ci||w.magFilter===jc||w.magFilter===ul||w.magFilter===Jr||w.minFilter===ci||w.minFilter===jc||w.minFilter===ul||w.minFilter===Jr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(b,t.TEXTURE_WRAP_S,P[w.wrapS]),t.texParameteri(b,t.TEXTURE_WRAP_T,P[w.wrapT]),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,P[w.wrapR]),t.texParameteri(b,t.TEXTURE_MAG_FILTER,J[w.magFilter]),t.texParameteri(b,t.TEXTURE_MIN_FILTER,J[w.minFilter]),w.compareFunction&&(t.texParameteri(b,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(b,t.TEXTURE_COMPARE_FUNC,te[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Zn||w.minFilter!==ul&&w.minFilter!==Jr||w.type===Oi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");t.texParameterf(b,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function Ee(b,w){let G=!1;b.__webglInit===void 0&&(b.__webglInit=!0,w.addEventListener("dispose",R));const ee=w.source;let se=h.get(ee);se===void 0&&(se={},h.set(ee,se));const Q=V(w);if(Q!==b.__cacheKey){se[Q]===void 0&&(se[Q]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,G=!0),se[Q].usedTimes++;const De=se[b.__cacheKey];De!==void 0&&(se[b.__cacheKey].usedTimes--,De.usedTimes===0&&C(w)),b.__cacheKey=Q,b.__webglTexture=se[Q].texture}return G}function Ze(b,w,G){let ee=t.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ee=t.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ee=t.TEXTURE_3D);const se=Ee(b,w),Q=w.source;n.bindTexture(ee,b.__webglTexture,t.TEXTURE0+G);const De=i.get(Q);if(Q.version!==De.__version||se===!0){n.activeTexture(t.TEXTURE0+G);const me=pt.getPrimaries(pt.workingColorSpace),_e=w.colorSpace===cr?null:pt.getPrimaries(w.colorSpace),Je=w.colorSpace===cr||me===_e?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Je);let ce=y(w.image,!1,r.maxTextureSize);ce=St(w,ce);const we=s.convert(w.format,w.colorSpace),Ye=s.convert(w.type);let Oe=g(w.internalFormat,we,Ye,w.colorSpace,w.isVideoTexture);le(ee,w);let Re;const rt=w.mipmaps,qe=w.isVideoTexture!==!0,_t=De.__version===void 0||se===!0,I=Q.dataReady,xe=M(w,ce);if(w.isDepthTexture)Oe=v(w.format===xa,w.type),_t&&(qe?n.texStorage2D(t.TEXTURE_2D,1,Oe,ce.width,ce.height):n.texImage2D(t.TEXTURE_2D,0,Oe,ce.width,ce.height,0,we,Ye,null));else if(w.isDataTexture)if(rt.length>0){qe&&_t&&n.texStorage2D(t.TEXTURE_2D,xe,Oe,rt[0].width,rt[0].height);for(let q=0,re=rt.length;q<re;q++)Re=rt[q],qe?I&&n.texSubImage2D(t.TEXTURE_2D,q,0,0,Re.width,Re.height,we,Ye,Re.data):n.texImage2D(t.TEXTURE_2D,q,Oe,Re.width,Re.height,0,we,Ye,Re.data);w.generateMipmaps=!1}else qe?(_t&&n.texStorage2D(t.TEXTURE_2D,xe,Oe,ce.width,ce.height),I&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ce.width,ce.height,we,Ye,ce.data)):n.texImage2D(t.TEXTURE_2D,0,Oe,ce.width,ce.height,0,we,Ye,ce.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){qe&&_t&&n.texStorage3D(t.TEXTURE_2D_ARRAY,xe,Oe,rt[0].width,rt[0].height,ce.depth);for(let q=0,re=rt.length;q<re;q++)if(Re=rt[q],w.format!==fi)if(we!==null)if(qe){if(I)if(w.layerUpdates.size>0){const ye=ov(Re.width,Re.height,w.format,w.type);for(const Me of w.layerUpdates){const ot=Re.data.subarray(Me*ye/Re.data.BYTES_PER_ELEMENT,(Me+1)*ye/Re.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,q,0,0,Me,Re.width,Re.height,1,we,ot,0,0)}w.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,q,0,0,0,Re.width,Re.height,ce.depth,we,Re.data,0,0)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,q,Oe,Re.width,Re.height,ce.depth,0,Re.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qe?I&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,q,0,0,0,Re.width,Re.height,ce.depth,we,Ye,Re.data):n.texImage3D(t.TEXTURE_2D_ARRAY,q,Oe,Re.width,Re.height,ce.depth,0,we,Ye,Re.data)}else{qe&&_t&&n.texStorage2D(t.TEXTURE_2D,xe,Oe,rt[0].width,rt[0].height);for(let q=0,re=rt.length;q<re;q++)Re=rt[q],w.format!==fi?we!==null?qe?I&&n.compressedTexSubImage2D(t.TEXTURE_2D,q,0,0,Re.width,Re.height,we,Re.data):n.compressedTexImage2D(t.TEXTURE_2D,q,Oe,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?I&&n.texSubImage2D(t.TEXTURE_2D,q,0,0,Re.width,Re.height,we,Ye,Re.data):n.texImage2D(t.TEXTURE_2D,q,Oe,Re.width,Re.height,0,we,Ye,Re.data)}else if(w.isDataArrayTexture)if(qe){if(_t&&n.texStorage3D(t.TEXTURE_2D_ARRAY,xe,Oe,ce.width,ce.height,ce.depth),I)if(w.layerUpdates.size>0){const q=ov(ce.width,ce.height,w.format,w.type);for(const re of w.layerUpdates){const ye=ce.data.subarray(re*q/ce.data.BYTES_PER_ELEMENT,(re+1)*q/ce.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,re,ce.width,ce.height,1,we,Ye,ye)}w.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,we,Ye,ce.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Oe,ce.width,ce.height,ce.depth,0,we,Ye,ce.data);else if(w.isData3DTexture)qe?(_t&&n.texStorage3D(t.TEXTURE_3D,xe,Oe,ce.width,ce.height,ce.depth),I&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,we,Ye,ce.data)):n.texImage3D(t.TEXTURE_3D,0,Oe,ce.width,ce.height,ce.depth,0,we,Ye,ce.data);else if(w.isFramebufferTexture){if(_t)if(qe)n.texStorage2D(t.TEXTURE_2D,xe,Oe,ce.width,ce.height);else{let q=ce.width,re=ce.height;for(let ye=0;ye<xe;ye++)n.texImage2D(t.TEXTURE_2D,ye,Oe,q,re,0,we,Ye,null),q>>=1,re>>=1}}else if(rt.length>0){if(qe&&_t){const q=Xe(rt[0]);n.texStorage2D(t.TEXTURE_2D,xe,Oe,q.width,q.height)}for(let q=0,re=rt.length;q<re;q++)Re=rt[q],qe?I&&n.texSubImage2D(t.TEXTURE_2D,q,0,0,we,Ye,Re):n.texImage2D(t.TEXTURE_2D,q,Oe,we,Ye,Re);w.generateMipmaps=!1}else if(qe){if(_t){const q=Xe(ce);n.texStorage2D(t.TEXTURE_2D,xe,Oe,q.width,q.height)}I&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,we,Ye,ce)}else n.texImage2D(t.TEXTURE_2D,0,Oe,we,Ye,ce);p(w)&&f(ee),De.__version=Q.version,w.onUpdate&&w.onUpdate(w)}b.__version=w.version}function W(b,w,G){if(w.image.length!==6)return;const ee=Ee(b,w),se=w.source;n.bindTexture(t.TEXTURE_CUBE_MAP,b.__webglTexture,t.TEXTURE0+G);const Q=i.get(se);if(se.version!==Q.__version||ee===!0){n.activeTexture(t.TEXTURE0+G);const De=pt.getPrimaries(pt.workingColorSpace),me=w.colorSpace===cr?null:pt.getPrimaries(w.colorSpace),_e=w.colorSpace===cr||De===me?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const Je=w.isCompressedTexture||w.image[0].isCompressedTexture,ce=w.image[0]&&w.image[0].isDataTexture,we=[];for(let re=0;re<6;re++)!Je&&!ce?we[re]=y(w.image[re],!0,r.maxCubemapSize):we[re]=ce?w.image[re].image:w.image[re],we[re]=St(w,we[re]);const Ye=we[0],Oe=s.convert(w.format,w.colorSpace),Re=s.convert(w.type),rt=g(w.internalFormat,Oe,Re,w.colorSpace),qe=w.isVideoTexture!==!0,_t=Q.__version===void 0||ee===!0,I=se.dataReady;let xe=M(w,Ye);le(t.TEXTURE_CUBE_MAP,w);let q;if(Je){qe&&_t&&n.texStorage2D(t.TEXTURE_CUBE_MAP,xe,rt,Ye.width,Ye.height);for(let re=0;re<6;re++){q=we[re].mipmaps;for(let ye=0;ye<q.length;ye++){const Me=q[ye];w.format!==fi?Oe!==null?qe?I&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,ye,0,0,Me.width,Me.height,Oe,Me.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,ye,rt,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):qe?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,ye,0,0,Me.width,Me.height,Oe,Re,Me.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,ye,rt,Me.width,Me.height,0,Oe,Re,Me.data)}}}else{if(q=w.mipmaps,qe&&_t){q.length>0&&xe++;const re=Xe(we[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,xe,rt,re.width,re.height)}for(let re=0;re<6;re++)if(ce){qe?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,we[re].width,we[re].height,Oe,Re,we[re].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,rt,we[re].width,we[re].height,0,Oe,Re,we[re].data);for(let ye=0;ye<q.length;ye++){const ot=q[ye].image[re].image;qe?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,ye+1,0,0,ot.width,ot.height,Oe,Re,ot.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,ye+1,rt,ot.width,ot.height,0,Oe,Re,ot.data)}}else{qe?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Oe,Re,we[re]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,rt,Oe,Re,we[re]);for(let ye=0;ye<q.length;ye++){const Me=q[ye];qe?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,ye+1,0,0,Oe,Re,Me.image[re]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,ye+1,rt,Oe,Re,Me.image[re])}}}p(w)&&f(t.TEXTURE_CUBE_MAP),Q.__version=se.version,w.onUpdate&&w.onUpdate(w)}b.__version=w.version}function K(b,w,G,ee,se,Q){const De=s.convert(G.format,G.colorSpace),me=s.convert(G.type),_e=g(G.internalFormat,De,me,G.colorSpace);if(!i.get(w).__hasExternalTextures){const ce=Math.max(1,w.width>>Q),we=Math.max(1,w.height>>Q);se===t.TEXTURE_3D||se===t.TEXTURE_2D_ARRAY?n.texImage3D(se,Q,_e,ce,we,w.depth,0,De,me,null):n.texImage2D(se,Q,_e,ce,we,0,De,me,null)}n.bindFramebuffer(t.FRAMEBUFFER,b),et(w)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ee,se,i.get(G).__webglTexture,0,at(w)):(se===t.TEXTURE_2D||se>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,ee,se,i.get(G).__webglTexture,Q),n.bindFramebuffer(t.FRAMEBUFFER,null)}function fe(b,w,G){if(t.bindRenderbuffer(t.RENDERBUFFER,b),w.depthBuffer){const ee=w.depthTexture,se=ee&&ee.isDepthTexture?ee.type:null,Q=v(w.stencilBuffer,se),De=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,me=at(w);et(w)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,me,Q,w.width,w.height):G?t.renderbufferStorageMultisample(t.RENDERBUFFER,me,Q,w.width,w.height):t.renderbufferStorage(t.RENDERBUFFER,Q,w.width,w.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,De,t.RENDERBUFFER,b)}else{const ee=w.textures;for(let se=0;se<ee.length;se++){const Q=ee[se],De=s.convert(Q.format,Q.colorSpace),me=s.convert(Q.type),_e=g(Q.internalFormat,De,me,Q.colorSpace),Je=at(w);G&&et(w)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Je,_e,w.width,w.height):et(w)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Je,_e,w.width,w.height):t.renderbufferStorage(t.RENDERBUFFER,_e,w.width,w.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function de(b,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,b),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),j(w.depthTexture,0);const ee=i.get(w.depthTexture).__webglTexture,se=at(w);if(w.depthTexture.format===aa)et(w)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0,se):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0);else if(w.depthTexture.format===xa)et(w)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0,se):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Be(b){const w=i.get(b),G=b.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==b.depthTexture){const ee=b.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ee){const se=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ee.removeEventListener("dispose",se)};ee.addEventListener("dispose",se),w.__depthDisposeCallback=se}w.__boundDepthTexture=ee}if(b.depthTexture&&!w.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");de(w.__webglFramebuffer,b)}else if(G){w.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer[ee]),w.__webglDepthbuffer[ee]===void 0)w.__webglDepthbuffer[ee]=t.createRenderbuffer(),fe(w.__webglDepthbuffer[ee],b,!1);else{const se=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Q=w.__webglDepthbuffer[ee];t.bindRenderbuffer(t.RENDERBUFFER,Q),t.framebufferRenderbuffer(t.FRAMEBUFFER,se,t.RENDERBUFFER,Q)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=t.createRenderbuffer(),fe(w.__webglDepthbuffer,b,!1);else{const ee=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,se=w.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,se),t.framebufferRenderbuffer(t.FRAMEBUFFER,ee,t.RENDERBUFFER,se)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Fe(b,w,G){const ee=i.get(b);w!==void 0&&K(ee.__webglFramebuffer,b,b.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),G!==void 0&&Be(b)}function We(b){const w=b.texture,G=i.get(b),ee=i.get(w);b.addEventListener("dispose",A);const se=b.textures,Q=b.isWebGLCubeRenderTarget===!0,De=se.length>1;if(De||(ee.__webglTexture===void 0&&(ee.__webglTexture=t.createTexture()),ee.__version=w.version,a.memory.textures++),Q){G.__webglFramebuffer=[];for(let me=0;me<6;me++)if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer[me]=[];for(let _e=0;_e<w.mipmaps.length;_e++)G.__webglFramebuffer[me][_e]=t.createFramebuffer()}else G.__webglFramebuffer[me]=t.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer=[];for(let me=0;me<w.mipmaps.length;me++)G.__webglFramebuffer[me]=t.createFramebuffer()}else G.__webglFramebuffer=t.createFramebuffer();if(De)for(let me=0,_e=se.length;me<_e;me++){const Je=i.get(se[me]);Je.__webglTexture===void 0&&(Je.__webglTexture=t.createTexture(),a.memory.textures++)}if(b.samples>0&&et(b)===!1){G.__webglMultisampledFramebuffer=t.createFramebuffer(),G.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let me=0;me<se.length;me++){const _e=se[me];G.__webglColorRenderbuffer[me]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,G.__webglColorRenderbuffer[me]);const Je=s.convert(_e.format,_e.colorSpace),ce=s.convert(_e.type),we=g(_e.internalFormat,Je,ce,_e.colorSpace,b.isXRRenderTarget===!0),Ye=at(b);t.renderbufferStorageMultisample(t.RENDERBUFFER,Ye,we,b.width,b.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.RENDERBUFFER,G.__webglColorRenderbuffer[me])}t.bindRenderbuffer(t.RENDERBUFFER,null),b.depthBuffer&&(G.__webglDepthRenderbuffer=t.createRenderbuffer(),fe(G.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(Q){n.bindTexture(t.TEXTURE_CUBE_MAP,ee.__webglTexture),le(t.TEXTURE_CUBE_MAP,w);for(let me=0;me<6;me++)if(w.mipmaps&&w.mipmaps.length>0)for(let _e=0;_e<w.mipmaps.length;_e++)K(G.__webglFramebuffer[me][_e],b,w,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+me,_e);else K(G.__webglFramebuffer[me],b,w,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);p(w)&&f(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(De){for(let me=0,_e=se.length;me<_e;me++){const Je=se[me],ce=i.get(Je);n.bindTexture(t.TEXTURE_2D,ce.__webglTexture),le(t.TEXTURE_2D,Je),K(G.__webglFramebuffer,b,Je,t.COLOR_ATTACHMENT0+me,t.TEXTURE_2D,0),p(Je)&&f(t.TEXTURE_2D)}n.unbindTexture()}else{let me=t.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(me=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(me,ee.__webglTexture),le(me,w),w.mipmaps&&w.mipmaps.length>0)for(let _e=0;_e<w.mipmaps.length;_e++)K(G.__webglFramebuffer[_e],b,w,t.COLOR_ATTACHMENT0,me,_e);else K(G.__webglFramebuffer,b,w,t.COLOR_ATTACHMENT0,me,0);p(w)&&f(me),n.unbindTexture()}b.depthBuffer&&Be(b)}function dt(b){const w=b.textures;for(let G=0,ee=w.length;G<ee;G++){const se=w[G];if(p(se)){const Q=b.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,De=i.get(se).__webglTexture;n.bindTexture(Q,De),f(Q),n.unbindTexture()}}}const Ve=[],U=[];function sn(b){if(b.samples>0){if(et(b)===!1){const w=b.textures,G=b.width,ee=b.height;let se=t.COLOR_BUFFER_BIT;const Q=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,De=i.get(b),me=w.length>1;if(me)for(let _e=0;_e<w.length;_e++)n.bindFramebuffer(t.FRAMEBUFFER,De.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,De.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let _e=0;_e<w.length;_e++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(se|=t.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(se|=t.STENCIL_BUFFER_BIT)),me){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,De.__webglColorRenderbuffer[_e]);const Je=i.get(w[_e]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Je,0)}t.blitFramebuffer(0,0,G,ee,0,0,G,ee,se,t.NEAREST),l===!0&&(Ve.length=0,U.length=0,Ve.push(t.COLOR_ATTACHMENT0+_e),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Ve.push(Q),U.push(Q),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,U)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Ve))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),me)for(let _e=0;_e<w.length;_e++){n.bindFramebuffer(t.FRAMEBUFFER,De.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.RENDERBUFFER,De.__webglColorRenderbuffer[_e]);const Je=i.get(w[_e]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,De.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.TEXTURE_2D,Je,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const w=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[w])}}}function at(b){return Math.min(r.maxSamples,b.samples)}function et(b){const w=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function je(b){const w=a.render.frame;c.get(b)!==w&&(c.set(b,w),b.update())}function St(b,w){const G=b.colorSpace,ee=b.format,se=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||G!==Ur&&G!==cr&&(pt.getTransfer(G)===At?(ee!==fi||se!==Yi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),w}function Xe(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(u.width=b.naturalWidth||b.width,u.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(u.width=b.displayWidth,u.height=b.displayHeight):(u.width=b.width,u.height=b.height),u}this.allocateTextureUnit=z,this.resetTextureUnits=E,this.setTexture2D=j,this.setTexture2DArray=Z,this.setTexture3D=Y,this.setTextureCube=ne,this.rebindTextures=Fe,this.setupRenderTarget=We,this.updateRenderTargetMipmap=dt,this.updateMultisampleRenderTarget=sn,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=K,this.useMultisampledRTT=et}function Eb(t,e){function n(i,r=cr){let s;const a=pt.getTransfer(r);if(i===Yi)return t.UNSIGNED_BYTE;if(i===Sp)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Mp)return t.UNSIGNED_SHORT_5_5_5_1;if(i===py)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===dy)return t.BYTE;if(i===hy)return t.SHORT;if(i===bo)return t.UNSIGNED_SHORT;if(i===xp)return t.INT;if(i===us)return t.UNSIGNED_INT;if(i===Oi)return t.FLOAT;if(i===zo)return t.HALF_FLOAT;if(i===my)return t.ALPHA;if(i===gy)return t.RGB;if(i===fi)return t.RGBA;if(i===vy)return t.LUMINANCE;if(i===_y)return t.LUMINANCE_ALPHA;if(i===aa)return t.DEPTH_COMPONENT;if(i===xa)return t.DEPTH_STENCIL;if(i===yy)return t.RED;if(i===Ep)return t.RED_INTEGER;if(i===xy)return t.RG;if(i===wp)return t.RG_INTEGER;if(i===Tp)return t.RGBA_INTEGER;if(i===Ql||i===Jl||i===eu||i===tu)if(a===At)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ql)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Jl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===eu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===tu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ql)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Jl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===eu)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===tu)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Fd||i===Od||i===kd||i===zd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Fd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Od)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===kd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===zd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Bd||i===Hd||i===Vd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Bd||i===Hd)return a===At?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Vd)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Gd||i===Wd||i===jd||i===Xd||i===Yd||i===$d||i===qd||i===Kd||i===Zd||i===Qd||i===Jd||i===eh||i===th||i===nh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Gd)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Wd)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===jd)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Xd)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Yd)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===$d)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===qd)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Kd)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Zd)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Qd)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Jd)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===eh)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===th)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===nh)return a===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===nu||i===ih||i===rh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===nu)return a===At?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ih)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===rh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Sy||i===sh||i===ah||i===oh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===nu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===sh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ah)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===oh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ya?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class wb extends $n{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ks extends Ot{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Tb={type:"move"};class Sf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ks,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ks,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ks,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,u=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(u&&e.hand){a=!0;for(const y of e.hand.values()){const p=n.getJointPose(y,i),f=this._getHandJoint(u,y);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const c=u.joints["index-finger-tip"],d=u.joints["thumb-tip"],h=c.position.distanceTo(d.position),m=.02,_=.005;u.inputState.pinching&&h>m+_?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&h<=m-_&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Tb)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Ks;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const Ab=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Rb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Cb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new hn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Rr({vertexShader:Ab,fragmentShader:Rb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new dn(new fc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class bb extends hs{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,u=null,c=null,d=null,h=null,m=null,_=null;const y=new Cb,p=n.getContextAttributes();let f=null,g=null;const v=[],M=[],R=new He;let A=null;const S=new $n;S.layers.enable(1),S.viewport=new Dt;const C=new $n;C.layers.enable(2),C.viewport=new Dt;const B=[S,C],x=new wb;x.layers.enable(1),x.layers.enable(2);let E=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let K=v[W];return K===void 0&&(K=new Sf,v[W]=K),K.getTargetRaySpace()},this.getControllerGrip=function(W){let K=v[W];return K===void 0&&(K=new Sf,v[W]=K),K.getGripSpace()},this.getHand=function(W){let K=v[W];return K===void 0&&(K=new Sf,v[W]=K),K.getHandSpace()};function V(W){const K=M.indexOf(W.inputSource);if(K===-1)return;const fe=v[K];fe!==void 0&&(fe.update(W.inputSource,W.frame,u||a),fe.dispatchEvent({type:W.type,data:W.inputSource}))}function j(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",j),r.removeEventListener("inputsourceschange",Z);for(let W=0;W<v.length;W++){const K=M[W];K!==null&&(M[W]=null,v[W].disconnect(K))}E=null,z=null,y.reset(),e.setRenderTarget(f),m=null,h=null,d=null,r=null,g=null,Ze.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(W){u=W},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",j),r.addEventListener("inputsourceschange",Z),p.xrCompatible!==!0&&await n.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(R),r.renderState.layers===void 0){const K={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,K),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),g=new cs(m.framebufferWidth,m.framebufferHeight,{format:fi,type:Yi,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let K=null,fe=null,de=null;p.depth&&(de=p.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,K=p.stencil?xa:aa,fe=p.stencil?ya:us);const Be={colorFormat:n.RGBA8,depthFormat:de,scaleFactor:s};d=new XRWebGLBinding(r,n),h=d.createProjectionLayer(Be),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),g=new cs(h.textureWidth,h.textureHeight,{format:fi,type:Yi,depthTexture:new Iy(h.textureWidth,h.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}g.isXRRenderTarget=!0,this.setFoveation(l),u=null,a=await r.requestReferenceSpace(o),Ze.setContext(r),Ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function Z(W){for(let K=0;K<W.removed.length;K++){const fe=W.removed[K],de=M.indexOf(fe);de>=0&&(M[de]=null,v[de].disconnect(fe))}for(let K=0;K<W.added.length;K++){const fe=W.added[K];let de=M.indexOf(fe);if(de===-1){for(let Fe=0;Fe<v.length;Fe++)if(Fe>=M.length){M.push(fe),de=Fe;break}else if(M[Fe]===null){M[Fe]=fe,de=Fe;break}if(de===-1)break}const Be=v[de];Be&&Be.connect(fe)}}const Y=new N,ne=new N;function P(W,K,fe){Y.setFromMatrixPosition(K.matrixWorld),ne.setFromMatrixPosition(fe.matrixWorld);const de=Y.distanceTo(ne),Be=K.projectionMatrix.elements,Fe=fe.projectionMatrix.elements,We=Be[14]/(Be[10]-1),dt=Be[14]/(Be[10]+1),Ve=(Be[9]+1)/Be[5],U=(Be[9]-1)/Be[5],sn=(Be[8]-1)/Be[0],at=(Fe[8]+1)/Fe[0],et=We*sn,je=We*at,St=de/(-sn+at),Xe=St*-sn;if(K.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Xe),W.translateZ(St),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Be[10]===-1)W.projectionMatrix.copy(K.projectionMatrix),W.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const b=We+St,w=dt+St,G=et-Xe,ee=je+(de-Xe),se=Ve*dt/w*b,Q=U*dt/w*b;W.projectionMatrix.makePerspective(G,ee,se,Q,b,w),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function J(W,K){K===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(K.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;let K=W.near,fe=W.far;y.texture!==null&&(y.depthNear>0&&(K=y.depthNear),y.depthFar>0&&(fe=y.depthFar)),x.near=C.near=S.near=K,x.far=C.far=S.far=fe,(E!==x.near||z!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),E=x.near,z=x.far);const de=W.parent,Be=x.cameras;J(x,de);for(let Fe=0;Fe<Be.length;Fe++)J(Be[Fe],de);Be.length===2?P(x,S,C):x.projectionMatrix.copy(S.projectionMatrix),te(W,x,de)};function te(W,K,fe){fe===null?W.matrix.copy(K.matrixWorld):(W.matrix.copy(fe.matrixWorld),W.matrix.invert(),W.matrix.multiply(K.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(K.projectionMatrix),W.projectionMatrixInverse.copy(K.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=uh*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(W){l=W,h!==null&&(h.fixedFoveation=W),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=W)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(x)};let le=null;function Ee(W,K){if(c=K.getViewerPose(u||a),_=K,c!==null){const fe=c.views;m!==null&&(e.setRenderTargetFramebuffer(g,m.framebuffer),e.setRenderTarget(g));let de=!1;fe.length!==x.cameras.length&&(x.cameras.length=0,de=!0);for(let Fe=0;Fe<fe.length;Fe++){const We=fe[Fe];let dt=null;if(m!==null)dt=m.getViewport(We);else{const U=d.getViewSubImage(h,We);dt=U.viewport,Fe===0&&(e.setRenderTargetTextures(g,U.colorTexture,h.ignoreDepthValues?void 0:U.depthStencilTexture),e.setRenderTarget(g))}let Ve=B[Fe];Ve===void 0&&(Ve=new $n,Ve.layers.enable(Fe),Ve.viewport=new Dt,B[Fe]=Ve),Ve.matrix.fromArray(We.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(We.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(dt.x,dt.y,dt.width,dt.height),Fe===0&&(x.matrix.copy(Ve.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),de===!0&&x.cameras.push(Ve)}const Be=r.enabledFeatures;if(Be&&Be.includes("depth-sensing")){const Fe=d.getDepthInformation(fe[0]);Fe&&Fe.isValid&&Fe.texture&&y.init(e,Fe,r.renderState)}}for(let fe=0;fe<v.length;fe++){const de=M[fe],Be=v[fe];de!==null&&Be!==void 0&&Be.update(de,K,u||a)}le&&le(W,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),_=null}const Ze=new Uy;Ze.setAnimationLoop(Ee),this.setAnimationLoop=function(W){le=W},this.dispose=function(){}}}const zr=new fn,Pb=new wt;function Lb(t,e){function n(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,Py(t)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function r(p,f,g,v,M){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(p,f):f.isMeshToonMaterial?(s(p,f),d(p,f)):f.isMeshPhongMaterial?(s(p,f),c(p,f)):f.isMeshStandardMaterial?(s(p,f),h(p,f),f.isMeshPhysicalMaterial&&m(p,f,M)):f.isMeshMatcapMaterial?(s(p,f),_(p,f)):f.isMeshDepthMaterial?s(p,f):f.isMeshDistanceMaterial?(s(p,f),y(p,f)):f.isMeshNormalMaterial?s(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?l(p,f,g,v):f.isSpriteMaterial?u(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,n(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,n(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,n(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Ln&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,n(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Ln&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,n(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,n(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const g=e.get(f),v=g.envMap,M=g.envMapRotation;v&&(p.envMap.value=v,zr.copy(M),zr.x*=-1,zr.y*=-1,zr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(zr.y*=-1,zr.z*=-1),p.envMapRotation.value.setFromMatrix4(Pb.makeRotationFromEuler(zr)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,n(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,g,v){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*g,p.scale.value=v*.5,f.map&&(p.map.value=f.map,n(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,n(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function u(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,n(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,n(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function h(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,g){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ln&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=g.texture,p.transmissionSamplerSize.value.set(g.width,g.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,f){f.matcap&&(p.matcap.value=f.matcap)}function y(p,f){const g=e.get(f).light;p.referencePosition.value.setFromMatrixPosition(g.matrixWorld),p.nearDistance.value=g.shadow.camera.near,p.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Db(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(g,v){const M=v.program;i.uniformBlockBinding(g,M)}function u(g,v){let M=r[g.id];M===void 0&&(_(g),M=c(g),r[g.id]=M,g.addEventListener("dispose",p));const R=v.program;i.updateUBOMapping(g,R);const A=e.render.frame;s[g.id]!==A&&(h(g),s[g.id]=A)}function c(g){const v=d();g.__bindingPointIndex=v;const M=t.createBuffer(),R=g.__size,A=g.usage;return t.bindBuffer(t.UNIFORM_BUFFER,M),t.bufferData(t.UNIFORM_BUFFER,R,A),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,v,M),M}function d(){for(let g=0;g<o;g++)if(a.indexOf(g)===-1)return a.push(g),g;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(g){const v=r[g.id],M=g.uniforms,R=g.__cache;t.bindBuffer(t.UNIFORM_BUFFER,v);for(let A=0,S=M.length;A<S;A++){const C=Array.isArray(M[A])?M[A]:[M[A]];for(let B=0,x=C.length;B<x;B++){const E=C[B];if(m(E,A,B,R)===!0){const z=E.__offset,V=Array.isArray(E.value)?E.value:[E.value];let j=0;for(let Z=0;Z<V.length;Z++){const Y=V[Z],ne=y(Y);typeof Y=="number"||typeof Y=="boolean"?(E.__data[0]=Y,t.bufferSubData(t.UNIFORM_BUFFER,z+j,E.__data)):Y.isMatrix3?(E.__data[0]=Y.elements[0],E.__data[1]=Y.elements[1],E.__data[2]=Y.elements[2],E.__data[3]=0,E.__data[4]=Y.elements[3],E.__data[5]=Y.elements[4],E.__data[6]=Y.elements[5],E.__data[7]=0,E.__data[8]=Y.elements[6],E.__data[9]=Y.elements[7],E.__data[10]=Y.elements[8],E.__data[11]=0):(Y.toArray(E.__data,j),j+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,z,E.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(g,v,M,R){const A=g.value,S=v+"_"+M;if(R[S]===void 0)return typeof A=="number"||typeof A=="boolean"?R[S]=A:R[S]=A.clone(),!0;{const C=R[S];if(typeof A=="number"||typeof A=="boolean"){if(C!==A)return R[S]=A,!0}else if(C.equals(A)===!1)return C.copy(A),!0}return!1}function _(g){const v=g.uniforms;let M=0;const R=16;for(let S=0,C=v.length;S<C;S++){const B=Array.isArray(v[S])?v[S]:[v[S]];for(let x=0,E=B.length;x<E;x++){const z=B[x],V=Array.isArray(z.value)?z.value:[z.value];for(let j=0,Z=V.length;j<Z;j++){const Y=V[j],ne=y(Y),P=M%R,J=P%ne.boundary,te=P+J;M+=J,te!==0&&R-te<ne.storage&&(M+=R-te),z.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=M,M+=ne.storage}}}const A=M%R;return A>0&&(M+=R-A),g.__size=M,g.__cache={},this}function y(g){const v={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(v.boundary=4,v.storage=4):g.isVector2?(v.boundary=8,v.storage=8):g.isVector3||g.isColor?(v.boundary=16,v.storage=12):g.isVector4?(v.boundary=16,v.storage=16):g.isMatrix3?(v.boundary=48,v.storage=48):g.isMatrix4?(v.boundary=64,v.storage=64):g.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",g),v}function p(g){const v=g.target;v.removeEventListener("dispose",p);const M=a.indexOf(v.__bindingPointIndex);a.splice(M,1),t.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function f(){for(const g in r)t.deleteBuffer(r[g]);a=[],r={},s={}}return{bind:l,update:u,dispose:f}}class Ub{constructor(e={}){const{canvas:n=xT(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=a;const m=new Uint32Array(4),_=new Int32Array(4);let y=null,p=null;const f=[],g=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Yt,this.toneMapping=Er,this.toneMappingExposure=1;const v=this;let M=!1,R=0,A=0,S=null,C=-1,B=null;const x=new Dt,E=new Dt;let z=null;const V=new $e(0);let j=0,Z=n.width,Y=n.height,ne=1,P=null,J=null;const te=new Dt(0,0,Z,Y),le=new Dt(0,0,Z,Y);let Ee=!1;const Ze=new Cp;let W=!1,K=!1;const fe=new wt,de=new wt,Be=new N,Fe=new Dt,We={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let dt=!1;function Ve(){return S===null?ne:1}let U=i;function sn(T,D){return n.getContext(T,D)}try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:c,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${_p}`),n.addEventListener("webglcontextlost",re,!1),n.addEventListener("webglcontextrestored",ye,!1),n.addEventListener("webglcontextcreationerror",Me,!1),U===null){const D="webgl2";if(U=sn(D,T),U===null)throw sn(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let at,et,je,St,Xe,b,w,G,ee,se,Q,De,me,_e,Je,ce,we,Ye,Oe,Re,rt,qe,_t,I;function xe(){at=new kR(U),at.init(),qe=new Eb(U,at),et=new DR(U,at,e,qe),je=new xb(U),et.reverseDepthBuffer&&je.buffers.depth.setReversed(!0),St=new HR(U),Xe=new sb,b=new Mb(U,at,je,Xe,et,qe,St),w=new IR(v),G=new OR(v),ee=new $T(U),_t=new PR(U,ee),se=new zR(U,ee,St,_t),Q=new GR(U,se,ee,St),Oe=new VR(U,et,b),ce=new UR(Xe),De=new rb(v,w,G,at,et,_t,ce),me=new Lb(v,Xe),_e=new ob,Je=new hb(at),Ye=new bR(v,w,G,je,Q,h,l),we=new _b(v,Q,et),I=new Db(U,St,et,je),Re=new LR(U,at,St),rt=new BR(U,at,St),St.programs=De.programs,v.capabilities=et,v.extensions=at,v.properties=Xe,v.renderLists=_e,v.shadowMap=we,v.state=je,v.info=St}xe();const q=new bb(v,U);this.xr=q,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const T=at.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=at.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(T){T!==void 0&&(ne=T,this.setSize(Z,Y,!1))},this.getSize=function(T){return T.set(Z,Y)},this.setSize=function(T,D,k=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=T,Y=D,n.width=Math.floor(T*ne),n.height=Math.floor(D*ne),k===!0&&(n.style.width=T+"px",n.style.height=D+"px"),this.setViewport(0,0,T,D)},this.getDrawingBufferSize=function(T){return T.set(Z*ne,Y*ne).floor()},this.setDrawingBufferSize=function(T,D,k){Z=T,Y=D,ne=k,n.width=Math.floor(T*k),n.height=Math.floor(D*k),this.setViewport(0,0,T,D)},this.getCurrentViewport=function(T){return T.copy(x)},this.getViewport=function(T){return T.copy(te)},this.setViewport=function(T,D,k,H){T.isVector4?te.set(T.x,T.y,T.z,T.w):te.set(T,D,k,H),je.viewport(x.copy(te).multiplyScalar(ne).round())},this.getScissor=function(T){return T.copy(le)},this.setScissor=function(T,D,k,H){T.isVector4?le.set(T.x,T.y,T.z,T.w):le.set(T,D,k,H),je.scissor(E.copy(le).multiplyScalar(ne).round())},this.getScissorTest=function(){return Ee},this.setScissorTest=function(T){je.setScissorTest(Ee=T)},this.setOpaqueSort=function(T){P=T},this.setTransparentSort=function(T){J=T},this.getClearColor=function(T){return T.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor.apply(Ye,arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha.apply(Ye,arguments)},this.clear=function(T=!0,D=!0,k=!0){let H=0;if(T){let F=!1;if(S!==null){const ue=S.texture.format;F=ue===Tp||ue===wp||ue===Ep}if(F){const ue=S.texture.type,he=ue===Yi||ue===us||ue===bo||ue===ya||ue===Sp||ue===Mp,Se=Ye.getClearColor(),Pe=Ye.getClearAlpha(),ze=Se.r,ke=Se.g,Le=Se.b;he?(m[0]=ze,m[1]=ke,m[2]=Le,m[3]=Pe,U.clearBufferuiv(U.COLOR,0,m)):(_[0]=ze,_[1]=ke,_[2]=Le,_[3]=Pe,U.clearBufferiv(U.COLOR,0,_))}else H|=U.COLOR_BUFFER_BIT}D&&(H|=U.DEPTH_BUFFER_BIT,U.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),k&&(H|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",re,!1),n.removeEventListener("webglcontextrestored",ye,!1),n.removeEventListener("webglcontextcreationerror",Me,!1),_e.dispose(),Je.dispose(),Xe.dispose(),w.dispose(),G.dispose(),Q.dispose(),_t.dispose(),I.dispose(),De.dispose(),q.dispose(),q.removeEventListener("sessionstart",Go),q.removeEventListener("sessionend",L),O.stop()};function re(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const T=St.autoReset,D=we.enabled,k=we.autoUpdate,H=we.needsUpdate,F=we.type;xe(),St.autoReset=T,we.enabled=D,we.autoUpdate=k,we.needsUpdate=H,we.type=F}function Me(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ot(T){const D=T.target;D.removeEventListener("dispose",ot),Nt(D)}function Nt(T){en(T),Xe.remove(T)}function en(T){const D=Xe.get(T).programs;D!==void 0&&(D.forEach(function(k){De.releaseProgram(k)}),T.isShaderMaterial&&De.releaseShaderCache(T))}this.renderBufferDirect=function(T,D,k,H,F,ue){D===null&&(D=We);const he=F.isMesh&&F.matrixWorld.determinant()<0,Se=Ie(T,D,k,H,F);je.setMaterial(H,he);let Pe=k.index,ze=1;if(H.wireframe===!0){if(Pe=se.getWireframeAttribute(k),Pe===void 0)return;ze=2}const ke=k.drawRange,Le=k.attributes.position;let ft=ke.start*ze,Ne=(ke.start+ke.count)*ze;ue!==null&&(ft=Math.max(ft,ue.start*ze),Ne=Math.min(Ne,(ue.start+ue.count)*ze)),Pe!==null?(ft=Math.max(ft,0),Ne=Math.min(Ne,Pe.count)):Le!=null&&(ft=Math.max(ft,0),Ne=Math.min(Ne,Le.count));const Ke=Ne-ft;if(Ke<0||Ke===1/0)return;_t.setup(F,H,Se,k,Pe);let Bt,ct=Re;if(Pe!==null&&(Bt=ee.get(Pe),ct=rt,ct.setIndex(Bt)),F.isMesh)H.wireframe===!0?(je.setLineWidth(H.wireframeLinewidth*Ve()),ct.setMode(U.LINES)):ct.setMode(U.TRIANGLES);else if(F.isLine){let ge=H.linewidth;ge===void 0&&(ge=1),je.setLineWidth(ge*Ve()),F.isLineSegments?ct.setMode(U.LINES):F.isLineLoop?ct.setMode(U.LINE_LOOP):ct.setMode(U.LINE_STRIP)}else F.isPoints?ct.setMode(U.POINTS):F.isSprite&&ct.setMode(U.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ct.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(at.get("WEBGL_multi_draw"))ct.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const ge=F._multiDrawStarts,Ct=F._multiDrawCounts,ht=F._multiDrawCount,Dn=Pe?ee.get(Pe).bytesPerElement:1,ms=Xe.get(H).currentProgram.getUniforms();for(let Un=0;Un<ht;Un++)ms.setValue(U,"_gl_DrawID",Un),ct.render(ge[Un]/Dn,Ct[Un])}else if(F.isInstancedMesh)ct.renderInstances(ft,Ke,F.count);else if(k.isInstancedBufferGeometry){const ge=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,Ct=Math.min(k.instanceCount,ge);ct.renderInstances(ft,Ke,Ct)}else ct.render(ft,Ke)};function lt(T,D,k){T.transparent===!0&&T.side===Ii&&T.forceSinglePass===!1?(T.side=Ln,T.needsUpdate=!0,Te(T,D,k),T.side=Xi,T.needsUpdate=!0,Te(T,D,k),T.side=Ii):Te(T,D,k)}this.compile=function(T,D,k=null){k===null&&(k=T),p=Je.get(k),p.init(D),g.push(p),k.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),T!==k&&T.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const H=new Set;return T.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ue=F.material;if(ue)if(Array.isArray(ue))for(let he=0;he<ue.length;he++){const Se=ue[he];lt(Se,k,F),H.add(Se)}else lt(ue,k,F),H.add(ue)}),g.pop(),p=null,H},this.compileAsync=function(T,D,k=null){const H=this.compile(T,D,k);return new Promise(F=>{function ue(){if(H.forEach(function(he){Xe.get(he).currentProgram.isReady()&&H.delete(he)}),H.size===0){F(T);return}setTimeout(ue,10)}at.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let Wt=null;function ti(T){Wt&&Wt(T)}function Go(){O.stop()}function L(){O.start()}const O=new Uy;O.setAnimationLoop(ti),typeof self<"u"&&O.setContext(self),this.setAnimationLoop=function(T){Wt=T,q.setAnimationLoop(T),T===null?O.stop():O.start()},q.addEventListener("sessionstart",Go),q.addEventListener("sessionend",L),this.render=function(T,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(D),D=q.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,D,S),p=Je.get(T,g.length),p.init(D),g.push(p),de.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Ze.setFromProjectionMatrix(de),K=this.localClippingEnabled,W=ce.init(this.clippingPlanes,K),y=_e.get(T,f.length),y.init(),f.push(y),q.enabled===!0&&q.isPresenting===!0){const ue=v.xr.getDepthSensingMesh();ue!==null&&X(ue,D,-1/0,v.sortObjects)}X(T,D,0,v.sortObjects),y.finish(),v.sortObjects===!0&&y.sort(P,J),dt=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,dt&&Ye.addToRenderList(y,T),this.info.render.frame++,W===!0&&ce.beginShadows();const k=p.state.shadowsArray;we.render(k,T,D),W===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=y.opaque,F=y.transmissive;if(p.setupLights(),D.isArrayCamera){const ue=D.cameras;if(F.length>0)for(let he=0,Se=ue.length;he<Se;he++){const Pe=ue[he];pe(H,F,T,Pe)}dt&&Ye.render(T);for(let he=0,Se=ue.length;he<Se;he++){const Pe=ue[he];ae(y,T,Pe,Pe.viewport)}}else F.length>0&&pe(H,F,T,D),dt&&Ye.render(T),ae(y,T,D);S!==null&&(b.updateMultisampleRenderTarget(S),b.updateRenderTargetMipmap(S)),T.isScene===!0&&T.onAfterRender(v,T,D),_t.resetDefaultState(),C=-1,B=null,g.pop(),g.length>0?(p=g[g.length-1],W===!0&&ce.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,f.pop(),f.length>0?y=f[f.length-1]:y=null};function X(T,D,k,H){if(T.visible===!1)return;if(T.layers.test(D.layers)){if(T.isGroup)k=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(D);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Ze.intersectsSprite(T)){H&&Fe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(de);const he=Q.update(T),Se=T.material;Se.visible&&y.push(T,he,Se,k,Fe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Ze.intersectsObject(T))){const he=Q.update(T),Se=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Fe.copy(T.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),Fe.copy(he.boundingSphere.center)),Fe.applyMatrix4(T.matrixWorld).applyMatrix4(de)),Array.isArray(Se)){const Pe=he.groups;for(let ze=0,ke=Pe.length;ze<ke;ze++){const Le=Pe[ze],ft=Se[Le.materialIndex];ft&&ft.visible&&y.push(T,he,ft,k,Fe.z,Le)}}else Se.visible&&y.push(T,he,Se,k,Fe.z,null)}}const ue=T.children;for(let he=0,Se=ue.length;he<Se;he++)X(ue[he],D,k,H)}function ae(T,D,k,H){const F=T.opaque,ue=T.transmissive,he=T.transparent;p.setupLightsView(k),W===!0&&ce.setGlobalState(v.clippingPlanes,k),H&&je.viewport(x.copy(H)),F.length>0&&Ue(F,D,k),ue.length>0&&Ue(ue,D,k),he.length>0&&Ue(he,D,k),je.buffers.depth.setTest(!0),je.buffers.depth.setMask(!0),je.buffers.color.setMask(!0),je.setPolygonOffset(!1)}function pe(T,D,k,H){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new cs(1,1,{generateMipmaps:!0,type:at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float")?zo:Yi,minFilter:Jr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:pt.workingColorSpace}));const ue=p.state.transmissionRenderTarget[H.id],he=H.viewport||x;ue.setSize(he.z,he.w);const Se=v.getRenderTarget();v.setRenderTarget(ue),v.getClearColor(V),j=v.getClearAlpha(),j<1&&v.setClearColor(16777215,.5),v.clear(),dt&&Ye.render(k);const Pe=v.toneMapping;v.toneMapping=Er;const ze=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),W===!0&&ce.setGlobalState(v.clippingPlanes,H),Ue(T,k,H),b.updateMultisampleRenderTarget(ue),b.updateRenderTargetMipmap(ue),at.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let Le=0,ft=D.length;Le<ft;Le++){const Ne=D[Le],Ke=Ne.object,Bt=Ne.geometry,ct=Ne.material,ge=Ne.group;if(ct.side===Ii&&Ke.layers.test(H.layers)){const Ct=ct.side;ct.side=Ln,ct.needsUpdate=!0,Ge(Ke,k,H,Bt,ct,ge),ct.side=Ct,ct.needsUpdate=!0,ke=!0}}ke===!0&&(b.updateMultisampleRenderTarget(ue),b.updateRenderTargetMipmap(ue))}v.setRenderTarget(Se),v.setClearColor(V,j),ze!==void 0&&(H.viewport=ze),v.toneMapping=Pe}function Ue(T,D,k){const H=D.isScene===!0?D.overrideMaterial:null;for(let F=0,ue=T.length;F<ue;F++){const he=T[F],Se=he.object,Pe=he.geometry,ze=H===null?he.material:H,ke=he.group;Se.layers.test(k.layers)&&Ge(Se,D,k,Pe,ze,ke)}}function Ge(T,D,k,H,F,ue){T.onBeforeRender(v,D,k,H,F,ue),T.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(v,D,k,H,T,ue),F.transparent===!0&&F.side===Ii&&F.forceSinglePass===!1?(F.side=Ln,F.needsUpdate=!0,v.renderBufferDirect(k,D,H,F,T,ue),F.side=Xi,F.needsUpdate=!0,v.renderBufferDirect(k,D,H,F,T,ue),F.side=Ii):v.renderBufferDirect(k,D,H,F,T,ue),T.onAfterRender(v,D,k,H,F,ue)}function Te(T,D,k){D.isScene!==!0&&(D=We);const H=Xe.get(T),F=p.state.lights,ue=p.state.shadowsArray,he=F.state.version,Se=De.getParameters(T,F.state,ue,D,k),Pe=De.getProgramCacheKey(Se);let ze=H.programs;H.environment=T.isMeshStandardMaterial?D.environment:null,H.fog=D.fog,H.envMap=(T.isMeshStandardMaterial?G:w).get(T.envMap||H.environment),H.envMapRotation=H.environment!==null&&T.envMap===null?D.environmentRotation:T.envMapRotation,ze===void 0&&(T.addEventListener("dispose",ot),ze=new Map,H.programs=ze);let ke=ze.get(Pe);if(ke!==void 0){if(H.currentProgram===ke&&H.lightsStateVersion===he)return Ae(T,Se),ke}else Se.uniforms=De.getUniforms(T),T.onBeforeCompile(Se,v),ke=De.acquireProgram(Se,Pe),ze.set(Pe,ke),H.uniforms=Se.uniforms;const Le=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Le.clippingPlanes=ce.uniform),Ae(T,Se),H.needsLights=ut(T),H.lightsStateVersion=he,H.needsLights&&(Le.ambientLightColor.value=F.state.ambient,Le.lightProbe.value=F.state.probe,Le.directionalLights.value=F.state.directional,Le.directionalLightShadows.value=F.state.directionalShadow,Le.spotLights.value=F.state.spot,Le.spotLightShadows.value=F.state.spotShadow,Le.rectAreaLights.value=F.state.rectArea,Le.ltc_1.value=F.state.rectAreaLTC1,Le.ltc_2.value=F.state.rectAreaLTC2,Le.pointLights.value=F.state.point,Le.pointLightShadows.value=F.state.pointShadow,Le.hemisphereLights.value=F.state.hemi,Le.directionalShadowMap.value=F.state.directionalShadowMap,Le.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Le.spotShadowMap.value=F.state.spotShadowMap,Le.spotLightMatrix.value=F.state.spotLightMatrix,Le.spotLightMap.value=F.state.spotLightMap,Le.pointShadowMap.value=F.state.pointShadowMap,Le.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=ke,H.uniformsList=null,ke}function be(T){if(T.uniformsList===null){const D=T.currentProgram.getUniforms();T.uniformsList=su.seqWithValue(D.seq,T.uniforms)}return T.uniformsList}function Ae(T,D){const k=Xe.get(T);k.outputColorSpace=D.outputColorSpace,k.batching=D.batching,k.batchingColor=D.batchingColor,k.instancing=D.instancing,k.instancingColor=D.instancingColor,k.instancingMorph=D.instancingMorph,k.skinning=D.skinning,k.morphTargets=D.morphTargets,k.morphNormals=D.morphNormals,k.morphColors=D.morphColors,k.morphTargetsCount=D.morphTargetsCount,k.numClippingPlanes=D.numClippingPlanes,k.numIntersection=D.numClipIntersection,k.vertexAlphas=D.vertexAlphas,k.vertexTangents=D.vertexTangents,k.toneMapping=D.toneMapping}function Ie(T,D,k,H,F){D.isScene!==!0&&(D=We),b.resetTextureUnits();const ue=D.fog,he=H.isMeshStandardMaterial?D.environment:null,Se=S===null?v.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:Ur,Pe=(H.isMeshStandardMaterial?G:w).get(H.envMap||he),ze=H.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,ke=!!k.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Le=!!k.morphAttributes.position,ft=!!k.morphAttributes.normal,Ne=!!k.morphAttributes.color;let Ke=Er;H.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(Ke=v.toneMapping);const Bt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ct=Bt!==void 0?Bt.length:0,ge=Xe.get(H),Ct=p.state.lights;if(W===!0&&(K===!0||T!==B)){const Gn=T===B&&H.id===C;ce.setState(H,T,Gn)}let ht=!1;H.version===ge.__version?(ge.needsLights&&ge.lightsStateVersion!==Ct.state.version||ge.outputColorSpace!==Se||F.isBatchedMesh&&ge.batching===!1||!F.isBatchedMesh&&ge.batching===!0||F.isBatchedMesh&&ge.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&ge.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&ge.instancing===!1||!F.isInstancedMesh&&ge.instancing===!0||F.isSkinnedMesh&&ge.skinning===!1||!F.isSkinnedMesh&&ge.skinning===!0||F.isInstancedMesh&&ge.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&ge.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&ge.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&ge.instancingMorph===!1&&F.morphTexture!==null||ge.envMap!==Pe||H.fog===!0&&ge.fog!==ue||ge.numClippingPlanes!==void 0&&(ge.numClippingPlanes!==ce.numPlanes||ge.numIntersection!==ce.numIntersection)||ge.vertexAlphas!==ze||ge.vertexTangents!==ke||ge.morphTargets!==Le||ge.morphNormals!==ft||ge.morphColors!==Ne||ge.toneMapping!==Ke||ge.morphTargetsCount!==ct)&&(ht=!0):(ht=!0,ge.__version=H.version);let Dn=ge.currentProgram;ht===!0&&(Dn=Te(H,D,F));let ms=!1,Un=!1,hc=!1;const kt=Dn.getUniforms(),Ki=ge.uniforms;if(je.useProgram(Dn.program)&&(ms=!0,Un=!0,hc=!0),H.id!==C&&(C=H.id,Un=!0),ms||B!==T){et.reverseDepthBuffer?(fe.copy(T.projectionMatrix),MT(fe),ET(fe),kt.setValue(U,"projectionMatrix",fe)):kt.setValue(U,"projectionMatrix",T.projectionMatrix),kt.setValue(U,"viewMatrix",T.matrixWorldInverse);const Gn=kt.map.cameraPosition;Gn!==void 0&&Gn.setValue(U,Be.setFromMatrixPosition(T.matrixWorld)),et.logarithmicDepthBuffer&&kt.setValue(U,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&kt.setValue(U,"isOrthographic",T.isOrthographicCamera===!0),B!==T&&(B=T,Un=!0,hc=!0)}if(F.isSkinnedMesh){kt.setOptional(U,F,"bindMatrix"),kt.setOptional(U,F,"bindMatrixInverse");const Gn=F.skeleton;Gn&&(Gn.boneTexture===null&&Gn.computeBoneTexture(),kt.setValue(U,"boneTexture",Gn.boneTexture,b))}F.isBatchedMesh&&(kt.setOptional(U,F,"batchingTexture"),kt.setValue(U,"batchingTexture",F._matricesTexture,b),kt.setOptional(U,F,"batchingIdTexture"),kt.setValue(U,"batchingIdTexture",F._indirectTexture,b),kt.setOptional(U,F,"batchingColorTexture"),F._colorsTexture!==null&&kt.setValue(U,"batchingColorTexture",F._colorsTexture,b));const pc=k.morphAttributes;if((pc.position!==void 0||pc.normal!==void 0||pc.color!==void 0)&&Oe.update(F,k,Dn),(Un||ge.receiveShadow!==F.receiveShadow)&&(ge.receiveShadow=F.receiveShadow,kt.setValue(U,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Ki.envMap.value=Pe,Ki.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&D.environment!==null&&(Ki.envMapIntensity.value=D.environmentIntensity),Un&&(kt.setValue(U,"toneMappingExposure",v.toneMappingExposure),ge.needsLights&&Qe(Ki,hc),ue&&H.fog===!0&&me.refreshFogUniforms(Ki,ue),me.refreshMaterialUniforms(Ki,H,ne,Y,p.state.transmissionRenderTarget[T.id]),su.upload(U,be(ge),Ki,b)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(su.upload(U,be(ge),Ki,b),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&kt.setValue(U,"center",F.center),kt.setValue(U,"modelViewMatrix",F.modelViewMatrix),kt.setValue(U,"normalMatrix",F.normalMatrix),kt.setValue(U,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Gn=H.uniformsGroups;for(let mc=0,Zy=Gn.length;mc<Zy;mc++){const Np=Gn[mc];I.update(Np,Dn),I.bind(Np,Dn)}}return Dn}function Qe(T,D){T.ambientLightColor.needsUpdate=D,T.lightProbe.needsUpdate=D,T.directionalLights.needsUpdate=D,T.directionalLightShadows.needsUpdate=D,T.pointLights.needsUpdate=D,T.pointLightShadows.needsUpdate=D,T.spotLights.needsUpdate=D,T.spotLightShadows.needsUpdate=D,T.rectAreaLights.needsUpdate=D,T.hemisphereLights.needsUpdate=D}function ut(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(T,D,k){Xe.get(T.texture).__webglTexture=D,Xe.get(T.depthTexture).__webglTexture=k;const H=Xe.get(T);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=k===void 0,H.__autoAllocateDepthBuffer||at.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,D){const k=Xe.get(T);k.__webglFramebuffer=D,k.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(T,D=0,k=0){S=T,R=D,A=k;let H=!0,F=null,ue=!1,he=!1;if(T){const Pe=Xe.get(T);if(Pe.__useDefaultFramebuffer!==void 0)je.bindFramebuffer(U.FRAMEBUFFER,null),H=!1;else if(Pe.__webglFramebuffer===void 0)b.setupRenderTarget(T);else if(Pe.__hasExternalTextures)b.rebindTextures(T,Xe.get(T.texture).__webglTexture,Xe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Le=T.depthTexture;if(Pe.__boundDepthTexture!==Le){if(Le!==null&&Xe.has(Le)&&(T.width!==Le.image.width||T.height!==Le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(T)}}const ze=T.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(he=!0);const ke=Xe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ke[D])?F=ke[D][k]:F=ke[D],ue=!0):T.samples>0&&b.useMultisampledRTT(T)===!1?F=Xe.get(T).__webglMultisampledFramebuffer:Array.isArray(ke)?F=ke[k]:F=ke,x.copy(T.viewport),E.copy(T.scissor),z=T.scissorTest}else x.copy(te).multiplyScalar(ne).floor(),E.copy(le).multiplyScalar(ne).floor(),z=Ee;if(je.bindFramebuffer(U.FRAMEBUFFER,F)&&H&&je.drawBuffers(T,F),je.viewport(x),je.scissor(E),je.setScissorTest(z),ue){const Pe=Xe.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,Pe.__webglTexture,k)}else if(he){const Pe=Xe.get(T.texture),ze=D||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pe.__webglTexture,k||0,ze)}C=-1},this.readRenderTargetPixels=function(T,D,k,H,F,ue,he){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&he!==void 0&&(Se=Se[he]),Se){je.bindFramebuffer(U.FRAMEBUFFER,Se);try{const Pe=T.texture,ze=Pe.format,ke=Pe.type;if(!et.textureFormatReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!et.textureTypeReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=T.width-H&&k>=0&&k<=T.height-F&&U.readPixels(D,k,H,F,qe.convert(ze),qe.convert(ke),ue)}finally{const Pe=S!==null?Xe.get(S).__webglFramebuffer:null;je.bindFramebuffer(U.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(T,D,k,H,F,ue,he){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=Xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&he!==void 0&&(Se=Se[he]),Se){const Pe=T.texture,ze=Pe.format,ke=Pe.type;if(!et.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!et.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=T.width-H&&k>=0&&k<=T.height-F){je.bindFramebuffer(U.FRAMEBUFFER,Se);const Le=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Le),U.bufferData(U.PIXEL_PACK_BUFFER,ue.byteLength,U.STREAM_READ),U.readPixels(D,k,H,F,qe.convert(ze),qe.convert(ke),0);const ft=S!==null?Xe.get(S).__webglFramebuffer:null;je.bindFramebuffer(U.FRAMEBUFFER,ft);const Ne=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await ST(U,Ne,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Le),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ue),U.deleteBuffer(Le),U.deleteSync(Ne),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,D=null,k=0){T.isTexture!==!0&&(ru("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,T=arguments[1]);const H=Math.pow(2,-k),F=Math.floor(T.image.width*H),ue=Math.floor(T.image.height*H),he=D!==null?D.x:0,Se=D!==null?D.y:0;b.setTexture2D(T,0),U.copyTexSubImage2D(U.TEXTURE_2D,k,0,0,he,Se,F,ue),je.unbindTexture()},this.copyTextureToTexture=function(T,D,k=null,H=null,F=0){T.isTexture!==!0&&(ru("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,T=arguments[1],D=arguments[2],F=arguments[3]||0,k=null);let ue,he,Se,Pe,ze,ke;k!==null?(ue=k.max.x-k.min.x,he=k.max.y-k.min.y,Se=k.min.x,Pe=k.min.y):(ue=T.image.width,he=T.image.height,Se=0,Pe=0),H!==null?(ze=H.x,ke=H.y):(ze=0,ke=0);const Le=qe.convert(D.format),ft=qe.convert(D.type);b.setTexture2D(D,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);const Ne=U.getParameter(U.UNPACK_ROW_LENGTH),Ke=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Bt=U.getParameter(U.UNPACK_SKIP_PIXELS),ct=U.getParameter(U.UNPACK_SKIP_ROWS),ge=U.getParameter(U.UNPACK_SKIP_IMAGES),Ct=T.isCompressedTexture?T.mipmaps[F]:T.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,Ct.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ct.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Se),U.pixelStorei(U.UNPACK_SKIP_ROWS,Pe),T.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,F,ze,ke,ue,he,Le,ft,Ct.data):T.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,F,ze,ke,Ct.width,Ct.height,Le,Ct.data):U.texSubImage2D(U.TEXTURE_2D,F,ze,ke,ue,he,Le,ft,Ct),U.pixelStorei(U.UNPACK_ROW_LENGTH,Ne),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ke),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Bt),U.pixelStorei(U.UNPACK_SKIP_ROWS,ct),U.pixelStorei(U.UNPACK_SKIP_IMAGES,ge),F===0&&D.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),je.unbindTexture()},this.copyTextureToTexture3D=function(T,D,k=null,H=null,F=0){T.isTexture!==!0&&(ru("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,H=arguments[1]||null,T=arguments[2],D=arguments[3],F=arguments[4]||0);let ue,he,Se,Pe,ze,ke,Le,ft,Ne;const Ke=T.isCompressedTexture?T.mipmaps[F]:T.image;k!==null?(ue=k.max.x-k.min.x,he=k.max.y-k.min.y,Se=k.max.z-k.min.z,Pe=k.min.x,ze=k.min.y,ke=k.min.z):(ue=Ke.width,he=Ke.height,Se=Ke.depth,Pe=0,ze=0,ke=0),H!==null?(Le=H.x,ft=H.y,Ne=H.z):(Le=0,ft=0,Ne=0);const Bt=qe.convert(D.format),ct=qe.convert(D.type);let ge;if(D.isData3DTexture)b.setTexture3D(D,0),ge=U.TEXTURE_3D;else if(D.isDataArrayTexture||D.isCompressedArrayTexture)b.setTexture2DArray(D,0),ge=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);const Ct=U.getParameter(U.UNPACK_ROW_LENGTH),ht=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Dn=U.getParameter(U.UNPACK_SKIP_PIXELS),ms=U.getParameter(U.UNPACK_SKIP_ROWS),Un=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,Ke.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ke.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Pe),U.pixelStorei(U.UNPACK_SKIP_ROWS,ze),U.pixelStorei(U.UNPACK_SKIP_IMAGES,ke),T.isDataTexture||T.isData3DTexture?U.texSubImage3D(ge,F,Le,ft,Ne,ue,he,Se,Bt,ct,Ke.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(ge,F,Le,ft,Ne,ue,he,Se,Bt,Ke.data):U.texSubImage3D(ge,F,Le,ft,Ne,ue,he,Se,Bt,ct,Ke),U.pixelStorei(U.UNPACK_ROW_LENGTH,Ct),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ht),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Dn),U.pixelStorei(U.UNPACK_SKIP_ROWS,ms),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Un),F===0&&D.generateMipmaps&&U.generateMipmap(ge),je.unbindTexture()},this.initRenderTarget=function(T){Xe.get(T).__webglFramebuffer===void 0&&b.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?b.setTextureCube(T,0):T.isData3DTexture?b.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?b.setTexture2DArray(T,0):b.setTexture2D(T,0),je.unbindTexture()},this.resetState=function(){R=0,A=0,S=null,je.reset(),_t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ki}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===Ap?"display-p3":"srgb",n.unpackColorSpace=pt.workingColorSpace===uc?"display-p3":"srgb"}}class Ib extends Ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fn,this.environmentIntensity=1,this.environmentRotation=new fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class Nb{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=lh,this.updateRanges=[],this.version=0,this.uuid=wr()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,i){e*=this.stride,i*=n.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=n.array[i+r];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const mn=new N;class Bu{constructor(e,n,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,i=this.data.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix4(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.applyNormalMatrix(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.transformDirection(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}getComponent(e,n){let i=this.array[e*this.data.stride+this.offset+n];return this.normalized&&(i=xi(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=yt(i,this.array)),this.data.array[e*this.data.stride+this.offset+n]=i,this}setX(e,n){return this.normalized&&(n=yt(n,this.array)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=yt(n,this.array)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=yt(n,this.array)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=yt(n,this.array)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=xi(n,this.array)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=xi(n,this.array)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=xi(n,this.array)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=xi(n,this.array)),n}setXY(e,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(n=yt(n,this.array),i=yt(i,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this}setXYZ(e,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(n=yt(n,this.array),i=yt(i,this.array),r=yt(r,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=yt(n,this.array),i=yt(i,this.array),r=yt(r,this.array),s=yt(s,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return new pi(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Bu(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Lp extends wi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ds;const Ga=new N,Us=new N,Is=new N,Ns=new He,Wa=new He,zy=new wt,Pl=new N,ja=new N,Ll=new N,lv=new He,Mf=new He,uv=new He;class Gr extends Ot{constructor(e=new Lp){if(super(),this.isSprite=!0,this.type="Sprite",Ds===void 0){Ds=new xn;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Nb(n,5);Ds.setIndex([0,1,2,0,2,3]),Ds.setAttribute("position",new Bu(i,3,0,!1)),Ds.setAttribute("uv",new Bu(i,2,3,!1))}this.geometry=Ds,this.material=e,this.center=new He(.5,.5)}raycast(e,n){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Us.setFromMatrixScale(this.matrixWorld),zy.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Is.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Us.multiplyScalar(-Is.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const a=this.center;Dl(Pl.set(-.5,-.5,0),Is,a,Us,r,s),Dl(ja.set(.5,-.5,0),Is,a,Us,r,s),Dl(Ll.set(.5,.5,0),Is,a,Us,r,s),lv.set(0,0),Mf.set(1,0),uv.set(1,1);let o=e.ray.intersectTriangle(Pl,ja,Ll,!1,Ga);if(o===null&&(Dl(ja.set(-.5,.5,0),Is,a,Us,r,s),Mf.set(0,1),o=e.ray.intersectTriangle(Pl,Ll,ja,!1,Ga),o===null))return;const l=e.ray.origin.distanceTo(Ga);l<e.near||l>e.far||n.push({distance:l,point:Ga.clone(),uv:qn.getInterpolation(Ga,Pl,ja,Ll,lv,Mf,uv,new He),face:null,object:this})}copy(e,n){return super.copy(e,n),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Dl(t,e,n,i,r,s){Ns.subVectors(t,n).addScalar(.5).multiply(i),r!==void 0?(Wa.x=s*Ns.x-r*Ns.y,Wa.y=r*Ns.x+s*Ns.y):Wa.copy(Ns),t.copy(e),t.x+=Wa.x,t.y+=Wa.y,t.applyMatrix4(zy)}class lo extends wi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Hu=new N,Vu=new N,cv=new wt,Xa=new Ho,Ul=new Bo,Ef=new N,fv=new N;class Fb extends Ot{constructor(e=new xn,n=new lo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Hu.fromBufferAttribute(n,r-1),Vu.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Hu.distanceTo(Vu);e.setAttribute("lineDistance",new Mt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ul.copy(i.boundingSphere),Ul.applyMatrix4(r),Ul.radius+=s,e.ray.intersectsSphere(Ul)===!1)return;cv.copy(r).invert(),Xa.copy(e.ray).applyMatrix4(cv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,u=this.isLineSegments?2:1,c=i.index,h=i.attributes.position;if(c!==null){const m=Math.max(0,a.start),_=Math.min(c.count,a.start+a.count);for(let y=m,p=_-1;y<p;y+=u){const f=c.getX(y),g=c.getX(y+1),v=Il(this,e,Xa,l,f,g);v&&n.push(v)}if(this.isLineLoop){const y=c.getX(_-1),p=c.getX(m),f=Il(this,e,Xa,l,y,p);f&&n.push(f)}}else{const m=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let y=m,p=_-1;y<p;y+=u){const f=Il(this,e,Xa,l,y,y+1);f&&n.push(f)}if(this.isLineLoop){const y=Il(this,e,Xa,l,_-1,m);y&&n.push(y)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Il(t,e,n,i,r,s){const a=t.geometry.attributes.position;if(Hu.fromBufferAttribute(a,r),Vu.fromBufferAttribute(a,s),n.distanceSqToSegment(Hu,Vu,Ef,fv)>i)return;Ef.applyMatrix4(t.matrixWorld);const l=e.ray.origin.distanceTo(Ef);if(!(l<e.near||l>e.far))return{distance:l,point:fv.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const dv=new N,hv=new N;class fh extends Fb{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)dv.fromBufferAttribute(n,r),hv.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+dv.distanceTo(hv);e.setAttribute("lineDistance",new Mt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Zs extends wi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const pv=new wt,dh=new Ho,Nl=new Bo,Fl=new N;class au extends Ot{constructor(e=new xn,n=new Zs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Nl.copy(i.boundingSphere),Nl.applyMatrix4(r),Nl.radius+=s,e.ray.intersectsSphere(Nl)===!1)return;pv.copy(r).invert(),dh.copy(e.ray).applyMatrix4(pv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,u=i.index,d=i.attributes.position;if(u!==null){const h=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=h,y=m;_<y;_++){const p=u.getX(_);Fl.fromBufferAttribute(d,p),mv(Fl,p,l,r,e,n,this)}}else{const h=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=h,y=m;_<y;_++)Fl.fromBufferAttribute(d,_),mv(Fl,_,l,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function mv(t,e,n,i,r,s,a){const o=dh.distanceSqToPoint(t);if(o<n){const l=new N;dh.closestPointToPoint(t,l),l.applyMatrix4(i);const u=r.ray.origin.distanceTo(l);if(u<r.near||u>r.far)return;s.push({distance:u,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class By extends hn{constructor(e,n,i,r,s,a,o,l,u){super(e,n,i,r,s,a,o,l,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Dp extends xn{constructor(e=1,n=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const u=this;r=Math.floor(r),s=Math.floor(s);const c=[],d=[],h=[],m=[];let _=0;const y=[],p=i/2;let f=0;g(),a===!1&&(e>0&&v(!0),n>0&&v(!1)),this.setIndex(c),this.setAttribute("position",new Mt(d,3)),this.setAttribute("normal",new Mt(h,3)),this.setAttribute("uv",new Mt(m,2));function g(){const M=new N,R=new N;let A=0;const S=(n-e)/i;for(let C=0;C<=s;C++){const B=[],x=C/s,E=x*(n-e)+e;for(let z=0;z<=r;z++){const V=z/r,j=V*l+o,Z=Math.sin(j),Y=Math.cos(j);R.x=E*Z,R.y=-x*i+p,R.z=E*Y,d.push(R.x,R.y,R.z),M.set(Z,S,Y).normalize(),h.push(M.x,M.y,M.z),m.push(V,1-x),B.push(_++)}y.push(B)}for(let C=0;C<r;C++)for(let B=0;B<s;B++){const x=y[B][C],E=y[B+1][C],z=y[B+1][C+1],V=y[B][C+1];e>0&&(c.push(x,E,V),A+=3),n>0&&(c.push(E,z,V),A+=3)}u.addGroup(f,A,0),f+=A}function v(M){const R=_,A=new He,S=new N;let C=0;const B=M===!0?e:n,x=M===!0?1:-1;for(let z=1;z<=r;z++)d.push(0,p*x,0),h.push(0,x,0),m.push(.5,.5),_++;const E=_;for(let z=0;z<=r;z++){const j=z/r*l+o,Z=Math.cos(j),Y=Math.sin(j);S.x=B*Y,S.y=p*x,S.z=B*Z,d.push(S.x,S.y,S.z),h.push(0,x,0),A.x=Z*.5+.5,A.y=Y*.5*x+.5,m.push(A.x,A.y),_++}for(let z=0;z<r;z++){const V=R+z,j=E+z;M===!0?c.push(j,j+1,V):c.push(j+1,j,V),C+=3}u.addGroup(f,C,M===!0?1:2),f+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dp(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Hy extends wi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new $e(16777215),this.specular=new $e(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=My,this.normalScale=new He(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=yp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const Gu={enabled:!1,files:{},add:function(t,e){this.enabled!==!1&&(this.files[t]=e)},get:function(t){if(this.enabled!==!1)return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};class Ob{constructor(e,n,i){const r=this;let s=!1,a=0,o=0,l;const u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this.itemStart=function(c){o++,s===!1&&r.onStart!==void 0&&r.onStart(c,a,o),s=!0},this.itemEnd=function(c){a++,r.onProgress!==void 0&&r.onProgress(c,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(c){r.onError!==void 0&&r.onError(c)},this.resolveURL=function(c){return l?l(c):c},this.setURLModifier=function(c){return l=c,this},this.addHandler=function(c,d){return u.push(c,d),this},this.removeHandler=function(c){const d=u.indexOf(c);return d!==-1&&u.splice(d,2),this},this.getHandler=function(c){for(let d=0,h=u.length;d<h;d+=2){const m=u[d],_=u[d+1];if(m.global&&(m.lastIndex=0),m.test(c))return _}return null}}}const Vy=new Ob;class ps{constructor(e){this.manager=e!==void 0?e:Vy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,n){const i=this;return new Promise(function(r,s){i.load(e,r,n,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ps.DEFAULT_MATERIAL_NAME="__DEFAULT";const Pi={};class kb extends Error{constructor(e,n){super(e),this.response=n}}class Up extends ps{constructor(e){super(e)}load(e,n,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Gu.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{n&&n(s),this.manager.itemEnd(e)},0),s;if(Pi[e]!==void 0){Pi[e].push({onLoad:n,onProgress:i,onError:r});return}Pi[e]=[],Pi[e].push({onLoad:n,onProgress:i,onError:r});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(u=>{if(u.status===200||u.status===0){if(u.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||u.body===void 0||u.body.getReader===void 0)return u;const c=Pi[e],d=u.body.getReader(),h=u.headers.get("X-File-Size")||u.headers.get("Content-Length"),m=h?parseInt(h):0,_=m!==0;let y=0;const p=new ReadableStream({start(f){g();function g(){d.read().then(({done:v,value:M})=>{if(v)f.close();else{y+=M.byteLength;const R=new ProgressEvent("progress",{lengthComputable:_,loaded:y,total:m});for(let A=0,S=c.length;A<S;A++){const C=c[A];C.onProgress&&C.onProgress(R)}f.enqueue(M),g()}},v=>{f.error(v)})}}});return new Response(p)}else throw new kb(`fetch for "${u.url}" responded with ${u.status}: ${u.statusText}`,u)}).then(u=>{switch(l){case"arraybuffer":return u.arrayBuffer();case"blob":return u.blob();case"document":return u.text().then(c=>new DOMParser().parseFromString(c,o));case"json":return u.json();default:if(o===void 0)return u.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),h=d&&d[1]?d[1].toLowerCase():void 0,m=new TextDecoder(h);return u.arrayBuffer().then(_=>m.decode(_))}}}).then(u=>{Gu.add(e,u);const c=Pi[e];delete Pi[e];for(let d=0,h=c.length;d<h;d++){const m=c[d];m.onLoad&&m.onLoad(u)}}).catch(u=>{const c=Pi[e];if(c===void 0)throw this.manager.itemError(e),u;delete Pi[e];for(let d=0,h=c.length;d<h;d++){const m=c[d];m.onError&&m.onError(u)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class zb extends ps{constructor(e){super(e)}load(e,n,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Gu.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){n&&n(a),s.manager.itemEnd(e)},0),a;const o=Po("img");function l(){c(),Gu.add(e,this),n&&n(this),s.manager.itemEnd(e)}function u(d){c(),r&&r(d),s.manager.itemError(e),s.manager.itemEnd(e)}function c(){o.removeEventListener("load",l,!1),o.removeEventListener("error",u,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",u,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class Bb extends ps{constructor(e){super(e)}load(e,n,i,r){const s=new hn,a=new zb(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,n!==void 0&&n(s)},i,r),s}}class Gy extends Ot{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}class Hb extends Gy{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.groundColor=new $e(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}}const wf=new wt,gv=new N,vv=new N;class Vb{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new He(512,512),this.map=null,this.mapPass=null,this.matrix=new wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cp,this._frameExtents=new He(1,1),this._viewportCount=1,this._viewports=[new Dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;gv.setFromMatrixPosition(e.matrixWorld),n.position.copy(gv),vv.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(vv),n.updateMatrixWorld(),wf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wf),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(wf)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Gb extends Vb{constructor(){super(new bp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wb extends Gy{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.target=new Ot,this.shadow=new Gb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class jb{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let n="";for(let i=0,r=e.length;i<r;i++)n+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(n))}catch{return n}}static extractUrlBase(e){const n=e.lastIndexOf("/");return n===-1?"./":e.slice(0,n+1)}static resolveURL(e,n){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(n)&&/^\//.test(e)&&(n=n.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:n+e)}}class Xb{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=_v(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=_v();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function _v(){return performance.now()}const yv=new wt;class Yb{constructor(e,n,i=0,r=1/0){this.ray=new Ho(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new Rp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return yv.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yv),this}intersectObject(e,n=!0,i=[]){return hh(e,this,i,n),i.sort(xv),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)hh(e[r],this,i,n);return i.sort(xv),i}}function xv(t,e){return t.distance-e.distance}function hh(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let a=0,o=s.length;a<o;a++)hh(s[a],e,n,!0)}}class Sv{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(_n(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class $b extends fh{constructor(e=1){const n=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],r=new xn;r.setAttribute("position",new Mt(n,3)),r.setAttribute("color",new Mt(i,3));const s=new lo({vertexColors:!0,toneMapped:!1});super(r,s),this.type="AxesHelper"}setColors(e,n,i){const r=new $e,s=this.geometry.attributes.color.array;return r.set(e),r.toArray(s,0),r.toArray(s,3),r.set(n),r.toArray(s,6),r.toArray(s,9),r.set(i),r.toArray(s,12),r.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class qb extends hs{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_p}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_p);const Kb=/^[og]\s*(.+)?/,Zb=/^mtllib /,Qb=/^usemtl /,Jb=/^usemap /,Mv=/\s+/,Ev=new N,Tf=new N,wv=new N,Tv=new N,jn=new N,Ol=new $e;function eP(){const t={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,n){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=n!==!1;return}const i=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:n!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(r,s){const a=this._finalize(!1);a&&(a.inherited||a.groupCount<=0)&&this.materials.splice(a.index,1);const o={index:this.materials.length,name:r||"",mtllib:Array.isArray(s)&&s.length>0?s[s.length-1]:"",smooth:a!==void 0?a.smooth:this.smooth,groupStart:a!==void 0?a.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(l){const u={index:typeof l=="number"?l:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return u.clone=this.clone.bind(u),u}};return this.materials.push(o),o},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(r){const s=this.currentMaterial();if(s&&s.groupEnd===-1&&(s.groupEnd=this.geometry.vertices.length/3,s.groupCount=s.groupEnd-s.groupStart,s.inherited=!1),r&&this.materials.length>1)for(let a=this.materials.length-1;a>=0;a--)this.materials[a].groupCount<=0&&this.materials.splice(a,1);return r&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),s}},i&&i.name&&typeof i.clone=="function"){const r=i.clone(0);r.inherited=!0,this.object.materials.push(r)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,n){const i=parseInt(e,10);return(i>=0?i-1:i+n/3)*3},parseNormalIndex:function(e,n){const i=parseInt(e,10);return(i>=0?i-1:i+n/3)*3},parseUVIndex:function(e,n){const i=parseInt(e,10);return(i>=0?i-1:i+n/2)*2},addVertex:function(e,n,i){const r=this.vertices,s=this.object.geometry.vertices;s.push(r[e+0],r[e+1],r[e+2]),s.push(r[n+0],r[n+1],r[n+2]),s.push(r[i+0],r[i+1],r[i+2])},addVertexPoint:function(e){const n=this.vertices;this.object.geometry.vertices.push(n[e+0],n[e+1],n[e+2])},addVertexLine:function(e){const n=this.vertices;this.object.geometry.vertices.push(n[e+0],n[e+1],n[e+2])},addNormal:function(e,n,i){const r=this.normals,s=this.object.geometry.normals;s.push(r[e+0],r[e+1],r[e+2]),s.push(r[n+0],r[n+1],r[n+2]),s.push(r[i+0],r[i+1],r[i+2])},addFaceNormal:function(e,n,i){const r=this.vertices,s=this.object.geometry.normals;Ev.fromArray(r,e),Tf.fromArray(r,n),wv.fromArray(r,i),jn.subVectors(wv,Tf),Tv.subVectors(Ev,Tf),jn.cross(Tv),jn.normalize(),s.push(jn.x,jn.y,jn.z),s.push(jn.x,jn.y,jn.z),s.push(jn.x,jn.y,jn.z)},addColor:function(e,n,i){const r=this.colors,s=this.object.geometry.colors;r[e]!==void 0&&s.push(r[e+0],r[e+1],r[e+2]),r[n]!==void 0&&s.push(r[n+0],r[n+1],r[n+2]),r[i]!==void 0&&s.push(r[i+0],r[i+1],r[i+2])},addUV:function(e,n,i){const r=this.uvs,s=this.object.geometry.uvs;s.push(r[e+0],r[e+1]),s.push(r[n+0],r[n+1]),s.push(r[i+0],r[i+1])},addDefaultUV:function(){const e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){const n=this.uvs;this.object.geometry.uvs.push(n[e+0],n[e+1])},addFace:function(e,n,i,r,s,a,o,l,u){const c=this.vertices.length;let d=this.parseVertexIndex(e,c),h=this.parseVertexIndex(n,c),m=this.parseVertexIndex(i,c);if(this.addVertex(d,h,m),this.addColor(d,h,m),o!==void 0&&o!==""){const _=this.normals.length;d=this.parseNormalIndex(o,_),h=this.parseNormalIndex(l,_),m=this.parseNormalIndex(u,_),this.addNormal(d,h,m)}else this.addFaceNormal(d,h,m);if(r!==void 0&&r!==""){const _=this.uvs.length;d=this.parseUVIndex(r,_),h=this.parseUVIndex(s,_),m=this.parseUVIndex(a,_),this.addUV(d,h,m),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";const n=this.vertices.length;for(let i=0,r=e.length;i<r;i++){const s=this.parseVertexIndex(e[i],n);this.addVertexPoint(s),this.addColor(s)}},addLineGeometry:function(e,n){this.object.geometry.type="Line";const i=this.vertices.length,r=this.uvs.length;for(let s=0,a=e.length;s<a;s++)this.addVertexLine(this.parseVertexIndex(e[s],i));for(let s=0,a=n.length;s<a;s++)this.addUVLine(this.parseUVIndex(n[s],r))}};return t.startObject("",!1),t}class tP extends ps{constructor(e){super(e),this.materials=null}load(e,n,i,r){const s=this,a=new Up(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{n(s.parse(o))}catch(l){r?r(l):console.error(l),s.manager.itemError(e)}},i,r)}setMaterials(e){return this.materials=e,this}parse(e){const n=new eP;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));const i=e.split(`
`);let r=[];for(let o=0,l=i.length;o<l;o++){const u=i[o].trimStart();if(u.length===0)continue;const c=u.charAt(0);if(c!=="#")if(c==="v"){const d=u.split(Mv);switch(d[0]){case"v":n.vertices.push(parseFloat(d[1]),parseFloat(d[2]),parseFloat(d[3])),d.length>=7?(Ol.setRGB(parseFloat(d[4]),parseFloat(d[5]),parseFloat(d[6]),Yt),n.colors.push(Ol.r,Ol.g,Ol.b)):n.colors.push(void 0,void 0,void 0);break;case"vn":n.normals.push(parseFloat(d[1]),parseFloat(d[2]),parseFloat(d[3]));break;case"vt":n.uvs.push(parseFloat(d[1]),parseFloat(d[2]));break}}else if(c==="f"){const h=u.slice(1).trim().split(Mv),m=[];for(let y=0,p=h.length;y<p;y++){const f=h[y];if(f.length>0){const g=f.split("/");m.push(g)}}const _=m[0];for(let y=1,p=m.length-1;y<p;y++){const f=m[y],g=m[y+1];n.addFace(_[0],f[0],g[0],_[1],f[1],g[1],_[2],f[2],g[2])}}else if(c==="l"){const d=u.substring(1).trim().split(" ");let h=[];const m=[];if(u.indexOf("/")===-1)h=d;else for(let _=0,y=d.length;_<y;_++){const p=d[_].split("/");p[0]!==""&&h.push(p[0]),p[1]!==""&&m.push(p[1])}n.addLineGeometry(h,m)}else if(c==="p"){const h=u.slice(1).trim().split(" ");n.addPointGeometry(h)}else if((r=Kb.exec(u))!==null){const d=(" "+r[0].slice(1).trim()).slice(1);n.startObject(d)}else if(Qb.test(u))n.object.startMaterial(u.substring(7).trim(),n.materialLibraries);else if(Zb.test(u))n.materialLibraries.push(u.substring(7).trim());else if(Jb.test(u))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(c==="s"){if(r=u.split(" "),r.length>1){const h=r[1].trim().toLowerCase();n.object.smooth=h!=="0"&&h!=="off"}else n.object.smooth=!0;const d=n.object.currentMaterial();d&&(d.smooth=n.object.smooth)}else{if(u==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+u+'"')}}n.finalize();const s=new Ks;if(s.materialLibraries=[].concat(n.materialLibraries),!(n.objects.length===1&&n.objects[0].geometry.vertices.length===0)===!0)for(let o=0,l=n.objects.length;o<l;o++){const u=n.objects[o],c=u.geometry,d=u.materials,h=c.type==="Line",m=c.type==="Points";let _=!1;if(c.vertices.length===0)continue;const y=new xn;y.setAttribute("position",new Mt(c.vertices,3)),c.normals.length>0&&y.setAttribute("normal",new Mt(c.normals,3)),c.colors.length>0&&(_=!0,y.setAttribute("color",new Mt(c.colors,3))),c.hasUVIndices===!0&&y.setAttribute("uv",new Mt(c.uvs,2));const p=[];for(let g=0,v=d.length;g<v;g++){const M=d[g],R=M.name+"_"+M.smooth+"_"+_;let A=n.materials[R];if(this.materials!==null){if(A=this.materials.create(M.name),h&&A&&!(A instanceof lo)){const S=new lo;wi.prototype.copy.call(S,A),S.color.copy(A.color),A=S}else if(m&&A&&!(A instanceof Zs)){const S=new Zs({size:10,sizeAttenuation:!1});wi.prototype.copy.call(S,A),S.color.copy(A.color),S.map=A.map,A=S}}A===void 0&&(h?A=new lo:m?A=new Zs({size:1,sizeAttenuation:!1}):A=new Hy,A.name=M.name,A.flatShading=!M.smooth,A.vertexColors=_,n.materials[R]=A),p.push(A)}let f;if(p.length>1){for(let g=0,v=d.length;g<v;g++){const M=d[g];y.addGroup(M.groupStart,M.groupCount,g)}h?f=new fh(y,p):m?f=new au(y,p):f=new dn(y,p)}else h?f=new fh(y,p[0]):m?f=new au(y,p[0]):f=new dn(y,p[0]);f.name=u.name,s.add(f)}else if(n.vertices.length>0){const o=new Zs({size:1,sizeAttenuation:!1}),l=new xn;l.setAttribute("position",new Mt(n.vertices,3)),n.colors.length>0&&n.colors[0]!==void 0&&(l.setAttribute("color",new Mt(n.colors,3)),o.vertexColors=!0);const u=new au(l,o);s.add(u)}return s}}class nP extends ps{constructor(e){super(e)}load(e,n,i,r){const s=this,a=this.path===""?jb.extractUrlBase(e):this.path,o=new Up(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){try{n(s.parse(l,a))}catch(u){r?r(u):console.error(u),s.manager.itemError(e)}},i,r)}setMaterialOptions(e){return this.materialOptions=e,this}parse(e,n){const i=e.split(`
`);let r={};const s=/\s+/,a={};for(let l=0;l<i.length;l++){let u=i[l];if(u=u.trim(),u.length===0||u.charAt(0)==="#")continue;const c=u.indexOf(" ");let d=c>=0?u.substring(0,c):u;d=d.toLowerCase();let h=c>=0?u.substring(c+1):"";if(h=h.trim(),d==="newmtl")r={name:h},a[h]=r;else if(d==="ka"||d==="kd"||d==="ks"||d==="ke"){const m=h.split(s,3);r[d]=[parseFloat(m[0]),parseFloat(m[1]),parseFloat(m[2])]}else r[d]=h}const o=new iP(this.resourcePath||n,this.materialOptions);return o.setCrossOrigin(this.crossOrigin),o.setManager(this.manager),o.setMaterials(a),o}}class iP{constructor(e="",n={}){this.baseUrl=e,this.options=n,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.crossOrigin="anonymous",this.side=this.options.side!==void 0?this.options.side:Xi,this.wrap=this.options.wrap!==void 0?this.options.wrap:Nu}setCrossOrigin(e){return this.crossOrigin=e,this}setManager(e){this.manager=e}setMaterials(e){this.materialsInfo=this.convert(e),this.materials={},this.materialsArray=[],this.nameLookup={}}convert(e){if(!this.options)return e;const n={};for(const i in e){const r=e[i],s={};n[i]=s;for(const a in r){let o=!0,l=r[a];const u=a.toLowerCase();switch(u){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(l=[l[0]/255,l[1]/255,l[2]/255]),this.options&&this.options.ignoreZeroRGBs&&l[0]===0&&l[1]===0&&l[2]===0&&(o=!1);break}o&&(s[u]=l)}}return n}preload(){for(const e in this.materialsInfo)this.create(e)}getIndex(e){return this.nameLookup[e]}getAsArray(){let e=0;for(const n in this.materialsInfo)this.materialsArray[e]=this.create(n),this.nameLookup[n]=e,e++;return this.materialsArray}create(e){return this.materials[e]===void 0&&this.createMaterial_(e),this.materials[e]}createMaterial_(e){const n=this,i=this.materialsInfo[e],r={name:e,side:this.side};function s(o,l){return typeof l!="string"||l===""?"":/^https?:\/\//i.test(l)?l:o+l}function a(o,l){if(r[o])return;const u=n.getTextureParams(l,r),c=n.loadTexture(s(n.baseUrl,u.url));c.repeat.copy(u.scale),c.offset.copy(u.offset),c.wrapS=n.wrap,c.wrapT=n.wrap,(o==="map"||o==="emissiveMap")&&(c.colorSpace=Yt),r[o]=c}for(const o in i){const l=i[o];let u;if(l!=="")switch(o.toLowerCase()){case"kd":r.color=pt.toWorkingColorSpace(new $e().fromArray(l),Yt);break;case"ks":r.specular=pt.toWorkingColorSpace(new $e().fromArray(l),Yt);break;case"ke":r.emissive=pt.toWorkingColorSpace(new $e().fromArray(l),Yt);break;case"map_kd":a("map",l);break;case"map_ks":a("specularMap",l);break;case"map_ke":a("emissiveMap",l);break;case"norm":a("normalMap",l);break;case"map_bump":case"bump":a("bumpMap",l);break;case"map_d":a("alphaMap",l),r.transparent=!0;break;case"ns":r.shininess=parseFloat(l);break;case"d":u=parseFloat(l),u<1&&(r.opacity=u,r.transparent=!0);break;case"tr":u=parseFloat(l),this.options&&this.options.invertTrProperty&&(u=1-u),u>0&&(r.opacity=1-u,r.transparent=!0);break}}return this.materials[e]=new Hy(r),this.materials[e]}getTextureParams(e,n){const i={scale:new He(1,1),offset:new He(0,0)},r=e.split(/\s+/);let s;return s=r.indexOf("-bm"),s>=0&&(n.bumpScale=parseFloat(r[s+1]),r.splice(s,2)),s=r.indexOf("-s"),s>=0&&(i.scale.set(parseFloat(r[s+1]),parseFloat(r[s+2])),r.splice(s,4)),s=r.indexOf("-o"),s>=0&&(i.offset.set(parseFloat(r[s+1]),parseFloat(r[s+2])),r.splice(s,4)),i.url=r.join(" ").trim(),i}loadTexture(e,n,i,r,s){const a=this.manager!==void 0?this.manager:Vy;let o=a.getHandler(e);o===null&&(o=new Bb(a)),o.setCrossOrigin&&o.setCrossOrigin(this.crossOrigin);const l=o.load(e,i,r,s);return n!==void 0&&(l.mapping=n),l}}const Av={type:"change"},Ip={type:"start"},Wy={type:"end"},kl=new Ho,Rv=new or,rP=Math.cos(70*yT.DEG2RAD),jt=new N,En=2*Math.PI,xt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Af=1e-6;class sP extends qb{constructor(e,n=null){super(e,n),this.state=xt.NONE,this.enabled=!0,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ra.ROTATE,MIDDLE:ra.DOLLY,RIGHT:ra.PAN},this.touches={ONE:$s.ROTATE,TWO:$s.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Ei,this._lastTargetPosition=new N,this._quat=new Ei().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Sv,this._sphericalDelta=new Sv,this._scale=1,this._panOffset=new N,this._rotateStart=new He,this._rotateEnd=new He,this._rotateDelta=new He,this._panStart=new He,this._panEnd=new He,this._panDelta=new He,this._dollyStart=new He,this._dollyEnd=new He,this._dollyDelta=new He,this._dollyDirection=new N,this._mouse=new He,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=oP.bind(this),this._onPointerDown=aP.bind(this),this._onPointerUp=lP.bind(this),this._onContextMenu=mP.bind(this),this._onMouseWheel=fP.bind(this),this._onKeyDown=dP.bind(this),this._onTouchStart=hP.bind(this),this._onTouchMove=pP.bind(this),this._onMouseDown=uP.bind(this),this._onMouseMove=cP.bind(this),this._interceptControlDown=gP.bind(this),this._interceptControlUp=vP.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Av),this.update(),this.state=xt.NONE}update(e=null){const n=this.object.position;jt.copy(n).sub(this.target),jt.applyQuaternion(this._quat),this._spherical.setFromVector3(jt),this.autoRotate&&this.state===xt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=En:i>Math.PI&&(i-=En),r<-Math.PI?r+=En:r>Math.PI&&(r-=En),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(jt.setFromSpherical(this._spherical),jt.applyQuaternion(this._quatInverse),n.copy(this.target).add(jt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=jt.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new N(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const u=new N(this._mouse.x,this._mouse.y,0);u.unproject(this.object),this.object.position.sub(u).add(o),this.object.updateMatrixWorld(),a=jt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(kl.origin.copy(this.object.position),kl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(kl.direction))<rP?this.object.lookAt(this.target):(Rv.setFromNormalAndCoplanarPoint(this.object.up,this.target),kl.intersectPlane(Rv,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Af||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Af||this._lastTargetPosition.distanceToSquared(this.target)>Af?(this.dispatchEvent(Av),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?En/60*this.autoRotateSpeed*e:En/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){jt.setFromMatrixColumn(n,0),jt.multiplyScalar(-e),this._panOffset.add(jt)}_panUp(e,n){this.screenSpacePanning===!0?jt.setFromMatrixColumn(n,1):(jt.setFromMatrixColumn(n,0),jt.crossVectors(this.object.up,jt)),jt.multiplyScalar(e),this._panOffset.add(jt)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;jt.copy(r).sub(this.target);let s=jt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,a=i.width,o=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(En*this._rotateDelta.x/n.clientHeight),this._rotateUp(En*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(En*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-En*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(En*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-En*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(En*this._rotateDelta.x/n.clientHeight),this._rotateUp(En*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+n.x)*.5,o=(e.pageY+n.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new He,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function aP(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t)))}function oP(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function lP(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Wy),this.state=xt.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function uP(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ra.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=xt.DOLLY;break;case ra.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=xt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=xt.ROTATE}break;case ra.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=xt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=xt.PAN}break;default:this.state=xt.NONE}this.state!==xt.NONE&&this.dispatchEvent(Ip)}function cP(t){switch(this.state){case xt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case xt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case xt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function fP(t){this.enabled===!1||this.enableZoom===!1||this.state!==xt.NONE||(t.preventDefault(),this.dispatchEvent(Ip),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(Wy))}function dP(t){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(t)}function hP(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case $s.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=xt.TOUCH_ROTATE;break;case $s.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=xt.TOUCH_PAN;break;default:this.state=xt.NONE}break;case 2:switch(this.touches.TWO){case $s.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=xt.TOUCH_DOLLY_PAN;break;case $s.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=xt.TOUCH_DOLLY_ROTATE;break;default:this.state=xt.NONE}break;default:this.state=xt.NONE}this.state!==xt.NONE&&this.dispatchEvent(Ip)}function pP(t){switch(this._trackPointer(t),this.state){case xt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case xt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case xt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case xt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=xt.NONE}}function mP(t){this.enabled!==!1&&t.preventDefault()}function gP(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function vP(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class _P extends Ot{constructor(e,n){super(),this.isViewHelper=!0,this.animating=!1,this.center=new N;const i=new $e("#ff4466"),r=new $e("#88ff44"),s=new $e("#4488ff"),a=new $e("#000000"),o={},l=[],u=new Yb,c=new He,d=new Ot,h=new bp(-2,2,2,-2,0,4);h.position.set(0,0,2);const m=new Dp(.04,.04,.8,5).rotateZ(-Math.PI/2).translate(.4,0,0),_=new dn(m,le(i)),y=new dn(m,le(r)),p=new dn(m,le(s));y.rotation.z=Math.PI/2,p.rotation.y=-Math.PI/2,this.add(_),this.add(p),this.add(y);const f=Ee(i),g=Ee(r),v=Ee(s),M=Ee(a),R=new Gr(f),A=new Gr(g),S=new Gr(v),C=new Gr(M),B=new Gr(M),x=new Gr(M);R.position.x=1,A.position.y=1,S.position.z=1,C.position.x=-1,B.position.y=-1,x.position.z=-1,C.material.opacity=.2,B.material.opacity=.2,x.material.opacity=.2,R.userData.type="posX",A.userData.type="posY",S.userData.type="posZ",C.userData.type="negX",B.userData.type="negY",x.userData.type="negZ",this.add(R),this.add(A),this.add(S),this.add(C),this.add(B),this.add(x),l.push(R),l.push(A),l.push(S),l.push(C),l.push(B),l.push(x);const E=new N,z=128,V=2*Math.PI;this.render=function(W){this.quaternion.copy(e.quaternion).invert(),this.updateMatrixWorld(),E.set(0,0,1),E.applyQuaternion(e.quaternion);const K=n.offsetWidth-z;W.clearDepth(),W.getViewport(P),W.setViewport(K,0,z,z),W.render(this,h),W.setViewport(P.x,P.y,P.z,P.w)};const j=new N,Z=new Ei,Y=new Ei,ne=new Ei,P=new Dt;let J=0;this.handleClick=function(W){if(this.animating===!0)return!1;const K=n.getBoundingClientRect(),fe=K.left+(n.offsetWidth-z),de=K.top+(n.offsetHeight-z);c.x=(W.clientX-fe)/(K.right-fe)*2-1,c.y=-((W.clientY-de)/(K.bottom-de))*2+1,u.setFromCamera(c,h);const Be=u.intersectObjects(l);if(Be.length>0){const We=Be[0].object;return te(We,this.center),this.animating=!0,!0}else return!1},this.setLabels=function(W,K,fe){o.labelX=W,o.labelY=K,o.labelZ=fe,Ze()},this.setLabelStyle=function(W,K,fe){o.font=W,o.color=K,o.radius=fe,Ze()},this.update=function(W){const K=W*V;Y.rotateTowards(ne,K),e.position.set(0,0,1).applyQuaternion(Y).multiplyScalar(J).add(this.center),e.quaternion.rotateTowards(Z,K),Y.angleTo(ne)===0&&(this.animating=!1)},this.dispose=function(){m.dispose(),_.material.dispose(),y.material.dispose(),p.material.dispose(),R.material.map.dispose(),A.material.map.dispose(),S.material.map.dispose(),C.material.map.dispose(),B.material.map.dispose(),x.material.map.dispose(),R.material.dispose(),A.material.dispose(),S.material.dispose(),C.material.dispose(),B.material.dispose(),x.material.dispose()};function te(W,K){switch(W.userData.type){case"posX":j.set(1,0,0),Z.setFromEuler(new fn(0,Math.PI*.5,0));break;case"posY":j.set(0,1,0),Z.setFromEuler(new fn(-Math.PI*.5,0,0));break;case"posZ":j.set(0,0,1),Z.setFromEuler(new fn);break;case"negX":j.set(-1,0,0),Z.setFromEuler(new fn(0,-Math.PI*.5,0));break;case"negY":j.set(0,-1,0),Z.setFromEuler(new fn(Math.PI*.5,0,0));break;case"negZ":j.set(0,0,-1),Z.setFromEuler(new fn(0,Math.PI,0));break;default:console.error("ViewHelper: Invalid axis.")}J=e.position.distanceTo(K),j.multiplyScalar(J).add(K),d.position.copy(K),d.lookAt(e.position),Y.copy(d.quaternion),d.lookAt(j),ne.copy(d.quaternion)}function le(W){return new cc({color:W,toneMapped:!1})}function Ee(W,K){const{font:fe="24px Arial",color:de="#000000",radius:Be=14}=o,Fe=document.createElement("canvas");Fe.width=64,Fe.height=64;const We=Fe.getContext("2d");We.beginPath(),We.arc(32,32,Be,0,2*Math.PI),We.closePath(),We.fillStyle=W.getStyle(),We.fill(),K&&(We.font=fe,We.textAlign="center",We.fillStyle=de,We.fillText(K,32,41));const dt=new By(Fe);return dt.colorSpace=Yt,new Lp({map:dt,toneMapped:!1})}function Ze(){R.material.map.dispose(),A.material.map.dispose(),S.material.map.dispose(),R.material.dispose(),A.material.dispose(),S.material.dispose(),R.material=Ee(i,o.labelX),A.material=Ee(r,o.labelY),S.material=Ee(s,o.labelZ)}}}function jy(t){const e=t.clientWidth||1,n=t.clientHeight||1,i=new Ib;i.background=new $e(988970);const r=new $n(50,e/n,.01,1e3);r.position.set(0,0,3);const s=new Ub({antialias:!0});s.setSize(e,n),s.setPixelRatio(window.devicePixelRatio),t.appendChild(s.domElement);const a=new Hb(16777215,4473924,1),o=new Wb(16777215,.8);o.position.set(1,1,1),i.add(a,o);const l=new sP(r,s.domElement);l.enableDamping=!0;const u=yP();i.add(u);const c=new _P(r,s.domElement);return{scene:i,camera:r,renderer:s,controls:l,viewHelper:c,axes:u,clock:new Xb}}function Xy(t){const e=t.clock.getDelta();t.viewHelper.animating&&t.viewHelper.update(e),t.controls.update(),t.renderer.autoClear=!0,t.renderer.render(t.scene,t.camera),t.renderer.autoClear=!1,t.renderer.clearDepth(),t.viewHelper.render(t.renderer),t.renderer.autoClear=!0}function Yy(t,e){return t.viewHelper.handleClick(e)}function $y(t,e){const{camera:n,controls:i,axes:r}=e,s=new Ta().setFromObject(t),a=s.getSize(new N),o=s.getCenter(new N);t.position.sub(o);const l=Math.max(a.x,a.y,a.z)||1;r.scale.setScalar(l*.6);const u=n.fov*Math.PI/180,c=l/2/Math.tan(u/2)*1.6;n.position.set(0,0,c),n.near=c/100,n.far=c*100,n.updateProjectionMatrix(),i.target.set(0,0,0),i.update()}function qy(t){var n;t.viewHelper.dispose(),t.controls.dispose(),t.renderer.dispose();const e=t.renderer.domElement;(n=e.parentElement)==null||n.removeChild(e)}function yP(){const t=new Ks;return t.add(new $b(1)),t.add(Rf("X","#ff5d5d",new N(1.12,0,0))),t.add(Rf("Y","#5dff7a",new N(0,1.12,0))),t.add(Rf("Z","#5d9dff",new N(0,0,1.12))),t}function Rf(t,e,n){const i=document.createElement("canvas");i.width=64,i.height=64;const r=i.getContext("2d");r&&(r.fillStyle=e,r.font="bold 46px sans-serif",r.textAlign="center",r.textBaseline="middle",r.fillText(t,32,32));const s=new Gr(new Lp({map:new By(i),depthTest:!1,transparent:!0}));return s.position.copy(n),s.scale.setScalar(.22),s}function xP(t){t.traverse(e=>{if(!(e instanceof dn))return;const i=(Array.isArray(e.material)?e.material:[e.material]).map(r=>{const s=r.map??null;return s&&(s.colorSpace=Yt),new cc({map:s})});e.material=Array.isArray(e.material)?i:i[0]})}function SP(t,e){t.traverse(n=>{if(n instanceof dn){const i=Array.isArray(n.material)?n.material:[n.material];for(const r of i)r.wireframe=e}})}function MP({scanId:t}){const e=$.useRef(null),n=$.useRef(null),[i,r]=$.useState(null),[s,a]=$.useState(!1);return $.useEffect(()=>{const o=e.current;if(!o)return;const l=jy(o);let u=0;const c=()=>{u=requestAnimationFrame(c),Xy(l)};c();const d=y=>{Yy(l,y)};o.addEventListener("pointerup",d);const h=new ResizeObserver(()=>{const y=o.clientWidth||1,p=o.clientHeight||1;l.camera.aspect=y/p,l.camera.updateProjectionMatrix(),l.renderer.setSize(y,p)});h.observe(o);const m=`/api/files/${t}/processed/`,_=new nP;return _.setPath(m),_.load("mesh.mtl",y=>{y.preload();const p=new tP;p.setMaterials(y),p.setPath(m),p.load("mesh.obj",f=>{xP(f),$y(f,l),l.scene.add(f),n.current=f},void 0,()=>r("Failed to load mesh.obj"))},void 0,()=>r("Failed to load mesh.mtl")),()=>{cancelAnimationFrame(u),o.removeEventListener("pointerup",d),h.disconnect(),qy(l),n.current=null}},[t]),$.useEffect(()=>{n.current&&SP(n.current,s)},[s]),ie.jsxs("div",{className:"relative flex h-[28rem] flex-col",children:[ie.jsx("div",{className:"absolute right-3 top-3 z-10",children:ie.jsxs("button",{type:"button",onClick:()=>a(o=>!o),className:"rounded bg-slate-800 px-3 py-1 text-xs text-slate-200 hover:bg-slate-700",children:["Wireframe: ",s?"on":"off"]})}),i&&ie.jsx("div",{className:"absolute inset-0 z-10 flex items-center justify-center bg-black/60 text-sm text-red-400",children:i}),ie.jsx("div",{ref:e,"data-testid":"obj-viewer-canvas",className:"h-full w-full flex-grow rounded-lg border border-slate-800"})]})}const wn=new $e;class EP extends ps{constructor(e){super(e),this.propertyNameMapping={},this.customPropertyMapping={}}load(e,n,i,r){const s=this,a=new Up(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{n(s.parse(o))}catch(l){r?r(l):console.error(l),s.manager.itemError(e)}},i,r)}setPropertyNameMapping(e){this.propertyNameMapping=e}setCustomPropertyNameMapping(e){this.customPropertyMapping=e}parse(e){function n(p,f=0){const g=/^ply([\s\S]*)end_header(\r\n|\r|\n)/;let v="";const M=g.exec(p);M!==null&&(v=M[1]);const R={comments:[],elements:[],headerLength:f,objInfo:""},A=v.split(/\r\n|\r|\n/);let S;function C(B,x){const E={type:B[0]};return E.type==="list"?(E.name=B[3],E.countType=B[1],E.itemType=B[2]):E.name=B[1],E.name in x&&(E.name=x[E.name]),E}for(let B=0;B<A.length;B++){let x=A[B];if(x=x.trim(),x==="")continue;const E=x.split(/\s+/),z=E.shift();switch(x=E.join(" "),z){case"format":R.format=E[0],R.version=E[1];break;case"comment":R.comments.push(x);break;case"element":S!==void 0&&R.elements.push(S),S={},S.name=E[0],S.count=parseInt(E[1]),S.properties=[];break;case"property":S.properties.push(C(E,y.propertyNameMapping));break;case"obj_info":R.objInfo=x;break;default:console.log("unhandled",z,E)}}return S!==void 0&&R.elements.push(S),R}function i(p,f){switch(f){case"char":case"uchar":case"short":case"ushort":case"int":case"uint":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":return parseInt(p);case"float":case"double":case"float32":case"float64":return parseFloat(p)}}function r(p,f){const g={};for(let v=0;v<p.length;v++){if(f.empty())return null;if(p[v].type==="list"){const M=[],R=i(f.next(),p[v].countType);for(let A=0;A<R;A++){if(f.empty())return null;M.push(i(f.next(),p[v].itemType))}g[p[v].name]=M}else g[p[v].name]=i(f.next(),p[v].type)}return g}function s(){const p={indices:[],vertices:[],normals:[],uvs:[],faceVertexUvs:[],colors:[],faceVertexColors:[]};for(const f of Object.keys(y.customPropertyMapping))p[f]=[];return p}function a(p){const f=p.map(v=>v.name);function g(v){for(let M=0,R=v.length;M<R;M++){const A=v[M];if(f.includes(A))return A}return null}return{attrX:g(["x","px","posx"])||"x",attrY:g(["y","py","posy"])||"y",attrZ:g(["z","pz","posz"])||"z",attrNX:g(["nx","normalx"]),attrNY:g(["ny","normaly"]),attrNZ:g(["nz","normalz"]),attrS:g(["s","u","texture_u","tx"]),attrT:g(["t","v","texture_v","ty"]),attrR:g(["red","diffuse_red","r","diffuse_r"]),attrG:g(["green","diffuse_green","g","diffuse_g"]),attrB:g(["blue","diffuse_blue","b","diffuse_b"])}}function o(p,f){const g=s(),v=/end_header\s+(\S[\s\S]*\S|\S)\s*$/;let M,R;(R=v.exec(p))!==null?M=R[1].split(/\s+/):M=[];const A=new wP(M);e:for(let S=0;S<f.elements.length;S++){const C=f.elements[S],B=a(C.properties);for(let x=0;x<C.count;x++){const E=r(C.properties,A);if(!E)break e;u(g,C.name,E,B)}}return l(g)}function l(p){let f=new xn;p.indices.length>0&&f.setIndex(p.indices),f.setAttribute("position",new Mt(p.vertices,3)),p.normals.length>0&&f.setAttribute("normal",new Mt(p.normals,3)),p.uvs.length>0&&f.setAttribute("uv",new Mt(p.uvs,2)),p.colors.length>0&&f.setAttribute("color",new Mt(p.colors,3)),(p.faceVertexUvs.length>0||p.faceVertexColors.length>0)&&(f=f.toNonIndexed(),p.faceVertexUvs.length>0&&f.setAttribute("uv",new Mt(p.faceVertexUvs,2)),p.faceVertexColors.length>0&&f.setAttribute("color",new Mt(p.faceVertexColors,3)));for(const g of Object.keys(y.customPropertyMapping))p[g].length>0&&f.setAttribute(g,new Mt(p[g],y.customPropertyMapping[g].length));return f.computeBoundingSphere(),f}function u(p,f,g,v){if(f==="vertex"){p.vertices.push(g[v.attrX],g[v.attrY],g[v.attrZ]),v.attrNX!==null&&v.attrNY!==null&&v.attrNZ!==null&&p.normals.push(g[v.attrNX],g[v.attrNY],g[v.attrNZ]),v.attrS!==null&&v.attrT!==null&&p.uvs.push(g[v.attrS],g[v.attrT]),v.attrR!==null&&v.attrG!==null&&v.attrB!==null&&(wn.setRGB(g[v.attrR]/255,g[v.attrG]/255,g[v.attrB]/255,Yt),p.colors.push(wn.r,wn.g,wn.b));for(const M of Object.keys(y.customPropertyMapping))for(const R of y.customPropertyMapping[M])p[M].push(g[R])}else if(f==="face"){const M=g.vertex_indices||g.vertex_index,R=g.texcoord;M.length===3?(p.indices.push(M[0],M[1],M[2]),R&&R.length===6&&(p.faceVertexUvs.push(R[0],R[1]),p.faceVertexUvs.push(R[2],R[3]),p.faceVertexUvs.push(R[4],R[5]))):M.length===4&&(p.indices.push(M[0],M[1],M[3]),p.indices.push(M[1],M[2],M[3])),v.attrR!==null&&v.attrG!==null&&v.attrB!==null&&(wn.setRGB(g[v.attrR]/255,g[v.attrG]/255,g[v.attrB]/255,Yt),p.faceVertexColors.push(wn.r,wn.g,wn.b),p.faceVertexColors.push(wn.r,wn.g,wn.b),p.faceVertexColors.push(wn.r,wn.g,wn.b))}}function c(p,f){const g={};let v=0;for(let M=0;M<f.length;M++){const R=f[M],A=R.valueReader;if(R.type==="list"){const S=[],C=R.countReader.read(p+v);v+=R.countReader.size;for(let B=0;B<C;B++)S.push(A.read(p+v)),v+=A.size;g[R.name]=S}else g[R.name]=A.read(p+v),v+=A.size}return[g,v]}function d(p,f,g){function v(M,R,A){switch(R){case"int8":case"char":return{read:S=>M.getInt8(S),size:1};case"uint8":case"uchar":return{read:S=>M.getUint8(S),size:1};case"int16":case"short":return{read:S=>M.getInt16(S,A),size:2};case"uint16":case"ushort":return{read:S=>M.getUint16(S,A),size:2};case"int32":case"int":return{read:S=>M.getInt32(S,A),size:4};case"uint32":case"uint":return{read:S=>M.getUint32(S,A),size:4};case"float32":case"float":return{read:S=>M.getFloat32(S,A),size:4};case"float64":case"double":return{read:S=>M.getFloat64(S,A),size:8}}}for(let M=0,R=p.length;M<R;M++){const A=p[M];A.type==="list"?(A.countReader=v(f,A.countType,g),A.valueReader=v(f,A.itemType,g)):A.valueReader=v(f,A.type,g)}}function h(p,f){const g=s(),v=f.format==="binary_little_endian",M=new DataView(p,f.headerLength);let R,A=0;for(let S=0;S<f.elements.length;S++){const C=f.elements[S],B=C.properties,x=a(B);d(B,M,v);for(let E=0;E<C.count;E++){R=c(A,B),A+=R[1];const z=R[0];u(g,C.name,z,x)}}return l(g)}function m(p){let f=0,g=!0,v="";const M=[],R=new TextDecoder().decode(p.subarray(0,5)),A=/^ply\r\n/.test(R);do{const S=String.fromCharCode(p[f++]);S!==`
`&&S!=="\r"?v+=S:(v==="end_header"&&(g=!1),v!==""&&(M.push(v),v=""))}while(g&&f<p.length);return A===!0&&f++,{headerText:M.join("\r")+"\r",headerLength:f}}let _;const y=this;if(e instanceof ArrayBuffer){const p=new Uint8Array(e),{headerText:f,headerLength:g}=m(p),v=n(f,g);if(v.format==="ascii"){const M=new TextDecoder().decode(p);_=o(M,v)}else _=h(e,v)}else _=o(e,n(e));return _}}class wP{constructor(e){this.arr=e,this.i=0}empty(){return this.i>=this.arr.length}next(){return this.arr[this.i++]}}function TP({scanId:t}){const e=$.useRef(null),[n,i]=$.useState(null);return $.useEffect(()=>{const r=e.current;if(!r)return;const s=jy(r);let a=0;const o=()=>{a=requestAnimationFrame(o),Xy(s)};o();const l=d=>{Yy(s,d)};r.addEventListener("pointerup",l);const u=new ResizeObserver(()=>{const d=r.clientWidth||1,h=r.clientHeight||1;s.camera.aspect=d/h,s.camera.updateProjectionMatrix(),s.renderer.setSize(d,h)});return u.observe(r),new EP().load(`/api/files/${t}/raw/pointcloud.ply`,d=>{d.computeVertexNormals();const h=new Zs({size:.01,vertexColors:!0}),m=new au(d,h);$y(m,s),s.scene.add(m)},void 0,()=>i("Failed to load pointcloud.ply")),()=>{cancelAnimationFrame(a),r.removeEventListener("pointerup",l),u.disconnect(),qy(s)}},[t]),ie.jsxs("div",{className:"relative flex h-[28rem] flex-col",children:[n&&ie.jsx("div",{className:"absolute inset-0 z-10 flex items-center justify-center bg-black/60 text-sm text-red-400",children:n}),ie.jsx("div",{ref:e,"data-testid":"ply-viewer-canvas",className:"h-full w-full flex-grow rounded-lg border border-slate-800"})]})}const AP="processed/mesh.obj",RP="raw/pointcloud.ply";function CP({scan:t}){return t.processed_files.includes(AP)?ie.jsx(MP,{scanId:t.id}):t.raw_files.includes(RP)?ie.jsx(TP,{scanId:t.id}):ie.jsx("p",{className:"text-slate-400",children:"No 3D model yet — still processing."})}const bP=[{id:"raw",label:"Raw Data"},{id:"viewer",label:"3D Viewer"},{id:"logs",label:"Processing Logs"}];function PP(){const{id:t=""}=CE(),e=ey(),[n,i]=$.useState(null),[r,s]=$.useState("loading"),[a,o]=$.useState(""),[l,u]=$.useState("raw"),[c,d]=$.useState(!1),[h,m]=$.useState(0),_=$.useCallback(async()=>{s("loading");try{i(await pg(t)),s("loaded")}catch(f){o(f instanceof Error?f.message:String(f)),s("error")}},[t]);$.useEffect(()=>{_()},[_]);const y=$.useCallback(async()=>{await pw(t),e("/")},[t,e]),p=$.useCallback(async()=>{d(!0);try{await mw(t),i(f=>f&&{...f,status:"processing",error:void 0});for(let f=0;f<60;f++){await new Promise(v=>setTimeout(v,1200));const g=await pg(t);if(i(g),g.status==="completed"||g.status==="failed"){m(v=>v+1);break}}}catch(f){o(f instanceof Error?f.message:String(f))}finally{d(!1)}},[t]);return r==="loading"?ie.jsx("p",{className:"text-slate-400",children:"Loading scan…"}):r==="error"||!n?ie.jsxs("p",{className:"text-red-400",children:["Failed to load scan: ",a]}):ie.jsxs("div",{children:[ie.jsxs("header",{className:"mb-6 flex flex-wrap items-center gap-4",children:[ie.jsxs("h1",{className:"text-xl font-semibold capitalize text-slate-100",children:[n.mode," scan"]}),ie.jsx(ly,{status:n.status}),ie.jsx("span",{className:"text-sm text-slate-400",children:uy(n.created_at)}),ie.jsxs("div",{className:"ml-auto flex gap-2",children:[ie.jsx("button",{type:"button",onClick:()=>void p(),disabled:c,title:"Re-run processing on this scan's stored raw data",className:"rounded-lg bg-blue-700 px-4 py-2 text-sm text-white hover:bg-blue-600 disabled:opacity-50",children:c?"Reprocessing…":"Reprocess"}),ie.jsx("button",{type:"button",onClick:()=>void y(),disabled:c,className:"rounded-lg bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-600 disabled:opacity-50",children:"Delete"})]})]}),n.error&&ie.jsx("p",{className:"mb-4 rounded-lg border border-red-800 bg-red-950 p-3 text-sm text-red-300",children:n.error}),ie.jsx("nav",{className:"mb-4 flex gap-1 border-b border-slate-800",children:bP.map(f=>ie.jsx("button",{type:"button",onClick:()=>u(f.id),className:`px-4 py-2 text-sm ${l===f.id?"border-b-2 border-blue-500 text-slate-100":"text-slate-400 hover:text-slate-200"}`,children:f.label},f.id))}),l==="raw"&&ie.jsx(Pw,{scan:n}),l==="viewer"&&ie.jsx(CP,{scan:n},h),l==="logs"&&ie.jsx(Tw,{scanId:n.id})]})}function LP(){const[t,e]=$.useState("checking");return $.useEffect(()=>{let n=!0;return gw().then(i=>{n&&e(i.status==="ok"?"ok":"down")}).catch(()=>{n&&e("down")}),()=>{n=!1}},[]),ie.jsxs("div",{className:"max-w-2xl space-y-6",children:[ie.jsx("h1",{className:"text-2xl font-semibold text-slate-100",children:"Settings"}),ie.jsxs("section",{className:"rounded-lg border border-slate-800 bg-slate-900 p-4",children:[ie.jsx("h2",{className:"mb-1 text-sm font-medium text-slate-300",children:"Server health"}),ie.jsx("p",{"data-testid":"health-state",className:t==="ok"?"text-green-400":t==="down"?"text-red-400":"text-slate-400",children:t==="ok"?"Online":t==="down"?"Unreachable":"Checking…"})]}),ie.jsxs("section",{className:"rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400",children:[ie.jsx("h2",{className:"mb-2 text-sm font-medium text-slate-300",children:"Connection"}),ie.jsxs("p",{children:["The server IP and port are configured in the iPhone capture app, not here. This web UI is served from the same Go server and talks to it over the ",ie.jsx("code",{className:"text-slate-300",children:"/api"})," base path."]})]}),ie.jsxs("section",{className:"rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400",children:[ie.jsx("h2",{className:"mb-2 text-sm font-medium text-slate-300",children:"Data"}),ie.jsx("p",{children:"Raw uploads and processed artifacts are stored under the server's data directory. Reconstruction uses COLMAP for the photogrammetry pipeline; processing logs stream live on each scan's detail page."})]})]})}const DP=KE([{path:"/",element:ie.jsx(dw,{}),children:[{index:!0,element:ie.jsx(xw,{})},{path:"scans/:id",element:ie.jsx(PP,{})},{path:"settings",element:ie.jsx(LP,{})}]}]),Ky=document.getElementById("root");if(!Ky)throw new Error("Root element #root not found in index.html");V0(Ky).render(ie.jsx($.StrictMode,{children:ie.jsx(rw,{router:DP})}));
