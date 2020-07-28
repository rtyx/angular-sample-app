import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private tokenService: TokenService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.tokenService.getToken()) {
      return true;
    } else {
      this.router.navigate(['welcome', 'log-in'], {queryParams: {returnUrl: state.url}, queryParamsHandling: 'merge'});
      return false;
    }
  }

}
