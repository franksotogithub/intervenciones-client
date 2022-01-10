
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { EjecucionEvidenciaUI } from '../../models/ejecucion-evidencia/ejecucion-evidencia.ui';







@Injectable({
  providedIn: 'root',
})
export class  EjecucionEvidenciaService {
  constructor() {

  }

  public   ejecucionEvidenciaList(payload?:any): Observable<EjecucionEvidenciaUI[]>| null | undefined {

    return null;
  }
  public   ejecucionEvidenciaGet(id:number): Observable<EjecucionEvidenciaUI>| null | undefined {

    return null;
  }


  public   ejecucionEvidenciaCreate(ejecucionactividad:EjecucionEvidenciaUI): Observable<any>| null | undefined {

    return null;
  }

  public   ejecucionEvidenciaUpdate(ejecucionactividad:EjecucionEvidenciaUI): Observable<any>| null | undefined {

    return null;
  }


  public   ejecucionEvidenciaDelete(id:number): Observable<any>| null | undefined {

    return null;
  }
}
