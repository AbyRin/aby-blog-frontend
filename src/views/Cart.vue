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
        style="left: 600px; bottom: 20px; box-shadow: 5px 5px 10px rgba(0,0,0,0.4);"
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

          <!-- 不可变动信息：uid、账号（邮箱）、昵称 -->
          <tr id="trade_item">
            <td>Uid<span>测试值</span></td>
            <td>E-mail<span>测试值</span></td>
            <td>NickName<span>测试值</span></td>
          </tr>

          <!-- 可变动信息：收件人、手机、地址 -->
          <tr id="trade_item">
            <td colspan="3">
              Consignee
              <span>测试值</span>
            </td>
          </tr>
          <tr id="trade_item">
            <td colspan="3">
              Mobile
              <span>测试值</span>
            </td>
          </tr>
          <tr id="trade_item">
            <td colspan="3">
              Address
              <span>测试值</span>
            </td>
          </tr>
          <tr id="trade_item">
            <td colspan="3" style="height: 80px;">
              Remark
              <el-input
                v-model="remark"
                maxlength="60"
                placeholder="Please input"
                show-word-limit
                type="text"
                autosize
                clearable
                style="margin-top: 10px;"
              />
            </td>
          </tr>

          <tr style="height: 10px" />
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

<script>
import axios from "axios";
import { ref } from 'vue'
const text = ref('')
const textarea = ref('')

export default {
    data() {
        return {
            // 搜索条-条件
            productClassList: [],  // 商品种类选择器列表
            productName: '',
            productClass: 'All',  // 默认值为 'All'
            minPrice: '',
            maxPrice: '',

            productData: [],  // 商品数据

            cartData: [],  // 购物车数据
            totalCartPrice: null,  // 购物车-小计
            currentProductQuantity: null,  // 购物车-商品数量
            productId: null,  // 购物车-商品ID

            testUserId: 1,  // 测试用-用户ID

            collectionShowType: "product",  // 收藏夹展示类型
            productCollectionData: [],  // 商品收藏夹数据

            remark: '',  // 订单-备注
        };
    },
    computed: {
        // 计算购物车商品项-渲染与否
        filteredCartData() {
            return this.cartData.filter(item => item.productQuantity > 0);
        },

        // 计算购物车-小计
        totalCartPriceComputed() {
            return this.cartData.reduce((total, item) => {
                // 确保数组元素是包含 productPrice 和 productQuantity 属性的对象
                if (item && typeof item === 'object' && 'productPrice' in item && 'productQuantity' in item) {
                    return total + item.productPrice * item.productQuantity;
                } else {
                    return total; // 如果不符合预期的结构，忽略该元素
                }
            }, 0);
        },
    },
    watch: {
        // 监听 cartData 的变化，实时更新数据
        cartData: {
            handler() {
                this.totalCartPrice = this.totalCartPriceComputed;
            },
            deep: true,
        },
    },
    created() {
        // 请求商品数据
        this.$http.get("/store/showProduct").then((response)=>{
            this.productData = response.data;
            this.productClassList = Array.from(new Set(this.productData.map(item => item.productClass)));
        })
        // 请求购物车数据
        this.$http.get("/cart/showCart", {
            params: {
                userId: this.testUserId,
            }
        }).then((response)=>{
            this.cartData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        // 请求[商品]收藏夹数据
        this.$http.get("/collect/pageCollection", {
            params: {
                userId: this.testUserId,
                type: this.collectionShowType,
            }
        }).then((response)=>{
            this.productCollectionData = response.data;
        }).catch((error)=>{
            console.log(error);
        })
    },
    mounted() {
    },
    methods: {
        // 复合搜索：商品名，商品类型，价格区间
        searchProduct() {
            if (this.productClass === "All") {
                this.productClass = "";
            }
            // console.log(this.productName, this.productClass, this.minPrice, this.maxPrice);
            this.$http.get("/store/searchProduct", {
                params: {
                    productName: this.productName,
                    productClass: this.productClass,
                    minPrice: this.minPrice,
                    maxPrice: this.maxPrice
                }
            })
                .then((response) => {
                    this.productData = response.data;

                    if (response.data) {
                        this.$notify({
                            title: 'Success',
                            message: '筛选成功',
                            type: 'success',
                            duration: 1500
                        });
                    } else {
                        this.$notify({
                            title: 'Error',
                            message: '筛选失败',
                            type: 'error',
                            duration: 1500
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        // 跳转到商品详情页
        toProductDetail() {
            this.$router.push({
                path: "/productDetail",
                query: {
                    productId: this.productId,
                }
            });
        },
        // 购物车：商品数量 +1
        plusCart(productId) {
            this.updateCartQuantity(productId, 1)
                .then(() => {
                    this.refreshCartData();
                })
                .catch(() => {
                    this.refreshCartData();
                });
        },
        // 购物车：商品数量 -1
        minusCart(productId) {
            // 更新购物车数量
            this.updateCartQuantity(productId, -1)
                .then(() => {
                    this.refreshCartData();
                })
                .catch(() => {
                    this.refreshCartData();
                });
        },
        // 购物车：删除商品
        deleteFromCart(productId) {
            return axios.delete("cart/deleteCart", {
                params: {
                    userId: this.testUserId,
                    productId: productId,
                }
            }).then((response) => {
                this.refreshCartData();
            }).catch((error) => {
                console.log(error);
            });
        },
        // 购物车：更新商品数量到后端
        updateCartQuantity(productId, num) {
            return axios.post("/cart/updateCart", null, {
                params: {
                    userId: this.testUserId,
                    productId: productId,
                    purchaseQuantity: num,
                },
            }).then((response) => {
                this.refreshCartData();
                if (response.data === 1000) {  // 状态码，由后端反馈
                    this.$notify({
                        title: 'Success',
                        message: '购物车-添加成功',
                        type: 'success',
                        duration: 1500
                    });
                } else if (response.data === 1001) {
                    this.$notify({
                        title: 'Success',
                        message: '购物车-更新成功',
                        type: 'success',
                        duration: 1500
                    });
                } else if (response.data === 2001) {
                    this.$notify({
                        title: 'Info',
                        message: '已到达限购额',
                        type: 'info',
                        duration: 1500
                    });
                } else {
                    this.$notify({
                        title: 'Error',
                        message: '购物车-更新失败',
                        type: 'error',
                        duration: 1500
                    });
                }

            }).catch((error) => {
                this.refreshCartData();
                console.log(error);
                // 将 Promise 拒绝传递回调用方，即 plusCart 和 minusCart，将信息反馈给用户
                return Promise.reject(error);
            });
        },
        // 刷新购物车数据
        refreshCartData() {
            // 发起请求或者调用方法刷新购物车数据
            this.$http.get("/cart/showCart", {
                params: {
                    userId: this.testUserId,
                }
            }).then((response) => {
                this.cartData = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },

        // 添加商品到收藏夹
        addProductToCollect(productId, userId) {
            axios.post("/collect/productCollection", null, {
                params: { productId, userId }
            }).then((response) => {
                if (response.data) {
                    this.$notify({
                        title: 'Success',
                        message: '商品收藏成功',
                        type: 'success',
                        duration: 1500
                    });
                } else {
                    this.$notify({
                        title: 'Error',
                        message: '商品收藏失败',
                        type: 'error',
                        duration: 1500
                    });
                }
            }).catch((error) => {
                console.log(error)
            });
        },

        // 提交订单
        check() {
            axios.post("/order/check", null, {
                data: {
                    userId: this.testUserId,
                    productId: this.cartData.productId,
                }
            }).then((response) => {
                if (response.data) {
                    this.$notify({
                        title: 'Success',
                        message: '订单提交成功',
                        type: 'success',
                        duration: 1500
                    });
                } else {
                    this.$notify({
                        title: 'Error',
                        message: '订单提交失败',
                        type: 'error',
                        duration: 1500
                    });
                }
            }).catch((error) => {
                console.log(error)
            });
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

/* 商品搜索条部分 */
.search_div{
    position: fixed;
    display: flex;
    justify-content: right;
    align-items: center;

    z-index: 101;

    width: 70vw;
    height: 40px;
    top: 100px;

    background: $degree-fabric-light-blue;

    line-height: 40px;
    color: #ffffff;
    font: {
        weight: bold;
    }

    #search_each{
        height: 40px;
        margin-right: 60px;

        /* 按商品类别搜索--选择框 */
        .product_class {
            width: 140px;
            height: 26px;
        }

        input {
            border: 2px solid #D4D4D4;
            height: 20px;

            &[type=text]{
                width: 80px;

                border-radius: 20px;
                text-indent: 4px;
                outline: none;

                transition: width .3s;
            }
            &[name=product_name]:focus{
                width: 160px;
            }
            &[name=category]{
                width: 120px;
            }
            &[name=minprice], &[name=maxprice]{
                width: 80px;
            }
        }
    }
    input[type=submit]{
        border-style: none;
        width: 100px;
        height: 40px;
        cursor: pointer;

        background: $degree-fabric-light-red;

        text-align: center;
        color: #ffffff;
        font: {
            size: 20px;
            weight: bold;
        }
    }
}

/* 笑脸 */
img[id="smileJPG"] {
    position: fixed;
    top: 80px;
    right: 90px;

    width: 100px;

    transform: rotate(10deg);
}

/* 购物车 */
$cartDivWidth: 800px;  // 购物车-总宽度
$productDivWidth: 600px;  // 购物车-单品宽度
$infoDivWidth: 268px;  // 购物车-信息栏宽度

.product_container{
    position: fixed;

    left: 70px;
    bottom: 0;

    width: $cartDivWidth;
    height: 740px;

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
        height: 130px;

        margin-bottom: 18px;

        background-color: #ffffff;
        box-shadow: 5px 5px 10px rgba(0,0,0,0.4);
        border-radius: 12px;

        transition: all 0.3s;
        transform: scale(0.96, 0.96);
        opacity: 1;

        cursor: pointer;

        &:hover {
            transform: translateY(-2px) scale(0.99, 0.99);
            box-shadow:10px 10px 20px rgba(0,0,0,0.3);
        }

        img{
            height: 110px;
            width: 110px;
            border-radius: 12px;
            margin: 10px;
        }

        .info_div {
            display: flex;
            flex-direction: column;

            width: $infoDivWidth;
            height: auto;

            margin: 10px;

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

                margin-top: 5px;

                font-size: 20px;
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
                height: 60px;

                font-size: 20px;
                text-align: left;
                color: $booth-red-color;
            }
        }
        .btn_div {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-end;

            margin-bottom: 10px;

            #product_quantity_div {
                display: flex;
                flex-direction: row;

                margin-right: 10px;

                width: auto;
                height: 30px;
                background-color: #f5f7fa;

                color: white;
                div {
                    &:nth-child(1), &:nth-child(3) {
                        width: 30px;
                        height: 30px;
                        background-color: #e6e8ee;

                        text-align: center;
                        line-height: 30px;

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
                        width: 30px;
                        height: 30px;
                        margin: 0 4px;
                        text-align: center;
                        line-height: 30px;
                        color: #666666;
                    }
                }
            }
            #btns {
                display: flex;
                flex-direction: column;

                button {
                    width: 30px;
                    height: 30px;
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

                    width: 60px;
                    height: 30px;
                    margin-top: 10px;
                    margin-right: 10px;

                    border: none;
                    border-radius: 10px;;
                    background-color: white;

                    cursor: pointer;
                    transition: all .2s;
                    box-shadow: 3px 3px 6px rgba(0,0,0,0.3);

                    &:hover {
                        transform: translateY(-2px) scale(0.99, 0.99);
                        box-shadow:10px 10px 20px rgba(0,0,0,0.3);
                    }

                    font: {
                        size: 16px;
                        weight: bold;
                    };

                    img {
                        width: 20px;
                        height: 20px;
                        &[id="collect_icon"] {
                            width: 22px;
                            height: 22px;
                            margin-top: 10px;
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
$orderWidth: 800px;  // 订单-总宽度
.order_div {
    position: fixed;

    width: $orderWidth;
    height: 740px;

    right: 180px;
    bottom: 0;

    background-color: #ffffff;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.4);
    border-radius: 20px 20px 0 0;
    text-align: center;

    /* 订单-用户信息 */
    .order_info_div {
        height: 340px;

        table[id="order_info"] {
            width: 760px;
            margin: 0 20px;
            border-collapse: collapse;
            tr {
                td {
                    text-align: left;
                    width: 130px;
                    font: {
                        size: 16px;
                        weight: bold;
                    }
                    color: $blue-color;

                    span {
                        margin-left: 12px;
                        font: {
                            size: 14px;
                            weight: normal;
                        }
                        color: #888888;
                    }
                }

                &[id="cart_topic"] {
                    border: none;
                    td {
                        text-align: center;

                        height: 80px;
                        font: {
                            size: 30px;
                            weight: bold;
                        }
                        color: $blue-color;
                    }
                }

                &[id="trade_item"] {
                    border: none;
                    td {
                        height: 40px;
                    }
                }
            }
        }
    }

    #cart_topic {
        width: $orderWidth;
        height: 50px;

        border-top: #cccccc solid 1px;
        line-height: 50px;
        font: {
            size: 24px;
            weight: bold;
        }
        color: $blue-color;
    }
    .cart_div {
        width: $orderWidth;
        height: 280px;

        overflow-y: auto;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE 10+ */

        /* 订单-商品信息 */
        table[id="cart_content"] {
            width: 770px;
            margin: 0 15px;
            border-collapse: collapse;
            tr {
                td {
                    &:nth-child(1) {
                        width: 450px;
                    }
                    &:nth-child(2), &:nth-child(3) {
                        width: 160px;
                    }
                    font: {
                        size: 14px;
                    }
                    color: #797979;
                }

                &[id="cart_item"] {
                    border: none;
                    td {
                        height: 40px;
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

                            height: 40px;

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
        height: 70px;

        border-top: #cccccc solid 1px;

        #count_item {
            width: 400px;
            font: {
                size: 20px;
                weight: bold;
            }
            span {
                margin: 20px;
                &:nth-child(1) {
                    color: $blue-color;
                }
                &:nth-child(2) {
                    color: $booth-red-color;
                }
            }
        }

        #check_item {
            width: 400px;
            button[id="btn_check"] {
                height: 40px;
                width: 160px;

                border: none;
                border-radius: 20px;

                background-color: $blue-color;

                font: {
                    size: 18px;
                    weight: bold;
                }
                color: white;

                cursor: pointer;
                transition: all .2s;

                &:hover {
                    //width: 300px;
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