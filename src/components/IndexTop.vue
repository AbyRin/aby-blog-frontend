<template>
    <div class="blue_ring">
        <div class="gray_ring">
            <div class="yellow_ring">
                <div class="top_container">
                    <!-- 功能键 -->
                    <div class="function_div">
                        <a href="/user" style="text-decoration:none;">Account&nbsp;&nbsp;|&nbsp;&nbsp;</a>
                        <a href="/order/showorder" style="text-decoration:none;">Order&nbsp;&nbsp;|&nbsp;&nbsp;</a>
                        <a href="/cart/showcart" style="text-decoration:none;">Cart&nbsp;&nbsp;|&nbsp;&nbsp;</a>
                        <a href="/collect/showcollect" style="text-decoration:none;">Collection&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    </div>

                    <!-- 登入登出 -->
                    <div class="account_div">
                        <div>
                            <a th:if="${session.member}">
                                <a href="/index/toLogout">Sign Out</a>&nbsp;&nbsp;&nbsp;&nbsp;
                                <!-- <a href="/index/toRegister">Sign Up</a>&nbsp;&nbsp;&nbsp;&nbsp; -->
                                <a href="/admin/toAdminLogin">Sign In as Admin</a>&nbsp;&nbsp;&nbsp;&nbsp;
                            </a>
                            <a th:unless="${session.member}">
                                <a href="/index/toLogin">Sign In</a>&nbsp;&nbsp;&nbsp;&nbsp;
                                <!-- <a href="/index/toRegister">Sign Up</a>&nbsp;&nbsp;&nbsp;&nbsp; -->
                                <a href="/admin/toAdminLogin">Sign In as Admin</a>&nbsp;&nbsp;&nbsp;&nbsp;
                            </a>
                        </div>
                    </div>

                    <!-- 欢迎语 -->
                    <div class="welcome_div_1">
                        <a>Welcome to</a>
                    </div>
                    <div class="welcome_div_2">
                        <a>AbyBlog</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 分页栏 -->
        <div class="page_div">
            <div class="page_div_2">
                <a href="/index">Index</a>
            </div>
            <div class="page_div_2">
                <a href="/library">Library</a>
            </div>
            <div class="page_div_2">
                <a href="/store">Store</a>
            </div>
            <div class="page_div_2">
                <a href="/forum">Forum</a>
            </div>
            <div class="page_div_2">
                <a href="/inspiration">Inspiration</a>
            </div>
            <div class="page_div_2">
                <a href="/about">About Aby</a>
            </div>
        </div>
    </div>
</template>

<script>
import '/css/index_top.css'
</script>

<style>
p, a, span {
    font-family: Arial, sans-serif;
}
.blue_ring {
    /* position: fixed;
    top: 0;
    border: 0; */

    background: #31384f;

    width: 1400px;
    height: 700px;
    border-radius: 0 0 700px 700px;
    box-shadow: 5px 5px 5px #ababab;
}
.gray_ring {
    background: #706e6f ;

    width: 1200px;
    height: 600px;
    border-radius: 0 0 600px 600px;
}
.yellow_ring {
    background: #fec738;

    width: 1000px;
    height: 500px;
    border-radius: 0 0 500px 500px;

    float: right;
}

.top_container {
    width: 1000px;
    height: 100px;
}

/* 功能键 */
.function_div {
    float: left;

    width:480px;
    height:40px;

    margin-left: 20px;
}
.function_div a {
    font-size: 15px;
    text-align: center;
    line-height: 40px;

    text-decoration:none;
}
.function_div a:link {
    color: #31384f;
}
.function_div a:hover {
    color: #f84f52;
}
.td_function a:visited {
    color: #31384f;
}
/* 登入登出栏 */
.account_div {
    float: left;

    width: 480px;
    height:40px;

    text-align: right;
    margin-right: 20px;
}
.account_div a {
    font-size: 15px;
    text-align: center;
    line-height: 40px;

    text-decoration:none;
}
.account_div a:link {
    color: #31384f;
}
.account_div a:hover {
    color: #f84f52;
}
.account_div a:visited {
    color: #31384f;
}

/* 欢迎语 */
.welcome_div_1 {
    float: left;

    width: 1000px;
    height:100px;
    text-align: left;

    margin-top: 140px;
}
.welcome_div_1 a {
    text-align: left;
    line-height: 140px;

    color: #FFFFFF;
    font-size: 50px;
    font-weight: bolder;

    margin-left: 320px;

    text-decoration: none;
}
.welcome_div_2 {
    float: left;

    width: 1000px;
    height:100px;

    text-align: center;
}
.welcome_div_2 a {
    text-align: left;
    line-height: 100px;

    color: #31384f;
    font-size: 100px;
    font-weight: bolder;

    margin-left: 30px;

    text-decoration: none;
}
/* 分页栏 */
.page_div {
    float: left;

    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;

    background-color: #ffffff;
    box-shadow: 5px 5px 5px #ababab;

    width: 1400px;
    height: 40px;
    border-radius: 20px;

    align-content: center;

    margin-top: 120px;
}
.page_div_2{
    text-align: center;

    width: auto;
    height: 40px;

    border-radius: 20px;

    padding: 0 20px;
    margin: 10px;
}
.page_div_2:hover{
    box-shadow:
        inset -2px -2px 4px rgba(255, 255, 255, .9),
        inset 2px 2px 4px rgba(0, 0, 0, .4);
        transition: all .3s ease-in-out;
}

.page_div_2 a {
    height: 40px;
    
    color: #160A0A;

    font-weight:bold;
    font-size:20px;
    text-decoration:none;

    text-align: center;
    line-height: 40px;
}

.page_div_2 span {
    height: 40px;
    color: #31384f;

    font-weight:bold;
    font-size:20px;
    text-decoration:none;
}
.page_div_2 span:link {
    color: #31384f;
}
.page_div_2 span:hover {
    color: #f84f52;
}
.page_div_2 span:visited {
    color: #31384f;
}

/*
主题色 1 >
#EAE3CB 乳白色
#160A0A 咖啡黑色
#F05D06 橙色

主题色 2 >
#EEE9D6 乳白色
#160A0A 咖啡黑色
#F9823E 橙色

其他配色 >
#120F11 藏蓝色
*/
</style>