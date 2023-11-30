<template>
  <div>
    <el-carousel
      :interval="3000" arrow="always"
      style="border-radius: 20px 20px 0 0"
    >
      <el-carousel-item v-for="(item) in imgList" :key="item">
        <img :src="item.image" alt="carousel-image">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
    emits: ['imgListChanged'],
    data() {
        return {
            imgList: {
                Library: {
                    image: require('@/image/img_home/img_home_1.jpg'),
                    introduce: 'The ideas and essays of the past, using words and paintings as carriers, are now presented in pixels.',
                },
                Store: {
                    image: require('@/image/img_home/img_home_2.jpg'),
                    introduce: 'Nothing.',
                },
                Forum: {
                    image: require('@/image/img_home/img_home_3.jpg'),
                    introduce: 'I rarely reply to messages in real-time, but I treat messages with sincerity.',
                },
                Inspiration: {
                    image: require('@/image/img_home/img_home_4.jpg'),
                    introduce: 'Nothing.',
                },
            },
            currentIndex: 0,
        };
    },
    watch: {
        currentIndex() {
            this.emitImgList();
        },
    },
    methods: {
        // 传递 整个imgList 给 home.vue
        emitImgList() {
            this.$emit('imgListChanged', this.imgList);
        },
    },
};
</script>

<style lang="scss" scoped>
p {
    font-family: "Roboto-Regular", sans-serif;
}
// 图片、文本 通用长度
//$commonW: 540px;
$commonW: 30vw;
// 图片高度
//$imgDivH: 760px;
$imgDivH: 80vh;
$textDivH: 100px; // 文本栏高度

.el-carousel__item {
    width: $commonW;
    height: $imgDivH;

    img {
        width: 100%;
    }

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
</style>