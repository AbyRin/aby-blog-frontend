<template>
  <div>
    <el-carousel :interval="3000" arrow="always" style="border-radius: 20px 20px 0 0" @change="handleCarouselChange">
      <el-carousel-item v-for="(item) in imgList" :key="item">
        <img :src="item.image" alt="carousel-image">
      </el-carousel-item>
    </el-carousel>
    <div class="text_div">
      <div class="block">
        <p>{{ currentText.topic }}</p>
      </div>
      <div class="block">
        <p>{{ currentText.introduce }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            imgList: [
                { image: require('@/image/img_home/home_1.jpg'), key: 'libraryText' },
                { image: require('@/image/img_home/home_2.jpg'), key: 'storeText' },
                { image: require('@/image/img_home/home_3.jpg'), key: 'forumText' },
                { image: require('@/image/img_home/home_4.jpg'), key: 'inspirationText' },
            ],
            textObj: {
                libraryText: {
                    topic: 'Library',
                    introduce: 'The ideas and essays of the past, using words and paintings as carriers, are now presented in pixels.',
                },
                storeText: {
                    topic: 'Store',
                    introduce: 'I rarely reply to messages in real time, but I treat messages with sincerity.',
                },
                forumText: {
                    topic: 'Forum',
                    introduce: 'The ideas and essays of the past, using words and paintings as carriers, are now presented in pixels.',
                },
                inspirationText: {
                    topic: 'Inspiration',
                    introduce: 'nonono.',
                },
            },
            currentIndex: 0,
        };
    },
    computed: {
        currentText() {
            const currentKey = this.imgList[this.currentIndex].key;
            return this.textObj[currentKey];
        },
    },
    methods: {
        handleCarouselChange(index) {
            this.currentIndex = index;
        },
    },
};
</script>

<style lang="scss" scoped>
$commonW: 1000px; // 图片、文本 通用长度
$imgDivH: 500px; // 图片高度
$textDivH: 150px; // 文本栏高度

.el-carousel__item {
    width: $commonW;
    height: $imgDivH;
    &:nth-child(2n) {
        background-color: #99a9bf;
    }
    &:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .text_div {
        width: 100%;
    }
}
::v-deep(.el-carousel__container) {
    width: $commonW;
    height: $imgDivH;
}
.text_div {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    width: $commonW;
    height: $textDivH;
    background-color: #ffffff;

    border-radius: 0 0 30px 30px;
    .block {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;

        padding: 0 40px;

        height: $textDivH - 60px;
        &:first-child {
            width: $commonW*0.3;
            border-right: rgba(0,0,0,0.2) 1px solid;
            p {
                font: {
                    size: 30px;
                    weight: bold;
                }
            }
        }
        &:last-child {
            width: $commonW*0.7;
            p {
                font: {
                    size: 16px;
                }
            }
        }

    }
}
</style>