import { betterAuth } from 'better-auth';
import type { DrizzleClient } from './lib/server/db';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as schema from './lib/server/db/schema';
import { env } from '$env/dynamic/private';
import { emailOTP } from 'better-auth/plugins'

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
		},
    plugins : [
      emailOTP({
        async sendVerificationOTP({
          email,
          otp,
          type
        })
        {
          if( type === "sign-in")
          {
            console.log(`Sending OTP login to ${email} : ${otp}`);
          }
        },
      })
    ]
	});
};

export type BetterAuth = ReturnType<typeof createAuth>;
