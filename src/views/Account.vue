<template>
  <div>
    <!-- 账户信息 -->
    <div class="account_div">
      <div>
        <img :src="userData.avatar" alt="">
        <!-- 注：user表未设置头像字段 -->
      </div>
      <div>
        <p>{{ userData.nickName }}</p>
        <p>{{ userData.email }}</p>

      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // 本地存储的用户信息（检查是否为空，不为空则解析为 JSON 对象）
            userData: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        };
    },
}
</script>

<style lang="scss" scoped>
* {
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
    font-family: frutiger sans-serif;
}
body{
    width: 100%;
    min-width: 1200px;
}
$account_div_width: 800px;  // 账户信息-总宽度
/* 账户信息 */
.account_div {
    position: fixed;
    width: $account_div_width;
    height: 800px;

    left: 60px;
    bottom: 0;

    background-color: #ffffff;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.4);
    border-radius: 20px 20px 0 0;
    text-align: center;
}
</style>