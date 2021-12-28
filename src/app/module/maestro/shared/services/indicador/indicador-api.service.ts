
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

import { AccionUI } from "../../models/accion/accion.ui";
import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { IndicadorUI } from '../../models/indicador/indicador.ui';
import { IndicadorService } from './indicador.service';
import { IndicadorModel } from '../../models/indicador/indicador.model';


@Injectable({
  providedIn: 'root',
})
export class IndicadorApiService extends IndicadorService {
  constructor(private http: HttpClient) {
    super();
  }

  public override  indicadorList(): Observable<IndicadorUI[]>| null | undefined {

    return this.http.post<GeneralDataRequest<IndicadorUI[]>>(`${EndPoints.INDICADOR_LIST}`,{}).pipe(map((res)=>{
      let response:IndicadorUI[]=[];
      if(res.status){
        response=  res.data;

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override indicadorGet(id:number ): Observable<IndicadorUI>| null | undefined {
    let payload = {ind_id:id};
    return this.http.post<GeneralDataRequest<IndicadorUI[]>>(`${EndPoints.INDICADOR_LIST}`,payload).pipe(map((res)=>{
      let response:IndicadorUI;
      if(res.status){
        response=  res.data[0];

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override indicadorUpdate(Indicador: IndicadorModel):Observable<boolean>| null | undefined{
    let payload = Indicador;
    return this.http.post<GeneralDataRequest<any>>(`${EndPoints.INDICADOR_UPDATE}`,payload).pipe(map((res)=>{
    let response;

    if(res.status){
      response=true;

    } else {
      throw new Error('No se ha logrado obtener datos del servidor');
    }
    return response;

  })

  );
  }

  public override indicadorCreate(Indicador: IndicadorModel):Observable<boolean>| null | undefined{
    Indicador.ind_id=0;
    let payload = Indicador;

    return this.http.post<GeneralDataRequest<any>>(`${EndPoints.INDICADOR_UPDATE}`,payload).pipe(map((res)=>{
    let response;

    if(res.status){
      response=true;


    } else {
      throw new Error('No se ha logrado obtener datos del servidor');
    }
    return response;

  })

  );


}

  public override indicadorDelete(id: number):Observable<boolean>| null | undefined{
    let payload = {act_id:id};
    return this.http.post<GeneralDataRequest<any>>(`${EndPoints.INDICADOR_DELETE}`,payload).pipe(map((res)=>{
    let response;

    if(res.status){
      response=true;


    } else {
      throw new Error('No se ha logrado obtener datos del servidor');
    }
    return response;

  })

  );
}

}
