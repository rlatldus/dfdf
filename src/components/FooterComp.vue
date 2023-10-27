<template>
	<footer>
		<!-- 팝업 임시 처리 -->
		<div class="popup-bg"></div>
		<div class="popup-cont" id="popup-01">
			<div class="popup-header">
				<h3 class="title">굿샵 APP 설치주소 문자로 받기</h3>
				<button type="button" class="popup-close-btn popup-close">닫기</button>
			</div>
			<div class="popup-body">
				<div class="popup-qr">
					<div class="pq-left">
						<h4>설치 Url 문자로 보내기</h4>
						<p>휴대폰 번호를 입력하고 전송하기 버튼을 눌러주세요!</p>
						<form action="#">
							<div class="phone-input-wrap">
								<input type="number">
								<input type="number">
								<input type="number">
							</div>
							<ul class="ul-type-01 anchor-01">
								<li>문자 전송은 무료입니다.</li>
								<li>입력하신 휴대폰 번호는 저장되지 않습니다.</li>
							</ul>
							<button type="submit" class="popup-btn popup-close">동의 및 전송</button>
						</form>
					</div>
					<div class="pq-right">
						<div class="pq-code">
							<span>QR코드로 전송하기</span>
							<div class="qr-img">QR IMAGE</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="popup-cont" id="popup-02">
			<div class="popup-header">
				<h3 class="title">이메일 집단수집 거부</h3>
				<button type="button" class="popup-close-btn popup-close">닫기</button>
			</div>
			<div class="popup-body">
				<div class="popup-email">
					<p class="pop-txt type-01">
						[굿샵 홈페이지 주소]은 게시된 이메일의 주소가<br>
						전자 우편 수집 프로그램이나 그 밖의 기술적 장치를<br>
						이용하여 무단 수집되는 것을 거부합니다. 이를 위반 시<br>
						<strong class="font-primary">정보통신망 이용촉진 및 정보 보호 등에 관한 법률</strong><br>
						등에 의해 처벌 받을 수 있습니다.
					</p>
					<button type="submit" class="popup-btn popup-close">확인</button>
				</div>
			</div>
		</div>


		<div class="footer-top">
			<div class="w-set">
				<div class="ft-board" v-if="noticeListFooter?.length > 0">
					<router-link class="ft-board-txt" :to="'/gooduser/customer/noticeview/'+noticeListFooter[0].id">
						<span class="board-name">공지사항</span>
						<span class="post-name">{{noticeListFooter[0].title}}</span>
						<span class="post-date">{{noticeListFooter[0].isrtDate.substr(0,10)}}</span>
					</router-link>
				</div>
				<div class="ft-sns">
					<!-- <a href="javascript:;" class="type-facebook">facebook</a>
					<a href="javascript:;" class="type-kakao">kakao</a>
					<a href="javascript:;" class="type-insta">insta</a> -->
				</div>
			</div>
		</div>
		<div class="footer-main">
			<div class="w-set clear">
				<div class="ft-customer">
					<p class="fc-name">고객센터</p>
					<p class="fc-phone mont">{{footerCustomer.phone}}</p>
					<p class="fc-time">{{footerCustomer.time}}</p>
					<!-- <div class="fc-qr popup-open" data-popup="#popup-01">
						<div class="qr-img"></div>
						<div class="qr-txt">
							<p class="qrt-name">굿샵 모바일 앱 다운로드</p>
							<p class="qrt-desc">
								QR 코드 찍고<br>
								모바일 앱으로 만나보세요.
							</p>
						</div>
					</div> -->
				</div>

				<div class="ft-shopinfo">
					<a href="javascript:;" class="fts-logo">Good Shop</a>
					<div class="fts-right">
						<span class="copy type-top">삼성물산(주)리조트 부문 안양컨트리클럽은 통신판매 중개자이며, 통신판매의 당사자가 아닙니다.<br class="for-pc" /> 상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.</span>
						<ul class="fts-nav">
							<li class="for-pc"><router-link to="/gooduser/policy/service">이용약관</router-link></li>
							<li class="bold for-pc"><a href="https://www.golfsamsung.com/web/privacyPolicy.do">개인정보처리방침</a></li>
							<li class="for-pc"><a href="javascript:;" class="popup-open" data-popup="#popup-02">이메일 집단수집거부</a></li>
							<li class="for-m-first"><router-link to ="/gooduser/customer/allianceqnaview">제휴 및 입점 문의</router-link></li>

							<li class="for-pc"><router-link to ="/gooduser/customer/noticelist">고객센터</router-link></li>

							<li class="for-m-lib"><router-link to ="/gooduser/customer/noticelist">공지사항</router-link></li>
							<li class="for-m-lib"><router-link to ="/gooduser/customer/faqlist">FAQ</router-link></li>
						</ul>
						<div class="ft-login w-set">
							<div class="box-flex">
								

								<a href="javascript:;" @click="logoutSamsung()" v-if="this.userId">로그아웃</a>
								
								<a href="javascript:;" @click="gotoSamsung()" v-else>로그인</a>

								<!-- TODO: 앱 오픈시 링크 -->
								<!-- <a href="javascript:;">앱 다운로드</a> -->
							</div>
						</div>

						<button class="ft-address-switch">
							<span>{{footerAddress.shopName}}</span>
						</button>
						<address class="fts-address">
							<span>{{footerAddress.address}}</span><br>
							<span>TEL : {{footerAddress.phone}}</span><span>E-MAIL : {{footerAddress.email}}</span><br>
							<span>사업자등록번호 : {{footerAddress.regNum}}</span><span>통신판매업신고번호 : {{footerAddress.regNum2}}</span><br>
							<span>대표자 : {{footerAddress.manager}}</span>
						</address>
						<ul class="fts-nav for-m">
							<li><router-link to="/gooduser/policy/service">이용약관</router-link></li>
							<li class="bold"><a href="https://www.golfsamsung.com/web/privacyPolicy.do">개인정보처리방침</a></li>
							<li><a href="javascript:;" class="popup-open" data-popup="#popup-02">이메일 집단수집거부</a></li>
						</ul>
						<span class="copy">Copyrightⓒ 2022 SAMSUNG C&T CORPORATION. All rights reserved</span>
						<div class="fts-family">
							<button class="ftsf-btn mont">FAMILY SITE</button>
							<div class="ftsf-list">
								<a
									v-for="(item, idx) in familySite"
									:href="item.link"
									:key="idx"
								>{{item.name}}</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-show="this.devtag === 1">frontDeveloper EroU_ky(kykim), functionJoo</div>
	</footer>
</template>

<script>
import axios from "axios";

export default {
	name: 'FooterComp',
	props: {
	},
	data: () => ({
		devtag:0,
		// 유저데이터 Store
		userId: null,

		// 공지사항
		noticeListFooter: false,
		// 고객센터
		footerCustomer: {
			phone: '031-320-5065',
			time: '평일 09:00 ~ 17:00 토, 일, 공휴일 휴무'
		},
		// 하단 주소 & 정보
		//삼성물산(주)리조트 부문 안양컨트리클럽은 통신판매 중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.
		footerAddress: {
			shopName: '삼성물산(주)리조트부문 ',
			address: '경기도 군포시 군포로 364(부곡동)',
			email: 'golfsamsung@samsung.com',
			phone: '031-320-5065',
			fax: '00-000-0000',
			regNum: '123-85-00450',
			regNum2: '군포 제56호',
			manager: '한승환',
			manager2: '홍길동'
		},
		// 패밀리사이트
		familySite: [
			{
				link: 'https://www.everland.com/web/everland/main.html',
				name: '에버랜드/캐리비안베이'
			},
			{
				link: 'http://www.ssfshop.com/main',
				name: '삼성물산 패션관'
			},
			{
				link: 'http://www.samsungcnt.com/index.do',
				name: '삼성물산 대표 홈페이지'
			},
			{
				link: 'http://www.kgba.co.kr/',
				name: '한국 골프장경영협회'
			},
			{
				link: 'https://www.golfsamsung.com/web/plugins.do',
				name: '골프삼성',
			}
		]
	}),
	created () {
		this.$store.commit('setState');
		this.userId = this.$store.state.userId;

		this.getNotice();
	},
	mounted() {
		// 팝업
		document.querySelectorAll('.popup-open').forEach(function(btns) {
			btns.addEventListener('click', function() {
				document.querySelector('.popup-bg').classList.add('on');
				document.querySelector(btns.dataset.popup).classList.add('on');
			});
		});
		document.querySelectorAll('.popup-close').forEach(function(btns) {
			btns.addEventListener('click', function() {
				document.querySelector('.popup-bg').classList.remove('on');
				document.querySelectorAll('.popup-cont').forEach(function(popconts) {
					popconts.classList.remove('on');
				});
				document.querySelector('.goods-search').classList.remove('on');
			});
		});

		// familysite 이벤트
		document.querySelector('.ftsf-btn').addEventListener('click', function() {
			document.querySelector('.fts-family').classList.toggle('on');
		});

		// 모바일전용) 하단 address 토글
		document.querySelector('.ft-address-switch').addEventListener('click', function() {
			this.classList.toggle('on');
			document.querySelector('.fts-address').classList.toggle('on');
		});
	},
	methods:{
		// 로그인 관련
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

		async getCategory(){

			let url = '/gooduser/api/get_Best_Ranking_List109a'
			await axios.get(url).then(res=>{


			})

		},
		async getNotice(){
			let url = '/gooduser/api/v1/user/notices';
			await axios.get(url).then(res=>{
				this.noticeListFooter = res.data.data.content;
			})

		},
		move_To_Alliance(){

			this.$router.push({
			path : `/gooduser/customer/allianceqnaview`
		})
		},
	}
}
</script>

<style scoped>

</style>
