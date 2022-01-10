
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { FormatHelper } from '@app/util/format.helper';


import { EjecucionEvidenciaService } from './ejecucion-evidencia.service';
import { EjecucionEvidenciaUI } from '../../models/ejecucion-evidencia/ejecucion-evidencia.ui';
import { EjecucionEvidenciaRequest } from '../../models/ejecucion-evidencia/ejecucion-evidencia.request';








@Injectable({
  providedIn: 'root',
})
export class EjecucionEvidenciaApiService extends EjecucionEvidenciaService {
  constructor(private http: HttpClient) {
    super();
  }

  public override ejecucionEvidenciaList(p?:any): Observable<EjecucionEvidenciaUI[]>| null | undefined {
    let payload=(p)?p:{};

    return this.http.post<GeneralDataRequest<EjecucionEvidenciaRequest[]>>(`${EndPoints.EJECUCION_EVIDENCIA_LIST}`,payload).pipe(map((res)=>{
      let response:EjecucionEvidenciaUI[]=[];
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

  public override ejecucionEvidenciaGet(id: number): Observable<EjecucionEvidenciaUI>| null | undefined {
    let payload= {eac_id:id}

    return this.http.post<GeneralDataRequest<EjecucionEvidenciaRequest[]>>(`${EndPoints.EJECUCION_ACTIVIDAD_LIST}`,payload).pipe(map((res)=>{
      let response:EjecucionEvidenciaUI;
      if(res.status){
        /*response= FormatHelper.formatRequestEjecucionEvidencia( res.data[0]);*/
        response= res.data[0];
      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override ejecucionEvidenciaCreate(ejecucionevidencia: EjecucionEvidenciaUI): Observable<any>| null | undefined {
    ejecucionevidencia.eev_id=0;
    let payload= ejecucionevidencia

    return this.http.post<GeneralDataRequest<EjecucionEvidenciaUI[]>>(`${EndPoints.EJECUCION_EVIDENCIA_UPDATE}`,payload).pipe(map((res)=>{
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


  public override ejecucionEvidenciaUpdate(ejecucionevidencia: EjecucionEvidenciaUI): Observable<any>| null | undefined {
    let payload= ejecucionevidencia

    return this.http.post<GeneralDataRequest<EjecucionEvidenciaUI[]>>(`${EndPoints.EJECUCION_EVIDENCIA_UPDATE}`,payload).pipe(map((res)=>{
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


  public override ejecucionEvidenciaDelete(id:number): Observable<any>| null | undefined {
    let payload= {eac_id:id}

    return this.http.post<GeneralDataRequest<EjecucionEvidenciaUI[]>>(`${EndPoints.EJECUCION_EVIDENCIA_DELETE}`,payload).pipe(map((res)=>{
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
