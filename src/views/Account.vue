<template>
  <div>
    <!-- toast 提示框 -->
    <div
      class="toast my-toast"
      data-bs-delay="1500"
    >
      <div class="toast-body">
        <div class="alert alert-success info-box">
          操作成功
        </div>
      </div>
    </div>

    <!-- 核心内容区域 -->
    <div class="container">
      <!-- 左边页面：账户信息 -->
      <div class="content">
        <!-- 头像 -->
        <div class="avatar_div">
          <p class="ava_title">
            头像
          </p>
          <img
            class="prew"
            src="@/image/img_bg/Asuka.jpg"
            alt=""
          >

          <p
            for="upload"
            class="change_p"
          >
            更换头像
          </p>
          <input
            id="upload"
            type="file"
            class="upload"
          >
        </div>

        <!-- 昵称 -->
        <div class="information_div">
          <p for="nickname">
            昵称
          </p>
          <input
            id="nickname"
            name="nickname"
            class="nickname"
            type="text"
            placeholder="请输入昵称"
            autocomplete="off"
          >
        </div>

        <!-- 邮箱 -->
        <div class="information_div">
          <p for="email">
            邮箱
          </p>
          <input
            id="email"
            name="email"
            class="email"
            type="text"
            placeholder="请输入邮箱"
            autocomplete="off"
          >
        </div>

        <!-- 性别 -->
        <div class="information_div">
          <p>性别</p>
          <p>
            <input
              type="radio"
              name="gender"
              class="gender"
              value="0"
            >男
          </p>
          <p>
            <input
              type="radio"
              name="gender"
              class="gender"
              value="1"
            >女
          </p>
        </div>

        <!-- 签名 -->
        <div class="information_div">
          <p for="desc">
            签名
          </p>
          <textarea
            id="desc"
            name="desc"
            class="desc"
            placeholder="请输入个人简介"
            cols="20"
            rows="10"
            autocomplete="off"
          />
        </div>

        <!-- 按钮：保存 -->
        <button class="submit">
          提交
        </button>
      </div>

      <!-- 右边页面：设置 -->
      <div class="content">
        <div class="active">
          <a href="">基本设置</a>
        </div>
        <div><a href="">安全设置</a></div>
        <div>账号绑定</div>
        <div>新消息通知</div>
      </div>
    </div>
  </div>
</template>

<script>
import 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
import '/js/form-serialize.js'
import axios from "axios";

export default {
    mounted() {
        /*
        目标1：信息渲染
         1.1 获取用户的数据
         1.2 回显数据到标签上
        */

        const creator = '提丰'

        // 1.1 获取用户的数据
        axios({
            url: 'https://hmajax.itheima.net/api/settings',
            // 省略 get 请求方法
            params: {
                creator: creator
            }
        }).then(result => {
            console.log(result)
            const userObj = result.data.data

            // 1.2 回显数据到标签上
            // Object.keys() 方法: 遍历属性
            Object.keys(userObj).forEach(key => {
                if (key === 'avatar') {
                    // 赋予默认头像
                    document.querySelector('.prew').src = userObj[key]
                } else if (key === 'gender') {
                    // 赋予默认性别
                    // 获取性别单选框：[男radio元素，女radio元素]
                    // 单选框的选择与 value 无关，而与 checked = "true/false" 有关
                    const gRadioList = document.querySelectorAll('.gender')  // 伪数组: 0男，1女
                    const gNum = userObj[key]
                    // 性别数字 恰好可以作为 gRadioList伪数组的 下标
                    gRadioList[gNum].checked = true
                } else {
                    // 赋予默认内容
                    document.querySelector(`.${key}`).value = userObj[key]
                }
            })
            console.log(userObj)
        })


        /*
        目标2：修改头像
        2.1 获取头像文件
        2.2 提交服务器并更新头像
        */

        // 给 文件选择元素 绑定 change 事件
        document.querySelector('.upload').addEventListener('change', e => {
            // 2.1 获取头像文件
            console.log(e.target.files[0])  // 只有一张图片

            const fd = new FormData()
            fd.append('avatar', e.target.files[0])
            fd.append('creator', creator)
            console.log(fd)
            
            // 2.2 提交服务器并更新头像
            axios({
                url: 'https://hmajax.itheima.net/api/avatar',
                method: 'PUT',
                data: fd
            }).then(result => {
                // 把新的头像回显到页面上
                document.querySelector('.prew').src = result.data.data.avatar
            })
        })


        /*
        *  目标3：提交表单
        *  3.1 收集表单信息
        *  3.2 提交到服务器保存
        */
        /*
        *  目标4：结果提示
        *  4.1 创建toast对象
        *  4.2 调用show方法->显示提示框
        */

        // 保存修改->点击
        document.querySelector('.submit').addEventListener('click', () => {

            // 3.1 收集表单信息
            const userForm = document.querySelector('.user-form')
            const userObj = serialize(userForm, { hash: true, empty: true })
            // console.log(userObj)

            userObj.creator = creator

            // 性别数字字符串，转成数字类型，文档要求传 int 类型
            userObj.gender = +userObj.gender
            console.log(userObj)

            // 3.2 提交到服务器保存
            axios({
                url: 'https://hmajax.itheima.net/api/settings',
                method: 'PUT',
                data: userObj
            }).then(result => {

                // 4.1 创建toast对象
                const toastDom = document.querySelector('.my-toast')
                const toast = new bootstrap.Toast(toastDom)

                // 4.2 调用show方法->显示提示框
                toast.show()
            })
        })
    }
}
</script>