import { ActividadService } from "./actividad.service";
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { ActividadUI } from "../../models/actividad/actividad.ui";
import { AccionUI } from "../../models/accion/accion.ui";
import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { ActividadModel } from "../../models/actividad/actividad.model";

@Injectable({
  providedIn: 'root',
})
export class ActividadApiService extends ActividadService {
  constructor(private http: HttpClient) {
    super();
  }

  public override  actividadList(p?:any): Observable<ActividadUI[]>| null | undefined {
    let payload = p?p:{};
    return this.http.post<GeneralDataRequest<ActividadUI[]>>(`${EndPoints.ACTIVIDAD_LIST}`,payload).pipe(map((res)=>{
      let response:ActividadUI[]=[];
      if(res.status){
        response=  res.data;

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override  actividadGet(id: number): Observable<ActividadUI>| null | undefined {
    let payload = { act_id :id};
    return this.http.post<GeneralDataRequest<ActividadUI[]>>(`${EndPoints.ACTIVIDAD_LIST}`,payload).pipe(map((res)=>{
      let response:ActividadUI;
      if(res.status){
        response=  res.data[0];

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }


  public override actividadUpdate(actividad: ActividadModel):Observable<boolean>| null | undefined{
    let payload = actividad;
    return this.http.post<GeneralDataRequest<any>>(`${EndPoints.ACTIVIDAD_UPDATE}`,payload).pipe(map((res)=>{
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

  public override actividadCreate(actividad: ActividadModel):Observable<boolean>| null | undefined{
    actividad.act_id=0;
    let payload = actividad;

    return this.http.post<GeneralDataRequest<any>>(`${EndPoints.ACTIVIDAD_UPDATE}`,payload).pipe(map((res)=>{
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

  public override actividadDelete(id: number):Observable<boolean>| null | undefined{
    let payload = {act_id:id};
    return this.http.post<GeneralDataRequest<any>>(`${EndPoints.ACTIVIDAD_DELETE}`,payload).pipe(map((res)=>{
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
