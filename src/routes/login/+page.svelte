<script lang="ts">
	import { authClient } from '$lib/auth-client';
	async function logingWithGoogle() {
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: '/',
			errorCallbackURL: '/',
			newUserCallbackURL: '/'
		});
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-12">
	<h1>Login</h1>
	<button class="rounded bg-neutral-100 p-2" on:click={logingWithGoogle}>Login with Google</button>
</div>
