<template>
  <table
    style="width:881px; border-width:1px; border-style:groove; font-size:x-small;
			background-color: rgba(255,255,255,0.6); backdrop-filter: blur(50px);"
  >
    <tr
      style="text-align:center; color: rgb(255,255,255); font-weight:bold; border-width:1px; border-style:groove;
		background-color: rgba(28,28,28,0.8)"
    >
      <td>选择</td><td>编号</td><td>商品名称</td><td>市场价</td><td>现价</td><td>数量</td><td>金额</td><td>删除商品</td>
    </tr>

    <!-- 主框架 -->
    <tbody id="goods">
      <div th:each="cart:${carts}">
        <tr style="text-align:center; height:50px; line-height:50px;">
          <!-- week 13 修改 -->
          <!-- 勾选框 -->
          <td>
            <input
              type="checkbox"
              name="cartId"
              th:value="${cart.cartId}"
              checked
              onclick="chk()"
            >
          </td>

          <!-- 商品编号 -->
          <td th:utext="${cart.flowerid}" />

          <!-- 商品图片 和 名字 -->
          <td>
            <div style="height:50px; float:left;">
              <a th:href="'index/flowerdetail?flowerid='+${cart.flowerid}">
                <img
                  th:src="@{'/picture/'+${cart.pictures}}"
                  style="width:48px; height:51px; border:0;"
                >
              </a>
            </div>
            <div
              style="height:50px; float:left;"
              th:utext="${cart.fname}"
            />
          </td>

          <!-- 市场价 -->
          <td th:text="${cart.price}" />

          <!-- 现价 -->
          <td th:text="${cart.yourprice}" />

          <!-- 修改物品数量 -->
          <td>
            <input
              type="button"
              value="-"
              th:onclick="'change(this, -1,'+${cart.cartId}+');'"
            >
            <input
              type="text"
              size="3"
              name="num"
              readonly
              th:value="${cart.num}"
            >
            <input
              type="button"
              value="+"
              th:onclick="'change(this, 1,'+${cart.cartId}+');'"
            >
          </td>

          <!-- 金额？ -->
          <td />

          <!-- 删除键 -->
          <td>
            <!-- <input type="image" th:onclick="'del(this,'+${cart.cartId}+');'" width="41" height="20" th:src="@{/image/04shop_deleteID.gif}"> -->
            <button
              width="44"
              height="24"
              style="background-color: rgb(222,76,76); border-width: 0px; border-radius: 5px; cursor: pointer;"
              th:onclick="'del(this,'+${cart.cartId}+')'"
            >
              <p style="font-size:x-small; font-weight: bold; color: rgba(255,255,255,1)">
                删除
              </p>
            </button>
          </td>
        </tr>
      </div>
    </tbody>

    <!-- 总金额 -->
    <tr>
      <td
        colspan="6"
        text-align="right"
      >
        总计:￥
      </td>
      <td
        id="total"
        text-align="right"
        style="color: #ff2929; font-size: 16px; font-bold: true;"
      />
      <td>元</td>
    </tr>
  </table>

  <!-- 三个按键 -->
  <div style="width:881px; display:flex; justify-content:center;">
    <!--
			<a href="/index"><img th:src="@{/image/continue.jpg}" border=0></a>
			<a href="/cart/clearCart"><img src="/image/clearCart.jpg" border=0></a>&nbsp;
			<a class="goto_order" href="/order/showorder"><img src="/image/submitOrder.jpg"></a>
		-->

    <div
      style="background-color: rgba(255,190,97); border-width: 0px; border-radius: 5px; width: 160px; height:35px;
				cursor: pointer; margin: 20px; text-align: center; line-height: 5px;"
      onclick="window.open('/index','_self')"
    >
      <p style="font-weight: bold; color: rgba(255,255,255,1)">
        继续挑选商品
      </p>
    </div>

    <div
      style="background-color: rgba(222,76,76); border-width: 0px; border-radius: 5px; width: 160px; height:35px;
				cursor: pointer; margin: 20px; text-align: center; line-height: 5px;"
      onclick="window.open('/cart/clearCart','_self')"
    >
      <p style="font-weight: bold; color: rgba(255,255,255,1); text-align: justify-all">
        清除购物车
      </p>
    </div>

    <div
      style="background-color: rgba(121,222,73); border-width: 0px; border-radius: 5px; width: 160px; height:35px ;
				cursor: pointer; margin: 20px; text-align: justify-all; line-height: 5px"
      class="goto_order"
      onclick="window.open('/order/showorder','_self')"
    >
      <p style="font-weight: bold; color: rgba(255,255,255,1)">
        提交订单
      </p>
    </div>
  </div>
</template>

<script>
import '/js/jquery-1.4.2.js'

export default {
	mounted() {
		$(function(){
			sum();
			total();
			chk();
			// 购物车功能: 跳转到订单页面
			$(".goto_order").click(function(){
			// alert("aaba");
				const arr = [];//初始化一个数组arr，用于保存获得多选框的值。
				$('input:checkbox:checked').each(function(){
					if($(this).attr("class") !== "allC"){
						arr.push($(this).attr('value'));
					}
				});
				const cartIds=arr.toString();
				//使用Ajax进行跳转，并带参数
				$.post("/order/order",{"cartIds":cartIds},function(){
					window.location="/order/order?cartIds="+cartIds;
				});
			});
		});

		function sum(){
			$('#goods tr').each(function(){
				const price = parseFloat($(this).find("td:eq(4)").text());
				const num	= parseInt($(this).find("input[name='num']").val());
				$(this).find("td:eq(6)").text(price * num);
			})
		}
		function total(){
			const s=0;
			$('#goods tr').each(function(){
				if($(this).find("input[type='checkbox']").attr('checked')){
					const prices = parseFloat($(this).find("td:eq(6)").text());
					s+=prices;
				}
			})
			$("#total").text(s);
		}

		function change(btn, n,cartId) {
			const t = $(btn).next().length===0? $(btn).prev() : $(btn).next();
			const num = parseInt(t.val());
			if(num<=1 && n<0) {
				return;
			}

			t.val(num+n);
			num = t.val();

			const tds=$(btn).parent().siblings();
			const yourprice = tds.eq(4).text();
			tds.eq(5).text(yourprice * num);
			total();
			$.post("/cart/updateCart",{"cartId":cartId,"num":num});
		}

		function del(btn,cid){
			$(btn).parent().parent().remove();
			total();
			$.post("/cart/deleteCart",{"cartId":cid});
		}
		// week 13 end

		function chk(){
			total();
		}
	}
}
</script>
