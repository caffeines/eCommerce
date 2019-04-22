<template>
	<div>
		<v-card flat class="_card">
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
					<td class="text-xs-left">{{ props.item.contact }}</td>
					<td class="text-xs-left">{{ props.item.addressLine }}</td>
					<td class="text-xs-left">{{ props.item.city }}</td>
					<td class="text-xs-left">{{ props.item.shipmentType }}</td>
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
						text: "Consumer name",
						align: "left",
						sortable: true,
						value: "name"
					},
					{ text: "Contact", value: "contact" },
					{ text: "Address Line", value: "addressLine" },
					{ text: "City", value: "city" },
					{ text: "Shipment type", value: "shipmentType" },
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
					let prod = this.order[j];

					let temp = {
						name: prod.address.name,
						addressLine: prod.address.address,
						city: prod.address.city,
						contact: prod.address.contact,
						id: prod.ID,
						shipmentType: prod.shipmentType,
						status: prod.status,
						full: prod
					};
					this.products.push(temp);
				}
			},
			showItem(item) {
				let it = this.products.indexOf(item);

				console.log(item);
			},
			save() {}
		}
	};
</script>
<style lang="scss">
	._card {
	}
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