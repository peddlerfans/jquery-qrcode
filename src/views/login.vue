<script setup lang="ts">
import { reactive } from 'vue'
import { UserOutlined, LockOutlined,  } from '@ant-design/icons-vue'
import { appTitle } from '@/appConfig'
import { userStore } from '@/stores/user'
import { message } from 'ant-design-vue/es'
import { useRouter, useRoute } from 'vue-router'
import {getCookie} from "@/utils"
import request from "@/utils/request";

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faAtlassian, faGitlab } from '@fortawesome/free-brands-svg-icons'
// import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
// library.add(faAtlassian, faGitlab)




interface LoginForm {
  username: string
  password: string
  remember: boolean
}
const form = reactive<LoginForm>({
  username: 'david',
  password: '123456',
  remember: true
})
const loading = reactive({
  login: false
})

const router = useRouter()
const route = useRoute()
const user = userStore()

let oauth:any

try{
  oauth=await request.get("/api/oauthConfig")
}catch (e) {
  console.log(e)
}

// oauth=[
//     {
//       "name":"atlassian",
//       "link_info":{
//         "icon":"https://confluence.atlassian.com/staticassets/4.1.3/dist/common/images/favicon.png",
//         "color":"blue",
//         "url":"/auth/atlassian"}
//     },
//   {
//     "name":"gitlab",
//     "link_info":{
//       "icon":"https://gitlab.com/assets/favicon-72a2cad5025aa931d6ea56c3201d1f18e68a8cd39788c7c80d5b2b82aa5143ef.png","color":"red","url":"/auth/gitlab"}}]

function login() {
  loading.login = true
  user.login(form.username, form.password).then((_:any)=> {
    router.replace('/dashboard')
  }).catch((err :any)=> {
    loading.login = false
    message.error(err)
  })
}

const redirect_url:any = route.query.redirect_url || location.origin+"/#/dashboard"
const error_redirect:any = location.origin+"/#/login"
console.log('Login page - redirect_url')
console.log(redirect_url)
// const redirect=encodeURIComponent('http://127.0.0.1:7777/#/dashboard')
</script>

<template>
  <main class="main">
    <section class="login-wrapper">
      <h2 class="title">{{ appTitle }} Login</h2>
      <AForm name="loginForm" :model="form" layout="vertical" class="login-form shadow" @finish="login">
        <AFormItem name="username" :rules="[{ required: true, message: '用户名不能为空!' }]">
          <AInput v-model:value="form.username" placeholder="用户名david或lili" size="large">
            <template #prefix>
              <UserOutlined />
            </template>
          </AInput>
        </AFormItem>
        <AFormItem name="password" :rules="[{ required: true, message: '密码不能为空!' }]">
          <AInputPassword v-model:value="form.password" placeholder="密码123456" size="large">
            <template #prefix>
              <LockOutlined />
            </template>
          </AInputPassword>
        </AFormItem>
        <AFormItem name="remember" no-style>
          <div style="margin-bottom: .7rem">
            <ACheckbox v-model:checked="form.remember">Remember me</ACheckbox>
          </div>
        </AFormItem>
        <AButton type="primary" style="width: 100%;margin-bottom: 5px;" size="large" html-type="submit" :loading="loading.login">Login
        </AButton>


        <span v-if="oauth.length>0">
          <a-divider style="height: 2px;"/>
          <a-button v-for="(v,k) of oauth" :key="k" :style="`width: 100%;margin-bottom: 5px;background: ${v.link_info.color };color:#FFFFFF;`" size="large"
                    :href="`/api${v.link_info.url}?redirect=${encodeURIComponent(redirect_url)}&error_redirect=${encodeURIComponent(error_redirect)}`">
            Log in with {{ v.name.charAt(0).toUpperCase() + v.name.slice(1) }}
          </a-button>

        </span>

      </AForm>

    </section>
  </main>
</template>
<style scoped lang="postcss">
.main {
  background-image: linear-gradient(-170deg, #44cee9, #2b74c1);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & .login-wrapper {
    margin-top: -10rem;

    & .title {
      color: var(--white);
      text-align: center;
    }

    & .login-form {
      background-color: var(--white);
      padding: 2rem 1.5rem;
      width: 25rem;
      border-radius: .5rem;

      & .wrapper-remember {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>