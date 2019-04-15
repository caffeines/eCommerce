<template>
	<div>
		<v-container>
			<v-layout>
				<div class="head">Shopping Cart</div>
			</v-layout>
			<v-icon x-large color="black ml-2" @click="goBack">keyboard_backspace</v-icon>
			<v-layout row>
				<v-flex xs7>
					<v-card flat class="product_details mt-5">
						<v-layout row justify-start>
							<v-flex xs2 class="ml-2 mt-4">
								<v-avatar tile size="75" color="grey lighten-4">
									<img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
								</v-avatar>
							</v-flex>
							<v-flex xs4 class="ml-2 mt-4">
								<div class="product_name">iPhoneX</div>
								<div class="product_info">
									<span class="clr">green</span>, XL
								</div>
								<div class="product_info">From shop</div>
							</v-flex>
							<v-flex xs2 class="ml-2 mt-5 product_price">&#2547; 250000</v-flex>
							<v-layout row justify-space-around>
								<v-flex class="ml-2 mt-5 product_button">
									<v-icon class="button_color">remove</v-icon>
									<span class="button_text">1</span>
									<v-icon class="button_color">add</v-icon>
									<v-icon class="delete">delete</v-icon>
								</v-flex>
							</v-layout>
						</v-layout>
					</v-card>
				</v-flex>
				<v-flex xs5>
					<v-card flat class="product_details mt-5 ml-4">
						<div class="totals">CART TOTALS</div>
						<v-divider></v-divider>
						<v-layout row>
							<v-flex>
								<div class="subtotal">SUBTOTAL</div>
								<div class="subtotal">SHIPPING</div>
							</v-flex>
							<v-flex class="subtotal">
								<!-- {{radioGroup}} -->
								<div class="price">&#2547; 1523</div>
								<v-radio-group v-model="radioGroup" class="price">
									<v-radio label="FLAT RATE: 60" color="red" value="flat"></v-radio>
									<v-radio label="FREE SHIPPING" color="red" value="free"></v-radio>
									<v-radio label="PICKUP POINT" color="red" value="pick"></v-radio>
								</v-radio-group>
								<span class="estimate">Estimate for Dhaka, Bangladesh.</span>
								<div class="address">CHANGE ADDRESS</div>
							</v-flex>
						</v-layout>
						<v-layout row mt-5>
							<v-flex xs5 class="total">TOTAL</v-flex>
							<v-flex xs6 class="total_price">&#2547; 12054</v-flex>
						</v-layout>
						<v-btn round flat class="btn_checkout">proceed to checkout</v-btn>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				radioGroup: null
			};
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.head {
		font-size: 50px;
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
			font-size: 16px;
		}
		&_info {
			color: #999;
		}
		&_price {
			font-weight: 600;
			font-size: 20px;
			color: rgb(107, 105, 105);
		}
	}
	.button_text {
		font-size: 22px;
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
		font-size: 12px;
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
</style>

