<template>
  <div>
    <!-- 网页主要内容 -->
    <div class="container">
      <!-- 商品详情-盒子 -->
      <div class="product_div">
        <!-- 商品图片 -->
        <div class="picture_div" @mouseover="showProductDetail" @mouseleave="hideProductDetail">
          <img :src="'/image/img_product/' + product.picture" alt="">
          <!-- 放大镜-遮罩 -->
          <div v-show="showProductDetail" class="layer" :style="{backgroundImage: 'url(' + '/image/img_product/' + product.picture + ')'}" />
        </div>

        <!-- 商品信息 -->
        <div class="information_div">
          <!-- 商品名 -->
          <div class="product_name_div">
            <span>{{ product.product_name }}</span>
          </div>

          <!-- 商品说明 -->
          <div class="product_description_div">
            <p class="description_title">
              商品描述
            </p>
            <p class="description_content">
              {{ product.illustrate }}
            </p>
            <p class="description_title">
              商品价格
            </p>
            <p class="description_content">
              {{ product.price }}
            </p>
          </div>

          <!-- 按钮-收藏 -->
          <button class="detail_button" data-name="det_btn_collect" @click="addToCollection">
            <img :src="'@/image/icon/icons8-star-96.png'" alt="">
            收藏
          </button>

          <!-- 按钮-加购 -->
          <button class="detail_button" data-name="det_btn_cart" @click="addToCart">
            <img :src="'@/image/icon/icons8-cart-96.png'" alt="">
            添加到购物车
          </button>
        </div>
      </div>

      <!-- 用户评价-标题 -->
      <div class="evaluate_title_div">
        <a>评价</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            product: {
                product_name: '',
                illustrate: '',
                price: 0,
                picture: '',
                product_id: 0,
            },
            showProductDetail: false,
        };
    },
    created() {
    },
    mounted() {

        // 案件样式
        (function () {
            const det_btns = document.querySelectorAll('.detail_button')
            const det_btn_imgs = document.querySelectorAll('.detail_button a img')

            det_btns[0].addEventListener('mouseenter', function () {
                det_btn_imgs[0].src = '@/image/icon/icons8-star-30.png'
            })
            det_btns[0].addEventListener('mouseleave', function () {
                det_btn_imgs[0].src = '@/image/icon/icons8-star-96.png'
            })

            det_btns[1].addEventListener('mouseenter', function () {
                det_btn_imgs[1].src = '@/image/icon/icons8-cart-30.png'
            })
            det_btns[1].addEventListener('mouseleave', function () {
                det_btn_imgs[1].src = '@/image/icon/icons8-cart-96.png'
            })
        })();
    },
    methods: {
        showProductDetail() {
            const pic_div = document.querySelector('.picture_div')  // 获取: 商品图片-盒子
            const pic_detail = document.querySelector('.picture_detail')  // 获取: 商品细节-盒子
            
            // (1)商品细节-显示与隐藏————————————————————————————————————
            pic_div.addEventListener('mouseover', function (e) {

                if (e.target.tagName === 'IMG') {
                    pic_detail.style.backgroundImage = `url(${e.target.src})`  // 商品细节-盒子: 添加图片

                    pic_div.addEventListener('mouseenter', show)  // 商品细节-显示
                    pic_div.addEventListener('mouseleave', hide)  // 商品细节-隐藏

                    let timeId = 0

                    function show () {
                        clearTimeout(timeId)  // 鼠标移入，先清除定时器
                        pic_detail.style.display = 'block';
                    }
                    // 商品细节-消失函数（延迟版）
                    // function hide () {
                    //     timeId = setTimeout(function () {  // 鼠标离开，开启定时器
                    //     pic_detail.style.display = 'none';
                    //     }, 100)
                    // }
                    // 商品细节-消失函数（无延迟版）
                    function hide () {
                        pic_detail.style.display = 'none';
                    }

                    // 体验不好，暂时隐藏！
                    // 鼠标经过 商品细节-盒子 也会显示和隐藏，直接调用show, hide函数
                    // pic_detail.addEventListener('mouseenter', show)
                    // pic_detail.addEventListener('mouseleave', hide)


                    // (2)遮罩部分————————————————————————————————————
                    // 1. 遮罩-显示与隐藏
                    const layer = document.querySelector('.layer')  // 获取: 放大镜-遮罩
                    pic_div.addEventListener('mouseenter', function() {
                        layer.style.display = 'block';
                    })
                    pic_div.addEventListener('mouseleave', function() {
                        layer.style.display = 'none';
                    })

                    // 2. 遮罩-跟随鼠标移动
                    pic_div.addEventListener('mousemove', function(e) {
                        // 核心思想：鼠标在 商品图片-盒子 中的坐标 = 鼠标在视口中的坐标 - 商品图片-盒子在视口中的坐标
                        let x = e.pageX - pic_div.getBoundingClientRect().left
                        let y = e.pageY - pic_div.getBoundingClientRect().top - document.documentElement.scrollTop

                        // 测试用
                        // console.log(e.pageX, e.pageY)
                        // console.log(pic_div.getBoundingClientRect().left, pic_div.getBoundingClientRect().top)
                        // console.log(pic_div.offsetWidth, pic_div.offsetHeight)  // 500, 500
                        // console.log(layer.offsetWidth, layer.offsetHeight)  // 200, 200
                        // console.log(x, y)

                        // 限定遮罩移动：只能在 商品图片-盒子 以内移动
                        if (x >= 0 && x <= pic_div.offsetWidth && y >= 0 && y <= pic_div.offsetHeight) {
                            let mx  = 0, my = 0  // 遮罩移动像素

                            if (x < layer.offsetWidth / 2) { mx = 0 }
                            if (x >= layer.offsetWidth / 2  && x <= pic_div.offsetWidth - layer.offsetWidth / 2) { mx = x - layer.offsetWidth / 2}  // { mx = x - layer.offsetWidth / 2}  >> 顺便让鼠标位于遮罩正中间
                            if (x > pic_div.offsetWidth - layer.offsetWidth / 2) { mx = pic_div.offsetWidth - layer.offsetWidth / 2 -  layer.offsetWidth / 2}

                            if (y < layer.offsetHeight / 2) { my = 0 }
                            if (y >= layer.offsetHeight / 2  && y <= pic_div.offsetHeight - layer.offsetHeight / 2) { my = y - layer.offsetHeight / 2}  // { my = y - layer.offsetHeight / 2} >> 顺便让鼠标位于遮罩正中间
                            if (y > pic_div.offsetHeight - layer.offsetHeight / 2) { my = pic_div.offsetHeight - layer.offsetHeight / 2 -  layer.offsetHeight / 2}

                            // 控制遮罩移动: 把鼠标在 商品图片(盒子) 中的坐标传递给 遮罩
                            layer.style.left = mx + 'px'
                            layer.style.top = my + 'px'

                            // 商品图片 和 商品细节 大小是 1 : 2.5
                            pic_detail.style.backgroundPositionX = -2.5 * mx + 'px'  // 设置 商品细节 与 遮罩 同向移动
                            pic_detail.style.backgroundPositionY = -2.5 * my + 'px'
                        }
                    })
                }
            })
        },
        hideProductDetail() {
            this.showProductDetail = false;
        },
        addToCollection() {
            // 实现添加到收藏的逻辑
            // 你可以使用 this.product.product_id 获取商品ID
        },
        addToCart() {
            // 实现添加到购物车的逻辑
            // 你可以使用 this.product.product_id 获取商品ID
        },
    }
};
</script>

<style lang="scss" scoped>

</style>