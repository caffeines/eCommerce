<template>
	<div>
		<vue-typer
			:text="text"
			:repeat="Infinity"
			:shuffle="false"
			initial-action="typing"
			:pre-type-delay="70"
			:type-delay="70"
			:pre-erase-delay="3000"
			:erase-delay="70"
			erase-style="backspace"
			:erase-on-complete="false"
			caret-animation="expand"
		></vue-typer>
	</div>
</template>
<script>
	export default {
		props: ["text"],
		data() {
			return {};
		}
	};
</script>

<style lang="scss">
	.vue-typer .custom.char.typed {
		color: #ef5350e0;
	}
	.vue-typer .custom.caret {
		width: 2px;
		background-color: #ef5350e0;
		//display: none;
	}
</style>
