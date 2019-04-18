<template>
	<Carousel :items="items"/>
</template>
<script>
	import Carousel from "@/components/Carousel";
	export default {
		components: {
			Carousel
		},
		data() {
			return {
				color: "red",
				snackbar: false,
				items: [
					{
						src:
							"https://images.pexels.com/photos/1345082/pexels-photo-1345082.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
					},
					{
						src:
							"https://images.pexels.com/photos/749353/pexels-photo-749353.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
					},
					{
						src:
							"https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
					},
					{
						src:
							"https://images.pexels.com/photos/1078973/pexels-photo-1078973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
					},
					{
						src:
							"https://images.pexels.com/photos/944031/pexels-photo-944031.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
					}
				]
			};
		}
	};
</script>
