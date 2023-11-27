<template xmlns:th="http://www.w3.org/1999/xhtml">
  <div>
    <header />
    <main>
      <div class="top_container">
        <div class="top_div">
          <!-- 图标 -->
          <div class="icon_div">
            <img src="@/image/img_bg/polaris_icon.jpg" alt="">
          </div>

          <!-- 欢迎语 -->
          <div class="welcome_div">
            <a th:if="${session.member}">
              <span th:text="'Welcome to Polaris!' + ${session.member.getEmail()}" />
            </a>
            <a th:unless="${session.member}">Welcome to Polaris!</a>
          </div>

          <!-- 登入登出 -->
          <!--            <div class="account_div">-->
          <!--              <div>-->
          <!--                <a th:if="${session.member}">-->
          <!--                  <router-link to="/index/toLogout">Sign Out</router-link>-->
          <!--                  &lt;!&ndash; <router-link to="/index/toRegister">Sign Up</router-link> &ndash;&gt;-->
          <!--                  <router-link to="/admin/toAdminLogin">Sign In as Admin</router-link>-->
          <!--                </a>-->
          <!--                <a th:unless="${session.member}">-->
          <!--                  <router-link to="/index/toLogin">Sign In</router-link>-->
          <!--                  &lt;!&ndash; <router-link to="/index/toRegister">Sign Up</router-link> &ndash;&gt;-->
          <!--                  <router-link to="/admin/toAdminLogin">Sign In as Admin</router-link>-->
          <!--                </a>-->
          <!--              </div>-->
          <!--            </div>-->

          <!-- 功能键 -->
          <div class="function_div">
            <div class="each_function">
              <img src="@/image/icon/icons8-account-30.png" alt="">
              <router-link to="/account" style="text-decoration:none;">
                Account
              </router-link>
            </div>
            <div class="each_function">
              <img src="@/image/icon/icons8-order-48.png" alt="">
              <router-link to="/order/showorder" style="text-decoration:none;">
                Order
              </router-link>
            </div>
            <div class="each_function">
              <img src="@/image/icon/icons8-cart-30.png" alt="">
              <router-link to="/cart/showcart" style="text-decoration:none;">
                Cart
              </router-link>
            </div>
            <div class="each_function">
              <img src="@/image/icon/icons8-star-30.png" alt="">
              <router-link to="/collect/showcollect" style="text-decoration:none;">
                Collection
              </router-link>
            </div>
          </div>

          <!-- 分页栏 -->
          <div class="page_div">
            <div class="each_page">
              <router-link to="/Home">
                Home
              </router-link>
            </div>
            <div class="each_page">
              <router-link to="/Library">
                Library
              </router-link>
            </div>
            <div class="each_page">
              <router-link to="/Store">
                Store
              </router-link>
            </div>
            <div class="each_page">
              <router-link to="/Forum">
                Forum
              </router-link>
            </div>
            <div class="each_page">
              <router-link to="/Inspiration">
                Inspiration
              </router-link>
            </div>
            <div class="each_page">
              <router-link to="/About">
                About
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
$blueColor: #31384f;  /* 藏蓝色 */
$yellowColor: #fec738;  /* 黄色 */
$boothRedColor: #f84f52;  /* Booth浅红 */
$boothGreenColor: #4e9da9;  /* Booth浅绿 */

$lightGrayColor: #b2b2b2;  /* 浅灰 */
$darkGrayColor: #706e6f;  /* 深灰 */
$furGrayColor: #e7e5e1;  /* 鹅毛灰色-背景板 */

$bgDarkGrayColor: #dddddd;  /* 背景-深灰 */
$bgLightGrayColor: #eeeeee;  /* 背景-浅灰 */

body {
    width: 100%;
    display: flex;

    align-items: center;
    justify-content: center;
}
p, a, span {
    font-family: frutiger, sans-serif;
}

.top_container {
    position: fixed;
    top: 0;
    left: 0;
    border: 0;

    width: 100%;
    height: auto;

    background-color: $blueColor;

    z-index: 101;

    .top_div {
        position: relative;
        margin: 0 auto;

        width: 1200px;
        height: 64px;

        background: $blueColor;

        /* 图标 */
        .icon_div {
            float: left;

            width:240px;
            height:64px;

            img{
                height: 64px;
            }
        }

        /* 欢迎语 */
        .welcome_div {
            float: left;

            width: 250px;
            height:60px;
            margin-left: 20px;

            a {
                text-align:left;
                line-height: 60px;

                font: {
                    size: 18px;
                    weight: bolder;
                }
                color: $boothRedColor;
                text-decoration: none;
            }
        }

        /* 功能键 */
        .function_div {
            display: flex;
            justify-content: flex-start;

            float: right;

            width:400px;
            height:64px;

            .each_function {
                display: flex;
                flex-flow: column;
                align-items: center;
                justify-content: center;

                float: right;

                width:100px;
                height:64px;

                text-align: center;

                border-left: 1px solid $darkGrayColor;

                cursor: pointer;
                transition: background-color 0.3s;

                &:hover {
                    background-color: $boothRedColor;
                }

                img{
                    height: 30px;
                }
                a {
                    margin-top: 2px;
                    font-size: 15px;
                    /* font-weight: bold; */
                    text-align:right;

                    text-decoration:none;
                    color: #ffffff;

                    &:link {
                        color: #ffffff;
                    }
                    /*
                    &:hover {
                        color: #f84f52;
                    }
                    &:visited {
                        color: #ffffff;
                    }
                    */
                }

            }
        }

        /* 分页栏 */
        .page_div {
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: center;

            float: left;

            background-color: #ffffff;

            width: 1200px;
            height: 36px;

            /* border-bottom:#31384f solid 2px; */
            border-radius: 36px;
            border: 2px solid #D4D4D4;

            .each_page {
                width: auto;
                height: 36px;

                margin: 0 20px;
                padding: 0 16px;

                line-height: 36px;
                text-align: center;

                cursor: pointer;
                transition: all 0.3s;

                border-radius: 36px;

                &:hover {
                    box-shadow:
                            inset -2px -2px 4px rgba(255, 255, 255, .9),
                            inset 2px 2px 4px rgba(0, 0, 0, .4);
                }

                a {
                    color: $blueColor;

                    font-size: 16px;
                    font-weight: bold;
                    text-decoration: none;

                    &:link {
                        color: $blueColor;
                    }
                    &:visited {
                        color: $blueColor;
                    }
                }
            }
        }
    }
}
</style>