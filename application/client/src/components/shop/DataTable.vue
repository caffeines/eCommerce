<template>
	<div>
		<v-card flat>
			<v-card-title>
				<v-layout row>
					<div class="text mt-1">All product &nbsp;</div>
					<div @click="clicked">
						<v-btn
							class="ml-0"
							round
							:loading="loading4"
							:disabled="loading4"
							flat
							@click="loader = 'loading4'"
						>
							<v-icon class="head">autorenew</v-icon>
							<template v-slot:loader>
								<span class="custom-loader">
									<v-icon light>cached</v-icon>
								</span>
							</template>
						</v-btn>
					</div>
				</v-layout>
				<v-spacer></v-spacer>
				<v-text-field
					xs-8
					v-model="search"
					append-icon="search"
					label="Search"
					single-line
					hide-details
				></v-text-field>
			</v-card-title>
			<div
				v-if="(products.length == 0 && this.$store.getters.productsByShopId.length > 0)? initialize() : products"
			></div>
			<v-data-table :headers="headers" :items="products" v-model="value1" :search="search">
				<template v-slot:items="props">
					<td @click="show(props.item.pic)">{{ props.item.name }}</td>
					<td class="text-xs-left" @click="show(props.item.pic)">{{ props.item.price }}</td>
					<td class="text-xs-left" @click="show(props.item.pic)">{{ props.item.category }}</td>
					<td class="text-xs-left" @click="show(props.item.pic)">{{ props.item.tag }}</td>
					<td class="text-xs-left" @click="show(props.item.pic)">{{ props.item.color }}</td>
					<td class="text-xs-left" @click="show(props.item.pic)">{{ props.item.size }}</td>
					<td class="justify-center layout px-0">
						<v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
						<v-icon small @click="deleteItem(props.item)">delete</v-icon>
					</td>
				</template>
				<v-alert
					v-slot:no-results
					:value="true"
					color="error"
					icon="warning"
				>Your search for "{{ search }}" found no results.</v-alert>
			</v-data-table>
		</v-card>
	</div>
</template>
<script>
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {
				loader: null,
				loading: false,
				loading2: false,
				loading3: false,
				loading4: false,
				search: "",
				pict: null,
				value1: [],
				headers: [
					{
						text: "Product name",
						align: "left",
						sortable: true,
						value: "name"
					},
					{ text: "price", value: "price" },
					{ text: "Category", value: "category" },
					{ text: "Tag", value: "tag" },
					{ text: "Color", value: "color" },
					{ text: "Size", value: "size" },
					{ text: "Action" }
				],
				products: []
			};
		},
		computed: {
			...mapGetters(["productsByShopId"])
		},

		watch: {
			loader() {
				const l = this.loader;
				this[l] = !this[l];

				setTimeout(() => (this[l] = false), 1000);

				this.loader = null;
			},
			dialog(val) {
				val || this.close();
			}
		},

		created() {
			this.getProducts();
		},

		methods: {
			clicked() {
				for (let i = 0; i < 2; i++) {
					setTimeout(() => this.getProducts(), 500);
				}
			},
			async getProducts() {
				await this.$store.dispatch("getProductsByShopId", {
					shopId: this.$route.params.id
				});
				this.initialize();
			},
			initialize() {
				this.products = [];
				const prod = this.$store.getters.productsByShopId;
				console.log(prod.length);
				for (let i = 0; i < prod.length; i++) {
					let temp = {
						name: prod[i].productName,
						price: prod[i].price,
						category: prod[i].category.join(", "),
						tag: prod[i].tag.join(", "),
						color: prod[i].color.join(", "),
						size: prod[i].size.join(", "),
						pic: prod[i].picture[0],
						id: prod[i]._id
					};
					this.products.push(temp);
				}
			},
			editItem(item) {
				this.editedIndex = this.products.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialog = true;
			},

			deleteItem(item) {
				const index = this.products.indexOf(item);
				const deleteAction = window.confirm(
					"Are you sure you want to delete this item?"
				);
				if (deleteAction) {
					this.products.splice(index, 1);
					console.log(item.id);
					this.$store.dispatch("deleteProduct", { id: item.id });
				}
			},

			close() {
				this.dialog = false;
				setTimeout(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				}, 300);
			},
			show(pic) {
				this.$store.dispatch("pictureSetter", { pic });
			},
			save() {
				if (this.editedIndex > -1) {
					Object.assign(this.products[this.editedIndex], this.editedItem);
				} else {
					this.products.push(this.editedItem);
				}
				this.close();
			}
		}
	};
</script>
<style lang="scss">
	.text {
		font-size: 20px;
	}

	.custom-loader {
		animation: loader 1s infinite;
		display: flex;
	}
	@-moz-keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@-webkit-keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@-o-keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
