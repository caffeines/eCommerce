<template>
	<div>
		<!-- {{user.firstName}} {{user.userName}} -->
		<v-container text-xs-center mt-4 pt-5>
			<v-layout row wrap>
				<v-flex xs12 sm4 offset-sm4 mb-5>
					<h2>Welcome back!</h2>
				</v-flex>
			</v-layout>

			<!-- signin form -->
			<v-layout row wrap>
				<v-flex xs12 sm4 offset-sm4>
					<v-card color="#fff" class="form_card">
						<v-container>
							<v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSignin">
								<v-layout row>
									<v-flex xs-12>
										<v-text-field
											:rules="userNameRules"
											v-model="userName"
											prepend-icon="face"
											label="Username"
											type="text"
											required="true"
										></v-text-field>
									</v-flex>
								</v-layout>

								<v-layout row>
									<v-flex xs-12>
										<v-text-field
											:rules="passwordRules"
											v-model="password"
											prepend-icon="lock_open"
											label="Password"
											type="password"
											required
										></v-text-field>
									</v-flex>
								</v-layout>

								<v-layout row>
									<v-flex xs-12>
										<v-btn :loading="loading" :disabled="!isFormValid" color="accent" type="submit">
											Signin
											<template v-slot:loader>
												<span class="custom-loader">
													<v-icon light>cached</v-icon>
												</span>
											</template>
										</v-btn>
										<h3>
											Don't have an account?
											<router-link to="/signup">
												<span class="link">Signup</span>
											</router-link>
										</h3>
									</v-flex>
								</v-layout>

								<v-layout row>
									<v-flex xs-12>
										<router-link to="/signup">
											<span class="link">Forgot password?</span>
										</router-link>
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
	import { mapGetters } from "vuex";
	export default {
		data: () => {
			return {
				isFormValid: true,
				userName: "",
				password: "",
				userNameRules: [
					// check if userName in input
					userName => !!userName || "Username is required"
				],
				passwordRules: [
					// check if userName in input
					password => !!password || "Password is required"
				]
			};
		},
		computed: {
			...mapGetters(["user", "loading"])
		},
		watch: {
			user: function(value) {
				// if user value change from null
				if (value) {
					this.$router.push("/");
				}
			}
		},
		methods: {
			handleSignin() {
				if (this.$refs.form.validate()) {
					this.$store.dispatch("signinUser", {
						userName: this.userName,
						password: this.password
					});
				}
			}
		}
	};
</script>
  
<style lang="scss" scoped>
	.form_card {
		border-radius: 2% !important;
		box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
		&:hover {
			transform: scale(1.03, 1.03);
		}
	}
	.link {
		text-decoration: none;
		text-transform: capitalize;
		padding: 1rem 0;
		display: inline-block;
		border-radius: 10rem;
		transition: all 0.2s;
		position: relative;
		border: none;
		cursor: pointer;
		&:hover {
			color: black;
		}
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
