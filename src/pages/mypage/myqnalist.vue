<template>
    <div>
    <HeaderComp :headerCase="'sub'" :pageName="'상품 Q&A'"/>
	<div class="loading" v-if="pending"></div>
	<div id="content" v-else>
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
				<h3 class="title">상품 Q&amp;A</h3>

				<div class="my_total_info  mob_wrap">
					<strong>전체 (<span>{{this.pageListCount}}</span>)개</strong>
				</div>
				<!-- 알림리스트  끝 -->

				<div class="cart_box mob_wrap">
					<div class="tab-goods-qna">
						<div class="tgq-body">
							<!-- 데이터 없음
							<div class="content_none">
								<i></i>
								<p>등록된 상품문의가 없습니다.</p>
							</div>
							-->
							<div class="tgqb-list" v-for="(item, index) in this.qnaList" :key="index" :class="{'type-secret' : item.isSecret == 'Y'}" :id="'qnaList'+item.id">
								<div class="tgqb-goods" v-if="item.product">
									<div class="tgqb-img">
										<div class="imgbox">
											<router-link :to="'/gooduser/goodslist/detail/'+item.product.id">
												<img :src="item.mainImagePath" :alt="item.mainImagePath">
											</router-link>
										</div>
									</div>
									<div class="goods_info">
										<router-link :to="'/gooduser/goodslist/detail/'+item.product.id"><p class="title">
											{{item.product.textName ?  item.product.textName : item.product.name}}
										</p></router-link>
									</div>
								</div>
								<div class="tgqb-header">
									<div class="tag" v-if="item.answer == null">대기중</div>
									<div class="tag complete" v-else>답변완료</div>

									<div class="header-info">
										<span class="title" v-if="item.isSecret == 'Y' && this.passwordOkList[item.id] == false">비밀글 입니다.</span>
										<span class="title" v-else>{{item.textTitle}}</span>
									</div>
									<div class="tab-board-edit">
										<button type="button" class="type-edit" v-if="item.isSecret == 'Y'" @click="passwordPopOpen(item, true)">수정</button>
										<button type="button" class="type-edit" v-else @click="qnaEdit(item)">수정</button>
										<button type="button" class="type-delete" @click="qnaDelPop(item.id)">삭제</button>
									</div>
									<div class="tgqb-date">
										<span class="mont">{{String(item.isrtDate).substr(0, 10)}}</span>
									</div>
									<div class="tgqb-arr">
										<button type="button" class="btn tgqOpen" v-if="item.isSecret == 'Y'" @click="passwordPopOpen(item)">열기/닫기</button>
										<button type="button" class="btn tgqOpen" v-else @click="qnaOpen(item)">열기/닫기</button>
									</div>
								</div>
								<div class="tqqb-body">
									<div class="body-content" v-if="this.passwordOkList[item.id]" v-html="item.content?.replace(/\n/gi,'<br>')">
									</div>
									<div class="body-answer" v-if="item.answer !== null && this.passwordOkList[item.id]">
										<div class="tag">답변</div>
										<div class="answer-content">
											<span class="title" v-html="item.answer"></span>
											<div class="user-info">
												<span class="date mont">{{item.answerDate.substr(0, 10)}}</span>
											</div>
										</div>
									</div>
								</div>
							</div>




							<!-- <div class="tgqb-list">
								<div class="tgqb-goods">
									<div class="tgqb-img">
										<div class="imgbox">
											<img src="../../assets/images/dummy/goods_image_sample.png" alt="샘플이미지">
										</div>
									</div>
									<div class="goods_info">
										<p class="title">상품명이 출력되는 영역(최대 한 줄 길면 말 줄임)···</p>
									</div>
								</div>
								<div class="tgqb-header">
									<div class="tag complete">답변완료</div>
									<div class="header-info">
										<span class="title">드라이버</span>
									</div>
									<div class="tab-board-edit">
										<button type="button" class="type-edit">수정</button>
										<button type="button" class="type-delete">삭제</button>
									</div>
									<div class="tgqb-date">
										<span class="mont">2022.04.07</span>
									</div>
									<div class="tgqb-arr">
										<button type="button" class="btn tgqOpen">열기/닫기</button>
									</div>
								</div>
								<div class="tqqb-body">
									<div class="body-answer">
										<div class="tag">답변</div>
										<div class="answer-content">
											<span class="title">내용입니다.</span>
											<div class="user-info">
												<span class="date mont">2022.04.07</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="tgqb-list">
								<div class="tgqb-goods">
									<div class="tgqb-img">
										<div class="imgbox">
											<img src="../../assets/images/dummy/goods_image_sample.png" alt="샘플이미지">
										</div>
									</div>
									<div class="goods_info">
										<p class="title">상품명이 출력되는 영역(최대 한 줄 길면 말 줄임)···</p>
									</div>
								</div>
								<div class="tgqb-header">
									<div class="tag complete">답변완료</div>
									<div class="header-info">
										<span class="title">드라이버</span>
									</div>
									<div class="tab-board-edit">
										<button type="button" class="type-edit">수정</button>
										<button type="button" class="type-delete">삭제</button>
									</div>
									<div class="tgqb-date">
										<span class="mont">2022.04.07</span>
									</div>
									<div class="tgqb-arr">
										<button type="button" class="btn tgqOpen">열기/닫기</button>
									</div>
								</div>
								<div class="tqqb-body">
									<div class="body-answer">
										<div class="tag">답변</div>
										<div class="answer-content">
											<span class="title">내용입니다.</span>
											<div class="user-info">
												<span class="date mont">2022.04.07</span>
											</div>
										</div>
									</div>
								</div>
							</div> -->
						</div>
						<div class="pagination" v-if="this.pageListCount > 0">
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
	</div>

	<!-- popup -->
	<div class="popup-bg on" v-if="this.editPopup"></div>
	<div class="popup-cont w01 on" id="popup-goods" v-if="this.editPopup">
		<div class="popup-header">
			<h3 class="title">상품문의</h3>
			<button type="button" class="popup-close-btn" @click="this.editPopup = false">닫기</button>
		</div>
		<div class="popup-body">
			<p class="goods_title">
				<span v-if="editPopupCont.product">{{editPopupCont.product.name}}</span>
				<span v-else>상품 미선택</span>
			</p>
			<div class="popup_write type-02">
				<div class="input_wrap">
					<form action="">
						<p class="input_tit">문의 내용<strong class="required">*</strong></p>
						<div class="input_area">
							<textarea name="askDetail" id="askDetail" v-model="editPopupCont.content"></textarea>
						</div>
						<p class="input_tit">비밀 글 설정</p>
						<div class="chk_area">
							<input type="checkbox" name="secretChk" id="secretChk" :checked="editPopupCont.isSecret == 'Y'">
							<label for="secretChk" class="chk">
								<i class="ico_chk"></i>
								비밀글 선택 시 작성자만 조회 가능합니다.
							</label>
						</div>
						<div class="input_area">
							<input type="password" name="passwordEdit" id="passwordEdit">
						</div>
						<div class="btn_area">
							<button type="button" class="btn form02" @click="this.qnaEditSubmit">저장</button>
							<button type="button" class="btn popup-close" @click="this.editPopup = false">취소</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<div class="popup-bg on" v-if="this.passwordPopup"></div>
	<div class="popup-cont w01 on" id="popup-goods" v-if="this.passwordPopup">
		<div class="popup-header">
			<h3 class="title">비밀번호 확인</h3>
			<button type="button" class="popup-close-btn" @click="this.passwordPopup = false">닫기</button>
		</div>
		<div class="popup-body">
			<div class="popup_write type-03">
				<div class="input_wrap">
					<form action="">
						<p class="input_tit">비밀번호를 입력해주세요</p>
						<div class="input_area">
							<input type="password" name="passwordCheck" id="passwordCheck">
						</div>
						<div class="btn_area">
							<button type="button" class="btn form02" @click="this.passwordCheckQuery">확인</button>
							<button type="button" class="btn popup-close" @click="this.passwordPopup = false">취소</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<ModalAlert
		v-if="this.qnaDeleteConfirm"
		:text="'삭제하시겠습니까?'"
		:type="'confirm'"
		@confirm="qnaDelete"
		@close="this.qnaDeleteConfirm = false"
	/>

	<ModalAlert
		v-if="this.modalCopyOk"
		:text="'수정이 완료되었습니다.'"
		@close="this.modalCopyOk = false"
	/>

	<ModalAlert
		style="z-index: 9999999"
		v-if="this.passwordInputRequirePop"
		:text="'비밀번호를 입력해주세요'"
		@close="this.passwordInputRequirePop = false"
	/>

	<ModalAlert
		style="z-index: 9999999"
		v-if="this.passwordIsWrong"
		:text="'올바르지 않은 비밀번호 입니다.'"
		@close="this.passwordIsWrong = false"
	/>

    <MobileNavComp :mNavType="'my'" />
    <FooterComp />
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
    name: "myQnaList",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  MymenuComp,
	  ModalAlert,
    },
    data: () => ({
		pending: true,

        checkLike : 0,
		qnaList: null,

		// 팝업
		qnaDeleteConfirm: false,
		delId: 0,

		editPopup: false,
		editPopupCont: null,
		editPassword: null,
		modalCopyOk: false,

		// 패스워드 체킹
		passwordPopup: false,
		passwordCheck: null,
		passwordCheckItem: null,
		passwordCheckResult: false,
		passwordOkList: {},
		passwordWasOkOpenEdit: false,
		passwordInputRequirePop: false,
		passwordIsWrong: false,

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
		if (this.userId == null) {
            alert('로그인이 필요한 페이지 입니다.');
			this.$router.push('/gooduser');
		}

        this.getQnaList();
    },
    methods: {
		getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },
		escapeRegex(string) {
            if(string){
                return string.replace(/[-\/\\^$%*+?.()|[\]{}<>]/g, ' ');
            }else{
                return string
            }
            
        },
        async getQnaList() {
            let url = '/gooduser/api/v1/qna_list';
            let setData = {
				memberId: this.$store.state.userId,
				page: this.thisPage,
			};
            await axios.post(url,setData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
                console.log(res);
                this.qnaList = res.data.data.content;
				this.pageListCount = res.data.data.totalElements;
				this.qnaList.forEach((item) => {
					if (item.isSecret == 'Y') {
						this.passwordOkList[item.id] = false;
					} else {
						this.passwordOkList[item.id] = true;
					}

					if (typeof(item.content) == 'string') {
						item.textTitle = item.content?.replace(/&nbsp;/gi,' ');
						// item.content = item.content?.replace(/\n/gi,'<br>');
					}
				});
				// this.passwordOkList
				if (this.loadFirst) {
					this.pagination(1);
				}

				this.pending = false;
            });
        },
		qnaDelPop(id) {
			this.qnaDeleteConfirm = true;
			this.delId = id;
		},
		async qnaDelete() {
			this.qnaDeleteConfirm = false;
			let url = '/gooduser/api/v1/qna_delete';
            let setData = {
				// "memberId": this.$store.state.userId,
				"id": this.delId
			};
            await axios({
                'method': 'post',
                'url': url,
                'data': setData,
				'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            }).then(res=>{
				console.log(res);
				this.loadFirst = true;
				this.getQnaList();
            });
		},
		qnaEdit (item) {
			this.editPopupCont = Object.assign({}, item);
			this.editPopup = true;
		},
		async qnaEditSubmit() {
			let $secretCheck = document.querySelector("#secretChk");
			if ($secretCheck.checked && document.querySelector("#passwordEdit").value == '') {
				this.passwordInputRequirePop = true;
				return;
			}
			let url = '/gooduser/api/v1/qna_edit';
            let setData = {
				"id": this.editPopupCont.id,
				// "memberId": this.$store.state.userId,
				"productId": this.editPopupCont.product ? this.editPopupCont.product.id : null,
				"isSecret": $secretCheck.checked ? "Y" : "N",
				"content": this.escapeRegex(this.editPopupCont.content),
				"tenantId": this.editPopupCont.memberTenant.id,
				"password": $secretCheck.checked ? document.querySelector('#passwordEdit').value : ""
			};
			console.log(setData);
            await axios({
                'method': 'post',
                'url': url,
                'data': setData,
				'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            }).then(res=>{
                console.log(res);
				this.editPopup = false;
				this.modalCopyOk = true;
				this.loadFirst = true;
                this.getQnaList();
            });
		},
		qnaOpen(item) {
			document.querySelector(`#qnaList${item.id} .tgqOpen`).classList.toggle('active');
			document.querySelector(`#qnaList${item.id} .tqqb-body`).classList.toggle('active');
        },
		passwordPopOpen (item, isEdit) {
			if (this.passwordOkList[item.id] && isEdit) {
				qnaEdit(item);
			} else if (this.passwordOkList[item.id]) {
				this.qnaOpen(item);
			} else {
				if (isEdit) {
					this.passwordWasOkOpenEdit = true;
				}
				this.passwordPopup = true;
				this.passwordCheckItem = item;
			}
		},
		async passwordCheckQuery() {
			let url = '/gooduser/api/v1/qna_check';
            let setData = {
				"memberId": this.$store.state.userId,
				"id": this.passwordCheckItem.id,
				"password": document.querySelector('#passwordCheck').value
			};
            await axios({
                'method': 'post',
                'url': url,
                'data': setData,
				'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            }).then(res=>{
                console.log(res);
				if (res.data.data == 'Y') {
					if (this.passwordWasOkOpenEdit) {
						this.qnaEdit(this.passwordCheckItem);
					} else {
						this.qnaOpen(this.passwordCheckItem);
					}
					this.passwordOkList[this.passwordCheckItem.id] = true;
				} else {
					this.passwordIsWrong = true;
				}
				this.passwordWasOkOpenEdit = false;
				this.passwordPopup = false;
				this.passwordCheckItem = null;
            });
		},
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
				this.getQnaList();
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
		}
	}
}

</script>
<style scoped>

</style>