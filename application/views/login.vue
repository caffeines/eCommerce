<template>
	<div>
		<div class="row">
			<div class="col-sm-4"></div>
			<div class="col-sm-4">
				<div class="ccard">
					<div class="ccard__side">
						<form action="#" class="form">
							<div class="mb-2 mt-1">
								<h3 class="heading-secondary">Sign in here</h3>
							</div>
							<div class="form__group">
								<input type="email" class="form__input" placeholder="Email address" id="email" required>
								<label for="email" class="form__lebel form__lebel-mail">Eamil address</label>
							</div>
							<div class="form__group">
								<input type="password" class="form__input" placeholder="Password" id="password" required>
								<label for="password" class="form__lebel form__lebel-pass">Password</label>
							</div>

							<div class="form__group u-margin-top-big">
								<button class="cbtn cbtn-primary">Sign in</button>
							</div>
							<div class="forgot text-center">
								<a href="#" class="cbtn-text">Forgot Password &#63;</a>
							</div>
						</form>
						<div class="via__social">
							<i class="cbtn cbtn__icon-white ion-logo-facebook ion-logo"></i>
							<i class="cbtn cbtn__icon-white ion-logo-twitter ion-logo"></i>
							<i class="cbtn cbtn__icon-white ion-logo-google ion-logo"></i>
						</div>
						<div class="text-center">
							<a href="#" class="cbtn-text">Sign up &rarr;</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {}
	};
</script>


<style scoped>
</style>