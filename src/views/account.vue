<script lang="ts">
export default { name: 'UserManager' }
</script>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, reactive, defineComponent, UnwrapRef, onMounted, nextTick, watch, getCurrentInstance, computed, unref } from 'vue';
import { CascaderProps, FormProps, SelectProps, Table, TableProps, TreeProps, } from 'ant-design-vue';
import { CheckCircleTwoTone, PlusOutlined, ExclamationCircleTwoTone, MailOutlined, UsergroupAddOutlined, TeamOutlined, UnlockOutlined } from '@ant-design/icons-vue'
import { SplitPanel } from '@/components/basic/split-panel';
import { message } from 'ant-design-vue/es'
import request from '@/utils/request';
import http from '@/utils/http'
import { Rule } from 'ant-design-vue/es/form';
import { tableSearch, FormState, paramsobj, ModelState, statesTs, clickobj } from "./componentTS/usermodeler";
import _ from 'lodash';
import type { ColumnsType } from 'ant-design-vue/es/table/interface';
import { uuid } from '@/utils/Uuid'
import { Key } from 'ant-design-vue/es/_util/type';
import accountManager from "@/locales/lang/zh-CN/routes/account";
import { CommonTable } from '@/components/basic/common-table'
import router from '@/router';
import type { MenuProps } from 'ant-design-vue';
import cloneDeep from "lodash-es/cloneDeep";
import { RadioGroupProps } from 'ant-design-vue';
import {
	EditOutlined,
	DeleteOutlined,
	CopyOutlined,
	CheckCircleOutlined,
	CloseCircleOutlined,
	ExclamationCircleOutlined,
	UpCircleOutlined,
	DownCircleOutlined,
	FileSearchOutlined,
	FolderOpenOutlined 
} from '@ant-design/icons-vue'
const { t } = useI18n()

let roletabledata = ref<Array<any>>([])

let isUserModel = ref<boolean>(false);

// user table data
let userModelTable = ref<any>(null)

// role table data
let roleTable = ref<any>(null)

const userColumns = [
	{ title: "name", width: 40, link: 'custom', require: true },
	{ title: "email", width: 120, require: true },
	{ title: "roles", width: 100 },
	{
		title: "action",
		width: 100,
		cbName: ['edit', 'go2Page'],
		actionList: ['edit', 'delete', 'clone']
	},
]

const roleColumns: ColumnsType = [

	{ title: "role", dataIndex: 'name', key: 'name' },
	// { title: "role", width: 40, dataIndex: 'role', key: 'role' },
	// { title: "grantedResources", width: 120, dataIndex: 'grantedResources', key: 'grantedResources' },
	{ title: "views", dataIndex: 'views', key: 'views' },
	{
		title: "action",

		key: 'operation',
		// cbName: ['edit', 'go2Page'],
		// actionList: ['edit', 'delete', 'clone']
	},
]
const innerColumns = [
	{ title: 'resource', dataIndex: 'resource', key: 'resource' },
	{ title: 'method', dataIndex: 'method', key: 'method' },
	{
		title: 'Action',
		dataIndex: 'operation',
		key: 'operation',
	},
];

interface innerDataItem {
	key: number;
	resource: string;
	method: string;

}

const innerData: innerDataItem[] = [];
for (let i = 0; i < 1; ++i) {
	innerData.push({
		key: i,
		resource: 'MBTModeler',
		method: `ReadOnly`,

	});
}

const userTableQuery = {
	url: '/api/users',
	searchText: '',
	//   createParams: 'dynamic'
	//   selection: {
	//     selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE]
	//   },
}

const roleTableQuery = {
	url: '/api/roles',
	searchText: '',
	//   createParams: 'dynamic'
	//   selection: {
	//     selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE]
	//   },
}

const go2Detail = (row: any) => {
	const url = `/users/${row._id}`
	if (row.clickTar === 'name') router.push(`${url}?canEdit=true`)
	else router.push(url)
}

const go2DetailRole = (row: any) => {
	const url = `/roles/${row._id}`
	if (row.clickTar === 'role') router.push(`${url}?canEdit=true`)
	else router.push(url)
}

const pageChange = (data: any) => {
	searchobj.page = data.current
	searchobj.perPage = data.pageSize
	query()
}
const pageChangeRole = (data: any) => {
	searchobj.page = data.current
	searchobj.perPage = data.pageSize
	queryRole()
}

let searchobj: tableSearch = reactive({
	search: "",
	page: 1,
	perPage: 10,
	q: "",
	total: 0
})




async function query(data?: any) {
	if (userModelTable.value && userModelTable.value.loading) {
		userModelTable.value.loading = true


		const params: any = data || searchobj


		const rst = await http.get("/api/users")
		/**
		 * 该请求有请求覆盖bug
		 * 通过响应头 date 字段对比上个请求的发起时间
		 * 保证数据的更新总是最后一个发起请求的数据
		 * */
		let timeTemp = new Date(rst.headers.date).getTime()

		let res = rst.data
		if (res.data) {
			searchobj.total = res.total
			userModelTable.value.setTableData({
				tableData: res.data,
				total: res.total,
				currentPage: searchobj.page,
				pageSize: searchobj.perPage
			})
		}
		userModelTable.value.loading = false

		return rst
	}
}

async function queryRole(data?: any) {



	const rst = await http.get("/api/roles")


	roletabledata.value = rst.data.data;


	return roletabledata;


}

const tabledom = ref()

onMounted(() => {
	queryRole()

})

watch(
	roletabledata,
	() => {
		//     console.log('Role DataChanged')
	},
	{
		deep: true
	}
)



const instance = getCurrentInstance()
// 表单的数据
const formState: UnwrapRef<FormState> = reactive({
	q: '',
	search: ''
});

// 表单提交失败时的回调
const handleFinishFailed: FormProps['onFinishFailed'] = (errors: any) => { };
// 模态窗数据
const visible = ref<boolean>(false);
const showModal = () => {
	visible.value = true;
};

let searchInput = ref()
let cascder = ref(false)
let selectvalue: any = ref("")
let selectoptions: any = ref([
	{
		value: 'name:',
		label: 'name:',

	},
])



let disable = ref(true)

// 关闭模态窗触发事件
const closemodel = () => {
	clear()
	visible.value = false;
}

// 添加功能的函数
let deleteId = ""

let returnInput = ref('')
let returnVisibal = ref(false)
let returnRef = ref()
let modelstates = ref<ModelState>({
	key: 0,
	name: '',
	_id: "",

});

// 清除模态窗数据
const clear = () => {
	modelstates.value = {
		name: "",
		_id: ""

	};

	(instance?.refs.refForm as any).resetFields()

}



// 表单验证
let checkName = async (_rule: Rule, value: string) => {
	let reg = /^[a-zA-Z0-9\$][a-zA-Z0-9\d_]*$/
	let reg1 = /^[\u4e00-\u9fa5_a-zA-Z0-9$]+$/
	if (!value) {
		return Promise.reject(t('component.message.emptyName'))
	} else if (!reg.test(value) && !reg1.test(value)) {
		return Promise.reject(t('component.message.hefaName'))
	} else {

		let rst = await request.get("/api/roles", { params: { q: `name:${value}`, search: '' } })
		if (rst.data && rst.data.length > 0 && rst.data[0].name == value) {
			// message.error("Duplicate name")
			// modelstates.value.name=""
			return Promise.reject(t('component.message.depName'))
		} else {
			return Promise.resolve();

		}
	}
}


let rules: Record<string, Rule[]> = {
	name: [{ required: true, validator: checkName, trigger: 'blur' }],


}
let refForm = ref()


async function saveRole(data: any) {

	let rst = await request.post("/api/roles", data)
	if (rst._id) {
		deleteId = rst._id
		let tableData = roletabledata.value
		// console.log('tableData', tableData)
		tableData.unshift(rst)

		visible.value = false;
		// roleTable.value.loading = false
		closemodel()
		message.success(t('component.message.addText'))
	}
}
const handleOk = (data: any) => {
	refForm.value.validate().then(async () => {
		delete data._id
		await saveRole(data)
	})
	onFinishForm(modelstates)
};
const onFinishForm = (modelstates: any) => { }
const onFinishFailedForm = (errorInfo: any) => { };
// 添加的表单tags
let inputRef = ref();






// 删除功能
const confirm = async (obj: any) => {
	request.delete(`/api/roles/${obj._id}`).then(() => {
		const index = roletabledata.value.indexOf(obj)
		roletabledata.value.splice(index, 1)
		message.success(t('component.message.delText'))
	})

};

// 删除功能
const confirmDelRole = async (obj: any) => {
	roleTable.value.loading = true
	if (obj._id) {
		delete obj.key
		let rst = await request.delete(`/api/roles/${obj._id}`)
	} else {
		await request.delete(`/api/roles/${deleteId}`)
	}
	let tableData = roleTable.value
	tableData = tableData.filter((a: any) => a !== obj)
	roleTable.value.setTableData({
		tableData,
		total: --searchobj.total
	})
	roleTable.value.loading = false
	message.success(t('component.message.delText'));
};

// 修改函数
async function updateUserModel(url: string, data: any) {
	let rst = await request.put(url, data)
}

// 修改函数
async function updateRoleModel(url: string, data: any) {
	let rst = await request.put(url, data)
}
// 修改的函数
// const edit = (rowobj: any) => {
// 	showModal()
// 	modelstates.value.key = rowobj.key
// 	modelstates.value.name = rowobj.name

// 	modelstates.value._id = rowobj._id
// 	states.tags = rowobj.tags

// }
const wrapperCol = { span: 24, offset: 12 }




let refCopy = ref()
let copyRule: Record<string, Rule[]> = {
	name: [{ required: true, validator: checkName, trigger: 'blur' }],

}
let copyData: any = ref({
	name: "",
	email: ""
})
let copyVisible = ref<boolean>(false)
const copyName = (record: any) => {
	copyData.value.name = `${record.name}_clone`
	copyData.value.email = `${record.email}_clone`


	copyData.value = { ...record, name: copyData.value.name, email: copyData.value.email }
	copyVisible.value = true
}

const copyNameRole = (record: any) => {
	copyData.value.name = `${record.name}_clone`
	copyData.value.email = `${record.email}_clone`


	copyData.value = { ...record, name: copyData.value.name, email: copyData.value.email }
	copyVisible.value = true
}

const copyOk = () => {
	unref(refCopy).validate().then(async () => {
		userModelTable.value.loading = true
		delete copyData.value._id
		request.post('/api/users', copyData.value).then((rst: any) => {
			let tableList = userModelTable.value.getTableData()
			tableList = tableList.unshift(rst)
			userModelTable.value.setTableData(tableList.pop())
			copyVisible.value = false
			userModelTable.value.loading = false
		}).catch(() => {
			message.error(t('commont.cloneError'))
			copyVisible.value = false
			userModelTable.value.loading = false
		})

	})
}
const clearValida = () => {
	copyVisible.value = false
	unref(refCopy).clearValidate()
}
const handleFinish = () => {
	console.log('finish')
}
const handleClick: MenuProps['onClick'] = e => {
	// console.log('handle click', e);
};

const viewRoles = (e: any) => {
	// console.log('click role', e);
	isUserModel.value = false;
	queryRole();
};
const viewUsers = (e: any) => {
	// console.log('click1', e);
	isUserModel.value = true;
};


const viewResources = (e: any) => {
	// console.log('click1', e);
	isUserModel.value = false;
};

let nameForm = ref()
// 添加的表单tags
let states = ref<statesTs>({
	// tags 编辑变量
	tags: [],
	inputVisible: false,
	inputValue: '',


})
// 更新数据
const updateTableData = (newData: any) => {
	let url = '/api/roles'
	if (!url) return

	request.put(`${url}/${newData._id}`, newData)
		.then((res: any) => {
			const index = roletabledata.value.indexOf(newData)
			roletabledata.value.splice(index, 1, res)
			message.success(t('component.message.updateText'))
		})
		.catch(e => message.error(t('component.message.updateErr')))
		.finally(() => queryRole())
}

// 新建数据更新
const newTableData = (newData: any) => {
	const url = '/api/roles'
	if (!url) return

	request.post(url, newData).then((res: any) => {
		const index = roletabledata.value.indexOf(newData)
		roletabledata.value.splice(index, 1, res)
		message.success(t('component.message.addText'))
	}).catch(e => {
		newData.isNewRow = true
		newData.editing = true
	})
}
const resetStates = () => {
	states.value = {
		tags: [],
		inputVisible: false,
		inputValue: '',

	}
}
const save = async (rowData: any) => {
	let nameValidate = !unref(nameForm) || await unref(nameForm).validate()

	if (nameValidate) {
		const temp = roletabledata!.value.filter(row => row.editing)[0]
		// if (props.columns.some((a: any) => a.title === 'tags')) temp.tags = states.value.tags
		temp.views = states.value.tags
		// 如果没有 url 说明不立即更新，暂存至表格内，等待更新数据
		temp.editing = false
		delete rowData.isNewRow
		// if (!props.fetchObj.url) {
		//   resetStates()
		//   emit('save', {
		//     ...rowData,
		//     index: tableData.value.indexOf(rowData)
		//   })
		//   return
		// }
		// const q = props.fetchObj.createParams
		// if (q) temp.category = props.fetchObj.createParams
		if (rowData.isNewRow) delete rowData.isNewRow
		if (rowData._id) {
			console.log('temp:', temp)
			updateTableData(temp)
		} else {
			newTableData(temp)
		}
		resetStates()
	}
}




const cancel = (rowData: any) => {
	const flag = rowData.isNewRow
	if (flag) {
		roletabledata.value = roletabledata.value.filter(a => !Object.is(rowData, a))
	} else {
		const index = roletabledata.value.indexOf(rowData)
		roletabledata.value[index] = tempRow
	}
	tempRow = null
	resetStates()
}
// 移除tags
const handleTagClose = (removedTag: string) => {
	const temp = states.value.tags.filter((a: string) => a !== removedTag)
	states.value.tags = temp
}

// tag标签失去焦点之后添加的tags
const handleInputConfirm = () => {
	let tags = states.value.tags
	if (states.value.inputValue && tags.indexOf(states.value.inputValue) === -1) {
		tags = [...tags, states.value.inputValue]
	}
	states.value.tags = tags
	states.value.inputValue = ''
	states.value.inputVisible = false
}
let tagInputRef = ref()
// 点击添加标签的方法
const showInput = () => {
	states.value.inputVisible = true
	nextTick(() => {
		tagInputRef.value.focus();
	})
}
// 暂存编辑的数据
let tempRow: any = null

const isEditing = computed(() => {
	if (roletabledata.value) {
		let editingRow = roletabledata.value.reduce((total, row: any) => {
			if (row.editing) total++
			return total
		}, 0)
		return editingRow > 0

	}

})

const editRow = (rowData: any) => {
	if (isEditing.value) return message.warning(t('component.message.errTip1'))
	console.log('rowdata   ', rowData)
	//   if (!rowData.isNewRow) {
	//     emit('edit', rowData)
	//   } else {
	tempRow = cloneDeep(rowData)
	rowData.editing = true
	states.value.tags = rowData.views || []

	//   }
}

const value1 = ref<string>('hide');



const options = [
	{ label: 'Read Write Execute', value: 'readwriteexec' },
	{ label: 'Read and Write', value: 'readwrite' },
	{ label: 'Read Only', value: 'readonly' },
	{ label: 'Hide', value: 'hide' },
];
let index = 0;
const items = ref(['MBTModeler', 'AWModeler']);
    const value = ref('AWModeler');

    const addItem = () => {
      console.log('addItem');
      items.value.push(`New item ${index++}`);
    };


</script>
<template>
	<main class="main">
		<div ref="leftRef" style="height:100%" class="id">
			<SplitPanel>
				<template #left-content>
					<a-menu id="submenu" style="width: 256px" mode="inline" @click="handleClick">
						<a-menu-item key="1">
							<TeamOutlined />
							<a @click="viewRoles">{{ $t('common.roleManagement') }}</a>
						</a-menu-item>

						<a-menu-item key="2">
							<UnlockOutlined /> <a @click="viewUsers">{{ $t('common.permissionManagement') }}</a>
						</a-menu-item>
						
						<a-menu-item key="3">
							<FolderOpenOutlined /> <a @click="viewResources">{{ $t('common.resourceManagement') }}</a>
						</a-menu-item>

					</a-menu>

				</template>
				<template #right-content>
					<!-- 表单的查询 -->
					<a-row>
						<a-col :span="20">
							<AForm v-if="isUserModel" layout="inline" class="search_form" :model="formState"
								@finish="handleFinish" @finishFailed="handleFinishFailed" :wrapperCol="wrapperCol">

								<a-col :span="4">
									<a-button type="primary" html-type="submit">{{ $t('common.searchText') }}</a-button>
								</a-col>
							</AForm>
						</a-col>
						<a-col :span="2"><a-button type="primary" @click="showModal">
								<template #icon><plus-outlined /></template></a-button>
						</a-col>
					</a-row>
					<!-- 模态窗 -->
					<div>
						<a-modal v-model:visible="visible"
							:title="modelstates._id ? $t('common.updateText') : $t('common.saveText')" :width="1300">
							<template #footer>
								<a-button @click="closemodel">{{ $t('common.cancelText') }}</a-button>
								<a-button @click="handleOk(modelstates)" type="primary" class="btn_ok">{{
		$t('common.okText')
}}</a-button>
							</template>
							<a-form ref="refForm" :model="modelstates" name="basic" :rules="rules"
								:label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off">
								<a-form-item :label="$t('component.table.name')" name="name">
									<!-- <template #suffix v-if="modelstates.name"><edit-outlined /></template> -->

									<a-input v-model:value="modelstates.name" />
									<!-- <span v-else>{{modelstates.name}}</span> -->
								</a-form-item>



								<!-- tags标签 -->
								<a-form-item :label="$t('component.table.tags')" name="tags">
									<template v-for="(tag, index) in states.tags" :key="tag">
										<a-tooltip v-if="tag.length > 20" :title="tag">
											<a-tag :closable="true" @close="handleTagClose(tag)">
												{{ `${tag.slice(0, 20)}...` }}
											</a-tag>
										</a-tooltip>
										<a-tag v-else-if="tag.length == 0"></a-tag>
										<a-tag v-else :closable="true" @close="handleTagClose(tag)">
											{{ tag }}
										</a-tag>
									</template>
									<a-input v-if="states.inputVisible" ref="tagInputRef"
										v-model:value="states.inputValue" type="text" size="small"
										:style="{ width: '78px' }" @blur="handleInputConfirm"
										@keyup.enter="handleInputConfirm"></a-input>
									<a-tag v-else style="background: #fff; border-style: dashed" @click="showInput">
										<plus-outlined />
										{{ $t('common.newTag') }}
									</a-tag>

								</a-form-item>


							</a-form>
							<!-- <common-table
                ref="awParamsTable"
                :columns="AWParamsColumn"
                tableRef="awParamsTable"
              ></common-table> -->
						</a-modal>
					</div>
					<!-- 表格的结构 -->
					<div ref="tabledom">


						<a-table :columns="roleColumns" :data-source="roletabledata"
							:row-key="(record: any) => record._id" class="components-table-demo-nested">
							<template #headerCell="{ column }">
								<template v-if="column.key === 'name'">
									<span style="color: #1890ff">{{ $t('account.role') }}</span>
								</template>
								<template v-else-if="column.key === 'views'">
									<span style="color: #1890ff">{{ $t('account.views') }}</span>
								</template>
								<template v-else-if="column.key === 'operation'">
									<span style="color: #1890ff">{{ $t('account.action') }}</span>
								</template>

							</template>
							<template #bodyCell="{ column, text, record, index }">
								<template v-if="column.key === 'name'">
									<template v-if="record.editing">
										<a-form :model="record" ref="nameForm" :rules="rules">
											<a-form-item name="name">
												<a-input v-model:value="record.name" style="margin: -5px 0"></a-input>
											</a-form-item>
										</a-form>
									</template>




									<span>{{ text }}</span>


								</template>
								<template v-if="column.key === 'operation'">

									<div>
										<span>

											<a-tooltip placement="bottom">
												<template #title>
													<span>{{ $t('common.editText') }}</span>
												</template>
												<edit-outlined @click="editRow(record)" class="icon--primary-btn" />
											</a-tooltip>
											<a-divider type="vertical" />
											<a-tooltip placement="bottom">
												<template #title>
													<span>{{ $t('common.saveText') }}</span>
												</template>
												<check-circle-outlined @click="save(record)"
													class="icon--success-btn" />
											</a-tooltip>
											<a-divider type="vertical" />
											<a-tooltip placement="bottom">
												<template #title>
													<span>{{ $t('common.cancelText') }}</span>
												</template>
												<close-circle-outlined @click="cancel(record)" class="icon--err-btn" />
											</a-tooltip>
											<a-divider type="vertical" />
											<a-popconfirm :title="$t('component.message.sureDel')"
												:ok-text="$t('common.yesText')" :cancel-text="$t('common.noText')"
												@confirm="confirm(record)">
												<a-tooltip placement="bottom">
													<template #title>
														<span>{{ $t('common.delText') }}</span>
													</template>
													<delete-outlined class="icon--primary-btn" />
												</a-tooltip>
											</a-popconfirm>


										</span>

									</div>
								</template>
								<template v-else-if="column.key === 'views'">
									<template v-if="record.editing">
										<template v-for="tag in states.tags" :key="tag">
											<a-tooltip v-if="tag.length > 20" :title="tag">
												<a-tag :closable="true" @close="handleTagClose(tag)">
													{{ `${tag.slice(0, 20)}...` }}
												</a-tag>
											</a-tooltip>
											<a-tag v-else-if="tag.length === 0"></a-tag>
											<a-tag v-else :closable="true" @close="handleTagClose(tag)">
												{{ tag }}
											</a-tag>
										</template>
										<a-input v-if="states.inputVisible" ref="tagInputRef"
											v-model:value="states.inputValue" type="text" size="small"
											:style="{ width: '78px' }" @blur="handleInputConfirm"
											@keyup.enter="handleInputConfirm"></a-input>
										<a-tag v-else style="background: #fff; border-style: dashed" @click="showInput">
											<plus-outlined />
											{{ $t('common.newTag') }}
										</a-tag>
									</template>
									<template v-else>
										<a-tag v-for="tag in record.views" :key="tag"
											:color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">{{
		tag.toUpperCase()
}}</a-tag>
									</template>
								</template>
							</template>

							<template #expandedRowRender>
								<a-table :columns="innerColumns" :data-source="innerData" :pagination="false" bordered>
									<template #headerCell="{ column }">
										<template v-if="column.key === 'resource'">
											<span style="color: #1890ff">{{ $t('account.resource') }}</span>
										</template>
										<template v-else-if="column.key === 'method'">
											<span style="color: #1890ff">{{ $t('account.method') }}</span>
										</template>
										<template v-else-if="column.key === 'operation'">
											<span style="color: #1890ff">{{ $t('account.action') }}</span>
										</template>

									</template>
									<template #bodyCell="{ column, text, record, index }">
										<template v-if="column.key === 'resource'">
											<a-select v-model:value="value" style="width: 120px"
												:options="items.map(item => ({ value: item }))">
												<template #dropdownRender="{ menuNode: menu }">
													<v-nodes :vnodes="menu" />
													<a-divider style="margin: 4px 0" />
													<div style="padding: 4px 8px; cursor: pointer"
														@mousedown="e => e.preventDefault()" @click="addItem">
														<plus-outlined />
														Add item
													</div>
												</template>
											</a-select>

										</template>


										<template v-if="column.key === 'method'">
											<a-space direction="vertical">
												<a-radio-group v-model:value="value1" :options="options" />

											</a-space>

										</template>

										<template v-if="column.key === 'operation'">
											<div>
												<span>

													<a-tooltip placement="bottom">
														<template #title>
															<span>{{ $t('common.editText') }}</span>
														</template>
														<edit-outlined @click="editRow(record)"
															class="icon--primary-btn" />
													</a-tooltip>
													<a-divider type="vertical" />
													<a-tooltip placement="bottom">
														<template #title>
															<span>{{ $t('common.saveText') }}</span>
														</template>
														<check-circle-outlined @click="save(record)"
															class="icon--success-btn" />
													</a-tooltip>
													<a-divider type="vertical" />
													<a-tooltip placement="bottom">
														<template #title>
															<span>{{ $t('common.cancelText') }}</span>
														</template>
														<close-circle-outlined @click="cancel(record)"
															class="icon--err-btn" />
													</a-tooltip>

												</span>

											</div>
										</template>
									</template>
								</a-table>
							</template>

						</a-table>


					</div>
				</template>
			</SplitPanel>

			<!-- </section> -->
		</div>
	</main>
</template>

<style scoped lang="postcss">
.main {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.ant-table-wrapper {
	margin-top: 1.875rem;
}

.right-content {
	padding: 1.25rem 0;
}

.ant-form-item {
	margin-bottom: 1.25rem;
}

.btn_ok {
	width: 4.375rem
}

.formPar {
	display: flex;
	justify-content: center;
	margin-top: -1.25rem;

}

.searchForm {
	margin-right: 0.75rem;
}
</style>
<style lang="less">
.validationError {
	background-color: bisque;
}

.rightMenu {
	width: 5.8rem !important;
	height: 2.15rem !important;
	border: .0625rem solid antiquewhite;
	border-right: .0625rem solid antiquewhite !important;
	// background-color: antiquewhite !important;
	font-size: .75rem;
	box-shadow: -4px 4px 4px -5px rgba(0, 0, 0, 0.35), 2px 3px 4px -5px rgba(0, 0, 0, 0.35);

	.ant-menu-item {
		width: 96%;
		text-align: center !important;
		;
		padding: 0 0 !important;
		height: 1.575rem;
		background-color: #fff;
	}
}

.found-kw {
	color: red !important;
	font-weight: 600;
}

.iconsave {
	margin-left: 1rem;
	width: 3.125rem !important;
	font-size: 1.25rem !important;
}

.ant-dropdown-trigger {
	min-width: 30px;
	display: block;
}

// .exampleEnum{
//   // width:400px
// }
</style>
