<template>
    <div>
        <HeaderComp :headerCase="'sub'" :pageName="'선물하기'" style="display: none"/>

        <div v-if="pending"></div>
        <div id="content" class="mypage_con" v-else>
            <div class="mobile-present">
                <div class="w-set">
                    <div class="header-present">
                        <button type="button" class="btn-close" @click="popclose">닫기</button>
                    </div>
                    <div class="body-present">
                        <div class="text-wrap type-center">
                            <h3>
                                선물 받은 배송지가 입력되었어요.
                            </h3>
                        </div>
                        <div class="present_area">
                            <div class="prnt">
                                <div class="prnt_l">상품명</div>
                                <div class="prnt_r">
                                    <div class="prd_info_box">
                                            <dl>
                                                <dt>
                                                    <a href="#" class="thumbnail">
                                                        <img src="../../assets/images/dummy/goods_image_sample.png" alt="[2만 마일리지+올인원 헤드커버 증정] 캘러웨이 22 로그 ST PRO남성 스틸 7 아이언">
                                                    </a>
                                                </dt>
                                                <dd>
                                                    <p><strong class="txt_brand">캘러웨이</strong></p>
                                                    <p><span class="txt_prdname ellipsis_row">[2만 마일리지+올인원 헤드커버 증정] 캘러웨이 22 로그 ST PRO남성 스틸 7 아이언그 ST PRO남성 스틸 7 아이언그 ST PRO남성 스틸 7 아이언</span></p>
                                                    <p class="ellipsis_box"><span class="txt_opt ellipsis">옵션정보가 표시됩니다.옵션정보가 표시됩니다.옵션정보가 표시됩니다.옵션정보가 표시니다.옵션정보가 표니다.옵션정보가 표니다.옵션정보가 표니다.옵션정보가 표됩니다.</span></p>
                                                </dd>
                                            </dl>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="prnt">
                                <div class="prnt_l">보낸 분</div>
                                <div class="prnt_r">홍길동</div>
                            </div> -->
                            <div class="prnt">
                                <div class="prnt_l">선물 일시</div>
                                <div class="prnt_r">2022-05-30</div>
                            </div>
                            <div class="prnt">
                                <div class="prnt_l">배송지 입력 기한</div>
                                <div class="prnt_r">2022-06-30</div>
                            </div>
                            <div class="prnt">
                                <div class="prnt_l">배송지 </div>
                                <div class="prnt_r">16996</div>
                                <div class="prnt_r">경기도 용인시 중부대로 735 (상하동, 대우아파트) 000동 0000호</div>
                            </div>
                        </div>
                        <div class="btn-area mt20">
                            <button type="submit" class="btn btn_dark_gray btn_full" @click="goHome">홈으로</button>
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
        pending: false,

        presentSendData: null,
    }),
    created () {
    },
    methods: {
        async giftCertOk () {
            let postData = {
                "code": this.$route.params.presentId,
                "certNum": this.certNum,
            }
            let url = '/gooduser/api/v1/gift/giftFinish';
            await axios.post(url, postData).then(res=>{
                //this.checkLike = 0;
            });
        },

        async presentShipdataSave(){
            // axios 요청
            // await axios({
            //     'method': 'post',
            //     'url': url,
            //     'data': shippingData
            // }).then(res=>{
            //     this.presentSendData = res.data.data;
            //      this.pending = false;
            //     console.log(res);
            // })

            // 성공시
            if (true) {
                alert('배송지 저장이 완료되었습니다.');
            }
            //this.popclose();
	    },

        goHome() {
            this.$router.push('/gooduser');
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