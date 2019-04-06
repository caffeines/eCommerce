<template>
	<div>
		<div v-if="!entry">
			<Signin/>
		</div>
		<div v-else>
			<Signup/>
		</div>
	</div>
</template>
<script>
	import Signin from "@/components/Signin";
	import Signup from "@/components/Signup";
	import { mapGetters } from "vuex";
	import { mapMutations } from "vuex";
	export default {
		components: {
			Signin,
			Signup
		},
		computed: {
			...mapGetters(["user", "entry"])
		}
	};
</script>
