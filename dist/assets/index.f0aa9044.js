import{d as ee,a as Z,L as de,f as te,_ as m,b as v,aP as X,a8 as ze,r as Se,w as ue,c as V,j as I,ca as Fe,cb as We,u as we,e as Ve,bn as Te,n as Y,bt as Xe,b5 as le,au as ge,aD as Ge,cc as ce,aG as qe,A as Je,K as ke,F as be,bH as Qe,bs as Ye,aB as re,cd as Ze,E as et}from"./index.3614183b.js";import{E as tt,C as nt}from"./EditOutlined.cfe60ffa.js";var at=["noStyle","disabled"],it={border:0,background:"transparent",padding:0,lineHeight:"inherit",display:"inline-block"},ot=ee({compatConfig:{MODE:3},name:"TransButton",inheritAttrs:!1,props:{noStyle:{type:Boolean,default:void 0},onClick:Function,disabled:{type:Boolean,default:void 0},autofocus:{type:Boolean,default:void 0}},setup:function(e,i){var o=i.slots,d=i.emit,r=i.attrs,s=i.expose,u=Z(),g=function(S){var _=S.keyCode;_===X.ENTER&&S.preventDefault()},n=function(S){var _=S.keyCode;_===X.ENTER&&d("click",S)},y=function(S){d("click",S)},E=function(){u.value&&u.value.focus()},k=function(){u.value&&u.value.blur()};return de(function(){e.autofocus&&E()}),s({focus:E,blur:k}),function(){var T,S=e.noStyle,_=e.disabled,c=te(e,at),b={};return S||(b=m({},it)),_&&(b.pointerEvents="none"),v("div",m(m(m({role:"button",tabindex:0,ref:u},c),r),{},{onClick:y,onKeydown:g,onKeyup:n,style:m(m({},b),r.style||{})}),[(T=o.default)===null||T===void 0?void 0:T.call(o)])}}});const Ce=ot;var lt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 000 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z"}}]},name:"enter",theme:"outlined"};const rt=lt;function he(a){for(var e=1;e<arguments.length;e++){var i=arguments[e]!=null?Object(arguments[e]):{},o=Object.keys(i);typeof Object.getOwnPropertySymbols=="function"&&(o=o.concat(Object.getOwnPropertySymbols(i).filter(function(d){return Object.getOwnPropertyDescriptor(i,d).enumerable}))),o.forEach(function(d){st(a,d,i[d])})}return a}function st(a,e,i){return e in a?Object.defineProperty(a,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):a[e]=i,a}var fe=function(e,i){var o=he({},e,i.attrs);return v(ze,he({},o,{icon:rt}),null)};fe.displayName="EnterOutlined";fe.inheritAttrs=!1;const ut=fe;var ct=function(){return{prefixCls:String,value:String,maxlength:Number,autoSize:{type:[Boolean,Object]},onSave:Function,onCancel:Function,onEnd:Function,onChange:Function,originContent:String,direction:String}},dt=ee({compatConfig:{MODE:3},name:"Editable",props:ct(),setup:function(e,i){var o=i.emit,d=i.slots,r=Se({current:e.value||"",lastKeyCode:void 0,inComposition:!1,cancelFlag:!1});ue(function(){return e.value},function(c){r.current=c});var s=Z();de(function(){if(s.value){var c,b=(c=s.value)===null||c===void 0?void 0:c.resizableTextArea,P=b==null?void 0:b.textArea;P.focus();var j=P.value.length;P.setSelectionRange(j,j)}});function u(c){s.value=c}function g(c){var b=c.target.value;r.current=b.replace(/[\r\n]/g,""),o("change",r.current)}function n(){r.inComposition=!0}function y(){r.inComposition=!1}function E(c){var b=c.keyCode;b===X.ENTER&&c.preventDefault(),!r.inComposition&&(r.lastKeyCode=b)}function k(c){var b=c.keyCode,P=c.ctrlKey,j=c.altKey,f=c.metaKey,x=c.shiftKey;r.lastKeyCode===b&&!r.inComposition&&!P&&!j&&!f&&!x&&(b===X.ENTER?(S(),o("end")):b===X.ESC&&(r.current=e.originContent,o("cancel")))}function T(){S()}function S(){o("save",r.current.trim())}var _=V(function(){var c;return c={},I(c,"".concat(e.prefixCls),!0),I(c,"".concat(e.prefixCls,"-edit-content"),!0),I(c,"".concat(e.prefixCls,"-rtl"),e.direction==="rtl"),c});return function(){return v("div",{class:_.value},[v(Fe,{ref:u,maxlength:e.maxlength,value:r.current,onChange:g,onKeydown:E,onKeyup:k,onCompositionstart:n,onCompositionend:y,onBlur:T,rows:1,autoSize:e.autoSize===void 0||e.autoSize},null),d.enterIcon?d.enterIcon({className:"".concat(e.prefixCls,"-edit-content-confirm")}):v(ut,{class:"".concat(e.prefixCls,"-edit-content-confirm")},null)])}}});const ft=dt;var pt=3,vt=8,O,se={padding:0,margin:0,display:"inline",lineHeight:"inherit"};function yt(a){var e=Array.prototype.slice.apply(a);return e.map(function(i){return"".concat(i,": ").concat(a.getPropertyValue(i),";")}).join("")}function _e(a,e){a.setAttribute("aria-hidden","true");var i=window.getComputedStyle(e),o=yt(i);a.setAttribute("style",o),a.style.position="fixed",a.style.left="0",a.style.height="auto",a.style.minHeight="auto",a.style.maxHeight="auto",a.style.paddingTop="0",a.style.paddingBottom="0",a.style.borderTopWidth="0",a.style.borderBottomWidth="0",a.style.top="-999999px",a.style.zIndex="-1000",a.style.textOverflow="clip",a.style.whiteSpace="normal",a.style.webkitLineClamp="none"}function mt(a){var e=document.createElement("div");_e(e,a),e.appendChild(document.createTextNode("text")),document.body.appendChild(e);var i=e.getBoundingClientRect().height;return document.body.removeChild(e),i}const gt=function(a,e,i,o,d){O||(O=document.createElement("div"),O.setAttribute("aria-hidden","true"),document.body.appendChild(O));var r=e.rows,s=e.suffix,u=s===void 0?"":s,g=mt(a),n=Math.round(g*r*100)/100;_e(O,a);var y=We({render:function(){return v("div",{style:se},[v("span",{style:se},[i,u]),v("span",{style:se},[o])])}});y.mount(O);function E(){var f=Math.round(O.getBoundingClientRect().height*100)/100;return f-.1<=n}if(E())return y.unmount(),{content:i,text:O.innerHTML,ellipsis:!1};var k=Array.prototype.slice.apply(O.childNodes[0].childNodes[0].cloneNode(!0).childNodes).filter(function(f){var x=f.nodeType,N=f.data;return x!==vt&&N!==""}),T=Array.prototype.slice.apply(O.childNodes[0].childNodes[1].cloneNode(!0).childNodes);y.unmount();var S=[];O.innerHTML="";var _=document.createElement("span");O.appendChild(_);var c=document.createTextNode(d+u);_.appendChild(c),T.forEach(function(f){O.appendChild(f)});function b(f){_.insertBefore(f,c)}function P(f,x){var N=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,R=arguments.length>3&&arguments[3]!==void 0?arguments[3]:x.length,ae=arguments.length>4&&arguments[4]!==void 0?arguments[4]:0,M=Math.floor((N+R)/2),G=x.slice(0,M);if(f.textContent=G,N>=R-1)for(var H=R;H>=N;H-=1){var F=x.slice(0,H);if(f.textContent=F,E()||!F)return H===x.length?{finished:!1,vNode:x}:{finished:!0,vNode:F}}return E()?P(f,x,M,R,M):P(f,x,N,M,ae)}function j(f){var x=f.nodeType;if(x===pt){var N=f.textContent||"",R=document.createTextNode(N);return b(R),P(R,N)}return{finished:!1,vNode:null}}return k.some(function(f){var x=j(f),N=x.finished,R=x.vNode;return R&&S.push(R),N}),{content:S,text:O.innerHTML,ellipsis:!0}};var bt=["prefixCls","class","direction","component"],Ct=function(){return{prefixCls:String,direction:String,component:String}},ht=ee({name:"ATypography",inheritAttrs:!1,props:Ct(),setup:function(e,i){var o=i.slots,d=i.attrs,r=we("typography",e),s=r.prefixCls,u=r.direction;return function(){var g,n=m(m({},e),d);n.prefixCls,n.class,n.direction;var y=n.component,E=y===void 0?"article":y,k=te(n,bt);return v(E,m({class:Ve(s.value,I({},"".concat(s.value,"-rtl"),u.value==="rtl"),d.class)},k),{default:function(){return[(g=o.default)===null||g===void 0?void 0:g.call(o)]}})}}});const xt=ht;var Et=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var i=document.activeElement,o=[],d=0;d<e.rangeCount;d++)o.push(e.getRangeAt(d));switch(i.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":i.blur();break;default:i=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||o.forEach(function(r){e.addRange(r)}),i&&i.focus()}};const St=Et;var xe={"text/plain":"Text","text/html":"Url",default:"Text"},wt="Copy to clipboard: #{key}, Enter";function Tt(a){var e=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return a.replace(/#{\s*key\s*}/g,e)}function kt(a,e){var i,o,d,r,s,u=!1;e||(e={});var g=e.debug||!1;try{o=St(),d=document.createRange(),r=document.getSelection(),s=document.createElement("span"),s.textContent=a,s.style.all="unset",s.style.position="fixed",s.style.top=0,s.style.clip="rect(0, 0, 0, 0)",s.style.whiteSpace="pre",s.style.webkitUserSelect="text",s.style.MozUserSelect="text",s.style.msUserSelect="text",s.style.userSelect="text",s.addEventListener("copy",function(y){if(y.stopPropagation(),e.format)if(y.preventDefault(),typeof y.clipboardData>"u"){g&&console.warn("unable to use e.clipboardData"),g&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var E=xe[e.format]||xe.default;window.clipboardData.setData(E,a)}else y.clipboardData.clearData(),y.clipboardData.setData(e.format,a);e.onCopy&&(y.preventDefault(),e.onCopy(y.clipboardData))}),document.body.appendChild(s),d.selectNodeContents(s),r.addRange(d);var n=document.execCommand("copy");if(!n)throw new Error("copy command was unsuccessful");u=!0}catch(y){g&&console.error("unable to copy using execCommand: ",y),g&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",a),e.onCopy&&e.onCopy(window.clipboardData),u=!0}catch(E){g&&console.error("unable to copy using clipboardData: ",E),g&&console.error("falling back to prompt"),i=Tt("message"in e?e.message:wt),window.prompt(i,a)}}finally{r&&(typeof r.removeRange=="function"?r.removeRange(d):r.removeAllRanges()),s&&document.body.removeChild(s),o()}return u}var _t=["type","disabled","content","class","style"],Nt=Te("webkitLineClamp"),$t=Te("textOverflow"),Ee="...",Ne=function(){return{editable:{type:[Boolean,Object],default:void 0},copyable:{type:[Boolean,Object],default:void 0},prefixCls:String,component:String,type:String,disabled:{type:Boolean,default:void 0},ellipsis:{type:[Boolean,Object],default:void 0},code:{type:Boolean,default:void 0},mark:{type:Boolean,default:void 0},underline:{type:Boolean,default:void 0},delete:{type:Boolean,default:void 0},strong:{type:Boolean,default:void 0},keyboard:{type:Boolean,default:void 0},content:String,"onUpdate:content":Function}},Ot=ee({compatConfig:{MODE:3},name:"Base",inheritAttrs:!1,props:Ne(),setup:function(e,i){var o=i.slots,d=i.attrs,r=i.emit,s=we("typography",e),u=s.prefixCls,g=s.direction,n=Se({copied:!1,ellipsisText:"",ellipsisContent:null,isEllipsis:!1,expanded:!1,clientRendered:!1,expandStr:"",copyStr:"",copiedStr:"",editStr:"",copyId:void 0,rafId:void 0,prevProps:void 0,originContent:""}),y=Z(),E=Z(),k=V(function(){var t=e.ellipsis;return t?m({rows:1,expandable:!1},Y(t)==="object"?t:null):{}});de(function(){n.clientRendered=!0}),Xe(function(){clearTimeout(n.copyId),le.cancel(n.rafId)}),ue([function(){return k.value.rows},function(){return e.content}],function(){ge(function(){G()})},{flush:"post",deep:!0,immediate:!0}),Ge(function(){e.content===void 0&&(ce(!e.editable,"Typography","When `editable` is enabled, please use `content` instead of children"),ce(!e.ellipsis,"Typography","When `ellipsis` is enabled, please use `content` instead of children"))});function T(){var t,l;return e.ellipsis||e.editable?e.content:(t=y.value)===null||t===void 0||(l=t.$el)===null||l===void 0?void 0:l.innerText}function S(t){var l=k.value.onExpand;n.expanded=!0,l==null||l(t)}function _(t){t.preventDefault(),n.originContent=e.content,M(!0)}function c(t){b(t),M(!1)}function b(t){var l=f.value.onChange;t!==e.content&&(r("update:content",t),l==null||l(t))}function P(){var t,l;(t=(l=f.value).onCancel)===null||t===void 0||t.call(l),M(!1)}function j(t){t.preventDefault(),t.stopPropagation();var l=e.copyable,p=m({},Y(l)==="object"?l:null);p.text===void 0&&(p.text=T()),kt(p.text||""),n.copied=!0,ge(function(){p.onCopy&&p.onCopy(),n.copyId=setTimeout(function(){n.copied=!1},3e3)})}var f=V(function(){var t=e.editable;return t?m({},Y(t)==="object"?t:null):{editing:!1}}),x=qe(!1,{value:V(function(){return f.value.editing})}),N=Je(x,2),R=N[0],ae=N[1];function M(t){var l=f.value.onStart;t&&l&&l(),ae(t)}ue(R,function(t){if(!t){var l;(l=E.value)===null||l===void 0||l.focus()}},{flush:"post"});function G(){le.cancel(n.rafId),n.rafId=le(function(){F()})}var H=V(function(){var t=k.value,l=t.rows,p=t.expandable,C=t.suffix,$=t.onEllipsis,h=t.tooltip;return C||h||e.editable||e.copyable||p||$?!1:l===1?$t:Nt}),F=function(){var l,p,C=n.ellipsisText,$=n.isEllipsis,h=k.value,w=h.rows,D=h.suffix,L=h.onEllipsis;if(!(!w||w<0||!((l=y.value)!==null&&l!==void 0&&l.$el)||n.expanded||e.content===void 0)&&!H.value){var B=gt((p=y.value)===null||p===void 0?void 0:p.$el,{rows:w,suffix:D},e.content,pe(!0),Ee),W=B.content,U=B.text,A=B.ellipsis;(C!==U||n.isEllipsis!==A)&&(n.ellipsisText=U,n.ellipsisContent=W,n.isEllipsis=A,$!==A&&L&&L(A))}};function $e(t,l){var p=t.mark,C=t.code,$=t.underline,h=t.delete,w=t.strong,D=t.keyboard,L=l;function B(W,U){if(!!W){var A=function(){return L}();L=v(U,null,{default:function(){return[A]}})}}return B(w,"strong"),B($,"u"),B(h,"del"),B(C,"code"),B(p,"mark"),B(D,"kbd"),L}function Oe(t){var l=k.value,p=l.expandable,C=l.symbol;if(!p||!t&&(n.expanded||!n.isEllipsis))return null;var $=(o.ellipsisSymbol?o.ellipsisSymbol():C)||n.expandStr;return v("a",{key:"expand",class:"".concat(u.value,"-expand"),onClick:S,"aria-label":n.expandStr},[$])}function Re(){if(!!e.editable){var t=e.editable,l=t.tooltip,p=t.triggerType,C=p===void 0?["icon"]:p,$=o.editableIcon?o.editableIcon():v(tt,{role:"button"},null),h=o.editableTooltip?o.editableTooltip():n.editStr,w=typeof h=="string"?h:"";return C.indexOf("icon")!==-1?v(re,{key:"edit",title:l===!1?"":h},{default:function(){return[v(Ce,{ref:E,class:"".concat(u.value,"-edit"),onClick:_,"aria-label":w},{default:function(){return[$]}})]}}):null}}function De(){if(!!e.copyable){var t=e.copyable.tooltip,l=n.copied?n.copiedStr:n.copyStr,p=o.copyableTooltip?o.copyableTooltip({copied:n.copied}):l,C=typeof p=="string"?p:"",$=n.copied?v(et,null,null):v(nt,null,null),h=o.copyableIcon?o.copyableIcon({copied:!!n.copied}):$;return v(re,{key:"copy",title:t===!1?"":p},{default:function(){return[v(Ce,{class:["".concat(u.value,"-copy"),I({},"".concat(u.value,"-copy-success"),n.copied)],onClick:j,"aria-label":C},{default:function(){return[h]}})]}})}}function Be(){var t=d.class,l=d.style,p=f.value,C=p.maxlength,$=p.autoSize,h=p.onEnd;return v(ft,{class:t,style:l,prefixCls:u.value,value:e.content,originContent:n.originContent,maxlength:C,autoSize:$,onSave:c,onChange:b,onCancel:P,onEnd:h,direction:g.value},{enterIcon:o.editableEnterIcon})}function pe(t){return[Oe(t),Re(),De()].filter(function(l){return l})}return function(){var t,l=f.value.triggerType,p=l===void 0?["icon"]:l,C=e.ellipsis||e.editable?e.content!==void 0?e.content:(t=o.default)===null||t===void 0?void 0:t.call(o):o.default?o.default():e.content;return R.value?Be():v(Ze,{componentName:"Text",children:function(h){var w,D=m(m({},e),d),L=D.type,B=D.disabled;D.content;var W=D.class,U=D.style,A=te(D,_t),q=k.value,K=q.rows,ve=q.suffix,ie=q.tooltip,Pe=h.edit,Ie=h.copy,Le=h.copied,Ae=h.expand;n.editStr=Pe,n.copyStr=Ie,n.copiedStr=Le,n.expandStr=Ae;var Ke=ke(A,["prefixCls","editable","copyable","ellipsis","mark","code","delete","underline","strong","keyboard","onUpdate:content"]),J=H.value,je=K===1&&J,ye=K&&K>1&&J,z=C,Me;if(K&&n.isEllipsis&&!n.expanded&&!J){var oe,me=A.title,Q=me||"";!me&&(typeof C=="string"||typeof C=="number")&&(Q=String(C)),Q=(oe=Q)===null||oe===void 0?void 0:oe.slice(String(n.ellipsisContent||"").length),z=v(be,null,[Qe(n.ellipsisContent),v("span",{title:Q,"aria-hidden":"true"},[Ee]),ve])}else z=v(be,null,[C,ve]);z=$e(e,z);var He=ie&&K&&n.isEllipsis&&!n.expanded&&!J,Ue=o.ellipsisTooltip?o.ellipsisTooltip():ie;return v(Ye,{onResize:G,disabled:!K},{default:function(){return[v(xt,m({ref:y,class:[(w={},I(w,"".concat(u.value,"-").concat(L),L),I(w,"".concat(u.value,"-disabled"),B),I(w,"".concat(u.value,"-ellipsis"),K),I(w,"".concat(u.value,"-single-line"),K===1&&!n.isEllipsis),I(w,"".concat(u.value,"-ellipsis-single-line"),je),I(w,"".concat(u.value,"-ellipsis-multiple-line"),ye),w),W],style:m(m({},U),{},{WebkitLineClamp:ye?K:void 0}),"aria-label":Me,direction:g.value,onClick:p.indexOf("text")!==-1?_:function(){}},Ke),{default:function(){return[He?v(re,{title:ie===!0?C:Ue},{default:function(){return[v("span",null,[z])]}}):z,pe()]}})]}})}},null)}}});const Rt=Ot;var Dt=["ellipsis","rel"],Bt=function(){return ke(m(m({},Ne()),{},{ellipsis:{type:Boolean,default:void 0}}),["component"])},ne=function(e,i){var o=i.slots,d=i.attrs,r=m(m({},e),d),s=r.ellipsis,u=r.rel,g=te(r,Dt);ce(Y(s)!=="object","Typography.Link","`ellipsis` only supports boolean value.");var n=m(m({},g),{},{rel:u===void 0&&g.target==="_blank"?"noopener noreferrer":u,ellipsis:!!s,component:"a"});return delete n.navigate,v(Rt,n,o)};ne.displayName="ATypographyLink";ne.inheritAttrs=!1;ne.props=Bt();const jt=ne;export{Rt as B,xt as T,jt as _,Ne as b};
