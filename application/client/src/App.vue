<template>
	<v-app>
		<Navigation/>
		<main>
			<v-container class="mt-4">
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
