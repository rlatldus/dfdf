<template>
    <div>
        <HeaderComp :headerCase="'sub'" :pageName="'배송지 관리'" />

        <div class="loading" v-if="pending"></div>
        <div id="content" v-if="!pending">
            <!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
            <div class="mypage_wrap w-set">
                <!-- 마이페이지 좌측 메뉴 -->
                <MymenuComp />
                <!-- 마이페이지 좌측 메뉴 끝 -->
                <!-- 마이페이지 컨텐츠 -->
                <div class="mypage_con addr mob_wrap">
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
                    <!-- 회원정보 끝 -->
                    <h3 class="title">배송지 관리</h3>
                    <div class="addr_info_box">
                        <ul>
                            <li>자주 이용하는 주소지를 내 배송지에 등록해 놓으시면 주문 시 편리하게 이용하실 수 있습니다.</li>
                            <li>배송지 등록은 최대 10개까지 가능합니다.</li>
                        </ul>
                        <a href="javascript:;" @click="this.moveToWrite()" class="btn_dark_gray_solid">배송지 등록</a>
                    </div>
                    <div class="addr_box">
                        <div class="addr_title">
                            <ul>
                                <li class="addr_box_01">배송지 명</li>
                                <li class="addr_box_02">받는 사람</li>
                                <li class="addr_box_03">연락처</li>
                                <li class="addr_box_04 q1w2e3r4">주소</li>
                                <li class="addr_box_05 btn_area">수정/삭제</li>
                            </ul>
                        </div>
                        <div class="addr_list">
                            <ul>
                                <li v-for="(item, index) in this.myAddrList" :key="index">
                                    <div class="addr_box_01">
                                        <span>배송지 명</span>
                                        <strong>{{item.nickName == null ? '-' : item.nickName}}</strong>
                                    </div>
                                    <div class="addr_box_02">
                                        <span>받는 사람</span>
                                        <strong>{{item.receiverName == null ? '-' : item.receiverName}}</strong>
                                    </div>
                                    <div class="addr_box_03">
                                        <span>연락처</span>
                                        <strong>{{item.tel == null ? '-' : item.tel}}</strong>
                                    </div>
                                    <div class="addr_box_04 q1w2e3r4">
                                        <span>주소</span>
                                        <strong>[{{item.postCode == null ? '-' : item.postCode}}] {{item.address == null ? '-' : item.address}}, {{item.addressDetail == null ? '-' : item.addressDetail}}</strong>
                                    </div>
                                    <div class="addr_box_05">
                                        <p class="addr_btn_area"><router-link :to="`/gooduser/mypage/myaddrwrite/${item.id}`" type="button" class="btn btn_dark_gray">수정</router-link>
                                        <button type="button" class="btn btn_dark_gray_solid" @click="this.addrListDelete(item.id)">삭제</button></p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- <div class="pagination">
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
                    </div> -->
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
    name: "myAddr",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
      MymenuComp,
    },
    data: () => ({
        pending: true,
        userId: null,

        // 배송지 리스트
        myAddrList: null,
    }),
    created () {
		this.$store.commit('setState');
		this.userId = this.$store.state.userId;
		if (this.userId == null) {
            alert('로그인이 필요한 페이지 입니다.');
			this.$router.push('/gooduser');
		}

        this.getMyAddrList();
    },
    methods: {
        async getMyAddrList() {
            let url = '/gooduser/api/v1/shipping_address_api/my_list';
            let setData = {  };
            await axios({
                'method': 'post',
                'url': url,
                'data': setData,
                'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            }).then(res=>{
                
                this.myAddrList = res.data.data;
				this.pending = false;
            });
        },

        async addrListDelete(delId) {
            let url = '/gooduser/api/v1/shipping_address_api/delete';
            let setData = {
                id: delId,
                userId: this.userId,
            };
            await axios({
                'method': 'post',
                'url': url,
                'data': setData,
                'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            }).then(res=>{
                
                this.getMyAddrList();
            });
        },

        moveToWrite() {
            if (this.myAddrList?.length > 9) {
                alert('10개 이상 등록이 불가능합니다.');
                return;
            } else {
                this.$router.push('/gooduser/mypage/myaddrwrite/write');
            }
        }
    },
    computed: {
        
    },
    mounted() {
    }
}

</script>
<style scoped>

</style>