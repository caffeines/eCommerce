<template>
	<v-app>
		<v-navigation-drawer v-model="drawer" fixed app :mini-variant="miniVariant" :clipped="clipped">
			<v-list>
				<v-list-tile
					v-for="(item, i) in items"
					:key="i"
					@click.stop="drawer = !drawer"
					:to="item.to"
					router
					exact
				>
					<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title v-text="item.title"/>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar
			:clipped-left="clipped"
			scroll-toolbar-off-screen
			fixed
			flat
			app
			color="rgba(255, 255, 255, 0)"
		>
			<v-toolbar-side-icon class="back" @click="drawer = !drawer"/>
			<nuxt-link to="/">
				<h2 class="heading-secondary mt-2" @click="drawer = false">gogonjo</h2>
			</nuxt-link>
			<v-spacer/>

			<v-btn icon>
				<i class="ion-md-search ion-logo" @click="drawer = false"></i>
			</v-btn>

			<v-btn icon>
				<i class="ion-md-heart-empty ion-logo" @click="drawer = false"></i>
			</v-btn>
			<v-btn icon @click.stop="rightDrawer = !rightDrawer" class="mar">
				<i class="ion-md-cart ion-logo" @click="drawer = false"></i>
			</v-btn>
		</v-toolbar>
		<v-content>
			<v-container>
				<nuxt/>
			</v-container>
		</v-content>
		<v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
			<v-list>
				<v-list-tile @click.native="right = !right">
					<v-list-tile-action>
						<v-icon light>compare_arrows</v-icon>
					</v-list-tile-action>
					<v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				clipped: true,
				drawer: false,
				fixed: false,
				items: [
					{
						icon: "home",
						title: "Welcome",
						to: "/"
					},
					{
						icon: "bubble_chart",
						title: "Department",
						to: "/inspire"
					},
					{
						icon: "account_box",
						title: "Sign in",
						to: "/login"
					}
				],
				miniVariant: false,
				right: true,
				rightDrawer: false,
				title: "Gogonjo"
			};
		}
	};
</script>

<style>
	.heading-secondary {
		font-size: 1.8rem;
		font-weight: 700;
		text-transform: uppercase;
		display: inline-block;
		background-image: linear-gradient(to right bottom, #5352ed, #f84f11);
		-webkit-background-clip: text;
		color: transparent;
		transition: all 0.2s;
		letter-spacing: 0.2rem;
	}
	.heading-secondary:hover {
		transform: scale(1.1) !important;
	}
	.mar {
		margin-left: -16px;
	}
	.toolbar {
		background-color: transparent;
		border: none;
	}
	.back {
		color: white;
	}
</style>

