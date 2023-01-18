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
	async verifyToken(token: string) {
		return this.httpClient.post('/users/verify-token', { token });
	}
}

export const api = new Api();
