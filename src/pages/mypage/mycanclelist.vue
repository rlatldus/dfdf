<template>
    <div>
    <HeaderComp :headerCase="'sub'" :pageName="'취소 내역'"/>
	<div class="loading" v-if="pending"></div>
    <div v-else id="content">
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
				<h3 class="title">취소 내역</h3>
				<div class="delivery_list">
					<!-- 리스트 필터 영역 -->
					<!-- <div class="list_filter">
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

								<button type="button" class="btn" @click="this.loadFirst = true; getShippingList();">조회하기</button>
							</form>
						</div>
					</div> -->
					<!-- 리스트 필터 영역 끝 -->

					<!-- 리스트 영역 -->
					<div class="content_none" v-if=" Object.keys(this.shippingList).length===0"><i></i><p>취소한 상품이 없습니다.</p></div>
					<div class="list_wrap">
						<div class="list" v-for="(item, index) in this.shippingList" :key="index">
							<div class="list_content">
								<strong class="lc_tit">
									<span v-if="item.isrtDate">취소일 : {{item.updtDate.substr(0, 10)}}</span>
									<span v-if="item.updtDate">주문일자 : {{item.isrtDate.substr(0, 10)}}</span>
									<span>주문번호 : {{item.orderNumber}}</span>
								</strong>
								<ul class="product_list">
									<li>
										<ul class="pdt_list">
											<li>
												<a href="javascript:;" class="img_area has-img">
													<img :src="item?.realUrl" :class="item?.realUrl">
												</a>
												<div class="pdt_info">
													<a href="javascript:;" >
														<strong class="name">{{item.textName}}</strong>
													</a>
												</div>
											</li>
										</ul>
										<div class="info_area">
											<span>
												<em class="price mont">{{threeCommaAdd(item.bagPrice)}}</em>원
											</span>
											<span>
												<em class="amount mont">{{item.bagCount}}</em>개
											</span>
										</div>
										<div class="btn_area">
											<p class="txt_state">구매취소</p>
											<!-- <p>
												<router-link :to='"/gooduser/goodslist/detail/"+itemOrderInfo.PRODUCT_ID' class="btn more2">
													상세보기<i></i>
												</router-link>
											</p> -->
										</div>
									</li>
								</ul>
							</div>
						</div>
						<!-- <div class="list">
							<div class="list_content">
								<strong class="lc_tit"><span>취소일 : 2022-05-03</span><span>주문일자 : 2022-05-03</span><span>주문번호 : 29000138571362</span></strong>
								<ul class="product_list">
									<li>
										<ul class="pdt_list">
											<li>
												<div class="img_area">
													<div class="img" style="background-image: url(../assets/images/dummy/goods_image_sample.png)">상품명이 출력되는 영역(최대 한 줄 길면 말 줄임)···</div>
												</div>
												<div class="pdt_info">
													<strong class="name">상품명이 출력되는 영역(최대 한 줄 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임)</strong>
													<ul class="option">
														<li>
															<span>선택 옵션명이 출력 되는 영역 입니다.</span>
														</li>
														<li>
															<span><em class="mont">1,000</em>원</span>
															<span>1개</span>
														</li>
													</ul>
												</div>
											</li>
										</ul>
										<div class="info_area">
											<span>
												<em class="price mont">10,000</em>원
											</span>
											<span>
												<em class="amount mont">1</em>개
											</span>
										</div>
										<div class="btn_area">
											<p class="txt_state">취소요청</p>
											<p><button type="button" class="btn popup-open" data-popup="#popup-cause">사유보기</button></p>
											<p><a href="cancle_detail.html" class="btn more2">상세보기<i></i></a></p>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="list">
							<div class="list_content">
								<strong class="lc_tit"><span>취소일 : 2022-05-03</span><span>주문일자 : 2022-05-03</span><span>주문번호 : 29000138571362</span></strong>
								<ul class="product_list">
									<li>
										<ul class="pdt_list">
											<li>
												<div class="img_area">
													<div class="img" style="background-image: url(../assets/images/dummy/goods_image_sample.png)">상품명이 출력되는 영역(최대 한 줄 길면 말 줄임)···</div>
												</div>
												<div class="pdt_info">
													<strong class="name">상품명이 출력되는 영역(최대 한 줄 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임)</strong>
													<ul class="option">
														<li>
															<span>전화문의</span>
														</li>
														<li>
															<span><em class="mont">1,000</em>원</span>
															<span>1개</span>
														</li>
													</ul>
												</div>
											</li>
										</ul>
										<div class="info_area">
											<span>
												<em class="price mont">2,000</em>원
											</span>
											<span>
												<em class="amount mont">1</em>개
											</span>
										</div>
										<div class="btn_area">
											<p class="txt_state">취소완료</p>
											<p><button type="button" class="btn popup-open" data-popup="#popup-cause">사유보기</button></p>
											<p><a href="cancle_detail.html" class="btn more2">상세보기<i></i></a></p>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="list">
							<div class="list_content">
								<strong class="lc_tit"><span>취소일 : 2022-05-03</span><span>주문일자 : 2022-05-03</span><span>주문번호 : 29000138571362</span></strong>
								<ul class="product_list">
									<li>
										<ul class="pdt_list">
											<li>
												<div class="img_area">
													<div class="img" style="background-image: url(../assets/images/dummy/goods_image_sample.png)">상품명이 출력되는 영역(최대 한 줄 길면 말 줄임)···</div>
												</div>
												<div class="pdt_info">
													<strong class="name">상품명이 출력되는 영역(최대 한 줄 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임)</strong>
													<ul class="option">
														<li>
															<span>전화문의</span>
														</li>
														<li>
															<span><em class="mont">1,000</em>원</span>
															<span>1개</span>
														</li>
													</ul>
												</div>
											</li>
										</ul>
										<div class="info_area">
											<span>
												<em class="price mont">2,000</em>원
											</span>
											<span>
												<em class="amount mont">1</em>개
											</span>
										</div>
										<div class="btn_area">
											<p class="txt_state">반품요청</p>
											<p><button type="button" class="btn popup-open" data-popup="#popup-cause">사유보기</button></p>
											<p><a href="cancle_detail.html" class="btn more2">상세보기<i></i></a></p>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="list">
							<div class="list_content">
								<strong class="lc_tit"><span>취소일 : 2022-05-03</span><span>주문일자 : 2022-05-03</span><span>주문번호 : 29000138571362</span></strong>
								<ul class="product_list">
									<li>
										<ul class="pdt_list">
											<li>
												<div class="img_area">
													<div class="img" style="background-image: url(../assets/images/dummy/goods_image_sample.png)">상품명이 출력되는 영역(최대 한 줄 길면 말 줄임)···</div>
												</div>
												<div class="pdt_info">
													<strong class="name">상품명이 출력되는 영역(최대 한 줄 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임)</strong>
													<ul class="option">
														<li>
															<span>전화문의</span>
														</li>
														<li>
															<span><em class="mont">1,000</em>원</span>
															<span>1개</span>
														</li>
													</ul>
												</div>
											</li>
										</ul>
										<div class="info_area">
											<span>
												<em class="price mont">2,000</em>원
											</span>
											<span>
												<em class="amount mont">1</em>개
											</span>
										</div>
										<div class="btn_area">
											<p class="txt_state">반품완료</p>
											<p><button type="button" class="btn popup-open" data-popup="#popup-cause">사유보기</button></p>
											<p><a href="cancle_detail.html" class="btn more2">상세보기<i></i></a></p>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="list">
							<div class="list_content">
								<strong class="lc_tit"><span>취소일 : 2022-05-03</span><span>주문일자 : 2022-05-03</span><span>주문번호 : 29000138571362</span></strong>
								<ul class="product_list">
									<li>
										<ul class="pdt_list">
											<li>
												<div class="img_area">
													<div class="img" style="background-image: url(../assets/images/dummy/goods_image_sample.png)">상품명이 출력되는 영역(최대 한 줄 길면 말 줄임)···</div>
												</div>
												<div class="pdt_info">
													<strong class="name">상품명이 출력되는 영역(최대 한 줄 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임)</strong>
													<ul class="option">
														<li>
															<span>전화문의</span>
														</li>
														<li>
															<span><em class="mont">1,000</em>원</span>
															<span>1개</span>
														</li>
													</ul>
												</div>
											</li>
										</ul>
										<div class="info_area">
											<span>
												<em class="price mont">2,000</em>원
											</span>
											<span>
												<em class="amount mont">1</em>개
											</span>
										</div>
										<div class="btn_area">
											<p class="txt_state">교환요청</p>
											<p><button type="button" class="btn popup-open" data-popup="#popup-cause">사유보기</button></p>
											<p><a href="cancle_detail.html" class="btn more2">상세보기<i></i></a></p>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="list">
							<div class="list_content">
								<strong class="lc_tit"><span>취소일 : 2022-05-03</span><span>주문일자 : 2022-05-03</span><span>주문번호 : 29000138571362</span></strong>
								<div class="lc_status">
									<div class="status02">
										<div class="company">
											<a href="javascript:;" class="btn">로젠택배 000000000000</a>
										</div>
									</div>
								</div>
								<ul class="product_list">
									<li>
										<ul class="pdt_list">
											<li>
												<div class="img_area">
													<div class="img" style="background-image: url(../assets/images/dummy/goods_image_sample.png)">상품명이 출력되는 영역(최대 한 줄 길면 말 줄임)···</div>
												</div>
												<div class="pdt_info">
													<strong class="name">상품명이 출력되는 영역(최대 한 줄 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임 길면 말 줄임)</strong>
													<ul class="option">
														<li>
															<span>전화문의</span>
														</li>
														<li>
															<span><em class="mont">1,000</em>원</span>
															<span>1개</span>
														</li>
													</ul>
												</div>
											</li>
										</ul>
										<div class="info_area">
											<span>
												<em class="price mont">2,000</em>원
											</span>
											<span>
												<em class="amount mont">1</em>개
											</span>
										</div>
										<div class="btn_area">
											<p class="txt_state">교환완료</p>
											<p><button type="button" class="btn popup-open" data-popup="#popup-cause">사유보기</button></p>
											<p><a href="cancle_detail.html" class="btn more2">상세보기<i></i></a></p>
										</div>
									</li>
								</ul>
							</div>
						</div> -->
						
						<div class="pagination" v-if="pageListCount > 0">
							<a href="javascript:;" class="first"
									v-if="pageFirst"
									@click="pagination(pageFirst, true)"
							>go first</a>
							<a href="javascript:;" class="prev"
									v-if="pagePrev"
									@click="pagination(pagePrev, true)"
							>go prev</a>

							<div class="page">
									<a href="javascript:;"
											v-for="pageNum in pagenationList"
											:key="pageNum"
											@click="pagination(pageNum, true)"
											:class="{'on': pageNum === thisPage}"
									>{{pageNum}}</a>
							</div>

							<a href="javascript:;" class="next"
									v-if="pageNext"
									@click="pagination(pageNext, true)"
							>go next</a>
							<a href="javascript:;" class="last"
									v-if="pageLast"
									@click="pagination(pageLast, true)"
							>go last</a>
						</div>
					</div>
					<!-- 리스트 영역 끝 -->
				</div>
			</div>
		</div>
	</div>

    <MobileNavComp :mNavType="my" />
    <FooterComp />
    </div>
</template>
<script>
import HeaderComp from '../../components/HeaderComp.vue';
import MobileNavComp from '../../components/MobileNavComp.vue';
import FooterComp from '../../components/FooterComp.vue';
import MymenuComp from '../../components/MymenuComp.vue';
import axios from "axios";
export default {
    name: "myCancelList",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  MymenuComp,
    },
    data: () => ({
		pending: true,
		userId: null,

        checkLike : 0,
		headerType: 'sub',

		// datepicker
		todayDate: new Date(),
		datepickerInput: null,
		range: {
			start: null,
			end: null,
		},
		masks: {
			input: 'YYYY-MM-DD',
		},

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
        // pending: false,
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
    }),
    created () {
		this.$store.commit('setState');
		this.userId = this.$store.state.userId;
		if (this.userId == null) {
            alert('로그인이 필요한 페이지 입니다.');
			this.$router.push('/gooduser');
		}

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
			let isoAddTxt;
			if (isStart) {
				isoAddTxt = '00:00:00'
			} else {
				isoAddTxt = '23:59:59'
				date.setDate(date.getDate() + 1);
			}

			let month = date.getMonth() + 1;
			let day = date.getDate();

			month = month >= 10 ? month : '0' + month;
			day = day >= 10 ? day : '0' + day;

			let returnDate = date.getFullYear() + '-' + month + '-' + day + 'T' + isoAddTxt;
            return returnDate;
        },
        
		moveMonth(rangeValue) {
			if (rangeValue == 'all') {
				this.range = {
					start : null,
					end: null
				}
				return;
			}
			let startDate = new Date();
			startDate.setMonth(this.todayDate.getMonth() - rangeValue);
			this.range = {
				start : startDate,
				end: this.todayDate
			}
		},

		async getShippingList(){
			let url = '/gooduser/api/v1/shipping_api/shipping_cancel_list';
			let setData = {
					memberId: this.userId,
					page: 1,
					stringStartDate: this.range?.start == null ? null : this.setDateISO(this.range?.start, true),
					stringEndDate: this.range?.end == null ? null : this.setDateISO(this.range?.end, false)
				}
				console.log(setData);
            await axios({
                'method': 'post',
                'url': url,
                'data': setData,
				'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            }).then(res=>{
                console.log(res);
				this.shippingList = res.data.data.content;

				// res.data.data.content.forEach((item, index) => {
				// 	this.shippingList[index].productMainImage = item.productMainImage.split('/')[3].replace('.jpg','').replace('.png','').replace('.gif','').replace('.wepp','');;
				// })
				this.pageListCount = res.data.data.totalElements;

				this.pending = false;
				if (this.loadFirst) {
					this.pagination(1);
				}
            })
	    },
		async pagination(currentPage, goTop) {
			if (goTop) {
				window.scrollTo({top: 0});
			}
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
    },
    computed: {
        
    },
    mounted() {
    }
}

</script>
<style scoped>

</style>