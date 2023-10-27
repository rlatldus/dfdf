<template>
    <div>
    <HeaderComp />
	<div id="content">
		<div class="tab_area type-best">
			<!-- 브랜드 타이틀 -->
			<h2 class="promotion-brand-name w-set for-pc">베스트</h2>
			<!-- 브랜드 타이틀 끝 -->

			<div class="w-set">
				<ul class="tab_type_01">
					<!--여기-->
					<li :class="tabToggle===1? 'on' : ''" @click="switchTab(1)"><a href="javascript:;" >골프</a></li>
					<li :class="tabToggle===2? 'on' : ''" @click="switchTab(2)"><a href="javascript:;" >생활용품/선물</a></li>
				</ul>
			</div>
			<!--여기-->
			<div class="tab_box on" v-if="tabToggle===1">
				<!--"-->
				<!-- 탭 내부 카테고리 -->
				<div class="best-sort w-set">
					<ul class="brand-cate">
						
						<li :class="cateNo===1?'on':''"><a href="javascript:;" @click="this.itemLoad(1)">전체</a></li>
						<li :class="cateNo===golfidx.id?'on':''" v-for="(golfidx,index) in golfCategoryArr" :key="index"><a href="javascript:;" @click="this.itemLoad(golfidx.id)">{{golfidx.name}}</a></li>
						
					</ul>
					<!-- <select name="asdf" id="asdf">
						<option value="1">구매 많은 순</option>
						<option value="1">구매 많은 순</option>
						<option value="1">구매 많은 순</option>
						<option value="1">구매 많은 순</option>
					</select> -->
				</div>
				<!-- 탭 내부 카테고리 끝 -->

				<!-- 상단 베스트 1 - 5 -->
				<div class="best-top-wrap" v-if="bestItem?.length > 0">
					<div class="best-top-flex w-set">
						<ul class="goods-list gird-best has-bg">
							<li class="goods-item">
								<p class="rank mont">01</p>
								<div class="pic">
									<div class="like">
										<input
											type="checkbox"
											:name="'itemlike'+firstItem.productId"
											:id="'itemlike'+firstItem.productId"
											:checked="checkLike === 1 ? true : false"
											@change="addLike(firstItem.productId, firstItem.brandId, $event)"
										>
										<!--
											TODO:
											찜 등록 이벤트
											아이템 ID, 체크 상태, 회원ID(현재 11로 고정, 추후 변경 요청)
										-->
										<label :for="'itemlike'+firstItem.productId">찜하기</label>
									</div>
									<a href="javascript:;" @click="move_To_Product_Detail(firstItem.productId)">
										<img :src="firstItem.mainImageUrl" :alt="firstItem.mainImageUrl">
									</a>
								</div>
								<a href="javascript:;" class="goods-info">
									<span class="goods-name">
										<strong class="brand">{{firstItem.manufacturer}}</strong>
										<strong class="name" @click="move_To_Product_Detail( firstItem.productId)">{{firstItem.textName}}</strong>
									</span>
									<span class="goods-price">
										<span class="orig"><em class="num">{{userGrade=='VIP'? threeCommaAdd(firstItem.vipNormalPrice) : threeCommaAdd(firstItem.normalPrice)}}</em>원</span>
										<span class="price-box">
											<span class="discount"><em class="num">{{Math.ceil(Number(userGrade=='VIP'? firstItem.vipSalePercent : firstItem.normalSalePercent))}}</em>%</span>
											<span class="price"><em class="num">{{userGrade=='VIP'?  threeCommaAdd(firstItem.vipSellingPrice) : threeCommaAdd(firstItem.normalSellingPrice)}}</em>원</span>
										</span>
									</span>
								</a>
							</li>
							<li class="goods-item" v-for="(item,index) in middleItem" :key="index">
								<p class="rank mont">{{index+2}}</p>
								<div class="pic">
									<div class="like">
										<input
											type="checkbox"
											:name="'itemlike'+item.productId"
											:id="'itemlike'+item.productId"
											:checked="checkLike === 1 ? true : false"
											@change="addLike(item.productId, item.brandId, $event)"
										>
										<!--
											TODO:
											찜 등록 이벤트
											아이템 ID, 체크 상태, 회원ID(현재 11로 고정, 추후 변경 요청)
										-->
										<label :for="'itemlike'+item.productId">찜하기</label>
									</div>
									<a href="javascript:;" @click="move_To_Product_Detail(item.productId)">
										<img :src="item.mainImageUrl" :alt="item.mainImageUrl">
									</a>
								</div>
								<a href="javascript:;" class="goods-info">
									<span class="goods-name">
										<strong class="brand">{{item.manufacturer}}</strong>
										<strong class="name" @click="move_To_Product_Detail(item.productId)" style="cursor: pointer;">{{item.textName}}</strong>
									</span>
									<span class="goods-price">
										<span class="orig"><em class="num">{{userGrade=='VIP'? threeCommaAdd(item.vipNormalPrice) : threeCommaAdd(item.normalPrice)}}</em>원</span>
										<span class="price-box">
											<span class="discount"><em class="num">{{Math.ceil(Number(userGrade=='VIP'?  item.vipSalePercent : item.normalSalePercent))}}</em>%</span>
											<span class="price"><em class="num">{{userGrade=='VIP'?  threeCommaAdd(item.vipSellingPrice) : threeCommaAdd(item.normalSellingPrice)}}</em>원</span>
										</span>
									</span>
								</a>
							</li>
							
						</ul>
					</div>
				</div>
				<!-- 상단 베스트 1 - 5 끝 -->

				<div class="w-set" v-if="bestItem?.length > 0">
					<ul class="goods-list grid-5 m-grid-2">
						<li class="goods-item" v-for="(item,index) in otherItem" :key="index">
							<p class="rank mont">{{index+6}}</p>
							<div class="pic">
								<div class="like">
									<input
										type="checkbox"
										:name="'itemlike'+item.productId"
										:id="'itemlike'+item.productId"
										:checked="checkLike === 1 ? true : false"
										@change="addLike(item.productId, item.brandId, $event)"
									>
									<!--
										TODO:
										찜 등록 이벤트
										아이템 ID, 체크 상태, 회원ID(현재 11로 고정, 추후 변경 요청)
									-->
									<label :for="'itemlike'+item.productId">찜하기</label>
								</div>
								<a href="javascript:;" @click="move_To_Product_Detail(item.productId)">
									<img :src="item.mainImageUrl" :alt="item.mainImageUrl">
								</a>
							</div>
							<a href="javascript:;" class="goods-info">
								<span class="goods-name">
									<strong class="brand">{{item.manufacturer}}</strong>
									<strong class="name" @click="move_To_Product_Detail(item.productId)" style="cursor: pointer;">{{item.textName}}</strong>
								</span>
								<span class="goods-price">
										<span class="orig"><em class="num">{{userGrade=='VIP'? threeCommaAdd(item.vipNormalPrice) : threeCommaAdd(item.normalPrice)}}</em>원</span>
										<span class="price-box">
											<span class="discount"><em class="num">{{Math.ceil(Number(userGrade=='VIP'?  item.vipSalePercent : item.normalSalePercent))}}</em>%</span>
											<span class="price"><em class="num">{{userGrade=='VIP'?  threeCommaAdd(item.vipSellingPrice) : threeCommaAdd(item.normalSellingPrice)}}</em>원</span>
										</span>
									</span>
								<span class="goods-star">
									<em class="point">{{item.reviewStarPoint}}</em>
									<em class="count">({{item.reviewCount}})</em>
								</span>
								<span class="goods-tag">
									<em v-if="item.shippingFree ==='Y'" class="tag type-free">무료배송</em>
									<em v-if="item.isBest ==='Y'" class="tag type-new">NEW</em>
									<em v-if="item.isBest ==='Y'" class="tag type-best">BEST</em>
									<em v-if="item.salesPeriod ==='Y'" class="tag type-event">이벤트</em>
								</span>
							</a>
						</li>
						
					</ul>
				</div>
			</div>
			<!--여기-->
			<div class="tab_box on" v-if="tabToggle===2">
				<!-- 탭 내부 카테고리 -->
				<div class="best-sort w-set">
					<ul class="brand-cate">
						<li :class="cateNo===2?'on':''"><a href="javascript:;" @click="this.itemLoad(2)">전체</a></li>
						<li :class="cateNo===livingidx.id?'on':''" v-for="(livingidx,index) in livingCategoryArr" :key="index"><a href="javascript:;" @click="this.itemLoad(livingidx.id)">{{livingidx.name}}</a></li>
					</ul>
					<!-- <select name="asdf" id="asdf">
						<option value="1">구매 많은 순</option>
						<option value="1">구매 많은 순</option>
						<option value="1">구매 많은 순</option>
						<option value="1">구매 많은 순</option>
					</select> -->
				</div>
				<!-- 탭 내부 카테고리 끝 -->

				<!-- 상단 베스트 1 - 5 -->
				<div class="best-top-wrap" v-if="bestItem?.length > 0">
					<div class="best-top-flex w-set">
						<ul class="goods-list gird-best has-bg">
							<li class="goods-item">
								<p class="rank mont">01</p>
								<div class="pic">
									<div class="like">
										<input
											type="checkbox"
											:name="'itemlike'+firstItem.productId"
											:id="'itemlike'+firstItem.productId"
											:checked="checkLike === 1 ? true : false"
											@change="addLike(firstItem.productId, firstItem.brandId, $event)"
										>
										<!--
											TODO:
											찜 등록 이벤트
											아이템 ID, 체크 상태, 회원ID(현재 11로 고정, 추후 변경 요청)
										-->
										<label :for="'itemlike'+firstItem.productId">찜하기</label>
									</div>
									<a href="javascript:;" @click="move_To_Product_Detail(firstItem.productId)">
										<img :src="firstItem.mainImageUrl" :alt="firstItem.mainImageUrl">
									</a>
								</div>
								<a href="javascript:;" class="goods-info">
									<span class="goods-name">
										<strong class="brand">{{firstItem.manufacturer}}</strong>
										<strong class="name" @click="move_To_Product_Detail( firstItem.productId)">{{firstItem.textName}}</strong>
									</span>
									<span class="goods-price">
										<span class="orig"><em class="num">{{userGrade=='VIP'? threeCommaAdd(firstItem.vipNormalPrice) : threeCommaAdd(firstItem.normalPrice)}}</em>원</span>
										<span class="price-box">
											<span class="discount"><em class="num">{{Math.ceil(Number(userGrade=='VIP'?  firstItem.vipSalePercent : firstItem.normalSalePercent))}}</em>%</span>
											<span class="price"><em class="num">{{userGrade=='VIP'?  threeCommaAdd(firstItem.vipSellingPrice) : threeCommaAdd(firstItem.normalSellingPrice)}}</em>원</span>
										</span>
									</span>
								</a>
							</li>
							<li class="goods-item" v-for="(item,index) in middleItem" :key="index">
								<p class="rank mont">{{index+2}}</p>
								<div class="pic">
									<div class="like">
										<input
											type="checkbox"
											:name="'itemlike'+item.productId"
											:id="'itemlike'+item.productId"
											:checked="checkLike === 1 ? true : false"
											@change="addLike(item.productId, item.brandId, $event)"
										>
										<!--
											TODO:
											찜 등록 이벤트
											아이템 ID, 체크 상태, 회원ID(현재 11로 고정, 추후 변경 요청)
										-->
										<label :for="'itemlike'+item.productId">찜하기</label>
									</div>
									<a href="javascript:;" @click="move_To_Product_Detail(item.productId)">
										<img :src="item.mainImageUrl" :alt="item.mainImageUrl">
									</a>
								</div>
								<a href="javascript:;" class="goods-info">
									<span class="goods-name">
										<strong class="brand">{{item.manufacturer}}</strong>
										<strong class="name" @click="move_To_Product_Detail(item.productId)" style="cursor: pointer;">{{item.textName}}</strong>
									</span>
									<span class="goods-price">
										<span class="orig"><em class="num">{{userGrade=='VIP'? threeCommaAdd(item.vipNormalPrice) : threeCommaAdd(item.normalPrice)}}</em>원</span>
										<span class="price-box">
											<span class="discount"><em class="num">{{Math.ceil(Number(userGrade=='VIP'?  item.vipSalePercent : item.normalSalePercent))}}</em>%</span>
											<span class="price"><em class="num">{{userGrade=='VIP'?  threeCommaAdd(item.vipSellingPrice) : threeCommaAdd(item.normalSellingPrice)}}</em>원</span>
										</span>
									</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<!-- 상단 베스트 1 - 5 끝 -->

				<div class="w-set" v-if="bestItem?.length > 0">
					<ul class="goods-list grid-5 m-grid-2">
						<li class="goods-item" v-for="(item,index) in otherItem" :key="index">
							<p class="rank mont">{{index+6}}</p>
							<div class="pic">
								<div class="like">
									<input
										type="checkbox"
										:name="'itemlike'+item.productId"
										:id="'itemlike'+item.productId"
										:checked="checkLike === 1 ? true : false"
										@change="addLike(item.productId, item.brandId, $event)"
									>
									<!--
										TODO:
										찜 등록 이벤트
										아이템 ID, 체크 상태, 회원ID(현재 11로 고정, 추후 변경 요청)
									-->
									<label :for="'itemlike'+item.productId">찜하기</label>
								</div>
								<a href="javascript:;" @click="move_To_Product_Detail(item.productId)">
									<img :src="item.mainImageUrl" :alt="item.mainImageUrl">
								</a>
							</div>
							<a href="javascript:;" class="goods-info">
								<span class="goods-name">
									<strong class="brand">{{item.manufacturer}}</strong>
									<strong class="name" @click="move_To_Product_Detail(item.productId)" style="cursor: pointer;">{{item.textName}}</strong>
								</span>
								<span class="goods-price">
										<span class="orig"><em class="num">{{userGrade=='VIP'? threeCommaAdd(item.vipNormalPrice) : threeCommaAdd(item.normalPrice)}}</em>원</span>
										<span class="price-box">
											<span class="discount"><em class="num">{{Math.ceil(Number(userGrade=='VIP'?  item.vipSalePercent : item.normalSalePercent))}}</em>%</span>
											<span class="price"><em class="num">{{userGrade=='VIP'?  threeCommaAdd(item.vipSellingPrice) : threeCommaAdd(item.normalSellingPrice)}}</em>원</span>
										</span>
									</span>
								<span class="goods-star">
									<em class="point">{{item.reviewStarPoint}}</em>
									<em class="count">({{item.reviewCount}})</em>
								</span>
								<span class="goods-tag">
									<em v-if="item.shippingFree ==='Y'" class="tag type-free">무료배송</em>
									<em v-if="item.isBest ==='Y'" class="tag type-new">NEW</em>
									<em v-if="item.isBest ==='Y'" class="tag type-best">BEST</em>
									<em v-if="item.salesPeriod ==='Y'" class="tag type-event">이벤트</em>
								</span>
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="content_none" v-if=" bestItem?.length == 0"><i></i><p>베스트 상품이 없습니다.</p></div>
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
import axios from "axios";
export default {
    name: "promotionBest",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
    },
    data: () => ({
        checkLike : 0,
		tabToggle : 1,
        golfCategoryArr: null,
		livingCategoryArr: null,
		cateNo: 1,
		bestItem: null,
		firstItem: null,
		middleItem: [],
		otherItem: [],
		linkMove: false,
		userGrade: localStorage.getItem('G'),


    }),
    created () {
        this.cateLoad()
		this.itemLoad(1)
		
    },
    methods: {
		//여기
		switchTab(num){
			
			this.tabToggle = num
			this.cateNo = num
			this.itemLoad(num)
		},
		async cateLoad(){
			let url = '/gooduser/api/v1/category_api'
			await axios.get(url).then(res=>{
				
				let cateData = res.data.data
				this.$store.state.categoryAll = res.data.data;
				this.categoryArr = cateData
				//console.log(this.categoryArr)
				let tmpData1 = this.categoryArr.filter(cd=>{
					return cd.groups === 1 && cd.depth === 2
				});
				this.golfCategoryArr = tmpData1
				let tmpData3 = this.categoryArr.filter(cd=>{
		 			return cd.groups === 2 && cd.depth === 2
				});
				this.livingCategoryArr = tmpData3;
				
			})
		},
		async itemLoad(value){
			this.firstItem = null
			this.middleItem = []
			this.otherItem = []
			this.cateNo = value
			// let url = '/gooduser/api/v1/promotion_api/best/list'
            let url = '/gooduser/api/v1/product_api/best'
			let reqData={
				userId: localStorage.getItem('I'),
				categoryId: this.cateNo,
				grade: localStorage.getItem('G'),
			}
			await axios.post(url,reqData).then(res=>{
				console.log(url);
				console.log(res);
				
				this.bestItem = res.data.data
				this.firstItem = this.bestItem[0]
				for (let i=1 ; i<this.bestItem.length;i++){
					if(i<5){
						this.middleItem.push(this.bestItem[i])
					}else{
						this.otherItem.push(this.bestItem[i])
					}
					
				}
			})
		},
		addLike(itemId, brandId, e) {
			
			
            let postData = {
                userId: localStorage.getItem('I'),
                brandId: brandId,
                productId: itemId,
                type: ' '
            }
            //alert(e.target.checked);
            let likeStatus;
            if (e.target.checked) {
                likeStatus = 0
            } else {
                likeStatus = 1
            }
            if (likeStatus == 0) {
                let url = '/gooduser/api/v1/favorite/click_add';
                axios.post(url, postData).then(res=>{
					
                    //this.checkLike = 1;
                });
            } else if (likeStatus == 1) {
                let url = '/gooduser/api/v1/favorite/click_delete';
                axios.post(url, postData).then(res=>{
					
                    //this.checkLike = 0;
                });
            } else {
                alert('error');
            }
        },
		getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },
        threeCommaAdd(n){
            return (n || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
		move_To_Product_Detail(id){
            this.linkMove = true;
			this.$router.push({
			path : `/gooduser/goodslist/detail/${id}`
			})
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