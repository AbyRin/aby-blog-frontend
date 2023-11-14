<template>
  <div id="app">
    <header>
      <div>
        <top></top> <!-- 在这里使用局部注册的组件 -->
      </div>
    </header>
    
    <router-view></router-view>

    <footer>
      <bottom></bottom>
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
