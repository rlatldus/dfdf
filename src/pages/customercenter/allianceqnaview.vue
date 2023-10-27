<template>
    <div>
    <HeaderComp :headerCase="'sub'" :pageName="'제휴 및 입점문의'" />
    <div id="content">
		<!-- <div style="height: 500px; line-height: 500px; text-align: center; font-size: 30px; font-weight: 500; background: #faa;">SAMPLE</div> -->
		<div class="customer_wrap w-set">
			<!-- 고객센터 좌측 메뉴 -->
			<CustomermenuComp />
			<!-- 고객센터 좌측 메뉴 끝 -->

			<!-- 고객센터 컨텐츠 -->
			<div class="customer_con">
				<div class="tit_h3">
					<h3 class="title">제휴 및 입점문의</h3>
				</div>
				<div class="alliance_info">

					<dl>
						<dt>회사명 <span class="txt_essential">*</span></dt>
						<dd>
							<input type="text" name="company_name" title="회사명 입력" v-model="company_Name">
						</dd>
					</dl>
					<dl>
						<dt>담당자 명 <span class="txt_essential">*</span></dt>
						<dd>
							<input type="text" name="response_name" title="담당자명 입력" v-model="name">
						</dd>
					</dl>
					<dl>
						<dt>전화번호 <span class="txt_essential">*</span></dt>
						<dd>
							<input type="text" name="tel_num" title="전화번호 입력" v-model="phone" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
						</dd>
					</dl>
					<dl>
						<dt>이메일 <span class="txt_essential">*</span></dt>
						<dd>
							<input type="text" name="email" title="이메일 입력" v-model="email">
						</dd>
					</dl>
					<dl>
						<dt>홈페이지</dt>
						<dd>
							<input type="text" name="email" title="이메일 입력" v-model="homepage">
						</dd>
					</dl>
					<dl>
						<dt>관련내용 <span class="txt_essential">*</span></dt>
						<dd>
							<textarea name="introduce"  cols="30" rows="10" placeholder="참고 할 수 있는 회사에 대한 소개를 입력해주세요" v-model="contents"></textarea>
						</dd>
					</dl>

					<dl>
						<dt>첨부파일</dt>
						<dd>
							<div class="attach_area">
								<input type="file" id="attach" @change="onFileChange" >
								<label for="file_type01" class="btn btn_attach">파일첨부</label>
							</div>

							<a v-if="this.attachFile" href="#" class="attach_pdf">{{this.attachFileName}}</a><button v-if="this.attachFile" type="button" class="ico_attach_del" @click="deleteFile"></button>
							<input type="hidden" name="attachments" v-model="this.fileuuid" />
						</dd>
					</dl>

				</div>
				<div class="button_area">
					<button type="button" class="btn btn_orange" @click="allianceData()">확인</button>
				</div>
				<!-- 리스트 영역 끝 -->
			</div>
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
import CustomermenuComp from '../../components/CustomermenuComp.vue';
import axios from "axios";

export default {
    name: "allianceQnaView",
    components: {
      HeaderComp,
      MobileNavComp,
      FooterComp,
	  CustomermenuComp,
    },
    data: () => ({
        checkLike : 0,
		company_Name: null,
		name: null,
		phone: null,
		email: null,
		homepage: null,
		contents: null,
		attachFile : null,
		attachFileName: null,
		fileuuid: null,

        // pending: false,
        // waves: [],
        // wave: null,
        // showDetail: false,
        // addWave: {
        //     _id: null,
        //     year: null,
        //     text: null,
        //     start: null,
        //     end: null,
        //     ranges: [],
        //     half: null
        // }
    }),
    created () {

    },
    methods: {

		onFileChange(e){
			this.attachFileName = e.target.files[0].name; //.files
			this.attachFile = e.target.files[0]
			this.uploadAttachment(this.attachFile);
			const inputFile = document.getElementById('attach');
			inputFile.value = '';
		},
		async uploadAttachment(file) {
			let formData = new FormData();
			formData.append('attach', file); // 무조건 form에 attach 해서 보내야 하는가??

			await fetch('/gooduser/api/v1/attachment/upload', {
				method: 'POST',
				body: formData
			}).then((response) => response.json())
				.then((data) => {

					if (data.message === 'SUCCESS'){
						this.fileuuid = data.info.uuid
					}
					else{
						//return alert(data.message);
					}
				})
				.catch((error) => {
					alert('오류가 발생했습니다: ' + error);
					console.log(error);
				});
		},
		deleteFile(){
			this.attachFile = null
			this.attachFileName = null
			this.fileuuid = null
		},
		allianceData(){


    // function deleteAttachment(id, isActual) {
    //     if (isActual === undefined) isActual = false;

    //     document.getElementById('attach_' + id).remove();
    // }


			let allianceData = {
				userCompanyName : this.company_Name,
				userName: this.name,
				userTel: this.phone,
				userEmail: this.email,
				userHomepage: this.homepage,
				userContent: this.contents,
				attachFile : this.fileuuid

			}
			if(!this.company_Name || !this.name || !this.phone || !this.email || !this.contents){
				let word = ''
				if(!this.company_Name) word+= '회사명, '
				if(!this.name) word+= '담당자 명, '
				if(!this.phone) word+= '전화번호, '
				if(!this.email) word+= '이메일, '
				if(!this.contents) word+= '관련내용, '

				alert(`${word}을 확인해 주세요`)
				return false
			}
			

			let url = '/gooduser/api/v1/alliance_qna/write'
			axios.post(url,allianceData).then(res => {

             if(res){
                 alert("요청이 완료되었습니다.")
				 this.company_Name = null
				 this.name = null
				 this.phone = null
				 this.email = null
				 this.homepage = null
				 this.contents = null
				 this.attachFile = null
				this.attachFileName = null
				this.fileuuid = null
             }
           })
           .catch(error => {
             this.errorMessage = error.message;
             console.error("There was an error!", error);
           });

		}


    },
    computed: {

    },
    mounted() {
    }
}

</script>
<style scoped>

</style>
