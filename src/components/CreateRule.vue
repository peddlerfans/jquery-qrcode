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
                label: "and",
                value:"and"
            },{
                label: "or",
                value:"or"
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
                    name: conditionName,
                    operate:"",
                    value:"" ,
                    selectvalue:''
                        }) 
            }else{
                message.warning('请先选择条件链接关键字')
            }
            }else{
                props.rulesData[0].conditions.push({
                    name: conditionName,
                    operate:"",
                    value:"",
                    selectvalue:""
                        })
            }
            
        
        rulesChange(props.rulesData)
        console.log(props.rulesData.conditions);
    }else{
        message.warning("请先获取条件数据！")
    }
    
    
    
}
function addChild(){
    let conditionName = props.formDatas && props.formDatas[0] && props.formDatas[0].label
    if(props.rulesData[0].relation){
    if(conditionName){
        props.rulesData[0].children.push({ 
            relation: 'and',
            conditions:[],
            children:[]
        })
        changeObserver()//监测组件是否改变的方法,组件改变不等于条件改变的ruleChange方法
    }else{
        message.warning("请先获取条件数据！")
    }
}else{
        message.warning('请先选择条件链接关键字')
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
    console.log(rulesData);
    changeObserver()
    emit("rulesChange", props.rulesData,props.keys)
}



</script>

<template>
    <div class="rules-box">
    <a-card >
        <a-row>
                <a-row class="loop-child flex-row">
                    <a-select 
                        class="raations-box"
                        size="small"
                        :options="relations"
                        v-model:value="rulesData[0].relation"
                        @change="rulesChange"
                    >
                    </a-select>
                    <a-button
                        v-if="enableDeleteChild"
                        class="daete-child"
                        title="删除子条件"
                        @click="deleteChild(autoIndex)"
                    >删除子条件</a-button>
                    <a-button
                        class="add-child"
                        title="添加条件"
                        @click="addChild"
                    >添加同级条件</a-button>
                    <a-button
                        class="add-sibling"
                        title="添加同级条件"
                        @click="addCondition"
                    >添加子条件</a-button>
                </a-row>
                <template v-for="(item, index) in rulesData[0].conditions" :key="'condition'+index">
                    <a-row  class="flex-row loop-child">
                        <a-select
                            class="condition-name"
                            v-model:value="item.name"
                            :options="formDatas"
                            @change="rulesChange"
                            size="small"
                            placeholder="请选择条件名"
                        >
                        </a-select>
                        <template v-for="(operaitem,opearindex) in valueData" :key="opearindex">
                            <template v-if="operaitem.name==item.name">
                                <template v-if="operaitem.type=='string'">
                            <a-select
                            class="condition-operate"
                            v-model:value="item.operate"
                            @change="rulesChange"
                            :options="stringOptions"
                            size="small"
                            placeholder="请选择逻辑符号">
                        </a-select>
                        </template>
                        <template v-else>
                            <a-select
                            class="condition-operate"
                            v-model:value="item.operate"
                            @change="rulesChange"
                            :options="numberOptions"
                            size="small"
                            placeholder="请选择逻辑符号"
                        >
                        </a-select>
                        </template>
                            </template>
                        </template>
                        
                        <div class="condition-value">
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
                            <a-select
                            class="condition-operate"
                            :options="relations"
                            size="small"
                            v-model:value="item.selectvalue"
                            @change="valuechange"
                            placeholder="条件链接关键字"
                            >
                            </a-select>
                            <!-- <span>{{item.selectvalue}}</span> -->
                        </div>
                        <a-button
                            class="daete-condition"
                            @click="daeteCondition(index)"
                            title="删除条件"
                        >删除</a-button>
                    </a-row>
                </template>
                <!-- <a-row
                    v-if="rulesData[0].children.length > 0"
                    v-for="(group, index) in rulesData[0].children"
                    class="loop-child"
                    :key="'row-'+autoIndex+'-'+index"
                >
                    <create-rule
                        :valueData="valueData"
                        :formDatas="formDatas" 
                        :topDatas="rulesData"
                        :rulesData="group"
                        :enableDaeteChild="true"
                        :autoIndex="index"
                        @rulesChange="childChange"
                    />
                </a-row> -->
                <a-row
                    v-if="rulesData[0].children.length > 0">
                    <create-rule
                        :valueData="valueData"
                        :formDatas="formDatas" 
                        :topDatas="rulesData"
                        :rulesData="rulesData[0].children"
                        :enableDeleteChild="true"
                        @rulesChange="childChange"
                    />
                </a-row>
        </a-row>
    </a-card>
</div>
</template>

<style lang="less" scoped>
    .rules-box{
        width:100%;
        *{
            box-sizing:border-box;
        }
        ::v-deep {
            .ant-card-body{
                padding:0 1rem;
                width: 100%;
            }
        }
        .flex-row{
            display: flex;
            flex-direction: row;
            align-items:center;
        }
        .loop-child{
            width:100%;
            position:relative;
            border:1px solid #d9d9d9;
            border-style: none none none solid;
            padding:10px 0 10px 12px;
            line-height:1;


            &::before{
                display:block;
                content:'';
                position:absolute;
                background-color:white;
                width:1px;
                height:50%;
            }
            &:first-child::before{
                left:-1px;
                top:0;
            }
            &:last-child::before{
                left:-1px;
                bottom:0;
            }
            &::after{
                top:50%;
                left:0;
                position:absolute;
                content:'';
                display:block;
                width:1px;
                height:1px;
                border:1px solid #d9d9d9;
                border-style: solid none none none;
            }
            .relations-box{
                margin-right:0.5em;
            }
            .delete-child{
                cursor:pointer;
                padding:0.28em;
                margin-right:0.5em;
            }
            .delete-condition{
                cursor:pointer;
                padding:0.28em;
                margin:0 0 0 0.5em;
            }
            .add-child{
                cursor:pointer;
                padding:0.28em;
                margin-right:0.5em;

                i{
                    font-size:18px;
                }
            }
            .add-sibling{
                cursor:pointer;
                padding:0.28em;
                margin-right:0.5em;

                i{
                    font-size:18px;
                }
            }
            .condition-name{
                max-width:140px;
                ::v-deep{
                    .el-input{
                        display:inline-block;
                    }
                }
            }
            .condition-operate{
                max-width:83px;
            }
            .condition-value{
                flex:1;
                margin-left:1rem;
            }
        }
    }
</style>