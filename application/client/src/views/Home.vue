<template>
	<div class="mt-2">
		<Home :items="Products"/>
		<ExtraInfo/>
		<Product/>
	</div>
</template>

<script>
	import Home from "../components/Carousel";
	import Product from "../components/home/Product";
	import ExtraInfo from "../components/home/ExtraInfo";

	import { mapGetters } from "vuex";
	export default {
		name: "home",
		components: {
			Home,
			Product,
			ExtraInfo
		},
		computed: {
			...mapGetters(["user"])
		},
		created() {
			this.getProducts();
		},
		computed: {
			Products() {
				return this.$store.getters.getProducts;
			}
		},
		methods: {
			getProducts() {
				this.$store.dispatch("getAllProducts");
			}
		}
	};
</script>
