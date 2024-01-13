<template>
  <div class="aby-collapse-container">
    <!-- 大标题 -->
    <div class="aby-collapse-header">
      <img src="../image/icon/icons8-address-50.png" alt="">
      <p>地址管理</p>
    </div>
    <!-- 核心 -->
    <div class="aby-collapse-main">
      <AbyCollapse :title="title" :items="items" />
      <AbyCollapse :title="title" :items="items" />
      <AbyCollapse :title="title" :items="items" />
    </div>
  </div>
</template>

<script setup>
import AbyCollapse from "@/selfMadeComponents/AbyCollapse.vue";

const title = "测试用-地址";
const items = [
    { key: "收货人", value: "测试值-收货人" },
    { key: "电话号码", value: "测试值-电话号码" },
    { key: "省", value: "广东省" },
    { key: "市", value: "汕头市" },
    { key: "区", value: "金平区" },
    { key: "地址", value: "测试值-地址" },
];
</script>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
}
.aby-collapse-container {
    display: flex;
    flex-direction: row;

    position: fixed;
    width: auto;
    height: auto;

    right: 24rem;
    top: 20%;

    background-color: #ffffff;
    box-shadow: 0.5rem 0.5rem 0.5rem rgba(0,0,0,0.4);
    border-radius: 2rem 2rem 0 0;

    /* 大标题 */
    .aby-collapse-header {
        width: 12rem;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border: none;
        background-color: $blue-color;
        text-align: center;

        img {
            width: 4rem;
        }
        p {
            font: {
                size: 2rem;
                weight: bold;
            }
            color: white;

            margin-top: 1rem;
            text-align: center;

            /* 换行 */
            //width: 50%;
            //overflow-wrap: break-word;
        }
    }
    /* 核心 */
    .aby-collapse-main {
        display: flex;
        flex-direction: column;
    }
}
</style>
