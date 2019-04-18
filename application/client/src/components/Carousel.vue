<template>
	<div v-if="items" class="mt-5">
		<div col-sm-12>
			<v-carousel aspect-ratio="1" hide-delimiters class="carousel _carousel">
				<v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" :lazy-src="item.src">
					<div class="head">
						<div class="title mt-2" :style="{color: item.color}">{{item.title}}</div>
					</div>
				</v-carousel-item>
			</v-carousel>
		</div>

		<!-- snackbar -->
		<v-snackbar
			v-if="!loading && user"
			v-model="snackbar"
			bottom
			left
			color="success"
			:timeout="5000"
		>
			<v-icon class="mr-3">check_circle_outline</v-icon>You are signed in now!
			<v-btn color="fff" dark flat @click="snackbar = false">Close</v-btn>
		</v-snackbar>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		props: ["items"],
		components: {},
		data: () => {
			return {
				color: "red",
				snackbar: false
			};
		},
		computed: {
			...mapGetters(["loading", "user"])
		},
		watch: {
			user: function(newValue, oldValue) {
				// if user value change from null
				if (oldValue === null) {
					this.snackbar = true;
				}
				if (newValue === null) {
					this.snackbar = false;
				}
			}
		}
	};
</script>

<style scoped>
	.sub_title {
		font-family: "Ubuntu Mono", monospace !important;
		font-weight: 400;
		font-size: 2rem;
	}
	.title {
		font-weight: 600;
		font-size: 30px !important;
		font-family: "Berkshire Swash", cursive !important;
	}
	.one {
		background-image: linear-gradient(
			to right,
			rgba(128, 0, 128, 0.76),
			rgba(255, 68, 0, 0.801)
		);
	}
	.head {
		color: black;
		position: absolute;
		top: 35%;
		left: 25%;
		transform: translate(-50%, -50%);
		text-transform: capitalize;
	}
</style>
