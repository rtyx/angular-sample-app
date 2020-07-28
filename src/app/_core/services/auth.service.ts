import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

interface SignInResponse {
  token: string;
}

interface SignUpResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService,
              private tokenService: TokenService) {
  }

  public signIn(email: string, password: string): Observable<SignInResponse> {
    const req = this.apiService.post<SignInResponse>('log-in', {email, password,});

    req.subscribe((res) => {
        this.tokenService.saveToken(res.token);
      },
      (err) => {
        console.error(err);
      }
    );

    return req;
  }

  public signUp(name: string, email: string, password: string): Observable<SignUpResponse> {
    const req = this.apiService.post<SignUpResponse>('sign-up', {name, email, password});

    req.subscribe(
      (res) => {
        this.tokenService.saveToken(res.token);
      },
      (err) => {
        console.error(err);
      }
    );

    return req;
  }

  public signOut(): void {
    this.tokenService.destroyToken();
    window.location.reload();
  }

}
