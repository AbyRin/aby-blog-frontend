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
            <div
              v-for="(item, key) of pageData"
              :key="key"
              class="each_page"
              :class="{
                'active-page': isActiveRoute(item.link)
              }"
            >
              <router-link :to="item.link">
                {{ item.name }}
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
          <!-- 功能键-区 -->
          <div class="function_div">
            <div
              v-for="(item, key) of functionData"
              :key="key"
              class="each_function"
              :class="{
                'route_style': isActiveRoute(item.link) // 判断：给定路由 是否与 当前激活路由 相匹配
              }"
              @click="handleFunctionClick(item.link)"
            >
              <img :src="require(`@/image/icon/${item.icon}`)" alt="">
              <router-link :to="item.link">
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import {onMounted, ref, watchEffect} from 'vue';
import {useRouter } from 'vue-router';

export default {
    // setup(): vue3语法，在 beforeCreated 之前，不能访问 this
    setup() {
        // const activeComponent = ref('');  // 当前子路由对应的组件
        const router = useRouter();
        const activeRoute = ref(router.currentRoute.value);

        // console.log('router.currentRoute.value.fullPath',router.currentRoute.value.fullPath);
        // console.log('router.currentRoute',router.currentRoute);
        // console.log('route.fullPath', route.fullPath)

        onMounted(() => {
            activeRoute.value = router.currentRoute.value;
        });

        watchEffect(() => {
            activeRoute.value = router.currentRoute.value;
            // 赋值为 当前路由
            // console.log('Full path after:', activeRoute.value.fullPath);
        });

        const pageData = [
            {
                name: 'Home',
                link: '/',
            },
            {
                name: 'Library',
                link: '/library',
            },
            {
                name: 'Store',
                link: '/store',
            },
            {
                name: 'Forum',
                link: '/forum',
            },
            {
                name: 'Inspiration',
                link: '/inspiration',
            },
            {
                name: 'About',
                link: '/about',
            },
        ];

        const functionData = [
            {
                name: 'Account',
                icon: 'icons8-account-30.png',
                link: '/account',
            },
            {
                name: 'Collection',
                icon: 'icons8-star-30.png',
                link: '/collect/product-collection',
            },
            {
                name: 'Order',
                icon: 'icons8-order-48.png',
                link: '/order',
            },
            {
                name: 'Cart',
                icon: 'icons8-cart-30.png',
                link: '/cart',
            },
        ];

        const isActiveRoute = (path) => {
            // console.log("---------------------------------")
            // console.log(activeRoute.value.fullPath)
            // console.log(path)
            return activeRoute.value.fullPath === path;
            // path 为接收的 item.link（pageData 或 functionData）
            // 返回布尔值--判断：给定路由 是否与 当前激活路由 相匹配
        };
        const handleFunctionClick = (link) => {
            router.push(link);
        };

        return {
            functionData,
            pageData,
            isActiveRoute,
            activeRoute,
            handleFunctionClick
        };
    },
};
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

    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.35);

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
        position: fixed;
        display: flex;
        flex-flow: column;
        justify-content: right;
        align-items: center;

        width: 70px;
        height: auto;

        padding-top: 30px;

        .each_function {
            display: flex;
            flex-flow: column;
            justify-content: right;
            align-items: center;

            width: 70px;
            height: auto;

            padding: 12px 0;

            text-align: center;

            cursor: pointer;

            $transition-set: width 0.3s ease;
            transition: $transition-set;

            img {
                width: 44px;
            }

            a {
                display: none;
                margin-top: 4px;
                text-decoration: none;
                color: #ffffff;
                transition: $transition-set;

                font: {
                    size: 18px;
                }
            }

            &:hover, &.route_style {
                background-color: $booth-red-color;
                width: 210px;
                padding: 8px 0;
                //margin-right: 70px;

                img {
                    width: 40px;
                    translate: -35px;
                }
                a {
                    display: block;
                    translate: -35px;
                }
            }
        }

    }
}
</style>