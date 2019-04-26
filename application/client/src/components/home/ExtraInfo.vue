<template>
	<div>
		<!-- <v-container class="mt-5">
			<v-layout row justify-center justify-space-around fill-height>
				<v-flex xs4>
					<v-card class="_card" flat>
						<v-layout row>
							<v-avatar size="70">
								<img
									class="image"
									src="https://cdn1.iconfinder.com/data/icons/logistic-delivery-13/64/fast_shipping_logistic_delivery_truck_transport_service-512.png"
								>
							</v-avatar>
							<div>
								<span class="head">fastest delivery</span>
								<p
									class="text"
								>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
							</div>
						</v-layout>
					</v-card>
				</v-flex>
				<v-flex xs4 class="ml-3">
					<v-card class="_card" flat>
						<v-layout row>
							<v-avatar size="70">
								<img
									class="image"
									src="https://cdn1.iconfinder.com/data/icons/logistic-delivery-13/64/fast_shipping_logistic_delivery_truck_transport_service-512.png"
								>
							</v-avatar>
							<div>
								<span class="head">fastest delivery</span>
								<p
									class="text"
								>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
							</div>
						</v-layout>
					</v-card>
				</v-flex>
				<v-flex xs4 class="ml-3">
					<v-card class="_card" flat>
						<v-layout row>
							<v-avatar size="70">
								<v-icon class="image" large>phone_in_talk</v-icon>
							</v-avatar>
							<div>
								<span class="head">CUSTOMER SUPPORT</span>
								<p
									class="text"
								>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
							</div>
						</v-layout>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>-->
		<v-divider class="hidden-xs-only"></v-divider>
		<v-container class="hidden-xs-only">
			<v-layout row justify-space-between>
				<v-flex xs4>
					<v-img
						@click="gotoClothes"
						class="img1"
						:aspect-ratio="0.8"
						height="350"
						src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-1.2.1&auto=format&fit=crop&w=354&q=80"
						gradient="to top right, rgba(0, 0, 0, 0.692), rgba(25,32,72,.7)"
					>
						<v-layout pa-2 column fill-height class="lightbox white--text">
							<v-spacer></v-spacer>
							<v-flex shrink>
								<div class="body-1">Collections</div>
								<div class="subheading">clothes</div>
							</v-flex>
						</v-layout>
					</v-img>
				</v-flex>
				<v-flex xs4 class="ml-5">
					<v-img
						@click="gotoFoods"
						class="img1"
						:aspect-ratio="0.8"
						height="350"
						src="https://images.unsplash.com/photo-1504185945330-7a3ca1380535?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=321&q=80"
						gradient="to top right, rgba(0, 0, 0, 0.692), rgba(25,32,72,.7)"
					>
						<v-layout pa-2 column fill-height class="lightbox white--text">
							<v-spacer></v-spacer>
							<v-flex shrink>
								<div class="body-1">Collections</div>

								<div class="subheading">foods</div>
							</v-flex>
						</v-layout>
					</v-img>
				</v-flex>
				<v-flex xs4 class="ml-5">
					<v-img
						@click="gotoBooks"
						class="img3"
						:aspect-ratio="0.8"
						height="350"
						src="https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
						gradient="to top right, rgba(255, 255, 255, 0.204), rgba(25,32,72,.7)"
					>
						<v-layout pa-2 column fill-height class="lightbox white--text">
							<v-spacer></v-spacer>
							<v-flex shrink>
								<div class="body-1">Collections</div>
								<div class="subheading">books</div>
							</v-flex>
						</v-layout>
					</v-img>
				</v-flex>
			</v-layout>
		</v-container>
		<v-divider></v-divider>
	</div>
</template>
<script>
	export default {
		methods: {
			gotoBooks() {
				this.$router.push("/category/book");
			},
			gotoClothes() {
				this.$router.push("/category/dress");
			},
			gotoFoods() {
				this.$router.push("/category/food");
			}
		}
	};
</script>

<style lang="scss" scoped>
	._card {
		height: 120px;
		background-color: rgba(255, 255, 255, 0);
	}
	.image {
		//box-shadow: 0 1rem 2rem rgba(#ef5350, 0.3);
	}
	.head {
		text-transform: uppercase;
		font-size: 1.5rem;
		margin-top: 1rem;
		margin-left: 1.5rem;
		color: #ef5350c7;
	}
	.text {
		font-size: 1rem;
		margin-top: 1rem;
		margin-left: 1.5rem;
	}
	.subheading {
		margin-left: 0.5rem;
		text-transform: uppercase;
		font-size: 4rem !important;
	}
	.body-1 {
		margin-left: 1rem;
		text-transform: capitalize;
		font-size: 1.3rem !important;
	}
	.img1 {
		cursor: pointer;
		border-radius: 2%;
		transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
		box-shadow: 0 1rem 2rem rgba(#ef5350, 0.4);

		&:hover {
			transform: scale(1.1, 1.1);
		}
	}
	.img2 {
		cursor: pointer;
		border-radius: 2%;
		transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
		box-shadow: 0 1rem 2rem rgba(#ef5350, 0.4);

		&:hover {
			transform: scale(1.1, 1.1);
		}
	}
	.img3 {
		cursor: pointer;
		border-radius: 2%;
		transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
		box-shadow: 0 1rem 2rem rgba(#ef5350, 0.4);

		&:hover {
			transform: scale(1.1, 1.1);
		}
	}
</style>
