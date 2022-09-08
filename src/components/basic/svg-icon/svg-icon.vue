<<<<<<< HEAD
<!-- <template>
=======
<template>
>>>>>>> 3e242a4... 更新
  <svg v-bind="$attrs" class="svg-icon" :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
  import { computed, type CSSProperties } from 'vue';

  // const files = import.meta.globEager('./*.ts')
  // Object.keys(files).forEach((fileName)=>{
  //     const name
  //   })

  // const importAll = (requireContext: import.meta.globEager) =>
  //   requireContext.keys().forEach(requireContext);

  // const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  //   requireContext.keys().forEach(requireContext);
  try {
    // importAll(require.context('@/assets/icons', true, /\.svg$/));
<<<<<<< HEAD
    const files =import.meta.glob("@/assets/icons/*.svg")
=======
    const files =import.meta.globEager("@/assets/icons/*.svg")
>>>>>>> 3e242a4... 更新
    Object.keys(files).forEach((fileName)=>{
      console.log(fileName);
    })

  } catch (error) {
    console.log(error);
  }

  // defineOptions({
  //   name: 'svg-icon',
  // });

  const props = defineProps({
    prefix: {
      type: String,
      default: 'svg-icon',
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 16,
    },
  });
  const symbolId = computed(() => `#${props.prefix}-${props.name}`);
  const getStyle = computed((): CSSProperties => {
    const { size } = props;
    const s = `${size}`.replace('px', '').concat('px');
    return {
      width: s,
      height: s,
    };
  });
</script>

<style lang="less">
  .svg-icon {
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;
  }
<<<<<<< HEAD
</style> -->
=======
</style>
>>>>>>> 3e242a4... 更新
