<template>
	<div>
		<div v-if="error != null">
			<v-layout row wrap mt-5 justify-center>
				<v-flex xs12 lg3 sm6 class="mt-3">
					<FormAlert :message="error"></FormAlert>
				</v-flex>
			</v-layout>
		</div>
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
	import FormAlert from "@/components/FormAlert";

	import { mapGetters } from "vuex";
	import { mapMutations } from "vuex";
	export default {
		data() {
			return {
				color: "warn",
				timeout: 5000
			};
		},
		components: {
			Signin,
			Signup,
			FormAlert
		},
		computed: {
			...mapGetters(["user", "entry", "error"])
		}
	};
</script>
