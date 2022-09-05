import { createPinia } from 'pinia';
import type { App } from 'vue';
import piniapluginpersist from "pinia-plugin-persist"

const store = createPinia();
store.use(piniapluginpersist)

export function setupStore(app: App<Element>) {
  app.use(store);
}

export default store;
