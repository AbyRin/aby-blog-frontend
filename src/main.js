import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

// 引入工具
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from "axios";
import request from "@/utils/request"; // 引入axios封装
axios.defaults.baseURL = 'http://localhost:8081';  // 省略每次axios请求配置

// 自制组件

// 主要页面
import App from '@/App.vue';

// 无匹配路由
import NotFound from '@/views/NotFound.vue';

// 路由配置
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/views/Home.vue')},
    { path: '/library', component: () => import('@/views/Library.vue')},
    { path: '/store', component: () => import('@/views/Store.vue')},
    { path: '/forum', component: () => import('@/views/Forum.vue') },
    { path: '/inspiration', component: () => import('@/views/Inspiration.vue') },
    { path: '/about', component: () => import('@/views/About.vue') },

    { path: '/account', component: () => import('@/views/Account.vue') },
    { path: '/collect/:collectionKind',
      component: () => import('@/views/Collect.vue'),
      children: [
        {
          path: 'product-collection',
          component: () => import('@/components/ProductCollection.vue'),
        },
        {
          path: 'forum-collection',
          component: () => import('@/components/ForumCollection.vue'),
        },
        {
          path: 'inspiration-collection',
          component: () => import('@/components/InspirationCollection.vue')
        },
      ],
    },
    { path: '/order', component: () => import('@/views/Order.vue') },
    { path: '/cart', component: () => import('@/views/Cart.vue') },

    // 用户页面
    { path: '/user/:logOrSign',
      component: () => import('@/views/User.vue'),
      children: [
        {
          path: 'login',
          component: () => import('@/views/Login.vue'),
          meta: { hideTop: true }
        },
        {
          path: 'signup',
          component: () => import('@/views/Signup.vue'),
          meta: { hideTop: true }
        },
      ],
    },

      // 无匹配页面
    { path: '/:catchAll(.*)', component: NotFound, meta: { hideHeader: true }},
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/user/') && to.params.logOrSign) {
    document.documentElement.style.background = '#31384f';
    app.config.globalProperties.$hideTop = true; // 隐藏 top 组件
  } else {
    document.documentElement.style.background = 'linear-gradient(#ffffff 60%, #b4b4b4)';
    app.config.globalProperties.$hideTop = to.matched.some(record => record.meta.hideTop);
  }

  next();
});


// 挂载
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app');

// 使用 request.js 模块
app.config.globalProperties.$http = axios;  // 省略每次axios请求配置