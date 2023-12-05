<template>
  <!-- 网页主要内容 -->
  <div class="sign_container">
    <div class="sign_div">
      <!-- 右边-登录盒子 -->
      <div class="sign_in_div">
        <p>SIGN IN</p>

        <!-- 账号 -->
        <div class="div_cell">
          <img
            src="@/image/icon/icons8-account-48.png"
            alt=""
          >
          <input
            id="username"
            type="text"
            name="email"
            placeholder="E-mail"
          >
        </div>
        
        <!-- 密码 -->
        <div class="div_cell">
          <img
            src="@/image/icon/icons8-password-30.png"
            alt=""
          >
          <input
            type="password"
            name="password"
            placeholder="password"
          >
        </div>

        <!-- 跳转: 注册 -->
        <div class="sign_switch">
          <a href="">Sign up</a>
        </div>

        <!-- 登录按钮 -->
        <div class="sign_button">
          <input
            class="sign_button"
            type="submit"
            name="s"
            value="SIGN IN"
          >
        </div>

        <!-- 警告 -->
        <div class="warn_cell">
          <p class="warn_p" />
        </div>
      </div>
            
      <!-- 左边-注册盒子 -->
      <div class="sign_up_div">
        <p>SIGN UP</p>

        <!-- 账号 -->
        <div class="div_cell">
          <img
            src="@/image/icon/icons8-account-48.png"
            alt=""
          >
          <input
            id="username"
            type="text"
            name="email"
            placeholder="E-mail"
          >
        </div>
                
        <!-- 密码 -->
        <div class="div_cell">
          <img
            src="@/image/icon/icons8-password-30.png"
            alt=""
          >
          <input
            type="password"
            name="password"
            placeholder="password"
          >
        </div>

        <!-- 确认密码 -->
        <div class="div_cell">
          <img
            src="@/image/icon/icons8-password-30.png"
            alt=""
          >
          <input
            type="password"
            name="password"
            placeholder="confirm password"
          >
        </div>
        
        <!-- 跳转: 登录 -->
        <div class="sign_switch">
          <a href="">Sign in</a>
        </div>
                
        <!-- 注册按钮 -->
        <div class="sign_button">
          <input
            class="sign_button"
            type="submit"
            name="s"
            value="SIGN UP"
          >
        </div>

        <!-- 警告 -->
        <div class="warn_cell">
          <p class="warn_p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}
body {
}

p {
    margin-block: 0;
}

/* 总栏 */
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: Center;

    margin-top: 140px;

    background-color: #eeeeee;
    box-shadow: 2px 2px 2px #bdbdbd;
}

/* 左右分栏 */
.content {
    height: 100%;
    width: 560px;

    padding-top: 20px;
    padding-left: 40px;

    background-color: #ffffff;

    float: left;

    /* 头像 */
    .avatar_div {
        width: 120px;
        height: 160px;

        text-align: center;

        .ava_title {
            width: 120px;
            height: 30px;
        }
        .prew {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin-bottom: 15px;
        }
        #upload {
            display: none;
        }
    }
    .change_p {
        width: 100px;
        height: 30px;
        transition: all .3s;
        box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
        cursor: pointer;
        font-size: 16px;
        border-radius: 2px;
        color: rgba(0, 0, 0, .85);
        border: 1px solid #d9d9d9;
        text-align: center;
        line-height: 30px;

        &:hover {
            color: #40a9ff;
            border-color: #40a9ff;
            background: #fff;
        }
    }

    /* 其他信息 */
    .information_div {
        float: left;

        width: 600px;
        height: 60px;

        margin-bottom: 20px;

        text-align: left;

        p {
            display: inline-flex;
            align-items: center;
        }

    }
    input[type=radio] {
        width: 30px;
        height: 20px;

        border-radius: 10px;
        border: 2px solid #D4D4D4;

        &:checked {
            border-radius: 50%;
            border-color: #f84f52;
            background-color: #f84f52;
            /* background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e"); */
        }
    }
    input:not([type=radio]), textarea {
        display: block;
        width: 330px;
        outline: none;
        font-size: 16px;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        transition: all .3s;
        padding-left: 5px;

        height: 30px;
        appearance: none;
    }
    input:focus, textarea:focus {
        border-color: #31384f;
        border-right-width: 1px;
        z-index: 1;

        box-shadow: 0 0 0 2px rgba(49, 56 ,79, 0.2);
        outline: 0;
    }
    button.submit {
        background: #4D8FF7;
        width: 78px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 0;
        font-weight: 500;
        border: none;
        cursor: pointer;
    }
}
.toast {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);

    .toast-body {
        padding: 0 !important;
    }

    .alert-success {
        margin-bottom: 0 !important;
    }
}
</style>