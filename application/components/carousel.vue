<template>
	<div>
		<div col-sm-12>
			<v-carousel touch height="600" hide-delimiters class="carousel">
				<v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
					<div class="head">
						<div class="sub_title">{{item.sub_title}}</div>
						<div class="title mt-2">{{item.title}}</div>
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
	export default {
		props: ["items"]
	};
</script>

<style scoped>
	.carousel {
		top: 0;
		left: 0;
		margin-top: -13.7vh;
		margin-left: -17vh;
		width: 100vw;
		background-size: cover;
	}
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
