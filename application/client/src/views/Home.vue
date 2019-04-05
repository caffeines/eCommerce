<template>
	<div class="mt-2">
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
				this.$store.dispatch("getAllProducts");
			}
		}
	};
</script>
