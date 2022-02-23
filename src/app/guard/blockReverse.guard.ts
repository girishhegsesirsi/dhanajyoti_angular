import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BlockReverseGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser);
    console.log("state.url: "+state.url);
    if (currentUser) {
        // authorised so return true
        console.log("inside BlockReverseGaurd");
        console.log("state.url: "+state.url)
        return true;
    }
            
            return false;
  }
  
}
