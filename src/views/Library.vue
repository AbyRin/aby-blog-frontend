<template>

    <div class="top" th:insert="/top.html"></div>

    <div class="library_container">
        <!-- 海: 原始海/酸性海 -->
        <div class="sea_div">
            <div class="sea_id"><p>原始海/酸性海(Primitive Sea/Acidic Sea)</p></div>

            <!-- 第一世界泡 -->
            <div class="wb_div">
                <div class="wb_id">
                    <p>World Bubble Ⅰ&nbsp;&nbsp;&nbsp;&nbsp;RPG</p>
                    <p>第一世界泡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;角色扮演游戏</p>
                </div>

                <!-- 书籍展示块 -->
                <div class="book_div" th:each="product:${productlist}">
                    <a th:href="'/store/productdetail?library_id='+${product.library_id}">
                        <img style="height: 200px; width: 200px;" th:src="@{'/image/img_product/'+${product.picture}}" alt=""/>
                    </a>
                    <div id="library_class_div" th:utext="${product.library_class}" ><b>World ID</b></div>
                    <div id="library_name_div" th:utext="${product.library_name}" ><b>World Name</b></div>
                </div>
            </div>

            <!-- 第二世界泡 -->
            <div class="wb_div">
                <div class="wb_id">
                    <p>World Bubble Ⅱ&nbsp;&nbsp;&nbsp;&nbsp;Trilogy: Swarm, Plant, Humanoid</p>
                    <p>第二世界泡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;三部曲：节肢、植物、类人</p>
                </div>
                <!-- 书籍展示块 -->
                <div class="book_div" th:each="product:${productlist}">
                    <a th:href="'/store/productdetail?library_id='+${product.library_id}">
                        <img style="height: 200px; width: 200px;" th:src="@{'/image/img_product/'+${product.picture}}" alt=""/>
                    </a>
                    <div id="library_class_div" th:utext="${product.library_class}" ><b>World ID</b></div>
                    <div id="library_name_div" th:utext="${product.library_name}" ><b>World Name</b></div>
                </div>
            </div>
        </div>



        <!-- 海: 演化海/碱性海 -->
        <div class="sea_div">
            <div class="sea_id"><p>演化海/碱性海(Evolutionary Sea/Alkaline Sea)</p></div>

            <!-- 第三世界泡 -->
            <div class="wb_div" data-wbdivname="wb3">
                <div class="wb_id">
                    <p>World Bubble Ⅲ&nbsp;&nbsp;&nbsp;&nbsp;Moth: Trilogy</p>
                    <p>第三世界泡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蠹：三部曲</p>
                </div>
                <!-- 书籍：蠹 -->
                <div class="book_div">
                    <a>
                        <img src="/image/library/moth_1.jpg" alt=""/>
                    </a>
                    <div id="book_class_div"><a>正史</a></div>
                    <div id="book_name_div"><a>蠹：卵</a></div>
                    <div id="update_time_div"><a>最近更新时间</a></div>
                </div>
                <div class="book_div">
                    <a>
                        <img src="/image/library/moth_2.jpg" alt=""/>
                    </a>
                    <div id="book_class_div"><a>正史</a></div>
                    <div id="book_name_div"><a>蠹：蛹</a></div>
                    <div id="update_time_div"><a>最近更新时间</a></div>
                </div>
                <div class="book_div">
                    <a>
                        <img src="/image/library/moth_3.jpg" alt=""/>
                    </a>
                    <div id="book_class_div"><a>正史</a></div>
                    <div id="book_name_div"><a>蠹：死之蛾</a></div>
                    <div id="update_time_div"><a>最近更新时间</a></div>
                </div>
            </div>

            <!-- 第四世界泡 -->
            <div class="wb_div" data-wbdivname="wb4">
                <div class="wb_id">
                    <p>World Bubble Ⅳ&nbsp;&nbsp;&nbsp;&nbsp;deus ex machina</p>
                    <p>第四世界泡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;天工降神</p>
                </div>
                <!-- 书籍：天工降神 -->
                <div class="book_div">
                    <a>
                        <img src="/image/library/machine.jpg" alt=""/>
                    </a>
                    <div id="book_class_div"><a>正史</a></div>
                    <div id="book_name_div"><a>天工降神</a></div>
                    <div id="update_time_div"><a>最近更新时间</a></div>
                </div>
            </div>

            <!-- 第五世界泡 -->
            <div class="wb_div" data-wbdivname="wb5">
                <div class="wb_id">
                    <p>World Bubble Ⅴ&nbsp;&nbsp;&nbsp;&nbsp;Fox Journey</p>
                    <p>第五世界泡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;狐之旅路</p>
                </div>
                <!-- 书籍：狐之旅路 -->
                <div class="book_div">
                    <a>
                        <img src="/image/library/fj_1.jpg" alt=""/>
                    </a>
                    <div id="book_class_div"><a>正史</a></div>
                    <div id="book_name_div"><a>狐之旅路</a></div>
                    <div id="update_time_div"><a>最近更新时间</a></div>
                </div>
            </div>

            <!-- 第六世界泡 -->
            <div class="wb_div" data-wbdivname="wb6">
                <div class="wb_id">
                    <p>World Bubble Ⅵ&nbsp;&nbsp;&nbsp;&nbsp;Pandora</p>
                    <p>第六世界泡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;潘多拉</p>
                </div>
                <!-- 书籍：潘多拉 -->
                <div class="book_div">
                    <a>
                        <img src="/image/library/pdr_1.jpg" alt=""/>
                    </a>
                    <div id="book_class_div"><a>正史-前篇</a></div>
                    <div id="book_name_div"><a>潘多拉</a></div>
                    <div id="update_time_div"><a>最近更新时间</a></div>
                </div>
                <!-- 书籍：潘多拉的遗物 -->
                <div class="book_div">
                    <a>
                        <img src="/image/library/pdr_2.jpg" alt=""/>
                    </a>
                    <div id="book_class_div"><a>正史-后篇</a></div>
                    <div id="book_name_div"><a>后事书：潘多拉的遗物</a></div>
                    <div id="update_time_div"><a>最近更新时间</a></div>
                </div>
                <!-- 书籍：潘多拉的遗物 -->
                <div class="book_div">
                    <a>
                        <img src="/image/library/pdr_3.jpg" alt=""/>
                    </a>
                    <div id="book_class_div"><a>外传</a></div>
                    <div id="book_name_div"><a>潘多拉：正义恶魔</a></div>
                    <div id="update_time_div"><a>最近更新时间</a></div>
                </div>
                <!-- 书籍：潘多拉的遗物 -->
                <div class="book_div">
                    <a>
                        <img src="/image/library/pdr_4.jpg" alt=""/>
                    </a>
                    <div id="book_class_div"><a>外传</a></div>
                    <div id="book_name_div"><a>潘多拉：残酷天使</a></div>
                    <div id="update_time_div"><a>最近更新时间</a></div>
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
    <div th:insert="/bottom.html"></div>
</template>

<script setup>
    import '@/js/library.js'
</script>

<style scoped>
* {
    scroll-behavior: smooth;
    margin: 0;
}
body{
    display: flex;
    flex-direction: column;

    height: 100%;
    background: #dddddd;
}

td {
    font-family: frutiger sans-serif;
}

.library_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: Center;

    margin-top: 148px;
    width: 1200px;

    background-color: #dddddd;
}

/* 海 */
.sea_div {
    width: 1200px;
    height: auto;

    /* background-color: #eeeeee; */
    border-radius:  20px;
    /* box-shadow: 2px 2px 2px #bdbdbd; */

    margin-top: 30px;
}
.sea_id {
    width: 1200px;
    height: 48px;

    background-color: #31384f;
    border-radius:  20px;
    box-shadow: 2px 2px 2px #bdbdbd;
}
.sea_div .sea_id p {
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;

    text-align: center;
    line-height: 48px;

    margin: 0;
}

/* 世界泡 */
.wb_div {
    float: left;
    width: 1200px;
    margin-bottom: 20px;
    border-radius: 20px;
    overflow: hidden;

    background-color: #eeeeee;
    box-shadow: 2px 2px 2px #bdbdbd;
}
.wb_id{
    width: 1200px;
    height: 60px;
    line-height: 26px;

    background-color: #ffffff;
    box-shadow: 1px 1px 1px #bdbdbd;
}
.wb_id p:nth-child(1) {
    font-size: 16px;
    text-indent: 2rem;
    margin-block: 0;
    color: #31384f;
}
.wb_id p:nth-child(2) {
    font-size: 22px;
    font-weight: bold;
    text-indent: 2rem;
    margin-block: 0;
    color: #31384f;
}

/* 书 */
.book_div{
    /* float: left; */

    width:200px;
    height:320px;

    margin-top:15px;
    margin-left:20px;
    margin-bottom: 40px;

    padding: 10px;
    border-radius: 12px;

    display: inline-block;
    background-color: #ffffff;
    box-shadow: 5px 5px 5px #bdbdbd;
}

/* 封面 */
.book_div img{
    height: 200px;
    width: 200px;
    border-radius: 12px;
}

/* 书类 */
#book_class_div{
    width: 200px;
    height: 20px;
    line-height: 20px;
}
#book_class_div a {
    font-size:15px;

    text-align: left;
    color: rgb(078, 157, 169);
}

/* 书名 */
#book_name_div {
    width: 200px;
    height: 30px;
    line-height: 30px;
}
#book_name_div a{
    font-size:18px;
    font-weight: bold;

    /* line-height: 30px; */
    text-align: left;
    color: #31384f;
}

/* 更新时间 */
#update_time_div {
    width: 200px;
    height: 20px;
    line-height: 20px;
}
#update_time_div a{
    font-size:16px;
    
    text-align: right;
    color: #f84f52;
}

/* 功能键: 加入购物车 */
.library_container #gotocart_div{
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
}
#gotocart_div a:hover{
    background-color: #f84f52;
    color: #ffffff;
}

/* 功能键: 收藏 */
.library_container #collect_div{
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