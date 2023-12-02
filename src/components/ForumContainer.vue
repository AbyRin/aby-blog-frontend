<template>
  <div>
    <!-- 话题块 -->
    <div class="forum_div">
      <!-- 用户信息栏 -->
      <div class="forum_left">
        <!-- 头像 -->
        <div class="user_photo">
          <img src="@/image/img_bg/user.jpg" alt="">
          <!-- 功能键：关注-->
          <div class="forum_follow">
            +
          </div>
        </div>
        <!-- 用户名 -->
        <p id="user_name">
          Aby_VoV
        </p>
      </div>

      <!-- 内容 -->
      <div class="forum_content" />

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
</template>

<script setup>

</script>

<style lang="scss" scoped>
$forumW: 800px; // 话题块-总宽
$userW: 100px; // 用户信息栏-宽
$avatarW: 76px; // 头像-宽
$contentW: $forumW - $userW; // 内容-宽
/* 话题块 */
.forum_div{
    width: 800px;
    height: 320px;

    margin-bottom: 20px;

    background-color: #ffffff;
    box-shadow: 5px 5px 5px #bdbdbd;

    border-radius: 10px;

    /* 用户信息栏 */
    .forum_left {
        display: flex;
        flex-direction: column;
        align-items: center;

        width: $userW;
        height: 320px;

        background-color: #31384f;
        box-shadow: 5px 0 5px rgba(0,0,0,0.4);

        text-align: center;

        /* 头像 与 昵称 */
        .user_photo {
            width: $avatarW;
            height: $avatarW;
            margin: 14px;

            img{
                height: $avatarW;
                border-radius: 50%;
            }

            /* 功能键: 关注 */
            $follow: 20px;  // 关注按钮大小
            .forum_follow {
                position: absolute;

                left: 68px;
                top: 70px;

                width: $follow;
                height: $follow;
                border-radius: 50%;

                background-color: #2c9c92;

                text-align: center;
                line-height: 18px;

                font: {
                    size: 16px;
                    weight: bold;
                }
                color: #eeeeee;

                cursor: pointer;
            }
        }
        /* 用户名 */
        p[id="user_name"]{
            margin-top: 4px;
            width: $userW;
            font: {
                size: 16px;
                weight: bold;
            }
            color: #eeeeee;
        }
    }

    /* 内容 */
    .forum_content{
        width: $contentW;
        height: 100px;

        border: #160A0A solid 1px;
    }

    /* 功能键 */
    .forum_function_div {
        display: flex;
        justify-content: right;
        align-items: center;

        width: $contentW;
        height: 40px;
        background-color: #ffffff;
        backdrop-filter: blur(50px);

        .function_button {
            width: auto;
            height: 36px;
            border-radius: 4px;
            margin: 0 0 4px 4px;

            padding: 0 20px;

            color: #878a8c;

            line-height: 36px;
            cursor: pointer;

            transition: background-color 0.3s;

            &:hover {
                background-color: #E8E8E8;
            }

            a {
                vertical-align: middle;
                height:36px;

                font-size: 16px;
                font-weight: 200;
                color:#666666;
                text-decoration: none;

                margin-left: 2px;
            }
            img {
                vertical-align: middle;
                height: 24px;
            }
        }
    }
}
</style>