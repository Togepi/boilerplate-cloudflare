<script lang="ts">
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { authClient } from '$lib/auth-client';

	let { data }: PageProps = $props();

	let name = $state('');
	let message = $state('');
	let characterCount = $derived(message.length);
</script>

<div>
	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>
</div>
<hr />
<br />
<div>
	{#if data.session?.user}
		<img src={data.session.user.image} alt={data.session.user.name} />
		Hello {data.session.user.name}
		<button
			onclick={async () => {
				await authClient.signOut();
				invalidateAll();
			}}>Logout</button
		>
	{:else}
		<a class="mx-3 mt-12 rounded bg-blue-400 p-2 text-white hover:bg-blue-300" href="/login"
			>Login</a
		>
	{/if}
</div>

<div class="p-5">
	{#each data.messages as message}
		<div class="prose mt-2 flex flex-col space-y-2 p-2 shadow">
			<h3>{message.name} ({message.country})</h3>
			<p>{message.message}</p>
			<span class="text-xs text-gray-500">
				Créé le {message.createdAt}
			</span>
		</div>
	{:else}
		<p>No messages yet.</p>
	{/each}
</div>
<hr />
<form method="POST" use:enhance class=" space-y-4 p-12">
	<div class="flex flex-col">
		<label for="name">Nom</label>
		<input type="text" id="name" name="name" bind:value={name} />
	</div>
	<div class="flex flex-col">
		<label for="message">Message</label>
		<textarea id="msg" bind:value={message} name="message"></textarea>
		<span>{characterCount} caractères</span>
	</div>

	<button
		class="rounded bg-blue-400 px-3 py-2 hover:cursor-pointer hover:bg-blue-300"
		type="submit"
		disabled={characterCount < 5}>Submit</button
	>
</form>
