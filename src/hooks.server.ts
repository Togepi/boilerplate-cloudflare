import { env } from '$env/dynamic/private';
import { createLibSqlClient, createD1Client } from '$lib/server/db';
import type { Handle } from '@sveltejs/kit';
import { createAuth } from './auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';

const db = env.DATABASE_URL ? createLibSqlClient(env.DATABASE_URL) : null;

export const handle: Handle = async ({ event, resolve }) => {
	if (event.platform?.env.DB) {
		event.locals.db = createD1Client(event.platform.env.DB);
	} else if (db) {
		event.locals.db = db;
	} else {
		throw new Error('No database connection');
	}
	const auth = createAuth(event.locals.db);
	event.locals.auth = auth;
	return svelteKitHandler({ event, resolve, auth });
};
