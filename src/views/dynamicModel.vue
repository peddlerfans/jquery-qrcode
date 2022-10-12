<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  onBeforeMount,
  defineComponent,
  UnwrapRef,
  onMounted,
  nextTick,
  toRaw,
  getCurrentInstance
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import request from '@/utils/request';
import {
  templateUrl
} from '@/appConfig'
import * as _ from 'lodash'
import { cloneDeep } from 'lodash-es';
import type {
  FormProps,
  SelectProps,
} from 'ant-design-vue';
import {
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SwapOutlined,
} from '@ant-design/icons-vue';
import {
  message,
  Table
} from 'ant-design-vue/es'
import { Rule } from 'ant-design-vue/es/form';
import { Dropdown, Space, Tooltip, Modal, Alert, Menu } from 'ant-design-vue';
import {
  tableSearch,
  FormState,
  paramsobj,
  ModelState,
  statesTs,
  Model,
  Factor,
  Constraint,
  valueStatesTs,
} from "./componentTS/dynamictemplate";
import { purple } from '@ant-design/colors';


// Specify the api for dynamic template data CRUD
let url = templateUrl;
let route = useRoute()
let finalResult: any;
let modelId: any;

sessionStorage.setItem('dynamic_' + route.params._id, String(route.params._id))
// 获取当前数据并赋值
let finalModel: Model = reactive({
  option: {},
  factor: [],
  constraint: []
})// 根据传来的id值获取到数据
async function query(id?: any) {
  finalResult = await request.get(`/api/templates/${id}`, { params: { category: 'dynamic' } })
  console.log('finalModel')
  console.log(finalResult)
  finalModel.option = finalResult.model!.option
  finalModel.factor = finalResult.model!.factor.map((e: any) => {
    return {
      ...e, editing: false, inputVisible: false, inputValue: ''
    }
  })
  finalModel.constraint = finalResult.model!.constraint.map((e: any) => {
    return {
      ...e, editing: false
    }
  })


  console.log(finalModel)
}

onMounted(() => {
  modelId = sessionStorage.getItem('dynamic_' + route.params._id)
  // modelId=JSON.parse(modelId)
  console.log('onMounted');
  console.log(modelId);

  query(modelId)
})


const saveModel = async () => {
  console.log('saveModel');
  if (showAddFactorBtn.value && showAddConstraintBtn.value){
    if (finalModel.factor.length<2){
      message.warning('It is requires at least TWO factors in a model')
    }else{
      let rst = await request.put(url + `/${finalResult._id}`, {model: toRaw(finalModel)})
      console.log(rst);
      message.success('Model is saved successfully')
      // query(JSON.parse(modelId))

    }
  }else{
    message.warning('Please save all the editing fields first')
  }

  prev.value=true
}


// Types of factor
const orderOptions = ref<SelectProps['options']>([
  {
    value: 'pairwise',
    label: 'Pairwise',
  },
  {
    value: 'fullcombination',
    label: 'Full Combination',
  },
  {
    value: 'random',
    label: 'Random',
  }
])

const typeOptions = ref<SelectProps['options']>([
  {
    value: 'string',
    label: 'String',
  },
  {
    value: 'number',
    label: 'Number',
  }
])

// Initialize an obj for a single factor
let factorState = reactive<Factor>({
  name: '',
  type: '',
  values: [],
  editing: true,
  inputVisible: false,
  inputValue: '',
})

const factorColumns = [ // Setup the header of columns
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // width: 40
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    // width: 120
  },
  {
    title: 'Values',
    dataIndex: 'values',
    key: 'values',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    // width: 100
  },


]

let newValue = ref();
let showAddFactorBtn = ref(true)

const addNewFactor = () => {
  showAddFactorBtn.value = false;
  finalModel.factor.push({
    name: '',
    type: '',
    values: [],
    editing: true,
    inputVisible: true,
    inputValue: ''
  })
}

const editFactor = (record: Factor) => {
  console.log('editFactor')
  console.log(record)

  factorState.name = record.name
  factorState.type = record.type
  factorState.values = record.values
  showAddFactorBtn.value=false

  console.log(factorState)

  record.editing = true

}


const saveFactor = async (record: Factor) => {
  record.editing = false
  clearFactorState()
  showAddFactorBtn.value = true
  prev.value=false
}


const deleteFactor = (record: Factor) => {
  const index= finalModel.factor.findIndex(e => e === record)

  finalModel.factor.splice(index,1);
  prev.value=false
  message.success('Delete Successfully!');
}
const cancelFactor = (record: Factor) => {
  if (factorState.name === ''){
    const index= finalModel.factor.findIndex(e => e === record)
    finalModel.factor.splice(index,1);
  }else{
    record.name = factorState.name
    record.type = factorState.type
    record.values = factorState.values

    record.editing = false
  }

  clearFactorState()
  showAddFactorBtn.value = true
}
const clearFactorState = () => {
  factorState.name = ''
  factorState.type = ''
  factorState.values = []
  factorState.editing = true
  factorState.inputVisible = false
  factorState.inputValue = '';

  // (instance?.refs.refFactorForm as any).resetFields();
}

// Handel Tags in modal form
const handleCloseTag = (record: Factor, removedTag: string) => {
  console.log('close tags');
  console.log(record.values);
  const tags = record.values.filter((tag: string) => tag !== removedTag);
  record.values = tags;
  console.log(record.values);

};
let inputRef = ref();

const handleFactorValueConfirm = (record: Factor) => {
  let values = record.values;
  if (record.inputValue && values.indexOf(record.inputValue) === -1) {
    values = [...values, record.inputValue];
  }
  Object.assign(record, {
    values: values,
    inputVisible: false,
    inputValue: '',
  });
  console.log("handleModelTagConfirm")
}

const newFactorValueInput = (record: Factor) => {
  record.inputVisible = true;

  nextTick(() => {
    inputRef.value.focus();
    inputRef.value.toString();
  })
};










const constraintColumns = [ // Setup the header of columns
  {
    title: 'IF',
    children: [
      {
        title: 'Name',
        dataIndex: 'ifname',
        key: 'ifname',
        // width: 40
      },
      {
        title: 'Operator',
        dataIndex: 'ifoperator',
        key: 'ifoperator',
        // width: 120
      },
      {
        title: 'Value',
        dataIndex: 'ifvalues',
        key: 'ifvalues',
      }
    ]
  },
  {
    title: 'THEN',
    children: [
      {
        title: 'Name',
        dataIndex: 'thenname',
        key: 'thenname',
        // width: 40
      },
      {
        title: 'Operator',
        dataIndex: 'thenoperator',
        key: 'thenoperator',
        // width: 120
      },
      {
        title: 'Value',
        dataIndex: 'thenvalues',
        key: 'thenvalues',
      }
    ]
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  }
]

// Operators

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
const ifOperatorOptions = computed(() => {
  if (constraintState.ifname == '') {
    return ref<SelectProps['options']>([]).value;
  } else {
    if (finalModel.factor.filter(e => e.name == constraintState.ifname)[0].type == 'string') {
      return ref<SelectProps['options']>(stringOptions).value
    } else {
      return ref<SelectProps['options']>(numberOptions).value
    }
  }
})

const thenOperatorOptions = computed(() => {
  if (constraintState.thenname == '') {
    return ref<SelectProps['options']>([]).value;
  } else {
    if (finalModel.factor.filter(e => e.name == constraintState.thenname)[0].type == 'string') {
      return ref<SelectProps['options']>(stringOptions).value
    } else {
      return ref<SelectProps['options']>(numberOptions).value
    }
  }
})

const ifNameOpetions = computed(() => {
  return ref<SelectProps['options']>(finalModel.factor.map(e => { return { value: e.name, label: e.name } })).value
})

const ifValueOpetions = computed(() => {
  if (constraintState.ifname == '') {
    return ref<SelectProps['options']>([]).value
  } else {
    return ref<SelectProps['options']>(
        finalModel.factor.filter(e => e.name == constraintState.ifname)[0].values
            .map(e => { return { value: e, label: e } })).value
  }
})

const thenNameOpetions = computed(() => {
  return ref<SelectProps['options']>(finalModel.factor.filter(e => e.name != constraintState.ifname).map(e => { return { value: e.name, label: e.name } })).value
})


const thenValueOpetions = computed(() => {
  if (constraintState.thenname == '') {
    return ref<SelectProps['options']>([]).value
  } else {
    return ref<SelectProps['options']>(
        finalModel.factor.filter(e => e.name == constraintState.thenname)[0].values
            .map(e => { return { value: e, label: e } })).value
  }
})

let showAddConstraintBtn = ref(true)

let constraintState = reactive<Constraint>({
  ifname: '',
  ifoperator: '',
  ifvalues: [],
  thenname: '',
  thenoperator: '',
  thenvalues: [],
})

let currentFactorName = reactive([])

const addNewConstraint = () => {
  console.log('addNewConstraint')
  clearConstraintState()

  if (finalModel.factor.length<2){
    message.warning('Please add at least two factors first')
  }else{
    showAddConstraintBtn.value = false;

    finalModel.constraint.push({
      ifname: '',
      ifoperator: '',
      ifvalues: '',
      thenname: '',
      thenoperator: '',
      thenvalues: '',
      editing: true,
    })
  }

  console.log(finalModel)
  console.log(constraintState)
}
const saveConstraint = (record: Constraint) => {
  console.log('saveConstraint')
  console.log(constraintState)

  Object.assign(record, {
    ifname: constraintState.ifname,
    ifoperator: constraintState.ifoperator,
    thenname: constraintState.thenname,
    thenoperator: constraintState.thenoperator,
    editing: false
  });

  if (Array.isArray(constraintState.ifvalues)) {
    Object.assign(record, {
      ifvalues: []
    });
    constraintState.ifvalues.map((v) => { record.ifvalues.push(v) })
  } else {
    Object.assign(record, {
      ifvalues: constraintState.ifvalues
    });
  }

  if (Array.isArray(constraintState.thenvalues)) {
    Object.assign(record, {
      thenvalues: []
    });
    constraintState.thenvalues.map((v) => { record.thenvalues.push(v) })
  } else {
    Object.assign(record, {
      thenvalues: constraintState.thenvalues
    });
  }

  record.editing = false

  console.log(finalModel)

  showAddConstraintBtn.value = true
  prev.value=false
}
const editConstraint = (record: Constraint) => {
  console.log('editFactor')
  console.log(finalModel.constraint)

  constraintState.ifname = record.ifname
  constraintState.ifoperator = record.ifoperator
  constraintState.ifvalues = record.ifvalues
  constraintState.thenname = record.thenname
  constraintState.thenoperator = record.thenoperator
  constraintState.thenvalues = record.thenvalues


  console.log(constraintState)

  record.editing = true
  showAddConstraintBtn.value = false

}

const changeIfName = () => {
  constraintState.ifoperator=''
  constraintState.ifvalues=''
  constraintState.thenoperator=''
  constraintState.thenvalues=''
}
const changeIfOperator = () => {
  if (constraintState.ifoperator==='IN'){
    constraintState.ifvalues=[]
  }else{
    constraintState.ifvalues=''
  }
}

const changeThenName = () => {
  constraintState.thenoperator=''
  constraintState.thenvalues=''
}
const changeThenOperator = () => {
  if (constraintState.thenoperator==='IN'){
    constraintState.thenvalues=[]
  }else{
    constraintState.thenvalues=''
  }
}







const updateConstraint = async (record: Constraint) => {
  console.log('updateConstraint')
  console.log(record)

  record.editing = false

  clearConstraintState()
  showAddConstraintBtn.value = true
}

const deleteConstraint = (record: Constraint) => {
  const index= finalModel.constraint.findIndex(e => e === record)
  finalModel.constraint.splice(index,1);
  prev.value=false
  message.success('Delete Successfully!');
}
const cancelConstraint = (record: Constraint) => {
  if (constraintState.ifname === ''){
    const index= finalModel.constraint.findIndex(e => e === record)
    finalModel.constraint.splice(index,1);
  }else{
    record.ifname=constraintState.ifname
    record.ifoperator=constraintState.ifoperator
    record.ifvalues=constraintState.ifvalues
    record.thenname=constraintState.thenname
    record.thenoperator=constraintState.thenoperator
    record.thenvalues=constraintState.thenvalues

    record.editing = false
  }

  console.log('cancelConstraint')
  console.log(record)
  console.log(constraintState)
  clearConstraintState()
  console.log(constraintState)

  showAddConstraintBtn.value = true

}


const instance = getCurrentInstance()



const clearConstraintState = () => {
  constraintState.ifname = ''
  constraintState.ifoperator = ''
  constraintState.ifvalues = []
  constraintState.thenname = ''
  constraintState.thenoperator = ''
  constraintState.thenvalues = [];

  // (instance?.refs.refConstraintForm as any).resetFields();
}


// ###############################
// ######## Preview modal ########
// ###############################

let columnPreview=ref<any>()
let modelDataPreview=ref<any>()
let prev=ref<boolean>(true);
let visibleModal=ref<boolean>(false);

const previewModel = async () => {
  if (prev.value){
    let rst = await request.post(url+`/${route.params._id}/preview`)
    console.log(rst);
    modelDataPreview.value=rst
    columnPreview.value=rst.model?.parameters.map((e:any)=>{
      return {
        title: e.property,
        dataIndex: e.property,
        key: e.property,
      }
    })
    visibleModal.value=true

  }else{
    message.warning("This model is changed, please save it first and then preview")
  }



}


const cancel = (e: MouseEvent) => {
  console.log(e);
};

const focus = () => {
  console.log('focus');
  // console.log(constraintState);
};

</script>



<template>

  <main style="height:100%;overflow-x: hidden!important;">

    <!-- ############ -->
    <!-- Preview info -->
    <!-- ############ -->



    <a-modal v-model:visible="visibleModal" title="Model preview" :width="900">

      <!-- Model meta info -->

      <h2>Data</h2>

      <a-table :columns="columnPreview" :data-source="modelDataPreview.data" bordered>
        <template #bodyCell="{ column, text, record }">
          <!--          <template v-if='column.key==="name"'><div>{{ text }}</div></template>-->
          <!--          <template v-if='column.key==="age"'><div>{{ text }}</div></template>-->
          <!--          <template v-if='column.key==="address"'><div>{{ text }}</div></template>-->
          {{ text }}
        </template>
      </a-table>

      <template #footer>
        <!--        <a-button @click="closeModel">Cancel</a-button>-->
      </template>

      <h2>Model</h2>
      <pre>{{ JSON.stringify(toRaw(modelDataPreview.model), null, 2) }}</pre>

    </a-modal>


    <!-- ############ -->
    <!-- Options info -->
    <!-- ############ -->

    <div>
      <h2>Option (required)</h2>
      <a-form
          name="basic"
          :wrapper-col="{ span: 2 }"
          autocomplete="off"
      >
        <a-form-item label="Strategy">
          <a-select v-model:value="finalModel.option.strategy" :options="orderOptions"></a-select>
        </a-form-item>
      </a-form>
    </div>



    <!-- ############ -->
    <!-- Factors info -->
    <!-- ############ -->

    <div style="margin: 30px 0px 8px 0px;">
      <h2 style="display: inline;">Factors (required)</h2>
      <a-button v-if="showAddFactorBtn" @click="addNewFactor" class="editable-add-btn" style="margin-left: 12px;">Add a
        New Factor</a-button>

    </div>


    <a-table v-if="finalModel.factor.length>0" :columns="factorColumns" :data-source="finalModel.factor" bordered>
      <template #bodyCell="{ column, text, record }">

        <template v-if='column.key==="name"'>
          <div>
            <a-input v-if="record.editing" v-model:value.trim="record.name" style="margin: -5px 0" />
            <template v-else>
              {{text}}
            </template>
          </div>
        </template>


        <template v-if='column.key==="type"'>
          <div>
            <!-- <a-form-item label="Type" name="type">
              <a-select ref="select" v-if="factorState.name===record.name" v-model:value="factorState.type" :options="typeOptions" @focus="focus"></a-select>
            </a-form-item>
            <a-input v-if="factorState.name===record.name" v-model:value="factorState.type" style="margin: -5px 0" /> -->
            <a-select ref="select" v-if="record.editing" v-model:value.trim="record.type" :options="typeOptions"
                      @focus="focus"></a-select>

            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>


        <template v-if="column.key === 'values'">
          <template v-if="record.editing">
            <template v-for="(tag) in record.values" :key="tag">
              <a-tooltip v-if="tag.length > 20" :title="tag">
                <a-tag :closable="true" :visible="true" @close="handleCloseTag(record, tag)">
                  {{ `${tag.slice(0, 20)}...` }}
                </a-tag>
              </a-tooltip>
              <a-tag v-else-if="tag.length==0"></a-tag>
              <a-tag v-else :closable="true" :visible="true" @close="handleCloseTag(record, tag)">
                {{tag}}
              </a-tag>
            </template>
            <a-input v-if="record.inputVisible" ref="inputRef" v-model:value.trim="record.inputValue" type="text"
                     size="small" :style="{ width: '78px' }" @blur="handleFactorValueConfirm(record)"
                     @keyup.enter="handleFactorValueConfirm(record)" />
            <a-tag v-else style="background: #fff; border-style: dashed" @click="newFactorValueInput(record)">
              <plus-outlined />
              Add a New Value
            </a-tag>
          </template>

          <span v-else>
            <a-tag v-for="tag in record.values" :key="tag" color="cyan">
              {{ tag }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <div class="editable-row-operations">
            <span v-if="record.editing">
              <a-typography-link type="danger" @click="saveFactor(record)">Save</a-typography-link>
              <a-divider type="vertical" />
              <a @click="cancelFactor(record)">Cancel</a>
            </span>

            <span v-else>
              <a @click="editFactor(record)">Edit</a>
              <a-divider type="vertical" />
              <a-popconfirm title="Are you sure to delete this Dynamic Template?" ok-text="Yes" cancel-text="No"
                            @confirm="deleteFactor(record)" @cancel="cancel">
                <a>Delete</a>
              </a-popconfirm>
            </span>

          </div>
        </template>
      </template>
    </a-table>




    <!-- ################ -->
    <!-- Constraints info -->
    <!-- ################ -->

    <div style="margin: 30px 0px 8px 0px;">
      <h2 style="display: inline;">Constraint (optional)</h2>
      <a-button v-if="showAddConstraintBtn" @click="addNewConstraint" class="editable-add-btn"
                style="margin-left: 12px;">Add a New Constraint</a-button>
    </div>
    <a-table v-if="finalModel.constraint.length>0" :columns="constraintColumns" :data-source="finalModel.constraint" bordered>
      <template #bodyCell="{ column, text, record }">

        <template v-if='column.key==="ifname"'>
          <div>
            <!-- <a-input v-if="record.editing" v-model:value="record.ifname" style="margin: -5px 0" /> -->
            <a-select ref="select" v-if="record.editing" v-model:value="constraintState.ifname"
                      :disabled="finalModel.factor.length<2" :options="ifNameOpetions" @focus="focus" @change="changeIfName()">
            </a-select>
            <template v-else>
              {{text}}
            </template>
          </div>
        </template>


        <template v-if='column.key==="ifoperator"'>
          <div>
            <!-- <a-form-item label="Type" name="type">
                  <a-select ref="select" v-if="factorState.name===record.name" v-model:value="factorState.type" :options="typeOptions" @focus="focus"></a-select>
                </a-form-item>
                <a-input v-if="factorState.name===record.name" v-model:value="factorState.type" style="margin: -5px 0" /> -->
            <a-select ref="select" v-if="record.editing" v-model:value="constraintState.ifoperator" :disabled="constraintState.ifname===''"
                      :options="ifOperatorOptions" @focus="focus" @change="changeIfOperator()">
            </a-select>

            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>


        <template v-if="column.key === 'ifvalues'">
          <template v-if="record.editing">

            <a-select v-if="constraintState.ifoperator == 'IN'" mode="multiple" ref="select"
                      v-model:value="constraintState.ifvalues" :options="ifValueOpetions" :disabled="false" @focus="focus">
            </a-select>
            <a-input v-else-if="constraintState.ifoperator == 'LIKE'" v-model:value.trim="record.ifvalues"
                     style="margin: -5px 0" @focus="focus" />
            <a-select v-else ref="select" v-model:value="constraintState.ifvalues" :options="ifValueOpetions"
                      :disabled="constraintState.ifoperator == ''" @focus="focus">
            </a-select>
          </template>

          <span v-else>
            <template v-if="Array.isArray(record.ifvalues)">
              <a-tag v-for="tag in record.ifvalues" :key="tag" color="cyan">
                {{ tag }}
              </a-tag>
            </template>
            <template v-else>

              <a-tag v-if="record.ifoperator !== 'LIKE'" color="cyan">
                {{ text }}
              </a-tag>
              <span v-else>
                {{ text }}
              </span>

            </template>

          </span>
        </template>


        <template v-if='column.key==="thenname"'>
          <div>
            <!-- <a-input v-if="record.editing" v-model:value="record.ifname" style="margin: -5px 0" /> -->
            <a-select ref="select" v-if="record.editing" v-model:value="constraintState.thenname"
                      :disabled="finalModel.factor.length<2" :options="thenNameOpetions" @focus="focus"  @change="changeThenName()">>
            </a-select>
            <template v-else>
              {{text}}
            </template>
          </div>
        </template>


        <template v-if='column.key==="thenoperator"'>
          <div>
            <!-- <a-form-item label="Type" name="type">
                  <a-select ref="select" v-if="factorState.name===record.name" v-model:value="factorState.type" :options="typeOptions" @focus="focus"></a-select>
                </a-form-item>
                <a-input v-if="factorState.name===record.name" v-model:value="factorState.type" style="margin: -5px 0" /> -->
            <a-select ref="select" v-if="record.editing" v-model:value="constraintState.thenoperator" :disabled="constraintState.thenname === ''"
                      :options="thenOperatorOptions" @focus="focus"  @change="changeThenOperator()">
            </a-select>

            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>

        <template v-if='column.key === "thenvalues"'>
          <template v-if="record.editing">
            <a-select v-if="constraintState.thenoperator === 'IN'" mode="multiple" ref="select1"
                      v-model:value="constraintState.thenvalues" :options="thenValueOpetions" :disabled="false" @focus="focus">
            </a-select>
            <a-input v-else-if="constraintState.thenoperator === 'LIKE'" v-model:value.trim="constraintState.thenvalues"
                     style="margin: -5px 0" @focus="focus" />
            <a-select v-else ref="select2" v-model:value="constraintState.thenvalues" :options="thenValueOpetions"
                      :disabled="constraintState.thenoperator === ''" @focus="focus">
            </a-select>
          </template>

          <span v-else>
            <template v-if="Array.isArray(record.thenvalues)">
              <a-tag v-for="tag in record.thenvalues" :key="tag" color="cyan">
                {{ tag }}
              </a-tag>
            </template>
            <span v-else>
              <a-tag v-if="record.thenoperator !== 'LIKE'" color="cyan">
                {{ text }}
              </a-tag>
              <span v-else>
                {{ text }}
              </span>
            </span>

          </span>
        </template>




        <template v-if='column.key === "action"'>
          <span v-if="record.editing">
            <a-typography-link type="danger" @click="saveConstraint(record)">Save</a-typography-link>
            <a-divider type="vertical" />
            <a @click="cancelConstraint(record)">Cancel</a>
          </span>

          <span v-else>
            <a @click="editConstraint(record)">Edit</a>
            <a-divider type="vertical" />
            <a-popconfirm title="Are you sure to delete this Dynamic Template?" ok-text="Yes" cancel-text="No"
                          @confirm="deleteConstraint(record.name)" @cancel="cancel">
              <a>Delete</a>
            </a-popconfirm>
          </span>
        </template>
      </template>
    </a-table>

    <a-divider/>

    <div style="margin-top: 30px">
      <a-button type="primary" @click="saveModel" class=""
                style="margin-bottom: 8px">Save Model</a-button>
      <a-button :disabled="finalModel.factor.length<2" @click="previewModel()" style="margin-left:30px">Preview</a-button>

    </div>


  </main>
</template>

<style lang="postcss" scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  margin-bottom: 1rem;
}

footer {
  margin-top: 1rem;
}

∏ .table {
  width: 100%;
  height: 100px;
  flex: 1;
  background-color: #fff;
  border-radius: 0.7rem;
}
</style>
<style>

</style>