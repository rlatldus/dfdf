<template>

    <div>
        <!-- <img loading="lazy" class="for-css-load-test" src="../../assets/css/btn_next.png" alt="css load test"> -->
        <HeaderComp :headerCase="headerType" />

		<div class="loading type-main" :class="{'on': pendingFirstLoad, 'ani': pendingFirstLoadAni}">
			<div class="l-m-ground"><img loading="eager" importance="high" src="../../assets/images/loading/loading_main_ground.png" @load="mainAniLoadChk('1');"></div>
			<div class="l-m-cart"><img loading="eager" importance="high" src="../../assets/images/loading/loading_main_cart.png" @load="mainAniLoadChk('2');"></div>
			<div class="l-m-logo"><img loading="eager" importance="high" src="../../assets/images/loading/loading_main_logo.png" @load="mainAniLoadChk('3');"></div>
		</div>

        <div id="content" class="main-layout">
            <!-- 메인 플로팅 -->
            <div class="main-float-menu for-max-size">
                <div class="clip-box for-max-size">
                    <a @click="move_To_CheckLogin('/gooduser/mypage/mywish1')">
                        <div class="link-txt">찜리스트</div>
                        <i class="type01"></i>
                    </a>
                </div>
                <div class="clip-box for-max-size" v-if="this.resProduct?.length > 0">
                    <a href="javascript:;">
                        <div class="link-txt recent-product" :class="'has-'+this.resProduct.length" v-if="this.resProduct.length > 0">
                            <router-link
                                class="recent-product-item"
                                v-for="(item, index) in this.resProduct"
                                :key="index"
                                :to="`/gooduser/goodslist/detail/${item.id}`"
                            >
                                <button @click="recProductDelete($event, index)">close</button>
                                <img loading="lazy" :src="item.image">
                            </router-link>
                        </div>
                        <i class="type02"></i>
                    </a>
                </div>
                <div class="clip-box">
                    <router-link :to="'/gooduser/promotion/eventdetail/2'" v-if="this.userGrade == 'VIP'">
                        <div class="link-txt type-pr">선물 ZONE</div>
                        <i class="type03"></i>
                    </router-link>
                    <router-link :to="'/gooduser/promotion/eventdetail/1'" v-else>
                        <div class="link-txt type-pr">선물 ZONE</div>
                        <i class="type03"></i>
                    </router-link>
                </div>
                <div class="clip-box for-max-size">
                    <a href="https://www.golfsamsung.com/web/plugins.do">
                        <div class="link-txt">삼성골프</div>
                        <i class="type04"></i>
                    </a>
                </div>
                <div class="clip-box gotop">
                    <a href="javascript:;" class="go-top">
                        <!-- <div class="link-txt">삼성골프</div> -->
                        <i class="type05"></i>
                    </a>
                </div>
            </div>

            <div class="main-visual" v-if="this.mainSlideLoadOk">
                <div class="swiper-container">
                    <swiper
                        :modules="modules"
                        :loop="true"
                        :navigation="{
                            nextEl: '.main-visual .type-next',
                            prevEl: '.main-visual .type-prev',
                        }"
                        :pagination="{
                            el: '.main-pagination',
                        }"
                        :autoplay="{
                            delay: 5000,
                        }"
                    >
                        <swiper-slide v-for="(item, index) in this.mainSlideBanner" :key="index">
                            <div class="main-visual-img" style="cursor: pointer !important;">
                                <a :href="item.link">
                                    <img loading="lazy" class="for-pc" :src="item.pcImageJson?.real_url" :alt="item.pcImageJson?.real_url">
                                    <img loading="lazy" class="for-m" :src="item.mobileImageJson?.real_url" :alt="item.mobileImageJson?.real_url">
                                </a>
                            </div>
                        </swiper-slide>
                    </swiper>
                    <button type="button" class="type-prev main-navi for-pc" slot="button-prev">prev</button>
                    <button type="button" class="type-next main-navi for-pc" slot="button-next">next</button>
                    <div class="main-pagination" slot="pagination"></div>
                </div>
            </div>

            <div class="main-sec-top w-set">
                <ul class="main-cate-menu">
                    <li class="type01">
                        <a href="#best">
                            <i class="ico-box"></i>
                            <p class="txt">BEST 상품</p>
                        </a>
                    </li>
                    <li class="type02">
                        <a href="#hot">
                            <i class="ico-box"></i>
                            <p class="txt">HOT 태그</p>
                        </a>
                    </li>
                    <li class="type03">
                        <a href="#brand">
                            <i class="ico-box"></i>
                            <p class="txt">브랜드</p>
                        </a>
                    </li>
                    <li class="type04">
                        <a href="#new">
                            <i class="ico-box"></i>
                            <p class="txt">신상품</p>
                        </a>
                    </li>
                    <li class="type05">
                        <a href="#event">
                            <i class="ico-box"></i>
                            <p class="txt">이벤트 프로모션</p>
                        </a>
                    </li>
                    <li class="type06">
                        <a href="#md">
                            <i class="ico-box"></i>
                            <p class="txt">MD 추천상품</p>
                        </a>
                    </li>
                    <li class="type07">
                        <a href="#tv">
                            <i class="ico-box"></i>
                            <p class="txt">골프TV</p>
                        </a>
                    </li>
                    <li class="type08">
                        <a href="https://www.golfsamsung.com/reve/pc/reserve/choice.do">
                            <i class="ico-box"></i>
                            <p class="txt">골프삼성 예약</p>
                        </a>
                    </li>
                </ul>
                <div class="main-big-cate">
                    <router-link to ="/gooduser/etc/categorymen" class="type01">
                        <div class="txt">
                            <p class="txt01 mont">for <b>MEN</b></p>
                            <p class="txt02">남성골프용품 !</p>
                            <p class="txt03">구입하러가기</p>
                        </div>
                    </router-link>
                    <router-link to ="/gooduser/etc/categorywomen" class="type02">
                        <div class="txt">
                            <p class="txt01 mont">for <b>WOMEN</b></p>
                            <p class="txt02">여성골프용품 !</p>
                            <p class="txt03">구입하러가기</p>
                        </div>
                    </router-link>
                </div>
            </div>
            <!-- 베스트 -->
            <bestItemComp></bestItemComp>

            <div id="hot" class="main-sec main-sec-hot" v-if="this.hotTagLoad">
                <div class="hot-inner w-set">
                    <div class="sec-left">
                        <div class="main-title">
                            <p class="title mont"><b>굿 #</b> HOT 태그</p>
                        </div>
                        <div class="hot-tag-main">
                            <div class="button-line"
                                v-for="(item, index) in this.hotTag"
                                :key="index"
                            >
                                <button type="button"
                                    :class="{'on' : goodsHotTab === item.id}"
                                    @click="goodsHotSwich(item.id)"
                                >{{item.name}}</button>
                            </div>
                        </div>
                        <div
                            class="hot-tag-pagination"
                            v-for="(item, index) in this.hotTag" :key="item.id"
                            :class="{'on' : goodsHotTab === item.id}"
                            :id="'hottab'+item.id"
                        >
                            <button type="button" class="type-prev">prev</button>
                            <button type="button" class="type-next">next</button>
                        </div>
                    </div>
                    <div class="sec-right main-hot-swiper swiper-container">
                        <swiper
                            v-for="(item, index) in this.hotTag" :key="index"
                            :class="{'on' : goodsHotTab === item.id}"
                            class="goods-list swiper-wrapper type-main type-main-price m-grid-1 t-grid-w-2"
                            :modules="modules"
                            :loop="true"
                            :slidesPerView="3"
                            :spaceBetween="40"
                            :navigation="{
                                nextEl: '#hottab'+item.id+' .type-next',
                                prevEl: '#hottab'+item.id+' .type-prev',
                            }"
                            :autoplay="{
                                delay: 3000,
                            }"
                            :breakpoints="{
                                1: {
                                    enabled: false,
                                },
                                1480: {
                                    enabled: true,
                                }
                            }"
                        >
                            <swiper-slide class="goods-item swiper-slide"
                                v-for="(itemGoods, idx) in this.hotTagDetail[item.id]" :key="idx"
                            >
                                <div class="pic">
                                    <a href="javascript:;" @click="move_To_Product_Detail(itemGoods.productId)">
                                        <img loading="lazy" :src="itemGoods.mainImagePath" :alt="itemGoods.mainImagePath">
                                    </a>
                                </div>
                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(itemGoods.productId)">
                                    <span class="goods-name">
                                        <strong class="name">{{itemGoods.textName}}</strong>
                                    </span>
                                    <span class="goods-price" v-if="userGrade != 'VIP'">
                                        <span class="price-box">
                                            <span class="price"><em class="num">{{threeCommaAdd(itemGoods.normalSellingPrice)}}</em>원</span>
                                            <span class="orig"><em class="num">{{threeCommaAdd(itemGoods.normalPrice)}}</em>원</span>
                                            <span class="discount"><em class="num">{{Math.ceil(Number(itemGoods.normalSalePercent))}}</em>%</span>
                                        </span>
                                    </span>
                                    <span class="goods-price" v-else>
                                        <span class="price-box">
                                            <span class="price"><em class="num">{{threeCommaAdd(itemGoods.vipSellingPrice)}}</em>원</span>
                                            <span class="orig"><em class="num">{{threeCommaAdd(itemGoods.vipNormalPrice)}}</em>원</span>
                                            <span class="discount"><em class="num">{{Math.ceil(Number(itemGoods.vipSalePercent))}}</em>%</span>
                                        </span>
                                    </span>
                                    <span class="goods-tag">
                                        <em class="tag type-free" v-if="itemGoods.shippingFree == 'Y'">무료배송</em>
                                        <em class="tag type-new" v-if="itemGoods.isNew == 'Y'">NEW</em>
                                        <em class="tag type-best" v-if="itemGoods.isBest == 'Y'">BEST</em>
                                    </span>
                                </a>
                            </swiper-slide>
                            <button @click="$router.push(`/gooduser/promotion/hottaghtdetail/${item.id}`)" class="main-more-btn for-m">더보기+</button>
                        </swiper>
                    </div>
                </div>
            </div>

            <div id="brand" class="main-sec main-brand-list w-set">
                <div class="main-title">
                    <p class="title mont"><b>브랜드</b></p>
                </div>
                <div class="main-brand-slide">
                    <div class="swiper-container">
                        <swiper
                            class="swiper-wrapper"
                            :modules="modules"
                            :loop="true"
                            :slidesPerView="6"
                            :spaceBetween="108"
                            :navigation="{
                                nextEl: '.main-brand-slide .type-next',
                                prevEl: '.main-brand-slide .type-prev',
                            }"
                            :autoplay="{
                                delay: 5000,
                            }"
                            :breakpoints="{
                                1: {
                                    enabled: false,
                                },
                                1480: {
                                    enabled: true,
                                }
                            }"
                        >
                            <swiper-slide v-for="(item, index) in this.mainBrandList" :key="index">
                                <router-link :to="`/gooduser/promotion/brand/list/${item.id}`" class="swiper-slide">
                                    <img loading="lazy" :src="item.logoJson?.realUrl" :alt="item.name+'로고'">
                                    <!-- <img loading="lazy" src="../../assets/images/dummy/brand.png" :alt="item.name+'로고'"></img> -->
                                </router-link>
                            </swiper-slide>
                        </swiper>
                    </div>
                    <button type="button" class="type-prev swiper-navi for-pc">prev</button>
                    <button type="button" class="type-next swiper-navi for-pc">next</button>
                </div>
            </div>

            <div class="main-brand-promotion">
                <div class="swiper-container">
                    <swiper
                        class="swiper-wrapper"
                        :modules="modules"
                        :loop="true"
                        :allowTouchMove="false"
                        :navigation="{
                            nextEl: '.main-brand-promotion .type-next',
                            prevEl: '.main-brand-promotion .type-prev',
                        }"
                        :autoplay="{
                            delay: 5000,
                        }"
                    >
						
                        <swiper-slide class="mbp-slide swiper-slide">
                            <div class="background-cont for-pc">
                                <img loading="lazy" src="../../assets/images/main/main_brand_banner_02.jpg">
                            </div>
                            <div class="background-cont for-m">
                                <img loading="lazy" src="../../assets/images/main/main_brand_banner_02_m.jpg">
                            </div>
                            <div class="w-set">
                                <div class="banner-cont">
                                    <div class="banner-left">
                                        <div class="logo"><img loading="lazy" src="../../assets/images/main/202212_main_brand_01.png" alt="캘러웨이로고"></div>
                                        <div class="desc">
                                            캘러웨이는 <b>혁신적인 기술</b>을 통해<br>골퍼들이 게임에서 더 많은 <b>즐거움을 찾을 수 있도록</b>하는 브랜드입니다.
                                        </div>
                                        <router-link to="/gooduser/promotion/brand/list/91" class="link mont">Go brand zone</router-link>
                                    </div>
                                    <div class="banner-right">
                                        <ul class="goods-list type-main-02 swiper-wrapper">
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail(1738)">
                                                        <img loading="lazy" src="https://dys7tgfrj56z2.cloudfront.net/2022/10/80beb638-9217-4668-8ee5-bc747c47855e.jpg" alt="상품 이미지 샘플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(1738)">
                                                    <span class="goods-name">
                                                        <strong class="name">[캘러웨이] 2022 C-스포츠 화이트 스탠드백</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price" v-if="userGrade != 'VIP'"><em class="num">546,700</em>원</span>
                                                            <span class="price" v-else><em class="num">369,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail(1776)">
                                                        <img loading="lazy" src="https://dys7tgfrj56z2.cloudfront.net/2022/10/290f4baa-c579-444d-9556-1d90dbf65947.jpg" alt="상품 이미지 샘플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(1776)">
                                                    <span class="goods-name">
                                                        <strong class="name">[캘러웨이] 2022 솔리드 화이트 캐디백</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price" v-if="userGrade != 'VIP'"><em class="num">335,500</em>원</span>
                                                            <span class="price" v-else><em class="num">229,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail(1800)">
                                                        <img loading="lazy" src="https://dys7tgfrj56z2.cloudfront.net/2022/10/130f610f-1d05-411b-98ea-0f39c8893f50.jpg" alt="상품 이미지 샘플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(1800)">
                                                    <span class="goods-name">
                                                        <strong class="name">[캘러웨이] 2022 필리 클래식 하프백 네이비</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price" v-if="userGrade != 'VIP'"><em class="num">300,000</em>원</span>
                                                            <span class="price" v-else><em class="num">179,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail(1792)">
                                                        <img loading="lazy" src="https://dys7tgfrj56z2.cloudfront.net/2022/10/bf139a90-4b83-4ea5-94c0-6d16d6ca27b1.jpg" alt="상품 이미지 샘플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(1792)">
                                                    <span class="goods-name">
                                                        <strong class="name">[캘러웨이] 2022 어메이징 카모 블랙 보스턴백</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price" v-if="userGrade != 'VIP'"><em class="num">159,500</em>원</span>
                                                            <span class="price" v-else><em class="num">109,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide class="mbp-slide swiper-slide">
                            <div class="background-cont for-pc">
                                <img loading="lazy" src="../../assets/images/main/main_brand_banner_03.jpg">
                            </div>
                            <div class="background-cont for-m">
                                <img loading="lazy" src="../../assets/images/main/main_brand_banner_03_m.jpg">
                            </div>
                            <div class="w-set">
                                <div class="banner-cont">
                                    <div class="banner-left">
                                        <div class="logo"><img loading="lazy" src="../../assets/images/main/202212_main_brand_02.png" alt="핑로고"></div>
                                        <div class="desc">
                                            신제품 <b>G430 시리즈</b> 출시!<br>핑만의 관용성이 만드는 <b>최대 비거리</b>와 <b>최상의 타구감!</b>
                                        </div>
                                        <router-link to="/gooduser/promotion/brand/list/99" class="link mont">Go brand zone</router-link>
                                    </div>
                                    <div class="banner-right">
                                        <ul class="goods-list type-main-02 swiper-wrapper">
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail(3109)">
                                                        <img loading="lazy" src="https://dys7tgfrj56z2.cloudfront.net/2022/11/dfecde14-190f-47f3-a636-d176d54bd5f7.jpg" alt="상품 이미지 샘플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(3109)">
                                                    <span class="goods-name">
                                                        <strong class="name">[핑] 2022 G430 MAX 남성 드라이버</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price" v-if="userGrade != 'VIP'"><em class="num">840,000</em>원</span>
                                                            <span class="price" v-else><em class="num">690,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail(3110)">
                                                        <img loading="lazy" src="https://dys7tgfrj56z2.cloudfront.net/2022/11/e314d6fa-31b9-4ea5-b31a-588aaf150f96.jpg" alt="상품 이미지 샘플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(3110)">
                                                    <span class="goods-name">
                                                        <strong class="name">[핑] 2022 G430 MAX 남성 우드</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price" v-if="userGrade != 'VIP'"><em class="num">460,000</em>원</span>
                                                            <span class="price" v-else><em class="num">380,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail(3111)">
                                                        <img loading="lazy" src="https://dys7tgfrj56z2.cloudfront.net/2022/11/09586151-920a-4279-854c-b4f610e61162.jpg" alt="상품 이미지 샘플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(3111)">
                                                    <span class="goods-name">
                                                        <strong class="name">[핑] 2022 G430 MAX 남성 유틸리티</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price" v-if="userGrade != 'VIP'"><em class="num">410,000</em>원</span>
                                                            <span class="price" v-else><em class="num">340,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
											<li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail(3112)">
                                                        <img loading="lazy" src="https://dys7tgfrj56z2.cloudfront.net/2022/11/d3819c39-0f84-452d-826b-aa7686c6dc3b.jpg" alt="상품 이미지 샘플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(3112)">
                                                    <span class="goods-name">
                                                        <strong class="name">[핑] 2022 G430 9I AWT 2.0 LITE</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price" v-if="userGrade != 'VIP'"><em class="num">1,780,000</em>원</span>
                                                            <span class="price" v-else><em class="num">1,520,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide class="mbp-slide swiper-slide">
                            <div class="background-cont for-pc">
                                <img loading="lazy" src="../../assets/images/main/main_brand_banner_04.jpg">
                            </div>
                            <div class="background-cont for-m">
                                <img loading="lazy" src="../../assets/images/main/main_brand_banner_04_m.jpg">
                            </div>
                            <div class="w-set">
                                <div class="banner-cont">
                                    <div class="banner-left">
                                        <div class="logo"><img loading="lazy" src="../../assets/images/main/202212_main_brand_03.png" alt="테일러메이드"></div>
                                        <div class="desc">
                                            <b>스타일로</b> 주목받고 <b>카본 페이스</b>로 압도하다!<br>
											STEALTH GLOIRE로 <b>스타일과 퍼포먼스를</b><br>동시에 추구하세요
                                        </div>
                                        <router-link to="/gooduser/promotion/brand/list/95" class="link mont">Go brand zone</router-link>
                                    </div>
                                    <div class="banner-right">
                                        <ul class="goods-list type-main-02 swiper-wrapper">
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail(2525)">
                                                        <img loading="lazy" src="https://dys7tgfrj56z2.cloudfront.net/2022/11/249a9542-33d7-40dd-bd72-f014212dbe01.jpg" alt="상품 이미지 샘플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(2525)">
                                                    <span class="goods-name">
                                                        <strong class="name">[테일러메이드] 2023 스텔스 글로리 STEALTH GLORIE 여성 드라이버</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price" v-if="userGrade != 'VIP'"><em class="num">940,000</em>원</span>
                                                            <span class="price" v-else><em class="num">880,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail(2526)">
                                                        <img loading="lazy" src="https://dys7tgfrj56z2.cloudfront.net/2022/11/2706791c-4206-43d9-8983-fa4c7f9b1b51.jpg" alt="상품 이미지 샘플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(2526)">
                                                    <span class="goods-name">
                                                        <strong class="name">[테일러메이드] 2023 스텔스 글로리 STEALTH GLORIE 여성 우드</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price" v-if="userGrade != 'VIP'"><em class="num">580,000</em>원</span>
                                                            <span class="price" v-else><em class="num">550,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail(2661)">
                                                        <img loading="lazy" src="https://dys7tgfrj56z2.cloudfront.net/2022/11/8c1dce93-6e02-4055-8eae-e48274b9dd8e.jpg" alt="상품 이미지 샘플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(2661)">
                                                    <span class="goods-name">
                                                        <strong class="name">[테일러메이드] 2023 스텔스 글로리 STEALTH GLORIE 여성 유틸리티</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price" v-if="userGrade != 'VIP'"><em class="num">410,000</em>원</span>
                                                            <span class="price" v-else><em class="num">390,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                        <!--
                            권프로님 수정 참조
                            슬라이드 예시
                         -->
                        <!-- <swiper-slide class="mbp-slide swiper-slide">
                            <div class="w-set">
                                <div class="banner-cont">
                                    <div class="banner-left">
                                        <div class="logo"><img loading="lazy" src="../../assets/images/dummy/main_brand_logo.png" alt="로고샘플"></div>
                                        <div class="desc">
                                            세계 최고의 <b>품질</b>과 최상의 <b>퍼포먼스</b>, 그리고 <b>일관성</b>.<br> 이 모두를 갖추다!
                                        </div>
                                        <router-link to="/promotion/brand" class="link mont">Go brand zone</router-link>
                                    </div>
                                    <div class="banner-right">
                                        <ul class="goods-list type-main-02 swiper-wrapper">
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail">
                                                        <img loading="lazy" src="../../assets/images/dummy/brandzone/title1.jpg" alt="상품 이미지 샘플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail">
                                                    <span class="goods-name">
                                                        <strong class="name">[타이틀리스트] TSi2/TSi3 드라이버(DIAMANA BF)</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price"><em class="num">720,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail">
                                                        <img loading="lazy" src="../../assets/images/dummy/brandzone/title2.jpg" alt="상품 이미지 생플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info">
                                                    <span class="goods-name">
                                                        <strong class="name">[타이틀리스트] SM9 보키 웨지 (DG S200)</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price"><em class="num">260,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail">
                                                        <img loading="lazy" src="../../assets/images/dummy/brandzone/title3.jpg" alt="상품 이미지 생플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail">
                                                    <span class="goods-name">
                                                        <strong class="name">[타이틀리스트] TSi2 남성 유틸리티 우드 (TOUR AD HYB BLACK)</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price"><em class="num">390,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide class="mbp-slide swiper-slide">
                            <div class="w-set">
                                <div class="banner-cont">
                                    <div class="banner-left">
                                        <div class="logo"><img loading="lazy" src="../../assets/images/dummy/main_brand_logo2.png" alt="로고샘플"></div>
                                        <div class="desc">
                                            세계 최고의 <b>품질</b>과 최상의 <b>퍼포먼스</b>, 그리고 <b>일관성</b>.<br> 이 모두를 갖추다!
                                        </div>
                                        <router-link to="/promotion/brand" class="link mont">Go brand zone</router-link>
                                    </div>
                                    <div class="banner-right">
                                        <ul class="goods-list type-main-02 swiper-wrapper">
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail">
                                                        <img loading="lazy" src="../../assets/images/dummy/brandzone/taylor1.jpg" alt="상품 이미지 생플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail">
                                                    <span class="goods-name">
                                                        <strong class="name">[테일러메이드] 스텔스(STEALTH) 남성 드라이버 (TENSEI TM5)</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price"><em class="num">830,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail">
                                                        <img loading="lazy" src="../../assets/images/dummy/brandzone/taylor2.jpg" alt="상품 이미지 생플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info">
                                                    <span class="goods-name">
                                                        <strong class="name">[테일러메이드] 스텔스(STEALTH) 여성 드라이버 (TENSEI TM4)</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price"><em class="num">50,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="goods-item">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail">
                                                        <img loading="lazy" src="../../assets/images/dummy/brandzone/taylor3.jpg" alt="상품 이미지 생플">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info">
                                                    <span class="goods-name">
                                                        <strong class="name">[테일러메이드] 밀드 그라인드3(MG3) 스틸 웨지 (크롬/블랙)</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price"><em class="num">220,000</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide> -->
                    </swiper>
                    <button type="button" class="type-prev">prev</button>
                    <button type="button" class="type-next">next</button>
                </div>
            </div>

            <div id="new" class="main-sec main-new-list w-set">
                <div class="main-title">
                    <p class="title mont"><b>NEW</b> ARRIVAL</p>
                </div>
                <ul class="goods-list grid-4 grid-4-main m-grid-2 type-main">
				 <!--1-->
                    <li class="goods-item swiper-slide" v-for="(item, index) in this.newArrival" :key="index">
                        <div class="pic">
                            <a href="javascript:;" @click="move_To_Product_Detail(item.productId)">
                                <img loading="lazy" :src="item.mainImageUrl" :alt="item.mainImageUrl">
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

            <div id="event" class="main-sec main-event-list w-set" v-if="!pendingEvent">
                <div class="main-title">
                    <p class="title mont"><b>Event</b> & Promotion</p>
                </div>
                <div class="main-event-slide">
                    <div class="swiper-container">
                        <swiper
                            class="swiper-wrapper"
                            :modules="modules"
                            :navigation="{
                                nextEl: '.main-event-slide .type-next',
                                prevEl: '.main-event-slide .type-prev',
                            }"
                            :pagination="{
                                el: '.event-pagination',
                            }"
                            :breakpoints="{
                                1480: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                                769: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                1: {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                },
                            }"
                        >
                            <swiper-slide v-for="(item, index) in this.eventList" :key="index">
                                <router-link :to="`/gooduser/promotion/eventdetail/${item.id}`" class="swiper-slide">
                                    <img loading="lazy" :src="item.pcImageJson?.real_url" :alt="item.pcImageJson?.real_url" class="for-pc">
                                    <img loading="lazy" :src="item.mobileImageJson?.real_url" :alt="item.mobileImageJson?.real_url" class="for-m">
                                </router-link>
                            </swiper-slide>
                        </swiper>
                    </div>
                    <button type="button" class="type-prev swiper-navi">prev</button>
                    <button type="button" class="type-next swiper-navi">next</button>
                    <div class="event-pagination for-m"></div>
                </div>
            </div>

            <div id="md" class="main-sec main-goods-md w-set" v-if="this.mdRecLoad == true">
                <div class="main-title">
                    <p class="title mont"><b>MD's</b> 강력추천</p>
                </div>
                <div class="main-md-cate">
                    <button type="button" :class="{'on' : this.mainMdToggle == 0}" @click="this.mainMdToggle = 0">골프</button>
                    <button type="button" :class="{'on' : this.mainMdToggle == 1}" @click="this.mainMdToggle = 1">생활용품/선물</button>
                </div>
                <div class="swiper-container" :class="{'blind': this.mainMdToggle != 0}">
                    <button type="button" class="type-prev swiper-navi">prev</button>
                    <button type="button" class="type-next swiper-navi">next</button>
                    <swiper
                        class="goods-list swiper-wrapper"
                        :modules="modules"
                        :initialSlide="2"
                        :slidesPerView="1"
                        :spaceBetween="0"
                        :navigation="{
                            nextEl: '.main-goods-md .type-next',
                            prevEl: '.main-goods-md .type-prev',
                        }"
                        :autoplay="{
                            delay: 5000,
                        }"
                    >
						<swiper-slide class="goods-item swiper-slide" v-for="(item, index) in this.mdRecomend['1']" :key="index">
							<div class="pic">
                                <a href="javascript:;" @click="move_To_Product_Detail(item.productId)">
                                    <img loading="lazy" :src="item.mainImageUrl" :alt="item.mainImageUrl">
                                </a>
                            </div>
                            <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(item.productId)">
                                <span class="goods-name">
                                    <strong class="name">{{item.textName}}</strong>
                                </span>
                                <span class="goods-price">
                                    <span class="price-box">
                                        <span class="price" v-if="this.userGrade != 'VIP'"><em class="num">{{threeCommaAdd(item.normalSellingPrice)}}</em>원</span>
                                        <span class="price" v-else><em class="num">{{threeCommaAdd(item.vipSellingPrice)}}</em>원</span>
                                    </span>
                                </span>
                                <span class="goods-link" @click="move_To_Product_Detail(item.productId)">제품 보러가기</span>
                            </a>
						</swiper-slide>
                    </swiper>
                </div>
                <div class="swiper-container" :class="{'blind': this.mainMdToggle != 1}">
                    <button type="button" class="type-prev swiper-navi">prev</button>
                    <button type="button" class="type-next swiper-navi">next</button>
                    <swiper
                        class="goods-list swiper-wrapper"
                        :modules="modules"
                        :initialSlide="2"
                        :slidesPerView="1"
                        :spaceBetween="0"
                        :navigation="{
                            nextEl: '.main-goods-md .type-next',
                            prevEl: '.main-goods-md .type-prev',
                        }"
                        :autoplay="{
                            delay: 5000,
                        }"
                    >
                        <swiper-slide class="goods-item swiper-slide" v-for="(item, index) in this.mdRecomend['2']" :key="index">
							<div class="pic">
                                <a href="javascript:;" @click="move_To_Product_Detail(item.productId)">
                                    <img loading="lazy" :src="item.mainImageUrl" :alt="item.mainImageUrl">
                                </a>
                            </div>
                            <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(item.productId)">
                                <span class="goods-name">
                                    <strong class="name">{{item.textName}}</strong>
                                </span>
                                <span class="goods-price">
                                    <span class="price-box">
                                        <span class="price" v-if="this.userGrade != 'VIP'"><em class="num">{{threeCommaAdd(item.normalSellingPrice)}}</em>원</span>
                                        <span class="price" v-else><em class="num">{{threeCommaAdd(item.vipSellingPrice)}}</em>원</span>
                                    </span>
                                </span>
                                <span class="goods-link" @click="move_To_Product_Detail(item.productId)">제품 보러가기</span>
                            </a>
						</swiper-slide>
                    </swiper>
                </div>
            </div>

            <div id="tv" class="main-sec main-golf-tv" v-if="this.golfTvData != null">
                <div class="bg"></div>
                <div class="w-set">
                    <div class="main-title has-more">
                        <p class="title mont"><b>골프</b> TV</p>
                        <router-link to="/gooduser/promotion/golftv">더보기+</router-link>
                    </div>
                    <div class="main-golf-wrap">
                        <div class="g-tv-movie">
                            <iframe width="100%" height="100%" :src="`${golfTvData?.link}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div class="g-tv-goods">
                            <div class="movie-info">
                                <p class="movie-name">{{golfTvData?.name}}</p>
                            </div>
                            <div class="goods-area">
                                <p class="sec-name">관련상품</p>
                                <div class="main-tv-goods-slide">
                                    <div class="swiper-container">
                                        <swiper
                                            class="goods-list type-main-02 swiper-wrapper"
                                            :modules="modules"
                                            :loop="true"
                                            :slidesPerView="2"
                                            :spaceBetween="30"
                                            :autoplay="{
                                                delay: 5000,
                                            }"
                                            :breakpoints="{
                                                1: {
                                                    enabled: false,
                                                },
                                                1480: {
                                                    enabled: true,
                                                }
                                            }"
                                        >
                                            <swiper-slide class="goods-item swiper-slide" v-for="(item,index) in golfTvData.detail" :key="index">
                                                <div class="pic">
                                                    <a href="javascript:;" @click="move_To_Product_Detail(item.PRODUCT_ID)">
                                                        <img loading="lazy" :src="item?.MAIN_IMAGE_PATH" :alt="item?.MAIN_IMAGE_PATH">
                                                    </a>
                                                </div>
                                                <a href="javascript:;" class="goods-info" @click="move_To_Product_Detail(item.PRODUCT_ID)">
                                                    <span class="goods-name">
                                                        <strong class="name">{{item.TEXT_NAME}}</strong>
                                                    </span>
                                                    <span class="goods-price">
                                                        <span class="price-box">
                                                            <span class="price" v-if="userGrade != 'VIP'"><em class="num">{{threeCommaAdd(item?.NORMAL_SELLING_PRICE)}}</em>원</span>
                                                            <span class="price" v-else><em class="num">{{threeCommaAdd(item?.VIP_SELLING_PRICE)}}</em>원</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </swiper-slide>
                                        </swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="main-more-btn for-m" @click="navigate" >더보기+</button>
                        <!-- <router-link to="/promotion/golftv" custom v-slot="{ navigate }">
                            <button type="button" class="main-more-btn for-m" @click="navigate" @keypress.enter="navigate" role="link">더보기+</button>
                        </router-link> -->
                    </div>
                </div>
            </div>
        </div>

        <MobileNavComp :mNavType="'main'" />
        <FooterComp />
    </div>

</template>
<script>
import HeaderComp from '../../components/HeaderComp.vue';
import MobileNavComp from '../../components/MobileNavComp.vue';
import FooterComp from '../../components/FooterComp.vue';
import bestItemComp from './bestItemComp.vue';
import {Autoplay, Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import axios from "axios";
import moment from "moment";

export default {
    name: "pageIndex",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
      Swiper,
      SwiperSlide,
      //임시
      bestItemComp
    },
    data: () => ({
        titlenow : moment(),
        userId: null,
        userGrade: null,

        // TODO: 추후 모듈별 로딩을 확인후 pending 처리를 해야할것같음. 현재는 임시로 3초후 로딩 완료 처리중
        pending: true,
        pendingFirstLoad: true,
        pendingFirstLoadAni: false,
        loadAniPic: {
            '1': false,
            '2': false,
            '3': false
        },

        // 최근 본 상품
        resProduct: [],

        checkLike : 0,
        headerType: 'main',

        // 메인 슬라이드 배너
        mainSlideBanner: null,
        mainSlideLoadOk: false,

        // hot 상품 tag loop
        // 임시 상태
        goodsHotTab: 0,

        // 핫태그 신규
        hotTagLoad: false,
        hotTag: null,
        hotTagDetail: {},
        hotTagDetailCount: 0,

        // 브랜드 리스트
        mainBrandList: [],

        // 신상품
        newArrival: null,

        // 이벤트 리스트
		eventList: null,
        pendingEvent: true,

        // MD 강력추천
        mdRecLoad: false,
        mdRecLoadObj: {
            '1': false,
            '2': false
        },
        mdRecomend: {
            '1': null,
            '2': null
        },

        // MD slide toggle
        mainMdToggle: 0,

        // golf Tv
        golfTvData: null,
    }),
    created () {
        setTimeout(() => {
            this.$router.go(this.$router.currentRoute);
        }, 1800000);
        this.$store.commit('setState');
        this.setState();
		this.userId = this.$store.state.userId;
        this.userGrade = this.$store.state.userGrade;
        this.agentTest();
        this.mainSlideLoad();
        this.getHotList();
        this.mainBrandApi();
        this.new_arrive();
        this.md_recommend();
        this.getEventList();
        this.getGolfTvList();
        // this.mdspick();
        // this.newArrival();

    },
    methods: {
        agentTest(){
            let varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
            let result = ''

            let mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
            if(mobile){
                if ( varUA.indexOf('android') > -1) {
                    //안드로이드
                    result = "android";
                } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
                    //IOS
                    result = "ios";
                }
            }
            console.log(result==='ios'? '감성충만 iphone':result==='android'?'접을수 있는 android':'콤퓨타')
        },
        // util
        navigate(){
            this.$router.push({
                path : `/gooduser/promotion/golftv`
            })
        },
        threeCommaAdd(n){
            return (n || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        // 메인 슬라이드
        mainSlideLoad() {
            let url = `/gooduser/api/v1/promotion_api/banner/list`
            axios.post(url).then(res=>{
                // console.log('/gooduser/api/v1/promotion_api/banner/list');
                // console.log(res);
                this.mainSlideBanner = res.data.data;
                if (this.mainSlideBanner?.length > 0) {
                    this.mainSlideBanner.forEach((item, index) => {
                        if (item.pcImageJson != null) {
                            item.pcImageJson = JSON.parse(item.pcImageJson);
                        }
                        if (item.mobileImageJson != null) {
                            item.mobileImageJson = JSON.parse(item.mobileImageJson);
                        }
                    });

                }
                this.mainSlideLoadOk = true;
            })
        },
        setState(){

            let url = `/gooduser/api/v1/check_session`
            let ckData= {}
            axios.post(url,ckData).then(res=>{
                if(res.data.data !='TRUE' && localStorage.getItem('I')!= null ){
                    this.$store.commit('logOut');
                    this.$store.commit('setState');

                    this.userId = this.$store.state.userId;
                    this.userName =  this.$store.state.userName;
                    this.userGrade =  this.$store.state.userGrade;

                    this.$router.push({
                        path : `/gooduser`
                    })
                }else if(localStorage.getItem('I')== null && res.data.data =='TRUE'){
                    this.$store.commit('logOut');
                    this.$store.commit('setState');

                    this.userId = this.$store.state.userId;
                    this.userName =  this.$store.state.userName;
                    this.userGrade =  this.$store.state.userGrade;

                    this.$router.push({
                        path : `/gooduser`
                    })
                }else{

                }
            })

        },
        moveMainBanner(link) {
            if (link == null) {return false;}
            this.$router.push(link);
        },
        // mdspick(){
        //     let url = `/gooduser/api/v1/promotion_api/main/list`
        //     //type : 추천상품 "R" , 신상품 "N"
        //     let mdPickData={
        //         type : 'R'
        //     }
        //     axios.post(url,mdPickData).then(res=>{
        //         console.log('success to get mdPickData ')
        //         console.log(res)
        //     })
        // },
        // newArrival(){
        //     let url = `/gooduser/api/v1/promotion_api/main/list`
        //     //type : 추천상품 "R" , 신상품 "N"
        //     let newData = {
        //         type : 'N'
        //     }
        //     axios.post(url,newData).then(res=>{
        //         console.log('success to get newArrival Data ')
        //         console.log(res)
        //     })
        // },

        // 굿샵 HOT 태그 탭
        goodsHotSwich(i) {
            this.goodsHotTab = i;
        },
        move_To_CheckLogin(urldata){
            if (!this.$store.state.userId) {
                alert('로그인이 필요한 기능입니다.');
                this.gotoSamsung();
                return;
            }
			this.$router.push({
			    path : urldata
			})
		},
        move_To_Product_Detail(idx){
            // if (!this.$store.state.userId) {
            //     alert('로그인이 필요한 기능입니다.');
            //     this.gotoSamsung();
            //     return;
            // }
            console.log('go');
			this.$router.push({
			    path : `/gooduser/goodslist/detail/${idx}`
			})
		},
        gotoSamsung(){
            let param = window.atob('Y2xpZW50X2lkPTQmcmVkaXJlY3RfdXJsPS9nb29kdXNlci9jYWxsYmFjaw==')
            console.log(param)

            // 로그인 모바일 PC 케이스
            // 로컬 / 실서버 / qa 대응
            let urlHost = window.location.host.startsWith('goodshop') ?
              'https://www.golfsamsung.com' : 'https://qa.golfsamsung.com';

            let uA = navigator.userAgent;
		    if (uA.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || uA.match(/LG|SAMSUNG|Samsung/) != null) {
                window.location.href = `${urlHost}/appMain.do?method=appLogin`
            } else {
                window.location.href = `${urlHost}/web/join.do?method=loginMav`
            }
        },

        getHotList(){
            this.setState();
			let url = `/gooduser/api/v1/promotion_api/hot_tag/list`
			let postData = {}
			axios.post(url, postData).then(res=>{
				this.hotTag = res.data.data;

                if (this.hotTag?.length > 0) {
                    this.goodsHotTab = this.hotTag[0].id;
                    this.hotTag.forEach((item, index) => {
                        this.getHotListDetail(item.id);
                    });
                }
			});
		},
        getHotListDetail(detId){
            this.setState();
			let url = `/gooduser/api/v1/promotion_api/hot_tag/detail`
			let postData = {
				id: detId,
				page: 1,
			}

			axios.post(url, postData).then(res=>{
                this.hotTagDetailCount++;
				this.hotTagDetail[detId] = res.data.data;
                if (this.hotTag.length == this.hotTagDetailCount) {
                    this.hotTagLoad = true;
                }
			})
		},

        mdLoadChk() {
            if (this.mdRecLoadObj["1"] && this.mdRecLoadObj["2"]) {
                this.mdRecLoad = true;
            }
        },
        md_recommend(){
            this.setState();
            let url = `/gooduser/api/v1/promotion_api/main/recommend/list`
            let sendData = {
                categoryId: '1',
            }
            axios.post(url, sendData).then(res=>{
                // console.log(url)
                // console.log(res)
                this.mdRecomend["1"] = res.data.data;
                this.mdRecLoadObj["1"] = true;
                this.mdLoadChk();
            });

            let sendData2 = {
                categoryId: '2',
            }
            axios.post(url, sendData2).then(res=>{
                // console.log(url)
                // console.log(res)
                this.mdRecomend["2"] = res.data.data;
                this.mdRecLoadObj["2"] = true;
                this.mdLoadChk();
            });
        },

        new_arrive(){
            this.setState();
            let url = `/gooduser/api/v1/promotion_api/main/new/list`
            let sendData = {
                // 빈거라도 보내야 함
            }
            axios.post(url, sendData).then(res=>{
                // console.log(url)
                // console.log(res)
                this.newArrival = res.data.data;
            })
        },

        // best_ranking(){
        //     let url = `/gooduser/api/v1/main/best_ranking`
        //     axios.get(url).then(res=>{
        //         console.log('success to get222 ')
        //         console.log(res)
        //     })
        // },

        mainBrandApi(){
            this.setState();
            let url = `/gooduser/api/v1/brand_api/brand_all`
            axios.post(url).then(res=>{
                // console.log(res)
                if (res.data.data?.length > 0) {
                    this.mainBrandList = []
                    res.data.data.forEach((item) => {
                        if (item.isMainView == 'Y') {
                            this.mainBrandList.push(item);
                        }
                    })
                }
                // this.mainBrandList = res.data.data;
            })
        },

        // 최근 본 상품 삭제
        recProductDelete (e, idx) {
            e.preventDefault();
            this.resProduct.splice(idx, 1);
            localStorage.setItem('recpd', JSON.stringify(this.resProduct));
        },

        // 이벤트
        getEventList(){
            this.setState();
			let url = `/gooduser/api/v1/promotion/event/list`
			let postData = {
				page: 1
			}
			axios.post(url, postData).then(res=>{

				this.eventList = res.data.data;
                if (this.eventList?.length > 0) {
                    this.eventList.forEach((item, index) => {
                        if (item.pcImageJson != null) {
                            item.pcImageJson = JSON.parse(item.pcImageJson);
                        }
                        if (item.mobileImageJson != null) {
                            item.mobileImageJson = JSON.parse(item.mobileImageJson);
                        }
                    });
                }
				this.pendingEvent = false;
			})
		},

        // 이벤트
        getGolfTvList(){
            this.setState();
			let url = `/gooduser/api/v1/promotion_api/golf_tv/main`
			let postData = {}
			axios.post(url, postData).then(res=>{
                if (res.data.code == 200) {
                    if (res.data.data?.detail) {
                        res.data.data.detail = JSON.parse(res.data.data.detail);
                    }
                    this.golfTvData = res.data.data;
                    console.log(res);
                }
			})
		},

        // 메인 애니메이션 개선
        mainAniLoadChk(imgNum) {
            console.log('Main ANi load chk !');
            console.log(imgNum);
            this.loadAniPic[imgNum] = true;
            this.mainAniLoadOk();
        },
        mainAniLoadOk() {
            let that = this;
            if (this.pendingFirstLoad && this.loadAniPic['1'] && this.loadAniPic['2'] && this.loadAniPic['3']) {
                that.pendingFirstLoadAni = true;
                setTimeout(function() {that.pendingFirstLoad = false;}, 4500);
            }
        },

    },
    setup() {
        const onSwiper = (swiper) => {
            // console.log(swiper);
            // console.log('hi');
        };
        const onSlideChange = () => {
            // console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation, Pagination, Autoplay],
        };
    },
    computed: {
        setTTL(){
            let now = moment()
            let gap = moment.duration(now.diff(moment(localStorage.getItem('TTL')))).minutes()
            console.log(gap)
            return gap
        },
        settitleTTL(){
            let timenow = this.titlenow
            console.log('titlenow')
            console.log(this.titlenow)
            return timenow
        }

    },
    watch: {
        settitleTTL(){

        }

    },
    mounted() {
        if (window?.HYBRID_ANDROID) {
            window.HYBRID_ANDROID.mainMountOk();
            // return false;
        }
        // if (typeof webkit != 'undefined') {
        //     if (webkit?.messageHandlers?.HYBRID_IOS) {
        //         webkit.messageHandlers.HYBRID_IOS.postMessage("mainMountOk");
        //         //return false;
        //     }
        // }

        // 최근 본 상품
        let recPdLocal = localStorage.getItem('recpd');
        if (recPdLocal != null) {
            this.resProduct = JSON.parse(recPdLocal);
        }


        let that = this;
        let isFirstLoad = sessionStorage.getItem('firstloading');
        if (isFirstLoad == null || isFirstLoad != 'false') {
        // if (true) {
            sessionStorage.setItem('firstloading', 'false');
            that.pendingFirstLoad = true;

            // that.pendingFirstLoadAni = true;
            // setTimeout(function() {that.pendingFirstLoad = false;}, 4500);

            setTimeout(function() {
                // 5초 내로 이벤트 실행이 안되어있는 경우
                if (that.pendingFirstLoadAni == false) {
                    that.pendingFirstLoad = false;
                }
            }, 2000);
        } else {
            that.pendingFirstLoad = false;
        }

        // 우측 플로팅 상단 이동
        document.querySelector('.go-top').addEventListener('click',function(){
            window.scrollTo({top: 0, behavior:'smooth'});
        });
    },

}

</script>
<style scoped>

</style>
