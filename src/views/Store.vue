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
        <select name="product_class" class="product_class">
          <option th:each="product_class:${product_classes}" th:value="${product_class}" th:text="${product_class}" />
        </select>
      </div>

      <!-- 按价格区间搜索 -->
      <div id="search_each">
        Price Range
        <input type="text" name="minprice"> ~ <input type="text" name="maxprice">
      </div>

      <!-- 按钮 -->
      <input type="submit" value="Search">
    </div>

    <img id="smileJPG" src="@/image/img_bg/smile.png" alt="">

    <!-- 订单展示块 -->
    <div class="order_div">
      <table id="order_content">
        <tr id="order_topic">
          <td colspan="3">Cart</td>
        </tr>
        <tr id="order_item">
          <td>Product</td>
          <td>Price</td>
          <td>Num</td>
        </tr>
        <!--        <tr>-->
        <!--          <td>`${product.product_name}`</td>-->
        <!--          <td>`${product.price}`</td>-->
        <!--          <td>`${product.purchase_num}`</td>-->
        <!--        </tr>-->
        <tr>
          <td>你说得对但原神是一款</td>
          <td>￥20</td>
          <td>×2</td>
        </tr>
        <tr>
          <td>Mihoyo自主研发的</td>
          <td>￥20</td>
          <td>×2</td>
        </tr>
        <tr>
          <td>开放世界冒险游戏</td>
          <td>￥20</td>
          <td>×2</td>
        </tr>

        <tr id="order_count">
          <td>Total price</td>
          <td colspan="2">￥120</td>
        </tr>
      </table>
    </div>

    <!-- 商品部分 -->
    <div class="product_container">
      <!-- 商品展示块 -->
      <div class="product_div" th:each="product:${productlist}">
        <a th:href="'/store/productdetail?product_id='+${product.product_id}">
          <img th:src="@{'/image/img_product/'+${product.picture}}" alt="">
        </a>

        <!-- 4个 商品信息-->
        <div id="product_class_div" th:utext="${product.product_class}">
          <b>Product Class</b>
        </div>
        <div id="product_name_div" th:utext="${product.product_name}">
          <b>Product Name</b>
        </div>
        <div id="product_price_div" th:utext="${product.price}+'CNY'">
          <b>Price</b>
        </div>
        <div id="product_sold_div" th:utext="'Sold '+${product.soldnum}">
          Sold Num
        </div>

        <!-- 2个 功能-->
        <div>
          <!-- 加入购物车-->
          <div id="gotocart_div">
            <a th:href="'/cart/addcart?product_id='+${product.product_id}"><b>Purchase</b></a>
          </div>

          <!-- 收藏 -->
          <div id="collect_div">
            <a th:href="'/collect/addcollect?product_id='+${product.product_id}"><b>Collect</b></a>
          </div>
        </div>
      </div>
      <!-- 商品展示块 -->
      <div class="product_div" th:each="product:${productlist}">
        <a th:href="'/store/productdetail?product_id='+${product.product_id}">
          <img th:src="@{'/image/img_product/'+${product.picture}}" alt="">
        </a>

        <!-- 4个 商品信息-->
        <div id="product_class_div" th:utext="${product.product_class}">
          <b>Product Class</b>
        </div>
        <div id="product_name_div" th:utext="${product.product_name}">
          <b>Product Name</b>
        </div>
        <div id="product_price_div" th:utext="${product.price}+'CNY'">
          <b>Price</b>
        </div>
        <div id="product_sold_div" th:utext="'Sold '+${product.soldnum}">
          Sold Num
        </div>

        <!-- 2个 功能-->
        <div>
          <!-- 加入购物车-->
          <div id="gotocart_div">
            <a th:href="'/cart/addcart?product_id='+${product.product_id}"><b>Purchase</b></a>
          </div>

          <!-- 收藏 -->
          <div id="collect_div">
            <a th:href="'/collect/addcollect?product_id='+${product.product_id}"><b>Collect</b></a>
          </div>
        </div>
      </div>
      <!-- 商品展示块 -->
      <div class="product_div" th:each="product:${productlist}">
        <a th:href="'/store/productdetail?product_id='+${product.product_id}">
          <img th:src="@{'/image/img_product/'+${product.picture}}" alt="">
        </a>

        <!-- 4个 商品信息-->
        <div id="product_class_div" th:utext="${product.product_class}">
          <b>Product Class</b>
        </div>
        <div id="product_name_div" th:utext="${product.product_name}">
          <b>Product Name</b>
        </div>
        <div id="product_price_div" th:utext="${product.price}+'CNY'">
          <b>Price</b>
        </div>
        <div id="product_sold_div" th:utext="'Sold '+${product.soldnum}">
          Sold Num
        </div>

        <!-- 2个 功能-->
        <div>
          <!-- 加入购物车-->
          <div id="gotocart_div">
            <a th:href="'/cart/addcart?product_id='+${product.product_id}"><b>Purchase</b></a>
          </div>

          <!-- 收藏 -->
          <div id="collect_div">
            <a th:href="'/collect/addcollect?product_id='+${product.product_id}"><b>Collect</b></a>
          </div>
        </div>
      </div>
      <!-- 商品展示块 -->
      <div class="product_div" th:each="product:${productlist}">
        <a th:href="'/store/productdetail?product_id='+${product.product_id}">
          <img th:src="@{'/image/img_product/'+${product.picture}}" alt="">
        </a>

        <!-- 4个 商品信息-->
        <div id="product_class_div" th:utext="${product.product_class}">
          <b>Product Class</b>
        </div>
        <div id="product_name_div" th:utext="${product.product_name}">
          <b>Product Name</b>
        </div>
        <div id="product_price_div" th:utext="${product.price}+'CNY'">
          <b>Price</b>
        </div>
        <div id="product_sold_div" th:utext="'Sold '+${product.soldnum}">
          Sold Num
        </div>

        <!-- 2个 功能-->
        <div>
          <!-- 加入购物车-->
          <div id="gotocart_div">
            <a th:href="'/cart/addcart?product_id='+${product.product_id}"><b>Purchase</b></a>
          </div>

          <!-- 收藏 -->
          <div id="collect_div">
            <a th:href="'/collect/addcollect?product_id='+${product.product_id}"><b>Collect</b></a>
          </div>
        </div>
      </div>
      <!-- 商品展示块 -->
      <div class="product_div" th:each="product:${productlist}">
        <a th:href="'/store/productdetail?product_id='+${product.product_id}">
          <img th:src="@{'/image/img_product/'+${product.picture}}" alt="">
        </a>

        <!-- 4个 商品信息-->
        <div id="product_class_div" th:utext="${product.product_class}">
          <b>Product Class</b>
        </div>
        <div id="product_name_div" th:utext="${product.product_name}">
          <b>Product Name</b>
        </div>
        <div id="product_price_div" th:utext="${product.price}+'CNY'">
          <b>Price</b>
        </div>
        <div id="product_sold_div" th:utext="'Sold '+${product.soldnum}">
          Sold Num
        </div>

        <!-- 2个 功能-->
        <div>
          <!-- 加入购物车-->
          <div id="gotocart_div">
            <a th:href="'/cart/addcart?product_id='+${product.product_id}"><b>Purchase</b></a>
          </div>

          <!-- 收藏 -->
          <div id="collect_div">
            <a th:href="'/collect/addcollect?product_id='+${product.product_id}"><b>Collect</b></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- js -->
<script>
export default {
    mounted() {
        
    }
}
</script>

<style lang="scss" scoped>
* {
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
}
body{
    width: 100%;
    min-width: 1200px;
}

td {
    font-family: frutiger sans-serif;
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
.order_div {
    position: fixed;
    width: 420px;
    height: auto;

    left: 60px;
    bottom: 0;

    background-color: #ffffff;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.4);
    border-radius: 20px 20px 0 0;
    text-align: center;

    table[id="order_content"] {
        width: 390px;
        margin: 0 15px;
        border-collapse: collapse;
        tr {
            height: 40px;
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

            &[id="order_topic"] {
                border: none;
                td {
                    height: 50px;
                    font: {
                        size: 24px;
                        weight: bold;
                    }
                    color: $blue-color;
                }
            }

            &[id="order_item"] {
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

            &[id="order_count"] {
                border: none;
                td {
                    height: 50px;
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

    //border: #160A0A solid 1px;

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

            font-size:15px;
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
            // 功能键: 加入购物车
            #gotocart_div{
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
            // 功能键: 收藏
            #collect_div{
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