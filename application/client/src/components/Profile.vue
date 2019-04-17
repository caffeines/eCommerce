<template>
	<div v-if="user">
		<h1>Profile</h1>
		<h4 class="mt-4">Username: {{user.userName}}</h4>
		<h4>Name: {{user.firstName}} {{user.lastName}}</h4>
		<h4>Email: {{user.email}}</h4>
		<h4>Contact No: {{user.contactNo}}</h4>
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

