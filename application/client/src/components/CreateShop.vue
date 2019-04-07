<template>
	<div>
		<v-container text-xs-center mt-2 pt-5>
			<v-layout>
				<div class="mb-4 typeWriter">
					<h2 class="type">
						<TypeWriter :text="text"/>
					</h2>
				</div>
			</v-layout>

			<!-- signin form -->
			<v-layout row wrap>
				<v-flex xs12 sm4 offset-sm4>
					<v-card color="#fff" class="form_card">
						<v-container>
							<v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleCreateShop">
								<v-layout row>
									<v-flex xs-12>
										<v-text-field
											:rules="shopNameRules"
											v-model="shopName"
											prepend-icon="store"
											label="Shop name"
											type="text"
											required
										></v-text-field>
									</v-flex>
								</v-layout>

								<v-layout row>
									<v-flex xs-12>
										<v-text-field
											:rules="emailRules"
											v-model="email"
											prepend-icon="email"
											label="Email"
											type="Email"
											required
										></v-text-field>
									</v-flex>
								</v-layout>

								<v-layout row>
									<v-flex xs-12>
										<v-text-field
											:rules="contactNoRules"
											v-model="contactNo"
											prepend-icon="call"
											label="Contact No"
											type="text"
											prefix="+88"
											required
										></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs-12>
										<v-textarea
											prepend-icon="location_on"
											:rules="addressRules"
											v-model="address"
											label="Address"
											hint="Put your valid address"
										></v-textarea>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex mt-1 xs-12>
										<v-btn :loading="loading" :disabled="!isFormValid" color="primary" type="submit">
											Create
											<template v-slot:loader>
												<span class="custom-loader">
													<v-icon light>cached</v-icon>
												</span>
											</template>
										</v-btn>
									</v-flex>
								</v-layout>
							</v-form>
						</v-container>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>
<script>
	import TypeWriter from "@/components/layouts/TypeWriter";
	import { mapGetters } from "vuex";
	export default {
		components: {
			TypeWriter
		},
		data() {
			return {
				isFormValid: true,
				shopName: "",
				email: "",
				contactNo: "",
				address: "",
				text: [
					"Create shop here",
					"Start your business",
					"Maximize your selling"
				],
				shopNameRules: [
					shopName => !!shopName || "Shop name is required",
					shopName => shopName.length > 2 || "Length must be greater than 2"
				],
				contactNoRules: [
					contactNo =>
						/\+?(88)?(01)[3-9][0-9]{8}\b/g.test(contactNo) ||
						"Must be a valid contact number",
					contactNo => !!contactNo || "Contact number is required"
				],
				emailRules: [
					email => !!email || "Email is required",
					email =>
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
							email
						) || "Must be a valid email"
				],
				addressRules: [
					address => !!address || "Address is required",
					address => address.length > 15 || "Length must be greater than 15"
				]
			};
		},
		computed: {
			...mapGetters(["user", "loading"])
		},
		methods: {
			handleCreateShop() {
				if (this.$refs.form.validate()) {
					this.$store.dispatch("createShop", {
						shopName: this.shopName,
						email: this.email,
						contactNo: this.contactNo,
						address: this.address,
						ownerId: this.$store.getters.user._id,
						ownerEmail: this.$store.getters.user.email
					});
				}
			}
		}
	};
</script>
<style lang="scss">
	.typeWriter {
		margin: 0 auto;
	}
</style>
