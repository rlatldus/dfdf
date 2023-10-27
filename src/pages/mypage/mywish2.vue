<template>
    <div>
        <HeaderComp :headerCase="'sub'" :pageName="'찜리스트'" />
        <div class="loading" v-if="pending"></div>
        <div id="content" v-else class="mob">
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
                                    <em><strong class="mont">00</strong>개</em>
                                </div>
                            </div>
                        </div> -->
                        <!-- PC 마이페이지 대시보드 시작 -->
                        <h3 class="my_txt_h3">좋아요</h3>
                        <div class="tab_area">
                            <ul class="tab_type_01">
                                <li><router-link to ="/gooduser/mypage/mywish1">상품</router-link></li>
                                <li class="on"><router-link to ="/gooduser/mypage/mywish2">브랜드</router-link></li>
                            </ul>
                        </div>
                        <div class="my_total_info">
                            <strong>전체 (<span>{{wishBrandAllCount}}</span>)개</strong>
                            <button class="btn_dark_gray_solid" @click="brandLikeDeletaAll">전체 삭제</button>
                        </div>

                        <ul class="my_brand_list">
                            <li
                                v-for="(datas, index) in wishBrandList"
                                :key="index"
                            >
                                <div class="pic">
                                    <div class="like">
                                        <input type="checkbox" name="bLike" :id="'bLike'+datas.brandId" :checked="true">
                                        <label :for="'bLike'+datas.brandId" @click="openPop(datas.brandId)" class="must-like">찜하기</label>
                                    </div>
                                    <div class="thumbnail" :style="`background-image: url('${datas.logoJson?.realUrl}');`" @click="this.$router.push(`/gooduser/promotion/brand/list/${datas.brandId}`)"></div>
                                </div>
                                <div class="b_title2">{{datas.brandName}}</div>
                                <!-- <div class="wish_txt">찜 <strong class="font_mont">{{data.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</strong>개</div> -->
                            </li>
                        </ul>

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

        <MobileNavComp :mNavType="'like'" />
        <FooterComp />

        <ModalAlert
            v-if="this.modal1"
            :text="'찜 한 브랜드를 삭제하시겠습니까?'"
            :type="'confirm'"
            @confirm="wishdelete"
            @close="this.modal1 = false"
        />

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
    name: "myWish2",
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
        wishBrandList: false,
        wishBrandAllCount: 0,
        pagenationList: [],
        thisPage: 1,
		pageFirst: false,
		pagePrev: false,
		pageNext: false,
		pageLast: false,
		loadFirst: true,
        // 삭제 팝업
		modal1: false,
		deleteWish: false,
        pending: true,
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
		if (this.userId == null) {
            alert('로그인이 필요한 페이지 입니다.');
			this.$router.push('/gooduser');
		}

        this.getWishBrand();
    },
    methods: {
        getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },
        async getWishBrand(){
			let postData = {
                "userId": this.userId,
                "page": this.thisPage,
            }
            await axios.post('/gooduser/api/v1/favorite/brand_list/list', postData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				
				this.wishBrandAllCount = res.data.data.numberOfElements;
                if (!this.wishBrandList) {
					this.pagination(1);
				}
                this.pending = false;
				this.wishBrandList = res.data.data.content;
			});
		},
        openPop(id) {
			this.modal1 = true;
			this.deleteWish = id;
		},
        wishdelete() {
            let brandId = this.deleteWish;
			let postData = {
                "brandId": brandId,
                "favoriteId": 0,
                "productId": 0,
                "type": " ",
                "userId": this.$store.state.userId
            }

            
            let url = '/gooduser/api/v1/favorite/brand_list/delete';
            axios.post(url, postData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
                
                this.modal1 = false;
                this.getWishBrand();
            });
		},
		pagination(currentPage, goTop) {
			if (goTop) {
				window.scrollTo({top: 0});
			}
			// 초기세팅
			let pageCut = 20,
				groupCut = 10;

			if (this.wishBrandAllCount <= pageCut) return;

			this.thisPage = currentPage;
			if (this.loadFirst) {
				this.loadFirst = false;
			} else {
				this.getWishBrand();
			}

			let totalPage = Math.ceil(this.wishBrandAllCount/pageCut);
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
        brandLike (brandId) {
            let postData = {
                "brandId": brandId,
                "favoriteId": 0,
                "productId": 0,
                "type": " ",
                "userId": this.$store.state.userId
            }
            
            if (!document.querySelector('#bLike'+brandId).checked) {
                let url = '/gooduser/api/v1/favorite/only_brand_click_add';
                axios.post(url, postData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
                    
                });
            } else {
                
                let url = '/gooduser/api/v1/favorite/brand_list/delete';
                axios.post(url, postData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
                    
                });
            }
        },
        brandLikeDeletaAll () {
            let postData = {
                "brandId": 0,
                "favoriteId": 0,
                "productId": 0,
                "type": " ",
                "userId": this.userId
            }
            let url = '/gooduser/api/v1/favorite/brand_list/all_delete';
            axios.post(url, postData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
                
                this.getWishBrand();
            });
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