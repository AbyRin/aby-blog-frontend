<template xmlns:th="http://www.w3.org/1999/xhtml">
  <!-- 网页主要内容 -->
  <div class="container">
    <!-- 商品搜索条部分 -->
    <div class="search_div">
      <form method="post" action="">
        <!-- 按商品名搜索 -->
        <span class="input_span">Name
          <input type="text" name="product_name">
        </span>

        <!-- 按商品分类搜索 -->
        <span class="input_span">Class
          <select name="product_class" class="product_class">
            <option value="">All</option>
            <option
              th:each="product_class:${product_classes}"
              th:value="${product_class}"
              th:text="${product_class}"
            />
          </select>
        </span>

        <!-- 按价格区间搜索 -->
        <span class="input_span">Price Range
          <input
            type="text"
            name="minprice"
          > ~ <input
            type="text"
            name="maxprice"
          >
        </span>

        <input
          type="submit"
          value="Search"
        >
      </form>
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

<style scoped lang="scss">
* {
    scroll-behavior: smooth;
    margin: 0;
}
body{
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: Center;

    height: 100%;
    background: $bg-dark-gray-color;
}

td {
    font-family: frutiger sans-serif;
}

.container{
    display: flex;
    flex-direction: column;

    margin-top: 120px;

    background-color: $bg-light-gray-color;
    box-shadow: 2px 2px 2px #bdbdbd;

    /* 商品搜索条部分 */
    .search_div{
        z-index: 100;

        width: 1200px;
        height: 40px;

        float: left;

        color: #ffffff;
        font-weight: bold;

        background-color: $blue-color;

        line-height: 40px;

        padding: 0;

        form{
            width: 1200px;
        }

        .input_span{
            height: 40px;
            margin: 0 0 0 40px;
            .product_class {
                width: 90px;
                height: 26px;
            }
        }

        input[type=text]{
            border: 2px solid #D4D4D4;
            width: 60px;
            height: 20px;

            border-radius: 20px;
            text-indent: 4px;
            outline: none;

            transition: width .3s;
        }
        input[name=product_name]:focus{
            width: 160px;
        }
        input[name=name], .container .search_div input[name=category]{
            width:120px;
        }
        input[name=minprice], .container .search_div input[name=maxprice]{
            width:60px;
        }
        input[type=submit]{
            border-style:none;
            width:64px;
            height:30px;
            cursor: pointer;

            color: #ffffff;
            background-color: $booth-red-color;

            margin-left: 40px;

            text-align: center;
            font-size: 16px;
            font-weight: bold;
        }
    }

    /* 商品展示部分 */
    .product_container{
        float: left;
        width: 1000px;
        margin-top: 20px;

        /* 商品展示块 */
        .product_div{
            /* float: left; */

            width:200px;
            height:320px;

            margin-top:15px;
            margin-left:20px;
            margin-bottom: 40px;

            padding: 10px;

            display: inline-block;
            background-color: #ffffff;
            box-shadow: 5px 5px 10px rgba(0,0,0,0.4);

            transition: all 0.3s;
            &:hover {
                transform: translateY(-3px) scale(1.01,1.01);
                box-shadow:10px 10px 20px rgba(0,0,0,0.3);
            }

            img{
                height: 200px;
                width: 200px;
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