<template>
	<div>
		<v-container class="all">
			<v-layout>
				<div class="head" v-if="cart.length > 0">Shopping Cart</div>
			</v-layout>
			<v-icon v-if="cart.length > 0" color="black ml-2" @click="goBack">keyboard_backspace</v-icon>
			<v-layout row wrap v-if="cart.length > 0">
				<v-flex xs12 lg7>
					<v-card flat class="product_details mt-5" v-if="productView">
						<v-layout row justify-start v-for="(item, i) in cart" :key="'item'">
							<v-flex xs2 class="ml-2 mt-4">
								<v-avatar tile size="5rem" color="grey lighten-4">
									<img :src="item.picture" alt="avatar">
								</v-avatar>
							</v-flex>
							<v-flex xs4 class="ml-2 mt-4">
								<div class="product_name">{{ item.productName }}</div>
								<div class="product_info">
									<span class="clr">{{ item.color }}</span>
									, {{ item.size }}
								</div>
								<div class="product_info">
									From
									<span class="shopName">{{item.shopName}}</span>
								</div>
							</v-flex>
							<v-flex xs2 class="ml-2 mt-5 product_price">&#2547; {{ item.price }}</v-flex>
							<v-layout row justify-space-around>
								<v-flex class="ml-2 mt-5 product_button">
									<v-icon class="button_color" @click="decrement(i)">remove</v-icon>
									<span class="button_text">{{ item.quantity}}</span>
									<v-icon class="button_color" @click="increment(i)">add</v-icon>
									<v-icon class="delete" @click="deleteProduct(i)">delete</v-icon>
								</v-flex>
							</v-layout>
						</v-layout>
					</v-card>
					<v-card flat class="product_details mt-5" v-if="!productView">
						<v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSignin">
							<v-card-text>
								<v-text-field
									v-model="name"
									:rules="[() => !!name || 'This field is required']"
									:error-messages="errorMessages"
									label="Full Name"
									placeholder="Shohanur"
									required
								></v-text-field>
								<v-text-field
									v-model="address"
									:rules="[
              () => !!address || 'This field is required',
              () => !!address && address.length <= 100 || 'Address must be less than 100 characters',
              
            ]"
									label="Address Line"
									placeholder="Bashundhara R/A"
									counter="100"
									required
								></v-text-field>
								<v-text-field
									v-model="city"
									:rules="[() => !!city || 'This field is required']"
									label="City"
									placeholder="Dhaka"
									required
								></v-text-field>
								<v-text-field
									v-model="state"
									:rules="[() => !!state || 'This field is required']"
									label="Division"
									required
									placeholder="Dhaka"
								></v-text-field>
								<v-text-field
									v-model="contact"
									:rules="[() => !!contact || 'This field is required']"
									label="Contact"
									required
									placeholder="01751...557"
								></v-text-field>
								<v-text-field
									v-model="zip"
									:rules="[() => !!zip || 'This field is required']"
									label="ZIP / Postal Code"
									required
									placeholder="1212"
								></v-text-field>
								<v-autocomplete
									v-model="country"
									:rules="[() => !!country || 'This field is required']"
									:items="countries"
									label="Country"
									placeholder="Select..."
									required
								></v-autocomplete>
							</v-card-text>
							<v-divider class="mt-5"></v-divider>
							<v-card-actions>
								<v-btn flat round @click="cancel">Cancel</v-btn>
								<v-spacer></v-spacer>
								<v-btn :disabled="!isFormValid" color="red" flat type="submit" round @click="submit">Submit</v-btn>
							</v-card-actions>
						</v-form>
					</v-card>
				</v-flex>
				<v-flex xs12 lg4>
					<v-card flat class="product_details mt-5 ml-4">
						<div class="totals">CART TOTALS</div>
						<v-divider></v-divider>
						<v-layout row>
							<v-flex>
								<div class="subtotal">SUBTOTAL</div>
								<div class="subtotal">SHIPPING</div>
							</v-flex>
							<v-flex class="subtotal">
								<div class="price">&#2547; {{ subtotal }}</div>
								<v-radio-group v-model="radioGroup" class="price">
									<v-radio label="FLAT RATE: 60" color="warning" value="flat"></v-radio>
									<v-radio label="FREE SHIPPING" color="warning" value="free"></v-radio>
									<v-radio label="PICKUP POINT" color="warning" value="pick"></v-radio>
								</v-radio-group>
								<div v-if="city != null && country != null">
									<span class="estimate">Estimate for {{city}}, {{country}}.</span>
									<div class="address" @click="productView = false">CHANGE ADDRESS</div>
								</div>
								<div v-else>
									<span
										class="estimate"
										v-if="checkoutChecker==false"
										style="color: red"
									>Please provide a valid address</span>
									<span class="estimate" v-else color="warning">Please provide a valid address</span>
									<div class="address" @click="productView = false">GIVE ADDRESS</div>
								</div>
							</v-flex>
						</v-layout>
						<v-layout row mt-5>
							<v-flex xs5 class="total">TOTAL</v-flex>
							<v-flex xs6 class="total_price">&#2547; {{ total }}</v-flex>
						</v-layout>
						<v-btn
							round
							flat
							class="btn_checkout"
							@click="addOrder"
							:disabled="!checkoutChecker"
						>proceed to checkout</v-btn>
					</v-card>
				</v-flex>
			</v-layout>
			<div v-else class="empty">
				<v-icon x-large class="empty_cart">shopping_cart</v-icon>
				<div class="empty_text">Your cart is empty</div>
				<v-btn flat round class="empty_btn" @click="goBack">Go back</v-btn>
			</div>
		</v-container>
	</div>
</template>
<script>
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {
				cart: [],
				radioGroup: "flat",
				subtotal: 0,
				total: 0,
				productView: true,
				countries: [
					"Afghanistan",
					"Albania",
					"Algeria",
					"Andorra",
					"Angola",
					"Anguilla",
					"Antigua &amp; Barbuda",
					"Argentina",
					"Armenia",
					"Aruba",
					"Australia",
					"Austria",
					"Azerbaijan",
					"Bahamas",
					"Bahrain",
					"Bangladesh",
					"Barbados",
					"Belarus",
					"Belgium",
					"Belize",
					"Benin",
					"Bermuda",
					"Bhutan",
					"Bolivia",
					"Bosnia &amp; Herzegovina",
					"Botswana",
					"Brazil",
					"British Virgin Islands",
					"Brunei",
					"Bulgaria",
					"Burkina Faso",
					"Burundi",
					"Cambodia",
					"Cameroon",
					"Cape Verde",
					"Cayman Islands",
					"Chad",
					"Chile",
					"China",
					"Colombia",
					"Congo",
					"Cook Islands",
					"Costa Rica",
					"Cote D Ivoire",
					"Croatia",
					"Cruise Ship",
					"Cuba",
					"Cyprus",
					"Czech Republic",
					"Denmark",
					"Djibouti",
					"Dominica",
					"Dominican Republic",
					"Ecuador",
					"Egypt",
					"El Salvador",
					"Equatorial Guinea",
					"Estonia",
					"Ethiopia",
					"Falkland Islands",
					"Faroe Islands",
					"Fiji",
					"Finland",
					"France",
					"French Polynesia",
					"French West Indies",
					"Gabon",
					"Gambia",
					"Georgia",
					"Germany",
					"Ghana",
					"Gibraltar",
					"Greece",
					"Greenland",
					"Grenada",
					"Guam",
					"Guatemala",
					"Guernsey",
					"Guinea",
					"Guinea Bissau",
					"Guyana",
					"Haiti",
					"Honduras",
					"Hong Kong",
					"Hungary",
					"Iceland",
					"India",
					"Indonesia",
					"Iran",
					"Iraq",
					"Ireland",
					"Isle of Man",
					"Israel",
					"Italy",
					"Jamaica",
					"Japan",
					"Jersey",
					"Jordan",
					"Kazakhstan",
					"Kenya",
					"Kuwait",
					"Kyrgyz Republic",
					"Laos",
					"Latvia",
					"Lebanon",
					"Lesotho",
					"Liberia",
					"Libya",
					"Liechtenstein",
					"Lithuania",
					"Luxembourg",
					"Macau",
					"Macedonia",
					"Madagascar",
					"Malawi",
					"Malaysia",
					"Maldives",
					"Mali",
					"Malta",
					"Mauritania",
					"Mauritius",
					"Mexico",
					"Moldova",
					"Monaco",
					"Mongolia",
					"Montenegro",
					"Montserrat",
					"Morocco",
					"Mozambique",
					"Namibia",
					"Nepal",
					"Netherlands",
					"Netherlands Antilles",
					"New Caledonia",
					"New Zealand",
					"Nicaragua",
					"Niger",
					"Nigeria",
					"Norway",
					"Oman",
					"Pakistan",
					"Palestine",
					"Panama",
					"Papua New Guinea",
					"Paraguay",
					"Peru",
					"Philippines",
					"Poland",
					"Portugal",
					"Puerto Rico",
					"Qatar",
					"Reunion",
					"Romania",
					"Russia",
					"Rwanda",
					"Saint Pierre &amp; Miquelon",
					"Samoa",
					"San Marino",
					"Satellite",
					"Saudi Arabia",
					"Senegal",
					"Serbia",
					"Seychelles",
					"Sierra Leone",
					"Singapore",
					"Slovakia",
					"Slovenia",
					"South Africa",
					"South Korea",
					"Spain",
					"Sri Lanka",
					"St Kitts &amp; Nevis",
					"St Lucia",
					"St Vincent",
					"St. Lucia",
					"Sudan",
					"Suriname",
					"Swaziland",
					"Sweden",
					"Switzerland",
					"Syria",
					"Taiwan",
					"Tajikistan",
					"Tanzania",
					"Thailand",
					"Timor L'Este",
					"Togo",
					"Tonga",
					"Trinidad &amp; Tobago",
					"Tunisia",
					"Turkey",
					"Turkmenistan",
					"Turks &amp; Caicos",
					"Uganda",
					"Ukraine",
					"United Arab Emirates",
					"United Kingdom",
					"United States",
					"Uruguay",
					"Uzbekistan",
					"Venezuela",
					"Vietnam",
					"Virgin Islands (US)",
					"Yemen",
					"Zambia",
					"Zimbabwe"
				],
				errorMessages: "",
				name: null,
				address: null,
				city: null,
				state: null,
				zip: null,
				country: null,
				contact: null,
				formHasErrors: false,
				isFormValid: true,
				checkoutChecker: true
			};
		},
		computed: {
			...mapGetters(["user"])
		},
		created() {
			this.getProductFromLocalStorage();
		},
		watch: {
			radioGroup: function(newValue, oldValue) {
				if (newValue) {
					this.update();
				}
			}
		},
		methods: {
			getProductFromLocalStorage() {
				let cartFromLocalStorage = window.localStorage.getItem("cart");

				if (cartFromLocalStorage != null) {
					this.cart = JSON.parse(cartFromLocalStorage);
				}

				let addressFromLocalStorage = window.localStorage.getItem("address"),
					tempAddress;
				if (addressFromLocalStorage != null) {
					tempAddress = JSON.parse(addressFromLocalStorage);
					this.name = tempAddress.name;
					this.address = tempAddress.address;
					this.city = tempAddress.city;
					this.state = tempAddress.state;
					this.zip = tempAddress.zip;
					this.country = tempAddress.country;
					this.contact = tempAddress.contact;
				}
				this.update();
			},
			submit() {
				let address = {
					name: this.name,
					address: this.address,
					city: this.city,
					state: this.state,
					zip: this.zip,
					country: this.country,
					contact: this.contact
				};
				const JSONready = JSON.stringify(address);
				if (this.$refs.form.validate()) {
					window.localStorage.setItem("address", JSONready);
					this.productView = true;
					this.checkoutChecker = true;
				}
			},
			cancel() {
				this.productView = true;
			},
			goBack() {
				this.$router.go(-1);
			},
			increment(i) {
				if (this.cart[i].quantity < 100) {
					this.cart[i].quantity++;
					this.update();
				}
			},
			decrement(i) {
				if (this.cart[i].quantity > 0) {
					this.cart[i].quantity--;
					this.update();
				}
				if (this.cart[i].quantity <= 0) {
					this.deleteProduct(i);
				}
			},
			deleteProduct(i) {
				this.cart.splice(i, 1);
				this.storeAgain();
			},
			update() {
				let sum = 0;
				this.subtotal = 0;
				this.total = 0;

				for (let i = 0; i < this.cart.length; i++) {
					sum += this.cart[i].quantity * this.cart[i].price;
				}
				this.subtotal = sum;
				let flag = false;
				console.log("this.radioGroup: ", this.radioGroup);
				if (this.radioGroup == "flat") {
					sum += 60;
					flag = true;
				} else {
					if (flag == true) {
						sum -= 60;
						flag = false;
					}
				}
				this.total += sum;
				this.storeAgain();
			},
			storeAgain() {
				const JSONready = JSON.stringify(this.cart);
				window.localStorage.setItem("cart", "");
				window.localStorage.setItem("cart", JSONready);
				this.$store.commit("setNumberOfProduct");
			},
			addOrder() {
				let order = null;
				let cartFromLocalStorage = window.localStorage.getItem("cart"),
					tempCart;
				let addressFromLocalStorage = window.localStorage.getItem("address"),
					tempAddress;
				if (cartFromLocalStorage != null && addressFromLocalStorage != null) {
					tempCart = JSON.parse(cartFromLocalStorage);
					tempAddress = JSON.parse(addressFromLocalStorage);
					order = {
						consumer: this.user._id,
						total: this.total,
						consumerEmail: this.user.email,
						shippingType: this.radioGroup,
						purchaseItems: tempCart,
						address: tempAddress
					};
					this.$store.dispatch("addOrder", order);
					setTimeout(() => this.destroy(), 500);
				} else {
					this.checkoutChecker = false;
				}
			},
			destroy() {
				this.cart = [];
				window.localStorage.removeItem("cart");
				setTimeout(() => {
					this.$store.commit("setNumberOfProduct");
				}, 500);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.empty {
		display: block;
		margin: 6rem auto;
		text-align: center;

		&_cart {
			color: rgba(#e7221f, 0.8);
		}
		&_btn {
			box-shadow: 0 1rem 2rem rgba(#ef5350, 0.4);

			margin-top: 3rem;
			background-color: rgba(#ef5350, 0.4);
			color: rgba(#e7221f, 0.8);
			&:hover {
				color: rgba(#fff, 1);
			}
		}
		&_text {
			margin-top: 3rem;
			color: #000;
			font-size: 3rem;
			font-weight: 700;
			font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
				sans-serif;
		}
	}
	.head {
		font-size: 3rem;
		font-weight: 700;
		margin: 0 auto;
		font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
		color: rgba(71, 70, 70, 0.644);
	}
	.product_details {
		box-shadow: 0 1rem 2rem rgba(#ef5350, 0.4);
		border-radius: 3%;
		min-height: 500px;
	}
	.clr {
		text-transform: capitalize;
	}
	.product {
		&_name {
			font-weight: 600;
			font-size: 1rem;
		}
		&_info {
			color: #999;
		}
		&_price {
			font-weight: 600;
			font-size: 1.3rem;
			color: rgb(107, 105, 105);
		}
	}
	.button_text {
		font-size: 1.7rem;
		margin-left: 7%;
		margin-right: 7%;
		margin-top: -3px;
	}
	.address {
		color: rgba(255, 68, 0, 0.747);
		cursor: pointer;
		&:hover {
			color: rebeccapurple;
		}
	}
	.button_color {
		//color: rgba(255, 68, 0, 0.582);
		cursor: pointer;
	}
	.estimate {
		color: rgba(153, 153, 153, 0.842);
		font-size: 0.8rem;
	}
	.totals {
		font-weight: 600;
		font-size: 20px;
		margin-left: 10%;
		padding-top: 30px;
		padding-bottom: 30px;

		font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
	}
	.subtotal {
		font-weight: 500;
		font-size: 15px;
		margin-left: 10%;
		margin-top: 13px;
	}
	.price {
		margin-left: 00%;
		color: #000;
		font-size: 16px;
		font-weight: 600;
	}
	.total {
		margin-top: 6px;
		margin-left: 4%;
		font-size: 16px;
		font-weight: 500;
	}
	.delete {
		color: red;
		margin-top: -10px;
		margin-left: 10%;
		cursor: pointer;
	}
	.total_price {
		font-size: 25px;
		font-weight: 600;
	}
	.btn_checkout {
		display: block;
		background: rgba(255, 68, 0, 0.747);
		margin: 50px auto;
		text-transform: uppercase;
		color: #fff;
	}
	.shopName {
		color: rgba(255, 68, 0, 0.534);
	}
	.cart {
		margin: 6rem auto !important;
	}
</style>

