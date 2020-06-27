import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { AuthenticationAdminService } from './authentication-admin.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req, next){
    let authenticationService = this.injector.get(AuthenticationService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authenticationService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }

  interceptAdmin(req, next){
    let authenticationAdminService = this.injector.get(AuthenticationAdminService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authenticationAdminService.getTokenAdmin()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
