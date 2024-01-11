<template>
  <div>
    <!-- 账户信息 -->
    <div class="account_div">
      <div class="avatar_div">
        <img :src="userData.avatar" alt="">
      </div>

      <div class="account_info_div">
        <p id="nickname_p">
          {{ userData.nickName }}
        </p>
        <p id="email_p">
          {{ userData.email }}
        </p>
      </div>
    </div>

    <!-- 折叠面板-地址管理  -->
    <div class="address_collapse">
      <div class="collapse_title">我的地址</div>
      <el-collapse v-model="activeNames" class="collapse_block" @change="handleChange">
        <el-collapse-item title="地址1" name="1">
          <p>测试-收货人姓名</p>
          <p>测试-收货人电话</p>
          <p>测试-收货人地址</p>
        </el-collapse-item>
        <el-collapse-item title="地址2" name="2">
          <p>测试-收货人姓名</p>
          <p>测试-收货人电话</p>
          <p>测试-收货人地址</p>
        </el-collapse-item>
        <el-collapse-item title="地址3" name="3">
          <p>测试-收货人姓名</p>
          <p>测试-收货人电话</p>
          <p>测试-收货人地址</p>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // 本地存储的用户信息（检查是否为空，不为空则解析为 JSON 对象）
            userData: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
            // 折叠面板
            activeNames: ['1'],
        };
    },
    methods: {
        handleChange(val) {
            console.log(val);
        }
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
$account_div_width: 640px;  // 账户信息-总宽度
/* 账户信息 */
.account_div {
    position: fixed;
    width: $account_div_width;
    height: 760px;

    left: 60px;
    bottom: 0;

    background-color: #ffffff;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.4);
    border-radius: 20px 20px 0 0;
    text-align: center;

    .avatar_div {
        margin-top: 40px;
        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
        }
    }

    .account_info_div {
        p {
            &[id="nickname_p"] {
                margin-top: 20px;
                color: $blue_color;
                font: {
                    size: 24px;
                    weight: bold;
                }
            }
            &[id="email_p"] {
                margin-top: 20px;
                color: #888888;
            }

        }
    }
}


// 折叠面板-地址管理
.address_collapse {
    position: fixed;
    width: 600px;
    height: auto;

    right: 240px;
    top: 500px;

    background-color: #ffffff;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.4);
    border-radius: 20px 20px 0 0;

    .collapse_title {
        text-align: center;
        font: {
            size: 24px;
            weight: bold;
        };
        color: $blue_color;
    }

    .collapse_block {
        border-radius: 20px 20px 0 0;
        background-color: red;
    }
}
</style>