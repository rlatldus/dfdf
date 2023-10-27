<template>
    <div>
        <HeaderComp :headerCase="'sub'" :pageName="'선물하기'" style="display: none"/>

        <div id="content">
            <div class="mobile-present">
                <div class="w-set">
                    <div class="header-present">
                        <button type="button" class="btn-close" @click="popclose">닫기</button>
                    </div>

                    <div class="body-present" v-if="this.giftCertok == false">
                        <div class="text-wrap type-center">
                            <h3>
                                인증번호를 입력해주세요
                            </h3>
                        </div>
                        <div class="del_info">
                            <dl>
                                <dt>인증번호 입력 <span class="txt_essential">*</span></dt>
                                <dd>
                                    <input type="text" name="certCode" title="인증번호 입력" v-model="this.certNum">
                                </dd>
                            </dl>
                        </div>
                        <div class="btn-area mt20">
                            <button type="submit" class="btn btn_dark_gray btn_full" @click="giftCertCheck()">확인</button>
                        </div>
                    </div>

                    <div class="body-present" v-else>
                        <!-- <div class="text-wrap type-center">
                            <h3>
                                <strong>홍길동</strong>님이 선물과 메시지를 보냈어요.
                                배송지 정보를 입력해주세요
                            </h3>
                        </div> -->
                        <div class="img-box">
                            <div class="p_thumbnail">
                                <div class="thumbnail"><img src="../../assets/images/dummy/img_present.png" alt="카드명"></div>
                            </div>
                        </div>
                        <div class="text-wrap">
                            <div class="txt-box type-solid">
                                <dl class="row col-2">
                                    <dt>이름</dt>
                                    <dd>{{this.giftSendInfo.recipientName}}</dd>
                                    <dt>연락처</dt>
                                    <dd>{{this.giftSendInfo.recipientTel}}</dd>
                                </dl>
                                <dl class="row">
                                    <dt>메시지</dt>
                                    <dd>{{this.giftSendInfo.content}}</dd>
                                </dl>
                            </div>
                        </div>
                        <div class="del_info">
                            <div class="title-box">
                                <h4>선물 받을 배송지 입력</h4>
                            </div>
                            <dl>
                                <dt>주소 <span class="txt_essential">*</span></dt>
                                <dd>
                                    <p class="add_btn">
                                        <input type="text" name="postcodeshow" title="postcodeshow" id="postcodeshow" readonly="" v-model="postCode" style="font-size: 14px;">
                                        <a href="javascript:;" class="btn btn_light_gray_solid" @click="addrSearch">우편번호</a>
                                    </p>
                                    <!-- <input type="hidden" name="postcode" title="postcode" id="postcode" readonly /> -->
                                    <input type="hidden" name="jibunAddress" id="jibunAddress" title="지번 주소 히등" readonly="" v-model="jibunAddress">
                                    <p><input type="text" name="roadAddress" id="roadAddress" title="주소" readonly="" v-model="roadAddr"></p>
                                    <p><input type="text" name="add_detail" id="add_detail" title="상세주소 입력" placeholder="상세주소 입력" v-model="shipAddr3"></p>
                                </dd>
                            </dl>
                            <!-- <dl>
                                <dt>받으시는 분 <span class="txt_essential">*</span></dt>
                                <dd>
                                    <input type="text" name="reciever_name" title="받으시는 분 입력" v-model="this.shipName">
                                </dd>
                            </dl> -->
                            <!-- <dl>
                                <dt>휴대폰 번호<span class="txt_essential">*</span></dt>
                                <dd>
                                    <input type="text" name="phone_num" title="휴대폰 번호 입력" v-model="this.shipTel">
                                </dd>
                            </dl> -->
                            <dl>
                                <dt>배송 메시지 (선택)</dt>
                                <dd>
                                    <p>
                                        <select name="del_message" title="배송메세지 선택" v-model="this.shipRequest">
                                            <option value="">배송 메세지를 선택하세요</option>
                                            <option value="배송 전 연락 부탁드립니다.">배송 전 연락 부탁드립니다.</option>
                                            <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>.
                                            <option value="집 앞에 놔주세요.">집 앞에 놔주세요.</option>
                                            <option value="택배함에 놔주세요.">택배함에 놔주세요.</option>
                                            <option value="부재 시 휴대폰으로 연락주세요.">부재 시 휴대폰으로 연락주세요.</option>
                                            <option value="부재 시 경비실에 맡겨주세요.">부재 시 경비실에 맡겨주세요.</option>
                                            <option value="부재 시 집앞에 놔주세요.">부재 시 집앞에 놔주세요.</option>
                                            <option value="0"> 직접입력</option>
                                        </select>
                                    </p>
                                    <p v-if="this.shipRequest == '0'">
                                        <input type="text" name="message" title="메세지 입력" placeholder="20자 이내로 입력하세요" maxlength="20" v-model="shipRequestExtra">
                                    </p>
                                </dd>
                            </dl>
                        </div>
                        <div class="btn-area mt20">
                            <button type="submit" class="btn btn_dark_gray btn_full" @click="presentShipdataSave">입력하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <MobileNavComp :mNavType="'my'" style="display: none;"/>

        <FooterComp style="display: none;" />
    </div>
</template>
<script>
import HeaderComp from '../../components/HeaderComp.vue';
import MobileNavComp from '../../components/MobileNavComp.vue';
import FooterComp from '../../components/FooterComp.vue';
import MymenuComp from '../../components/MymenuComp.vue';
import axios from "axios";
export default {
    name: "present",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
      MymenuComp,
    },
    data: () => ({
        // 인증여부
        giftCertok: false,
        certNum: null,
        receiveCode: null,

        giftSendInfo: null,

        shipName: null,
        shipTel: null,
        shipRequest: "",
        shipRequestExtra: null,

        shipTel: null,
        shipTelSub: null,
        postCode: null,
        roadAddr: null,
        shipAddr3: null,
        jibunAddress: null,
    }),
    created () {
    },
    methods: {

        async giftCertCheck () {
            let postData = {
                "crypt": this.$route.query.code,
                "chkNumber": this.certNum,
            }
            let url = '/gooduser/api/v1/gift/chkNumber';
            await axios.post(url, postData).then(res=>{
                if (res.data.data == false) {
                    alert('인증번호가 맞지 않습니다.');
                } else {
                    this.giftSendInfo = res.data.data;
                    this.giftCertok = true;
                }
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
                    //document.getElementById('postcode').value = data.zonecode;
                    
                    //document.getElementById('postcode').value = data.zonecode;
                    this.postCode = data.zonecode;
                    //document.getElementById('roadAddress').value = data.roadAddress +"" + extraRoadAddr;
                    //this.roadAddress = data.roadAddress +" " + extraRoadAddr;
                    this.roadAddr = data.roadAddress;
                    //document.getElementById("jibunAddress").value = data.jibunAddress;
                    this.jibunAddress = data.autoJibunAddress
                    //this.shipAddr3 = data.jibunAddress
                    // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                    // if(roadAddr !== ''){
                    //     document.getElementById("extraAddress").value = extraRoadAddr;
                    // } else {
                    //     document.getElementById("extraAddress").value = '';
                    // }
                    
                }
            }).open();
        },	

        async presentShipdataSave(){
            // return; 
            if (
                (this.postCode == null || this.postCode == '') ||
                (this.roadAddr == null || this.roadAddr == '') ||
                (this.shipAddr3 == null || this.shipAddr3 == '')
                //(this.shipName == null || this.shipName == '') ||
                //(this.shipTel == null || this.shipTel == '')
            ) {
                alert('필수 정보를 모두 입력해주세요');
                return;
            }
            
            let url = '/gooduser/api/v1/gift/insert';

            let shippingData = {
                // crypt: `id=${this.giftSendInfo.id}#phone=${this.giftSendInfo.recipientTel}`,
                crypt: this.$route.query.code,
                address: this.roadAddr,
                addressDetail: this.shipAddr3,
                postCode: String(this.postCode),
                recipientName: this.giftSendInfo.recipientName,
                recipientTel: this.giftSendInfo.recipientTel,
                shippingContent: this.shipRequest == '0' ? this.shipRequestExtra : this.shipRequest,
            }

            // axios 요청
            await axios({
                'method': 'post',
                'url': url,
                'data': shippingData
            }).then(res=>{
                // alert('배송지 입력이 완료되었습니다.');
                // this.$router.push('/gooduser');
            })

            // 성공시
            if (true) {
                //alert('배송지 저장이 완료되었습니다.');
                //this.sendOk();
            }
            //this.popclose();
	    },

        popclose() {
            this.$router.push('/gooduser');
        },
        sendOk() {
            this.$router.push('/gooduser/etc/gift/giftcertok/'+this.$route.params.presentId);
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