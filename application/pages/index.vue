<template>
	<div>
		<div v-if="getAllProducts">
			{{pp}}
			<carousel :items="getProducts"/>
		</div>
	</div>
</template>

<script>
	import carousel from "~/components/Carousel";
	import gql from "graphql-tag";
	export default {
		components: {
			carousel
		},
		data: () => {
			return {
				pp: 0
			};
		},
		created() {
			this.$store.dispatch("setProducts", 1256463214);
			this.pp = this.$store.getters.getProducts;
		},
		methods: {
			getAllProducts() {
				this.pp = this.$store.getters.getProducts;
			}
		}
	};
</script>
