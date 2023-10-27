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
                            <h3>
                                <!-- <strong>홍길동</strong>님이 보낸  -->
                                선물과 메시지를 거절하시겠어요?
                            </h3>
                            <div class="txt-box">
                                <p>
                                    선물 거절을 위해<br/>
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
                    <div class="body-present" v-if="this.giftCertOk == true">
                        <div class="text-wrap type-center">
                            <h3 class="pb30" v-if="!this.giftRefuseOk">
                                <!-- <strong>홍길동</strong>님이 보낸  -->
                                선물과 메시지를 거절하시겠어요?
                            </h3>
                            <h3 class="pb30" v-else>
                                선물이 거절되었습니다.
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
                            </div>
                        </div>
                        <div class="btn-area mt40" v-if="!this.giftRefuseOk">
                            <button type="submit" class="btn btn_dark_gray" @click="this.presentRefuseSend">확인</button>
                            <button type="submit" class="btn btn_light_gray_solid" @click="this.popclose">취소</button>
                        </div>
                        <div class="btn-area mt40" v-else>
                            <button type="submit" class="btn btn_dark_gray" @click="this.popclose">확인</button>
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
        // 인증여부 status 등
        giftCertBefore: true,
        giftCertOk: false,
        giftRefuseOk: false,

        giftSendInfo: null,

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
        popclose() {
            this.$router.push('/gooduser');
        },

        async giftCertCheck () {
            let postData = {
                // "crypt": this.$route.params.presentId,
                // "crypt": `id=${this.$route.query.id}#phone=${this.$route.query.phone}`,
                crypt: this.$route.query.code,
                "chkNumber": this.certNum,
            }
            console.log(postData);
            let url = '/gooduser/api/v1/gift/chkNumber';
            await axios.post(url, postData).then(res=>{
                console.log(res);
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
                    this.giftCertOk = true;
                }
            });
        },

        async presentRefuseSend(){
            let url = '/gooduser/api/v1/gift/refuse_present';

            let shippingData = {
                // crypt: `id=${this.giftSendInfo.id}#phone=${this.giftSendInfo.recipientTel}`,
                // crypt: this.$route.params.presentId,
                // crypt: `id=${this.giftSendInfo.id}#phone=${this.giftSendInfo.recipientTel}`,
                crypt: this.$route.query.code,
            }

			console.log(shippingData);

            // axios 요청
            await axios({
                'method': 'post',
                'url': url,
                'data': shippingData
            }).then(res=>{
                console.log(res);
                if (res.data.code == 200 && res.data.data) {
                    // alert('상품 거절이 완료되었습니다.');
                    // let url2 = '/gooduser/api/v1/kcp/cancel';
                    // let setData2 = {
                    //         'paymentId': Number(setId),
                    //         'memberId': Number(this.userId),
                    //         'paymentGroup' : null,
                    //         'status' : 'C',
                    //     }
                    //     console.log(url2);
                    //     console.log(setData2);
                    // await axios({
                    //     'method': 'post',
                    //     'url': url,
                    //     'data': setData2
                    // }).then(res2=>{
                    //     console.log(res);
                    //     alert(`${res2.data.data.res_msg} [${res2.data.data.res_cd}]`);
                    //     //this.giftRefuseOk = true;
                    // });
                    this.giftRefuseOk = true;
                } else {
                    alert('상품 거절 실패');
                }
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