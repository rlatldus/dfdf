<template>
    <div>
        <HeaderComp />

		<div class="loading" v-if="pendingFirst"></div>

        <div id="content">
		<!-- 임시배너 -->
		<div class="top-banner-promotion">


			<div class="for-pc" v-if="this.pcImage != undefined && this.pcImage != null  "><img :src="this.pcImage" alt=""></div>
			<div class="for-pc" v-else></div>
			<div class="for-m" v-if="this.mobImage !=null"><img :src="this.mobImage" alt=""></div>
			<div class="for-m" v-else></div>
		</div>

		<div class="w-set">
			<div class="goods-wrap">
				<!-- 리스트 검색 -->
				<div class="goods-search">
					<div class="goods-search-top-m">
						<h3>상세 필터</h3>
						<button class="goods-search-close popup-close">닫기</button>
					</div>
					<div class="goods-search-top">
						<h3>검색</h3>
						<button class="search-reset" type="button" @click="cateDelete();"><span>초기화</span></button>
					</div>

					<ul class="goods-search-menu dep1">
						<li class="has-child" v-for="(golfidx,index) in golfCategoryArr" :key="index" :class="{'on': (this.gsmIndex === golfidx.id)}">
							<a href="javascript:;" @click="sideCateOpen(golfidx.id, $event)">
								{{ golfidx.name }}
								<i class="menu-arr"></i>
							</a>
							<ul class="dep2">
								<li v-for="(golfDepth3idx,index) in golfCategoryDepth3Arr" :key="index" :class="{'show': golfidx.id === golfDepth3idx.parentId}">
									<a href="javascript:;" @click="setCate(golfDepth3idx.id)">{{ golfDepth3idx.name }}</a>
								</li>
							</ul>
						</li>
					</ul>

					<div class="goods-search-bottom-m">
						<button class="search-reset" type="button" @click="cateDelete();"><span>초기화</span></button>
						<button class="search-apply" type="button"><span>검색적용</span></button>
					</div>
				</div>
				<!-- 리스트 검색 끝 -->

				<!-- <div class="brand-det-cate for-m">
					<ul>
						<li class="on"><a href="javascript:;">클럽</a></li>
						<li><a href="javascript:;">드라이버</a></li>
						<li><a href="javascript:;">우드</a></li>
						<li><a href="javascript:;">유틸리티</a></li>
						<li><a href="javascript:;">아이언</a></li>
						<li><a href="javascript:;">엣지</a></li>
						<li><a href="javascript:;">더미카테고리</a></li>
						<li><a href="javascript:;">더미카테고리</a></li>
						<li><a href="javascript:;">더미카테고리</a></li>
					</ul>
				</div> -->

				<div class="goods-list-box">
					<div class="goods-filter-buttons">
						<div class="filters" v-if="this.pageCateName != null">
							<span>{{this.pageCateName.name}}</span>
							<button class="close"  @click="cateDelete();">close</button>
						</div>
					</div>
					<!-- 리스트 필터 영역 -->
					<div class="goods-sort">
						<div class="goods-count">
							총 상품(<span class="count mont">{{this.goodsAllCount}}</span>개)
						</div>
						<div class="goods-sort-right">
							<div class="sort-box">
								<button class="label-handle for-m" type="button" @click="this.filterForMobile = !this.filterForMobile">
									<span v-if="sortRadio == 'price'">낮은가격순</span>
									<span v-else-if="sortRadio == 'star'">높은별점순</span>
									<span v-else-if="sortRadio == 'reivew'">리뷰순</span>
									<span v-else-if="sortRadio == 'hot'">인기순</span>
                                    <span v-else>최신순</span>
								</button>
								<div class="label-box" :class="{'on': this.filterForMobile}">
									<div class="lb">										
										<input type="radio" id="new" value="new" v-model="sortRadio"
										v-on:change="orderByItem(sortRadio)">
										<label for="new">최신순</label>
									</div>
									<div class="lb">
										<input type="radio" id="hot" value="hot" v-model="sortRadio"
										v-on:change="orderByItem(sortRadio)">
										<label for="hot">인기순</label>
									</div>
									<div class="lb">
										<input type="radio" id="price" v-model="sortRadio" value="price"
										v-on:change="orderByItem(sortRadio)">
										<label for="price">낮은가격순</label>
									</div>
									<div class="lb">
										<input type="radio" id="star" v-model="sortRadio"  value="star"
										v-on:change="orderByItem(sortRadio)">
										<label for="star">높은별점순</label>
									</div>
									<div class="lb">
										<input type="radio" id="reivew" v-model="sortRadio" value="reivew"
										v-on:change="orderByItem(sortRadio)">
										<label for="reivew">리뷰순</label>
									</div>
								</div>
							</div>
							<div class="sort-type-box">
								<!-- <a href="javascript:;" class="type-filter for-m">
									<span></span>
								</a> -->
								<a href="javascript:;" class="type-list" :class="{'for-pc': goodsListType == 'type1'}" @click="setListType('type1')">
									<input type="radio" name="sorttype" id="sorttype1" value="sorttype1">
									<span></span>
								</a>
								<a href="javascript:;" class="type-gall" :class="{'for-pc': goodsListType == 'type2'}" @click="setListType('type2')">
									<input type="radio" name="sorttype" id="sorttype2" value="sorttype2">
									<span></span>
								</a>
							</div>
						</div>
					</div>
					<!-- 리스트 필터 영역 끝 -->
					<!-- 리스트 영역 -->
					<div class="goods-list" :class="{'grid-3 m-grid-2': goodsListType == 'type2', 'grid-1 m-grid-1': goodsListType == 'type1'}" v-if="this.pending == false">
						<div class="goods-item" v-for="(item, index) in prodArr" :key="index">
							<div class="pic">
								<a href="javascript:;" @click="move_To_Product_Detail(item.productId)">
									<!-- <img :src="'/gooduser/uploads'+item.mainImagePath" :alt="item.name"> -->
									<!-- <img src="/gooduser/uploads/2022/09/830dac5f-b557-4cf5-828a-a9111fa8a70f.png" alt="상품 이미지 생플"> -->
									<img :src="item.mainImageUrl" :alt="item.mainImageUrl">
								</a>
								<!-- <button :class="checkLike===1?'like':'like on'">찜하기</button> -->
								<!-- TODO: like 관련 이벤트 처리 -->
								<div class="like">
									<input
										type="checkbox"
										:name="'itemlike'+item.productId"
										:id="'itemlike'+item.productId"
										:checked="checkLike === 1 || findLikeItem(item.productId) ===1 ? true: false"
										@change="addLike(item.productId, item.brandId, $event)"
									>
									<!--
										TODO:
										찜 등록 이벤트
										아이템 ID, 체크 상태, 회원ID(현재 11로 고정, 추후 변경 요청)
									-->
									<label :for="'itemlike'+item.productId">찜하기</label>
								</div>
							</div>
							<a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(item.productId)">
								<div class="goods-name">
									<p class="brand" v-if="item.manufacturer">{{item.manufacturer}}</p>
									<p class="name">{{item.textName}}</p>
								</div>
								<div class="goods-price" v-if="(this.userGrade == 'VIP') && item.vipSellingPrice != '0'">
									<!--mark threecommaAdd-->
									<p class="orig" v-if="Math.ceil(Number(item.vipSalePercent)) != 0">{{threeCommaAdd(item.vipNormalPrice)}}원</p>
									<div class="price-box">
										<!-- 할인 퍼센트 내림처리 -->
										<span class="discount" v-if="Math.ceil(Number(item.vipSalePercent)) != 0"><span class="num">{{Math.ceil(Number(item.vipSalePercent))}}</span>%</span>
										<!--mark threecommaAdd-->
										<span class="price"><span class="num">{{threeCommaAdd(item.vipSellingPrice)}}</span>원</span>
									</div>
								</div>
								<div class="goods-price" v-else>
									<!--mark threecommaAdd-->
									<p class="orig" v-if="Math.ceil(Number(item.normalSalePercent)) != 0">{{threeCommaAdd(item.normalPrice)}}원</p>
									<div class="price-box">
										<!-- 할인 퍼센트 내림처리 -->
										<span class="discount" v-if="Math.ceil(Number(item.normalSalePercent)) != 0"><span class="num">{{Math.ceil(Number(item.normalSalePercent))}}</span>%</span>
										<!--mark threecommaAdd-->
										<span class="price"><span class="num">{{threeCommaAdd(item.normalSellingPrice)}}</span>원</span>
									</div>
								</div>
								<div class="goods-star">
									<em class="point">{{item.reviewStarPoint }}</em>
									<em class="count">({{item.reviewCount}})</em>
								</div>
								<div class="goods-tag">
									<span class="tag type-free" v-if="item.shippingFree === 'Y'">무료배송</span>
									<span class="tag type-new" v-if="item.isNew === 'Y'">NEW</span>
									<span class="tag type-best" v-if="item.isBest === 'Y'">BEST</span>
									<!-- <span class="tag type-event">이벤트</span> -->
								</div>
							</a>
						</div>
						<!-- <li class="goods-item">
							<div class="pic">
								<div class="like">
									<input type="checkbox" name="itemLike" id="itemLike3">
									<label for="itemLike3">찜하기</label>
								</div>
								<a href="javascript:;">
									<img src="../../assets/images/dummy/goods_image_sample.png" alt="상품 이미지 생플">
								</a>
							</div>
							<a href="javascript:;" class="goods-info">
								<span class="goods-name">
									<strong class="brand">캘러웨이</strong>
									<strong class="name">[2만 마일리지+올인원 헤드커버 증정] 캘러웨이 22 로그 ST 35KG 아이언 특별 할인 판매중 절찬 판매중</strong>
								</span>
								<span class="goods-price">
									<span class="orig"><em class="num">80,000</em>원</span>
									<span class="price-box">
										<span class="discount"><em class="num">30</em>%</span>
										<span class="price"><em class="num">50,000</em>원</span>
									</span>
								</span>
								<span class="goods-star">
									<em class="point">4.9</em>
									<em class="count">(1.925)</em>
								</span>
								<span class="goods-tag">
									<em class="tag type-free">무료배송</em>
									<em class="tag type-new">NEW</em>
									<em class="tag type-best">BEST</em>
									<em class="tag type-event">이벤트</em>
								</span>
							</a>
						</li> -->
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
					<!-- 리스트 영역 끝 -->
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
    name: "promotionBrandDetail",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  Swiper,
      SwiperSlide,
    },
    data: () => ({
        pending: true,
		pendingFirst: true,
		brandId:null,
		prodId: '0',
        // user
        userId: null,
        userGrade: null,
		mainBrandImage: null,
		pcImage : null,
		mobImage : null,
        // 리스트 로딩 변수
        listLoad: true,
        linkMove: false,

        checkLike : 0,
        headerType: 'goods',
        prodArr: null,
        goodsListType: 'type2',
        // 카테고리 세팅
        sideCateInfo: null,
        sideCateType: null,
        sideCateDepth: null,
        golfCategoryArr: null,
        golfCategoryDepth3Arr: null,
        livingCategoryArr: null,
        livingCategoryDepth3Arr: null,
        gsmIndex: 0,
        // 카테고리 변경 케이스
        cateLoadFirst: true,
        pageCateName: null,
        // 페이징 변수
        goodsAllCount: 0,
        pagenationList: [],
		thisPage: 1,
		pageFirst: false,
		pagePrev: false,
		pageNext: false,
		pageLast: false,
		loadFirst: true,
		loadReload: false,
        pageSize: 10,
        // 필터, 브랜드 세팅 변수
		filterForMobile: false,
        filterSet: true,
        filterlist: [],
        brandlist: [],

        filterBrand: [],
        filterOption: [],
        searchKeyword: null,
        searchWord:null,
        sortRadio: 'new',

		cateLoadOk: false,

    }),
	watch: {
        $route(to, from) {
            console.log(to);
            console.log(from);
            console.log(this.$route.path);
            if ( this.$route.path.split('/')[2] == 'promotion' && this.$route.path.split('/')[3] == 'brand' && this.$route.path.split('/')[4] == 'list' ) {
				this.setDataFromQuery();
				this.getProductItem();
            }
        },
    },
    created () {
		this.$store.commit('setState');
		
		this.brandId = this.$route.params.id;
		this.userGrade = this.$store.state.userGrade;
		this.getLikeList();
		this.mainBrandApi();
		this.categorySet();

		// this.setDataFromQuery();
		// this.getProductItem();

		// 리스트타입 세팅
        // 리스트타입 세팅
        if ( localStorage.getItem('goodsListType') ) {
            this.goodsListType = localStorage.getItem('goodsListType');   
        }
        console.log(localStorage.getItem('goodsListType'));
    },
    methods: {
		allLoadChk() {
            if (this.cateLoadOk) {
                this.setDataFromQuery();
                this.getProductItem();
            }
        },
		setListType(type) {
            localStorage.setItem('goodsListType', type);
            this.goodsListType = type;
        },
		async mainBrandApi(){
            let url = `/gooduser/api/v1/brand_api/brand`
			let brandData = {brandId: this.brandId}
            await axios.post(url,brandData).then(res=>{

                this.mainBrandImage = res.data.data;
				this.pcImage = this.mainBrandImage.pcImageJson ? this.mainBrandImage.pcImageJson.realUrl : null
				this.mobImage = this.mainBrandImage.mobileImageJson ? this.mainBrandImage.mobileImageJson.realUrl : null
				console.log(this.mainBrandImage)
            })
        },
		move_To_Product_Detail(id){
			this.$router.push({
				path : `/gooduser/goodslist/detail/${id}`
			})
		},
		async getProductItem(){
			this.pendingFirst = true;
            // if (this.searchWord) {
            //     this.prodId = '0';
            // }
            if (this.$route.params.id !== '0') {
                this.searchWord = '';
            }
            let brandids = [this.brandId];
            // if (this.filterBrand.length > 0) {
            //     this.filterBrand.forEach((data) => {
            //         brandids.push(data.id);
            //     })
            // } else {
            //     brandids = [this.brandId];
            // }

            let filterIds= [];
            if (this.filterOption.length > 0) {
                this.filterOption.forEach((data) => {
                    filterIds.push(data.id);
                })
            } else {
                filterIds = [];
            }
            // let url = '/gooduser/api/v1/product_api/product_list3?cateId='+this.prodId+'&pageSize=20&pageNumber='+this.thisPage+'&page='+this.thisPage;



            let url  = '/gooduser/api/v1/product/list';
            let setData = {
                brandIds: brandids,
                categoryIds: this.pageCateName != null ? [this.pageCateName.id] : [],
				//categoryIds: this.prodId=='0'? []: [this.prodId],
                page: this.thisPage,
                filterIds: filterIds,
				orderBy : this.sortRadio === 'new' ? null : this.sortRadio,
                searchKeyword: !this.searchWord ? '' :this.searchWord
            }

            await axios.post(url,setData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{

                this.listLoad = false;
                let prodData = res.data.data.content
				console.log(prodData)
                this.goodsAllCount = res.data.data.totalElements
                this.pageSize = res.data.data.size
                if (this.loadFirst) {
                    this.pagination(this.thisPage);
                } else if (this.loadReload) {
                    this.pagination(1);
                }

                this.prodArr = prodData;

                this.pending = false;
				this.pendingFirst = false;
            })
	    },

		categorySet() {
            let setCategory = () => {
                if (this.$store.state.categoryAll) {
                    clearInterval(waitCategory);


                    let tmpData1 = this.$store.state.categoryAll.filter(cd=>{
                        return cd.groups === 1 && cd.depth === 2
                    });
                    this.golfCategoryArr = tmpData1
                    let tmpData2 = this.$store.state.categoryAll.filter(cd=>{
                        return cd.groups === 1 && cd.depth === 3
                    });
                    this.golfCategoryDepth3Arr = tmpData2;

					this.cateLoadOk = true;
					this.allLoadChk();
                }
            };
            const waitCategory = setInterval(setCategory, 50);
        },
		sideCateOpen(idx, $event) {
            $event.preventDefault();
            if (this.gsmIndex == idx && this.gsmIndex !== false) {
                this.gsmIndex = false;
            } else {
                this.gsmIndex = idx;
            }
        },
		setCate (idx) {

			this.listLoad = true;
			this.golfCategoryDepth3Arr.forEach((item, index) => {
				if (item.id == idx) {

					this.pageCateName = item;
				}
			});
			this.loadFirst = true;
			// this.getProductItem();
			this.setQueryParams();
		},
		cateDelete() {
			this.listLoad = true;
			this.pageCateName = null;
			this.loadFirst = true;
			// this.getProductItem();
			this.setQueryParams();
		},

		threeCommaAdd(n){
             return (n || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
        pagination(currentPage, goTop) {
			if (goTop) {
				window.scrollTo({top: 0});
			}
			// 초기세팅
			let pageCut = this.pageSize,
				groupCut = 10;

			if (this.goodsAllCount <= pageCut) {
                this.pagenationList = [];
                return;
            };

			this.thisPage = currentPage;

			if (this.loadFirst) {
				this.loadFirst = false;
			} else if (this.loadReload) {
                this.loadReload = false;
            } else {
                this.listLoad = true;
			}
            this.setQueryParams();

			let totalPage = Math.ceil(this.goodsAllCount/pageCut);
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
        setDataFromQuery() {
            // 필터 / 페이징 정보 세팅
            if(this.$route.query?.page){
                this.thisPage = Number(this.$route.query.page);
            }
            if(this.$route.query?.sort){
                this.sortRadio = this.$route.query.sort;
            }
			if(this.$route.query?.cate){
                this.golfCategoryDepth3Arr.forEach((item, index) => {
					if (item.id == Number(this.$route.query.cate)) {
						this.pageCateName = item;
					}
				});
            }
        },
        setQueryParams() {
            let routerParam = {
                page: this.thisPage,
                sort: this.sortRadio,
            }

			if (this.pageCateName != null) {
				routerParam.cate = this.pageCateName.id;
			}

            this.$router.push({query:routerParam});
        },
		orderByItem(toggle){
            console.log(toggle)
            this.loadFirst = true;
            this.setQueryParams();
        },

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
