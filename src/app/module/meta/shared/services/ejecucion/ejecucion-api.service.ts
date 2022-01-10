
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { EjecucionUI } from '../../models/ejecucion/ejecucion.ui';
import { EjecucionService } from './ejecucion.service';
import { EjecucionModel } from '../../models/ejecucion/ejecucion.model';
import { FormatHelper } from '@app/util/format.helper';
import { EjecucionRequest } from '../../models/ejecucion/ejecucion.request';





@Injectable({
  providedIn: 'root',
})
export class EjecucionApiService extends EjecucionService {
  constructor(private http: HttpClient) {
    super();
  }

  public override ejecucionList(p?:any): Observable<EjecucionUI[]>| null | undefined {
    let payload=(p)?p:{};

    return this.http.post<GeneralDataRequest<EjecucionRequest[]>>(`${EndPoints.EJECUCION_LIST}`,payload).pipe(map((res)=>{
      let response:EjecucionUI[]=[];
      if(res.status){

        response= res.data.map(r=> {return  FormatHelper.formatRequestEjecucion(r) });

        /*response=   res.data;*/

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override ejecucionGet(id: number): Observable<EjecucionUI>| null | undefined {
    let payload= {eje_id:id}

    return this.http.post<GeneralDataRequest<EjecucionRequest[]>>(`${EndPoints.EJECUCION_LIST}`,payload).pipe(map((res)=>{
      let response:EjecucionUI;
      if(res.status){
        response= FormatHelper.formatRequestEjecucion( res.data[0]);

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override ejecucionCreate(ejecucion: EjecucionModel): Observable<any>| null | undefined {
    ejecucion.eje_id=0;
    let payload= ejecucion

    return this.http.post<GeneralDataRequest<EjecucionUI[]>>(`${EndPoints.EJECUCION_UPDATE}`,payload).pipe(map((res)=>{
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


  public override ejecucionUpdate(ejecucion: EjecucionModel): Observable<any>| null | undefined {
    let payload= ejecucion

    return this.http.post<GeneralDataRequest<EjecucionUI[]>>(`${EndPoints.EJECUCION_UPDATE}`,payload).pipe(map((res)=>{
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


  public override ejecucionDelete(id:number): Observable<any>| null | undefined {
    let payload= {eje_id:id}

    return this.http.post<GeneralDataRequest<EjecucionUI[]>>(`${EndPoints.EJECUCION_DELETE}`,payload).pipe(map((res)=>{
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
