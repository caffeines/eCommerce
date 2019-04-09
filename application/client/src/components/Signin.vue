<template>
	<div>
		<div v-if="loading">
			<Loading/>
		</div>
		<div v-else-if="!loading && !user">
			<div>
				<v-container text-xs-center mt-2 pt-5>
					<v-layout row wrap>
						<div class="mb-5 typeWriter">
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
												<v-btn :loading="loading" :disabled="!isFormValid" color="primary" type="submit">
													Signin
													<template v-slot:loader>
														<span class="custom-loader">
															<v-icon light>cached</v-icon>
														</span>
													</template>
												</v-btn>
												<h3>
													Don't have an account?
													<router-link to="/signin">
														<span class="link" @click="signupSet">Signup</span>
													</router-link>
												</h3>
											</v-flex>
										</v-layout>

										<v-layout row>
											<v-flex xs-12>
												<router-link to>
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
		</div>
	</div>
</template>
<script>
	import TypeWriter from "@/components/layouts/TypeWriter";
	import Loading from "@/components/layouts/Loading";

	import { mapGetters } from "vuex";
	import { mapMutations } from "vuex";

	export default {
		components: {
			TypeWriter,
			Loading
		},
		data: () => {
			return {
				isFormValid: true,
				userName: "",
				password: "",
				USER: null,
				text: ["Welcome back!", "Sign in here"],
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
					this.$router.go(-1);
				}
			}
		},
		methods: {
			...mapMutations(["signinSet", "signupSet"]),
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
  
<style lang="scss">
	.form_card {
		border-radius: 2% !important;
		box-shadow: 0 1rem 2rem rgba(#ef5350, 0.4);
		&:hover {
			box-shadow: 0 1rem 2rem rgba(#ef5350, 0.6);
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
	.typeWriter {
		margin: 0 auto;
	}
</style>
