<template>
  <div class="block text-center">
    <el-carousel :interval="4000" type="card" arrow="never" :height="bannerHeight + 'px'">
      <el-carousel-item v-for="item in imageList" :key="item">
        <img :src="item" alt="carousel-image">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
    data() {
        return {
            imageList: [
                require('@/image/reptile_image/6.png'),
                require('@/image/reptile_image/7.png'),
            ],
            bannerHeight : 100,
            screenWidth :0,
        };
    },
    mounted() {
        this.screenWidth = window.innerWidth;
        this.setSize();
        window.onresize = () => {
            this.screenWidth = window.innerWidth;
            this.setSize();
        };
    },
    methods: {
        setSize: function () {
            // 通过屏幕宽度(图片宽度)计算高度
            this.bannerHeight = 400 / 1920 * this.screenWidth;
        },
    }
};
</script>

<style scoped lang="scss">
.el-carousel {
    height: 800px;
    background-color: #2c9c92;

    .el-carousel__item {
        &:nth-child(2n) {
            background-color: #99a9bf;
        }
        &:nth-child(2n + 1) {
            background-color: #d3dce6;
        }
    }
}
</style>