<template>
    <div>
    <HeaderComp :headerCase="'sub'" :pageName="'FAQ'" />
    <div id="content">
		<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
		<div class="customer_wrap faq_list w-set">
			<!-- 고객센터 좌측 메뉴 -->
			<CustomermenuComp />
			<!-- 고객센터 좌측 메뉴 끝 -->

			<!-- 고객센터 컨텐츠 -->
			<div class="customer_con">
				<h3 class="title">FAQ</h3>
				<div class="tab_area type-2">
					<!-- TODO: 탭, 태그서치 -->
					<div class="faq_tab">
						<ul class="tab_type_01">
							<li :class="{'on' : tabIndex === 0}"><a href="#tab1" @click="tabAction(0)">전체</a></li>
							<li :class="{'on' : tabIndex === 1}"><a href="#tab2" @click="tabAction(1)">주문/결제</a></li>
							<li :class="{'on' : tabIndex === 2}"><a href="#tab3" @click="tabAction(2)">배송/반품/교환</a></li>
							<li :class="{'on' : tabIndex === 3}"><a href="#tab4" @click="tabAction(3)">취소/환불</a></li>
							<li :class="{'on' : tabIndex === 4}"><a href="#tab5" @click="tabAction(4)">상품</a></li>
							<li :class="{'on' : tabIndex === 5}"><a href="#tab6" @click="tabAction(5)">기타</a></li>
						</ul>
					</div>
					<div class="faq_tab">
						<ul class="tab_type_02">
							<li :class="{'on' : tabIndex === 0}"><a href="#tab1" @click="tabAction(0)">전체</a></li>
							<li :class="{'on' : tabIndex === 1}"><a href="#tab2" @click="tabAction(1)">주문/결제</a></li>
							<li :class="{'on' : tabIndex === 2}"><a href="#tab3" @click="tabAction(2)">배송/반품/교환</a></li>
							<li :class="{'on' : tabIndex === 3}"><a href="#tab4" @click="tabAction(3)">취소/환불</a></li>
							<li :class="{'on' : tabIndex === 4}"><a href="#tab5" @click="tabAction(4)">상품</a></li>
							<li :class="{'on' : tabIndex === 5}"><a href="#tab6" @click="tabAction(5)">기타</a></li>
						</ul>
					</div>
					<!-- 전체 -->
					<div class="tab_box on">
						<div class="list_top">
							<p class="total">총 <strong class="num_b">{{faqCount}}</strong>건</p>
							<div class="c-s-area">
								<div class="select_wrap">
									<select name="option" id="option_01" v-model="this.searchTarget">
										<option value="title">제목</option>
									</select>
								</div>
								<div class="c_searchbox">
									<form action="javascript:;" class="c-s-form">
										<input type="text" placeholder="검색어를 입력해주세요." v-model="this.searchKeyword">
										<button type="submit" @click="this.getFaq(true)">검색</button>
									</form>
								</div>
							</div>
						</div>
						<div class="notice_wrap estimate">
							<div class="notice_list">
								<ul>
									<li class="list_row table_title">
										<div class="count only-num">번호</div>
										<div class="count">구분</div>
										<div>제목</div>
										<div class="date">등록일</div>
										<!-- <div class="attach_file">첨부파일</div> -->
										<div class="views">조회수</div>
									</li>
									<li class="list_row"
										v-for="(item, idx) in faqList"
										:key="idx"
									>
										<div class="count only-num">{{item.id}}</div>
										<div class="count">
											<span class="notice bg-none">
												<span v-for="(inCategory, index2) in item.category" :key="index2">
													<span v-if="index2 === 0">{{faqCate[inCategory]}}</span>
												</span>
											</span>
										</div>
										<div class="notice_txt">
											<!-- <i class="ico_new"></i> -->
											<router-link :to="'/gooduser/customer/faqview/'+item.id" class="text_over">{{item.title}}</router-link>
										</div>
										<div class="date">{{item.isrtDate.substr(0,10)}}</div>
										<div class="views">{{item.hit}}</div>
										<!-- <div class="attach_file">
											<a href="#" class="ico_attatch" v-if="item.fileJson.length > 0">
												<span class="blind">첨부파일</span>
											</a>
										</div> -->
									</li>
								</ul>
							</div>
						</div>
						<div class="pagination" v-if="faqCount > 0">
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
					</div><!-- //전체 -->
				</div>
				<!-- 리스트 영역 끝 -->
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
import CustomermenuComp from '../../components/CustomermenuComp.vue';
import axios from "axios";
export default {
    name: "faqList",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  CustomermenuComp,
    },
    data: () => ({
        checkLike : 0,
		tabIndex: 0,
		faqList: false,
		faqCount: 0,
		faqCate: {
			'1': '주문/결제',
			'2': '배송/반품/교환',
			'3': '취소/환불',
			'4': '상품',
			'5': '기타'
		},
		searchTarget: 'title',
		searchKeyword: '',
		FaqCategory: false,


		// 페이징 변수
		pagenationList: [],
		thisPage: 1,
		pageFirst: null,
		pagePrev: null,
		pageNext: null,
		pageLast: null,
		loadFirst: true,
    }),
    created () {
		this.getFaq();
    },
    methods: {
        tabAction(idx) {
			if (idx == 0) {
				this.FaqCategory = false;
			} else {
				this.FaqCategory = [idx];
			}
			this.tabIndex = idx;
			this.getFaq(true);
		},
		async getFaq(refresh){
			if (refresh) {
				this.loadFirst = true;
			}
			let url = '/gooduser/api/v1/faq?page='+this.thisPage;
			if (this.searchKeyword != '') {
				url+= '&searchTarget='+this.searchTarget;
				url+= '&searchKeyword='+this.searchKeyword;
			}
			if (this.FaqCategory) {
				url+= '&category='+this.FaqCategory;
			}
			await axios.get(url).then(res=>{
				this.faqList = res.data.data.content;
				this.faqList.forEach((element, idx) => {
					// array 타입으로 변경 [, ], ", 공백 제거
					this.faqList[idx].category = element.category.replace(/\[/g, '').replace(/\]/g, '').replace(/\"/g, '').replace(/\s/g, '').split(',')
				});
				this.faqCount = res.data.data.totalElements;
				if (this.loadFirst) {
					this.pagination(1);
				}
			})
		},
		move_To_Detail(cate,id){
			switch(cate){
				
			}

			this.$router.push({
			path : `/goodslist/detail/${id}`
			})
		},
		async pagination(currentPage, goTop) {
			if (goTop) {
				window.scrollTo({top: 0});
			}
			// 초기세팅
			let pageCut = 10,
				groupCut = 10;

			if (this.faqCount <= pageCut) return;

			this.thisPage = currentPage;
			if (this.loadFirst) {
				this.loadFirst = false;
			} else {
				this.getFaq();
			}

			let totalPage = Math.ceil(this.faqCount/pageCut);
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