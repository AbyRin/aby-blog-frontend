<template>
    <!-- 顶部 -->
    <div class="top" th:insert="/top.html"></div>

    <!-- 侧边栏 -->
    <div th:insert="/sidebar.html"></div>

    <!-- 网页主要内容 -->
    <div class="container">
        <!-- 图瀑布 -->
        <div class="fall_div" id="fall_div">
        </div>
    </div>

    <!-- 功能: 电梯 -->
    <div class="elevator">
        <ul class="elevator_list">
            <li id="backTop"><img src="@/image/icon/icons8-top-100-gray.png" alt=""></li>
        </ul>
    </div>

    <!-- 底部 -->
    <div class="bottom" th:insert="/bottom.html"></div>
</template>

<script>
import '@/js/inspiration.js'
export default {

};
</script>

<style scoped>
* {
    scroll-behavior: smooth;
}
body{
    display: flex;
    flex-direction: column;

    height: 100%;
    background: #ffffff;
}

p {
    margin-block: 0;
}

.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: Center;

    margin-top: 148px;

    /* background-color: #ffffff; */
    /* box-shadow: 2px 2px 2px #bdbdbd; */
}

/* 图瀑布 —————————————————————————————————————————————————— */
.fall_div {
    display: flex;
    gap: 20px;
}

.column {
    flex: 1;
}

.image_div {
    width: 400px;
    height: auto;

    margin: 20px 0;
    padding: 0;
    position: relative;
}

.image_div img {
    width: 400px;
    height: auto;

    margin: 0;
    padding: 0;
}
/* 唤醒遮罩 */
.image_div::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    box-shadow: 0 -50px 50px -30px rgba(0, 0, 0, 0.7) inset,
                0 50px 50px -30px rgba(0, 0, 0, 0.7) inset;
    opacity: 0;
    transition: opacity 0.3s;
}

.image_div:hover::before {
    opacity: 1;
}

.image_buttons {
    display: flex;
    flex-direction: column;
    position: absolute;

    right: 5px;
    bottom: 5px;
    z-index: 100;

    opacity: 0;
    transition: opacity 0.3s;
}
/* 唤醒按钮 */
.image_div:hover .image_buttons {
    opacity: 1;
}

.image_button {
    width: 40px;
    height: 40px;
    border-radius: 10px;

    margin-bottom: 8px;
    background-color: rgba(255, 255, 255, 0.9);

    text-align: center;
    line-height: 40px;
    cursor: pointer;
    transition: border-radius 0.3s;
}
.image_button:hover {
    background-color: rgba(255, 255, 255);
}

/* 渐变遮罩 */
.focus_div {
    display: flex;
    position: absolute;

    left: 0;
    top: 0;

    width: 400px;
    height: 100%;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);

    /* z-index: 99; */
}

/* 功能: 电梯 */
.elevator {
    position: fixed;
    width: 100px;
    height: auto;

    left: 52%;
    margin-left: 620px;
    bottom: 40px;
    z-index: 100;

    text-align: center;
    transition: all .5s;
}
.elevator .elevator_list {
    width: 100px;
    height: auto;

    background: #fff;

    margin: 0;
    padding: 0;

    box-shadow: 5px 5px 5px #bdbdbd;
}
.elevator .elevator_list li {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100px;
    height: 50px;
    line-height: 50px;

    border: 1px solid #dcdcdc;
    margin: 0;

    list-style-type: none;
    cursor: pointer;
}

.elevator .elevator_list li img {
    width: 60px;
}

.elevator .elevator_list li:hover {
    background-color: #f84f52;
}
</style>