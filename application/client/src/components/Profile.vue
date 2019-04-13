<template>
	<div v-if="user">
		{{user}}
		<h1>Profile</h1>
		<h5 class="mt-4">Username: {{user.userName}}</h5>
		<h5>Name: {{user.firstName}} {{user.lastName}}</h5>
		<h5>Email: {{user.email}}</h5>
		<h5>Contact No: {{user.contactNo}}</h5>
	</div>
</template>
<script>
	import { mapGetters } from "vuex";
	export default {
		computed: {
			...mapGetters(["user"])
		}
	};
</script>

