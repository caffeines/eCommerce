<template>
	<div>
		<v-card flat>
			<v-card-title>
				<v-layout row>
					<div class="text mt-1">All order list &nbsp;</div>
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
			<!-- <div
				v-if="(products.length == 0 && this.$store.getters.productsByShopId.length > 0)? initialize() : products"
			></div>-->
			<v-data-table :headers="headers" :items="products" v-model="value1" :search="search">
				<template v-slot:items="props">
					<td>{{ props.item.name }}</td>
					<td class="text-xs-left">{{ props.item.price }}</td>
					<td class="text-xs-left">{{ props.item.color }}</td>
					<td class="text-xs-left">{{ props.item.size }}</td>
					<td class="text-xs-left">{{ props.item.quantity }}</td>
					<td class="text-xs-left">{{ props.item.status }}</td>

					<td class="layout">
						<v-icon class="ml-3" @click="showItem(props.item)">view_carousel</v-icon>
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
		props: ["order"],
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
					{ text: "Color", value: "color" },
					{ text: "Size", value: "size" },
					{ text: "Quantity", value: "quantity" },
					{ text: "Status", value: "status" },
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
					setTimeout(() => this.initialize(), 500);
				}
			},
			getProducts() {
				for (let i = 0; i < 2; i++) {
					setTimeout(() => this.initialize(), 500);
				}
			},
			initialize() {
				this.products = [];
				for (let j = 0; j < this.order.length; j++) {
					let prod = this.order[j].item;
					let temp = {
						name: prod.productName,
						price: prod.price,
						color: prod.color,
						size: prod.size,
						id: prod._id,
						quantity: prod.quantity,
						status: prod.status
					};
					this.products.push(temp);
				}
			},
			showItem(item) {
				this.editedIndex = this.products.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialog = true;
			},
			updateItem(item) {
				const index = this.products.indexOf(item);
				const deleteAction = window.confirm(
					"Are you sure you want to delete this item?"
				);
				if (deleteAction) {
					this.products.splice(index, 1);
					//console.log(item.id);
					this.$store.dispatch("deleteProduct", { id: item.id });
				}
			},
			show(pic) {
				this.$store.dispatch("pictureSetter", { pic });
			},
			save() {}
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