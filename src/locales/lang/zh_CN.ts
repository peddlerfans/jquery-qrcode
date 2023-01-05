import antdLocale from 'ant-design-vue/es/locale/zh_CN';
import { genMessage } from '../helper';
import common from "./zh-CN/common";
import component from './zh-CN/component'
import awModeler from "@/locales/lang/zh-CN/routes/awModeler";
import MBTStore from '@/locales/lang/zh-CN/routes/MBTStore'
import templateManager from "@/locales/lang/zh-CN/routes/templateManager";
import layout from "@/locales/lang/zh-CN/layout";
import dashboard from "@/locales/lang/zh-CN/routes/dashboard";
import settings from '@/locales/lang/zh-CN/routes/settings'
import account from '@/locales/lang/zh-CN/routes/account'
// const modulesFiles = require.context('./zh-CN', true, /\.ts$/);

export default {
  layout,
  // ...genMessage(modulesFiles, 'zh-CN'),
  account,
  antdLocale,
  common,
  component,
  awModeler,
  MBTStore,
  templateManager,
  dashboard,
  settings
};
