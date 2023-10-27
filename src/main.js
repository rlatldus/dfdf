import { createApp } from 'vue';
import { createStore } from 'vuex';
import { router } from './router/router.js';
import 'v-calendar/dist/style.css';
import VCalendar from 'v-calendar';
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import "../src/assets/css/main.css";
import "../src/assets/css/general.css";
import "../src/assets/images/common/general.css"
//
//import VueMoment from 'vue-moment'

//import store from './store'
import App from './App.vue';

const store = createStore({
  state () {
    return {
      userId: null,
      custNo: null,
      userGrade: null,
      tmpToken: null,
      name:null,
      bagId: null,
      imagePath : '/tenant/attachment/view/',
      categoryAll: false,
      category3: false,
    }
  },
  getters:{
    userId: state => {
      return state.userId
    },
    custNo: state => {
      return state.custNo
    },
    userGrade: state => {
      return state.userGrade
    },
    tmpToken: state => {
      return state.tmpToken
    },
    name: state => {
      return state.name
    },
  },
  mutations: {
    auth (state, payload) {
      const {id, custNo, name, grade} = payload
      state.userId = id
      state.custNo = custNo
      state.name = name
      state.grade = grade
    },
    logOut (state) {
      state.userId = null
      state.custNo = null
      state.userGrade = null
      state.name = null
      state.tmpToken = false

      window.localStorage.removeItem('T');
      window.localStorage.removeItem('C');
      window.localStorage.removeItem('I');
      window.localStorage.removeItem('G');
      window.localStorage.removeItem('N');
      window.localStorage.removeItem('TTL');
    },

    setState (state) {
      if(!state.tmpToken){ state.tmpToken= window.localStorage.getItem('T') };
      if(!state.custNo){ state.custNo= window.localStorage.getItem('C') };
      if(!state.userId){ state.userId= window.localStorage.getItem('I') };
      if(!state.userGrade){ state.userGrade= window.localStorage.getItem('G') };
      if(!state.name){ state.name= window.localStorage.getItem('N') };
    }
  },
  actions:{
    auth (context, payload) {
      context.commit('auth', payload)
      
    },

    logOut (context) {
      context.commit('logOut')
    },

    setState () {
      context.commit('setState')
    },
  }
})


const app = createApp(App);
 //app.use(testModule);
 app.use(store);
 app.use(router);
 app.use(VCalendar, {})
 app.use(VueViewer)
 //app.use(VueYoutube)
app.mount('#app');