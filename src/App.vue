<template>
  <div id="app">
    <header>
      <top />
    </header>

    <main>
      <router-view />
    </main>

    <footer />
  </div>
</template>

<script>
import TopNew from '@/components/TopNew.vue';

export default {
    components: {
        'top': TopNew,
    },
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}
html {
    height: 100%;
    width: 100%;
    background: linear-gradient(#ffffff 60%, #b4b4b4);
}
body {
}
</style>
