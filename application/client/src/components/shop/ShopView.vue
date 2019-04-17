<template>
	<div class="all">
		<div class="shop">
			<div class="name">{{shop.shopName}}</div>
			<div class="address">
				<v-icon>location_on</v-icon>
				{{shop.address}}
				<div>
					<v-icon>contact_phone</v-icon>
					{{shop.contactNo}}
				</div>
			</div>
		</div>
		<div class="mt-2">
			<Carousel :items="shop.coverPic"/>
			<ProductCard :shopRouteId="shopRouteId"/>
		</div>
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

<style <style lang="scss" scoped>
	@import url("https://fonts.googleapis.com/css?family=Righteous|Share+Tech+Mono");

	.shop {
		display: block;
		margin: 10px auto;
		.name {
			font-size: 40px;
			font-weight: 400;
			text-align: center;
			background-image: linear-gradient(
				to right,
				#706fd3,
				rgba(128, 0, 128, 0.822),
				rgba(255, 68, 0, 0.623),
				rgb(255, 0, 0)
			);
			-webkit-background-clip: text;
			color: transparent;
			font-family: "Share Tech Mono";
		}
		.address {
			margin: 0 auto;
			text-align: center;
			font-size: 17px;
			color: #000;
		}
	}
</style>

