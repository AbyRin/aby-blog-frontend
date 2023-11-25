<template>
  <div>
    <div class="container">
      <Carousel />
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
$blueColor: #31384f;     // 藏蓝色
$yellowColor: #fec738;    // 黄色
$boothRedColor: #f84f52; // Booth浅红
$boothGreenColor: #4e9da9;  // Booth浅绿
$lightGrayColor: #b2b2b2;   // 浅灰
$darkGrayColor: #706e6f;    // 深灰
$furGrayColor: #e7e5e1;     // 鹅毛灰色-背景板

* {
    scroll-behavior: smooth;
    margin: 0;
}

body {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    height: 100%;
    background: #dddddd;
}

.container {
  display: flex;
  flex-direction: column;

  margin-top: 148px;

  background-color: #eeeeee;
  box-shadow: 2px 2px 2px #bdbdbd;
}
</style>