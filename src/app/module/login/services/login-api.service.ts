import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable, of } from 'rxjs';


import { map, catchError, switchMap } from 'rxjs/operators';
import { GeneralSessionUI } from '../models/ui/generalSession.ui';
import { LoginModel } from '../models/login.model';
import { FormatHelper } from '@app/util/format.helper';
import { GeneralSessionRequest } from '../models/request/generalSession.request';
import { EndPoints } from '@app/global/end-points';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService extends LoginService {
  constructor(private http: HttpClient) {
    super();
  }

  public  override login(data: LoginModel): Observable<GeneralSessionUI>| null | undefined {
    const requestBody = FormatHelper.formatRequestLogin(data);


    return this.http.post<GeneralSessionRequest>(`${EndPoints.LOGIN}`,requestBody).pipe(map((res)=>{
      let response:GeneralSessionUI ;

      if(res.status){

        response=FormatHelper.formatResponseGeneralSession(res);

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })

    /*,
    catchError((err) => {

      return of(null);
    })*/


    );

  }


  /*public login(data: LoginModel): Observable<GeneralSessionUI> {
    const requestBody = FormatHelper.formatRequestLogin(data);



      return this.http.post<GeneralSessionRequest>(`${EndPoints.LOGIN}`,requestBody).pipe(map((res)=>{
        let response:GeneralSessionUI = null;

        if(res.status){

          response=FormatHelper.formatResponseGeneralSession(res);

        } else {
          throw new Error('No se ha logrado obtener datos del servidor');
        }
        return response;

      }),
      catchError((err) => {

        return of(null);
      })


      )
  }*/
}
