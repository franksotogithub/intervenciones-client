
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { EjecucionUI } from '../../models/ejecucion/ejecucion.ui';
import { EjecucionModel } from '../../models/ejecucion/ejecucion.model';





@Injectable({
  providedIn: 'root',
})
export class  EjecucionService {
  constructor() {

  }

  public   ejecucionList(payload?:any): Observable<EjecucionUI[]>| null | undefined {

    return null;
  }
  public   ejecucionGet(id:number): Observable<EjecucionUI>| null | undefined {

    return null;
  }


  public   ejecucionCreate(ejecucion:EjecucionModel): Observable<any>| null | undefined {

    return null;
  }

  public   ejecucionUpdate(ejecucion:EjecucionModel): Observable<any>| null | undefined {

    return null;
  }


  public   ejecucionDelete(id:number): Observable<any>| null | undefined {

    return null;
  }
}
