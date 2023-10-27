<template>
    <div>
        <HeaderComp :headerCase="'sub'" :pageName="'재입고 알림'"/>
        <div id="content">
		<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
		<div class="mypage_wrap w-set">
			<!-- 마이페이지 좌측 메뉴 -->
			<MymenuComp />
			<!-- 마이페이지 좌측 메뉴 끝 -->
			<!-- 마이페이지 컨텐츠 -->
			<div class="mypage_con restock">
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
				<h3 class="title">재입고 알림</h3>
				<!-- 리스트 필터 영역 -->
				<div class="delivery_list">
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
									<button type="button" class="btn" @click="this.loadFirst = true; loadRestockList();">조회하기</button>
								</form>
							</div>
						</div>
				</div>
				<!-- 리스트 필터 영역  끝 -->
				<div class="my_total_info  mob_wrap">
					<strong>전체 (<span>{{this.pageListCount}}</span>)개</strong>
				</div>
				
				<!-- 알림리스트  끝 -->
				<div class="content_none" v-if=" this.stockAlertData.length===0"><i></i><p>알림 목록이 없습니다.</p></div>
				<div class="cart_box  mob_wrap" v-else>
					<div class="cart_title">
						<ul>
							<li class="prd_info_box">상품명</li>
							<li class="hp_num">휴대폰번호</li>
							<li class="apply_date">신청일</li>
							<li class="sel_btn">상태</li>
						</ul>
					</div>
					<div class="cart_list">
						<ul>
							<li v-for="(item, index) in this.stockAlertData">
								<div class="product_box">
									<div class="prd_info_box">
										<dl>
											<dt>
												<router-link :to="`/gooduser/goodslist/detail/${item.productId}`" class="thumbnail">
													<img :src="getPic(item.mainImagePath.split('/')[3].replace('.jpg','').replace('.png','').replace('.gif','').replace('.wepp',''))" :alt="item.textName">
												</router-link>
											</dt>
											<dd>
												<p><span class="txt_prdname ellipsis_row">{{item.textName}}</span></p>
												<p class="ellipsis_box">
													<span class="txt_opt ellipsis">{{item.optionDataName}}</span>
												</p>
											</dd>
										</dl>
									</div>
									<p class="txt_alerm" v-if="item.status == 'P'">알림예정</p>
									<p class="txt_alerm" v-if="item.status == 'Y'">알림완료</p>
									<div class="hp_num">
										{{item.phone}}
									</div>
									<div class="apply_date">
										{{item.isrtDate.slice(0,10)}}
									</div>
									<div class="sel_btn">
										<p class="txt_orange" v-if="item.status == 'P'">알림예정</p>
										<p class="txt_orange" v-if="item.status == 'Y'">알림완료</p>
										<p class="txt_alerm2" v-if="item.status == 'Y' && item.sendDate != null">({{item.sendDate.slice(0,10)}})</p>

										<p><button type="button" class="btn_dark_gray_solid" v-if="item.status == 'P'" @click="this.deleteRestockList(item.id)">삭제</button></p>
										<p><button type="button" class="btn_dark_gray_solid" v-if="item.status == 'Y'">장바구니 담기</button></p>
									</div>
								</div>
							</li>
							<!-- <li>
								<div class="product_box">
									<div class="prd_info_box">
										<dl>
											<dt><a href="#" class="thumbnail"><img src="../../assets/images/dummy/goods_image_sample.png" alt="[2만 마일리지+올인원 헤드커버 증정] 캘러웨이 22 로그 ST PRO남성 스틸 7 아이언"></a></dt>
											<dd>
												<p><strong class="txt_brand">1캘러웨이</strong></p>
												<p><span class="txt_prdname ellipsis_row">[2만 마일리지+올인원 헤드커버 증정] 캘러웨이 22 로그 ST PRO남성 스틸 7 아이언그 ST PRO남성 스틸 7 아이언그 ST PRO남성 스틸 7 아이언</span></p>
											</dd>
										</dl>
									</div>
									<p class="txt_alerm">알림완료 <span>(2022-05-30)</span></p>
									<div class="hp_num">
										010-4092-****
									</div>
									<div class="apply_date">
										2022-05-30
									</div>
									
									<div class="sel_btn">
										<p class="txt_orange">알림완료</p>
										<p class="txt_alerm2">(2022-05-30)</p>
										<p><button type="button" class="btn_dark_gray_solid">장바구니 담기</button></p>
									</div>
									
								</div>
							</li> -->
						</ul>
					</div>
				</div>

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
		</div>
	</div>

        <MobileNavComp :mNavType="'my'" />
        <FooterComp />
    </div>
</template>
<script>
import HeaderComp from '../../components/HeaderComp.vue';
import MobileNavComp from '../../components/MobileNavComp.vue';
import FooterComp from '../../components/FooterComp.vue';
import MymenuComp from '../../components/MymenuComp.vue';
import axios from "axios";
import moment from "moment";
export default {
    name: "myRestockInfo",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  MymenuComp,
    },
    data: () => ({
		pending: true,

		userId: null,

		// datepicker
		datepickerInput: null,
		range: {
			start: moment().clone().startOf('month').format('YYYY-MM-DD'),
			end: moment().format('YYYY-MM-DD'),
		},
		masks: {
			input: 'YYYY-MM-DD',
		},

		stockAlertData: [],

		// 페이징 변수
		pageListCount: 0,
		pagenationList: [],
		thisPage: 1,
		pageFirst: null,
		pagePrev: null,
		pageNext: null,
		pageLast: null,
		loadFirst: true,
    }),
    created () {
		this.$store.commit('setState');
		this.userId = this.$store.state.userId;
		if (this.userId == null) {
            alert('로그인이 필요한 페이지 입니다.');
			this.$router.push('/gooduser');
		}

		console.time("Performance Time");
		console.log('created');

        this.loadRestockList();
    },
    methods: {
		// 기본 유틸리티
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
				makeDate = moment(date).format('YYYY-MM-DD')
			} else {
				// 하루 추가해서 던져야 데이터가 나옴
				makeDate = moment(date).add(1, 'days').format('YYYY-MM-DD')
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

        async loadRestockList() {
			let url = `/gooduser/api/v1/stockNotify/list`
			let prodData={
				memberId: this.userId,
				strStartDate: this.range?.start == null ? '' : this.setDateISO(this.range?.start, true),
				strEndDate: this.range?.end == null ? '' : this.setDateISO(this.range?.end, false),
				page: this.thisPage,
			};
			
			await axios.post(url,prodData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				
				res.data.data.content.forEach((item, index) => {
					item.phone = item.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`).slice(0,9) + '****';
				});
				this.stockAlertData = res.data.data.content;
				this.pageListCount = res.data.data.totalElements;
				if (this.loadFirst) {
					this.pagination(1);
				}
				this.pending = false;
			});
		},

		async deleteRestockList(sendId) {
			let url = `/gooduser/api/v1/stockNotify/delete`
			let prodData={
				memberId: this.userId,
				id: sendId,
			};
			
			await axios.post(url,prodData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				
				this.loadFirst = true;
				this.loadRestockList();
			});
		},

		// 페이징
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
				this.loadRestockList();
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