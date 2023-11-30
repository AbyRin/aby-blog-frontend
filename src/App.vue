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
body {
    height: 100%;
    background-size: 100%;
    background: linear-gradient(#f7f7f7, #b4b4b4);
}
</style>
