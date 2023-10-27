<template>
	<div>
		<div class="modal-pop-bg on"></div>
		<div class="modal-pop on">
			<div class="popup-header">
				<h3 class="title" v-if="this.title" v-html="this.title"></h3>
				<h3 class="title" v-else>알림</h3>
				<button type="button" class="popup-close-btn" @click="this.$emit('close');">닫기</button>
			</div>
			<div class="popup-body">
				<div class="text" v-if="popTextIsArray">
					<span v-for="(data, idx) in popText" :key="idx" v-html="data"></span>
				</div>
				<div class="text" v-else>
					<span v-html="popText"></span>
				</div>
				<div class="modal-pop-button">
					<button @click="this.$emit('confirm');" v-if="this.type === 'confirm'">
						<span v-if="this.confirmText !== undefined">{{confirmText}}</span>
						<span v-else>확인</span>
					</button>
					<button @click="this.$emit('close');" :class="{'btn-white': this.type === 'confirm'}">
						<span v-if="this.closeText !== undefined">{{closeText}}</span>
						<span v-else-if="this.type === 'confirm'">취소</span>
						<span v-else>확인</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'ModalAlert',
	components: {
	},
  props: ["text", "type", "closeText", "confirmText", "title"],
  data: () => ({
	popText: false,
	popTextIsArray: false,
  }),
  mounted() {

	if (Array.isArray(this.text)) {
		this.popTextIsArray = true;
	}
		this.popText = this.text;
  },
  methods: {
	popClose() {
		this.handle = false;
	}
  }
}
</script>

<style scoped>

</style>
