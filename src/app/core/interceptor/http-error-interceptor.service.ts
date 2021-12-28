import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, EMPTY, throwError, of } from 'rxjs';
/*import { Observable, throwError } from 'rxjs';*/
import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor( private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      // retry(1),
      catchError((error: HttpErrorResponse) => {
        // console.error("error",error);
        this.token_error(error, request);


        if (error.status != 403) {

          let errorMessage = '';

          return throwError(errorMessage);
        }

        return EMPTY;
      }));
  }

  /*
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        // retry(1),
        catchError((error: HttpErrorResponse) => {
          // console.error("error",error);
          this.token_error(error, request);


          if (error.status != 403) {

            let errorMessage = '';

            return throwError(errorMessage);
          }
        })
      )
  }*/

  token_error(error: HttpErrorResponse, request: HttpRequest<any>){
    if (error.status == 401) {
      console.log('Token no valido');
      this.goLogin();
    }else if(error.status == 403){
      console.log('Token expirado');
      this.goLogin();
    }
  }

  goLogin(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
