<template>
    <div>
        <HeaderComp :headerCase="'sub'" :pageName="'이용약관'" />

        <div id="content">
            <div class="policy w-set">
                <h2 class="page-title">이용약관</h2>
                <div class="policy-cont">
                    <b>제 1조 목적</b>
                    <span>이 약관은, 웹회원이 삼성물산 주식회사(이하 '회사')에서 제공하는 골프 관련 서비스를 하나의 아이디(ID)와 비밀번호로 이용하는 것에 관한 서비스 이용조건 및 절차, 회사와 웹회원의 권리 및 의무, 기타 필요한 사항을 규정하는 것을 목적으로 한다.</span>
                    <b>제 2조 용어의 정의</b>
                    <span>이 약관에서 사용하는 용어의 정의는 다음과 같다.</span>
                    <span>
                        ① 웹회원이란, 본 약관에 따라 회사와 이용계약을 체결하고 회사에 개인정보 및 아이디(ID)를 회사의 웹사이트에 등록함으로서 회사가 제공하는 서비스를 이용하는 사람을 말한다.<br />
                        ② 임시 웹회원이란, 웹회원은 아니나 회사가 회사의 서비스를 제한적으로 이용할 수 있는 사람을 말한다.<br />
                        ③ 아이디(ID)란, 웹회원의 식별과 서비스 이용을 위하여 1인당 1개를 생성∙등록하여 회사의 승인을 얻는 것을 말하며, ID 생성을 위해 필요한 개인 정보를 허위로 제공하거나, 본인이 아닌 타인의 정보를 무단으로 사용하여 ID를 만들 수 없다.<br />
                        ④ 비밀번호란, 웹회원이 등록한 아이디(ID)와 일치된 웹회원임을 확인하고 웹회원 자신의 비밀을 보호하기 위하여 웹회원이 정한 문자와 숫자의 조합을 의미한다. 비밀번호의 관리소홀, 부정사용에 의하여 발생되는 모든 결과에 대한 책임은 각각의 웹회원에게 있다.<br />
                        ⑤ 서비스란, 회사의 웹사이트 golfsamsung.com 및 모바일 어플리케이션(이하 이를 통칭하여 '웹사이트 등')에서 제공하는 서비스를 총칭한다. 구체적인 서비스의 종류는 제 5조에 따른다.<br />
                        ⑥ 게시물이란, 회사나 웹회원이 웹사이트 등에서 게시한 글, 사진, 각종 파일, 링크 등을 말한다.<br />
                        ⑧ 온라인 몰이란, 회사가 골프용품 등을 판매하기 위해 웹사이트 등에서 운영하는 온라인 쇼핑몰을 말한다.<br />
                        ⑨ 동호회 커뮤니티란, 웹회원들이 골프와 관련된 취미, 관심사 등을 교류하기 위해 자발적으로 형성한 모임을 말한다.<br />
                        ⑩ 예약자란, 회사 웹사이트 등을 통해 회사 개별 골프장 이용을 예약한 웹회원을 말한다.<br />
                        ⑪ 동반자란, 예약자가 웹사이트 등을 통해 예약한 회사 개별골프장 Tee off Time에 함께 이용하기 위해서 지정한 자를 말한다.<br />
                        ⑫ 기프트카드란, 회사가 정의한 기술사양에 따라 회사가 인증한 chip 또는 어플리케이션을 내장하고 회사의 브랜드를 부착한 선불전자 지급수단임과 동시에 회사의 유상 서비스를 이용할 수 있도록 회사가 승인한 카드로서 회사가 발급한다.</span>
                    <b>제 3조 약간의 효력과 변경</b>
                    <span>① 웹회원이 서비스를 이용하려면 본 약관에 동의해야 하며, 웹회원이 회사의 웹사이트 등을 통해 구현된 "동의" 버튼을 클릭하거나, 웹회원이</span>
                </div>
            </div>
        </div>

        <MobileNavComp />
        <FooterComp />

    </div>
</template>
<script>
import HeaderComp from '../../components/HeaderComp.vue';
import MobileNavComp from '../../components/MobileNavComp.vue';
import FooterComp from '../../components/FooterComp.vue';
import MymenuComp from '../../components/MymenuComp.vue';
export default {
    name: "policyService",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
      MymenuComp,
    },
    data: () => ({
    }),
    created () {
        
    },
    methods: {
    },
    computed: {
        
    },
    mounted() {
    }
}

</script>
<style scoped>

</style>