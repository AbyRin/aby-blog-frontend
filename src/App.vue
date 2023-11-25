<template>
  <div id="app">
    <header>
      <top />
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <bottom />
    </footer>
  </div>
</template>

<script>
import Top from '@/components/Top.vue';
import Bottom from '@/components/Bottom.vue';

export default {
    components: {
        'top': Top,
        'bottom': Bottom
    },
};
</script>

<style>
</style>
