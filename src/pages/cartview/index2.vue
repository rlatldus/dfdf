<template>
    <div>
        <HeaderComp />
        <div class="loading" v-if="pending"></div>
        <div id="content" v-else>
			<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->

			<div class="w-set cart_bottom">
				<div class="order_box goods-view">
					<ul class="navi">
						<li>홈</li>
						<li>장바구니</li>
					</ul>
					<div class="title">
						<h2>장바구니</h2>
						<div class="ord_step">
							<div class="cart current">장바구니</div>
							<div class="order">주문/결제</div>
							<div class="end">주문완료</div>
						</div>
					</div>
					<div class="section">
						<div class="tab_list">
							<a href="#" :class="this.bagTap ==='a'?'on':''" @click="getCartList('a')">전체 (<strong>{{alllength}}</strong>)</a>
							<!--TODO :보안성-->
							<a href="#" :class="this.bagTap ==='n'?'on':''" @click="getCartList('n')">일반 배송 (<strong>{{normallength}}</strong>)</a>
							<a href="#" :class="this.bagTap ==='y'?'on':''" @click="getCartList('y')">골프장 픽업 (<strong>{{golflength}}</strong>)</a>
						</div>
						<div class="cart_no_data" v-if="cartList.length===0">
							<i></i>장바구니에 담긴상품이 없습니다.
						</div>
						<div class="cart_box" v-else>
							<div class="cart_title">
								<ul>
									<li class="prd_chk">
										<input type="checkbox" id="cartAll" name="cartAll" @change="cartListCheckAll" 
										:checked="this.originBagIdsCounts.length == this.checkIds.length? true: false" >
										<label for="cartAll">제품 선택</label>
									</li>
									<li class="prd_info_box">상품정보</li>
									<li class="prd_price">금액</li>
									<li class="quantity">수량</li>
									<li class="ord_price">결제금액</li>
									<li class="delivery">{{this.bagTap ==='y'? '픽업 위치' :'배송정보' }}</li>
									<li class="sel_btn">선택</li>
								</ul>
							</div>
							<div class="cart_list">
								<ul>
									<!-- TODO:20221215 품절 케이스 추가 -->
									<!-- <li>
										<div>
											<div class="product_box">
												<div class="prd_chk">
													<input type="checkbox" id="chk3762" class="cart_check_box" name="cartIds" data-idx="1" value="3762">
													<label for="chk3762">제품 선택</label>
												</div>
												<div class="prd_info_box">
													품절인경우에 확인하고 지울것
												</div>
												<div class="prd_price">
													<strong class="font_mont">340,000</strong> 원
												</div>
												<div class="quantity">
													<div class="number">
														<p>품절</p>
														<p><a href="javascript:;" class="btn_dark_gray_solid" @click="notiPop(1)">재입고알림</a></p>
													</div>
												</div>
												<div class="ord_price">
													<strong class="txt_ord_price font_mont">340,000</strong> 원
												</div>
												<div class="delivery"><p>무료</p></div>
												<div class="sel_btn"><p><button type="button" class="btn_dark_gray_solid">삭제</button></p></div>
											</div>
										</div>
										<div></div>
									</li> -->



									<li v-for="(data, index) in cartList" :key="data.id">
										<div v-if="data.isOption=='N'">
											<div class="product_box" >
												<div class="prd_chk">
													<input type="checkbox" :id="'chk'+data.id"  class="cart_check_box" name="cartIds" @change="cartListCheck($event, data.id, index)" :value="data.id" :data-idx="index" :checked="data.isSale!='N'? true : false" :disabled="data.isSale!='N'? false : true">
													
													<label :for="'chk'+data.id">제품 선택</label>
												</div>
												<div class="prd_info_box">
													<dl>
														<dt>
															<router-link :to="'/gooduser/goodslist/detail/'+data.product.id" class="thumbnail">
																<img :src="data?.realUrl" :alt="data.product.textName">
																<!-- <img :src="data.realUrl" :alt="data.realUrl"> -->
															</router-link>
														</dt>
														<dd>

															<p><strong class="txt_brand" v-if="data.product.brand != null">{{data.product.brand}}</strong></p>
															<p><router-link :to="'/gooduser/goodslist/detail/'+data.product.id"><span class="txt_prdname ellipsis_row">{{data.product.textName}}</span></router-link> {{data.count}} 개</p>
															<p>
																<span class="txt_org font_mont" v-if="data.product.normalSalePercent !== '0'">{{this.userGrade == 'VIP'? threeCommaAdd(data.product.vipNormalPrice): threeCommaAdd(data.product.normalPrice)}}원</span>
																<span class="txt_discount" v-if="data.product.normalSalePercent !== '0'"><strong class="font_mont">{{this.userGrade == 'VIP'? Math.ceil(data.product.vipSalePercent): Math.ceil(data.product.normalSalePercent)}}</strong>%</span>
																<span class="txt_price"><strong class="font_mont">{{this.userGrade == 'VIP'? threeCommaAdd(data.product.vipSellingPrice): threeCommaAdd(data.product.normalSellingPrice)}}</strong>원</span>
															</p>
														</dd>
													</dl>
												</div>
												<div class="prd_price">
													<strong class="font_mont">{{threeCommaAdd(data.price)}}</strong> 원
												</div>
												<div class="quantity" v-if="data.isSale!='N'">
													<div class="number">
														<button type="button" class="increase_num" @click="goodsCountChange(index, true)" :disabled="this.cntPending">수량 올림</button>
														<button type="button" class="decrease_num" @click="goodsCountChange(index, false)" :disabled="this.cntPending">수량 내림</button>
														<input type="text" disabled :value="data.count">
													</div>
												</div>
												<div class="quantity" v-else>
													<!-- TODO:20221215 품절 케이스 해당 요소가 나오게-->
													<div class="number">
														<p>품절</p>
														<!-- todo: 상품 옵션 상품 테이블에서 가져와서 풀어야함 -->
														<!-- <p><a href="javascript:;" class="btn_dark_gray_solid" @click="notiPop(1,index)">재입고알림</a></p> -->
													</div>
												</div>
												<div class="ord_price">
													<!-- <strong class="txt_ord_price font_mont">{{threeCommaAdd(data.product.
														normalSellingPrice * data.count)}}</strong> 원 -->
														<strong class="txt_ord_price font_mont">{{threeCommaAdd(data.price * data.count + data.shippingPrice)}}</strong> 원
												</div>
												<div class="delivery">
													<p v-if="this.bagTap ==='y'">{{exchangeGolfCode(data.pickUpPlace)}}</p>
													<p v-if="cartList[index].isBundled==='Y' && cartList[index+1] &&cartList[index+1].isBundled==='Y' &&(cartList[index+1].partnerId==cartList[index].partnerId)"><router-link :to="'/gooduser/promotion/brand/list/'+cartList[index].partnerId"> {{data.shippingPrice}} <br>묶음배송 가능 </router-link></p>
													<p v-else-if="index!=0 && cartList[index].isBundled==='Y' &&cartList[index-1].isBundled==='Y' &&(cartList[index-1].partnerId==cartList[index].partnerId)" > 0 <br>묶음배송 적용 </p>
													<p v-else>{{!data.shippingPrice? '무료': data.shippingPrice }}</p>
													<!-- <p>{{!data.shippingPrice? '무료': data.product.shippingFree ==='Y'? '무료' :threeCommaAdd(data.shippingPrice) }}</p> -->
												</div>
												<div class="sel_btn">
													<!-- <p><a href="javascript:;" class="btn_dark_gray">구매하기</a></p> -->
													<p><button type="button" class="btn_dark_gray_solid" @click="cartListDel(data.id)">삭제</button></p>
												</div>
											</div>
										</div>
										<div v-if="data.isOption=='Y'">
											<div class="product_box" >
												<div class="prd_chk">
													<input type="checkbox" :id="'chk'+data.id" class="cart_check_box" name="cartIds" @change="cartListCheck($event, data.id, index)" :value="data.id" :data-idx="index" :checked="data.isSale!='N'? true : false" :disabled="data.isSale!='N'? false : true">
													<label :for="'chk'+data.id">제품 선택</label>
												</div>
												<div class="prd_info_box">
													<dl>
														<dt>
															<router-link :to="'/gooduser/goodslist/detail/'+data.product.id" class="thumbnail">
																<img :src="data?.realUrl" :alt="data.product.textName">
																<!-- <img :src="data.realUrl" :alt="data.realUrl"> -->
															</router-link>
														</dt>
														<dd>
															<p><strong class="txt_brand" v-if="data.product.brand != null">{{data.product.brand}}</strong></p>
															<p><router-link :to="'/gooduser/goodslist/detail/'+data.product.id"><span class="txt_prdname ellipsis_row">{{data.product.textName}}</span></router-link></p>
															<p v-if="Object.keys(data.optionArray).length != 0">
																<span v-for="(optData, optIndex) in data.optionArray" :key="optIndex" style="display: block; margin-left: 0;">
																	<span v-for="(dataname, index222) in optData.items" :key="index222">
																		<span v-if="index222 != 0"> / </span>{{dataname.name}}
																	</span>&nbsp;|&nbsp;
																	<!--221123 상세 옵션 작업떄문에... -->
																	<!-- 수량 <span class="font_mont">{{optData.amount}}</span>개&nbsp; -->
																	금액 <span class="font_mont">{{threeCommaAdd(optData.value * optData.amount)}}</span>원
																</span>
															</p>
															<p v-if="this.userGrade != 'VIP'">
																<span class="txt_org font_mont" v-if="data.product.normalSalePercent !== '0'">{{threeCommaAdd(data.product.normalPrice)}}원</span>
																<span class="txt_discount" v-if="data.product.normalSalePercent !== '0'"><strong class="font_mont">{{Math.ceil(data.product.normalSalePercent)}}</strong>%</span>
																<span class="txt_price"><strong class="font_mont">{{threeCommaAdd(data.product.normalSellingPrice)}}</strong>원</span>
															</p>
															<p v-else>
																<span class="txt_org font_mont" v-if="data.product.vipNormalPrice !== '0'">{{threeCommaAdd(data.product.vipNormalPrice)}}원</span>
																<span class="txt_discount" v-if="data.product.vipSalePercent !== '0'"><strong class="font_mont">{{Math.ceil(data.product.vipSalePercent)}}</strong>%</span>
																<span class="txt_price"><strong class="font_mont">{{threeCommaAdd(data.product.vipSellingPrice)}}</strong>원</span>
															</p>
														</dd>
													</dl>
												</div>
												<div class="prd_price">
													<!--여기-->
													<strong class="font_mont">{{threeCommaAdd(data.price)}}</strong> 원
												</div>
												<div class="quantity"  v-if="data.isSale!='N'">
													<div class="number">
														<button type="button" class="increase_num" @click="goodsCountChange(index, true)" :disabled="this.cntPending">수량 올림</button>
														<button type="button" class="decrease_num" @click="goodsCountChange(index, false)" :disabled="this.cntPending">수량 내림</button>
														<input type="text" :value="data.count">
													</div>
												</div>
												<div class="quantity" v-else>
													<!-- TODO:20221215 품절 케이스 해당 요소가 나오게-->
													<div class="number">
														<p>품절</p>
														<!-- todo: 상품 옵션 상품 테이블에서 가져와서 풀어야함 -->
														<!-- <p><a href="javascript:;" class="btn_dark_gray_solid" @click="notiPop(1,index)">재입고알림</a></p> -->
													</div>
												</div>
												<div class="ord_price">
													<!-- <strong class="txt_ord_price font_mont">{{threeCommaAdd(data.product.
														normalSellingPrice * data.count)}}</strong> 원 -->
														<strong class="txt_ord_price font_mont">{{threeCommaAdd(data.price * data.count + data.shippingPrice)}}</strong> 원
												</div>
												<div class="delivery">
													<p v-if="this.bagTap ==='y'">{{exchangeGolfCode(data.pickUpPlace)}}</p>
													<p v-if="cartList[index+1] && cartList[index].isBundled==='Y' && cartList[index+1].isBundled==='Y' &&(cartList[index+1].partnerId==cartList[index].partnerId)"><router-link :to="'/gooduser/promotion/brand/list/'+cartList[index].partnerId"> {{data.shippingPrice}} <br>묶음배송 가능 </router-link></p>
													<p v-else-if="index!=0 && cartList[index].isBundled==='Y' && cartList[index-1].isBundled==='Y' &&(cartList[index-1].partnerId==cartList[index].partnerId)" >  0 <br>묶음배송 적용 </p>
													<p v-else>{{!data.shippingPrice? '무료': data.shippingPrice }}</p>
													<!-- <p>{{!data.shippingPrice? '무료': data.product.shippingFree ==='Y'? '무료' :threeCommaAdd(data.shippingPrice) }}</p> -->
												</div>
												<div class="sel_btn">
													<!-- <p><a href="javascript:;" class="btn_dark_gray">구매하기</a></p> -->
													<p><button type="button" class="btn_dark_gray_solid" @click="cartListDel(data.id)">삭제</button></p>
												</div>
											</div>
										</div>
										<!--MARK: 선택형 옵션 출력 부분-->
										<div v-if="data.nonOptionArray != null">
										</div>
										<div v-for="(noptData, noptIndex) in data.nonOptionArray" :key="noptIndex">
											<div class="product_box"  v-for="(ndataname, index222) in noptData.items" :key="index222">
												<div class="prd_chk"></div>
												<div class="prd_info_box" >
													<dl>
														<dt></dt>
														<dd>
															<p><strong class="txt_brand"></strong></p>
															<!-- <p><span >옵션명</span></p> -->
															<p>
																<span class="txt_prdname ellipsis_row" style="display: block; margin-left: 0;">
																	<span class="txt_prdname ellipsis_row">
																		<span class="txt_prdname ellipsis_row" v-if="index222 != 0" > / </span>{{ndataname.name}}
																	</span>
																	수량 <span class="font_mont">{{noptData.amount}}</span>개&nbsp;
																	금액 <span class="font_mont">{{threeCommaAdd(noptData.value * noptData.amount)}}</span>원
																</span>

															</p>
														</dd>
													</dl>
												</div>
												<div class="prd_price">
													<strong class="font_mont">{{threeCommaAdd(noptData.value*noptData.amount)}}</strong> 원
												</div>
												<div class="quantity">
													<div class="number">

													</div>
												</div>
												<div class="ord_price">
													<strong class="txt_ord_price font_mont">{{threeCommaAdd(noptData.value*noptData.amount)}}</strong> 원

												</div>
												<div class="delivery">

												</div>
												<div class="sel_btn">
													<!-- <p><a href="javascript:;" class="btn_dark_gray">구매하기</a></p> -->

												</div>
											</div>
										</div>
									</li>
									
								</ul>
							</div>
						</div>
						<div class="btn_area_s" v-if="cartList.length!==0">
							<button type="button" class="btn_dark_gray_solid" @click="cartListDelCheck">선택상품 삭제</button>
						</div>
						<div class="sum_total_box" v-if="cartList.length!==0">
							<div class="sum_price">
								<span class="tit">총 주문 금액</span>
								<span class="txt"><strong class="font_mont">{{threeCommaAdd(this.cartProductPrice)}}</strong> 원</span>
							</div>
							<span class="mark"><span class="plus">더하기</span></span>
							<div class="sum_price">
								<span class="tit">배송비</span>
								<span class="txt"><strong class="font_mont" >{{threeCommaAdd(this.cartShipPrice)}}</strong> 원</span>
							</div>
							<span class="mark"><span class="equal">총합계</span></span>
							<div class="sum_price total">
								<span class="tit">결제 예정 금액</span>
								<span class="txt"><strong strong class="font_mont">{{threeCommaAdd(this.cartTotalPay)}}</strong> 원</span>
							</div>
						</div>
						<div class="btn_area">
							<a href="javascript:;" class="btn btn_dark_gray_solid" @click="$router.go(-1)">계속 쇼핑하기</a>
							<button type="button" class="btn btn_dark_gray" v-if="cartList.length!==0" @click="buyInCart()">구매하기</button>
						</div>

						<!-- 모바일 시작!!!-->
						<div class="cart_box_m">
							<!-- 상단 버튼-->
							<div class="chk_info" v-if="cartList.length!==0">
								<label for="chk_total"><input type="checkbox" name="chk_total" id="chk_total" @change="cartListCheckAll" checked><span>전체</span></label>
							</div>
							<button type="button" class="total_del" v-if="cartList.length!==0" @click="cartListDelAll">전체 삭제</button>
							<!--리스트-->
							<div class="cart_list_m" v-if="cartList.length!==0">
								<ul>
									<li v-for="(data, index) in cartList" :key="data.id" class="goods-buy-box">
										<div v-if="data.isOption=='N'">
											<div class="cart_top_info" >
												<span class="prd_chk">
													<input type="checkbox" :id="'chkm'+data.id" name="chkm" :ref="'chkm'+data.id" :value="data.id" @change="cartListCheck($event, data.id, index)" :checked="data.isSale!='N'? true : false" :disabled="data.isSale!='N'? false : true">
													<label :for="'chkm'+data.id">제품 선택</label>
												</span>
												<button  type="button" class="m_btn_del" @click="cartListDel(data.id)">삭제</button>
											</div>
											<dl class="cart_prd_info">
												<dt>
													<router-link :to="'/gooduser/goodslist/detail/'+data.product.id" class="thumbnail">
														<img :src="data?.realUrl" :alt="data.product.name">
														<!-- <img :src="data.realUrl" :alt="data.realUrl"> -->
													</router-link>
												</dt>
												<dd>
													<p><strong class="txt_brand" v-if="data.product.brand != null">{{data.product.brand}}</strong></p>
													<p><router-link :to="'/gooduser/goodslist/detail/'+data.product.id"><span class="txt_prdname ellipsis_row">{{data.product.name}}</span></router-link> {{data.count}} 개</p>
													<p class="m-cart-bag-price">
														<span class="txt_org font_mont" v-if="data.product.normalSalePercent !== '0'">{{this.userGrade == 'VIP'? threeCommaAdd(data.product.vipNormalPrice): threeCommaAdd(data.product.normalPrice)}}원</span>
														<span class="txt_discount" v-if="data.product.normalSalePercent !== '0'"><strong class="font_mont">{{this.userGrade == 'VIP'? Math.ceil(data.product.vipSalePercent): Math.ceil(data.product.normalSalePercent)}}</strong>%</span>
														<span class="txt_price"><strong class="font_mont">{{this.userGrade == 'VIP'? threeCommaAdd(data.product.vipSellingPrice): threeCommaAdd(data.product.normalSellingPrice)}}</strong>원</span>
													</p>
												</dd>
											</dl>
											<div class="cart_price_info" v-if="data.isSale!='N'">
												
												<div class="number">
													<button type="button" class="increase_num" @click="goodsCountChange(index, true)" :disabled="this.cntPending">수량 올림</button>
													<button type="button" class="decrease_num" @click="goodsCountChange(index, false)" :disabled="this.cntPending">수량 내림</button>
													<input type="text" disabled :value="data.count">
												</div>
												
												<p>
													<!-- <span class="txt_delv">배송비: <span class="font_mont">5,000</span>원</span> -->
													<span class="txt_delv" v-if="this.bagTap ==='y'"><strong class="font_mont">{{exchangeGolfCode(data.pickUpPlace)}}</strong></span>
													<span class="txt_delv" v-if="cartList[index+1] && cartList[index].isBundled==='Y' && cartList[index+1].product.shippingBundled==='Y' &&(cartList[index+1].partnerId==cartList[index].partnerId)"><router-link :to="'/gooduser/promotion/brand/list/'+cartList[index].partnerId"> <strong class="font_mont">{{data.shippingPrice}}</strong> <br>묶음배송 가능 </router-link></span>
													<span class="txt_delv" v-else-if="index!=0 && cartList[index].isBundled==='Y' && cartList[index-1].product.shippingBundled==='Y' &&(cartList[index-1].partnerId==cartList[index].partnerId)" ></span>
													<!-- <span class="txt_delv">배송비: <strong class="font_mont">{{!data.shippingPrice? '무료': threeCommaAdd(data.shippingPrice) }}</strong></span> -->

													<span class="txt_price">
														<strong class="font_mont">{{this.userGrade == 'VIP'? threeCommaAdd(data.product.vipSellingPrice * data.count): threeCommaAdd(data.product.normalSellingPrice * data.count)}}</strong> 원
													</span>
												</p>
											</div>
											<div class="cart_price_info" v-else>
												<!-- TODO:20221215 품절 케이스 해당 요소가 나오게-->
												<!-- cart_price_info 해당 class에 if 거셔도 될듯함 -->
												<div>
													<!-- todo: 상품 옵션 상품 테이블에서 가져와서 풀어야함 -->
													<!-- <a href="javascript:;" class="btn_soldout" @click="notiPop(1,index)">재입고알림</a> -->
												</div>
												<p>
													<strong class="txt_soldout">품절</strong><span class="txt_soldout_price"><strong class="font_mont">5,000</strong>원</span>
												</p>
											</div>
										</div>

										<div v-if="data.isOption=='Y'">
											<div class="cart_top_info" >
												<span class="prd_chk">
													<input type="checkbox" :id="'chkm'+data.id" name="chkm" :ref="'chkm'+data.id" :value="data.id" @click="cartListCheck($event, data.id, index)" :checked="data.isSale!='N'? true : false" :disabled="data.isSale!='N'? false : true">
													<label :for="'chkm'+data.id">제품 선택</label>
												</span>
												<button  type="button" class="m_btn_del" @click="cartListDel(data.id)">삭제</button>
											</div>
											<dl class="cart_prd_info">
												<dt>
													<router-link :to="'/gooduser/goodslist/detail/'+data.product.id" class="thumbnail">
														<img :src="data?.realUrl" :alt="data.product.name">
														<!-- <img :src="data.realUrl" :alt="data.realUrl"> -->
													</router-link>
												</dt>
												<dd>
													<p><strong class="txt_brand" v-if="data.product.brand != null">{{data.product.brand}}</strong></p>
													<p><router-link :to="'/gooduser/goodslist/detail/'+data.product.id"><span class="ellipsis_row">{{data.product.name}}</span></router-link></p>
													<p v-if="Object.keys(data.optionArray).length != 0">
														<span v-for="(optData, optIndex) in data.optionArray" :key="optIndex" style="display: block; margin-left: 0;">
															<span v-for="(dataname, index222) in optData.items" :key="index222">
																<span v-if="index222 != 0"> / </span>{{dataname.name}}
															</span>&nbsp;|&nbsp;
															<!--221123 상세 옵션 작업떄문에... -->
															<!-- 수량 <span class="font_mont">{{optData.amount}}</span>개&nbsp; -->
															금액 <span class="font_mont">{{threeCommaAdd(optData.value * optData.amount)}}</span>원
														</span>
													</p>
													<p class="m-cart-bag-price" v-if="this.userGrade != 'VIP'">
														<span class="txt_org font_mont" v-if="data.product.normalSalePercent !== '0'">{{threeCommaAdd(data.product.normalPrice)}}원</span>
														<span class="txt_discount" v-if="data.product.normalSalePercent !== '0'"><strong class="font_mont">{{Math.ceil(data.product.normalSalePercent)}}</strong>%</span>
														<span class="txt_price"><strong class="font_mont">{{threeCommaAdd(data.product.normalSellingPrice)}}</strong>원</span>
													</p>
													<p class="m-cart-bag-price" v-else>
														<span class="txt_org font_mont" v-if="data.product.vipNormalPrice !== '0'">{{threeCommaAdd(data.product.vipNormalPrice)}}원</span>
														<span class="txt_discount" v-if="data.product.vipSalePercent !== '0'"><strong class="font_mont">{{Math.ceil(data.product.vipSalePercent)}}</strong>%</span>
														<span class="txt_price"><strong class="font_mont">{{threeCommaAdd(data.product.vipSellingPrice)}}</strong>원</span>
													</p>

												</dd>
											</dl>

											<div class="cart_price_info" v-if="data.isSale!='N'">
												<div class="number">
													<button type="button" class="increase_num" @click="goodsCountChange(index, true)" :disabled="this.cntPending">수량 올림</button>
													<button type="button" class="decrease_num" @click="goodsCountChange(index, false)" :disabled="this.cntPending">수량 내림</button>
													<input type="text" :value="data.count">
												</div>
												<p>
													<span class="txt_delv" v-if="this.bagTap ==='y'"><strong class="font_mont">{{exchangeGolfCode(data.pickUpPlace)}}</strong></span>
													<span class="txt_delv" v-if="cartList[index+1] && cartList[index].isBundled==='Y' && cartList[index+1].product.shippingBundled==='Y' &&(cartList[index+1].partnerId==cartList[index].partnerId)"><router-link :to="'/gooduser/promotion/brand/list/'+cartList[index].partnerId"> <strong class="font_mont">{{data.shippingPrice}}</strong> <br>묶음배송 가능 </router-link></span>
													<span class="txt_delv" v-else-if="index!=0 && cartList[index].isBundled==='Y' && cartList[index-1].product.shippingBundled==='Y' &&(cartList[index-1].partnerId==cartList[index].partnerId)" ></span>
													<!-- <span class="txt_delv">배송비: <strong class="font_mont">{{!data.shippingPrice? '무료': threeCommaAdd(data.shippingPrice) }}</strong></span> -->

													<span class="txt_price">
														<strong class="font_mont">{{threeCommaAdd(data.totalPrice)}}</strong> 원
													</span>
												</p>
											</div>
											<div class="cart_price_info" v-else>
												<!-- TODO:20221215 품절 케이스 해당 요소가 나오게-->
												<!-- cart_price_info 해당 class에 if 거셔도 될듯함 -->
												<div>
													<!-- todo: 상품 옵션 상품 테이블에서 가져와서 풀어야함 -->
													<!-- <a href="javascript:;" class="btn_soldout" @click="notiPop(1,index)">재입고알림</a> -->
												</div>
												<p>
													<strong class="txt_soldout">품절</strong><span class="txt_soldout_price"><strong class="font_mont">5,000</strong>원</span>
												</p>
											</div>
										</div>

										<!--MARK: 선택형 옵션 출력 부분-->
										<div v-if="data.nonOptionArray != null">
										</div>
										<div class="option-box">
											<div class="option-value">
												<div class="option-input-select">
													<!-- <button type="button" class="select-handler">옵션선택</button> -->
													<ul class="select-cont" style="display: block; position: static; visibility: visible; max-height: none; border: 0 none;" v-for="(noptData, noptIndex) in data.nonOptionArray" :key="noptIndex">
														<li v-for="(ndataname, index222) in noptData.items" :key="index222" style="border: 0 none; padding: 0 0 0 0;">
															<a href="javascript:;">
																<!-- <span class="img"><img src="../../assets/images/dummy/goods_image_sample02.jpg" alt="옵션 이미지"></span> -->
																<span class="name">{{ndataname.name}} {{noptData.amount}}개 {{threeCommaAdd(noptData.value * noptData.amount)}}</span>
																<span class="cost"><em class="mont">{{threeCommaAdd(noptData.value * noptData.amount)}}</em>원</span>
															</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="finish_info" v-if="cartList.length!==0">
							<div class="h3_title">
								<h3>결제 금액</h3>
							</div>
						</div>
						<div class="pay_info_m" v-if="cartList.length!==0">
							<dl>
								<dt>총 주문 금액</dt>
								<dd><strong class="font_mont">{{threeCommaAdd(this.cartProductPrice)}}</strong>원</dd>
							</dl>
							<dl>
								<dt>배송비</dt>
								<dd><strong class="font_mont">{{threeCommaAdd(this.cartShipPrice)}}</strong>원</dd>
							</dl>
							<dl>
								<dt><strong>결제예정금액</strong></dt>
								<dd><strong class="font_mont">{{threeCommaAdd(this.cartTotalPay)}}</strong>원</dd>
							</dl>
						</div>
						<!-- MOBILE 상품 구매 영역  클릭 시 상품 구매 팝업 노출 -->
						<div class="fix_btn for-m" v-if="cartList.length!==0">
							<button type="button" class="btn_cart_open" @click="mobileLayerToggle">열림
							</button>
							<div class="cart_pay_info">
								<span>결제예정금액 </span>
								<strong class="font_mont">{{threeCommaAdd(this.cartTotalPay)}}원</strong>
							</div>
							<div style="display: flex">
								<button type="button" class="btn" >
									<span class="buy_01" @click="buyInCart()">구매하기</span>
								</button>
							</div>
						</div>
						<div class="goods_buy mOpen">
								<div class="buy_bg" @click="mobileLayerToggle"></div>
								<div class="buy_con">
									<button type="button" class="btn_cart_close" @click="mobileLayerToggle"></button>
									<div class="info_area">
										<strong class="option_name"></strong>
										<div class="pay_info_m">
										<dl>
											<dt>총 주문 금액</dt>
											<dd><strong class="font_mont">{{threeCommaAdd(this.cartProductPrice)}}</strong>원</dd>
										</dl>
										<dl>
											<dt>배송비</dt>
											<dd><strong class="font_mont">{{threeCommaAdd(this.cartShipPrice)}}</strong>원</dd>
										</dl>
										<dl>
											<dt><strong>총 상품 금액</strong></dt>
											<dd><strong class="font_mont">{{threeCommaAdd(this.cartTotalPay)}}</strong>원</dd>
										</dl>
										<div class="total">
											<p>총 상품 금액</p>
											<div class="total_price">
												<span class="price mont">{{threeCommaAdd(this.cartTotalPay)}}</span>
												<span class="unit">원</span>
											</div>
										</div>
										<div class="fix_btn">
											<button type="button" class="btn">
												<span class="buy_01" @click="buyInCart()"> 구매하기</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

        </div>

		<!-- TODO:20221215 품절 케이스 추가 -->
		<div class="popup-bg on" v-if="this.setStockNotiToggle == 1"></div>
		<div class="modal-pop" id="popup-notice" v-if="this.setStockNotiToggle == 1">
			<div class="popup-header">
				<h3 class="title">재입고 알림 신청</h3>
				<button type="button" class="popup-close-btn" @click="notiPop(0)">닫기</button>
			</div>
			<div class="popup-body">
				<div class="text">
					<span>휴대폰 번호</span>
					<div class="input_area">
						<input type="text" maxlength="11" v-model="noti_phone">
					</div>
				</div>
				<div class="modal-pop-button">
					<button>
						<span @click="setStockNotify">확인</span>
					</button>
					<button class="btn-white" @click="notiPop(0)">
						<span>취소</span>
					</button>
				</div>
			</div>
		</div>

		<MobileNavComp />
        <FooterComp class="for-cart-m"/>
    </div>
</template>
<script>
import HeaderComp from '../../components/HeaderComp.vue';
import MobileNavComp from '../../components/MobileNavComp.vue';
import FooterComp from '../../components/FooterComp.vue';
import axios from "axios";
import moment from "moment";

export default {
    name: "cartIndex",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
    },
    data: () => ({
        checkLike : 0,
		cartList: [],
		cartProductPrice: 0,
		cartShipPrice: 0,
		cartTotalPay: 0,
		productItem: [],
		checkIds: [],
        pending: true,
		userGrade:null,
		pickupValue:null,
		buyBag: null,
		bagTap: 'a',
		userGrade: null,
        alllength:0,
		normallength:0,
		golflength:0,
		allItem: [],
		bagIdsCounts:[],
		originBagIdsCounts: [],
		cntPending : false,
		// 재입고관련
		setStockNotiToggle: 0,
		noti_phone: '',
		req_noti_Item : null
    }),
    created () {
		this.setState();
		this.$store.commit('setState');
		this.getCartList('a');
		this.userGrade = this.$store.state.userGrade;
		this.userId = this.$store.state.userId;

		if (this.userId == null || this.userId == undefined) {
            alert('로그인이 필요한 페이지 입니다.');
			this.$router.push('/gooduser');
		}
		// if(Object.keys(this.cartList).length === 0){
		// 	this.cartListCheckAll
		// 	console.log('checkIds')
		// 	console.log(this.checkIds)
		// }

    },
    methods: {
		async setState(){
		
			let url = `/gooduser/api/v1/check_session`
			let ckData= {}
			axios.post(url,ckData).then(res=>{

				if(res.data.data !='TRUE' && localStorage.getItem('I')!= null ){
					this.$store.commit('logOut');
					this.$router.push({
						path : `/gooduser`
					})
				}else if(localStorage.getItem('I')== null && res.data.data =='TRUE'){
					this.$store.commit('logOut');
					this.$router.push({
						path : `/gooduser`
					})
				}else{
					
				}
			})
			
		},
		async getCartList(value){

			this.checkIds=[]
			this.bagTap = value
			if(!value){this.bagTap = 'a'}
			// checkPickup:  전체 a, 일반 n 픽업y
			let url = `/gooduser/api/v1/bag/list`;
			this.userGrade = this.$store.state.userGrade
			let postData = {
				
				chooseDelivery: this.bagTap
			}

			await axios.post(url, postData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				console.log(res);

				if ( res.data.code != 200 ) {
					alert('통신 오류 발생');
                    this.$router.push({
                        path : `/gooduser`
                    });
                    return ;
                }

				this.cartList = res.data.data;
				if(!this.cartList){
					this.cartList = []
				}
				else{
					//일반배송 골프장 픽업 개수 파악 => 이렇게 까지 해야하나요...?
					if(!!this.cartList && (value==='a'||this.bagTap==='a')){
						this.alllength = this.cartList.length //deliveryType
						this.normallength = this.cartList.filter(item=>{
							return item.deliveryType == "NormalDelivery"|| item.deliveryType == "DayReservationDeliveryNormalDelivery"
						}).length
						this.golflength = this.cartList.filter(item=>{
							return item.deliveryType == "GolfPlacePickupDelivery" || item.deliveryType == "DayReservationDeliveryGolfPlacePickupDelivery"
						}).length
					}

					this.cartList.forEach((item, idx) => {
						item.optionArray = JSON.parse(item.option);
						item.nonOptionArray = JSON.parse(item.chooseOption);
						if(item.isSale !='N'){  //!='N'
							this.allItem.push(item.id)
							this.checkIds.push(item.id);
							
							this.bagIdsCounts.push(item.count);
							this.originBagIdsCounts.push(item.count);	
						}
						
						
						
						
					})
					console.log(this.allItem)
					console.log(this.checkIds)
					console.log(this.bagIdsCounts)
					console.log(this.originBagIdsCounts)
					

					this.goodsCalculate();
				}
				this.pending = false;

			});

		},
		exchangeGolfCode(value){
			let changeTxt = ''
			switch(value) {
				case '01': changeTxt = '안양 컨트리클럽'; break;
				case '02': changeTxt = '안성 베네스트'; break;
				case '03': changeTxt = '가평 베네스트'; break;
				case '04': changeTxt = '글렌로스'; break;
				case '05': changeTxt = '동래 베네스트'; break;
			}
			return changeTxt
		},

		getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },
		threeCommaAdd(number){
			if (number != null) {
				return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			} else if (number == null) {
				return null;
			} else {
				return "";
			}
        },
		mobileLayerToggle() {
			document.querySelector('.goods_buy.mOpen').classList.toggle('on');
		},
		async goodsCountChange(index, type) {

			if (type) {
				this.cntPending = true
				//this.cartList[index].count = this.cartList[index].count + 1;
				let tmpIdx = this.cartList[index].id
				let tmpchkId = this.checkIds.indexOf(tmpIdx)
				this.originBagIdsCounts[index] = this.originBagIdsCounts[index] + 1;	
				this.bagIdsCounts[tmpchkId] = this.bagIdsCounts[tmpchkId] + 1	
				
				let url = `/gooduser/api/v1/bag/calc`
					let calcData = {
						bagIds : this.checkIds,
						bagIdsCounts : this.bagIdsCounts,
						chooseDelivery: this.bagTap
					}
					
					await axios.post(url,calcData).then(res=>{
						if ( res.data.code != 200 ) {
							alert(`${res.data.code} error! ${res.data.message}`);
						}else{
							let tmpData = res.data.data;
							let tmpId = this.cartList[index].id
							let tmpSelectData = tmpData.find(item=> item.id == tmpId)
							this.cartList[index] = tmpSelectData
							this.cartList[index].optionArray = JSON.parse(tmpSelectData.option)
							this.cartList[index].nonOptionArray = JSON.parse(tmpSelectData.chooseOption);	
						}

						

						this.cntPending=false
						
					})
				console.log(index)
			} else {
				this.cntPending = true
				
				if (this.cartList[index].count == 1) {
					this.cntPending = false
					return;
				}
				else{
					let tmpIdx = this.cartList[index].id
					let tmpchkId = this.checkIds.indexOf(tmpIdx)
					
					this.originBagIdsCounts[index] = this.originBagIdsCounts[index] - 1;
					this.bagIdsCounts[tmpchkId] = this.bagIdsCounts[tmpchkId] -1
					let url = `/gooduser/api/v1/bag/calc`
					let calcData = {
						bagIds : this.checkIds,
						bagIdsCounts : this.bagIdsCounts,
						chooseDelivery: this.bagTap
					}
					await axios.post(url,calcData).then(res=>{
						if ( res.data.code != 200 ) {
							alert(`${res.data.code} error! ${res.data.message}`);
						}else{
							let tmpData = res.data.data;
							let tmpId = this.cartList[index].id
							
							let tmpSelectData = tmpData.find(item=> item.id == tmpId)
							this.cartList[index] = tmpSelectData
							// this.cartList.slice(index,tmpSelectData)
							this.cartList[index].optionArray = JSON.parse(tmpSelectData.option)
							this.cartList[index].nonOptionArray = JSON.parse(tmpSelectData.chooseOption);	
						}
						
						
						this.cntPending = false
						
					})
				}
					
				console.log(index)
			}

			this.goodsCalculate();
		},
		async buyInCart(){
            //여기
            let url = `/gooduser/api/v1/bag/buy_multi`

            //let tmpPrice = this.cartProductPrice
            //let product = this.productItem

			this.$store.state.bagId = this.checkIds
			localStorage.setItem('bagId',this.checkIds)
            let sendData = {
                bagIds : this.checkIds,
				bagIdsCounts : this.bagIdsCounts,
				bagCalcJson: this.buyBag,
				expectPurchasePrice: this.cartProductPrice,
				expectShippingPrice: this.cartShipPrice,
            }
            await axios.post(url,sendData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{

				if ( res.data.code != 200 ) {
					alert(`${res.data.code} error! ${res.data.message}`);
					this.$router.push({
						path : `/gooduser`
					});
				}
				
                this.$router.push({
					path : `/gooduser/cartview/productorder/Y`
				})
            })
		},
		goodsCalculate () {
			this.cartProductPrice = 0;
			this.cartShipPrice = 0;
			this.cartTotalPay = 0;
			let tmpArr = []
			this.bagIdsCounts = []
			this.cartList.forEach((item, idx) => {
				this.checkIds.forEach((item2,idx2) => {
					let tmpObj = {}
					if(item.id === item2){
						item.allCount = item.count;
						item.normalCount = item.count;
						tmpObj = {
							bagId : item2,
							count : item.count
						}

						//price
						item.totalPaymentPrice = item.price * item.count;
						//total

						this.cartProductPrice += item.totalPaymentPrice;
						this.cartShipPrice += item.shippingPrice;
						tmpArr.push(tmpObj)
						this.bagIdsCounts.push(item.count)
					}
				})
				this.buyBag = JSON.stringify({data : tmpArr})
			});
			this.cartTotalPay = this.cartProductPrice + this.cartShipPrice;
		},
		async cartListDel(id) {
			let url = `/gooduser/api/v1/bag/delete_one`;
			let postData = {
				bagId: id,
			}
			await axios.post(url, postData).then(res=>{
				//this.getCartList()
				// this.cartList = res.data.data;
				this.$forceUpdate();
				this.goodsCalculate();
			});

			this.$router.go(this.$router.currentRoute);
		},
		async cartListCheck(e, id, index) {
			if (e.target.checked) {
				
				this.checkIds.splice(index,0,id);
				this.bagIdsCounts.splice(index,0,this.originBagIdsCounts[index]);
				document.querySelector(`input[id=chkm${id}]`).checked = true;
				document.querySelector(`input[id=chk${id}]`).checked = true;
				let pcChk = `input[name=cartIds]:checked`
				let mbChk = `input[name=chkm]:checked`
				
				if(this.cartList.length === document.querySelectorAll(pcChk).length 
					&& this.cartList.length === document.querySelectorAll(mbChk).length){
					document.querySelector(`input[name=chk_total]`).checked = true;
					document.querySelector(`input[name=cartAll]`).checked = true;	
				}
				
				console.log('========check in========')
				console.log(this.checkIds)
				console.log(this.bagIdsCounts)
				console.log(this.originBagIdsCounts)

				let url = `/gooduser/api/v1/bag/calc`
				let calcData = {
					bagIds : this.checkIds,
					bagIdsCounts : this.bagIdsCounts,
					chooseDelivery: this.bagTap
				}
				await axios.post(url,calcData).then(res=>{
					if ( res.data.code != 200 ) {
						alert(`${res.data.code} error! ${res.data.message}`);
					}else{
						let tmpData = res.data.data;
						this.cartList.forEach((item, idx) => {
							this.checkIds.forEach((item2,idx2) => {
								if(item.id === item2){
									let tmpSelectData = tmpData.find(item=> item.id == item2)
									this.cartList[idx] = tmpSelectData
									this.cartList[idx].optionArray = JSON.parse(tmpSelectData.option)
									this.cartList[idx].nonOptionArray = JSON.parse(tmpSelectData.chooseOption);	
								}
							})
						})
					}
					
					
				})

			} else {
				for(var i = 0; i < this.checkIds.length; i++){ 
					if (this.checkIds[i] === id) { 
						this.checkIds.splice(i, 1); 
						this.bagIdsCounts.splice(i, 1); 
						break;
					}
				}
				console.log('========check out========')
				console.log(this.checkIds)
				console.log(this.bagIdsCounts)
				console.log(this.originBagIdsCounts)

				let url = `/gooduser/api/v1/bag/calc`
				let calcData = {
					bagIds : this.checkIds,
					bagIdsCounts : this.bagIdsCounts,
					chooseDelivery: this.bagTap
				}
				await axios.post(url,calcData).then(res=>{
					if ( res.data.code != 200 ) {
						alert(`${res.data.code} error! ${res.data.message}`);
					}else{
						let tmpData = res.data.data;
						console.log(tmpData)
						this.cartList.forEach((item, idx) => {
							this.checkIds.forEach((item2,idx2) => {
								if(item.id === item2){
									let tmpSelectData = tmpData.find(item=> item.id == item2)
									this.cartList[idx] = tmpSelectData
									this.cartList[idx].optionArray = JSON.parse(tmpSelectData.option)
									this.cartList[idx].nonOptionArray = JSON.parse(tmpSelectData.chooseOption);	
								}
							})
						})
					}
					
				})
				document.querySelector(`input[id=chkm${id}]`).checked = false;
				document.querySelector(`input[id=chk${id}]`).checked = false;
				document.querySelector(`input[name=chk_total]`).checked = false;
				document.querySelector(`input[name=cartAll]`).checked = false;
				
				
				

			}
			this.$forceUpdate();
			this.goodsCalculate();
		},
		async cartListCheckAll(e) {

			this.checkIds= [];
			this.bagIdsCounts = [];

			if (e.target.checked) {
				document.querySelector('input[name="cartAll"]').checked = true;
				document.querySelector('input[name="chk_total"]').checked = true;
				document.querySelectorAll('.prd_chk input[type="checkbox"]').forEach((item) => {
					if (item.id != 'cartAll') {
						if (!item.disabled) {
							item.checked = true;
						}
						// console.log('asdasdasdasdasdasdasdasdasdasdasdsad');
						// console.log(item.disabled);
						if (item.classList.contains('cart_check_box') && !item.disabled) {
							console.log(item.dataset.idx);
							this.checkIds.push(Number(item.value));
							this.bagIdsCounts.push(Number(this.cartList[item.dataset.idx].normalCount));
						}
					}
				});
				console.log('========check in All========');
			} else {
				document.querySelector('input[name="cartAll"]').checked = false;
				document.querySelector('input[name="chk_total"]').checked = false;
				document.querySelectorAll('.prd_chk input[type="checkbox"]').forEach((item) => {
					item.checked = false;
				});
				console.log('========check out All========');
			}

			console.log(this.checkIds)
			console.log(this.bagIdsCounts)
			console.log(this.originBagIdsCounts)
			let url = `/gooduser/api/v1/bag/calc`
			let calcData = {
				bagIds : this.checkIds,
				bagIdsCounts : this.bagIdsCounts,
				chooseDelivery: this.bagTap
			}
			await axios.post(url,calcData).then(res=>{
				if ( res.data.code != 200 ) {
					alert(`${res.data.code} error! ${res.data.message}`);
				}else{
					let tmpData = res.data.data;
					console.log(tmpData)
					this.cartList.forEach((item, idx) => {
						this.checkIds.forEach((item2,idx2) => {
							if(item.id === item2){
								let tmpSelectData = tmpData.find(item=> item.id == item2)
								this.cartList[idx] = tmpSelectData
								this.cartList[idx].optionArray = JSON.parse(tmpSelectData.option)
								this.cartList[idx].nonOptionArray = JSON.parse(tmpSelectData.chooseOption);	
							}
						})
					})
				}
				
			})
			
			this.goodsCalculate();
		},
		async cartListDelCheck() {
			let url = `/gooduser/api/v1/bag/delete_multi`;
			let postData = {
				bagIds: this.checkIds,
			}
			await axios.post(url, postData).then(res=>{

				this.getCartList()
			});

			this.$router.go(this.$router.currentRoute);
        },
		async cartListDelAll() {
			let url = `/gooduser/api/v1/bag/delete_multi`;
			let postData = {
				bagIds: this.allItem,
			}
			await axios.post(url, postData).then(res=>{
				this.allItem = []
				this.getCartList()
			});

			this.$router.go(this.$router.currentRoute);
        },

		notiPop(val,item){
            if(val===1){
				this.req_noti_Item = this.cartList[item]
				this.setStockNotiToggle= 1
            }else{
				this.setStockNotiToggle = 0
				this.req_noti_Item = null
			}
                
        },
		// 재입고 알림 요청
        async setStockNotify(){
			console.log(this.req_noti_Item)
			console.log(this.noti_phone)
			if(this.req_noti_Item.product.hasOption =='N'){

			}
			// todo: 상품 옵션 상품 테이블에서 가져와서 풀어야함
			// let notifyData={
            //     productId : Number(this.req_noti_Item.product.id), //number
            //     //productOptionId : !this.productItem.productOptionId? '':  this.productItem.productOptionId,//number
            //     memberId : this.getUserId,//number
            //     optionDataKey : this.req_noti_Item.product.hasOption =='N' ? '': `co_${this.select_sold_out.optId}` ,//string(옵션 키)
            //     optionDataName : this.req_noti_Item.product.hasOption =='N'? '': this.select_sold_out.optName ,//string(옵션 이름)
            //     optionData : JSON.stringify(findObj),
            //     phone : this.noti_phone,//string 하이픈 뺴고 보내기
            // }

			// console.log(notifyData)



			alert('여기에 신청 이벤트 날리면 됩니다.');
			this.setStockNotiToggle = 0;
			this.noti_phone = ''
			this.req_noti_Item = null
			// let url = `/gooduser/api/v1/stockNotify/save`

			// let findObj = {}
			// console.log(this.soldOut_obj)
			// for await (const [key, value] of Object.entries(this.soldOut_obj)){
			// 	if(this.select_sold_out.optId === value.optId){
			// 		findObj[key] = value
			// 	}
			// }

			// let notifyData={
			// 	productId : Number(this.prodId), //number
			// 	productOptionId : !this.productItem.productOptionId? '':  this.productItem.productOptionId,//number
			// 	memberId : this.getUserId,//number
			// 	optionDataKey : !this.select_sold_out.optId? '': `co_${this.select_sold_out.optId}` ,//string(옵션 키)
			// 	optionDataName : !this.select_sold_out.optName? '': this.select_sold_out.optName ,//string(옵션 이름)
			// 	optionData : JSON.stringify(findObj),
			// 	phone : this.noti_phone,//string 하이픈 뺴고 보내기
			// }
			// console.log(notifyData)
			// await axios.post(url,notifyData).then(res=>{
			// 	console.log('stockNotify/save')
			// 	console.log(res)
			// 	if(res.data.code===200){
			// 		alert('신청이 완료되었습니다')
			// 		this.select_sold_out = ''
			// 		this.noti_phone = null
			// 		this.setStockNotiToggle = 0
			// 	}else{
			// 		alert('오류입니다 관리자에게 문의 부탁드립니다')
			// 	}

			// })
		},

    },
    computed: {
		setTTL(){
			let now = moment()
			let gap = moment.duration(now.diff(moment(localStorage.getItem('TTL')))).minutes()

			return gap
		}

    },
    mounted() {
    }
}

</script>
<style scoped>

</style>
