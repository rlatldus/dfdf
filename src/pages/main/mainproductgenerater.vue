<template>
    <div>
		<!-- <input type="text" v-model="prodNo" style="border: 1px solid #ccc;">
		<button @click="getProductData">상품생성</button>

		<div v-html="resDataToProd"></div> -->
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "mainproductgenerater",
	props: ["propData"],
    components: {
    },
    data: () => ({
		prodNo: "",
		resDataToProd: null,
    }),
    created () {
    },
    methods: {
		async getProductData() {

let q1 = document.querySelectorAll('.search_list tbody tr:nth-of-type(1) td');
let qalink = q1[1].querySelectorAll('a')[0].href.split('/')
let qid = qalink[qalink.length - 1];
let ppic = q1[1].querySelector('img').src;
let pname = q1[1].querySelector('dl dd strong').innerHTML;
let pn = q1[2].innerHTML.replace('원','');
let pnprice = q1[3].querySelectorAll('p')[0].innerHTML.replace('원','');
let pnsale = q1[3].querySelectorAll('p')[1].innerHTML.replace('(','').replace(')','').split('.')[0];
let pvprice = q1[5].querySelectorAll('p')[0].innerHTML.replace('원','');
let pvsale = q1[5].querySelectorAll('p')[1].innerHTML.replace('(','').replace(')','').split('.')[0];

// 브랜드 기획전
console.log(`
											<li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail(${qid})">
                                                        <img src="${ppic}" alt="상품 이미지 샘플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(${qid})">
                                                    <span class="goods-name">
                                                        <strong class="name">${pname}</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price" v-if="userGrade != 'VIP'"><em class="num">${pnprice}</em>원</span>
                                                            <span class="price" v-else><em class="num">${pvprice}</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
`);

// 골프TV
console.log(`
                                            <swiper-slide class="goods-item swiper-slide" v-if="userGrade != 'VIP'">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail(${qid})">
                                                        <img src="${ppic}" alt="상품 이미지 생플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(${qid})">
                                                    <span class="goods-name">
                                                        <strong class="name">${pname}</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price" v-if="userGrade != 'VIP'"><em class="num">${pnprice}</em>원</span>
                                                            <span class="price" v-else><em class="num">${pvprice}</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </swiper-slide>
`);

// 핫태그버전
console.log(`
							<swiper-slide class="goods-item swiper-slide">
                                <div class="pic">
                                    <div class="like">
                                        <input type="checkbox" name="itemLike" id="itemLike1">
                                        <label for="itemLike1">찜하기</label>
                                    </div>
                                    <a href="javascript:;" @click="move_To_Product_Detail(${qid})">
                                        <img src="${ppic}" alt="상품 모자">
                                    </a>
                                </div>
                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(${qid})">
                                    <span class="goods-name">
                                        <strong class="name">${pname}</strong>
                                    </span>
                                    <span class="goods-price" v-if="userGrade != 'VIP'">
                                        <span class="price-box">
                                        <span class="price"><em class="num">${pnprice}</em>원</span>
                                        <span class="discount"><em class="num">${pnsale}</em>%</span>
                                        <span class="orig"><em class="num">${pn}</em>원</span>
                                        </span>
                                    </span>
                                    <span class="goods-price" v-else>
                                        <span class="price-box">
                                        <span class="price"><em class="num">${pvprice}</em>원</span>
                                        <span class="discount"><em class="num">${pvsale}</em>%</span>
                                        <span class="orig"><em class="num">${pn}</em>원</span>
                                        </span>
                                    </span>
                                    <span class="goods-tag">
                                        <em class="tag type-free">무료배송</em>
                                        <em class="tag type-new">NEW</em>
                                        <em class="tag type-best">BEST</em>
                                        <em class="tag type-event" style="display:none;">이벤트</em>
                                    </span>
                                </a>
                            </swiper-slide>
`);

// 베스트
console.log(`
					<li class="goods-item swiper-slide">
						<div class="pic">
							<div class="like">
								<input type="checkbox" name="itemLike" id="itemLike1">
								<label for="itemLike1">찜하기</label>
							</div>
							<a href="javascript:;" @click="move_To_Product_Detail(${qid})">
								<img src="${ppic}" alt="상품 모자">
							</a>
						</div>
						<a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(${qid})">
							<span class="goods-name">
								<strong class="name">${pname}</strong>
							</span>
							<span class="goods-price" v-if="userGrade != 'VIP'">
								<span class="orig"><em class="num">${pn}</em>원</span>
								<span class="price-box">
									<span class="discount"><em class="num">${pnsale}</em>%</span>
									<span class="price"><em class="num">${pnprice}</em>원</span>
								</span>
							</span>
							<span class="goods-price" v-else>
								<span class="orig"><em class="num">${pn}</em>원</span>
								<span class="price-box">
									<span class="discount"><em class="num">${pvsale}</em>%</span>
									<span class="price"><em class="num">${pvprice}</em>원</span>
								</span>
							</span>
							<span class="goods-tag">
								<em class="tag type-free">무료배송</em>
								<em class="tag type-new">NEW</em>
								<em class="tag type-best">BEST</em>
								<em class="tag type-event" style="display:none;">이벤트</em>
							</span>
						</a>
					</li>
`);



			// let url = `http://localhost:8080/samsung/product/list?productCategory1=-1&productCategory2=-1&productCategory3=-1&strNormalStartPrice=&strNormalEndPrice=&strVipStartPrice=&strVipEndPrice=&isApproval=&status=&searchCategory=code&searchKeyword=${this.resDataToProd}&stringStartDate=&stringEndDate=&orderBy=date&sortBy=DESC&rowPerPage=20`;
			// await axios({
            //     'method': 'get',
            //     'url': url,
            // }).then(res=>{
			// 	console.log(res);
			// 	this.resDataToProd = res.data;
			// }).catch(error => {
			// 	console.log(error.response)
			// 	alert(`error code: ${error.response.status}`);
			// 	this.$emit('close', false); 
			// });
		}
    },
}

</script>
<style scoped>

</style>