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
      <el-backtop id="el_back_top" target=".product_container" :right="100" :bottom="30">
        <div class="el_style">
          ▲
        </div>
      </el-backtop>

      <!-- 商品展示块 -->
      <div v-for="(item, key) of productData" :key="key" class="product_div">
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
            <a @click="addProductToCollect()"><b>Collect</b></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- js -->
<script>
import axios from "axios";

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
        };
    },
    computed: {
        // 计算购物车商品项-渲染与否
        filteredCartData() {
            return this.cartData.filter(item => item.productQuantity > 0);
        },

        // 计算购物车-小计
        totalCartPriceComputed() {
            return this.cartData.reduce(
                (total, item) => total + item.productPrice * item.productQuantity,
                0
            );
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
            console.log(this.productClassList)
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
            console.log(this.productName, this.productClass, this.minPrice, this.maxPrice);
            this.$http.get("/store/searchProduct", {
                params: {
                    productName: this.productName,
                    productClass: this.productClass,
                    minPrice: this.minPrice,
                    maxPrice: this.maxPrice
                }
            })
                .then((response) => {
                    console.log(response);
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

        // 购物车：商品数量 +1
        plusCart(productId) {
            this.updateCartQuantity(productId, 1)
                .catch(() => {
                    this.refreshCartData();
                });
        },
        // 购物车：商品数量 -1
        minusCart(productId) {
            // 更新购物车数量
            this.updateCartQuantity(productId, -1)
                .catch(() => {
                    this.refreshCartData();
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
                console.log(response);
                if (response.data === 1000) {
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
                console.log(response.data);
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

    background-color: $blue-color;

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

        background-color: $booth-red-color;

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

/* 订单展示块 */
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
                float:left;

                width:100px;
                height:30px;

                margin-top:15px;
                text-align: center;
                line-height:30px;
                border-top: 1px solid #666666;
                a{
                    display: block;

                    width:100px;
                    height:30px;

                    color:#666666;
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