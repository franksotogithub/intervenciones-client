import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IndicadorModel } from '../../models/indicador/indicador.model';
import { IndicadorUI } from '../../models/indicador/indicador.ui';




@Injectable({
  providedIn: 'root',
})
export class IndicadorService {
  constructor() {}

  public indicadorList( ): Observable<IndicadorUI[]>| null | undefined {
    return;
  }
  public indicadorGet(id:number ): Observable<IndicadorUI>| null | undefined {
    return;
  }
  public indicadorUpdate(Indicador: IndicadorModel):Observable<boolean>| null | undefined{
    return;
  }
  public indicadorCreate(Indicador: IndicadorModel):Observable<boolean>| null | undefined{
    return;
  }

  public  indicadorDelete(id: number):Observable<boolean>| null | undefined{
    return;
  }
}
