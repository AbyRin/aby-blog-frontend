<template>
    <div class="top" th:insert="/top.html"></div>

    <!-- 网页主要内容 -->
    <div class="container">
        <!-- 商品搜索条部分 -->
        <div class="search_div">
            <form method="post" action="">

                <!-- 按商品名搜索 -->
                <span class="input_span">Name
                    <input type="text" name="product_name" />
                </span>

                <!-- 按商品分类搜索 -->
                <span class="input_span">Class
                    <select name="product_class" class="product_class">
                        <option value="">All</option>
                        <option th:each="product_class:${product_classes}" th:value="${product_class}" th:text="${product_class}"></option>
                    </select>
                </span>

                <!-- 按价格区间搜索 -->
                <span class="input_span">Price Range
                    <input type="text" name="minprice"/> ~ <input type="text" name="maxprice" />
                </span>

                <input type="submit" value="Search">
            </form>
        </div>

        <!-- 商品部分 -->
        <div class="product_container">

            <!-- 商品展示块 -->
            <div class="product_div" th:each="product:${productlist}">
                <a th:href="'/store/productdetail?product_id='+${product.product_id}">
                    <img th:src="@{'/image/img_product/'+${product.picture}}" alt=""/>
                </a>
                <div id="product_class_div" th:utext="${product.product_class}" ><b>Product Class</b></div>
                <div id="product_name_div" th:utext="${product.product_name}" ><b>Product Name</b></div>
                <div id="product_price_div" th:utext="${product.price}+'CNY'" ><b>Price</b></div>
                <div id="product_sold_div" th:utext="'Sold '+${product.soldnum}">Sold Num</div>
                <div>
                    <!-- 加入购物车功能-->
                    <div id="gotocart_div">
                        <a th:href="'/cart/addcart?product_id='+${product.product_id}"><b>Purchase</b></a>
                    </div>

                    <!-- 收藏功能 -->
                    <div id="collect_div">
                        <a th:href="'/collect/addcollect?product_id='+${product.product_id}"><b>Collect</b></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 功能: 电梯 -->
    <div class="elevator">
        <ul class="elevator_list">
            <li class="sea"><a href="javascript:">Acidic Sea</a></li>
            <li class="sea"><a href="javascript:">Alkaline Sea</a></li>

            <li><a href="javascript:" data-name="wb3">World Bubble Ⅲ</a></li>
            <li><a href="javascript:" data-name="wb4">World Bubble Ⅳ</a></li>
            <li><a href="javascript:" data-name="wb5">World Bubble Ⅴ</a></li>
            <li><a href="javascript:" data-name="wb6">World Bubble Ⅵ</a></li>
            
            <li><a href="javascript:" id="backTop">Top</a></li>
        </ul>
    </div>

    <!-- 底部 -->
    <div class="bottom" th:insert="/bottom.html"></div>
</template>

<!-- js -->
<script>
    import '@/js/store.js';

    export default {
    }
</script>

<!-- <script type="text/javascript" src="/js/store.js"></script> -->

<!-- 测试用 -->
<!-- <script>
    console.log(document.querySelector('.class_1'))
    
    const ele = document.querySelector('.elevator_list li a')
    console.log(ele.dataset.name)

    const ele_2 = document.querySelector('.elevator_list a[data-name = "class_2"]')
    console.log(ele_2.dataset.name)
</script> -->

<!-- <script>
    const search = document.querySelector('.search_div')
    const n = document.documentElement.scrollTop 
    console.log(search.style)

    获取html滚动像素
    console.log('html滚动像素为' + document.documentElement.scrollTop)

    console.log(search.offsetTop)
</script> -->

<!-- <script>
    const a = document.querySelector('#backTop')
    console.log(a)
</script> -->

<style scoped>
* {
    scroll-behavior: smooth;
    margin: 0;
}
body{
    /*
    background-size: cover;
    background: url("../image/background/bg_black hole.jpg") no-repeat fixed;
    */
    display: flex;
    flex-direction: column;

    height: 100%;
    background: #dddddd;
}

td {
    font-family: frutiger sans-serif;
}

.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: Center;

    margin-top: 148px;

    background-color: #eeeeee;
    box-shadow: 2px 2px 2px #bdbdbd;
}

/* 商品搜索条部分 */
.container .search_div{
    z-index: 100;

    width: 1200px;
    height: 40px;

    float: left;

    color: #ffffff;
    font-weight: bold;

    background-color: #31384f;

    line-height: 40px;

    padding: 0;
}
.container .search_div form{
    width: 1200px;
}
.container .search_div .input_span{
    height: 40px;
    margin: 0 0 0 40px;
}

.container .search_div .input_span .product_class {
    width: 90px;
    height: 26px;
}

.container .search_div input[type=text]{
    border: 2px solid #D4D4D4;
    width: 60px;
    height: 20px;

    border-radius: 20px;
    text-indent: 4px;
    outline: none;

    transition: width .3s;
}
.container .search_div input[name=product_name]:focus{
    width: 160px;
}

.container .search_div input[name=name], .container .search_div input[name=category]{
    width:120px;
}
.container .search_div input[name=minprice], .container .search_div input[name=maxprice]{
    width:60px;
}
.container .search_div input[type=submit]{
    border-style:none;
    width:64px;
    height:30px;
    cursor: pointer;

    color: #ffffff;
    background-color: #f84f52;

    margin-left: 40px;

    text-align: center;
    font-size: 16px;
    font-weight: bold;
}

/* 商品展示部分 */
.product_container{
    float: left;

    width: 1000px;

    margin-top: 20px;
}
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
    box-shadow: 5px 5px 5px #bdbdbd;
}

/*
.product_container .prod_div:nth-child(5),.product_container .prod_div:nth-child(10),
.product_container .prod_div:nth-child(15),.product_container .prod_div:nth-child(20),
.product_container .prod_div:nth-child(25),.product_container .prod_div:nth-child(30),
.product_container .prod_div:nth-child(35),.product_container .prod_div:nth-child(40),
.product_container .prod_div:nth-child(45),.product_container .prod_div:nth-child(50){
    margin-right:0;
}
*/

.product_container .product_div img{
    height: 200px;
    width: 200px;
}
.product_container #product_class_div{
    width: 200px;
    height: 15px;

    font-size:15px;
    text-align: left;
    color: rgb(078, 157, 169);
}
.product_container #product_name_div{
    width: 200px;
    height: 28px;

    margin-top: 5px;

    font-size:20px;
    text-align: left;
    color: #31384f;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.product_container #product_price_div{
    width: 100px;
    height: 18px;

    font-size:18px;
    margin-top:10px;
    text-align: left;
    color: #f84f52;

    float: left;
}
.product_container #product_sold_div{
    width: 100px;
    height: 18px;

    font-size:18px;
    margin-top:10px;
    text-align: right;
    color: #fec738;

    float: right;
}

/* 功能键: 加入购物车 */
.product_container #gotocart_div{
    float:left;

    width:100px;
    height:30px;

    margin-top:15px;
    text-align: center;
    line-height:30px;
    border-top: 1px solid #666666;
}
#gotocart_div a{
    display: block;

    width:100px;
    height:30px;

    color:#666666;
    text-decoration: none;
    transition: color .2s;
}
#gotocart_div a:hover{
    background-color: #f84f52;
    color: #ffffff;
}

/* 功能键: 收藏 */
.product_container #collect_div{
    float:left;

    width:100px;
    height:30px;

    margin-top:15px;
    text-align: center;
    line-height:30px;
    border-top: 1px solid #666666;

}
#collect_div a{
    display: block;

    width:100px;
    height:30px;

    color:#666666;
    text-decoration: none;
    transition: color .2s;
}
#collect_div a:hover{
    background-color: #f84f52;
    color: #ffffff;
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
}

/* 分类 */
.elevator .elevator_list {
    /* position: relative; */

    width: 160px;
    height: auto;

    background: #fff;

    margin: 0;
    padding: 0;

    box-shadow: 5px 5px 5px #bdbdbd;
}
/* 海 */
.elevator .elevator_list li[class = 'sea'] {
    width: auto;
    height: 50px;
    line-height: 50px;

    border: 1px solid #dcdcdc;
    margin: 0;

    list-style-type: none;
    background-color: #31384f;
}

.elevator .elevator_list li[class = 'sea'] a {
    display: block;

    width: auto;
    height: 50px;

    text-decoration: none;

    color: #ffffff;
}
/* 世界泡 */
.elevator .elevator_list li {
    width: auto;
    height: 50px;
    line-height: 50px;

    border: 1px solid #dcdcdc;
    margin: 0;

    list-style-type: none;
}

.elevator .elevator_list li a {
    display: block;

    width: auto;
    height: 50px;

    text-decoration: none;

    color: #31384f;
    transition: all .5s;
}

.elevator .elevator_list li a:hover,
.elevator .elevator_list li a.active {
    background-color: #f84f52;
    color: #ffffff;
}

.elevator .elevator_list li a i {
    position: relative;

    display: block;

    width: 16px;
    height: 16px;

    left: 4px
    ;
    background-position: 8px -106px;

    font-size: 20px;
    transform: rotate(-90deg);
}
</style>