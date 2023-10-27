<template>
	<div>
		<MobileSearchComp />

		<nav class="mobile-nav">
			<button class="type-cate">
				<i></i>
				<span>카테고리</span>
			</button>
			<button class="type-search">
				<i></i>
				<span>검색</span>
			</button>
			<button class="type-home" :class="{'on': typeMain}">
				<router-link to ="/gooduser">
					<i></i>
					<span>홈</span>
				</router-link>
			</button>
			<button class="type-like" :class="{'on': typeLike}" @click="move_To_Wish">
				<a href="javascript:;">
					<i></i>
					<span>찜한 상품</span>
				</a>
			</button>
			<button class="type-my" :class="{'on': typeMy}" @click="move_To_My">
				<a href="javascript:;">
					<i></i>
					<span v-if="userId == null">로그인</span>
					<span v-else>마이 굿샵</span>
				</a>
			</button>
		</nav>
	</div>
</template>

<script>
import MobileSearchComp from '../components/MobileSearchComp.vue';
import axios from "axios";
export default {
	name: 'MobileNavComp',
	components: {
		MobileSearchComp,
	},
	props: ["mNavType"],
	data: () => ({
		userId: null,

		checkLike : 0,
		typeMain: false,
		typeLike: false,
		typeMy: false
	}),
	created(){
		this.$store.commit('setState');
		this.userId = this.$store.state.userId;
		
	},
	methods:{
		move_To_My(){
			if (!this.userId) {
				// alert('로그인이 필요한 기능입니다.');
				this.gotoSamsung();
				return false;
			}

			this.$router.push({
				path : `/gooduser/mypage/mydashboard`
			})
		},
		move_To_Wish(){
			if (!this.userId) {
				alert('로그인이 필요한 기능입니다.');
				this.gotoSamsung();
				return;
			}
			this.$router.push({
			path : `/gooduser/mypage/mywish1`
		})
		},
		async setState(){
            let url = `/gooduser/api/v1/check_session`
            let ckData= {}
            await axios.post(url,ckData).then(res=>{
                if(res.data.data !='TRUE' && localStorage.getItem('I')!= null ){
                    this.userGrade = null
                    this.$store.commit('logOut');
                    // console.log('case1');
                }else if(localStorage.getItem('I')== null && res.data.data =='TRUE'){
                    this.userGrade = null;
                    this.$store.commit('logOut');
                    // console.log('case2');
                }else if(res.data.data == 'FALSE'){
                    // 세션 false인 케이스
                    this.userGrade = null;
                    this.$store.commit('logOut');
                    // console.log('case3: session false');
                }else{
                    // 세션 false인 케이스
                    //console.log('case4: else');
                }

                this.userId = this.$store.state.userId;
                this.userGrade = localStorage.getItem('G');

                // console.log(this.userGrade);
            })
        },
		gotoSamsung(){
			let param = window.atob('Y2xpZW50X2lkPTQmcmVkaXJlY3RfdXJsPS9nb29kdXNlci9jYWxsYmFjaw==')

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
	},
	mounted() {
		// 하단 하이라이트 관련
		if (this.mNavType == 'main') {
			this.typeMain = true;
		} else if (this.mNavType == 'like') {
			this.typeLike = true;
		} else if (this.mNavType == 'my') {
			this.typeMy = true;
		}

		// 메뉴오픈
		function cateOpen() {
			document.querySelector('.header-category-all').classList.toggle('on');
			document.querySelector('#catergory-all').classList.toggle('on');
			document.querySelector('.mobile-search').classList.remove('on');
		}
		document.querySelector('.mobile-nav .type-cate').addEventListener('click', function() {
			cateOpen();
		});

		document.querySelector('.mobile-nav .type-search').addEventListener('click', function() {
			document.querySelector('.mobile-search').classList.toggle('on');
			document.querySelector('#catergory-all').classList.remove('on');
		});

		// 모바일전용) 카테고리 오픈 이벤트
		document.querySelectorAll('.catemenu-box.has-child .cate-name').forEach(function(subCateBtn) {
			subCateBtn.addEventListener('click', function() {
				if (this.parentNode.classList.contains('on')) {
					this.parentNode.classList.remove('on');
				} else {
					document.querySelectorAll('.catemenu-box.has-child').forEach(function(subCateBtnParent) {
						subCateBtnParent.classList.remove('on');
					});
					this.parentNode.classList.add('on');
				}
			});
		});
		setInterval(()=>{
			console.log('aa')
            this.setState();
			this.$forceUpdate();
        },600000)
		//
	}
}
</script>

<style scoped>

</style>
