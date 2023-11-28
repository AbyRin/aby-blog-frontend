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
* {
    scroll-behavior: smooth;
    margin: 0;
}

body {

}

.container {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    width: auto;
    height: auto;

    margin-top: 104px;
    margin-bottom: 80px;
    padding: 40px;

    background-color: #eeeeee;

    //.long_div {
    //    display: flex;
    //    flex-direction: column;
    //    justify-items: center;
    //    align-items: center;
    //
    //    width: 100%;
    //    height: auto;
    //    background-color: $bg-light-gray-color;
    //
    //    .module_div {
    //        display: flex;
    //        flex-direction: row;
    //        justify-items: center;
    //        justify-content: space-evenly;
    //        align-items: center;
    //        width: auto;
    //
    //        .each_module {
    //            display: flex;
    //            flex-direction: column;
    //            justify-items: center;
    //            justify-content: space-evenly;
    //
    //            float: left;
    //            width: 300px;
    //            height: 240px;
    //            background-color: #ffffff;
    //            margin: 10px;
    //
    //            border-radius: 20px;
    //            box-shadow: 5px 5px 10px rgba(0,0,0,0.4);
    //            transition: all 0.3s;
    //            &:hover {
    //                transform: translateY(-3px) scale(1.01,1.01);
    //                box-shadow:10px 10px 20px rgba(0,0,0,0.3);
    //            }
    //            span {
    //                //color: transparent;
    //                //-webkit-text-stroke-width: 2px;
    //                //-moz-text-stroke-width: 2px;
    //                //-webkit-text-stroke-color: #333;
    //                //-moz-text-stroke-color: #333;
    //                //text-shadow: 6px 6px hotpink;
    //
    //                color: $blue-color;
    //                text-align: center;
    //                text-shadow: 4px 4px 20px #222222;
    //                font: {
    //                    size: 36px;
    //                    weight: bolder;
    //                }
    //            }
    //            p {
    //                color: $blue-color;
    //                text-align: center;
    //                //margin-top: 10px;
    //                font: {
    //                    size: 18px;
    //                    weight: bolder;
    //
    //                }
    //            }
    //        }
    //    }
    //}
}
</style>