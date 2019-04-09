<template>
	<div class="mt-2">
		<!-- <Carousel/> -->
		<ProductCard/>
	</div>
</template>
<script>
	import Carousel from "@/components/Carousel";
	import ProductCard from "@/components/shop/ProductCard";

	import { mapGetters } from "vuex";
	export default {
		components: {
			ProductCard,
			Carousel
		},
		created() {
			this.getShop();
		},
		computed: {
			...mapGetters(["shop"])
		},
		methods: {
			getShop() {
				this.$store.dispatch("getShop", { id: this.$route.params.id });
			}
		}
	};
</script>

