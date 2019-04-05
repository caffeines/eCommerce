<template>
	<div class="mt-2">
		<Carousel/>
		<div v-if="shop">{{shop}}</div>
	</div>
</template>
<script>
	import Carousel from "@/components/Carousel";
	import { mapGetters } from "vuex";
	export default {
		components: {
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

