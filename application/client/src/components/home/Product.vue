<template>
	<v-container grid-list-xl>
		<v-layout wrap>
			<v-flex
				mt-4
				xs12
				xl2
				lg3
				md4
				sm6
				v-for="product in products"
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
						<v-img :src="product.picture[0]" aspect-ratio="1">
							<v-expand-transition>
								<div
									v-if="hover"
									class="d-flex transition-fast-in-fast-out black darken-3 v-card--reveal display-3 white--text"
									style="height: 100%;"
								>view</div>
							</v-expand-transition>
						</v-img>

						<v-card-title>
							<div v-if="product.rating.rate > 0? rating = product.rating.rate : rating = 0"/>
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
									v-model="rating"
									color="yellow darken-3"
									background-color="grey darken-1"
									empty-icon="$vuetify.icons.ratingFull"
									half-increments
									dense
									readonly
								></v-rating>
								<span class="rating">{{rating}} ({{product.rating.totalNumberOfRating}})</span>
							</v-layout>
						</div>
					</v-card>
				</v-hover>
			</v-flex>
		</v-layout>
	</v-container>
</template><script>
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {
				rating: 0,
				card_text: "Vue t-Shirt"
			};
		},
		created() {
			this.getProducts();
		},
		computed: {
			...mapGetters(["products", "shop"])
		},
		methods: {
			async getProducts() {
				await this.$store.dispatch("getAllProducts");
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
		font-size: 13px;
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
