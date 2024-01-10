<template>
  <div>
    <div class="main_div">
      <!-- 动态切换和渲染不同的组件 -->
      <component :is="dynamicComponent" />
    </div>
  </div>
</template>

<script>
import Login from "@/views/Login.vue"
import Signup from "@/views/Signup.vue"
import { defineComponent, markRaw } from 'vue';

export default defineComponent({
    // 路由更新时，传递新路由 to.params.logOrSign 给 loadComponent方法的 logOrSign 参数
    beforeRouteUpdate(to, from, next) {
        this.loadComponent(to.params.logOrSign);
        next();
    },
    // 确保组件实例被创建之前 也能调用 loadComponent 方法
    beforeRouteEnter(to, from, next) {
        // 组件进入路由时，组件实例还未被创建，因此不能直接访问组件实例的 this
        // beforeRouteEnter 接收一个回调函数，在导航确认之前被调用，传入一个 vm 参数，即组件实例
        next(vm => {
            vm.loadComponent(to.params.logOrSign);
        });
    },
    data() {
        return {
            logOrSign: '',  // 可能值：Login 或 Signup，根据此跳转路由
            dynamicComponent: null,  // 动态组件的实例
        };
    },
    methods: {
        // loadComponent 方法：将 dynamicComponent 设置为 Login 或 Signup 组件的实例
        loadComponent(logOrSign) {
            let componentToLoad = null;

            switch (logOrSign) {
            case 'login':
                componentToLoad = markRaw(Login);
                // markRaw()：用于将一个对象标记为非响应式，避免不必要的性能开销。
                // Login 和 Signup 组件 不需要响应式处理。
                break;
            case 'signup':
                componentToLoad = markRaw(Signup);
                break;
            }

            this.logOrSign = logOrSign;
            this.dynamicComponent = componentToLoad;
        },
    },
});
</script>

<style scoped>
.main_div {
    position: fixed;
    top: 50%;
    left: 50%;

    margin-top: -220px;
    margin-left: -300px;
}
</style>
