<template>
  <div>
    <!-- 账户信息 -->
    <div class="account_div">
      <!-- 头像 -->
      <div class="avatar_div">
        <img :src="userData.avatar" alt="">
      </div>

      <!-- 用户信息 -->
      <div class="account_info_div">
        <p id="nickname_p">
          {{ userData.nickName }}
        </p>
        <p id="email_p">
          {{ userData.email }}
        </p>
      </div>

      <!-- 按钮：登出 -->
      <div class="logout_div" @click="logout">
        登出
      </div>
    </div>

    <Collapse class="collapse" />
  </div>
</template>

<script>
import Collapse from "@/components/Collapse.vue";
export default {
    components: {Collapse},
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
        },
        logout() {
            // 清空本地存储的用户信息
            localStorage.removeItem("user");
            // 跳转到首页
            this.$router.push("/user/login");
            this.$notify({
                title: "提示",
                message: "登出成功",
                type: "success",
                duration: 1000,
            });
        },
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
html {
    font-size: 1.6rem;
}

/* 账户信息 */
.account_div {
    position: fixed;
    width: 26%;
    height: 70%;

    display: flex;
    flex-direction: column;
    align-items: center;

    left: 4%;
    bottom: 0;

    background-color: #ffffff;
    box-shadow: 0.5rem 0.5rem 1rem rgba(0,0,0,0.4);
    border-radius: 2rem 2rem 0 0;
    text-align: center;

    .avatar_div {
        margin-top: 4rem;
        img {
            width: 10rem;
            height: 10rem;
            border-radius: 50%;
        }
    }

    .account_info_div {
        p {
            &[id="nickname_p"] {
                margin-top: 2rem;
                color: $blue_color;
                font: {
                    size: 2.4rem;
                    weight: bold;
                }
            }
            &[id="email_p"] {
                margin-top: 1rem;
                color: $text-gray-color;
                font: {
                    size: 1.6rem;
                }
            }

        }
    }

    .logout_div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        width: 60%;
        height: 4rem;
        margin-top: 2rem;

        border: $text-gray-color solid 1px;
        border-radius: 2rem;

        background-color: white;

        font: {
            size: 2rem;
        }
        color: $text-gray-color;

        transition: all 0.3s ease-in-out;

        &:hover {
            cursor: pointer;
            background-color: $booth-red-color;
            border: none;

            font: {
                weight: bold;
            }
            color: white;
        }
    }
}

/* 折叠面板 */
.collapse {
    position: fixed;
    top: 20%;
    right: 15%;
}
</style>