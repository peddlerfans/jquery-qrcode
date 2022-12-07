<script setup lang="ts">
import { MenuFoldOutlined, LogoutOutlined, UserOutlined, TranslationOutlined } from '@ant-design/icons-vue'
import type { Layout } from 'types/layout'
import {inject, ref} from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '@/stores/user'
import BreadCrumb from './BreadCrumb.vue'
import request from "@/utils/request";
import { useLocale } from "@/locales/useLocale";

const sidebarRelated = inject<Layout.SidebarRelated>('sidebarRelated')
const loading = inject<Layout.Loading>('loading')
const user = userStore()
const router = useRouter()

let prev=ref<boolean>(false);

const viewProfile =  () => {

  prev.value=true

}

function logout() {
  if (loading) loading.logout = true
  user.logout().then((_:any) => {
    router.replace('/login')
  })
}


const languageChange = (obj: any) => {
  let changeLocale = useLocale()
  changeLocale.changeLocale(obj.key)
}

</script>

<template>
  <header>
    <section>
      <MenuFoldOutlined :class="['icon-sidebar-trigger', sidebarRelated?.collapsed && 'collapsed']"
        @click="sidebarRelated && (sidebarRelated.collapsed = !sidebarRelated.collapsed)" />
      <BreadCrumb :withIcons="true"></BreadCrumb>
    </section>

    <a-modal v-model:visible="prev" title="View profile" :width="900">

      <!-- Model meta info -->
      <h3>Name:</h3> {{user.name}}
      <h3 style="margin-top: 20px;">Email:</h3> {{user.email}}

    </a-modal>


    <section>
      <a-dropdown>
        <a class="ant-dropdown-link">
          <translation-outlined />
        </a>
        <template #overlay>
          <a-menu @click="languageChange">
            <a-menu-item key="zh_CN">中文简体</a-menu-item>
            <a-menu-item key="en_US">English</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>

      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <a-avatar v-if="user.avatar_url == ''">
            <user-outlined />
          </a-avatar>
          <a-avatar v-else :src="user.avatar_url" />
          <span style="margin-left: 5px; margin-right:30px;">{{ user.name }}</span>
        </a>
        <template #overlay>
          <a-menu>

            <a-menu-item>
              <a @click="viewProfile">View Profile</a>
            </a-menu-item>
            <a-menu-item>
              <a :loading="loading?.logout" @click="logout">Logout</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </section>
  </header>
</template>

<style scoped lang="postcss">
header {
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;

  & section {
    &:first-of-type {
      display: inline-flex;
      flex-wrap: nowrap;
      align-items: center;
      flex-shrink: 0;
      overflow: hidden;
      flex: 1
    }

    &:last-of-type {
      display: inline-flex;
      flex-wrap: nowrap;
      flex-shrink: 0;
      align-items: center;
    }
  }
}

.icon-sidebar-trigger {
  cursor: pointer;
  margin-right: 1.2rem;
  font-size: 1.2rem;

  &.collapsed {
    transform: rotate(180deg);
  }
}
.ant-dropdown-link {
  margin-right: 8px;
}
</style>