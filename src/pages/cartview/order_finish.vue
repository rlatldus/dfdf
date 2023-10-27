<template>
    <div>
        <HeaderComp />
        <div id="content">
			<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
			<div class="w-set">
				<div class="order_box" v-if="this.shippingList">
					<ul class="navi">
						<li>홈</li>
						<li>주문결제</li>
						<li>주문완료</li>
					</ul>
					<div class="title">
						<h2>주문완료</h2>
						<div class="ord_step">
							<div class="cart">장바구니</div>
							<div class="order">주문/결제</div>
							<div class="end current">주문완료</div>
						</div>
					</div>
					<div class="finish_txt">
						<strong>주문이 정상적으로 완료되었습니다.</strong>
						<span>{{memberData.name}}님 주문번호는 <em>{{shippingList.detail[0].ORDER_NUMBER}}</em> <div>주문일시는 <em>{{shippingList.isrtDate.replace('T', ' ')}}</em> 입니다.</div></span>
						<span>주문내역은 마이페이지 &gt; 주문/배송 조회에서 확인 가능합니다.</span>
					</div>
					<div class="section finish_info">
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
							<h3>결제 상품 내역</h3>
						</div>
						<div class="cart_box">
							<div class="cart_title">
								<ul>
									<li class="prd_info_box">상품정보</li>
									<li class="prd_price">금액</li>
									<li class="quantity">수량</li>
									<li class="ord_price">결제금액</li>
									<li class="delivery">배송정보</li>
								</ul>
							</div>
							<div class="cart_list">
								<ul>
									<li v-for="(itemOrderInfo, index2) in shippingList.detail" :key="index2">
										<!--상품정보-->
										<div class="product_box">
											<div class="prd_info_box">
												<dl>
													<dt>
														<router-link :to="`/gooduser/goodslist/detail/${itemOrderInfo.PRODUCT_ID}`" class="thumbnail">
															<img :src="itemOrderInfo.MAIN_IMAGE_URL" :alt="itemOrderInfo.MAIN_IMAGE_URL">
														</router-link>
													</dt>
													<dd>
														<!-- <p><strong class="txt_brand">1캘러웨이</strong></p> -->
														<p><span class="txt_prdname ellipsis_row">{{itemOrderInfo.TEXT_NAME}}</span></p>
														<p>
															<!-- <span class="txt_org font_mont">8,000원</span>
															<span class="txt_discount"><strong class="font_mont">30</strong>%</span> -->
															<span class="txt_price"><strong class="font_mont">{{threeCommaAdd(itemOrderInfo.PRODUCT_PRICE)}}</strong>원</span>
														</p>
													</dd>
												</dl>
											</div>
											<div class="prd_price">
												<strong class="font_mont">{{threeCommaAdd(itemOrderInfo.PRODUCT_PRICE)}}</strong> 원
											</div>
											<div class="quantity">
												{{itemOrderInfo.BAG_COUNT}}
											</div>
											<div class="ord_price">
												<strong class="txt_ord_price font_mont">{{threeCommaAdd(itemOrderInfo.REAL_CALC_PRICE)}}</strong> 원
											</div>
											<div class="delivery">
												{{shippingList.nickname}}
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div class="cart_sum">
								<ul>
									<li class="sum_box_area">합계</li>
									<li class="ord_price">{{shippingCount}}</li>
									<li class="delivery"><strong class="font_mont">{{threeCommaAdd(totalPrice)}}</strong>원</li>
									<li class="delivery"></li>
								</ul>
							</div>
						</div>
						<!--결제 수단-->
						<div class="h3_title">
							<h3>결제 수단</h3>
						</div>
						<div class="box_ord_man">
							<dl>
								<dt>최종 결제 금액</dt>
								<dd>{{threeCommaAdd(totalPrice)}} 원</dd>
							</dl>
							<dl>
								<dt>총 건수</dt>
								<dd>총 {{shippingCount}}건</dd>
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
								<span class="txt"><strong class="font_mont" >{{this.threeCommaAdd(this.shippingPrice)}}</strong> 원</span>
							</div>
							<span class="mark" v-if="this?.giftPrice"><span class="minus">빼기</span></span>
							<div class="sum_price" :class="{'type-4': this?.giftPrice}" v-if="this?.giftPrice">
								<span class="tit">기프트카드</span>
								<span class="txt"><strong class="font_mont" >{{this.threeCommaAdd(this.giftPrice)}}</strong> 원</span>
							</div>
							<span class="mark"><span class="equal">총합계</span></span>
							<div class="sum_price total" :class="{'type-4': this?.giftPrice}">
								<span class="tit">결제 예정 금액</span>
								<span class="txt"><strong strong class="font_mont">{{this.threeCommaAdd(this.totalPrice)}}</strong> 원</span>
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
							<router-link to="/gooduser/goodslist/list/3" class="btn btn_dark_gray_solid">계속 쇼핑하기</router-link>
							<router-link to="/gooduser/mypage/myorder1" class="btn btn_dark_gray">주문내역확인</router-link>
						</div>
						<div class="finish_banner">
							<a href="javascript:;" @click="move_To_Reservation"><img src="../../assets/images/cart/banner.png" alt="삼성골프예약바로가기배너"></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 컨텐츠 End-->
		
		<MobileNavComp />
		<FooterComp />
    </div>
</template>
<script>
import HeaderComp from '../../components/HeaderComp.vue';
import MobileNavComp from '../../components/MobileNavComp.vue';
import FooterComp from '../../components/FooterComp.vue';
import axios from "axios";
export default {
    name: "order_finish",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
    },
    data: () => ({
		// userInfo
		userId: null,
		pending: true,

		// 리스트 데이터
		shippingList: null,
		// 선물 데이터
		shippingGiftData: null,

		// 총가격
		orderPrice: 0,
		// 총배송비
		shippingPrice: 0,
		// 카운트
		shippingCount: 0,

		// 보낸이 데이터
		memberData: null,

        checkLike : 0,
		presentToggle: 0,
        giftPrice: 0
    }),
    created () {
		// shAI buy cartLength
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
		async getShippingList(){
			let url = '/gooduser/api/v1/shipping_api/shipping_my_detail/'+this.$route.params.id;
			//let url = '/gooduser/api/v1/shipping_api/shipping_my_detail/'+5;
			let setData = {
					'memberId': this.userId,
				}
				
            await axios({
                'method': 'post',
                'url': url,
                'data': setData,
				'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            }).then(res=>{
                
				
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

		async getOrderData(){
			let url = ` `
			await axios.get(url).then(res=>{
				
			})

		},

		move_To_Reservation(){
			let uA = navigator.userAgent;
			if (uA.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || uA.match(/LG|SAMSUNG|Samsung/) != null) {
				window.location.href = `https://www.golfsamsung.com/reve/mo/reserve/choice.do`;
			} else {
				window.location.href = `https://www.golfsamsung.com/reve/pc/reserve/choice.do`;
			}
		},

		receiptView( tno, ordr_idxx, amount ) 
        {
            
            receiptWin = "https://testadmin8.kcp.co.kr/assist/bill.BillActionNew.do?cmd=card_bill&tno=";
            receiptWin += tno + "&";
            receiptWin += "order_no=" + ordr_idxx + "&"; 
            receiptWin += "trade_mony=" + amount ;
    
            window.open(receiptWin, "", "width=455, height=815"); 
        },
    
        /* 현금 영수증 */ 
        /* 실결제시 : "https://admin8.kcp.co.kr/assist/bill.BillActionNew.do" */ 
        /* 테스트시 : "https://testadmin8.kcp.co.kr/assist/bill.BillActionNew.do" */   
        receiptView2( cash_no, ordr_idxx, amount ) 
        {
            receiptWin2 = "https://testadmin8.kcp.co.kr/assist/bill.BillActionNew.do?cmd=cash_bill&cash_no=";
            receiptWin2 += cash_no + "&";             
            receiptWin2 += "order_id="     + ordr_idxx + "&";
            receiptWin2 += "trade_mony="  + amount ;
    
            window.open(receiptWin2, "", "width=370, height=625"); 
        },
    
        /* 가상 계좌 모의입금 페이지 호출 */
        /* 테스트시에만 사용가능 */
        /* 실결제시 해당 스크립트 주석처리 */
        receiptView3() 
        {
            receiptWin3 = "http://devadmin.kcp.co.kr/Modules/Noti/TEST_Vcnt_Noti.jsp"; 
            window.open(receiptWin3, "", "width=520, height=300"); 
        },
		preventBack(){
			window.onpopstate = (event)=>{
				history.pushState(null,null,location.href);
				window.onbeforeunload = null
				if(event.persisted){
					// if(event.originalEvent.persisted){
					window.history.forward()
					window.location.href = `/gooduser`;
					this.$router.push({
						path : `/gooduser`
					})
				}
			}
			window.onpageshow = (event)=>{
				history.pushState(null,null,location.href);
				window.onbeforeunload = null
				if(event.persisted){
					// if(event.originalEvent.persisted){
					window.history.forward()
					window.location.href = `/gooduser`;
					this.$router.push({
						path : `/gooduser`
					});
				}
			}
		},
        
        
    },
    computed: {
        
    },
    mounted() {
		
		this.preventBack();
    }
}

</script>
<style scoped>
</style>