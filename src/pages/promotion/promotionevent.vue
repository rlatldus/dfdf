<template>
    <div>
    <HeaderComp />
	<div class="loading" v-if="this.pending"></div>
    <div id="content" v-else>
		<!-- 브랜드 타이틀 -->
		<h2 class="promotion-brand-name w-set for-pc">이벤트</h2>
		<!-- 브랜드 타이틀 끝 -->

		<div class="w-set">
			<div class="board-list type-gallery for-event title-after-top">
				<!-- <a href="javascript:;">
					<div class="pic">
						<img src="../../assets/images/dummy/board_img.png" alt="게시판 더미 이미지">
					</div>
					<div class="txt-box">
						<p class="post-name">5월도 매일 출석하세요!</p>
						<p class="post-content">최대 5만원 도전~ 매일 출석하시면 200원 더~</p>
						<div class="post-date">
							<p class="date-dday mont">D - 11</p>
							<p class="date-txt">2022.05.30 ~ 2022.06.30</p>
						</div>
					</div>
				</a> -->
				<a href="javascript:;" v-for="(item, index) in this.eventList" :key="index" @click="move_To_Detail(item.id)">
					<div class="pic">
						<img :src="item.pcImageJson?.real_url" :alt="item.pcImageJson?.real_url" class="for-pc">
						<img :src="item.mobileImageJson?.real_url" :alt="item.mobileImageJson?.real_url" class="for-m">
					</div>
					<div class="txt-box">
						<p class="post-name">{{item.name}}</p>
						<!-- <p class="post-content" v-html="item.content"></p> -->
						<div class="post-date">
							<p class="date-dday mont" v-if="item.dday != null && item.dday > 0">D - {{item.dday}}</p>
							<p class="date-txt" v-if="item.startDate != null && item.endDate != null">{{item.startDate}} ~ {{item.endDate}}</p>
						</div>
					</div>
				</a>
			</div>

			<!-- <div class="pagination" v-if="pageListCount > 0">
				<a href="javascript:;" class="first"
					v-if="pageFirst"
					@click="pagination(pageFirst)"
				>go first</a>
				<a href="javascript:;" class="prev"
					v-if="pagePrev"
					@click="pagination(pagePrev)"
				>go prev</a>

				<div class="page">
					<a href="javascript:;"
						v-for="pageNum in pagenationList"
						:key="pageNum"
						@click="pagination(pageNum)"
						:class="{'on': pageNum === thisPage}"
					>{{pageNum}}</a>
				</div>

				<a href="javascript:;" class="next"
					v-if="pageNext"
					@click="pagination(pageNext)"
				>go next</a>
				<a href="javascript:;" class="last"
					v-if="pageLast"
					@click="pagination(pageLast)"
				>go last</a>
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
import axios from "axios";
import moment from "moment";
export default {
    name: "promotionEvent",
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

		this.getEventList();
		// this.getEventDetail();
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
		
		async getEventList(){
			let url = `/gooduser/api/v1/promotion/event/list`
			let postData = {
				grade: this.userGrade == 'VIP' ? this.userGrade : 'J1',
				// page: this.thisPage
			}
			
			await axios.post(url, postData).then(res=>{
				
				this.eventList = res.data.data;
				if (this.eventList?.length > 0) {
					this.eventList.forEach((item, index) => {
						if (item.startDate != null) {
							let t1 = moment(new Date);
							let t2 = moment(item.startDate);
							item.dday = Math.ceil(Number( moment.duration(t2.diff(t1)).asDays() ));
						} else {
							item.dday = null;
						}

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
				path : `/gooduser/promotion/eventdetail/${id}`
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