// import { Component } from "vue"

// declare module 'vue-router' {
//   export interface RouteMeta {
//     /**
//      * title：菜单名
//      */
//     title?: string
//     /**
//      * icon：菜单图标，值为src/svgs文件夹下相同的名称或者antd图标组件，当值为组件时需要显式导入
//      */
//     icon?: Component | string
//     /**
//      * external：是否外部链接，外部链接时需在redirect指定链接地址
//      */
//     external?: boolean
//     /**
//      * breadcrumb：是否显示面包屑，默认true
//      */
//     breadcrumb?: boolean
//     /**
//      * hidden：是否在菜单隐藏
//      */
//     hidden?: boolean
//     /**
//      * keepAlive：是否缓存该路由，只有当页面定义的name和路由定义的name一致时，才能生效
//      */
//     keepAlive?: boolean
//     /**
//      * 当前路由页面所指向的菜单路径
//      */
//     belongs?: string
//     /**
//      * 是否在标签页隐藏
//      */
//     hiddenTab?: boolean
//     /**
//      * 关闭标签页时确认询问
//      */
//     askBeforeClose?: boolean
//   }
// }
import { type RouteMeta as VRouteMeta } from 'vue-router';
import { type PermissionType } from '@/core/permission/modules/types';
import { type LocaleType } from '@/locales/config';

declare global {
  type Title18n = {
    [p in LocaleType]: string;
  };
}

declare module 'vue-router' {
  interface RouteMeta extends VRouteMeta {
    /** 标题 */
    title?: string | Title18n;
    /** 当前菜单类型 0: 目录 | 1: 菜单 | 2: 权限 */
    type?: 0 | 1 | 2;
    /** 当前路由权限 */
    perms?: PermissionType[];
    /** 是否需要缓存 */
    keepAlive?: boolean;
    /** 当前路由namePath 祖先name集合 */
    namePath?: string[];
    /** 当前路由所在的完整路径 */
    fullPath?: string;
    /** 是否固定在标签栏 */
    affix?: boolean;
    /** 菜单图标 */
    // icon?: any;
    /** 当前页面切换动画 */
    transitionName?: string | false;
    /** @name 在菜单中隐藏子节点 */
    hideChildrenInMenu?: boolean;
    /** 不在菜单中显示 */
    hideInMenu?: boolean;
    /** 不在面包屑导航中显示 */
    hideInBreadcrumb?: boolean;
    /** 不在tab标签页中显示 */
    hideInTabs?: boolean;
    /** 设置当前路由高亮的菜单项，值为route fullPath或route name,一般用于详情页 */
    activeMenu?: string;
    /** 菜单排序号 */
    orderNum?: number;
    isLink?: boolean;

    /**
     * icon：菜单图标，值为src/svgs文件夹下相同的名称或者antd图标组件，当值为组件时需要显式导入
     */
    icon?: Component | string
    /**
     * external：是否外部链接，外部链接时需在redirect指定链接地址
     */
    external?: boolean
    /**
     * breadcrumb：是否显示面包屑，默认true
     */
    breadcrumb?: boolean
    /**
     * hidden：是否在菜单隐藏
     */
    hidden?: boolean
    /**
     * keepAlive：是否缓存该路由，只有当页面定义的name和路由定义的name一致时，才能生效
     */
    // keepAlive?: boolean
    /**
     * 当前路由页面所指向的菜单路径
     */
    belongs?: string
    /**
     * 是否在标签页隐藏
     */
    hiddenTab?: boolean
    /**
     * 关闭标签页时确认询问
     */
    askBeforeClose?: boolean


  }
}
