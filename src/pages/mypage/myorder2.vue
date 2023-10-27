<template>
    <div>
		<HeaderComp :headerCase="'sub'" :pageName="'주문 배송 조회'" />
		
		<div class="loading" v-if="pending"></div>
		<div id="content" v-else>
			<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
			<div class="mypage_wrap w-set">
				<!-- 마이페이지 좌측 메뉴 -->
				<MymenuComp />
				<!-- 마이페이지 좌측 메뉴 끝 -->

				<!-- 마이페이지 컨텐츠 -->
				<div class="mypage_con">
					<!-- 회원정보 -->
					<!-- <div class="member_info">
						<div class="info_l">
							<p>
								<em class="vip mont">VIP</em>
								<span><strong>홍길동</strong> 님 반갑습니다.</span>
							</p>
						</div>
						<div class="info_r">
							<div class="dibs">
								<span>찜</span>
								<em><strong class="mont">00</strong>개</em>
							</div>
						</div>
					</div> -->
					<!-- 회원정보 끝 -->
					<h3 class="title">주문 배송조회<span class="mshow">(최근 1개월)</span></h3>

					<div class="delivery_status" v-if="shipCountRes">
						<div class="status ds02" :class="{'current': shipCount?.successCount > 0}">
							<i></i>
							<p>결제완료</p>
							<em class="num mont">{{shipCount?.successCount > 0 ? shipCount?.successCount : 0}}</em>
						</div>
						<div class="status ds03" :class="{'current': shipCount?.pendingCount > 0}">
							<i></i>
							<p>상품준비</p>
							<em class="num mont">{{shipCount?.pendingCount > 0 ? shipCount?.pendingCount : 0}}</em>
						</div>
						<div class="status ds04" :class="{'current': shipCount?.deliveryCount > 0}">
							<i></i>
							<p>배송 중</p>
							<em class="num mont">{{shipCount?.deliveryCount > 0 ? shipCount?.deliveryCount : 0}}</em>
						</div>
						<div class="status ds05" :class="{'current': shipCount?.shippedCount > 0}">
							<i></i>
							<p>배송완료</p>
							<em class="num mont">{{shipCount?.shippedCount > 0 ? shipCount?.shippedCount : 0}}</em>
						</div>
					</div>

					<div class="delivery_list">
						<!-- 리스트 필터 영역 -->
						<div class="list_filter">
							<div class="lf_l">
								<div class="period_btn">
									<input type="radio" name="period" id="periodAll" @click="moveMonth('all')">
									<label for="periodAll">전체</label>
								</div>
								<div class="period_btn">
									<input type="radio" name="period" id="period1" @click="moveMonth(1)">
									<label for="period1">1개월</label>
								</div>
								<div class="period_btn">
									<input type="radio" name="period" id="period2" @click="moveMonth(3)">
									<label for="period2">3개월</label>
								</div>
								<div class="period_btn">
									<input type="radio" name="period" id="period3" @click="moveMonth(6)">
									<label for="period3">6개월</label>
								</div>
								<div class="period_btn">
									<input type="radio" name="period" id="period4" @click="moveMonth(12)">
									<label for="period4">12개월</label>
								</div>
							</div>
							<div class="lf_r">
								<form action="">
									<v-date-picker
										class="input_area period"
										v-model="range"
										mode="date"
										is-range
										:masks="masks"
										color="orange"
										:max-date="new Date()"
										ref="datepickerRange"
									>
										<template v-slot="{ inputValue, inputEvents }">
											<div class="p_input">
												<input
													:value="inputValue.start"
													v-on="inputEvents.start"
													class="so-datepicker"
													placeholder="Start Date"
												/>
											</div>
											<span>~</span>
											<div class="p_input">
											<input
												:value="inputValue.end"
												v-on="inputEvents.end"
												class="so-datepicker"
												placeholder="End Date"
											/>
											</div>
										</template>
									</v-date-picker>

									<!-- <div class="p_input">
										<input type="text" name="period_s" id="period_s" class="so-datepicker" placeholder="Start Date">
										<label for="period_s" class="blind">기간 시작</label>
									</div>
									<span>~</span>
									<div class="p_input">
										<input type="text" name="period_e" id="period_e" class="so-datepicker" placeholder="End Date">
										<label for="period_e" class="blind">기간 종료</label>
									</div> -->
									<button type="button" class="btn" @click="this.applyButtonSearch">조회하기</button>
								</form>
							</div>
						</div>
						<!-- 리스트 필터 영역 끝 -->

						<!-- 리스트 영역 -->
						<div class="list_wrap">
							<div class="content_none" v-if=" Object.keys(this.shippingList).length===0"><i></i><p>구매한 상품이 없습니다.</p></div>
							<div class="list" v-for="(item, index) in this.shippingList" :key="index">
								<div class="list_info">
									<div class="li_l">
										<strong class="date mont">{{String(item.isrtDate).substr(0, 10)}}</strong>
									</div>
									<div class="li_r">
										<router-link :to="'/gooduser/mypage/myorderdetail/'+item?.id" class="btn more">주문 상세보기</router-link>
									</div>
								</div>
								<div class="list_content" v-for="(itemOrderInfo, index2) in item.infoJson" :key="index2">
									<div v-if="item?.shippingStatus[index2]">
										<strong class="lc_tit">{{orderStatus(item?.shippingStatus[index2])}}</strong>
									</div>

									<div class="lc_status" v-if="
										(item.shippingSpecialDayType != 'NormalDelivery' && item.shippingSpecialDayType != null) ||
										itemOrderInfo.SHIPPING_LABEL_NUMBER != null
									">
										<div class="status01" v-if="item.shippingSpecialDayType == 'DayReservationDeliveryNormalDelivery'">
											<span>예약 배송&nbsp;&nbsp;<em class="date mont">{{item.shippingDate}}</em></span>
										</div>
										<div class="status01" v-if="item.shippingSpecialDayType == 'HolydayDeliveryChuseok'">
											<span>추석 예약 배송&nbsp;&nbsp;<em class="date mont">{{item.shippingDate}}</em></span>
										</div>
										<div class="status01" v-if="item.shippingSpecialDayType == 'HolydayDeliverySeolnal'">
											<span>설날 예약 배송&nbsp;&nbsp;<em class="date mont">{{item.shippingDate}}</em></span>
										</div>
										<div class="status01" v-if="item.shippingSpecialDayType == 'AniversaryDelivery'">
											<span>기념일 예약 배송&nbsp;&nbsp;<em class="date mont">{{item.shippingDate}}</em></span>
										</div>
										<div class="status01" v-if="item.shippingSpecialDayType == 'HolydayDelivery'">
											<span>휴일 예약 배송&nbsp;&nbsp;<em class="date mont">{{item.shippingDate}}</em></span>
										</div>
										<div class="status01" v-if="item.shippingSpecialDayType == 'GolfPlacePickupDelivery'">
											<span v-if="item.pickupPlace == '01'">안양 픽업&nbsp;&nbsp;<em class="date mont">{{item.shippingDate}}</em></span>
											<span v-if="item.pickupPlace == '02'">안성 픽업&nbsp;&nbsp;<em class="date mont">{{item.shippingDate}}</em></span>
											<span v-if="item.pickupPlace == '03'">가평 픽업&nbsp;&nbsp;<em class="date mont">{{item.shippingDate}}</em></span>
											<span v-if="item.pickupPlace == '04'">글렌로스 픽업&nbsp;&nbsp;<em class="date mont">{{item.shippingDate}}</em></span>
											<span v-if="item.pickupPlace == '05'">동래 픽업&nbsp;&nbsp;<em class="date mont">{{item.shippingDate}}</em></span>
										</div>

										<div class="status02" v-if="
											itemOrderInfo.SHIPPING_LABEL_NUMBER == null && 
											(item.shippingSpecialDayType != 'NormalDelivery' && item.shippingSpecialDayType != null) && 
											item.shippingSpecialDayType != 'DayReservationDeliveryNormalDelivery'
										">
											<a href="javascript:;" class="btn"
												@click="this.shipDateChangeOpen(itemOrderInfo.PRODUCT_ID, index2, item.shippingSpecialDayType, item)"
											>변경</a>
										</div>
										<div class="status02" v-if="itemOrderInfo.SHIPPING_LABEL_NUMBER">
											<div class="company">
												<a :href="itemOrderInfo.SHIPPING_LABEL_LINK" class="btn">{{itemOrderInfo.SHIPPING_LABEL_CARRIER}} {{itemOrderInfo.SHIPPING_LABEL_NUMBER}}</a>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="pagination" v-if="pageListCount > 0">
								<a href="javascript:;" class="first"
										v-if="pageFirst"
										@click="pagination(pageFirst)"
								>go first</a>
								<a href="javascript:;" class="prev"
										v-if="pagePrev"
										@click="pagination(pagePrev)"
								>go prev</a>

								<div class="page">
										<a href="javascript:;"
												v-for="pageNum in pagenationList"
												:key="pageNum"
												@click="pagination(pageNum)"
												:class="{'on': pageNum === thisPage}"
										>{{pageNum}}</a>
								</div>

								<a href="javascript:;" class="next"
										v-if="pageNext"
										@click="pagination(pageNext)"
								>go next</a>
								<a href="javascript:;" class="last"
										v-if="pageLast"
										@click="pagination(pageLast)"
								>go last</a>
							</div>
						</div>
						<!-- 리스트 영역 끝 -->
					</div>
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
											<div class="img" :style="`background-image: url(${getPic(upLoadFile[0].fileuuid)});`"></div>
											<button type="button" class="btn delete" @click="deleteFile(0)">삭제</button>
										</div>
									</li>
									<li>
										<div class="attach">
											<input type="file" name="reviewFile1" id="reviewFile1" @change="onFileChange(1, $event)">
											<label for="reviewFile1" class="fileBtn">사진첨부</label>
										</div>
										<div class="img_area" v-if="upLoadFile[1].fileuuid">
											<div class="img" :style="`background-image: url(${getPic(upLoadFile[1].fileuuid)});`"></div>
											<button type="button" class="btn delete" @click="deleteFile(1)">삭제</button>
										</div>
									</li>
									<li>
										<div class="attach">
											<input type="file" name="reviewFile2" id="reviewFile2" @change="onFileChange(2, $event)">
											<label for="reviewFile2" class="fileBtn">사진첨부</label>
										</div>
										<div class="img_area" v-if="upLoadFile[2].fileuuid">
											<div class="img" :style="`background-image: url(${getPic(upLoadFile[2].fileuuid)});`"></div>
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

		<MobileNavComp :mNavType="'my'" />
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
import moment from "moment";

export default {
    name: "myOrder1",
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

        checkLike : 0,

		// datepicker
		datepickerInput: null,
		range: {
			start: moment().clone().startOf('month').format('YYYY-MM-DDT00:00:00'),
			end: moment().format('YYYY-MM-DDT00:00:00'),
		},
		masks: {
			input: 'YYYY-MM-DD',
		},

		// 배송 카운트 관련
		shipCountRes: false,
		shipCount: null,

		// 리스트 데이터
		shippingList: null,

		// 페이징 변수
		pageListCount: 0,
		pagenationList: [],
		thisPage: 1,
		pageFirst: null,
		pagePrev: null,
		pageNext: null,
		pageLast: null,
		loadFirst: true,

        pending: true,
		mainLoadOk: false,
        // waves: [],
        // wave: null,
        // showDetail: false,
        // addWave: {
        //     _id: null,
        //     year: null,
        //     text: null,
        //     start: null,
        //     end: null,
        //     ranges: [],
        //     half: null
        // }

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
		]
    }),
    created () {
		this.$store.commit('setState');
		this.userId = this.$store.state.userId;
		if (this.userId == null) {
            alert('로그인이 필요한 페이지 입니다.');
			this.$router.push('/gooduser');
		}

		this.getShippingCount();
        this.getShippingList();
    },
    methods: {
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
		setDateISO(date, isStart){
			let makeDate
			if (isStart) {
				makeDate = moment(date).format('YYYY-MM-DDT00:00:00')
			} else {
				makeDate = moment(date).format('YYYY-MM-DDT23:59:59')
			}
            return makeDate;
        },

		moveMonth(rangeValue) {
			
			if (rangeValue == 'all') {
				this.range = {
					start : null,
					end: null
				}
				return;
			}
			//let now = moment().format('YYYY-MM-DD') // 현재 날짜
			let now2 = moment().format('MM') // 현재 날짜
			//moment 참고 https://velog.io/@dojunggeun/JavaScript-Moment.js%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-Date-Time-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0
			console.log(now2)
			let minMonth = moment().subtract(rangeValue, 'months').format('YYYY-MM-DD')
			console.log('minus Month : ' + minMonth)
			this.range = {
				start : minMonth,
				end: moment().format('YYYY-MM-DD')
			}
			
		},
		async getShippingCount(){
			let url = '/gooduser/api/v1/shipping_api/shipping_my_list_count';
			let setData = {
					'memberId': this.userId,
				}
			await axios.post(url,setData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).catch(error => {
				console.log(error)
				// alert(`오류 code: ${error.response.status}`);
			}).then(res=>{
				console.log('##################### shipping_my_list_count #####################');
				console.log(res);
				if (!res) {
					console.log('SHipping Count Load Undefined');
				} else {
					this.shipCountRes = true;
					this.shipCount = res.data.data;
				}
			})
		},
		applyButtonSearch() {
			// if (!this.pending) {
			// 	this.loadFirst = true;
			// 	this.getShippingList();
			// }
		},
		async getShippingList(){
			
			let url = '/gooduser/api/v2/shipping_api/shipping_my_list';
			let setData = {
					'memberId': this.userId,
					'page': this.thisPage,
					// 'sdate': this.range?.start == null ? null : this.setDateISO(this.range?.start, true),
					// 'edate': this.range?.end == null ? null : this.setDateISO(this.range?.end, false)
				}
				console.log(setData);
            await axios.post(url,setData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            ).catch(error => {
				console.log(error.response);
				this.pending = false;
				this.$router.push({
					path : `/404`
				})
			}).then(res=>{
				console.log('/gooduser/api/v2/shipping_api/shipping_my_list');
                console.log(res);
				
				this.shippingList = res.data.data.content;
				this.pageListCount = res.data.data.totalElements;

				this.shippingList.forEach((item, index) => {
					this.shippingList[index].paymentStatus = JSON.parse(item.paymentStatus);
					this.shippingList[index].infoJson = JSON.parse(item.infoJson);
					this.shippingList[index].shippingMethod = JSON.parse(item.shippingMethod);
					this.shippingList[index].shippingStatus = JSON.parse(item.shippingStatus);
				});

				console.log('/gooduser/api/v2/shipping_api/shipping_my_list222222222222');
				console.log( this.shippingList[0]);

				// for (let i=0; i<=this.shippingList.length; i++) {
				// 	let item = this.shippingList[i];
				// 	item.paymentStatus = JSON.parse(item.paymentStatus);
				// 	item.productJson = JSON.parse(item.productJson);
				// 	item.shippingMethod = JSON.parse(item.shippingMethod);
				// 	item.shippingStatus = JSON.parse(item.shippingStatus);
				// }
				
				

				
				if (this.loadFirst) {
					this.pagination(1);
				}

				this.pending = false;
			})
	    },
		async pagination(currentPage) {
			
			// 초기세팅
			let pageCut = 10,
				groupCut = 10;

			if (this.pageListCount <= pageCut) {
				this.pagenationList = [1];
				return
			};

			this.thisPage = currentPage;
			if (this.loadFirst) {
				this.loadFirst = false;
			} else {
				this.getShippingList();
			}

			let totalPage = Math.ceil(this.pageListCount/pageCut);
			let pageGroup = Math.ceil(currentPage/groupCut);

			let last = pageGroup * groupCut;
			let first;
			if (last > totalPage) {
				last = totalPage;
				first = (pageGroup * groupCut) - (groupCut - 1);
			} else {
				first = last - (groupCut - 1) <= 0 ? 1 : last - (groupCut - 1);
			}
			let next = last + 1;
			let prev = first - 1;

			if (prev > 0) {
				this.pageFirst = 1;
				this.pagePrev = prev;
			} else {
				this.pageFirst = false;
				this.pagePrev = false;
			}

			if (last < totalPage) {
				this.pageNext = next;
				this.pageLast = totalPage;
			} else {
				this.pageNext = false;
				this.pageLast = false;
			}

			this.pagenationList = [];
			for (let i = first; i <= last; i++) {
				this.pagenationList.push(i);
			}
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
				case 'NP' : result='구매 취소'; break;
				case 'NY' : result='구매 취소 완료'; break;
				case 'EP' : result='교환 접수'; break;
				case 'EY' : result='교환 승인'; break;
				case 'EN' : result='교환 불가'; break;
				case 'EE' : result='교환 완료'; break;
				case 'RP' : result='반품 접수'; break;
				case 'RY' : result='반품 승인'; break;
				case 'RN' : result='반품 불가'; break;
				case 'RE' : result='반품 완료'; break;
				default : result='관리자 문의'; break;
			}
			return result
		},

		// 취소 버튼
		async orderCancel (type, setId) {
			let url = '/gooduser/api/v1/kcp/cancel';
			let setData = {
					'paymentId': Number(setId),
					'memberId': Number(this.userId),
					'paymentGroup' : null,
    				'status' : 'C',
				}
				console.log(url);
				console.log(setData);
            await axios({
                'method': 'post',
                'url': url,
                'data': setData,
				'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            }).then(res=>{
                console.log(res);
				alert(`${res.data.data.res_msg} [${res.data.data.res_cd}]`);
				this.getShippingList();
            }).catch(error => {
				console.log(error.response)
				alert(`오류 code: ${error.response.status}`);
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
            }).catch(error => {
				console.log(error.response)
				alert(`오류 code: ${error.response.status}`);
			});
		},

		// 배송 날짜 변경 팝업
		shipDateChangeOpen(prodId, itemIndex, delvType, orderInfo) {
			this.shipChangePopupProp = {
				prodId: prodId,
				itemIndex: itemIndex,
				delvType: delvType,
				orderInfo: orderInfo,
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
			}).catch(error => {
				console.log(error.response)
				alert(`오류 code: ${error.response.status}`);
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
			}).catch(error => {
				console.log(error.response)
				alert(`오류 code: ${error.response.status}`);
			});

			let url = '/gooduser/api/v1/qna_write';
			let setData = {
				memberId: this.userId,
				productId: this.qnaSetGoodsId,
				isSecret: document.querySelector('#secretChkWrite').checked ? 'Y': 'N',
				content: document.querySelector('#askDetailWrite').value,
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
			}).catch(error => {
				console.log(error.response)
				alert(`오류 code: ${error.response.status}`);
			});
		},

		async callQnaOpen(prodId) {
			// 상품 데이터 가져오기
			let prodData;
			let prodUrl = `/gooduser/api/v1/product_api/product_detail?prodId=${prodId}`
            
            await axios.get(prodUrl,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				
				prodData = res.data.data;
			}).catch(error => {
				console.log(error.response)
				alert(`오류 code: ${error.response.status}`);
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
			}).catch(error => {
				console.log(error.response)
				alert(`오류 code: ${error.response.status}`);
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
			}).catch(error => {
				console.log(error.response)
				alert(`오류 code: ${error.response.status}`);
			});
		},

		// 파일 컨트롤러
		onFileChange(idx, e){
			this.upLoadFile[idx].attachFileName = e.target.files[0].name; //.files
			this.upLoadFile[idx].attachFile = e.target.files[0]
			console.log(this.upLoadFile[idx].attachFile)
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
		this.datepickerInput = this.$refs.datepickerRange;
		
    }
}

</script>
<style scoped>

</style>
