<template>
  <div id="app">
    <header v-if="!$route.meta.hideHeader">
      <top />
    </header>

    <main>
      <router-view />
    </main>

    <footer />
  </div>
</template>

<script>
import Top from '@/components/Top.vue';

export default {
    components: {
        'top': Top,
    },
};
</script>

<style lang="scss">
:root {
    --el-color-primary: #4E9DA9FF;
}
* {
    margin: 0;
    padding: 0;
}
html {
    height: 100%;
    width: 100%;
    background: linear-gradient(#ffffff 60%, #b4b4b4);
}
</style>