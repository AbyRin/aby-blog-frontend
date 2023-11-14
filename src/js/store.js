// 商店页面-功能模块: 电梯
// 功能一: 页面滑动-显示/隐藏 (1)搜索栏; (2)电梯
// 功能二: 点击 Top: 页面顶部
(function () {
    // 功能一: 页面滑动-显示/隐藏 (1)搜索栏; (2)电梯
    // 获取元素
    const search = document.querySelector('.search_div')  // (1)搜索栏
    // const elevator = document.querySelector('.elevator')  // (2)电梯

    // 1. 卷去html头部 到达 商品搜索条-顶部坐标 时，就显示 电梯导航
    // 已改变方案

    // 2. 卷去html头部 到达 商品搜索条-顶部坐标 时, 令 商品搜索条 的top = 0
    window.addEventListener('scroll', function () {
        // if (document.documentElement.scrollTop >= search.offsetTop) {
        //     search.style.top = 0
        // }
        // console.log(search.style.position)
        search.style.top = document.documentElement.scrollTop >= search.offsetTop ? 0 : '-100px'
    })

    // 功能二: 点击 Top: 页面顶部
    const backTop = document.querySelector('#backTop')
    if (backTop) {
        backTop.addEventListener('click', function () {
          window.scrollTo(0, 0);
        });
    }
})();

// 功能三: 点击分类 跳转到 对应页面 (与功能四相对)
(function () {
    const list = document.querySelector('.elevator_list')
    if (list) {
        list.addEventListener('click', function (e) {
            if (e.target.tagName === 'A' && e.target.dataset.name) {
    
                // 排他
                const old = document.querySelector('.elevator_list .active')
                if (old) {old.classList.remove('active')}
                e.target.classList.add('active')
    
                // 获得自定义属性  new   topic 
                // console.log(e.target.dataset.name)
                // 根据小盒子的自定义属性值 去选择 对应的大盒子
    
                // Bug，等待修复
                const top = document.querySelector(`.${e.target.dataset.name}`).offsetTop
                // 让页面滚动到对应的位置
                document.documentElement.scrollTop = top
            }
        })
    }
})();


// 功能四: 滑动页面 跳转到 对应分类 (与功能三相对)
window.addEventListener('scroll', function () {
    // 排他
    const old = document.querySelector('.elevator_list .active')
    if (old) {old.classList.remove('active')}

    // 判断页面当前滑动的位置, 选择小盒子
    // 获取分类 class 和 页面滑动像素 n
    const class_1 = document.querySelector('.elevator_list li a[data-name = "class_1"]').dataset.name
    const class_2 = document.querySelector('.elevator_list li a[data-name = "class_2"]').dataset.name
    const class_3 = document.querySelector('.elevator_list li a[data-name = "class_3"]').dataset.name
    const class_4 = document.querySelector('.elevator_list li a[data-name = "class_4"]').dataset.name
    const n = document.documentElement.scrollTop

    // 匹配
    if (n >= class_1.offsetTop && n < class_2.offsetTop) {
        document.querySelector('[data-name = class_1]').classList.add('active')
    } else if (n >= class_2.offsetTop && n < class_3.offsetTop) {
        document.querySelector('[data-name = class_2]').classList.add('active')
    } else if (n >= class_3.offsetTop && n < class_4.offsetTop) {
        document.querySelector('[data-name = class_3]').classList.add('active')
    } else if (n >= class_4.offsetTop) {
        document.querySelector('[data-name = class_4]').classList.add('active')
    }
});