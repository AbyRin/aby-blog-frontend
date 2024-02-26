<template>
  <div>
    <!-- 商品搜索条部分 -->
    <div class="search_div">
      <!-- 按商品名搜索 -->
      <div id="search_each">
        Name
        <input v-model="productName" type="text">
      </div>

      <!-- 按商品类别搜索 -->
      <div id="search_each">
        Class
        <select v-model="productClass" class="product_class">
          <option value="All" selected>
            All
          </option>>
          <option
            v-for="key of productClassList"
            :key="key"
            :value="key"
          >
            {{ key }}
          </option>>
        </select>
      </div>

      <!-- 按价格区间搜索 -->
      <div id="search_each">
        Price Range
        <input v-model="minPrice" type="text"> ~ <input v-model="maxPrice" type="text">
      </div>

      <!-- 按钮 -->
      <input type="submit" value="Search" @click="searchProduct">
    </div>

    <img id="smileJPG" src="@/image/img_bg/smile.png" alt="">


    <!-- 购物车 -->
    <div class="product_container">
      <el-backtop
        id="el_back_top"
        target=".product_container"
        style="left: 60rem; bottom: 2rem; box-shadow: 0.5rem 0.5rem 1rem rgba(0,0,0,0.4);"
      >
        <div class="el_style">
          ▲
        </div>
      </el-backtop>

      <!-- 购物车-单品 -->
      <div v-for="(item, key) of filteredCartData" :key="key" class="product_div">
        <img :src="require(`@/image/img_product/${item.productPicture}`)" alt="">

        <!-- 单品-信息栏 -->
        <div class="info_div">
          <div id="product_class_div">
            <b>{{ item.productClass }}</b>
          </div>
          <div id="product_name_div">
            <b>{{ item.productName }}</b>
          </div>
          <div id="product_price_div">
            <b>￥{{ item.productPrice }}</b>
          </div>
        </div>

        <!-- 单品-功能键 -->
        <div class="btn_div">
          <div id="product_quantity_div">
            <div @click="minusCart(item.productId)">
              -
            </div>
            <div>{{ item.productQuantity }}</div>
            <div @click="plusCart(item.productId)">
              +
            </div>
          </div>

          <div id="btns">
            <!-- 喜欢 -->
            <button class="functionBtn" @click="addProductToCollect()">
              <img src="@/image/icon/icons8-heart-50-gray.png" alt="">
            </button>
            <!-- 收藏 -->
            <button class="functionBtn" @click="addProductToCollect()">
              <img id="collect_icon" src="@/image/icon/icons8-bookmark-60-gray.png" alt="">
            </button>
            <!-- 从购物车删除-->
            <button id="btn_deleteCart" class="functionBtn" @click="deleteFromCart(item.productId)">
              <img src="@/image/icon/icons8-waste-50.png" alt="">
            </button>
          </div>
        </div>
      </div>
    </div>


    <!-- 订单 -->
    <div class="order_div">
      <!-- 订单-用户信息 -->
      <div class="order_info_div">
        <table id="order_info">
          <tr id="cart_topic">
            <td colspan="3">
              Order
            </td>
          </tr>

          <!-- 不可变动信息：当前账户-邮箱、使用地址 -->
          <tr id="trade_item" style="height: 5rem; border-bottom: #cccccc solid 0.1rem">
            <td>下单账户 / Account<span>{{ userData.email }}</span></td>
            <td>使用地址 / Address<span>{{ userData.address }}</span></td>
          </tr>

          <!-- 可变动信息：收件人-姓名、手机、地址，备注 -->
          <!-- 可变动信息：收件人-姓名 -->
          <tr id="trade_item">
            <td>
              收件人 / Consignee
              <span>{{ consigneeList.consigneeName }}</span>
            </td>
            <td
              style="
              display: flex;
              flex-direction: row-reverse;
              align-items: center"
            >
              <button id="edit_consignee_btn" @click="editConsignee(item.consigneeId)">
                <img src="@/image/icon/icons8-edit-60.png" alt="">
              </button>
            </td>
          </tr>
          <!-- 可变动信息：收件人-手机 -->
          <tr id="trade_item">
            <td colspan="2">
              手机 / Mobile
              <span>{{ consigneeList.consigneeMobile }}</span>
            </td>
          </tr>
          <!-- 可变动信息：收件人-地址 -->
          <tr id="trade_item">
            <td colspan="2">
              地址 / Address
              <span>{{ consigneeList.consigneeProvince }}</span> 省
              <span>{{ consigneeList.consigneeCity }}</span> 市
              <span>{{ consigneeList.consigneeArea }}</span> 区
              <span>{{ consigneeList.consigneeAddress }}</span>
            </td>
          </tr>
          <!-- 可变动信息：备注 -->
          <tr id="trade_item">
            <td colspan="2" style="height: 9rem">
              备注 / Remark
              <el-input
                v-model="remark"
                maxlength="60"
                placeholder="Please input"
                show-word-limit
                type="text"
                autosize
                clearable
                style="margin-top: 2rem;"
              />
            </td>
          </tr>

          <tr style="height: 1rem" />
        </table>
      </div>

      <!-- 订单-商品信息 -->
      <div id="cart_topic">
        Cart
      </div>
      <div class="cart_div">
        <table id="cart_content">
          <tr id="cart_item">
            <td>Product</td>
            <td>Price</td>
            <td>Num</td>
          </tr>

          <tr
            v-for="(item, key) of filteredCartData"
            id="cart_show"
            :key="key"
          >
            <td>{{ item.productName }}</td>
            <td>￥{{ item.productPrice }}</td>
            <td id="cart_manage_td">
              {{ item.productQuantity }}
            </td>
          </tr>
        </table>
      </div>

      <div id="check_div">
        <div id="count_item">
          <span>Total price</span>
          <span>￥{{ totalCartPrice }}</span>
        </div>
        <div id="check_item">
          <button id="btn_check" @click="check">
            <img src="@/image/icon/icons8-cart-30.png" alt="">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed, watch, onMounted } from 'vue';
import { ElNotification } from 'element-plus'

const text = ref('');

// 本地存储的用户信息（检查是否为空，不为空则解析为 JSON 对象）
const userData = ref(JSON.parse(localStorage.getItem("user")) || {});

// 搜索条-条件
const productClassList = ref([]); // 商品种类选择器列表
const productName = ref('');
const productClass = ref('All'); // 默认值为 'All'
const minPrice = ref('');
const maxPrice = ref('');

// 商品数据
const productData = ref([]);

// 收件人数据
const consigneeList = ref({});

// 购物车数据
const cartData = ref([]);
const totalCartPrice = ref(null); // 购物车-小计
ref(null);
// 购物车-商品数量
const productId = ref(null); // 购物车-商品ID

// 收藏夹展示类型
const collectionShowType = ref('product');
// 商品收藏夹数据
const productCollectionData = ref([]);

// 订单-备注
const remark = ref('');

// 计算购物车商品项-渲染与否
const filteredCartData = computed(() => cartData.value.filter(item => item.productQuantity > 0));

// 计算购物车-小计
const totalCartPriceComputed = computed(() =>
    cartData.value.reduce((total, item) => {
        // 确保数组元素是包含 productPrice 和 productQuantity 属性的对象
        if (item && typeof item === 'object' && 'productPrice' in item && 'productQuantity' in item) {
            return total + item.productPrice * item.productQuantity;
        } else {
            return total; // 如果不符合预期的结构，忽略该元素
        }
    }, 0)
);

// 监听 cartData 的变化，实时更新数据
watch(cartData, () => {
    totalCartPrice.value = totalCartPriceComputed.value;
}, { deep: true });

// 请求商品数据
onMounted(() => {
    axios.get('/store/showProduct').then(response => {
        productData.value = response.data;
        productClassList.value = Array.from(new Set(productData.value.map(item => item.productClass)));
    });

    // 请求购物车数据
    axios
        .get('/cart/showCart', {
            params: {
                userId: userData.value.userId,
            }
        })
        .then(response => {
            cartData.value = response.data;
        })
        .catch(error => {
            console.log(error);
        });

    // 请求 商品收藏夹 数据
    axios
        .get('/collect/pageCollection', {
            params: {
                userId: userData.value.userId,
                type: collectionShowType.value
            }
        })
        .then(response => {
            productCollectionData.value = response.data;
        })
        .catch(error => {
            console.log(error);
        });
});

// 请求 收件人 数据
onMounted(() => {
    axios
        .get('/consignee/showConsigneeListByUserId', {
            params: {
                userId: userData.value.userId,
            }
        })
        .then(response => {
            consigneeList.value = response.data.length > 0 ? response.data[0] : {}; // 获取数组的第一个元素作为对象
        })
        .catch(error => {
            console.log(error);
        });
});

// 复合搜索：商品名，商品类型，价格区间
const searchProduct = () => {
    if (productClass.value === 'All') {
        productClass.value = '';
    }
    axios
        .get('/store/searchProduct', {
            params: {
                productName: productName.value,
                productClass: productClass.value,
                minPrice: minPrice.value,
                maxPrice: maxPrice.value
            }
        })
        .then(response => {
            productData.value = response.data;
            if (response.data) {
                ElNotification({
                    title: 'Success',
                    message: '筛选成功',
                    type: 'success',
                    duration: 1500
                });
            } else {
                ElNotification({
                    title: 'Error',
                    message: '筛选失败',
                    type: 'error',
                    duration: 1500
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// 跳转到商品详情页
const toProductDetail = () => {
    router.push({
        path: '/productDetail',
        query: {
            productId: productId.value
        }
    });
};

// 购物车：商品数量 +1
const plusCart = productId => {
    updateCartQuantity(productId, 1).then(() => {
        refreshCartData();
    });
};

// 购物车：商品数量 -1
const minusCart = productId => {
    // 更新购物车数量
    updateCartQuantity(productId, -1).then(() => {
        refreshCartData();
    });
};

// 购物车：删除商品
const deleteFromCart = productId => {
    axios
        .delete('cart/deleteCart', {
            params: {
                userId: userData.value.userId,
                productId: productId
            }
        })
        .then(response => {
            refreshCartData();
        })
        .catch(error => {
            console.log(error);
        });
};

// 购物车：更新商品数量到后端
const updateCartQuantity = (productId, num) => {
    return axios
        .post('/cart/updateCart', null, {
            params: {
                userId: userData.value.userId,
                productId: productId,
                purchaseQuantity: num
            }
        })
        .then(response => {
            refreshCartData();
            if (response.data === 1000) {
                ElNotification({
                    title: 'Success',
                    message: '购物车-添加成功',
                    type: 'success',
                    duration: 1500
                });
            } else if (response.data === 1001) {
                ElNotification({
                    title: 'Success',
                    message: '购物车-更新成功',
                    type: 'success',
                    duration: 1500
                });
            } else if (response.data === 2001) {
                ElNotification({
                    title: 'Info',
                    message: '已到达限购额',
                    type: 'info',
                    duration: 1500
                });
            } else {
                ElNotification({
                    title: 'Error',
                    message: '购物车-更新失败',
                    type: 'error',
                    duration: 1500
                });
            }
        })
        .catch(error => {
            refreshCartData();
            console.log(error);
            // 将 Promise 拒绝传递回调用方，即 plusCart 和 minusCart，将信息反馈给用户
            return Promise.reject(error);
        });
};

// 刷新购物车数据
const refreshCartData = () => {
    // 发起请求或者调用方法刷新购物车数据
    axios
        .get('/cart/showCart', {
            params: {
                userId: userData.value.userId,
            }
        })
        .then(response => {
            cartData.value = response.data;
        })
        .catch(error => {
            console.log(error);
        });
};

// 添加商品到收藏夹
const addProductToCollect = (productId, userId) => {
    axios
        .post('/collect/productCollection', null, {
            params: { productId, userId }
        })
        .then(response => {
            if (response.data) {
                ElNotification({
                    title: 'Success',
                    message: '商品收藏成功',
                    type: 'success',
                    duration: 1500
                });
            } else {
                ElNotification({
                    title: 'Error',
                    message: '商品收藏失败',
                    type: 'error',
                    duration: 1500
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// 提交订单
const check = () => {
    axios
        .post('/order/check', null, {
            data: {
                userId: userData.value.userId,
                productId: cartData.value.productId
            }
        })
        .then(response => {
            if (response.data) {
                ElNotification({
                    title: 'Success',
                    message: '订单提交成功',
                    type: 'success',
                    duration: 1500
                });
            } else {
                ElNotification({
                    title: 'Error',
                    message: '订单提交失败',
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

<style lang="scss" scoped>
* {
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
    font-family: frutiger sans-serif;
}
body{
    width: 100%;
    min-width: 120rem;
}

/* 商品搜索条部分 */
.search_div{
    position: fixed;
    display: flex;
    justify-content: right;
    align-items: center;

    z-index: 101;

    width: 70vw;
    height: 4rem;
    top: 10rem;

    background: $degree-fabric-light-blue;

    line-height: 4rem;
    color: #ffffff;
    font: {
        weight: bold;
    }

    #search_each{
        height: 4rem;
        margin-right: 6rem;

        /* 按商品类别搜索--选择框 */
        .product_class {
            width: 14rem;
            height: 2.6rem;
        }

        input {
            border: 2px solid #D4D4D4;
            height: 2rem;

            &[type=text]{
                width: 8rem;

                border-radius: 2rem;
                text-indent: 4px;
                outline: none;

                transition: width .3s;
            }
            &[name=product_name]:focus{
                width: 16rem;
            }
            &[name=category]{
                width: 12rem;
            }
            &[name=minprice], &[name=maxprice]{
                width: 8rem;
            }
        }
    }
    input[type=submit]{
        border-style: none;
        width: 10rem;
        height: 4rem;
        cursor: pointer;

        background: $degree-fabric-light-red;

        text-align: center;
        color: #ffffff;
        font: {
            size: 2rem;
            weight: bold;
        }
    }
}

/* 笑脸 */
img[id="smileJPG"] {
    position: fixed;
    top: 8rem;
    right: 9rem;

    width: 10rem;

    transform: rotate(10deg);
}

/* 购物车 */
$cartDivWidth: 80rem;  // 购物车-总宽度
$productDivWidth: 60rem;  // 购物车-单品宽度
$infoDivWidth: 268px;  // 购物车-信息栏宽度

.product_container{
    position: fixed;

    left: 7rem;
    bottom: 0;

    width: $cartDivWidth;
    height: 74rem;

    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */

    #el_back_top {
        .el_style {
            height: 100%;
            width: 100%;
            border-radius: 50%;
            background-color: white;
            text-align: center;
            line-height: 36px;
            color: $booth-red-color;

            transition: all .2s ease-in-out;
            &:hover {
               background: $degree-fabric-light-blue;
            }
        }
    }

    &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }

    /* 购物车-单品 */
    .product_div{
        display: flex;
        flex-direction: row;

        width: $productDivWidth;
        height: 13rem;

        margin-bottom: 18px;

        background-color: #ffffff;
        box-shadow: 0.5rem 0.5rem 1rem rgba(0,0,0,0.4);
        border-radius: 12px;

        transition: all 0.3s;
        transform: scale(0.96, 0.96);
        opacity: 1;

        cursor: pointer;

        &:hover {
            transform: translateY(-2px) scale(0.99, 0.99);
            box-shadow:1rem 1rem 2rem rgba(0,0,0,0.3);
        }

        img{
            height: 11rem;
            width: 11rem;
            border-radius: 12px;
            margin: 1rem;
        }

        .info_div {
            display: flex;
            flex-direction: column;

            width: $infoDivWidth;
            height: auto;

            margin: 1rem;

            &:last-child {
                background-color: gray;
            }

            /* 单品-信息栏 */
            #product_class_div{
                width: auto;
                height: auto;

                font: {
                    size:15px;
                };
                text-align: left;
                color: $booth-green-color
            }
            #product_name_div{
                width: auto;
                height: auto;

                margin-top: 0.5rem;

                font-size: 2rem;
                text-align: left;
                color: $blue-color;

                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            #product_price_div{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-end;

                width: auto;
                height: 6rem;

                font-size: 2rem;
                text-align: left;
                color: $booth-red-color;
            }
        }
        .btn_div {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-end;

            margin-bottom: 1rem;

            #product_quantity_div {
                display: flex;
                flex-direction: row;

                margin-right: 1rem;

                width: auto;
                height: 3rem;
                background-color: #f5f7fa;

                color: white;
                div {
                    &:nth-child(1), &:nth-child(3) {
                        width: 3rem;
                        height: 3rem;
                        background-color: #e6e8ee;

                        text-align: center;
                        line-height: 3rem;

                        color: #444444;
                        cursor: pointer;
                        transition: all .2s;
                        &:hover {
                            background-color: #f5f7fa;
                        }
                    }
                    &:nth-child(2) {
                        font: {
                            size: 18px;
                        };
                        width: 3rem;
                        height: 3rem;
                        margin: 0 4px;
                        text-align: center;
                        line-height: 3rem;
                        color: #666666;
                    }
                }
            }
            #btns {
                display: flex;
                flex-direction: column;

                button {
                    width: 3rem;
                    height: 3rem;
                    margin: 0 4px;
                    border: none;
                    border-radius: 50%;
                    background-color: #ffffff;

                    cursor: pointer;
                    transition: all .2s;
                    &:hover {
                        background-color: #e6e8ee;
                    }
                }

                /* 单品-功能键 */
                .functionBtn {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    width: 6rem;
                    height: 3rem;
                    margin-top: 1rem;
                    margin-right: 1rem;

                    border: none;
                    border-radius: 1rem;;
                    background-color: white;

                    cursor: pointer;
                    transition: all .2s;
                    box-shadow: 3px 3px 6px rgba(0,0,0,0.3);

                    &:hover {
                        transform: translateY(-2px) scale(0.99, 0.99);
                        box-shadow:1rem 1rem 2rem rgba(0,0,0,0.3);
                    }

                    font: {
                        size: 16px;
                        weight: bold;
                    };

                    img {
                        width: 2rem;
                        height: 2rem;
                        &[id="collect_icon"] {
                            width: 22px;
                            height: 22px;
                            margin-top: 1rem;
                        }
                    }

                    &[id="btn_deleteCart"] {
                        background-color: $booth-red-color;
                    }
                }
            }
        }
    }
}

/* 订单 */
$orderWidth: 80rem;  // 订单-总宽度
.order_div {
    position: fixed;

    width: $orderWidth;
    height: 80%;

    right: 18rem;
    bottom: 0;

    background-color: #ffffff;
    box-shadow: 0.5rem 0.5rem 1rem rgba(0,0,0,0.4);
    border-radius: 2rem 2rem 0 0;
    text-align: center;

    /* 订单-用户信息 */
    .order_info_div {
        height: 34rem;

        table[id="order_info"] {
            width: 76rem;
            margin: 0 2rem;
            border-collapse: collapse;
            tr[id="trade_item"] {
                td {
                    text-align: left;
                    height: 4rem;
                    font: {
                        size: 1.6rem;
                        weight: bold;
                    }
                    color: $blue-color;

                    span {
                        margin-left: 1.2rem;
                        font: {
                            size: 1.6rem;
                            weight: normal;
                        }
                        color: #888888;
                    }

                    // 收件人-编辑按钮
                    #edit_consignee_btn {
                        width: 6rem;
                        height: 3rem;

                        margin-right: 2rem;

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

                &[id="cart_topic"] {
                    border: none;
                    td {
                        text-align: center;

                        height: 8rem;
                        font: {
                            size: 3rem;
                            weight: bold;
                        }
                        color: $blue-color;
                    }
                }

                &[id="cart_item"] {
                    border: none;
                    td {
                        height: 4rem;
                    }
                }
            }
        }
    }

    #cart_topic {
        width: $orderWidth;
        height: 5rem;

        border-top: #cccccc solid 1px;
        line-height: 5rem;
        font: {
            size: 24px;
            weight: bold;
        }
        color: $blue-color;
    }
    .cart_div {
        width: $orderWidth;
        height: 28rem;

        overflow-x: hidden;
        overflow-y: auto;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */

        /* 订单-商品信息 */
        table[id="cart_content"] {
            width: 77rem;
            margin: 0 15px;
            border-collapse: collapse;
            tr {
                td {
                    &:nth-child(1) {
                        flex: 3;
                    }
                    &:nth-child(2), &:nth-child(3) {
                        flex: 1;
                    }
                    font: {
                        size: 14px;
                    }
                    color: #797979;
                }

                &[id="cart_item"] {
                    border: none;
                    td {
                        height: 4rem;
                        font: {
                            size: 16px;
                            weight: bold;
                        }
                        color: $booth-green-color;
                    }
                }

                &[id="cart_show"] {
                    border-bottom: #c1c1c1 solid 1px;

                    td {
                        font: {
                            size: 14px;
                        }
                        &[id="cart_manage_td"] {
                            display: flex;
                            flex-direction: row;
                            justify-content: space-evenly;
                            align-items: center;

                            height: 4rem;

                            img {
                                width: 18px;
                                cursor: pointer;
                            }
                        }
                    }
                    &:last-child {
                        border: none;
                    }
                }
            }
        }
    }

    #check_div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        width: $orderWidth;
        height: 7rem;

        border-top: #cccccc solid 1px;

        #count_item {
            width: 40rem;
            font: {
                size: 2rem;
                weight: bold;
            }
            span {
                margin: 2rem;
                &:nth-child(1) {
                    color: $blue-color;
                }
                &:nth-child(2) {
                    color: $booth-red-color;
                }
            }
        }

        #check_item {
            width: 40rem;
            button[id="btn_check"] {
                height: 4rem;
                width: 16rem;

                border: none;
                border-radius: 2rem;

                background-color: $blue-color;

                font: {
                    size: 18px;
                    weight: bold;
                }
                color: white;

                cursor: pointer;
                transition: all .2s;

                &:hover {
                    //width: 30rem;
                    background-color: $booth-red-color;
                }

                img {
                    width: 28px;
                    margin-top: 4px;
                }
            }
        }
    }
}
</style>