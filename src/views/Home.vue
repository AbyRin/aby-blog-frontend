<template>
  <div>
    <div class="container">
      <div class="carousel_div">
        <Carousel />
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import Carousel from "@/components/Carousel.vue";

export default defineComponent({
    components: {Carousel}
})
</script>

<style lang="scss">
* {
    scroll-behavior: smooth;
    margin: 0;
}

body {
    background: $bgDarkGrayColor;
}

.container {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    box-shadow: 2px 2px 2px #bdbdbd;

    margin-top: 104px;

    .carousel_div {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
        height: auto;
        background-color: $bgLightGrayColor;
    }
}
</style>