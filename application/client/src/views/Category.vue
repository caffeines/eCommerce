<template>
	<div class="mt-5 ml-2">
		<v-layout row wrap justify-space-around fill-height>
			<v-flex class="mt-3" xs4 sm3 lg2 md3 xl2 v-for="it in item" :key="'it'">
				<v-hover>
					<v-avatar size="200px" slot-scope="{ hover }" class="mx-auto">
						<v-img :src="it.src" @click="go(it.link)">
							<v-expand-transition>
								<div
									v-if="hover"
									class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-1 white--text"
									style="height: 100%;"
								>{{it.title}}</div>
							</v-expand-transition>
						</v-img>
					</v-avatar>
				</v-hover>
			</v-flex>
		</v-layout>
		<div class="mb-5"></div>
	</div>
</template>
<script>
	export default {
		name: "category",
		data() {
			return {
				item: [
					{
						src:
							"https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80",
						title: "Dress",
						link: "/dress"
					},
					{
						src:
							"https://images.unsplash.com/photo-1478144592103-25e218a04891?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
						title: "Food",
						link: "/food"
					},
					{
						src:
							"https://images.unsplash.com/photo-1467951591042-f388365db261?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
						title: "Book",
						link: "/book"
					},
					{
						src:
							"https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
						title: "Electronics",
						link: "/electronics"
					},
					{
						src:
							"https://images.unsplash.com/photo-1533483595632-c5f0e57a1936?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
						title: "Baby",
						link: "/baby"
					},
					{
						src:
							"https://images.unsplash.com/photo-1551298698-66b830a4f11c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1558&q=80",
						title: "Furniture",
						link: "/furniture"
					},
					{
						src:
							"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
						title: "Animal",
						link: "/animal"
					},
					{
						src:
							"https://images.unsplash.com/photo-1508003516679-e4bb1a0bb0d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
						title: "Arts",
						link: "/arts"
					},
					{
						src:
							"https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
						title: "Hardware",
						link: "/hardware"
					},
					{
						src:
							"https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1402&q=80",
						title: "Health & Beauty",
						link: "/health & beauty"
					},
					{
						src:
							"https://images.unsplash.com/photo-1467970767472-2488be1b8362?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1533&q=80",
						title: "Home & Garden",
						link: "/home & garden"
					},
					{
						src:
							"https://images.unsplash.com/photo-1452451312475-5055e48f74cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80",
						title: "Media",
						link: "/media"
					},
					{
						src:
							"https://images.unsplash.com/photo-1454587399083-b11b22f48fb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
						title: "Office Supplies",
						link: "/office supplies"
					},
					{
						src:
							"https://www.colourbox.com/preview/12325105-religion-icon-set.jpg",
						title: "Religious & Ceremonial",
						link: "/religious & ceremonial"
					},
					{
						src:
							"https://images.unsplash.com/photo-1515524738708-327f6b0037a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
						title: "Software",
						link: "/software"
					},
					{
						src:
							"https://images.unsplash.com/photo-1511886929837-354d827aae26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
						title: "Sporting Goods",
						link: "/sporting goods"
					},
					{
						src:
							"https://images.unsplash.com/10/wii.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
						title: "Toys & Games",
						link: "/toys & games"
					},
					{
						src:
							"https://images.unsplash.com/photo-1544474650-6cf5bc3f9c0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1444&q=80",
						title: "Vehicles & Parts",
						link: "/vehicles & parts"
					}
				]
			};
		},
		methods: {
			go(link) {
				this.$router.push("/category" + link);
			}
		}
	};
</script>
<style lang="scss" scoped>
	.text {
		display: block;
		color: #999;
		font-size: 19px;
		margin: 10px auto;
	}
</style>
