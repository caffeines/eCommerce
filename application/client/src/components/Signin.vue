<template>
	<div>
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
							<v-form @submit.prevent="handleSignin">
								<v-layout row>
									<v-flex xs-12>
										<v-text-field
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
										<v-btn color="accent" type="submit">Signin</v-btn>
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
	export default {
		data: () => {
			return {
				userName: "",
				password: ""
			};
		},
		methods: {
			handleSignin() {
				this.$store.dispatch("signinUser", {
					userName: this.userName,
					password: this.password
				});
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
</style>
