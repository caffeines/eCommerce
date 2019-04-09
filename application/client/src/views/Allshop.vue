<template>
	<Allshop :user="this.$store.getters.user"/>
</template>
<script>
	import { mapGetters } from "vuex";
	import Allshop from "@/components/shop/Allshop";
	export default {
		components: {
			Allshop
		}
	};
</script>
