<template>
  <div class="aby-collapse-container">
    <!-- 大标题 -->
    <div class="aby-collapse-header">
      <img src="../image/icon/icons8-address-50.png" alt="">
      <p>地址管理</p>
    </div>
    <!-- 核心 -->
    <div class="aby-collapse-main">
      <!-- 折叠面板-单元 -->
      <div
        v-for="(item, index) in customerData"
        :key="index"
        class="aby-collapse"
        @click="handleCollapseClick($event, index)"
      >
        <div class="aby-collapse-title">
          <p>{{ title[index] }}</p>
          <transition name="fade">
            <div v-if="collapseActive[index]" class="btn_div">
              <button class="edit_btn" @click="editCustomer(item.customerId)">
                <img src="@/image/icon/icons8-edit-60.png" alt="">
              </button>
              <button class="edit_btn">
                <img src="@/image/icon/icons8-waste-50.png" alt="">
              </button>
            </div>
          </transition>
        </div>

        <div class="aby-collapse-content">
          <div class="aby-collapse-item">
            <p>收件人</p>
            <p>{{ item.customerName }}</p>
          </div>

          <div class="aby-collapse-item">
            <p>联系方式</p>
            <p>{{ item.customerMobile }}</p>
          </div>

          <div class="aby-collapse-item">
            <div class="aby-collapse-item-2nd">
              <p>省</p>
              <p>{{ item.customerProvince }}</p>
            </div>
            <div class="aby-collapse-item-2nd">
              <p>市</p>
              <p>{{ item.customerCity }}</p>
            </div>
            <div class="aby-collapse-item-2nd">
              <p>区</p>
              <p>{{ item.customerArea }}</p>
            </div>
          </div>

          <div class="aby-collapse-item">
            <p>详细地址</p>
            <p>{{ item.customerAddress }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

/* 地址顺序 */
const title = ["地址一", "地址二", "地址三"];

/* 收件人信息 */
const customerData = [
    {
        customerName: "测试值-收件人-姓名1",
        customerMobile: "测试值-收件人-号码1",
        customerProvince: "广东省",
        customerCity: "汕头市",
        customerArea: "金平区",
        customerAddress: "测试值-详细地址",
        customerDefault: "1",
    },
    {
        customerName: "测试值-收件人-姓名2",
        customerMobile: "测试值-收件人-号码2",
        customerProvince: "广东省",
        customerCity: "汕头市",
        customerArea: "金平区",
        customerAddress: "测试值-详细地址",
        customerDefault: "0",
    },
    {
        customerName: "测试值-收件人-姓名3",
        customerMobile: "测试值-收件人-号码3",
        customerProvince: "广东省",
        customerCity: "汕头市",
        customerArea: "金平区",
        customerAddress: "测试值-详细地址",
        customerDefault: "0",
    },
];

/* 折叠功能 */
const collapseActive = ref(Array(customerData.length).fill(false));
const handleCollapseClick = (event, index) => {
    const target = event.target;
    const collapseTitle = target.closest('.aby-collapse-title');
    if (collapseTitle) {
        const collapse = target.closest('.aby-collapse');
        collapse.classList.toggle('show');
    }
    collapseActive.value[index] = !collapseActive.value[index];
};

const editCustomer = (customerId) => {
    console.log(customerId);
};
</script>

<style scoped lang="scss">
/* 淡入淡出 */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

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

        .aby-collapse {
            width: 70rem;
            height: auto;
            background-color: white;

            /* 小标题 */
            .aby-collapse-title {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;

                width: 100%;
                height: 4rem;
                background-color: white;

                font: {
                    size: 2rem;
                    weight: bold;
                }
                color: $blue-color;
                text-indent: 2rem;
                line-height: 4rem;

                border-bottom: #cccccc solid 1px;
                cursor: pointer;

                transition: all 0.2s ease-in-out;

                p {

                }

                .btn_div {
                    margin-left: 65%;
                    .edit_btn {
                        width: 6rem;
                        height: 3rem;

                        border: none;
                        border-radius: 2rem;

                        background-color: $blue-color;
                        transition: all 0.2s ease-in-out;
                        cursor: pointer;

                        //background-color: $blue-color;

                        img {
                            width: 2rem;
                        }

                        &:hover {
                            background-color: $booth-red-color;
                        }
                    }
                }
            }

            .aby-collapse-content {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 0;
                overflow: hidden;

                transition: all 0.3s ease-in-out;

                /* 一级条目 */
                .aby-collapse-item {
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    margin-top: 1rem;

                    p {
                        margin-left: 2rem;
                        &:nth-child(1) {
                            font: {
                                size: 1.6rem;
                                weight: bold;
                            }
                            color: black;
                        }
                        &:nth-child(2) {
                            font: {
                                size: 1.6rem;
                            }
                            color: $text-gray-color;
                        }
                    }

                    /* 二级条目 */
                    & .aby-collapse-item-2nd {
                        margin-right: 2rem;

                        p {
                            display: inline;
                        }
                    }
                }
            }

            /* 折叠面板展开-样式变化 */
            &.show .aby-collapse-title {
                background-color: #31384F;
                color: white;
            }
            &.show .aby-collapse-content {
                height: 15rem;
            }
        }
    }
}
</style>
