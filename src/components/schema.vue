<template>
    
    <a-tabs v-model:activeKey="activeKey" class="AwtabInspector">
    
    <a-tab-pane key="1" tab="Tab 1">
        <div class="inspector-container"></div>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2" force-render>
        <VueForm :schema="awSchema"></VueForm>
    </a-tab-pane>
        
    
    </a-tabs>

</template>

<script lang="ts" setup>
import VueForm from "@lljj/vue3-form-ant";
import { ref } from "vue";
import { defineProps } from 'vue'
let props = defineProps(['awSchema'])
console.log(props.awSchema);

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

<style lang="scss" scoped>

.AwtabInspector{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 120px;
    /* navigator height */
    width: 240px;
    box-sizing: border-box;
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