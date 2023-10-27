<template>
    <div>
        <HeaderComp :headerCase="'sub'" :pageName="'페이지명 입력'" />

        <div id="content" class="w-set">
            <ModalAlert
                v-if="this.modal1"
                :text="'테스트 텍스트'"
                :type="'confirm'"
                @confirm="childRendered"
                @close="this.modal1 = false"
            />
            <ModalAlert
                v-if="this.modal2"
                :text="'테스트 텍스트 2'"
                :type="'alert'"
                @close="this.modal2 = false"
            />
            <ModalAlert
                v-if="this.modal3"
                :text="['여러개<br> 출력되는', '텍스트 모음입니다', '여러개 들어갑니다']"
                :type="'alert'"
                @close="this.modal3 = false"
            />

            <button @click="this.modal1 = true">버튼 1</button>
            <button @click="this.modal2 = true">버튼 2</button>
            <button @click="this.modal3 = true">버튼 3</button>
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
import ModalAlert from '../../components/ModalAlert.vue';
export default {
    name: "etcIndex",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
      MymenuComp,
      ModalAlert,
    },
    data: () => ({
		modal1: false,
        modal2: false,
        modal3: false,
    }),
    created () {
        this.setState();
    },
    methods: {
        childRendered(params) {
            alert(params);
            this.modal1 = false;
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