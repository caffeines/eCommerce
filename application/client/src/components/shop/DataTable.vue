<template>
	<div>
		<v-card flat>
			<v-card-title>
				All product
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
			<div v-if="products.length == 0? initialize() : products"></div>
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
		props: ["propProducts"],
		data() {
			return {
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
			dialog(val) {
				val || this.close();
			}
		},

		created() {
			this.getProducts();
			this.initialize();
		},

		methods: {
			initialize() {
				for (let i = 0; i < this.propProducts.length; i++) {
					//console.log("Product name: ", this.propProducts[i].productName);
					let temp = {
						name: this.propProducts[i].productName,
						price: this.propProducts[i].price,
						category: this.propProducts[i].category.join(", "),
						tag: this.propProducts[i].tag.join(", "),
						color: this.propProducts[i].color.join(", "),
						size: this.propProducts[i].size.join(", "),
						pic: this.propProducts[i].picture[0]
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