<template>
	<div>
		<div v-if="loading">
			<appLoading/>
		</div>
		<div v-else class="mt-2">
			<Home :items="Products"/>
			<ExtraInfo/>
			<Product/>
		</div>
	</div>
</template>

<script>
	import Home from "../components/home/Carousel";
	import Product from "../components/home/Product";
	import ExtraInfo from "../components/home/ExtraInfo";
	import appLoading from "@/components/layouts/Loading";

	import { mapGetters } from "vuex";
	export default {
		name: "home",
		components: {
			Home,
			Product,
			ExtraInfo,
			appLoading
		},
		computed: {
			...mapGetters(["user", "loading"])
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
