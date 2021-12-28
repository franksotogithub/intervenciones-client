
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

import { AccionUI } from "../../models/accion/accion.ui";
import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { SubGerenciaUI } from '../../models/subgerencia/subgerencia.ui';
import { SubGerenciaService } from './subgerencia.service';



@Injectable({
  providedIn: 'root',
})
export class SubGerenciaApiService extends SubGerenciaService {
  constructor(private http: HttpClient) {
    super();
  }

  public override  subGerenciaList(): Observable<SubGerenciaUI[]>| null | undefined {

    return this.http.post<GeneralDataRequest<SubGerenciaUI[]>>(`${EndPoints.SUBGERENCIA_LIST}`,{}).pipe(map((res)=>{
      let response:SubGerenciaUI[]=[];
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
