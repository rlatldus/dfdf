<template>
    <div>
    <HeaderComp />
    <div id="content">

		<div class="tv-view">
			<div class="bg"></div>
			<div class="w-set">
				<h2>{{golfTvDetailData.name}}</h2>
				<div class="movie-view">
					<iframe width="100%" height="100%" :src="golfTvDetailData.link" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				</div>
			</div>
		</div>

		<div class="w-set for-tv-view">
			<ul class="goods-list grid-4 m-grid-2">
				<li class="goods-item" v-for="(goods, idx) in JSON.parse(golfTvDetailData.detail)" :key="idx">
                    <!-- VIP용-->
                    <div v-if="this.grade==='VIP' && goods.IS_VIP==='Y' && goods.IS_NORMAL==='N'">
                        <div class="pic">
                            <div class="like">
                                <input
                                    type="checkbox"
                                    :name="'itemlike'+goods.PRODUCT_ID"
                                    :id="'itemlike'+goods.PRODUCT_ID"
                                    :checked="checkLike === 1 || findLikeItem(goods.PRODUCT_ID) ===1 ? true: false"
                                    @change="addLike(goods.PRODUCT_ID, null, $event)"
                                >
                                <!--
                                    TODO:
                                    찜 등록 이벤트
                                    아이템 ID, 체크 상태, 회원ID(현재 11로 고정, 추후 변경 요청)
                                -->
                                <label :for="'itemlike'+goods.PRODUCT_ID">찜하기</label>
                            </div>
                            <router-link :to="`/gooduser/goodslist/detail/${goods.PRODUCT_ID}`">
                                <img :src="goods.MAIN_IMAGE_PATH" :alt="goods.MAIN_IMAGE_PATH">
                            </router-link>
                        </div>
                        <router-link :to="`/gooduser/goodslist/detail/${goods.PRODUCT_ID}`" class="goods-info">
                            <span class="goods-name">
                                <strong class="brand">{{goods.MANUFACTURER}}</strong>
                                <strong class="name">{{goods.TEXT_NAME}}</strong>
                            </span>
                            <span class="goods-price" v-if="this.grade === 'VIP' && goods.VIP_NORMAL_PRICE!= 0 ">
                                <span class="orig"><em class="num">{{threeCommaAdd(goods.VIP_NORMAL_PRICE)}}</em>원</span>
                                <span class="price-box">
                                    <span class="discount"><em class="num">{{Math.ceil(Number(goods.VIP_SALE_PERCENT))}}</em>%</span>
                                    <span class="price"><em class="num">{{threeCommaAdd(goods.VIP_SELLING_PRICE)}}</em>원</span>
                                </span>
                            </span>
                            <span class="goods-star">
                                <em class="point">{{goods.REVIEW_STAR_POINT}}</em>
                                <em class="count">({{goods.REVIEW_COUNT}})</em>
                            </span>
                        </router-link>
                    </div>
                    <!-- 일반용-->
                    <div v-if="this.grade==='NORMAL' && goods.IS_NORMAL==='Y' && goods.IS_VIP==='N'">
                        <div class="pic">
                            <div class="like">
                                <input
                                    type="checkbox"
                                    :name="'itemlike'+goods.PRODUCT_ID"
                                    :id="'itemlike'+goods.PRODUCT_ID"
                                    :checked="checkLike === 1 || findLikeItem(goods.PRODUCT_ID) ===1 ? true: false"
                                    @change="addLike(goods.PRODUCT_ID, null, $event)"
                                >
                                <!--
                                    TODO:
                                    찜 등록 이벤트
                                    아이템 ID, 체크 상태, 회원ID(현재 11로 고정, 추후 변경 요청)
                                -->
                                <label :for="'itemlike'+goods.PRODUCT_ID">찜하기</label>
                            </div>
                            <router-link :to="`/gooduser/goodslist/detail/${goods.PRODUCT_ID}`">
                                <img :src="goods.MAIN_IMAGE_PATH" :alt="goods.MAIN_IMAGE_PATH">
                            </router-link>
                        </div>
                        <router-link :to="`/gooduser/goodslist/detail/${goods.PRODUCT_ID}`" class="goods-info">
                            <span class="goods-name">
                                <strong class="brand">{{goods.MANUFACTURER}}</strong>
                                <strong class="name">{{goods.TEXT_NAME}}</strong>
                            </span>
                            <span class="goods-price">
                                <span class="orig"><em class="num">{{threeCommaAdd(goods.NORMAL_PRICE)}}</em>원</span>
                                <span class="price-box">
                                    <span class="discount"><em class="num">{{Math.ceil(Number(goods.NORMAL_SALE_PERCENT))}}</em>%</span>
                                    <span class="price"><em class="num">{{threeCommaAdd(goods.NORMAL_SELLING_PRICE)}}</em>원</span>
                                </span>
                            </span>
                            <span class="goods-star">
                                <em class="point">{{goods.REVIEW_STAR_POINT}}</em>
                                <em class="count">({{goods.REVIEW_COUNT}})</em>
                            </span>
                        </router-link>
                    </div>

                    <!--전체-->
                    <div v-if="goods.IS_NORMAL=='Y' &&goods.IS_VIP=='Y'">
                        <div class="pic">
                            <div class="like">
                                <input
                                    type="checkbox"
                                    :name="'itemlike'+goods.PRODUCT_ID"
                                    :id="'itemlike'+goods.PRODUCT_ID"
                                    :checked="checkLike === 1 || findLikeItem(goods.PRODUCT_ID) ===1 ? true: false"
                                    @change="addLike(goods.PRODUCT_ID, null, $event)"
                                >
                                <!--
                                    TODO:
                                    찜 등록 이벤트
                                    아이템 ID, 체크 상태, 회원ID(현재 11로 고정, 추후 변경 요청)
                                -->
                                <label :for="'itemlike'+goods.PRODUCT_ID">찜하기</label>
                            </div>
                            <router-link :to="`/gooduser/goodslist/detail/${goods.PRODUCT_ID}`">
                                <img :src="goods.MAIN_IMAGE_PATH" :alt="goods.MAIN_IMAGE_PATH">
                            </router-link>
                        </div>
                        <router-link :to="`/gooduser/goodslist/detail/${goods.PRODUCT_ID}`" class="goods-info">
                            <span class="goods-name">
                                <strong class="brand">{{goods.MANUFACTURER}}</strong>
                                <strong class="name">{{goods.TEXT_NAME}}</strong>
                            </span>
                            <span class="goods-price" v-if="this.grade === 'NORMAL' && goods.NORMAL_PRICE!= 0 ">
                                <span class="orig"><em class="num">{{threeCommaAdd(goods.NORMAL_PRICE)}}</em>원</span>
                                <span class="price-box">
                                    <span class="discount"><em class="num">{{Math.ceil(Number(goods.NORMAL_SALE_PERCENT))}}</em>%</span>
                                    <span class="price"><em class="num">{{threeCommaAdd(goods.NORMAL_SELLING_PRICE)}}</em>원</span>
                                </span>
                            </span>
                            <span class="goods-price" v-if="this.grade === 'VIP' && goods.VIP_NORMAL_PRICE!= 0 ">
                                <span class="orig"><em class="num">{{threeCommaAdd(goods.VIP_NORMAL_PRICE)}}</em>원</span>
                                <span class="price-box">
                                    <span class="discount"><em class="num">{{Math.ceil(Number(goods.VIP_SALE_PERCENT))}}</em>%</span>
                                    <span class="price"><em class="num">{{threeCommaAdd(goods.VIP_SELLING_PRICE)}}</em>원</span>
                                </span>
                            </span>
                            <span class="goods-star">
                                <em class="point">{{goods.REVIEW_STAR_POINT}}</em>
                                <em class="count">({{goods.REVIEW_COUNT}})</em>
                            </span>
                        </router-link>
                    </div>
					
				</li>

			</ul>
			<!-- <div class="pagination">
				<a href="javascript:;" class="first">go first</a>
				<a href="javascript:;" class="prev">go prev</a>
				<div class="page">
					<a href="javascript:;" class="on">1</a>
					<a href="javascript:;">2</a>
					<a href="javascript:;">3</a>
					<a href="javascript:;">4</a>
					<a href="javascript:;">5</a>
					<a href="javascript:;">6</a>
					<a href="javascript:;">7</a>
					<a href="javascript:;">8</a>
					<a href="javascript:;">9</a>
					<a href="javascript:;">10</a>
				</div>
				<a href="javascript:;" class="next">go next</a>
				<a href="javascript:;" class="last">go last</a>
			</div> -->
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
import axios from 'axios';

export default {
    name: "promotionGolftvDetail",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
    },
    data: () => ({
		userId: null,

		grade : localStorage.getItem('G')==='일반' || localStorage.getItem('G')===null||localStorage.getItem('G')===undefined?'NORMAL':'VIP',
		golfTvId : '',
        checkLike : 0,
		likeArr: null,

		golfTvDetailData: null,
		golfTvDetailGoods: null,
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

		this.golfTvId = this.$route.params.id;
		this.getLikeList();
        this.getGolftvItem();
    },
    methods: {
		getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },
		threeCommaAdd(n){
            return (n || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        async getGolftvItem(){
			let url = `/gooduser/api/v1/promotion_api/golf_tv/detail`
			let golfTvData = {
				id: this.golfTvId,
				userid : localStorage.getItem('I') ,
				grade : localStorage.getItem('G') ,
			}

			await axios.post(url,golfTvData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{

				this.golfTvDetailData = res.data.data

            })
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
    computed: {

    },
    mounted() {
    }
}

</script>
<style scoped>

</style>
