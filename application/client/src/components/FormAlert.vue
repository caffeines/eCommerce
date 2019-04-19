<template>
	<v-alert type="error" color="error" dismissible v-model="alert">
		<h3 class="message">{{message}}</h3>
	</v-alert>
</template>
<script>
	export default {
		props: ["message"],
		data() {
			return {
				alert: true
			};
		}
	};
</script>
<style lang="scss" scoped>
	.message {
		text-align: center;
	}
</style>

