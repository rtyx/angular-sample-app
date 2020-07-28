import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TokenService {

	public getToken(): string {
		return window.localStorage.getItem('token');
	}

	public saveToken(token: string) {
		window.localStorage.setItem('token', token);
	}

	public destroyToken() {
		window.localStorage.removeItem('token');
	}

}
