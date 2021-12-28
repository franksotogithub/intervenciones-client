
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnidadMedidaModel } from '../../models/unidad-medida/unidad-medida.model';
import { UnidadMedidaUI } from '../../models/unidad-medida/unidad-medida.ui';

@Injectable({
  providedIn: 'root',
})
export class UnidadMedidaService {
  constructor() {}

  public unidadMedidaList( ): Observable<UnidadMedidaUI[]>| null | undefined {
    return;
  }
  public unidadMedidaGet(id:number):Observable<UnidadMedidaUI>| null | undefined{
    return;
  }
  public unidadMedidaUpdate(unidadMedida: UnidadMedidaModel):Observable<boolean>| null | undefined{
    return;
  }


  public unidadMedidaCreate(unidadMedida: UnidadMedidaModel):Observable<boolean>| null | undefined{
    return;
  }

  public  unidadMedidaDelete(id: number):Observable<boolean>| null | undefined{
    return;
  }
}
