<template>
	<div>
		<v-container text-xs-center pt-3>
			<v-layout row wrap>
				<div class="mb-5 typeWriter">
					<h2 class="type">
						<TypeWriter :text="text"/>
					</h2>
				</div>
			</v-layout>
			<!-- Add product form -->
			<v-layout row wrap>
				<v-flex xs12 sm4 offset-sm4>
					<v-card color="#fff" class="form_card">
						<v-container>
							<v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleAddProduct">
								<div v-if="step == 1">
									<v-layout row>
										<v-flex xs-12>
											<v-text-field
												:rules="productNameRules"
												v-model="productName"
												prepend-icon="title"
												label="Product name"
												type="text"
												required="true"
											></v-text-field>
										</v-flex>
									</v-layout>

									<v-layout row>
										<v-flex xs-12>
											<v-text-field
												:rules="priceRules"
												v-model="price"
												prepend-icon="money"
												label="Price"
												type="number"
												required
											></v-text-field>
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs-12>
											<v-textarea
												prepend-icon="description"
												:rules="descriptionRules"
												v-model="description"
												label="Description"
												hint="Put your valid description"
											></v-textarea>
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs-12>
											<v-btn round :disabled="!isFormValid" color="primary" @click="next">Next</v-btn>
										</v-flex>
									</v-layout>
								</div>

								<div v-if="step == 2">
									<v-layout row>
										<v-flex xs-12>
											<v-autocomplete
												prepend-icon="category"
												v-model="category"
												multiple
												attach
												chips
												:rules="categoryRules"
												:items="categoryItems"
												label="Category"
											></v-autocomplete>
										</v-flex>
									</v-layout>

									<v-layout row>
										<v-flex xs-12>
											<v-autocomplete
												prepend-icon="grain"
												v-model="tag"
												multiple
												attach
												chips
												:items="tagItems"
												label="Tag"
											></v-autocomplete>
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs-12>
											<v-autocomplete
												prepend-icon="color_lens"
												v-model="color"
												multiple
												attach
												:rules="colorRules"
												chips
												:items="colorItems"
												label="Color"
											></v-autocomplete>
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs-12>
											<v-autocomplete
												prepend-icon="donut_small"
												v-model="size"
												multiple
												attach
												chips
												:rules="sizeRules"
												:items="sizeItems"
												label="Size"
											></v-autocomplete>
										</v-flex>
									</v-layout>

									<v-layout row>
										<v-flex xs-12>
											<v-btn round color="primary" @click="prev">Prev</v-btn>
											<v-btn round :disabled="!isFormValid" color="primary" @click="next">Next</v-btn>
										</v-flex>
									</v-layout>
								</div>
								<div v-if="step==3">
									<v-layout row>
										<v-flex xs-12>
											<v-text-field
												:rules="pictureRules"
												v-model="picture[0]"
												prepend-icon="add_a_photo"
												label="Picture-1"
												type="text"
												required="true"
											></v-text-field>
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs-12>
											<v-text-field
												v-model="picture[1]"
												prepend-icon="add_a_photo"
												label="Picture-2"
												type="text"
												required="true"
											></v-text-field>
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs-12>
											<v-text-field
												v-model="picture[2]"
												prepend-icon="add_a_photo"
												label="Picture-3"
												type="text"
												required="true"
											></v-text-field>
										</v-flex>
									</v-layout>
									<v-layout wrap row>
										<v-flex xs-3 sm-3>
											<img :src="picture[0]" height="100px">
										</v-flex>
										<v-flex xs-3 sm-3>
											<img :src="picture[1]" height="100px">
										</v-flex>
										<v-flex xs-3 sm-3>
											<img :src="picture[2]" height="100px">
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs-12>
											<v-btn round color="primary" @click="prev">Prev</v-btn>
											<v-btn
												:loading="loading"
												round
												:disabled="!isFormValid"
												color="primary"
												type="submit"
											>Add product</v-btn>
										</v-flex>
									</v-layout>
								</div>
							</v-form>
						</v-container>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import TypeWriter from "@/components/layouts/TypeWriter";
	export default {
		components: {
			TypeWriter
		},
		data() {
			return {
				text: ["Add product", "Sell product", "Make money"],
				productName: "",
				price: 0,
				step: 1,
				isFormValid: true,
				description: "",
				tag: [],
				tagItems: ["Tshirt", "Polo", "Pant", "Denim", "New"],
				category: [],
				categoryItems: [
					"Dress",
					"Animals",
					"Baby",
					"Food, Beverages & Tobacco",
					"Book",
					"Arts",
					"Electronics",
					"Furniture",
					"Hardware",
					"Health & Beauty",
					"Home & Garden",
					"Media",
					"Office Supplies",
					"Religious & Ceremonial",
					"Software",
					"Sporting Goods",
					"Toys & Games",
					"Vehicles & Parts"
				],
				size: [],
				color: [],
				colorItems: [
					"Balck",
					"Green",
					"Ash",
					"Yellow",
					"White",
					"Light white",
					"Neavy blue",
					"Red",
					"Orange"
				],
				sizeItems: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
				parentCompany: "Own",
				picture: [],
				productNameRules: [
					productName => !!productName || "Product name is required"
				],
				priceRules: [
					price => !!price || "Price is requied",
					price => price > 0 || "Price can't be negative"
				],
				descriptionRules: [
					description => !!description || "Description is required",
					description =>
						description.length < 200 ||
						"Description length must be less than 200",
					description =>
						description.length > 50 ||
						"Description length must be greater than 50"
				],
				categoryRules: [
					category => category.length > 0 || "Category is required"
				],
				sizeRules: [size => size.length > 0 || "Size is required"],
				colorRules: [color => color.length > 0 || "Color is required"],
				pictureRules: [picture => !!picture || "At least one picture is required"]
			};
		},
		computed: {
			...mapGetters(["loading", "shop"])
		},
		methods: {
			next() {
				console.log(this.$store.getters.shop._id);
				if (this.$refs.form.validate()) {
					if (this.step < 3) {
						this.step++;
					}
				}
			},
			prev() {
				if (this.step > 1) {
					this.step--;
				}
			},
			handleAddProduct() {
				console.log(this.$store.getters.shop._id);
				if (this.$refs.form.validate()) {
					this.$store.dispatch("addProduct", {
						productName: this.productName,
						price: parseInt(this.price, 10),
						description: this.description,
						tag: this.tag,
						category: this.category,
						size: this.size,
						color: this.color,
						parent: this.parentCompany,
						picture: this.picture,
						creatorId: this.$store.getters.shop._id,
						shopId: this.$store.getters.shop._id
					});
				}
			}
		}
	};
</script>
