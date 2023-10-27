<template>
    <div>
    <HeaderComp :headerCase="'sub'" :pageName="'My 선물함'"/>
	<div id="content" class="mob">
		<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
		<div class="mypage_wrap w-set">
			<!-- 마이페이지 좌측 메뉴 -->
			<MymenuComp />
			<!-- 마이페이지 좌측 메뉴 끝 -->

			<!-- 마이페이지 컨텐츠 -->
			<div class="mypage_con present restock">
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
				<!-- PC 마이페이지 대시보드 시작 -->
				<h3 class="my_txt_h3">My 선물함</h3>
				<!-- <div class="tab_area">
					<ul class="tab_type_01">
						<li class="on"><router-link to ="/gooduser/mypage/mypresent1">보낸 선물함</router-link></li>
						<li><router-link to ="/gooduser/mypage/mypresent2">받은 선물함</router-link></li>
					</ul>
				</div> -->
				<!-- 리스트 필터 영역 -->
				<!-- <div class="delivery_list">
					<div class="list_filter">
						<div class="lf_l">
							<div class="period_btn">
								<input type="radio" name="period" id="periodAll" checked>
								<label for="periodAll">전체</label>
							</div>
							<div class="period_btn">
								<input type="radio" name="period" id="period1">
								<label for="period1">1개월</label>
							</div>
							<div class="period_btn">
								<input type="radio" name="period" id="period2">
								<label for="period2">3개월</label>
							</div>
							<div class="period_btn">
								<input type="radio" name="period" id="period3">
								<label for="period3">6개월</label>
							</div>
							<div class="period_btn">
								<input type="radio" name="period" id="period4">
								<label for="period4">12개월</label>
							</div>
						</div>
						<div class="lf_r">
							<form action="">
								<div class="input_area period">
									<div class="p_input">
										<input type="text" name="period_s" id="period_s" class="so-datepicker" placeholder="Start Date">
										<label for="period_s" class="blind">기간 시작</label>
									</div>
									<span>~</span>
									<div class="p_input">
										<input type="text" name="period_e" id="period_e" class="so-datepicker" placeholder="End Date">
										<label for="period_e" class="blind">기간 종료</label>
									</div>
								</div>
								<button type="button" class="btn">조회하기</button>
							</form>
						</div>
					</div>
				</div> -->
				<!-- 리스트 필터 영역  끝 -->
				<p class="my_total_info mob_wrap"><strong>전체 (<span>{{pageListCount}}</span>)개</strong></p>
				<div class="cart_box present mob_wrap">
						<div class="cart_title">
							<ul>
								<li class="prd_info_box">상품명</li>
								<li class="deliv_txt">배송지 입력 여부</li>
								<li class="apply_date">받는 사람</li>
								<li class="sel_btn">선물일시</li>
							</ul>
						</div>
						<div class="content_none" v-if=" Object.keys(this.shippingList).length===0"><i></i><p>선물 목록이 없습니다.</p></div>
						<div class="cart_list" v-else>
							<ul>
								<li v-for="(item, index) in this.shippingList" :key="index">
									<div class="product_box">
										<div class="prd_info_box">
											<dl>
												<dt>
													<router-link :to='"/gooduser/goodslist/detail/"+item.product.id' class="thumbnail">
														<!-- <img :src="this.getPic(item.product.mainImage)" :alt="item.product.textName"> -->
														<img :src="item.realUrl" :alt="item.realUrl">
													</router-link>
												</dt>
												<dd>
													<p><strong class="txt_brand" v-if="item.product.brand">{{item.product.brand}}</strong></p>
													<p><span class="txt_prdname ellipsis_row">{{item.product.textName ? item.product.textName : item.product.name}}</span></p>
													<!-- <p class="ellipsis_box" v-for="(option, index) in item.bag.chooseOption" :key="index">
														<span class="txt_opt ellipsis">{{option.key}} / {{option.amount}}개 / {{option.value}}원</span>
													</p> -->
													<!-- <p class="ellipsis_box" style="margin-top: 10px;" v-if="item.giftStatus == 'P'">
														<span class="txt_opt ellipsis">
															<a :href='"/gooduser/etc/gift/giftcert?id="+item.id+"&phone="+item.recipientTel+"&code="' target="_blank">배송지입력</a>
														</span>
													</p> -->
												</dd>
											</dl>
										</div>
										<!--모바일 배송지 이력여부-->
										<p class="txt_alerm">
											<span v-if="item.giftStatus == 'P' || item.giftStatus == 'NumberChkComplete'">미입력</span>
											<span v-else-if="item.giftStatus == 'Refuse'">거절</span>
											<span v-else-if="item.giftStatus == 'ShippingAddressInputComplete' || item.giftStatus == 'ShippingAddressInputComplete2'">입력완료</span>
										</p>
										<div class="deliv_txt">
											<span v-if="item.giftStatus == 'P' || item.giftStatus == 'NumberChkComplete'">미입력</span>
											<span v-else-if="item.giftStatus == 'Refuse'">거절</span>
											<span v-else-if="item.giftStatus == 'ShippingAddressInputComplete' || item.giftStatus == 'ShippingAddressInputComplete2'">입력완료</span>
											<!-- <span>거절</span> -->
											<!-- <span>거절</span> -->
										</div>
										<div class="apply_date">
											{{item.recipientName}} <span>{{item.expirePresantDate.replace('T',' ')}}</span>
										</div>
										<div class="sel_btn">
											<p>{{item.expirePresantDate.replace('T',' ')}}</p>
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
										<p class="txt_alerm">미입력</p>
										<div class="deliv_txt">
											미입력
										</div>
										<div class="apply_date">
											김기영 <span>2022-05-30 10:00:00</span>
										</div>
										<div class="sel_btn">
											<p>2022-05-30 10:00:00</p>
											<p><button type="button" class="btn_dark_gray_solid">구매취소</button></p>
										</div>
									</div>
								</li>
								<li>
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
										<p class="txt_alerm">입력완료</p>
										<div class="deliv_txt">
											입력완료
										</div>
										<div class="apply_date">
											김기영<span>2022-05-30 10:00:00</span>
										</div>
										<div class="sel_btn">
											<p>2022-05-30 10:00:00</p>
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
export default {
    name: "myPresent1",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  MymenuComp,
    },
    data: () => ({
		userId: null,

        checkLike : 0,

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
		

		async getShippingList(){
			// let url = '/gooduser/api/v1/gift_api/myList';
			let url = '/gooduser/api/v1/gift_api/myList0';
			let setData = {
					// 'memberId': this.userId,
					'memberId': this.userId,
					// 'stringStartDate': null,
					// 'stringEndDate': null,
					'page': this.thisPage,
					// 'stringStartDate': this.range?.start == null ? null : this.setDateISO(this.range?.start, true),
					// 'stringEndDate': this.range?.end == null ? null : this.setDateISO(this.range?.end, false)
				}
				console.log(setData);
            await axios({
                'method': 'post',
                'url': url,
                'data': setData,
				'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            }).then(res=>{
                console.log(res);

				// res.data.data.content.forEach((item, index) => {
				// 	res.data.data.content[index].bag.chooseOption = JSON.parse(item.bag.chooseOption);
				// 	// res.data.data.content[index].detail.forEach((item2, index2) => {
				// 	// 	console.log(item2.MAIN_IMAGE_PATH.split('/'));
				// 	// 	res.data.data.content[index].detail[index2].MAIN_IMAGE_PATH = item2.MAIN_IMAGE_PATH.split('/')[3].replace('.jpg','').replace('.png','').replace('.gif','').replace('.wepp','');
				// 	// 	res.data.data.content[index].detail[index2].BAG_OPTION = JSON.parse(item2.BAG_OPTION);
				// 	// 	res.data.data.content[index].detail[index2].CHOOSE_OPTION = JSON.parse(item2.CHOOSE_OPTION);
				// 	// });
				// })

				this.shippingList = res.data.data.content;
				// res.data.data.content.forEach((item, index) => {
				// 	res.data.data.content[index].detail = JSON.parse(item.detail);
				// 	res.data.data.content[index].detail.forEach((item2, index2) => {
				// 		res.data.data.content[index].detail[index2].BAG_OPTION = JSON.parse(item2.BAG_OPTION);
				// 		res.data.data.content[index].detail[index2].CHOOSE_OPTION = JSON.parse(item2.CHOOSE_OPTION);
				// 	});
				// })

				this.shippingList = res.data.data.content;
				this.pageListCount = res.data.data.numberOfElements;

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
	}
}

</script>
<style scoped>

</style>