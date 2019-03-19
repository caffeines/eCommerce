<template>
	<v-layout>
		<v-flex xs12 sm12>
			<v-layout wrap>
				<v-flex v-for="n in 5" :key="n" xs2 d-flex>
					<v-img
						v-for="i in slider.imageSrc"
						:key="i"
						:src="i"
						:lazy-src="i"
						aspect-ratio="1"
						class="grey lighten-2 _img-margin"
					></v-img>
					<template v-slot:placeholder>
						<v-layout fill-height align-center justify-center ma-0>
							<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
						</v-layout>
					</template>
				</v-flex>
			</v-layout>
		</v-flex>
	</v-layout>
</template>

<script>
	import Modal from "./Modal.vue";
	export default {};
</script>


