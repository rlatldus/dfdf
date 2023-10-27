<template>
    <div>
    <HeaderComp :headerCase="'sub'" :pageName="'My 선물함'"/>
	<div id="content" class="mob">
		<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
		<div class="mypage_wrap w-set">
			<!-- 마이페이지 좌측 메뉴 -->
			<MymenuComp />
			<!-- 마이페이지 좌측 메뉴 끝 -->

			<!-- 마이페이지 컨텐츠 -->
			<div class="mypage_con present restock">
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
				<!-- PC 마이페이지 대시보드 시작 -->
				<h3 class="my_txt_h3">My 선물함</h3>
				<div class="tab_area">
					<ul class="tab_type_01">
						<li><router-link to ="/gooduser/mypage/mypresent1">보낸 선물함</router-link></li>
						<li class="on"><router-link to ="/gooduser/mypage/mypresent2">받은 선물함</router-link></li>
					</ul>
				</div>
				<!-- 리스트 필터 영역 -->
				<div class="delivery_list">
					<div class="list_filter">
						<div class="lf_l">
							<div class="period_btn">
								<input type="radio" name="period" id="periodAll" checked>
								<label for="periodAll">전체</label>
							</div>
							<div class="period_btn">
								<input type="radio" name="period" id="period1">
								<label for="period1">1개월</label>
							</div>
							<div class="period_btn">
								<input type="radio" name="period" id="period2">
								<label for="period2">3개월</label>
							</div>
							<div class="period_btn">
								<input type="radio" name="period" id="period3">
								<label for="period3">6개월</label>
							</div>
							<div class="period_btn">
								<input type="radio" name="period" id="period4">
								<label for="period4">12개월</label>
							</div>
						</div>
						<div class="lf_r">
							<form action="">
								<div class="input_area period">
									<div class="p_input">
										<input type="text" name="period_s" id="period_s" class="so-datepicker" placeholder="Start Date">
										<label for="period_s" class="blind">기간 시작</label>
									</div>
									<span>~</span>
									<div class="p_input">
										<input type="text" name="period_e" id="period_e" class="so-datepicker" placeholder="End Date">
										<label for="period_e" class="blind">기간 종료</label>
									</div>
								</div>
								<button type="button" class="btn">조회하기</button>
							</form>
						</div>
					</div>
				</div>
				<!-- 리스트 필터 영역  끝 -->
				<p class="my_total_info mob_wrap"><strong>전체 (<span>00</span>)개</strong></p>
				<div class="cart_box present mob_wrap">
						<div class="cart_title">
							<ul>
								<li class="prd_info_box">상품명</li>
								<li class="apply_date">받는 사람</li>
								<li class="gift_date">선물일시</li>
								<li class="state_box">상태</li>
							</ul>
						</div>
						<div class="cart_list">
							<ul>
								<li>
									<div class="product_box">
										<div class="prd_info_box">
											<dl>
												<dt><a href="#" class="thumbnail"><img src="../../assets/images/dummy/goods_image_sample.png" alt="[2만 마일리지+올인원 헤드커버 증정] 캘러웨이 22 로그 ST PRO남성 스틸 7 아이언"></a></dt>
												<dd>
													<p><strong class="txt_brand">캘러웨이</strong></p>
													<p><span class="txt_prdname ellipsis_row">[2만 마일리지+올인원 헤드커버 증정] 캘러웨이 22 로그 ST PRO남성 스틸 7 아이언그 ST PRO남성 스틸 7 아이언그 ST PRO남성 스틸 7 아이언</span></p>
													<p class="ellipsis_box"><span class="txt_opt ellipsis">옵션정보가 표시됩니다.옵션정보가 표시됩니다.옵션정보가 표시됩니다.옵션정보가 표시니다.옵션정보가 표니다.옵션정보가 표니다.옵션정보가 표니다.옵션정보가 표됩니다.</span></p>
												</dd>
											</dl>
										</div>
										<!--모바일 배송지 이력여부-->
										<p class="txt_alerm">배송지 입력 대기 중</p>
										<div class="apply_date">
											홍길동 
										</div>
										<div class="gift_date">
											2022-05-30 10:00:00
										</div>
										<div class="state_box">
											<p class="txt_orange">배송지 입력 대기중</p>
											<p><a href="present_write.html" class="btn_dark_gray">배송지 입력</a></p>
											<p><button type="button" class="btn_dark_gray_solid">거절하기</button></p>
										</div>
									</div>
								</li>
								<li>
									<div class="product_box">
										<div class="prd_info_box">
											<dl>
												<dt><a href="#" class="thumbnail"><img src="../../assets/images/dummy/goods_image_sample.png" alt="[2만 마일리지+올인원 헤드커버 증정] 캘러웨이 22 로그 ST PRO남성 스틸 7 아이언"></a></dt>
												<dd>
													<p><strong class="txt_brand">캘러웨이</strong></p>
													<p><span class="txt_prdname ellipsis_row">[2만 마일리지+올인원 헤드커버 증정] 캘러웨이 22 로그 ST PRO남성 스틸 7 아이언그 ST PRO남성 스틸 7 아이언그 ST PRO남성 스틸 7 아이언</span></p>
													<p class="ellipsis_box"><span class="txt_opt ellipsis">옵션정보가 표시됩니다.옵션정보가 표시됩니다.옵션정보가 표시됩니다.옵션정보가 표시니다.옵션정보가 표니다.옵션정보가 표니다.옵션정보가 표니다.옵션정보가 표됩니다.</span></p>
												</dd>
											</dl>
										</div>
										<!--모바일 배송지 이력여부--><p class="txt_alerm">거절</p>
										<div class="apply_date">
											홍길동 
										</div>
										<div class="gift_date">
											2022-05-30 10:00:00
										</div>
										<div class="state_box">
											<p class="txt_orange">거절</p>
										</div>
									</div>
								</li>
								<li>
									<div class="product_box">
										<div class="prd_info_box">
											<dl>
												<dt><a href="#" class="thumbnail"><img src="../../assets/images/dummy/goods_image_sample.png" alt="[2만 마일리지+올인원 헤드커버 증정] 캘러웨이 22 로그 ST PRO남성 스틸 7 아이언"></a></dt>
												<dd>
													<p><strong class="txt_brand">캘러웨이</strong></p>
													<p><span class="txt_prdname ellipsis_row">[2만 마일리지+올인원 헤드커버 증정] 캘러웨이 22 로그 ST PRO남성 스틸 7 아이언그 ST PRO남성 스틸 7 아이언그 ST PRO남성 스틸 7 아이언</span></p>
													<p class="ellipsis_box"><span class="txt_opt ellipsis">옵션정보가 표시됩니다.옵션정보가 표시됩니다.옵션정보가 표시됩니다.옵션정보가 표시니다.옵션정보가 표니다.옵션정보가 표니다.옵션정보가 표니다.옵션정보가 표됩니다.</span></p>
												</dd>
											</dl>
										</div>
										<!--모바일 배송지 이력여부--><p class="txt_alerm">입력 완료</p>
										<div class="apply_date">
											홍길동 
										</div>
										<div class="gift_date">
											2022-05-30 10:00:00
										</div>
										<div class="state_box">
											<p class="txt_orange">입력 완료</p>
											<p><a href="#"  class="btn_dark_gray_solid">배송지 상세보기</a></p>
										</div>
									</div>
								</li>
							</ul>
						</div>
				</div>
				<div class="pagination">
					<a href="javascript:;" class="first">go first</a>
					<a href="javascript:;" class="prev">go prev</a>
					<div class="page">
						<a href="javascript:;" class="on">1</a>
						<a href="javascript:;">2</a>
						<a href="javascript:;">3</a>
						<a href="javascript:;">4</a>
						<a href="javascript:;">5</a>
						<a href="javascript:;">6</a>
						<a href="javascript:;">7</a>
						<a href="javascript:;">8</a>
						<a href="javascript:;">9</a>
						<a href="javascript:;">10</a>
					</div>
					<a href="javascript:;" class="next">go next</a>
					<a href="javascript:;" class="last">go last</a>
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
export default {
    name: "myPresent2",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  MymenuComp,
    },
    data: () => ({
        checkLike : 0,

		userId: null,
    }),
    created () {
		this.$store.commit('setState');
		this.userId = this.$store.state.userId;
		if (this.userId == null) {
            alert('로그인이 필요한 페이지 입니다.');
			this.$router.push('/gooduser');
		}
    },
    methods: {
        
	}
}

</script>
<style scoped>

</style>