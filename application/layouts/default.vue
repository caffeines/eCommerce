<template>
	<v-app>
		<v-navigation-drawer temporary v-model="drawer" fixed app>
			<v-toolbar fixed>
				<v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
				<v-toolbar-title>
					<nuxt-link to="/" tag="span" style="cursor: pointer">Gogonjo</nuxt-link>
				</v-toolbar-title>
			</v-toolbar>
			<v-divider></v-divider>
			<v-divider></v-divider>
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
				<nuxt-link to="/" tag="span" style="cursor: pointer">Gogonjo</nuxt-link>
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
			<v-toolbar-items class="hidden-xs-only">
				<v-btn flat v-for="item in navItems" :key="item.title" :to="item.link">
					<v-icon class="hidden-sm-only">{{item.icon}}</v-icon>
					<div>{{item.title}}</div>
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>

		<v-content>
			<v-container>
				<nuxt/>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				drawer: false
			};
		},
		computed: {
			navItems() {
				return [
					{ icon: "chat", title: "Post", link: "/posts" },
					{ icon: "lock_open", title: "Sign in", link: "/signin" },
					{ icon: "create", title: "Sign up", link: "/signup" }
				];
			},
			sideNavItems() {
				return [
					{ icon: "", title: "", link: "/" },
					{ icon: "chat", title: "Post", link: "/posts" },
					{ icon: "lock_open", title: "Sign in", link: "/signin" },
					{ icon: "create", title: "Sign up", link: "/signup" }
				];
			}
		}
	};
</script>
