import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {
  }

  public intercept(request: HttpRequest<any>, httpHandler: HttpHandler): Observable<any> {
    // In a more realistic scenario we'd add an Authorization header, but our API doesn't like it
    // request = this.addAuthHeader(request);

    return httpHandler.handle(request);
  }

  public addAuthHeader(request): any {
    if (this.tokenService.getToken()) {
      return request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.tokenService.getToken()}`
        }
      });
    } else {
      return request;
    }
  }
}
