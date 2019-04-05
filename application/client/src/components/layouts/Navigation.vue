<template>
	<div class="mb-3">
		<v-navigation-drawer temporary v-model="drawer" fixed app>
			<v-toolbar fixed>
				<v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
				<v-toolbar-title>
					<router-link to="/" tag="span" style="cursor: pointer">
						<span color="primary">Gogonjo</span>
					</router-link>
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

		<v-toolbar fixed app>
			<v-toolbar-side-icon @click="drawer = !drawer"/>
			<v-toolbar-title class="hidden-xs-only">
				<router-link to="/" tag="span" style="cursor: pointer">Gogonjo</router-link>
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
				<v-btn flat v-for="item in navItems" :key="item.title" :to="item.link">
					<v-icon class="hidden-sm-only">{{item.icon}}</v-icon>
					<div>{{item.title}}</div>
				</v-btn>
				<v-btn flat v-if="user" @click="signoutUser">
					<v-icon class="hidden-sm-only">exit_to_app</v-icon>Signout
				</v-btn>
			</div>
			<div>
				<v-btn flat :to="'/cart'">
					<i class="material-icons">shopping_cart</i>
				</v-btn>
			</div>
		</v-toolbar>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {
				drawer: false,
				text: "",
				txt: "Type to search (ex: iPhone XS)"
			};
		},
		computed: {
			...mapGetters(["user"]),
			navItems() {
				let items = [
					{ icon: "lock_open", title: "Sign in", link: "/signin" },
					{ icon: "how_to_reg", title: "Sign up", link: "/signup" }
				];
				if (this.user) {
					items = [
						{ icon: "account_circle", title: "Profile", link: "/profile" }
					];
				}
				return items;
			},
			sideNavItems() {
				let items = [
					{ icon: "lock_open", title: "Sign in", link: "/signin" },
					{ icon: "how_to_reg", title: "Sign up", link: "/signup" }
				];
				if (this.user) {
					items = [
						{ icon: "store", title: "Department", link: "/department" },
						{ icon: "create", title: "Create", link: "/create" },
						{ icon: "account_circle", title: "Profile", link: "/profile" },
						{ icon: "chat", title: "Post", link: "/posts" }
					];
				}
				return items;
			}
		},
		created() {},
		methods: {
			signoutUser() {
				this.$store.dispatch("signoutUser");
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>
