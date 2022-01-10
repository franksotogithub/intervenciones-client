
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { EjecucionActividadUI } from '../../models/ejecucion-actividad/ejecucion-actividad.ui';
import { EjecucionActividadModel } from '../../models/ejecucion-actividad/ejecucion-actividad.model';






@Injectable({
  providedIn: 'root',
})
export class  EjecucionActividadService {
  constructor() {

  }

  public   ejecucionActividadList(payload?:any): Observable<EjecucionActividadUI[]>| null | undefined {

    return null;
  }
  public   ejecucionActividadGet(id:number): Observable<EjecucionActividadUI>| null | undefined {

    return null;
  }


  public   ejecucionActividadCreate(ejecucionactividad:EjecucionActividadModel): Observable<any>| null | undefined {

    return null;
  }

  public   ejecucionActividadUpdate(ejecucionactividad:EjecucionActividadModel): Observable<any>| null | undefined {

    return null;
  }


  public   ejecucionActividadDelete(id:number): Observable<any>| null | undefined {

    return null;
  }
}
