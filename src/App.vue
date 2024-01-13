<template>
  <div id="app">
    <header>
      <top v-if="!$hideTop" />
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
    data() {
        return {
            $hideTop: false,
        };
    },
    head: {
        meta: [
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'
            }
        ]
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

    font-size: 62.5%;  /* 10px */
}
</style>