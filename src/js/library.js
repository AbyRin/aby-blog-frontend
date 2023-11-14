// 图书馆页面-功能模块: 电梯
// 功能一: 点击 Top: 页面顶部
(function () {
    // 功能一: 点击 Top: 页面顶部
    const backTop = document.querySelector('#backTop')
    if (backTop) {
        backTop.addEventListener('click', function () {
          window.scrollTo(0, 0);
        });
    }
})();

// 功能二: 点击分类 跳转到 对应页面 (与功能三相对)
(function () {
    const list = document.querySelector('.elevator_list');
    const top_con = document.querySelector('.top_container');

    if (list) {
        list.addEventListener('click', function (e) {
            if (e.target.tagName === 'A' && e.target.dataset.name) {
                const old = document.querySelector('.elevator_list .active');
                if (old) old.classList.remove('active');

                e.target.classList.add('active');

                const targetElement = document.querySelector(`[data-wbdivname="${e.target.dataset.name}"]`);

                if (targetElement) {
                    const top = targetElement.offsetTop - top_con.clientHeight;
                    document.documentElement.scrollTop = top;
                }
            }
        });
    }
})();

// 功能三: 滑动页面 跳转到 对应分类 (与功能二相对)
window.addEventListener('scroll', function () {
    const top_con = document.querySelector('.top_container');
    const old = document.querySelector('.elevator_list .active');

    if (old) old.classList.remove('active');

    const wb3 = document.querySelector('.elevator_list li a[data-name="wb3"]');
    const wb4 = document.querySelector('.elevator_list li a[data-name="wb4"]');
    const wb5 = document.querySelector('.elevator_list li a[data-name="wb5"]');
    const wb6 = document.querySelector('.elevator_list li a[data-name="wb6"]');

    const wbdiv3 = document.querySelector('[data-wbdivname="wb3"]');
    const wbdiv4 = document.querySelector('[data-wbdivname="wb4"]');
    const wbdiv5 = document.querySelector('[data-wbdivname="wb5"]');
    const wbdiv6 = document.querySelector('[data-wbdivname="wb6"]');

    const n = document.documentElement.scrollTop;

    const rect3 = wbdiv3 ? wbdiv3.getBoundingClientRect() : null;
    const rect4 = wbdiv4 ? wbdiv4.getBoundingClientRect() : null;
    const rect5 = wbdiv5 ? wbdiv5.getBoundingClientRect() : null;
    const rect6 = wbdiv6 ? wbdiv6.getBoundingClientRect() : null;

    if (wb3 && wbdiv3 && n >= rect3.top && n < rect4.top - top_con.clientHeight) {
        wb3.classList.add('active');
    } else if (wb4 && wbdiv4 && n >= rect4.top - top_con.clientHeight && n < rect5.top - top_con.clientHeight) {
        wb4.classList.add('active');
    } else if (wb5 && wbdiv5 && n >= rect5.top - top_con.clientHeight && n < rect6.top - top_con.clientHeight) {
        wb5.classList.add('active');
    } else if (wb6 && wbdiv6 && n >= rect6.top - top_con.clientHeight) {
        wb6.classList.add('active');
    }
});

