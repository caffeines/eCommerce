<template>
	<div>
		<carousel :items="items"></carousel>
	</div>
</template>

<script>
	import carousel from "~/components/carousel.vue";
	export default {
		components: {
			carousel
		},
		data: () => {
			return {
				items: [
					{
						sub_title: "Women collection 2019",
						title: "new arrivals",
						src: "./slide-01.jpg"
					},
					{
						sub_title: "men collection 2019",
						title: "new arrivals",
						src: "./slide-02.jpg"
					},
					{
						sub_title: "ড্রেস কালেকশন ২০১৯",
						title: "নতুন আগমন",
						src: "./slide-03.jpg"
					}
				]
			};
		}
	};
</script>
