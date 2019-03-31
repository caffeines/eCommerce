<template>
	<div>
		<div v-if="loading">
			<appLoading/>
		</div>
		<div v-else col-sm-12>
			<v-carousel aspect-ratio="1" hide-delimiters class="carousel">
				<v-carousel-item v-for="(item,i) in items" :key="i" :src="item.picture[i]">
					<div class="head">
						<div class="sub_title" :style="{color: color}">{{"T-shirt"}}</div>
						<div class="title mt-2" style>&#2547;{{50}}</div>
						<div class="button">
							<button class="cbtn cbtn-secondary mt-5">Shop now</button>
						</div>
					</div>
				</v-carousel-item>
			</v-carousel>
		</div>
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
				color: "red"
			};
		},
		computed: {
			...mapGetters(["loading"])
		}
	};
</script>

<style scoped>
	.sub_title {
		font-family: "Ubuntu Mono", monospace !important;
		font-weight: 400;
		font-size: 3rem;
	}
	.title {
		font-weight: 700;
		font-size: 100px !important;
		font-family: "Berkshire Swash", cursive !important;
	}
	.head {
		color: black;
		position: absolute;
		top: 45%;
		left: 30%;
		transform: translate(-50%, -50%);
		text-transform: capitalize;
	}
</style>
