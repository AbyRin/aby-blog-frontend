<template>
  <div>
    <!-- 网页主要内容 -->
    <div class="container">
      <!-- 图瀑布 -->
      <div id="fall_div" class="fall_div">
        <div class="column">
          <div class="image_div">
            <!-- <img src="" alt=""> -->
            <img src="@/image/reptile_image/1.png" alt="">
            <div class="image_buttons">
              <div id="btn1" class="image_button">
                <img :src="require(`@/image/icon/icons8-heart-50-gray.png`)" alt="">
              </div>
              <div id="btn2" class="image_button">
                <img :src="require(`@/image/icon/icons8-bookmark-60-gray.png`)" alt="">
              </div>
              <div id="btn3" class="image_button">
                <img :src="require(`@/image/icon/icons8-download-48-gray.png`)" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 侧边栏 -->
    <SideBar />

    <el-backtop id="el_back_top" target=".container" :right="100" :bottom="30">
      <div class="el_style">
        ▲
      </div>
    </el-backtop>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';

export default {
    components: {
        SideBar,
    },
    data() {
        return {

        }
    },
    mounted() {
        const handleButtonHover = (event) => {
            const button = event.currentTarget;
            const img = button.querySelector('.image_button img');
            const btnId = button.id;

            if (event.type === 'mouseover') {
                if (btnId === 'btn1') {
                    img.src = require('@/image/icon/icons8-heart-50-color.png');
                    button.style.borderRadius = '50px';
                } else if (btnId === 'btn2') {
                    img.src = require('@/image/icon/icons8-bookmark-60-color.png');
                    button.style.borderRadius = '50px';
                } else {
                    img.src = require('@/image/icon/icons8-download-48-color.png');
                    button.style.borderRadius = '50px';
                }
            } else if (event.type === 'mouseout') {
                if (btnId === 'btn1') {
                    img.src = require('@/image/icon/icons8-heart-50-gray.png');
                    button.style.borderRadius = '10px';
                } else if (btnId === 'btn2') {
                    img.src = require('@/image/icon/icons8-bookmark-60-gray.png');
                    button.style.borderRadius = '10px';
                } else {
                    img.src = require('@/image/icon/icons8-download-48-gray.png');
                    button.style.borderRadius = '10px';
                }
            }
        };

        // 获取所有 image_button 元素并绑定事件
        const allImageButtons = document.querySelectorAll('.image_button');

        allImageButtons.forEach((button) => {
            button.addEventListener('mouseover', handleButtonHover);
            button.addEventListener('mouseout', handleButtonHover);
        });
    }
};
</script>

<style lang="scss" scoped>
* {
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
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
    align-items: center;

    margin-top: 148px;

    /* 图瀑布 */
    .fall_div {
        display: flex;
        gap: 20px;
    }
}

.column {
    flex: 1;

    .image_div {
        width: 400px;
        height: auto;

        margin: 20px 0;
        padding: 0;
        position: relative;

        box-shadow: 2px 2px 2px #bdbdbd;

        /* 唤醒遮罩 */
        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            box-shadow:
                    0 -50px 50px -30px rgba(0, 0, 0, 0.7) inset,
                    0 50px 50px -30px rgba(0, 0, 0, 0.7) inset;
            opacity: 0;
            transition: opacity 0.3s;
        }
        &:hover::before {
            opacity: 1;
        }
        /* 唤醒按钮 */
        &:hover .image_buttons .image_button{
            opacity: 0.7;
        }

        img {
            width: 400px;
            height: auto;

            margin: 0;
            padding: 0;
        }

        /* 按钮组 */
        .image_buttons {
            display: flex;
            flex-direction: column;
            position: absolute;

            right: 5px;
            bottom: 5px;
            z-index: 100;

            transition: opacity 0.3s;

            .image_button {
                display: flex;
                justify-content: center;
                align-items: center;

                width: 40px;
                height: 40px;
                border-radius: 10px;

                margin-bottom: 8px;
                background-color: rgba(255, 255, 255, 0.9);

                text-align: center;
                line-height: 40px;
                cursor: pointer;
                transition: border-radius 0.3s;

                opacity: 0;

                &:hover {
                    background-color: rgba(255, 255, 255);
                    opacity: 1;
                }
                img {
                    max-width: 24px;
                }
            }
        }
    }
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

#el_back_top {
    .el_style {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: white;
        text-align: center;
        line-height: 36px;
        color: $booth-red-color;

        transition: all .2s ease-in-out;
        &:hover {
            background-color: $blue-color;
        }
    }
}
</style>
