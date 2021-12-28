
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { ProgramacionUI } from '../../models/programacion/programacion.ui';
import { ProgramacionService } from './programacion.service';
import { ProgramacionModel } from '../../models/programacion/programacion.model';
import { FormatHelper } from '@app/util/format.helper';
import { ProgramacionRequest } from '../../models/programacion/programacion.request';





@Injectable({
  providedIn: 'root',
})
export class programacionApiService extends ProgramacionService {
  constructor(private http: HttpClient) {
    super();
  }

  public override programacionList(p?:any): Observable<ProgramacionUI[]>| null | undefined {
    let payload=(p)?p:{};

    return this.http.post<GeneralDataRequest<ProgramacionRequest[]>>(`${EndPoints.PROGRAMACION_LIST}`,payload).pipe(map((res)=>{
      let response:ProgramacionUI[]=[];
      if(res.status){

        response= res.data.map(r=> {return  FormatHelper.formatRequestProgramacion(r) });

        /*response=   res.data;*/

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override programacionGet(id: number): Observable<ProgramacionUI>| null | undefined {
    let payload= {prg_id:id}

    return this.http.post<GeneralDataRequest<ProgramacionRequest[]>>(`${EndPoints.PROGRAMACION_LIST}`,payload).pipe(map((res)=>{
      let response:ProgramacionUI;
      if(res.status){
        response= FormatHelper.formatRequestProgramacion( res.data[0]);

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override programacionCreate(programacion: ProgramacionModel): Observable<any>| null | undefined {
    programacion.prg_id=0;
    let payload= programacion

    return this.http.post<GeneralDataRequest<ProgramacionUI[]>>(`${EndPoints.PROGRAMACION_UPDATE}`,payload).pipe(map((res)=>{
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


  public override programacionUpdate(programacion: ProgramacionModel): Observable<any>| null | undefined {
    let payload= programacion

    return this.http.post<GeneralDataRequest<ProgramacionUI[]>>(`${EndPoints.PROGRAMACION_UPDATE}`,payload).pipe(map((res)=>{
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


  public override programacionDelete(id:number): Observable<any>| null | undefined {
    let payload= {prg_id:id}

    return this.http.post<GeneralDataRequest<ProgramacionUI[]>>(`${EndPoints.PROGRAMACION_DELETE}`,payload).pipe(map((res)=>{
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
