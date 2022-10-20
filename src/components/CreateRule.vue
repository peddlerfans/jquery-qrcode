<script lang="ts">
export default {
    name:"CreateRule",
    mixins:[],
}
</script>
    <script lang="ts" setup>
    import { message, SelectProps } from 'ant-design-vue';
import {DeleteOutlined } from '@ant-design/icons-vue'
import { computed, ref } from 'vue';

    let props=defineProps(['rulesData','keys','formDatas','valueData','topDatas','enableDeleteChild','autoIndex'])
    let emit=defineEmits(['changeObserver','rulesChange'])
    console.log(props.enableDeleteChild);

    let selectvalue=ref('')
    const  relations=[{
                label: "AND",
                value:"AND"
            },{
                label: "OR",
                value:"OR"
            }]
// 条件判断中的比较符号
const stringOptions = [
  {
    value: '=',
    label: '=',
  },
  {
    value: '<>',
    label: '<>',
  },
  {
    value: 'IN',
    label: 'IN',
  },
  {
    value: 'LIKE',
    label: 'LIKE',
  }
]
const numberOptions = [
  {
    value: '=',
    label: '=',
  },
  {
    value: '<',
    label: '<',
  },
  {
    value: '>',
    label: '>',
  },
  {
    value: '<=',
    label: '<=',
  },
  {
    value: '>=',
    label: '>=',
  },
  {
    value: '<>',
    label: '<>',
  },
  {
    value: 'IN',
    label: 'IN',
  }
]

const valueDatas=computed(()=>{
    return props.valueData.map((item: any,index: any)=>{
    return {name:item.name,type:item.type,values:item.values.map((e: any) => { return { value: e, label: e } })}
})
})
console.log(valueDatas);

const valuechange=(data: any)=>{
    selectvalue.value=data
    
}

            
const changeObserver=()=>{
    emit("changeObserver", props.rulesData)
}
function addCondition(){
    let conditionName = props.formDatas && props.formDatas[0] && props.formDatas[0].label
        
        if(conditionName){
            if(props.rulesData[0].conditions.length>0){
                let length= props.rulesData[0].conditions.length
                let str=props.rulesData[0].conditions[length-1].selectvalue
                if(str){
                props.rulesData[0].conditions.push({
                    name: undefined,
                    operate:undefined,
                    value:undefined ,
                    selectvalue:undefined,
                    // selectcondition:"a",
                    // selectconditiones:"c"
                        }) 
            }else{
                message.warning('Please select the conditional link keyword first')
            }
            }else{
                props.rulesData[0].conditions.push({
                    name: undefined,
                    operate:undefined,
                    value:undefined,
                    selectvalue:undefined,
                    // selectcondition:"a",
                    // selectconditiones:"c"
                        })
            }
            
        
        rulesChange(props.rulesData)
        console.log(props.rulesData.conditions);
    }else{
        message.warning("Please get the condition data first!")
    }
    
    
    
}
function addChild(){
    let conditionName = props.formDatas && props.formDatas[0] && props.formDatas[0].label
    if(props.rulesData[0].relation){
    if(conditionName){
        props.rulesData[0].children.push({ 
            relation: '',
            conditions:[],
            children:[]
        })
        changeObserver()//监测组件是否改变的方法,组件改变不等于条件改变的ruleChange方法
    }else{
        message.warning("Please get the condition data first!")
    }
}else{
        message.warning('Please select the conditional link keyword first')
    }
}
function deleteChild (index: any){
    let conditionDelete = props.topDatas && props.topDatas[0].children && props.topDatas[0].children.length > 0
    if(conditionDelete){
        props.topDatas[0].children.splice(index, 1)
    }
    rulesChange(props.rulesData)
}
function daeteCondition(index: any){
    props.rulesData[0].conditions.splice(index, 1)
    rulesChange(props.rulesData)
}
function childChange(childData: any){
    rulesChange(childData)
}
function rulesChange(rulesData:any){
    changeObserver()
    emit("rulesChange", props.rulesData,props.keys)
}
// 控制条件判断的属性
const radiooption=[{label:'one',value:'a'},{label:'more',value:'b'}]
const radiooptions=[{label:'params',value:'c'},{label:'value',value:'d'}]
</script>

<template>
    <div class="box">
    <div class="rules-box" :title=rulesData[0].relation>
    <div class="ant-card-body" >
        <a-row class="loop-child " >
            <a-select 
                
                class="button-select"
                size="small"
                :options="relations"
                v-model:value="rulesData[0].relation"
                @change="rulesChange"
                placeholder="name"
            >
            </a-select>
            
        </a-row>
        <template v-for="(item, index) in rulesData[0].conditions" :key="'condition'+index">
            <a-row  class=" loop-child">
                <a-select
                    class="condition"
                    v-model:value="item.name"
                    :options="formDatas"
                    @change="rulesChange"
                    size="small"
                    placeholder="name"
                >
                </a-select>
                <template v-for="(operaitem,opearindex) in valueData" :key="opearindex">
                    <template v-if="operaitem.name==item.name">
                        <template v-if="operaitem.type=='string'">
                    <a-select
                    class="condition"
                    v-model:value="item.operate"
                    @change="rulesChange"
                    :options="stringOptions"
                    size="small"
                    placeholder="operate">
                </a-select>
                </template>
                <template v-else>
                    <a-select
                    class="condition"
                    v-model:value="item.operate"
                    @change="rulesChange"
                    :options="numberOptions"
                    size="small"
                    placeholder="operate"
                >
                </a-select>
                </template>
                    </template>
                </template>
                <!-- 只有一个条件的参数比对 -->
                <div class="condition"  >
                    <template v-for="(valueitem,indexs) in valueDatas" :key="indexs">
                        <template v-if="valueitem.name==item.name">
                        <a-select 
                        v-if="item.operate=='IN' && item.value"
                        :options="valueitem.values"
                        mode="multiple"
                        size="small"
                        v-model:value="item.value"
                        @change="rulesChange"
                        placeholder="value"
                        ></a-select>
                
                        <a-select 
                        v-else
                        :options="valueitem.values"
                        size="small"
                        v-model:value="item.value"
                        @change="rulesChange"
                        placeholder="value"
                        ></a-select>
                    </template>
                    </template>
                </div>
                <div></div>
                <!-- 只有一个条件的值比对 -->
                <!-- <div class="condition-value"  v-if="item.selectcondition=='a' && item.selectconditiones=='d'">
                    <template v-for="(valueitem,indexs) in valueDatas" :key="indexs">
                        <a-select 
                        v-if="valueitem.name==item.name"
                        class="condition-operate"
                        :options="valueitem.values"
                        size="small"
                        v-model:value="item.value"
                        @change="rulesChange"
                        ></a-select>
                    </template>
                </div> -->
                <!-- 多个条件的参数比对 -->
                <!-- <div class="condition-value"  v-if="item.selectcondition=='b' && item.selectconditiones=='c'">
                    <template v-for="(valueitem,indexs) in valueDatas" :key="indexs">
                        <a-select 
                        v-if="valueitem.name==item.name"
                        class="condition-operate"
                        mode="multiple"
                        :options="formDatas"
                        size="small"
                        v-model:value="item.value"
                        @change="rulesChange"
                        ></a-select>
                    </template>
                </div> -->
                <!-- 多个条件的值比对 -->
                <!-- <div class="condition-value"  v-if="item.selectcondition=='b' && item.selectconditiones=='d'">
                    <template v-for="(valueitem,indexs) in valueDatas" :key="indexs">
                        <a-select 
                        v-if="valueitem.name==item.name"
                        class="condition-operate"
                        mode="multiple"
                        :options="valueitem.values"
                        size="small"
                        v-model:value="item.value"
                        @change="rulesChange"
                        ></a-select>
                    </template>
                </div> -->
                    <a-select
                    class="condition"
                    :options="relations"
                    size="small"
                    v-model:value="item.selectvalue"
                    @change="valuechange"
                    placeholder="Connection Keyword"
                    >
                    </a-select>
                <!-- <a-radio-group class="radioclass" v-model:value="item.selectcondition" :options="radiooption"></a-radio-group>
                <a-radio-group class="radioclass" v-model:value="item.selectconditiones" :options="radiooptions"></a-radio-group> -->

                <a-button
                    class="button-select"
                    @click="daeteCondition(index)"
                    title="delete"
                    size="small"
                >delete</a-button>
            </a-row>
        </template>
        
    </div>
    <a-row style="padding-left:10px"  v-if="rulesData[0].children.length > 0">
            <create-rule
                
                :valueData="valueData"
                :formDatas="formDatas" 
                :topDatas="rulesData"
                :rulesData="rulesData[0].children"
                :enableDeleteChild="true"
                @rulesChange="childChange"
                @changeObserver="changeObserver"
            />
        </a-row>
        
    </div>
    <a-row class=" loop-childs" >
            <a-button
                v-if="enableDeleteChild"
                class="button-select"
                title="删除子条件"
                size="small"
                @click="deleteChild(autoIndex)"
            >delete</a-button>
            <a-button
                class="button-select"
                title="Add inner group"
                size="small"
                @click="addChild"
            >Add inner group</a-button>
            <a-button
                class="button-select"
                title="Add filter"
                size="small"
                @click="addCondition"
            >Add filter</a-button>
        </a-row>
</div>
</template>

<style lang="less" scoped>
.box{
    width: 100%;
    background-color: white;
}
    .rules-box{
        margin-left: .625rem;
        background-color: white;
        border-left: 1px solid red;
        border-top-left-radius: 5px; 
        border-bottom-left-radius: 5px; 
        position: relative;
            &::before{
                content:attr(title);
                position:absolute;
                top:50%;
                transform:translateY(-50%);
                -webkit-transform:translate(-50%,-50%);
                padding:10px 0;
                background-color: white;
            }

        .loop-child{
            width:100%;
            position:relative;
            padding:10px 0 10px 12px;
            line-height:1;
            
            // &::before{
            //     display:block;
            //     content:attr(title);
            //     position:absolute;
            //     top:50%;
            //     transform:translateY(-50%);
            //     -webkit-transform:translate(-50%,-50%);
            // }
            .button-select{
                cursor:pointer;
                // padding:0.28em;
                margin-right:0.5em;
            }

            .condition{
                margin-right: 0.5rem;
            }
            // /deep/.radioclass{
            //     .ant-radio-wrapper{
            //         span:nth-child(2) {
            //             padding-left: .125rem;
            //             padding-right: 0;
            //         }
            //     }
                
            // }
        }
    }
    .loop-childs{
        width:100%;
            position:relative;
            padding:10px 0 10px 12px;
            line-height:1;
            .button-select{
                cursor:pointer;
                // padding:0.28em;
                margin-right:0.5em;
            }

    }
</style>