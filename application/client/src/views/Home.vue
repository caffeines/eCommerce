<template>
	<div class="mt-4">
		<Home :items="Products"/>
	</div>
</template>

<script>
	import Home from "../components/Carousel";

	export default {
		name: "home",
		components: {
			Home
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
				console.log("Hited");
				this.$store.dispatch("getAllProducts");
			}
		}
	};
</script>
