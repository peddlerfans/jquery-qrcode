import{a as k,bt as Ze,b5 as _e,d as ce,c as Q,b as f,aP as ie,e as me,j as W,aD as Le,_ as A,aV as V,A as B,L as Oe,w as ye,b$ as Lt,ax as Ot,aw as Kt,c0 as Dt,P as Ke,aS as Wt,aT as Ft,aY as $t,an as ct,c1 as St,c2 as zt,c3 as Ht,c4 as jt,c5 as Gt,c6 as Vt,c7 as Ut,aQ as vt,by as Ee,bs as st,h as Yt,z as xt,l as Xt,K as Zt,aR as Qt,b9 as qt,s as Xe,u as Jt,n as ea,c8 as ta,aG as dt,B as aa}from"./index.3614183b.js";import{u as na}from"./useRefs.e2c20bfc.js";import{P as ia}from"./index.01976f6f.js";function ra(c){var e=k(),t=k(!1);function r(){for(var a=arguments.length,n=new Array(a),o=0;o<a;o++)n[o]=arguments[o];t.value||(_e.cancel(e.value),e.value=_e(function(){c.apply(void 0,n)}))}return Ze(function(){t.value=!0,_e.cancel(e.value)}),r}function la(c){var e=k([]),t=k(typeof c=="function"?c():c),r=ra(function(){var n=t.value;e.value.forEach(function(o){n=o(n)}),e.value=[],t.value=n});function a(n){e.value.push(n),r()}return[t,a]}const oa=ce({compatConfig:{MODE:3},name:"TabNode",props:{id:{type:String},prefixCls:{type:String},tab:{type:Object},active:{type:Boolean},closable:{type:Boolean},editable:{type:Object},onClick:{type:Function},onResize:{type:Function},renderWrapper:{type:Function},removeAriaLabel:{type:String},onFocus:{type:Function}},emits:["click","resize","remove","focus"],setup:function(e,t){var r=t.expose,a=t.attrs,n=k();function o(v){var s;(s=e.tab)!==null&&s!==void 0&&s.disabled||e.onClick(v)}r({domRef:n});function u(v){var s;v.preventDefault(),v.stopPropagation(),e.editable.onEdit("remove",{key:(s=e.tab)===null||s===void 0?void 0:s.key,event:v})}var i=Q(function(){var v;return e.editable&&e.closable!==!1&&!((v=e.tab)!==null&&v!==void 0&&v.disabled)});return function(){var v,s,b=e.prefixCls,g=e.id,N=e.active,P=e.tab,F=P.key,E=P.tab,H=P.disabled,x=P.closeIcon,d=e.renderWrapper,R=e.removeAriaLabel,j=e.editable,L=e.onFocus,_="".concat(b,"-tab"),O=f("div",{key:F,ref:n,class:me(_,(v={},W(v,"".concat(_,"-with-remove"),i.value),W(v,"".concat(_,"-active"),N),W(v,"".concat(_,"-disabled"),H),v)),style:a.style,onClick:o},[f("div",{role:"tab","aria-selected":N,id:g&&"".concat(g,"-tab-").concat(F),class:"".concat(_,"-btn"),"aria-controls":g&&"".concat(g,"-panel-").concat(F),"aria-disabled":H,tabindex:H?null:0,onClick:function(K){K.stopPropagation(),o(K)},onKeydown:function(K){[ie.SPACE,ie.ENTER].includes(K.which)&&(K.preventDefault(),o(K))},onFocus:L},[typeof E=="function"?E():E]),i.value&&f("button",{type:"button","aria-label":R||"remove",tabindex:0,class:"".concat(_,"-remove"),onClick:function(K){K.stopPropagation(),u(K)}},[(x==null?void 0:x())||((s=j.removeIcon)===null||s===void 0?void 0:s.call(j))||"\xD7"])]);return d?d(O):O}}});var ft={width:0,height:0,left:0,top:0};function ua(c,e){var t=k(new Map);return Le(function(){for(var r,a=new Map,n=c.value,o=e.value.get((r=n[0])===null||r===void 0?void 0:r.key)||ft,u=o.left+o.width,i=0;i<n.length;i+=1){var v=n[i].key,s=e.value.get(v);if(!s){var b;s=e.value.get((b=n[i-1])===null||b===void 0?void 0:b.key)||ft}var g=a.get(v)||A({},s);g.right=u-g.left-g.width,a.set(v,g)}t.value=new Map(a)}),t}const Tt=ce({compatConfig:{MODE:3},name:"AddButton",inheritAttrs:!1,props:{prefixCls:String,editable:{type:Object},locale:{type:Object,default:void 0}},setup:function(e,t){var r=t.expose,a=t.attrs,n=k();return r({domRef:n}),function(){var o=e.prefixCls,u=e.editable,i=e.locale;return!u||u.showAdd===!1?null:f("button",{ref:n,type:"button",class:"".concat(o,"-nav-add"),style:a.style,"aria-label":(i==null?void 0:i.addAriaLabel)||"Add tab",onClick:function(s){u.onEdit("add",{event:s})}},[u.addIcon?u.addIcon():"+"])}}});var ca={prefixCls:{type:String},id:{type:String},tabs:{type:Object},rtl:{type:Boolean},tabBarGutter:{type:Number},activeKey:{type:[String,Number]},mobile:{type:Boolean},moreIcon:Ke.any,moreTransitionName:{type:String},editable:{type:Object},locale:{type:Object,default:void 0},removeAriaLabel:String,onTabClick:{type:Function}};const va=ce({compatConfig:{MODE:3},name:"OperationNode",inheritAttrs:!1,props:ca,emits:["tabClick"],slots:["moreIcon"],setup:function(e,t){var r=t.attrs,a=t.slots,n=V(!1),o=B(n,2),u=o[0],i=o[1],v=V(null),s=B(v,2),b=s[0],g=s[1],N=function(d){for(var R=e.tabs.filter(function(U){return!U.disabled}),j=R.findIndex(function(U){return U.key===b.value})||0,L=R.length,_=0;_<L;_+=1){j=(j+d+L)%L;var O=R[j];if(!O.disabled){g(O.key);return}}},P=function(d){var R=d.which;if(!u.value){[ie.DOWN,ie.SPACE,ie.ENTER].includes(R)&&(i(!0),d.preventDefault());return}switch(R){case ie.UP:N(-1),d.preventDefault();break;case ie.DOWN:N(1),d.preventDefault();break;case ie.ESC:i(!1);break;case ie.SPACE:case ie.ENTER:b.value!==null&&e.onTabClick(b.value,d);break}},F=Q(function(){return"".concat(e.id,"-more-popup")}),E=Q(function(){return b.value!==null?"".concat(F.value,"-").concat(b.value):null}),H=function(d,R){d.preventDefault(),d.stopPropagation(),e.editable.onEdit("remove",{key:R,event:d})};return Oe(function(){ye(b,function(){var x=document.getElementById(E.value);x&&x.scrollIntoView&&x.scrollIntoView(!1)},{flush:"post",immediate:!0})}),ye(u,function(){u.value||g(null)}),function(){var x,d=e.prefixCls,R=e.id,j=e.tabs,L=e.locale,_=e.mobile,O=e.moreIcon,U=O===void 0?((x=a.moreIcon)===null||x===void 0?void 0:x.call(a))||f(Lt,null,null):O,K=e.moreTransitionName,z=e.editable,ve=e.tabBarGutter,p=e.rtl,l=e.onTabClick,m="".concat(d,"-dropdown"),T=L==null?void 0:L.dropdownAriaLabel,D=W({},p?"marginRight":"marginLeft",ve);j.length||(D.visibility="hidden",D.order=1);var $=me(W({},"".concat(m,"-rtl"),p)),C=_?null:f(Dt,{prefixCls:m,trigger:["hover"],visible:u.value,transitionName:K,onVisibleChange:i,overlayClassName:$,mouseEnterDelay:.1,mouseLeaveDelay:.1},{overlay:function(){return f(Ot,{onClick:function(w){var Y=w.key,re=w.domEvent;l(Y,re),i(!1)},id:F.value,tabindex:-1,role:"listbox","aria-activedescendant":E.value,selectedKeys:[b.value],"aria-label":T!==void 0?T:"expanded dropdown"},{default:function(){return[j.map(function(w){var Y,re,xe=z&&w.closable!==!1&&!w.disabled;return f(Kt,{key:w.key,id:"".concat(F.value,"-").concat(w.key),role:"option","aria-controls":R&&"".concat(R,"-panel-").concat(w.key),disabled:w.disabled},{default:function(){return[f("span",null,[typeof w.tab=="function"?w.tab():w.tab]),xe&&f("button",{type:"button","aria-label":e.removeAriaLabel||"remove",tabindex:0,class:"".concat(m,"-menu-item-remove"),onClick:function(se){se.stopPropagation(),H(se,w.key)}},[((Y=w.closeIcon)===null||Y===void 0?void 0:Y.call(w))||((re=z.removeIcon)===null||re===void 0?void 0:re.call(z))||"\xD7"])]}})})]}})},default:function(){return f("button",{type:"button",class:"".concat(d,"-nav-more"),style:D,tabindex:-1,"aria-hidden":"true","aria-haspopup":"listbox","aria-controls":F.value,id:"".concat(R,"-more"),"aria-expanded":u.value,onKeydown:P},[U])}});return f("div",{class:me("".concat(d,"-nav-operations"),r.class),style:r.style},[C,f(Tt,{prefixCls:d,locale:L,editable:z},null)])}}});var Ct=Symbol("tabsContextKey"),It=function(e){Wt(Ct,e)},Pt=function(){return Ft(Ct,{tabs:k([]),prefixCls:k()})};ce({compatConfig:{MODE:3},name:"TabsContextProvider",inheritAttrs:!1,props:{tabs:{type:Object,default:void 0},prefixCls:{type:String,default:void 0}},setup:function(e,t){var r=t.slots;return It($t(e)),function(){var a;return(a=r.default)===null||a===void 0?void 0:a.call(r)}}});var sa=.1,bt=.01,Ne=20,yt=Math.pow(.995,Ne);function da(c,e){var t=V(),r=B(t,2),a=r[0],n=r[1],o=V(0),u=B(o,2),i=u[0],v=u[1],s=V(0),b=B(s,2),g=b[0],N=b[1],P=V(),F=B(P,2),E=F[0],H=F[1],x=k();function d(p){var l=p.touches[0],m=l.screenX,T=l.screenY;n({x:m,y:T}),clearInterval(x.value)}function R(p){if(!!a.value){p.preventDefault();var l=p.touches[0],m=l.screenX,T=l.screenY,D=m-a.value.x,$=T-a.value.y;e(D,$),n({x:m,y:T});var C=Date.now();N(C-i.value),v(C),H({x:D,y:$})}}function j(){if(!!a.value){var p=E.value;if(n(null),H(null),p){var l=p.x/g.value,m=p.y/g.value,T=Math.abs(l),D=Math.abs(m);if(Math.max(T,D)<sa)return;var $=l,C=m;x.value=setInterval(function(){if(Math.abs($)<bt&&Math.abs(C)<bt){clearInterval(x.value);return}$*=yt,C*=yt,e($*Ne,C*Ne)},Ne)}}}var L=k();function _(p){var l=p.deltaX,m=p.deltaY,T=0,D=Math.abs(l),$=Math.abs(m);D===$?T=L.value==="x"?l:m:D>$?(T=l,L.value="x"):(T=m,L.value="y"),e(-T,-T)&&p.preventDefault()}var O=k({onTouchStart:d,onTouchMove:R,onTouchEnd:j,onWheel:_});function U(p){O.value.onTouchStart(p)}function K(p){O.value.onTouchMove(p)}function z(p){O.value.onTouchEnd(p)}function ve(p){O.value.onWheel(p)}Oe(function(){var p,l;document.addEventListener("touchmove",K,{passive:!1}),document.addEventListener("touchend",z,{passive:!1}),(p=c.value)===null||p===void 0||p.addEventListener("touchstart",U,{passive:!1}),(l=c.value)===null||l===void 0||l.addEventListener("wheel",ve,{passive:!1})}),Ze(function(){document.removeEventListener("touchmove",K),document.removeEventListener("touchend",z)})}function mt(c,e){var t=k(c);function r(a){var n=typeof a=="function"?a(t.value):a;n!==t.value&&e(n,t.value),t.value=n}return[t,r]}function fa(c,e,t,r){if(!ct(c))return c;e=St(e,c);for(var a=-1,n=e.length,o=n-1,u=c;u!=null&&++a<n;){var i=zt(e[a]),v=t;if(i==="__proto__"||i==="constructor"||i==="prototype")return c;if(a!=o){var s=u[i];v=r?r(s,i,u):void 0,v===void 0&&(v=ct(s)?s:Ht(e[a+1])?[]:{})}jt(u,i,v),u=u[i]}return c}function ba(c,e,t){for(var r=-1,a=e.length,n={};++r<a;){var o=e[r],u=Gt(c,o);t(u,o)&&fa(n,St(o,c),u)}return n}function ya(c,e){return ba(c,e,function(t,r){return Vt(c,r)})}var ma=Ut(function(c,e){return c==null?{}:ya(c,e)});const kt=ma;var ht={width:0,height:0,left:0,top:0,right:0},ha=function(){return{id:{type:String},tabPosition:{type:String},activeKey:{type:[String,Number]},rtl:{type:Boolean},animated:{type:Object,default:void 0},editable:{type:Object},moreIcon:Ke.any,moreTransitionName:{type:String},mobile:{type:Boolean},tabBarGutter:{type:Number},renderTabBar:{type:Function},locale:{type:Object,default:void 0},onTabClick:{type:Function},onTabScroll:{type:Function}}};const gt=ce({compatConfig:{MODE:3},name:"TabNavList",inheritAttrs:!1,props:ha(),slots:["moreIcon","leftExtra","rightExtra","tabBarExtraContent"],emits:["tabClick","tabScroll"],setup:function(e,t){var r=t.attrs,a=t.slots,n=Pt(),o=n.tabs,u=n.prefixCls,i=k(),v=k(),s=k(),b=k(),g=na(),N=B(g,2),P=N[0],F=N[1],E=Q(function(){return e.tabPosition==="top"||e.tabPosition==="bottom"}),H=mt(0,function(h,S){E.value&&e.onTabScroll&&e.onTabScroll({direction:h>S?"left":"right"})}),x=B(H,2),d=x[0],R=x[1],j=mt(0,function(h,S){!E.value&&e.onTabScroll&&e.onTabScroll({direction:h>S?"top":"bottom"})}),L=B(j,2),_=L[0],O=L[1],U=V(0),K=B(U,2),z=K[0],ve=K[1],p=V(0),l=B(p,2),m=l[0],T=l[1],D=V(null),$=B(D,2),C=$[0],Se=$[1],he=V(null),w=B(he,2),Y=w[0],re=w[1],xe=V(0),ge=B(xe,2),Te=ge[0],se=ge[1],Be=V(0),J=B(Be,2),De=J[0],Re=J[1],Ae=la(new Map),pe=B(Ae,2),We=pe[0],Fe=pe[1],we=ua(o,We),_t=Q(function(){return"".concat(u.value,"-nav-operations-hidden")}),Ce=k(0),Ie=k(0);Le(function(){E.value?e.rtl?(Ce.value=0,Ie.value=Math.max(0,z.value-C.value)):(Ce.value=Math.min(0,C.value-z.value),Ie.value=0):(Ce.value=Math.min(0,Y.value-m.value),Ie.value=0)});var $e=function(S){return S<Ce.value?Ce.value:S>Ie.value?Ie.value:S},Qe=k(),Bt=V(),qe=B(Bt,2),ze=qe[0],Je=qe[1],He=function(){Je(Date.now())},je=function(){clearTimeout(Qe.value)},et=function(S,y){S(function(M){var I=$e(M+y);return I})};da(i,function(h,S){if(E.value){if(C.value>=z.value)return!1;et(R,h)}else{if(Y.value>=m.value)return!1;et(O,S)}return je(),He(),!0}),ye(ze,function(){je(),ze.value&&(Qe.value=setTimeout(function(){Je(0)},100))});var tt=function(){var S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activeKey,y=we.value.get(S)||{width:0,height:0,left:0,right:0,top:0};if(E.value){var M=d.value;e.rtl?y.right<d.value?M=y.right:y.right+y.width>d.value+C.value&&(M=y.right+y.width-C.value):y.left<-d.value?M=-y.left:y.left+y.width>-d.value+C.value&&(M=-(y.left+y.width-C.value)),O(0),R($e(M))}else{var I=_.value;y.top<-_.value?I=-y.top:y.top+y.height>-_.value+Y.value&&(I=-(y.top+y.height-Y.value)),R(0),O($e(I))}},Ge=k(0),Ve=k(0);Le(function(){var h,S,y,M,I,X,Z,fe=we.value;["top","bottom"].includes(e.tabPosition)?(S="width",I=C.value,X=z.value,Z=Te.value,y=e.rtl?"right":"left",M=Math.abs(d.value)):(S="height",I=Y.value,X=z.value,Z=De.value,y="top",M=-_.value);var ee=I;X+Z>I&&X<I&&(ee=I-Z);var le=o.value;if(!le.length){var oe;return oe=[0,0],Ge.value=oe[0],Ve.value=oe[1],oe}for(var be=le.length,G=be,te=0;te<be;te+=1){var ae=fe.get(le[te].key)||ht;if(ae[y]+ae[S]>M+ee){G=te-1;break}}for(var ue=0,q=be-1;q>=0;q-=1){var ne=fe.get(le[q].key)||ht;if(ne[y]<M){ue=q+1;break}}return h=[ue,G],Ge.value=h[0],Ve.value=h[1],h});var Ue=function(){var S,y,M,I,X,Z=((S=i.value)===null||S===void 0?void 0:S.offsetWidth)||0,fe=((y=i.value)===null||y===void 0?void 0:y.offsetHeight)||0,ee=((M=b.value)===null||M===void 0?void 0:M.$el)||{},le=ee.offsetWidth||0,oe=ee.offsetHeight||0;Se(Z),re(fe),se(le),Re(oe);var be=(((I=v.value)===null||I===void 0?void 0:I.offsetWidth)||0)-le,G=(((X=v.value)===null||X===void 0?void 0:X.offsetHeight)||0)-oe;ve(be),T(G),Fe(function(){var te=new Map;return o.value.forEach(function(ae){var ue=ae.key,q=F.value.get(ue),ne=(q==null?void 0:q.$el)||q;ne&&te.set(ue,{width:ne.offsetWidth,height:ne.offsetHeight,left:ne.offsetLeft,top:ne.offsetTop})}),te})},at=Q(function(){return[].concat(vt(o.value.slice(0,Ge.value)),vt(o.value.slice(Ve.value+1)))}),Rt=V(),nt=B(Rt,2),At=nt[0],wt=nt[1],de=Q(function(){return we.value.get(e.activeKey)}),it=k(),rt=function(){_e.cancel(it.value)};ye([de,E,function(){return e.rtl}],function(){var h={};de.value&&(E.value?(e.rtl?h.right=Ee(de.value.right):h.left=Ee(de.value.left),h.width=Ee(de.value.width)):(h.top=Ee(de.value.top),h.height=Ee(de.value.height))),rt(),it.value=_e(function(){wt(h)})}),ye([function(){return e.activeKey},de,we,E],function(){tt()},{flush:"post"}),ye([function(){return e.rtl},function(){return e.tabBarGutter},function(){return e.activeKey},function(){return o.value}],function(){Ue()},{flush:"post"});var Ye=function(S){var y=S.position,M=S.prefixCls,I=S.extra;if(!I)return null;var X=I==null?void 0:I({position:y});return X?f("div",{class:"".concat(M,"-extra-content")},[X]):null};return Ze(function(){je(),rt()}),function(){var h,S=e.id,y=e.animated,M=e.activeKey,I=e.rtl,X=e.editable,Z=e.locale,fe=e.tabPosition,ee=e.tabBarGutter,le=e.onTabClick,oe=r.class,be=r.style,G=u.value,te=!!at.value.length,ae="".concat(G,"-nav-wrap"),ue,q,ne,lt;E.value?I?(q=d.value>0,ue=d.value+C.value<z.value):(ue=d.value<0,q=-d.value+C.value<z.value):(ne=_.value<0,lt=-_.value+Y.value<m.value);var Me={};fe==="top"||fe==="bottom"?Me[I?"marginRight":"marginLeft"]=typeof ee=="number"?"".concat(ee,"px"):ee:Me.marginTop=typeof ee=="number"?"".concat(ee,"px"):ee;var ot=o.value.map(function(Pe,ut){var ke=Pe.key;return f(oa,{id:S,prefixCls:G,key:ke,tab:Pe,style:ut===0?void 0:Me,closable:Pe.closable,editable:X,active:ke===M,removeAriaLabel:Z==null?void 0:Z.removeAriaLabel,ref:P(ke),onClick:function(Nt){le(ke,Nt)},onFocus:function(){tt(ke),He(),i.value&&(I||(i.value.scrollLeft=0),i.value.scrollTop=0)}},a)});return f("div",{role:"tablist",class:me("".concat(G,"-nav"),oe),style:be,onKeydown:function(){He()}},[f(Ye,{position:"left",prefixCls:G,extra:a.leftExtra},null),f(st,{onResize:Ue},{default:function(){return[f("div",{class:me(ae,(h={},W(h,"".concat(ae,"-ping-left"),ue),W(h,"".concat(ae,"-ping-right"),q),W(h,"".concat(ae,"-ping-top"),ne),W(h,"".concat(ae,"-ping-bottom"),lt),h)),ref:i},[f(st,{onResize:Ue},{default:function(){return[f("div",{ref:v,class:"".concat(G,"-nav-list"),style:{transform:"translate(".concat(d.value,"px, ").concat(_.value,"px)"),transition:ze.value?"none":void 0}},[ot,f(Tt,{ref:b,prefixCls:G,locale:Z,editable:X,style:A(A({},ot.length===0?void 0:Me),{},{visibility:te?"hidden":null})},null),f("div",{class:me("".concat(G,"-ink-bar"),W({},"".concat(G,"-ink-bar-animated"),y.inkBar)),style:At.value},null)])]}})])]}}),f(va,A(A({},e),{},{removeAriaLabel:Z==null?void 0:Z.removeAriaLabel,ref:s,prefixCls:G,tabs:at.value,class:!te&&_t.value}),kt(a,["moreIcon"])),f(Ye,{position:"right",prefixCls:G,extra:a.rightExtra},null),f(Ye,{position:"right",prefixCls:G,extra:a.tabBarExtraContent},null)])}}}),ga=ce({compatConfig:{MODE:3},name:"TabPanelList",inheritAttrs:!1,props:{activeKey:{type:[String,Number]},id:{type:String},rtl:{type:Boolean},animated:{type:Object,default:void 0},tabPosition:{type:String},destroyInactiveTabPane:{type:Boolean}},setup:function(e){var t=Pt(),r=t.tabs,a=t.prefixCls;return function(){var n=e.id,o=e.activeKey,u=e.animated,i=e.tabPosition,v=e.rtl,s=e.destroyInactiveTabPane,b=u.tabPane,g=a.value,N=r.value.findIndex(function(P){return P.key===o});return f("div",{class:"".concat(g,"-content-holder")},[f("div",{class:["".concat(g,"-content"),"".concat(g,"-content-").concat(i),W({},"".concat(g,"-content-animated"),b)],style:N&&b?W({},v?"marginRight":"marginLeft","-".concat(N,"00%")):null},[r.value.map(function(P){return Yt(P.node,{key:P.key,prefixCls:g,tabKey:P.key,id:n,animated:b,active:P.key===o,destroyInactiveTabPane:s})})])])}}});var pt=0,Et=function(){return{prefixCls:{type:String},id:{type:String},activeKey:{type:[String,Number]},defaultActiveKey:{type:[String,Number]},direction:{type:String},animated:{type:[Boolean,Object]},renderTabBar:{type:Function},tabBarGutter:{type:Number},tabBarStyle:{type:Object},tabPosition:{type:String},destroyInactiveTabPane:{type:Boolean},hideAdd:Boolean,type:{type:String},size:{type:String},centered:Boolean,onEdit:{type:Function},onChange:{type:Function},onTabClick:{type:Function},onTabScroll:{type:Function},"onUpdate:activeKey":{type:Function},locale:{type:Object,default:void 0},onPrevClick:Function,onNextClick:Function,tabBarExtraContent:Ke.any}};function pa(c){return c.map(function(e){if(Qt(e)){for(var t=A({},e.props||{}),r=0,a=Object.entries(t);r<a.length;r++){var n=B(a[r],2),o=n[0],u=n[1];delete t[o],t[qt(o)]=u}var i=e.children||{},v=e.key!==void 0?e.key:void 0,s=t.tab,b=s===void 0?i.tab:s,g=t.disabled,N=t.forceRender,P=t.closable,F=t.animated,E=t.active,H=t.destroyInactiveTabPane;return A(A({key:v},t),{},{node:e,closeIcon:i.closeIcon,tab:b,disabled:g===""||g,forceRender:N===""||N,closable:P===""||P,animated:F===""||F,active:E===""||E,destroyInactiveTabPane:H===""||H})}return null}).filter(function(e){return e})}var Sa=ce({compatConfig:{MODE:3},name:"InternalTabs",inheritAttrs:!1,props:A(A({},xt(Et(),{tabPosition:"top",animated:{inkBar:!0,tabPane:!1}})),{},{tabs:{type:Array}}),slots:["tabBarExtraContent","leftExtra","rightExtra","moreIcon","addIcon","removeIcon","renderTabBar"],setup:function(e,t){var r=t.attrs,a=t.slots;Xe(e.onPrevClick===void 0&&e.onNextClick===void 0,"Tabs","`onPrevClick / @prevClick` and `onNextClick / @nextClick` has been removed. Please use `onTabScroll / @tabScroll` instead."),Xe(e.tabBarExtraContent===void 0,"Tabs","`tabBarExtraContent` prop has been removed. Please use `rightExtra` slot instead."),Xe(a.tabBarExtraContent===void 0,"Tabs","`tabBarExtraContent` slot is deprecated. Please use `rightExtra` slot instead.");var n=Jt("tabs",e),o=n.prefixCls,u=n.direction,i=n.size,v=n.rootPrefixCls,s=Q(function(){return u.value==="rtl"}),b=Q(function(){var l=e.animated,m=e.tabPosition;return l===!1||["left","right"].includes(m)?{inkBar:!1,tabPane:!1}:l===!0?{inkBar:!0,tabPane:!0}:A({inkBar:!0,tabPane:!1},ea(l)==="object"?l:{})}),g=V(!1),N=B(g,2),P=N[0],F=N[1];Oe(function(){F(ta())});var E=dt(function(){var l;return(l=e.tabs[0])===null||l===void 0?void 0:l.key},{value:Q(function(){return e.activeKey}),defaultValue:e.defaultActiveKey}),H=B(E,2),x=H[0],d=H[1],R=V(function(){return e.tabs.findIndex(function(l){return l.key===x.value})}),j=B(R,2),L=j[0],_=j[1];Le(function(){var l=e.tabs.findIndex(function(T){return T.key===x.value});if(l===-1){var m;l=Math.max(0,Math.min(L.value,e.tabs.length-1)),d((m=e.tabs[l])===null||m===void 0?void 0:m.key)}_(l)});var O=dt(null,{value:Q(function(){return e.id})}),U=B(O,2),K=U[0],z=U[1],ve=Q(function(){return P.value&&!["left","right"].includes(e.tabPosition)?"top":e.tabPosition});Oe(function(){e.id||(z("rc-tabs-".concat(pt)),pt+=1)});var p=function(m,T){var D;(D=e.onTabClick)===null||D===void 0||D.call(e,m,T);var $=m!==x.value;if(d(m),$){var C;(C=e.onChange)===null||C===void 0||C.call(e,m)}};return It({tabs:Q(function(){return e.tabs}),prefixCls:o}),function(){var l,m=e.id,T=e.type,D=e.tabBarGutter,$=e.tabBarStyle,C=e.locale,Se=e.destroyInactiveTabPane,he=e.renderTabBar,w=he===void 0?a.renderTabBar:he,Y=e.onTabScroll,re=e.hideAdd,xe=e.centered,ge={id:K.value,activeKey:x.value,animated:b.value,tabPosition:ve.value,rtl:s.value,mobile:P.value},Te;T==="editable-card"&&(Te={onEdit:function(Re,Ae){var pe,We=Ae.key,Fe=Ae.event;(pe=e.onEdit)===null||pe===void 0||pe.call(e,Re==="add"?Fe:We,Re)},removeIcon:function(){return f(aa,null,null)},addIcon:a.addIcon?a.addIcon:function(){return f(ia,null,null)},showAdd:re!==!0});var se,Be=A(A({},ge),{},{moreTransitionName:"".concat(v.value,"-slide-up"),editable:Te,locale:C,tabBarGutter:D,onTabClick:p,onTabScroll:Y,style:$});w?se=w(A(A({},Be),{},{DefaultTabBar:gt})):se=f(gt,Be,kt(a,["moreIcon","leftExtra","rightExtra","tabBarExtraContent"]));var J=o.value;return f("div",A(A({},r),{},{id:m,class:me(J,"".concat(J,"-").concat(ve.value),(l={},W(l,"".concat(J,"-").concat(i.value),i.value),W(l,"".concat(J,"-card"),["card","editable-card"].includes(T)),W(l,"".concat(J,"-editable-card"),T==="editable-card"),W(l,"".concat(J,"-centered"),xe),W(l,"".concat(J,"-mobile"),P.value),W(l,"".concat(J,"-editable"),T==="editable-card"),W(l,"".concat(J,"-rtl"),s.value),l),r.class)}),[se,f(ga,A(A({destroyInactiveTabPane:Se},ge),{},{animated:b.value}),null)])}}});const Pa=ce({compatConfig:{MODE:3},name:"ATabs",inheritAttrs:!1,props:xt(Et(),{tabPosition:"top",animated:{inkBar:!0,tabPane:!1}}),slots:["tabBarExtraContent","leftExtra","rightExtra","moreIcon","addIcon","removeIcon","renderTabBar"],setup:function(e,t){var r=t.attrs,a=t.slots,n=t.emit,o=function(i){n("update:activeKey",i),n("change",i)};return function(){var u,i=pa(Xt((u=a.default)===null||u===void 0?void 0:u.call(a)));return f(Sa,A(A(A({},Zt(e,["onUpdate:activeKey"])),r),{},{onChange:o,tabs:i}),a)}}});var xa=function(){return{tab:Ke.any,disabled:{type:Boolean},forceRender:{type:Boolean},closable:{type:Boolean},animated:{type:Boolean},active:{type:Boolean},destroyInactiveTabPane:{type:Boolean},prefixCls:{type:String},tabKey:{type:[String,Number]},id:{type:String}}};const ka=ce({compatConfig:{MODE:3},name:"ATabPane",inheritAttrs:!1,__ANT_TAB_PANE:!0,props:xa(),slots:["closeIcon","tab"],setup:function(e,t){var r=t.attrs,a=t.slots,n=k(e.forceRender);ye([function(){return e.active},function(){return e.destroyInactiveTabPane}],function(){e.active?n.value=!0:e.destroyInactiveTabPane&&(n.value=!1)},{immediate:!0});var o=Q(function(){return e.active?{}:e.animated?{visibility:"hidden",height:0,overflowY:"hidden"}:{display:"none"}});return function(){var u,i=e.prefixCls,v=e.forceRender,s=e.id,b=e.active,g=e.tabKey;return f("div",{id:s&&"".concat(s,"-panel-").concat(g),role:"tabpanel",tabindex:b?0:-1,"aria-labelledby":s&&"".concat(s,"-tab-").concat(g),"aria-hidden":!b,style:[o.value,r.style],class:["".concat(i,"-tabpane"),b&&"".concat(i,"-tabpane-active"),r.class]},[(b||n.value||v)&&((u=a.default)===null||u===void 0?void 0:u.call(a))])}}});export{Pa as T,ka as _};
