<template>
	<div class="mt-4">
		<Home :items="Products"/>
	</div>
</template>

<script>
	import Home from "../components/Carousel";
	import { mapGetters } from "vuex";
	export default {
		name: "home",
		components: {
			Home
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
				console.log("Hited");
				this.$store.dispatch("getAllProducts");
			}
		}
	};
</script>
