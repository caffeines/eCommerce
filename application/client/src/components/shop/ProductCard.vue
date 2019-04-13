<template>
	<v-container grid-list-xl>
		<v-layout wrap>
			<v-flex mt-4 xs12 xl2 lg3 md4 sm6 v-for="prod in productsByShopId" :key="'prod'">
				<v-hover>
					<v-card
						height="400"
						width="260"
						class="card mx-auto"
						slot-scope="{ hover }"
						color="grey lighten-4"
						@click="viewProduct(prod._id)"
					>
						<v-img :src="prod.picture[0]" aspect-ratio="1">
							<v-expand-transition>
								<div
									v-if="hover"
									class="d-flex transition-fast-in-fast-out black darken-3 v-card--reveal display-3 white--text"
									style="height: 100%;"
								>view</div>
							</v-expand-transition>
						</v-img>

						<v-card-title>
							<div v-if="prod.rating.rate > 0? rating = prod.rating.rate : rating = 0"/>
							<div>
								<h3 class="headline price">&#2547;&nbsp;{{prod.price}}</h3>
								<div class="text">
									<strong>{{ prod.productName }}</strong>
								</div>
							</div>
						</v-card-title>
						<div class="ml-4">
							<v-layout align-end fill-height row>
								<v-rating
									v-model="rating"
									color="yellow darken-3"
									background-color="grey darken-1"
									empty-icon="$vuetify.icons.ratingFull"
									half-increments
									dense
									readonly
								></v-rating>
								<span class="rating">{{prod.rating.rate}} ({{prod.rating.totalNumberOfRating}})</span>
							</v-layout>
						</div>
					</v-card>
				</v-hover>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
	import { mapGetters } from "vuex";
	export default {
		props: ["shopRouteId"],
		data() {
			return {
				rating: 4.6,
				card_text: "Vue t-Shirt"
			};
		},
		watch: {
			shopRouteId: function(newValue, oldValue) {
				console.log(newValue, oldValue);
				if (newValue) {
					this.getProducts();
				}
			}
		},
		created() {
			this.getProducts();
		},
		computed: {
			...mapGetters(["productsByShopId", "shop"])
		},
		methods: {
			getProducts() {
				this.$store.dispatch("getProductsByShopId", {
					shopId: this.shopRouteId
				});
			},
			viewProduct(id) {
				this.$router.push("/product/" + id);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.card {
		border-radius: 3%;
		box-shadow: 0 1rem 2rem rgba(#ef5350, 0.4);
		letter-spacing: 0.05rem !important;
		word-spacing: 0.1rem;
		&:hover {
			cursor: pointer;
		}
	}
	.price {
		color: #f34643;
	}
	.text {
		color: rgb(114, 113, 113);
		font-size: 14px;
	}
	.rating {
		color: #f9a825;
		font-size: 17px;
		margin-left: 5px;
		margin-top: 2px;
	}
	.v-card--reveal {
		align-items: center;
		bottom: 0;
		justify-content: center;
		opacity: 0.5;
		position: absolute;
		width: 100%;
	}
</style>
