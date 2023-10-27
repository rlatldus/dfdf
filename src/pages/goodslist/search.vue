<template>
    <div>
        <HeaderComp :headerCase="headerType" :pageName="this.pageCateName" />

        <!-- <div class="header-goods-cate" v-if="sideCateType == 2">
			<ul class="dep1">
				<li v-for="(golfidx,index) in golfCategoryArr" :key="index" :class="{'on': this.gsmIndex === index}">
					<router-link :to="'/gooduser/goodslist/list/'+golfidx.id">{{ golfidx.name }}</router-link>
				</li>
			</ul>
            <ul class="dep2">
                <li v-for="(golfDepth3idx,index) in golfCategoryDepth3Arr" :key="index" :class="{'show': 3 === golfDepth3idx.parentId}">
                    <router-link :to="'/gooduser/goodslist/list/'+golfDepth3idx.id">{{ golfDepth3idx.name }}</router-link>
                </li>
            </ul>
		</div> -->

        <div id="content">
            <div class="w-set">
                <div class="goods-wrap">
                    <div class="goods-search">
                        <div class="goods-search-top-m">
                            <h3>상세 필터</h3>
                            <button class="goods-search-close popup-close">닫기</button>
                        </div>
                        <div class="goods-search-top">
                            <h3>검색</h3>
                            <button class="search-reset" type="button" @click="deleteFilterAll"><span>초기화</span></button>
                        </div>
                        <ul class="goods-search-menu dep1" v-if="sideCateType == 1">
                            <li class="has-child" v-for="(golfidx,index) in golfCategoryArr" :key="index" :class="{'on': (this.gsmIndex === golfidx.id)}">
                                <a href="javascript:;" @click="sideCateOpen(golfidx.id, $event)">
                                    {{ golfidx.name }}
                                    <i class="menu-arr"></i>
                                </a>
                                <ul class="dep2">
                                    <li v-for="(golfDepth3idx,index) in golfCategoryDepth3Arr" :key="index" :class="{'show': golfidx.id === golfDepth3idx.parentId}">
                                        <router-link :to="'/gooduser/goodslist/list/'+golfDepth3idx.id">{{ golfDepth3idx.name }}</router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="goods-search-menu dep1" v-if="sideCateType == 2">
                            <li class="has-child" v-for="(golfidx,index) in livingCategoryArr" :key="index" :class="{'on': this.gsmIndex === golfidx.id}">
                                <a href="javascript:;" @click="sideCateOpen(golfidx.id, $event)">
                                    {{ golfidx.name }}
                                    <i class="menu-arr"></i>
                                </a>
                                <ul class="dep2">
                                    <li v-for="(golfDepth3idx,index) in livingCategoryDepth3Arr" :key="index" :class="{'show': golfidx.id === golfDepth3idx.parentId}">
                                        <router-link :to="'/gooduser/goodslist/list/'+golfDepth3idx.id">{{ golfDepth3idx.name }}</router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div class="goods-search-filter">
                            <a href="javascript:;" class="on">브랜드<i class="menu-arr"></i></a>
                            <div class="filter-list">
                                <div class="filter-scroll">
                                    <!-- <label><input type="checkbox" checked><span>전체</span></label> -->
                                    <label v-for="(item, index) in this.brandlist" :key="index">
                                        <input type="checkbox" :id="'brand'+item.id" @click="setFilter(item.id, item.name, true, $event)">
                                        <span>{{item.name}}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="goods-search-filter" v-if="this.filterlist.length > 0">
                            <a href="javascript:;" class="on">필터<i class="menu-arr"></i></a>
                            <div class="filter-list">
                                <div class="filter-scroll">
                                    <!-- <label><input type="checkbox" checked><span>전체</span></label> -->
                                    <label v-for="(item, idx) in this.filterlist" :key="idx"><input type="checkbox" :id="'filter'+item.filterId" @change="setFilter(item.filterId, item.filterName, false, $event)"><span>{{item.filterName}}</span></label>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="goods-search-filter">
                            <a href="javascript:;">브랜드<i class="menu-arr"></i></a>
                            <div class="filter-list">
                                <div class="filter-scroll">
                                    <label><input type="checkbox" checked><span>전체</span></label>
                                    <label><input type="checkbox"><span>까스텔 바작</span></label>
                                    <label><input type="checkbox"><span>나이키 골프</span></label>
                                    <label><input type="checkbox"><span>테일러메이드</span></label>
                                    <label><input type="checkbox"><span>까스텔 바작</span></label>
                                    <label><input type="checkbox"><span>나이키 골프</span></label>
                                </div>
                            </div>
                        </div>
                        <div class="goods-search-filter">
                            <a href="javascript:;">브랜드<i class="menu-arr"></i></a>
                            <div class="filter-list">
                                <div class="filter-scroll">
                                    <label><input type="checkbox" checked><span>전체</span></label>
                                    <label><input type="checkbox"><span>까스텔 바작</span></label>
                                    <label><input type="checkbox"><span>나이키 골프</span></label>
                                    <label><input type="checkbox"><span>테일러메이드</span></label>
                                </div>
                            </div>
                        </div> -->
                        <div class="goods-search-bottom-m">
                            <button class="search-reset" type="button" @click="deleteFilterAll"><span>초기화</span></button>
                            <button class="search-apply popup-close" type="button"><span>확인</span></button>
                        </div>
                    </div>
                    <div class="goods-list-box" :class="{'loading-class': listLoad}">
                        <div class="goods-filter-buttons">
                            <div class="filters" v-if="this.pageCateName">
                                <span>{{this.pageCateName}}</span>
                            </div>
                            <div class="filters" v-for="(data, idx) in filterBrand" :key="idx">
                                <span>{{data.name}}</span>
                                <button class="close"  @click="deleteFilter(data.id, true)">close</button>
                            </div>
                            <div class="filters" v-for="(data, idx) in filterOption" :key="idx">
                                <span>{{data.name}}</span>
                                <button class="close"  @click="deleteFilter(data.id, false)">close</button>
                            </div>
                            <!-- <div class="filters">
                                <span>필터1_1</span>
                                <button class="close">close</button>
                            </div>
                            <div class="filters">
                                <span>필터2_2</span>
                                <button class="close">close</button>
                            </div> -->
                        </div>
                        <div class="goods-sort">
                            <div class="goods-count">
                                총 상품(<span class="count mont">{{this.goodsAllCount}}</span>개)
                            </div>
                            <div class="goods-sort-right">
                                <!-- <div class="sort-box">
                                    <button class="label-handle for-m" type="button">인기순</button>
                                    <div class="label-box">
                                        <div class="lb">
                                            <input type="radio" name="sort" id="sort1" value="sort1" checked>
                                            <label for="sort1">인기순</label>
                                        </div>
                                        <div class="lb">
                                            <input type="radio" name="sort" id="sort2" value="sort2">
                                            <label for="sort2">낮은가격순</label>
                                        </div>
                                        <div class="lb">
                                            <input type="radio" name="sort" id="sort3" value="sort3">
                                            <label for="sort3">높은별점순</label>
                                        </div>
                                        <div class="lb">
                                            <input type="radio" name="sort" id="sort4" value="sort4">
                                            <label for="sort4">리뷰순</label>
                                        </div>
                                    </div>
                                </div> -->
                                <div class="sort-type-box">
                                    <a href="javascript:;" class="type-filter for-m">
                                        <span></span>
                                    </a>
                                    <a href="javascript:;" class="type-list for-pc" @click="goodsListType = false">
                                        <input type="radio" name="sorttype" id="sorttype1" value="sorttype1">
                                        <span></span>
                                    </a>
                                    <a href="javascript:;" class="type-gall" @click="goodsListType = true">
                                        <input type="radio" name="sorttype" id="sorttype2" value="sorttype2">
                                        <span></span>
                                    </a>
                                </div>
                            </div>
                        </div>


                        <!--
                            .gird-1: 리스트형
                            .gird-3: 갤러리형
                         -->
                        <div class="goods-list m-grid-2" :class="{'grid-3': goodsListType, 'grid-1': !goodsListType}">
                            <div class="goods-item" v-for="(item, index) in prodArr" :key="index">
                                <div class="pic">
                                    <router-link :to="`/gooduser/goodslist/detail/${item.id}`">
                                        <!-- <img :src="'/gooduser/uploads'+item.mainImagePath" :alt="item.name"> -->
                                        <!-- <img src="/gooduser/uploads/2022/09/830dac5f-b557-4cf5-828a-a9111fa8a70f.png" alt="상품 이미지 생플"> -->
                                        <img :src="this.getPic(item.mainImage)" :alt="item.mainImage">
                                    </router-link>
                                    <!-- <button :class="checkLike===1?'like':'like on'">찜하기</button> -->
                                    <!-- TODO: like 관련 이벤트 처리 -->
                                    <div class="like">
                                        <input
                                            type="checkbox"
                                            :name="'itemlike'+item.id"
                                            :id="'itemlike'+item.id"
                                            :checked="checkLike === 1 ? true : false"
                                        >
                                        <!--
                                            TODO:
                                            찜 등록 이벤트
                                            아이템 ID, 체크 상태, 회원ID(현재 11로 고정, 추후 변경 요청)
                                         -->
                                        <label :for="'itemlike'+item.id" @click="addLike(item.id, checkLike, 11)">찜하기</label>
                                    </div>
                                </div>
                                <router-link :to="`/gooduser/goodslist/detail/${item.id}`" class="goods-info">
                                    <div class="goods-name">
                                        <p class="brand" v-if="item.brand">{{item.brand.name}}</p>
                                        <p class="name">{{item.textName}}</p>
                                    </div>
                                    <div class="goods-price">
                                        <p class="orig" v-if="Math.ceil(Number(item.normalSalePercent)) != 0">{{threeCommaAdd(item.normalPrice)}}원</p>
                                        <div class="price-box">
                                            <!-- 할인 퍼센트 내림처리 -->
                                            <span class="discount" v-if="Math.ceil(Number(item.normalSalePercent)) != 0"><span class="num">{{Math.ceil(Number(item.normalSalePercent))}}</span>%</span>
                                            <span class="price"><span class="num">{{threeCommaAdd(item.normalSellingPrice)}}</span>원</span>
                                        </div>
                                    </div>
                                    <div class="goods-star">
                                        <!-- <em class="point">4.9</em>
									    <em class="count">(1.925)</em> -->
                                    </div>
                                    <div class="goods-tag">
                                        <span class="tag type-free" v-if="item.shippingFree === 'Y'">무료배송</span>
                                        <span class="tag type-new" v-if="item.isNew === 'Y'">NEW</span>
                                        <span class="tag type-best" v-if="item.isBest === 'Y'">BEST</span>
                                        <!-- <span class="tag type-event">이벤트</span> -->
                                    </div>
                                </router-link>
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
import axios from "axios";

export default {
    name: "goodsList",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
    },
    data: () => ({
        // 리스트 로딩 변수
        listLoad: true,
        linkMove: false,

        checkLike : 0,
        headerType: 'goods',
        prodArr: false,
        goodsListType: true,
        prodId : null,
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
        pageSize: 10,
        // 필터, 브랜드 세팅 변수
        filterSet: true,
        filterlist: [],
        brandlist: [],

        filterBrand: [],
        filterOption: [],
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
        console.log('userId')
        console.log(this.$store.state.userId)
        this.getGoodsId();
        this.getProductItem();
        this.BrandApi();
        this.loadFirst = true;

    },
    watch: {
        // 카테고리 id 변경 감지
        '$route.params.id'() {
            if (this.linkMove) {return;}
            this.listLoad = true;
            this.filterSet = true;
            this.getGoodsId();
            this.getProductItem();
            this.loadFirst = true;
            this.sideCateTypeSet();
            // 메뉴 닫힘 이벤트 필요 없을시 삭제
            document.querySelector('.header-category-all').classList.remove('on');
            document.querySelector('#catergory-all').classList.remove('on');
            document.querySelector('header').classList.remove('on');
        }
    },
    methods: {
        getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },
        getGoodsId(){
            this.prodId = this.$route.params.id
            console.log(this.prodId)
        },
        categorySet() {
            let setCategory = () => {
                if (this.$store.state.categoryAll) {
                    clearInterval(waitCategory)
                    console.log('asdasd');
                    console.log(this.$store.state.categoryAll);
                    let tmpData1 = this.$store.state.categoryAll.filter(cd=>{
                        return cd.groups === 1 && cd.depth === 2
                    });
                    this.golfCategoryArr = tmpData1
                    let tmpData2 = this.$store.state.categoryAll.filter(cd=>{
                        return cd.groups === 1 && cd.depth === 3
                    });
                    this.golfCategoryDepth3Arr = tmpData2;

                    // 생활용품 카테고리
                    let tmpData3 = this.$store.state.categoryAll.filter(cd=>{
                        return cd.groups === 2 && cd.depth === 2
                    });
                    this.livingCategoryArr = tmpData3;
                    let tmpData4 = this.$store.state.categoryAll.filter(cd=>{
                        return cd.groups === 2 && cd.depth === 3
                    });
                    this.livingCategoryDepth3Arr = tmpData4;

                    this.sideCateTypeSet();

                    document.querySelectorAll('.goods-search-menu > li.has-child > a').forEach(function(subCateBtn) {
                        subCateBtn.addEventListener('click', function() {
                            if (this.parentNode.classList.contains('on')) {
                                this.parentNode.classList.remove('on');
                            } else {
                                document.querySelectorAll('.goods-search-menu > li').forEach(function(subCateBtnParent) {
                                    subCateBtnParent.classList.remove('on');
                                });
                                this.parentNode.classList.add('on');
                            }
                        });
                    });
                }
            };
            const waitCategory = setInterval(setCategory, 50);
        },
        sideCateTypeSet() {
            // 골프 / 생활 구분
            if (this.$route.params.id == 1) {
                this.sideCateInfo = this.$store.state.categoryAll[0];
                this.sideCateType = 1;
                this.pageCateName = '골프';
                this.sideCateDepth = 1;
                return;
            } else if (this.$route.params.id == 2) {
                this.sideCateInfo = this.$store.state.categoryAll[1];
                this.sideCateType = 2;
                this.pageCateName = '생활용품·선물';
                this.sideCateDepth = 1;
                return;
            }

            this.golfCategoryArr.forEach((item, index) => {
                if (item.id == this.$route.params.id) {
                    this.sideCateInfo = item;
                    this.sideCateType = 1;
                    this.pageCateName = item.name;
                    this.sideCateDepth = item.depth;
                    return;
                };
            })
            this.golfCategoryDepth3Arr.forEach((item, index) => {
                if (item.id == this.$route.params.id) {
                    this.sideCateInfo = item;
                    this.sideCateType = 1;
                    this.pageCateName = item.name;
                    this.sideCateDepth = item.depth;
                    return;
                };
            });

            this.livingCategoryArr.forEach((item, index) => {
                if (item.id == this.$route.params.id) {
                    this.sideCateInfo = item;
                    this.sideCateType = 2;
                    this.pageCateName = item.name;
                    this.sideCateDepth = item.depth;
                    return;
                };
            });
            this.livingCategoryDepth3Arr.forEach((item, index) => {
                if (item.id == this.$route.params.id) {
                    this.sideCateInfo = item;
                    this.sideCateType = 2;
                    this.pageCateName = item.name;
                    this.sideCateDepth = item.depth;
                    return;
                };
            });
        },
        sideCateOpen(idx, $event) {
            $event.preventDefault();
            if (this.gsmIndex == idx && this.gsmIndex !== false) {
                this.gsmIndex = false;
            } else {
                this.gsmIndex = idx;
            }
        },
        move_To_Product_Detail(id){
            this.linkMove = true;
            // if (!this.$store.state.userId) {
            //     alert('로그인이 필요한 기능입니다.');
            //     this.gotoSamsung();
            //     return;
            // }
			this.$router.push({
			path : `/gooduser/goodslist/detail/${id}`
			})
		},
        gotoSamsung(){
            let param = window.atob('Y2xpZW50X2lkPTQmcmVkaXJlY3RfdXJsPS9nb29kdXNlci9jYWxsYmFjaw==')
            console.log(param)

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
        },
        async getProductItem(){
            console.log("aa")
            let brandids = [];
            if (this.filterBrand.length > 0) {
                this.filterBrand.forEach((data) => {
                    brandids.push(data.id);
                })
            } else {
                brandids = [];
            }

            let filterIds= [];
            if (this.filterOption.length > 0) {
                this.filterOption.forEach((data) => {
                    filterIds.push(data.id);
                })
            } else {
                filterIds = [];
            }
            // let url = '/gooduser/api/v1/product_api/product_list3?cateId='+this.prodId+'&pageSize=20&pageNumber='+this.thisPage+'&page='+this.thisPage;
            let url, setData;
            if (this.filterOption?.length > 0) {
                url  = '/gooduser/api/v1/product_api/product_list3/filter_click';
                setData = {
                    "brandIds": brandids,
                    "cateId": this.prodId,
                    "page": this.thisPage,
                    "filterIds": filterIds,
                }
            } else {
                url  = '/gooduser/api/v1/product_api/product_list3';
                setData = {
                    "brandIds": brandids,
                    "cateId": this.prodId,
                    "page": this.thisPage
                }
            }
            await axios({
                'method': 'post',
                'url': url,
                'data': setData
            }).then(res=>{
                console.log(res);
                this.listLoad = false;
                let prodData = res.data.data.content
                this.goodsAllCount = res.data.data.totalElements
                this.pageSize = res.data.data.size
                if (this.loadFirst) {
					this.pagination(1);
				}
                if (this.filterSet) {
                    this.filterSet = false;
                    if (prodData[0]?.productCategoryFilterUserList) {
                        this.filterlist = prodData[0].productCategoryFilterUserList
                    } else {
                        this.filterlist = [];
                    }
				}
                this.prodArr = prodData;
                //console.log(this.prodArr)
                /*변수명 정리
                brand: null --브랜드 ㅇ
                code: null
                detail: null
                fee: null --수수료?
                filterJson: null
                genderType: "A"  --성별
                groupJson: null
                groupUse: "N"
                hasOption: "N" --옵션유무
                hasStock: "N"
                holeinoneCode: null
                id: 12 --id
                image: null
                informationPrecaution: null
                informationProduct: null
                informationProductType: null
                informationReturn: null
                isApproval: null
                isBest: null
                isDel: "N" --삭제 유무
                isPresent: null
                isReservation: null
                isView: "Y" --보여주기 유무
                isrtDate: "2022-08-17T18:14:42" --입력날짜
                isrtId: null
                keyword: null
                mainImage: null --이미지
                manufacturer: null --제조자
                memberTenant: null
                name: "상품4" --상품 이름
                normalPrice: 11000 --일반정상가
                normalSalePercent: 10 --일반 할인율
                normalSellingPrice: 10000 --할인율 포함한 판매가
                partner: null -- 파트너
                productCategory: null -- 상품 카테고리
                purchaseQuantity: null
                reservationMaxWeek: null
                reservationMinWeek: null
                salesPeriod: null --할인 기간
                salesPeriodEdate: null --할인 종료기간
                salesPeriodSdate: null --할인 시작 기간
                shippingBundled: "N" --묶음배송 가능 여부
                shippingFree: "N" 배송비 무료 여부
                shippingPickup: null --픽업 가능 여부
                shippingPrice: 3000 --배송비
                shippingService: null --배송 서비스
                since: null -- 출시 년도
                status: null -- 상품 상태
                stock: null -- 재고
                stockAdd: null
                tagJson: null
                taxType: null
                taxable: null
                updtDate: null
                updtId: null
                vipNormalPrice: 9000 --vip 정상가
                vipSalePercent: 20 -- vip할인율
                vipSellingPrice: 7200 --vip 할인율 반영 판매금액
                */

            })
	    },
        // 필터 관련
        async BrandApi(){
            let url = `/gooduser/api/v1/brand_api/brand_all`
            await axios.post(url).then(res=>{
                console.log(res)
                this.brandlist = res.data.data;
            })
        },

        setFilter(id, name, isBrand, $event) {
            this.thisPage = 1;
            this.listLoad = true;
            this.loadFirst = true;
            let inputParent;
            if (isBrand) {
                inputParent = this.filterBrand;
            } else {
                inputParent = this.filterOption;
            }

            if ($event.target.checked) {
                inputParent.push({'id': id, 'name': name});
            } else {
                this.deleteFilter(id, isBrand);
            }

            this.getProductItem();
        },
        deleteFilter(id, isBrand) {
            this.thisPage = 1;
            this.listLoad = true;
            this.loadFirst = true;
            if (isBrand) {
                this.filterBrand = this.filterBrand.filter(function(el) {
                    if (el.id !== id) {
                        console.log(el.id);
                        return true;
                    }
                });
                document.querySelector('#brand'+id).checked = false;
            } else {
                this.filterOption = this.filterOption.filter(function(el) {
                    if (el.id !== id) {
                        console.log(el.id);
                        return true;
                    }
                });
                document.querySelector('#filter'+id).checked = false;
            }

            this.getProductItem();
        },
        deleteFilterAll() {
            this.thisPage = 1;
            this.listLoad = true;
            this.loadFirst = true;
            this.filterBrand = [];
            this.filterOption = [];
            document.querySelectorAll('.goods-search-filter input').forEach((el) => {
                el.checked = false;
            });

            this.getProductItem();
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
        addLike(itemId, likeStatus, userId) {
            let url = '/gooduser/api/v1/favorite/click_add';
            let likeType;
            let postData = {
                userId: userId,
                brandId: 2,
                productId: itemId,
                type: " "
            }

            if (likeStatus === 0) {
                likeType = 'Y'
            } else {
                likeType = 'N'
            };

            axios.post(url, postData).then(res=>{
                console.log(res);
            });
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
			} else {
                this.listLoad = true;
				this.getProductItem();
			}

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
		}



    },
    computed: {

    },
    mounted() {
        this.categorySet();

        document.querySelectorAll('.goods-search-filter > a').forEach(function(subCateBtn) {
            subCateBtn.addEventListener('click', function() {
                if (this.classList.contains('on')) {
                    this.classList.remove('on');
                } else {
                    document.querySelectorAll('.goods-search-filter > a').forEach(function(subCateBtnParent) {
                        subCateBtnParent.classList.remove('on');
                    });
                    this.classList.add('on');
                }
            });
        });
        document.querySelector('.type-filter').addEventListener('click', function() {
            document.querySelector('.popup-bg').classList.add('on');
            document.querySelector('.goods-search').classList.add('on');
        });
        // document.querySelector('.label-handle').addEventListener('click', function() {
        //     document.querySelector('.label-box').classList.toggle('on');
        // });
    }
}

</script>
<style scoped>

</style>
