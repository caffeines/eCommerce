<template>
	<div v-if="items">
		<div v-if="loading">
			<appLoading/>
		</div>
		<div v-else col-sm-12>
			<v-carousel flat aspect-ratio="1" hide-delimiters class="carousel">
				<v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
					<div class="head" v-if="item.title && item.button && item.subtitle">
						<div class="sub_title" :style="{color: item.subtitleColor}">{{item.subtitle}}</div>
						<div class="title mt-2" :style="{color: item.titleColor}">{{item.title}}</div>
						<div class="button mt-2">
							<v-btn round flat class="one">Shop now</v-btn>
						</div>
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
	import appLoading from "@/components/layouts/Loading";
	export default {
		props: ["items"],
		components: {
			appLoading
		},
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
		font-size: 50px !important;
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
		top: 45%;
		left: 35%;
		transform: translate(-50%, -50%);
		text-transform: capitalize;
	}
</style>
