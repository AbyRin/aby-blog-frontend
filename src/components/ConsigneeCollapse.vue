<template>
  <div class="aby-collapse-container">
    <!-- 大标题 -->
    <div class="aby-collapse-header">
      <img src="../image/icon/icons8-address-50.png" alt="">
      <p>地址管理</p>
    </div>
    <!-- 核心内容 -->
    <div class="aby-collapse-main">
      <!-- 折叠面板-单元 -->
      <div
        v-for="consignee in consigneeList"
        :key="consignee.consigneeId"
        class="aby-collapse"
        @click="handleCollapseClick($event, consignee.consigneeId)"
      >
        <!-- 单元-标题容 -->
        <div class="aby-collapse-title">
          <p>{{ addressNum[consigneeList.indexOf(consignee)] }}</p>
          <transition name="fade">
            <div v-if="collapseActive[consigneeList.indexOf(consignee)+1]" class="btn_div">
              <!-- 按钮：编辑 收件人 -->
              <button class="edit_btn" @click="editConsignee(consignee.consigneeId)">
                <img src="@/image/icon/icons8-edit-60.png" alt="">
              </button>
              <!-- 按钮：删除 收件人 -->
              <button class="edit_btn" @click="deleteConsignee(consignee.consigneeId)">
                <img src="@/image/icon/icons8-waste-50.png" alt="">
              </button>
            </div>
          </transition>
        </div>

        <!-- 单元-内容 -->
        <div class="aby-collapse-content">
          <div class="aby-collapse-item">
            <p>收件人</p>
            <p>{{ consignee.consigneeName }}</p>
          </div>

          <div class="aby-collapse-item">
            <p>联系方式</p>
            <p>{{ consignee.consigneeMobile }}</p>
          </div>

          <div class="aby-collapse-item">
            <div class="aby-collapse-item-2nd">
              <p>省</p>
              <p>{{ consignee.consigneeProvince }}</p>
            </div>
            <div class="aby-collapse-item-2nd">
              <p>市</p>
              <p>{{ consignee.consigneeCity }}</p>
            </div>
            <div class="aby-collapse-item-2nd">
              <p>区</p>
              <p>{{ consignee.consigneeArea }}</p>
            </div>
          </div>

          <div class="aby-collapse-item">
            <p>详细地址</p>
            <p>{{ consignee.consigneeAddress }}</p>
          </div>
        </div>
      </div>

      <!-- 补充空白的折叠面板标题，确保始终有3个 -->
      <div
        v-for="i in 3 - consigneeList.length"
        :key="i"
        class="aby-collapse"
      >
        <div class="aby-collapse-title">
          <p>{{ addressNum[i] }}</p>
          <!-- 无需渲染按钮，因为这是空白的折叠面板标题 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {ElNotification} from "element-plus";

// 固定地址编号
const addressNum = ["地址一", "地址二", "地址三"]
const userData = ref(JSON.parse(localStorage.getItem("user")) || {});

/* 收件人信息 */
const consigneeList = ref([
    {
        consigneeName: "代码内测试值-姓名",
        consigneeMobile: "代码内测试值-电话",
        consigneeProvince: "代码内测试值-省",
        consigneeCity: "代码内测试值-市",
        consigneeArea: "代码内测试值-区",
        consigneeAddress: "代码内测试值-详细地址",
        consigneeDefault: "1",
    }
]);

onMounted(() => {
    showConsigneeListByUserId();
});

// 折叠面板————————————
// 折叠功能
const collapseActive = ref(Array(consigneeList.value.length).fill(false));
const handleCollapseClick = (event, index) => {
    const target = event.target;
    const collapseTitle = target.closest('.aby-collapse-title');
    if (collapseTitle) {
        const collapse = target.closest('.aby-collapse');
        collapse.classList.toggle('show');
    }
    collapseActive.value[index] = !collapseActive.value[index];
};

// 收件人信息————————————
// 获取/刷新 收件人列表
const showConsigneeListByUserId = () => {
    axios
        .get("/consignee/showConsigneeListByUserId", {
            params: {
                userId: userData.value.userId,
            }
        })
        .then((response) => {
            console.log(response.data);  // 测试用
            consigneeList.value = response.data;
        })
        .catch((error) => {
            console.error(error);
        });
};

// 编辑收件人
const editConsignee = (consigneeId) => {
    console.log(consigneeId);
};

// 删除收件人
const deleteConsignee = (consigneeId) => {
    axios
        .delete("/consignee/deleteConsignee", {
            params: {
                consigneeId: consigneeId,
                userId: userData.value.userId,
            },
        })
        .then(response => {
            showConsigneeListByUserId();  // 刷新：收件人列表
            // console.log(response)  // 测试用
            if (response.data === 1001) {
                ElNotification({
                    title: 'Success',
                    message: '删除收件人成功',
                    type: 'success',
                    duration: 1500
                });
            } else {
                ElNotification({
                    title: 'Error',
                    message: '删除收件人失败',
                    type: 'error',
                    duration: 1500
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
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
