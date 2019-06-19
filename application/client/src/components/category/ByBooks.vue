<template>
	<div>
		<div v-if="!fflag && productsByCategory <= 0" class="_icon">
			<span class="same">4</span>
			<v-icon x-large color="red">sentiment_dissatisfied</v-icon>
			<span class="same">4</span>
			<div class="found">Nothing found</div>
		</div>
		<div v-else>
			<v-container grid-list-xl>
				<v-layout wrap>
					<v-flex
						mt-4
						xs12
						xl2
						lg3
						md4
						sm6
						v-for="product in productsByCategory"
						:key="'product'"
						@click="viewProduct(product._id)"
					>
						<v-hover>
							<v-card
								height="400"
								width="260"
								class="card mx-auto"
								slot-scope="{ hover }"
								color="grey lighten-4"
							>
								<v-img :src="product.picture[0]" :lazy-src="product.picture[0]" aspect-ratio="1">
									<v-expand-transition>
										<div
											v-if="hover"
											class="d-flex transition-fast-in-fast-out black darken-3 v-card--reveal display-3 white--text"
											style="height: 100%;"
										>view</div>
									</v-expand-transition>
								</v-img>

								<v-card-title>
									<div>
										<h3 class="headline price">&#2547;&nbsp;{{product.price}}</h3>
										<div class="text">
											<strong>{{ product.productName }}</strong>
										</div>
										<h4>
											<strong>{{product.createdBy.shopName}}</strong>
										</h4>
									</div>
								</v-card-title>
								<div class="ml-3">
									<v-layout row>
										<v-rating
											v-model="product.rating.rate"
											color="yellow darken-3"
											background-color="grey darken-1"
											empty-icon="$vuetify.icons.ratingFull"
											half-increments
											dense
											readonly
										></v-rating>
										<span class="rating">{{parseFloat( product.rating.rate.toFixed(2) )}} ({{product.rating.totalNumberOfRating}})</span>
									</v-layout>
								</div>
							</v-card>
						</v-hover>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
	</div>
</template><script>
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {
				fflag: true,
				rating: 0,
				card_text: "Vue t-Shirt",
				flag: false,
				productsByCategory: []
			};
		},
		mounted() {
			this.getProducts();
		},
		computed: {
			...mapGetters(["products", "shop"])
		},
		methods: {
			async getProducts() {
				await this.$store.dispatch("getAllProducts");
				await setTimeout(() => {
					this.filterCategory();
				}, 1000);
			},
			viewProduct(id) {
				this.$router.push("/product/" + id);
			},
			filterCategory() {
				for (let i = 0; i < this.products.length; i++) {
					if (
						this.products[i].category[0].toUpperCase() ==
						this.$route.params.categoryId.toUpperCase()
					) {
						this.productsByCategory.push(this.products[i]);
					}
				}
				this.fflag = false;
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
		font-size: 13px;
	}
	.same {
		font-size: 40px;
		margin: 0 2px 0 2px;
		font-weight: 400;
	}
	.found {
		display: block;
		color: #f34643bd;
		font-size: 3rem;
		font-weight: 700;
		text-align: center;
	}
	._icon {
		display: block;
		color: #f34643 !important;
		text-align: center;
		margin: 200px auto;
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
