<p align="center">
  <img src="./src/assets/logo.png" alt="logo">
</p>
<h3 align="center">Vite + Vue3 + Antd + Typescript MBT前端框架</h3>
<p align="center">
  <a href="https://github.com/vuejs/core">
    <img src="https://img.shields.io/badge/vue-3.2.37-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vitejs/vite">
    <img src="https://img.shields.io/badge/vite-3.0.0-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vuejs/pinia">
    <img src="https://img.shields.io/badge/pinia-2.0.16-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vuejs/router">
    <img src="https://img.shields.io/badge/vueRouter-4.1.2-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vueComponent/ant-design-vue">
    <img src="https://img.shields.io/badge/antdv-3.2.10-brightgreen.svg" alt="element-ui">
  </a>
 </p>

## 🐬 简介
[MBT(Model Based Testing) 前端  是一个由Vue最新技术栈开发的测试工具。基于vue3，集成vue3最新生态系统的核心库实现。主要的技术栈有
[ES2015+](http://es6.ruanyifeng.com/)，[typescript](https://www.typescriptlang.org/zh/)，[vue3](https://staging-cn.vuejs.org)，[pinia](https://pinia.vuejs.org/)，[vue-router](https://router.vuejs.org/zh/)，[vite](https://cn.vitejs.dev/)，[antd](https://antdv.com/)，了解这些技术会让你更容易入手此项目。此项目基于`vite`构建，并使用`vue3`作为开发技术，所以[只针对现代浏览器做开发](https://cn.vitejs.dev/guide/build.html#browser-compatibility)，不支持低版本的浏览器（如ie），如有需要请自行添加`polyfill`进行适配。
+ [在线预览](https://mbt-dev.oppo.itealab.net)


## 🦑 优势
+ 使用当前前端最新技术开发（vite, vue3, ts, pinia, csswg）
+ MBT建模工具与配套工具集成

## 🐟了解这些可能会有帮助
1. 本项目采用[vite官方推荐的css编写方式](https://www.vitejs.net/guide/features.html#css-pre-processors)，如果你用的vscode编辑器，可下载language-postcss插件进行代码高亮。如果你不喜欢用postcss-nesting，也可以下载其他css预处理器依赖如scss，less等，不会造成冲突。
2. 不需要对flex，grid等css样式进行多浏览器适配，框架已配置了自动适配。
3. 大部分场景推荐使用rem代替px以适配更多不同分辨率屏幕

## 🐳 主要功能
+ 测试模型
+ 模版配置
+ 测试模型
+ 关键词（AW）

## 🦀 开发准备
    # 克隆项目
    git clone https://gitlab.com/itea-tech/itea-oppo/mbt-frontend.git
    
    # 进入目录
    cd mbt-frontend
    
    # 下载依赖包
    npm install # 使用npm
    yarn # 使用yarn
    
    # 启动项目
    npm run dev # 使用npm
    yarn dev # 使用yarn

## 🐠 scripts命令
+ dev：本地开发
+ unittest: 单元测试
+ test： 代码测试
+ stage: 预发布环境开发
+ build：打包项目代码
+ build:stage: 打包预发布环境代码
+ preview：预览打包后的项目

## 🦐 预览项目
[在线预览](https://mbt-dev.oppo.itealab.net)

## 🐙 License
[MIT License]

Copyright	&copy; 2022-present Itea Technologies
