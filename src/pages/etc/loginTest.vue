<template>
    <div>
        <div>
            <input type="text" id="id" v-model="this.userId" /> 
            <input type="password" id="password" v-model="this.password" /> 
            <div id="naver_id_login" @click="naverlogin">네이버 로그인</div>

            <button @click="login">로그인</button>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "loginTest",
    components: {
      
    },
    data: () => ({
      userId: null,
      password: null,
      client_id : 'webbizfixel',
      client_secret : 'golfgoodshop2022!@#',  
    }),
    mounted() {
        const script = document.createElement("script");
        script.src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";
        document.head.appendChild(script);
        //const naver_id_login = new window.naver_id_login("SYhAvGhnYw4Ri9k47w6u", "/callbackTest");
        
    },
    methods:{

/*

첫번쨰 보내야 하는곳 
client_id : webbizfixel


요청 URL        : 품질 PC           https://qa.golfsamsung.com/web/join.do?method=loginMav 
                          품질모바일  https://qa.golfsamsung.com/appMain.do?method=appLogin

                       : 운영PC      https://www.golfsamsung.com/web/join.do?method=loginMav
                         운영모바일  https://www.golfsamsung.com/appMain.do?method=appLogin

                         
두번째로 보내야 하는곳 
요청 URL        : 품질 PC           https://qa.golfsamsung.com/web/joinToken.do?method=loginMavToken
                          품질모바일  https://qa.golfsamsung.com/appMainToken.do?method=appLoginToken

                       : 운영PC      https://www.golfsamsung.com/web/joinToken.do?method=loginMavToken
                         운영모바일  https://www.golfsamsung.com/appMainToken.do?method=appLoginToken

client_secret : golfgoodshop2022!@#
*/

        naverlogin(){
            const naver_id_login = new window.naver_id_login("SYhAvGhnYw4Ri9k47w6u", "/callbackTest");
            
            const state = naver_id_login.getUniqState();
            naver_id_login.setButton("white", 2,40);
            naver_id_login.setState(state); 
            naver_id_login.setPopup();
            naver_id_login.init_naver_id_login();
            
        // var url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id='+this.client_id+'&redirect_uri='+this.callbackUrl+'&state=1234';`
        // window.location.replace(url);
        },

        login () {
            var url = `/web/join.do?method=`+this.client_id;
            //https://qa.golfsamsung.com/web/joinToken.do?method=loginMavToken
            let data = { userId : this.userId, password : this.password };
            data = "userId="+this.userId+ "&password=" + this.password;
            axios.get(url)
            .then(function (res) {
            })
            .catch(function (err) {
                console.log(err.message);
                alert(err.message);
            });
        }

    }
}

</script>
