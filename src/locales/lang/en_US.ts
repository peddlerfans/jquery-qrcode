import antdLocale from 'ant-design-vue/es/locale/en_US';
import { genMessage } from '../helper';
import common from "./en-US/common";
import component from './en-US/component'
import awModeler from "@/locales/lang/en-US/routes/awModeler";
import MBTStore from '@/locales/lang/en-US/routes/MBTStore'
import templateManager from "@/locales/lang/en-US/routes/templateManager";
import layout from "@/locales/lang/en-US/layout";

// const modulesFiles = require.context('./en-US', true, /\.ts$/);

export default {
  layout,
  // ...genMessage(modulesFiles, 'en-US'),
  antdLocale,
  common,
  component,
  awModeler,
  MBTStore,
  templateManager
};
