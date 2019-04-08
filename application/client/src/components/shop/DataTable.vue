<template>
	<v-card flat>
		<v-card-title>
			{{value1}}
			{{shopID}}
			{{productsByShopId}}
			All product
			<v-spacer></v-spacer>
			<v-text-field xs-8 v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
		</v-card-title>
		<v-data-table :headers="headers" :items="products" v-model="value1" :search="search">
			<template v-slot:items="props">
				<td>{{ props.item.name }}</td>
				<td class="text-xs-left">{{ props.item.price }}</td>
				<td class="text-xs-left">{{ props.item.category }}</td>
				<td class="text-xs-left">{{ props.item.tag }}</td>
				<td class="text-xs-left">{{ props.item.color }}</td>
				<td class="text-xs-left">{{ props.item.size }}</td>
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
</template>
<script>
	import { mapGetters } from "vuex";
	export default {
		props: ["shopID"],
		data() {
			return {
				search: "",
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
				products: [
					{
						name: "",
						price: 0,
						category: "",
						tag: "",
						color: "",
						size: ""
					}
				]
			};
		},
		computed: {
			...mapGetters(["productsByShopId", "allShopByaUser"])
		},

		watch: {
			dialog(val) {
				val || this.close();
			}
		},

		created() {
			this.initialize();
			this.getProducts();
		},

		methods: {
			getProducts() {
				console.log(this.shopID);
				if (!this.shopID) {
					this.shopID = this.allShopByaUser[0]._id;
				}
				this.$store.dispatch("getProductsByShopId", {
					shopId: this.shopID
				});
			},
			initialize() {},
			editItem(item) {
				this.editedIndex = this.products.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialog = true;
			},

			deleteItem(item) {
				const index = this.products.indexOf(item);
				confirm("Are you sure you want to delete this item?") &&
					this.products.splice(index, 1);
			},

			close() {
				this.dialog = false;
				setTimeout(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				}, 300);
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