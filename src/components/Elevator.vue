<template>
  <!-- 电梯 -->
  <div class="elevator">
    <ul class="elevator_list">
      <li class="sea">
        <a href="javascript:">Acidic Sea</a>
      </li>
      <li class="sea">
        <a href="javascript:">Alkaline Sea</a>
      </li>
      
      <li>
        <a href="javascript:" data-name="wb3">World Bubble Ⅲ</a>
      </li>
      <li>
        <a href="javascript:" data-name="wb4">World Bubble Ⅳ</a>
      </li>
      <li>
        <a
          href="javascript:"
          data-name="wb5"
        >World Bubble Ⅴ</a>
      </li>
      <li>
        <a
          href="javascript:"
          data-name="wb6"
        >World Bubble Ⅵ</a>
      </li>
      
      <li>
        <a
          id="backTop"
          href="javascript:"
        >Top</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    mounted() {
        // 图书馆页面-功能模块: 电梯
    
        // 功一二: 点击 Top: 页面顶部
        (function () {
            // 功能一: 点击 Top: 页面顶部
            const backTop = document.querySelector('#backTop')
            backTop.addEventListener('click', function () {
                window.scrollTo(0, 0)
            })
        })();
    
        // 功能二: 点击分类 跳转到 对应页面 (与功能三相对)
        (function () {
            // 获取对象
            const list = document.querySelector('.elevator_list')
            const topCon = document.querySelector('.top_container')  // 用于：减去 top 高度
      
            // 绑定点击事件
            list.addEventListener('click', function (e) {
                // 判断: 点击a标签 且 标签含有自定义类名name --> 真
                // Tip: target事件 - 返回触发事件的元素
                if (e.target.tagName === 'A' && e.target.dataset.name) {
          
                    // 先移除已有的 active类
                    // 尝试获取已有 active类 的对象 ...
                    const old = document.querySelector('.elevator_list .active')
                    // ... 如果已有, 就移除类
                    if (old) {old.classList.remove('active')}
          
                    // 当前元素添加 active 
                    e.target.classList.add('active')
          
                    // 获得对应 分类区 的 offsetTop，减去top导航栏的高度，就是最后指定卷到的高度
                    // console.log(`[data-wbdivname = "${e.target.dataset.name}"]`)
                    // 测试用
                    // console.log(document.querySelector(`[data-wbdivname = "${e.target.dataset.name}"]`).offsetTop)
                    // console.log(topCon.clientHeight)
                    // console.log(targetTop)
          
                    // 让页面滚动到对应的位置
                    document.documentElement.scrollTop =  document.querySelector(`[data-wbdivname = "${e.target.dataset.name}"]`).offsetTop - topCon.clientHeight
                }
            })
        })();
    
    
        // 功能三: 滑动页面 跳转到 对应分类 (与功能二相对)
        window.addEventListener('scroll', function () {
            const topCon2 = document.querySelector('.top_container')  // 用于：减去 top 高度
      
            // 1. 先移除已有的 active类
            // 尝试获取已有 active类 的对象 ...
            const old = document.querySelector('.elevator_list .active')
            // ... 如果已有, 就移除类
            if (old) {old.classList.remove('active')}
      
            // 2. 判断页面当前滑动的位置, 选择小盒子
            // 获取分类class 和 页面滑动像素n
            const wb3 = document.querySelector('.elevator_list li a[data-name = "wb3"]')
            const wb4 = document.querySelector('.elevator_list li a[data-name = "wb4"]')
            const wb5 = document.querySelector('.elevator_list li a[data-name = "wb5"]')
            const wb6 = document.querySelector('.elevator_list li a[data-name = "wb6"]')
      
            const wbdiv3 = document.querySelector(`[data-wbdivname = "wb3"]`)
            const wbdiv4 = document.querySelector(`[data-wbdivname = "wb4"]`)
            const wbdiv5 = document.querySelector(`[data-wbdivname = "wb5"]`)
            const wbdiv6 = document.querySelector(`[data-wbdivname = "wb6"]`)
      
            const n = document.documentElement.scrollTop
      
            if (wbdiv3 && wbdiv4 && wbdiv5 && wbdiv6) {
                // 3. 匹配
                // 获得对应 分类区 的 offsetTop，减去top导航栏的高度，就是最后指定卷到的高度
                if (n >= wbdiv3.offsetTop - topCon2.clientHeight && n < wbdiv4.offsetTop - topCon2.clientHeight) {
                    wb3.classList.add('active')
                } else if (n >= wbdiv4.offsetTop - topCon2.clientHeight && n < wbdiv5.offsetTop - topCon2.clientHeight) {
                    wb4.classList.add('active')
                } else if (n >= wbdiv5.offsetTop - topCon2.clientHeight && n < wbdiv6.offsetTop - topCon2.clientHeight) {
                    wb5.classList.add('active')
                } else if (n >= wbdiv6.offsetTop - topCon2.clientHeight) {
                    wb6.classList.add('active')
                }
            }
        })
    }
};
</script>


<style>
.elevator {
  position: fixed;
  width: 160px;
  height: auto;
  
  left: 50%;
  margin-left: 620px;
  top: 320px;
  z-index: 100;
  
  /* (已修改方案) */
  /* 初始隐藏电梯，页面向下滑动时伴随 书籍搜索条 出现 */
  /* opacity: 0; */
  
  text-align: center;
  transition: all .5s;
}

/* 分类 */
.elevator .elevator_list {
  /* position: relative; */
  
  width: 160px;
  height: auto;
  
  background: #fff;
  
  margin: 0;
  padding: 0;
  
  box-shadow: 5px 5px 5px #bdbdbd;
}
/* 海 */
.elevator .elevator_list li[class = 'sea'] {
  width: auto;
  height: 50px;
  line-height: 50px;
  
  border: 1px solid #dcdcdc;
  margin: 0;
  
  list-style-type: none;
  background-color: #31384f;
}

.elevator .elevator_list li[class = 'sea'] a {
  display: block;
  
  width: auto;
  height: 50px;
  
  text-decoration: none;
  
  color: #ffffff;
}
/* 世界泡 */
.elevator .elevator_list li {
  width: auto;
  height: 50px;
  line-height: 50px;
  
  border: 1px solid #dcdcdc;
  margin: 0;
  
  list-style-type: none;
}

.elevator .elevator_list li a {
  display: block;
  
  width: auto;
  height: 50px;
  
  text-decoration: none;
  
  color: #31384f;
  transition: all .5s;
}

.elevator .elevator_list li a:hover {
  background-color: #f84f52;
  color: #ffffff;
}

.elevator .elevator_list li a i {
  position: relative;
  
  display: block;
  
  width: 16px;
  height: 16px;
  
  left: 4px
;
  background-position: 8px -106px;
  
  font-size: 20px;
  transform: rotate(-90deg);
}
</style>
