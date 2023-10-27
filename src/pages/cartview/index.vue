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
										<input type="checkbox" id="cartAll" name="cartAll" @change="cartListCheckAll" checked>
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
									<li v-for="(data, index) in cartList" :key="index">
										<div v-if="data.isOption=='N'">
											<div class="product_box" >
												<div class="prd_chk">
													<input type="checkbox" :id="'chk'+data.id" class="cart_check_box" name="cartIds" @change="cartListCheck($event, data.id)" :value="data.id" checked>
													<label :for="'chk'+data.id">제품 선택</label>
												</div>
												<div class="prd_info_box">
													<dl>
														<dt>
															<router-link :to="'/gooduser/goodslist/detail/'+data.product.id" class="thumbnail">
																<img :src="this.getPic(data.product.mainImage)" :alt="data.product.name">
															</router-link>
														</dt>
														<dd>
															<p><strong class="txt_brand" v-if="data.product.brand != null">{{data.product.brand}}</strong></p>
															<p><router-link :to="'/gooduser/goodslist/detail/'+data.product.id"><span class="txt_prdname ellipsis_row">{{data.product.name}}</span></router-link> {{data.count}} 개</p>
															<p>
																<span class="txt_org font_mont" v-if="data.product.normalSalePercent !== '0'">{{this.userGrade == 'VIP'? threeCommaAdd(data.product.vipNormalPrice): threeCommaAdd(data.product.normalPrice)}}원</span>
																<span class="txt_discount" v-if="data.product.normalSalePercent !== '0'"><strong class="font_mont">{{this.userGrade == 'VIP'? Math.ceil(data.product.vipSalePercent): Math.ceil(data.product.normalSalePercent)}}</strong>%</span>
																<span class="txt_price"><strong class="font_mont">{{this.userGrade == 'VIP'? threeCommaAdd(data.product.vipSellingPrice): threeCommaAdd(data.product.normalSellingPrice)}}</strong>원</span>
															</p>
														</dd>
													</dl>
												</div>
												<div class="prd_price">
													<strong class="font_mont">{{this.userGrade == 'VIP'? threeCommaAdd(data.product.vipSellingPrice): threeCommaAdd(data.product.normalSellingPrice)}}</strong> 원
												</div>
												<div class="quantity">
													<div class="number">
														<button type="button" class="increase_num" @click="goodsCountChange(index, true)">수량 올림</button>
														<button type="button" class="decrease_num" @click="goodsCountChange(index, false)">수량 내림</button>
														<input type="text" :value="data.count">
													</div>
												</div>
												<div class="ord_price">
													<!-- <strong class="txt_ord_price font_mont">{{threeCommaAdd(data.product.
														normalSellingPrice * data.count)}}</strong> 원 -->
														<strong class="txt_ord_price font_mont">{{this.userGrade == 'VIP'? threeCommaAdd(data.product.vipSellingPrice * data.count): threeCommaAdd(data.product.normalSellingPrice * data.count)}}</strong> 원
												</div>
												<div class="delivery">
													<p v-if="this.bagTap ==='y'">{{exchangeGolfCode(data.pickUpPlace)}}</p>
													<p v-if="cartList[index+1] &&cartList[index+1].product.shippingBundled==='Y' &&(cartList[index+1].memberTenantId==cartList[index].memberTenantId)"><router-link :to="'/gooduser/promotion/brand/list/'+cartList[index].memberTenantId"> {{data.shippingPrice}} <br>묶음배송 가능 </router-link></p>
													<p v-else-if="index!=0 &&cartList[index-1].product.shippingBundled==='Y' &&(cartList[index-1].memberTenantId==cartList[index].memberTenantId)" ></p>
													<p v-else>{{!data.shippingPrice? '무료': data.shippingPrice }}</p>
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
													<input type="checkbox" :id="'chk'+data.id" class="cart_check_box" name="cartIds" @change="cartListCheck($event, data.id)" :value="data.id" checked>
													<label :for="'chk'+data.id">제품 선택</label>
												</div>
												<div class="prd_info_box">
													<dl>
														<dt>
															<router-link :to="'/gooduser/goodslist/detail/'+data.product.id" class="thumbnail">
																<img :src="this.getPic(data.product.mainImage)" :alt="data.product.name">
															</router-link>
														</dt>
														<dd>
															<p><strong class="txt_brand" v-if="data.product.brand != null">{{data.product.brand}}</strong></p>
															<p><router-link :to="'/gooduser/goodslist/detail/'+data.product.id"><span class="txt_prdname ellipsis_row">{{data.product.name}}</span></router-link></p>
															<p v-if="Object.keys(data.optionArray).length != 0">
																<span v-for="(optData, optIndex) in data.optionArray" :key="optIndex" style="display: block; margin-left: 0;">
																	<span v-for="(dataname, index222) in optData.items" :key="index222">
																		<span v-if="index222 != 0"> / </span>{{dataname.name}}
																	</span>&nbsp;|&nbsp;
																	수량 <span class="font_mont">{{optData.amount}}</span>개&nbsp;
																	금액 <span class="font_mont">{{threeCommaAdd(optData.value * optData.amount)}}</span>원
																</span>
															</p>
															<p>
																<span class="txt_org font_mont" v-if="data.product.normalSalePercent !== '0'">{{threeCommaAdd(data.totalPrice)}}원</span>
																<span class="txt_discount" v-if="data.product.normalSalePercent !== '0'"><strong class="font_mont">{{Math.ceil(data.product.normalSalePercent)}}</strong>%</span>
																<span class="txt_price"><strong class="font_mont">{{threeCommaAdd(data.totalPrice)}}</strong>원</span>
															</p>
															
														</dd>
													</dl>
												</div>
												<div class="prd_price">
													<strong class="font_mont">{{threeCommaAdd(data.totalPrice)}}</strong> 원
												</div>
												<div class="quantity">
													<div class="number">
														<button type="button" class="increase_num" @click="goodsCountChange(index, true)">수량 올림</button>
														<button type="button" class="decrease_num" @click="goodsCountChange(index, false)">수량 내림</button>
														<input type="text" :value="data.count">
													</div>
												</div>
												<div class="ord_price">
													<!-- <strong class="txt_ord_price font_mont">{{threeCommaAdd(data.product.
														normalSellingPrice * data.count)}}</strong> 원 -->
														<strong class="txt_ord_price font_mont">{{threeCommaAdd(data.totalPrice * data.count)}}</strong> 원
												</div>
												<div class="delivery">
													{{!data.shippingPrice? '무료': data.shippingPrice }}
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
									<li v-if="false">
									<!--상품정보-->
										<div class="product_box">
											<div class="prd_chk">
												<input type="checkbox" id="chk03" class="cart_check_box" name="cartIds" checked="checked">
												<label for="chk03">제품 선택</label>
											</div>
											<div class="prd_info_box">
												<dl>
													<dt><a href="#" class="thumbnail"><img src="../../assets/images/dummy/goods_image_sample.png" alt="[2만 마일리지+올인원 헤드커버 증정] 캘러웨이 22 로그 ST PRO남성 스틸 7 아이언"></a></dt>
													<dd>
														<p><strong class="txt_brand">캘러웨이</strong></p>
														<p><span class="txt_prdname">[2만 마일리지+올인원 헤드커버 증정] 캘러웨이 22 로그 ST PRO남성 스틸 7 아이언</span></p>
														<p>
															<span class="txt_org font_mont">8,000원</span>
															<span class="txt_discount"><strong class="font_mont">30</strong>%</span>
															<span class="txt_price"><strong class="font_mont">5,000</strong>원</span>
														</p>
													</dd>
												</dl>
											</div>
											<div class="prd_price">
												<strong class="font_mont">1,790,000</strong> 원
											</div>
											<div class="quantity">
												<p>품절</p>
												<p><a href="javascript:;" class="btn_dark_gray_solid">재입고알림</a></p>
											</div>
											<div class="ord_price">
												<strong class="txt_ord_price font_mont">1,790,000</strong> 원
											</div>
											<div class="delivery">
												{{!data.shippingPrice? '무료': data.shippingPrice }}
											</div>
											<div class="sel_btn">
												<!-- <p><a href="javascript:;" class="btn_dark_gray">구매하기</a></p> -->
												<p><button type="button" class="btn_dark_gray_solid">삭제</button></p>
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
								<label for="chk_total"><input type="checkbox" name="chk_total" id="chk_total"><span>전체</span></label>
							</div>
							<button type="button" class="total_del" v-if="cartList.length!==0">전체 삭제</button>
							<!--리스트-->
							<div class="cart_list_m" v-if="cartList.length!==0">
								<ul>
									<li v-for="(data, index) in cartList" :key="index" class="goods-buy-box">
										<div v-if="data.isOption=='N'">
											<div class="cart_top_info" >
												<span class="prd_chk">
													<input type="checkbox" :id="'chk'+data.id" :name="'chkm'+data.id" :ref="'chkm'+data.id" :value="data.id" checked>
													<label :for="'chk'+data.id">제품 선택</label>
												</span>
												<button  type="button" class="m_btn_del" @click="cartListDel(data.id)">삭제</button>
											</div>
											<dl class="cart_prd_info">
												<dt>
													<router-link :to="'/gooduser/goodslist/detail/'+data.product.id" class="thumbnail">
														<img :src="this.getPic(data.product.mainImage)" :alt="data.product.name">
													</router-link>
												</dt>
												<dd>
													<p><strong class="txt_brand" v-if="data.product.brand != null">{{data.product.brand}}</strong></p>
													<p><router-link :to="'/gooduser/goodslist/detail/'+data.product.id"><span class="txt_prdname ellipsis_row">{{data.product.name}}</span></router-link> {{data.count}} 개</p>
													<p>
														<span class="txt_org font_mont" v-if="data.product.normalSalePercent !== '0'">{{this.userGrade == 'VIP'? threeCommaAdd(data.product.vipNormalPrice): threeCommaAdd(data.product.normalPrice)}}원</span>
														<span class="txt_discount" v-if="data.product.normalSalePercent !== '0'"><strong class="font_mont">{{this.userGrade == 'VIP'? Math.ceil(data.product.vipSalePercent): Math.ceil(data.product.normalSalePercent)}}</strong>%</span>
														<span class="txt_price"><strong class="font_mont">{{this.userGrade == 'VIP'? threeCommaAdd(data.product.vipSellingPrice): threeCommaAdd(data.product.normalSellingPrice)}}</strong>원</span>
													</p>
												</dd>
											</dl>
											<div class="cart_price_info">
												<div class="number">
													<button type="button" class="increase_num" @click="goodsCountChange(index, true)">수량 올림</button>
													<button type="button" class="decrease_num" @click="goodsCountChange(index, false)">수량 내림</button>
													<input type="text" :value="data.count">
												</div>
												<p>
													<!-- <span class="txt_delv">배송비: <span class="font_mont">5,000</span>원</span> -->
													<span class="txt_delv" v-if="this.bagTap ==='y'">배송비: <strong class="font_mont">{{exchangeGolfCode(data.pickUpPlace)}}</strong></span>
													<span class="txt_delv" v-if="cartList[index+1] &&cartList[index+1].product.shippingBundled==='Y' &&(cartList[index+1].memberTenantId==cartList[index].memberTenantId)"><router-link :to="'/gooduser/promotion/brand/list/'+cartList[index].memberTenantId"> <strong class="font_mont">{{data.shippingPrice}}</strong> <br>묶음배송 가능 </router-link></span>
													<span class="txt_delv" v-else-if="index!=0 &&cartList[index-1].product.shippingBundled==='Y' &&(cartList[index-1].memberTenantId==cartList[index].memberTenantId)" ></span>
													<span class="txt_delv" v-else>배송비: <strong class="font_mont">{{!data.shippingPrice? '무료': data.shippingPrice }}</strong></span>

													<span class="txt_price">
														<strong class="font_mont">{{this.userGrade == 'VIP'? threeCommaAdd(data.product.vipSellingPrice * data.count): threeCommaAdd(data.product.normalSellingPrice * data.count)}}</strong> 원
													</span>
												</p>
											</div>
										</div>

										<div v-if="data.isOption=='Y'">
											<div class="cart_top_info" >
												<span class="prd_chk">
													<input type="checkbox" :id="'chk'+data.id" :name="'chkm'+data.id" :ref="'chkm'+data.id" :value="data.id" checked>
													<label :for="'chk'+data.id">제품 선택</label>
												</span>
												<button  type="button" class="m_btn_del" @click="cartListDel(data.id)">삭제</button>
											</div>
											<dl class="cart_prd_info">
												<dt>
													<router-link :to="'/gooduser/goodslist/detail/'+data.product.id" class="thumbnail">
														<img :src="this.getPic(data.product.mainImage)" :alt="data.product.name">
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
															수량 <span class="font_mont">{{optData.amount}}</span>개&nbsp;
															금액 <span class="font_mont">{{threeCommaAdd(optData.value * optData.amount)}}</span>원
														</span>
													</p>
													<p>
														<span class="txt_org font_mont" v-if="data.product.normalSalePercent !== '0'">{{threeCommaAdd(data.totalPrice)}}원</span>
														<span class="txt_discount" v-if="data.product.normalSalePercent !== '0'"><strong class="font_mont">{{Math.ceil(data.product.normalSalePercent)}}</strong>%</span>
														<span class="txt_price"><strong class="font_mont">{{threeCommaAdd(data.totalPrice)}}</strong>원</span>
													</p>
													
												</dd>
											</dl>

											<div class="cart_price_info">
												<div class="number">
													<button type="button" class="increase_num" @click="goodsCountChange(index, true)">수량 올림</button>
													<button type="button" class="decrease_num" @click="goodsCountChange(index, false)">수량 내림</button>
													<input type="text" :value="data.count">
												</div>
												<p>
													<span class="txt_delv" v-if="this.bagTap ==='y'">배송비: <strong class="font_mont">{{exchangeGolfCode(data.pickUpPlace)}}</strong></span>
													<span class="txt_delv" v-if="cartList[index+1] &&cartList[index+1].product.shippingBundled==='Y' &&(cartList[index+1].memberTenantId==cartList[index].memberTenantId)"><router-link :to="'/gooduser/promotion/brand/list/'+cartList[index].memberTenantId"> <strong class="font_mont">{{data.shippingPrice}}</strong> <br>묶음배송 가능 </router-link></span>
													<span class="txt_delv" v-else-if="index!=0 &&cartList[index-1].product.shippingBundled==='Y' &&(cartList[index-1].memberTenantId==cartList[index].memberTenantId)" ></span>
													<span class="txt_delv" v-else>배송비: <strong class="font_mont">{{!data.shippingPrice? '무료': data.shippingPrice }}</strong></span>

													<span class="txt_price">
														<strong class="font_mont">{{threeCommaAdd(data.totalPrice * data.count)}}</strong> 원
													</span>
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
		//userId: 0,
    }),
    created () {
		this.setState();
		this.getCartList('a');
		this.userGrade = this.$store.state.userGrade;
		this.userId = this.$store.state.userId;
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
				userId: localStorage.getItem('I'),
				chooseDelivery: this.bagTap
			}
			
			await axios.post(url, postData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				console.log('cartList')
				console.log(res.data.data)
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
						this.checkIds.push(item.id);
						item.optionArray = JSON.parse(item.option);
						item.nonOptionArray = JSON.parse(item.chooseOption);	
					})
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
		goodsCountChange(index, type) {
			if (type) {
				this.cartList[index].count = this.cartList[index].count + 1;
			} else {
				if (this.cartList[index].count == 1) {
					return;
				}
				this.cartList[index].count = this.cartList[index].count - 1;
			}
			this.goodsCalculate();
		},
		async buyInCart(){
            //여기
            let url = `/gooduser/api/v1/bag/buy_multi`
            
            //let tmpPrice = this.cartProductPrice
            //let product = this.productItem
			
			this.$store.state.bagId = this.checkIds 
		
            let sendData = {
                memberId: this.$store.state.userId,
                bagIds : this.checkIds,
				bagCalcJson: this.buyBag,
				expectPurchasePrice: this.cartProductPrice,
				expectShippingPrice: this.cartShipPrice,
            } 
            await axios.post(url,sendData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{ 
				
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
			this.cartList.forEach((item, idx) => {
				this.checkIds.forEach((item2) => {
					let tmpObj = {}
					if(item.id === item2){
						item.allCount = item.count;
						item.normalCount = item.count;
						tmpObj = {
							bagId : item2,
							count : item.count
						}
						//price
						if(item.isOption==='N'){
							item.totalPaymentPrice = item.price * item.count;		
						}else{
							item.totalPaymentPrice = item.totalPrice * item.count;	
						}
						
						
						item.normalTotalPrice = item.totalPrice * item.count;
						
						//total
						
						this.cartProductPrice += item.totalPaymentPrice;
						if(item.product.shippingFree=='N'){
							this.cartShipPrice += item.shippingPrice;
						}
						tmpArr.push(tmpObj)
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
				this.goodsCalculate();
			});

			this.$router.go(this.$router.currentRoute);
		},
		cartListCheck(e, id) {
			if (e.target.checked) {
				this.checkIds.push(id);
				document.querySelector(`input[name=chkm${id}]`).checked = true;
			} else {
				this.checkIds.pop();
				document.querySelector(`input[name=chkm${id}]`).checked = false;
				//if(){}
				// for(var i = 0; i < this.checkIds.length-1; i++){ 
				// 	if (this.checkIds[i] === id) { 
				// 		this.checkIds.splice(i, 1); 
				// 		break;
				// 	}
				// }
			}
			this.goodsCalculate();
		},
		cartListCheckAll(e) {
			
			if (e.target.checked) {
				this.checkIds;
				document.querySelectorAll('.cart_list input[type="checkbox"]').forEach((item) => {
					item.checked = true;
					this.checkIds.push(item.value);
				})
			} else {
				document.querySelectorAll('.cart_list input[type="checkbox"]').forEach((item) => {
					item.checked = false;
					this.checkIds= []
				})
			}
			

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