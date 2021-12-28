
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { MetaAnualService } from './meta-anual.service';
import { MetaAnualUI } from '../../models/meta-anual/meta-anual.ui';
import { MetaAnualModel } from '../../models/meta-anual/meta-anual.model';




@Injectable({
  providedIn: 'root',
})
export class MetaAnualApiService extends MetaAnualService {
  constructor(private http: HttpClient) {
    super();
  }

  public override metaAnualList(p?:any): Observable<MetaAnualUI[]>| null | undefined {
    let payload=(p)?p:{};

    return this.http.post<GeneralDataRequest<MetaAnualUI[]>>(`${EndPoints.METAANUAL_LIST}`,payload).pipe(map((res)=>{
      let response:MetaAnualUI[]=[];
      if(res.status){
        response=  res.data;

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override metaAnualGet(id: number): Observable<MetaAnualUI>| null | undefined {
    let payload= {asi_id:id}

    return this.http.post<GeneralDataRequest<MetaAnualUI[]>>(`${EndPoints.METAANUAL_LIST}`,payload).pipe(map((res)=>{
      let response:MetaAnualUI;
      if(res.status){
        response=  res.data[0];

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override metaAnualCreate(metaAnual: MetaAnualModel): Observable<any>| null | undefined {
    metaAnual.asi_id=0;
    let payload= metaAnual

    return this.http.post<GeneralDataRequest<MetaAnualUI[]>>(`${EndPoints.METAANUAL_UPDATE}`,payload).pipe(map((res)=>{
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


  public override metaAnualUpdate(metaAnual: MetaAnualModel): Observable<any>| null | undefined {
    let payload= metaAnual

    return this.http.post<GeneralDataRequest<MetaAnualUI[]>>(`${EndPoints.METAANUAL_UPDATE}`,payload).pipe(map((res)=>{
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


  public override metaAnualDelete(id:number): Observable<any>| null | undefined {
    let payload= {asi_id:id}

    return this.http.post<GeneralDataRequest<MetaAnualUI[]>>(`${EndPoints.METAANUAL_DELETE}`,payload).pipe(map((res)=>{
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
