<template>
	<div>
		<SingleProductView :productRouteId="productRouteId"/>
	</div>
</template>

<script>
	import SingleProductView from "@/components/product/SingleProductView";
	export default {
		name: "productView",
		props: ["productRouteId"],
		components: {
			SingleProductView
		}
	};
</script>
