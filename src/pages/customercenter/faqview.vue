<template>
    <div>
    <HeaderComp :headerCase="'sub'" :pageName="'FAQ'" />
    <div id="content">
		<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
		<div class="customer_wrap faq_view type_view w-set">
			<!-- 고객센터 좌측 메뉴 -->
			<CustomermenuComp />
			<!-- 고객센터 좌측 메뉴 끝 -->

			<!-- 고객센터 컨텐츠 -->
			<div class="customer_con">
				<h3 class="title">FAQ</h3>
					<!-- 공지사항  -->
					<div class="notice_wrap type-view type-faq" v-if="faqData">
						<div class="notice_list">
                            <div class="count">
                                <span class="notice" v-for="(data, index) in faqData.category" :key="index">{{faqCate[data]}}</span>
                            </div>
							<div class="list_row">
								<div class="notice_txt">
									<a href="#">{{faqData.title}}</a>
									<i class="ico_new" v-if="noticeIsNew"></i>
								</div>
								<div class="date">{{faqData.isrtDate.substr(0,10)}}</div>
								<div class="views">조회 : {{faqData.hit}}</div>
							</div>
						</div>
						<div class="notice_contents" v-html="faqData.content"></div>
                        <div v-if="faqData.fileJson?.length > 0">
                            <div class="notice_attach" v-for="(item, index) in faqData.fileJson" :key="index">
                                <a href="#"><i class="ico_download"></i><span>{{item.originalName}}</span></a>
                            </div>
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
    name: "faqView",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  CustomermenuComp,
    },
    data: () => ({
        checkLike : 0,
		faqData: false,
        faqIsNew: false,
		faqCate: {
			'1': '주문/결제',
			'2': '배송/반품/교환',
			'3': '취소/환불',
			'4': '상품',
			'5': '기타'
		}
    }),
    created () {
        this.getFaqDetail();
    },
    methods: {
        async getFaqDetail(){

			let url = '/gooduser/api/v1/faq/detail?id='+this.$route.params.id;
			await axios.get(url).then(res=>{
				this.faqData = res.data.data;
				this.faqData.category = this.faqData.category.replace(/\[/g, '').replace(/\]/g, '').replace(/\"/g, '').replace(/\s/g, '').split(',')
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