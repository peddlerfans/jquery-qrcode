import{an as St,ao as Ot,d as Ke,a as m,M as f,N as V,V as O,ap as Ue,Y as y,aq as Rt,O as It,r as he,L as Vt,w as Bt,b as s,S as i,Z as u,Q as x,$,W as _,ar as te,as as se,ah as je,F as ie,X as ze,at as We,au as re,R as q,av as Ft,ai as qt,aw as Lt,ax as At,ay as Ut,a0 as jt,ae as Xe,aj as zt,az as Wt,aA as Xt,aB as Zt,aa as Gt}from"./index.3614183b.js";/* empty css               *//* empty css              */import{P as ve,_ as Kt,a as Qt}from"./index.01976f6f.js";import{_ as Yt}from"./index.c5cedc9d.js";/* empty css              */import{_ as _e,a as Ht}from"./index.5931ae8c.js";/* empty css               */import{h as Jt}from"./http.0645eb90.js";import{_ as el}from"./lodash.fdab4995.js";import{_ as Ze}from"./index.vue_vue_type_script_setup_true_lang.dc6c6f55.js";import{_ as tl}from"./index.a4a12abb.js";import{_ as ll}from"./index.351a724d.js";import"./index.89207c6a.js";/* empty css               */import"./EditOutlined.cfe60ffa.js";import"./DeleteOutlined.a585300f.js";var al="Expected a function";function nl(W,p,d){var E=!0,T=!0;if(typeof W!="function")throw new TypeError(al);return St(d)&&(E="leading"in d?!!d.leading:E,T="trailing"in d?!!d.trailing:T),Ot(W,p,{leading:E,maxWait:p,trailing:T})}const ol={class:"split-wrapper"},sl={class:"left-content"},il=y(" \u53F3\u8FB9\u5185\u5BB9\u533A "),rl=O("i",null,null,-1),ul=O("i",null,null,-1),dl=[rl,ul],cl={class:"right-content"},pl=y(" \u53F3\u8FB9\u5185\u5BB9\u533A "),ml=Ke({__name:"index",setup(W){const p=m();let d,E;const T=nl(function(c){p.value&&(p.value.style.width=`${E+c.clientX-d}px`)},20),R=()=>{document.documentElement.style.userSelect="unset",document.documentElement.removeEventListener("mousemove",T),document.documentElement.removeEventListener("mouseup",R)},h=c=>{d=c.clientX,p.value&&(E=parseInt(window.getComputedStyle(p.value).width,10)),document.documentElement.style.userSelect="none",document.documentElement.addEventListener("mousemove",T),document.documentElement.addEventListener("mouseup",R)};return(c,M)=>(f(),V("div",ol,[O("div",{ref_key:"scalable",ref:p,class:"scalable"},[O("div",sl,[Ue(c.$slots,"left-content",{},()=>[il])]),O("div",{ref:"separator",class:"separator",onMousedown:h},dl,544)],512),O("div",cl,[Ue(c.$slots,"right-content",{},()=>[pl])])]))}});var Qe={exports:{}};(function(W){(function(p,d){if(W.exports)W.exports=d();else{var E=p.shortid,T=d();T.noConflict=function(){return p.shortid=E,T},p.shortid=T}})(Rt,function(){var p=14603328e5,d=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],E=62,T=function(h,c){return(h+c).slice(-h.length)},R=function(h){this._opt=h||{}};return R.prototype={_toBase:function(h,c){var M=this._opt,B=M.symbols||d,D="";if(c>B.length||c<=1)return!1;for(;h>=1;)D=B[h-c*Math.floor(h/c)]+D,h=Math.floor(h/c);return c<11?parseInt(D):D},_salts:function(){for(var h=this,c=h._opt,M=c.salts||2,B="",D=0;D<M;D++){var S=Math.floor(Math.random()*3844);B+=T("00",h._toBase(S,E))}return B},gen:function(){var h=this,c=h._opt,M=c.interval||1,B=c.initTime||p,D=M>0?Math.floor((new Date().getTime()-B)/M):0,S=h._salts();return D===0?S:h._toBase(D,E)+S}},{inst:function(h){return new R(h)},gen:function(h){return new R(h).gen()},uuid:function(){return new R({salts:4}).gen()}}})})(Qe);const fl=Qe.exports,hl=fl.inst({salts:4,initTime:"1587025320000"});function Ge(){return hl.gen()}const vl={class:"main"},_l={key:0,style:{color:"#f50"}},gl={key:1},yl=y("Add Child Node"),bl={key:0,style:{color:"#f50"}},wl={key:1},kl={name:"AWModeler"},$l=Ke({...kl,setup(W){const{t:p}=It();let d=m(null);const E=[{title:"name",width:40,link:"custom",require:!0},{title:"description",width:120,require:!0},{title:"tags",width:100},{title:"action",width:100,cbName:["edit","go2Page"],actionList:["edit","delete","clone"]}],T={selection:{selections:[_e.SELECTION_ALL,_e.SELECTION_INVERT,_e.SELECTION_NONE]}},R=e=>{const t=`/awupdate/${e._id}/${e.name}/awmodeler`;e.clickTar==="name"?We.push(`${t}?canEdit=true`):We.push(t)},h=e=>{c.page=e.current,c.perPage=e.pageSize,S()};let c=he({search:"",page:1,perPage:10,q:"",total:0}),M=m(null);const B=[{title:"name",width:280,link:"custom"},{title:"description",width:100},{title:"type",width:60,option:"1"},{title:"enum",width:100},{title:"default",width:100},{title:"action",width:140,actionList:["edit","delete","check","up","down"]}];let D=0;async function S(e){d.value.loading=!0;const t=e||c,l=await Jt.get("/api/hlfs",{params:t});let a=new Date(l.headers.date).getTime();if(a<D)return;D=a;let n=l.data;return n.data&&(c.total=n.total,d.value.setTableData({tableData:n.data,total:n.total,currentPage:c.page,pageSize:c.perPage})),d.value.loading=!1,l}let v=m([]);const Ye=async()=>{let e=await x.get("/api/hlfs/_tree"),t=pe(e),l=Pe(t);v.value=l},He=m(),Je=m();Vt(()=>{S(),Ye()});const ue=Xt(),X=he({q:"",search:""}),et=async e=>{G.path&&(X.q=`path:${G.path}`),await S(X)},tt=e=>{},Q=m(!1),lt=()=>{Q.value=!0};let ge=m(),le=m(!1),Y=m(""),de=m([{value:"tags:",label:"tags:",isLeaf:!1},{value:"name:",label:"name:"}]);const at=async e=>{let t=await x.get("/api/hlfs/_tags",{params:{q:"category:meta"}});const l=e[0];l.loading=!0,t.length>0&&(t=t.map(a=>({value:a,label:a})),l.children=t),l.loading=!1,de.value=[...de.value]},nt=async e=>{if(e){let t=new RegExp(",","g");X.search+=e.toString().replace(t,"")}Y.value="",le.value=!1,re(()=>{ge.value.focus()})},ot=e=>{X.search=="@"?le.value=!0:le.value=!1};let st=m(!0);const ye=()=>{rt(),Q.value=!1};let be="";async function it(e){if(d.value.loading=!0,e.params=M.value.getTableData(),e.params.some(l=>l.editing)){q.warning(p("component.message.tableEditingWarn")),d.value.loading=!1;return}G&&(e={...e,path:G.path});let t=await x.post("/api/hlfs",e);if(t._id){be=t._id;let l=d.value.getTableData();l.unshift(t),d.value.setTableData({tableData:l,total:++c.total}),Q.value=!1,d.value.loading=!1,ye(),q.success(p("component.message.addText"))}}let L=m(""),ce=m(!1),we=m(),g=m({key:0,name:"",description:"",template:"",returnType:[],template_en:"",_id:"",params:[],tags:[]});const rt=()=>{g.value={name:"",description:"",template:"",_id:"",returnType:[],template_en:"",params:[],tags:[]},N.tags=[],(ue==null?void 0:ue.refs.refForm).resetFields()},ut=()=>{M.value.createNewRow({required:!1,name:"",description:"",type:"",enum:[],editing:!0,inputVisible:!0,inputValue:""})};let ke=async(e,t)=>{let l=/^[a-zA-Z0-9\$][a-zA-Z0-9\d_]*$/,a=/^[\u4e00-\u9fa5_a-zA-Z0-9$]+$/;if(t){if(!l.test(t)&&!a.test(t))return Promise.reject(p("component.message.hefaName"));{let n=await x.get("/api/hlfs",{params:{q:`name:${t}`,search:""}});return n.data&&n.data.length>0&&n.data[0].name==t?Promise.reject(p("component.message.depName")):Promise.resolve()}}else return Promise.reject(p("component.message.emptyName"))},$e=async(e,t)=>{if(t){let l=await x.get("/api/hlfs",{params:{search:t}});return l.data&&l.data.length>0&&l.data[0].description==t?Promise.reject(p("component.message.dupDescription")):Promise.resolve()}else return Promise.reject(p("component.message.emptyDescription"))},dt={name:[{required:!0,validator:ke,trigger:"blur"}],description:[{required:!0,validator:$e,trigger:"blur"}],template:[{required:!0,validator:async(e,t)=>{if(!t)return Promise.reject(p("awModeler.emptyTemp"));st.value=!1},trigger:"blur"}]},Ce=m();const ct=e=>{Ce.value.validate().then(async()=>{delete e._id,await it(e)})};let Te=m(),N=he({tags:[],inputVisible:!1,inputValue:""});const Ne=e=>{const t=N.tags.filter(l=>l!==e);N.tags=t},xe=e=>{const t=g.value.returnType.filter(l=>l!==e);g.value.returnType=t},pt=()=>{N.inputVisible=!0,re(()=>{Te.value.focus()})},mt=()=>{ce.value=!0,re(()=>{we.value.focus()})},Ee=()=>{let e=N.tags;N.inputValue&&e.indexOf(N.inputValue)===-1&&(e=[...e,N.inputValue.toUpperCase()]),Object.assign(N,{tags:e,inputVisible:!1,inputValue:""}),g.value.tags=[...N.tags]},De=()=>{let e=g.value.returnType;L.value&&e.indexOf(L.value)===-1&&(g.value.returnType=[...e,L.value.toUpperCase()]),L.value="",ce.value=!1},ft=async e=>{d.value.loading=!0,e._id?(delete e.key,await x.delete(`/api/hlfs/${e._id}`)):await x.delete(`/api/hlfs/${be}`);let t=d.value.getTableData();t=t.filter(l=>l!==e),d.value.setTableData({tableData:t,total:--c.total}),d.value.loading=!1,q.success(p("component.message.delText"))};async function ht(e,t){await x.put(e,t)}const vt={span:24,offset:12};function pe(e){const t=[];if(el.isObject(e))for(var l in e){var a={title:l,key:Ge(),children:pe(e[l])};l==""&&(l="/",a={title:l,key:Ge(),children:pe(e[""])}),t.push(a)}return t}const Pe=e=>(e!=null?e:[]).map(t=>({...t,showEdit:!1,children:Pe(t.children)}));function H(e,t){let l,a=Me(e,"title",t);return l=a==null?void 0:a.map(n=>n.title).join("/"),l}let G={};const _t=async(e,t)=>{if(c.page=1,t.node.dataRef.title=="/")await S();else{let l=H(t.node.dataRef.title,v.value);l=l.substring(1,l.length),G.path=l,G.dataRef=t.node.dataRef,t.node.dataRef.children.length==0?await S({q:`path:${l}`,search:""}):await S({q:`path:${l}`,search:""})}};function Me(e,t,l){let a=[];try{let n=function(o){if(a.push(o),o[t]===e)throw"GOT IT!";if(o.children&&o.children.length>0){for(var w=0;w<o.children.length;w++)n(o.children[w]);a.pop()}else a.pop()};for(let o=0;o<l.length;o++)n(l[o])}catch{return a}}const Se=(e,t)=>{let l=null;for(let a=0,n=e.length;a<n;a++){let o=e[a];if(o.title.indexOf(t)==-1&&o.children&&o.children.length>0&&(l=Se(o.children,t)),o.title.indexOf(t)>-1&&(l=o.key),l!=null)break}return l},ae=(e,t)=>{let l=[];for(let a=0,n=e.length;a<n;a++){let o=e[a];if(o.key!==t&&o.children&&o.children.length>0&&(l=ae(o.children,t)),o.key==t&&(l=e),l.length>0)break}return l},K=(e,t)=>{let l=null;for(let a=0,n=e.length;a<n;a++){let o=e[a];if(o.key!==t&&o.children&&o.children.length>0&&(l=K(o.children,t)),o.key==t&&(l=o),l!=null)break}return l},Z=m([]),A=m(!1),U=m("");Bt(U,e=>{if(e.length!=0){const t=v.value.map(l=>l.title.indexOf(e)==-1?Se(v.value,e):null).filter((l,a,n)=>l&&n.indexOf(l)===a);Z.value=t,U.value=e,A.value=!0}else A.value=!1});const gt=e=>{Z.value=e,A.value=!1},ne=async e=>{let t=K(v.value,e),l=ae(v.value,e);if(b.value)if(l.filter(n=>n.title==b.value).length>0&&b.value!==t.title){q.warning(`${p("awModeler.tip1")} ${b.value}`);return}else{let n=H(t.title,v.value);n=n.substring(1,n.length);let o=n.lastIndexOf("/"),J=n.substring(0,o+1)+b.value;await x.post("/api/hlfs/_rename?force=true",{path:n,newPath:J}),t.title=b.value}else t.title=t.title;b.value="",t.showEdit=!1,Z.value=[t.key],A.value=!0};let b=m(""),me=m();const yt=e=>{let t=K(v.value,e);b.value?(t.showEdit=!1,q.warning(p("awModeler.tip2"))):(b.value=t.title,t.showEdit=!0,re(()=>{me.value.focus()}))},Oe=async(e,t)=>{let l=K(v.value,e);Ie(v.value,e,l.children.length),v.value=[...v.value],Re(v.value,e);let a=Me(l.title,"title",v.value),n=a==null?void 0:a.map(w=>w.title).join("/");n=n.substring(1,n.length);let o;o=l.children.length?n+`/childNode${l.children.length}`:n+"/childNode0",await x.post("/api/hlfs?isFolder=true&focre=true",{path:o}),Z.value=[e],A.value=!0},Re=(e,t)=>{let l;for(let a=0;a<e.length;a++)e[a].key==t?e[a].children.forEach(n=>{n.title=="childNode"&&(l=n.key)}):e[a].children&&e[a].children.length>0&&Re(e[a].children,t);return l},Ie=(e,t,l)=>{for(let a=0;a<e.length;a++)if(e[a].key==t){let n={title:l?`childNode${l}`:"childNode0",key:length?`childNode${l}`:"childNode0",children:[],showEdit:!1,isLeaf:!0};e[a].children==null&&(e[a].children=[]),e[a].children.push(n);break}else if(e[a].children&&e[a].children.length>0)Ie(e[a].children,t,length);else continue},Ve=async(e,t,l)=>{for(let a=0;a<e.length;a++)if(e[a].key==t){let n={title:`NewNode${l}`,key:`NewNode${l}`,children:[],showEdit:!1,isLeaf:!1};e[a].children==null&&(e[a].children=[]),e.push(n);break}else if(e[a].children&&e[a].children.length>0)Ve(e[a].children,t,l);else continue},bt=async e=>{let t=K(v.value,e),l=ae(v.value,e),a=H(t.title,v.value);if(a=a.substring(1,a.length),console.log(a.indexOf("/")),a.indexOf("/")>=0){let n=a.lastIndexOf("/"),o=a.substring(0,n+1),w=l.lenght?o+`NewNode${l.length}`:o+"NewNode0";console.log(w),await x.post("/api/hlfs?isFolder=true",{path:w})}else await x.post("/api/hlfs?isFolder=true",{path:l.lenght?`/NewNode${l.lenght}`:"/NewNode0"});Ve(v.value,e,l.length),Z.value=[t.key],A.value=!0},wt=e=>{},kt=async(e,t)=>{let l=K(v.value,e),a=H(l.title,v.value);a=a.substring(1,a.length);let n=ae(v.value,e);for(var o=n.length-1;o>=0;o--)n[o].title==l.title&&n.splice(o,1);Z.value=[l.key],A.value=!0,await x.post("/api/hlfs/_deleteFolder?force=true",{path:a})},Be=e=>{};m([]);const $t=(e,t)=>{let l=H(t,v.value);l=l.substring(1,l.length);const a=d.value.selectionList;if(a.length>0){let n=[];a.forEach(o=>{o.path=l,n.push(ht(`/api/hlfs/${o._id}`,o))}),d.value.loading=!0,Promise.all(n).then(o=>{let w=d.value.getTableData();w=w.filter(J=>!a.includes(J)),d.value.setTableData(w),o&&q.success("Modification succeeded")}).catch(()=>{q.error("Modification failed")}).finally(()=>d.value.loading=!1)}else q.warning("Please select the Aw to be added")};let fe=m(),Ct={name:[{required:!0,validator:ke,trigger:"blur"}],description:[{required:!0,validator:$e,trigger:"blur"}]},P=m({name:"",description:""}),j=m(!1);const Tt=e=>{P.value.name=`${e.name}_clone`,P.value.description=`${e.description}_clone`,P.value={...e,name:P.value.name,description:P.value.description},j.value=!0},Nt=()=>{u(fe).validate().then(async()=>{d.value.loading=!0,delete P.value._id,x.post("/api/hlfs",P.value).then(e=>{let t=d.value.getTableData();t=t.unshift(e),d.value.setTableData(t.pop()),j.value=!1,d.value.loading=!1}).catch(()=>{q.error(p("commont.cloneError")),j.value=!1,d.value.loading=!1})})},xt=()=>{j.value=!1,u(fe).clearValidate()};return(e,t)=>{const l=Ft,a=qt,n=Lt,o=At,w=Ut,J=Kt,Et=Ht,Dt=Yt,oe=tl,ee=jt,Fe=Xe,Pt=ll,F=zt,z=Qt,qe=Zt,Mt=Xe,Le=Wt;return f(),V("main",vl,[O("div",{ref_key:"leftRef",ref:He,style:{height:"100%"},class:"id"},[s(u(ml),null,{"left-content":i(()=>{var r;return[s(l,{value:U.value,"onUpdate:value":t[0]||(t[0]=C=>U.value=C),style:{"margin-bottom":"8px"},placeholder:e.$t("common.searchText")},null,8,["value","placeholder"]),(r=u(v))!=null&&r.length?(f(),$(Et,{key:0,"show-line":!0,"tree-data":u(v),"expanded-keys":Z.value,onSelect:_t,"auto-expand-parent":A.value,onExpand:gt},{title:i(({key:C,title:I,showEdit:Ae})=>[I=="/"?(f(),$(w,{key:0,trigger:["contextmenu"]},{overlay:i(()=>[s(o,{onClick:()=>Be()},{default:i(()=>[s(n,{key:"2",onClick:k=>Oe(C)},{default:i(()=>[yl]),_:2},1032,["onClick"])]),_:2},1032,["onClick"])]),default:i(()=>[U.value&&I.includes(U.value)?(f(),V("div",_l,[O("span",null,_(I),1)])):Ae?(f(),$(a,{key:2,type:"text",ref_key:"updDom",ref:me,value:u(b),"onUpdate:value":t[1]||(t[1]=k=>te(b)?b.value=k:b=k),onBlur:k=>ne(C),onKeyup:se(k=>ne(C),["enter"])},null,8,["value","onBlur","onKeyup"])):(f(),V("span",gl,_(I),1))]),_:2},1024)):(f(),$(w,{key:1,trigger:["contextmenu"]},{overlay:i(()=>[s(o,{onClick:()=>Be()},{default:i(()=>[s(n,{key:"1",onClick:k=>bt(C)},{default:i(()=>[y(_(e.$t("awModeler.addSNode")),1)]),_:2},1032,["onClick"]),s(n,{key:"2",onClick:k=>Oe(C)},{default:i(()=>[y(_(e.$t("awModeler.addCNode")),1)]),_:2},1032,["onClick"]),s(n,{key:"4",onClick:k=>$t(C,I)},{default:i(()=>[y(_(e.$t("awModeler.moveSelected")),1)]),_:2},1032,["onClick"]),s(n,{key:"3",onClick:k=>yt(C)},{default:i(()=>[y(_(e.$t("awModeler.modifyNode")),1)]),_:2},1032,["onClick"]),s(J,{placement:"right",title:e.$t("component.message.sureDel"),"ok-text":e.$t("common.yesText"),"cancel-text":e.$t("common.noText"),onConfirm:k=>kt(C)},{default:i(()=>[s(n,{key:"4",onClick:k=>wt()},{default:i(()=>[y(_(e.$t("awModeler.delNode")),1)]),_:2},1032,["onClick"])]),_:2},1032,["title","ok-text","cancel-text","onConfirm"])]),_:2},1032,["onClick"])]),default:i(()=>[U.value&&I.includes(U.value)?(f(),V("div",bl,[O("span",null,_(I),1)])):Ae?(f(),$(a,{key:2,type:"text",ref_key:"updDom",ref:me,value:u(b),"onUpdate:value":t[2]||(t[2]=k=>te(b)?b.value=k:b=k),onBlur:k=>ne(C),onKeyup:se(k=>ne(C),["enter"])},null,8,["value","onBlur","onKeyup"])):(f(),V("span",wl,_(I),1))]),_:2},1024))]),_:1},8,["tree-data","expanded-keys","auto-expand-parent"])):je("",!0)]}),"right-content":i(()=>[s(Pt,null,{default:i(()=>[s(oe,{span:20},{default:i(()=>[s(Fe,{layout:"inline",class:"search_form",model:X,onFinish:et,onFinishFailed:tt,wrapperCol:vt},{default:i(()=>[s(oe,{span:20},{default:i(()=>[s(a,{value:X.search,"onUpdate:value":t[3]||(t[3]=r=>X.search=r),placeholder:e.$t("awModeler.inputSearch1"),onChange:ot,ref_key:"searchInput",ref:ge},null,8,["value","placeholder"]),u(le)?(f(),$(Dt,{key:0,"load-data":at,value:u(Y),"onUpdate:value":t[4]||(t[4]=r=>te(Y)?Y.value=r:Y=r),placeholder:"Please select",options:u(de),onChange:nt},null,8,["value","options"])):je("",!0)]),_:1}),s(oe,{span:4},{default:i(()=>[s(ee,{type:"primary","html-type":"submit"},{default:i(()=>[y(_(e.$t("common.searchText")),1)]),_:1})]),_:1})]),_:1},8,["model"])]),_:1}),s(oe,{span:2},{default:i(()=>[s(ee,{type:"primary",onClick:lt},{icon:i(()=>[s(u(ve))]),_:1})]),_:1})]),_:1}),O("div",null,[s(Le,{visible:Q.value,"onUpdate:visible":t[12]||(t[12]=r=>Q.value=r),title:u(g)._id?e.$t("common.updateText"):e.$t("common.saveText"),width:1300},{footer:i(()=>[s(ee,{onClick:ye},{default:i(()=>[y(_(e.$t("common.cancelText")),1)]),_:1}),s(ee,{onClick:t[5]||(t[5]=r=>ct(u(g))),type:"primary",class:"btn_ok"},{default:i(()=>[y(_(e.$t("common.okText")),1)]),_:1})]),default:i(()=>[s(Mt,{ref_key:"refForm",ref:Ce,model:u(g),name:"basic",rules:u(dt),"label-col":{span:6},"wrapper-col":{span:16},autocomplete:"off"},{default:i(()=>[s(F,{label:e.$t("component.table.name"),name:"name"},{default:i(()=>[s(a,{value:u(g).name,"onUpdate:value":t[6]||(t[6]=r=>u(g).name=r)},null,8,["value"])]),_:1},8,["label"]),s(F,{label:e.$t("component.table.description"),name:"description"},{default:i(()=>[s(a,{value:u(g).description,"onUpdate:value":t[7]||(t[7]=r=>u(g).description=r)},null,8,["value"])]),_:1},8,["label"]),s(F,{label:e.$t("component.table.template"),name:"template"},{default:i(()=>[s(a,{value:u(g).template,"onUpdate:value":t[8]||(t[8]=r=>u(g).template=r)},null,8,["value"])]),_:1},8,["label"]),s(F,{label:e.$t("component.table.template_en"),name:"template_en"},{default:i(()=>[s(a,{value:u(g).template_en,"onUpdate:value":t[9]||(t[9]=r=>u(g).template_en=r)},null,8,["value"])]),_:1},8,["label"]),s(F,{label:e.$t("component.table.tags"),name:"tags"},{default:i(()=>[(f(!0),V(ie,null,ze(u(N).tags,(r,C)=>(f(),V(ie,{key:r},[r.length>20?(f(),$(qe,{key:0,title:r},{default:i(()=>[s(z,{closable:!0,onClose:I=>Ne(r)},{default:i(()=>[y(_(`${r.slice(0,20)}...`),1)]),_:2},1032,["onClose"])]),_:2},1032,["title"])):r.length==0?(f(),$(z,{key:1})):(f(),$(z,{key:2,closable:!0,onClose:I=>Ne(r)},{default:i(()=>[y(_(r),1)]),_:2},1032,["onClose"]))],64))),128)),u(N).inputVisible?(f(),$(a,{key:0,ref_key:"inputRef",ref:Te,value:u(N).inputValue,"onUpdate:value":t[10]||(t[10]=r=>u(N).inputValue=r),type:"text",size:"small",style:{width:"78px"},onBlur:Ee,onKeyup:se(Ee,["enter"])},null,8,["value","onKeyup"])):(f(),$(z,{key:1,style:{background:"#fff","border-style":"dashed"},onClick:pt},{default:i(()=>[s(u(ve)),y(" "+_(e.$t("common.newTag")),1)]),_:1}))]),_:1},8,["label"]),s(F,{label:e.$t("component.table.returnType"),name:"returnType"},{default:i(()=>[(f(!0),V(ie,null,ze(u(g).returnType,r=>(f(),V(ie,{key:r},[r.length>20?(f(),$(qe,{key:0,title:r},{default:i(()=>[s(z,{closable:!0,onClose:C=>xe(r)},{default:i(()=>[y(_(`${r.slice(0,20)}...`),1)]),_:2},1032,["onClose"])]),_:2},1032,["title"])):r.length==0?(f(),$(z,{key:1})):(f(),$(z,{key:2,closable:!0,onClose:C=>xe(r)},{default:i(()=>[y(_(r),1)]),_:2},1032,["onClose"]))],64))),128)),u(ce)?(f(),$(a,{key:0,ref_key:"returnRef",ref:we,value:u(L),"onUpdate:value":t[11]||(t[11]=r=>te(L)?L.value=r:L=r),type:"text",size:"small",style:{width:"78px"},onBlur:De,onKeyup:se(De,["enter"])},null,8,["value","onKeyup"])):(f(),$(z,{key:1,style:{background:"#fff","border-style":"dashed"},onClick:mt},{default:i(()=>[s(u(ve)),y(" "+_(e.$t("common.newTag")),1)]),_:1}))]),_:1},8,["label"]),s(F,{label:e.$t("component.table.params"),name:"params"},{default:i(()=>[s(ee,{onClick:ut},{default:i(()=>[y(_(e.$t("awModeler.addParams")),1)]),_:1})]),_:1},8,["label"])]),_:1},8,["model","rules"]),s(u(Ze),{ref_key:"awParamsTable",ref:M,columns:B,tableRef:"awParamsTable"},null,512)]),_:1},8,["visible","title"])]),O("div",{ref_key:"tabledom",ref:Je},[s(u(Ze),{ref_key:"awModelTable",ref:d,columns:E,tableRef:"awModelTable",fetchObj:T,onGo2Page:R,onEdit:R,onDelete:ft,onPageChange:h,onClone:Tt},null,512),s(Le,{visible:u(j),"onUpdate:visible":t[15]||(t[15]=r=>te(j)?j.value=r:j=r),title:e.$t("component.table.clone"),onOk:Nt,"ok-text":e.$t("common.okText"),"cancel-text":e.$t("common.cancelText"),onCancel:xt},{default:i(()=>[s(Fe,{model:u(P),ref_key:"refCopy",ref:fe,rules:u(Ct)},{default:i(()=>[s(F,{name:"name",label:e.$t("component.table.name")},{default:i(()=>[s(a,{value:u(P).name,"onUpdate:value":t[13]||(t[13]=r=>u(P).name=r)},null,8,["value"])]),_:1},8,["label"]),s(F,{name:"description",label:e.$t("component.table.description")},{default:i(()=>[s(a,{value:u(P).description,"onUpdate:value":t[14]||(t[14]=r=>u(P).description=r)},null,8,["value"])]),_:1},8,["label"])]),_:1},8,["model","rules"])]),_:1},8,["visible","title","ok-text","cancel-text"])],512)]),_:1})],512)])}}});const Ul=Gt($l,[["__scopeId","data-v-8507f464"]]);export{Ul as default};
