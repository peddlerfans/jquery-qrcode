import { onBeforeMount, onBeforeUnmount, ref } from "vue"

<<<<<<< HEAD
export default function () {
=======
export default function (cb?: Function) {
>>>>>>> cfb6473... 解析树形数据渲染表格
  const WIDTH = 992
  const isMobile = ref(false)
  onBeforeMount(() => {
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkIsMobile)
  })
  function checkIsMobile() {
    const rect = document.body.getBoundingClientRect()
    isMobile.value = rect.width < WIDTH
<<<<<<< HEAD
=======
    if (isMobile.value) {
      cb && cb()
    }
>>>>>>> cfb6473... 解析树形数据渲染表格
  }
  return isMobile
}