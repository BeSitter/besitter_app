import stores from '../stores';

export async function initRegistrationStore(token: string) {
	const { registrationStore } = stores;
	try {
		await registrationStore.init(token);
	} catch (err) {
		console.error('[initRegistrationStore] error on init', err);
	}
}
