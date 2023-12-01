<template>
  <div>
    <!-- 走马灯 -->
    <div class="carousel_div">
      <Carousel
        v-model="currentIndex"
        @img-list-changed="updateImgList"
        @img-changed="handleImgChanged"
        @current-index-changed="updateCurrentIndex"
      />
    </div>

    <!-- 内容栏 -->
    <div v-for="(item, key) in receivedImg" :key="key" class="content_div">
      <p id="topic_p">
        {{ key }}
      </p>
      <p id="introduce_p">
        {{ item.introduce }}
      </p>

      <!-- 侧边切换栏 -->
      <!--      <div class="side_div">-->
      <!--        <div-->
      <!--          v-for="(carouselItem, carouselKey) in imgList"-->
      <!--          :key="carouselKey"-->
      <!--          class="each_side"-->
      <!--          :class="{ 'active-side': isActiveImg(carouselKey) }"-->
      <!--          @click="changeCarouselByKey(carouselKey)"-->
      <!--        >-->
      <!--          <a>{{ carouselKey }}</a>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Carousel from '@/components/Carousel.vue';

export default defineComponent({
    components: { Carousel },
    data() {
        return {
            receivedImg: {},
            imgList: {},
            currentIndex: 0,
        };
    },
    methods: {
        handleImgChanged(img) {
            this.receivedImg = img;
        },
        updateImgList(imgList) {
            this.imgList = imgList;
            this.receivedImg = imgList[Object.keys(imgList)[this.currentIndex]];
        },
        // isActiveImg(carouselKey) {
        //     return carouselKey === Object.keys(this.imgList)[this.currentIndex];
        // },
        // changeCarouselByKey(key) {
        //     const index = Object.keys(this.imgList).indexOf(key);
        //     if (index !== -1) {
        //         this.currentIndex = index;
        //     }
        // },
        updateCurrentIndex(index) {
            this.currentIndex = index;
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
        justify-content: right;

        top: 50%;
        right: 90px;
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

            cursor: pointer;
            transition: all .2s;

            a {
                width: 100%;
                height: 50px;
                margin-right: 10px;

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
                //box-shadow: 5px 0 5px rgba(0, 0, 0, 0.35);
                a {
                    color: $booth-red-color;
                }
            }
        }
    }
}

</style>