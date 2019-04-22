<template>
	<div class="mt-5">
		<v-container fluid grid-list-xl>
			<v-layout row>
				<h1 class="heading point mt-3" @click="visitShop">{{shop.shopName}}</h1>
				<v-spacer></v-spacer>
				<!-- Modal starts here -->
				<v-dialog
					v-model="addProductDailog"
					fullscreen
					hide-overlay
					transition="dialog-bottom-transition"
				>
					<template v-slot:activator="{ on }">
						<v-btn fab class="four">
							<v-icon x-large color="#fff" @click="toggleAddProductDailog">add</v-icon>
						</v-btn>
					</template>
					<v-card>
						<v-toolbar flat>
							<v-spacer></v-spacer>
							<v-btn round flat @click="productCard = true , carouselCard = false" class="one">
								<span class="head">Add product</span>
							</v-btn>
							<v-btn round flat @click="carouselCard = true, productCard = false" class="one">
								<span class="head">Add carousel</span>
							</v-btn>

							<v-btn icon @click="toggleAddProductDailog">
								<v-icon large>close</v-icon>
							</v-btn>
						</v-toolbar>
						<v-layout align-start justify-center row fill-height></v-layout>
						<div v-if="productCard">
							<AddProductCard/>
						</div>
						<div v-if="carouselCard">
							<AddCarousel/>
						</div>
					</v-card>
				</v-dialog>
			</v-layout>
			<!-- Modal ends here -->

			<v-layout mt-2 align-center justify-center wrap row fill-height>
				<v-flex xs6 sm3>
					<v-card class="custom_card one" flat>
						<v-card-title primary-title>
							<v-icon x-large color="#fff">money</v-icon>
							<div class="ml-5">
								<div class="headline head">&#2547; 19280</div>
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
								<div class="headline" color="#fff">{{inQueue}}</div>
								<span>Order in queue</span>
							</div>
						</v-card-title>
					</v-card>
				</v-flex>
			</v-layout>

			<!-- Top card ends here -->

			<v-layout row justify-center>
				<v-flex xs-8 sm-8>
					<DataTable :dashboardRouteId="dashboardRouteId"/>
				</v-flex>
				<v-flex xs-4 sm-4>
					<div v-if="getPicture == null">
						<v-img class="picCard" :src="'http://tiny.cc/wqfy4y'" aspect-ratio="1"></v-img>
					</div>
					<div v-else>
						<v-img class="picCard" :src="getPicture.pic" aspect-ratio="1"></v-img>
					</div>
				</v-flex>
			</v-layout>
			<v-layout row justify-center>
				<v-flex xs-8 sm-8>
					<OrderTable :order="order"/>
				</v-flex>
				<v-flex xs-4 sm-4></v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from "vuex";
	import AddProductCard from "@/components/shop/AddProductCard";
	import AddCarousel from "@/components/shop/AddCarousel";
	import DataTable from "@/components/shop/DataTable";
	import OrderTable from "@/components/shop/OrderTable";

	export default {
		name: "dashboard",
		props: ["dashboardRouteId"],
		components: {
			AddProductCard,
			OrderTable,
			DataTable,
			AddCarousel
		},
		data() {
			return {
				order: [],
				shopX: null,
				ID: null,
				notifications: false,
				sound: true,
				widgets: false,
				productCard: true,
				carouselCard: false,
				inQueue: 0
			};
		},
		created() {
			this.getShop();
		},
		mounted() {},
		computed: {
			...mapGetters(["shop", "getPicture", "addProductDailog", "allOrder"])
		},
		watch: {},
		methods: {
			...mapMutations(["toggleAddProductDailog"]),
			getShop() {
				this.$store.dispatch("getShop", { id: this.dashboardRouteId });
				this.$store.dispatch("getOrder");
				this.$store.dispatch("getProductsByShopId", {
					shopId: this.dashboardRouteId
				});
				setTimeout(() => {
					this.orderFilter();
				}, 1000);
			},
			visitShop() {
				this.$router.push("/shop/" + this.dashboardRouteId);
			},
			orderFilter() {
				this.inQueue = 0;
				this.order = [];
				for (let i = 0; i < this.allOrder.length; i++) {
					for (let j = 0; j < this.allOrder[i].purchaseItems.length; j++) {
						if (
							this.dashboardRouteId == this.allOrder[i].purchaseItems[j].shopId
						) {
							//console.log(this.allOrder[i].purchaseItems[j].status);
							if (this.allOrder[i].purchaseItems[j].status == "InQueue") {
								this.inQueue++;
								this.order.push({
									item: this.allOrder[i].purchaseItems[j],
									address: this.allOrder[i].address,
									shipmentType: this.allOrder[i].shippingType,
									consumer: this.allOrder[i].consumer,
									status: this.allOrder[i].purchaseItems[j].status,
									ID: this.allOrder[i]._id
								});
							}
						}
					}
				}
			}
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
	.bg {
		background-color: none;
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
	.point {
		cursor: pointer;
		font-size: 28px !important;
	}
	.picCard {
		width: 305px;
		height: 325px;
	}
</style>