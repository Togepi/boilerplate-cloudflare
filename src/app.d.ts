// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
/// <reference types="./worker-configuration" />
import type { DrizzleClient } from '$lib/server/db';
import type { BetterAuth } from './auth';
declare global {
	namespace App {
		interface Platform {
			env: Env;
			cf: CfProperties;
			ctx: ExecutionContext;
		}
		interface Locals {
			db: DrizzleClient;
			auth: BetterAuth;
		}
	}
}

export {};
