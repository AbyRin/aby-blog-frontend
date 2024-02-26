<template>
  <div>
    <div class="user_container">
      <p>Log in</p>

      <el-form
        ref="login-form"
        class="login_form"
        :model="user"
        :rules="formRules"
      >
        <!-- 账号 -->
        <el-form-item prop="email">
          <img id="account_icon" src="@/image/icon/icons8-account-48.png" alt="">
          <el-input
            v-model="user.email"
            placeholder="Email"
          />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <img id="lock_icon" src="@/image/icon/icons8-lock-48.png" alt="">
          <el-input
            v-model="user.password"
            placeholder="Password"
            show-password
          />
        </el-form-item>

        <!-- 单选框-用户协议 -->
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">
            我已阅读并同意
            <a @click="openProtocol">
              《用户协议》与《隐私条款》
            </a>
          </el-checkbox>
        </el-form-item>

        <!-- 按钮：登录 -->
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            :loading="loginLoading"
            @click="loginVerify"
          >
            Login
          </el-button>
        </el-form-item>

        <router-link id="sign_toggle" to="/user/signup">
          Sign up
        </router-link>
      </el-form>
    </div>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";

export default {
    data() {
        return {
            // 测试用账户-用户
            user: {
                email: "1001@outlook.com",
                password: "123qwe",
                agree: false,
            },
            // 测试用账户-管理员
            admin: {
                email: "admin@outlook.com",
                password: "admin123",
                agree: false,
            },

            // 登录按钮 loading 状态
            loginLoading: false,

            // 表单验证规则
            formRules: {
                // required：规定表单是否必须填写
                // message：不满足验证规则时的提示信息
                // trigger：change属性-表单项数据改变时验证
                email: [
                    { required: true, message: '请输入账号', trigger: 'change' },
                    { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '请输入正确的账号格式', trigger: 'change' }
                    // 规则：邮箱通用规则
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' },
                    { pattern: /^(?=.*[a-zA-Z])(?=.*\d).{6,15}$/, message: '请输入正确的密码格式', trigger: 'change' }
                    // 规则：至少包含一个字母（大小写不限）、一个数字，字符串长度6~15位
                ],
                agree: [
                    {
                        // 自定义验证规则
                        validator: (rule, value, callback) => {
                            if (value) {
                                // 验证通过
                                callback()
                            } else {
                                // 验证失败
                                callback(new Error('未勾选用户协议'))
                            }
                        },
                        trigger: 'change'
                    }
                ],
            },
        }
    },
    methods: {
        // 表单验证
        loginVerify () {
            this.$refs['login-form'].validate(valid => {
                // 验证失败，停止请求提交
                if (!valid) {
                    return
                }
                // 验证通过，提交登录请求
                this.login()
            })
        },

        // 提交登录请求
        login() {
            this.$http.post("user/login", this.user)
                .then(response => {
                    if (response.data.code === '200') {
                        localStorage.setItem("user", JSON.stringify(response.data.data));
                        this.$message({
                            type: 'success',
                            message: '登录成功'
                        });
                        this.$router.push("/");
                        // console.log(response)  // 测试用
                    } else {
                        this.$message({
                            type: 'error',
                            message: response.data.message
                        });
                        // console.log(response)  // 测试用
                    }
                })
                .catch(error => {
                    console.error('登录请求失败:', error);
                    this.$message({
                        type: 'error',
                        message: '发生错误，登录失败'
                    });
                });
        },

        // 打开用户协议
        openProtocol () {
            ElMessageBox.confirm(
                '这是简略内容。',
                '用户协议与隐私政策提示',
                {
                    confirmButtonText: '同意',
                    cancelButtonText: '不同意',
                    type: '',
                }
            ).then(() => {
                ElMessage({
                    type: 'success',
                    message: '已勾选用户协议',
                })
            }).catch(() => {

            })
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
    height: 400px;
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

            .el-form-item__content {

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
                        a {
                            font: {
                                weight: bold;
                            }
                            &:visited, &:link {
                                color: $blue-color;
                            }
                            &:hover {
                                color: $booth-red-color;
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

            }
        }

        #sign_toggle {
            margin-top: 20px;
            &:visited, &:link, &:hover{
                color: $booth-red-color;
            }
        }
    }
}
</style>