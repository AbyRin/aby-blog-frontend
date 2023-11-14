import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import App from './App.vue'
import Index from './views/Index.vue'
import Home from './views/Home.vue'
import Library from './views/Library.vue'
import Store from './views/Store.vue'
import Forum from './views/Forum.vue'
import Inspiration from './views/Inspiration.vue'
import About from './views/About.vue'

import NotFound from './views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Index },
    { path: '/home', component: Home },
    { path: '/library', component: Library },
    { path: '/store', component: Store },
    { path: '/forum', component: Forum },
    { path: '/inspiration', component: Inspiration },
    { path: '/about', component: About },

    { path: '/:catchAll(.*)', component: NotFound }
    
  ]
});
  
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
