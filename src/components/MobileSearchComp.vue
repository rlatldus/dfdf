<template>
	<div class="mobile-search">
		<div class="w-set">
			<div class="header-searchbox">
				<form action="javascript:;" class="h-s-form">
					<input type="text" placeholder="검색어 입력" v-model="this.msg">
					<button type="submit" @click="setSearchTextLog(this.msg)">검색</button>
					<button type="button" class="hsf-close" @click="searchClose()">닫기</button>
				</form>
				<div class="h-s-floating">
					<div class="hsf-tab">
						<button type="button" :class="{'on': this.tabIndex == 1}" data-tab="type-recent" @click="tabAction(1)">최근 검색어</button>
						<button type="button" :class="{'on': this.tabIndex == 2}" data-tab="type-rank" @click="tabAction(2)">인기 검색어</button>
					</div>
					<div class="hsf-content">
						<ul class="hsfc-list type-recent" v-if="this.tabIndex == 1">
							<li class="first"><button class="hsfc-delete" @click="deleteSearchLog()"><i></i><span>전체삭제</span></button></li>
							<!-- <li><a href="javascript:;"><span class="sctl-txt">PXG</span></a></li> -->
							<li v-for="(item, index) in this.msgLog" :key="index"><a href="javascript:;" @click="setMsgAndSend(item.text)"><span class="sctl-txt">{{item.text}}</span></a></li>
						</ul>
						<ul class="hsfc-list type-rank" v-if="this.tabIndex == 2">
							<!-- <li class="first">2022.06.14 업데이트</li> -->
							<li v-for="(item, index) in this.topSearchData" :key="index">
								<a :href="item.url" :target="item.urlType">
									<span class="rank">{{index + 1}}</span><span class="sctl-txt bold">{{item.keyword}}</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: 'MobileSearchComp',
	data: () => ({
		msg: '',
		
		tabIndex: 1,

		msgLog: null,

		topSearchData: null,
		cartList: null,
		likeList: null,
	}),
	created(){
		this.loadTopSearch();
		this.searchLogInit();
	},
	methods:{
		searchClose() {
			document.querySelector('.mobile-search').classList.toggle('on');
		},
		tabAction(idx) {
			this.tabIndex = idx;
		},
		async loadTopSearch(){
			let url = `/gooduser/api/v1/top_search/list`
			await axios.post(url).then(res=>{
				this.topSearchData = res.data.data;
			});
		},
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
			this.searchClose();
		},
	},
	mounted() {
	}
}
</script>

<style scoped>

</style>
