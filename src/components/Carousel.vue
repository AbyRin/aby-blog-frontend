<template>
  <div>
    <el-carousel :interval="4000" arrow="always">
      <el-carousel-item v-for="item in imgList" :key="item">
        <img :src="item" alt="carousel-image">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
    data() {
        return {
            imgList:[
                require('@/image/reptile_image/6.png'),
                require('@/image/reptile_image/7.png'),
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.el-carousel__item {
    &:nth-child(2n) {
        background-color: #99a9bf;
    }
    &:nth-child(2n+1) {
        background-color: #d3dce6;
    }
}
::v-deep(.el-carousel__container) {
    width: 1000px;
    height: 400px;
}
</style>