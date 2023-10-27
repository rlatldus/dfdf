<template>
    <div id="content">
		<div class="w-set">
			<div class="section">
				<div class="error_area">
					<i></i>
					<strong>요청하신 페이지를 찾을 수 없습니다.</strong>
					<p>이용에 불편을 드려서 죄송합니다.</p>
					<p>메인페이지로 이동 후 원하는 정보에 대한 페이지로</p>
					<p>연결해 주시기 바랍니다.</p>
					<div class="btn_area1">
						<!-- <a href="javascript:;" class="btn btn_dark_gray_solid">이전 페이지</a> -->
						<router-link to="/gooduser" class="btn btn_dark_gray">메인으로 이동</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import HeaderComp from '../../components/HeaderComp.vue';
// import MobileNavComp from '../../components/MobileNavComp.vue';
// import FooterComp from '../../components/FooterComp.vue';
// import MymenuComp from '../../components/MymenuComp.vue';
// import ModalAlert from '../../components/ModalAlert.vue';
export default {
    name: "error404",
    components: {
      HeaderComp,
    //   MobileNavComp,
    //   FooterComp,
    //   MymenuComp,
    //   ModalAlert,
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