<template>
	<div>
		<!-- v-viewer 이미지 확대 -->
		<!-- <div
			class="vviewerimages"
			v-viewer
			:option="viewerOption"
		>
			<img v-for="src in vviewerimages" :key="src" :src="src">
		</div> -->
		<!-- <button type="button" @click="showVviewer">Click to show</button>
		dd -->
	</div>
</template>

<script>
export default {
	name: 'ImageViewerComp',
	components: {
	},
	props: ["imageListArr"],
	data: () => ({
		// v-viewer
		imageLists: [],
		viewerOption: {
			title: false,
			toolbar: false,
			interval: 0,
			rotatable: false,
			transition: false,
		}
	}),
	mounted() {
	},
	methods: {
		getPic(name) {
            return `/tenant/attachment/view/${name}`;
        },

		// v-viewer
		showVviewer(imageArr) {
			let setPathImageList = []
            imageArr.forEach((item) => {
                setPathImageList.push(item);
            });
			this.imageLists = setPathImageList;

			this.imageViewerOpen();
		},
		imageViewerOpen() {
			this.$viewerApi({
				images: this.imageLists,
				option: this.viewerOption,
			});
		}
	}
}
</script>

<style scoped>

</style>
