import { HttpClient } from './HttpClient';

class Api {
	httpClient: HttpClient;
	constructor() {
		this.httpClient = new HttpClient();
	}

	// USER
	async sendVerificationEmail(email: string) {
		return this.httpClient.post('/users/send-verification-email', { email });
	}
}

export const api = new Api();
