import { guestbookMessages } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ request, locals }) => {
	const session = await locals.auth.api.getSession({ headers: request.headers });
	const messages = await locals.db
		.select()
		.from(guestbookMessages)
		.limit(10)
		.orderBy(desc(guestbookMessages.createdAt));
	return {
		session,
		messages
	};
};

export const actions = {
	default: async ({ request, platform, locals }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const message = formData.get('message');
		const country = platform?.cf?.country ?? 'Unknown';

		await locals.db
			.insert(guestbookMessages)
			.values({ name: name as string, message: message as string, country: country as string });
		return { sucess: true };
	}
} satisfies Actions;
