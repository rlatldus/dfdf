<template>
    <div>
        <HeaderComp :headerCase="'sub'" :pageName="'배송지 관리'" />
        
        <div id="content">
            <div class="mypage_wrap w-set">
                <!-- 마이페이지 좌측 메뉴 -->
                <MymenuComp />
                <!-- 마이페이지 좌측 메뉴 끝 -->
                <!-- 마이페이지 컨텐츠 -->
                <div class="mypage_con present mob_wrap">
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
					<h3 class="title">배송지 입력</h3>
					<div class="addr_chk">
						<div class="chk_info">
							<label for="set_shpping_01"><input type="checkbox" name="set_shpping" id="set_shpping_01" v-model="this.isDefault" value="Y"><span>기본 배송지로 설정</span></label>
						</div>
						<em>필수입력항목 <span class="txt_essential">*</span></em>
					</div>
					<div class="del_info">
						<dl>
							<dt>받는 사람 <span class="txt_essential">*</span></dt>
							<dd>
								<input type="text" name="deliv_name" title="받는 사람 입력" maxlength="15" v-model="this.receiverName">
							</dd>
						</dl>
						<dl>
							<dt>연락처 <span class="txt_essential">*</span></dt>
							<dd>
								<input type="text" name="deliv_name" title="연락처 입력" maxlength="11" v-model="this.tel">
							</dd>
						</dl>
						<dl>
							<dt>추가 연락처 (선택)</dt>
							<dd>
								<input type="text" name="deliv_name" title="추가 연락처 입력" maxlength="11" v-model="addTel">
							</dd>
						</dl>
						<dl class="q1w2e3r4">
							<dt>주소 <span class="txt_essential">*</span></dt>
							<dd>
								<p><a href="javascript:;" class="btn btn_light_gray_solid" @click="addrSearch()">우편번호</a></p>
								<p><input type="text" name="add" title="주소" readonly="" v-model="this.address"></p>
								<p><input type="text" name="add_detail" title="상세주소 입력" placeholder="상세주소를 입력하세요" v-model="this.addressDetail"></p>
							</dd>
						</dl>
						<dl>
							<dt>배송지 명</dt>
							<dd>
								<ul class="pickup_box">
									<li><label for="shipping_01"><input type="radio" name="shipping" id="shipping_01" value="집" v-model="this.nickNameCheck" @change="this.nickNameText = null"><span>집</span></label></li>
									<li><label for="shipping_02"><input type="radio" name="shipping" id="shipping_02" value="회사" v-model="this.nickNameCheck" @change="this.nickNameText = null"><span>회사</span></label></li>
									<li><label for="shipping_03"><input type="radio" name="shipping" id="shipping_03" value="기타" v-model="this.nickNameCheck" @change="this.nickNameText = null"><span>기타</span></label></li>
								</ul>
								<input type="text" name="deliv_name" title="연락처 입력" placeholder="주소 별명 입력 (10자 내외)" class="shipping_input" maxlength="10" v-model="this.nickNameText" @change="this.nickNameCheck = null">
							</dd>
						</dl>
						<dl>
							<dt>배송요청사항(선택)</dt>
							<dd>
								<p>
									<select id="del_message" ref="delmessage" name="del_message" title="배송메세지 선택" v-model="this.shippingMassage">
										<option value="">배송메세지를 선택하세요</option>
										<option value="배송 전 연락 부탁드립니다.">배송 전 연락 부탁드립니다.</option>
										<option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>.
										<option value="집 앞에 놔주세요.">집 앞에 놔주세요.</option>
										<option value="택배함에 놔주세요.">택배함에 놔주세요.</option>
										<option value="부재 시 휴대폰으로 연락주세요.">부재 시 휴대폰으로 연락주세요.</option>
										<option value="부재 시 경비실에 맡겨주세요.">부재 시 경비실에 맡겨주세요.</option>
										<option value="부재 시 집앞에 놔주세요.">부재 시 집앞에 놔주세요.</option>
										<option value="custom">직접입력</option>
									</select>
								</p>
								<p v-if="this.shippingMassage == 'custom'">
									<input type="text" name="message" title="메세지 입력" placeholder="20자 이내로 입력하세요" v-model="this.shippingMassageCustom">
								</p>
							</dd>
						</dl>
					</div>
					<div class="btn_area1">
						<button type="button" class="btn btn_dark_gray" @click="this.addrListWrite()">확인</button>
						<router-link to="/gooduser/mypage/myaddr" class="btn btn_dark_gray_solid">목록</router-link>
					</div>
                </div>
            </div>
        </div>

        <MobileNavComp :mNavType="'like'" />
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
    name: "myAddrWrite",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
      MymenuComp,
    },
    data: () => ({
		pending: true,
		userId: null,
		isEdit: false,
		addrId: null,

        // 입력 배송지 데이터
        receiverName : null,
        nickName : '',
        tel : '',
        addTel : '',
        postCode : '',
        address : '',
        addressJibun : '',
        addressDetail : '',
        isDefault : '',
		shippingMassage: '',
		shippingMassageCustom: '',

		// 입력 배송지 체크박스 케이스
		nickNameCheck: null,
		nickNameText: null,

		// 배송요청사항
		
    }),
    created () {
		this.$store.commit('setState');
		this.userId = this.$store.state.userId;
		if (this.userId == null) {
            alert('로그인이 필요한 페이지 입니다.');
			this.$router.push('/gooduser');
		}

		if (this.$route.params.id == 'write') {
			this.pending = true;
		} else {
			this.isEdit = true;
			this.addrListDetail();
		}
    },
    methods: {
		escapeRegex(string) {
            if(string){
				string = String(string);
                return string.replace(/[-\/\\^$%*+?.()|[\]{}<>]/g, ' ');
            }else{
                return string
            }
            
        },
		async addrListDetail() {
            let url = '/gooduser/api/v1/shipping_address_api/detail';
            let setData = {
                userId : this.userId,
				id : this.$route.params.id
            };
            await axios({
                'method': 'post',
                'url': url,
                'data': setData,
				'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            }).then(res=>{
                

				//수정시에는 id 세팅
				this.addrId = res.data.data.id;

				this.receiverName = res.data.data.receiverName;
				this.tel = res.data.data.tel;
				this.addTel = res.data.data.addTel;
				this.postCode = res.data.data.postCode;
				this.address = res.data.data.address;
				this.addressJibun = res.data.data.addressJibun;
				this.addressDetail = res.data.data.addressDetail;

				// 필수배송
				if (res.data.data.isDefault == 'Y') {
					this.isDefault = true;
				} else {
					this.isDefault = false;
				}

				// 배송 닉네임
				if (res.data.data.nickName == '집' || res.data.data.nickName == '회사' || res.data.data.nickName == '기타') {
					this.nickNameCheck = res.data.data.nickName;
				} else {
					this.nickNameText = res.data.data.nickName;
				}

				// 배송 메세지 처리
				this.shippingMassage = res.data.data.shippingMassage;
				if (document.querySelector('#del_message').value == '') {
					this.shippingMassage = 'custom';
					this.shippingMassageCustom = res.data.data.shippingMassage;
				}
				
				this.pending = true;
            });
        },

		async addrListWrite() {
			if (!this.receiverName) {
				alert('받으시는 분 값은 필수값입니다.');
				return;
			}
			let checkNumber = /^[0-9]+$/;
			if (!checkNumber.test(this.tel)) {
				alert('휴대폰 번호가 올바르지 않습니다');
				return;
			}
			if (!this.tel) {
				alert('휴대폰 번호는 필수값입니다');
				return;
			}

			if (!this.addTel == '') {
				if ( !checkNumber.test(this.addTel) ) {
					alert('추가연락처가 올바르지 않습니다');
					return;
				}
			}

			if (!this.postCode || !this.address || !this.addressDetail) {
				alert('배송주소 값은 필수값입니다.');
				return;
			}

            let url = '/gooduser/api/v1/shipping_address_api/save';
            let setData = {
                userId: this.userId,
				receiverName : this.escapeRegex(this.receiverName),
				nickName : this.escapeRegex(this.nickNameCheck == null ? this.nickNameText : this.nickNameCheck),
				tel : this.escapeRegex(this.tel),
				addTel : this.escapeRegex(this.addTel),
				postCode : this.escapeRegex(this.postCode),
				address : this.escapeRegex(this.address),
				addressJibun : this.escapeRegex(this.addressJibun),
				addressDetail : this.escapeRegex(this.addressDetail),
				isDefault : this.isDefault ? 'Y' : 'N',
				shippingMassage: this.escapeRegex(this.shippingMassage == 'custom' ? this.shippingMassageCustom : this.shippingMassage),
            };

			// 수정 케이스의 경우
			if (this.$route.params.id != 'write') {
				url = '/gooduser/api/v1/shipping_address_api/update';
				setData.id = this.addrId;
			}

            await axios({
                'method': 'post',
                'url': url,
                'data': setData,
				'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            }).then(res=>{
                
				alert('배송지 등록이 완료되었습니다.');
				this.$router.push('/gooduser/mypage/myaddr');
            });
        },

		addrSearch(){ //@click을 사용할 때 함수는 이렇게 작성해야 한다.
            new window.daum.Postcode({
                oncomplete: (data) => { //function이 아니라 => 로 바꿔야한다.
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }
                    

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    console.log(data);
                    this.postCode = data.zonecode;
                    this.addressJibun = data.jibunAddress;
                    this.address = data.roadAddress;
                }
            }).open();
        },	
    },
    computed: {
        
    },
    mounted() {
		// 주소 api
        const script = document.createElement("script");
        script.src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";  
        document.head.appendChild(script);
    }
}

</script>
<style scoped>

</style>