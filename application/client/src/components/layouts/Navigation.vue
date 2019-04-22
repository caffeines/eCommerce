<template>
	<div class="mb-3">
		<v-navigation-drawer flat temporary v-model="drawer" fixed app>
			<v-toolbar fixed flat>
				<v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
				<v-toolbar-title>
					<span color="primary" style="cursor: pointer" @click="refresh">Gogonjo</span>
				</v-toolbar-title>
			</v-toolbar>

			<v-list style="margin-top: 62px">
				<v-list-tile v-for="item in sideNavItems" :key="item.title" :to="item.link" router exact>
					<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title v-text="item.title"/>
					</v-list-tile-content>
				</v-list-tile>

				<!-- Sign out button -->
				<v-list-tile v-if="user" @click="signoutUser">
					<v-list-tile-action>
						<v-icon>exit_to_app</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>Signout</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>

		<v-toolbar fixed app flat>
			<v-toolbar-side-icon @click="drawer = !drawer"/>
			<v-toolbar-title>
				<div>
					<span color="primary" style="cursor: pointer" @click="refresh">Gogonjo</span>
				</div>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-flex xs5 sm3 lg3 md4 xl2>
				<v-text-field
					v-model="searchInput"
					@input="handleSearch"
					flex
					prepend-icon="search"
					:placeholder="text"
					color="primary"
					single-line-hide-details
				></v-text-field>
			</v-flex>
			<!-- search results card -->

			<v-card flat v-if="searchResult && cardFlag" class="search__card">
				<v-layout>
					<v-flex xs12 sm12 md4 lg4 xl4>
						<h3 class="type">Product</h3>
						<v-list>
							<v-list-tile v-for="pres in searchResult.product" :key="'pres'">
								<v-list-tile-title class="result" @click="gotoSearchProduct(pres._id)">
									<v-flex xs4 sm2 md1>
										<v-avatar size="25px">
											<img :src="pres.picture[0]">
										</v-avatar>
										{{pres.productName}}
									</v-flex>
								</v-list-tile-title>
							</v-list-tile>
						</v-list>
					</v-flex>
					<v-flex xs12 sm12 md4 lg4 xl4>
						<h3 class="type">Shop</h3>
						<v-list>
							<v-list-tile v-for="sres in searchResult.shop" :key="'sres'">
								<v-list-tile-title class="result" @click="gotoSearchShop(sres._id)">{{sres.shopName}}</v-list-tile-title>
							</v-list-tile>
						</v-list>
					</v-flex>
					<v-flex xs12 sm12 md4 lg4 xl4>
						<h3 class="type">User</h3>
						<v-list>
							<v-list-tile v-for="ures in searchResult.user" :key="'ures'">
								<v-list-tile-title
									class="result"
									@click="gotoSearchUser(ures._id)"
								>{{ures.firstName}} {{ ures.lastName}}</v-list-tile-title>
							</v-list-tile>
						</v-list>
					</v-flex>
				</v-layout>
			</v-card>

			<v-spacer></v-spacer>
			<!-- Icon & Items -->
			<div class="hidden-xs-only">
				<!-- <v-btn flat v-for="item in navItems" :key="item.title" :to="item.link">
					<v-icon class="hidden-sm-only">{{item.icon}}</v-icon>
					<div>{{item.title}}</div>
				</v-btn>-->
				<v-btn flat v-if="!user" to="/signin" @click="signinSet">
					<v-icon class="hidden-sm-only">lock_open</v-icon>
					<div>Signin</div>
				</v-btn>
				<v-btn flat v-if="!user" to="/signin" @click="signupSet">
					<v-icon class="hidden-sm-only">how_to_reg</v-icon>
					<div>Signup</div>
				</v-btn>
				<v-btn flat v-if="user" @click="signoutUser">
					<v-icon class="hidden-sm-only">exit_to_app</v-icon>Signout
				</v-btn>
			</div>
			<div class="mr-2">
				<v-badge
					color="error"
					:class="{'bounce' : badgeAnimated}"
					v-if="numberOfProduct != null && numberOfProduct != 0"
				>
					<template v-slot:badge>
						<span>{{ numberOfProduct }}</span>
					</template>
					<div @click="goToCart" style="cursor: pointer">
						<v-icon>shopping_cart</v-icon>
					</div>
				</v-badge>
				<div v-else @click="goToCart" style="cursor: pointer">
					<v-icon>shopping_cart</v-icon>
				</div>
			</div>
		</v-toolbar>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import { mapMutations } from "vuex";
	import { setTimeout } from "timers";

	export default {
		data() {
			return {
				badgeAnimated: false,
				cardFlag: false,
				searchInput: "",
				drawer: false,
				text: "",
				txt: "Type to search (ex: iPhone XS)"
			};
		},
		computed: {
			...mapGetters(["user", "shop", "searchResult", "numberOfProduct"]),
			navItems() {
				let items = [{ icon: "lock_open", title: "Sign in", link: "/signin" }];
				if (this.user) {
					items = [
						{ icon: "account_circle", title: "Profile", link: "/profile" }
					];
				}
				return items;
			},
			sideNavItems() {
				let items = [
					{
						icon: "lock_open",
						title: "Sign in",
						link: "/signin",
						click: "signinSet"
					},
					{ icon: "business", title: "Category", link: "/category" }
				];
				if (this.user) {
					items = [
						{ icon: "account_circle", title: "Profile", link: "/profile" },
						{ icon: "business", title: "Category", link: "/category" },
						{ icon: "store", title: "Shop", link: "/shop" },
						{ icon: "create", title: "Create", link: "/create" },
						{ icon: "chat", title: "Post", link: "/posts" }
					];
				}

				return items;
			}
		},
		watch: {
			numberOfProduct: function(newValue, oldValue) {
				if (newValue) {
					this.badgeAnimated = true;
					setTimeout(() => (this.badgeAnimated = false), 1000);
				}
			}
		},
		created() {
			this.init();
		},
		methods: {
			...mapMutations(["signupSet", "signinSet"]),
			init() {
				this.$store.commit("setNumberOfProduct");
			},
			signoutUser() {
				this.$store.dispatch("signoutUser");
			},
			handleSearch() {
				this.cardFlag = true;
				this.$store.dispatch("searchProduct", {
					any: this.searchInput
				});
			},
			refresh() {
				//console.log("clicked");
				for (let i = 0; i < 2; i++) {
					setTimeout(() => this.getAllProducts(), 500);
				}
				this.$router.push("/");
			},
			getAllProducts() {
				this.$store.dispatch("getAllProducts");
			},
			goToCart() {
				this.$router.push("/cart");
			},
			gotoSearchUser(id) {
				this.$router.push("/profile/" + id);
				this.clear();
			},
			gotoSearchShop(id) {
				this.$router.push("/shop/" + id);
				this.clear();
			},
			gotoSearchProduct(id) {
				this.$router.push("/product/" + id);
				this.clear();
			},
			clear() {
				this.searchInput = "";
				this.cardFlag = false;
				this.$store.commit("clearSearchResult");
			}
		}
	};
</script>

<style lang="scss" scoped>
	.bounce {
		animation: bounce 1s both;
	}
	@keyframes bounce {
		0%,
		20%,
		53%,
		80%,
		100% {
			transform: translate3d(0, 0, 0);
		}
		40%,
		43% {
			transform: translate3d(0, -10px, 0);
		}
		70% {
			transform: translate3d(0, -10px, 0);
		}
		90% {
			transform: translate3d(0, -10px, 0);
		}
	}
	.search__card {
		position: absolute;
		width: 100vw;
		z-index: 8;
		top: 100%;
		left: 0%;
	}
	.type {
		margin-left: 12px;
		color: rgba(231, 14, 14, 0.356);
	}
	.result {
		cursor: pointer;
		&:hover {
			color: rgba(83, 83, 83, 0.76);
		}
	}
	.badge {
		height: 0.5px !important;
		width: 0.5px !important;
	}
</style>
