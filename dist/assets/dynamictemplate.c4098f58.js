import{d as Z,a as s,O as E,r as L,w as Q,a5 as W,M as $,N as Y,V as G,b as t,S as l,Z as n,ar as C,Q as v,az as H,$ as J,ah as K,Y as x,W as M,au as X,ai as ee,a0 as ae,ae as te,aj as le,aa as ne}from"./index.3614183b.js";/* empty css               *//* empty css              */import{_ as oe}from"./index.c5cedc9d.js";/* empty css              *//* empty css               */import{_ as se}from"./index.vue_vue_type_script_setup_true_lang.dc6c6f55.js";import{_ as re}from"./index.351a724d.js";import{P as ie}from"./index.01976f6f.js";import{_ as ce}from"./index.a4a12abb.js";import"./index.5931ae8c.js";import"./index.89207c6a.js";/* empty css               */import"./EditOutlined.cfe60ffa.js";import"./DeleteOutlined.a585300f.js";const me={style:{height:"100%","overflow-x":"hidden!important"}},ue={class:"block shadow"},pe=Z({__name:"dynamictemplate",setup(de){const q=[{title:"name",link:"dynamicModeler",require:!0},{title:"description",require:!0},{title:"tags"},{title:"action",actionList:["edit","delete","clone"]}],b={url:"/api/templates",searchText:"",createParams:"dynamic"};let d=s(null);const{t:f}=E(),m=L({search:"",q:"category:dynamic"});Q(()=>m.search,e=>{b.searchText=e}),s([]),W();const F=e=>{d.value.query(m.search)},P=e=>{console.log(e)};let k=s(),h=s(!1),_=s(""),y=s([{value:"tags:",label:"tags:",isLeaf:!1},{value:"name:",label:"name:"}]);const V=async e=>{console.log(e);let a=await v.get("/api/templates/_tags",{params:{q:"category:dynamic"}});const i=e[0];i.loading=!0,a.length>0&&(a=a.map(p=>({value:p,label:p})),i.children=a),i.loading=!1,y.value=[...y.value]},D=async e=>{if(e){let a=new RegExp(",","g");m.search+=e.toString().replace(a,"")}_.value="",h.value=!1,X(()=>{k.value.focus()})},N=e=>{m.search=="@"&&(h.value=!0)},R=()=>{d.value.createNewRow({name:"",description:"",tags:[]})};let S=async(e,a)=>{let i=/^[a-zA-Z0-9\$][a-zA-Z0-9\d_]*$/,p=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;if(a){if(!i.test(a)&&!p.test(a))return Promise.reject(f("templateManager.namehefa"));{let c=await v.get("/api/templates",{params:{q:"category:dynamic",search:`@name:${a}`}});return c.data&&c.data.length>0&&c.data[0].name==a?Promise.reject(f("templateManager.duplicate")):Promise.resolve()}}else return Promise.reject(f("templateManager.nameinput"))},g=s(),j={name:[{required:!0,validator:S,trigger:"blur"}]},r=s({name:""}),u=s(!1);const B=e=>{r.value.name=`${e.name}_clone`,r.value={...e,name:r.value.name},u.value=!0},I=()=>{n(g).validate().then(async()=>{delete r.value._id,v.post("/api/templates",r.value).then(e=>{let a=d.value.getTableData();a.unshift(e),d.value.setTableData(a),e&&e._id&&(u.value=!1)})})},O=()=>{g.value.clearValidate()};return(e,a)=>{const i=ee,p=oe,c=ce,T=ae,w=te,z=re,A=le,U=H;return $(),Y("main",me,[G("header",ue,[t(z,null,{default:l(()=>[t(c,{span:20},{default:l(()=>[t(w,{layout:"inline",class:"search_form",model:m,onFinish:F,onFinishFailed:P,"wrapper-col":{span:24}},{default:l(()=>[t(c,{span:20},{default:l(()=>[t(i,{value:m.search,"onUpdate:value":a[0]||(a[0]=o=>m.search=o),placeholder:e.$t("awModeler.inputSearch1"),onChange:N,ref_key:"searchInput",ref:k},null,8,["value","placeholder"]),n(h)?($(),J(p,{key:0,"load-data":V,value:n(_),"onUpdate:value":a[1]||(a[1]=o=>C(_)?_.value=o:_=o),placeholder:"Please select",options:n(y),onChange:D},null,8,["value","options"])):K("",!0)]),_:1}),t(c,{span:4},{default:l(()=>[t(T,{type:"primary","html-type":"submit"},{default:l(()=>[x(M(e.$t("common.searchText")),1)]),_:1})]),_:1})]),_:1},8,["model"])]),_:1}),t(c,{span:4},{default:l(()=>[t(T,{type:"primary",onClick:R},{icon:l(()=>[t(n(ie))]),default:l(()=>[x(" "+M(e.$t("templateManager.createDynamicTemp")),1)]),_:1})]),_:1})]),_:1})]),t(n(se),{ref_key:"dynamicTable",ref:d,columns:q,tableRef:"dynamicTemplateTable",fetchObj:b,onClone:B},null,512),t(U,{visible:n(u),"onUpdate:visible":a[3]||(a[3]=o=>C(u)?u.value=o:u=o),title:e.$t("component.table.clone"),onOk:I,"ok-text":e.$t("common.okText"),"cancel-text":e.$t("common.cancelText"),onCancel:O},{default:l(()=>[t(w,{model:n(r),ref_key:"refCopy",ref:g,rules:n(j)},{default:l(()=>[t(A,{name:"name",label:e.$t("component.table.name")},{default:l(()=>[t(i,{value:n(r).name,"onUpdate:value":a[2]||(a[2]=o=>n(r).name=o)},null,8,["value"])]),_:1},8,["label"])]),_:1},8,["model","rules"])]),_:1},8,["visible","title","ok-text","cancel-text"])])}}});const Fe=ne(pe,[["__scopeId","data-v-bdaff00a"]]);export{Fe as default};
