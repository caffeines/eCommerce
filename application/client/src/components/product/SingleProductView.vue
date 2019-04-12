<template>
	<div class="mt-4">
		<v-layout row align-start justify-center wrap>
			<v-flex xs4 sm1>
				<div v-if="!flag ? image = productByProductId.picture[0] : image"></div>
				<div v-if="counter == 4 ? counter = 0 : counter"></div>
				<v-layout row v-for="img in productByProductId.picture" :key="'img'">
					<v-flex xs12 sm10 lg8 xl6>
						<v-card class="mt-2" height="10vh" flat>
							<v-layout align-center justify-center row fill-height>
								<v-img
									:src="img"
									:lazy-src="img"
									aspect-ratio="1"
									class="grey lighten-2"
									@click="setPic(img)"
									@mouseover="setPic(img)"
								>
									<div class="fill-height bottom-gradient"></div>
								</v-img>
							</v-layout>
						</v-card>
					</v-flex>
				</v-layout>
			</v-flex>
			<v-flex xs8 sm9 md9 lg7 xl7>
				<v-tooltip right>
					<span>Click to enlarge image</span>
					<v-img slot="activator" :src="image" class="__image" @click="dialog = !dialog"></v-img>
				</v-tooltip>
				<v-dialog v-model="dialog">
					<v-card>
						<v-img :src="image"></v-img>
					</v-card>
				</v-dialog>
				<!-- <v-img :src="image" height="80vh"></v-img> -->
			</v-flex>
			<v-flex xs8 sm8 md2 lg4 xl4>
				<div class="ml-4">
					<div class="__price mt-3">&#2547;&nbsp;{{productByProductId.price}}</div>
					<div class="prodText">{{productByProductId.productName}}</div>
					<div class="ml-0 mt-1">
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
							<span class="rating">&nbsp;{{rating}}</span>
						</v-layout>
					</div>
					<div class="by mt-1">
						by
						<span
							class="visit"
							@click="visitShop(productByProductId.createdBy._id)"
						>{{productByProductId.createdBy.shopName}}</span>
					</div>
					<v-divider></v-divider>
					<div class="description mt-1">{{productByProductId.description}}</div>
					<v-layout justify-space-around>
						<v-flex xs4 mt-4>
							<v-combobox v-model="size" :items="productByProductId.size" outline label="Size"></v-combobox>
						</v-flex>
						<v-flex xs4 mt-4>
							<v-combobox v-model="color" :items="productByProductId.color" label="Color" outline></v-combobox>
						</v-flex>

						<v-flex xs3 md3 sm3 mt-4 class="num">
							<v-layout>
								<v-icon medium class="plus" @click="decrement">remove</v-icon>
								<span class="number">{{num}}</span>
								<v-icon medium class="plus" @click="increment">add</v-icon>
							</v-layout>
						</v-flex>
					</v-layout>
					<v-layout row justify-center>
						<v-btn color="error" round>Add to Cart</v-btn>
						<div v-if="user">
							<v-btn @click="toggleLoved" flat large icon v-if="user">
								<v-icon large :color="checkIfProductLoved(productByProductId._id) ? 'red' : 'grey'">favorite</v-icon>
							</v-btn>
							<!-- <v-icon large class="fav mt-1" v-if="!loved" @click="toggleLoved">favorite_border</v-icon>
							<v-icon large class="fav mt-1" v-else @click="toggleLoved">favorite</v-icon>-->
						</div>
						<span class="love_text" v-if="user">{{productByProductId.love}}</span>
					</v-layout>
				</div>
			</v-flex>
		</v-layout>
		<!-- product view ends here -->
		<!-- description, rating, comment  -->

		<v-layout row justify-center>
			<v-flex x12 sm10 md10 lg10 xl10 mt-4>
				<div class="_info">
					<v-layout row justify-center>
						<div v-if="descFlag" style="border-bottom: 2px solid #999">
							<div class="_info__header" @click="description">Descriptiion</div>
						</div>
						<div class="_info__header" v-else @click="description">Descriptiion</div>

						<div v-if="aditionalInfoFlag">
							<div
								class="_info__header ml-2"
								style="border-bottom: 2px solid #999"
								@click="information"
							>Additional information</div>
						</div>
						<div v-else class="_info__header ml-2" @click="information">Additional information</div>

						<div v-if="commentFlag">
							<div
								class="_info__header ml-2"
								style="border-bottom: 2px solid #999"
								@click="comment"
							>Comment</div>
						</div>
						<div v-else class="_info__header ml-2" @click="comment">Comment</div>
					</v-layout>
					<v-layout row justify-center>
						<v-flex
							xs9
							v-if="descFlag"
							id="desc"
							class=".description mt-4"
						>{{productByProductId.description}}</v-flex>
					</v-layout>

					<!-- aditional Info section start here -->
					<v-layout row justify-center>
						<v-flex xs8 v-if="aditionalInfoFlag" class=".description mt-4">
							<v-layout align-center justify-center row>
								<v-flex xs4></v-flex>
								<v-flex xs4>Weight</v-flex>
								<v-flex xs6>2.39 kg</v-flex>
							</v-layout>
							<v-layout align-center justify-center row>
								<v-flex xs4></v-flex>
								<v-flex xs4>Dimensions</v-flex>
								<v-flex xs6>110 x 33 x 100 cm</v-flex>
							</v-layout>
							<v-layout align-center justify-center row>
								<v-flex xs4></v-flex>
								<v-flex xs4>Materials</v-flex>
								<v-flex xs6>Plastic body</v-flex>
							</v-layout>
							<v-layout align-center justify-center row>
								<v-flex xs4></v-flex>
								<v-flex xs4>Color</v-flex>
								<v-flex xs6>Black, Blue, Grey, Green, Red, White</v-flex>
							</v-layout>
							<v-layout align-center justify-center row>
								<v-flex xs4></v-flex>
								<v-flex xs4>Size</v-flex>
								<v-flex xs6>XS, S, M, L, XL, XXL, XXL</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>

					<!-- commment section start here -->
					<v-layout row justify-center v-if="commentFlag">
						<v-flex xs8>
							<div v-if="user">
								<div class="mt-4 _comment__head">Add comment or rate now</div>
								<v-divider></v-divider>
								<v-layout row class="mt-1">
									<span class="rating__text mt-2 mr-2">Rating</span>
									<v-rating
										class="mt-2"
										v-model="rating2"
										color="yellow darken-3"
										background-color="grey darken-1"
										empty-icon="$vuetify.icons.ratingFull"
										half-increments
										hover
										dense
									></v-rating>
									<v-btn color="primary" round flat>Rate Now</v-btn>
								</v-layout>
								<v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleAddComment">
									<v-layout>
										<v-flex xs12>
											<v-textarea
												outline
												v-model="commentBody"
												:rules="commentRules"
												auto-grow
												label="Comment"
											></v-textarea>
										</v-flex>
									</v-layout>
									<v-btn round flat color="primary" class="mb-2" type="submit">Comment now</v-btn>
								</v-form>
							</div>
							<div class="mt-5">
								<v-layout class="mt-1" v-for="cmnt in productByProductId.comments" :key="cmnt">
									<v-layout align-center row mb-1>
										<v-flex xs4 sm2 md1>
											<v-avatar size="42px">
												<img :src="imgSource(cmnt)" alt="Avatar">
											</v-avatar>
										</v-flex>
										<v-layout>
											<v-flex xs12 class="ml-3">
												<v-layout row align-start>
													<v-flex xs11>
														<h3
															class="_comment__text__name"
														>{{cmnt.commentUser.firstName }} {{cmnt.commentUser.lastName }}</h3>
													</v-flex>
													<v-flex v-if="checkIfOwnCommment(cmnt)">
														<v-icon small style="cursor: pointer">edit</v-icon>
														<v-icon class="ml-1" small style="cursor: pointer">delete</v-icon>
													</v-flex>
												</v-layout>
												<v-flex xs12 class="_comment__text mt-1">{{ cmnt.body }}</v-flex>
											</v-flex>
										</v-layout>
									</v-layout>
								</v-layout>
							</div>
						</v-flex>
					</v-layout>
					<div class="mt-5"></div>
				</div>
			</v-flex>
		</v-layout>
		<div class="false"></div>
	</div>
</template>
		
<script>
	import { mapGetters } from "vuex";
	import { defaultClient as apolloClient } from "../../main";
	import {
		LOVE_PRODUCT,
		UNLOVE_PRODUCT,
		ADD_PRODUCT_COMMENT,
		GET_PRODUCT_BY_PRODUCT_ID
	} from "@/queries/product";
	export default {
		data() {
			return {
				rating: 4.9,
				rating2: 0,
				size: "",
				color: "",
				num: 0,
				loved: false,
				image: "",
				isFormValid: true,
				flag: false,
				dialog: false,
				commentBody: "",
				counter: 0,
				descFlag: true,
				commentFlag: false,
				aditionalInfoFlag: false,
				commentRules: [commentBody => !!commentBody || ""]
			};
		},
		computed: {
			...mapGetters(["userLoved", "productByProductId", "products", "user"])
		},
		watch: {},
		created() {
			this.counter = 0;
			this.getProduct();
		},
		methods: {
			async getProduct() {
				await this.$store.dispatch("getProductByProductId", {
					id: this.$route.params.id.toString()
				});
			},
			checkIfProductLoved(id) {
				if (this.userLoved && this.userLoved.some(lv => lv._id === id)) {
					this.loved = true;
					return true;
				} else {
					this.loved = false;
					return false;
				}
			},
			toggleLoved() {
				if (this.loved) {
					this.handleunLove();
				} else {
					this.handleLove();
				}
			},
			handleAddComment() {
				if (this.$refs.form.validate()) {
					const variables = {
						body: this.commentBody,
						userId: this.user._id,
						productId: this.productByProductId._id
					};

					apolloClient
						.mutate({
							mutation: ADD_PRODUCT_COMMENT,
							variables,
							update: (cache, { data: { addComment } }) => {
								const data = cache.readQuery({
									query: GET_PRODUCT_BY_PRODUCT_ID,
									variables: { id: this.$route.params.id }
								});
								data.getProductByProductId.comments.unshift(addComment);
								cache.writeQuery({
									query: GET_PRODUCT_BY_PRODUCT_ID,
									variables: { id: this.$route.params.id },
									data
								});
							}
						})
						.then(({ data }) => {
							this.$refs.form.reset();
							this.getProduct();
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			viewProduct(id) {
				this.$router.push("/product/" + id);
				setTimeout(() => {
					this.getProduct();
				}, 500);
			},
			visitShop(id) {
				this.$router.push("/shop/" + id);
			},
			increment() {
				if (this.num < 100) {
					this.num += 1;
				}
			},
			imgSource(cmnt) {
				let src =
					"https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" +
					cmnt.commentUser.firstName +
					"+" +
					cmnt.commentUser.lastName;
				return src;
			},

			decrement() {
				if (this.num > 0) {
					this.num--;
				}
			},
			handleLove() {
				const variables = {
					productId: this.productByProductId._id,
					userName: this.user.userName
				};

				apolloClient
					.mutate({
						mutation: LOVE_PRODUCT,
						variables,
						update: (cache, { data: { loveProduct } }) => {
							const data = cache.readQuery({
								query: GET_PRODUCT_BY_PRODUCT_ID,
								variables: { id: this.$route.params.id }
							});
							data.getProductByProductId.love += 1;
							cache.writeQuery({
								query: GET_PRODUCT_BY_PRODUCT_ID,
								variables: { id: this.$route.params.id },
								data
							});
						}
					})
					.then(({ data }) => {
						const updateUser = {
							...this.user,
							love: data.loveProduct.wishList
						};
						this.$store.commit("setUser", updateUser);
					})
					.catch(err => {
						console.log(err);
					});
			},

			handleunLove() {
				const variables = {
					productId: this.productByProductId._id,
					userName: this.user.userName
				};

				apolloClient
					.mutate({
						mutation: UNLOVE_PRODUCT,
						variables,
						update: (cache, { data: { unLoveProduct } }) => {
							const data = cache.readQuery({
								query: GET_PRODUCT_BY_PRODUCT_ID,
								variables: { id: this.$route.params.id }
							});
							data.getProductByProductId.love -= 1;
							cache.writeQuery({
								query: GET_PRODUCT_BY_PRODUCT_ID,
								variables: { id: this.$route.params.id },
								data
							});
						}
					})
					.then(({ data }) => {
						const updateUser = {
							...this.user,
							love: data.unLoveProduct.wishList
						};
						this.getProduct();
						this.$store.commit("setUser", updateUser);
					})
					.catch(err => {
						console.log(err);
					});
			},

			setPic(IMG) {
				this.image = IMG;
				this.flag = true;
			},
			description() {
				this.descFlag = true;
				this.commentFlag = false;
				this.aditionalInfoFlag = false;
			},
			information() {
				this.descFlag = false;
				this.commentFlag = false;
				this.aditionalInfoFlag = true;
			},
			comment() {
				this.descFlag = false;
				this.commentFlag = true;
				this.aditionalInfoFlag = false;
			},
			checkIfOwnCommment(cmnt) {
				return this.user && this.user._id === cmnt.commentUser._id;
			}
		}
	};
</script>

<style lang="scss">
	.love_text {
		font-size: 20px;
		margin-top: 13px;
		margin-left: 3px;
		font-weight: 400;
		color: rgb(102, 102, 102);
	}
	._comment {
		&__head {
			font-size: 20px;
			font-weight: 400;
			color: rgb(99, 98, 98);
		}
		&__text {
			color: rgb(99, 98, 98);
			&__name {
				font-weight: 400;
				color: rgb(51, 51, 51);
			}
		}
	}
	._info {
		border: 1px solid #999;
		border-radius: 5px;
		min-height: 200px;

		&__header {
			font-size: 15px;
			margin-top: 8px;
			font-weight: 500;
			cursor: pointer;
		}
	}
	.text__more {
		margin: 3rem auto;
		text-align: center;
		font-size: 32px;
		font-weight: 700;
	}
	.__image {
		height: 80vh;
	}
	.false {
		height: 300px;
	}
	.fav {
		cursor: pointer;
		color: rgba(241, 19, 19, 0.685) !important;
	}
	.number {
		margin: 16px auto;
		font-size: 20px;
		font-weight: 600;
	}
	.plus {
		margin: 0 auto;
		cursor: pointer;
	}

	.num {
		border-radius: 5%;
		border: 2px solid rgb(99, 99, 99);
		height: 60px;
	}
	.prodText {
		font-size: 23px;
		font-weight: 500;
		margin-top: 10px;
	}
	.by {
		font-weight: 400;
		font-size: 17px;
	}
	.rating {
		color: #f9a825;
		font-size: 17px;
		margin-left: 5px;
		margin-top: 2px;
	}
	.rating__text {
		color: rgba(51, 51, 51, 0.719);
		font-size: 17px;
		margin-left: 5px;
		margin-top: 2px;
	}
	.visit {
		font-weight: 500;
		&:hover {
			background-image: linear-gradient(
				to right,
				black,
				rgba(128, 0, 128, 0.781),
				rgba(255, 68, 0, 0.658),
				rgb(255, 0, 0)
			);
			-webkit-background-clip: text;
			color: transparent;
			cursor: pointer;
			border-bottom: 1px solid black;
		}
	}
	.description {
		font-weight: 400;
	}
	.__price {
		color: rgba(241, 19, 19, 0.685) !important;

		font-weight: 400;
		font-size: 37px;
	}
	.card {
		border-radius: 3%;
		box-shadow: 0 1rem 2rem rgba(#ef5350, 0.4);
		letter-spacing: 0.05rem !important;
		word-spacing: 0.1rem;
		&:hover {
			cursor: pointer;
		}
	}
	.text {
		color: rgb(114, 113, 113);
		font-size: 13px;
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
