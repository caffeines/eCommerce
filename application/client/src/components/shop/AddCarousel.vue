<template>
	<div>
		<div>
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
						<v-flex xs12 sm6 offset-sm3>
							<v-card color="#fff" class="form_card">
								<v-container>
									<v-form
										v-model="isFormValid"
										lazy-validation
										ref="form"
										@submit.prevent="handleAddCarousel"
									>
										<v-layout row>
											<v-flex xs-12>
												<v-text-field
													:rules="pictureRules"
													v-model="picture"
													prepend-icon="add_a_photo"
													label="Picture"
													type="text"
													required
												></v-text-field>
											</v-flex>
										</v-layout>

										<v-layout row>
											<v-flex xs-8>
												<v-text-field
													:rules="buttonRules"
													v-model="buttonText"
													prepend-icon="rounded_corner"
													label="Button Text"
													type="text"
												></v-text-field>
											</v-flex>
											<v-spacer></v-spacer>
											<v-flex ml-5 xs-2>
												<v-text-field
													:rules="colorRules"
													v-model="buttonColor"
													prepend-icon="color_lens"
													label="Button color"
													type="text"
													required
												></v-text-field>
											</v-flex>
										</v-layout>
										<v-layout row>
											<v-flex xs-8>
												<v-text-field
													:rules="titleRules"
													v-model="titleText"
													prepend-icon="title"
													label="Title Text"
													type="text"
												></v-text-field>
											</v-flex>
											<v-spacer></v-spacer>
											<v-flex ml-5 xs-2>
												<v-text-field
													:rules="colorRules"
													v-model="titleColor"
													prepend-icon="color_lens"
													label="Title color"
													type="text"
													required
												></v-text-field>
											</v-flex>
										</v-layout>
										<v-layout row>
											<v-flex xs-8>
												<v-text-field
													:rules="subtitleRules"
													v-model="subtitleText"
													prepend-icon="subtitles"
													label="Subtitle Text"
													type="text"
												></v-text-field>
											</v-flex>
											<v-spacer></v-spacer>
											<v-flex ml-5 xs-2>
												<v-text-field
													:rules="colorRules"
													v-model="subtitleColor"
													prepend-icon="color_lens"
													label="Subtitle color"
													type="text"
													required
												></v-text-field>
											</v-flex>
										</v-layout>
										<v-layout row>
											<v-flex xs-12>
												<v-btn round v-if="isFormValid" class="one" type="submit">
													<span class="head">Add carousel</span>
												</v-btn>
												<v-btn :disabled="!isFormValid" round v-else type="submit">
													<span class="head">Add carousel</span>
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
				picture: "",
				buttonColor: "",
				buttonText: "",
				title: "",
				titleColor: "",
				subTitile: "",
				subTitleColor: "",
				text: ["Add carousel here"],
				pictureRules: [picture => !!picture || "Picture is required"],
				colorRules: [color => !!color || "Color is required"],
				buttonRules: [button => !!button || "Button text is required"],
				titleRules: [title => !!title || "Title is required"],
				subtitleRules: [subtitle => !!subtitle || "Subtitle is required"]
			};
		},
		computed: {
			...mapGetters(["shop", "loading"])
		},
		watch: {},
		methods: {
			handleAddCarousel() {
				if (this.$refs.form.validate()) {
					this.$store.dispatch("addCarousel", {
						picture: this.picture,
						buttonColor: this.buttonColor,
						buttonTex: this.buttonText,
						title: this.title,
						titleColor: this.titleColor,
						subTitile: this.subTitile,
						subTitileColor: this.subTitileColor,
						shopId: this.$store.getters.shop._id
					});
				}
			}
		}
	};
</script>
<style lang="scss">
	.one {
		background-image: linear-gradient(
			to right,
			rgba(128, 0, 128, 0.76),
			rgba(255, 68, 0, 0.801)
		);
	}
	.head {
		color: #fff;
	}
</style>
