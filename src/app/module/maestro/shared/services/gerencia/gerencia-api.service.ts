
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

import { AccionUI } from "../../models/accion/accion.ui";
import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { GerenciaUI } from "../../models/gerencia/gerencia.ui";
import { GerenciaService } from './gerencia.service';


@Injectable({
  providedIn: 'root',
})
export class GerenciaApiService extends GerenciaService {
  constructor(private http: HttpClient) {
    super();
  }

  public override  gerenciaList(): Observable<GerenciaUI[]>| null | undefined {

    return this.http.post<GeneralDataRequest<GerenciaUI[]>>(`${EndPoints.GERENCIA_LIST}`,{}).pipe(map((res)=>{
      let response:GerenciaUI[]=[];
      if(res.status){
        response=  res.data;

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }



}
