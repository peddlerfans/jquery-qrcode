import{d as Re,O as Ve,ac as Ae,r as F,L as Le,a as l,c as x,M as D,N as K,V as r,W as i,b as o,S as s,Z as u,$ as ae,ah as ne,ar as le,Q as E,R as J,bH as oe,ae as Be,a0 as Fe,az as Ke,bS as Ee,Y as f,a1 as Ue,aj as Pe,bV as qe,bW as ze,aa as We}from"./index.3614183b.js";import{_ as He,T as Qe}from"./index.4642cd79.js";import{_ as Ye}from"./index.5931ae8c.js";/* empty css              *//* empty css               *//* empty css              */import{_ as Ze}from"./index.89207c6a.js";import{_ as Ge}from"./index.vue_vue_type_script_setup_true_lang.dc6c6f55.js";/* empty css               */import{C as se}from"./CreateRule.ae707c8b.js";import{_ as Xe}from"./index.351a724d.js";import{_ as je}from"./index.a4a12abb.js";import"./useRefs.e2c20bfc.js";import"./index.01976f6f.js";/* empty css               */import"./EditOutlined.cfe60ffa.js";import"./DeleteOutlined.a585300f.js";const ie=M=>(qe("data-v-d9832314"),M=M(),ze(),M),et={style:{height:"100%","overflow-x":"hidden!important"}},tt={style:{margin:"30px 0 8px 0"}},at={style:{display:"inline"}},nt={style:{margin:"30px 0px 8px 0px"}},lt={style:{display:"inline"}},ot={key:0},st={style:{display:"flex","align-items":"center"}},it={style:{"font-size":"14px","margin-left":".625rem"}},rt=ie(()=>r("hr",null,null,-1)),ut={style:{"margin-top":".625rem"}},ct={style:{display:"flex","justify-content":"space-between"}},dt={style:{display:"flex"}},pt=ie(()=>r("hr",null,null,-1)),mt={style:{"margin-top":".625rem"}},vt={style:{"margin-top":"1.875rem"}},ft={key:1,style:{color:"#ff4d4f"}},_t=Re({__name:"dynamicModel",setup(M){const{t:S}=Ve();let re=Ee,C=Ae(),p;sessionStorage.setItem("dynamic_"+C.params._id,JSON.stringify(C.params._id));let n=F({option:{},factor:[],constraint:[],constraintif:[]});async function U(e){p=await E.get(`/api/templates/${e}`,{params:{category:"dynamic"}}),n.option=p.model.option,n.factor=p.model.factor.map(t=>({...t,editing:!1,inputVisible:!1,inputValue:""})),p.model.constraint&&(n.constraint=q(p.model.constraint)),p.model.constraintif&&(n.constraintif=q(p.model.constraintif)),b.value=n.constraint.map((t,a)=>({if:c(t.if),then:c(t.then),keys:a})),A.value=n.factor,$.value.setTableData(p.model.factor||[]),Z.value.setTableData(p.model.constraintif)}let P;Le(()=>{P=sessionStorage.getItem("dynamic_"+C.params._id),U(JSON.parse(P))});const R=async()=>{ce.value?n.factor.length<2?J.warning(S("templateManager.saveModelTip")):(await E.put(re+`/${p._id}`,{model:oe(n)})&&U(p._id),J.success(S("templateManager.saveModelSuccess"))):J.warning(S("templateManager.saveTip"))},ue=l([{value:"pairwise",label:"Pairwise"},{value:"fullcombination",label:"Full Combination",disabled:!0},{value:"random",label:"Random",disabled:!0}]);F({name:"",type:"",values:[],editing:!0,inputVisible:!1,inputValue:""}),l();let ce=l(!0);const de=()=>{$.value.createNewRow({name:"",type:"",values:[]})},pe=[{value:"=",label:"="},{value:"<>",label:"<>"},{value:"IN",label:"IN"},{value:"LIKE",label:"LIKE"}],me=[{value:"=",label:"="},{value:"<",label:"<"},{value:">",label:">"},{value:"<=",label:"<="},{value:">=",label:">="},{value:"<>",label:"<>"},{value:"IN",label:"IN"}],_=l({thenName:"",thenOperator:"",thenValue:""});x(()=>_.value.thenName==""?l([]).value:n.factor.filter(e=>e.name==_.value.thenName)[0].type=="string"?l(pe).value:l(me).value);const O=x(()=>l(n.factor.map(e=>({value:e.name,label:e.name}))).value);x(()=>_.value.thenName==""?l([]).value:l(n.factor.filter(e=>e.name==_.value.thenName)[0].values.map(e=>({value:e,label:e}))).value);let V=l(!0);F([]);let N=l(!1),ve=l();const fe=()=>{N.value=!N.value,ve.value=n.factor,V.value=!1},q=e=>e.map((t,a)=>({...t,keys:a}));function c(e){let t=null;for(let a=0;a<e.length;a++){let v=e[a];if(v.conditions.length>1?t=`(${W(v.conditions)}) ${v.relation} `:t=`${W(v.conditions)} ${v.relation} `,v.children.length>0)t+=c(v.children);else break}if(t!=null){let a=t.length;return(t.substring(a-4,a)=="AND "||t.substring(a-3,a)=="OR ")&&(t=t.substring(0,a-4)),t}}function z(e){let t=null;if(Array.isArray(e))if(e.length>1)if(JSON.stringify(O.value).includes(e[0])){let a=e.map(v=>[v]);t=`{${JSON.stringify(a).substring(1,JSON.stringify(a).length-1).replace(/"/g,"")}}`}else t=`{${JSON.stringify(e).replace("[","").replace("]","")}}`;else JSON.stringify(O.value).includes(e[0])?t=JSON.stringify(e).replaceAll('"',""):t=JSON.stringify(e).replace("[","").replace("]","");else JSON.stringify(O.value).includes(e)?t=`[${e}]`:t=JSON.stringify(e);return t}const W=e=>{let t=null;return e[e.length-1].value,t=e.map(a=>a.selectvalues?`[${a.name}] ${a.operator} ${z(a.value)} ${a.selectvalues} `:`[${a.name}] ${a.operator} ${z(a.value)} `),t.join("").toString().substring(0,t.join("").toString().length-4)},_e=(e,t)=>{d.value=e},ye=(e,t)=>{y.value=e};let b=l([]);const m=l(-1),ge=()=>{if(d.value&&y.value){let e={if:d.value,then:y.value};m.value>=0?(n.constraint[m.value]={...e},n.constraintif[m.value]={if:c(d.value),then:c(y.value),keys:m.value},b.value[m.value]={if:c(d.value),then:c(y.value),keys:m.value}):(b.value.push({if:c(d.value),then:c(y.value),keys:b.value.length}),n.constraint.push({...e}),n.constraintif.push({if:c(d.value),then:c(y.value),keys:b.value.length})),m.value=-1,R()}H()},H=()=>{m.value=-1,d.value=[{relation:"AND",id:1,conditions:[{name:"name",operator:"=",value:void 0,selectvalues:T}],children:[]}],y.value=[{relation:"AND",id:1,conditions:[{name:"name",operator:"=",value:void 0,selectvalues:T}],children:[]}],_.value.thenName="",_.value.thenOperator="",_.value.thenValue="",N.value=!1,V.value=!0},he=x(()=>{if(d.value[0].conditions.length>0)return c(d.value).includes("undefined")?"":c(d.value)}),Q=O,A=l();let L="AND",T=L;const d=l([{relation:L,id:1,conditions:[{name:"name",operator:"=",value:void 0,selectvalues:T}],children:[]}]),y=l([{relation:L,id:1,conditions:[{name:"name",operator:"=",value:void 0,selectvalues:T}],children:[]}]);let w=l(""),k=l(!1),Y=l(),B=l(),be=JSON.parse(sessionStorage.getItem("dynamic_"+C.params._id)),I=l("1");const ke=async()=>{var t;let e=await E.post(`/api/templates/${be}/preview`);e.error?w.value=e.error:w.value="",console.log(w.value,e),B.value=e,Y.value=(t=e.model)==null?void 0:t.parameters.map(a=>({title:a.property,dataIndex:a.property,key:a.property})),k.value=!0};let $=l(null);const Ne=[{title:"name",width:180},{title:"type",width:180,option:"2"},{title:"values",width:180},{title:"action",width:100,actionList:["edit","delete"]}],we=e=>{let t=e.index;delete e.index,n.factor.splice(t,1,e),$.value.setTableData(n.factor)},$e=e=>{const t=n.factor.findIndex(a=>JSON.stringify(a)===JSON.stringify(e));t!==-1&&(n.factor.splice(t,1),$.value.setTableData(n.factor),J.success(S("component.message.delText")))};let Z=l(null);const De=[{title:"if",width:120},{title:"then",width:120},{title:"action",width:60,cbName:["edit","delete"],actionList:["edit","delete"]}],Me=e=>{m.value=e.keys,n.constraint.length>0&&(d.value=n.constraint[e.keys].if,_.value.thenName=n.constraint[e.keys].then.thenName,_.value.thenOperator=n.constraint[e.keys].then.thenOperator,_.value.thenValue=n.constraint[e.keys].then.thenValue),N.value=!0},Se=e=>{b.value.splice(e.keys,1),n.constraint.splice(e.keys,1),n.constraintif.splice(e.keys,1),R()},G=()=>{k.value=!1};return(e,t)=>{const a=Ue,v=Pe,Ce=Be,h=Fe,X=Ge,j=Ze,ee=je,Oe=Xe,Te=Ye,te=He,Ie=Qe,xe=Ke;return D(),K("main",et,[r("div",null,[r("h2",null,i(e.$t("templateManager.optionLabel")),1),o(Ce,{name:"basic","wrapper-col":{span:2},autocomplete:"off"},{default:s(()=>[o(v,{label:e.$t("templateManager.strategyLabel")},{default:s(()=>[o(a,{value:u(n).option.strategy,"onUpdate:value":t[0]||(t[0]=g=>u(n).option.strategy=g),options:ue.value},null,8,["value","options"])]),_:1},8,["label"])]),_:1})]),r("div",tt,[r("h2",at,i(e.$t("templateManager.factorsLabel")),1),o(h,{onClick:de,class:"editable-add-btn",style:{"margin-left":"12px"}},{default:s(()=>[f(i(e.$t("templateManager.newFactor")),1)]),_:1})]),o(X,{ref_key:"factorsTable",ref:$,columns:Ne,tableRef:"factorsTable",onSave:we,onDelete:$e},null,512),r("div",nt,[r("h2",lt,i(e.$t("templateManager.constraintLabel")),1),u(V)?(D(),ae(h,{key:0,onClick:fe,class:"editable-add-btn",style:{"margin-left":"12px"}},{default:s(()=>[f(i(e.$t("templateManager.newConstraint")),1)]),_:1})):ne("",!0)]),o(X,{ref_key:"constraintTable",ref:Z,columns:De,tableRef:"constraintTable",onEdit:Me,onDelete:Se},null,512),o(j),u(N)?(D(),K("div",ot,[o(Oe,{style:{backgroundColor:"white"}},{default:s(()=>[o(ee,{span:12,style:{"padding-top":"10px"}},{default:s(()=>[r("h2",st,[f(i(e.$t("component.table.if"))+" ",1),r("div",it,i(u(he)),1)]),rt,r("div",ut,[o(se,{keys:m.value,formDatas:u(Q),valueData:A.value,rulesData:d.value,onRulesChange:_e},null,8,["keys","formDatas","valueData","rulesData"])])]),_:1}),o(j,{type:"vertical"}),o(ee,{span:11,style:{"margin-left":".625rem","padding-top":".625rem"}},{default:s(()=>[r("h2",ct,[f(i(e.$t("component.table.then"))+" ",1),r("div",dt,[o(h,{type:"primary",onClick:ge},{default:s(()=>[f(i(e.$t("common.saveText")),1)]),_:1}),o(h,{onClick:H},{default:s(()=>[f(i(e.$t("common.cancelText")),1)]),_:1})])]),pt,r("div",mt,[o(se,{keys:m.value,formDatas:u(Q),valueData:A.value,rulesData:y.value,onRulesChange:ye},null,8,["keys","formDatas","valueData","rulesData"])])]),_:1})]),_:1})])):ne("",!0),r("div",vt,[o(h,{type:"primary",onClick:R,class:"",style:{"margin-bottom":"8px"}},{default:s(()=>[f(i(e.$t("templateManager.saveModel")),1)]),_:1}),o(h,{onClick:t[1]||(t[1]=g=>ke())},{default:s(()=>[f(i(e.$t("common.preview")),1)]),_:1})]),o(xe,{visible:u(k),"onUpdate:visible":t[3]||(t[3]=g=>le(k)?k.value=g:k=g),title:e.$t("templateManager.previewModel"),width:900},{footer:s(()=>[o(h,{key:"back",onClick:G},{default:s(()=>[f(i(e.$t("common.cancelText")),1)]),_:1}),o(h,{key:"submit",type:"primary",onClick:G},{default:s(()=>[f(i(e.$t("common.okText")),1)]),_:1})]),default:s(()=>[o(Ie,{activeKey:u(I),"onUpdate:activeKey":t[2]||(t[2]=g=>le(I)?I.value=g:I=g)},{default:s(()=>[o(te,{key:"1",tab:e.$t("templateManager.data")},{default:s(()=>[u(w)?(D(),K("p",ft,i(u(w)),1)):(D(),ae(Te,{key:0,columns:u(Y),"data-source":u(B).data,bordered:"",scroll:{x:!0}},{bodyCell:s(({column:g,text:Je,record:yt})=>[f(i(Je),1)]),_:1},8,["columns","data-source"]))]),_:1},8,["tab"]),o(te,{key:"2",tab:e.$t("templateManager.template")},{default:s(()=>[r("pre",null,i(JSON.stringify(oe(u(B).model),null,2)),1)]),_:1},8,["tab"])]),_:1},8,["activeKey"])]),_:1},8,["visible","title"])])}}});const Vt=We(_t,[["__scopeId","data-v-d9832314"]]);export{Vt as default};
