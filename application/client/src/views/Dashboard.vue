<template>
	<div>
		<Dashboard :dashboardRouteId="dashboardRouteId"/>
	</div>
</template>
<script>
	import Dashboard from "@/components/shop/Dashboard.vue";
	export default {
		name: "dashboard",
		props: ["dashboardRouteId"],
		components: {
			Dashboard
		}
	};
</script>
