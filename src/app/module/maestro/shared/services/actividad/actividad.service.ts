import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ActividadModel } from '../../models/actividad/actividad.model';
import { ActividadUI } from '../../models/actividad/actividad.ui';



@Injectable({
  providedIn: 'root',
})
export class ActividadService {
  constructor() {}

  public actividadList( p?:any): Observable<ActividadUI[]>| null | undefined {
    return;
  }
  public actividadGet(id:number):Observable<ActividadUI>| null | undefined{
    return;
  }


  public actividadUpdate(actividad: ActividadModel):Observable<boolean>| null | undefined{
    return;
  }


  public actividadCreate(actividad: ActividadModel):Observable<boolean>| null | undefined{
    return;
  }

  public  actividadDelete(id: number):Observable<boolean>| null | undefined{
    return;
  }
}
