<template>
    <div>
    <HeaderComp />
    <div class="loading" v-if="this.pending"></div>
    <div id="content" v-else>

		<!-- 이벤트 배너 -->
		<div class="event-banner type-sample-bg" v-if="this.tagLoadOk">
			<div class="w-set">
				<h2><span class="mont">HOT <b>TAG</b></span> 기획전</h2>
				<div class="event-banner-tab">
					<a href="javascript:;"
						@click="this.move_To_Detail_Ht(item.id)"
						v-for="(item, index) in this.hotTag"
						:key="index"
					># {{item.name}}</a>
				</div>
			</div>
		</div>
		<!-- 이벤트 배너 끝 -->

		<div class="w-set type-hottag">
			<!-- 리스트 필터 영역 -->
			<!-- <div class="goods-count">
				<span class="count mont">15</span>의 상품이 검색되었습니다.
			</div> -->
			<!-- 리스트 필터 영역 끝 -->

			<!-- 리스트 영역 -->

			<div class="board-list type-gallery for-event">
				<a href="javascript:;" v-for="(item, index) in this.eventList" :key="index" @click="move_To_Detail(item.id)">
					<div class="pic">
						<img :src="item.pcImageJson?.real_url" :alt="item.pcImageJson?.real_url" class="for-pc">
						<img :src="item.mobileImageJson?.real_url" :alt="item.mobileImageJson?.real_url" class="for-m">
					</div>
					<div class="txt-box">
						<p class="post-name">{{item.name}}</p>
					</div>
				</a>
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
    name: "promotionHottag",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
    },
    data: () => ({
		// 기본 데이터
		pending: true,
		userId: null,
		userGrade: null,

		// HOT TAG 핫태그
		tagLoadOk: false,
		hotTag: null,

		// 이벤트 리스트
		eventList: null,

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

		this.getHotList();
		this.getEventList();
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

		async getEventList(){
			let url = `/gooduser/api/v1/promotion/exhibition/list`
			let postData = {
				grade : this.userGrade == 'VIP' ? this.userGrade : 'J1',
			}
			await axios.post(url, postData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				
				this.eventList = res.data.data;
				if (this.eventList?.length > 0) {
					this.eventList.forEach((item, index) => {
						if (item.pcImageJson != null) {
							item.pcImageJson = JSON.parse(item.pcImageJson);
						}
						if (item.mobileImageJson != null) {
							item.mobileImageJson = JSON.parse(item.mobileImageJson);
						}
					});
				}
				// this.pageListCount = res.data.data.totalElements;
				this.pending = false;
			})
		},
		// 페이징
		async pagination(currentPage, goTop) {
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
				this.getEventList();
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
		move_To_Detail(id){
			this.$router.push({
				path : `/gooduser/promotion/hottagnmdetail/${id}`
			});
		},
		move_To_Detail_Ht(id){
			this.$router.push({
				path : `/gooduser/promotion/hottaghtdetail/${id}`
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