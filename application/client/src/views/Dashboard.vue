<template>
	<Dashboard :dashboardRouteId="dashboardRouteId"/>
</template>
<script>
	import Dashboard from "@/components/shop/Dashboard.vue";
	export default {
		name: "dashboard",
		propos: ["dashboardRouteId"],
		components: {
			Dashboard
		}
	};
</script>
