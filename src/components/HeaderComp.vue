<template>
	<header :class="{'type-main': typeMain, 'type-goods-list' : typeGoods, 'type_view' : typeSub}">
		<div class="header-top">
			<div class="w-set header-flex">
				<h1 class="logo">
					<a href="javascript:;" @click="gotoMain()">
						<span class="blind">Good Shop</span>
					</a>
				</h1>
				<div class="h-t-right">
					<div class="header-searchbox">
						<form action="javascript:;" class="h-s-form">
							<input type="text" placeholder="검색어 입력" v-model="this.msg">
							<button type="submit" @click="setSearchTextLog(this.msg)">검색</button>
						</form>
						<div class="h-s-floating">
							<div class="hsf-tab">
								<button type="button" :class="{'on': searchTabIndex == 0}" @click="searchTabIndex = 0" data-tab="type-recent">최근 검색어</button>
								<button type="button" :class="{'on': searchTabIndex == 1}" @click="searchTabIndex = 1" data-tab="type-rank">인기 검색어</button>
							</div>
							<div class="hsf-content">
								<div class="hsfc-list type-none" v-if="this.msgLog.length == 0 && searchTabIndex == 0">
									최근 검색기록이 없습니다.
								</div>
								<ul class="hsfc-list type-recent" v-else-if="this.msgLog.length > 0 && searchTabIndex == 0">
									<li v-for="(item, index) in this.msgLog" :key="index"><a href="javascript:;" @click="setMsgAndSend(item.text)"><span class="sctl-txt">{{item.text}}</span></a></li>
								</ul>
								<ul class="hsfc-list type-rank" v-if="searchTabIndex == 1">
									<li v-for="(item, index) in this.topSearchData" :key="index">
										<a :href="item.url" :target="item.urlType">
											<span class="rank">{{index + 1}}</span><span class="sctl-txt bold">{{item.keyword}}</span>
										</a>
									</li>
								</ul>
							</div>
							<div class="hsf-bottom" v-if="searchTabIndex == 0">
								<button type="button" class="hsfc-delete" :class="{'on': searchTabIndex == 0}" @click="deleteSearchLog()"><i></i><span>전체삭제</span></button>

							</div>
						</div>
					</div>
					<ul class="header-buttons">
						<!-- <li class="type-search for-m"><a href="javascript:;" class="link"><span class="blind">검색</span></a></li> -->
						<!-- <li class="type-alert dot">
							<a href="javascript:;" class="link"><span class="blind">알림</span></a>
							<div class="header-alert">
								<ul class="alert-list">
									<li
										v-for="(item, index) in alertList"
										:key="index"
									><a href="javascript:;">{{item.txt}}</a></li>
								</ul>
								<button type="button" class="alert-more" @click="move_To_Alert">전체보기</button>
							</div>
						</li> -->
						<!-- TODO: 새 찜 리스트 있을시 dot class 적용 기능 -->
						<li class="type-like for-pc" @click="move_To_Wish" :class="{'dot' : likeList?.content?.length > 0}"><a href="javascript:;" class="link"><span class="blind" >찜</span></a></li>
						<li class="type-cart" @click="move_To_Cart">
							<a href="javascript:;" class="link">
								<span class="blind">장바구니</span>
								<span class="count">{{cartLength}}</span>
							</a>
						</li>
						<li class="type-my for-pc" @click="move_To_My"><a href="javascript:;" class="link"><span class="blind">마이페이지</span></a></li>
						<li class="type-gift">
							<router-link to="/gooduser/promotion/eventdetail/2" class="link" v-if="this.userGrade == 'VIP'"><span class="blind">선물하기</span></router-link>
							<router-link to="/gooduser/promotion/eventdetail/1" class="link" v-else><span class="blind">선물하기</span></router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="header-bottom">
			<div class="w-set header-flex">
				<div class="h-b-left">
					<div class="header-category-all">
						<i class="category-line3"></i>
						<span>전체 카테고리</span>
						<i class="category-arr"></i>
					</div>
					<ul class="header-menu">
						<li><a href="javascript:;" :class="getPath ==='/gooduser/etc/categorymen'?  'on' : ''" class="type-flag"><router-link to ="/gooduser/etc/categorymen">Men</router-link></a></li>
						<li><a href="javascript:;" :class="getPath ==='/gooduser/etc/categorywomen'?  'on' : ''" class="type-flag"><router-link to ="/gooduser/etc/categorywomen">Women</router-link></a></li>
						<li v-if="this.livingCategoryArr?.length > 0"><a href="javascript:;" :class="getPath ==='/gooduser/goodslist/list'?  'on' : ''"><router-link :to="'/gooduser/goodslist/list/'+this.allCateData[2].id">생활용품</router-link></a></li>

						<li><a href="javascript:;" :class="getPath ==='/gooduser/promotion/brand'?  'on' : ''"><router-link to ="/gooduser/promotion/brand/brand">브랜드</router-link></a></li>
						<li><a href="javascript:;" :class="getPath ==='/gooduser/promotion/best'?  'on' : ''"><router-link to ="/gooduser/promotion/best">베스트</router-link></a></li>
						<li><a href="javascript:;" :class="getPath ==='/gooduser/promotion/event'?  'on' : ''"><router-link to ="/gooduser/promotion/event">이벤트</router-link></a></li>
						<li><a href="javascript:;" :class="getPath ==='/gooduser/promotion/hottag'?  'on' : ''"><router-link to ="/gooduser/promotion/hottag">기획전</router-link></a></li>
						<li><a href="javascript:;" :class="getPath ==='/gooduser/promotion/golftv'?  'on' : ''"><router-link to ="/gooduser/promotion/golftv">골프TV</router-link></a></li>
						<li><a href="javascript:;" @click="move_To_Reservation">골프 삼성 예약하기</a></li>
					</ul>
				</div>
				<div class="h-b-right">
					<ul class="header-loginbox">
						<li v-if="this.userId"><a><strong>{{userGrade}}</strong>&nbsp;&nbsp;<strong>{{this.userName}}</strong></a>&nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="logoutSamsung()">로그아웃</a></li>
						<li @click="gotoSamsung()" v-else><a href="javascript:;" >로그인</a></li>
						<!-- <li><a href="javascript:;">회원가입</a></li> -->
						<li><router-link to ="/gooduser/customer/faqlist">고객센터</router-link></li>
					</ul>
					<router-link to="/gooduser/promotion/eventdetail/2" class="header-present" v-if="this.userGrade == 'VIP'">
						<i></i>
						<span>선물하기</span>
					</router-link>
					<router-link to="/gooduser/promotion/eventdetail/1" class="header-present" v-else>
						<i></i>
						<span>선물하기</span>
					</router-link>
				</div>
			</div>
		</div>
		<div class="header-sub" v-if="(typeGoods || typeSub)">
			<!-- 마이페이지의 경우 무조건 초기로 가게 설정 -->
			<button class="go-back" type="button" @click="$router.replace('/gooduser/mypage/myorder1')" v-if="isMypage && (!($route.path === '/gooduser/mypage/mypage/myorder1') && !($route.path === '/gooduser/mypage/myorderdetail'))">뒤로가기</button>
			<button class="go-back" type="button" @click="$router.go(-1)" v-else>뒤로가기</button>
			<h3 class="pagename mont" v-if="!pageName"></h3>
			<h3 class="pagename mont" v-else>{{this.pageName}}</h3>
		</div>
		<div id="catergory-all">
			<div class="category-header for-m">카테고리</div>
			<div class="w-set clear">
				<div class="c-a-section section-first" v-if="this.tagLoadOk">
					<p class="section-name">굿# HOT 태그</p>
					<div class="section-cont type-hash">
						<div class="hash-align" v-for="(item, index) in this.hotTag" :key="index">
							<a href="javascript:;"
								@click="this.move_To_Detail_Ht(item.id)"
							># {{item.name}}</a>
						</div>
					</div>
				</div>

				<div class="m-allcate-tab for-m">
					<button type="button" :class="{'m-c-on': this.mobileCateOn == 1}" @click="this.mobileCateOn = 1">골프</button>
					<button type="button" :class="{'m-c-on': this.mobileCateOn == 2}" @click="this.mobileCateOn = 2">생활용품</button>
				</div>

				<div class="c-a-section section-main" :class="{'m-c-on': this.mobileCateOn == 1}">
					<p class="section-name for-pc">골프</p>
					<div class="section-cont type-categody-list">
						<div class="catemenu-box has-child" v-for="(golfidx,index) in golfCategoryArr" :key="index">
							<div class="cate-name">
								<router-link :to="'/gooduser/goodslist/list/'+golfidx.id">{{ golfidx.name }}</router-link>
								<div class="m-open-handle" @click="mobileCateToggle($event)"></div>
							</div>
							<ul class="cate-list">
								<li
									v-for="(golfDepth3idx,index) in golfCategoryDepth3Arr"
									:key="index"
									:class="{'m-d-on': golfidx.id === golfDepth3idx.parentId}"
								>
									<router-link :to="'/gooduser/goodslist/list/'+golfDepth3idx.id" v-if="golfidx.id === golfDepth3idx.parentId" >{{ golfDepth3idx.name }}</router-link>
									<!-- <a v-else></a> -->
								</li>
							</ul>
						</div>
					</div>

				</div>

				<div class="c-a-section section-grey" :class="{'m-c-on': this.mobileCateOn == 2}">
					<p class="section-name for-pc">생활용품/선물</p>
					<div class="section-cont type-categody-list">
						<div class="catemenu-box has-child"
							v-for="(lividx, index) in livingCategoryArr"
							:key="'liv'+index"
						>
							<div class="cate-name">
								<router-link :to="'/gooduser/goodslist/list/'+lividx.id">{{ lividx.name }}</router-link>
								<div class="m-open-handle" @click="mobileCateToggle($event)"></div>
							</div>
							<ul class="cate-list">
								<li
									v-for="(lividxdep3, index2) in livingCategoryDepth3Arr"
									:key="'liv'+index+'_'+index2"
									:class="{'m-d-on': lividx.id === lividxdep3.parentId}"
								><router-link :to="'/gooduser/goodslist/list/'+lividxdep3.id" v-if="lividx.id === lividxdep3.parentId">{{lividxdep3.name}}</router-link></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		
	</header>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: 'HeaderComp',
  props:['headerCase', 'pageName'],
  data: () => ({
		
		// 유저데이터 Store
		userId: null,
		userData: null,
		userGrade: null,
		msg:'',
		msgLog: [],
		checkLike : 0,
		typeMain: false,
		typeGoods: false,
		typeSub: false,
		isMypage: false,
		categoryArr: [],
		golfCategoryArr: [],
		golfCategoryDepth3Arr: [],
		livingCategoryArr: [],
		livingCategoryDepth3Arr: [],
		allCateData: {
			1 : {
				id: 1, name: '골프',
				child : {}
			},
			2 : {
				id: 2, name: '생활용품/선물',
				child : {}
			}
		},

		// 상단 알림 리스트 샘플데이터
		alertList: [
			{
				no: 1,
				txt: '알림 제목 노출 길면 한 줄 표시안하는것으로 결정',
			},
			{
				no: 1,
				txt: '알림 제목 노출 길면 한 줄 표시안하는것으로 결정',
			},
			{
				no: 1,
				txt: '알림 제목 노출 길면 한 줄 표시안하는것으로 결정',
			},
			{
				no: 1,
				txt: '알림 제목 노출 길면 한 줄 표시안하는것으로 결정',
			},
			{
				no: 1,
				txt: '알림 제목 노출 길면 한 줄 표시안하는것으로 결정',
			},
			{
				no: 1,
				txt: '알림 제목 노출 길면 한 줄 표시안하는것으로 결정',
			},
			{
				no: 1,
				txt: '알림 제목 노출 길면 한 줄 표시안하는것으로 결정',
			},
			{
				no: 1,
				txt: '알림 제목 노출 길면 한 줄 표시안하는것으로 결정',
			},
			{
				no: 1,
				txt: '알림 제목 노출 길면 한 줄 표시안하는것으로 결정',
			}
		],
		searchTabIndex: 0,
		topSearchData: null,
		cartLength: 0,
		likeList: null,

		// 20221006 모바일 카테고리 변경
		mobileCateOn: 1,

		// 20221019 핫태그
		hotTag: null,
		tagLoadOk: null,


  }),
  created(){

	// window.scrollTo({top: 0});

	this.setState();
	this.$store.commit('setState');

	this.userId = this.$store.state.userId;
	this.userName = localStorage.getItem('N');
	this.userGrade = localStorage.getItem('G');
	this.getPath;


	if (this.headerCase == 'main') {
		this.typeMain = true;
	} else if (this.headerCase == 'goods') {
		this.typeGoods = true;
	} else if (this.headerCase == 'sub') {
		this.typeSub = true;
	}

	this.getCategory();
	this.loadHotTag();
	this.loadTopSearch();
	if (this.userId != null) {
		this.getCartList();
		this.getLikeList();
	}

	// 마이페이지 뒤로가기 기능 조정
	if (this.$route.path.slice(0, 7) === '/mypage') {
		this.isMypage = true;
	}

	this.searchLogInit();
	this.getHotList();
  },

  methods:{
    //부모 컴포넌트에 데이터 전송
	searchLogInit() {
		// 검색어 기록 초기 세팅
		let recSearchLocal = localStorage.getItem('recsch');
		if (recSearchLocal != null) {
			this.msgLog = JSON.parse(recSearchLocal);
		} else {
			this.msgLog = [];
		}
	},
	deleteSearchLog() {
		localStorage.removeItem('recsch');
		this.searchLogInit();
	},
	setMsgAndSend(data) {
		this.msg = data;
		this.sendMsg();
	},
	setSearchTextLog() {
		// 최근 검색어 세팅
		let recSearchLocal = localStorage.getItem('recsch');

		if (recSearchLocal != null) {
			let hasLog = false;
			recSearchLocal = JSON.parse(recSearchLocal);
			recSearchLocal.forEach((item, index) => {

				if (item.text == this.msg) {
					recSearchLocal.splice(index, 1);
				}
			});
			if (recSearchLocal.length == 10 && !hasLog) {
				recSearchLocal.pop();
			}
			recSearchLocal.unshift({text: this.msg});
		} else {
			recSearchLocal = [
				{text: this.msg}
			]
		}
		this.msgLog = recSearchLocal;
		localStorage.setItem('recsch', JSON.stringify(recSearchLocal));

		this.sendMsg();
	},
	login_chk(){
		let chk
		let url = `/gooduser/api/v1/check_session`
		let ckData= {}
		axios.post(url,ckData).then(res=>{
			chk = res.data.data
		})
		return chk
	},
    sendMsg(){
		// 페이지 이동
		if(this.getPath ==='/gooduser/goodslist/list'){
			this.$emit("searchItemFromHeader",this.msg)
			this.$router.push({
				path : `/gooduser/goodslist/list/0/${this.msg}`
			})
		}else{
			this.$router.push({
				path : `/gooduser/goodslist/list/0/${this.msg}`
			})
		}

		document.querySelector('.h-s-floating').classList.remove('on');
		this.msg = '';
    },
	async setState(){
		
			let url = `/gooduser/api/v1/check_session`
			let ckData= {}
			await axios.post(url,ckData).then(res=>{

				if(res.data.data !='TRUE' && localStorage.getItem('I')!= null ){
					this.$store.commit('logOut');
					this.$store.commit('setState');

					this.userId = this.$store.state.userId;
                    this.userName =  this.$store.state.userName;
                    this.userGrade =  this.$store.state.userGrade;

					this.$router.push({
						path : `/gooduser`
					})
				}else if(localStorage.getItem('I')== null && res.data.data =='TRUE'){
					this.$store.commit('logOut');
					this.$store.commit('setState');

					this.userId = this.$store.state.userId;
                    this.userName =  this.$store.state.userName;
                    this.userGrade =  this.$store.state.userGrade;

					this.$router.push({
						path : `/gooduser`
					})
				}else{
					
				}
			})
		
	},

	async loadHotTag(){
		let url = `/gooduser/api/v1/main/hot_tag`
		await axios.get(url).then(res=>{
			//console.log('success to get222 ')
			//console.log(res)
		})
	},

	async loadTopSearch(){
		let url = `/gooduser/api/v1/top_search/list`
		await axios.post(url).then(res=>{
			this.topSearchData = res.data.data;
		});
	},

	async getCategory(){
		let url = '/gooduser/api/v1/category_api'
		await axios.get(url).then(res=>{
       		let cateData = res.data.data
			this.$store.state.categoryAll = res.data.data;
			this.categoryArr = cateData
			////console.log(this.categoryArr)
		  	let tmpData1 = this.categoryArr.filter(cd=>{
		 		return cd.groups === 1 && cd.depth === 2
            });
			this.golfCategoryArr = tmpData1
			//console.log('this.golfCategoryArr')
			//console.log(this.golfCategoryArr)
			let tmpData2 = this.categoryArr.filter(cd=>{
		 		return cd.groups === 1 && cd.depth === 3
            });
			this.golfCategoryDepth3Arr = tmpData2


			// 생활용품 카테고리
			let tmpData3 = this.categoryArr.filter(cd=>{
		 		return cd.groups === 2 && cd.depth === 2
            });
			this.livingCategoryArr = tmpData3;
			let tmpData4 = this.categoryArr.filter(cd=>{
		 		return cd.groups === 2 && cd.depth === 3
            });
			this.livingCategoryDepth3Arr = tmpData4;

			this.$store.state.category3 = tmpData3;
			// //console.log(tmpData3)
			// //console.log(tmpData4)

			//allCateData
			// api상 필요 없을것같은 상황
			// this.golfCategoryArr.forEach((data) => {
			// 	this.allCateData[1].child[data.id] = {
			// 		id: data.id, name: data.name,
			// 		child: {}
			// 	};
			// });
			// this.golfCategoryDepth3Arr.forEach((data) => {
			// 	this.allCateData[1].child[data.parentId].child[data.id] = {
			// 		id: data.id, name: data.name
			// 	};
			// });
			// this.livingCategoryArr.forEach((data) => {
			// 	this.allCateData[2].child[data.id] = {
			// 		id: data.id, name: data.name,
			// 		child: {}
			// 	};
			// });
			// this.livingCategoryDepth3Arr.forEach((data) => {
			// 	this.allCateData[2].child[data.parentId].child[data.id] = {
			// 		id: data.id, name: data.name
			// 	};
			// });
		})
	},
	async getCartList(){
		let url = `/gooduser/api/v1/bag/list`;
		let postData = {
			cartId: 0,
			page: 1,
			userId: localStorage.getItem('I')
		}
		await axios.post(url, postData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
			//console.log(res);
			let cartList = res.data.data;
			if(!cartList){
				this.cartLength = 0
			}else{
				this.cartLength = cartList.length
			}
			localStorage.setItem('cartLength', this.cartLength)
			////console.log(this.cartList)
			//this.goodsCalculate();
		});
	},
	async getLikeList(){
		let url = `/gooduser/api/v1/favorite/product_list`;
		let postData = {
			userId: this.userId,
		}
		await axios.post(url, postData).then(res=>{
			//console.log(res);
			this.likeList = res.data.data;
			////console.log(this.cartList)
			//this.goodsCalculate();
		});
	},
	move_To_My(){
		this.setState();
		if (!localStorage.getItem('I')) {
			alert('로그인이 필요한 기능입니다.');
			this.gotoSamsung();
			return false;
		}else{
			this.$router.push({
				path : `/gooduser/mypage/mydashboard`
			})
		}
		//console.log("aa")

	},
	move_To_Cart(){
		this.setState();
		if (!this.userId) {
			alert('로그인이 필요한 기능입니다.');
			this.gotoSamsung();
			return;
		}
		this.$router.push({
        path : `/gooduser/cartview/cartview/a`
      })
	},
	move_To_Wish(){
		this.setState();
		if (!this.userId) {
			alert('로그인이 필요한 기능입니다.');
			this.gotoSamsung();
			return;
		}
		this.$router.push({
        path : `/gooduser/mypage/mywish1`
      })
	},
	move_To_Alert(){
		if (!this.userId) {
			alert('로그인이 필요한 기능입니다.');
			this.gotoSamsung();
			return;
		}
		this.$router.push({
        path : `/gooduser/mypage/myalert`
      })
	},
	move_To_Reservation(){
		let uA = navigator.userAgent;
		if (uA.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || uA.match(/LG|SAMSUNG|Samsung/) != null) {
			window.location.href = `https://www.golfsamsung.com/reve/mo/reserve/choice.do`;
		} else {
			window.location.href = `https://www.golfsamsung.com/reve/pc/reserve/choice.do`;
		}
	},
	gotoSamsung(){
		let param = window.atob('Y2xpZW50X2lkPTQmcmVkaXJlY3RfdXJsPS9nb29kdXNlci9jYWxsYmFjaw==')
		//console.log(param)

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
	logoutSamsung(){
		this.$store.commit('logOut');
		localStorage.removeItem('T')
		localStorage.removeItem('C')
		localStorage.removeItem('I')
		localStorage.removeItem('G')
		localStorage.removeItem('N')
		localStorage.removeItem('TTL')
		localStorage.removeItem('shAI')
		localStorage.removeItem('GI')
		localStorage.removeItem('buy')
		localStorage.removeItem('cartLength')


		alert('로그아웃되었습니다.');
		let url = `/gooduser/api/v1/logOut`
		let logOutData = {}
		axios.post(url,logOutData).then(res=>{
			// console.log(res)
			if(res.data.code===200){
				if (this.$route.path === '/gooduser/' || this.$route.path === '/gooduser' || this.$route.path === '/gooduser/home') {
					this.$router.go(this.$router.currentRoute);
				} else {
					this.$router.push('/gooduser');
				}
			}
		})

	},
	// 모바일전용) 카테고리 오픈 이벤트
	mobileCateToggle(e) {
		if (e.target.parentNode.parentNode.classList.contains('on')) {
			e.target.parentNode.parentNode.classList.remove('on');
		} else {
			document.querySelectorAll('.catemenu-box.has-child').forEach(function(subCateBtnParent) {
				subCateBtnParent.classList.remove('on');
			});
			e.target.parentNode.parentNode.classList.add('on');
		}
	},
	unLoadEvent(e){
		localStorage.clear();
    	e.preventDefault();
    	e.returnValue = '';
	},

	// 상단 핫태그
	async getHotList(){
		let url = `/gooduser/api/v1/promotion_api/hot_tag/list`
		let postData = {}
		await axios.post(url, postData).then(res=>{


			this.hotTag = res.data.data;
			this.tagLoadOk = true;
		});
	},
	move_To_Detail_Ht(id){
		this.$router.push({
			path : `/gooduser/promotion/hottaghtdetail/${id}`
		});
	},
	gotoMain(){
		this.$router.push({
			path : `/gooduser`
		});
	},

  },
  mounted() {

	// 메뉴오픈
	function cateOpen() {
		document.querySelector('.header-category-all').classList.toggle('on');
		document.querySelector('#catergory-all').classList.toggle('on');
		document.querySelector('header').classList.toggle('on');
		//headLayerReset();
		//bodyFocusHeader();
	}

	let checkVal = true;
	document.querySelector('.header-category-all').addEventListener('click', function() {
		if (document.querySelector('.header-category-all').classList.contains('on')) {
			document.querySelector('.header-category-all').classList.remove('on');
			document.querySelector('#catergory-all').classList.remove('on');
			document.querySelector('header').classList.remove('on');
		} else {
			headLayerReset();
			checkVal = true;
			document.querySelector('body').addEventListener('click', bodyFocusHeader);
			document.querySelector('.header-category-all').classList.add('on');
			document.querySelector('#catergory-all').classList.add('on');
			document.querySelector('header').classList.add('on');
		}
		// cateOpen();
	});


	// 알림 검색 공통 초기화
	function headLayerReset() {
		//document.querySelector('body').removeEventListener('click', bodyFocusAlert);
		document.querySelector('body').removeEventListener('click', bodyFocusHeader);
		//document.querySelector('.header-alert').classList.remove('on');
		document.querySelector('.h-s-floating').classList.remove('on');
		document.querySelector('#catergory-all').classList.remove('on');
	}

	// 카테고리 닫히기
	const bodyFocusHeader = (e) => {
		//console.log(e);
		if (checkVal) {
			checkVal = false;
		} else {
			let trigger = true;
			e.path.forEach(function(target) {
				if ( target.nodeName == 'HEADER' ) {
					trigger = false;
					return false;
				}
			})
			if (trigger) {
				document.querySelector('.header-category-all').classList.remove('on');
				document.querySelector('#catergory-all').classList.remove('on');
				document.querySelector('header').classList.remove('on');
				document.querySelector('body').removeEventListener('click', bodyFocusHeader);
			}
		}
	}

	// document.querySelector('.type-alert .link').addEventListener('click', function() {
	// 	if (document.querySelector('.header-alert').classList.contains('on')) {
	// 		document.querySelector('.header-alert').classList.remove('on');
	// 	} else {
	// 		headLayerReset();
	// 		document.querySelector('body').addEventListener('click', bodyFocusAlert);
	// 		document.querySelector('.header-alert').classList.add('on');
	// 	}
	// });

	// 알림 이벤트
	// const bodyFocusAlert = (e) => {
	// 	let trigger = true;
	// 	e.path.forEach(function(target) {
	// 		if ( (target.classList?.[0] == 'header-alert' || target.classList?.[0] == 'type-alert') ) {
	// 			trigger = false;
	// 			return false;
	// 		}
	// 	})
	// 	if (trigger) {
	// 		document.querySelector('.header-alert').classList.remove('on');
	// 		document.querySelector('body').removeEventListener('click', bodyFocusAlert);
	// 	}
	// }
	// document.querySelector('.type-alert .link').addEventListener('click', function() {
	// 	if (document.querySelector('.header-alert').classList.contains('on')) {
	// 		document.querySelector('.header-alert').classList.remove('on');
	// 	} else {
	// 		headLayerReset();
	// 		document.querySelector('body').addEventListener('click', bodyFocusAlert);
	// 		document.querySelector('.header-alert').classList.add('on');
	// 	}
	// });

	// 검색 탭
	const bodyFocusSearch = (e) => {
		let trigger = true;
		e.path.forEach(function(target) {
			if ( target.className == 'header-searchbox') {
				trigger = false;
				return false;
			}
		})
		if (trigger) {
			document.querySelector('.h-s-floating').classList.remove('on');
			document.querySelector('body').removeEventListener('click', bodyFocusSearch);
		}
	}
	document.querySelector('.h-s-form').addEventListener('click', function(event) {
		if (document.querySelector('.h-s-floating').classList.contains('on')) {
			document.querySelector('.h-s-floating').classList.remove('on');
		} else {
			headLayerReset();
			document.querySelector('body').addEventListener('click', bodyFocusSearch);
			document.querySelector('.h-s-floating').classList.add('on');
		}
	});
	const tabs = document.querySelectorAll('.hsf-tab button');
	[].forEach.call(tabs,function(col){
		col.addEventListener('click', function () {
			if( this.classList.contains('on') ) {
				return false;
			}
			document.querySelectorAll('.hsf-tab button').forEach(function(tabs2) {
				tabs2.classList.remove('on');
			});
			document.querySelectorAll('.hsfc-list').forEach(function(boxs) {
				boxs.classList.remove('on');
			});
			//console.log(this);
			this.classList.add('on');
			let tabname = this.dataset.tab;
			document.querySelectorAll(`.hsfc-list.${tabname}`).forEach(function(userItem) {
				userItem.classList.add('on');
			});
		});
	});
	// window.addEventListener('unload', this.unLoadEvent)
  },
//   beforeUnmount() {
//     window.removeEventListener('unload', this.unLoadEvent);
//   },
  computed: {
    getPath(){
      let tmpPath = this.$route.path
      let tmpResult = tmpPath.split("/")
      //console.log(tmpResult)
	  let tmpreslt = !tmpResult[3] ? '': "/" + tmpResult[3]
      let result = "/" + tmpResult[2] + tmpreslt
	  let res = "/" + tmpResult[1] + result
      //console.log("path is")
      //console.log(res)
      return res
    },
    getDetailPath(){
      let tmpPath = this.$route.path
      let tmpResult = tmpPath.split("/")
      //console.log(tmpResult)
      let result = "/" + tmpResult[1] + "/" + tmpResult[2] + "/" + tmpResult[3]
      //console.log("getDetailPath is")
      //console.log(result)
      return result
    },
	setTTL(){
		let now = moment()
		let gap = moment.duration(now.diff(moment(localStorage.getItem('TTL')))).minutes()
		return gap
	}
  },
  watch: {
        $route() {
            this.getCartList();
        },

    }
}
</script>

<style scoped>

</style>
