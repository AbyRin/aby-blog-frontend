<template>
  <main>
    <div class="container">
      <!-- 自我介绍部分 -->
      <div class="about_div">
        <!-- 头像 -->
        <div class="photo">
          <img
            src="@/image/img_bg/Asuka.jpg"
            alt=""
          >
          <p class="big_name">
            Aby_VoV
          </p>
        </div>

        <!-- 文字内容 -->
        <div class="introduce_box">
          <table>
            <!-- 第一部分：自我介绍 -->
            <tr>
              <td>
                <p class="title">
                  ■ 自我介绍
                </p>
                <div
                  class="content_div"
                  style="text-align: center;"
                >
                  <p class="content">
                    你好，这里是Aby，一个热衷于胡思乱想，并偶尔致力于将其付诸实现的人。
                  </p>
                  <p class="content">
                    我喜欢画图、电影、旅行，或者科幻、复古、哥特......一切能与我的电波对上的东西。
                  </p>
                  <p class="content">
                    我的大学专业是IT，最终确定的方向是<span>前端开发</span>，这是为了弥补自己没有成为画师的遗憾。
                  </p>
                  <p class="content">
                    你现在所在的，就是我运用所学知识为自己制作的网页，一个博客、一个推销自己「大作」的商店、一个图书馆——怎样都好！
                  </p>
                  <p class="content">
                    愿你在这里能挖掘到感兴趣的东西！
                  </p>
                </div>
              </td>
            </tr>
            <!-- 第二部分：职业技能 -->
            <tr>
              <td>
                <p class="title">
                  ■ 职业技能
                </p>
                <div class="content_div">
                  <!-- JavaWeb开发 -->
                  <p class="title_2">
                    1. Web开发
                  </p>
                  <p class="content">
                    熟悉 HTML、CSS、JavaScript 三件套。
                  </p>
                  <p class="content">
                    掌握 Ajax请求，SQL Plus、Axure等工具。
                  </p>
                  <p class="content">
                    此外，也对后端 <span>Spring Boot</span> 框架有所学习，能够独立制作Web项目。
                  </p>
                  <!-- SQL -->
                  <p class="title_2">
                    2. SQL
                  </p>
                  <p class="content">
                    熟悉数据库、表、记录的基本操作。
                  </p>
                  <p class="content">
                    掌握MySQL常见存储引擎，事务机制，常用约束，常用关键字，连表操作，子查询，PyMySQL，视图表，严格模式。
                  </p>
                  <!-- 其他 -->
                  <p class="title_2">
                    3. 其他
                  </p>
                  <p class="content">
                    英语水平：CET-4。
                  </p>
                  <p class="content">
                    熟练使用Office/WPS等办公软件。
                  </p>
                  <p class="content">
                    拥有美术设计基础，熟练使用Sai2等设计软件。
                  </p>
                </div>
              </td>
            </tr>
            <!-- 第三部分：自我评价 -->
            <tr>
              <td>
                <p class="title">
                  ■ 自我评价
                </p>
                <div class="content_div">
                  <p class="title_2">
                    1. 领导能力
                  </p>
                  <p class="content">
                    具有良好的组织能力和团队合作精神，善于<span>分配与协调工作</span>，让每个人都发挥作用。
                  </p>
                  <p class="content">
                    同时以身作则，吃苦耐劳，带领团队完成任务。
                  </p>
                  <p class="title_2">
                    2. 执行力
                  </p>
                  <p class="content">
                    在领导团队以外，也能在接到任务后积极发挥<span>主观能动性</span>，负责起自己的工作。
                  </p>
                  <p class="title_2">
                    3. 自我更新
                  </p>
                  <p class="content">
                    热衷于尝试新兴事物，具有<span>学习和追赶</span>能力。（如Web框架的更新迭代）
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script></script>

<style lang="scss" scoped>
body{
  background: #dddddd;
}

p {
  font-family: frutiger sans-serif;
}

/* 总盒子 */
.container {
    margin-top: 104px;
    background-color: #eeeeee;

    box-shadow: 2px 2px 2px #bdbdbd;

    .about_div {
        width: 1200px;
        height: 100%;

        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: Center;

        background-color: #ffffff;

        /* 头像 */
        .photo {
            width: 1200px;
            height: 300px;

            background-color: #31384f;
            text-align: center;

            img{
                height: 200px;
                margin-top: 36px;

                border-radius: 50%;
            }
            .big_name {
                font-size: 24px;
                font-weight: bold;
                color: #ffffff;

                margin-top: 8px;
            }
        }

        /* 文字内容 */
        .introduce_box {
            width: 1160px;
            height: 100%;

            margin: 8px 20px 0 20px;

            background-color: white;

            font-size: 20px;

            table {
                table-layout: fixed;
                width: 1160px;

                /* tr 间距 */
                border-collapse: separate;
                border-spacing: 20px;

                tr{
                    border-radius: 30px;
                    box-shadow:
                            inset -2px -2px 4px rgba(255, 255, 255, .9),
                            inset 2px 2px 4px rgba(0, 0, 0, .4);
                    margin-block: 10px;

                    td {
                        .content_div {
                            margin-left: 20px;
                        }
                        /* 一级标题 */
                        .title {
                            font-family: frutiger sans-serif;
                            font-size: 24px;
                            font-weight: bold;
                            text-indent: 18px;
                            color: #bd0707;

                            width: 1200px;
                            height: 50px;
                            margin-top: 10px;
                        }
                        /* 二级标题 */
                        .title_2 {
                            font-family: frutiger sans-serif;
                            font-size: 18px;
                            font-weight: bold;
                            color: #000000;

                            width: 1200px;
                            height: 30px;
                        }
                        /* 文本 */
                        .content{
                            font-family: frutiger sans-serif;
                            font-size: 16px;
                            font-weight: bold;
                            color: #31384f;

                            text-indent:2em;
                            //line-height: 18px;

                            margin-bottom: 10px;
                        }
                        p {
                            span{
                                color: #f84f52
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>