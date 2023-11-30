<template>
  <div class="sidebar">
    <!-- 搜索框 -->
    <div class="sidebar_cell">
      <img id="smileJPG" src="@/image/icon/icons8-search-100.png" alt="">
      <input
        type="text"
        placeholder="Search"
      >
    </div>
    <!-- 目录 -->
    <div class="sidebar_cell">
      <a>设计</a>
    </div>

    <div class="sidebar_cell">
      <a>文化</a>
    </div>

    <div class="sidebar_cell">
      <a>工艺</a>
    </div>

    <div class="sidebar_cell">
      <a>生活</a>
    </div>

    <div class="sidebar_cell">
      <a>时代</a>
    </div>

    <div class="sidebar_cell">
      <a>专题</a>
    </div>
  </div>
</template>

<script>
export default {
    mounted() {
        const sidebar = document.querySelector('.sidebar')

        sidebar.addEventListener('mouseover', function () {
            sidebar.classList.add('long')
        })
        sidebar.addEventListener('mouseleave', function () {
            sidebar.classList.remove('long')
        })
    }
}
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}

/* 总框 */
/* 初始为 收缩状态 的 样式 */
.sidebar {
    position: fixed;

    top: 104px;
    left: 0;

    width: 80px;
    height: 100%;

    text-align: center;

    padding: 10px;
    background-color: #ffffff;
    transition: all 0.3s ease;
    z-index: 100;

    box-shadow: 2px 2px 2px #bdbdbd;

    /* 伸展状态 的 样式 */
    &:hover {
        width: 200px;
    }

    /* 主题 */
    .sidebar_cell {
        display: flex;
        align-items: center;

        height: 40px;
        margin-bottom: 10px;
        border-radius: 8px;

        background-color: #ffffff;
        box-shadow:
                inset -2px -2px 4px rgba(255, 255, 255, .9),
                inset 2px 2px 4px rgba(0, 0, 0, .4);

        list-style: none;
        cursor: pointer;

        img{
            margin-left: 4px;
            height: 24px;
        }
        input {
            width: 100%;
            height: 70%;

            text-indent: 2px;
            outline: none;
            border-radius: 8px;
            border: none;

            transition: width .3s;
            /* box-sizing: border-box; */

            font-size: 14px;
            font-weight: bold;
            color: #31384F;

            &::placeholder {
                font-size: 14px;
                font-weight: bold;
                color: #a5a5a5;
            }
        }
        a {
            width: 100%;
            height: 100%;
            border-radius: 6px;

            color: #31384F;
            font-size: 16px;
            font-weight: bold;
            line-height: 40px;
            text-decoration: none;

            list-style: none;
            transition: all 0.3s ease;

            &:hover {
                background-color: #F84F52;
                color: #ffffff;
            }
        }
    }
}
</style >