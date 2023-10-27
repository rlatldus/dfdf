<template>
    <div>
        <HeaderComp />
        <div id="content">

		<!-- 브랜드 타이틀 -->
		<h2 class="promotion-brand-name w-set for-pc">브랜드</h2>
		<!-- 브랜드 타이틀 끝 -->

		<!-- 베스트 브랜드 롤링 -->
		<div class="poromotion-brand-slide">
			<div class="w-set">
				<h3 class="brnad-list-title"><b>베스트</b>&nbsp;브랜드</h3>
				<div class="promo-slide swiper-container">
					<swiper
						class="swiper-wrapper"
						:modules="modules"
						:loop="false"
						:autoplay="{
							delay: 5000,
						}"
						:slidesPerView='5'
						:spaceBetween='40'
						:breakpoints="{
							1: {
								slidesPerView: 2,
								spaceBetween: 10
							},
							1480: {
								slidesPerView: 5,
								spaceBetween: 40,
							}
						}"
					>
						<swiper-slide class="promo-s-list swiper-slide" v-for="(items, index) in this.bestBrandList" :key="index">
							<div class="promo-s-img">
								<a href="javascript:;" @click="move_To_brand_list(items.id)"><img :src="items.logoJson?.realUrl" :alt="items.name+'로고'"></a>
								<div class="like">
									<input type="checkbox" name="itemLike" :id="`itemLikePromo${items.id}`"
									:checked="checkLike === 1 || findLikeItem(items.id) ===1 ? true: false" @change="addLikeBrand($event, items.id)">
									<label :for="`itemLikePromo${items.id}`">찜하기</label>
								</div>
							</div>
							<div class="promo-s-txt"><a href="javascript:;" @click="move_To_brand_list(items.id)">{{items.name}}</a></div>
						</swiper-slide>
					</swiper>
				</div>
			</div>
		</div>
		<!-- 베스트 브랜드 롤링 끝 -->

		<div class="w-set">
			<div class="goods-wrap type-brand">
				<!-- 브랜드 sort -->
				<!-- <div class="brand-sort">
					<h3 class="brnad-list-title for-pc"><b>브랜드</b> 찾기</h3>

					<div class="brand-letter-filter-wrap">
						<ul class="brand-letter-filter">
							<li class="all on"><button type="button">전체</button></li>
							<li><button type="button">ㄱ</button></li>
							<li><button type="button">ㄴ</button></li>
							<li><button type="button">ㄷ</button></li>
							<li><button type="button">ㄹ</button></li>
							<li><button type="button">ㅁ</button></li>
							<li><button type="button">ㅂ</button></li>
							<li><button type="button">ㅅ</button></li>
							<li><button type="button">ㅇ</button></li>
							<li><button type="button">ㅈ</button></li>
							<li><button type="button">ㅊ</button></li>
							<li><button type="button">ㅋ</button></li>
							<li><button type="button">ㅌ</button></li>
							<li><button type="button">ㅍ</button></li>
							<li><button type="button">ㅎ</button></li>
							<li class="eng"><button type="button">abc</button></li>
						</ul>
					</div>

				</div> -->

				<h3 class="brnad-list-title"><b>브랜드</b>&nbsp;찾기</h3>
				<div class="brand-search">
					<p class="b-s-bef-text for-pc">브랜드</p>
					<form action="javascript:;" class="b-s-form">
						<input type="text" placeholder="타이틀리스트" v-model="searchword" @change="search()">
						<button type="submit" @click="search()">검색</button>
					</form>
				</div>

				<div class="promo-s-wrap pc-5 t-3 m-2">
					<div class="promo-s-list" v-for="(items, idx) in mainBrandList" :key="idx">
						<div class="promo-s-img">
							<a href="javascript:;" @click="move_To_brand_list(items.id)"><img :src="items.logoJson?.realUrl" :alt="items.name+'로고'"></a>
							<div class="like">
								<input type="checkbox" name="itemLike" :id="`itemLikePromoUnder${items.id}`"
								:checked="checkLike === 1 || findLikeItem(items.id) === 1 ? true: false"
								@change="addLikeBrand($event, items.id)">
								<label :for="`itemLikePromoUnder${items.id}`">찜하기</label>
							</div>
						</div>
						<div class="promo-s-txt"><a href="javascript:;" @click="move_To_brand_list(items.id)">{{items.name}}</a></div>
					</div>

				</div>
			</div>
		</div>
	</div>

    <MobileNavComp />
    <FooterComp />
    </div>
</template>
<script>
import HeaderComp from '../../components/HeaderComp.vue';
import MobileNavComp from '../../components/MobileNavComp.vue';
import FooterComp from '../../components/FooterComp.vue';
import {Autoplay, Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import axios from "axios";

export default {
    name: "promotionBrand",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  Swiper,
      SwiperSlide,
    },
    data: () => ({
        checkLike : 0,
		pending: true,
        // user
        userId: null,
        userGrade: null,
		mainBrandList:null,
		bestBrandList: null,
		searchword: null,
        likeArr: [],

		// 베스트 / 일반 동시 체크 이벤트 중복 방지
		// likeActionStop: false,
    }),
    created () {
		this.$store.commit('setState');
		this.userId = this.$store.state.userId;

		this.getLikeList();
		this.mainBrandApi();
		this.bestBrandApi();
    },
    methods: {
        async mainBrandApi(){
            let url = `/gooduser/api/v1/brand_api/brand_all`
            await axios.post(url).then(res=>{

                this.mainBrandList = res.data.data;
            })
        },

		async bestBrandApi(){
            let url = `/gooduser/api/v1/brand_api/best_brand`
			let brandData = {userId: this.userId}
            await axios.post(url, brandData).then(res=>{

                this.bestBrandList = res.data.data;
				if (this.bestBrandList?.length > 0) {
					this.bestBrandList.forEach((item, index) => {
						if (item.logoJson != null) {
							item.logoJson = JSON.parse(item.logoJson);
						}
					})
				}
            })
        },
		async getLikeList(){
            let url = `/gooduser/api/v3/favorite/checkProduct`
            //type : 브랜드는 B , 상품은 P
            let lType = {type: 'B'}

            await axios.post(url,lType).then(res=>{

                this.likeArr = !res.data.data ? [] : res.data.data
            })

        },
        findLikeItem(index){
            if(!!this.likeArr){
                if(this.likeArr.indexOf(index)>-1){
                    return 1
                }else{
                    return 0
                }
            }
        },

		getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },
		move_To_brand_list(brandId){
            this.linkMove = true;
            // if (!this.$store.state.userId) {
            //     alert('로그인이 필요한 기능입니다.');
            //     this.gotoSamsung();
            //     return;
            // }
			this.$router.push({
				path : `/gooduser/promotion/brand/list/${brandId}`
			})
		},

		addLikeBrand(e, brandId) {
			if (this.userId == null) {
                alert('로그인이 필요한 기능입니다.');

                let param = window.atob('Y2xpZW50X2lkPTQmcmVkaXJlY3RfdXJsPS9nb29kdXNlci9jYWxsYmFjaw==')


                // 로그인 모바일 PC 케이스
                // 로컬 / 실서버 / qa 대응
                let urlHost = window.location.host.startsWith('goodshop') ?
                  'https://www.golfsamsung.com' : 'https://qa.golfsamsung.com';

                let uA = navigator.userAgent;
                if (uA.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || uA.match(/LG|SAMSUNG|Samsung/) != null) {
                    window.location.href = `${urlHost}/appMain.do?method=appLogin`
                } else {
                    window.location.href = `${urlHost}/web/join.do?method=loginMav`
                }
                return;
            }
            let url = '/gooduser/api/v1/favorite/only_brand_click_add';
            let postData = {
                "brandId": brandId,
                "type": "",
                "userId": this.userId,
            }
            if (e.target.checked) {

                axios.post(url, postData).then(res=>{

					// 중복 케이스가 있는 경우
					let chk1 = document.querySelector(`#itemLikePromo${brandId}`);
					let chk2 = document.querySelector(`#itemLikePromoUnder${brandId}`);
					if ( chk1 && chk2 ) {
						chk1.checked = true;
						chk2.checked = true;
					}
                });
            } else {

                url = '/gooduser/api/v1/favorite/brand_list/delete';
                axios.post(url, postData).then(res=>{

					// 중복 케이스가 있는 경우
					let chk1 = document.querySelector(`#itemLikePromo${brandId}`);
					let chk2 = document.querySelector(`#itemLikePromoUnder${brandId}`);
					if ( chk1 && chk2 ) {
						chk1.checked = false;
						chk2.checked = false;
					}
                });
            }
        },
		search(){
			let regExp1 = !this.searchword ? '' : new RegExp(this.searchword, 'gi')

			let tmp = this.mainBrandList
			if(!this.searchword){
				this.mainBrandApi()
			}else{
				this.mainBrandList = tmp.filter(ri=>{
					return ri.name.match(regExp1)
				})
			}


		}

    },
	setup() {
        return {
            modules: [Navigation, Pagination, Autoplay],
        };
    },
    computed: {
    },
    mounted() {
    }
}

</script>
<style scoped>

</style>
