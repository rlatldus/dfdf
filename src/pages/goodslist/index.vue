<template>
    <div>
        <div>
            <HeaderComp :headerCase="headerType" 
            :pageName="this.pageCateName" 
            @searchItemFromHeader="openModalMsg"
            />
            <div class="loading" v-if="pendingFirst"></div>
            
            <div class="header-goods-cate" v-if="sideCateType == 1">
                <ul class="dep1">
                    <li v-for="(golfidx,index) in golfCategoryArr" :key="index" :class="{'on': (this.sideCateInfo.id === golfidx.id) || (this.sideCateInfo.parentId === golfidx.id)}">
                        <router-link v-if="this.$route.query.gen" :to="`/gooduser/goodslist/list/${golfidx.id}?gen=${this.$route.query.gen}`">{{ golfidx.name }}</router-link>
                        <router-link v-else :to="`/gooduser/goodslist/list/${golfidx.id}`">{{ golfidx.name }}</router-link>
                    </li>
                </ul>
                <ul class="dep2" v-if="sideCateDepth > 1 && !(this.sideCateInfo.id == 6 || this.sideCateInfo.id == 7 || this.sideCateInfo.id == 8 || this.sideCateInfo.id == 9 || this.sideCateInfo.id == 10)">
                    <li v-for="(golfDepth3idx,index) in golfCategoryDepth3Arr" :key="index" :class="{'show': (this.sideCateInfo.parentId == golfDepth3idx.parentId) || (this.sideCateInfo.id == golfDepth3idx.parentId), 'on': this.sideCateInfo.id == golfDepth3idx.id}">
                        <router-link v-if="this.$route.query.gen" :to="`/gooduser/goodslist/list/${golfDepth3idx.id}?gen=${this.$route.query.gen}`">{{ golfDepth3idx.name }}</router-link>
                        <router-link v-else :to="`/gooduser/goodslist/list/${golfDepth3idx.id}`">{{ golfDepth3idx.name }}</router-link>
                    </li>
                </ul>
            </div>

            <div class="header-goods-cate" v-if="sideCateType == 2">
                <ul class="dep1">
                    <li v-for="(golfidx,index) in livingCategoryArr" :key="index" :class="{'on': (this.sideCateInfo.id === golfidx.id) || (this.sideCateInfo.parentId === golfidx.id)}">
                        <router-link v-if="this.$route.query.gen" :to="`/gooduser/goodslist/list/${golfidx.id}?gen=${this.$route.query.gen}`">{{ golfidx.name }}</router-link>
                        <router-link v-else :to="`/gooduser/goodslist/list/${golfidx.id}`">{{ golfidx.name }}</router-link>
                    </li>
                </ul>
                <ul class="dep2" v-if="sideCateDepth > 1">
                    <li v-for="(golfDepth3idx,index) in livingCategoryDepth3Arr" :key="index" :class="{'show': (this.sideCateInfo.parentId == golfDepth3idx.parentId) || (this.sideCateInfo.id == golfDepth3idx.parentId), 'on': this.sideCateInfo.id == golfDepth3idx.id}">
                        <router-link v-if="this.$route.query.gen" :to="`/gooduser/goodslist/list/${golfDepth3idx.id}?gen=${this.$route.query.gen}`">{{ golfDepth3idx.name }}</router-link>
                        <router-link v-else :to="`/gooduser/goodslist/list/${golfDepth3idx.id}`">{{ golfDepth3idx.name }}</router-link>
                    </li>
                </ul>
            </div>

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
                <div class="cate-gen-banner" v-if="this.$route.query.gen == 'men'">
                    <div class="cgb-text">
                        <p class="txt01">MEN</p>
                        <p class="txt02">Choose men's Golf Supplies</p>
                    </div>
                    <img class="for-pc" src="../../assets/images/etc/dep1_banner_01.png" alt="카테고리 배너">
                    <img class="for-m" src="../../assets/images/etc/m_dep1_banner_01.png" alt="카테고리 배너">
                </div>
                <div class="cate-gen-banner type-wo" v-if="this.$route.query.gen == 'women'">
                        <div class="cgb-text">
                            <p class="txt01">WOMEN</p>
                            <p class="txt02">Choose Women's Golf Supplies</p>
                        </div>
                        <img class="for-pc" src="../../assets/images/etc/dep1_banner_02.png" alt="카테고리 배너">
                        <img class="for-m" src="../../assets/images/etc/m_dep1_banner_02.png" alt="카테고리 배너">
                    </div>
                <div class="w-set">
                    <div class="goods-wrap">
                        <div class="goods-search" v-if="this.$route.params.id !== '0'">
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
                                            <router-link v-if="this.$route.query.gen" :to="`/gooduser/goodslist/list/${golfDepth3idx.id}?gen=${this.$route.query.gen}`">{{ golfDepth3idx.name }}</router-link>
                                            <router-link v-else :to="`/gooduser/goodslist/list/${golfDepth3idx.id}`">{{ golfDepth3idx.name }}</router-link>
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
                                            <router-link v-if="this.$route.query.gen" :to="`/gooduser/goodslist/list/${golfDepth3idx.id}?gen=${this.$route.query.gen}`">{{ golfDepth3idx.name }}</router-link>
                                            <router-link v-else :to="`/gooduser/goodslist/list/${golfDepth3idx.id}`">{{ golfDepth3idx.name }}</router-link>
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
                                            <input type="checkbox" class="checkbox_check" :id="'brand'+item.id" @click="setFilter(item.id, item.name, true, $event)">
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
                                        <label v-for="(item, idx) in this.filterlist" :key="idx">
                                            <input type="checkbox" class="checkbox_check" :id="'filter'+item.filterId" @change="setFilter(item.filterId, item.filterName, false, $event)">
                                            <span>{{item.filterName}}</span>
                                        </label>
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
                        <div class="goods-list-box" :class="{'loading-class': listLoad, 'for-search': this.$route.params.id == '0'}">
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
                                        <a href="javascript:;" class="type-filter for-m">
                                            <span></span>
                                        </a>
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


                            <!-- 
                                .gird-1: 리스트형
                                .gird-3: 갤러리형
                            -->
                            <div class="goods-list" :class="{'grid-3 m-grid-2': goodsListType == 'type2', 'grid-1 m-grid-1': goodsListType == 'type1'}" v-if="this.pending == false">
                                <div class="goods-item" v-for="(item, index) in prodArr" :key="index">
                                    <div class="pic">
                                        <router-link :to="`/gooduser/goodslist/detail/${item.productId}`">
                                            <!-- <img :src="'/gooduser/uploads'+item.mainImagePath" :alt="item.name"> -->
                                            <!-- <img src="/gooduser/uploads/2022/09/830dac5f-b557-4cf5-828a-a9111fa8a70f.png" alt="상품 이미지 생플"> -->
                                            <img :src="item.mainImageUrl" :alt="item.mainImageUrl">
                                        </router-link>
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
                                    <router-link :to="`/gooduser/goodslist/detail/${item.productId}`" class="goods-info">
                                        <div class="goods-name">
                                            <p class="brand" v-if="item.manufacturer" @click="move_To_Brand_Detail(item.brandId)">{{item.manufacturer}}</p>
                                            <p class="name">{{item.textName}}</p>
                                        </div>
                                        <div class="goods-price" v-if="(this.userGrade == 'VIP') && (item.vipNormalPrice)">
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
    </div>
</template>
<script>
import HeaderComp from '../../components/HeaderComp.vue';
import MobileNavComp from '../../components/MobileNavComp.vue';
import FooterComp from '../../components/FooterComp.vue';
import axios from "axios";
import moment from "moment";
export default {
    name: "goodsList",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
    },
    data: () => ({
        pending: true,
        pendingFirst: true,

        brandLoadOk: false,
        filterLoadOk: false,

        // user
        userId: null,
        userGrade: null,

        // 리스트 로딩 변수
        listLoad: true,
        linkMove: false,

        checkLike : 0,
        headerType: 'goods',
        prodArr: null,
        goodsListType: 'type2',
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
        loadReload: false,
        pageSize: 10,
        // 필터, 브랜드 세팅 변수
        filterForMobile: false,
        filterSet: true,
        filterlist: [],
        brandlist: [],
        getQuery:null,
        filterBrand: [],
        filterOption: [],
        searchKeyword: null,
        searchWord:null,
        sortRadio: 'new',
        likeArr: [],
    }),
    created () {
        this.$store.commit('setState');
        this.userId = this.$store.state.userId;

        this.userGrade = this.$store.state.userGrade;

        this.searchWord = this.$route.params.search
        
        this.getGoodsId();
        this.BrandApi();
        this.FilterApi();
        if (this.userId != null) {
            this.getLikeList();
        }
        this.loadFirst = true;

        // 리스트타입 세팅
        if ( localStorage.getItem('goodsListType') ) {
            this.goodsListType = localStorage.getItem('goodsListType');   
        }
        console.log(localStorage.getItem('goodsListType'));

        
    },
    watch: {
        $route(to, from) {
            console.log(to);
            console.log(from);
            console.log(this.$route.params.search);
            if ( !(this.$route.path.split('/')[2] != 'goodslist' && this.$route.path.split('/')[3] != 'list') ) {
                if (this.$route.params.id != this.prodId || this.$route.params.search != this.searchWord) {
                    if (this.$route.params.search) {
                        this.searchWord = this.$route.params.search
                    }
                    document.querySelector('#catergory-all').classList.remove('on');

                    this.thisPage = 1;
                    this.listLoad = false;
                    this.loadFirst = true;

                    this.filterLoadOk = false;
                    this.filterSet = true;
                    this.filterBrand = [];
                    this.filterOption = [];
                    document.querySelectorAll('.checkbox_check').forEach((item) => {
                        item.checked = false;
                    });
                    this.sideCateTypeSet();
                    this.getGoodsId();
                    this.FilterApi();
                } else {
                    this.setDataFromQuery();
                    this.getProductItem();
                }
            }
        },
    },
    methods: {
        allLoadChk() {
            if (this.brandLoadOk && this.filterLoadOk) {
                this.setDataFromQuery();
                this.getProductItem();
            }
        },
        setListType(type) {
            localStorage.setItem('goodsListType', type);
            this.goodsListType = type;
        },
        openModalMsg(data) { 
            //alert();
            //this.$route.params.id = '0';
            this.searchWord = data;
            this.getProductItem();
        },
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
        move_To_Brand_Detail(id){
            this.linkMove = true;
			this.$router.push({
			path : `/gooduser/promotion/brand/list/${id}`
			})
		},
        
        orderByItem(toggle){
            console.log(toggle)
            this.loadFirst = true;
            this.setQueryParams();
        },
        async getProductItem(){
            this.pendingFirst = true;
            // if (this.searchWord) {
            //     this.prodId = '0';
            // }
            if (this.$route.params.id !== '0') {
                this.searchWord = '';
            }
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
            console.log('this.searchWord')
            console.log(this.searchWord)
            let url  = '/gooduser/api/v1/product/list';
            let setData = {

                brandIds: brandids,
                categoryIds: this.prodId==='0'? []: [this.prodId],
                page: this.thisPage,
                filterIds: filterIds,
                genderType: this.getQuery === 'men'? 'M' : this.getQuery === 'women'? 'F': '', 
                searchKeyword: !this.searchWord ? '' :this.searchWord,
                orderBy : this.sortRadio === 'new' ? null : this.sortRadio,
                grd : !localStorage.getItem("G") ? '' : localStorage.getItem("G"),
            }
            console.log('setData')
            console.log(setData)
            await axios.post(url,setData,
                {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            ).then(res=>{

                console.log('/gooduser/api/v1/product/list');
                console.log('ListData is ');
                console.log(res);
                this.listLoad = false;
                let prodData = res.data.data.content
                this.goodsAllCount = res.data.data.totalElements
                this.pageSize = res.data.data.size
                if (this.loadFirst) {
                    this.pagination(this.thisPage);
                } else if (this.loadReload) {
                    this.pagination(1);
                }
                this.prodArr = prodData;
                // isNew New 태그 작업
                if (this.prodArr?.length > 0) {
                    this.prodArr.forEach((item, index) => {
                        if (item.isrtDate != null) {
                            let date1 = moment();
                            let date2 = moment(item.isrtDate);
                            if (date1.diff(date2, "days") < 13) {
                                item.isNew = 'Y';
                            }
                        }
                    })
                }
                console.log('this.prodArr')
                console.log(this.prodArr)
                this.pending = false;
                this.pendingFirst = false;
            })
	    },
        // 필터 관련
        async BrandApi(){
            let url = `/gooduser/api/v1/brand_api/brand_all`
            await axios.post(url).then(res=>{
                console.log(`/gooduser/api/v1/brand_api/brand_all`);
                console.log(res)
                this.brandlist = res.data.data;
                this.brandLoadOk = true;
                this.allLoadChk();
            })
        },
        async FilterApi() {
            if (this.prodId !== '0') {
                if (this.filterSet) {
                    this.filterSet = false;
                    let filterUrl  = '/gooduser/api/v1/product_api/product_list3';
                    let filterSetData = {
                        "brandIds": [],
                        "cateId": this.$route.params.id,
                        "filterIds": [],
                        "page": "1",
                        
                    }
                    this.filterlist = [];
                    this.filterOption = [];
                    console.log(filterSetData);
                    await axios.post(filterUrl,filterSetData).then(filterResponse=>{
                        console.log('/gooduser/api/v1/product_api/product_list3');
                        console.log(filterResponse);
                        if (filterResponse.data.data.content.content[0]?.productCategoryFilterUserList) {
                            this.filterlist = filterResponse.data.data.content.content[0].productCategoryFilterUserList
                        } else {
                            this.filterlist = [];
                        }
                        this.filterLoadOk = true;
                        this.allLoadChk();
                    });
                }
            } else {
                this.filterLoadOk = true;
                this.allLoadChk();
            }
        },

        setFilter(id, name, isBrand, $event) {
            this.thisPage = 1;
            this.listLoad = true;
            this.loadReload = true;
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

            this.setQueryParams();
        },
        deleteFilter(id, isBrand) {
            this.thisPage = 1;
            this.listLoad = true;
            this.loadReload = true;
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

            // 페이지 정보 URL에 담음
            this.setQueryParams();
            // this.getProductItem();
        },
        deleteFilterAll() {
            this.thisPage = 1;
            this.listLoad = true;
            this.loadReload = true;
            this.filterBrand = [];
            this.filterOption = [];
            document.querySelectorAll('.goods-search-filter input').forEach((el) => {
                el.checked = false;
            });

            this.setQueryParams();
            // this.getProductItem();
        },
        threeCommaAdd(n){
             return (n || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        addLike(itemId, brandId, e) {
            if (this.userId == null) {
                alert('로그인이 필요한 기능입니다.');

                let param = window.atob('Y2xpZW50X2lkPTQmcmVkaXJlY3RfdXJsPS9nb29kdXNlci9jYWxsYmFjaw==')
                console.log(param)

                // 로그인 모바일 PC 케이스
                // 로컬 / 실서버 / qa 대응
                let urlHost = '';
                //if (!(window.location.host == 'qa.golfsamsung.com' || window.location.host == 'www.golfsamsung.com')) {
                    urlHost = 'https://www.golfsamsung.com/appMain.do?method=appLogin';
                //}
                window.location.href =urlHost
                let uA = navigator.userAgent;
                // if (uA.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || uA.match(/LG|SAMSUNG|Samsung/) != null) {
                //     window.location.href = `${urlHost}/appMain.do?method=appLogin`
                // } else {
                //     window.location.href = `${urlHost}/web/join.do?method=loginMav`
                // }
                return;
            }

            let postData = {
                "userId": this.userId,
                "brandId": brandId,
                "productId": itemId,
                "type": ' '
            }
            //alert(e.target.checked);
            console.log(postData);
            let likeStatus;
            if (e.target.checked) {
                likeStatus = 0
            } else {
                likeStatus = 1
            }
            if (likeStatus == 0) {
                let url = '/gooduser/api/v1/favorite/click_add';
                axios.post(url, postData).then(res=>{
                    console.log('/gooduser/api/v1/favorite/click_add');
                    console.log(res);
                    //this.checkLike = 1;
                });
            } else if (likeStatus == 1) {
                let url = '/gooduser/api/v1/favorite/click_delete';
                axios.post(url, postData).then(res=>{
                    console.log('/gooduser/api/v1/favorite/click_delete');
                    console.log(res);
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
                console.log('success to get LikeList ')
                console.log(res)
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
            if (goTop && (currentPage == this.thisPage)) {
                return false;
            }
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
            if(this.$route.query?.gen){
                this.getQuery = this.$route.query.gen;
            }
            if(this.$route.query?.page){
                this.thisPage = Number(this.$route.query.page);
            }
            if(this.$route.query?.sort){
                this.sortRadio = this.$route.query.sort;
            }
            if(this.$route.query?.filterBrand){
                this.filterBrand = [];
                let filterParse = this.$route.query.filterBrand.split('%');
                console.log(filterParse);
                this.brandlist.forEach((brndList) => {
                    filterParse.forEach((fltrList) => {
                        if (brndList.id == fltrList) {
                            this.filterBrand.push(
                                {
                                    id: brndList.id,
                                    name: brndList.name
                                }
                            );
                            document.querySelector('#brand'+brndList.id).checked = true;
                        }
                    });
                });
            }
            if(this.$route.query?.filterOption){
                this.filterOption = [];
                let filterParse = this.$route.query.filterOption.split('%');
                console.log(filterParse);
                this.brandlist.forEach((brndList) => {
                    filterParse.forEach((fltrList) => {
                        if (brndList.id == fltrList) {
                            this.filterOption.push(
                                {
                                    id: brndList.id,
                                    name: brndList.name
                                }
                            );
                            document.querySelector('#filter'+brndList.id).checked = true;
                        }
                    });
                });
            }
        },
        setQueryParams() {
            let routerParam = {
                page: this.thisPage,
                sort: this.sortRadio,
            }

            if (this.$route.query?.gen) {
                routerParam.gen = this.$route.query.gen
            }

            let fb = '';
            if (this.filterBrand?.length > 0) {
                this.filterBrand.forEach((item, index) => {
                    if (index > 0) {
                        fb += '%';
                    }
                    fb += item.id;
                });
                routerParam.filterBrand = fb;
            }

            let fo = '';
            if (this.filterOption?.length > 0) {
                this.filterOption.forEach((item, index) => {
                    if (index > 0) {
                        fo += '%';
                    }
                    fo += item.id;
                });
                routerParam.filterOption = fo;
            }

            this.$router.push({query:routerParam});
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