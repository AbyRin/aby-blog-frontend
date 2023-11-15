<template>
    <div>
        <!-- （2）话题展示 -->
        <div class="forum_container">
            <!-- 话题块 -->
            <div class="forum_div">
                <!-- 左边区: 头像、关注功能 -->
                <div class="forum_left">
                    <!-- 头像 -->
                    <div class="user_photo">
                        <img src="@/image/img_bg/user.jpg" alt="">
                    </div>
                    <!-- 用户名 -->
                    <div class="user_name">
                        <p class="user_name">Aby_VoV</p>
                    </div>
                    <!-- 功能键：关注-->
                    <div class="forum_follow">
                        <a><b>Follow</b></a>
                    </div>
                </div>

                <!-- 右边区: 话题框、功能键（点赞、收藏、回复） -->
                <div class="forum_right">
                    <!-- 话题框 -->
                    <div class="forum_content"></div>
                    <!-- 功能键 -->
                    <div class="forum_function_div">
                        <!-- 点赞功能 -->
                        <div class="function_button">
                            <img src="@/image/icon/icons8-heart-50.png" alt="">
                            <a>Like</a>
                        </div>
                        <!-- 收藏功能 -->
                        <div class="function_button">
                            <img src="@/image/icon/icons8-bookmark-50.png" alt="">
                            <a>Collect</a>
                        </div>
                        <!-- 回复功能 -->
                        <div class="function_button">
                            <img src="@/image/icon/icons8-forum-50.png" alt="">
                            <a>Reply</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
/* （2）话题展示部分 ------------------------------------------------------------------------- */
.forum_container{
    width: 1600px;
    height: auto;

    //background-color: #ffffff;
}

/* 话题块 */
.forum_div{
    width: 600px;
    height: 320px;

    margin: 20px;

    background-color: #ffffff;
    box-shadow: 5px 5px 5px #bdbdbd;
}

/* 左边区 ---------------------------------- */
.forum_left {
    float: left;

    width: 140px;
    height: 320px;

    background-color: #31384f;
}

/* 头像 与 昵称 */
.user_photo {
    width: 100px;
    height: 100px;

    margin: 20px;

    /* background-color: #a8b5e0; */
    text-align: center;
}
.user_photo img{
    height: 100px;

    border-radius: 50%;
}
.user_name {
    text-align: center;
}
.user_name p{
    font-size: 18px;
    font-weight: bold;
    color: #eeeeee;
}
/* 功能键: 关注 */
.forum_follow {
    float: left;

    width: 100px;
    height: 36px;

    background-color: #2c9c92;
    border-radius: 20px;

    text-align: center;
    line-height: 36px;
    font-size: 16px;
    font-weight: bold;
    color: #eeeeee;

    margin-top: 24px;
    margin-left: 20px;
    cursor: pointer;
}

/* 右边区 ----------------------------------- */
.forum_right {
    float: left;

    width: 460px;
    height: 320px;
}

/* 话题框 */
.forum_content{
    width: 460px;
    height: 280px;
    background-color: #ffffff;
}

/* 功能区 ---------------------------------- */
.forum_function_div {
    width: 460px;
    height: 40px;
    background-color: #ffffff;
    backdrop-filter: blur(50px);
}
/* box-shadow: 水平阴影位置, 垂直阴影的位置, 模糊距离, 阴影的大小, 阴影的颜色, 内侧阴影 */

/* 功能键 */
.function_button {
    display: inline-block;
    width: auto;
    height: 36px;
    border-radius: 4px;
    margin: 0 0 4px 4px;

    padding: 0 20px;

    color: #878a8c;

    line-height: 36px;
    cursor: pointer;

    transition: background-color 0.3s;
}
.function_button:hover {
    background-color: #E8E8E8;
}
.function_button a {
    vertical-align: middle;
    height:36px;

    font-size: 16px;
    font-weight: 200;
    color:#666666;
    text-decoration: none;
}
.function_button img {
    vertical-align: middle;
    height: 24px;
}
</style>