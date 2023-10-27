<template>
    <div>
        <HeaderComp :headerCase="headerType" />
		<!-- <div class="loading cart-in" v-if="cartLoadingOk"></div> -->

        <div class="loading" v-if="workpending"></div>

        <div class="loading cart-in" v-if="cartLoadingOk">
            <div class="frame f-0" v-if="this.cartLoadFrame == 0"></div>
            <div class="frame f-1" v-if="this.cartLoadFrame == 1"></div>
            <div class="frame f-2" v-if="this.cartLoadFrame == 2"></div>
            <div class="frame f-3" v-if="this.cartLoadFrame == 3"></div>
            <div class="frame f-4" v-if="this.cartLoadFrame == 4"></div>
            <div class="frame f-5" v-if="this.cartLoadFrame == 5"></div>
            <div class="frame f-6" v-if="this.cartLoadFrame == 6"></div>
            <div class="frame f-7" v-if="this.cartLoadFrame == 7"></div>
            <div class="frame f-8" v-if="this.cartLoadFrame == 8"></div>
            <div class="frame f-9" v-if="this.cartLoadFrame == 9"></div>
            <div class="frame f-10" v-if="this.cartLoadFrame == 10"></div>
            <div class="frame f-11" v-if="this.cartLoadFrame == 11"></div>
        </div>
		<div class="loading" v-if="cartLoading"></div>
        <div class="loading" v-if="pending || optionCheckPending"></div>
        <div id="content" v-else>
            <div class="goods-view w-set">
                <ul class="goods-view-nav">
                    <li class="home"><span>홈</span></li>
                    <li v-if="this.dep1Cate" :class="{'on': this.openCate == 1}">
                        <button type="button" @click="goodsCateOpen(1)">
                            <span>{{this.dep1Name}}</span>
                        </button>
                        <ul class="sub-cate-list">
                            <li v-for="data in this.dep1Cate" :key="data"><router-link :to="'/gooduser/goodslist/list/'+data.id">{{data.name}}</router-link></li>
                        </ul>
                    </li>
                    <li v-if="this.dep2Cate" :class="{'on': this.openCate == 2}">
                        <button type="button" @click="goodsCateOpen(2)">
                            <span v-if="dep2Name">{{this.dep2Name}}</span>
                            <span v-else>{{this.productItem.productCategoryName}}</span>
                        </button>
                        <ul class="sub-cate-list">
                            <li v-for="data in this.dep2Cate" :key="data"><router-link :to="'/gooduser/goodslist/list/'+data.id">{{data.name}}</router-link></li>
                        </ul>
                    </li>
                    <li v-if="this.dep3Cate" :class="{'on': this.openCate == 3}">
                        <button type="button" @click="goodsCateOpen(3)"><span>{{this.productItem.productCategoryName}}</span></button>
                        <ul class="sub-cate-list">
                            <li v-for="data in this.dep3Cate" :key="data"><router-link :to="'/gooduser/goodslist/list/'+data.id">{{data.name}}</router-link></li>
                        </ul>
                    </li>
                </ul>

                <!-- PC 상품정보 영역-->
                <div class="goods-view-header for-pc">
                    <div class="section-01">
                        <div class="section-left">
                            <div class="now-cate-link">
                                <router-link :to="`/gooduser/promotion/brand/list/${this.productItem.brand.id}`">{{this.productItem.brand.name}}</router-link>
                            </div>
                            <div class="goods-tag">
                                <span class="tag type-free" v-if="this.productItem.shippingFree === 'Y'">무료배송</span>
                                <span class="tag type-new" v-if="this.productItem.isNew === 'Y'">NEW</span>
                                <span class="tag type-best" v-if="this.productItem.isBest === 'Y'">BEST</span>
                                <!-- <span class="tag type-event">이벤트</span> -->
                            </div>
                        </div>
                        <div class="section-right view-top-btns">
                            <button type="button" class="type-like" @click="addLike">
                                <i :class="{'on': this.checkLike == 1}"></i>
                                <span class="name">찜</span>
                            </button>
                            <button type="button" class="type-share" @click="popupShare(true)">
                                <i></i>
                                <span class="name">공유하기</span>
                            </button>
                        </div>
                    </div>
                    <div class="section-02">
                        <h3 class="goods-name">
                            <!-- 상품 -->
                            {{this.productItem.textName ? this.productItem.textName : this.productItem.name}}
                        </h3>
                        <!-- <div class="goods-star">
                            <span class="point">4.9</span>
                            <span class="count">(1.925)</span>
                        </div> -->
                    </div>
                </div>
                <div class="popup-cont" id="popup-share">
                    <div class="popup-header">
                        <h3 class="title">공유하기</h3>
                        <button type="button" class="popup-close-btn popup-close" @click="popupShare(false)">닫기</button>
                    </div>
                    <div class="popup-body width-share">
                        <div class="popup-share">
                            <div class="share-btns" style="display: none;">
                                <!-- TODO 카카오톡 공유 -->
                                <!-- <button type="button" class="type-kakao" @click="shareKakao">카카오톡 공유하기</button> -->
                                <!-- <button type="button" class="type-blog" @click="shareBlog">네이버 블로그 공유햐기</button> -->
                            </div>
                            <div class="share-link">
                                <input type="text" readonly :value="pageUrl">
                                <button class="share-btns" @click="copyLink">공유하기</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- PC 상품정보 영역-->
                <div class="goods-view-body">
                    <div class="goods-img">
                        <div class="sliderMain swiper-container">
                            <div class="vip-tag mont" v-if="(this.userGrade == 'VIP') && (this.productItem.vipNormalPrice)">VIP</div>
                            <swiper
                                class="swiper-wrapper"
                                :modules="modules"
                                :spaceBetween="10"
                                :thumbs="{ swiper: thumbsSwiper }">
                                <swiper-slide class="swiper-slide" v-for="(data, idx) in this.productItem.imagePathList" :key="idx">
                                    <img :src="data" :alt="data" @click="setImageViewer(this.productItem.imagePathList)">
                                </swiper-slide>
                            </swiper>
                        </div>
                        <div class="sliderPaging" style="position: relative;">
                            <div class="vip-tag mont for-m" v-if="(this.userGrade == 'VIP') && (this.productItem.vipNormalPrice)">VIP</div>
                            <div class="swiper-container">
                                <swiper
                                    class="swiper-wrapper"
                                    @swiper="setThumbsSwiper"
                                    watch-slides-visibility
                                    watch-slides-progress
                                    :modules="modules"
                                    :spaceBetween="15"
                                    :slidesPerView="1"
                                    :watchSlidesProgress="true"
                                    :breakpoints="{
                                        769: {
                                            slidesPerView: 5,
                                            freeMode: true,
                                            pagination: false,
                                        },
                                    }"
                                    :pagination="{
                                        el: '.sliderPaging .swiper-pagination',
                                        type: 'fraction',
                                    }"
                                >
                                    <swiper-slide class="swiper-slide" v-for="(data, idx) in this.productItem.imagePathList" :key="idx">
                                        <img :src="data" :alt="data">
                                    </swiper-slide>
                                </swiper>
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>

                    <!-- MOBILE 상품정보 영역-->
                    <div class="goods-view-header for-m">
                        <div class="section-01">
                            <div class="section-left">
                                <div class="now-cate-link">
                                    <router-link :to="`/gooduser/promotion/brand/list/${this.productItem.brand.id}`">{{this.productItem.brand.name}}</router-link>
                                </div>
                                <div class="goods-tag">
                                    <span class="tag type-free" v-if="this.productItem.shippingFree === 'Y'">무료배송</span>
                                    <span class="tag type-new" v-if="this.productItem.isNew === 'Y'">NEW</span>
                                    <span class="tag type-best" v-if="this.productItem.isBest === 'Y'">BEST</span>
                                    <!-- <span class="tag type-event">이벤트</span> -->
                                </div>
                            </div>
                            <div class="section-right view-top-btns">
                                <button type="button" class="type-like" @click="addLike">
                                    <i :class="{'on': this.checkLike == 1}"></i>
                                    <span class="name">찜</span>
                                </button>
                                <button type="button" class="type-share" @click="popupShare(true)">
                                    <i></i>
                                    <span class="name">공유하기</span>
                                </button>
                            </div>
                        </div>
                        <div class="section-02">
                            <h3 class="goods-name">{{ this.productItem.textName ? this.productItem.textName : this.productItem.name}}</h3>

                        </div>
                    </div>
                    <!-- MOBILE 상품정보 영역-->

                    <div class="goods-info">
                        <!-- VIP CASE -->

                        <div class="goods-price type-vip" v-if="(this.userGrade == 'VIP') && (this.productItem.vipNormalPrice)">
                            <span class="price-buy">
                                <span class="price mont">{{this.productItem.vipSellingPrice? threeCommaAdd(this.productItem.vipSellingPrice) : 0}}</span>
                                <span class="unit">원</span>
                            </span>
                            <span class="price-orig">
                                <span class="price mont">{{this.productItem.vipNormalPrice? threeCommaAdd(this.productItem.vipNormalPrice) : 0}}</span>
                                <span class="unit">원</span>
                            </span>
                            <span class="discount-rate" v-if="this.productItem.vipSalePercent != '0'">
                                <span class="price mont">{{this.productItem.vipSalePercent ? Math.ceil(Number(this.productItem.vipSalePercent)) : 0}}</span>
                                <span class="unit">%</span>
                            </span>
                        </div>
                        <div class="goods-price" v-else>
                            <span class="price-buy">
                                <span class="price mont">{{this.productItem.normalSellingPrice? threeCommaAdd(this.productItem.normalSellingPrice) : 0}}</span>
                                <span class="unit">원</span>
                            </span>
                            <span class="price-orig">
                                <span class="price mont">{{this.productItem.normalPrice? threeCommaAdd(this.productItem.normalPrice) : 0}}</span>
                                <span class="unit">원</span>
                            </span>
                            <span class="discount-rate" v-if="this.productItem.normalSalePercent != '0'">
                                <span class="price mont">{{this.productItem.normalSalePercent ? Math.ceil(Number(this.productItem.normalSalePercent)) : 0}}</span>
                                <span class="unit">%</span>
                            </span>
                        </div>
                        <div class="option-box" style="position: relative; z-index: 2;">
                            <div class="option-name">
                                무이자 할부 안내
                            </div>
                            <div class="option-value flex-between">
                                <div class="int-box">
                                    <button type="button" class="int-free" @click="ifpPop = true">자세히 보기</button>
                                    <div class="int-free-pop" v-if="ifpPop">
                                        <div class="ifp-title">
                                            <span>무이자 할부 안내</span>
                                            <button class="ifp-close" @click="ifpPop = false">닫기</button>
                                        </div>
                                        <div class="ifp-cont" v-html="this.ifpData"></div>
                                        <div class="ifp-button">
                                            <button type="button" @click="ifpPop = false">확인</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="option-box" v-if="this.productItem.manufacturer">
                            <div class="option-name">
                                원산지/제조사
                            </div>
                            <div class="option-value">
                                <span>{{this.productItem.manufacturer}}</span>
                            </div>
                        </div>
                        <div class="option-box">
                            <div class="option-name">
                                배송비
                            </div>
                            <div class="option-value">
                                <span v-if="this.productItem.shippingPrice == 0">무료배송</span>
                                <span v-else>{{threeCommaAdd(Number(this.productItem.shippingPrice))}} 원</span>
                            </div>
                        </div>
                        <div class="option-hr"></div>
                        <div class="option-box has-ship">
                            <div class="option-name">
                                배송방법
                            </div>
                            <div class="option-value">
                                <div class="ship-tab">
                                    <label>
                                        <input type="radio" name="shipping" v-model="pickupMethod" value="1">
                                        <span>일반배송</span>
                                    </label>
                                    <!--TODO: 보안성-->
                                    <label v-if="productItem.shippingPickup && productItem.isReservation !='Y'">
                                        <input type="radio" name="shipping" v-model="pickupMethod" value="2">
                                        <span>골프장 픽업</span>
                                    </label>
                                    <label v-if="productItem.isReservation !='Y' && (!!productItem.shippingService)">
                                        <input type="radio" name="shipping" v-model="pickupMethod" value="3">
                                        <span>{{productItem.shippingService ==='anniversary'? '기념일 배송' :'명절 배송'}}</span>
                                    </label>
                                </div>
                                <!-- 20221021 주석처리 -->
                                <!-- <div class="ship-comment">일반배송 {{this.productItem.shippingPrice}}원 / CJ택배 / 평균 3일 이내 배송</div> -->

                                <!-- PC 상품 수령 날짜 선택 영역 -->
                                <div class="ship-option-box" v-if="pickupMethod==='3' && this.loadSpecial">
                                    <p class="so-txt-title">상품 수령 날짜 선택</p>
                                    <!-- 기념일 picker -->
                                    <v-date-picker
										v-if="productItem.shippingService ==='anniversary'"
										v-model="this.pickerDateSpecial"
										mode="date"
										color="orange"
                                        :date="this.pickerToday"
										class="input_area"
										:min-date="this.pickerMin"
										:masks="this.pickerFormat"
										:disabled-dates="this.pickerDateSpecialDisable"
										:attributes="pickerAttrs"
									>
										<template v-slot="{ inputValue, inputEvents }">
											<input type="text" id="receiveDate" name="receiveDate" placeholder="yyyy-mm-dd" class="so-datepicker hasDatepicker"
												:value="inputValue"
												v-on="inputEvents"
											>
											<label for="receiveDate" class="blind">수령날짜 입력</label>
										</template>
									</v-date-picker>

                                    <!-- 둘다 선택 가능한 holiday type -->
                                    <v-date-picker
										v-else-if='this.productItem.shippingService === "holiday"'
										v-model="this.pickerDateSpecial"
										mode="date"
										color="orange"
										class="input_area"
										:masks="this.pickerFormat"
										:available-dates="this.pickerDateSpecialRangeAll"
									>
										<template v-slot="{ inputValue, inputEvents }">
											<input type="text" id="receiveDate" name="receiveDate" placeholder="yyyy-mm-dd" class="so-datepicker hasDatepicker"
												:value="inputValue"
												v-on="inputEvents"
											>
											<label for="receiveDate" class="blind">수령날짜 입력</label>
										</template>
									</v-date-picker>

									<!-- 명절 picker -->
									<v-date-picker
										v-else
										v-model="this.pickerDateSpecial"
										mode="date"
										color="orange"
										class="input_area"
										:min-date="this.pickerDateSpecialRange[this.productItem.shippingService]?.sdate"
										:max-date="this.pickerDateSpecialRange[this.productItem.shippingService]?.edate"
										:masks="this.pickerFormat"

										:attributes="pickerAttrs"
									>
										<template v-slot="{ inputValue, inputEvents }">
											<input type="text" id="receiveDate" name="receiveDate" placeholder="yyyy-mm-dd" class="so-datepicker hasDatepicker"
												:value="inputValue"
												v-on="inputEvents"
											>
											<label for="receiveDate" class="blind">수령날짜 입력</label>
										</template>
									</v-date-picker>
                                </div>
                                <!-- PC 상품 수령 날짜 선택 영역 끝 -->

                                <!-- PC 골프장 선택 -->
                                <div class="ship-option-box" v-if="pickupMethod==='2'">
                                    <p class="so-txt-title">골프장 선택</p>
                                    <div class="so-place-check checkbox-custom" >
                                        <label v-for="(item,index) in adminSetGolfData.golf" :key="index">
                                            <input type="radio" name="shippingplace" v-model="shippingplace" :value="item.trim()">
                                            <span>{{changingGolfLabel(item)}}</span>
                                        </label>

                                    </div>
                                    <p class="so-txt-title">상품 수령 날짜 선택</p>
                                    <p class="so-txt-primary">* 상품 수령은 금일부터 {{adminSetGolfData.date}}일 후 부터 가능합니다.</p>

									<v-date-picker
										v-model="this.pickerDatePickup"
										mode="date"
										color="orange"
                                        :date="this.pickerToday"
										class="input_area"
										:min-date="this.pickerMin"
										:masks="this.pickerFormat"
										:disabled-dates="this.pickerDatePickupDisable"
										:attributes="pickerAttrs"
									>
										<template v-slot="{ inputValue, inputEvents }">
											<input type="text" id="receiveDate" name="receiveDate" placeholder="yyyy-mm-dd" class="so-datepicker hasDatepicker"
												:value="inputValue"
												v-on="inputEvents"
											>
											<label for="receiveDate" class="blind">수령날짜 입력</label>
										</template>
									</v-date-picker>

                                    <div class="input_area">
                                        <input type="text" id="pickAsk" name="pickAsk" v-model="golfcomment" placeholder="골프장 픽업 관련 문의 사항을 남겨주세요" class="so-ship-comment">
                                        <label for="pickAsk" class="blind">픽업 문의 사항 입력</label>
                                    </div>
                                </div>
                                <!-- PC 골프장 선택 끝 -->
                            </div>
                        </div>

                        <!-- PC 재입고 알림 신청 -->
                        <!--TODO: 보안성-->
                        <div class="option-box" v-if="soldOut_cnt>0 || (productItem.isCombine !='true'&& productItem.stock==0)" >
                            <div class="option-name for-pc"></div>
                            <div class="option-value" v-if="productItem.hasStock == 'Y'">
                                <button type="button" class="alert-arriv" @click="notiPop(1)"><span>재입고 알림 신청</span></button>
                            </div>
                        </div>
                        <div class="has-comment" v-if="this.productItem.isReservation=='Y'">
                            <p class="comment primary bottom" v-if="this.productItem.reservationMinWeek != null && this.productItem.reservationMaxWeek != null">* 예약 주문 상품입니다. (최소 {{this.productItem.reservationMinWeek}}주에서 최대 {{this.productItem.reservationMaxWeek}}주 소요)</p>
                            <p class="comment primary bottom" v-else-if="this.productItem.reservationMinWeek != null">* 예약 주문 상품입니다. (최소 {{this.productItem.reservationMinWeek}}주 소요)</p>
                            <p class="comment primary bottom" v-else-if="this.productItem.reservationMaxWeek != null">* 예약 주문 상품입니다. (최대 {{this.productItem.reservationMaxWeek}}주 소요)</p>
                        </div>
                        <!-- PC 재입고 알림 신청 끝 -->
                        <!-- PC 상품 구매 영역 -->
                        <div class="goods-buy-box for-pc">
                            <!--
                                코멘트 있는 경우 .has-comment
                                안쪽 코멘트 위에 달릴 경우 하단과 같이 작성
                                .top .bottom 위치따라 옵션 적용
                                .right 오른쪽 정렬

                            -->
                            <div v-if="productItem.hasOption == 'Y'">
                                <div class="option-box has-comment" v-for="(item, index) in requireOption"
                                 :key="index">
                                    <div class="option-name" >
                                        {{item.name}}
                                    </div>
                                    <div class="option-value">
                                        <div class="option-input-select">
                                            <!-- {{this.optionJson[`co_0_0_1_0_4_1`].stock}} -->
                                            <button type="button" class="select-handler" @click="optionOpen($event)">
                                                <span v-if="this.selectOpt[index] != undefined">{{item.value[this.selectOpt[index]].name}}</span>
                                                <span v-else>옵션선택</span>
                                            </button>
                                            <ul class="select-cont" >
                                                <li v-for="(optItem,optidx) in item.value" :key="optidx"
                                                    :ref="`${item.index}_${optidx}`" class=""

                                                >
                                                <!--:class="{'soldout': optionJson[`co_${item.index}_${optidx}`]?.stock == 0 && optionJson[`co_${item.index}_${optidx}`]?.changeStock == 'Y', 'blind': optionJson[`co_${item.index}_${optidx}`]?.status != 'for_sale'}"-->
                                                    <a href="javascript:;" @click="pushFragmentOpt('co', index, item.index, optidx, optItem,item.is_necessary, `${item.index}_${optidx}`); optionCloseForRequire($event);">
                                                        <span class="img" v-if="optItem.type == 'color'"><div :style="'width: 80%; margin: 10%; padding-bottom: 80%; border-radius: 100%; background-color:'+optItem.value"></div></span>
                                                        <span class="img" v-else-if="optItem.type == 'img'"><img :src="optItem.value?.real_url" alt="옵션 이미지"></span>
                                                        <span class="name">{{optItem.name}}</span>
                                                    </a>
                                                </li>

                                                <!-- <li class="soldout">
                                                    <a href="javascript:;">
                                                        <span class="img"><img src="../../assets/images/dummy/goods_image_sample02.jpg" alt="옵션 이미지"></span>
                                                        <span class="name">TSi2_9도_DIAMANA BF 5_R</span>
                                                        <span class="cost"><em class="mont">5,000</em>원</span>
                                                    </a>
                                                </li> -->
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="option-box has-comment" v-for="(item, index) in nRequireOption"
                                    :key="index">
                                    <div class="option-name" >
                                        {{item.name}}
                                    </div>
                                    <div class="option-value">
                                        <div class="option-input-select">

                                            <button type="button" class="select-handler" @click="optionOpen($event)">옵션선택</button>
                                            <ul class="select-cont" >
                                                <li v-for="(optItem,optidx) in item.value" :key="optidx"
                                                :ref="`${item.index}_${optItem.name}`" class=""
                                                >
                                                    <a href="javascript:;" @click="pushFragmentOpt('uo',index,item.index,optidx,optItem,item.is_necessary)" >
                                                        <span class="img" v-if="optItem.type == 'color'"><div :style="'width: 80%; margin: 10%; padding-bottom: 80%; border-radius: 100%; background-color:'+optItem.value"></div></span>
                                                        <span class="img" v-else-if="optItem.type == 'img'"><img :src="optItem.value?.real_url" alt="옵션 이미지"></span>
                                                        <span class="name">{{optItem.name}}</span>

    <!--                                                    <span class="cost"><em class="mont">{{optItem.value}}</em>원</span>-->
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            <!-- 필수 옵션 루프 -->
                                <div class="option-box" v-for="(item, key, index) in combineOpt" >
                                    <div class="option-name" ></div>
                                    <div class="option-value">
                                        <div class="option-value-change">
                                            <div class="ovc-top">
                                                <div class="ovc-name">{{drawCombineOptName(item.items)}}</div>
                                                <button type="button" class="ovc-close" @click="deleteOpt(key,'C')">닫기</button>
                                            </div>
                                            <div class="ovc-bottom">
                                                <div class="count-change" >
                                                    <!-- TODO 20221027 -->
                                                    <button type="button" class="count-down" @click="combineOptCount(key,'M')">-1</button>
                                                    <span class="count">{{item.amount}}</span>
                                                    <button type="button" class="count-up" @click="combineOptCount(key,'P')">+1</button>
                                                </div>
                                                <div class="option-price">
                                                    <!--여기-->
                                                    <span class="price mont" v-if="this.userGrade == 'VIP'">{{threeCommaAdd(Number(item.amount) * (Number(item.value)+ productItem.vipSellingPrice))}}</span>
                                                    <span class="price mont" v-else>{{threeCommaAdd(Number(item.amount ) * (Number(item.value)+ productItem.normalSellingPrice))}}</span>

                                                    <span class="unit">원</span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <!-- 필수 옵션 루프 끝 -->


                            <!-- 선택 옵션 루프 -->
                                <div class="option-box" v-for="(item, key ,index) in noCombineOpt">
                                    <div class="option-name" ></div>
                                    <div class="option-value">
                                        <div class="option-value-change">
                                            <div class="ovc-top">
                                                <div class="ovc-name">{{item.items[0].opt_name}} : {{item.items[0].name}}</div>
                                                <button type="button" class="ovc-close" @click="deleteOpt(key,'N')">닫기</button>
                                            </div>
                                            <div class="ovc-bottom">
                                                <div class="count-change" >
                                                    <!-- TODO 20221027 -->
                                                    <button type="button" class="count-down" @click="noCombineOptCount(key, 'M')">-1</button>
                                                    <span class="count">{{item.amount}}</span>
                                                    <button type="button" class="count-up" @click="noCombineOptCount(key, 'P')">+1</button>
                                                </div>
                                                <div class="option-price">
                                                    <span class="price mont">{{threeCommaAdd(Number(item.amount) * Number(item.value))}}</span>
                                                    <span class="unit">원</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 선택 옵션 루프 끝 -->

                            <div class="option-box" v-if="productItem.hasOption == 'N'">
                                <div class="option-name" >수량</div>
                                <div class="option-value">
                                    <div class="option-value-change">
                                        <div class="ovc-top">
                                            <div class="ovc-name">{{productItem.textName ? productItem.textName : productItem.name}}</div>
                                            <button type="button" class="ovc-close" @click="deleteOpt(key,'N')">닫기</button>
                                        </div>
                                        <div class="ovc-bottom">
                                            <div class="count-change" >
                                                <!-- TODO 20221027 -->
                                                <button type="button" class="count-down" @click="singleOptionCount('M')">-1</button>
                                                <span class="count">{{optionSingleCount}}</span>
                                                <button type="button" class="count-up" @click="singleOptionCount('P')">+1</button>
                                            </div>
                                            <div class="option-price">
                                                <span class="price mont" v-if="(this.userGrade == 'VIP') && (this.productItem.vipNormalPrice)">{{threeCommaAdd(Number(productItem.vipSellingPrice) * Number(optionSingleCount))}}</span>
                                                <span class="price mont" v-else>{{threeCommaAdd(Number(productItem.normalSellingPrice) * Number(optionSingleCount))}}</span>
                                                <span class="unit">원</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="option-box goods-all-price-wrap">
                                <div class="option-name">총 상품 금액</div>
                                <div class="option-value">
                                    <div class="goods-all-price">

                                        <span class="price mont" v-if="(this.userGrade == 'VIP') && (this.productItem.vipNormalPrice)">{{this.productItem.hasOption =='Y' ? threeCommaAdd(getTotalOptionPay) : threeCommaAdd(Number(this.productItem.vipSellingPrice) * Number(this.optionSingleCount))}}</span>
                                        <span class="price mont" v-else>{{this.productItem.hasOption =='Y' ? threeCommaAdd(getTotalOptionPay) : threeCommaAdd(Number(this.productItem.normalSellingPrice) * Number(this.optionSingleCount))}}</span>
                                        <span class="unit">원</span>
                                    </div>
                                </div>
                            </div>
                            <div class="buy-btn-box">
                                <button type="button" class="btn-buy type-resv" @click="buyProductItemNow()" v-if="this.productItem.isReservation=='Y'"><span>예약주문</span></button>
                                <button type="button" class="btn-buy" @click="buyProductItemNow()" v-else-if="!this.showSoldOut">바로구매</button>
                                <!-- TODO: 20221021 품절 버튼 추가 사용해주세요 -->

                                <button type="button" class="btn-soldout" v-else-if="!!this.showSoldOut">품절</button>
                                <button v-if="this.productItem.isPresent =='Y' && !this.showSoldOut" type="button" class="btn-gift" @click="giftProductItem()">선물하기</button>
                                <button type="button" class="btn-cart" v-if="!this.showSoldOut" @click="getInCart()">장바구니</button>
                            </div>
                        </div>
                        <!-- PC 상품 구매 영역 끝 -->

                        <div class="goods-seller-info">
                            <div class="inner-flex">
                                <div class="seller-info">
                                    <!-- <div class="shop-logo"><img src="../../assets/images/dummy/goods_image_sample.png" alt="샘플"></div> -->
                                    <span class="name">{{this.productItem.brand.name}}</span>
                                </div>
                                <div class="shop-like">
                                    <button :class="{'on': checkLikeBrand}" @click="addLikeBrand($event)"></button>
                                </div>
                            </div>
                            <div class="inner-flex">
                                <div class="seller-info">
                                    <i class="shop-icon" @click="sellerInfo = !sellerInfo"></i>
                                    <span class="name" @click="sellerInfo = !sellerInfo">{{this.productItem.partnerName}}</span>
                                    <div class="seller-info-pop" :class="{'on' :sellerInfo}">
                                        <b>판매자 명 : </b><span>{{this.productItem.partnerName}}</span><br />
                                        <b>판매자 번호 : </b><span>{{this.productItem.partnerBusinessPhoneNo}}</span><br />
                                        <b>상담가능 시간 : </b><span>{{this.productItem.partnerConsultationStr}}</span><br />
                                    </div>
                                </div>
                                <div class="shop-link" v-if="this.productItem.partnerKakaotalkChannelUrl != null && this.productItem.isKakao == 'Y'">
                                    <a :href="this.productItem.partnerKakaotalkChannelUrl">상담하기</a>
                                </div>
                            </div>
                        </div>


                        <!-- MOBILE 상품 구매 영역 -->
                        <!-- btnFull 클릭 시 상품 구매 팝업 노출 -->
                        <div class="fix_btn for-m-flex" v-if="!!this.showSoldOut">
                            <button type="button" class="btn soldout">품절</button>
                        </div>
                        <div class="fix_btn for-m-flex" v-else>
                            <button type="button" class="btn buy type-resv" @click="buyOpen()" v-if="this.productItem.isReservation=='Y'"><span>예약주문</span></button>
                            <button type="button" class="btn buy" @click="buyOpen()" v-else>바로 구매</button>
                            <button v-if="this.productItem.isPresent =='Y'" type="button" class="btn gift" @click="buyOpen()">선물하기</button>
                            <a href="javascript:;" class="btn cart" @click="buyOpen()">장바구니</a>
                        </div>
                        <div class="goods_buy mOpen" :class="{'on': this.buyLayer}">
                            <div class="buy_bg" @click="buyOpen()"></div>
                            <div class="buy_con">
                                <button type="button" class="btn btnActive">팝업 확장/축소</button>
                                <div class="info_area">
                                    <strong class="option_name">{{this.productItem.textName ? this.productItem.textName : this.productItem.name}}</strong>
                                    <div class="option_info" v-if="productItem.hasOption == 'N'">
                                        <div class="count_change">
                                            <!-- TODO 20221027 -->
                                            <button type="button" class="count-down" @click="singleOptionCount('M')">-1</button>
                                            <span class="count">{{optionSingleCount}}</span>
                                            <button type="button" class="count-up" @click="singleOptionCount('P')">+1</button>
                                        </div>
                                        <div class="price_area">
                                            <span class="price mont" v-if="(this.userGrade == 'VIP') && (this.productItem.vipNormalPrice)">{{this.productItem.hasOption =='Y' ? threeCommaAdd(getTotalOptionPay) : threeCommaAdd(Number(productItem.vipSellingPrice) * Number(optionSingleCount))}}</span>
                                            <span class="price mont" v-else>{{this.productItem.hasOption =='Y' ? threeCommaAdd(getTotalOptionPay) : threeCommaAdd(Number(productItem.normalSellingPrice) * Number(optionSingleCount))}}</span>
                                            <span class="unit">원</span>
                                            <!-- <button type="button" class="btn delete">삭제</button> -->
                                        </div>
                                    </div>

                                    <div class="option_info02" v-if="productItem.hasOption == 'Y'">
                                        <div class="oi_area" v-for="(item, index) in requireOption"
                                            :key="index">
                                            <div class="option-name" >
                                                {{item.name}}
                                            </div>
                                            <div class="oi_select">
                                                <!-- {{this.optionJson[`co_0_0_1_0_4_1`].stock}} -->
                                                <button type="button" class="select-handler" @click="optionOpen($event)">
                                                    <span v-if="this.selectOpt[index] != undefined">{{item.value[this.selectOpt[index]].name}}</span>
                                                    <span v-else>옵션선택</span>
                                                </button>
                                                <ul class="select-cont" >
                                                    <li v-for="(optItem,optidx) in item.value" :key="optidx"
                                                    :ref="`${item.index}_${optidx}`" class=""
                                                    >
                                                    <!--:class="{'soldout': optionJson[`co_${item.index}_${optidx}`]?.stock == 0 && optionJson[`co_${item.index}_${optidx}`]?.changeStock == 'Y', 'blind': optionJson[`co_${item.index}_${optidx}`]?.status != 'for_sale'}"-->
                                                        <a href="javascript:;" @click="pushFragmentOpt('co', index, item.index, optidx, optItem,item.is_necessary, `${item.index}_${optidx}`); optionCloseForRequire($event);">
                                                            <span class="img" v-if="optItem.type == 'color'"><div :style="'width: 80%; margin: 10%; padding-bottom: 80%; border-radius: 100%; background-color:'+optItem.value"></div></span>
                                                            <span class="img" v-else-if="optItem.type == 'img'"><img :src="optItem.value?.real_url" alt="옵션 이미지"></span>
                                                            <span class="name">{{optItem.name}}</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="oi_area" v-for="(item, index) in nRequireOption"
                                            :key="index">
                                            <div class="option-name" >
                                                {{item.name}}
                                            </div>
                                            <div class="oi_select">
                                                <!-- {{this.optionJson[`co_0_0_1_0_4_1`].stock}} -->
                                                <button type="button" class="select-handler" @click="optionOpen($event)">
                                                    <span>옵션선택</span>
                                                </button>
                                                <ul class="select-cont" >
                                                    <li v-for="(optItem,optidx) in item.value" :key="optidx"
                                                    :ref="`${item.index}_${optItem.name}`" class=""
                                                    >
                                                        <a href="javascript:;" @click="pushFragmentOpt('uo', index, item.index, optidx, optItem,item.is_necessary); optionCloseForRequire($event);">

                                                            <span class="img" v-if="optItem.type == 'color'"><div :style="'width: 80%; margin: 10%; padding-bottom: 80%; border-radius: 100%; background-color:'+optItem.value"></div></span>
                                                            <span class="img" v-else-if="optItem.type == 'img'"><img :src="optItem.value?.real_url" alt="옵션 이미지"></span>
                                                            <span class="name">{{optItem.name}}</span>

                                                        </a>

                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <!-- 필수 옵션 루프 -->
                                        <div class="oi_add" v-for="(item, key, index) in combineOpt">
                                            <!-- <strong class="add_tit">옵션 추가</strong> -->
                                            <strong class="option_name">{{drawCombineOptName(item.items)}}</strong>
                                            <div class="option_info">
                                                <div class="count_change">
                                                    <!-- TODO 20221027 -->
                                                    <button type="button" class="count-down" @click="combineOptCount(key,'M')">-1</button>
                                                    <span class="count">{{item.amount}}</span>
                                                    <button type="button" class="count-up" @click="combineOptCount(key,'P')">+1</button>
                                                </div>
                                                <div class="price_area">
                                                    <!--여기-->
                                                    <span class="price mont" v-if="this.userGrade == 'VIP'">{{threeCommaAdd(Number(item.amount ) * (Number(item.value)+ productItem.vipSellingPrice))}}</span>
                                                    <span class="price mont" v-else>{{threeCommaAdd(Number(item.amount ) * (Number(item.value)+ productItem.normalSellingPrice))}}</span>
                                                    <span class="unit">원</span>
                                                    <button type="button" class="btn delete" @click="deleteOpt(key,'C')">삭제</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 필수 옵션 루프 끝 -->

                                        <!-- 선택 옵션 루프 -->
                                        <div class="oi_add" v-for="(item, key, index) in noCombineOpt">
                                            <!-- <strong class="add_tit">옵션 추가</strong> -->
                                            <strong class="option_name">{{item.items[0].opt_name}} : {{item.items[0].name}}</strong>
                                            <div class="option_info">
                                                <div class="count_change">
                                                    <!-- TODO 20221027 -->
                                                    <button type="button" class="count-down" @click="noCombineOptCount(key,'M')">-1</button>
                                                    <span class="count">{{item.amount}}</span>
                                                    <button type="button" class="count-up" @click="noCombineOptCount(key,'P')">+1</button>
                                                </div>
                                                <div class="price_area">
                                                    <span class="price mont">{{threeCommaAdd(Number(item.amount) * Number(item.value))}}</span>
                                                    <span class="unit">원</span>
                                                    <button type="button" class="btn delete" @click="deleteOpt(key,'N')">삭제</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 선택 옵션 루프 끝 -->

                                    </div>
                                    <div class="total">
                                        <p>총 상품 금액</p>
                                        <div class="total_price">
                                            <span class="price mont" v-if="(this.userGrade == 'VIP') && (this.productItem.vipNormalPrice)">{{this.productItem.hasOption =='Y' ? threeCommaAdd(getTotalOptionPay) : threeCommaAdd(Number(this.productItem.vipSellingPrice) * Number(this.optionSingleCount) )}}</span>

                                            <span class="price mont" v-else>{{this.productItem.hasOption =='Y' ? threeCommaAdd(getTotalOptionPay ) : threeCommaAdd(Number(this.productItem.normalSellingPrice) * Number(this.optionSingleCount) )}}</span>

                                            <span class="unit">원</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="fix_btn">
                                <button type="button" class="btn buy type-resv" @click="buyProductItemNow()" v-if="this.productItem.isReservation=='Y'"><span>예약주문</span></button>
                                <button type="button" class="btn buy" @click="buyProductItemNow()" v-else>바로 구매</button>
                                <button v-if="this.productItem.isPresent =='Y'" type="button" class="btn gift" @click="giftProductItem()">선물하기</button>
                                <a href="javascript:;" class="btn cart" @click="getInCart()">장바구니</a>
                            </div>
                        </div>
                        <!-- MOBILE 상품 구매 영역 끝 -->
                    </div>
                </div>
                <!-- 상품 슬라이드 -->
                <!--TODO: 보안성-->
                <div class="recommend_area" v-if="(this.relativeRandomData != null) && (this.relativeRandomData?.length > 0)">
                    <h3>이런 상품은 어떠세요?</h3>
                    <div class="rcm_slide">
                        <div class="swiper-container">
                            <swiper
                                class="swiper-wrapper"
                                :modules="modules"
                                :spaceBetween="30"
                                :slidesPerView="1.5"
                                :loop="this.relativeRandomData?.length > 4 ? true : false"
                                :watchSlidesProgress="true"
                                :navigation="{
                                    nextEl: '.rcm_slide .swiper-button-next',
                                    prevEl: '.rcm_slide .swiper-button-prev',
                                }"
                                :breakpoints="{
                                    769: {
                                        spaceBetween: 40,
                                        slidesPerView: 4,
                                    },
                                }"
                            >
                                <swiper-slide class="swiper-slide" v-for="(item, index) in this.relativeRandomData" :key="index">
                                    <a href="javascript:;" @click="move_to_detail(item.id)">
                                        <span class="img" :style="`background-image:url(${item.mainImagePath})`">{{item.mainImagePath}}</span>
                                        <span class="txt">
                                            <span class="goods-name">
                                                <strong class="name">{{item.textName ? item.textName : item.name}}</strong>
                                            </span>
                                            <span class="goods-price">
                                                <span class="price"><em class="num mont">{{threeCommaAdd(item.normalSellingPrice)}}</em>원</span>
                                                <span class="orig"><em class="num mont">{{threeCommaAdd(item.normalPrice)}}</em>원</span>
                                                <span class="discount"><em class="num">{{Math.floor(Number(item.normalSalePercent))}}</em>%</span>
                                            </span>
                                        </span>
                                    </a>
                                </swiper-slide>
                            </swiper>
                        </div>
                        <div class="slide_btn">
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
                        </div>
                    </div>
                </div>
                <!-- 상품 상세 등 탭 -->
                <div class="goods-info-detail-wrap">
                    <div id="gdsDetail0">
                        <div class="goods-detail-tab">
                            <a href="javascript:;" :class="{'on': this.detailTabIndex == 0}" @click="this.detailTabIndex = 0">상품 상세정보</a>
                            <a href="javascript:;" :class="{'on': this.detailTabIndex == 1}" @click="this.detailTabIndex = 1">상품고시</a>
                            <!--TODO: 보안성-->
                            <a href="javascript:;" :class="{'on': this.detailTabIndex == 2}" @click="this.detailTabIndex = 2">
                                리뷰<span>(<em class="mont">{{this.reviewCount}}</em>)</span>
                            </a>
                            <a href="javascript:;" :class="{'on': this.detailTabIndex == 3}" @click="this.detailTabIndex = 3">
                                상품문의<span>(<em class="mont">{{this.pageListCount}}</em>)</span>
                            </a>
                        </div>
                        <div class="goods-detail-cont" :class="{'on' :this.detailTabIndex == 0}">
                            <div class="gds_detail">
                                <!-- 상품 상세 예시 -->
                                <p class="blind">상품 상세정보 영역</p>
                                <!-- <div class="swiper-slide" v-for="(data, idx) in this.productItem.image" :key="idx">
                                    <img :src="this.getPic(data)" :alt="data">
                                </div> -->
                                <!-- <img src="../../assets/images/dummy/detail_sample.jpg" alt="상세 샘플"> -->
                                <!-- 상품 상세 예시 -->
                                <div v-html="this.productItem.detail"></div>
                            </div>
                        </div>
                        <div class="goods-detail-cont" :class="{'on' :this.detailTabIndex == 1}">
                            <h4>상품정보 제공 고시</h4>
                            <table class="goods-detail-table">
                                <colgroup>
                                    <col class="th_col">
                                    <col>
                                </colgroup>
                                <tbody>
                                    <tr v-for="(item, index) in this.productItem.informationProduct" :key="index" :class="{'hide': (item.title == '') && (item.content == '' )}">
                                        <th scope="row">{{item.title}}</th>
                                        <td>{{item.content}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- <h4>교환/반품/환불 안내</h4>
                            <div v-html="this.productItem.informationProductType" class="goods-detail-info"></div> -->

                            <h4 v-if="this.productItem.informationPrecaution">배송안내</h4>
                            <div v-if="this.productItem.informationPrecaution" v-html="this.productItem.informationPrecaution" class="goods-detail-info"></div>
                            <h4 v-if="this.productItem.informationReturn">교환/반품/환불 안내</h4>
                            <div v-if="this.productItem.informationReturn" v-html="this.productItem.informationReturn" class="goods-detail-info"></div>

                        </div>
                        <div class="goods-detail-cont" :class="{'on' :this.detailTabIndex == 2}">
                            <DetailReview
								:prodId="this.prodId"
								@responseCount="responseReviewCount"
							/>
                        </div>
                        <div class="goods-detail-cont" :class="{'on' :this.detailTabIndex == 3}">
                            <div class="tab-goods-qna">
                                <div class="tgq-header">
                                    <div class="tgq-left">
                                        전체(<span class="num mont">{{this.pageListCount}}</span><span class="unit">건</span>)
                                    </div>
                                    <button type="button" class="tab-board-write" @click="this.qnaWriteOpenCheck"><span>상품문의</span></button>
                                </div>
                                <div class="tgq-body">
                                    <!-- 데이터 없음 -->
                                    <div class="content_none" v-if="this.qnaList == null || this.qnaList?.length == 0">
                                        <i></i>
                                        <p>등록된 상품문의가 없습니다.</p>
                                    </div>
                                    <div v-else>
                                        <div v-for="(item, index) in qnaList" :key="index">
                                            <div class="tgqb-list" :class="{'type-secret' : item.isSecret == 'Y'}" :id="'qnaList'+item.id">
                                                <div class="tgqb-header">
                                                    <div class="tag" v-if="item.answer == null">대기중</div>
                                                    <div class="tag complete" v-else>답변완료</div>

                                                    <div class="header-info">
                                                        <span class="title" v-if="item.isSecret == 'Y' && this.passwordOkList[item.id] == false">비밀글 입니다.</span>
                                                        <span class="title" v-else><span v-html="changeBr(item.textTitle)"></span></span>
                                                        <div class="user-info">
                                                            <span class="id mont">{{item.memberName.substr(0, item.memberName.length - 3) + '***'}}</span>
                                                            <!-- TODO: 등록일시 데이터가 없음 -->
                                                            <span class="date mont">{{String(item.isrtDate).substr(0, 10)}}</span>
                                                        </div>
                                                    </div>
                                                    <div class="tab-board-edit" v-if="item.memberId == this.userId">
                                                        <button type="button" class="type-edit" v-if="item.isSecret == 'Y'" @click="passwordPopOpen(item, true)">수정</button>
                                                        <button type="button" class="type-edit" v-else @click="qnaEdit(item)">수정</button>
                                                        <button type="button" class="type-delete" @click="qnaDelPop(item.id)">삭제</button>
                                                    </div>
                                                    <div class="tgqb-arr">
                                                        <button type="button" class="btn tgqOpen" v-if="item.isSecret == 'Y'" @click="passwordPopOpen(item)">열기/닫기</button>
                                                        <button type="button" class="btn tgqOpen" v-else @click="qnaOpen(item)">열기/닫기</button>
                                                    </div>
                                                </div>
                                                <div class="hidden-wrap">
                                                    <div class="tqqb-body">
                                                        <div class="body-content" v-if="this.passwordOkList[item.id]" v-html="item.content?.replace(/\n/g, '<br>')"></div>
                                                        <div class="body-answer" v-if="item.answer !== null && this.passwordOkList[item.id]">
                                                            <div class="tag">답변</div>
                                                            <div class="answer-content">
                                                                <span class="title">{{item.answer}}</span>
                                                                <div class="user-info">
                                                                    <span class="date mont">{{item.answerDate.substr(0, 10)}}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pagination" v-if="this.pageListCount > 0">
                                    <a href="javascript:;" class="first"
                                            v-if="pageFirst"
                                            @click="pagination(pageFirst)"
                                    >go first</a>
                                    <a href="javascript:;" class="prev"
                                            v-if="pagePrev"
                                            @click="pagination(pagePrev)"
                                    >go prev</a>

                                    <div class="page">
                                            <a href="javascript:;"
                                                    v-for="pageNum in pagenationList"
                                                    :key="pageNum"
                                                    @click="pagination(pageNum)"
                                                    :class="{'on': pageNum === thisPage}"
                                            >{{pageNum}}</a>
                                    </div>

                                    <a href="javascript:;" class="next"
                                            v-if="pageNext"
                                            @click="pagination(pageNext)"
                                    >go next</a>
                                    <a href="javascript:;" class="last"
                                            v-if="pageLast"
                                            @click="pagination(pageLast)"
                                    >go last</a>
                                </div>
                            </div>
                        </div>

                        <!-- 작성 팝업 -->
                        <div class="popup-bg on" v-if="this.qnaWritePop"></div>
                        <div class="popup-cont w01 on" id="popup-goods" v-if="this.qnaWritePop">
                            <div class="popup-header">
                                <h3 class="title">상품문의</h3>
                                <button type="button" class="popup-close-btn" @click="this.qnaWriteConfirmClose">닫기</button>
                            </div>
                            <div class="popup-body">
                                <p class="goods_title">
                                    {{this.productItem.textName}}
                                </p>
                                <div class="popup_write type-02">
                                    <div class="input_wrap">
                                        <form onsubmit="return false;">
                                            <p class="input_tit">문의 내용<strong class="required">*</strong></p>
                                            <div class="input_area">
                                                <textarea name="askDetailWrite" id="askDetailWrite"></textarea>
                                            </div>
                                            <p class="input_tit">비밀 글 설정</p>
                                            <div class="chk_area">
                                                <input type="checkbox" name="secretChkWrite" id="secretChkWrite">
                                                <label for="secretChkWrite" class="chk">
                                                    <i class="ico_chk"></i>
                                                    비밀글 선택 시 작성자만 조회 가능합니다.
                                                </label>
                                            </div>
                                            <div class="input_area">
                                                <input type="password" name="passwordWrite" id="passwordWrite">
                                            </div>
                                            <div class="btn_area">
                                                <button type="button" class="btn form02" @click="this.QnaWrite()">저장</button>
                                                <button type="button" class="btn" @click="this.qnaWriteConfirmClose">취소</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ModalAlert
                            v-if="this.qnaWritePopConfirm"
                            :text="'저장하시겠습니까?'"
                            :type="'confirm'"
                            @confirm="this.QnaWrite"
                            @close="this.qnaWriteConfirmClose"
                            style="position: relative; z-index: 999999999"
                        />

                        <!-- 수정 팝업 -->
                        <div class="popup-bg on" v-if="this.editPopup"></div>
                        <div class="popup-cont w01 on" id="popup-goods" v-if="this.editPopup">
                            <div class="popup-header">
                                <h3 class="title">상품문의</h3>
                                <button type="button" class="popup-close-btn" @click="this.editPopup = false">닫기</button>
                            </div>
                            <div class="popup-body">
                                <p class="goods_title">
                                    <span v-if="editPopupCont.product">{{editPopupCont.product.name}}</span>
                                    <span v-else>상품 미선택</span>
                                </p>
                                <div class="popup_write type-02">
                                    <div class="input_wrap">
                                        <form onsubmit="return false;">
                                            <p class="input_tit">문의 내용<strong class="required">*</strong></p>
                                            <div class="input_area">
                                                <textarea name="askDetail" id="askDetail" v-model="editPopupCont.content"></textarea>
                                            </div>
                                            <p class="input_tit">비밀 글 설정</p>
                                            <div class="chk_area">
                                                <input type="checkbox" name="secretChk" id="secretChk" :checked="editPopupCont.isSecret == 'Y'">
                                                <label for="secretChk" class="chk">
                                                    <i class="ico_chk"></i>
                                                    비밀글 선택 시 작성자만 조회 가능합니다.
                                                </label>
                                            </div>
                                            <div class="input_area">
                                                <input type="password" name="passwordEdit" id="passwordEdit">
                                            </div>
                                            <div class="btn_area">
                                                <button type="button" class="btn form02" @click="this.qnaEditSubmit">저장</button>
                                                <button type="button" class="btn popup-close" @click="this.editPopup = false">취소</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="popup-bg on" v-if="this.passwordPopup"></div>
                        <div class="popup-cont w01 on" id="popup-goods" v-if="this.passwordPopup">
                            <div class="popup-header">
                                <h3 class="title">비밀번호 확인</h3>
                                <button type="button" class="popup-close-btn" @click="this.passwordPopup = false">닫기</button>
                            </div>
                            <div class="popup-body">
                                <div class="popup_write type-03">
                                    <div class="input_wrap">
                                        <form onsubmit="return false;">
                                            <p class="input_tit">비밀번호를 입력해주세요</p>
                                            <div class="input_area">
                                                <input type="password" name="passwordCheck" id="passwordCheck" v-model="this.passwordCheckTxt">
                                            </div>
                                            <div class="btn_area">
                                                <button type="button" class="btn form02" @click="this.passwordCheckQuery">확인</button>
                                                <button type="button" class="btn popup-close" @click="this.passwordPopup = false">취소</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ModalAlert
                            v-if="this.qnaDeleteConfirm"
                            :text="'삭제하시겠습니까?'"
                            :type="'confirm'"
                            @confirm="qnaDelete"
                            @close="this.qnaDeleteConfirm = false"
                        />

                        <ModalAlert
                            v-if="this.modalCopyOk"
                            :text="'수정이 완료되었습니다.'"
                            @close="this.modalCopyOk = false"
                        />

                        <ModalAlert
                            style="position: relative; z-index: 9999999;"
                            v-if="this.passwordInputRequirePop"
                            :text="'비밀번호를 입력해주세요'"
                            @close="this.passwordInputRequirePop = false"
                        />

                        <ModalAlert
                            style="position: relative; z-index: 9999999;"
                            v-if="this.qnaContentRequirePop"
                            :text="'문의 내용을 입력해주세요'"
                            @close="this.qnaContentRequirePop = false"
                        />

                        <ModalAlert
                            style="position: relative; z-index: 9999999;"
                            v-if="this.passwordIsWrong"
                            :text="'올바르지 않은 비밀번호 입니다.'"
                            @close="this.passwordIsWrong = false"
                        />



                    </div>
                </div>
            </div>

            <!-- 20220930 추가 재입고 팝업 Mark : 재입고 알림-->
            <div class="popup-bg" :class="{'on': this.setStockNotiToggle == 1}"></div>

            <div class="popup-cont w01 type-notice" id="popup-notice" :class="{'on': this.setStockNotiToggle == 1}">
                <div class="popup-header">
                    <h3 class="title">재입고 알림 신청</h3>
                    <button type="button" class="popup-close-btn" @click="notiPop(0)">닫기</button>
                </div>
                <div class="popup-body">
                    <div class="goods_area">
                        <div class="goods_img">
                            <div class="img" :style="`background-image: url(${this.productItem.mainImagePath})`">관리자가 등록한 상품명</div>
                        </div>
                        <p>
                            <strong>{{this.productItem.textName}}</strong>
                            <span> </span>
                        </p>
                    </div>
                    <div class="popup_write">
                        <div class="input_wrap">

                            <form action="" >
                                <p class="input_tit" v-if="soldOut_arr.length>0">옵션 선택</p>

                                <div class="input_area" v-if="soldOut_arr.length>0">
                                    <select  v-model="select_sold_out">
                                        <option value="0">옵션을 선택하세요</option>
                                        <option v-for="(item,idx) in soldOut_arr" :key="idx" :value="{optId : item.optId, optName : item.name}">{{item.name}}</option>

                                    </select>
                                </div>
                                <p class="input_notice02">
                                    품절된 상품의 재입고시 알림톡으로 알려드립니다.
                                    <!-- <span class="user_phone">
                                        <strong>휴대폰 번호</strong>
                                        <em>010-0000-0000</em>
                                    </span> -->
                                </p>
                                <div>
                                    <p class="input_tit">휴대폰 번호</p>
                                    <div class="input_area">
                                        <input type="number" maxlength="11" v-model="noti_phone">
                                    </div>
                                </div>
                                <p class="input_notice">
                                    재입고 알림 요청 상품의 가격, 옵션 구성 등의 상품 정보가 변동 될 수 있습니다.
                                </p>
                                <p class="input_notice">
                                    재입고 알림 요청은 요청일로부터 3개월간 유효합니다.
                                </p>
                                <div class="btn_area">
                                    <button type="button" class="btn form02" @click="setStockNotify">확인</button>
                                    <button type="button" class="btn" @click="notiPop(0)">취소</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MobileNavComp />
        <FooterComp />

        <ImageViewerComp ref="vImageViewer" />

    </div>
</template>
<script>
import HeaderComp from '../../components/HeaderComp.vue';
import MobileNavComp from '../../components/MobileNavComp.vue';
import FooterComp from '../../components/FooterComp.vue';
import ModalAlert from '../../components/ModalAlert.vue';
import DetailReview from '../goodslist/DetailReview.vue';
import ImageViewerComp from '../../components/ImageViewerComp.vue';
import {Autoplay, Navigation, Pagination, Thumbs} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import axios from "axios";
import moment from "moment";

//import { io } from 'socket.io-client'
export default {
    name: "goodsList",
    components: {
        HeaderComp,
        MobileNavComp,
        FooterComp,
        ModalAlert,
		DetailReview,
        ImageViewerComp,
        Swiper,
        SwiperSlide,
    },
    data: () => ({
        pending: true,
        workpending: false,
        optionCheckPending: true,
		cartLoading: false,
		cartLoadingOk: false,
        cartLoadFrame: 0,

        backStringObjProduct : null,
        getUserId: null,
        // user
        userId: null,
        userGrade: null,
        checkLike : 0,
        checkLikeBrand : false,
        headerType: 'goods',
        dep1Cate: false,
        dep2Cate: false,
        dep3Cate: false,
        dep1Name: false,
        dep2Name: false,
        openCate: false,
        thumbsSwiper: null,
        largeImage: false,
        smallImage: [],
        thumbImage: false,
        buyLayer: false,
        prodId : null,
        productItem:{},
        buyData: null,
        pageUrl: window.location.href,
        optionSingleCount: 1,
        optionString : '',
        optionStringName : '',
        optionJson: [],
        optionJsonName: [],
        opt1Selected:null,
        opt2Selected:null,
        requireOptionIds : [],
        requireOption:[],
        nRequireOptionIds : [],
        nRequireOption:[],
        tmpArr:[],
        noTmpArr:[],
        soldCheck: [],
        ifpPop: false,
        ifpData: null,
        sellerInfo: false,
        detailTabIndex: 0,

        selectOpt : {} ,
        combineOpt : {} ,
        noCombineOpt : {},
        lastSelectedCoGroup : 0,

        //재고관리 및 재입고알림
        co_cnt: 0,
        soldOut_cnt: 0,
        setStockNotiToggle: 0,
        makeStokeListObj:{},
        soldOut_arr:[],
        soldOut_obj:{},
        select_sold_out:{},
        noti_phone : '',
        noti_phone_user: '',

        // 문의 리스트 데이터
        qnaList: null,

        // 문의 작성폼
        qnaWritePop: false,
        qnaWritePopConfirm: false,

		// 팝업
		qnaDeleteConfirm: false,
		delId: 0,

		editPopup: false,
		editPopupCont: null,
		editPassword: null,
		modalCopyOk: false,

		// 패스워드 체킹
		passwordPopup: false,
		passwordCheck: null,
		passwordCheckItem: null,
		passwordCheckResult: false,
        passwordCheckTxt: '',
		passwordOkList: {},
		passwordWasOkOpenEdit: false,
		passwordInputRequirePop: false,
        qnaContentRequirePop: false,
		passwordIsWrong: false,

        // 페이징 변수
		pageListCount: 0,
		pagenationList: [],
		thisPage: 1,
		pageFirst: null,
		pagePrev: null,
		pageNext: null,
		pageLast: null,
		loadFirst: true,

        //연계상품 변수
        relativeRandomData : null,

        //배송방법 관련 변수
        pickupMethod: '1',
        shippingplace: null,
        pickupDate: null,
        golfcomment: null,

        // 상품 리뷰 관련 변수
        reviewWritePop: false,
		reviewList: null,
		reviewCount: 0,

        // 이미지뷰어 상속
        imageViewArr: [],

        // 골프장 픽업, 기념일, 명절, 예약 v-date-picker 세팅 등
		pickerFormat: {input: 'YYYY-MM-DD'},
        pickerToday: moment(new Date).format('YYYY-MM-DD'),
		pickerMin: null,
		// 기념일 픽업 데이트
		loadSpecial: false,
		pickerDateSpecialType: null,
		pickerDateSpecial: null,
		pickerDateSpecialRange: {
			'holiday_chuseock': null,
			'holiday_seolnal': null,
		},
        pickerDateSpecialRangeAll: [],
        pickerDateSpecialRangeAllStart: null,
		// 기념일 배송 휴일 설정
		pickerDateSpecialDisable: [
			{weekdays: 1},
			{weekdays: 7},
		],
		pickerDisableAll: [
			{weekdays: 1},
			{weekdays: 2},
			{weekdays: 3},
			{weekdays: 4},
			{weekdays: 5},
			{weekdays: 6},
			{weekdays: 7},
		],

		// 골프장 픽업 데이트
		pickerDatePickup: null,
		pickerDatePickupDisable: [],
		// picker 공통 속성
		pickerAttrs: [
			{
				key: 'today',
				highlight: true,
				dates: new Date(),
			},
		],
		holidayDate: null,
        adminSetGolfData:null,

        allSoldOut:true,
        allSoldOutToggle: 0,
        showSoldOut:false,

        // 좋아요 데이터
        likeArr: null,

    }),
    created () {
        this.setState();
        this.$store.commit('setState');

        this.prodId = this.$route.params.id;

        this.getUserId = this.$store.state.userId;
        this.userId = this.$store.state.userId;
        
        console.log('this.getUserId');
        console.log(this.getUserId);
        this.getProductDetailItem();
        
        //this.getQnaList();
        this.setRelativeRandom();
        this.setIfpData();
		this.getHoliday();
        this.getLikeList();

    },
    methods: {
        getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },
        escapeRegex(string) {
            if(string){
                return string.replace(/[-\/\\^$%*+?.()|[\]{}<>]/g, ' ');
            }else{
                return string
            }

        },
        async setState(){
		
            let url = `/gooduser/api/v1/check_session`
            let ckData= {}
            axios.post(url,ckData).then(res=>{
                if(res.data.data !='TRUE' && localStorage.getItem('I')!= null ){
                    this.$store.commit('logOut');
                    this.$router.push({
                        path : `/gooduser`
                    })
                }else if(localStorage.getItem('I')== null && res.data.data =='TRUE'){
                    this.$store.commit('logOut');
                    this.$router.push({
                        path : `/gooduser`
                    })
                }else{
                    
                }
            })
            
        },
        changingGolfLabel(value){
            let result
            switch(value) {
                case '01': result = '안양골프연습장'; break;
                case '02': result = '안성 베네스트'; break;
                case '03': result = '가평 베네스트'; break;
                case '04': result = '글렌로스'; break;
                case '05': result = '동래 베네스트'; break;
            }
            return result
        },

        async getLikeList(){
            let url = `/gooduser/api/v3/favorite/checkProduct`
            //type : 브랜드는 B , 상품은 P
            let lType = {type: 'P'}

            await axios.post(url,lType).then(res=>{
                console.log('success to get LikeList ')
                console.log(res)
                this.likeArr = !res.data.data ? [] : res.data.data

                if(this.likeArr.indexOf(Number(this.prodId)) > -1){
                    this.checkLike = 1;
                }
            })

        },

        async getProductDetailItem(){

            let url = `/gooduser/api/v1/product_api/product_detail?prodId=${this.prodId}`
            //,{headers: {authentication: localStorage.getItem("T")}}
            //
            await axios.get(url).then(res=>{
                if(res.data.code === 200){
                    let prodData = res.data.data
                    this.userGrade = prodData.userGrade
                    console.log('prodData')
                    console.log(prodData)
                    console.log('this.userGrade')
                    console.log(this.userGrade)
                    this.productItem = prodData;
                    let tmpGolfData =this.productItem.shippingPickup? JSON.parse(this.productItem.shippingPickup) : {}

                    if(tmpGolfData.golf?.length ){
                        this.adminSetGolfData = tmpGolfData
                        this.pickerMin = moment(new Date).add(Number(this.adminSetGolfData.date), 'days').format('YYYY-MM-DD')
                    }else{
                        this.adminSetGolfData={
                            golf:[],
                            date:0
                        }
                        this.adminSetGolfData.golf = ['01','02','03','04','05']
                        this.adminSetGolfData.date = 3
                        this.pickerMin = moment(new Date).add(3, 'days').format('YYYY-MM-DD')
                    }
                    //isVip, isNormal

                    if(this.productItem.isNormal =='N' && this.userGrade != 'VIP'){
                            this.$router.push({
                            path : `/gooduser`
                        })
                    }
                    // if(this.productItem.isNormal =='N' && this.userGrade != 'VIP'){
                    //         this.$router.push({
                    //         path : `/gooduser`
                    //     })
                    // }

                    //shippingPickup
                    // 최근 본 상품 스택
                    let recPdLocal = localStorage.getItem('recpd');
                    if (recPdLocal != null) {
                        let hasId = false;
                        recPdLocal = JSON.parse(recPdLocal);
                        recPdLocal.forEach((item, index) => {
                            if (item.id == this.productItem.id) {
                                recPdLocal.splice(index, 1);
                            }
                        });
                        if (recPdLocal.length == 5 && !hasId) {
                            recPdLocal.shift();
                        }
                        recPdLocal.push({image: this.productItem.mainImagePath, id: this.productItem.id});
                    } else {
                        recPdLocal = [
                            {image: this.productItem.mainImagePath, id: this.productItem.id}
                        ]
                    }
                    localStorage.setItem('recpd', JSON.stringify(recPdLocal));

                    let newParams = JSON.parse(JSON.stringify(res.data.data));

                    // newParams.informationProduct = '';

                    this.backStringObjProduct = newParams;
                    // this.backStringObjProduct.image = JSON.parse(JSON.stringify(this.backStringObjProduct.image));
                    let tmpArr = JSON.stringify(this.productItem.informationProduct)
                    this.backStringObjProduct.informationProduct = tmpArr // informationProduct stringify

                    // 상품고시 array변경
                    //this.productItem.informationProduct = JSON.parse(JSON.parse(this.productItem.informationProduct));
                    if (this.productItem.informationProduct != null) {
                        this.productItem.informationProduct = JSON.parse(this.productItem.informationProduct);
                    }
                    this.productItem.image = JSON.parse(this.productItem.image);



                    if (this.productItem.productOptionData) {
                        this.optionString = this.productItem.productOptionData
                        this.optionJson = JSON.parse(this.optionString)
                        this.optionStringName = this.productItem.productOptionName
                        this.optionJsonName = JSON.parse(this.optionStringName)
                        const opt_keys = Object.keys(this.optionJson);

                        this.draw_check_option(this.productItem.hasStock);
                    }
                    if (this.productItem.imagePathList?.length > 0) {
                        this.thumbImage = true;
                    }

                    // isNew New 태그 작업
                    if (this.productItem.isrtDate != null) {
                        let date1 = moment();
                        let date2 = moment(this.productItem.isrtDate);
                        if (date1.diff(date2, "days") < 13) {
                            this.productItem.isNew = 'Y';
                        }
                    }

                    // 상단 카테고리 세팅
                    let url2 = '/gooduser/api/v1/category_api?'
                    let dep1Data = {
                        'depth': 1,
                    }

                    // 관련상품 로드
                    this.setRelativeRandom(this.productItem.productCategoryId);

                    let setCategory = () => {
                        if (this?.$store.state.categoryAll) {
                            clearInterval(waitCategory)
                            axios.get(url2 + 'depth=1').then(res=>{
                                this.dep1Cate = res.data.data;
                            });

                            if ( this.productItem.productCategoryDepth == 3 ) {
                                let dep2parent, dep2group, dep1group;
                                this.dep3Cate = [];
                                this.$store.state.categoryAll.forEach(data => {
                                    if ( data.depth == 3 && data.parentId == this.productItem.productCategoryParentId ) {
                                        // console.log(data);
                                        this.dep3Cate.push(data);
                                    }
                                    if ( data.depth == 2 && data.id == this.productItem.productCategoryParentId ) {
                                        this.dep2Name = data.name;
                                        dep2parent = data.parentId;
                                        dep2group = data.groups;
                                    }
                                });
                                this.dep2Cate = [];
                                this.$store.state.categoryAll.forEach(data => {
                                    if ( data.depth == 2 && data.parentId == dep2parent && data.groups == dep2group ) {
                                        this.dep2Cate.push(data);
                                    }
                                    if ( data.depth == 1 && data.id == dep2parent ) {
                                        this.dep1Name = data.name;
                                        dep1group = data.groups;
                                    }
                                });
                                this.dep1Cate = [];
                                this.$store.state.categoryAll.forEach(data => {
                                    if ( data.depth == 1 && data.groups == dep1group ) {
                                        this.dep1Cate.push(data);
                                    }
                                });
                            }

                            if ( this.productItem.productCategoryDepth == 2 ) {
                                let dep1group;
                                this.dep2Cate = [];
                                this.$store.state.categoryAll.forEach(data => {
                                    if ( data.depth == 2 && data.parentId == this.productItem.productCategoryParentId ) {
                                        // console.log(data);
                                        this.dep2Cate.push(data);
                                    }
                                    if ( data.depth == 1 && data.id == this.productItem.productCategoryParentId ) {
                                        this.dep1Name = data.name;
                                        dep1group = data.groups;
                                    }
                                });
                                this.dep1Cate = [];
                                this.$store.state.categoryAll.forEach(data => {
                                    if ( data.depth == 1 && data.groups == dep1group ) {
                                        this.dep1Cate.push(data);
                                    }
                                });
                            }
                        }
                    }
                    const waitCategory = setInterval(setCategory, 50);
                    this.pending = false;
                    this.getQnaList();
                }else{
                    alert('오류입니다')
                }



            }).catch(error => {
                console.log(error.response)

            });




        },

        async getQnaList() {
            let url = '/gooduser/api/v1/qna_list_v3';

            let setData = { "productId": this.prodId, 'page': this.thisPage };
            await axios.post(url,setData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
                // console.log(res);
                this.qnaList = res.data.data.content;
				this.pageListCount = res.data.data.totalElements;
				this.qnaList.forEach((item) => {
					if (item.isSecret == 'Y') {
						this.passwordOkList[item.id] = false;
					} else {
						this.passwordOkList[item.id] = true;
					}
                    item.textTitle = this.replaceNbsp(item.content);
				});
				// this.passwordOkList
				if (this.loadFirst) {
					this.pagination(1);
				}
                //여기에 then 걸린건 재고 체크때매 그런거임 옵션 그려지는게 너무 느려서 어쩔수 없음
            }).then(()=> this.checkStock());
        },

        // 문의 - 작성
        qnaWriteOpenCheck() {
            if (this.userId == null) {
                alert('로그인이 필요한 기능입니다.');

                let param = window.atob('Y2xpZW50X2lkPTQmcmVkaXJlY3RfdXJsPS9nb29kdXNlci9jYWxsYmFjaw==')
                // console.log(param)

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
            } else {
                this.qnaWritePop = true
            }
        },
        qnaWriteConfirmClose() {
            document.querySelector('#secretChkWrite').checked = false;
            document.querySelector('#passwordWrite').value = '';
            document.querySelector('#askDetailWrite').value = '';
            this.qnaWritePopConfirm = false;
            this.qnaWritePop = false;
        },
        async QnaWrite() {
            if (document.querySelector("#askDetailWrite").value == '') {
				this.qnaContentRequirePop = true;
				return;
			}

            if (document.querySelector('#secretChkWrite').checked && document.querySelector("#passwordWrite").value == '') {
				this.passwordInputRequirePop = true;
				return;
			}

            let url = '/gooduser/api/v1/qna_write';
            let setData = {
                // memberId: this.getUserId,
                productId: this.productItem.id,
                isSecret: document.querySelector('#secretChkWrite').checked ? 'Y': 'N',
                content: this.escapeRegex(document.querySelector('#askDetailWrite').value),
                tenantId: this.productItem.memberTenantId,
                password: document.querySelector('#secretChkWrite').checked ?  document.querySelector('#passwordWrite').value : ''
            };
            // console.log('setData');
            // console.log(setData);
            await axios({
                'method': 'post',
                'url': url,
                'data': setData
            }).then(res=>{
                // console.log(res);
                this.qnaWriteConfirmClose();
                this.loadFirst = true;
                this.getQnaList();
                // this.qnaList = res.data.data.content;
                // this.pageListCount = res.data.data.totalElements;
                // if (this.loadFirst) {
				// 	this.pagination(1);
				// }
            });
        },

		qnaDelPop(id) {
			this.qnaDeleteConfirm = true;
			this.delId = id;
		},
		async qnaDelete() {
			this.qnaDeleteConfirm = false;
			let url = '/gooduser/api/v1/qna_delete';
            let setData = {
                // "memberId": this.userId,
                "id": this.delId
            };
            await axios({
                'method': 'post',
                'url': url,
                'data': setData
            }).then(res=>{
                // console.log(res);
				this.loadFirst = true;
                this.getQnaList();
            });
		},
		qnaEdit (item) {
			this.editPopupCont = Object.assign({}, item);
			this.editPopup = true;
		},
		async qnaEditSubmit() {
            if (document.querySelector("#askDetail").value == '') {
				this.qnaContentRequirePop = true;
				return;
			}

			let $secretCheck = document.querySelector("#secretChk");
			if ($secretCheck.checked && document.querySelector("#passwordEdit").value == '') {
				this.passwordInputRequirePop = true;
				return;
			}
			let url = '/gooduser/api/v1/qna_edit';
            let setData = {
				"id": this.editPopupCont.id,
				// "memberId": this.userId,
				"productId": this.editPopupCont.productId ? this.editPopupCont.productId : null,
				"isSecret": $secretCheck.checked ? "Y" : "N",
				"content": this.escapeRegex(this.editPopupCont.content),
				"tenantId": this.editPopupCont.tenantId,
				"password": $secretCheck.checked ? document.querySelector('#passwordEdit').value : ""
			};
            // console.log(`setData`)
            // console.log(setData)
            await axios.post(url,setData).then(res=>{
                // console.log(`qna edit res`);
                // console.log(res);
				this.editPopup = false;
				this.modalCopyOk = true;
				this.loadFirst = true;
                this.getQnaList();
            });
		},
		qnaOpen(item) {
			document.querySelector(`#qnaList${item.id} .tgqOpen`).classList.toggle('active');
			document.querySelector(`#qnaList${item.id} .hidden-wrap`).classList.toggle('active');
        },
		passwordPopOpen (item, isEdit) {
            if (this.userId == null) {
                alert('로그인이 필요한 기능입니다.');

                let param = window.atob('Y2xpZW50X2lkPTQmcmVkaXJlY3RfdXJsPS9nb29kdXNlci9jYWxsYmFjaw==')
                // console.log(param)

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

                return;
            }

			if (this.passwordOkList[item.id] && isEdit) {
				this.qnaEdit(item);
			} else if (this.passwordOkList[item.id]) {
				this.qnaOpen(item);
			} else {
				if (isEdit) {
					this.passwordWasOkOpenEdit = true;
				}
                // 비밀번호 초기화
                this.passwordCheckTxt = '';
				this.passwordPopup = true;
                // console.log(document.querySelector('#passwordCheck'));
				this.passwordCheckItem = item;
                // console.log(item);
			}
		},
		async passwordCheckQuery() {
			let url = '/gooduser/api/v1/qna_chk';
            let setData = {
				"memberId": this.userId,
				"id": this.passwordCheckItem.id,
				"password": document.querySelector('#passwordCheck').value
			};
            await axios({
                'method': 'post',
                'url': url,
                'data': setData,
                'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            }).catch(error=>{
                alert(error);
            }).then(res=>{
                // console.log(res);
				if (res.data.data != '비밀번호가 맞지 않습니다.') {
                    this.qnaList.forEach((item, index) => {
                        if (item.id == this.passwordCheckItem.id) {
                            item.content = res.data.data.content;
                            item.textTitle = res.data.data.content;
                            item.answer = res.data.data.answer;
                            item.answerDate = res.data.data.answerDate;
                            this.passwordCheckItem.content = res.data.data.content;
                        }
                    });
					if (this.passwordWasOkOpenEdit) {
						this.qnaEdit(this.passwordCheckItem);
					} else {
						this.qnaOpen(this.passwordCheckItem);
					}
					this.passwordOkList[this.passwordCheckItem.id] = true;
				} else {
					this.passwordIsWrong = true;
				}
				this.passwordWasOkOpenEdit = false;
				this.passwordPopup = false;
				this.passwordCheckItem = null;
            });
		},
        async pagination(currentPage) {
			// 초기세팅
			let pageCut = 10,
				groupCut = 10;

			if (this.pageListCount <= pageCut) {
				this.pagenationList = [1];
				return
			};

			this.thisPage = currentPage;
			if (this.loadFirst) {
				this.loadFirst = false;
			} else {
				this.getQnaList();
			}

			let totalPage = Math.ceil(this.pageListCount/pageCut);
			let pageGroup = Math.ceil(currentPage/groupCut);

			let last = pageGroup * groupCut;
			let first;
			if (last > totalPage) {
				last = totalPage;
				first = (pageGroup * groupCut) - (groupCut - 1);
			} else {
				first = last - (groupCut - 1) <= 0 ? 1 : last - (groupCut - 1);
			}
			let next = last + 1;
			let prev = first - 1;

			if (prev > 0) {
				this.pageFirst = 1;
				this.pagePrev = prev;
			} else {
				this.pageFirst = false;
				this.pagePrev = false;
			}

			if (last < totalPage) {
				this.pageNext = next;
				this.pageLast = totalPage;
			} else {
				this.pageNext = false;
				this.pageLast = false;
			}

			this.pagenationList = [];
			for (let i = first; i <= last; i++) {
				this.pagenationList.push(i);
			}
		},
        threeCommaAdd(number){
			if (number != null) {
				return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			} else if (number == null) {
				return null;
			} else {
				return "";
			}
        },
        replaceNbsp(textdata) {
            if ( typeof(textdata) == 'string') {
                return textdata.replace(/&nbsp;/gi,' ');
            } else {
                return textdata;
            }
        },
        setThumbsSwiper(swiper) {
            this.thumbsSwiper = swiper;
        },

        // 상품 옵션 열림 이벤트
        optionOpen($el) {
            let $handle;
            if ($el.srcElement.tagName == 'SPAN') {
                $handle = $el.target.parentNode;
            } else {
                $handle = $el.target;
            }
            if (!$handle.classList.contains('on')) {
                this.optionClose();
            }
            $handle.classList.toggle('on');
            $handle.nextSibling.classList.toggle('on');
        },

        optionClose() {
            document.querySelectorAll('.option-input-select').forEach(($item) => {
                $item.children[0].classList.remove('on');
                $item.children[1].classList.remove('on');
            });

            document.querySelectorAll('.oi_select').forEach(($item) => {
                $item.children[0].classList.remove('on');
                $item.children[1].classList.remove('on');
            });
        },

        optionCloseForRequire($el) {
            console.log($el.target.parentNode.parentNode.previousSibling);
            // let $elTarget = $el.target.parentNode.parentNode.previousSibling;
            // this.optionOpen($elTarget);
        },

        // 모바일 바로구매 선택시 온오프
        buyOpen() {
            if (this.buyLayer) {
                this.buyLayer = false;
            } else {
                this.buyLayer = true;
            }
        },

        // 리사이즈 이벤트
        // qna 오픈용 사이즈 지정 기능
        handleResize() {
            document.querySelectorAll('.hidden-wrap').forEach(function($el) {
                $el.style.maxHeight = $el.querySelector('.tqqb-body').clientHeight + 'px';
            })
        },
        async checkWorking() {
            return this.workpending;
        },
        async buyProductItemNow(){ // 바로구매
            if (await this.checkWorking()) {
                alert('중복실행 감지');
                return false;
            }
            this.workpending = true;

            if(!this.$store.state.userId){
                alert('로그인이 필요한 기능입니다');
                let urlHost = window.location.host.startsWith('goodshop') ?
                  'https://www.golfsamsung.com' : 'https://qa.golfsamsung.com';

                let uA = navigator.userAgent;
                if (uA.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || uA.match(/LG|SAMSUNG|Samsung/) != null) {
                    window.location.href = `${urlHost}/appMain.do?method=appLogin`
                } else {
                    window.location.href = `${urlHost}/web/join.do?method=loginMav`
                }
                this.workpending = false;
                return;
            }
            if(this.productItem.hasOption==='Y'&& Object.keys(this.combineOpt).length === 0){
                alert('필수 옵션을 선택해 주세요');
                this.workpending = false;
                return false;
            }
            //console.log(this.combineOpt)



            let tmpPrice = 0
            if(this.productItem.hasOption ==='Y'){
                if(this.productItem.isCombine==='true'){
                    for await (const [key, value] of Object.entries(this.combineOpt)){
                        tmpPrice = tmpPrice + (value.amount* value.value)
                    }
                    if ( (this.userGrade == 'VIP') && (this.productItem.vipNormalPrice) ) {
                        // console.log('aaaaaaa')
                        tmpPrice += this.productItem.vipSellingPrice
                    } else {
                        tmpPrice += this.productItem.normalSellingPrice
                    }

                }
                if(Object.keys(this.noCombineOpt).length !== 0){
                    // console.log('not null')
                    for await (const [key, value] of Object.entries(this.noCombineOpt)){
                        tmpPrice = tmpPrice+ (value.amount* value.value)
                    }
                    if ( (this.userGrade == 'VIP') && (this.productItem.vipNormalPrice) ) {
                        tmpPrice += this.productItem.vipSellingPrice
                    } else {
                        tmpPrice += this.productItem.normalSellingPrice
                    }
                }
            }else
                if ( (this.userGrade == 'VIP') && (this.productItem.vipNormalPrice) ) {
                    tmpPrice = this.productItem.vipSellingPrice
                } else {
                    tmpPrice = this.productItem.normalSellingPrice
                }

            let tmpArr = JSON.stringify(this.productItem.informationProduct)
            // console.log(this.productItem)
            this.backStringObjProduct.informationProduct = tmpArr // informationProduct stringify
            tmpArr = JSON.stringify(this.productItem.image)
            this.backStringObjProduct.image = tmpArr

            if(this.productItem.purchaseQuantity){
                if(this.optionSingleCount > this.productItem.purchaseQuantity){
                    alert("1인 최대 구매 수량 이상 구매하게됩니다. 1인 최대구매수량을 확인해 주세요");
                    this.workpending = false;
                    return false
                }
            }
            let url1, prodData
            //console.log(this.userGrade)
            //console.log(tmpPrice)
            //pickupMethod 1: 일반 2: 골프장 3: 기념일
            if(this.pickupMethod==='1'){
                //여기
                url1 = '/gooduser/api/v3/product_api/user_buy_now'; //이거로 변경될 예정
                    prodData = {
                        productId: this.prodId,
                        cartType : 'BuyNow',
                        cartStatus: 'BuyBefore',
                        shippingType: 'Normal',
                        count : this.productItem.hasOption =='N' ? this.optionSingleCount : 1,
                        hasOption : this.productItem.hasOption,
                        requiredOption : this.productItem.hasOption =='Y' ? JSON.stringify(this.combineOpt) : '',
                        chooseOption : JSON.stringify(this.noCombineOpt),
                        deliveryType:  this.productItem.isReservation=='Y' ? "DayReservationDeliveryNormalDelivery" : "NormalDelivery",
                        isReservation: this.productItem.isReservation,
                }
            }else if(this.pickupMethod==='2'){
				// 골프장 픽업 케이스
                url1 = '/gooduser/api/v3/product_api/user_buy_now';
                prodData = {
                    productId: this.prodId,
                    cartType : 'BuyNow',
                    cartStatus: 'BuyBefore',
                    shippingType: 'PickupGolf',
                    count : this.productItem.hasOption =='N' ? this.optionSingleCount : 1,
                    hasOption : this.productItem.hasOption,
                    requiredOption : this.productItem.hasOption =='Y' ? JSON.stringify(this.combineOpt) : '',
                    chooseOption : JSON.stringify(this.noCombineOpt),
                    deliveryType: "GolfPlacePickupDelivery",
                    isReservation: this.productItem.isReservation,
                    //골프장 특화
                    shippingPickupPlace: this.shippingplace,
                    pickupDate: moment(this.pickerDatePickup).format('YYYY-MM-DD'),
                    golfComment: this.golfcomment,
                }
                console.log(prodData)

                if(!this.pickerDatePickup){
                    alert("날짜값을 입력해주세요!");
                    this.workpending = false;
                    return false
                }
            } else if(this.pickupMethod==='3'){
				// 기념일 케이스
                url1 = '/gooduser/api/v3/product_api/user_buy_now';
                prodData = {
                    productId: this.prodId,
                    cartType : 'BuyNow',
                    cartStatus: 'BuyBefore',
                    shippingType: 'Aniversary',
                    count : this.productItem.hasOption =='N' ? this.optionSingleCount : 1,
                    hasOption : this.productItem.hasOption,
                    requiredOption : this.productItem.hasOption =='Y' ? JSON.stringify(this.combineOpt) : '',
                    chooseOption : JSON.stringify(this.noCombineOpt),
                    deliveryType: this.productItem.shippingService ==='holiday_seolnal'||this.productItem.shippingService ==='holiday_chuseock'|| this.productItem.shippingService ==='holiday' ? "HolidayDelivery"  : 'AnniversaryDelivery',
                    isReservation: this.productItem.isReservation,
                    //기념일 배송 특화
                    anniversaryReceiptDate: moment(this.pickerDateSpecial).format('YYYY-MM-DD'),
                    holidayReceiptDate:  moment(this.pickerDateSpecial).format('YYYY-MM-DD'),
                }
            }

            // ,{headers: {authentication: localStorage.getItem("T")}}
            await axios.post(url1,prodData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
                if ( res.data.code != 200 ) {
                    alert(`${res.data.code} error! ${res.data.message}`);
                    return false;
                }
                console.log(res)
                if(this.productItem.hasOption==='N'){
                    let tmpData = this.productItem.purchaseQuantity
                    if(tmpData!==null&& tmpData!==0 && (this.optionSingleCount > tmpData) ){
                        alert("최대 구매 수량을 넘었습니다 구매 수량을 확인해 주세요");
                        this.workpending = false;
                        return false;
                    }
                }
                if(res.data.code === 200){
                    this.$router.push({
                        path : `/gooduser/cartview/productorder/N`
                    });
                }else{
                    alert(res.data.code);
                    this.workpending = false;
                    return false
                }


            })
        },
        async giftProductItem(){ //선물하기
            if (await this.checkWorking()) {
                alert('중복실행 감지');
                return false;
            }
            this.workpending = true;

            if(!this.$store.state.userId){
                alert('로그인이 필요한 기능입니다');
                let urlHost = window.location.host.startsWith('goodshop') ?
                  'https://www.golfsamsung.com' : 'https://qa.golfsamsung.com';

                let uA = navigator.userAgent;
                if (uA.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || uA.match(/LG|SAMSUNG|Samsung/) != null) {
                    window.location.href = `${urlHost}/appMain.do?method=appLogin`
                } else {
                    window.location.href = `${urlHost}/web/join.do?method=loginMav`
                }
                this.workpending = false;
                return;
            }
            if(this.productItem.purchaseQuantity){
                if(this.optionSingleCount > this.productItem.purchaseQuantity){
                    alert("1인 최대 구매 수량 이상 구매하게됩니다. 1인 최대구매수량을 확인해 주세요");
                    this.workpending = false;
                    return false
                }
            }

            if(this.productItem.hasOption==='Y'&& Object.keys(this.combineOpt).length === 0){
                alert('필수 옵션을 선택해 주세요');
                this.workpending = false;
                return false;
            }

            let tmpPrice = 0
            if(this.productItem.hasOption ==='Y'){
                if(this.productItem.isCombine==='true'){
                    for await (const [key, value] of Object.entries(this.combineOpt)){
                        tmpPrice = tmpPrice + (value.amount* value.value)
                    }
                    if ( (this.userGrade == 'VIP') && (this.productItem.vipNormalPrice) ) {
                        tmpPrice += this.productItem.vipSellingPrice
                    } else {
                        tmpPrice += this.productItem.normalSellingPrice
                    }
                }
                if(Object.keys(this.noCombineOpt).length !== 0){
                    console.log('not null')
                    for await (const [key, value] of Object.entries(this.noCombineOpt)){
                        tmpPrice = tmpPrice+ (value.amount* value.value)
                    }
                    if ( (this.userGrade == 'VIP') && (this.productItem.vipNormalPrice) ) {
                        tmpPrice += this.productItem.vipSellingPrice
                    } else {
                        tmpPrice += this.productItem.normalSellingPrice
                    }
                }
            }else{
                if ( (this.userGrade == 'VIP') && (this.productItem.vipNormalPrice) ) {
                    tmpPrice = this.productItem.vipSellingPrice
                } else {
                    tmpPrice = this.productItem.normalSellingPrice
                }
            }

            let tmpArr = JSON.stringify(this.productItem.informationProduct)
            console.log(this.productItem)
            this.backStringObjProduct.informationProduct = tmpArr // informationProduct stringify
            tmpArr = JSON.stringify(this.productItem.image)
            this.backStringObjProduct.image = tmpArr

            //
            let prodData = {}
            let url1 = '/gooduser/api/v3/product_api/user_buy_now';
            if(this.pickupMethod==='1'){
                //여기
                    prodData = {
                        productId: this.prodId,
                        cartType : 'Present',
                        cartStatus: 'BuyBefore',
                        shippingType: 'Normal',
                        count : this.productItem.hasOption =='N' ? this.optionSingleCount : 1,
                        hasOption : this.productItem.hasOption,
                        requiredOption : this.productItem.hasOption =='Y' ? JSON.stringify(this.combineOpt) : '',
                        chooseOption : JSON.stringify(this.noCombineOpt),
                        deliveryType:  this.productItem.isReservation=='Y' ? "DayReservationDeliveryNormalDelivery" : "NormalDelivery",
                        isReservation: this.productItem.isReservation,
                }
            }else if(this.pickupMethod==='2'){
				// 골프장 픽업 케이스
                prodData = {
                    productId: this.prodId,
                    cartType : 'Present',
                    cartStatus: 'BuyBefore',
                    shippingType: 'PickupGolf',
                    count : this.productItem.hasOption =='N' ? this.optionSingleCount : 1,
                    hasOption : this.productItem.hasOption,
                    requiredOption : this.productItem.hasOption =='Y' ? JSON.stringify(this.combineOpt) : '',
                    chooseOption : JSON.stringify(this.noCombineOpt),
                    deliveryType: "GolfPlacePickupDelivery",
                    isReservation: this.productItem.isReservation,
                    //골프장 특화
                    shippingPickupPlace: this.shippingplace,
                    pickupDate: moment(this.pickerDatePickup).format('YYYY-MM-DD'),
                    golfcomment: this.golfcomment,
                }
                console.log(prodData)

                if(!this.pickerDatePickup){
                    alert("날짜값을 입력해주세요!");
                    this.workpending = false;
                    return false
                }
            } else if(this.pickupMethod==='3'){
				// 기념일 케이스
                prodData = {
                    productId: this.prodId,
                    cartType : 'Present',
                    cartStatus: 'BuyBefore',
                    shippingType: 'Aniversary',
                    count : this.productItem.hasOption =='N' ? this.optionSingleCount : 1,
                    hasOption : this.productItem.hasOption,
                    requiredOption : this.productItem.hasOption =='Y' ? JSON.stringify(this.combineOpt) : '',
                    chooseOption : JSON.stringify(this.noCombineOpt),
                    deliveryType: this.productItem.shippingService ==='holiday_seolnal'||this.productItem.shippingService ==='holiday_chuseock'|| this.productItem.shippingService ==='holiday' ? "HolidayDelivery"  : 'AnniversaryDelivery',
                    isReservation: this.productItem.isReservation,
                    //기념일 배송 특화
                    anniversaryReceiptDate: moment(this.pickerDateSpecial).format('YYYY-MM-DD'),
                    holidayReceiptDate:  moment(this.pickerDateSpecial).format('YYYY-MM-DD'),
                }
            }

            await axios.post(url1,prodData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
                if ( res.data.code != 200 ) {
                    alert(`${res.data.code} error! ${res.data.message}`);
                    return false;
                }
                if(this.productItem.hasOption==='N'){
                    let tmpData = this.productItem.purchaseQuantity
                    if(tmpData!==null&& tmpData!==0 && (this.optionSingleCount > tmpData) ){
                        alert("최대 구매 수량을 넘었습니다 구매 수량을 확인해 주세요");
                        this.workpending = false;
                        return false;
                    }
                }
                if(res.data.code === 200){
                    this.$router.push({
                        path : `/gooduser/cartview/productorder/P`
                    });
                }else{
                    alert(res.data.code);
                    this.workpending = false;
                    return false
                }
            })
        },
        async getInCart(){ //장바구니 구매

            //여기
            let url = `/gooduser/api/v1/bag/add_cart`
            if(!this.$store.state.userId){
                alert('로그인이 필요한 기능입니다');
                let urlHost = window.location.host.startsWith('goodshop') ?
                  'https://www.golfsamsung.com' : 'https://qa.golfsamsung.com';

                let uA = navigator.userAgent;
                if (uA.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || uA.match(/LG|SAMSUNG|Samsung/) != null) {
                    window.location.href = `${urlHost}/appMain.do?method=appLogin`
                } else {
                    window.location.href = `${urlHost}/web/join.do?method=loginMav`
                }
                return;
            }
            if(this.productItem.purchaseQuantity){
                if(this.optionSingleCount > this.productItem.purchaseQuantity){
                    alert("1인 최대 구매 수량 이상 구매하게됩니다. 1인 최대구매수량을 확인해 주세요");
                    return false
                }
            }
            if(this.productItem.hasOption==='Y'&& Object.keys(this.combineOpt).length === 0){ alert('필수 옵션을 선택해 주세요'); return false;}

			this.cartLoading = true;

            let tmpPrice = 0
            if(this.productItem.hasOption ==='Y'){
                if(this.productItem.isCombine==='true'){
                    for await (const [key, value] of Object.entries(this.combineOpt)){
                        tmpPrice = tmpPrice + (value.amount* value.value)
                    }
                    if ( (this.userGrade == 'VIP') && (this.productItem.vipNormalPrice) ) {
                        tmpPrice += this.productItem.vipSellingPrice
                    } else {
                        tmpPrice += this.productItem.normalSellingPrice
                    }
                }
                if(Object.keys(this.noCombineOpt).length !== 0){
                    console.log('not null')
                    for await (const [key, value] of Object.entries(this.noCombineOpt)){
                        tmpPrice = tmpPrice+ (value.amount* value.value)
                    }
                    if ( (this.userGrade == 'VIP') && (this.productItem.vipNormalPrice) ) {
                        tmpPrice += this.productItem.vipSellingPrice
                    } else {
                        tmpPrice += this.productItem.normalSellingPrice
                    }
                }
            }else{
                if ( (this.userGrade == 'VIP') && (this.productItem.vipNormalPrice) ) {
                    tmpPrice = this.productItem.vipSellingPrice
                } else {
                    tmpPrice = this.productItem.normalSellingPrice
                }
            }


            let tmpArr = JSON.stringify(this.productItem.informationProduct)
            this.backStringObjProduct.informationProduct = tmpArr
            tmpArr = JSON.stringify(this.productItem.image)
            this.backStringObjProduct.image = tmpArr
            let tmpKey = Object.keys(this.combineOpt)
            let tmpItem = this.combineOpt[tmpKey]
            

            let sendData
            if(this.pickupMethod==='1'){
                

                sendData = {
                        productId: this.prodId,
                        cartType : 'Basket',
                        cartStatus: 'BuyBefore',
                        shippingType: 'Normal',
                        count : this.productItem.hasOption =='N' ? this.optionSingleCount : tmpItem.amount,
                        hasOption : this.productItem.hasOption,
                        requiredOption : this.productItem.hasOption =='Y' ? JSON.stringify(this.combineOpt) : '',
                        chooseOption : JSON.stringify(this.noCombineOpt),
                        deliveryType:  this.productItem.isReservation=='Y' ? "DayReservationDeliveryNormalDelivery" : "NormalDelivery",
                        isReservation: this.productItem.isReservation,
                }

            }else if(this.pickupMethod==='2'){
				// 골프장 픽업 케이스
                sendData = {
                    productId: this.prodId,
                    cartType : 'Basket',
                    cartStatus: 'BuyBefore',
                    shippingType: 'PickupGolf',
                    count : this.productItem.hasOption =='N' ? this.optionSingleCount : tmpItem.amount,
                    hasOption : this.productItem.hasOption,
                    requiredOption : this.productItem.hasOption =='Y' ? JSON.stringify(this.combineOpt) : '',
                    chooseOption : JSON.stringify(this.noCombineOpt),
                    deliveryType: "GolfPlacePickupDelivery",
                    isReservation: this.productItem.isReservation,
                    //골프장 특화
                    shippingPickupPlace: this.shippingplace,
                    pickupDate: moment(this.pickerDatePickup).format('YYYY-MM-DD'),
                    golfcomment: this.golfcomment,
                }

                if(!this.pickerDatePickup){
                    alert("날짜값을 입력해주세요!");
                    return false
                }
            } else if(this.pickupMethod==='3'){
				// 기념일 케이스
                sendData = {
                    productId: this.prodId,
                    cartType : 'Basket',
                    cartStatus: 'BuyBefore',
                    shippingType: 'Aniversary',
                    count : this.productItem.hasOption =='N' ? this.optionSingleCount : tmpItem.amount,
                    hasOption : this.productItem.hasOption,
                    requiredOption : this.productItem.hasOption =='Y' ? JSON.stringify(this.combineOpt) : '',
                    chooseOption : JSON.stringify(this.noCombineOpt),
                    deliveryType: this.productItem.shippingService ==='holiday_seolnal'||this.productItem.shippingService ==='holiday_chuseock'|| this.productItem.shippingService ==='holiday' ? "HolidayDelivery"  : 'AnniversaryDelivery',
                    isReservation: this.productItem.isReservation,
                    //기념일 배송 특화
                    anniversaryReceiptDate: moment(this.pickerDateSpecial).format('YYYY-MM-DD'),
                    holidayReceiptDate:  moment(this.pickerDateSpecial).format('YYYY-MM-DD'),
                }
            }
            if(this.productItem.hasOption =='Y'){
                this.combineOpt[tmpKey].amount = 1
                let tmpMakeJson = JSON.stringify(this.combineOpt)
                sendData.requiredOption = tmpMakeJson
            }
            
            let that = this;
            await axios.post(url,sendData).then(res=>{
                
				this.cartLoading = false;
                if ( res.data.code != 200 ) {
					alert(`${res.data.code} error! ${res.data.message}`);
					
					return false;
				}
                
				else{

					that.cartLoadingOk = true;
                    let cartAniInterval = setInterval(function() {
                        if (that.cartLoadFrame <= 10) {
                            that.cartLoadFrame = Number(that.cartLoadFrame) + 1;
                        }
                        console.log(that.cartLoadFrame);
                    }, 150);

                    setTimeout(function() {
                        clearInterval(cartAniInterval);
                        that.cartLoadingOk = false;
                        that.cartLoadFrame = 0;
                    }, 2500);

                    let tmpCnt = Number(localStorage.getItem('cartLength'))
                    localStorage.setItem('cartLength', tmpCnt++);

                    if (that.buyLayer) {
                        that.buyLayer = false;
                    }
				}
            })
        },

        goodsCateOpen (index) {
            if (this.openCate == index) {
                this.openCate = false;
            } else {
                this.openCate = index;
            }
        },



        //공유하기
        popupShare(type) {
            if (type) {
                document.querySelector('.popup-bg').classList.add('on');
                document.querySelector('#popup-share').classList.add('on');
            } else if (!type) {
                document.querySelector('.popup-bg').classList.remove('on');
                document.querySelector('#popup-share').classList.remove('on');
            }
        },
        // 공유하기 - 링크복사
        copyLink () {
            document.querySelector('.share-link input').select();
            document.execCommand('copy');
        },
        // 공유하기 - 블로그
        // 로컬의 경우 블로그에서 인식을 못하여 에러가 걸림
        shareBlog () {
            window.open('http://blog.naver.com/openapi/share?url='+this.pageUrl);
            //window.open('http://blog.naver.com/openapi/share?url='+'https://developers.naver.com/docs/share/share/#section-blogshare-1', '_blank'); 
        },
        // 공유하기 - 카카오톡
        // 키 발급 필요함
        shareKakao () {
            // 초기화
            Kakao.init('c3147b5a154a221226cdd49c27afe510');
            Kakao.isInitialized();
            // 발송
            Kakao.Share.sendDefault({
                objectType: 'text',
                text:
                this.productItem.name,
                link: {
                    mobileWebUrl: this.pageUrl,
                    webUrl: this.pageUrl,
                },
            })
        },
        addLike() {
            if (this.userId == null) {
                alert('로그인이 필요한 기능입니다.');

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
                return;
            }

            let postData = {
                "userId": this.getUserId,
                "brandId": this.productItem.brand.id,
                "productId": this.prodId,
                "type": ' '
            }
            console.log(postData);
            if (this.checkLike == 0) {
                let url = '/gooduser/api/v1/favorite/click_add';
                axios.post(url, postData).then(res=>{
                    console.log(res);
                    this.checkLike = 1;
                });
            } else if (this.checkLike == 1) {
                let url = '/gooduser/api/v1/favorite/click_delete';
                axios.post(url, postData).then(res=>{
                    console.log(res);
                    this.checkLike = 0;
                });
            } else {
                alert('error');
            }
        },
        addLikeBrand(e) {
            if (this.userId == null) {
                alert('로그인이 필요한 기능입니다.');

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
                return;
            }

            //console.log(e.target.classList.contains('on'));
            let url = '/gooduser/api/v1/favorite/only_brand_click_add';
            let postData = {
                "brandId": this.productItem.brandId,
                //"favoriteId": 0,
                "productId": this.productItem.id,
                "type": " ",
                "userId": this.getUserId
            }
            if (!e.target.classList.contains('on')) {
                console.log('input');
                axios.post(url, postData).then(res=>{
                    console.log(res);
                    this.checkLikeBrand = true;
                });
            } else {
                console.log('delete');
                url = '/gooduser/api/v1/favorite/brand_list/delete';
                axios.post(url, postData).then(res=>{
                    console.log(res);
                    this.checkLikeBrand = false;
                });
            }
        },
        async check_for_sale_option(group, key, opt_idx, required_idx, select_opt, opt_type, has_inventory) {

            // console.log(group+'/'+key+'/'+opt_idx+'/'+required_idx+'/'+opt_type+'/'+has_inventory);
            // console.log(select_opt);
            // await draw_check_option(encode_mcho , has_inventory)
            // group : opt_group
            // key :  opt_key
            // opt_idx : index of option
            // required_idx : index of required option
            // encode_mcho : encode_mch option
            // select_opt : select option
            let for_count = 0;
            let opt_key = '';

            for (const [key,value] of Object.entries(select_opt)) {
                if (for_count === 0) {

                    opt_key = `${opt_type}_${key}_${value}`;
                } else {
                    opt_key += `_${key}_${value}`;
                }
                for_count++;
            }
            //console.log(opt_key)
            // console.log(`${group}_${key} / array_number : ${opt_idx} / required_idx : ${required_idx}`);
            const mcho = this.optionJson;

            const index_array = [];
            const for_sale_array = [];
            const out_of_stock_array = [];
            const hidden_array = [];

            let index_result = {};
            let for_sale_result = {};
            let out_of_stock_result = {};
            let hidden_result = {};

            let tmp_hidden = {};
            let tmp_sold_out = {};

            //type으로 옵션 조절



            const opt_keys = Object.keys(mcho); // obj key 추출
            if(opt_idx !== required_idx) {
                opt_keys.forEach(await function (k, v) {
                    if (k.includes(opt_key)) {
                        // const tmp_split = k.split('_');
                        const tmp_opt_key_split = k.split(`${opt_key}_`);
                        const tmp_opt_key = tmp_opt_key_split[1].split('_');
                        const key = `${tmp_opt_key[0]}_${tmp_opt_key[1]}`;
                        //console.log(tmp_opt_key)
                        if (has_inventory === 'Y' && mcho[k]['status'] !== 'hidden') {
                            mcho[k]['stock'] == 0 ? mcho[k]['status'] = 'out_of_stock' : mcho[k]['status'] = mcho[k]['status'];
                        }

                        // 각 재고 상태별 배열에 push
                        switch(mcho[k]['status']) {
                            case 'for_sale':
                                for_sale_array.push(key);
                                break;
                            case 'out_of_stock':
                                out_of_stock_array.push(key);
                                break;
                            case 'hidden':
                                hidden_array.push(key);
                                break;
                        }

                        index_array.push(key);
                    }
                });
                console.log('out_of_stock_array')
                console.log(out_of_stock_array)
            }
            index_array.forEach((x) => {
                index_result[x] = (index_result[x] || 0)+1;
            })

            for_sale_array.forEach((x) => {
                for_sale_result[x] = (for_sale_result[x] || 0)+1;
            })

            out_of_stock_array.forEach((x) => {
                out_of_stock_result[x] = (out_of_stock_result[x] || 0)+1;
            })

            hidden_array.forEach((x) => {
                hidden_result[x] = (hidden_result[x] || 0)+1;
            })

            for await (const [key, value] of Object.entries(index_result)) {
                if(hidden_result[key] !== undefined) {
                    tmp_hidden[key] = value - hidden_result[key];
                } else {
                    tmp_hidden[key] = value;
                }

                if(out_of_stock_result[key] !== undefined) {
                    tmp_sold_out[key] = value - out_of_stock_result[key];
                } else {
                    tmp_sold_out[key] = value;
                }
            }

            this.soldCheck = tmp_sold_out;


            // 옵션 조각 숨기기? 나타내기? disabled? enabled? 처리
            //
            // console.log('tmp_sold_out')
            // console.log(tmp_sold_out)
            for await (const [key, value] of Object.entries(tmp_sold_out)){
                // console.log('vvvvvvvvvvvvvvvvvvvv')
                this.$refs[`${key}`][0].classList.remove('soldout')
                this.$refs[`${key}`][1].style.opacity = '100%'
                if(value === 0 || value === '0') {
                    console.log(`${key}`);
                    console.log("disabled option")
                    this.$refs[`${key}`][0].classList.add('soldout')
                    this.$refs[`${key}`][1].style.opacity = '50%'
                    // console.log('aaaaaaaaa')
                } else {
                    if(document.getElementById(`pds_${key}`)) {
                        // console.log(`pds_${key}`);
                        console.log('show option');
                    }
                }
            }


            for await (const [key, value] of Object.entries(tmp_hidden)){
                console.log('vvvvvvvvvvvvvvvvvvvv')
                this.$refs[`${key}`][0].style.display = 'block'
                this.$refs[`${key}`][1].style.display = 'block'
                if(value === 0 || value === '0') {
                    this.$refs[`${key}`][0].style.display = 'none'
                    this.$refs[`${key}`][1].style.display = 'none'
                    //console.log('hide option');

                    // document.querySelector(`label[for=pds_${key}]`).style.display = 'none';
                } else {
                    if(document.getElementById(`pds_${key}`)) {
                        // console.log(`pds_${key}`);
                        console.log('show option')

                    }
                    // document.querySelector(`label[for=pds_${key}]`).style.display = 'block';
                }
            }

        },

        // 페이지 로딩시 필수 옵션의 품절또는 숨김 체크
        async draw_check_option(has_inventory) {

            //has_inventory******************************************************************************************************************
            // 상품옵션 PARSE
            //const mcho = JSON.parse(encode_mcho);
            const mcho = this.optionJson
            // 모든 경우의 수 opt key
            const index_array = [];
            // 판매중인 opt key
            const for_sale_array = [];
            // 품절된 opt key
            const out_of_stock_array = [];
            // 숨김된 opt key
            const hidden_array = [];

            // 옵션 중복된 키 : 카운트
            const index_result = {};
            // 옵션 판매중인 키 : 카운트
            const for_sale_result = {};
            // 옵션 품절된 키 : 카운트
            const out_of_stock_result = {};
            // 옵션 숨김된 키 : 카운트
            const hidden_result = {};

            // 키 : (전체 카운트 - 품절된 카운트)
            let tmp_sold_out = {};
            // 키 : (전체 카운트 - 숨김된 카운트)
            let tmp_hidden = {};

            // 모든 경우의 수 opt key
            const no_index_array = [];
            // 판매중인 opt key
            const no_for_sale_array = [];
            // 품절된 opt key
            const no_out_of_stock_array = [];
            // 숨김된 opt key
            const no_hidden_array = [];
            // 옵션 중복된 키 : 카운트
            const no_index_result = {};
            // 옵션 판매중인 키 : 카운트
            const no_for_sale_result = {};
            // 옵션 품절된 키 : 카운트
            const no_out_of_stock_result = {};
            // 옵션 숨김된 키 : 카운트
            const no_hidden_result = {};

            // 키 : (전체 카운트 - 품절된 카운트)
            let no_tmp_sold_out = {};
            // 키 : (전체 카운트 - 숨김된 카운트)
            let no_tmp_hidden = {};

            let co_cnt = 0
            let soldOut_cnt = 0



            for (const [key, value] of Object.entries(this.optionJsonName)) {
                value['value'].forEach((item, index) => {

                    if(item.type == 'img') {
                        if (typeof item.value == 'string') {
                            item.value = JSON.parse(item.value);
                        }
                    }
                });
                if (value.is_necessary == 'Y') { // 필수 옵션이냐?
                    this.requireOptionIds.push(value.index)
                    this.requireOption.push(value) ; // 필수 옵션 배열에 push  //optionJsonName
                } else {
                    this.nRequireOptionIds.push(value.index)
                    this.nRequireOption.push(value); // 선택 옵션 배열에 push
                }
            }

            //******************************************************************************************************************
            // 옵션의 key를 단계별 세분화 및
            let valueObj = {}
            for await (const [key, value] of Object.entries(mcho)) {
                if(value.stock !== 0 && this.allSoldOutToggle===0 ){
                    this.allSoldOut = false;
                    this.allSoldOutToggle++
                }
                // Ex) co_0_0_1_0_2_0 을 0_0 , 0_1 , 0_2 로 분리 후
                // 0_0 : status로 임시 오브젝트 생성을 위한 변수
                // lowdash 분리
                const tmp_split = key.split('_');
                // 필수 조합형의 경우만 배열에 담아 확인 ,
                // 해당 경우가 아닌 케이스는 product_view.inc.php에서 초기 필터링 됨
                if(tmp_split[0] === 'co') {
                    co_cnt ++
                    // 1부터 시작하는 이유 ( tmp_split[0] === 'co' 이므로 )
                    // 2씩 더하는 이유 ( 0_0 , 0_1 , 0_2 )로 각 옵션의 키별 분류를 위해
                    if(mcho[key]['stock'] == 0|| mcho[key]['stock'] == '0' || mcho[key]['status'] === 'out_of_stock') {
                            soldOut_cnt++
                    }

                    let key2 =''

                    for (let i=1; i<tmp_split.length-1; i+=2) {

                        // 재고 체크를 할 경우, 재고가 0 이라면 품절처리
                        if(has_inventory === 'Y' && mcho[key]['status'] !== 'hidden') {
                            mcho[key]['stock'] == 0 ? mcho[key]['status'] = 'out_of_stock' : mcho[key]['status'] = mcho[key]['status'];
                        }

                        // 각 재고 상태별 배열에 push
                        switch(mcho[key]['status']) {
                            case 'for_sale':
                                for_sale_array.push(`${tmp_split[i]}_${tmp_split[i+1]}`);
                                break;
                            case 'out_of_stock':
                                out_of_stock_array.push(`${tmp_split[i]}_${tmp_split[i+1]}`);
                                break;
                            case 'hidden':
                                hidden_array.push(`${tmp_split[i]}_${tmp_split[i+1]}`);
                                break;
                        }
                        // 임시 오브젝트를 필수조합형을 모두 담기 위해 index_array에 push
                        index_array.push(`${tmp_split[i]}_${tmp_split[i+1]}`);
                    }
                    for(let i=1; i<tmp_split.length; i++){
                        key2 += `${tmp_split[i]}`
                        if(i != tmp_split.length-1){key2+='_'}
                    }
                    valueObj[key2] = value


                }else if(tmp_split[0] === 'uo') {
                    for (let i=1; i<tmp_split.length-1; i+=2) {
                        if(has_inventory === 'Y' && mcho[key]['status'] !== 'hidden') {
                            mcho[key]['stock'] == 0 ? mcho[key]['status'] = 'out_of_stock' : mcho[key]['status'] = mcho[key]['status'];
                        }
                        switch(mcho[key]['status']) {
                            case 'for_sale':
                                no_for_sale_array.push(`${tmp_split[i]}_${tmp_split[i+1]}`);
                                break;
                            case 'out_of_stock':
                                no_out_of_stock_array.push(`${tmp_split[i]}_${tmp_split[i+1]}`);
                                break;
                            case 'hidden':
                                no_hidden_array.push(`${tmp_split[i]}_${tmp_split[i+1]}`);
                                break;
                        }
                        no_index_array.push(`${tmp_split[i]}_${tmp_split[i+1]}`);
                    }
                }
            }
            this.makeStokeListObj = valueObj

            this.tmpArr = index_array
            this.noTmpArr = no_index_array
            this.co_cnt = co_cnt
            this.soldOut_cnt = soldOut_cnt

            //품절 상품 추려서 저장
            let tmpObj = {}
            let tmparr1 = {}
            this.requireOption.forEach((x) => {
                x.value.forEach((y,w) => {
                    tmpObj[`${x.index}_${w}`] = {...y, opt_name: x.name ,idx:w}
                })
                tmparr1 = {...tmpObj}
            })

            for await (const [key, value] of Object.entries(this.makeStokeListObj)) {
                let tmp_str_key = key;

                let tmp_split_key = tmp_str_key.split("_");
                let tmp_result_arr = []
                let tmp_item_arr = []

                for (let i=0; i<tmp_split_key.length; i+=2) {
                    let tmparr1strname = tmparr1[`${tmp_split_key[i]}_${tmp_split_key[i+1]}`].name
                    tmp_item_arr.push(tmparr1[`${tmp_split_key[i]}_${tmp_split_key[i+1]}`])
                    tmp_result_arr.push(`${tmparr1strname} `)
                }
                let newName = {name : tmp_result_arr.join("/"), optId : key, key : `co_${key}`, amount: value.stock}
                Object.assign(this.makeStokeListObj[key], newName, {items:tmp_item_arr})
                if(value.stock ===0){

                    this.soldOut_arr.push(value)
                    this.soldOut_obj[`co_${key}`] = value
                    //새 object에다가 key 이름으로 넣기
                }
            }

            // for (let i=0; i<tmp_split_key.length; i+=2) {
            //         let tmparrvalues = this.requireOption[tmp_split_key[i]].value
            //         console.log('tmp_split_key')
            //          console.log(this.requireOption[tmp_split_key[i]].value)
            //         console.log(tmparrvalues)
            //         tmp_item_arr.push()

            //     }

            for await (const [key, value] of Object.entries(this.soldOut_arr)) {
                for await (const [key2, value2] of Object.entries(mcho)) {
                    if(value.id===value2.id){
                     //   Object.assign(this.soldOut_arr[key], {optionData: JSON.stringify({ : value2})})
                    }
                }
            }



            if(this.co_cnt === this.soldOut_cnt){ console.log(`===${this.co_cnt},${this.soldOut_cnt}, 품절`);}
            //******************************************************************************************************************
            //필수 조합형은 같은 옵션의 경우가 여러번 나올수 밖에 없음
            // ex) 0_0_1_0_2_0 , 0_0_1_0_2_1 이경우의 첫번쨰 옵션 0_0 이 두번 겹침
            // 이와 같은 경우에 해당 옵션의 모든 경우가 out_of_stock(품절) 이거나 hidden(숨김) 처리일 경우
            // 해당 옵션을 재고 상태에 맞게 표시하기 위해 하단의 로직을 추가로 실행

            //현재 판매중인 옵션별 카운팅
            for_sale_array.forEach((x) => {
                for_sale_result[x] = (for_sale_result[x] || 0)+1;
            })

            // 현재 품절된 옵션별 카운팅
            out_of_stock_array.forEach((x) => {
                out_of_stock_result[x] = (out_of_stock_result[x] || 0)+1;
            })

            // 현재 숨김된 옵션별 카운팅
            hidden_array.forEach((x) => {
                hidden_result[x] = (hidden_result[x] || 0)+1;
            })

            // 전체 옵션별 카운팅
            index_array.forEach((x) => {
                index_result[x] = (index_result[x] || 0) + 1;
            })

            //현재 판매중인 옵션별 카운팅
            no_for_sale_array.forEach((x) => {
                no_for_sale_result[x] = (no_for_sale_result[x] || 0)+1;
            })

            // 현재 품절된 옵션별 카운팅
            no_out_of_stock_array.forEach((x) => {
                no_out_of_stock_result[x] = (no_out_of_stock_result[x] || 0)+1;
            })

            // 현재 숨김된 옵션별 카운팅
            no_hidden_array.forEach((x) => {
                no_hidden_result[x] = (no_hidden_result[x] || 0)+1;
            })

            // 전체 옵션별 카운팅
            no_index_array.forEach((x) => {
                no_index_result[x] = (no_index_result[x] || 0) + 1;
            })



            //******************************************************************************************************************
            // 옵션의 품절 , 숨김카운팅을 체크
            // 전체 옵션별 카운트 - 품절 카운트 == 0 일경우 해당 옵션자체가 품절 disabled
            // 전체 옵션별 카운트 - 숨김 카운트 == 0 일경우 해당 옵션자체가 숨김 display = none
            for await (const [key, value] of Object.entries(index_result)) {
                if(hidden_result[key] !== undefined) {
                    tmp_hidden[key] = value - hidden_result[key];
                } else {
                    tmp_hidden[key] = value;
                }

                if(out_of_stock_result[key] !== undefined) {
                    tmp_sold_out[key] = value - out_of_stock_result[key];
                } else {
                    tmp_sold_out[key] = value;
                }
            }
            for await (const [key, value] of Object.entries(no_index_result)) {
                if(no_hidden_result[key] !== undefined) {
                    no_tmp_hidden[key] = value - no_hidden_result[key];
                } else {
                    no_tmp_hidden[key] = value;
                }

                if(no_out_of_stock_result[key] !== undefined) {
                    no_tmp_sold_out[key] = value - no_out_of_stock_result[key];
                } else {
                    no_tmp_sold_out[key] = value;
                }
            }


            // 옵션 조각 숨기기? 나타내기? disabled? enabled? 처리

            await this.$nextTick(()=>{
                for (const [key, value] of Object.entries(tmp_sold_out)){
                    console.log(key, value)
                    if(value === 0 || value === '0') {
                        this.$refs[`${key}`][0].classList.add('soldout')
                        this.$refs[`${key}`][1].style.opacity = '50%'
                    } else {
                        this.$refs[`${key}`][0].classList.remove('soldout')
                        this.$refs[`${key}`][1].style.opacity = '100%'
                    }
                }

                for (const [key, value] of Object.entries(tmp_hidden)){
                    this.$refs[`${key}`][0].style.display = 'block'
                    this.$refs[`${key}`][1].style.display = 'block'
                    if(value === 0 || value === '0') {
                        console.log(`hide option`);
                        this.$refs[`${key}`][0].style.display = 'none'
                        this.$refs[`${key}`][1].style.display = 'none'

                    } else {
                        console.log(`show option`);
                    }
                }

                for (const [key, value] of Object.entries(no_tmp_sold_out)){
                    this.$refs[`${key}`][0].classList.remove('soldout')
                    this.$refs[`${key}`][1].style.opacity = '100%'
                    if(value === 0 || value === '0') {
                        console.log(`disabled option`);
                        this.$refs[`${key}`][0].classList.add('soldout')
                        this.$refs[`${key}`][1].style.opacity = '50%'

                    } else {
                        console.log(`yes`);
                    }
                }

                for (const [key, value] of Object.entries(no_tmp_hidden)){
                    this.$refs[`${key}`][0].style.display = 'block'
                    this.$refs[`${key}`][1].style.display = 'block'
                    if(value === 0 || value === '0') {
                        console.log(`hide option`);
                        this.$refs[`${key}`][0].style.display = 'none'
                        this.$refs[`${key}`][1].style.display = 'none'

                    } else {
                        console.log(`yes`);
                    }
                }

            });



            //***************************************************************************************************************
        },

        // =================================================================================================
        // 옵션 클릭시 컨트롤
        pushFragmentOpt(type,index,group,optidx,optItem,is_necessary, stock_check) {

            if (type == 'uo') {
                if (this.productItem.hasStock === 'Y' && this.optionJson[`${type}_${group}_${optItem.name}`].stock == 0) {
                    alert('품절 옵션입니다.');
                    return;
                }
            }
            // console.log(this.optionJson[`${type}_${group}_${optItem.name}`]);
            // console.log(`${type}_${group}_${optItem.name}`);
            // console.log(stock_check);
            if (this.productItem.hasStock === 'Y') {
                if (this.soldCheck[stock_check] == 0) {
                    alert('품절 옵션입니다.');
                    return;
                }
            }

            if (type == 'co') {
                if (!!this.optionJson[`${type}_${stock_check}`] && this.productItem.hasStock === 'Y' && this.optionJson[`${type}_${stock_check}`].stock == 0) {
                    alert('품절 옵션입니다.');
                    return;
                    }
            }


            // console.log(type,index,group,optidx,optItem,is_necessary,this.requireOption.length)
            //console.log(this.productItem.isCombine)
            if(type === "co" && this.productItem.isCombine == 'true') {
                const co_group = index+1;
                const required_idx = this.requireOption.length;
                if(co_group > this.lastSelectedCoGroup + 1) {
                    alert("옵션을 첫번째부터 선택해주세요.")
                    return false;
                }

                this.optionClose();

                this.lastSelectedCoGroup = Number(co_group);
                this.selectOpt[group] = optidx;
                // console.log(co_group)
                for(const i in this.requireOptionIds) {
                    if(group < this.requireOptionIds[i]) {
                        delete this.selectOpt[this.requireOptionIds[i]];
                    }
                }
                console.log('this.selectOpt')
                // 품절? 숨김 ? 판매중 확인
                this.check_for_sale_option(group,
                                            optidx,
                                            co_group,
                                            required_idx,
                                            this.selectOpt,
                                            type,
                                            this.productItem.hasStock)
                // console.log(co_group, required_idx,group)
                if(Number(co_group) === Number(required_idx)) {
                    // this.draw_check_option(this.productItem.hasStock);
                    this.selectCombineOption(this.selectOpt)
                }

                // console.log('last')
                // console.log(this.lastSelectedCoGroup)
            } else {
                if(type === "co") {
                    const co_group = index+1;
                    const required_idx = this.requireOption.length;
                    if(co_group > this.lastSelectedCoGroup + 1) {
                        alert("옵션을 첫번째부터 선택해주세요.")
                        return false;
                    }

                    this.optionClose();

                    this.lastSelectedCoGroup = Number(co_group);
                    this.selectOpt[group] = optidx;

                    this.selectCombineOption(this.selectOpt)


                } else {
                    this.selectNoCombineOption(group,optidx,type);
                    this.optionClose();
                }
            }


            if(Object.keys(this.combineOpt).length>1){
                let last_key = Object.keys(this.combineOpt)[1]
                delete this.combineOpt[last_key]
                //MARK : 필수옵션 2개이상 선택 못하도록 제어, 이 부분에 popup노출 필요
                alert('옵션은 하나만 선택 가능합니다.')
            }

        },
        selectCombineOption(selected_option) {
            const item_arr = [];
            //console.log(selected_option)
            if(this.productItem.isCombine == 'true') {
                const prefix = "co";
                const tmp_arr = [prefix];

                for(const i in selected_option) {
                    tmp_arr.push(i);
                    tmp_arr.push(selected_option[i]);
                    // console.log(this.optionJsonName[i])
                    const opt_list_item = this.optionJsonName[i]['value'][selected_option[i]];
                    const opt_list_name = this.optionJsonName[i]['name']

                    item_arr.push({
                        opt_name : opt_list_name ,
                        idx: selected_option[i],
                        name: opt_list_item.name,
                        value: opt_list_item.value,
                        type: opt_list_item.type,
                    })
                }

                // console.log(item_arr)
                const opt_list_code = tmp_arr.join('_'); // 옵션 코드
                const opt_info = this.optionJson[opt_list_code];
                // console.log(opt_info)
                const printed_value = opt_info.value;

                //Mark : 221028 임시로 개수 증가 막음 개수 증가 주석 풀때 같이 풀것
                // if(opt_list_code in this.combineOpt) {
                //     this.combineOpt[opt_list_code].amount++;
                // } else {
                    this.combineOpt[opt_list_code] = {
                        key : opt_list_code ,
                        type : prefix,
                        items : item_arr,
                        amount : 1,
                        value : printed_value
                    }
                //}

                this.lastSelectedCoGroup = 0;
                this.selectOpt = {};
            }
            // 조합형 종료
        },
        // =================================================================================================
        //선택형
        selectNoCombineOption(group,optidx,type) {
            const opt_list_item = this.optionJsonName[group]['value'][optidx];
            const opt_list_code = `${type}_` + group + "_" + opt_list_item.name; // 옵션 코드
            const opt_list_name = this.optionJsonName[group]['name'];
            const opt_info = this.optionJson[opt_list_code];

            // console.log(opt_info)

            if(opt_list_code in this.noCombineOpt) {
                // Vue.set(this.noCombineOpt,opt_list_code, this.noCombineOpt[opt_list_code].amount++)
                this.noCombineOpt[opt_list_code].amount++;
            } else {
                this.noCombineOpt[opt_list_code] = {
                    key : opt_list_code ,
                    type : type,
                    items : [{
                        opt_name : opt_list_name ,
                        idx: optidx,
                        name: opt_list_item.name,
                        value: opt_list_item.value,
                        type: opt_list_item.type,
                    }],
                    amount : 1,
                    value : opt_info.value
                }
            }
            this.lastSelectedCoGroup = 0;
            this.selectOpt = {};
        },
        // 재입고 알림 요청
        async setStockNotify(){

            let url = `/gooduser/api/v1/stockNotify/save`

            let findObj = {}
            console.log(this.soldOut_obj)
            for await (const [key, value] of Object.entries(this.soldOut_obj)){
                if(this.select_sold_out.optId === value.optId){
                    findObj[key] = value
                }
            }

            let notifyData={
                productId : Number(this.prodId), //number
                productOptionId : !this.productItem.productOptionId? '':  this.productItem.productOptionId,//number
                memberId : this.getUserId,//number
                optionDataKey : !this.select_sold_out.optId? '': `co_${this.select_sold_out.optId}` ,//string(옵션 키)
                optionDataName : !this.select_sold_out.optName? '': this.select_sold_out.optName ,//string(옵션 이름)
                optionData : JSON.stringify(findObj),
                phone : this.noti_phone,//string 하이픈 뺴고 보내기
            }
            console.log(notifyData)
            await axios.post(url,notifyData).then(res=>{
                console.log('stockNotify/save')
                console.log(res)
                if(res.data.code===200){
                    alert('신청이 완료되었습니다')
                    this.select_sold_out = ''
                    this.noti_phone = null
                    this.setStockNotiToggle = 0
                }else{
                    alert('오류입니다 관리자에게 문의 부탁드립니다')
                }

            })
        },

        async setRelativeRandom(productCateId){
            this.relativeRandomData = null;
            let url = `/gooduser/api/v1/product_api/random`
            let relData={
                categoryId : productCateId, //categoryId
                productId : this.prodId
            }

            await axios.post(url,relData).then(res=>{
                console.log('cate Load')
                console.log(res)
                this.relativeRandomData = res.data.data;
            })
        },

        notiPop(val){
            if(val===1){
                if (this.userId != null) {
                    if (this.noti_phone_user === '') {
                        let url = '/gooduser/api/v1/member_user/search_id'
                        let reqUser = {}
                        axios.post(url,reqUser).then(res=>{
                            console.log('/gooduser/api/v1/member_user/search_id');
                            console.log(res);
                            this.noti_phone_user = res.data.data.telephone;
                            this.noti_phone = this.noti_phone_user;
                        })
                    } else {
                        this.noti_phone = this.noti_phone_user
                    }
                }

                this.setStockNotiToggle= 1
            }else
                this.setStockNotiToggle = 0
        },
        drawCombineOptName(items) {
            const resultArr = [];
            for (const i in items) {
                resultArr.push(items[i].opt_name + " : " + items[i].name);
            }

            return resultArr.join(" / ");
        },
        combineOptCount(code, type) {
            if(Number(this.combineOpt[code].amount) === 1 && type === "M") {
                return;
            }
            this.combineOpt[code].amount = type === 'P' ? this.combineOpt[code].amount + 1 : this.combineOpt[code].amount - 1;
        },
        noCombineOptCount(code, type) {
            if(Number(this.noCombineOpt[code].amount) === 1 && type === "M") {
                return;
            }
            this.noCombineOpt[code].amount = type === 'P' ? this.noCombineOpt[code].amount + 1 : this.noCombineOpt[code].amount - 1;
        },
        deleteOpt(code, type) {
          if(type === "C") {
              delete this.combineOpt[code];
          } else {
              delete this.noCombineOpt[code];
          }
        },
        // 단일상품 카운트 조절
        singleOptionCount (type) {
            if (type == 'M' && this.optionSingleCount > 1) {
                this.optionSingleCount = this.optionSingleCount - 1;
            } else if (type == 'P') {
                this.optionSingleCount = this.optionSingleCount + 1;
            }
        },
        //====================================================================
        soldoutCheck(){
                if(this.co_cnt === this.soldOut_cnt){alert('품절된 상품입니다')}
        },
        changeTel(telOrigin){
            let tel = telOrigin.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "");
            return tel
        },
		responseReviewCount(count) {
			this.reviewCount = count;
		},

        // 이미지 뷰어 함수
        setImageViewer(imgArr) {
            this.$refs.vImageViewer.showVviewer(imgArr);
        },

        // 할부 데이터 세팅
		async setIfpData(){
			let url = `/gooduser/api/v1/product/setting/anywhere/detail`
			await axios.post(url).then(res=>{
                console.log(`/gooduser/api/v1/product/setting/anywhere/detail`)
                console.log(res);
				if (res?.data?.data?.content) {
					this.ifpData = res?.data?.data?.content?.replace(/(?:\r\n|\r|\n)/g, '<br />');
				}
			});
		},
        changeBr(value){
            let result = ''
            if (typeof(value) == 'string') {
			    result = value.replaceAll(/(\n|\r\n)/g,'<br>')
            } else {
                result = value;
            }
			return result
		},
		// 명절 데이터
		async getHoliday(){
            this.loadSpecial = false;
            this.pickerDateSpecialType = null;
            this.pickerDateSpecial = null;
            this.pickerDateSpecialRange = {
                'holiday_chuseock': null,
                'holiday_seolnal': null,
            };
            this.pickerDateSpecialRangeAll = [];
            this.pickerDateSpecialRangeAllStart = null;
            // 기념일 배송 휴일 설정
            this.pickerDateSpecialDisable = [
                {weekdays: 1},
                {weekdays: 7},
            ];

			let url = `/gooduser/api/v1/holiday/select`
			await axios.post(url).then(res=>{

				res.data.data.forEach((item, index) => {
					// 휴일 데이터
					if (item.type == 'G') {
						this.pickerDateSpecialDisable.push({
						start: item.sdate,
						end: item.edate,
					});
					}
					// 명절 데이터
					if (item.type == 'M') {
						if (item.name == '추석') {
							this.pickerDateSpecialRange['holiday_chuseock'] = item;
                            this.pickerDateSpecialRangeAll.push({
                                start: item.sdate,
                                end: item.edate,
                            });
						}
						if (item.name == '설날') {
							this.pickerDateSpecialRange['holiday_seolnal'] = item;
                            this.pickerDateSpecialRangeAll.push({
                                start: item.sdate,
                                end: item.edate,
                            });
						}
                        if (this.pickerDateSpecialRangeAllStart == null) {
                            this.pickerDateSpecialRangeAllStart = item.sdate;
                        } else if (!moment(this.pickerDateSpecialRangeAllStart).isAfter(item.sdate)) {
                            this.pickerDateSpecialRangeAllStart = item.sdate;
                        }
					}
				});
				this.loadSpecial = true;
			});
		},
        loginCheck() {
            if (this.userId == null) {
                alert('로그인이 필요한 기능입니다.');

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
                return;
            }
        },
        checkStock(){
            console.log('aa')
            let result = false

            if(this.productItem.hasStock=='Y'){
                if(this.productItem.hasOption=='Y'){

                    if(this.allSoldOut ===true && Number(this.productItem.stock)==0){
                        console.log(`this.allSoldOut`)
                        console.log(this.allSoldOut)
                        result = true
                    }else{
                        result = false
                    }
                }else{
                    if(Number(this.productItem.stock)==0){
                        result = true
                    }
                }
            }else{
                result = false
            }

            this.showSoldOut = result
            this.optionCheckPending = false;
        },
        move_to_detail(id){
            this.$router.push({
                path : `/gooduser/goodslist/detail/${id}`
            });
            //console.log(this.$router.currentRoute);
            //this.$router.go(`/gooduser/goodslist/detail/${id}`)
            //setTimeout(this.$router.go(this.$router.currentRoute), 30);

        },
    },
    setup() {
        return {
            modules: [Navigation, Pagination, Autoplay, Thumbs],
        };
    },

    computed: {
        getTotalOptionPay(){
            let tmpPrice = null
            let gradePrice = 0
                for (const [key, value] of Object.entries(this.combineOpt)){
                    gradePrice = this.userGrade === 'VIP'? Number(this.productItem.vipSellingPrice) : Number(this.productItem.normalSellingPrice)

                    tmpPrice =  ( gradePrice + value.value) * value.amount
                }
                for (const [key, value] of Object.entries(this.noCombineOpt)){
                    console.log(value)
                    tmpPrice += value.amount* value.value
                }
            return Number(tmpPrice )
        },
        setTTL(){
            let now = moment()
            let gap = moment.duration(now.diff(moment(localStorage.getItem('TTL')))).minutes()
            console.log(gap)
            return gap
        }
    },
    mounted() {


        const script = document.createElement("script");
        script.src="https://developers.kakao.com/sdk/js/kakao.js";
        document.head.appendChild(script);
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        //this.draw_check_option(this.productItem.hasStock);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },// router.go(0)
    watch: {
        $route() {
            if (this.$route.params.id && this.$route.name == 'goodslist_detail') {
                if (this.$route.params.id != this.prodId) {
                    this.$router.go(this.$router.currentRoute);
                }
            }
        },

    }
}

</script>
<style scoped>

</style>
