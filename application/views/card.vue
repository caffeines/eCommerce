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
					imageSrc: ["./vue-tshirt.jpg", "./vue2.jpg", "./vue3.jpg"],
					reviews: 4785,
					rating: 4.6,
					size: ["S", "M", "L", "XL", "XXL"],
					colors: ["Gray", "Black", "Ash"]
				}
			};
		}
	};
</script>
	
<style>
</style>
