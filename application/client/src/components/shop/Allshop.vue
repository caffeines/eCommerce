<template>
	<div>
		{{user.email}}
		<div v-if="allShopByaUser">
			<v-container fluid grid-list-xl>
				<v-layout mt-2 align-center justify-center wrap row fill-height>
					<v-flex xs6 sm6 v-for="shop in allShopByaUser" :key="shop">
						<v-card class="custom_card one">
							<v-card-title primary-title>
								<v-flex xs-4 sm-4>
									<!-- <v-icon x-large color="#fff">store</v-icon> -->
									<v-img class="pic" src="https://picsum.photos/510/300?random" aspect-ratio="1"></v-img>
								</v-flex>
								<v-flex xs-8 sm-8>
									<div class="headline head">{{shop.shopName}}</div>
									<div class="mt-1 size">
										<v-rating
											v-model="rating"
											color="white darken-4"
											background-color="grey darken-1"
											empty-icon="$vuetify.icons.ratingFull"
											half-increments
											readonly
										></v-rating>
									</div>
									<div class="head ml-1 sizeH">
										New order
										<span class="order">&nbsp;1&nbsp;</span>
									</div>
									<v-layout mt-2 wrap row fill-height>
										<v-btn round class="oneH" flat @click="visitDashboard(shop._id)">
											<span class="headB">Dashboard</span>
										</v-btn>
										<v-btn round class="oneH" flat @click="visitShop(shop._id)">
											<span class="headB">Visit</span>
										</v-btn>
									</v-layout>
								</v-flex>
							</v-card-title>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
		<div></div>
	</div>
</template>
<script>
	import { mapGetters } from "vuex";
	export default {
		props: ["user"],
		data() {
			return {
				rating: 3.5
			};
		},
		created() {
			this.getShop();
		},
		computed: {
			...mapGetters(["allShopByaUser"])
		},
		methods: {
			getShop() {
				this.$store.dispatch("getAllShopByaUser", {
					id: this.user.email
				});
			},
			visitShop(ID) {
				this.$router.push("/shop/" + ID);
			},
			visitDashboard(ID) {
				this.$router.push("/dashboard/" + ID);
			}
		}
	};
</script>
<style lang="scss">
	.oneH {
		background-image: linear-gradient(
			to right,
			rgba(128, 0, 128, 0.76),
			rgba(255, 68, 0, 0.801)
		);

		&:hover {
			background-image: linear-gradient(to right, #fff, #fff);
		}
	}
	.twoH {
		background-image: linear-gradient(to right, #0de446ad, #48d3a6, #29af85);
		&:hover {
			background-image: linear-gradient(to right, #fff, #fff);
		}
	}
	.threeH {
		background-image: linear-gradient(
			to right,
			rgba(255, 68, 0, 0.699),
			rgba(255, 0, 0, 0.767)
		);
		&:hover {
			background-image: linear-gradient(to right, #fff, #fff);
		}
	}
	.fourH {
		background-image: linear-gradient(to right, #706fd3, #1b9cfc);
		&:hover {
			background-image: linear-gradient(to right, #fff, #fff);
		}
	}
	.custom_card {
		border-radius: 10px;
		box-shadow: 0 1rem 2rem rgba(#ef5350, 0.6);
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
	.headB {
		color: #fff;
		font-size: 16px;
		&:hover {
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
	.size {
		font-size: 0.5px;
	}
	.sizeH {
		font-size: 16px;
	}
	.order {
		background-color: rgba(255, 255, 255, 0.863);
		width: 10px;
		height: 10px;
		border: 1px solid #fff;
		border-radius: 15%;
		color: #000;
	}
	.pic {
		border-radius: 50%;
		height: 100px;
		width: 100px;
	}
</style>
