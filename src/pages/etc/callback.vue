<template>
    <div>
        <div>
          <button id="tokensendok" @click="setAppTocken()" style="display: none;">토큰 요청 버튼</button>
        </div>
    </div>
</template>
<script>

import axios from "axios";
import moment from "moment";

// 어플 토큰 저장
// let logintoken = '';
window.getFcmTokenResult = async function (arg_fcm_token) {
  let url = '/gooduser/api/v1/token/save';
  let sendData = {
    token: arg_fcm_token,
  }
  await axios.post(url, sendData).then(res=>{
      console.log(res);
      document.querySelector('#tokensendok').click();
  }).catch(function (err) {
    console.log(err.message);
    alert(err.message);
  });
}


export default {
    name: "callback",
    data: () => ({
      authArry: null,
      descript: null,
      title : 'webbizfixel',
      modalShow : 'golfgoodshop2022!@#',
      getPram : null,
      userD : null,
      pending: 0  
    }),
    mounted(){
      this.login();
    },
    created(){
      this.getPram = this.$route.query.userId
    },
    methods:{
      
        async login () {
          let tmp = {tokenNo : this.getPram}
          this.$store.state.tmpToken = this.getPram
              let url = `/gooduser/api/v3/login_chk_golfsamsung`
              await axios.post(url,tmp)
              .then(res=> {
                let tmpData = res.data
                this.userD = tmpData

                this.$store.dispatch('auth', this.userD)
                window.localStorage.setItem('T',this.getPram)
                window.localStorage.setItem('C',tmpData.custNo)
                window.localStorage.setItem('I',tmpData.id)
                window.localStorage.setItem('G',tmpData.grade==='J1'?'VIP':tmpData.grade==='VIP'?'VIP':tmpData.grade)
                window.localStorage.setItem('N',tmpData.name)
                window.localStorage.setItem('TTL', moment().format('YYYY-MM-DD hh:mm:ss'));

                if (window?.HYBRID_ANDROID) {
                  window.HYBRID_ANDROID.getFcmToken();
                  return false;
                } if (typeof webkit != 'undefined') {
                  if (webkit?.messageHandlers?.HYBRID_IOS) {
                    webkit.messageHandlers.HYBRID_IOS.postMessage("getFcmToken");
                    return false;
                  }
                }

                this.pending = 1
                if (this.pending===1){
                  this.$router.push({
                    path : `/gooduser`
                  })
                }

              })
              .catch(function (err) {
                  console.log(err.message);
                  alert(err.message);

                  this.pending = 1
                  if (this.pending===1){
                    this.$router.push({
                      path : `/gooduser`
                    })
                  }
              });
        },
        async setAppTocken() {
          this.pending = 1
          if (this.pending===1){
            this.$router.push({
              path : `/gooduser`
            });
          }
        },

    }
}

</script>
