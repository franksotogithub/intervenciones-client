
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { FormatHelper } from '@app/util/format.helper';

import { EjecucionActividadUI } from '../../models/ejecucion-actividad/ejecucion-actividad.ui';
import { EjecucionActividadRequest } from '../../models/ejecucion-actividad/ejecucion-actividad.request';
import { EjecucionActividadModel } from '../../models/ejecucion-actividad/ejecucion-actividad.model';
import { EjecucionActividadService } from './ejecucion-actividad.service';







@Injectable({
  providedIn: 'root',
})
export class EjecucionActividadApiService extends EjecucionActividadService {
  constructor(private http: HttpClient) {
    super();
  }

  public override ejecucionActividadList(p?:any): Observable<EjecucionActividadUI[]>| null | undefined {
    let payload=(p)?p:{};

    return this.http.post<GeneralDataRequest<EjecucionActividadRequest[]>>(`${EndPoints.EJECUCION_ACTIVIDAD_LIST}`,payload).pipe(map((res)=>{
      let response:EjecucionActividadUI[]=[];
      if(res.status){

        /*response= res.data.map(r=> {return  FormatHelper.formatRequestEjecucionActividad(r) });*/
        response= res.data;
        /*response=   res.data;*/

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override ejecucionActividadGet(id: number): Observable<EjecucionActividadUI>| null | undefined {
    let payload= {eac_id:id}

    return this.http.post<GeneralDataRequest<EjecucionActividadRequest[]>>(`${EndPoints.EJECUCION_ACTIVIDAD_LIST}`,payload).pipe(map((res)=>{
      let response:EjecucionActividadUI;
      if(res.status){
        /*response= FormatHelper.formatRequestEjecucionActividad( res.data[0]);*/
        response= res.data[0];
      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override ejecucionActividadCreate(ejecucionactividad: EjecucionActividadModel): Observable<any>| null | undefined {
    ejecucionactividad.eac_id=0;
    let payload= ejecucionactividad

    return this.http.post<GeneralDataRequest<EjecucionActividadUI[]>>(`${EndPoints.EJECUCION_ACTIVIDAD_UPDATE}`,payload).pipe(map((res)=>{
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


  public override ejecucionActividadUpdate(ejecucionactividad: EjecucionActividadModel): Observable<any>| null | undefined {
    let payload= ejecucionactividad

    return this.http.post<GeneralDataRequest<EjecucionActividadUI[]>>(`${EndPoints.EJECUCION_ACTIVIDAD_UPDATE}`,payload).pipe(map((res)=>{
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


  public override ejecucionActividadDelete(id:number): Observable<any>| null | undefined {
    let payload= {eac_id:id}

    return this.http.post<GeneralDataRequest<EjecucionActividadUI[]>>(`${EndPoints.EJECUCION_ACTIVIDAD_DELETE}`,payload).pipe(map((res)=>{
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
