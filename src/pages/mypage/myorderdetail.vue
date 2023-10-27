<template>
    <div>
		<HeaderComp :headerCase="'sub'" :pageName="'주문 상세 정보'"/>

		<div class="loading" v-if="pendingCancel"></div>
		
		<div v-if="this.pending"></div>
		<div v-else id="content">
			<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
			<div class="mypage_wrap w-set">
				<!-- 마이페이지 좌측 메뉴 -->
				<MymenuComp />
				<!-- 마이페이지 좌측 메뉴 끝 -->

				<!-- 마이페이지 컨텐츠 -->
				<div class="mypage_con mob_wrap" v-if="this.shippingList">
					<!-- 회원정보 끝 -->
					<h3 class="title2">주문 상세 정보</h3>
					<div class="order_detail_info">

						<!-- <span class="resrv_tag" v-if="this.itemOrderInfo.SHIPPING_STATUS == 'P'">결제완료</span>
						<span class="resrv_tag" v-else-if="this.itemOrderInfo.SHIPPING_STATUS == 'W'">준비중</span>
						<span class="resrv_tag" v-else-if="this.itemOrderInfo.SHIPPING_STATUS == 'D'">배송중</span>
						<span class="resrv_tag" v-else-if="this.itemOrderInfo.SHIPPING_STATUS == 'C'">완료</span>
						<span class="resrv_tag" v-else-if="this.itemOrderInfo.SHIPPING_STATUS == 'Z'">구매확정</span> -->

						<span><em>주문일자 : </em><strong>{{String(shippingList.isrtDate).substr(0, 10)}}</strong></span>
						<span v-if="shippingList?.detail[0]?.PAYMENT_PRODUCT_NUMBER"><em>주문번호 : </em><strong>{{shippingList?.detail[0]?.PAYMENT_PRODUCT_NUMBER}}</strong></span>
					</div>
					<!-- 주문상세 시작-->
					<div class="section finish_info order_box">
						<!--고객정보-->
						<div class="ord_finish_info">
							<ul>
								<li v-if="this.memberData">
									<h3>주문고객 정보</h3>
									<div class="box_ord_man">
										<dl>
											<dt>주문하시는분</dt>
											<dd>{{memberData.name}}</dd>
										</dl>
										<dl>
											<dt>휴대폰</dt>
											<dd>{{memberData.telephone}}</dd>
										</dl>
									</div>
								</li>
								<li v-if="this.shippingList.detail[0].BUY_TYPE == 'P'">
									<h3>배송지 정보</h3>
									<!-- 선물상품-->
									<div class="present_info">
										<div class="pic">
											<div class="thumbnail"><img :src="shippingGiftData.imageUuidPath" :alt="shippingGiftData.imageUuidPath"></div>
										</div>
										<div class="pic_txt">
											<ul>
												<li><strong>{{shippingGiftData.recipientName}}</strong> <strong>{{shippingGiftData.recipientTel}}</strong></li>
												<li v-html="shippingGiftData.content"></li>
											</ul>
										</div>
									</div>
								</li>
								<li v-else>
									<h3>배송지 정보</h3>
									<div class="box_ord_man">
										<dl>
											<dt>받는분</dt>
											<dd>{{shippingList.receiverName}}</dd>
										</dl>
										<dl>
											<dt>휴대폰</dt>
											<dd>{{shippingList.tel}}</dd>
										</dl>
										<dl v-if="shippingList.addTel">
											<dt>추가 연락처</dt>
											<dd>{{shippingList.addTel}}</dd>
										</dl>
										<dl>
											<dt>주소</dt>
											<dd class="q1w2e3r4">
												<span v-if="shippingList.postCode">(우: {{shippingList.postCode}})<br></span>
												<span v-if="shippingList.address != null">{{shippingList.address}}</span>
												<span v-else-if="shippingList.addressJibun != null">{{shippingList.addressJibun}}</span>
												, {{shippingList.addressDetail}}
											</dd>
										</dl>
									</div>
								</li>
							</ul>
						</div>
						<!--결제 상품 내역-->
						<div class="h3_title">
							<h3>주문 상품 내역</h3>
						</div>
						<div class="delivery_list">
							<div class="list_wrap">
								<div class="list">
									<div class="list_info">
										<div class="li_l">
											&nbsp;
										</div>
										<div class="li_r">
											<button type="button" v-if="shippingList.isAllP" class="btn order_cancel" @click="orderCancelAll(shippingList.paymentProductGroup)" style="margin-right: 0;">구매취소</button>
										</div>
									</div>
									<div class="list_content" v-for="(itemOrderInfo, index2) in shippingList.detail" :key="index2">
										<!-- <strong class="lc_tit" v-if="itemOrderInfo.PAYMENT_STATUS == 'P'">결제완료</strong>
										<strong class="lc_tit" v-else-if="itemOrderInfo.PAYMENT_STATUS == 'W'">준비중</strong>
										<strong class="lc_tit" v-else-if="itemOrderInfo.PAYMENT_STATUS == 'D'">배송중</strong>
										<strong class="lc_tit" v-else-if="itemOrderInfo.PAYMENT_STATUS == 'C'">완료</strong>
										<strong class="lc_tit" v-else-if="itemOrderInfo.PAYMENT_STATUS == 'Z'">구매확정</strong> -->

										<div v-if="itemOrderInfo.SHIPPING_STATUS">
											<strong class="lc_tit">{{orderStatus(itemOrderInfo.SHIPPING_STATUS)}}</strong>
										</div>

										<div class="lc_status" v-if="
											(shippingList.shippingSpecialDayType != 'NormalDelivery' && shippingList.shippingSpecialDayType != null) ||
											itemOrderInfo.SHIPPING_LABEL_NUMBER != null
										">
											<div class="status01" v-if="shippingList.shippingSpecialDayType == 'DayReservationDeliveryNormalDelivery' || shippingList.shippingSpecialDayType == 'DayReservationDelivery'">
												<span>예약 배송&nbsp;&nbsp;<em class="date mont">{{shippingList.shippingDate}}</em></span>
											</div>
											<div class="status01" v-if="shippingList.shippingSpecialDayType == 'HolydayDeliveryChuseok'">
												<span>추석 예약 배송&nbsp;&nbsp;<em class="date mont">{{shippingList.shippingDate}}</em></span>
											</div>
											<div class="status01" v-if="shippingList.shippingSpecialDayType == 'HolydayDeliverySeolnal'">
												<span>설날 예약 배송&nbsp;&nbsp;<em class="date mont">{{shippingList.shippingDate}}</em></span>
											</div>
											<div class="status01" v-if="shippingList.shippingSpecialDayType == 'AnniversaryDelivery'">
												<span>기념일 예약 배송&nbsp;&nbsp;<em class="date mont">{{shippingList.shippingDate}}</em></span>
											</div>
											<div class="status01" v-if="shippingList.shippingSpecialDayType == 'HolidayDelivery'">
												<span>휴일 예약 배송&nbsp;&nbsp;<em class="date mont">{{shippingList.shippingDate}}</em></span>
											</div>
											<div class="status01" v-if="shippingList.shippingSpecialDayType == 'GolfPlacePickupDelivery'">
												<span v-if="shippingList.pickupPlace == '01'">안양 픽업&nbsp;&nbsp;<em class="date mont">{{shippingList.shippingDate}}</em></span>
												<span v-if="shippingList.pickupPlace == '02'">안성 픽업&nbsp;&nbsp;<em class="date mont">{{shippingList.shippingDate}}</em></span>
												<span v-if="shippingList.pickupPlace == '03'">가평 픽업&nbsp;&nbsp;<em class="date mont">{{shippingList.shippingDate}}</em></span>
												<span v-if="shippingList.pickupPlace == '04'">글렌로스 픽업&nbsp;&nbsp;<em class="date mont">{{shippingList.shippingDate}}</em></span>
												<span v-if="shippingList.pickupPlace == '05'">동래 픽업&nbsp;&nbsp;<em class="date mont">{{shippingList.shippingDate}}</em></span>
											</div>

											<div class="status02" v-if="
												itemOrderInfo.SHIPPING_LABEL_NUMBER == null && 
												(shippingList.shippingSpecialDayType != 'NormalDelivery' && shippingList.shippingSpecialDayType != null) && 
												shippingList.shippingSpecialDayType != 'DayReservationDeliveryNormalDelivery' &&
												shippingList.shippingSpecialDayType != 'DayReservationDelivery'
											">
												<a href="javascript:;" class="btn"
													@click="this.shipDateChangeOpen(itemOrderInfo.PRODUCT_ID, index2, shippingList.shippingSpecialDayType, shippingList, shippingList.shippingDate)"
												>변경</a>
											</div>
											<div class="status02" v-if="itemOrderInfo.SHIPPING_LABEL_NUMBER">
												<div class="company">
													<a :href="itemOrderInfo.SHIPPING_LABEL_LINK" class="btn">{{itemOrderInfo.SHIPPING_LABEL_CARRIER}} {{itemOrderInfo.SHIPPING_LABEL_NUMBER}}</a>
												</div>
											</div>
										</div>
										<ul class="product_list">
											<li>
												<ul class="pdt_list">
													<li>
														<!-- <router-link :to='"/gooduser/goodslist/detail/"+itemOrderInfo.PRODUCT_ID' class="img_area ">
															<div class="img" :style='"background-image: url("+this.$store.state.imagePath+itemOrderInfo.MAIN_IMAGE_PATH+")"'>
																{{itemOrderInfo.TEXT_NAME ? itemOrderInfo.TEXT_NAME : '상품명이 출력되는 영역(최대 한 줄 길면 말 줄임)···'}}
															</div>
														</router-link> -->
														
														<router-link :to='"/gooduser/goodslist/detail/"+itemOrderInfo.PRODUCT_ID' class="img_area has-img">
															<img :src="itemOrderInfo.MAIN_IMAGE_URL" class="img" :alt="itemOrderInfo.MAIN_IMAGE_URL">
														</router-link>

														<div class="pdt_info">
															<router-link :to='"/gooduser/goodslist/detail/"+itemOrderInfo.PRODUCT_ID' ><strong class="name">
																{{itemOrderInfo.TEXT_NAME ? itemOrderInfo.TEXT_NAME : '상품명이 출력되는 영역(최대 한 줄 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임)'}}
															</strong></router-link>
															<ul class="option" v-for="(optionBag, index3) in itemOrderInfo.BAG_OPTION" :key="index3">
																<!-- 필수 옵션 -->
																<li>
																	<span>
																		<b v-for="(optiontxt, indexoption) in optionBag.items" :key="indexoption">
																		{{optiontxt.name}}&nbsp;
																	</b>
																	</span>
																</li>
																<li>
																	<!-- <span><em class="mont">{{threeCommaAdd(optionBag.value)}}</em>원</span> -->
																	<span>{{optionBag.amount}}개</span>
																</li>
															</ul>
															<ul class="option" v-for="(optionBag, index3) in itemOrderInfo.CHOOSE_OPTION" :key="index3">
																<!-- 추가 옵션 -->
																<li>
																	<span>
																		추가옵션: <b v-for="(optiontxt, indexoption) in optionBag.items" :key="indexoption">
																		{{optiontxt.name}}&nbsp;
																	</b>
																	</span>
																</li>
																<li>
																	<!-- <span><em class="mont">{{threeCommaAdd(optionBag.value)}}</em>원</span> -->
																	<span>{{optionBag.amount}}개</span>
																</li>
															</ul>
														</div>
													</li>
												</ul>
												<div class="info_area">
													<span>
														<em class="price mont">{{threeCommaAdd(itemOrderInfo.REAL_PRICE)}}</em>원
													</span>
													<span v-if="itemOrderInfo.BAG_COUNT">
														<em class="amount mont">{{itemOrderInfo.BAG_COUNT}}</em>개
													</span>
												</div>

												<div class="btn_area">
													<!-- 주문완료 -->
													<button type="button" v-if="itemOrderInfo.SHIPPING_STATUS == 'P'" class="btn" @click="orderCancel(shippingList.paymentProductGroup, itemOrderInfo.PAYMENT_PRODUCT_ID)">구매취소</button>

													<!-- 배송중, 상품 준비중 -->
													<button type="button" v-if="itemOrderInfo.SHIPPING_STATUS == 'W' || itemOrderInfo.SHIPPING_STATUS == 'D'" class="btn popup-open" @click="this.openCancelPopup(itemOrderInfo, itemOrderInfo.SHIPPING_ID, 'NP')">취소 신청</button>

													<!-- 배송완료 -->
													<button type="button" v-if="itemOrderInfo.SHIPPING_STATUS == 'C'" class="btn confirm" @click="this.setBuyComplete(itemOrderInfo.SHIPPING_ID)">구매확정</button>
													<!-- <button type="button" v-if="itemOrderInfo.SHIPPING_STATUS == 'Z'" class="btn confirm" style="cursor: default;">구매확정완료</button> -->

													<button type="button" 
													v-if="
														(itemOrderInfo.SHIPPING_STATUS == 'C' || itemOrderInfo.SHIPPING_STATUS == 'Z') &&
														shippingList.isReviewWritted == 'N'
													" class="btn popup-open" @click="this.reviewWrite(shippingList.productReviewId, itemOrderInfo)">리뷰 작성</button>
													<a href="javascript:;" v-if="itemOrderInfo.SHIPPING_STATUS == 'C'" class="btn popup-open" @click="this.openCancelPopup(itemOrderInfo, itemOrderInfo.SHIPPING_ID)">교환/반품 문의</a>
													<button type="button" class="btn popup-open"
														v-if="
															itemOrderInfo.SHIPPING_STATUS == 'W' ||
															itemOrderInfo.SHIPPING_STATUS == 'D' ||
															itemOrderInfo.SHIPPING_STATUS == 'NP' ||
															itemOrderInfo.SHIPPING_STATUS == 'EP' ||
															itemOrderInfo.SHIPPING_STATUS == 'EN' ||
															itemOrderInfo.SHIPPING_STATUS == 'EE' ||
															itemOrderInfo.SHIPPING_STATUS == 'RP' ||
															itemOrderInfo.SHIPPING_STATUS == 'RY' ||
															itemOrderInfo.SHIPPING_STATUS == 'RN' ||
															itemOrderInfo.SHIPPING_STATUS == 'RE'
														"
														@click="this.callQnaOpen(itemOrderInfo.PRODUCT_ID)"
													>전화문의</button>

													<!-- 상품문의 케이스 -->
													<button type="button" class="btn popup-open"
														v-if="
															itemOrderInfo.SHIPPING_STATUS == 'W' ||
															itemOrderInfo.SHIPPING_STATUS == 'D' ||
															itemOrderInfo.SHIPPING_STATUS == 'NP' ||
															itemOrderInfo.SHIPPING_STATUS == 'EP' ||
															itemOrderInfo.SHIPPING_STATUS == 'EN' ||
															itemOrderInfo.SHIPPING_STATUS == 'EE' ||
															itemOrderInfo.SHIPPING_STATUS == 'RP' ||
															itemOrderInfo.SHIPPING_STATUS == 'RY' ||
															itemOrderInfo.SHIPPING_STATUS == 'RN' ||
															itemOrderInfo.SHIPPING_STATUS == 'RE'
														"
														@click="this.qnaWriteOpen(itemOrderInfo.PRODUCT_ID, itemOrderInfo.TEXT_NAME)"
													>상품문의</button>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<!--결제 수단-->
						<div class="h3_title">
							<h3>결제 수단</h3>
						</div>
						<div class="box_ord_man">
								<dl>
									<dt>최종 결제 금액</dt>
									<dd>{{this.threeCommaAdd(this.totalPrice)}} 원</dd>
								</dl>
								<dl>
									<dt>총 건수</dt>
									<dd>총 {{this.shippingList.detail.length}}건</dd>
								</dl>
								<dl>
									<dt>결제수단</dt>
									<dd>
										<span v-if="shippingList.cardName">{{shippingList.cardName}}</span>
										<span v-if="shippingList.quota">&nbsp;({{Number(shippingList.quota)}}개월 할부)</span>
										<span v-if="shippingList.paymentType == 'GC' || shippingList.paymentType == 'G'">&nbsp;+&nbsp;기프트카드</span>
									</dd>
								</dl>
						</div>
						<!--결제 금액-->
						<div class="h3_title">
							<h3>결제 금액</h3>
						</div>
						<!--결제금액 PC-->
						<div class="sum_total_box">
							<div class="sum_price" :class="{'type-4': this?.giftPrice}">
								<span class="tit">총 주문 금액</span>
								<span class="txt"><strong class="font_mont">{{this.threeCommaAdd(this.productPrice)}}</strong> 원</span>
							</div>
							<span class="mark"><span class="plus">더하기</span></span>
							<div class="sum_price" :class="{'type-4': this?.giftPrice}">
								<span class="tit">배송비</span>
								<span class="txt"><strong class="font_mont">{{this.threeCommaAdd(this.shippingPrice)}}</strong> 원</span>
							</div>
							<span class="mark" v-if="this?.giftPrice"><span class="minus">빼기</span></span>
							<div class="sum_price" :class="{'type-4': this?.giftPrice}" v-if="this?.giftPrice">
								<span class="tit">기프트카드</span>
								<span class="txt"><strong class="font_mont" >{{this.threeCommaAdd(this.giftPrice)}}</strong> 원</span>
							</div>
							<span class="mark"><span class="equal">총합계</span></span>
							<div class="sum_price total" :class="{'type-4': this?.giftPrice}">
								<span class="tit">결제 예정 금액</span>
								<span class="txt"><strong strong="" class="font_mont">{{this.threeCommaAdd(this.totalPrice)}}</strong> 원</span>
							</div>
						</div>
						<!--결제금액 mobile-->
						<div class="pay_info_m">
							<dl>
								<dt>주문 금액</dt>
								<dd><strong class="font_mont">{{this.threeCommaAdd(this.productPrice)}}</strong>원</dd>
							</dl>
							<dl v-if="this.giftPrice">
								<dt>기프트 카드 사용</dt>
								<dd><strong class="font_mont">-{{this.threeCommaAdd(this.giftPrice)}}</strong>원</dd>
							</dl>
							<dl>
								<dt>배송비</dt>
								<dd><strong class="font_mont">{{this.threeCommaAdd(this.shippingPrice)}}</strong>원</dd>
							</dl>
							<dl>
								<dt><strong>결제 예정 금액</strong></dt>
								<dd><strong class="font_mont">{{this.threeCommaAdd(this.totalPrice)}}</strong>원</dd>
							</dl>
						</div>
						<div class="btn_area">
							<router-link :to="'/gooduser/mypage/myorder1'" class="btn btn_dark_gray">목록</router-link>
						</div>
						
					</div>
					<!--주문상세 끝-->

				</div>
			</div>
		</div>









		<div class="popup-bg" :class="{'on' : this.cancelPopup}"></div>
		<div class="popup-cont w01" :class="{'on' : this.cancelPopup}" v-if="this.cancelPopup" id="popup-change">
			<div class="popup-header">
				<h3 class="title" v-if="this.cancelPopupIsT2">취소 신청</h3>
				<h3 class="title" v-else>교환/반품 신청</h3>
				<button type="button" class="popup-close-btn popup-close" @click="this.cancelPopup = false">닫기</button>
			</div>
			<div class="popup-body">
				<p class="goods_title">
					{{this.cancelPopupItem.TEXT_NAME}}
				</p>
				<div class="popup_write type-02">
					<div class="input_wrap">
						<form action="">
							<p class="input_tit" v-if="!this.cancelPopupIsT2">구분<strong class="required">*</strong></p>
							<div class="chk_wrap" v-if="!this.cancelPopupIsT2">
								<div class="chk_area radio">
									<input type="radio" name="causeChk" id="causeChk1" value="EP" v-model="this.cancelPopupType">
									<label for="causeChk1" class="chk">
										<i class="ico_chk"></i>
										교환
									</label>
								</div>
								<div class="chk_area radio">
									<input type="radio" name="causeChk" id="causeChk2" value="RP" v-model="this.cancelPopupType">
									<label for="causeChk2" class="chk">
										<i class="ico_chk"></i>
										반품
									</label>
								</div>
							</div>
							<p class="input_tit">사유 입력<strong class="required">*</strong></p>
							<div class="input_area">
								<textarea name="changeDetail" id="changeDetail" v-model="this.cancelPopupText"></textarea>
							</div>
							<div class="btn_area">
								<button type="button" class="btn form02" @click="this.openCancelWrite">저장</button>
								<button type="button" class="btn popup-close" @click="this.cancelPopup = false">취소</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<!-- QNA 작성 팝업 -->
		<div class="popup-bg on" v-if="this.qnaWritePop"></div>
		<div class="popup-cont w01 on" id="popup-goods" v-if="this.qnaWritePop">
			<div class="popup-header">
				<h3 class="title">상품문의</h3>
				<button type="button" class="popup-close-btn" @click="this.qnaWriteConfirmClose">닫기</button>
			</div>
			<div class="popup-body">
				<p class="goods_title">
					{{this.qnaSetGoodsName}}
				</p>
				<div class="popup_write type-02">
					<div class="input_wrap">
						<form action="">
							<p class="input_tit">문의 내용<strong class="required">*</strong></p>
							<div class="input_area">
								<textarea name="askDetailWrite" id="askDetailWrite"></textarea>
							</div>
							<p class="input_tit">비밀 글 설정</p>
							<div class="chk_area">
								<input type="checkbox" name="secretChkWrite" id="secretChkWrite">
								<label for="secretChkWrite" class="chk">
									<i class="ico_chk"></i>
									비밀글 선택 시 작성자만 조회 가능합니다.
								</label>
							</div>
							<div class="input_area">
								<input type="password" name="passwordWrite" id="passwordWrite">
							</div>
							<div class="btn_area">
								<button type="button" class="btn form02" @click="this.qnaWritePopConfirm = true">저장</button>
								<button type="button" class="btn" @click="this.qnaWriteConfirmClose">취소</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<ModalAlert
			v-if="this.qnaWritePopConfirm"
			:text="'저장하시겠습니까?'"
			:type="'confirm'"
			@confirm="this.QnaWrite"
			@close="this.qnaWriteConfirmClose"
			style="position: relative; z-index: 999999999"
		/>

		<!-- 전화문의 -->
		<div class="popup-bg on" v-if="this.callQnaPop" @click="this.callQnaClose"></div>
		<div class="popup-cont w01 on" id="popup-call" v-if="this.callQnaPop">
			<div class="popup-header">
				<h3 class="title">전화문의</h3>
				<button type="button" class="popup-close-btn popup-close" @click="this.callQnaClose">닫기</button>
			</div>
			<div class="popup-body">
				<div class="call_wrap">
					<p class="name">{{callQnaName}}</p>
					<p class="num mont">{{callQnaNumber}}</p>
					<dl class="call_info">
						<dt>상담가능시간</dt>
						<dd>
							{{callQnaTime}}
						</dd>
					</dl>
					<div class="btn_area">
						<button type="button" class="btn popup-close" @click="this.callQnaClose">확인</button>
					</div>
				</div>
			</div>
		</div>

		<!-- 리뷰 -->
		<div class="popup-bg" :class="{'on': reviewWriteData != null}" @click="reviewWriteClose"></div>
		<div class="popup-cont w01" :class="{'on': reviewWriteData != null}" id="popup-review" v-if="reviewWriteData != null">
			<div class="popup-header">
				<h3 class="title">상품리뷰</h3>
				<button type="button" class="popup-close-btn" @click="reviewWriteClose">닫기</button>
			</div>
			<div class="popup-body">
				<div class="goods_area">
					<div class="goods_img">
						<div class="img" :style="`background-image: url(${getPic(reviewWriteData.product.mainImage)})`">
							{{reviewWriteData.product.textName }}
						</div>
					</div>
					<p>
						{{reviewWriteData.product.textName }}
					</p>
				</div>
				<div class="popup_write">
					<div class="star_area starChk">
						<input type="radio" name="ratingChk" id="rating0" value="0" v-model="reviewWriteStar">
						<label for="rating0" class="chk chk00">0점</label>
						<input type="radio" name="ratingChk" id="rating1" value="1" v-model="reviewWriteStar">
						<label for="rating1" class="chk chk01">1점</label>
						<input type="radio" name="ratingChk" id="rating2" value="2" v-model="reviewWriteStar">
						<label for="rating2" class="chk chk02">2점</label>
						<input type="radio" name="ratingChk" id="rating3" value="3" v-model="reviewWriteStar">
						<label for="rating3" class="chk chk03">3점</label>
						<input type="radio" name="ratingChk" id="rating4" value="4" v-model="reviewWriteStar">
						<label for="rating4" class="chk chk04">4점</label>
						<input type="radio" name="ratingChk" id="rating5" value="5" v-model="reviewWriteStar">
						<label for="rating5" class="chk chk05">5점</label>
					</div>
					<div class="input_wrap">
						<form action="">
							<div v-for="(item, index) in reviewWriteData.selectorJson" :key="index">
								<p class="input_tit">{{item.value}}</p>
								<div class="input_area">
									<select :name="`choose${index}`" :id="`choose${index}`">
										<option :value="choose.optionName" v-for="(choose, index2) in item.items" :key="index2">{{choose.optionName}}</option>
									</select>
								</div>
							</div>
							<p class="input_tit">상세리뷰<strong class="required">*</strong></p>
							<div class="input_area">
								<textarea name="reviewDetail" id="reviewDetail" v-model="reviewWriteData.reviewDetail"></textarea>
							</div>
							<p class="input_tit">사진첨부</p>
							<div class="attach_area">
								<ul>
									<li>
										<div class="attach">
											<input type="file" name="reviewFile0" id="reviewFile0" @change="onFileChange(0, $event)">
											<label for="reviewFile0" class="fileBtn">사진첨부</label>
										</div>
										<div class="img_area" v-if="upLoadFile[0].fileuuid">
											<div class="img" :style="`background-image: url(${upLoadFile[0]?.real_url});`"></div>
											<button type="button" class="btn delete" @click="deleteFile(0)">삭제</button>
										</div>
									</li>
									<li>
										<div class="attach">
											<input type="file" name="reviewFile1" id="reviewFile1" @change="onFileChange(1, $event)">
											<label for="reviewFile1" class="fileBtn">사진첨부</label>
										</div>
										<div class="img_area" v-if="upLoadFile[1].fileuuid">
											<div class="img" :style="`background-image: url(${upLoadFile[1]?.real_url});`"></div>
											<button type="button" class="btn delete" @click="deleteFile(1)">삭제</button>
										</div>
									</li>
									<li>
										<div class="attach">
											<input type="file" name="reviewFile2" id="reviewFile2" @change="onFileChange(2, $event)">
											<label for="reviewFile2" class="fileBtn">사진첨부</label>
										</div>
										<div class="img_area" v-if="upLoadFile[2].fileuuid">
											<div class="img" :style="`background-image: url(${upLoadFile[2]?.real_url});`"></div>
											<button type="button" class="btn delete" @click="deleteFile(2)">삭제</button>
										</div>
									</li>
								</ul>
								<p class="attach_txt">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 3개까지 첨부 가능합니다.</p>
							</div>
							<p class="input_notice">
								권리침해, 욕설, 특정 대상을 비하하는 내용, 청소년에게 유해한 내용 등을 게시할 경우 운영정책과 이용약관 및 관련 법률에 의해 제재될 수 있습니다.
							</p>
							<div class="btn_area">
								<button type="button" class="btn form02" @click="reviewWriteRequest">저장</button>
								<button type="button" class="btn popup-close" @click="reviewWriteClose">취소</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<DateChange
			v-if="this.shipChangePopupShow"
			:propData="this.shipChangePopupProp"
			@close="shipDateChangeClose"
		/>

		<MobileNavComp :mNavType="'my'"/>
		<FooterComp />
    </div>
</template>
<script>
import HeaderComp from '../../components/HeaderComp.vue';
import MobileNavComp from '../../components/MobileNavComp.vue';
import FooterComp from '../../components/FooterComp.vue';
import MymenuComp from '../../components/MymenuComp.vue';
import DateChange from '../mypage/DateChange.vue';
import ModalAlert from '../../components/ModalAlert.vue';
import axios from "axios";
export default {
    name: "myOrderDetail",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  MymenuComp,
	  DateChange,
	  ModalAlert,
    },
    data: () => ({
		// userInfo
		userId: null,

		pending: true,

        checkLike : 0,

		// 리스트 데이터
		shippingList: null,
		// 선물 데이터
		shippingGiftData: null,

		// 총가격
		orderPrice: 0,
		// 총배송비
		shippingPrice: 0,

		// 보낸이 데이터
		memberData: null,
        


		// 취소 교환 반품
		cancelPopup: false,
		cancelShipId: null,
		cancelPopupItem: null,
		cancelPopupIsT2: false,
		cancelPopupType: null,
		cancelPopupText: '',

		// 날짜 변경 팝업
		shipChangePopupShow: false,
		shipChangePopupProp: null,

		// 상품 qna
		qnaWritePop: false,
		qnaWritePopConfirm: false,
		qnaSetGoodsId: null,
		qnaSetGoodsName: null,

		// 전화문의
		callQnaPop: false,
		callQnaName: null,
		callQnaNumber: null,
		callQnaTime: null,

		// 리뷰 작성
		reviewWriteData: null,
		reviewWriteStar: '0',

		// 파일 관련
		upLoadFile: [
			{
				attachFile : null,
				attachFileName: null,
				fileuuid: null,
			},
			{
				attachFile : null,
				attachFileName: null,
				fileuuid: null,
			},
			{
				attachFile : null,
				attachFileName: null,
				fileuuid: null,
			}
		],

		// 취소 중복 처리 방지
		ordCWork: false,
    }),
    created () {
		this.$store.commit('setState');
		this.userId = this.$store.state.userId;
		if (this.userId == null) {
            alert('로그인이 필요한 페이지 입니다.');
			this.$router.push('/gooduser');
		}

		this.getMemberData();
        this.getShippingList();
    },
    methods: {
		threeCommaAdd(number){
			if (number != null) {
				return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			} else if (number == null) {
				return null;
			} else {
				return "";
			}
        }, 
		getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },
		async getShippingList(){
			let url = '/gooduser/api/v1/shipping_api/shipping_my_detail/'+this.$route.params.id;
			let setData = {
					'memberId': this.userId,
				}
				console.log(setData);
            await axios({
                'method': 'post',
                'url': url,
                'data': setData,
				'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            }).then(res=>{
                console.log(res);
				
				this.shippingList = res.data.data;

				this.shippingList.isAllP = true;

				this.productPrice = 0;
				this.totalPrice = 0;
				this.giftPrice = 0;
				this.shippingPrice = 0;
				this.shippingCount = 0;

				res.data.data.detail = JSON.parse(res.data.data.detail);
				res.data.data.detail.forEach((item2, index2) => {
					res.data.data.detail[index2].MAIN_IMAGE_PATH = item2.MAIN_IMAGE_PATH;
					res.data.data.detail[index2].BAG_OPTION = JSON.parse(item2.BAG_OPTION);
					res.data.data.detail[index2].CHOOSE_OPTION = JSON.parse(item2.CHOOSE_OPTION);

					this.productPrice += Number(item2.PRODUCT_PRICE);
					this.totalPrice = item2.TOTAL_PRICE;
                    this.giftPrice = item2.TOTAL_GFCARD;
					if (item2.SHIPPING_PRICE) {
						this.shippingPrice += item2.SHIPPING_PRICE;
					}
					if (item2.SHIPPING_STATUS != 'P') {
						this.shippingList.isAllP = false;
					}
					this.shippingCount += item2.BAG_COUNT;
				});

				if (this.shippingList.detail[0].BUY_TYPE == 'P') {
					let urlGift = '/gooduser/api/v1/gift_api/select_gift_msg';
					let setDataGift = {
						paymentId: this.shippingList.detail[0].PAYMENT_PRODUCT_ID,
					}
					axios({
						'method': 'post',
						'url': urlGift,
						'data': setDataGift,
						'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
					}).then(resGift=>{
						
						if (resGift.data.data.content != null) {
							resGift.data.data.content = resGift.data.data.content.replace(/\n/g, '<br/>');
						}
						this.shippingGiftData = resGift.data.data;
						this.pending = false;
					});
				} else {
					this.pending = false;
				}
					//shippingGiftData
            })
	    },

		async getMemberData() {
			let url = '/gooduser/api/v1/member_user/search_id'
			let reqUser = {}
			await axios.post(url,reqUser,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				let getmemberData2 = res.data.data;
				this.memberData = getmemberData2;
			});
		},

		orderStatus(input){
			let result =''
			switch(input){
				case 'P' : result='주문 접수'; break;
				case 'W' : result='상품 준비중'; break;
				case 'D' : result='배송 중'; break;
				case 'C' : result='배송 완료'; break;
				case 'Z' : result='구매 확정'; break;
				case 'N' : result='결제 취소'; break;
				case 'NP' : result='취소 접수'; break;
				case 'NY' : result='주문 취소'; break;
				case 'EP' : result='교환 접수'; break;
				case 'EY' : result='교환 완료'; break;
				case 'EN' : result='교환 불가'; break;
				case 'EE' : result='교환 완료'; break;
				case 'RP' : result='반품 접수'; break;
				case 'RY' : result='반품 완료'; break;
				case 'RN' : result='반품 불가'; break;
				case 'RE' : result='반품 완료'; break;
				default : result='관리자 문의'; break;
			}
			return result
		},

		// 취소 버튼
		async orderCancel (paymentProductGroup, paymentProductId) {
			if (!confirm('주문을 취소하시겠습니까?')) {
				return false;
			}

			if (this.ordCWork) {
				return false;
			} else {
				this.ordCWork = true;
			}

			this.pendingCancel = true;

			let cancelFormData = new FormData();
			cancelFormData.append('paymentProductGroup', paymentProductGroup);
			cancelFormData.append('memberId', Number(this.userId));
			cancelFormData.append('paymentProductId ', paymentProductId);
			// cancelFormData.append(paymentProductGroup);

			console.log(cancelFormData);
			console.log(paymentProductGroup);
			console.log(this.userId);
			console.log(paymentProductId);

			for (var pair of cancelFormData.entries()) {
				console.log(pair[0]+ ', ' + pair[1]);
			}

			fetch('/gooduser/api/v1/order/cancel', {
				method: 'POST',
				body: cancelFormData
			})
            .then(response => response.json())
            .then(data => {
				console.log(data);

                if (data.message !== 'SUCCESS'){
					alert(data.message);
					location.reload();
					return;
				}

                alert('주문 취소가 완료되었습니다.');

				this.getShippingList();
				this.ordCWork = false;
				this.pendingCancel = false;
				location.reload();
            })
            .catch(error => {
				console.log(error);
                alert('오류가 발생했습니다: ' + error);
				this.ordCWork = false;
				this.pendingCancel = false;
				location.reload();
            });

			//let url = '/gooduser/api/v1/order/cancel';
			// let setData = {
			// 		'paymentId': Number(setId),
			// 		'memberId': Number(this.userId),
			// 		'paymentGroup' : null,
    		// 		'status' : 'C',
			// 	}
			// 	console.log(url);
			// 	console.log(setData);
            // await axios(url, cancelFormData,{headers: {'Content-Type': 'multipart/form-data'}}).then(res=>{
            //     console.log(res);
			// 	// alert(`${res.data.data.res_msg} [${res.data.data.res_cd}]`);
			// 	this.getShippingList();
            // }).catch(error => {
			// 	console.log(error.response)
			// 	alert(`오류 code: ${error.response.status}`);
			// });
		},

		async orderCancelAll (paymentProductGroup, shipIndex) {
			if (!confirm('주문을 취소하시겠습니까?')) {
				return false;
			}
			
			if (this.ordCWork) {
				return false;
			} else {
				this.ordCWork = true;
			}
			this.pendingCancel = true;

			let cancelFormData = new FormData();
			cancelFormData.append('paymentProductGroup', paymentProductGroup);
			cancelFormData.append('memberId', Number(this.userId));

			this.shippingList.detail.forEach((item, index) => {
				cancelFormData.append('paymentProductId', item.PAYMENT_PRODUCT_ID);
			});

			console.log(cancelFormData);
			console.log(paymentProductGroup);
			console.log(this.userId);
			// console.log(paymentProductId);

			for (var pair of cancelFormData.entries()) {
				console.log(pair[0]+ ', ' + pair[1]);
			}

			fetch('/gooduser/api/v1/order/cancel', {
				method: 'POST',
				body: cancelFormData
			})
            .then(response => response.json())
            .then(data => {
				console.log(data);
                if (data.message !== 'SUCCESS'){
					alert(data.message);
					location.reload();
					return;
				}

                alert('주문 취소가 완료되었습니다.');
                this.getShippingList();
				this.ordCWork = false;
				this.pendingCancel = false;
				location.reload();
            })
            .catch(error => {
				console.log(error);
                alert('오류가 발생했습니다: ' + error);
				this.ordCWork = false;
				this.pendingCancel = false;
				location.reload();
            });
		},

		writeReview() {
			this.$router.push({ path : '/gooduser/mypage/myreviewlist'});
			// this.$router.push({ path : '/gooduser/mypage/myaddr'});
		},

		openCancelPopup(orderItem, shipId, cancelType) {
			this.cancelPopupItem = orderItem;
			this.cancelShipId = shipId;
			if (cancelType == 'NP') {
				this.cancelPopupIsT2 = true;
				this.cancelPopupType = cancelType;
			} else {
				this.cancelPopupIsT2 = false;
			}

			this.cancelPopup = true;
		},
		openCancelClose() {
			// 초기화 후 닫기
			this.cancelPopup = false;
			this.cancelPopupItem = null;
			this.cancelShipId = null;
			this.cancelPopupIsT2 = false;
			this.cancelPopupType = null;
			this.cancelPopupText = '';
		},
		async openCancelWrite() {
			if (this.cancelPopupType == null) {
				alert('교환/반품 체크를 해주세요');
				return;
			}
			if (this.cancelPopupText == '') {
				alert('사유를 입력해주세요');
				return;
			}
			let postData = {
				userId: this.userId,
				shippingId: this.cancelShipId,
				shippingStatus: this.cancelPopupType,
				shippingHistoryType : 'P',
				shippingHistoryReason : this.cancelPopupText,
			}
			console.log(postData);

			let url = '/gooduser/api/v1/cancel_api/app';
			await axios({
                'method': 'post',
                'url': url,
                'data': postData,
				'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            }).then(res=>{
                console.log(res);
				this.getShippingList();
				this.openCancelClose();
            });
		},

		// 배송 날짜 변경 팝업
		shipDateChangeOpen(prodId, itemIndex, delvType, orderInfo, delvDate) {
			this.shipChangePopupProp = {
				prodId: prodId,
				itemIndex: itemIndex,
				delvType: delvType,
				orderInfo: orderInfo,
				delvDate: delvDate,
			}
			this.shipChangePopupShow = true;
		},
		shipDateChangeClose(isSucceess) {
			this.shipChangePopupShow = false;
			this.shipChangePopupProp = null;
			if (isSucceess) {
				this.loadFirst = true;
				this.getShippingList();
			}
		},

		// 구매 확정
		async setBuyComplete(orderId) {
			if (!confirm('구매를 확정하시겠습니까?')) {
				return false;
			}

			let postData = {
				shippingId: orderId,
				shippingStatus: 'Z',
			}
			console.log(postData);

			let url = '/gooduser/api/v1/shipping_api/end';
			await axios({
				'method': 'post',
				'url': url,
				'data': postData,
				'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
			}).then(res=>{
				console.log(res);
				this.getShippingList();
			});
		},

		// qna 문의 - 작성
		qnaWriteOpen(prodId, prodName) {
			this.qnaSetGoodsId = prodId;
			this.qnaSetGoodsName = prodName;
			this.qnaWritePop = true;
		},
		qnaWriteConfirmClose() {
			document.querySelector('#secretChkWrite').checked = false;
			document.querySelector('#passwordWrite').value = '';
			document.querySelector('#askDetailWrite').value = '';
			this.qnaWritePopConfirm = false;
			this.qnaWritePop = false;

			this.qnaSetGoodsId = null;
			this.qnaSetGoodsName = null;
		},
		async QnaWrite() {
			if (document.querySelector("#askDetailWrite").value == '') {
				alert('내용을 입력해주세요');
				return;
			}

			if (document.querySelector('#secretChkWrite').checked && document.querySelector("#passwordWrite").value == '') {
				alert('비밀번호를 입력해주세요');
				return;
			}

			// 상품 데이터 가져오기
			let prodData;
			let prodUrl = `/gooduser/api/v1/product_api/product_detail?prodId=${this.qnaSetGoodsId}`
            
            await axios.get(prodUrl,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				
				prodData = res.data.data;
			});

			let url = '/gooduser/api/v1/qna_write';
			let setData = {
				memberId: this.userId,
				productId: this.qnaSetGoodsId,
				isSecret: document.querySelector('#secretChkWrite').checked ? 'Y': 'N',
				content: document.querySelector('#askDetailWrite').value !=='' ? '' : document.querySelector('#askDetailWrite').value !=='',
				tenantId: prodData.memberTenantId,
				password: document.querySelector('#secretChkWrite').checked ?  document.querySelector('#passwordWrite').value : ''
			};
			
			
			await axios({
				'method': 'post',
				'url': url,
				'data': setData,
				'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
			}).then(res=>{
			
				this.qnaWriteConfirmClose();
			});
		},

		async callQnaOpen(prodId) {
			// 상품 데이터 가져오기
			let prodData;
			let prodUrl = `/gooduser/api/v1/product_api/product_detail?prodId=${prodId}`
            
            await axios.get(prodUrl,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				
				prodData = res.data.data;
			});

			this.callQnaName = prodData.partnerName;
			this.callQnaNumber = prodData.partnerBusinessPhoneNo;
			this.callQnaTime = prodData.partnerConsultationStr;
			this.callQnaPop = true;
		},

		callQnaClose() {
			this.callQnaName = null;
			this.callQnaNumber = null;
			this.callQnaTime = null;
			this.callQnaPop = false;
		},
        
		// 리뷰 작성
		async reviewWrite (idx, prodInfo) {
			let url = `/gooduser/api/v1/productreview/select`
			let setData = {
				productReviewId: idx,
			};
			await axios.post(url,setData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				
				this.reviewWriteData = JSON.parse(JSON.stringify(res.data.data));
				this.reviewWriteData.selectorJson = JSON.parse(this.reviewWriteData.selectorJson);
				this.reviewWriteData.product = {
					mainImage: prodInfo.MAIN_IMAGE_PATH,
					textName: prodInfo.TEXT_NAME,
				}
			});
			
			this.reviewWriteStar = '0';
			// this.reviewWriteData = JSON.parse(JSON.stringify(this.reviewList[idx]));
			this.deleteFile(0);
			this.deleteFile(1);
			this.deleteFile(2);
		},
		reviewWriteClose() {
			this.reviewWriteStar = '0';
			this.reviewWriteData = null;
			this.deleteFile(0);
			this.deleteFile(1);
			this.deleteFile(2);
		},
		async reviewWriteRequest () {
			let url = `/gooduser/api/v1/productreview/write`
			let chooseOption = '';
			this.reviewWriteData.selectorJson.forEach((item, index) => {
				if (index != 0) {
					chooseOption += ` / `;
				}
				chooseOption += `${item.value}: ${document.querySelector('#choose'+index).value}`;
			});
			
			let reviewSetData = {
				memberId: this.userId,
				productReviewId: this.reviewWriteData.id,
				starPoint: Number(this.reviewWriteStar),
				userImage1: this.upLoadFile[0].fileuuid ? this.upLoadFile[0].fileuuid : null,
				userImage2: this.upLoadFile[1].fileuuid ? this.upLoadFile[1].fileuuid : null,
				userImage3: this.upLoadFile[2].fileuuid ? this.upLoadFile[2].fileuuid : null,
				reviewDetail: this.reviewWriteData.reviewDetail,
				chooseJson: chooseOption,
			}
			
			await axios.post(url,reviewSetData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				
				alert('리뷰 등록이 완료되었습니다.');
				this.reviewWriteClose();
				this.loadFirst = true;
				this.getShippingList();
			});
		},

		// 파일 컨트롤러
		onFileChange(idx, e){
			this.upLoadFile[idx].attachFileName = e.target.files[0].name; //.files
			this.upLoadFile[idx].attachFile = e.target.files[0]
			
			this.uploadAttachment(idx, this.upLoadFile[idx].attachFile);
			const inputFile = document.getElementById(`reviewFile${idx}`);
			inputFile.value = '';
		},
		async uploadAttachment(idx, file) {
			let formData = new FormData();
			formData.append('attach', file); // 무조건 form에 attach 해서 보내야 하는가??
			
			await fetch('/gooduser/api/v1/attachment/upload', {
				method: 'POST',
				body: formData
			}).then((response) => response.json())
			.then((data) => {
				if (data.message === 'SUCCESS'){
					this.upLoadFile[idx].fileuuid = data.info.uuid
					this.upLoadFile[idx].real_url = data.info.real_url
				}
				else{
					return alert(data.message);
				}
			})
			.catch((error) => {
				alert('오류가 발생했습니다: ' + error);
				console.log(error);
			});
		},
		deleteFile(idx){
			this.upLoadFile[idx] = {};
		},
        
    },
    computed: {
        
    },
    mounted() {
    }
}

</script>
<style scoped>

</style>