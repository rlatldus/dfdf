<template>
    <div>
		<div class="popup-bg on" @click="this.$emit('close');"></div>
		<div v-if="this.pending"></div>
		<div v-else class="popup-cont w01 on" style="overflow: visible;">
			<div class="popup-header">
				<h3 class="title">날짜 변경</h3>
				<button type="button" class="popup-close-btn popup-close" @click="this.$emit('close');">닫기</button>
			</div>
			<div class="popup-body ship-option-box">
				<p class="so-txt-title" v-if="this.delvType == 'GolfPlacePickupDelivery'">골프장 선택</p>
				<div class="so-place-check checkbox-custom" v-if="this.delvType == 'GolfPlacePickupDelivery'">
					<label>
						<input type="radio" name="shippingplace" v-model="shippingplace" value="0">
						<span>전체</span>
					</label>
					<label>
						<input type="radio" name="shippingplace" v-model="shippingplace" value="01">
						<span>안양컨트리클럽</span>
					</label>
					<label>
						<input type="radio" name="shippingplace" v-model="shippingplace" value="02">
						<span>안성컨트리클럽</span>
					</label>
					<label>
						<input type="radio" name="shippingplace" v-model="shippingplace" value="03">
						<span>가평컨트리클럽</span>
					</label><br />
					<label>
						<input type="radio" name="shippingplace" v-model="shippingplace" value="04">
						<span>글렌로스컨트리클럽</span>
					</label>
					<label>
						<input type="radio" name="shippingplace" v-model="shippingplace" value="05">
						<span>동래컨트리클럽</span>
					</label>
				</div>

				<p class="so-txt-title">상품 수령 날짜 선택</p>
				<p class="so-txt-primary" v-if="this.delvType == 'GolfPlacePickupDelivery'">* 상품 수령은 금일부터 3일 후 부터 가능합니다.</p>

				<v-date-picker
					v-if="this.delvType == 'GolfPlacePickupDelivery'"
					v-model="this.pickerDate"
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

				<div class="input_area" v-if="this.delvType == 'GolfPlacePickupDelivery'">
					<input type="text" id="pickAsk" name="pickAsk" v-model="golfcomment" placeholder="골프장 픽업 관련 문의 사항을 남겨주세요" class="so-ship-comment">
					<label for="pickAsk" class="blind">픽업 문의 사항 입력</label>
				</div>



				
				<!-- 기념일 picker -->
				<v-date-picker
					v-if="this.delvType ==='AnniversaryDelivery'"
					v-model="this.pickerDate"
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

				<!-- 명절 picker -->
				<v-date-picker
					v-if="this.delvType ==='HolydayDeliveryChuseok' || this.delvType ==='HolydayDeliverySeolnal' || this.delvType ==='HolidayDelivery'"
					v-model="this.pickerDate"
					mode="date"
					color="orange"
					class="input_area"
					:min-date="this.pickerDateSpecialRange[this.productItem.shippingService].sdate"
					:max-date="this.pickerDateSpecialRange[this.productItem.shippingService].edate"
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

				<div class="modal-pop-button">
					<button @click="this.shipDateChange">
						<span>확인</span>
					</button>
					<button @click="this.$emit('close');" class="btn-white">
						<span>취소</span>
					</button>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
    name: "DateChange",
	props: ["propData"],
    components: {
    },
    data: () => ({
        pending: true,

		// 데이터 상속
		userId: null,
		prodId: null,
		itemIndex: null,
		delvType: null,
		productItem: null,
		orderInfo: null,
		isGolf: false,

        //배송방법 관련 변수
        pickupMethod: '1',
        shippingplace: null,
        pickupDate: null,
        golfcomment: null,

        // 골프장 픽업, 기념일, 명절, 예약 v-date-picker 세팅 등
		pickerFormat: {input: 'YYYY-MM-DD'},
        pickerToday: moment(new Date).format('YYYY-MM-DD'),
		pickerMin: moment(new Date).add(3, 'days').format('YYYY-MM-DD'),
		// 기념일 픽업 데이트
		loadSpecial: false,
		pickerDateSpecialType: null,
		pickerDateSpecial: null,
		pickerDateSpecialRange: {
			'holiday_chuseock': null,
			'holiday_seolnal': null,
		},
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

		pickerDate: null,
    }),
    created () {
        this.$store.commit('setState');
		this.userId = this.$store.state.userId;

		this.prodId = this.propData.prodId;
		this.itemIndex = this.propData.itemIndex;
		this.delvType = this.propData.delvType;
		this.orderInfo = this.propData.orderInfo;
		this.delvDate = this.propData.delvDate;

		console.log(this.propData);

		if (this.propData?.delvDate) {
			this.pickerDate = this.propData?.delvDate;
		}
		
		this.getProductDetailItem();
		this.getHoliday();
    },
    methods: {
		async getProductDetailItem(){
			let url = `/gooduser/api/v1/product_api/product_detail?prodId=${this.prodId}`
			console.log(url)
			await axios.get(url,{headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{ 
				let prodData = res.data.data
				console.log('prodData')
				console.log(prodData)
				this.productItem = prodData;

				this.pending = false;
			});
		},

		// 명절 데이터
		async getHoliday(){
			let url = `/gooduser/api/v1/holiday/select`
			await axios.post(url, {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}).then(res=>{
				
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
						}
						if (item.name == '설날') {
							this.pickerDateSpecialRange['holiday_seolnal'] = item;
						}
					}
				});
				this.loadSpecial = true;
			});
		},

		async shipDateChange() {
			let url, postData;
			if (this.delvType == 'GolfPlacePickupDelivery') {
				// 골프장 케이스
				url = '/gooduser/api/v1/shipping/golf_change';
				postData = {
					memberId: this.userId,
					bagId: this.orderInfo.bagId,
					shippingId: this.orderInfo.shippingId,
					shippingPickupPlaceGolf: this.shippingplace,
					pickupDateGolf: moment(this.pickerDate).format('YYYY-MM-DD'),
					golfcommentGolf: this.golfcomment,
				}
			} else if (this.delvType ==='AnniversaryDelivery') {
				// 기념일 케이스
				url = '/gooduser/api/v1/shipping/anniversary_change';
				postData = {
					memberId: this.userId,
					bagId: this.orderInfo.bagId,
					shippingId: this.orderInfo.shippingId,
					pickupDateAnniv: moment(this.pickerDate).format('YYYY-MM-DD'),
				}
			} else if (this.delvType ==='HolydayDeliveryChuseok' || this.delvType ==='HolydayDeliverySeolnal' || this.delvType ==='HolidayDelivery') {
				// 명절 케이스
				url = '/gooduser/api/v1/shipping/holiday_change';
				postData = {
					memberId: this.userId,
					bagId: this.orderInfo.bagId,
					shippingId: this.orderInfo.shippingId,
					pickupDateHoliday: moment(this.pickerDate).format('YYYY-MM-DD'),
				}
			} else {
				// shipping status 케이스에 없는 경우
				alert('배송 일자 변경 실패. 유효하지 않은 배송 타입 입니다.');
				this.$emit('close', false);
				return false;
			}

			console.log(url);
			console.log(postData);
			await axios({
                'method': 'post',
                'url': url,
                'data': postData,
				'headers': {headers: {T: localStorage.getItem("T"), I: localStorage.getItem("I")}}
            }).then(res=>{
				console.log(res);
				if (res.data.code == 200) {
					alert('배송 일자 변경 완료');
					this.$emit('close', true);
				} else {
					alert(`배송 일자 변경 실패 code: ${res.data.code}`);
					this.$emit('close', false);
				}
			}).catch(error => {
				console.log(error.response)
				alert(`배송 일자 변경 실패 code: ${error.response.status}`);
				this.$emit('close', false); 
			});
		}
    },
}

</script>
<style scoped>

</style>