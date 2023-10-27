<template>

    <div>
        <!-- 앱 테스트 메인 페이지 / 1초후 이동 -->
        <button @click="getAppPhoneNumber()" style="border: 1px solid #000; padding: 10px; background: #eee;">getUserPhoneInfo()</button>
    </div>

</template>
<script>
import axios from "axios";

window.getFcmTokenResult = function (arg_fcm_token) {
    alert(arg_fcm_token);
    return false; 
}

window.getUserPhoneInfoResult = function(arg_phone_no, arg_user_name) {
    alert(`전화번호: ${arg_phone_no} / 이름: ${arg_user_name}`);
}


export default {
    name: "pageIndexApp",
    components: {
    },
    data: () => ({
    }),
    created () {
    },
    methods: {
        getAppPhoneNumber() {
            alert('click!');
            if (window.HYBRID_ANDROID != null) {
                window.HYBRID_ANDROID.getUserPhoneInfo();
            } if (webkit.messageHandlers.HYBRID_IOS != null) {
                webkit.messageHandlers.HYBRID_IOS.postMessage("getUserPhoneInfo");
            }
        },
    },
    setup() {
    },
    computed: {
    },
    mounted() {
        if (window.HYBRID_ANDROID != null) {
            window.HYBRID_ANDROID.getFcmToken();
        } if (webkit.messageHandlers.HYBRID_IOS != null) {
            webkit.messageHandlers.HYBRID_IOS.postMessage("getFcmToken");
        }
    }
}

</script>
<style scoped>

</style>