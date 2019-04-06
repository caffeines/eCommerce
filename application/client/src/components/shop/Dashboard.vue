<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row>
				<h1 class="heading">Sultana's Dream</h1>
				<v-spacer></v-spacer>

				<!-- modal starts here -->
				<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
					<template v-slot:activator="{ on }">
						<v-btn fab v-on="on" class="four">
							<v-icon x-large color="#fff">add</v-icon>
						</v-btn>
					</template>
					<v-card>
						<v-toolbar flat>
							<v-btn icon @click="dialog = false">
								<v-icon large>close</v-icon>
							</v-btn>
							<v-btn round @click="productCard = true , carouselCard= false" color="one">
								<span class="head">Add product</span>
							</v-btn>
							<v-btn round @click="carouselCard = true, productCard = false" color="three">
								<span class="head">Add carousel</span>
							</v-btn>
							<v-spacer></v-spacer>
						</v-toolbar>
						<v-layout align-start justify-center row fill-height></v-layout>
						<div v-if="productCard">
							<AddProductCard/>
						</div>
					</v-card>
				</v-dialog>

				<!-- Modal ends here -->
			</v-layout>
			<v-layout mt-2 align-center justify-center wrap row fill-height>
				<v-flex xs6 sm3>
					<v-card class="custom_card one" flat>
						<v-card-title primary-title>
							<v-icon x-large color="#fff">money</v-icon>
							<div class="ml-5">
								<div class="headline head">$19280</div>
								<span class="head">Revenue</span>
							</div>
						</v-card-title>
					</v-card>
				</v-flex>
				<v-flex xs6 sm3>
					<v-card class="custom_card two" flat>
						<v-card-title primary-title>
							<v-icon x-large color="#fff">shopping_cart</v-icon>
							<div class="ml-5">
								<div class="headline head">1575</div>
								<span class="head">Item sold</span>
							</div>
						</v-card-title>
					</v-card>
				</v-flex>
				<v-flex xs6 sm3>
					<v-card class="custom_card three" flat>
						<v-card-title primary-title>
							<v-icon x-large color="#fff">group_add</v-icon>
							<div class="ml-5">
								<div class="headline head">3695</div>
								<span class="head">Total followers</span>
							</div>
						</v-card-title>
					</v-card>
				</v-flex>
				<v-flex xs6 sm3>
					<v-card flat class="custom_card four">
						<v-card-title primary-title>
							<v-icon x-large color="#fff">queue</v-icon>
							<div class="ml-5 head">
								<div class="headline" color="#fff">120</div>
								<span>Order in queue</span>
							</div>
						</v-card-title>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import AddProductCard from "@/components/shop/AddProductCard";
	export default {
		components: {
			AddProductCard
		},
		data() {
			return {
				selectedShopName: "",
				dialog: false,
				notifications: false,
				sound: true,
				widgets: false,
				productCard: true,
				carouselCard: false
			};
		},
		computed: {
			...mapGetters(["shop"])
		}
	};
</script>
<style lang="scss">
	.custom_card {
		border-radius: 10px;
	}
	.one {
		background-image: linear-gradient(
			to right,
			rgba(128, 0, 128, 0.76),
			rgba(255, 68, 0, 0.801)
		);
	}
	.two {
		background-image: linear-gradient(to right, #0de446ad, #48d3a6, #29af85);
	}
	.three {
		background-image: linear-gradient(
			to right,
			rgba(255, 68, 0, 0.699),
			rgba(255, 0, 0, 0.767)
		);
	}
	.four {
		background-image: linear-gradient(to right, #706fd3, #1b9cfc);
	}
	.head {
		color: #fff;
	}
	.heading {
		margin-left: 10px;
		background-image: linear-gradient(
			to right,
			#706fd3,
			rgba(128, 0, 128, 0.76),
			rgba(255, 68, 0, 0.541),
			rgb(255, 0, 0)
		);
		-webkit-background-clip: text;
		color: transparent;
	}
</style>
