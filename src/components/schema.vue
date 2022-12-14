<template>
    
    <a-tabs v-model:activeKey="activeKey" class="AwtabInspector">
    
    <a-tab-pane key="1" tab="Tab 1">
        <div class="inspector-container"></div>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2" force-render>
        <!-- <VueForm @save="" :schema="props.awSchema" v-model="awData" v-if="props.awSchema"></VueForm>
        <div slot-scope="{ awData }" style="position: relative;">
        </div> -->
        <mbtModelerAwschema :show="show"></mbtModelerAwschema>
    </a-tab-pane>
        
    
    </a-tabs>

</template>

<script lang="ts" setup>
import VueForm from "@lljj/vue3-form-ant";
import { ref } from "vue";
import { defineProps , defineEmits } from 'vue'
import { MBTStore } from "@/stores/MBTModel"
import { MbtModeler } from "@/composables/MbtModeler";
import mbtModelerAwschema from "@/components/mbt-modeler-aw-schema.vue"
let store = MBTStore()
let props = defineProps(['awSchema'])
let emit = defineEmits([])
let awData = ref()
let show = false
const awhandlerSubmit = (data:any , schema:any) => {
    store.saveAwData(data,schema)
}

const activeKey = ref('1')
let awSchema = {
        type: "object",
        properties: {
            name: {
                title: "MBT Name",
                type: "string",
                readOnly: true,
                default: '123'
            },
            descriptions: {
                title: "Description",
                type: "string",
                datault: '456'
            },
        },
    }
</script>

<style lang="scss">

.AwtabInspector{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 120px;
    /* navigator height */
    width: 300px;
    box-sizing: border-box;
    .ant-tabs-content-holder > .ant-tabs-content{
    height: 100%!important
}
}

.inspector-container {
    overflow: auto;
    height: 100%;
    /* bottom: 120px; */
    /* navigator height */
    /* width: 240px; */
    box-sizing: border-box;
}
</style>