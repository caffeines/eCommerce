<template>
	<div>{{searchResult}}</div>
</template>
<script>
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {};
		},
		computed: {
			...mapGetters(["searchResult"])
		}
	};
</script>
