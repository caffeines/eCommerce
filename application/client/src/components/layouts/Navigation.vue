<template>
	<div class="mb-3">
		<v-navigation-drawer temporary v-model="drawer" fixed app>
			<v-toolbar fixed>
				<v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
				<v-toolbar-title>
					<router-link to="/" tag="span" style="cursor: pointer">Gogonjo</router-link>
				</v-toolbar-title>
			</v-toolbar>

			<v-list>
				<v-list-tile v-for="item in sideNavItems" :key="item.title" :to="item.link" router exact>
					<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title v-text="item.title"/>
					</v-list-tile-content>
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
				placeholder="Search here"
				color="info"
				single-line-hide-details
			></v-text-field>

			<v-spacer></v-spacer>

			<!-- Icon & Items -->
			<div class="hidden-xs-only">
				<v-btn flat v-for="item in navItems" :key="item.title" :to="item.link">
					<v-icon class="hidden-sm-only">{{item.icon}}</v-icon>
					<div>{{item.title}}</div>
				</v-btn>
			</div>
			<div>
				<v-badge right color="red" dark>
					<span slot="badge">1</span>.
					<v-btn flat :to="'/cart'">
						<i class="material-icons">shopping_cart</i>
					</v-btn>
				</v-badge>
			</div>
		</v-toolbar>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {
				drawer: false
			};
		},
		computed: {
			...mapGetters(["user"]),
			navItems() {
				let items = [
					{ icon: "lock_open", title: "Sign in", link: "/signin" },
					{ icon: "create", title: "Sign up", link: "/signup" }
				];
				if (this.user) {
					items = [{ icon: "account_circle", title: "Profile", link: "/cart" }];
				}
				return items;
			},
			sideNavItems() {
				let items = [
					{ icon: "", title: "", link: "/" },
					{ icon: "lock_open", title: "Sign in", link: "/signin" },
					{ icon: "create", title: "Sign up", link: "/signup" }
				];
				if (this.user) {
					items = [
						{ icon: "", title: "", link: "/" },
						{ icon: "account_circle", title: "Profile", link: "/cart" },
						{ icon: "chat", title: "Post", link: "/posts" },
						{ icon: "create", title: "Sign out", link: "/signin" }
					];
				}
				return items;
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>
