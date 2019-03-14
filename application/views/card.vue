<template>
	<appcard :description="descripton"></appcard>
</template>

<script>
	import appcard from "~/components/card.vue";
	export default {
		components: {
			appcard
		},
		data: () => {
			return {
				descripton: {
					title: "Vue T-shirt",
					price: "17",
					imageSrc: "./vue-tshirt.jpg",
					reviews: 4785,
					rating: 4.6
				}
			};
		}
	};
</script>
	
<style>
</style>
