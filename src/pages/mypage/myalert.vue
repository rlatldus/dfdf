<template>
    <div>
    <HeaderComp :headerCase="'sub'" :pageName="'알림'"/>
	<div class="loading" v-if="pending"></div>
	<div id="content" v-else>
		<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
		<div class="mypage_wrap w-set my_notice">
			<!-- 마이페이지 좌측 메뉴 -->
			<MymenuComp />
			<!-- 마이페이지 좌측 메뉴 끝 -->

			<!-- 마이페이지 컨텐츠 -->
			<div class="mypage_con">
				
				<div class="customer_wrap type-2">
					<div class="customer_con">
						<h3 class="title">알림</h3>
						<div class="list_filter">
							<div class="lf_r">
								<form action="javascript:;">
									<!-- <div class="input_area period">
										<div class="p_input">
											<input type="text" name="period_s" id="period_s" class="so-datepicker" placeholder="Start Date">
											<label for="period_s" class="blind">기간 시작</label>
										</div>
										<span>~</span>
										<div class="p_input">
											<input type="text" name="period_e" id="period_e" class="so-datepicker" placeholder="End Date">
											<label for="period_e" class="blind">기간 종료</label>
										</div>
									</div> -->
									<!-- <button type="button" class="btn">조회</button> -->
								</form>
							</div>
						</div>
						<div class="list_top list_top_h">
							<div class="total">
								<p class="total_txt">전체 (<strong class="orange_c mont">{{alermData.totalElements}}</strong>개)</p>
							</div>
							<div class="chk_all">
								
								<input type="checkbox" class="cart_check_box" id="cartAll" name="cartAll" @change="cartListCheckAll">
								<label for="cartAll" class="chk">
									<i class="ico_chk"></i>
									<span class="tit">전체 선택</span>
								</label>
							</div>
							<div class="button_area del">
								<button type="button" class="btn_light_gray_solid" @click="deleteAlarm">삭제</button>
							</div>
						</div>
						<div class="notice_wrap">
							<div class="notice_list">
								<ul>
									<li class="list_row" v-for="(item,index) in alermList"
												:key="index">
										<div class="check">
											<input type="checkbox" :id="`chk${item.id}`" class="cart_check_box" name="cartIds" @change="alarmListCheck($event, item.id)" :value="item.id">
											<label :for="`chk${item.id}`">제품 선택</label>
										</div>
										<div class="notice_txt">
											<a href="#">{{item.message}}</a>
										</div>
										<div class="date">{{item.sendDate}}</div>
										<div class="m_date">{{item.sendDate}}</div>
									</li>
								</ul>
							</div>
						</div>

						<div class="pagination" v-if="pageListCount > 0">
							<a href="javascript:;" class="first"
									v-if="pageFirst"
									@click="pagination(pageFirst, ture)"
							>go first</a>
							<a href="javascript:;" class="prev"
									v-if="pagePrev"
									@click="pagination(pagePrev, ture)"
							>go prev</a>

							<div class="page">
									<a href="javascript:;"
											v-for="pageNum in pagenationList"
											:key="pageNum"
											@click="pagination(pageNum, ture)"
											:class="{'on': pageNum === thisPage}"
									>{{pageNum}}</a>
							</div>

							<a href="javascript:;" class="next"
									v-if="pageNext"
									@click="pagination(pageNext, ture)"
							>go next</a>
							<a href="javascript:;" class="last"
									v-if="pageLast"
									@click="pagination(pageLast, ture)"
							>go last</a>
						</div>
					</div>
					<!-- 리스트 영역 끝 -->
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
import moment from "moment";
export default {
    name: "myAlert",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  MymenuComp,
    },
    data: () => ({
        pending: true,
		pendingCancel: false,
		// 페이징 변수
		pageListCount: 0,
		pagenationList: [],
		thisPage: 1,
		pageFirst: null,
		pagePrev: null,
		pageNext: null,
		pageLast: null,
		loadFirst: true,
		alermList: null,
		alermData:null,
		selectAlarmArray: [],

        

		userId: null,
    }),
    created () {
		this.$store.commit('setState');
		this.userId = this.$store.state.userId;
		if (this.userId == null) {
            alert('로그인이 필요한 페이지 입니다.');
			this.$router.push('/gooduser');
		}
		this.load()
    },
    methods: {
        async load(){
			let url = `/gooduser/api/v1/push/list`
			let pageData = {
				page : this.thisPage
			}
			await axios.post(url,pageData).then(res=>{
				this.alermData = res.data.data
				this.alermList = res.data.data.content;
				this.pageListCount = res.data.data.totalElements;

				if (this.loadFirst) {
					this.pagination(1);
				}

				this.pending = false;
				console.log('success to get222 ')
				console.log(this.alermList)
				
			})
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
				this.load();
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

		alarmListCheck(e, id) {
			if (e.target.checked) {
				this.selectAlarmArray.push(id)
				document.querySelector(`input[id=chk${id}]`).checked = true;
				// let pcChk = `input[name=cartIds]:checked`
				// let mbChk = `input[name=chkm]:checked`
				// if(this.cartList.length === document.querySelectorAll(pcChk).length 
				// 	&& this.cartList.length === document.querySelectorAll(mbChk).length){
				// 	document.querySelector(`input[name=chk_total]`).checked = true;
				// 	document.querySelector(`input[name=cartAll]`).checked = true;	
				// }
				console.log('========check in========')
				console.log(this.selectAlarmArray)
			} else {
				
				console.log('========check out========')
				for(var i = 0; i < this.selectAlarmArray.length; i++){ 
					if (this.selectAlarmArray[i] === id) { 
						this.selectAlarmArray.splice(i, 1); 
						break;
					}
				}
				document.querySelector(`input[id=chk${id}]`).checked = false;
				console.log(this.selectAlarmArray)
				// document.querySelector(`input[name=chk_total]`).checked = false;
				// document.querySelector(`input[name=cartAll]`).checked = false;
			}
			this.$forceUpdate();	
		},
		async deleteAlarm(){
			let url = `/gooduser/api/v1/push/delete`
			let pageData = {
				ids : this.selectAlarmArray
			}
			await axios.post(url,pageData).then(res=>{
				console.log(res)
				alert('삭제되었습니다')
				console.log('success to delete ')
				this.$forceUpdate();
				
			})
			this.$router.go(this.$router.currentRoute);
		},

		async cartListCheckAll(e) {

		this.selectAlarmArray= [];

		if (e.target.checked) {
			document.querySelector('input[name="cartAll"]').checked = true;
			document.querySelector('input[name="cartIds"]').checked = true;
			document.querySelectorAll('.check input[type="checkbox"]').forEach((item) => {
				if (item.id != 'cartAll') {
					item.checked = true;
					if (item.classList.contains('cart_check_box')) {
						this.selectAlarmArray.push(Number(item.value));
					}
				}
			});
			console.log('========check in All========');
		} else {
			document.querySelector('input[name="cartAll"]').checked = false;
			document.querySelector('input[name="cartIds"]').checked = false;
			document.querySelectorAll('.check input[type="checkbox"]').forEach((item) => {
					item.checked = false;
			});
			this.selectAlarmArray= [];
			console.log('========check out All========');
		}
		console.log(this.selectAlarmArray)
		this.$forceUpdate();
		},
	}
}

</script>
<style scoped>

</style>