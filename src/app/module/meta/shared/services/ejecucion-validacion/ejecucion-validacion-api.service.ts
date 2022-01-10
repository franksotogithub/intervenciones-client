
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { FormatHelper } from '@app/util/format.helper';
import { EjecucionValidacionService } from './ejecucion-validacion.service';
import { EjecucionValidacionUI } from '../../models/ejecucion-validacion/ejecucion-validacion.ui';
import { EjecucionValidacionRequest } from '../../models/ejecucion-validacion/ejecucion-validacion.request';



@Injectable({
  providedIn: 'root',
})
export class EjecucionValidacionApiService extends EjecucionValidacionService {
  constructor(private http: HttpClient) {
    super();
  }

  public override ejecucionValidacionList(p?:any): Observable<EjecucionValidacionUI[]>| null | undefined {
    let payload=(p)?p:{};

    return this.http.post<GeneralDataRequest<EjecucionValidacionRequest[]>>(`${EndPoints.EJECUCION_VALIDACION_LIST}`,payload).pipe(map((res)=>{
      let response:EjecucionValidacionUI[]=[];
      if(res.status){


        response= res.data;
        /*response=   res.data;*/

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override ejecucionValidacionGet(id: number): Observable<EjecucionValidacionUI>| null | undefined {
    let payload= {eva_id:id}

    return this.http.post<GeneralDataRequest<EjecucionValidacionRequest[]>>(`${EndPoints.EJECUCION_VALIDACION_LIST}`,payload).pipe(map((res)=>{
      let response:EjecucionValidacionUI;
      if(res.status){
        /*response= FormatHelper.formatRequestEjecucionValidacion( res.data[0]);*/
        response= res.data[0];
      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override ejecucionValidacionCreate(ejecucionvalidacion: EjecucionValidacionUI): Observable<any>| null | undefined {
    ejecucionvalidacion.eva_id=0;
    let payload= ejecucionvalidacion

    return this.http.post<GeneralDataRequest<EjecucionValidacionUI[]>>(`${EndPoints.EJECUCION_VALIDACION_UPDATE}`,payload).pipe(map((res)=>{
      let response;
      if(res.status){
        response=  res.data[0];

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }


  public override ejecucionValidacionUpdate(ejecucionvalidacion: EjecucionValidacionUI): Observable<any>| null | undefined {
    let payload= ejecucionvalidacion

    return this.http.post<GeneralDataRequest<EjecucionValidacionUI[]>>(`${EndPoints.EJECUCION_VALIDACION_UPDATE}`,payload).pipe(map((res)=>{
      let response;
      if(res.status){
        response=  res.data[0];

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }


  public override ejecucionValidacionDelete(id:number): Observable<any>| null | undefined {
    let payload= {eva_id:id}

    return this.http.post<GeneralDataRequest<EjecucionValidacionUI[]>>(`${EndPoints.EJECUCION_VALIDACION_DELETE}`,payload).pipe(map((res)=>{
      let response;
      if(res.status){
        response= true;


      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }
}
