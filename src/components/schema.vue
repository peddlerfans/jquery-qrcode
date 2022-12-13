<template>
    <div>
    </div>
    <!-- <VueForm :schema="awSchema"></VueForm> -->
</template>

<script lang="ts" setup>
import VueForm from "@lljj/vue3-form-ant";
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

</style>