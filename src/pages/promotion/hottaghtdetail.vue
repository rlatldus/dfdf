<template>
    <div>
    <HeaderComp />
	<div class="loading" v-if="this.pendingReload"></div>
    <div class="loading" v-if="this.pending"></div>
    <div id="content" v-else>
		<div class="event-banner type-sample-bg" v-if="this.tagLoadOk">
			<div class="w-set">
				<h2><span class="mont">HOT <b>TAG</b></span> 기획전</h2>
				<div class="event-banner-tab">
					<router-link
						v-for="(item, index) in this.hotTag"
						:key="index"

						:to="`/gooduser/promotion/hottaghtdetail/${item.id}`"
						:class="{'on' : item.id == this.changeId}"
					># {{item.name}}</router-link>
				</div>
			</div>
		</div>

		<div class="w-set">
			<div class="event-goods">
				<div class="goods-list grid-4 m-grid-2">
					<li class="goods-item" v-for="(item, index) in this.hottagDetail" :key="index">
						<div class="pic">
							<div class="like">
								<input
									type="checkbox"
									:name="'itemlike'+item.PRODUCT_ID"
									:id="'itemlike'+item.PRODUCT_ID"
									:checked="checkLike === 1 || findLikeItem(item.PRODUCT_ID) ===1 ? true: false"
									@change="addLike(item.PRODUCT_ID, null, $event)"
								>
								<!--
									TODO:
									찜 등록 이벤트
									아이템 ID, 체크 상태, 회원ID(현재 11로 고정, 추후 변경 요청)
								-->
								<label :for="'itemlike'+item.PRODUCT_ID">찜하기</label>
							</div>
							<router-link :to="`/gooduser/goodslist/detail/${item.productId}`">
								<img :src="item.mainImagePath" :alt="item.mainImagePath">
							</router-link>
						</div>
						<router-link :to="`/gooduser/goodslist/detail/${item.productId}`" class="goods-info">
							<span class="goods-name">
								<strong class="brand">{{item.brandName}}</strong>
								<strong class="name">{{item.textName}}</strong>
							</span>
							<span class="goods-price">
								<span class="orig" v-if="item.vipSalePercent != '0.00' && item.normalSalePercent != '0.00'"><em class="num">{{threeCommaAdd(this.userGrade == 'VIP' ? item.vipNormalPrice : item.normalPrice)}}</em>원</span>
								<span class="price-box">
									<span class="discount" v-if="item.vipSalePercent != '0.00' && item.normalSalePercent != '0.00'"><em class="num">
										{{Math.ceil(Number(this.userGrade == 'VIP' ? item.vipSalePercent : item.normalSalePercent))}}</em>%
									</span>
									<span class="price"><em class="num">{{threeCommaAdd(this.userGrade == 'VIP' ? item.vipSellingPrice : item.normalSellingPrice)}}</em>원</span>
								</span>
							</span>
						</router-link>
					</li>
				</div>
			</div>
		</div>

		<div class="event-more">
			<a href="javacript:;" @click="move_To_List">목록</a>
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
import axios from "axios";

export default {
    name: "promotionHottag",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
    },
    data: () => ({
		// 기본 데이터
		pending: true,
		pendingReload: false,
		userId: null,
		userGrade: null,

		// 이벤트 리스트
		hotTag: null,
		hottagDetail: null,
		changeId: null,

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
		this.userGrade = this.$store.state.userGrade;

		this.changeId = this.$route.params.id;
		this.getLikeList();
		this.getHotList();
		this.getHotListDetail();
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

		async getHotList(){
			let url = `/gooduser/api/v1/promotion_api/hot_tag/list`
			let postData = {}
			await axios.post(url, postData).then(res=>{


				this.hotTag = res.data.data;
				this.tagLoadOk = true;
			});
		},

		async getHotListDetail(){
			let url = `/gooduser/api/v1/promotion_api/hot_tag/detail`
			let postData = {
				id: this.changeId,
				page: 1,
			}

			await axios.post(url, postData).then(res=>{

				this.hottagDetail = res.data.data;
				// // this.pageListCount = res.data.data.totalElements;
				this.pending = false;
				this.pendingReload = false;
			})
		},
		move_To_List(){
			this.$router.push({
				path : `/gooduser/promotion/hottag`
			});
		},

		addLike(itemId, brandId, e) {
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

            let postData = {
                "userId": this.userId,
                "brandId": brandId,
                "productId": itemId,
                "type": ' '
            }
            //alert(e.target.checked);

            let likeStatus;
            if (e.target.checked) {
                likeStatus = 0
            } else {
                likeStatus = 1
            }
            if (likeStatus == 0) {
                let url = '/gooduser/api/v1/favorite/click_add';
                axios.post(url, postData).then(res=>{

                    //this.checkLike = 1;
                });
            } else if (likeStatus == 1) {
                let url = '/gooduser/api/v1/favorite/click_delete';
                axios.post(url, postData).then(res=>{

                    //this.checkLike = 0;
                });
            } else {
                alert('error');
            }
        },

		async getLikeList(){
            let url = `/gooduser/api/v3/favorite/checkProduct`
            //type : 브랜드는 B , 상품은 P
            let lType = {type: 'P'}

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
    },
	watch: {
		$route() {
			document.querySelector('#catergory-all').classList.remove('on');
			document.querySelector('.header-category-all').classList.remove('on');
			this.pendingReload = true;
			this.changeId = this.$route.params.id;
			this.getHotListDetail();
		}
	},
    computed: {

    },
    mounted() {
    }
}

</script>
<style scoped>

</style>
