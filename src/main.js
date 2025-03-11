import {createApp} from 'vue'
import App from './App.vue'

import {createPinia} from 'pinia'

const pinia = createPinia()

// Pinia持久化
import piniaPluginPersistence from 'pinia-plugin-persistedstate'

pinia.use(piniaPluginPersistence)

import router from "./router"

import * as ElementPlusIconsVue from '@element-plus/icons-vue'



import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, createKatexPlugin, createCopyCodePlugin,{
    Prism,
});
import VueSmoothScroll from "vue3-smooth-scroll";//引入插件



import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
    .use(pinia)
    .use(router)
    .use(VueMarkdownEditor)
    .use(VueSmoothScroll)
    .mount('#app')
