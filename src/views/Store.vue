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

    <!-- 购物车展示块 -->
    <div class="cart_div">
      <table id="cart_content">
        <tr id="cart_topic">
          <td colspan="3">
            Cart
          </td>
        </tr>

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
            <img
              src="@/image/icon/icons8-minus-30.png"
              alt=""
              @click="minusCart(item.productId)"
            >
            {{ item.productQuantity }}
            <img
              src="@/image/icon/icons8-plus-30.png"
              alt=""
              @click="plusCart(item.productId)"
            >
          </td>
        </tr>

        <tr id="cart_count">
          <td>Total price</td>
          <td colspan="2">
            ￥{{ totalCartPrice }}
          </td>
        </tr>
      </table>
    </div>

    <!-- 商品部分 -->
    <div class="product_container">
      <el-backtop
        id="el_back_top"
        target=".product_container"
        :right="100"
        :bottom="30"
        style="box-shadow: 5px 5px 10px rgba(0,0,0,0.4);"
      >
        <div class="el_style">
          ▲
        </div>
      </el-backtop>

      <!-- 商品展示块 -->
      <div v-for="(item, index) of productData" :key="index" class="product_div">
        <a :id="item.productId">
          <img :src="require(`@/image/img_product/${item.productPicture}`)" alt="">
        </a>

        <!-- 4个 商品信息-->
        <div id="product_class_div">
          <b>{{ item.productClass }}</b>
        </div>
        <div id="product_name_div">
          <b>{{ item.productName }}</b>
        </div>
        <div id="product_price_div">
          <b>￥{{ item.productPrice }}</b>
        </div>
        <div id="product_sold_div">
          <b>{{ item.productSoldNum }}</b>
        </div>

        <!-- 2个 功能-->
        <div>
          <!-- 功能键加入购物车-->
          <div id="functionBtn">
            <a @click="plusCart(item.productId)"><b>Purchase</b></a>
          </div>

          <!-- 收藏 -->
          <div id="functionBtn">
            <a @click="addProductToCollect(item.productId, testUserId)"><b>Collect</b></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import axios from "axios";
import { ElNotification } from "element-plus";

export default {
    setup() {
        // 搜索条-条件
        const productClassList = ref([]);  // 商品种类选择器列表
        const productName = ref('');
        const productClass = ref('All');  // 默认值为 'All'
        const minPrice = ref('');
        const maxPrice = ref('');

        // 商品数据
        const productData = ref([]);

        // 购物车数据
        const cartData = ref([]);
        const totalCartPrice = ref(null);  // 购物车-小计

        // 测试用-用户ID
        const testUserId = ref(1);

        // 商品收藏夹数据
        const collectionShowType = ref("product");
        const productCollectionData = ref([]);

        // 计算购物车商品项-渲染与否
        const filteredCartData = computed(() => {
            return cartData.value.filter(item => item.productQuantity > 0);
        });

        // 计算购物车-小计
        const totalCartPriceComputed = computed(() => {
            return cartData.value.reduce(
                (total, item) => total + item.productPrice * item.productQuantity,
                0
            );
        });

        // 监听 cartData 的变化，实时更新数据
        watch(cartData, () => {
            totalCartPrice.value = totalCartPriceComputed.value;
        }, { deep: true });

        // 请求商品数据
        const fetchProductData = async () => {
            try {
                const response = await axios.get("/store/showProduct");
                productData.value = response.data;
                productClassList.value = Array.from(new Set(productData.value.map(item => item.productClass)));
                console.log(productClassList.value);
            } catch (error) {
                console.error(error);
            }
        };

        // 请求购物车数据
        const fetchCartData = async () => {
            try {
                const response = await axios.get("/cart/showCart", { params: { userId: testUserId.value } });
                cartData.value = response.data;
            } catch (error) {
                console.error(error);
            }
        };

        // 请求[商品]收藏夹数据
        const fetchProductCollectionData = async () => {
            try {
                const response = await axios.get("/collect/pageCollection", { params: { userId: testUserId.value, type: collectionShowType.value } });
                productCollectionData.value = response.data;
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(() => {
            fetchProductData();
            fetchCartData();
            fetchProductCollectionData();
        });

        // 复合搜索：商品名，商品类型，价格区间
        const searchProduct = () => {
            if (productClass.value === "All") {
                productClass.value = "";
            }

            axios.get("/store/searchProduct", {
                params: {
                    productName: productName.value,
                    productClass: productClass.value,
                    minPrice: minPrice.value,
                    maxPrice: maxPrice.value
                }
            })
                .then((response) => {
                    console.log(response);
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
                .catch((error) => {
                    console.error(error);
                });
        };

        // 购物车：商品数量 +1
        const plusCart = (productId) => {
            updateCartQuantity(productId, 1)
                .then(() => {
                    refreshCartData();
                })
                .catch(() => {
                    refreshCartData();
                });
        };

        // 购物车：商品数量 -1
        const minusCart = (productId) => {
            // 更新购物车数量
            updateCartQuantity(productId, -1)
                .then(() => {
                    refreshCartData();
                })
                .catch(() => {
                    refreshCartData();
                });
        };

        // 购物车：更新商品数量到后端
        const updateCartQuantity = (productId, num) => {
            return axios
                .post("/cart/updateCart", null, {
                    params: {
                        userId: testUserId.value,
                        productId: productId,
                        purchaseQuantity: num,
                    },
                })
                .then((response) => {
                    refreshCartData();
                    console.log(response);
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
                .catch((error) => {
                    refreshCartData();
                    console.error(error);
                    // 将 Promise 拒绝传递回调用方，即 plusCart 和 minusCart，将信息反馈给用户
                    return Promise.reject(error);
                });
        };

        // 刷新购物车数据
        const refreshCartData = () => {
            // 发起请求或者调用方法刷新购物车数据
            axios
                .get("/cart/showCart", {
                    params: {
                        userId: testUserId.value,
                    }
                })
                .then((response) => {
                    cartData.value = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        // 添加商品到收藏夹
        const addProductToCollect = (productId, userId) => {
            axios
                .post("/collect/productCollection", null, {
                    params: { productId, userId }
                })
                .then((response) => {
                    console.log(response.data);
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
                .catch((error) => {
                    console.error(error);
                });
        };

        return {
            productClassList,
            productName,
            productClass,
            minPrice,
            maxPrice,
            productData,
            cartData,
            totalCartPrice,
            testUserId,
            collectionShowType,
            productCollectionData,
            filteredCartData,
            totalCartPriceComputed,
            searchProduct,
            plusCart,
            minusCart,
            updateCartQuantity,
            refreshCartData,
            addProductToCollect
        };
    }
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

img[id="smileJPG"] {
    position: fixed;
    top: 200px;
    left: 200px;

    width: 150px;

    transform: rotate(350deg);
}

/* 购物车 */
.cart_div {
    position: fixed;
    width: 420px;
    height: auto;

    left: 60px;
    bottom: 0;

    background-color: #ffffff;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.4);
    border-radius: 20px 20px 0 0;
    text-align: center;

    table[id="cart_content"] {
        width: 390px;
        margin: 0 15px;
        border-collapse: collapse;
        tr {
            td {
                &:nth-child(1) {
                    width: 190px;
                }
                &:nth-child(2), &:nth-child(3) {
                    width: 100px;
                }
                font: {
                    size: 14px;
                }
                color: #797979;
            }

            &[id="cart_topic"] {
                border: none;
                td {
                    height: 60px;
                    font: {
                        size: 24px;
                        weight: bold;
                    }
                    color: $blue-color;
                }
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
            }

            &[id="cart_count"] {
                border: none;
                td {
                    height: 60px;
                    font: {
                        size: 18px;
                        weight: bold;
                    }
                    &:nth-child(1) {
                        color: $blue-color;
                    }
                    &:nth-child(2) {
                        color: $booth-red-color;
                    }
                }
            }
        }
    }
}

/* 商品展示部分 */
.product_container{
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;

    right: 70px;
    bottom: 0;

    width: 64vw;
    height: 78vh;

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
                background-color: $blue-color;
            }
        }
    }

    &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }

    /* 商品展示块 */
    .product_div{
        width: 200px;
        height: 320px;

        margin-right: 36px;
        margin-bottom: 20px;

        padding: 10px;

        display: inline-block;
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

        a {
            img{
                height: 200px;
                width: 200px;
                border-radius: 12px;
            }
        }

        /* 4个 商品信息 */
        #product_class_div{
            width: 200px;
            height: 15px;

            font: {
                size:15px;
            };
            text-align: left;
            color: rgb(078, 157, 169);
        }
        #product_name_div{
            width: 200px;
            height: 28px;

            margin-top: 5px;

            font-size:20px;
            text-align: left;
            color: $blue-color;

            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        #product_price_div{
            width: 100px;
            height: 18px;

            font-size:18px;
            margin-top:10px;
            text-align: left;
            color: $booth-red-color;

            float: left;
        }
        #product_sold_div{
            width: 100px;
            height: 18px;

            font-size:18px;
            margin-top:10px;
            text-align: right;
            color: $yellow-color;

            float: right;
        }
        /* 2个 功能 */
        div {
            /* 功能键: 加入购物车, 收藏 */
            #functionBtn {
                float: left;

                width: 100px;
                height: 30px;

                margin-top: 15px;
                text-align: center;
                line-height: 30px;
                border-top: 1px solid #666666;
                a{
                    display: block;
                    font-size: 1.6rem;
                    width: 100px;
                    height: 30px;

                    color: #666666;
                    text-decoration: none;
                    transition: color .2s;

                    border-radius: 4px;
                    &:hover{
                        background-color: $booth-red-color;
                        color: #ffffff;
                    }
                }
            }
        }
    }
}
</style>