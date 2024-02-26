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
        <p id="info_topic_p">
          {{ userData.nickName }}
        </p>
        <div>
          <p id="info_item">
            积分
          </p>
          <p id="info_content">
            {{ userData.point }}
          </p>
        </div>
      </div>

      <!-- 隐私信息 -->
      <div class="account_private_div">
        <p id="private_topic_p">
          账号与安全
        </p>
        <div>
          <p id="private_item">
            邮箱
          </p>
          <p id="private_content">
            {{ userData.email }}
          </p>
        </div>
        <div>
          <p id="private_item">
            手机
          </p>
          <p id="private_content">
            {{ userData.mobile }}
          </p>
        </div>
        <div>
          <p id="private_item">
            地址
          </p>
          <p id="private_content">
            {{ userData.address }}
          </p>
        </div>
      </div>

      <!-- 按钮：登出 -->
      <div class="logout_div" @click="logout">
        登出
      </div>
    </div>

    <ConsigneeCollapse class="collapse" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ConsigneeCollapse from "@/components/ConsigneeCollapse.vue";
import {ElNotification} from "element-plus";
import { useRouter } from 'vue-router';

export default {
    components: {
        ConsigneeCollapse
    },
    setup() {
        const router = useRouter();
        const userData = ref(JSON.parse(localStorage.getItem("user")) || {});
        const activeNames = ref(['1']);

        const logout = function() {
            // 清空本地存储的用户信息
            localStorage.removeItem("user");
            // 跳转到首页
            router.push("/user/login");
            ElNotification({
                title: "提示",
                message: "登出成功",
                type: "success",
                duration: 1000,
            });
        };

        onMounted(() => {
            // Perform any additional setup on component mount
        });

        return {
            userData,
            activeNames,
            logout,
        };
    },
};
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
    height: 82%;

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
        display: flex;
        flex-direction: column;
        align-items: center;

        p[id="info_topic_p"] {
            margin-top: 2rem;
            color: $blue_color;
            font: {
                size: 2.4rem;
                weight: bold;
            }
        }
        div {
            display: flex;
            flex-direction: row;
            p {
                &[id="info_item"] {
                    margin-top: 1rem;

                    color: $blue-color;
                    font: {
                        size: 1.6rem;
                        weight: bold;
                    }
                }
                &[id="info_content"] {
                    margin-top: 1rem;
                    margin-left: 2rem;

                    color: $text-gray-color;
                    font: {
                        size: 1.6rem;
                    }
                }
            }
        }
    }

    .account_private_div {
        display: flex;
        flex-direction: column;

        margin-top: 10rem;

        p[id="private_topic_p"] {
            margin-top: 2rem;
            color: $blue_color;
            font: {
                size: 2.4rem;
                weight: bold;
            }
        }
        div {
            display: flex;
            flex-direction: row;

            p {
                &[id="private_item"] {
                    margin-top: 1rem;

                    color: $blue-color;
                    font: {
                        size: 1.6rem;
                        weight: bold;
                    }
                }
                &[id="private_content"] {
                    margin-top: 1rem;
                    margin-left: 2rem;

                    color: $text-gray-color;
                    font: {
                        size: 1.6rem;
                    }
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