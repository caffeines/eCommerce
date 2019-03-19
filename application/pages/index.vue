<template>
	<div>
		<carousel/>
		<card/>
	</div>
</template>
<script>
	import card from "~/views/card";
	import carousel from "~/views/carousel";
	export default {
		components: {
			card,
			carousel
		}
	};
</script>
