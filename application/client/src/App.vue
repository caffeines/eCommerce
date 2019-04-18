<template>
	<v-app>
		<Navigation/>
		<main>
			<v-container fluid class="pa-0 ma-0">
				<router-view/>
			</v-container>
		</main>
	</v-app>
</template>

<script>
	import Navigation from "./components/layouts/Navigation";

	export default {
		components: {
			Navigation
		},
		data() {
			return {
				//
			};
		}
	};
</script>

<style>
	@import url(
		https://fonts.googleapis.com/css?family=Lato:100,
		300,
		400,
		500,
		400i,
		700|Audiowide|Berkshire+Swash|Ubuntu+Mono:400
	);
</style>
