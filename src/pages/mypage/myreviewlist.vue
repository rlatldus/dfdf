<template>
    <div>
    <HeaderComp :headerCase="'sub'" :pageName="'나의 리뷰'" />
	<div class="loading" v-if="pending"></div>
    <div id="content" v-if="!pending">
		<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
		<div class="mypage_wrap w-set">
			<!-- 마이페이지 좌측 메뉴 -->
			<MymenuComp />
			<!-- 마이페이지 좌측 메뉴 끝 -->
			<!-- 마이페이지 컨텐츠 -->
			<div class="mypage_con restock">
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
				<!-- 회원정보 끝 -->
				<h3 class="title">나의 리뷰</h3>
				<div class="tab_area">
					<ul class="tab_type_01">
						<li class="on" ><router-link to="/gooduser/mypage/myreviewlist">리뷰작성</router-link></li>
						<li><router-link to="/gooduser/mypage/myreviewlist2">작성한 리뷰</router-link></li>
					</ul>
				</div>
				<!-- 리스트 필터 영역  끝 -->
				<div class="my_total_info  mob_wrap">
					<strong>전체 (<span>{{pageListCount}}</span>)개</strong>
				</div>
				<!-- 알림리스트  끝 -->
				<div class="cart_box  mob_wrap">
					<div class="cart_list">
						<ul>
							<li v-for="(item, index) in this.reviewList" :key="index">
								<div class="product_box">
									<div class="prd_info_box">
										<dl>
											<dt>
												<router-link :to='"/gooduser/goodslist/detail/"+item.product.id' class="thumbnail">
													<!-- <img :src="getPic(item.product.mainImage)"> -->
													<img :src="item.realUrl" :alt="item.realUrl">
												</router-link>
											</dt>
											<dd>
												<p><strong class="txt_brand" v-if="item.product.brand">{{item.product.brand.name}}</strong></p>
												<p><span class="txt_prdname ellipsis_row">{{item.product.textName ? item.product.textName : item.product.name}}</span></p>
												<!-- <p class="ellipsis_box"><span class="txt_opt ellipsis">옵션정보가 표시됩니다.옵션정보가 표시됩니다.옵션정보가 표시됩니다.옵션정보가 표시니다.옵션정보가 표니다.옵션정보가 표니다.옵션정보가 표니다.옵션정보가 표됩니다.</span></p> -->
											</dd>
										</dl>
									</div>
									<div class="prd_price">
											{{item.shippingCompleteDay.substr(0,10)}} 배송
									</div>
									<div class="sel_btn">
											<p><a href="javascript:;" class="btn_dark_gray_solid" @click="reviewWrite(index)">리뷰작성</a></p>
									</div>
								</div>
							</li>
						</ul>
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
	</div>

	<div class="popup-bg" :class="{'on': reviewWriteData != null}" @click="reviewWriteClose"></div>
	<div class="popup-cont w01" :class="{'on': reviewWriteData != null}" id="popup-review" v-if="reviewWriteData != null">
		<div class="popup-header">
			<h3 class="title">상품리뷰</h3>
			<button type="button" class="popup-close-btn" @click="reviewWriteClose">닫기</button>
		</div>
		<div class="popup-body">
			<div class="goods_area">
				<div class="goods_img">
					<div class="img" :style="`background-image: url(${getPic(reviewWriteData.product.mainImage)})`">
						{{reviewWriteData.product.textName ? reviewWriteData.product.textName : reviewWriteData.product.name}}
					</div>
				</div>
				<p>
					{{reviewWriteData.product.textName ? reviewWriteData.product.textName : reviewWriteData.product.name}}
				</p>
			</div>
			<div class="popup_write">
				<div class="star_area starChk">
					<input type="radio" name="ratingChk" id="rating0" value="0" v-model="reviewWriteStar">
					<label for="rating0" class="chk chk00">0점</label>
					<input type="radio" name="ratingChk" id="rating1" value="1" v-model="reviewWriteStar">
					<label for="rating1" class="chk chk01">1점</label>
					<input type="radio" name="ratingChk" id="rating2" value="2" v-model="reviewWriteStar">
					<label for="rating2" class="chk chk02">2점</label>
					<input type="radio" name="ratingChk" id="rating3" value="3" v-model="reviewWriteStar">
					<label for="rating3" class="chk chk03">3점</label>
					<input type="radio" name="ratingChk" id="rating4" value="4" v-model="reviewWriteStar">
					<label for="rating4" class="chk chk04">4점</label>
					<input type="radio" name="ratingChk" id="rating5" value="5" v-model="reviewWriteStar">
					<label for="rating5" class="chk chk05">5점</label>
				</div>
				<div class="input_wrap">
					<form action="">
						<div v-for="(item, index) in reviewWriteData.selectorJson" :key="index">
							<p class="input_tit">{{item.value}}</p>
							<div class="input_area">
								<select :name="`choose${index}`" :id="`choose${index}`">
									<option :value="choose.optionName" v-for="(choose, index2) in item.items" :key="index2">{{choose.optionName}}</option>
								</select>
							</div>
						</div>
						<p class="input_tit">상세리뷰<strong class="required">*</strong></p>
						<div class="input_area">
							<!-- <textarea name="reviewDetail" id="reviewDetail" v-model="reviewWriteData.reviewDetail"></textarea> -->
							<textarea name="reviewDetail" id="reviewDetail" v-model="reviewWriteData.reviewDetail" :placeholder="reviewWriteData?.productCategory?.reviewPlaceholder"></textarea>
						</div>
						<p class="input_tit">사진첨부</p>
						<div class="attach_area">
							<ul>
								<li>
									<div class="attach">
										<input type="file" name="reviewFile0" id="reviewFile0" @change="onFileChange(0, $event)">
										<label for="reviewFile0" class="fileBtn">사진첨부</label>
									</div>
									<div class="img_area" v-if="upLoadFile[0].fileuuid">
										<div class="img" :style="`background-image: url(${upLoadFile[0]?.real_url});`"></div>
										<button type="button" class="btn delete" @click="deleteFile(0)">삭제</button>
									</div>
								</li>
								<li>
									<div class="attach">
										<input type="file" name="reviewFile1" id="reviewFile1" @change="onFileChange(1, $event)">
										<label for="reviewFile1" class="fileBtn">사진첨부</label>
									</div>
									<div class="img_area" v-if="upLoadFile[1].fileuuid">
										<div class="img" :style="`background-image: url(${upLoadFile[1]?.real_url});`"></div>
										<button type="button" class="btn delete" @click="deleteFile(1)">삭제</button>
									</div>
								</li>
								<li>
									<div class="attach">
										<input type="file" name="reviewFile2" id="reviewFile2" @change="onFileChange(2, $event)">
										<label for="reviewFile2" class="fileBtn">사진첨부</label>
									</div>
									<div class="img_area" v-if="upLoadFile[2].fileuuid">
										<div class="img" :style="`background-image: url(${upLoadFile[2]?.real_url});`"></div>
										<button type="button" class="btn delete" @click="deleteFile(2)">삭제</button>
									</div>
								</li>
							</ul>
							<p class="attach_txt">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 3개까지 첨부 가능합니다.</p>
						</div>
						<p class="input_notice">
							권리침해, 욕설, 특정 대상을 비하하는 내용, 청소년에게 유해한 내용 등을 게시할 경우 운영정책과 이용약관 및 관련 법률에 의해 제재될 수 있습니다.
						</p>
						<div class="btn_area">
							<button type="button" class="btn form02" @click="reviewWriteRequest">저장</button>
							<button type="button" class="btn popup-close" @click="reviewWriteClose">취소</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

    <MobileNavComp :mNavType="'my'" />
    <FooterComp />
    </div>
</template>
<script>
import HeaderComp from '../../components/HeaderComp.vue';
import MobileNavComp from '../../components/MobileNavComp.vue';
import FooterComp from '../../components/FooterComp.vue';
import MymenuComp from '../../components/MymenuComp.vue';
import axios from "axios";
export default {
    name: "myReviewList",
    components: {
		HeaderComp,
		MobileNavComp,
		FooterComp,
		MymenuComp,
    },
    data: () => ({
		// 초기 로딩 에러 방지
		pending: true,

		// 유저 정보
		userId: null,

		// 리뷰 정보
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
		
		// 리뷰 작성
		reviewWriteData: null,
		reviewWriteStar: '0',

		// 파일 관련
		upLoadFile: [
			{
				attachFile : null,
				attachFileName: null,
				fileuuid: null,
			},
			{
				attachFile : null,
				attachFileName: null,
				fileuuid: null,
			},
			{
				attachFile : null,
				attachFileName: null,
				fileuuid: null,
			}
		]
    }),
    created () {
		this.$store.commit('setState');
		this.userId = this.$store.state.userId;
		if (this.userId == null) {
            alert('로그인이 필요한 페이지 입니다.');
			this.$router.push('/gooduser');
		}

		console.time("Performance Time");
		console.log('created');

		this.loadReviewList();
    },
    methods: {
		// 기본 유틸리티
		getPic(name) {
			return `/tenant/attachment/view/${name}`;
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
		escapeRegex(string) {
            if(string){
                return string.replace(/[-\/\\^$%*+?.()|[\]{}<>]/g, ' ');
            }else{
                return string
            }
            
        },

		async loadReviewList() {
			let url = `/gooduser/api/v1/productreview/user_before_write_list`
			let prodData={
				// memberId : this.userId, //number
				page: this.thisPage,
			};
			
			await axios.post(url,prodData).then(res=>{

				console.log(res);
				
				// res.data.data.content[0].selectorJson.replace(/\//g,'')
				// res.data.data.content[0].selectorJson = JSON.parse(res.data.data.content[0].selectorJson);
				
				if (res.data.data.content?.length > 0) {
					res.data.data.content.forEach((item, index) => {
						item.selectorJson.replace(/\//g,'');
						if (item.selectorJson != null) {
							item.selectorJson = JSON.parse(item.selectorJson);
						}
						
					});
				}
				this.reviewList = res.data.data.content;
				this.pageListCount = res.data.data.totalElements;
				if (this.loadFirst) {
					this.pagination(1);
				}
				this.pending = false;
			});
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

		// 리뷰 작성
		reviewWrite (idx) {
			this.reviewWriteStar = '0';
			this.reviewWriteData = JSON.parse(JSON.stringify(this.reviewList[idx]));
			this.deleteFile(0);
			this.deleteFile(1);
			this.deleteFile(2);
		},
		reviewWriteClose() {
			this.reviewWriteStar = '0';
			this.reviewWriteData = null;
			this.deleteFile(0);
			this.deleteFile(1);
			this.deleteFile(2);
		},
		async reviewWriteRequest () {
			let url = `/gooduser/api/v1/productreview/write`
			let chooseOption = '';
			this.reviewWriteData.selectorJson.forEach((item, index) => {
				if (index != 0) {
					chooseOption += ` / `;
				}
				chooseOption += `${item.value}: ${document.querySelector('#choose'+index).value}`;
			});
			

			if (this.reviewWriteStar == '0') {
				alert('별점 선택은 필수입니다');
				return false;
			}

			if (this.reviewWriteData.reviewDetail == '' || this.reviewWriteData.reviewDetail == null) {
				alert('리뷰 내용은 필수입니다');
				return false;
			}

			let reviewSetData = {
				memberId: this.userId,
				productReviewId: this.reviewWriteData.id,
				starPoint: Number(this.reviewWriteStar),
				userImage1: this.upLoadFile[0].fileuuid ? this.upLoadFile[0].fileuuid : null,
				userImage2: this.upLoadFile[1].fileuuid ? this.upLoadFile[1].fileuuid : null,
				userImage3: this.upLoadFile[2].fileuuid ? this.upLoadFile[2].fileuuid : null,
				reviewDetail: this.escapeRegex(this.reviewWriteData.reviewDetail),
				chooseJson: chooseOption,
			}
			
			await axios.post(url,reviewSetData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				
				this.reviewWriteClose();
				this.loadFirst = true;
				this.loadReviewList();
			});
		},

		// 파일 컨트롤러
		onFileChange(idx, e){
			this.upLoadFile[idx].attachFileName = e.target.files[0].name; //.files
			this.upLoadFile[idx].attachFile = e.target.files[0]
			console.log(this.upLoadFile[idx].attachFile)
			this.uploadAttachment(idx, this.upLoadFile[idx].attachFile);
			const inputFile = document.getElementById(`reviewFile${idx}`);
			inputFile.value = '';
		},
		async uploadAttachment(idx, file) {
			let formData = new FormData();
			formData.append('attach', file); // 무조건 form에 attach 해서 보내야 하는가??
			
			await fetch('/gooduser/api/v1/attachment/upload', {
				method: 'POST',
				body: formData
			}).then((response) => response.json())
			.then((data) => {
				if (data.message === 'SUCCESS'){
					this.upLoadFile[idx].fileuuid = data.info.uuid
					this.upLoadFile[idx].real_url = data.info.real_url
				}
				else{
					return alert(data.message);
				}
			})
			.catch((error) => {
				alert('오류가 발생했습니다: ' + error);
				console.log(error);
			});
		},
		deleteFile(idx){
			this.upLoadFile[idx] = {};
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