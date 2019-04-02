<template>
	<v-snackbar v-model="snackbar" bottom left :color="color" :timeout="6000">
		{{ text }}
		<v-btn color="fff" flat @click="snackbar = false">Close</v-btn>
	</v-snackbar>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		props: ["text", "color"],
		data() {
			return {
				snackbar: false
			};
		},
		watch: {
			user: function(newValue, oldValue) {
				console.log("sdaasd");
				// if user value change from null
				console.log("new", newValue);
				console.log("old", oldValue);

				if (oldValue === null) {
					this.snackbar = false;
				}
			}
		}
	};
</script>

