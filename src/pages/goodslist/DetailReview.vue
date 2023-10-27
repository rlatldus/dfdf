<template>
    <div>
		<div class="tab-goods-review">
			<div class="tgr-header" v-if="!(this.reviewList == null || this.reviewList.length < 1)">
				<div class="tgr-left">
					<div class="star-all">
						<span class="txt-kor">총점</span>
						<div class="star_area">
							<span class="star">
								<span :style="`width: ${Number(this.reviewAllStarPoint) * 20}%;`"></span>
							</span>
						</div>
						<span class="txt-point mont">{{this.reviewAllStarPoint}}</span>
					</div>
					<div class="review-count">
						전체(<span class="num mont">{{this.pageListCount}}</span>건) / 포토리뷰(<span class="num mont">{{this.pageListImageCount}}</span>건)
					</div>
				</div>
			</div>

			<div class="tgr-body" v-if="this.reviewList == null || this.reviewList.length < 1">
				<div class="content_none">
					<i></i>
					<p>등록된 리뷰가 없습니다.</p>
				</div>
			</div>

			<div class="tgr-body" v-else>
				<div class="tgr-list" v-for="(item, index) in this.reviewList" :key="index">
					<div class="tgr-goods">
						<div class="tgrc-img">
							<div class="imgbox">
								<router-link :to='"/gooduser/goodslist/detail/"+item.product.id'>
									<img :src="getPic(item.product.mainImage)">
								</router-link>
							</div>
						</div>
						<div class="goods_info">
							<strong class="brand" v-if="item.product.brand">{{item.product.brand.name}}</strong>
							<p class="tgrc-title">{{item.product.textName ? item.product.textName : item.product.name}}</p>
						</div>
					</div>
					<div class="tgr-post">
						<div class="tgr-cont">
							<div class="star_area">
								<span class="star">
									<span :style="`width: ${item.starPoint * 20}%;`"></span>
								</span>
							</div>
							<div class="tgrc-title">{{item.chooseJson}}</div>
							<div class="tgrc-desc" v-html="changeBr(item.reviewDetail)"></div>
							<div class="tgrc-img"
								v-if="item.userImage1 || item.userImage2 || item.userImage3"
							>
								<div class="imgbox" v-if="item.userImage1">
									<img :src="item.userImage1?.real_url" alt="샘플이미지" @click="setImageViewer(item)">
								</div>
								<div class="imgbox" v-if="item.userImage2">
									<img :src="item.userImage2?.real_url" alt="샘플이미지" @click="setImageViewer(item)">
								</div>
								<div class="imgbox" v-if="item.userImage3">
									<img :src="item.userImage3?.real_url" alt="샘플이미지" @click="setImageViewer(item)">
								</div>
							</div>
							<div class="tgrc-user-info" v-if="item.isrtDate">
								<span class="date mont">{{item.isrtDate.substr(0,10)}}</span>
							</div>
						</div>
					</div>
					<div class="tgr-answer" v-if="item.reply">
						<div class="tgrc-title type-seller">{{item.reply.memberUser.name}}</div>
						<div class="tgrc-desc" v-html="item.reply.replyContent"></div>
						<div class="tgrc-user-info">
							<span class="date mont">{{(item.reply.updtDate ? item.reply.updtDate : item.reply.isrtDate).substr(0,10)}}</span>
						</div>
					</div>
				</div>
			</div>

			<div class="pagination" v-if="pageListCount > 0">
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
			</div>
		</div>

		<ImageViewerComp ref="vImageViewer" />
    </div>
</template>
<script>
import axios from "axios";
import ImageViewerComp from '../../components/ImageViewerComp.vue';

export default {
    name: "DetailReview",
	props: ["prodId"],
    components: {
		ImageViewerComp
    },
    data: () => ({
        pending: true,
        // 상품 리뷰 관련 변수
        reviewWritePop: false,
        reviewList: null,

		// 페이징 변수
		pageListCount: 0,
		pagenationList: [],
		thisPage: 1,
		pageFirst: null,
		pagePrev: null,
		pageNext: null,
		pageLast: null,
		loadFirst: true,

		// 이미지 게시글 체크
		pageListImageCount: 0,
		reviewAllStarPoint: 0,
    }),
    created () {
        this.$store.commit('setState');

        this.loadReviewList();
    },
    methods: {
        getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },

        async loadReviewList() {
			let url = `/gooduser/api/v1/productreview/product_detail_review_list`
            let prodData={
                productId : this.prodId,//number
                page: 1,
            };
			this.pageListImageCount = 0;
            
            await axios.post(url,prodData).then(res=>{
                

				this.pageListCount = res.data.data.totalElements;
				this.$emit('responseCount', this.pageListCount);

                this.reviewList = res.data.data.content;

				if (this.reviewList?.length > 0) {
					let checkJSON = /{/;
					res.data.data.content.forEach((item, index) => {
						if (checkJSON.test(item.userImage1)) {
							item.userImage1 = JSON.parse(item.userImage1);
						}
						if (checkJSON.test(item.userImage2)) {
							item.userImage2 = JSON.parse(item.userImage2);
						}
						if (checkJSON.test(item.userImage3)) {
							item.userImage3 = JSON.parse(item.userImage3);
						}
						
						item.selectorJson.replace(/\//g,'');
						if (item.selectorJson != null) {
							item.selectorJson = JSON.parse(item.selectorJson);
						}
						console.log(item.selectorJson);
					});
					this.reviewAllStarPoint = this.reviewList[0].divStarPoint;
					this.pageListImageCount = this.reviewList[0].imageAmount;
				}
				
				if (this.loadFirst) {
					this.pagination(1);
				}
            });
		},

		// 페이징
		async pagination(currentPage) {
			
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
				this.loadReviewList();
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

		// 이미지 뷰어 함수
        setImageViewer(itemData) {
			let makeArr = [];
			if (itemData.userImage1 != null || itemData.userImage1 != '') {
				makeArr.push(itemData.userImage1?.real_url);
			}
			if (itemData.userImage2 != null || itemData.userImage2 != '') {
				makeArr.push(itemData.userImage2?.real_url);
			}
			if (itemData.userImage3 != null || itemData.userImage3 != '') {
				makeArr.push(itemData.userImage3?.real_url);
			}

            this.$refs.vImageViewer.showVviewer(makeArr);
        },
		changeBr(value){
			let result = value;
			if (typeof value == 'string') {
				result = value.replaceAll(/(\n|\r\n)/g,'<br>')
			}
			return result
		}
    },
}

</script>
<style scoped>

</style>