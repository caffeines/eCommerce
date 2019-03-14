<template>
	<div class="flex-con">
		<v-hover class="product-card" v-for="i in 15">
			<v-card class="mx-auto" width="210" height="300">
				<v-img :aspect-ratio="16/12" v-bind:src="description.imageSrc" class="card-img" @click="fun">
					<v-img src="./new.ico" class="new"></v-img>
				</v-img>
				<v-card-title>
					<div class="product">
						<div>
							<span class="__title">{{description.title}}</span>
						</div>
						<div>
							<span class="price">${{description.price}}</span>
						</div>
						<div class="div">
							<div class="d-flex">
								<v-rating
									v-model="description.rating"
									color="yellow darken-3"
									background-color="grey darken-1"
									empty-icon="$vuetify.icons.ratingFull"
									half-increments
									hover
									size="18"
									dense
									readonly
								></v-rating>
								<div class="ml-2 grey--text text--darken-2">
									<span>{{ description.rating }}</span>
									<span>({{ description.reviews }})</span>
								</div>
							</div>
						</div>
					</div>
					<v-spacer></v-spacer>
					<v-btn icon>
						<i class="ion-md-heart ion-logo"></i>
					</v-btn>
					<v-btn icon>
						<i class="ion-md-cart ion-logo"></i>
					</v-btn>
				</v-card-title>
			</v-card>
		</v-hover>
	</div>
</template>

<script>
	export default {
		props: ["description"],

		methods: {
			fun: event => {
				alert("Hello ");
			}
		}
	};
</script>

<style scoped>
	.flex-con {
		display: flex;
		flex-wrap: wrap;
	}

	.product-card {
		margin: 10px;
		border-radius: 1rem;
		box-shadow: 0.5rem 1rem 2rem rgba(83, 82, 237, 0.2);
	}
	.new {
		height: 2rem;
		width: 2rem;
		border-radius: 50%;
		margin-left: 0.3rem;
		margin-top: 0.2rem;
	}
	.product-card:hover {
		transform: scale(1.3, 1.2);
		transition: 0.5s ease-in;
		z-index: 1;
	}

	.card-img {
		background-size: cover;
		transform: scale(0.9, 0.9);
	}
	.card-img:hover {
		margin-top: 1rem;
		transition: 0.5s ease-in;
		transform: scale(1.3, 1.2);
		border-radius: 1rem;
		overflow: hidden;
	}

	.header-3 {
		font-size: 400;
		font-weight: 400;
	}

	.__title {
		font-size: 400;
		font-family: "Lato" sans-serif;
		font-weight: 700;
		color: gray;
	}
	.price {
		font-size: 700;
		font-weight: 700;
		color: rgba(36, 7, 59, 0.555);
	}
</style>
