<template>
	<Signin/>
</template>
<script>
	import Signin from "@/components/Signin";
	import { mapGetters } from "vuex";
	export default {
		components: {
			Signin
		},
		computed: {
			...mapGetters(["user"])
		}
	};
</script>
