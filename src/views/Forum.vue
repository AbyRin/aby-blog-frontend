<template>
  <div>
    <!-- 大模块（一）：话题区 -->
    <div class="container">
      <!-- （1）话题筛选条 -->
      <div class="topic_div">
        <!-- 话题开关 -->
        <div class="filter_div">
          <div class="filter">
            Series
          </div>
          <div class="filter">
            Neutral
          </div>
          <div class="filter">
            Humorous
          </div>
        </div>
      </div>

      <div class="comment_div">
        <ForumContainer />
        <ForumContainer />
        <ForumContainer />
      </div>
    </div>

    <!-- 大模块（二）：评论区 -->
    <div class="comment_container">
      <!-- 子区1：切换按钮：显示/隐藏 -->
      <div class="toggle_bar">
        <img
          src="@/image/icon/icons8-triangle-96-up-white.png"
          alt=""
        >
      </div>
            
      <!-- 子区2：文本 -->
      <div class="text_bar">
        <!-- 文本框 -->
        <div class="wrapper">
          <textarea
            id="text"
            name=""
            placeholder="各抒己见——"
            maxlength="400"
          />
          <button>发布</button>
        </div>
                
        <!-- 字数统计 -->
        <div class="wrapper">
          <span class="total">0/400字</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ForumContainer from "@/components/ForumContainer.vue";
export default {
    components: {
        ForumContainer,
    },

    mounted() {
        document.addEventListener('DOMContentLoaded', function() {
            // 遍历所有 filter 并 绑定事件
            const allFilters = document.querySelectorAll(".filter");
            let clickedFilter = null;

            allFilters.forEach(filter => {
                filter.addEventListener('mouseover', function() {
                    if (filter !== clickedFilter) {
                        filter.style.backgroundColor = '#E8E8E8';
                    }
                });

                filter.addEventListener('mouseout', function() {
                    if (filter !== clickedFilter) {
                        filter.style.backgroundColor = '#ffffff';
                    }
                });

                filter.addEventListener('click', function() {
                    if (clickedFilter) {
                        // 移除上一个点击的 filter 样式
                        // clickedFilter.style.fontWeight = 'normal';
                        clickedFilter.style.color = '#31384f';
                        clickedFilter.style.backgroundColor = '#ffffff';
                    }
                    // 添加样式到点击的 filter
                    // filter.style.fontWeight = 'bold';
                    filter.style.color = '#ffffff';
                    filter.style.backgroundColor = '#4e9da9';

                    // 更新 clickedFilter
                    clickedFilter = filter;
                });
            });


            // 子区1：切换按钮：显示/隐藏
            // const commentContainer = document.querySelector("comment_container");
            // const toggle = document.querySelector("toggle_bar");

            // let isHidden = true; // 初始时隐藏

            // toggle.addEventListener("click", () => {
            // if (isHidden) {
            //     commentContainer.style.bottom = "20px"; // 点击显示
            // } else {
            //     commentContainer.style.bottom = "0px"; // 点击隐藏
            // }
            // isHidden = !isHidden; // 切换状态
            // });

            // 子区2：文本  
            const text = document.getElementById('text');
            const total = document.querySelector('.total');

            if (text) {
                // 文本域获得焦点时, total 显示
                text.addEventListener('focus', function() {
                    total.style.opacity = 1;
                })
                // 文本域失去焦点时，total 隐藏
                text.addEventListener('blur', function() {
                    total.style.opacity = 0;
                })
                // 字数统计
                text.addEventListener('input', function() {
                    // console.log(text.value.length);
                    total.innerHTML = `${text.value.length}/400字`;
                })
            }

            // 动态调整textarea的高度以适应内容
            const textArea = document.getElementById("text");
            const textBar = document.querySelector(".text_bar");
            const commentContainer = document.querySelector(".comment_container");
            
            if (textArea) {
                textArea.addEventListener("input", () => {
                    textArea.style.height = "auto"; // 重置高度
                    textArea.style.height = (textArea.scrollHeight) + "px"; // 设置高度为内容的实际高度
                    
                    // textArea达到最大高度，textBar和commentContainer高度不再随之变化
                    const maxHeight = 128;
                    if (textArea.scrollHeight <= maxHeight) {
                        textBar.style.height = (textArea.scrollHeight + 18) + "px"; // 适当调整text_bar的高度
                        commentContainer.style.height = (textArea.scrollHeight + 92) + "px"; // 调整comment_container的高度
                    } else {
                        textBar.style.height = (maxHeight + 18) + "px";
                        commentContainer.style.height = (maxHeight + 92) + "px";
                    }
                });
            }
            

            // // 仅在按下 回车键时 发布评论（使用结构: list）
            // text.addEventListener('keyup', function(e) {
            //     if (e.key === 'Enter') {
            //         // 若用户输入不为空，就显示和打印
            //         if (text.value.trim() !== '') {
            //         // if (text.value.trim()) {  //另一种写法
            //             item.style.display = 'block';
            //             text.innerHTML = text.value;  // 用户输入内容
            //         }
            //         // 按下回车键，清空文本域
            //         text.value = ''  // Tip: trim()方法，去除字符串前后的空格
            //         // 按下回车后，字符统计复原
            //         total.innerHTML = '0/400字'
            //     }
            // })
        });
    }
}
</script>

<style lang="scss" scoped>
body{
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: Center;

    background: #dddddd;
}

td {
    font-family: frutiger sans-serif;
}

/* 大模块（一）：话题区 */
.container{
    display: flex;
    flex-direction: column;

    margin-top: 148px;

    background-color: #dddddd;
    box-shadow: 2px 2px 2px #bdbdbd;
}


/* （1）话题筛选条 ------------------------------------------------------------------------- */
.topic_div{
    display: flex;
    justify-content: center;
    align-items: center;

    width: 1600px;
    height: 60px;

    background-color: #31384f;
}

/* 话题筛选分支 */
.filter_div {
    display: flex;

    width: auto;
    height: 40px;

    background-color: #ffffff;
    border-radius: 20px;
}
.filter_div .filter {
    width: auto;
    height: 40px;

    padding: 0 20px;
    border-radius: 20px;

    line-height: 40px;
    transition: all 0.3s;
    cursor: pointer;

    font-weight: bold;
    color: #31384f;
}

.comment_div {
    width: auto;
    height: auto;

    background-color: #eeeeee;
}

/* 大模块（二）： 评论功能 */
.comment_container {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 1200px;
    height: auto;

    transition: bottom 0.3s;

    /* 初始状态：隐藏于视口底部 */
    position: fixed;
    bottom: 0;
    /* bottom: -300px; */
}
/* 子区1：切换按钮：显示/隐藏 */
.toggle_bar {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 140px;
    height: 36px;
    border: none;
    border-radius: 10px 10px 0 0;

    background-color: #2c9c92;
    cursor: pointer;
    
    color: #ffffff;
    font-size: 18px;
}
.toggle_bar img {
    height: 22px;
}
/* 子区2：文本 */
.text_bar {
    width: 1200px;
    padding: 20px 0;
    border: none;
    border-radius: 10px 10px 0 0;
    
    background-color: #2c9c92;
    /* 注意：transition 导致闪光，效果不好 */
    /* transition: all 0.3s; */
    overflow: hidden;
}
/* 文本框 */
.wrapper {
    display: flex;
    justify-content: center;
    width: 1200px;

    transition: all 0.5s;
}
.wrapper textarea {
    width: 1000px;
    height: auto;
    max-height: 110px; /* 最大高度 */
    padding: 10px;

    border: none;
    border-radius: 4px;

    font-size: 16px;
    
    background: #f5f5f5;
    transition: all 0.5s;
    outline: none;
    resize: none;
    overflow-y: auto;

    /* 添加以下两行 */
    transition-property: height, max-height;
    transition-timing-function: ease;
    
}
/* 发布按钮 */
.wrapper button {
    width: 70px;
    height: 50px;
    margin-left: 10px;

    border: none;
    border-radius: 4px;

    background-color: #31384f;
    cursor: pointer;
    transition: all 0.3s;

    color: #fff;
    font-size: 16px;
}
.wrapper button:hover {
    font-weight: bold;
    background-color: #f84f52;
}
/* 字数统计 */
.wrapper .total {
    margin-left: 880px;
    color: #ffffff;

    margin-top: 4px;
    opacity: 0;
    transition: all 0.5s;
}
</style>