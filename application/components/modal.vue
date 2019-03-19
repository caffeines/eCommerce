<template>
	<div>
		<template>
			<v-layout row justify-center>
				<v-dialog v-model="dialog" persistent max-width="90%">
					<v-card>
						<v-card-actions>
							<v-spacer></v-spacer>
							<button color="blue" class="cross" @click="dialog = false">X</button>
						</v-card-actions>
						<div class="row">
							<v-flex xs6 d-flex>
								<v-img
									:aspect-ratio="16/16"
									class="img"
									:src="description.imageSrc"
									:lazy-src="description.imageSrc"
								></v-img>
								<template v-slot:placeholder>
									<v-layout fill-height align-center justify-center ma-0>
										<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
									</v-layout>
								</template>
							</v-flex>
							<div class="col-sm-5 text">
								<div class="_title">
									<h3>{{description.title}}</h3>
								</div>
								<div class="price">
									<span>${{description.price}}</span>
								</div>
								<div class="description">
									<p>{{description.details}}</p>
								</div>
								<div class="size">
									<v-flex xs12 sm12 d-flex small-chips>
										<v-select :items="items" label="Size" outline></v-select>
										<v-select :items="colors" class="flex_items" label="Color" outline></v-select>
										<div class="box flex_items">
											<div>
												<button class="plus" @click="decrement">-</button>
											</div>
											<div>
												<span class="numb">{{number_of_product}}</span>
											</div>
											<div>
												<button class="plus" @click="increment">+</button>
											</div>
										</div>
									</v-flex>
								</div>
								<pic_grid/>
								<button class="cbtn cbtn-secondary mt-5" @click="dialog = false">Add to cart</button>
							</div>
						</div>
					</v-card>
				</v-dialog>
			</v-layout>
		</template>
	</div>
</template>
<script>
	import pic_grid from "~/components/pic_grid";
	export default {
		components: {
			pic_grid
		},
		props: ["description"],
		data: () => ({
			dialog: true,
			items: ["S", "M", "L", "XL", "XXL"],
			colors: ["Red", "Blue", "Ash"],
			number_of_product: 0
		}),
		methods: {
			increment: function() {
				return (this.number_of_product += 1);
			},
			decrement: function() {
				if (this.number_of_product > 0) {
					return (this.number_of_product -= 1);
				}
			}
		}
	};
</script>
<style scoped>
</style>
