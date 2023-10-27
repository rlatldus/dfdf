<template>
    <div>
    <HeaderComp :headerCase="'sub'" :pageName="'공지사항'" />
    <div id="content">
		<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
		<div class="customer_wrap notice_list w-set">
			<!-- 고객센터 좌측 메뉴 -->
			<CustomermenuComp />
			<!-- 고객센터 좌측 메뉴 끝 -->

			<!-- 고객센터 컨텐츠 -->
			<div class="customer_con">
				<h3 class="title">공지사항</h3>
					<div class="list_top">
						<div class="total">
							<p class="total_txt">총 <strong class="num_b">{{noticeCount}}</strong>건</p>
						</div>
						<div class="c-s-area">
							<div class="select_wrap">
								<select name="option" id="option" v-model="this.searchTarget">
									<option value="title">제목</option>
								</select>
							</div>
							<div class="c_searchbox">
								<form action="javascript:;" class="c-s-form">
									<input type="text" placeholder="검색어를 입력해주세요." v-model="this.searchKeyword">
									<button type="submit" @click="this.getNotice(true)">검색</button>
								</form>
							</div>
						</div>
					</div>
					<div class="notice_wrap">
						<div class="notice_list">
							<ul>
								<li class="list_row table_title">
									<div class="count">번호</div>
									<div>제목</div>
									<div class="date">등록일</div>
									<div class="views">조회수</div>
									<div class="attach_file">첨부파일</div>
								</li>
								<li class="list_row"
									v-for="(item, idx) in noticeList"
									:key="idx"
								>
									<div class="count">
										<span class="notice" v-if="item.isNotice === 'Y'">공지</span>
										<span v-else>{{item.id}}</span>
									</div>
									<div class="notice_txt">
										<router-link :to="'/gooduser/customer/noticeview/'+item.id" class="text_over">{{item.title}}</router-link>
										<i class="ico_new"></i>
									</div>
									<div class="date">{{item.isrtDate.substr(0,10)}}</div>
									<div class="views">{{item.hit}}</div>
									<div class="attach_file">
										<!-- <a href="/samsung/attachment/download/3b20ebad-1013-4f07-9245-a13248b33128">
                                            <i class="file" title="3ef06a2a02c548b3911a8b2b19d224a768276c6818f43c4c65fefe53f58545a989cf9a37ac7a9963dad6c16c08e83d62465d53d91a50b17139c74254dbdae77cf95faf32a6b31833a796887958dd1dc5.jpg">첨부파일 다운로드</i>
                                        </a> -->
										<a :href="`/samsung/attachment/download/${item.fileJson[0].uuid}`" class="ico_attatch" v-if="item.fileJson.length > 0">
											<span class="blind">첨부파일</span>
										</a>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="pagination" v-if="noticeCount > 0">
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
				<!-- 리스트 영역 끝 -->
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
import CustomermenuComp from '../../components/CustomermenuComp.vue';
import axios from "axios";

export default {
    name: "noticeList",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  CustomermenuComp,
    },
    data: () => ({
			checkLike : 0,
			noticeList: null,
			noticeCount: 0,
			searchTarget: 'title',
			searchKeyword: '',
			// 페이징 변수
			pagenationList: [],
			thisPage: 1,
			pageFirst: null,
			pagePrev: null,
			pageNext: null,
			pageLast: null,
			loadFirst: true,

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
		this.getNotice();
    },
    methods: {
		async getNotice(refresh){
			if (refresh) {
				this.loadFirst = true;
			}
			let url = '/gooduser/api/v1/user/notices?page='+this.thisPage;
			if (this.searchKeyword != '') {
				url+= '&searchTarget='+this.searchTarget;
				url+= '&searchKeyword='+this.searchKeyword;
			}
			await axios.get(url).then(res=>{

				this.noticeList = res.data.data.content;
				this.noticeCount = res.data.data.totalElements;
				if (this.loadFirst) {
					this.pagination(1);
				}
			})
		},
		async pagination(currentPage, goTop) {
			if (goTop) {
				window.scrollTo({top: 0});
			}
			// 초기세팅
			let pageCut = 10,
				groupCut = 10;

			if (this.noticeCount <= pageCut) return;

			this.thisPage = currentPage;
			if (this.loadFirst) {
				this.loadFirst = false;
			} else {
				this.getNotice();
			}

			let totalPage = Math.ceil(this.noticeCount/pageCut);
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
    }
}

</script>
<style scoped>

</style>
