
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { ProgramacionUI } from '../../models/programacion/programacion.ui';
import { ProgramacionModel } from '../../models/programacion/programacion.model';




@Injectable({
  providedIn: 'root',
})
export class  ProgramacionService {
  constructor() {

  }

  public   programacionList(payload?:any): Observable<ProgramacionUI[]>| null | undefined {

    return null;
  }
  public   programacionGet(id:number): Observable<ProgramacionUI>| null | undefined {

    return null;
  }


  public   programacionCreate(programacion:ProgramacionModel): Observable<any>| null | undefined {

    return null;
  }

  public   programacionUpdate(programacion:ProgramacionModel): Observable<any>| null | undefined {

    return null;
  }


  public   programacionDelete(id:number): Observable<any>| null | undefined {

    return null;
  }
}
