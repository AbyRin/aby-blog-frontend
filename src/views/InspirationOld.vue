<template>
  <div>
    <!-- 网页主要内容 -->
    <div class="container">
      <!-- 图瀑布 -->
      <div id="fall_div" class="fall_div" />
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
    mounted() {
        const fallDiv = document.getElementById('fall_div');
        const columnCount = window.innerWidth * 1.5 <= window.screen.width ? 2 : 3;

        // 爬虫图片路径
        function loadImagesFromDirectory(directoryPath) {
            const imagePaths = [];
            for (let i = 1; i <= 20; i++) {
                const imagePath = `${directoryPath + i}.png`;
                imagePaths.push(imagePath);
            }
            populateColumns(imagePaths);
        }

        // 渲染列和图片
        function populateColumns(imagePaths) {
            // 创建瀑布列
            for (let i = 0; i < columnCount; i++) {
                const column = document.createElement('column');
                column.classList.add('column');
                if (fallDiv) {
                    fallDiv.appendChild(column);
                }
            }

            // 渲染
            imagePaths.forEach((imagePath, index) => {
                const column = fallDiv.children[index % columnCount];

                // 创建：image_div
                const imageDiv = document.createElement('div');
                imageDiv.classList.add('image_div');
                imageDiv.style.boxShadow = '2px 2px 2px #bdbdbd';
                column.appendChild(imageDiv);

                // 创建：图片
                const image = document.createElement('img');
                image.src = imagePath;
                image.alt = `Image ${index + 1}`;
                // 图片加载失败时隐藏
                image.onerror = function () {
                    imageDiv.style.display = 'none';
                };
                imageDiv.appendChild(image);

                // 创建：按钮组 image_buttons
                const imageButtons = document.createElement('div');
                imageButtons.classList.add('image_buttons');
                imageDiv.appendChild(imageButtons);

                // 创建：按钮 image_button
                for (let j = 1; j <= 3; j++) {
                    const button = document.createElement('div');
                    button.classList.add('image_button');

                    button.id = `btn${j}`;
                    button.style.display = 'flex';
                    button.style.justifyContent = 'center';
                    button.style.alignItems = 'center';

                    // 创建：按钮图标 img
                    let imgSrc = '';
                    if (j === 1) {
                        imgSrc = '@/image/icon/icons8-heart-50-gray.png';
                    } else if (j === 2) {
                        imgSrc = '@/image/icon/icons8-bookmark-60-gray.png';
                    } else {
                        imgSrc = '@/image/icon/icons8-download-48-gray.png';
                    }

                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.style.maxWidth = '24px';
                    img.alt = '';

                    button.appendChild(img);
                    imageButtons.appendChild(button);
                }
            }); // 完成渲染

            // 遍历每个 image_buttons 并为其中的按钮绑定事件处理程序
            function handleButtonHover(event) {
                const button = event.currentTarget;
                const img = button.querySelector('img');
                const btnId = button.id;

                if (event.type === 'mouseover') {
                    if (btnId === 'btn1') {
                        img.src = '@/image/icon/icons8-heart-50-color.png';
                        button.style.borderRadius = '50px';
                    } else if (btnId === 'btn2') {
                        img.src = '@/image/icon/icons8-bookmark-60-color.png';
                        button.style.borderRadius = '50px';
                    } else {
                        img.src = '@/image/icon/icons8-download-48-color.png';
                        button.style.borderRadius = '50px';
                    }
                } else if (event.type === 'mouseout') {
                    if (btnId === 'btn1') {
                        img.src = '@/image/icon/icons8-heart-50-gray.png';
                        button.style.borderRadius = '10px';
                    } else if (btnId === 'btn2') {
                        img.src = '@/image/icon/icons8-bookmark-60-gray.png';
                        button.style.borderRadius = '10px';
                    } else {
                        img.src = '@/image/icon/icons8-download-48-gray.png';
                        button.style.borderRadius = '10px';
                    }
                }
            }

            // 获取所有 image_button 并 绑定事件
            const allImageButtons = document.querySelectorAll('.image_button');

            allImageButtons.forEach((button) => {
                button.addEventListener('mouseover', handleButtonHover);
                button.addEventListener('mouseout', handleButtonHover);
            });
        }
        // 调用
        loadImagesFromDirectory('/image/reptile_image/');

        // 功能: 页面resize时刷新
        // 启用节流
        function throttle(fn, t) {
            let timer = null;
            return function () {
                if (!timer) {
                    timer = setTimeout(() => {
                        fn();
                        // 清空定时器
                        timer = null;
                    }, t);
                }
            };
        }
        // 主函数
        // 注意: 为了保证刷新的流畅, 浏览器要启用缓存
        function refreshOnResize() {
            location.reload();
        }
        window.addEventListener('resize', throttle(refreshOnResize, 500));

        // 电梯：backTop键
        document.addEventListener('DOMContentLoaded', () => {
            (function () {
                const backTop = document.querySelector('#backTop');
                const img = backTop.querySelector('img');
                // 修改样式
                backTop.addEventListener('mouseover', () => {
                    img.src = '@//image/icon/icons8-top-100-white.png';
                });
                backTop.addEventListener('mouseout', () => {
                    img.src = '@//image/icon/icons8-top-100-gray.png';
                });
                // backTop功能
                backTop.addEventListener('click', () => {
                    window.scrollTo(0, 0);
                });
            }());
        });
    },
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
    align-items: Center;

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

        img {
            width: 400px;
            height: auto;

            margin: 0;
            padding: 0;

            /* 唤醒遮罩 */
            &::before {
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
            &:hover::before {
                opacity: 1;
            }
        }

        /* 按钮组 */
        .image_buttons {
            display: flex;
            flex-direction: column;
            position: absolute;

            right: 5px;
            bottom: 5px;
            z-index: 100;

            opacity: 0;
            transition: opacity 0.3s;

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

                &:hover {
                    background-color: rgba(255, 255, 255);
                }
            }
        }
        /* 唤醒按钮 */
        &:hover .image_buttons {
            opacity: 1;
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
