<template>
  <div>
    <div class="main_div">
      <component :is="dynamicComponent" />
    </div>
  </div>
</template>

<script>
import Login from "@/views/Login.vue"
import Signup from "@/views/Signup.vue"
import { defineComponent, markRaw } from 'vue';

export default defineComponent({
    beforeRouteUpdate(to, from, next) {
        this.loadComponent(to.params.userKind);
        next();
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.loadComponent(to.params.userKind);
        });
    },
    data() {
        return {
            userKind: '',
            dynamicComponent: null,
        };
    },
    methods: {
        loadComponent(userKind) {
            let componentToLoad = null;

            switch (userKind) {
            case 'login':
                componentToLoad = markRaw(Login);
                break;
            case 'signup':
                componentToLoad = markRaw(Signup);
                break;
            }

            this.userKind = userKind;
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
