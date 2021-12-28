import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AccionModel } from '../../models/accion/accion.model';
import { AccionUI } from '../../models/accion/accion.ui';




@Injectable({
  providedIn: 'root',
})
export class AccionService {
  constructor() {}

  public accionList( p?:any ): Observable<AccionUI[]>| null | undefined {
    return;
  }
  public accionGet( id:number): Observable<AccionUI>| null | undefined {
    return;
  }

  public accionUpdate(accion: AccionModel):Observable<boolean>| null | undefined{
    return;
  }
  public accionCreate(accion: AccionModel):Observable<boolean>| null | undefined{
    return;
  }

  public  accionDelete(id: number):Observable<boolean>| null | undefined{
    return;
  }
}
