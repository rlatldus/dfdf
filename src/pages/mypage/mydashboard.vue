<template>
    <div>
		<div v-if="pending"></div>
        <HeaderComp :headerCase="'sub'" :pageName="'MY 굿샵'" />
        <div id="content" class="mob">
		<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
		<div class="mypage_wrap w-set">
			<!-- 마이페이지 좌측 메뉴 -->
			<MymenuComp />
			<!-- 마이페이지 좌측 메뉴 끝 -->

			<!-- 마이페이지 컨텐츠 -->
			<div class="mypage_con dashboard">
				<!-- 회원정보 -->
				<div class="member_info" v-if="this.userId != null">
					<div class="info_l">
						<p>
							<em class="vip mont">{{this.$store.state.userGrade}}</em>
							<span><strong>{{this.$store.state.name}}</strong> 님 반갑습니다.</span>
						</p>
					</div>
					<!-- <div class="info_r">
						<div class="dibs">
							<span>찜</span>
							<em><strong class="mont">00</strong>개</em>
						</div>
					</div> -->
				</div>
				<!-- 회원정보 끝 -->
				<!-- PC 마이페이지 대시보드 시작 -->
				<div class="delivery_status" v-if="shipCountRes">
					<!-- <div class="h3_title">주문 배송조회<span>(최근 1개월)</span></div> -->
					<div class="status ds02" :class="{'current': shipCount.successCount > 0}">
						<i></i>
						<p>결제완료</p>
						<em class="num mont">{{shipCount.successCount > 0 ? shipCount.successCount : 0}}</em>
					</div>
					<div class="status ds03" :class="{'current': shipCount.pendingCount > 0}">
						<i></i>
						<p>상품준비</p>
						<em class="num mont">{{shipCount.pendingCount > 0 ? shipCount.pendingCount : 0}}</em>
					</div>
					<div class="status ds04" :class="{'current': shipCount.deliveryCount > 0}">
						<i></i>
						<p>배송 중</p>
						<em class="num mont">{{shipCount.deliveryCount > 0 ? shipCount.deliveryCount : 0}}</em>
					</div>
					<div class="status ds05" :class="{'current': shipCount.shippedCount > 0}">
						<i></i>
						<p>배송완료</p>
						<em class="num mont">{{shipCount.shippedCount > 0 ? shipCount.shippedCount : 0}}</em>
					</div>
				</div>
				
				<h3 class="my_txt_h3">좋아요</h3>
				<div class="tab_area">
					<ul class="tab_type_01">
						<li :class="{'on': myDashTab === 1}"><a href="#tab1" @click="myDashTabAction(1)">상품</a></li>
						<li :class="{'on': myDashTab === 2}"><a href="#tab2" @click="myDashTabAction(2)">브랜드</a></li>
					</ul>
					<!--상품-->
					<div class="tab_box" :class="{'on': myDashTab === 1}">
						<div class="content_none" v-if="this.wishList?.length == 0"><i></i><p>찜한 상품이 없습니다.</p></div>
						<ul class="goods-list grid-3 m-grid-2" v-else>
							<li class="goods-item"  v-for="(data,index) in this.wishList" :key="index">
								<div class="pic">
									<div class="like">
										<input type="checkbox" :name="'itemLike'+data.product.id" :id="'itemLike'+data.product.id" @change="openPop(data.product.id)" checked>
										<label :for="'itemLike'+data.product.id">찜하기</label>
									</div>
									<router-link :to="`/gooduser/goodslist/detail/${data.product.id}`">
										<img :src="data?.realUrl" :alt="data?.realUrl">
									</router-link>
								</div>
								<router-link :to="`/gooduser/goodslist/detail/${data.product.id}`" class="goods-info">
									<span class="goods-name">
										<strong class="brand">{{data.product.brand.name}}</strong>
										<strong class="name">{{data.product.name}}</strong>
									</span>
									<span class="goods-price" v-if="this.userGrade == 'VIP'">
										<span class="orig" v-if="Number(data.product.vipSalePercent) > 0"><em class="num">{{threeCommaAdd(data.product.vipNormalPrice)}}</em>원</span>
										<span class="price-box">
											<span class="discount" v-if="Number(data.product.vipSalePercent) > 0"><em class="num">{{Math.ceil(Number(data.product.vipSalePercent))}}</em>%</span>
											<span class="price"><em class="num">{{threeCommaAdd(data.product.vipSellingPrice)}}</em>원</span>
										</span>
									</span>
									<span class="goods-price" v-else>
										<span class="orig" v-if="Number(data.product.normalSalePercent) > 0"><em class="num">{{threeCommaAdd(data.product.normalPrice)}}</em>원</span>
										<span class="price-box">
											<span class="discount" v-if="Number(data.product.normalSalePercent) > 0"><em class="num">{{Math.ceil(Number(data.product.normalSalePercent))}}</em>%</span>
											<span class="price"><em class="num">{{threeCommaAdd(data.product.normalSellingPrice)}}</em>원</span>
										</span>
									</span>
									<!-- <div class="goods-star">
										<em class="point">{{data.product.reviewStarPoint }}</em>
										<em class="count">({{data.product.reviewCount}})</em>
									</div> -->
									<span class="goods-tag">
										<em class="tag type-free" v-if="data.product.shippingFree == 'Y'">무료배송</em>
										<em class="tag type-new" v-if="data.product.isNew == 'Y'">NEW</em>
										<em class="tag type-best" v-if="data.product.isBest == 'Y'">BEST</em>
										<em class="tag type-event" v-if="data.product.isEvent == 'Y'">이벤트</em>
									</span>
								</router-link>
							</li>
						</ul>
					</div>
					<!--브랜드-->
					<div class="tab_box" :class="{'on': myDashTab === 2}">
						<ul class="my_brand_list" v-if="this.wishBrandList?.length > 0">
							<li v-for="(data,index) in this.wishBrandList" :key="index">
								<div class="pic">
									<div class="like">
										<input type="checkbox" name="bLike" id="bLike1" checked @change="openPop2(data.brandId)">
										<label for="bLike1" class="must-like">찜하기</label>
									</div>
									<div class="thumbnail" :style="`background-image: url('${data.logoJson?.realUrl}');`" @click="this.$router.push(`/gooduser/promotion/brand/list/${data.brandId}`)"></div>
								</div>
								<div class="b_title2">{{data.brandName}}</div>
							</li>
						</ul>
						<div class="content_none" v-else><i></i><p>찜한 브랜드가 없습니다.</p></div>
					</div>
				</div>
				<div class="my_board_info">
					<div class="my_qna">
						<div class="my_top_info">
							<h3>상품 Q&A 내역</h3>
							<router-link class="q_more" to="/gooduser/mypage/myqnalist">더보기+</router-link>
						</div>
						<ul>
							<li v-for="(item, index) in this.qnaList" :key="index">
								<router-link to="/gooduser/mypage/myqnalist">
									<strong class="ellipsis" v-if="item.isSecret == 'Y'">비밀글 입니다.</strong>
									<strong class="ellipsis" v-else>{{item.content}}</strong>
									<span>{{String(item.isrtDate).substr(0, 10)}}</span>
								</router-link>
							</li>
						</ul>
					</div>
					<div class="my_cust">
						<div class="my_top_info">
							<h3>고객센터</h3>
						</div>
						<div class="my_cust_info">
							<p>고객센터</p>
							<p>000-200-0020</p>
							<p>평일 09:00 ~ 17:00 토, 일, 공휴일 휴무</p>
						</div>
					</div>
				</div>
				<!-- PC 마이페이지 대시보드 끝-->
				<!-- 모바일 대시보드 시작-->
				<div class="mobile_menu">
					<hr class="m_hr">
					<ul class="dept01">
						<li :class="{'on': $route.path === '/mypage/myorder1'}"><router-link to ="/gooduser/mypage/myorder1">주문배송조회</router-link></li>
						<li :class="{'on': $route.path === '/mypage/mycanclelist'}"><router-link to ="/gooduser/mypage/mycanclelist">취소 내역</router-link></li>
						<li :class="{'on': ($route.path === '/mypage/mywish1' || $route.path === '/mypage/mywish2')}"><router-link to ="/gooduser/mypage/mywish1">찜 리스트</router-link></li>
						<li :class="{'on': $route.path === '/mypage/myrestockinfo'}"><router-link to ="/gooduser/mypage/myrestockinfo">재입고 알림</router-link></li>
						<li :class="{'on': ($route.path === '/mypage/mypresent1' || $route.path === '/mypage/mypresent2')}"><router-link to ="/gooduser/mypage/mypresent1">My선물함</router-link></li>
						<!-- <li :class="{'on': $route.path === '/mypage/myalert'}"><router-link to ="/gooduser/mypage/myalert">알림</router-link></li> -->
						<li class="on">
							<router-link to ="/gooduser/mypage/myreviewlist">마이 활동</router-link>
							<ul class="dept02">
								<li :class="{'on': $route.path === '/mypage/myreviewlist'}"><router-link to ="/gooduser/mypage/myreviewlist">나의 리뷰</router-link></li>
								<li :class="{'on': $route.path === '/mypage/myqnalist'}"><router-link to ="/gooduser/mypage/myqnalist">상품 Q&amp;A</router-link></li>
							</ul>
						</li>
						<li class="on">
							<a href="javascript:;">나의 정보</a>
							<ul class="dept02">
								<!-- <li><a href="javascript:;"  target="blank">회원정보수정</a></li> -->
								<li :class="{'on': ($route.path === '/mypage/myaddr' || $route.path === '/mypage/myaddrwrite')}"><router-link to ="/gooduser/mypage/myaddr">배송지관리</router-link></li>
								<li v-if="this.userId != null"><a href="javascript:;" @click="withdrawalSamsung">회원 탈퇴</a></li>
								<li v-if="this.userId != null"><a href="javascript:;" @click="logoutSamsung">로그아웃</a></li>
								
							</ul>
						</li>
					</ul>
				</div>
				<!-- 모바일 대시보드 end-->
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

	<ModalAlert
		v-if="this.modal2"
		:text="'찜 한 브랜드를 삭제하시겠습니까?'"
		:type="'confirm'"
		@confirm="wishdeletebrand"
		@close="this.modal2 = false"
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
import ModalAlert from '../../components/ModalAlert.vue';
import axios from "axios";
import moment from "moment";
export default {
    name: "myDashboard",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  MymenuComp,
	  ModalAlert,
    },
    data: () => ({
		userId: null,
        checkLike : 0,
		myDashTab: 1,
		wishList: [],
		wishBrandList: [],
		// 삭제 팝업
		modal1: false,
		modal2: false,
		deleteWish: false,
		deleteBrand: false,
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

		//qna 리스트
		qnaList: null,

		// 배송 카운트 관련
		shipCountRes: false,
		shipCount: null,
    }),
    created () {
		this.setState()
		this.$store.commit('setState');
		this.userId = this.$store.state.userId;
		this.userGrade = this.$store.state.userGrade;

		if (this.userId == null) {
            alert('로그인이 필요한 페이지 입니다.');
			this.$router.push('/gooduser');
		}

        this.getWishItem();
		this.getWishBrand();
		this.getQnaList();
		this.getShippingCount();
		
    },
    methods: {
		async setState(){
			let url = `/gooduser/api/v1/check_session`
			let ckData= {}
			if(localStorage.getItem('I')!= null){
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
			}
			
			
			
		},
		logoutSamsung(){
			this.$store.commit('logOut');
			localStorage.removeItem('T')
			localStorage.removeItem('C')
			localStorage.removeItem('I')
			localStorage.removeItem('G')
			localStorage.removeItem('N')
			localStorage.removeItem('TTL')
			localStorage.removeItem('shAI')
			localStorage.removeItem('GI')
			localStorage.removeItem('buy')
			localStorage.removeItem('cartLength')


			alert('로그아웃되었습니다.');
			let url = `/gooduser/api/v1/logOut`
			let logOutData = {}
			axios.post(url,logOutData).then(res=>{
				// console.log(res)
				if(res.data.code===200){
					if (this.$route.path === '/gooduser/' || this.$route.path === '/gooduser' || this.$route.path === '/gooduser/home') {
						this.$router.go(this.$router.currentRoute);
					} else {
						this.$router.push('/gooduser');
					}
				}
			});
		},
		withdrawalSamsung() {

            let urlHost = window.location.host.startsWith('goodshop') ?
			'https://www.golfsamsung.com' : 'https://qa.golfsamsung.com';
			
			let uA = navigator.userAgent;
			if (uA.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || uA.match(/LG|SAMSUNG|Samsung/) != null) {
				window.location.href = `${urlHost}/appReservation.do?method=joinDrop`
			} else {
				window.location.href = `${urlHost}/web/joinEdit.do?method=joinDrop`
			}
        },
		getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },
		threeCommaAdd(n){
			return (n || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},

		myDashTabAction(idx) {
			this.myDashTab = idx;
		},
		async getWishItem(){
			let postData = {
				"userId": this.userId,
				"page": 1,
			}
			await axios.post('/gooduser/api/v1/favorite/product_list', postData, {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				console.log('/gooduser/api/v1/favorite/product_list');
				console.log(res);
				this.wishList = []
				res.data.data.content.forEach((data, index) => {
					if (index < 4) {
						this.wishList.push(data);
					}
				});
				console.log('this.wishList')
				console.log(this.wishList)
			});
		},
		async getWishBrand(){
			let postData = {
                "userId": this.userId,
                "page": 1,
            }
            await axios.post('/gooduser/api/v1/favorite/brand_list/list', postData).then(res=>{
				console.log(res);
                this.wishBrandList = []
				res.data.data.content.forEach((data, index) => {
					if (index < 4) {
						this.wishBrandList.push(data);
					}
				});
				console.log('this.wishBrandList')
				console.log(this.wishBrandList)
			});
		},
		openPop(id) {
			this.modal1 = true;
			this.deleteWish = id;
		},
		async wishdelete() {
			let prodId = this.deleteWish;
			let postData = {
                "userId": this.userId,
                //"brandId": 2,
                "productId": prodId,
                //"type": " "
            }
			console.log(postData);

			let url = '/gooduser/api/v1/favorite/click_delete';
			await axios.post(url, postData).then(res=>{
				console.log(res);
				this.getWishItem();
				this.modal1 = false;
			});
		},
		openPop2(id) {
			this.modal2 = true;
			this.deleteBrand = id;
		},
		async wishdeletebrand() {
            let brandId = this.deleteBrand;
			let postData = {
                "brandId": brandId,
                "favoriteId": 0,
                "productId": 0,
                "type": " ",
                "userId": this.$store.state.userId
            }

            console.log('delete');
            let url = '/gooduser/api/v1/favorite/brand_list/delete';
            await axios.post(url, postData).then(res=>{
                console.log(res);
                this.modal2 = false;
                this.getWishBrand();
            });
		},
		// qna 리스트
		async getQnaList() {
            let url = '/gooduser/api/v1/qna_list';
            let setData = { "memberId": this.userId };
            await axios.post(url,setData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
                console.log(res);
                this.qnaList = res.data.data.content;
				// 3개까지만 노출
				this.qnaList = this.qnaList.slice(0,3);
            });
        },
		// 배송 카운트
		async getShippingCount(){
			let url = '/gooduser/api/v1/shipping_api/shipping_my_list_count';
			let setData = {
					'memberId': this.userId,
				}
			await axios({
				'method': 'post',
				'url': url,
				'data': setData
			}).then(res=>{
				console.log('##################### shipping_my_list_count #####################');
				console.log(res);
				this.shipCountRes = true;
				this.shipCount = res.data.data;
				this.pending = false;
			})
		},
        
    },
    computed: {
		setTTL(){
			let now = moment()
			let gap = moment.duration(now.diff(moment(localStorage.getItem('TTL')))).minutes()
			console.log(gap)
			return gap
		}
    },
    mounted() {
        // 상품 필터
        // document.querySelectorAll('.goods-search-menu > li.has-child > a').forEach(function(subCateBtn) {
        //     subCateBtn.addEventListener('click', function() {
        //         if (this.parentNode.classList.contains('on')) {
        //             this.parentNode.classList.remove('on');
        //         } else {
        //             document.querySelectorAll('.goods-search-menu > li').forEach(function(subCateBtnParent) {
        //                 subCateBtnParent.classList.remove('on');
        //             });
        //             this.parentNode.classList.add('on');
        //         }
        //     });
        // });
        // document.querySelectorAll('.goods-search-filter > a').forEach(function(subCateBtn) {
        //     subCateBtn.addEventListener('click', function() {
        //         if (this.classList.contains('on')) {
        //             this.classList.remove('on');
        //         } else {
        //             document.querySelectorAll('.goods-search-filter > a').forEach(function(subCateBtnParent) {
        //                 subCateBtnParent.classList.remove('on');
        //             });
        //             this.classList.add('on');
        //         }
        //     });
        // });
        // document.querySelector('.type-filter').addEventListener('click', function() {
        //     document.querySelector('.popup-bg').classList.add('on');
        //     document.querySelector('.goods-search').classList.add('on');
        // });
        // document.querySelector('.label-handle').addEventListener('click', function() {
        //     document.querySelector('.label-box').classList.toggle('on');
        // });
    //     $(document).ready(function(){
    //     $(".tab_area .tab_type_01 li a").on("click", function(){
    //     // 해당 요소를 클릭하는 내 자신의 index 번호를 가져온다. [0], [1]
    //     const num = $(".tab_area .tab_type_01 li a").index($(this));
    //     // 기존에 적용되어 있는 on class 삭제
    //     $(".tab_area .tab_type_01 li").removeClass("on");
    //     $(".tab_area .tab_box").removeClass("on");
    //     // 다음 요소 클릭시 on class 추가
    //     $('.tab_area .tab_type_01 li:eq(' + num + ')').addClass("on");
    //     $('.tab_area .tab_box:eq(' + num + ')').addClass("on");
    //     });
    // });
    }
}

</script>
<style scoped>

</style>