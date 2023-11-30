<template>
  <div>
    <!-- smile -->
    <img id="smileJPG" src="@/image/img_bg/smile.png" alt="">

    <!-- 走马灯 -->
    <div class="carousel_div">
      <Carousel />
    </div>

    <!-- 内容栏 -->
    <div v-for="(item) in imgList" :key="item" class="content_div">
      <p id="topic_p">
        {{ item }}
      </p>
      <p id="introduce_p">
        {{ item.introduce }}
      </p>

      <!-- 侧边切换栏 -->
      <div class="side_div">
        <div class="each_side" :class="{ 'active-side': isActiveImg }">
          <a>{{ item }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Carousel from "@/components/Carousel.vue";

export default defineComponent({
    components: { Carousel },

    data() {
        return {
            receivedImgList: {}
        };
    },
    methods: {
        updateImgList(imgList) {
            this.receivedImgList = imgList;
        },
        // each_side 激活样式
        isActiveImg() {
            return this.receivedImgList[this.currentIndex];
        },
    },
});
</script>

<style lang="scss" scoped>
* {
    scroll-behavior: smooth;
    margin: 0;
}

body {

}
#smileJPG {
    position: fixed;
    top: 80px;
    right: 90px;

    width: 150px;

    transform: rotate(10deg);
}

/* 走马灯 */
.carousel_div {
    position: fixed;

    bottom: 0;
    left: 10%;
}

/* 内容栏 */
.content_div {
    position: fixed;

    top: 240px;
    right: 70px;

    width: 48vw;
    height: 70vh;

    border: #160A0A solid 1px;

    #topic_p {
        color: $blue-color;
        font: {
            size: 40px;
            weight: bold;
        };
    }
    #introduce_p {
        color: #CFCFCF;
        font: {
            size: 20px;
        };
    }

    /* 侧边切换栏 */
    .side_div {
        position: fixed;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        top: 50%;
        right: 80px;
        margin-top: -100px;

        width: 180px;;
        height: auto;

        .each_side {
            box-sizing: border-box;

            width: auto;
            height: auto;

            margin: 0;
            padding: 10px;

            text-align: center;
            border: #160A0A solid 1px;

            cursor: pointer;
            transition: all .2s;

            a {
                width: 100%;
                height: 50px;

                text-decoration: none;

                transition: all .2s;

                color: #31384f;
                font: {
                    size: 24px;
                    weight: bold;
                };
            }

            &:not(.active-side):hover {
                //border-right: $booth-red-color solid 4px;
                //box-shadow: 5px 0 5px rgba(0, 0, 0, 0.35);
                a {
                    color: $booth-red-color;
                }
            }

            /* 激活样式 */
            &.active-side {
                border-right: $booth-red-color solid 4px;
                box-shadow: 5px 0 5px rgba(0, 0, 0, 0.35);
                a {
                    color: $booth-red-color;
                }
            }
        }
    }
}

</style>