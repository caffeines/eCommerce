<template>
	<div>
		<ShopView :shopRouteId="shopRouteId"/>
	</div>
</template>
<script>
	import ShopView from "@/components/shop/ShopView";
	export default {
		name: "shopView",
		props: ["shopRouteId"],
		components: {
			ShopView
		}
	};
</script>
