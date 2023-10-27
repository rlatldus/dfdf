<template>
    <div>
    <HeaderComp />
    <div id="content">

		<div class="w-set">
			<!-- 브랜드 타이틀 -->
			<h2 class="promotion-brand-name for-pc">골프 TV</h2>
			<!-- 브랜드 타이틀 끝 -->

			<div class="golf-tv">
				<div class="tv-list" v-for="(item, idx) in golfTvData" :key="idx">
					
					<div class="movie-wrap">
						<iframe width="100%" height="100%" :src="item.link" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>

					<div class="board-box">
						<div class="movie-info">
							
							<p class="movie-name">{{item.name}}</p>
							
							<a href="javscript:;" class="movie-more" @click="move_To_Detail(item.id)"><span>더보기</span></a>
						</div>

						<ul class="goods-list grid-1-small m-grid-1-small" >
							<li class="goods-item" v-for="(goods, idx2) in JSON.parse(item.detail)" :key="idx+'/'+idx2" :class="{'dn': idx2 > 1}">
								<!-- VIP용-->
								<div class="for-tv-flex" v-if="this.grade==='VIP' && goods.IS_VIP==='Y' && goods.IS_NORMAL==='N'">
									
									<div class="pic" v-if="this.grade==='VIP' && goods.IS_VIP==='Y' && goods.IS_NORMAL==='N'">
										
										<router-link :to="`/gooduser/goodslist/detail/${goods.PRODUCT_ID}`">
											<img :src="goods.MAIN_IMAGE_PATH" :alt="goods.MAIN_IMAGE_PATH">
										</router-link>
									</div>
									<router-link v-if="this.grade==='VIP' && goods.IS_VIP==='Y' && goods.IS_NORMAL==='N'" :to="`/gooduser/goodslist/detail/${goods.PRODUCT_ID}`" class="goods-info">
										<span class="goods-name">
											<strong class="brand">{{goods.MANUFACTURER}}</strong>
											<strong class="name">{{goods.TEXT_NAME}}</strong>
										</span>
										<span class="goods-price">
											<span class="orig" v-if="this.grade === 'VIP' && goods.VIP_NORMAL_PRICE!= 0"><em class="num">{{threeCommaAdd(goods.VIP_NORMAL_PRICE)}}</em>원</span>
											<span class="price-box" v-if="this.grade === 'VIP' && goods.VIP_NORMAL_PRICE!= 0">
												<span class="discount"><em class="num">{{Math.ceil(Number(goods.VIP_SALE_PERCENT))}}</em>%</span>
												<span class="price"><em class="num">{{threeCommaAdd(goods.VIP_SELLING_PRICE)}}</em>원</span>
											</span>
										</span>
									</router-link>
								</div>
								
								<!-- 일반용-->
								<div class="for-tv-flex" v-if="this.grade==='NORMAL' && goods.IS_NORMAL==='Y' && goods.IS_VIP==='N'">
									<div class="pic" >
										<router-link :to="`/gooduser/goodslist/detail/${goods.PRODUCT_ID}`">
											<img :src="goods.MAIN_IMAGE_PATH" :alt="goods.MAIN_IMAGE_PATH">
										</router-link>
									</div>
									<router-link v-if="this.grade==='NORMAL' && goods.IS_NORMAL==='Y'" :to="`/gooduser/goodslist/detail/${goods.PRODUCT_ID}`" class="goods-info">
										<span class="goods-name">
											<strong class="brand">{{goods.MANUFACTURER}}</strong>
											<strong class="name">{{goods.TEXT_NAME}}</strong>
										</span>
										<span class="goods-price">
											<span class="orig" v-if="this.grade === 'NORMAL' && goods.NORMAL_PRICE!= 0 "><em class="num">{{threeCommaAdd(goods.NORMAL_PRICE)}}</em>원</span>
											<span class="price-box" v-if="this.grade === 'NORMAL' && goods.NORMAL_PRICE!= 0">
												<span class="discount"><em class="num">{{Math.ceil(Number(goods.NORMAL_SALE_PERCENT))}}</em>%</span>
												<span class="price"><em class="num">{{threeCommaAdd(goods.NORMAL_SELLING_PRICE)}}</em>원</span>
											</span>
										</span>
									</router-link>
								</div>
								
								<!--전체-->
								<div class="for-tv-flex" v-if="goods.IS_NORMAL=='Y' &&goods.IS_VIP=='Y'">
									<div class="pic">
										
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
											<span class="orig" v-if="this.grade === 'NORMAL' && goods.NORMAL_PRICE!= 0 "><em class="num">{{threeCommaAdd(goods.NORMAL_PRICE)}}</em>원</span>
											<span class="price-box" v-if="this.grade === 'NORMAL' && goods.NORMAL_PRICE!= 0">
												<span class="discount"><em class="num">{{Math.ceil(Number(goods.NORMAL_SALE_PERCENT))}}</em>%</span>
												<span class="price"><em class="num">{{threeCommaAdd(goods.NORMAL_SELLING_PRICE)}}</em>원</span>
											</span>

											
											<span class="orig" v-if="this.grade === 'VIP' && goods.VIP_NORMAL_PRICE!= 0"><em class="num">{{threeCommaAdd(goods.VIP_NORMAL_PRICE)}}</em>원</span>
											<span class="price-box" v-if="this.grade === 'VIP' && goods.VIP_NORMAL_PRICE!= 0">
												<span class="discount"><em class="num">{{Math.ceil(Number(goods.VIP_SALE_PERCENT))}}</em>%</span>
												<span class="price"><em class="num">{{threeCommaAdd(goods.VIP_SELLING_PRICE)}}</em>원</span>
											</span>
										</span>
									</router-link>
								</div>
								

							</li>
							<!-- 공백용 -->
							<li class="goods-item for-pc" style="opacity: 0; visibility: hidden;" v-if="JSON.parse(item.detail)?.length == 1">
								<div class="pic">
									<router-link :to="`/gooduser/goodslist/detail/`">
										<img :src="this.getPic('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')" alt="상품 이미지 생플">
									</router-link>
								</div>
								<router-link to="" class="goods-info">
									<span class="goods-name">
										<strong class="brand">@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@</strong>
										<strong class="name">@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@</strong>
									</span>
									<span class="goods-price">
										<span class="orig"><em class="num">50000</em>원</span>
										<span class="price-box">
											<span class="discount"><em class="num">50000</em>%</span>
											<span class="price"><em class="num">50000</em>원</span>
										</span>
									</span>
								</router-link>
							</li>
						</ul>
						<button type="button" class="movie-goods-more" @click="move_To_Detail(item.id)">
							<span>더보기</span>
						</button>
					</div>
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
    name: "promotionGolftv",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
    },
    data: () => ({
        checkLike : 0,
		page : 1,
		golfTvData : null,
		golfTvProduct : null,
		grade : localStorage.getItem('G')==='일반' || localStorage.getItem('G')===null||localStorage.getItem('G')===undefined?'NORMAL':'VIP',
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
        this.load()
		
		//this.load2()
    },
    methods: {
		move_To_Detail(id){
			this.$router.push({
			path : `/gooduser/promotion/golftvdetail/${id}`
			})
		},
        getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },
		threeCommaAdd(n){
            return (n || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
		async load(){
			let url = `/gooduser/api/v1/promotion_api/golf_tv/list`
			let golfTvData = {
				userid : localStorage.getItem('I') ,
				grade : this.grade ,
				//rowPerPage
				page : this.page ,
			}

			await axios.post(url,golfTvData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				
				this.golfTvData = res.data.data.content
                console.log(JSON.parse(this.golfTvData[0].detail))
				this.pageListCount = res.data.data.totalElements;
				if (this.loadFirst) {

					this.pagination(1);
				}
            })
		},
		pagination(currentPage, goTop) {
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
				this.load();
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
