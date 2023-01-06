import { API_URL } from '../config/env';
import axios, { type AxiosInstance } from 'axios';

export const BASE_URL: string = API_URL;

export class HttpClient {
	axios: AxiosInstance;
	constructor() {
		this.axios = axios.create({
			baseURL: BASE_URL,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			withCredentials: true
		});
	}

	get(url: string) {
		return this.axios.get(url);
	}

	post(url: string, data: any) {
		return this.axios.post(url, data);
	}

	patch(url: string, data: any) {
		return this.axios.patch(url, data);
	}

	delete(url: string) {
		return this.axios.delete(url);
	}
}
