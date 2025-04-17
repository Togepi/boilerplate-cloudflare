import { betterAuth } from 'better-auth';
import type { DrizzleClient } from './lib/server/db';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as schema from './lib/server/db/schema';
import { env } from '$env/dynamic/private';

export const createAuth = function (database: DrizzleClient) {
	return betterAuth({
		database: drizzleAdapter(database, {
			schema,
			provider: 'sqlite'
		}),
		socialProviders: {
			google: {
				clientId: env.GOOGLE_CLIENT_ID as string,
				clientSecret: env.GOOGLE_CLIENT_SECRET as string
			}
		}
	});
};

export type BetterAuth = ReturnType<typeof createAuth>;
