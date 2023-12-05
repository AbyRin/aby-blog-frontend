<template xmlns:th="http://www.w3.org/1999/xhtml">
  <div>
    <!-- 商品搜索条部分 -->
    <div class="search_div">
      <!-- 按商品名搜索 -->
      <div id="search_each">
        Name
        <input type="text" name="product_name">
      </div>

      <!-- 按商品类别搜索 -->
      <div id="search_each">
        Class
        <select class="product_class" name="product_class">
          <option>
            All
          </option>>
          <option v-for="(item, key) of productData" :key="key" value="item.productClass">
            {{ item.productClass }}
          </option>>
        </select>
      </div>

      <!-- 按价格区间搜索 -->
      <div id="search_each">
        Price Range
        <input type="text" name="min_price"> ~ <input type="text" name="max_price">
      </div>

      <!-- 按钮 -->
      <input type="submit" value="Search">
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
        <tr v-for="(item, key) of cartData" :key="key">
          <td>{{ item.productId }}</td>
          <td>￥{{ item.productPrice }}</td>
          <td>{{ item.purchaseNum }}</td>
        </tr>
        <tr id="cart_count">
          <td>Total price</td>
          <td colspan="2">
            ￥120
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
            <a @click="addCart(item.productId)"><b>Purchase</b></a>
          </div>

          <!-- 收藏 -->
          <div id="functionBtn">
            <a @click="addCollect()"><b>Collect</b></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- js -->
<script>
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
    data() {
        return {
            productData: [],
            cartData: [],
            collectData: [],
            cartList: [
                {productName: "default"},
                {productPrice: "default"},
                {purchaseNum: "default"},
            ],
        };
    },
    created() {
        this.$http.get("/store").then((response)=>{
            this.productData = response.data;
        })
        this.$http.get("/cart").then((response)=>{
            this.cartData = response.data;
        })
        this.$http.get("/collect/productCollection").then((response)=>{
            this.collectData = response.data;
        })
    },
    mounted() {

    },
    methods: {
        addCart(productId, userId) {
            axios.post("/cart/add", null, {
                params: { productId, userId }
            })
                .then((response) => {
                    console.log(response.data);
                    ElMessage({
                        duration: 1500,
                        type: 'success',
                        message: '购物车添加成功',
                    })
                })
                .catch((error) => {
                    console.log(error)
                    ElMessage({
                        duration: 1500,
                        type: 'info',
                        message: '购物车添加失败',
                    })
                });
        },
        addCollect(productId, userId) {
            axios.post("/collect/productCollection", null, {
                params: { productId, userId }
            })
                .then((response) => {
                    console.log(response.data);
                    ElMessage({
                        duration: 1500,
                        type: 'success',
                        message: '商品收藏成功',
                    })
                })
                .catch((error) => {
                    console.log(error)
                    ElMessage({
                        duration: 1500,
                        type: 'info',
                        message: '商品收藏失败',
                    })
                });
        },
        getCartList() {
            // 连表查询
            // 订正：放到后端去，用 results 构建
            this.cartList.productName = this.cartData.productId;
            this.cartList.productPrice = this.cartData.productPrice;
            this.cartList.productName = this.cartData.productId;
            return cartList
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
            border-bottom: #c1c1c1 solid 1px;

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

            &:not([id="cart_topic"]):not([id="cart_item"]):not([id="cart_count"]) {
                td {
                    padding: 8px 0;
                }
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

        // 4个 商品信息
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
        // 2个 功能
        div {
            // 功能键: 加入购物车, 收藏
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
                    &:hover{
                        background-color: $booth-red-color;
                        color: #ffffff;
                    }
                }
            }
        }
    }
}

/* 功能: 电梯 */
/* 电梯本体 */
.elevator {
    position: fixed;
    width: 160px;
    height: auto;

    left: 50%;
    margin-left: 620px;
    top: 320px;
    z-index: 100;
    
    /* (已修改方案) */
    /* 初始隐藏电梯，页面向下滑动时伴随 书籍搜索条 出现 */
    /* opacity: 0; */

    text-align: center;
    transition: all .5s;

    /* 分类 */
    .elevator_list {
        /* position: relative; */

        width: 160px;
        height: auto;

        background: #fff;

        margin: 0;
        padding: 0;

        box-shadow: 5px 5px 5px $shadow-color;
        /* 世界泡 */
        li {
            width: auto;
            height: 50px;
            line-height: 50px;

            border: 1px solid #dcdcdc;
            margin: 0;

            list-style-type: none;
            a {
                display: block;

                width: auto;
                height: 50px;

                text-decoration: none;

                color: $blue-color;
                transition: all .5s;
                &:hover, &.active {
                    background-color: $booth-red-color;
                    color: #ffffff;
                }
                i {
                    position: relative;

                    display: block;

                    width: 16px;
                    height: 16px;

                    left: 4px;
                    background-position: 8px -106px;

                    font-size: 20px;
                    transform: rotate(-90deg);
                }
            }

            /* 海 */
            &[class = 'sea'] {
                width: auto;
                height: 50px;
                line-height: 50px;

                border: 1px solid #dcdcdc;
                margin: 0;

                list-style-type: none;
                background-color: $blue-color;
                a {
                    display: block;

                    width: auto;
                    height: 50px;

                    text-decoration: none;

                    color: #ffffff;
                }
            }
        }
    }
}
</style>