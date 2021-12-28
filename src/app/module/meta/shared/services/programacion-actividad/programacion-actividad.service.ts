
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { ProgramacionActividadUI } from '../../models/programacion-actividad/programacion-actividad.ui';
import { ProgramacionActividadModel } from '../../models/programacion-actividad/programacion-actividad.model';






@Injectable({
  providedIn: 'root',
})

export class  ProgramacionActividadService  {
  constructor() {

  }

  public    programacionActividadList(payload?:any): Observable<ProgramacionActividadUI[]>| null | undefined {

    return null;
  }
  public    programacionActividadGet(id:number): Observable<ProgramacionActividadUI>| null | undefined {

    return null;
  }


  public    programacionActividadCreate(programacionActividad: ProgramacionActividadModel): Observable<any>| null | undefined {

    return null;
  }

  public    programacionActividadUpdate(programacionActividad:ProgramacionActividadModel): Observable<any>| null | undefined {

    return null;
  }


  public    programacionActividadDelete(id:number): Observable<any>| null | undefined {

    return null;
  }
}
