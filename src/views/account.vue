<script lang="ts">
export default { name: 'Account' }
</script>
<script setup lang="ts">
import MbtServe from "@/composables/mbtServe"
import { StencilService } from '@/composables/stencil';
import { ToolbarService } from '@/composables/Toolbar';
import { HaloService } from "@/composables/haloService";
import { InspectorService } from "@/composables/inspector";
import { KeyboardService } from "@/composables/keyboard";
import joint from "../../node_modules/@clientio/rappid/rappid.js"
import $ from 'jquery'
import { onMounted, ref } from 'vue';
let rappid : MbtServe
let apps : HTMLElement | any= ref()
onMounted(() => {
 rappid = new MbtServe(
    apps.value,
    new StencilService(),
    new ToolbarService(),
    new HaloService(),
    new InspectorService(),
    new KeyboardService()
  )
  rappid.startRappid()
})

			var tabList = document.querySelectorAll('.lili');
			var tabChild = document.querySelectorAll('.tab_child');
      
      
			for (let i = 0; i < tabList.length; i++) {
        
				tabList[i].addEventListener('click',() => {
          console.log(i);
					tabInit()
					tabList[i].classList.add('active');
					tabChild[i].setAttribute('style', 'display:block');
				})  
			}
			//初始化tab
			function tabInit() {
				for (let i = 0; i < tabList.length; i++) {
					tabList[i].classList.remove('active')
					tabChild[i].setAttribute('style', 'display:none')
				}
			}
      // function qqq(){
      //   var tabList:Element = document.querySelector('.active')!;
      //   tabList.classList.add('active');
			// 		tabChild[2].setAttribute('style', 'display:block');
      // }
</script>

<template>
  <main class="joint-app joint-theme-modern" ref="apps">
        <div class="app-header">
          <div class="toolbar-container"/>
        </div>
          <div class="app-body">
            <div ref="stencils" class="stencil-container"></div>
            <div class="paper-container"/>
            <div class="container">
                <ul class="tab_ul">
                  <li class="active lili">选项一</li>
                  <li class="lili">选项二</li>
                </ul>
                <div class="tab_content">
                  <div class="tab_child" style="display: block;">
                    <div class="inspector-container"/>
                  </div>
                  <div class="tab_child">
                    <p>我上了那么多年学，熬了那么多夜，做那么多习题</p>
                  </div>
                  
                </div>
              </div>
            <div class="navigator-container"/>
          </div>

  </main>
</template>

<style lang="scss">

</style>
<style lang="scss">
@import "../../node_modules/@clientio/rappid/rappid.css";
@import '../composables/css/style.css';

.container{
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
.inspector-container {
    overflow: auto;
    height: 100%;
    box-sizing: border-box;
}
.joint-inspector {
  top: 3.125rem;
}
}

ul {
				list-style: none;
			}
			.tab_ul {
				background-color: #5edbbe;
				overflow: hidden;
			}
			.tab_ul li {
				float: left;
				padding: 15px;
				cursor: pointer;
			}
			.tab_ul .active {
				color: #ec1818;
			}
			.tab_content {
				background-color: #F6F6F6;
				min-height: 250px;
				padding: 15px;
				overflow: hidden;
			}
			.tab_child {
				display: none;
				animation: hideTab 0.5s;
				-moz-animation: hideTab 0.6s;/* Firefox */
				-webkit-animation: hideTab 0.6s;/* Safari and Chrome */
			}
			@keyframes hideTab {
				0% {
					opacity: 0;
					transform: translate(200px, 0)
				}
				100% {
					opacity: 1;
					transform: translate(0, 0)
				}
			}

</style>