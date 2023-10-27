<template>
    <div>
    <HeaderComp :headerCase="'sub'" :pageName="'공지사항'" />
    <div id="content">
		<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
		<div class="customer_wrap type_view w-set">
			<!-- 고객센터 좌측 메뉴 -->
			<CustomermenuComp />
			<!-- 고객센터 좌측 메뉴 끝 -->

			<!-- 고객센터 컨텐츠 -->
			<div class="customer_con">
				<h3 class="title">공지사항</h3>
					<!-- 공지사항  -->
					<div class="notice_wrap type-view" v-if="noticeData">
						<div class="notice_list">
							<div class="list_row">
								<div class="count">
                                    <span class="notice" v-if="noticeData.isNotice == 'Y'">공지</span>
                                    <span v-else>{{noticeData.id}}</span>
                                </div>
								<div class="notice_txt">
									<a href="#">{{noticeData.title}}</a>
									<i class="ico_new" v-if="noticeIsNew"></i>
								</div>
								<div class="date">{{noticeData.isrtDate.substr(0,10)}}</div>
								<div class="views">조회 : {{noticeData.hit}}</div>
							</div>
						</div>
						<div class="notice_contents" v-html="noticeData.content"></div>
                        <div v-if="noticeData.fileJson.length > 0">
                            <div class="notice_attach" v-for="(item, index) in noticeData.fileJson" :key="index">
                                <a :href="`/samsung/attachment/download/${item.uuid}`"><i class="ico_download"></i><span>{{item.originalName}}</span></a>
                            </div>
                            <!-- <a :href="`/samsung/attachment/download/${item.fileJson[0].uuid}`" class="ico_attatch" v-if="item.fileJson.length > 0">
											<span class="blind">첨부파일</span>
										</a> -->
                        </div>
					</div><!-- //공지사항  -->
					<div class="button_area">
						<button type="button" class="btn btn_gray" @click="$router.go(-1)">목록</button>
					</div>
				</div>
				<!-- //리스트 영역 -->
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
import CustomermenuComp from '../../components/CustomermenuComp.vue';
import axios from "axios";

export default {
    name: "noticeView",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  CustomermenuComp,
    },
    data: () => ({
        checkLike : 0,
        noticeData: false,
        noticeIsNew: false,
        // pending: false,
        // waves: [],
        // wave: null,
        // showDetail: false,
        // addWave: {
        //     _id: null,
        //     year: null,
        //     text: null,
        //     start: null,
        //     end: null,
        //     ranges: [],
        //     half: null
        // }
    }),
    created () {
        this.getNoticeDetail();
    },
    methods: {
        async getNoticeDetail(){
			let url = '/gooduser/api/v1/user/notices/detail?id='+this.$route.params.id;
			await axios.get(url).then(res=>{
				this.noticeData = res.data.data;
                // 20221019 꺽쇠 관련
                this.noticeData.content = this.noticeData.content.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/fixed/g, '');

			});
		},

    },
    computed: {

    },
    mounted() {
    }
}

</script>
<style scoped>

</style>
