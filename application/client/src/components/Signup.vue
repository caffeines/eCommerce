<template>
	<div>
		<v-container text-xs-center mt-2 pt-5>
			<v-layout row wrap>
				<div class="mb-5 typeWriter">
					<h2 class="type">
						<TypeWriter :text="text"/>
					</h2>
				</div>
			</v-layout>
			<!-- step-1 -->
			<v-layout row wrap>
				<v-flex xs12 sm4 offset-sm4>
					<v-card color="#fff" class="form_card">
						<v-container>
							<v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSignup">
								<div v-if="step === 1">
									<v-layout row>
										<v-flex xs-12>
											<v-text-field
												:rules="userNameRules"
												v-model="userName"
												prepend-icon="face"
												label="Username"
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
												type="text"
												required
											></v-text-field>
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs-12>
											<v-text-field
												:rules="firstNameRules"
												v-model="firstName"
												prepend-icon="person"
												label="First name"
												type="text"
												required
											></v-text-field>
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs-12>
											<v-text-field
												:rules="lastNameRules"
												v-model="lastName"
												prepend-icon="person"
												label="Last name"
												type="text"
												required
											></v-text-field>
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs-12>
											<v-btn :disabled="!isFormValid" round color="primary" @click="next">next</v-btn>
										</v-flex>
									</v-layout>
									<v-layout row>
										<v-flex xs-12>
											<router-link to="/signin">
												<span class="link" @click="signinSet">Already have an account?</span>
											</router-link>
										</v-flex>
									</v-layout>
								</div>

								<!-- step-2 -->

								<div v-if="step === 2">
									<v-layout row>
										<v-flex xs-12>
											<v-text-field
												:rules="contactRules"
												v-model="contact"
												prepend-icon="call"
												prefix="+88"
												label="Contact number"
												type="text"
												required
											></v-text-field>
										</v-flex>
									</v-layout>

									<v-layout row>
										<v-flex xs-12>
											<v-text-field
												:rules="passwordRules"
												:error-messages="passwordMatchError()"
												v-model="password"
												prepend-icon="lock"
												label="Password"
												type="password"
												required
											></v-text-field>
										</v-flex>
									</v-layout>

									<v-layout row>
										<v-flex xs-12>
											<v-text-field
												:rules="passwordRules"
												v-model="passwordConfirmation"
												:error-messages="passwordMatchError()"
												prepend-icon="lock"
												label="Confirm password"
												type="password"
												required
											></v-text-field>
										</v-flex>
									</v-layout>

									<v-layout row>
										<v-flex xs-12>
											<v-dialog
												ref="dialog"
												v-model="modal"
												:return-value.sync="date"
												persistent
												lazy
												full-width
												width="290px"
											>
												<template v-slot:activator="{ on }">
													<v-text-field v-model="date" label="Date of birth" prepend-icon="event" v-on="on"></v-text-field>
												</template>
												<v-date-picker v-model="date" scrollable>
													<v-spacer></v-spacer>
													<v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
													<v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
												</v-date-picker>
											</v-dialog>
										</v-flex>
									</v-layout>

									<v-layout row>
										<v-flex xs-12>
											<v-btn color="primary" @click="prev">prev</v-btn>
											<v-btn :loading="loading" :disabled="!isFormValid" color="primary" type="submit">
												Signup
												<template v-slot:loader>
													<span class="custom-loader">
														<v-icon light>cached</v-icon>
													</span>
												</template>
											</v-btn>
										</v-flex>
									</v-layout>
								</div>
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
	import { mapMutations } from "vuex";
	export default {
		components: {
			TypeWriter
		},
		data: () => {
			return {
				date: new Date().toISOString().substr(0, 10),
				menu: false,
				modal: false,
				menu2: false,
				step: 1,
				isFormValid: true,
				firstName: "",
				lastName: "",
				contact: "",
				userName: "",
				password: "",
				email: "",
				text: ["Get started here"],
				passwordConfirmation: "",
				firstNameRules: [
					firstName => !!firstName || "First name is required",
					firstName => firstName.length > 1 || "Length must be greater than 1"
				],
				lastNameRules: [
					lastName => !!lastName || "Last name is required",
					lastName => lastName.length > 1 || "Length must be greater than 1"
				],
				contactRules: [
					contact =>
						/\+?(88)?(01)[3-9][0-9]{8}\b/g.test(contact) ||
						"Must be a valid contact number",
					contact => !!contact || "Contact number is required"
				],
				emailRules: [
					email => !!email || "Email is required",
					email =>
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
							email
						) || "Must be a valid email"
				],
				userNameRules: [
					userName => !!userName || "Username is required",
					userName => userName.length > 3 || "Length must be greater than 2"
				],
				passwordRules: [
					password => !!password || "Password is required",
					password => password.length > 4 || "Length must be greater than 4"
				]
			};
		},
		computed: {
			...mapGetters(["user", "loading"])
		},
		watch: {
			user: function(value) {
				// if user value change from null
				console.log("Watched");
				if (value) {
					this.$router.push("/");
				}
			}
		},
		methods: {
			...mapMutations(["signinSet", "signupSet"]),
			next() {
				if (this.$refs.form.validate()) {
					if (this.step < 2) {
						this.step++;
					}
				}
			},
			prev() {
				if (this.step > 1) {
					this.step--;
				}
			},
			passwordMatchError() {
				return this.password === this.passwordConfirmation
					? ""
					: "Password must be match";
			},
			handleSignup() {
				if (this.$refs.form.validate()) {
					this.$store.dispatch("signupUser", {
						userName: this.userName,
						email: this.email,
						password: this.password,
						contactNo: this.contact,
						firstName: this.firstName,
						lastName: this.lastName,
						dateOfBirth: this.date
					});
				}
			}
		}
	};
</script>
