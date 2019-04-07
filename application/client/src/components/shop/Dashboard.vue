<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row>
				<v-flex xs3>
					<div v-if="shopX == null ? shopX=allShopNameByaUser[0]: shopX=shopX"/>
					<v-select
						v-model="shopX"
						:items="allShopNameByaUser"
						color="red"
						menu-props="auto"
						label="Shop"
						hide-details
						prepend-icon="map"
						single-line
					>
						<!-- <h1 class="heading">Sultana's Dream</h1> -->
					</v-select>
				</v-flex>
				<v-btn class="mt-4 two" round flat @click="visitShop">Visit</v-btn>
				<v-spacer></v-spacer>

				<!-- Modal starts here -->
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
							<AddProductCard shopID="shop._id"/>
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
								<div class="headline" color="#fff">120</div>
								<span>Order in queue</span>
							</div>
						</v-card-title>
					</v-card>
				</v-flex>
			</v-layout>

			<!-- Top card ends here -->

			<v-layout row>
				<v-flex xs-8>
					<DataTable/>
				</v-flex>
				<v-flex xs-4>
					<v-card>image will be shown here</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from "vuex";
	import AddProductCard from "@/components/shop/AddProductCard";
	import DataTable from "@/components/shop/DataTable";

	export default {
		components: {
			AddProductCard,
			DataTable
		},
		data() {
			return {
				selectedShopName: "",
				dialog: false,
				shopX: null,
				ID: null,
				notifications: false,
				sound: true,
				widgets: false,
				productCard: true,
				carouselCard: false
			};
		},
		created() {
			this.getShop();
		},
		computed: {
			...mapGetters([
				"shop",
				"getProducts",
				"user",
				"allShopByaUser",
				"allShopNameByaUser",
				"currentShop"
			])
		},
		watch: {
			shopX: function(newValue, oldValue) {
				console.log(newValue, oldValue);
				if (newValue) {
					for (var i = 0; i < this.allShopByaUser.length; i++) {
						if (this.allShopByaUser[i].shopName === newValue) {
							this.ID = this.allShopByaUser[i]._id;
							break;
						}
					}
					this.$store.dispatch("setCurrentShopName", newValue);
				}
			}
		},
		methods: {
			getShop() {
				this.$store.dispatch("getAllShopByaUser", {
					id: this.user.email
				});
			},
			visitShop() {
				this.$router.push("/shop/" + this.ID);
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
