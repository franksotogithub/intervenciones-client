
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { EjecucionValidacionUI } from '../../models/ejecucion-validacion/ejecucion-validacion.ui';








@Injectable({
  providedIn: 'root',
})
export class  EjecucionValidacionService {
  constructor() {

  }

  public   ejecucionValidacionList(payload?:any): Observable<EjecucionValidacionUI[]>| null | undefined {

    return null;
  }
  public   ejecucionValidacionGet(id:number): Observable<EjecucionValidacionUI>| null | undefined {

    return null;
  }


  public   ejecucionValidacionCreate(ejecucionactividad:EjecucionValidacionUI): Observable<any>| null | undefined {

    return null;
  }

  public   ejecucionValidacionUpdate(ejecucionactividad:EjecucionValidacionUI): Observable<any>| null | undefined {

    return null;
  }


  public   ejecucionValidacionDelete(id:number): Observable<any>| null | undefined {

    return null;
  }
}
