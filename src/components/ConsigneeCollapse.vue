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
        v-for="(consignee, index) in consigneeList"
        :key="index"
        class="aby-collapse"
        @click="handleCollapseClick($event, index)"
      >
        <!-- 单元-标题 -->
        <div class="aby-collapse-title">
          <p>{{ addressNum[index] }}</p>
          <!-- 按钮 淡入淡出效果 -->
          <transition v-if="consignee.consigneeName" name="fade">
            <div v-if="collapseActive[index]" class="btn_div">
              <!-- 按钮：编辑 收件人 -->
              <button class="edit_btn" @click.stop="editConsignee(consignee.consigneeId)">
                <img src="@/image/icon/icons8-edit-60.png" alt="">
              </button>

              <!-- 按钮：删除 收件人 -->
              <el-popconfirm
                width="220"
                confirm-button-text="是"
                cancel-button-text="否"
                icon-color="#f84f52"
                title="确定删除该收件人吗?"
                @confirm="deleteConsignee(consignee.consigneeId)"
              >
                <template #reference>
                  <button class="edit_btn" @click.stop>
                    <img src="@/image/icon/icons8-waste-50.png" alt="">
                  </button>
                </template>
              </el-popconfirm>
            </div>
          </transition>
        </div>

        <!-- 单元-内容 -->
        <div class="aby-collapse-content">
          <template v-if="consignee.consigneeName">
            <!-- 当有收件人信息时 -->
            <div class="aby-collapse-item">
              <p>收件人</p>
              <p>{{ consignee.consigneeName || '暂无收件人信息' }}</p>
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
          </template>
          <template v-else>
            <!-- 当没有收件人信息时 -->
            <div id="aby-collapse-null" class="aby-collapse-item">
              <p>点击 <span @click="createConsignee">此处</span> 创建收件人</p>
            </div>
          </template>
        </div>
      </div>

      <!-- 补充空白的折叠面板标题，确保始终有3个 -->
      <div v-for="i in 3 - consigneeList.length" :key="i" class="aby-collapse">
        <div class="aby-collapse-title">
          <p>{{ addressNum[consigneeList.length + i] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElNotification, ElPopconfirm } from 'element-plus';

// 固定地址编号
const addressNum = ["地址一", "地址二", "地址三"];

// 本地缓存 用户信息
const userData = ref(JSON.parse(localStorage.getItem("user")) || {});

// 收件人信息
const consigneeList = ref([]);

onMounted(() => {
    showConsigneeListByUserId();
});

// 折叠面板————————————
// 折叠功能
// 将collapseActive初始化为每个consignee的布尔值数组
const collapseActive = ref([]);

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
            // 使用虚拟的 consigneeList，确保 consigneeList 的长度为 3
            consigneeList.value = response.data.concat(Array(3 - response.data.length).fill({}));
            // 初始化 collapseActive
            collapseActive.value = Array(consigneeList.value.length).fill(false);
        })
        .catch((error) => {
            console.error(error);
        });
};

// 编辑收件人
const editConsignee = (consigneeId) => {
    // console.log("触发编辑收件人事件");  //测试用
    axios
        .delete("/consignee/updateConsignee", {
            params: {
                consigneeId: consigneeId,
                userId: userData.value.userId,
                consigneeName: consigneeName,
            },
        })
        .then(response => {
            // 刷新：收件人列表
            showConsigneeListByUserId();

            // 通过创建新的 ref 对象来强制更新 collapseActive
            collapseActive.value = Array(consigneeList.value.length).fill(false);

            if (response.data === 1001) {
                ElNotification({
                    title: 'Success',
                    message: '编辑收件人成功',
                    type: 'success',
                    duration: 1500
                });
            } else {
                ElNotification({
                    title: 'Error',
                    message: '编辑收件人失败',
                    type: 'error',
                    duration: 1500
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// 删除收件人
const deleteConsignee = (consigneeId) => {
    // console.log("触发删除收件人事件");  //测试用
    axios
        .delete("/consignee/deleteConsignee", {
            params: {
                consigneeId: consigneeId,
                userId: userData.value.userId,
            },
        })
        .then(response => {
            // 刷新：收件人列表
            showConsigneeListByUserId();

            // 通过创建新的 ref 对象来强制更新 collapseActive
            collapseActive.value = Array(consigneeList.value.length).fill(false);

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
// 测试用：检查编辑、删除收件人按钮
// const handleConfirmDelete = (consigneeId) => {
//     console.log("确认删除，consigneeId:", consigneeId);
//     deleteConsignee(consigneeId);
// };
</script>


<style scoped lang="scss">
// 折叠面板-单元-标题-按钮 淡入淡出
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

                    &[id="aby-collapse-null"] {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        p {
                            span {
                                color: $booth-red-color;
                                cursor: pointer;
                                text-decoration: underline
                            }
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
