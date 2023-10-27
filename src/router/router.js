import { createWebHistory, createRouter } from 'vue-router';
const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: "notFound",
        component: () => import('../pages/etc/error404.vue')
        //404 페이지 붙이면 됨
    },
    {
        path: "/404",
        name: "cannotFound",
        component: () => import('../pages/etc/error404.vue'),
        //404 페이지 붙이면 됨
    },
    {
      path: '/gooduser',
      name: 'Home',
      component: () => import('../pages/main/index.vue'), // 동적 import
    },
    {
        path: '/gooduserapp',
        name: 'HomeApp',
        component: () => import('../pages/main/indexApp.vue'), // 동적 import
    },
    {
        path: '/gooduser/loginTest',
        name: 'loginTest',
        component: () => import('../pages/etc/loginTest.vue'), // 동적 import
    },
    {
        path: '/gooduser/callback',
        name: 'callback',
        component: () => import('../pages/etc/callback.vue'), // 동적 import
    },
    {
        path: '/gooduser/policy/service',
        name: 'service',
        component: () => import('../pages/policy/service.vue'),

    },
    {
        path: '/gooduser/goodslist/list/:id/:search?',
        name: 'goodslist',
        component: () => import('../pages/goodslist/index.vue'),
    },
    {
        path: '/gooduser/goodslist/detail/:id',
        name: 'goodslist_detail',
        component: () => import('../pages/goodslist/detail2.vue'),
    },
    {
        path: '/gooduser/cartview/cartview/:pickup?',
        name: 'cartview',
        component: () => import('../pages/cartview/index2.vue'),
    },
    {
        path: '/gooduser/cartview/productorder/:buyType',
        name: 'product_order',
        component: () => import('../pages/cartview/product_order2.vue'),
    },
    
    {
        path: '/gooduser/cartview/orderfinish/:id',
        name: 'order_finish',
        component: () => import('../pages/cartview/order_finish.vue'),
    },

    {
        path: '/gooduser/mypage/mydashboard',
        name: 'mydashboard',
        component: () => import('../pages/mypage/mydashboard.vue'),
    },
    {
        path: '/gooduser/mypage/mywish1',
        name: 'myWish1',
        component: () => import('../pages/mypage/mywish1.vue'),
    },
    {
        path: '/gooduser/mypage/mywish2',
        name: 'myWish2',
        component: () => import('../pages/mypage/mywish2.vue'),
    },
    {
        path: '/gooduser/mypage/myaddr',
        name: 'myaddr',
        component: () => import('../pages/mypage/myaddr.vue'),
    },{
        path: '/gooduser/mypage/myaddrwrite/:id',
        name: 'myaddrwrite',
        component: () => import('../pages/mypage/myaddrwrite.vue'),
    },
    {
        path: '/gooduser/mypage/myrestockinfo',
        name: 'myrestockinfo',
        component: () => import('../pages/mypage/myrestockinfo.vue'),
    },
    {
        path: '/gooduser/mypage/mycanclelist', 
        name: 'mycanclelist',
        component: () => import('../pages/mypage/mycanclelist.vue'),
    },
    {
        path: '/gooduser/mypage/myorder1',
        name: 'myorder1',
        component: () => import('../pages/mypage/myorder1.vue'),
    },
    {
        path: '/gooduser/mypage/myorder2',
        name: 'myorder2',
        component: () => import('../pages/mypage/myorder2.vue'),
    },
    {
        path: '/gooduser/mypage/myorderdetail/:id',
        name: 'myorderdetail',
        component: () => import('../pages/mypage/myorderdetail.vue'),
    },
    {
        path: '/gooduser/mypage/myreviewlist',
        name: 'myreviewlist',
        component: () => import('../pages/mypage/myreviewlist.vue'),
    },
    {
        path: '/gooduser/mypage/myreviewlist2',
        name: 'myreviewlist2',
        component: () => import('../pages/mypage/myreviewlist2.vue'),
    },
    {
        path: '/gooduser/mypage/myqnalist',
        name: 'myqnalist',
        component: () => import('../pages/mypage/myqnalist.vue'),
    },
    {
        path: '/gooduser/mypage/mypresent1',
        name: 'mypresent1',
        component: () => import('../pages/mypage/mypresent1.vue'),
    },
    {
        path: '/gooduser/mypage/mypresent2',
        name: 'mypresent2',
        component: () => import('../pages/mypage/mypresent2.vue'),
    },
    {
        path: '/gooduser/mypage/myalert',
        name: 'myalert',
        component: () => import('../pages/mypage/myalert.vue'),
    },
    {
        path: '/gooduser/promotion/brand/brand',
        name: 'promotionbrand',
        component: () => import('../pages/promotion/promotionbrand.vue'),
    },
    {
        path: '/gooduser/promotion/brand/list/:id',
        name: 'promotionbranddetail',
        component: () => import('../pages/promotion/promotionbranddetail.vue'),
    },
    {
        path: '/gooduser/promotion/best',
        name: 'promotionbest',
        component: () => import('../pages/promotion/promotionbest.vue'),
    },
    {
        path: '/gooduser/promotion/event',
        name: 'promotionevent',
        component: () => import('../pages/promotion/promotionevent.vue'),
    },
    {
        path: '/gooduser/promotion/eventdetail/:id',
        name: 'promotioneventdetail',
        component: () => import('../pages/promotion/promotioneventdetail.vue'),
    },
    {
        path: '/gooduser/promotion/hottag',
        name: 'promotionhottag',
        component: () => import('../pages/promotion/promotionlist.vue'),
    },
    {
        path: '/gooduser/promotion/hottagnmdetail/:id',
        name: 'hottagnmdetail',
        component: () => import('../pages/promotion/hottagnmdetail.vue'),
    },
    {
        path: '/gooduser/promotion/hottaghtdetail/:id',
        name: 'hottaghtdetail',
        component: () => import('../pages/promotion/hottaghtdetail.vue'),
    },
    {
        path: '/gooduser/promotion/golftv',
        name: 'promotiongolftv',
        component: () => import('../pages/promotion/promotiongolftv.vue'),
    },
    {
        path: '/gooduser/promotion/golftvdetail/:id',
        name: 'promotiongolftvdetail',
        component: () => import('../pages/promotion/promotiongolftvdetail.vue'),
    },
    {
        path: '/gooduser/customer/allianceqnaview',
        name: 'allianceqnaview',
        component: () => import('../pages/customercenter/allianceqnaview.vue'),
    },
    {
        path: '/gooduser/customer/faqlist',
        name: 'faqlist',
        component: () => import('../pages/customercenter/faqlist.vue'),
    },
    {
        path: '/gooduser/customer/faqview/:id',
        name: 'faqview',
        component: () => import('../pages/customercenter/faqview.vue'),
    },
    {
        path: '/gooduser/customer/noticelist',
        name: 'noticelist',
        component: () => import('../pages/customercenter/noticelist.vue'),
    },
    {
        path: '/gooduser/customer/noticeview/:id',
        name: 'noticeview',
        
        component: () => import('../pages/customercenter/noticeview.vue'),
    },
    
    {
        path: '/gooduser/promotion',
        name: 'promotion',
        component: () => import('../pages/promotion/index.vue'),
    },
    
    
    {
        path: '/gooduser/promotion',
        name: 'promotion',
        component: () => import('../pages/promotion/index.vue'),
    },
    {
        path: '/gooduser/etc',
        name: 'etc',
        component: () => import('../pages/etc/index.vue'),
    },
    {
        path: '/gooduser/etc/categorymen',
        name: 'categorymen',
        component: () => import('../pages/etc/categorymen.vue'),
    },
    {
        path: '/gooduser/etc/categorywomen',
        name: 'categorywomen',
        component: () => import('../pages/etc/categorywomen.vue'),
    },
    {
        path: '/gooduser/etc/payload',
        name: 'payload',
        component: () => import('../pages/etc/payload.vue'),
    },
    {
        path: '/gooduser/etc/gift/giftcert',
        name: 'present',
        component: () => import('../pages/etc/present.vue'),
    },
    {
        path: '/gooduser/etc/gift/giftcertok/:presentId',
        name: 'presentdataok',
        component: () => import('../pages/etc/presentdataok.vue'),
    },
    {
        path: '/gooduser/etc/gift/:presentId',
        name: 'present2',
        component: () => import('../pages/etc/payload.vue'),
    },

    {
        path: '/gooduser/gift/giftCert',
        name: 'present',
        component: () => import('../pages/gift/giftCert.vue'),
    },
    {
        path: '/gooduser/gift/giftRefuse',
        name: 'presentRefuse',
        component: () => import('../pages/gift/giftRefuse.vue'),
    },
    {
        path: '/gooduser/gift/giftcertok/:presentId',
        name: 'presentdataok',
        component: () => import('../pages/gift/presentdataok.vue'),
    },
    // {
    //     path: '/gooduser/goodslist/detail2/:id',
    //     name: 'goodslist_detail2',
    //     component: () => import('../pages/goodslist/detail2.vue'),
    // },
    // {
    //     path: '/gooduser/cartview/cartview2/:pickup?',
    //     name: 'cartview2',
    //     component: () => import('../pages/cartview/index2.vue'),
    // },
    // {
    //     path: '/gooduser/cartview/productorder2/:buyType',
    //     name: 'product_order2',
    //     component: () => import('../pages/cartview/product_order2.vue'),
    // },
  ];




// router.beforeEach(async (to, from, next) => {
//     const token = Vue.$cookies.get('token')
//     const {matched} = to

//     const isUnauthorized = matched.some(record => record.meta.unauthorized)
//     if (isUnauthorized || token)  return next()

//     return next('/gooduser/login')
// })

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition){
        if (savedPosition) {
            let stack = 0;
            let intervalEvent = function () {
                if (stack == 0) {
                    window.scrollTo({top: savedPosition.top});
                    console.log('scroll first');
                }
                if (stack > 100) {
                    clearInterval(intervalTarget);
                    window.scrollTo({top: savedPosition.top});
                    console.log('scroll fail');
                }
                if ( (document.body.scrollHeight - window.innerHeight) > savedPosition.top ) {
                    clearInterval(intervalTarget);
                    window.scrollTo({top: savedPosition.top});
                    console.log('scroll ok');
                }
                stack++;
            }

            let intervalTarget = setInterval(() => {
                intervalEvent();
            }, 100);
        } else {
            window.scrollTo({top: 0});
            return { x: 0, y: 0 }
        }
    },
  });
