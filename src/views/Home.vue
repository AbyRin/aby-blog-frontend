<template>
  <div>
    <div class="container">
      <div class="long_div">
        <Carousel />
      </div>
      <div class="long_div">
        <div class="module_div">
          <div class="each_module" />
          <div class="each_module" />
          <div class="each_module" />
        </div>
        <div class="module_div">
          <div class="each_module" />
          <div class="each_module" />
          <div class="each_module" />
        </div>
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
    background: $blue-color;
}

.container {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    box-shadow: 2px 2px 2px #bdbdbd;

    margin-top: 104px;
    margin-bottom: 80px;

    .long_div {
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;

        width: 100%;
        height: auto;
        background-color: $bg-light-gray-color;

        .module_div {
            display: flex;
            flex-direction: row;
            justify-items: center;
            justify-content: space-evenly;
            align-items: center;
            width: auto;

            .each_module {
                float: left;
                width: 500px;
                height: 240px;
                background-color: #ffffff;
                margin: 10px;

                border-radius: 20px;
                box-shadow: 5px 5px 5px $shadow-color;
            }
        }
    }
}
</style>