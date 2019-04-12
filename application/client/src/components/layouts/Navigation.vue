<template>
	<div class="mb-3">
		<v-navigation-drawer temporary v-model="drawer" fixed app>
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
			<v-toolbar-title class="hidden-xs-only">
				<div>
					<span color="primary" style="cursor: pointer" @click="refresh">Gogonjo</span>
				</div>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-text-field
				flex
				prepend-icon="search"
				:placeholder="text"
				color="primary"
				single-line-hide-details
			></v-text-field>

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
				<v-badge color="primary">
					<template v-slot:badge>
						<span>1</span>
					</template>
					<div @click="goToCart" style="cursor: pointer">
						<v-icon>shopping_cart</v-icon>
					</div>
				</v-badge>
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
				drawer: false,
				text: "",
				txt: "Type to search (ex: iPhone XS)"
			};
		},
		computed: {
			...mapGetters(["user", "shop"]),
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
					}
				];
				if (this.user) {
					items = [
						{ icon: "account_circle", title: "Profile", link: "/profile" },
						{ icon: "business", title: "Department", link: "/department" },
						{ icon: "store", title: "Shop", link: "/shop" },
						{ icon: "create", title: "Create", link: "/create" },
						{ icon: "chat", title: "Post", link: "/posts" }
					];
				}

				return items;
			}
		},
		created() {},
		methods: {
			...mapMutations(["signupSet", "signinSet"]),
			signoutUser() {
				this.$store.dispatch("signoutUser");
			},
			refresh() {
				console.log("clicked");
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
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>
