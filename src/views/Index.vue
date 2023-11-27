<template>
  <div>
    <div class="container">
      <!-- 三角符 -->
      <div class="triangle" />

      <!-- 简介 -->
      <div class="introduce_div">
        <p>Welcome to AbyBlog!</p>
        <p>This showcases my hobbies and ideas.</p>
        <p>You are also welcome to leave messages and discuss with me!（＾∀＾）ﾉ</p>
      </div>
    </div>

    <!-- 分块_1 -->
    <div class="box_1">
      <div class="circle_1">
        <a>Index</a>
      </div>
      <div class="word_div_1">
        <p>
          I referenced the styles of Soviet constructivism and functionalism that I am interested in and designed a webpage with a space theme.
          I don't have a deep understanding, I just like this sense of design.
        </p>
        <p>In addition, I also want to add a bit of retro futurism, but let's talk about it later.</p>
      </div>
    </div>

    <!-- 分块_2 -->
    <div class="box_2">
      <div class="word_div_2">
        <p>
          It records some strange thoughts and fictional stories of myself.
          If I write the story completely like JK Rowling, I wonder if I can publish it?
        </p>
        <p>Actually, I would prefer to make it into a simple visual novel or game.</p>
      </div>
      <div class="circle_2">
        <a>Library</a>
      </div>
    </div>

    <!-- 分块_3 -->
    <div class="box_3">
      <div class="circle_3">
        <a>Store</a>
      </div>
      <div class="word_div_3">
        <p>The work is for sale and is very reasonable. In order to sell myself, I will set the price very user-friendly.</p>
        <p>My own paintings, handicrafts, maybe I can share second-hand comics as well?</p>
      </div>
    </div>

    <!-- 分块_4 -->
    <div class="box_4">
      <div class="word_div_4">
        <p>As a generation of 'internet natives', I can't say I enjoy instant and efficient online chatting, so I have placed a message board here.</p>
        <p>If you have anything you want to share with me, just write it down!</p>
      </div>
      <div class="circle_4">
        <a>Forum</a>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
<style scoped>
* {
    margin: 0;
}
body{
    background: #eeeeee;

    position: absolute;

    left: 57%;
    transform: translate(-50%);
}

p, a {
    font-family: Arial, sans-serif;
}

.container {
    width: 1000px;
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: Center;
}

.triangle {
    width: 0;
    height: 0;
    border-top: 45px solid #f84f52;
    border-right: 30px solid transparent;
    border-left: 30px solid transparent;

    margin-top: 20px;
}

/* 主页欢迎字画部分 */
.introduce_div {
    float: left;
    text-align: center;

    width: 1000px;
    height: 140px;

    margin-top: 80px;
}
.introduce_div p{
    font-size: 18px;
    font-weight: bolder;
    color: #f84f52;
}

/* 功能介绍分块 */
/* 废弃设计
.square_1 {
    width: 1600px;
    height: 120px;

    display: flex;
    flex-direction: column;

    margin-top: 600px;
}
.img_div {
    width: 120px;
    height: 120px;

    float: left;
}
.square img{
    width: 120px;
}
.word_div {
    width: 880px;
    height: 120px;

    float: left;
}
.word_div p{
    color: #160A0A;
}
*/
/* 分块1 */
.box_1 {
    width: 1200px;
    height: 180px;

    display: flex;

    margin-top: 40px;
}
.circle_1 {
    width: 180px;
    height: 180px;
    border-radius: 50%;

    text-align: center;
    line-height: 180px;

    float: left;
    margin-left: 0;

    background-color: #31384f;
}
.circle_1 a{
    font-size: 40px;
    font-weight: 20;

    color: white;

    text-decoration: none;
}
.word_div_1 {
    width: 725px;
    height: 180px;

    float: left;

    margin-left: 40px;
}
.word_div_1 p{
    font-size: 18px;
    font-weight: bolder;

    color: #160A0A;
    text-decoration: none;

    margin-top: 40px;
}

/* 分块2 */
.box_2 {
    width: 1200px;
    height: 180px;

    display: flex;

    float: left;
    margin: 40px 0 30px 40px;
}
.circle_2 {
    width: 180px;
    height: 180px;
    border-radius: 50%;

    text-align: center;
    line-height: 180px;

    float: right;
    margin-right: 0;

    background-color: #fec738;
}
.circle_2 a{
    font-size: 40px;
    font-weight: 20;

    color: white;

    text-decoration: none;
}
.word_div_2 {
    width: 735px;
    height: 180px;

    float: right;

    margin-right: 40px;
}
.word_div_2 p{
    font-size: 18px;
    font-weight: bolder;

    color: #160A0A;
    text-decoration: none;

    margin-top: 40px;
    margin-right: 0;
}

/* 分块3 */
.box_3 {
    width: 1200px;
    height: 180px;

    display: flex;

    margin-top: 80px;
}
.circle_3 {
    width: 180px;
    height: 180px;
    border-radius: 50%;

    text-align: center;
    line-height: 180px;

    float: left;
    margin-left: 0;

    background-color: #f84f52;
}
.circle_3 a{
    font-size: 40px;
    font-weight: 20;

    color: white;

    text-decoration: none;
}
.word_div_3 {
    width: 725px;
    height: 180px;

    float: left;

    margin-left: 40px;
}
.word_div_3 p{
    font-size: 18px;
    font-weight: bolder;

    color: #160A0A;
    text-decoration: none;

    margin-top: 40px;
}

/* 分块4 */
.box_4 {
    width: 1200px;
    height: 180px;

    display: flex;

    float: left;
    margin: 40px 0 50px 40px;
}
.circle_4 {
    width: 180px;
    height: 180px;
    border-radius: 50%;

    text-align: center;
    line-height: 180px;

    float: right;
    margin-right: 0;

    background-color: #706e6f;
}
.circle_4 a{
    font-size: 40px;
    font-weight: 20;

    color: white;

    text-decoration: none;
}
.word_div_4 {
    width: 735px;
    height: 180px;

    float: right;

    margin-right: 40px;
}
.word_div_4 p{
    font-size: 18px;
    font-weight: bolder;

    color: #160A0A;
    text-decoration: none;

    margin-top: 40px;
    margin-right: 0;
}
</style>