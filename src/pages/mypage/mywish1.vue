<template>
    <div>
        <HeaderComp :headerCase="'sub'" :pageName="'찜리스트'" />
		<div class="loading" v-if="pending"></div>
        <div id="content" class="mob" v-else>
			<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
			<div class="mypage_wrap w-set">
				<!-- 마이페이지 좌측 메뉴 -->
				<MymenuComp />
				<!-- 마이페이지 좌측 메뉴 끝 -->

				<!-- 마이페이지 컨텐츠 -->
				<div class="mypage_con wish_list mob_wrap">
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
								<em><strong class="mont">{{wishAllCount}}</strong>개</em>
							</div>
						</div>
					</div> -->
					<!-- PC 마이페이지 대시보드 시작 -->
					<h3 class="my_txt_h3">좋아요</h3>
					<div class="tab_area">
						<ul class="tab_type_01">
							<li class="on"><router-link to ="/gooduser/mypage/mywish1">상품</router-link></li>
							<li><router-link to ="/gooduser/mypage/mywish2">브랜드</router-link></li>
						</ul>
					</div>
					<p class="my_total_info"><strong>전체 (<span>{{wishAllCount}}</span>)개</strong></p>
					<div class="content_none" v-if=" Object.keys(this.myWishList).length===0"><i></i><p>찜한 상품이 없습니다.</p></div>
					<div class="cart_box" v-else>
						<div class="cart_title">
							<ul>
								<li class="prd_info_box">상품정보</li>
								<li class="prd_price">가격</li>
								<li class="sel_btn">관리</li>
							</ul>
						</div>
						<div class="cart_list">
							<ul >
								<li v-for="(wishdata, index) in myWishList" :key="index">
									<!--상품정보-->
									<div class="product_box">
										<div class="prd_info_box">
											<dl>
												<dt><router-link :to="`/gooduser/goodslist/detail/${!wishdata.product.id? '': wishdata.product.id}`" class="thumbnail">
													<img :src="wishdata?.realUrl" :alt="wishdata?.realUrl" />
												</router-link></dt>
												<dd>
													<p><strong class="txt_brand" v-if="wishdata.product.brand">{{wishdata.product.brand.name}}</strong></p>
													<p><span class="txt_prdname ellipsis_row">{{wishdata.product.textName ?  wishdata.product.textName : wishdata.product.name}}</span></p>
												</dd>
											</dl>
										</div>
										<div class="prd_price" v-if="this.userGrade == 'VIP'">
											<strong class="font_mont">{{(wishdata.product.vipSellingPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</strong> 원
										</div>
										<div class="prd_price" v-else>
											<strong class="font_mont">{{(wishdata.product.normalSellingPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</strong> 원
										</div>
										<div class="sel_btn">
											<!-- <p><a href="javascript:;" class="btn_dark_gray_solid" @click="wishAddCart(wishdata.product)">장바구니</a></p> -->
											<p><button type="button" class="btn_dark_gray_solid" @click="openPop(wishdata.product.id)">삭제</button></p>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="pagination">
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

		<ModalAlert
			v-if="this.modal1"
			:text="'찜 한 상품을 삭제하시겠습니까?'"
			:type="'confirm'"
			@confirm="wishdelete"
			@close="this.modal1 = false"
		/>

		<MobileNavComp :mNavType="'like'" />
		<FooterComp />

    </div>
</template>
<script>
import HeaderComp from '../../components/HeaderComp.vue';
import MobileNavComp from '../../components/MobileNavComp.vue';
import FooterComp from '../../components/FooterComp.vue';
import MymenuComp from '../../components/MymenuComp.vue';
import ModalAlert from '../../components/ModalAlert.vue';
import axios from "axios";
export default {
    name: "myWish1",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  MymenuComp,
	  ModalAlert,
    },
    data: () => ({
		// 로딩후 표시함
		pending: true,

		userId: null,
        checkLike : 0,
		myWishList: [],
		wishAllCount: 0,
		// 페이징 변수
		pagenationList: [],
		thisPage: 1,
		pageFirst: null,
		pagePrev: null,
		pageNext: null,
		pageLast: null,
		loadFirst: true,
		// 삭제 팝업
		modal1: null,
		deleteWish: null,
		tmpData: null,

		
    }),
    created() {
		this.$store.commit('setState');
		this.userId = this.$store.state.userId;
		this.userGrade = this.$store.state.userGrade;
		
		if (this.userId == null) {
            alert('로그인이 필요한 페이지 입니다.');
			this.$router.push('/gooduser');
		}
		
		console.time("Performance Time");
		
		this.getWishItem();
        
    },
    mounted() {

		
		
    },
    methods: {
		getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },
		async getWishItem(){
			let postData = {
				userId: this.userId,
				page: this.thisPage,
			}
			
			let url = '/gooduser/api/v1/favorite/product_list'
			

			await axios.post(url, postData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=> {
				
				this.tmpData = res.data.data
				this.myWishList = this.tmpData.content;
				this.wishAllCount = this.tmpData.numberOfElements;
				if (!this.myWishList) {
					this.pagination(1);
				}
				
				console.timeEnd('Performance Time');
				
				
				this.pending = false;
			});
			
			//this.pending = false;
		},
		async wishAddCart(goodsInfo){
			// TODO: 상품 상세와 떨어지는 product 정보가 다른상태.
			let url = `/gooduser/api/v1/cart/detail_cart_in`

			let sendData ={
				memberId: this.$store.state.userId,
				cartType : 'Basket',
				cartStatus: 'BuyBefore',
				shippingType: 'Normal',
				product : goodsInfo
			} 
			await axios.post(url,sendData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				
			})
		},
		openPop(id) {
			this.modal1 = true;
			this.deleteWish = id;
		},
		wishdelete() {
			let prodId = this.deleteWish;
			let postData = {
                "userId": this.userId,
                
                "productId": prodId,
                
            }
			

			let url = '/gooduser/api/v1/favorite/click_delete';
			axios.post(url, postData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				
				this.getWishItem();
				this.modal1 = false;
			});
		},
		async pagination(currentPage, goTop) {
			if (goTop) {
				window.scrollTo({top: 0});
			}
			// 초기세팅
			let pageCut = 20,
				groupCut = 10;

			if (this.wishAllCount <= pageCut) return;

			this.thisPage = currentPage;
			if (this.loadFirst) {
				this.loadFirst = false;
			} else {
				this.getWishItem();
			}

			let totalPage = Math.ceil(this.wishAllCount/pageCut);
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
		}
        
        
    },
    computed: {
        
    }
}

</script>
<style scoped>

</style>
