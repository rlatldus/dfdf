<template>
    <div id="best" class="main-sec main-sec-best w-set">
        <div class="main-title">
            <p class="title mont"><b>BEST</b> ITEM</p>
            <p class="desc">굿샵에서 뽑은 나만의 BEST RANKING</p>
        </div>

        <div class="best-tab-area">
            <div class="best-tab">
                <button type="button" :class="{'on' : this.bestTabD01 == 'M'}" @click="this.setBestItemKey('M', 'B')">남성</button>
                <button type="button" :class="{'on' : this.bestTabD01 == 'W'}" @click="this.setBestItemKey('W', 'B')">여성</button>
                <button type="button" :class="{'on' : this.bestTabD01 == 'L'}" @click="this.setBestItemKey('L', 'B')">생활용품</button>
            </div>
            <div class="best-tab-cont">
                <div class="inner-tab-01">
                    <button type="button" class="" :class="{'on' : this.bestTabD02 == 'B'}" @click="this.setBestItemKey(null, 'B')">구매가 많은 <b>상품</b></button>
                    <button type="button" class="" :class="{'on' : this.bestTabD02 == 'F'}" @click="this.setBestItemKey(null, 'F')">찜을 한 <b>상품</b></button>
                </div>

                <!-- 남성 - 구매 -->
                <ul class="goods-list grid-4 m-grid-2 type-main">
					<li class="goods-item swiper-slide" v-for="(item, index) in this.showCollectItem" :key="index">
						<div class="pic">
                            <a href="javascript:;" @click="move_To_Product_Detail(item.productId)">
                                <img :src="item.mainImageUrl" :alt="item.mainImageUrl">
                            </a>
                        </div>
                        <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(item.productId)">
                            <span class="goods-name">
                                <strong class="name">{{item.textName}}</strong>
                            </span>
                            <span class="goods-price" v-if="this.userGrade != 'VIP'">
                                <span class="orig"><em class="num">{{threeCommaAdd(item.normalPrice)}}</em>원</span>
                                <span class="price-box">
                                    <span class="discount"><em class="num">{{Math.ceil(Number(item.normalSalePercent))}}</em>%</span>
                                    <span class="price"><em class="num">{{threeCommaAdd(item.normalSellingPrice)}}</em>원</span>
                                </span>
                            </span>
                            <span class="goods-price" v-else>
                                <span class="orig"><em class="num">{{threeCommaAdd(item.vipNormalPrice)}}</em>원</span>
                                <span class="price-box">
                                    <span class="discount"><em class="num">{{Math.ceil(Number(item.vipSalePercent))}}</em>%</span>
                                    <span class="price"><em class="num">{{threeCommaAdd(item.vipSellingPrice)}}</em>원</span>
                                </span>
                            </span>
                            <span class="goods-tag">
                                <em class="tag type-free" v-if="item.shippingFree == 'Y'">무료배송</em>
                                <em class="tag type-new" v-if="item.isNew == 'Y'">NEW</em>
                                <em class="tag type-best" v-if="item.isBest == 'Y'">BEST</em>
                            </span>
                        </a>
					</li>
				</ul>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "bestItemComp",
    data: () => ({
        userId: null,
        userGrade: null,

        // TODO: 추후 모듈별 로딩을 확인후 pending 처리를 해야할것같음. 현재는 임시로 3초후 로딩 완료 처리중
        pending: true,
        pendingFirstLoad: false,
        //item 
        bestTabD01: 'M',
        bestTabD02: 'B',
		setKey: 'MB',

		bestItemObject: {
			'MB': []
		},
		showCollectItem: [],
    }),
    created(){
        this.$store.commit('setState');
		this.userId = this.$store.state.userId;
        this.userGrade = localStorage.getItem('G');

		// 초기 키는 M, W로 로딩
        this.setState();
		this.getBestItem();
        
    },
    methods: {
		// util
        threeCommaAdd(n){
            return (n || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

		async getBestItem() {
            this.setState();
			let url = '/gooduser/api/v1/main_api/best/list';
			let setData = {
				firstType: this.bestTabD01,
				secondType: this.bestTabD02
			};

			await axios({
				'method': 'POST',
				'url': url,
				'data': setData,
			}).then(res=>{
				this.bestItemObject[this.setKey] = res.data.data;
				this.showCollectItem = this.bestItemObject[this.setKey];
			});
		},
		setBestItemKey(key1, key2) {
			if (key1) {
				this.bestTabD01 = key1;
			}
			if (key2) {
				this.bestTabD02 = key2;
			}
			
			this.setKey = this.bestTabD01 + this.bestTabD02;
			// 데이터가 없는경우 새로 로딩
			
				this.getBestItem();
			 
		},
        async setState(){
            let url = `/gooduser/api/v1/check_session`
            let ckData= {}
            await axios.post(url,ckData).then(res=>{
                if(res.data.data !='TRUE' && localStorage.getItem('I')!= null ){
                    this.userGrade = null
                    this.$store.commit('logOut');
                    // console.log('case1');
                }else if(localStorage.getItem('I')== null && res.data.data =='TRUE'){
                    this.userGrade = null;
                    this.$store.commit('logOut');
                    // console.log('case2');
                }else if(res.data.data == 'FALSE'){
                    // 세션 false인 케이스
                    this.userGrade = null;
                    this.$store.commit('logOut');
                    // console.log('case3: session false');
                }else{
                    // 세션 false인 케이스
                    //console.log('case4: else');
                }

                this.userId = this.$store.state.userId;
                this.userGrade = localStorage.getItem('G');

                // console.log(this.userGrade);
            })
        },
        move_To_Product_Detail(idx){
			this.$router.push({
			    path : `/gooduser/goodslist/detail/${idx}`
			})
		},
    }
}

</script>