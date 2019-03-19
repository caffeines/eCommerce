<template>
	<div>
		<appcard :description="description"></appcard>
	</div>
</template>

<script>
	import appcard from "~/components/card.vue";
	export default {
		components: {
			appcard
		},
		data: () => {
			return {
				description: {
					title: "Vue T-shirt",
					price: "15",
					details: `Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.`,
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
