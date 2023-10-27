<template>
	<div class="customer_lnb">
		<h2>고객센터</h2>
		<ul class="lnb_list">
			<li :class="{'on': ($route.path === '/gooduser/customer/noticelist' || pagePathName === 'noticeview')}"><router-link to ="/gooduser/customer/noticelist">공지사항</router-link></li>
			<li :class="{'on': ($route.path === '/gooduser/customer/faqlist' || pagePathName === 'faqview')}"><router-link to ="/gooduser/customer/faqlist">FAQ</router-link></li>
			<li :class="{'on': $route.path === '/gooduser/customer/allianceqnaview'}"><router-link to ="/gooduser/customer/allianceqnaview">제휴 및 입점문의</router-link></li>
		</ul>
	</div>
</template>

<script>
export default {
  name: 'CustomermenuComp',
	components: {
	},
  data: () => ({
	pagePathName: null,
  }),
  mounted() {
	let tmpPath = this.$route.path;
	let tmpResult = tmpPath.split("/");
	this.pagePathName = tmpResult[3];
  }
}
</script>

<style scoped>

</style>
