import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Index from './views/Index.vue'
import Home from './views/Home.vue'
import Library from './views/Library.vue'
import Store from './views/Store.vue'
import Forum from './views/Forum.vue'
import Inspiration from './views/Inspiration.vue'
import About from './views/About.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Index },  // 将根路径指向 Index 组件
    { path: '/home', component: Home },
    { path: '/library', component: Library },
    { path: '/store', component: Store },
    { path: '/forum', component: Forum },  // 修正 Forum 的路径
    { path: '/inspiration', component: Inspiration },  // 修正 Inspiration 的路径
    { path: '/about', component: About }
  ]
});
  
const app = createApp(App);
app.use(router);
app.mount('#app');
