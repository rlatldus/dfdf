<template>
    <div>
        <div id="content">
            <div class="mobile-present">
                <div class="w-set">
                    <div class="header-present">
                        <button type="button" class="btn-close" @click="popclose">닫기</button>
                    </div>






                    <!-- 코드 입력 전 -->
                    <div class="body-present" v-if="this.giftCertBefore == true">
                        <div class="text-wrap type-center">
                            <!-- <h3>
                                <strong>홍길동</strong>님이 선물과 메시지를 보냈어요.
                            </h3> -->
                            <div class="txt-box">
                                <p>
                                    선물 받을 배송지를 입력하기 위해<br/>
                                    <em class="font-primary">카카오톡</em>으로 전달 드린<br/>
                                    인증번호 6자리를 입력해주세요
                                </p>
                            </div>
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





                    <!-- 배송지 최초 입력시 -->
                    <div class="body-present" v-else-if="this.giftCertFirst == true">
                        <div class="text-wrap type-center">
                            <h3>
                                <!-- <strong>홍길동</strong>님이 선물과 메시지를 보냈어요. -->
                                배송지 정보를 입력해주세요
                            </h3>
                        </div>
                        <div class="img-box">
                            <div class="p_thumbnail">
                                <div class="thumbnail">
                                    <img :src="this.giftSendInfo.giftImage.imageJson?.realUrl" :alt="this.giftSendInfo.giftImage.imageJson.originalName">
                                </div>
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
                                    <dd v-html="this.giftSendInfo.content"></dd>
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







                    
                    <!-- 배송지 입력 완료 -->
                    <div class="body-present" v-else-if="this.giftCertOk == true">
                        <div class="text-wrap type-center" v-if="this.giftCertAfter == true">
                            <h3>
                                선물 받은 배송지가 입력되었어요.
                            </h3>
                        </div>
                        <div class="text-wrap">
                            <div class="txt-box type-solid">
                                <dl class="type-table">
                                    <dt>
                                        <a href="#" class="thumbnail">
                                            <img :src="getPic(this.giftSendInfo.bag.product.mainImage)" class="img">
                                        </a>
                                    </dt>
                                    <dd>
                                        <p v-if="this.giftSendInfo.bag.product.brand">
                                            <strong class="txt_brand">
                                                {{this.giftSendInfo.bag.product.brand?.name}}
                                            </strong>
                                        </p>

                                        <p>
                                            <span class="txt_prdname ellipsis_row">
                                                {{this.giftSendInfo.bag.product.textName ? this.giftSendInfo.bag.product.textName : this.giftSendInfo.product.name}}
                                            </span>
                                        </p>
                                        <div v-if="this.giftSendInfo.bag.option != '{}'">
                                            <div class="ellipsis_box" v-for="(item, index) in this.giftSendInfo.bag.option" :key="index">
                                                <span class="txt_opt ellipsis">
                                                    <span v-for="(optionName, index2) in item.items" :key="index2">
                                                        <span v-if="index2 != 0"> / </span>
                                                        {{optionName.name}}
                                                    </span>
                                                </span>
                                                <div class="opt_wrap">
                                                    <span class="txt_opt"><em class="font_mont">{{this.threeCommaAdd(item.value + this.giftSendInfo.bag.price)}}</em>원</span>
                                                    <span class="txt_opt"><em class="font_mont">{{item.amount}}</em>개</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div class="ellipsis_box">
                                                <div class="opt_wrap">
                                                    <span class="txt_opt"><em class="font_mont">{{this.threeCommaAdd(this.giftSendInfo.bag.totalPrice)}}</em>원</span>
                                                    <span class="txt_opt"><em class="font_mont">{{this.giftSendInfo.bag.count}}</em>개</span>
                                                </div>
                                            </div>
                                        </div>
                                    </dd>
                                </dl>
                                <div class="row">
                                    <dl class="type-col">
                                        <dt>이름</dt>
                                        <dd>{{this.giftSendInfo.recipientName}}</dd>
                                    </dl>
                                    <dl class="type-col">
                                        <dt>연락처</dt>
                                        <dd>{{this.giftSendInfo.recipientTel}}</dd>
                                    </dl>
                                </div>
                                <dl class="type-col">
                                    <dt>메시지</dt>
                                    <dd>
                                        <p>{{this.giftSendInfo.postCode}}</p>
                                        <p>{{this.giftSendInfo.address}}</p>
                                        <p>{{this.giftSendInfo.addressDetail}}</p>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div class="btn-area mt40">
                            <button type="submit" class="btn btn_light_gray_solid btn_full" @click="this.giftCertEdit = !this.giftCertEdit">배송지 변경</button>
                        </div>
                        <div class="del_info pt30" v-if="this.giftCertEdit">
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
                        <div class="btn-area mt20" v-if="this.giftCertEdit">
                            <button type="submit" class="btn btn_dark_gray btn_full" @click="presentShipdataSave">입력하기</button>
                        </div>
                        <div class="desc-box">
                            <ul>
                                <li>입력기한까지 배송지를 입력하지 않으시면 선물 주문이<br>자동 취소 됩니다.</li>
                                <li>선물 상품의 취소/교환/반품은 선물을 보내신 분이 할 수 있습니다.</li>
                            </ul>
                        </div>
                        <div class="btn-area mt40">
                            <router-link to="/gooduser/mypage/mypresent1" tag="button" class="btn btn_light_gray_solid btn_full">선물함 가기</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        chkNumber: null,

        // 인증여부 status 등
        giftCertBefore: true,
        giftCertFirst: false,
        giftCertOk: false,

        // 이미 배송지가 있는 케이스
        giftCertAfter: false,
        giftCertEdit: false,

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
        getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },
		threeCommaAdd(number){
            return number.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        async giftCertCheck () {
            this.chkNumber = this.certNum;
            let postData = {
                // "crypt": this.$route.params.presentId,
                "crypt": this.$route.query.code, 
                "chkNumber": this.chkNumber,
            }
            let url = '/gooduser/api/v1/gift/chkNumber';
            await axios.post(url, postData).then(res=>{
                if (res.data.data == false) {
                    alert('인증번호가 맞지 않습니다.');
                } else if (res.data.data?.paymentProduct?.paymentStatus == 'NY') {
                    alert('구매자가 취소한 상품입니다.');
                    return;
                } else if (res.data.data.giftStatus == 'Refuse') {
                    alert('환불 처리된 상품입니다.');
                    return;
                } else {
                    // 줄바꿈 처리
                    if (res.data.data.content != null) {
                        res.data.data.content = res.data.data.content?.replace(/\n/g, '<br/>');
                    }  
                    if (res.data.data.bag.option != '{}') {
                        res.data.data.bag.option = JSON.parse(res.data.data.bag.option);
                    }
                    this.giftSendInfo = res.data.data;
                    this.giftCertBefore = false;
                    if (res.data.data.address == null) {
                        this.giftCertFirst = true;
                    } else {
                        this.giftCertFirst = false;
                        this.giftCertOk = true;
                    }
                    this.giftCertEdit = false;

                    this.roadAddr = this.giftSendInfo.address
                    this.shipAddr3 = this.giftSendInfo.addressDetail
                    this.postCode = this.giftSendInfo.postCode
                    this.giftSendInfo.recipientName = this.giftSendInfo.recipientName
                    this.giftSendInfo.recipientTel = this.giftSendInfo.recipientTel
                    this.shipRequest = 0
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
                // crypt: this.$route.params.presentId,
                // crypt: `id=${this.giftSendInfo.id}#phone=${this.giftSendInfo.recipientTel}`,
                chkNumber: this.certNum,
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
                if (res.data.code == 200 && res.data.data) {
                    alert('배송지 입력이 완료되었습니다.');

                    this.giftCertCheck();
                } else {
                    alert('배송지 입력 실패');
                }
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