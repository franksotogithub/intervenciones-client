
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { ProgramacionActividadUI } from '../../models/programacion-actividad/programacion-actividad.ui';
import { ProgramacionActividadModel } from '../../models/programacion-actividad/programacion-actividad.model';
import { ProgramacionActividadService } from './programacion-actividad.service';





@Injectable({
  providedIn: 'root',
})

export class  ProgramacionActividadApiService  extends  ProgramacionActividadService{

  constructor(private http: HttpClient) {
    super();
  }


  public override   programacionActividadList(p?:any): Observable<ProgramacionActividadUI[]>| null | undefined {

    let payload=(p)?p:{};

    return this.http.post<GeneralDataRequest<ProgramacionActividadUI[]>>(`${EndPoints.PROGRAMACION_ACTIVIDAD_LIST}`,payload).pipe(map((res)=>{
      let response:ProgramacionActividadUI[]=[];
      if(res.status){
        response=  res.data;

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }
  public override   programacionActividadGet(id:number): Observable<ProgramacionActividadUI>| null | undefined {

    let payload= {prg_id:id}

    return this.http.post<GeneralDataRequest<ProgramacionActividadUI[]>>(`${EndPoints.PROGRAMACION_ACTIVIDAD_LIST}`,payload).pipe(map((res)=>{
      let response:ProgramacionActividadUI;
      if(res.status){
        response=  res.data[0];

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }


  public override   programacionActividadCreate(programacionActividad: ProgramacionActividadModel): Observable<any>| null | undefined {

    programacionActividad.pac_id=0;
    let payload= programacionActividad

    return this.http.post<GeneralDataRequest<ProgramacionActividadUI[]>>(`${EndPoints.PROGRAMACION_ACTIVIDAD_UPDATE}`,payload).pipe(map((res)=>{
      let response;
      if(res.status){
        response=  true;

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override   programacionActividadUpdate(programacionActividad:ProgramacionActividadModel): Observable<any>| null | undefined {

    let payload= programacionActividad

    return this.http.post<GeneralDataRequest<ProgramacionActividadUI[]>>(`${EndPoints.PROGRAMACION_ACTIVIDAD_UPDATE}`,payload).pipe(map((res)=>{
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


  public override   programacionActividadDelete(id:number): Observable<any>| null | undefined {

    let payload= {pac_id:id}

    return this.http.post<GeneralDataRequest<ProgramacionActividadUI[]>>(`${EndPoints.PROGRAMACION_ACTIVIDAD_DELETE}`,payload).pipe(map((res)=>{
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
