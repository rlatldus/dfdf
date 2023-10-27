<template>
    <div>
        <HeaderComp />

        <div class="loading" v-if="workpending"></div>

        <!-- <div class="loading" v-if="pending && !memberData"></div> -->
        <div class="loading" v-if="pending"></div>
        <div id="content"  v-else>
            <!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
            <div class="w-set">
                <div class="order_box goods-view">
                    <ul class="navi">
                        <li>홈</li>
                        <li>주문결제</li>
                    </ul>
                    <div class="title">
                        <h2>주문서작성/결제</h2>
                        <div class="ord_step">
                            <div class="cart">장바구니</div>
                            <div class="order current">주문/결제</div>
                            <div class="end">주문완료</div>
                        </div>
                    </div>
                    <div class="section flex-order">
                        <!--왼쪽 영역 Start-->
                        <div class="ord_left_box">
                            <div class="h3_title">
                                <h3>주문자 정보</h3>
                                <div>필수입력항목 <span class="txt_essential">*</span></div>
                            </div>
                            <div class="box_ord_man">
                                <dl>
                                    <dt>주문하시는 분</dt>
                                    <dd>{{this.memberData?.name}}</dd>
                                </dl>
                                <dl>
                                    <dt>휴대폰 번호</dt>
                                    <dd>{{this.memberData.telephone? changeTel(this.memberData.telephone): ''}}</dd>
                                </dl>
                            </div>
                            <div class="h3_title" v-if="buyType!=='P' && this.normalToggle>0 ">
                                <h3>배송 정보</h3>
                                <div class="chk_info">
                                    <!-- <label for="ord_man_01"><input type="checkbox" name="ord_man" id="ord_man_01"><span>주문자정보와 동일</span></label> -->
                                </div>
                            </div>
                            <div class="del_info">
                                <!--기념일 or 명절 배송 픽업 Start-->
                                <!-- <dl>
                                    <dt>상품수령일 <span class="txt_essential">*</span></dt>
                                    <dd>
                                        <p><strong>기념일 배송</strong></p>
                                        <div class="receive_date">
                                            <input type="text" placeholder="시작일" class="ico_date" name="period01" id="datepicker2">
                                        </div>
                                    </dd>
                                </dl> -->
                                <!--기념일 픽업 End-->
                                <div v-if="buyType!=='P'  && this.normalToggle>0 ">
                                    <dl v-if="buyType!=='P' && this.myAddrList?.length > 0 " class="q1w2e3r4">
                                        <dt>배송지 선택</dt>
                                        <dd>
                                            <ul class="pc_pt_20 for-addrlist">
                                                <li class="chk_info" v-for="(item, index) in this.myAddrList" :key="index">
                                                    <label :for="`deliv_${index}`">
                                                        <input type="radio" name="deliv" :id="`deliv_${index}`" @change="this.setAddrList(index)" :checked="item.isDefault == 'Y' ? true : false">
                                                        <span v-if="item.nickName == null">배송지 {{index}}</span>
                                                        <span v-else>{{item.nickName}}</span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </dd>
                                    </dl>
                                    <dl v-if="buyType!=='P'  ">
                                        <dt>배송지명 </dt>
                                        <!-- <span class="txt_essential">*</span> -->
                                        <dd>
                                            <input type="text" name="deliv_name" title="배송지명 입력" maxlength="10" v-model="this.shipNickname">
                                        </dd>
                                    </dl>
                                    <dl v-if="buyType!=='P'  ">
                                        <dt>받으시는 분 <span class="txt_essential">*</span></dt>
                                        <dd>
                                            <input type="text" name="reciever_name" title="받으시는 분 입력" maxlength="10" v-model="this.shipName">
                                        </dd>
                                    </dl>
                                    <dl v-if="buyType!=='P'  ">
                                        <dt>휴대폰 번호<span class="txt_essential">*</span></dt>
                                        <dd>
                                            <input type="text" name="phone_num" title="휴대폰 번호 입력" maxlength="11" v-model="this.shipTel">
                                        </dd>
                                    </dl>
                                    <dl v-if="buyType!=='P'  ">
                                        <dt>추가연락처(선택)</dt>
                                        <dd>
                                            <input type="text" name="phone_num" title="추가연락처 입력" maxlength="11" v-model="this.shipTelSub">
                                        </dd>
                                    </dl>
                                    <dl v-if="buyType!=='P'  " class="q1w2e3r4">
                                        <dt>주소 <span class="txt_essential">*</span></dt>
                                        <dd>
                                            <p><a href="javascript:;" class="btn btn_light_gray_solid" @click="addrSearch()">우편번호</a></p>
                                            <input type="hidden" name="postcode" title="postcode" id="postcode" readonly v-model="this.postCode" />
                                            <p><input type="text" name="roadAddress" title="주소" id="roadAddress" readonly v-model="this.roadAddress"></p>
                                            <p><input type="text" name="add_detail" title="상세주소 입력" maxlength="50" v-model="this.shipAddr3"></p>
                                        </dd>
                                    </dl>
                                    <dl v-if="buyType!=='P'  ">
                                        <dt>배송요청사항(선택)</dt>
                                        <dd>
                                            <p>
                                                <select id="del_message" name="del_message" title="배송메세지 선택" v-model="this.shipRequest">
                                                    <option value="">배송메세지를 선택하세요</option>
                                                    <option value="배송 전 연락 부탁드립니다.">배송 전 연락 부탁드립니다.</option>
                                                    <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>.
                                                    <option value="집 앞에 놔주세요.">집 앞에 놔주세요.</option>
                                                    <option value="택배함에 놔주세요.">택배함에 놔주세요.</option>
                                                    <option value="부재 시 휴대폰으로 연락주세요.">부재 시 휴대폰으로 연락주세요.</option>
                                                    <option value="부재 시 경비실에 맡겨주세요.">부재 시 경비실에 맡겨주세요.</option>
                                                    <option value="부재 시 집앞에 놔주세요.">부재 시 집앞에 놔주세요.</option>
                                                    <option value="custom">직접입력</option>
                                                </select>
                                            </p>
                                            <p v-if="this.shipRequest == 'custom'">
                                                <input type="text" name="message" title="메세지 입력" placeholder="20자 이내로 입력하세요" v-model="this.shippingMassageCustom">
                                            </p>
                                        </dd>
                                    </dl>
                                    <dl v-if="holydayReceiptDate != null">
                                        <dt>명절배송 상품 수령일 <span class="txt_essential">*</span></dt>
                                        <dd>
                                            <!-- <p><strong>기념일 배송</strong></p> -->
                                            <div class="receive_date">
                                                <input type="text" placeholder="시작일" v-model="holydayReceiptDate" class="ico_date" name="period01" id="datepicker1" readonly>
                                            </div>
                                        </dd>
                                    </dl>
                                    <dl v-if="anniversaryReceiptDate != null">
                                        <dt>기념일 배송 상품 수령일 <span class="txt_essential">*</span></dt>
                                        <dd>
                                            <!-- <p><strong>기념일 배송</strong></p> -->
                                            <div class="receive_date">
                                                <input type="text" placeholder="시작일" v-model="anniversaryReceiptDate" class="ico_date" name="period01" id="datepicker1" readonly>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <!--골프장픽업 Start-->
                                <!-- TODO: 20220906 미개발 주석 -->
                                <div v-if="this.isGolf ===1">
                                    <div class="h3_title" >
                                        <h3>골프장 배송 정보</h3>
                                    </div>
                                    <dl>
                                        <dt>받으시는 분 <span class="txt_essential">*</span></dt>
                                        <dd>
                                            <input type="text" name="reciever_name" title="받으시는 분 입력" maxlength="10" v-model="this.golfName">
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>휴대폰 번호<span class="txt_essential">*</span></dt>
                                        <dd>
                                            <input type="text" name="phone_num" title="휴대폰 번호 입력" maxlength="11" v-model="this.golfTel">
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>골프장<span class="txt_essential">*</span></dt>
                                        <dd>
                                            <ul class="pickup_box">
                                                <li v-if="shippingplace === '01'"><label for="pickup_01"><input type="radio" value="01" name="pickup" id="pickup_01" v-model="shippingplace" readonly><span>{{changingGolfLabel(shippingplace)}}</span></label></li>
                                                <li v-if="shippingplace === '02'"><label for="pickup_03"><input type="radio" value="02" name="pickup" id="pickup_03" v-model="shippingplace" readonly><span>{{changingGolfLabel(shippingplace)}}</span></label></li>
                                                <li v-if="shippingplace === '03'"><label for="pickup_02"><input type="radio" value="03" name="pickup" id="pickup_02" v-model="shippingplace" readonly><span>{{changingGolfLabel(shippingplace)}}</span></label></li>
                                                <li v-if="shippingplace === '04'"><label for="pickup_06"><input type="radio" value="04" name="pickup" id="pickup_06" v-model="shippingplace" readonly><span>{{changingGolfLabel(shippingplace)}}</span></label></li>
                                                <li v-if="shippingplace === '05'"><label for="pickup_04"><input type="radio" value="05" name="pickup" id="pickup_04" v-model="shippingplace" readonly><span>{{changingGolfLabel(shippingplace)}}</span></label></li>
                                            </ul>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>픽업메세지 <span class="txt_essential">*</span></dt>
                                        <dd>
                                            <textarea name="" id="" cols="30" rows="10" v-model="golfcomment" placeholder="판매자 님 골프장 픽업 시 먼저 전화를 주고 가야할까요?" ></textarea>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>상품수령일 <span class="txt_essential">*</span></dt>
                                        <dd>
                                            <!-- <p><strong>기념일 배송</strong></p> -->
                                            <div class="receive_date">
                                                <input type="text" placeholder="시작일" v-model="pickerDatePickup" class="ico_date" name="period01" id="datepicker1" readonly>
                                            </div>
                                        </dd>
                                    </dl>
                            </div>
                                <!--골프장픽업 End-->
                                <!--선물하기 Start-->
                                <!-- TODO: 선물하기시 이미지 데이터 담겨야함 -->
                                <div class="present_box" v-if="buyType==='P'">
                                    <div class="p_thumbnail">
                                        <div class="thumbnail">
                                            <img
                                                v-if="giftCardDataSet == null"
                                                src="../../assets/images/dummy/img_present.png"
                                                alt="카드명"
                                            >
                                            <img
                                                v-else
                                                :src="giftCardDataSet.uploadFileJson.realUrl"
                                                :alt="giftCardDataSet.uploadFileJson.originalName"
                                            >
                                        </div>
                                    </div>
                                    <div class="p_man">
                                        <h4>선물 받는 사람</h4>
                                        <p class="txt_info">선물 받는 분에게 배송지 입력을 위한 문자메시지가 발송됩니다.</p>
                                        <ul>
                                            <li>
                                                <strong>받는사람</strong>
                                                <span>
                                                    <input type="text" name="reciverName" id="reciverName" v-model="reciverName" title="상세주소 입력" placeholder="받으시는 분의 이름">
                                                </span>
                                            </li>
                                            <!-- TODO 번호 이름 바껴서 재작업 필요-->
                                            <li :class="{'hybird-addr-flex' : isHybirdApp}">
                                                <input type="text" name="reciverTel" id="reciverTel" v-model="reciverTel" title="상세주소 입력" placeholder="받으시는 분의 전화번호">
                                                <a @click="getThelephone()" href="javascript:;" class="hybird-addr-btn on" v-if="isHybirdApp">주소록 찾기</a>
                                            </li>
                                            <li>
                                                <div>
                                                    <textarea   :value="sendMsg" @input="changeMsg"

                                                     title="메세지 입력" cols="30" rows="10" placeholder="메시지를 함께 전달해보세요 (선택)" ></textarea>
                                                    <!-- <p>0/100</p> -->
                                                </div>
                                                <p class="caution_txt_one">특수문자는 입력이 제한됩니다</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="present_list" v-if="buyType==='P' && giftCardImage != null">
                                    <h4>선물 배경을 선택해주세요</h4>
                                    <div class="tab_list">
                                        <a href="javascript:;"
                                            :class="{'on': girtCardTab == '전체'}"
                                            @click="this.girtCardTab = '전체'"
                                        >전체</a>
                                        <a
                                            href="javascript:;"
                                            :class="{'on': girtCardTab == '시즌'}"
                                            @click="this.girtCardTab = '시즌'"
                                        >시즌</a>
                                        <a
                                            href="javascript:;"
                                            :class="{'on': girtCardTab == '축하'}"
                                            @click="this.girtCardTab = '축하'"
                                        >축하</a>
                                        <a
                                            href="javascript:;"
                                            :class="{'on': girtCardTab == '응원'}"
                                            @click="this.girtCardTab = '응원'"
                                        >응원</a>
                                        <a
                                            href="javascript:;"
                                            :class="{'on': girtCardTab == '감사'}"
                                            @click="this.girtCardTab = '감사'"
                                        >감사</a>
                                    </div>
                                    <div class="present_thumb_list">
                                        <ul>
                                            <li
                                                v-for="(item, index) in giftCardImage"
                                                :key="index"
                                                :class="{'on': (item.type == girtCardTab || girtCardTab == '전체')}"
                                            >
                                                <a href="javascript:;" class="thumbnail" @click="giftCaerSelect(index)">
                                                    <img :src="item.uploadFileJson.realUrl" :alt="item.uploadFileJson.originalName">
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!--선물하기 End-->
                            </div>
                            <div class="h3_title">
                                <h3>결제 방법 선택</h3>
                            </div>
                            <!--TODO: 보안성-->
                            <div class="pay_box">
                                <h4>골프삼성 기프트 카드 사용</h4>
                                <ul class="caution_txt">
                                    <li>골프삼성 기프트 카드 사용은 최종 결제완료 사용금액만큼 차감됩니다.</li>
                                    <li>기프트 카드 사용 후 환불 시 사용금액의 부분환불은 불가합니다. 전체취소 후 재승인으로 처리되므로 유의 부탁드리겠습니다.</li>

                                </ul>
                                <div class="gc_input" tabindex='1' >

                                    <input type="text" name="ord_man" id="ord_man_01" readonly @focusin="this.gcFocus = true" v-model="giftCard">
                                    <!-- <a href="javascript:;" class="btn btn_dark_gray" @click="sendGiftPoint()" >EAI용 버튼입니다</a> -->
                                    <div class="gc_popup" id="popup-gift" :class="{'on': this.gcFocus}">
                                        <div class="gcp_top">
                                            <h5>골프삼성 기프트카드 사용</h5>
                                            <button type="button" class="btn close gcPop-close" @click="this.gcFocus = false">팝업창 닫기</button>
                                        </div>
                                        <div class="gcp_con">
                                            <div class="gcp_card" v-for="(item,index) in giftCardData" :key="index" :class="{'blind': !(item.remainAmt >0 && item.remainAmt !=null && item.remainAmt !=undefined)}">
                                                <div v-if="item.remainAmt >0 && item.remainAmt !=null && item.remainAmt !=undefined">
                                                    <p>{{item.cardName}}</p>
                                                    <input type="text" v-model="useGift[index]" :ref="`useGift${index}`"  :id="`useGift${index}`" >
                                                    <strong>
                                                        원 / <em>{{threeCommaAdd(item.remainAmt)}}원</em>
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="btn_area">
                                            <button type="button" class="btn btn_dark_gray" @click="this.gcFocus = false; sumGiftCardPoint();">사용</button>
                                            <button type="button" class="btn" @click="this.gcFocus = false; giftCancel()" >취소</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- <div class="card_pay">
                                <h4>간편결제</h4>
                                <ul>
                                    <li>
                                        <div class="thumbnail"><img src="../../assets/images/dummy/card.png" alt="카드종류"></div>
                                    </li>
                                </ul>
                            </div> -->

                            <div class="general_pay for-only" style="margin-top: 20px;">
                                <h4>일반결제</h4>
                                <ul>
                                    <li class="chk_box">
                                        <label for="credit"><input type="radio" name="pay_method" id="credit" value="credit" v-model="pay_method" checked="true"><span>신용카드</span></label>
                                    </li>
                                    <!-- <li class="chk_box">
                                        <label for="pay"><input type="radio" name="pay_method" id="pay"><span>삼성 페이</span></label>
                                    </li> -->
                                </ul>
                            </div>

                            <div class="h3_title">
                                <h3>약관동의</h3>
                            </div>
                            <div class="agree_box">
                                <p class="chk_info">
                                    <label for="t_agree_01"><input type="checkbox" name="t_agree" id="t_agree_01" v-model="this.checkAll" @change="termsChangeAll"><span>전체 동의 하기</span></label>
                                </p>
                                <dl>
                                    <dt >
                                        <div class="chk_box_01">
                                            <label for="agree_chk_01">
                                                <input type="checkbox" id="agree_chk_01" name="agree_chk" @change="termsChange" v-model="this.orderTerms[0].checked"><i></i>
                                                <strong><span class="txt_essential">(필수)</span> 개인정보 제 3자 제공에 동의합니다.</strong>
                                            </label>
                                        </div>
                                        <em class="arow_box" @click="slideToggle($event)"></em>
                                    </dt>
                                    <dd>
                                        개인정보를 제공받는 자 : {{this.buyType !='Y' ?this.cartData[0].partnerName : this.partnerString}}<br />
                                        개인정보를 제공받는 자의 개인정보 이용 목적 : 배송 및 CS<br />
                                        제공하는 개인정보 항목 : (구매자)이름, 연락처 (수령자) 이름, 연락처, 주소<br />
                                        개인정보를 제공받는 자의 개인정보 보유 및 이용 기간 : 상법에 의거 5년 보관후 파기<br />

                                        ※ 동의를 거부하실 수 있으며 동의를 거부하시는 경우에는 구매가 불가능합니다.

                                    </dd>
                                </dl>
                                <dl>
                                    <dt>
                                        <div class="chk_box_01">
                                            <label for="agree_chk_02">
                                                <input type="checkbox" id="agree_chk_02" name="agree_chk" @change="termsChange" v-model="this.orderTerms[1].checked"><i></i>
                                                <strong><span class="txt_essential">(필수)</span> 결제대행서비스 이용약관에 동의합니다.</strong>
                                            </label>
                                        </div>
                                        <em class="arow_box" @click="slideToggle($event)"></em>
                                    </dt>
                                    <dd>
                                        개인정보를 제공받는 자 : {{this.buyType !='Y' ?this.cartData[0].partnerName : this.partnerString}}<br />
                                        개인정보를 제공받는 자의 개인정보 이용 목적 : 배송 및 CS<br />
                                        제공하는 개인정보 항목 : (구매자)이름, 연락처 (수령자) 이름, 연락처, 주소<br />
                                        개인정보를 제공받는 자의 개인정보 보유 및 이용 기간 : 상법에 의거 5년 보관후 파기<br />

                                        ※ 동의를 거부하실 수 있으며 동의를 거부하시는 경우에는 구매가 불가능합니다.
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>
                                        <div class="chk_box_01">
                                            <label for="agree_chk_03">
                                                <input type="checkbox" id="agree_chk_03" name="agree_chk" @change="termsChange" v-model="this.orderTerms[2].checked"><i></i>
                                                <strong><span class="txt_essential">(필수)</span> 주문 할 상품설명에 명시된 내용과 사용조건을 확인하였으며, 취소/환불규정에 동의합니다.</strong>
                                            </label>
                                        </div>
                                    </dt>
                                </dl>
                            </div>
                        </div>
                        <!--오른쪽 영역 End-->
                        <!--왼쪽 영역 Start-->
                        <div class="ord_right_box">
                            <div class="h3_title">
                                <h3>주문정보</h3>
                            </div>
                            <div class="h3_title">
                                <h3>주문 내역</h3>
                                <div><span>전체 {{cartData.length}}건</span></div>
                            </div>
                            <div v-if="buyType=='N'|| buyType=='P'">
                                <div class="ord_info ">
                                    <div class="scroll_y">
                                        <ul>
                                            <li >
                                                <dl>
                                                    <dt>
                                                        <router-link :to="'/gooduser/goodslist/detail/'+cartData[0].product.id" class="thumbnail">
                                                            <!-- <img :src="this.getPic(cartData[0].product.mainImage)" :alt="cartData[0].product?.name"> -->
                                                            <img :src="cartData[0].realUrl" :alt="cartData[0].realUrl">
                                                        </router-link>
                                                    </dt>
                                                    <dd>
                                                        <p><span class="txt_prdname ellipsis_row">{{cartData[0].product?.name}}</span></p>
                                                        <p v-if="cartData[0].isOption =='N'">
                                                            금액 <span class="font_mont">{{this.userGrade == 'VIP'? threeCommaAdd(cartData[0].product.vipSellingPrice) : threeCommaAdd(cartData[0].product.normalSellingPrice)}}</span>원&nbsp;
                                                            수량 <span class="font_mont">{{cartData[0].count}}</span>개
                                                        </p>
                                                        <p v-else>
                                                            <span v-for="(optData, index) in prodOpt" :key="index" style="display: block;">
                                                                <span v-for="(dataname, index222) in optData.items" :key="index222">
                                                                    <span v-if="index222 != 0"> / </span>{{dataname.name}}
                                                                </span>&nbsp;|&nbsp;
                                                                수량 <span class="font_mont">{{optData.amount}}</span>개&nbsp;

                                                                금액 <span class="font_mont">{{threeCommaAdd(optData.value * optData.amount)}}</span>원
                                                            </span>
                                                        </p>

                                                        <!-- isoption 처리 하고  vip처리 형식으로 변경-->

                                                        <p v-if="cartData[0].option != null">
                                                            결제금액 <strong class="font_mont" >{{
                                                                this.userGrade == 'VIP'?
                                                                threeCommaAdd((cartData[0].product.vipSellingPrice +Object.values(this.prodOpt)[0].value)*Object.values(this.prodOpt)[0].amount*cartData[0].count)
                                                                :threeCommaAdd((cartData[0].product.normalSellingPrice +Object.values(this.prodOpt)[0].value)*Object.values(this.prodOpt)[0].amount*cartData[0].count)
                                                                }}</strong>원
                                                        </p>
                                                        <p v-else>
                                                            결제금액 <strong class="font_mont" >
                                                                {{this.threeCommaAdd(( this.cartData[0].price)*this.cartData[0].count )}}
                                                            </strong>원
                                                        </p>


                                                    </dd>
                                                </dl>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="ord_sum">
                                    <dl>
                                        <dt>주문금액</dt>
                                        <dd v-if="this.cartData[0].isOption ==='Y'"><strong class="font_mont">{{ threeCommaAdd((this.cartData[0].price * this.cartData[0].count) )}}</strong>원 </dd>
                                        <dd v-else><strong class="font_mont">{{this.threeCommaAdd(( this.cartData[0].price * this.cartData[0].count))}}</strong>원</dd>
                                    </dl>
                                    <dl>
                                        <dt>배송 비</dt>
                                        <dd><strong class="font_mont">{{threeCommaAdd(this.cartData[0].product.shippingPrice)}}</strong>원</dd>
                                    </dl>
                                    <dl class="total">
                                        <dt>소계</dt>
                                        <dd v-if="this.cartData[0].isOption ==='Y'"><strong class="font_mont">{{ threeCommaAdd((this.cartData[0].price) + this.cartData[0].product.shippingPrice)}}</strong>원 </dd>
                                        <dd v-else><strong class="font_mont">{{threeCommaAdd(( this.cartData[0].price)*this.cartData[0].count +this.cartData[0].product.shippingPrice)}}</strong>원</dd>
                                    </dl>

                                    <!-- 데이터 없음 -->
                                    <dl>
                                        <dt>기프트 카드</dt>
                                        <dd><strong class="font_mont">-{{threeCommaAdd(this.giftCard)}}</strong>원</dd>
                                    </dl>
                                    <div>
                                        <span>최종 결제금액</span>
                                        <strong class="font_mont">{{makePrice(1)}}원</strong>
                                    </div>
                                    <!-- 결제를 위한 input hidden line-->

                                </div>
                            </div>
                            <div v-if="buyType =='Y'">
                                <div class="ord_info ">
                                    <div class="scroll_y">
                                        <ul>

                                            <li v-for="(data,index) in cartData" :key="index">

                                                <dl>
                                                    <dt>
                                                        <router-link :to="'/gooduser/goodslist/detail/'+data.product.id" class="thumbnail">
                                                            <img :src="this.getPic(data.product.mainImage)" :alt="data.product?.name">
                                                        </router-link>
                                                    </dt>
                                                    <dd>
                                                        <p><span class="txt_prdname ellipsis_row">{{data.product?.name}}</span></p>
                                                        <p v-if="data.option != null && data.option != undefined && data.option != '{}' && data.option != '' ">
                                                            <span v-for="(optData, index) in data.option" :key="index" style="display: block;">
                                                                <span v-for="(dataname, index222) in data.option[index]" :key="index222">
                                                                    <span v-for="(dataname333, index333) in data.option[index].items" :key="index333">
                                                                        <span  v-if="index222 =='items'">
                                                                            <span v-if="index333 != 0"> / </span>{{dataname333.name}}
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                                &nbsp;|&nbsp;
                                                                수량 <span class="font_mont">{{optData.amount * data.count}}</span>개&nbsp;

                                                                금액 <span class="font_mont">{{threeCommaAdd(optData.value)}}</span>원
                                                            </span>
                                                        </p>
                                                        <p v-else>
                                                            금액 <span class="font_mont">{{threeCommaAdd(data.price)}}</span>원&nbsp;
                                                            수량 <span class="font_mont">{{data.count}}</span>개
                                                        </p>
                                                        <p>
                                                            결제금액 <strong class="font_mont" >{{threeCommaAdd(data.price * data.count)}}</strong>원
                                                        </p>
                                                    </dd>
                                                </dl>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="ord_sum" v-if="buyType =='Y'">
                                    <dl>
                                        <dt>주문금액</dt>
                                        <dd><strong class="font_mont">{{threeCommaAdd(this.cartSumProductPrice)}}</strong>원</dd>
                                    </dl>
                                    <dl>
                                        <dt>배송 비</dt>
                                        <dd><strong class="font_mont">{{threeCommaAdd(this.cartSumshippingPrice)}}</strong>원</dd>
                                    </dl>
                                    <dl class="total">
                                        <dt>소계</dt>
                                        <dd><strong class="font_mont">{{threeCommaAdd(this.cartSumProductPrice + this.cartSumshippingPrice)}}</strong>원</dd>
                                    </dl>
                                    <!-- 데이터 없음 -->
                                    <dl>
                                        <dt>기프트 카드</dt>
                                        <dd><strong class="font_mont">-{{threeCommaAdd(this.giftCard)}}</strong>원</dd>
                                    </dl>
                                    <div>
                                        <span>최종 결제금액</span>
                                        <strong class="font_mont">{{makePrice(2)}}원</strong>
                                    </div>
                                    <!-- 결제를 위한 input hidden line-->

                                </div>
                                <div class="ord_sum" v-else>
                                    <dl>
                                        <dt>주문금액</dt>
                                        <dd><strong class="font_mont">{{threeCommaAdd(this.cartData[0].totalPrice)}}</strong>원</dd>
                                    </dl>
                                    <dl>
                                        <dt>배송 비</dt>
                                        <dd><strong class="font_mont">{{threeCommaAdd(this.cartData[0].product.shippingPrice)}}</strong>원</dd>
                                    </dl>

                                    <dl class="total">
                                        <dt>소계</dt>
                                        <dd><strong class="font_mont">{{threeCommaAdd(this.cartData[0].totalPrice)}}</strong>원</dd>
                                    </dl>
                                    <!-- 데이터 없음 -->
                                    <dl>
                                        <dt>기프트 카드</dt>
                                        <dd><strong class="font_mont">-{{threeCommaAdd(this.giftCard)}}</strong>원</dd>
                                    </dl>
                                    <div>
                                        <span>최종 결제금액</span>
                                        <strong class="font_mont">{{makePrice(3)}}원</strong>
                                    </div>
                                    <!-- 결제를 위한 input hidden line-->

                                </div>


                            </div>

                            <div class="btn_area_order">
                                <button type="button" class="btn_dark_gray" @click="postData()">결제하기</button>

                            </div>
                        </div>
                        <!--오른 영역 End-->
                    </div>
                    <!-- MOBILE 상품 구매 영역  클릭 시 상품 구매 영역 -->
                    <div class="fix_btn for-m-flex">
                        <button type="button" class="btn" @click="postMobData()">
                            <span class="buy_01">
                                <strong class="font_mont" v-if="buyType=='N'|| buyType=='P'">{{makePrice(1)}}</strong>
                                <strong class="font_mont" v-else-if="buyType=='Y'">{{makePrice(2)}}</strong>
                                <strong class="font_mont" v-else>{{makePrice(3)}}</strong>
                            원 구매하기</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 컨텐츠 End-->
        <MobileNavComp />
        <FooterComp class="for-order-m" />

        <div style="display:none;">
            <input type="hidden" name="appCallName">
            <input type="hidden" name="appCallPhone">
            <button id="appCallToVue" @click="appCallToVue"></button>
        </div>
    </div>
</template>

<script>
window.getUserPhoneInfoResult = function(arg_phone_no, arg_user_name) {
    document.querySelector('input[name=appCallName]').value = arg_user_name;
    document.querySelector('input[name=appCallPhone]').value = arg_phone_no;
    document.querySelector('#appCallToVue').click();
}

import HeaderComp from '../../components/HeaderComp.vue';
import MobileNavComp from '../../components/MobileNavComp.vue';
import FooterComp from '../../components/FooterComp.vue';
import axios from "axios";
import moment from "moment";
//require('../../plugins/payplus_web.js');
//import  '../../plugins/payplus_web.js';
export default {
    name: "product_order",
    components: {
        HeaderComp,
        MobileNavComp,
        FooterComp,
    },
    data: () => ({
        // user Info
        userId: null,
        userGrade: null,
        bagId: null,
        pending: true,
        workpending: false,
        loadData: null,
        postCode:null,
        jibunAddress: null,
        buyType: null,
        checkLike : 0 ,
        isgift: 0,

        prodId : null,
        cartData: [],
        multiCartData: null,
        memberData: null,
        cardData: null,
        addrData: null,
        socket: null,
        message: '',
        receivedMessage: [],
        roadAddress:null,
        isMobile: false,


        //장바구니용 금액 합계 데이터
        cartSumProductPrice: 0,
        cartSumshippingPrice: 0,
        cartTotal: null,
        //옵션 해체용 변수
        prodOpt: null,
        prodOptTotalPrice: null,
        // 전송할 배송지 데이터 바인딩
        shipChecked: false,
        shipNickname: '',
        shipName: '',
        shipTel: '',
        shipTelSub: '',
        shipAddr1: '',
        shipAddr2: '',
        shipAddr3: '',
        shipRequest: '',
        shipRequestText: '',
		shippingMassageCustom: null,
        shippingId: null,

        //골프장픽업
        golfToggle: 0,
        normalToggle: 0,
        isGolf: 0,
        shippingplace: null,
        pickerDatePickup:null,
        golfcomment:null,
        golfName:null,
        golfTel:null,

        //삼성골프 기프트카드 데이터
        giftCardData: null,
        giftCardDataAmountCount: 0,

        // 선물 카드 이미지
        giftCardImage: null,
        girtCardTab: '전체',
        giftCardDataSet: null,

        totalPrice : 0, // 최종 결제 금액
        // Mark 선물하기 변수
        reciverName: null,
        reciverTel: null,
        sendMsg: null,
        // 약관 동의 체크
        checkAll: false,
        orderTerms: [
            {requierd: true, checked: false},
            {requierd: true, checked: false},
            {requierd: true, checked: false}
        ],

        // 배송지 목록
        myAddrList: null,
		checkAddrList: null,

        // 기프트카드 포커스 이벤트
        gcFocus: false,
        //결제 방식 관련
        pay_method: 'credit',
        giftCard: 0,
        giftCardPotint: 0,
        useGift:[],
        reloadToggle: 0,
        partnerString: '',
        anniversaryReceiptDate: null,
        holydayReceiptDate: null,

        // scrollEvent
        scrollEventHandler: () => {
            if ((window.scrollY) > (document.querySelector('.flex-order').offsetTop)) {
                document.querySelector('.ord_right_box').classList.add('fixed');
            } else {
                document.querySelector('.ord_right_box').classList.remove('fixed');
            }

            if (Number(window.scrollY) > Number(document.querySelector('body').clientHeight - window.innerHeight - document.querySelector('.ord_right_box').offsetHeight + 490)) {
                document.querySelector('.ord_right_box').classList.add('footer_stick');
            } else {
                document.querySelector('.ord_right_box').classList.remove('footer_stick');
            }
        },

        // 하이브리드 앱 여부
        isHybirdApp: false,

    }),
    created () {
        this.workpending = false;
        this.$store.commit('setState');
        this.setState();
        this.userId = this.$store.state.userId;
        this.userGrade = this.$store.state.userGrade;

        this.buyType = this.$route.params.buyType;
        if(this.buyType == 'N' || this.buyType == 'P'){
            this.load();
        }else{
            let tmpItem = localStorage.getItem('bagId')

            this.bagId = tmpItem.split(',');
            this.getCartData();
        }
        // 기기체크
        this.getAgent();
        this.checkHybirdApp();

        // 선물 타입의 경우 카드 로드
        if (this.buyType == 'P') {
            this.giftCardLoad();
        }
        this.getMemberData();
        this.getCardData();
        this.getMyAddrList();
        this.getGiftCardData();


    },
    methods: {
        appCallToVue() {
            this.reciverName = document.querySelector('input[name=appCallName]').value;
            this.reciverTel = document.querySelector('input[name=appCallPhone]').value;
            document.querySelector('input[name=appCallName]').value = ''
            document.querySelector('input[name=appCallPhone]').value = ''
        },
        checkHybirdApp() {
            if (window?.HYBRID_ANDROID) {
                this.isHybirdApp = true;
                return false;
            } if (typeof webkit != 'undefined') {
                if (webkit?.messageHandlers?.HYBRID_IOS) {
                    this.isHybirdApp = true;
                    return false;
                }
            }
        },
        getAgent(){
            let mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
            if(mobile){this.isMobile = true}
        },
        getThelephone(){
            if (window.HYBRID_ANDROID != null) {
                window.HYBRID_ANDROID.getUserPhoneInfo();
            } if (webkit.messageHandlers.HYBRID_IOS != null) {
                webkit.messageHandlers.HYBRID_IOS.postMessage("getUserPhoneInfo");
            }
            // let varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
            // let result = ''

            // let mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
            // if(mobile){
            //     if ( varUA.indexOf('android') > -1) {
            //         //안드로이드
            //         result = "android";
            //     } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
            //         //IOS
            //         result = "ios";
            //     }
            // }
            // console.log(result==='ios'? 'iphone':result==='android'?'android':'com')
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
        async load(){
            this.userGrade = this.$store.state.userGrade
            let url = `/gooduser/api/v1/product_api/user_buy_now/bag`
            let tmpId = {memberId: this.userId}
            await axios.post(url,tmpId,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
                if ( res.data.code != 200 ) {
                    alert('통신 오류 발생');
                    this.$router.push({
                        path : `/gooduser`
                    });
                    return false;
                }
                this.cartData[0] = res.data.data
                console.log('res')
                console.log(this.cartData[0])
                if(this.cartData[0].deliveryType == 'GolfPlacePickupDelivery'){
                        this.isGolf = 1
                        this.shippingplace = this.cartData[0].golfplacePickupPlace
                        this.pickerDatePickup = moment(this.cartData[0].golfplacePickupReciptDate).format('YYYY-MM-DD')
                        this.golfcomment = this.cartData[0].golfplacePickupComment
                }

                if(this.cartData[0].isOption =='Y'){
                    this.prodOpt =JSON.parse(this.cartData[0].option)

                    for (const [key, value] of Object.entries(this.prodOpt)){
                        this.prodOptTotalPrice = this.prodOptTotalPrice+ (value.amount* value.value)
                    }
                }
                this.anniversaryReceiptDate = this.cartData[0].anniversaryReceiptDate
                this.holydayReceiptDate = this.cartData[0].holydayReceiptDate
                this.golfToggle  = this.cartData.filter(cd=>{return cd.deliveryType==='GolfPlacePickupDelivery'}).length
                this.normalToggle = this.cartData.length - this.golfToggle
                this.pending = false;

            })
        },
        async getCartData(){
            let url = `/gooduser/api/v1/product_api/buy_multi_bag`
            let reqUser = { bagIds: this.bagId}
            // TODO: 20221126 구매창에서 새로고침시 bagId가 null로 날아가면서 전체 모든 구매리스트가 다나옴. 임시조치로 null 나올시 강제 페이지 이동 조치함
            // 추후 백엔드 에서 null값 넣어도 해당 리스트 안나오게 조치 필요.
            // if (this.$store.state.bagId == null) {
            //     this.$router.push({
            //         path : `/gooduser`
            //     });
            //     return false;
            // }
            await axios.post(url,reqUser).then(res=>{
                console.log(res)

                if ( res.data.code != 200 ) {
                    alert('통신 오류 발생');
                    this.$router.push({
                        path : `/gooduser`
                    });
                    return false;
                }

				let getcartData2 = res.data.data.bagDtoList
				this.cartData = getcartData2

                this.cartData.forEach((item,idx) =>{
                    this.partnerString += item.partnerName + ','
                    if(item.deliveryType == 'GolfPlacePickupDelivery'){
                        this.isGolf = 1

                        this.shippingplace = item.golfplacePickupPlace
                        this.pickerDatePickup = moment(item.golfplacePickupReciptDate).format('YYYY-MM-DD')
                        this.golfcomment = item.golfplacePickupComment
                    }
                    if(item.deliveryType == 'HolidayDelivery'){
                        this.holydayReceiptDate = moment(item.holydayReceiptDate).format('YYYY-MM-DD')
                    }
                    if(item.deliveryType == 'AnniversaryDelivery'){
                        this.anniversaryReceiptDate = moment(item.anniversaryReceiptDate).format('YYYY-MM-DD')
                    }
                    console.log('aa')
                    console.log(this.anniversaryReceiptDate)
                    // if(item.isOption==='Y'){
                    //     this.cartSumProductPrice += item.totalPrice * item.count
                    // }else{
                        this.cartSumProductPrice += item.price * item.count
                    //}



                    this.cartSumshippingPrice += item.shippingPrice
                    if(item.option != null && item.option != undefined && item.option != '{}' && item.option != '' ){

                        item.option =  JSON.parse(item.option)
                    }

                })
                //this.golfToggle

                this.golfToggle  = this.cartData.filter(cd=>{return cd.deliveryType==='GolfPlacePickupDelivery'}).length
                this.normalToggle = this.cartData.length - this.golfToggle

                this.cartTotal = this.cartSumProductPrice
                this.pending = false;
			})
        },
        async checkWorking() {
            return this.workpending;
        },
		async postData(){

            if (await this.checkWorking()) {
                alert('중복실행 감지');
                return false;
            }
            this.workpending = true;

            // 배송정보 체크
            if(this.isGolf===0){
                if(this.buyType !='P' ){
                    // if (!this.shipNickname) {
                    //     alert('배송지명은 필수값입니다.');
                    //     return;
                    // }
                    if (!this.shipName) {
                        alert('받으시는 분 값은 필수값입니다.');
                        this.workpending = false;
                        return;
                    }
                    let checkNumber = /^[0-9]+$/;
                    if (!checkNumber.test(this.shipTel)) {
                        alert('휴대폰 번호가 올바르지 않습니다');
                        this.workpending = false;
                        return;
                    }
                    if (!this.shipTel) {
                        alert('휴대폰 번호는 필수값입니다');
                        this.workpending = false;
                        return;
                    }

                    if (!this.shipTelSub == '') {
                        if ( !checkNumber.test(this.shipTelSub) ) {
                            alert('추가연락처가 올바르지 않습니다');
                            this.workpending = false;
                            return;
                        }
                    }

                    if (!this.postCode || !this.roadAddress || !this.shipAddr3) {
                        alert('배송주소 값은 필수값입니다.');
                        this.workpending = false;
                        return;
                    }

                }else{
                    if (!this.reciverName) {
                        alert('받으시는 분 값은 필수값입니다.');
                        this.workpending = false;
                        return;
                    }
                    if (this.reciverName.length > 10) {
                        alert('받으시는 분 값을 10자 이하로 입력해주세요');
                        this.workpending = false;
                        return;
                    }

                    let checkNumber = /^[0-9]+$/;
                    if (!checkNumber.test(this.reciverTel)) {
                        alert('휴대폰 번호가 올바르지 않습니다');
                        this.workpending = false;
                        return;
                    }
                    if ( !this.reciverTel) {
                        alert('휴대폰 번호는 필수값입니다');
                        this.workpending = false;
                        return;
                    }else if (this.reciverTel.length > 11) {
                        alert('휴대폰 번호를 11자 이하로 입력해주세요');
                        this.workpending = false;
                        return;
                    }
                }
            }


            // 약관
            let termsCheck = true;
                this.orderTerms.forEach(($el) => {
                    if ($el.requierd && !$el.checked) {
                        termsCheck = false;
                        this.workpending = false;
                        return;
                    }
                });
                if (!termsCheck) {
                    alert('필수 약관 동의가 필요합니다.');
                    this.workpending = false;
                    return;
                }
            let totalPriceData={}
            let url =''
            this.totalPrice = this.buyType==='Y'? this.cartSumProductPrice + this.cartSumshippingPrice :
                            this.cartData[0].isOption ==='Y' ?
                            this.cartData[0].totalPrice *this.cartData[0].count  :
                            this.cartData[0].price*this.cartData[0].count +this.cartData[0].product.shippingPrice ;//임시 금액

            let isSuccess = await this.saveShipping();
            console.log('주소록 저장 성공 여부');
            console.log(isSuccess);
            if (isSuccess == true) {
                // if(localStorage.getItem('buy')){localStorage.removeItem('buy');}
                // return false;

                console.log( this.cartTotal + this.cartSumshippingPrice)
                console.log(this.giftCard)
                let ptype =''//C,G,E,GC,GE
                if(this.pay_method==='credit'&& this.giftCard===0){
                    ptype = 'C'
                }else if(this.pay_method==='credit' && this.giftCard !==0 && this.giftCard < this.totalPrice ){

                    ptype = 'GC'
                }else if(this.giftCard == this.totalPrice ){

                    ptype = 'G'
                }

                let tmpArr = []
                this.cartData.forEach((item, index)=>{
                    tmpArr.push(item.id)
                })
                let tmpUrl = '/gooduser/api/v1/payment/setting'
                let tmpData = {
                    paymentType : ptype,
                    buyType : this.buyType
                }
                setTimeout(()=>{
                    axios.post(tmpUrl,tmpData).then(res=>{
                        if ( res.data.code != 200 ) {
                            alert('통신 오류 발생1');
                            this.$router.push({
                                path : `/gooduser`
                            });
                            return false;
                        }
                    })
                },1500)


                // this.bagId = this.cartData[0].id
                localStorage.setItem('buy',tmpArr)
                setTimeout(()=>{
                if(ptype ==='G'){
                    url = `/gooduser/api/v1/payment/complete` //totalPaymentPrice: 최종 결제 금액
                    totalPriceData={
                        useGiftPoint : this.giftCard,
                        paymentType: ptype,
                        buyType: this.buyType,
                        totalPaymentPrice: this.totalPrice, //최종 결제 금액
                        shippingAddressId : localStorage.getItem('shAI'),
                        giftId: localStorage.getItem('GI')
                    }
                    axios.post(url,totalPriceData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
                        if(res.data.code === 200){
                            alert('결제가 완료되었습니다.')
                            this.$router.push({
                                path : `/gooduser/mypage/myorder1`
                            })

                        }else{
                            console.log(res)

                            alert('ERROR 발생 ' + res.data.code + ': ' + res.data.data);
                            this.$router.push({
                              path: `/gooduser/cartview/cartview/a`
                            })
                        }

                    })

                }else{
                    this.workpending = false;
                    window.location.href = `/gooduser/pay.html?u=${this.userId}&t=${this.buyType}&p=${ptype}`;
                }},1500)
            } else {
                alert('주소 저장 오류 발생 실패');
                this.$router.push({
                    path : `/gooduser`
                });
                return false;
            }

            // console.log('time');
            // return false;
		},

        // TODO 주소록 세팅 20221219
        async postMobData(){

            if (await this.checkWorking()) {
                alert('중복실행 감지');
                return false;
            }
            this.workpending = true;

            // 배송정보 체크
            if(this.buyType !='P'){

                if (!this.shipName) {
                    alert('받으시는 분 값은 필수값입니다.');
                    this.workpending = false;
                    return;
                }
                let checkNumber = /^[0-9]+$/;
                if (!checkNumber.test(this.shipTel)) {
                    alert('휴대폰 번호가 올바르지 않습니다');
                    this.workpending = false;
                    return;
                }
                if (!this.shipTel) {
                    alert('휴대폰 번호는 필수값입니다');
                    this.workpending = false;
                    return;
                }

                if (!this.shipTelSub == '') {
                    if ( !checkNumber.test(this.shipTelSub) ) {
                        alert('추가연락처가 올바르지 않습니다');
                        this.workpending = false;
                        return;
                    }
                }

                if (!this.postCode || !this.roadAddress || !this.shipAddr3) {
                    alert('배송주소 값은 필수값입니다.');
                    this.workpending = false;
                    return;
                }

            }else{
                if (!this.reciverName) {
                    alert('받으시는 분 값은 필수값입니다.');
                    this.workpending = false;
                    return;
                }
                if (this.reciverName.length > 10) {
                    alert('받으시는 분 값을 10자 이하로 입력해주세요');
                    this.workpending = false;
                    return;
                }

                let checkNumber = /^[0-9]+$/;
                if (!checkNumber.test(this.reciverTel)) {
                    alert('휴대폰 번호가 올바르지 않습니다');
                    this.workpending = false;
                    return;
                }
                if ( !this.reciverTel) {
                    alert('휴대폰 번호는 필수값입니다');
                    this.workpending = false;
                    return;
                }else if (this.reciverTel.length > 11) {
                    alert('휴대폰 번호를 11자 이하로 입력해주세요');
                    this.workpending = false;
                    return;
                }
            }
            // 약관
            let termsCheck = true;
                this.orderTerms.forEach(($el) => {
                    if ($el.requierd && !$el.checked) {
                        termsCheck = false;
                        this.workpending = false;
                        return;
                    }
                });
                if (!termsCheck) {
                    alert('필수 약관 동의가 필요합니다.');
                    this.workpending = false;
                    return;
                }
            let totalPriceData={}
            let url =''
            this.totalPrice = this.buyType==='Y'? this.cartSumProductPrice + this.cartSumshippingPrice:
                            this.cartData[0].isOption ==='Y' ?
                            this.cartData[0].totalPrice *this.cartData[0].count :
                            this.cartData[0].price*this.cartData[0].count +this.cartData[0].product.shippingPrice


            let isSuccess = await this.saveShipping();
            if (isSuccess == true) {
                if(localStorage.getItem('buy')){localStorage.removeItem('buy');}

                let ptype =''//C,G,E,GC,GE
                if(this.pay_method==='credit'&& this.giftCard===0){
                    ptype = 'C'
                }else if(this.pay_method==='credit' && this.giftCard !==0 && this.giftCard != this.totalPrice ){
                    ptype = 'GC'
                }else if(this.giftCard == this.totalPrice ){
                    ptype = 'G'
                }

                let tmpArr = []
                this.cartData.forEach((item, index)=>{
                    tmpArr.push(item.id)
                })

                let tmpUrl = '/gooduser/api/v1/payment/setting'
                let tmpData = {
                    paymentType : ptype,
                    buyType : this.buyType
                }
                setTimeout(()=>{
                    axios.post(tmpUrl,tmpData).then(res=>{
                        if ( res.data.code != 200 ) {
                            alert('통신 오류 발생1');
                            this.$router.push({
                                path : `/gooduser`
                            });
                            return false;
                        }
                    })
                },1500)

                // this.bagId = this.cartData[0].id
                localStorage.setItem('buy',tmpArr)
                setTimeout(()=>{
                if(ptype ==='G'){
                    url = `/gooduser/api/v1/payment/complete` //totalPaymentPrice: 최종 결제 금액
                    totalPriceData={
                        useGiftPoint : this.giftCard,
                        paymentType: ptype,
                        buyType: this.buyType,
                        totalPaymentPrice: this.totalPrice, //최종 결제 금액
                        shippingAddressId : localStorage.getItem('shAI'),
                        giftId: localStorage.getItem('GI')
                    }
                    axios.post(url,totalPriceData,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{

                        this.reloadToggle = 1
                        if(res.data.code === 200){
                            alert('결제가 완료되었습니다.')
                            this.$router.push({
                                path : `/gooduser/mypage/myorder1`
                            })

                        }else{
                            console.log(res)

                            alert('ERROR 발생 ' + res.data.code + ': ' + res.data.data);
                            this.$router.push({
                              path: `/gooduser/cartview/cartview/a`
                            })
                        }

                    })

                }else{
                    this.workpending = false;
                    window.location.href = `/gooduser/pay_mob.html?u=${this.userId}&t=${this.buyType}&p=${ptype}`;
                }},1500)
            } else {
                alert('주소 저장 오류 발생 실패');
                this.$router.push({
                    path : `/gooduser`
                });
                return false;
            }
		},

        async getMemberData(){
            let url = '/gooduser/api/v1/member_user/search_id'
            let reqUser = {}
           await axios.post(url,reqUser).then(res=>{

				let getmemberData2 = res.data.data;
				this.memberData = getmemberData2;

			})

        },
        async getCardData(){
            let url = '/gooduser/api/v1/easycard/select_memberId'
            let reqUser = {memberId : this.userId} //MARK:  여차하면 custNo로 변경 /gooduser/api/v1/easycard/select_cust_no
           await axios.post(url,reqUser).then(res=>{

				let getcardData2 = res.data.data
				this.cardData = getcardData2


			})
        },
        async getAddrData(){
            let url = '/gooduser/api/v1/shippingAddress/find_member_id'
            let reqUser = {memberId : this.userId}
           await axios.post(url,reqUser).then(res=>{

				let getaddrData2 = res.data.data
				this.addrData = getaddrData2


			})
        },

        async getGiftCardData(){
            let url = '/gooduser/api/v1/giftcard/list'

           await axios.get(url,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
                let giftCards = res.data.data
				this.giftCardData = giftCards

                // if (this.giftCardData?.length > 0) {
                //     this.giftCardData.forEach((item) => {
                //         if (item?.remainAmt) {
                //             this.giftCardDataAmountCount += Number(item.remainAmt);
                //         }
                //     });
                // }
			})
        },
        giftCancel(){
            this.giftCard = 0
            this.useGift = []
        },
        async sumGiftCardPoint(){

            this.giftCard = 0
            let giftCardNoArr = []
            let giftCardUseAmtStrArr = []
            this.useGift.forEach((item, index)=>{
                if(!this.useGift[index]){this.useGift[index]= 0}
                if(Number(item)>this.giftCardData[index].remainAmt){

                    alert('사용금액이 잔액보다 클수 없습니다')
                    return false;
                }
                if(Number(item)<0){

                    alert('0보다 작은 값은 들어 갈 수 없습니다')
                    return false;
                }
                this.giftCard += Number(item)
                giftCardNoArr.push(this.giftCardData[index].giftCardNo)
                giftCardUseAmtStrArr.push(item)
            })
            if(this.buyType !='Y'){

                if(this.cartData[0].isOption ==='Y'){
                    if(this.giftCard> this.cartData[0].totalPrice*this.cartData[0].count +this.cartData[0].product.shippingPrice){
                        alert('총 결제금액보다 클수 없습니다1')
                        this.giftCard = 0
                        this.useGift = []
                        giftCardNoArr = []
                        giftCardUseAmtStrArr = []
                        return false;
                    }
                }else{
                    if(this.giftCard> this.cartData[0].price*this.cartData[0].count +this.cartData[0].product.shippingPrice){
                        alert('총 결제금액보다 클수 없습니다')
                        this.giftCard = 0
                        this.useGift = []
                        giftCardNoArr = []
                        giftCardUseAmtStrArr = []
                        return false;
                    }
                }
            }else{
                if(this.giftCard> this.cartSumProductPrice + this.cartSumshippingPrice){
                    alert('총 결제금액보다 클수 없습니다')
                    this.giftCard = 0
                    this.useGift = []
                    giftCardNoArr = []
                    giftCardUseAmtStrArr = []
                    return false;
                }
            }

            let url = '/gooduser/api/v1/giftCard/checkPoint'
            let reqUser = {
                giftCardNoArr : giftCardNoArr,
                giftCardUseAmtStrArr : giftCardUseAmtStrArr,
            }
            await axios.post(url,reqUser).then(res=>{


            }).catch(error => {
                console.log(error.response)

            });
        },

        getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },
        threeCommaAdd(n){
            return (n || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        changeMsg(e){
            this.sendMsg = e.target.value.replace(/[-\/\\^$%*+&@.()|[\]{}<>]/g, ' ');
        },
        escapeRegex(string) {
            return string.replace(/[-\/\\^$%*+?.()|[\]{}<>]/g, ' ');
            //return string.replace(/[^\w\sㄱ-힣]|[\_]/g, '');
        },
        async saveShipping(){
            let isSuccess = false;
            let url = ''
            let shippingData={}
                if(this.buyType != 'P'){
                    url = `/gooduser/api/v1/shippingAddress/write`
                    if(this.normalToggle>0){
                        shippingData={
                        memberId: this.userId,
                        nickname: this.shipNickname,
                        name: this.shipName, //ㄴ골프장
                        tel: this.shipTel,
                        addTel: this.shipTelSub, //ㄴ골프장
                        postCode: this.postCode, //ㄴ골프장
                        address: this.roadAddress,
                        addressDetail: this.shipAddr3, //ㄴ골프장
                        addressJibun: this.jibunAddress, //ㄴ골프장
                        shippingMessage: this.shipRequest == 'custom' ? this.shippingMassageCustom : this.shipRequest,
                        orderManName : this.memberData.name,
                        orderManTel: this.memberData.telephone,
                        isDefault:'N',
                        shippingAddressId: this.shippingId,
                    }
                }else if (this.normalToggle==0 &&this.isGolf===1){
                    shippingData={
                        memberId: this.userId,
                        nickname: '',
                        name: '', //ㄴ골프장
                        tel: '',
                        addTel: '', //ㄴ골프장
                        postCode: '', //ㄴ골프장
                        address: '',
                        addressDetail: '', //ㄴ골프장
                        addressJibun: '', //ㄴ골프장
                        shippingMessage: '',
                        orderManName : '',
                        orderManTel: '',
                        isDefault:'N',
                        shippingAddressId: this.shippingId,
                    }
                }
                await axios.post(url, shippingData).catch(errRes=>{
                }).then(res=>{
                    if (res.data.code == 200) {
                        isSuccess = true;
                    }

                    if(localStorage.getItem('shAI')){localStorage.removeItem('shAI');}

                    localStorage.setItem('shAI', res.data.data.shippingAddressId);
                });
            }else{
                // TODO 20221219 주소록
                url= '/gooduser/api/v1/gift/write'
                shippingData={
                    memberId: this.userId,
                    reciverName: this.reciverName,
                    reciverTel: this.reciverTel,
                    sendMsg: this.sendMsg,
                    giftImageId: this.giftCardDataSet.id
                }

                await axios.post(url, shippingData).catch(errRes=>{
                }).then(res=>{
                    if (res.status == 200) {
                        isSuccess = true;
                    }
                    if(localStorage.getItem('GI')){localStorage.removeItem('GI');}
                    localStorage.setItem('GI', res.data.id);

                });

            }

            return isSuccess;
        },

        // 선물하기 카드이미지
        async giftCardLoad(){
            let url= '/gooduser/api/v1/gift_image/list'
            let nullData = {};
            await axios.post(url, nullData).then(res=>{
                console.log(res)
                this.giftCardImage = res.data.data.content;
                this.giftCardDataSet = this.giftCardImage[0]
            });
        },
        giftCaerSelect(idx) {
            this.giftCardDataSet = this.giftCardImage[idx];
        },

		addrSearch(){ //@click을 사용할 때 함수는 이렇게 작성해야 한다.
            new window.daum.Postcode({
                oncomplete: (data) => { //function이 아니라 => 로 바꿔야한다.
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }
                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    //document.getElementById('postcode').value = data.zonecode;
                    document.getElementById('postcode').value = data.zonecode;
                    this.postCode = data.zonecode;
                    document.getElementById('roadAddress').value = data.roadAddress +"" + extraRoadAddr;
                    this.roadAddress = data.roadAddress +"" + extraRoadAddr;
                    //document.getElementById("jibunAddress").value = data.jibunAddress;
                    this.jibunAddress = data.jibunAddress
                    // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                    // if(roadAddr !== ''){
                    //     document.getElementById("extraAddress").value = extraRoadAddr;
                    // } else {
                    //     document.getElementById("extraAddress").value = '';
                    // }
                }
            }).open();


        },
        makePrice(val){
            //여기
            let result = 0
			switch(val) {
				case 1 : result = this.cartData[0].isOption ==='Y' ?
                this.threeCommaAdd((this.cartData[0].price * this.cartData[0].count)+ this.cartData[0].product.shippingPrice-this.giftCard) :
                this.threeCommaAdd(( this.cartData[0].price * this.cartData[0].count) +this.cartData[0].product.shippingPrice -this.giftCard); break;
				case 2 : result = this.threeCommaAdd(this.cartSumProductPrice + this.cartSumshippingPrice -this.giftCard); break;
				case 3 : result = this.threeCommaAdd(this.cartData[0].totalPrice+this.cartData[0].product.shippingPrice); break;

			}
			return result

        },
		// 배송지 체크
        // setAddr(type) {
        //     if (type === 1) {
        //         // 기본 배송지
        //         this.shipChecked = 1;
        //         this.shipNickname = this.addrData.shipDefaultAddressNickname;
        //         this.shipName = this.addrData.shipDefaultAddressName;
        //         this.shipTel = this.addrData.shipDefaultAddressTel;
        //         this.shipTelSub = this.addrData.shipDefaultAddressAddTel;
        //         this.shipAddr1 = this.addrData.shipDefaultAddressPostNumber;
        //         this.shipAddr2 = this.addrData.shipDefaultAddressAddress;
        //         this.shipAddr3 = this.addrData.shipDefaultAddressAddressDetail;
        //         if (this.addrData.shipDefaultMessage !== null) {
        //             this.shipRequest = this.addrData.shipDefaultMessage;
        //         } else {
        //             this.shipRequest = -1;
        //         }
        //         // this.shipRequestText = this.addrData.;
        //     } else if (type === 2) {
        //         // 최근 배송지
        //         this.shipChecked = 2;
        //         this.shipNickname = this.addrData.shipLastAddressNickname;
        //         this.shipName = this.addrData.shipLastAddressName;
        //         this.shipTel = this.addrData.shipLastAddressTel;
        //         this.shipTelSub = this.addrData.shipLastAddressAddTel;
        //         this.shipAddr1 = this.addrData.shipLastAddressPostNumber;
        //         this.shipAddr2 = this.addrData.shipLastAddressAddress;
        //         this.shipAddr3 = this.addrData.shipLastAddressAddressDetail;
        //         if (this.addrData.shipLastMessage !== null) {
        //             this.shipRequest = this.addrData.shipLastMessage;
        //         } else {
        //             this.shipRequest = -1;
        //         }
        //         // this.shipRequestText = this.addrData.;
        //     }
        // },

        // 배송지 리스트 가져오기
        async getMyAddrList() {
            let url = '/gooduser/api/v1/shipping_address_api/my_list';
            let setData = {  };
            await axios({
                'method': 'post',
                'url': url,
                'data': setData
            }).then(res=>{

                this.myAddrList = res.data.data;

				this.myAddrList.forEach((item, index) => {
					if (item.isDefault == 'Y') {
						this.setAddrList(index);
						return;
					}
				});
            });
        },

        setAddrList(index) {
			this.checkAddrList = index;
            this.shipNickname = this.myAddrList[index].nickName;
            this.shipName = this.myAddrList[index].receiverName;
            this.shipTel = this.myAddrList[index].tel;
            this.shipTelSub = this.myAddrList[index].addTel;
            this.postCode = this.myAddrList[index].postCode;
            this.roadAddress = this.myAddrList[index].address;
			this.addressJibun = this.myAddrList[index].addressJibun;
            this.shipAddr3 = this.myAddrList[index].addressDetail;
            this.shippingId= this.myAddrList[index].id;
			// 배송 메세지 처리
			this.shippingMassageCustom = null;
			this.shipRequest = this.myAddrList[index].shippingMassage;
			if (this.myAddrList[index].shippingMassage == '' || this.myAddrList[index].shippingMassage == null) {
				this.shipRequest = '';
			} else if (document.querySelector('#del_message').value == '') {
				this.shipRequest = 'custom';
				this.shippingMassageCustom = this.myAddrList[index].shippingMassage;
			}
        },

        termsChange() {
            let thisTimeCheck = true;
            this.orderTerms.forEach(($el) => {
                if (!$el.checked) {
                    thisTimeCheck = false;
                }
            });
            if (thisTimeCheck) {
                this.checkAll = true;
            } else {
                this.checkAll = false;
            }
        },
        changeTel(telOrigin){
            let tel = telOrigin.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "");
            return tel
        },
        termsChangeAll() {
            let bindValue = false;
            if (this.checkAll) {
                bindValue = true;
            }
            this.orderTerms.forEach(($el) => {
                $el.checked = bindValue;
            });
        },
        slideToggle(e) {
            let element = e.target.parentNode.nextSibling;
            let a;
            0 === element.offsetHeight ? (
                e.target.classList.add('on'),
                element.classList.add('on'),
                element.style.height = "auto",
                a = element.offsetHeight,
                element.style.height = 0,
                void element.offsetHeight,
                element.style.height = `${a}px`
            ) : (
                element.style.height = 0,
                e.target.classList.remove('on'),
                element.classList.remove('on')
            )
        }
    },
    computed: {
        setTTL(){
            let now = moment()
            let gap = moment.duration(now.diff(moment(localStorage.getItem('TTL')))).minutes()
            return gap
        }
    },

    mounted() {
        const script = document.createElement("script");
        script.src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        document.head.appendChild(script);
        document.addEventListener('scroll', this.scrollEventHandler);
    },
    unmounted() {
        document.removeEventListener('scroll', this.scrollEventHandler);
    }

}

</script>
<style scoped>

</style>
