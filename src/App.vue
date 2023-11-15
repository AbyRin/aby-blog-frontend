<template>
    <div id="app">
        <header>
            <top></top>
        </header>

        <main>
            <router-view></router-view>
        </main>

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
