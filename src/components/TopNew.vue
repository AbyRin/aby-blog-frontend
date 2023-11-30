<template>
  <div>
    <header />

    <main>
      <div class="top_container">
        <!-- 上方栏 -->
        <div class="top_left_div">
          <!-- 图标 -->
          <div class="icon_div">
            <img src="@/image/img_bg/Polaris_icon.png" alt="">
          </div>

          <!-- 分页 -->
          <div class="page_div">
            <div v-for="route in routes" :key="route.path" class="each_page" :class="{ 'active-page': isActiveRoute(route.path) }">
              <router-link :to="route.path">
                {{ route.name }}
              </router-link>
            </div>
          </div>

          <!-- 四色图标 -->
          <div class="ColorS_div">
            <img src="@/image/img_bg/ColorS.png" alt="">
          </div>
        </div>

        <!-- 下方栏 -->
        <div class="sidebar">
          <!-- 功能键 -->
          <div class="function_div">
            <!-- Account -->
            <div class="each_function">
              <img src="@/image/icon/icons8-account-30.png" alt="">
              <a href="/account">
                Account
              </a>
            </div>

            <!-- Collection -->
            <div class="each_function">
              <img src="@/image/icon/icons8-star-30.png" alt="">
              <a href="/collect/showCollect">
                Collection
              </a>
            </div>

            <!-- Order -->
            <div class="each_function">
              <img src="@/image/icon/icons8-order-48.png" alt="">
              <a href="/order/showOrder">
                Order
              </a>
            </div>
            
            <!-- Cart -->
            <div class="each_function">
              <img src="@/image/icon/icons8-cart-30.png" alt="">
              <a href="/cart/showCart">
                Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import {onMounted, ref, watchEffect} from 'vue'
import {useRoute} from 'vue-router'
import Library from "@/views/Library.vue";
import Store from "@/views/Store.vue";
import Forum from "@/views/Forum.vue";
import Inspiration from "@/views/Inspiration.vue";
import About from "@/views/About.vue";

const routes = [
    { path: '/', name: 'Home' },
    { path: '/library', name: 'Library' },
    { path: '/store', name: 'Store' },
    { path: '/forum', name: 'Forum' },
    { path: '/inspiration', name: 'Inspiration' },
    { path: '/about', name: 'About' },
];

const activeRoute = ref('');

onMounted(() => {
    const route = useRoute();

    watchEffect(() => {
        // 获取并更新 当前路由的路径
        activeRoute.value = route.path;
    });
});

function isActiveRoute(path) {
    return activeRoute.value === path;
}
</script>

<style lang="scss" scoped>
body {
    width: 100%;
    
    display: flex;
    align-items: center;
    justify-content: center;
}
p, a, span {
    font-family: Roboto-Regular, sans-serif;
}

.top_container {
    position: fixed;
    top: 0;
    left: 0;
    border: 0;

    width: 100%;
    height: 60px;

    background-color: $blue-color;

    z-index: 101;

    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.35);

    .top_left_div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 100%;
        height: 60px;

        background-color: $blue-color;

        /* 图标 */
        .icon_div {
            flex: 3;
            display: flex;
            justify-content: center;
            align-items: center;

            height: 60px;

            img{
                height: 60px;
            }
        }

        /* 分页栏 */
        .page_div {
            flex: 7;
            display: flex;
            justify-content: space-around;
            align-items: center;

            float: left;

            background-color: #ffffff;

            height: 60px;

            .each_page {
                width: auto;
                height: 50px;

                padding: 0 24px;

                line-height: 50px;
                text-align: center;

                cursor: pointer;
                transition: all 0.3s;

                border-radius: 36px;

                a {
                    color: $blue-color;
                    text-decoration: none;

                    transition: all 0.3s;

                    font: {
                        size: 20px;
                        family: Roboto-Italic, sans-serif;

                    }
                }

                &:not(.active-page):hover {
                    box-shadow: inset -2px -2px 4px rgba(255, 255, 255, .9),
                    inset 2px 2px 4px rgba(0, 0, 0, .4);

                    a {
                        font: {
                            size: 22px;
                            weight: bold;
                        }
                    }
                }

                /* 路由对应分页 激活样式 */
                &.active-page {
                    box-shadow: inset -2px -2px 4px rgba(255, 255, 255, .9),
                    inset 2px 2px 4px rgba(0, 0, 0, .4);

                    a {
                        //color: $booth-green-color;
                        color: $blue-color;
                        font: {
                            size: 24px;
                            weight: bold;
                        }
                    }
                }
            }
        }
    }

    /* ColorS */
    .ColorS_div {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;

        float: left;

        width: 70px;
        height: 60px;

        background-color: #ffffff;

        img {
            width: 44px;
            &:hover {
                animation: rotate 0.5s ease-in-out;
            }
        }
    }
}

@keyframes rotate{
    0%{
        transform: rotateZ(0deg);
    }
    100%{
        transform: rotateZ(360deg);
    }
}

/* 侧边栏 */
.sidebar {
    position: fixed;

    top: 60px;
    right: 0;

    width: 70px;
    height: 100%;

    text-align: center;

    transition: all 0.3s ease;
    z-index: 100;

    box-shadow: 2px 2px 2px #bdbdbd;

    background-color: $blue-color;

    /* 功能键 */
    .function_div {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;

        width: 70px;
        height: auto;

        padding-top: 30px;

        .each_function {
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;

            width: 70px;
            height: auto;

            padding: 12px 0;

            text-align: center;

            cursor: pointer;
            transition: width 0.3s ease;

            img {
                width: 44px;
                transition: transform 0.3s ease;
            }

            a {
                display: none;
                margin-top: 4px;
                text-align: right;
                text-decoration: none;
                color: #ffffff;
                transition: transform 0.3s ease;

                font: {
                    size: 18px;
                }
            }

            &:hover {
                background-color: $booth-red-color;
                width: 160px;
                padding: 8px 0;
            }
            &:hover img {
                transform: translateX(-20px);
                width: 40px;
            }
            &:hover a {
                transform: translateX(-20px);
                display: block;
            }
        }

    }
}
</style>