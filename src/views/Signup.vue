<template>
  <div>
    <div class="user_container">
      <p>Sign up</p>

      <el-form>
        <el-form-item prop="account">
          <img id="account_icon" src="@/image/icon/icons8-account-48.png" alt="">
          <el-input
            v-model="user.account"
            placeholder="E-mail"
          />
        </el-form-item>

        <el-form-item prop="password">
          <img id="lock_icon" src="@/image/icon/icons8-lock-48.png" alt="">
          <el-input
            v-model="user.password"
            placeholder="Password"
          />
        </el-form-item>

        <el-form-item prop="password">
          <img id="lock_icon" src="@/image/icon/icons8-lock-48.png" alt="">
          <el-input
            v-model="user.password"
            placeholder="Confirm password"
          />
        </el-form-item>

        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">
            我已阅读并同意用户协议和隐私条款
          </el-checkbox>
        </el-form-item>

        <el-button>
          Sign up
        </el-button>

        <router-link id="sign_toggle" to="/user/login">
          Log in
        </router-link>
      </el-form>

      <!-- 账号 -->
      <!--      <div class="user_cell">-->
      <!--        <img id="account_icon" src="@/image/icon/icons8-account-48.png" alt="">-->
      <!--        <input id="username" type="text" name="email" placeholder="E-mail">-->
      <!--      </div>-->

      <!-- 密码 -->
      <!--      <div class="user_cell">-->
      <!--        <img id="lock_icon" src="@/image/icon/icons8-lock-48.png" alt="">-->
      <!--        <input type="password" name="password" placeholder="password">-->
      <!--      </div>-->

      <!-- 跳转: 注册 -->
      <!--      <div class="user_cell">-->
      <!--        <router-link to="/user/signup">-->
      <!--          Sign up-->
      <!--        </router-link>-->
      <!--      </div>-->

      <!-- 登录按钮 -->
      <!--      <input class="btn_input" type="submit" value="Log in">-->

      <!-- 警告 -->
      <!--      <div class="warn_cell">-->
      <!--        <p class="warn_p" />-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                account: "",
                password: "",
                agree: false,
            },
            formRules: {
                // required：规定表单是否必须填写
                // message：不满足验证规则时的提示信息
                // trigger：change属性-表单项数据改变时验证
                account: [
                    { required: true, message: '请输入账号', trigger: 'change' },
                    { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '请输入正确的账号格式', trigger: 'change' }
                    // 规则：邮箱通用规则
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' },
                    { pattern: /^(?=.*[a-zA-Z])(?=.*\d).{6,9}$/, message: '请输入正确的密码格式', trigger: 'change' }
                    // 规则：至少包含字母、数字，6~9位
                ]
            },
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}

.user_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 600px;
    height: 450px;
    background-color: #ffffff;

    border-radius: 32px;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.4);

    p {
        font: {
            size: 40px;
            weight: bold;
        }
        color: $blue_color;
        margin-bottom: 40px;
    }

    .el-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .el-form-item {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-bottom: 16px;

            width: auto;

            img {
                &[id="account_icon"] {
                    width: 24px;
                }
                &[id="lock_icon"] {
                    width: 22px;
                }
            }

            .el-input {
                width: 200px;
            }

            .el-checkbox {
                .el-checkbox__label {
                    font: {
                        size: 12px;
                    }
                }
            }
        }

        .el-button {
            width: 140px;
            height: 40px;
            margin-top: 10px;

            border: 0;
            border-radius: 20px;
            background-color: $blue-color;

            font: {
                size: 20px;
            }
            text-align: center;
            color: #ffffff;

            transition: all 0.2s ease-in-out;

            &:hover {
                background-color: $booth-green-color;
                width: 200px;
                border-radius: 40px;
            }
        }

        #sign_toggle {
            margin-top: 20px;
            &:visited, &:link, &:hover{
                color: $booth-green-color;
            }
        }
    }
}
</style>