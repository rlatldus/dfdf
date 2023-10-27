<template>
	<div class="mypage_lnb">
		<h2>마이페이지</h2>
		<ul class="lnb_list">
			<li :class="{'on': $route.path === '/gooduser/mypage/myorder1'}"><router-link to ="/gooduser/mypage/myorder1">주문배송조회</router-link></li>
			<li :class="{'on': $route.path === '/gooduser/mypage/mycanclelist'}"><router-link to ="/gooduser/mypage/mycanclelist">취소 내역</router-link></li>
			<li :class="{'on': ($route.path === '/gooduser/mypage/mywish1' || $route.path === '/gooduser/mypage/mywish2')}"><router-link to ="/gooduser/mypage/mywish1">찜 리스트</router-link></li>
			<li :class="{'on': $route.path === '/gooduser/mypage/myrestockinfo'}"><router-link to ="/gooduser/mypage/myrestockinfo">재입고 알림</router-link></li>
			<li :class="{'on': ($route.path === '/gooduser/mypage/mypresent1' || $route.path === '/gooduser/mypage/mypresent2')}"><router-link to ="/gooduser/mypage/mypresent1">My선물함</router-link></li>
			<li :class="{'on': $route.path === '/gooduser/mypage/myalert'}"><router-link to ="/gooduser/mypage/myalert">알림</router-link></li>
			<li>
				<router-link to ="/gooduser/mypage/myqnalist">마이 활동</router-link>
				<ul class="depth2">
					<li :class="{'on': ($route.path === '/gooduser/mypage/myreviewlist' || $route.path === '/gooduser/mypage/myreviewlist2')}"><router-link to ="/gooduser/mypage/myreviewlist">나의 리뷰</router-link></li>
					<li :class="{'on': $route.path === '/gooduser/mypage/myqnalist'}"><router-link to ="/gooduser/mypage/myqnalist">상품 Q&amp;A</router-link></li>
				</ul>
			</li>
			<li>
				<a href="javascript:;">나의 정보</a>
				<ul class="depth2">
					<!-- <li><a href="javascript:;"  target="blank">회원정보수정</a></li> -->
					<li :class="{'on': ($route.path === '/gooduser/mypage/myaddr' || $route.path === '/gooduser/mypage/myaddrwrite')}"><router-link to ="/gooduser/mypage/myaddr">배송지관리</router-link></li>
					<li><a href="javascript:;" @click="logoutSamsung">로그아웃</a></li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from "axios";
export default {
  name: 'MymenuComp',
	components: {
	},
  data: () => ({
  }),
  methods: {
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
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
