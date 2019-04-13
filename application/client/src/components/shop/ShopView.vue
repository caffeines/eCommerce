<template>
	<div class="mt-2">
		<Carousel :items="shop.coverPic"/>
		<ProductCard :shopRouteId="shopRouteId"/>
	</div>
</template>
<script>
	import Carousel from "@/components/Carousel";
	import ProductCard from "@/components/shop/ProductCard";
	import { mapGetters } from "vuex";
	export default {
		props: ["shopRouteId"],
		components: {
			ProductCard,
			Carousel
		},
		watch: {
			shopRouteId: function(newValue, oldValue) {
				console.log(newValue, oldValue);

				if (newValue) {
					this.getShop();
				}
			}
		},
		created() {
			this.getShop();
		},
		computed: {
			...mapGetters(["shop"])
		},
		methods: {
			getShop() {
				this.$store.dispatch("getShop", { id: this.$route.params.shopRouteId });
			}
		}
	};
</script>