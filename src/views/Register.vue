<template>
  <div class="sign_container">
    <div class="sign_div">
      <form>
        <table>
          <tr>
            <td
              class="td_sign_in"
              colspan="3"
            >
              Sign Up
            </td>
          </tr>
          <tr>
            <td class="td_cell">
              Account
            </td>
            <td class="td_cell">
              <input
                type="text"
                name="email"
              >
            </td>
            <td class="td_cell">
              <span
                id="email_msg"
                class="span_warn"
              />
            </td>
          </tr>

          <tr>
            <td class="td_cell">
              Password
            </td>
            <td class="td_cell">
              <input type="password">
            </td>
            <td class="td_cell">
              <span id="passw1_msg" />
            </td>
          </tr>

          <tr>
            <td class="td_cell">
              Confirm Password
            </td>
            <td class="td_cell">
              <input type="password">
            </td>
            <td class="td_cell">
              <span id="passw2_msg" />
            </td>
          </tr>
        </table>

        <div class="sign_button">
          <td colspan="3">
            <input
              type="submit"
              name="s"
              value="注册"
            >
          </td>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
body{
    /*
    background-size: cover;
    background: url("../image/background/bg_black hole.jpg") no-repeat fixed;
    */
    background: #dddddd;
}

p {
    font-family: frutiger sans-serif;
}

/* 底色 */
.sign_container {
    /* background-color: #eeeeee; */

    display: flex;
    flex-direction: column;

    /* justify-content: center; */
    align-items: Center;
    margin-top: 160px;
}

.sign_div {
    width:900px;
    height: 600px;

    border:0;

    background-color: #ffffff;
    border-radius: 20px;

    box-shadow: 3px 3px 3px #bdbdbd;

    /* backdrop-filter: blur(50px); */

    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: Center; */
}

/* 覆盖图 */
.cover {
    position: absolute;
    z-index: 2;

    width: 450px;
    height: 600px;
}
.cover img{
    width: 450px;
    height: 600px;
}

/* 右边-登录盒子 */
.sign_in_div {
    width:450px;
    height: 600px;

    float: right;

    text-align:center;

    /* background-color: rgb(193, 255, 255); */
    border-radius: 0 20px 20px 0;

    display: flex;
    flex-direction: column;

    align-items: Center;
}

/* 左边-注册盒子 */
.sign_up_div {
    width:450px;
    height: 600px;

    float: left;

    text-align:center;

    /* background-color: rgb(255, 193, 193); */
    border-radius: 20px 0 0 20px;
    
    display: flex;
    flex-direction: column;

    align-items: Center;
}

/* 相似部分 */
.sign_up_div p{
    font-size: 30px;
    font-weight: bold;
    
    color: #4e9da9;
}
.sign_in_div p{
    font-size: 30px;
    font-weight: bold;

    color: #f84f52;
}

/* 公共部分 */
.div_cell {
    width: 450px;

    display: flex;
    justify-content: center;
    align-items: center;
    
    margin-bottom: 20px;
}
.div_cell img{
    width: 24px;
    margin: 3px;
    float: left;
}
.div_cell input{
    width: 188px;
    height: 30px;
    border: 1px solid #706e6f;
    border-radius: 30px;
    outline: none;
    padding-left: 12px;

    float: left;
}

/* 跳转: 登录/注册 */
.sign_switch {
    margin-bottom: 20px;
}
.sign_switch a{
    color: #f84f52;
}

/* 按钮: 注册/登录 */
.sign_button input{
    width: 200px;
    height: 40px;

    background-color: #31384f;

    border: none;
    border-radius: 20px;

    text-align: center;
    font-size: 20px;
    color: #ffffff;

    transition: background-color .2s ease-in-out;
    cursor: pointer;
}

.sign_button input:hover{
    background-color: #f84f52;
}

/* 警告 */
.warn_cell {
    width: 300px;
    height: 40px;
    
    margin-top: 40px;

    /* background-color: #4e9da9; */
}
.warn_cell .warn_p {
    color:red;
    text-align: left;
}
</style>