
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionUI } from '@app/module/login/models/ui/session.ui';

/*import { AuthService } from '../services/auth.service';*/

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    /*let currentUser = this.authenticationService.currentUserValue;*/


    let l=localStorage.getItem('currentUser');
    const currentUser : SessionUI |null= l?JSON.parse(l):null;


    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          'x-access-token': `${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}
