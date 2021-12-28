
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { AccionService } from './accion.service';
import { AccionUI } from '../../models/accion/accion.ui';
import { AccionModel } from '../../models/accion/accion.model';


@Injectable({
  providedIn: 'root',
})
export class AccionApiService extends AccionService {
  constructor(private http: HttpClient) {
    super();
  }

  public override  accionList(p?:any): Observable<AccionUI[]>| null | undefined {
    let payload = p? p:{};
    return this.http.post<GeneralDataRequest<AccionUI[]>>(`${EndPoints.ACCION_LIST}`,payload).pipe(map((res)=>{
      let response:AccionUI[]=[];
      if(res.status){
        response=  res.data;

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override accionGet(id:number): Observable<AccionUI>| null | undefined {
    let payload = {lia_id:id};
    return this.http.post<GeneralDataRequest<AccionUI[]>>(`${EndPoints.ACCION_LIST}`,payload).pipe(map((res)=>{
      let response:AccionUI;
      if(res.status){
        response=  res.data[0];

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override accionUpdate(Accion: AccionModel):Observable<boolean>| null | undefined{
    let payload = Accion;
    return this.http.post<GeneralDataRequest<any>>(`${EndPoints.ACCION_UPDATE}`,payload).pipe(map((res)=>{
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

  public override accionCreate(Accion: AccionModel):Observable<boolean>| null | undefined{
    Accion.lia_id=0;
    let payload = Accion;

    return this.http.post<GeneralDataRequest<any>>(`${EndPoints.ACCION_UPDATE}`,payload).pipe(map((res)=>{
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

  public override accionDelete(id: number):Observable<boolean>| null | undefined{
    let payload = {lia_id:id};
    return this.http.post<GeneralDataRequest<any>>(`${EndPoints.ACCION_DELETE}`,payload).pipe(map((res)=>{
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
