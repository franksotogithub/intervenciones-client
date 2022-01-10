
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { PersonaUI } from '../../models/persona/persona.ui';
import { PersonaService } from './persona.service';




@Injectable({
  providedIn: 'root',
})
export class PersonaApiService extends PersonaService {
  constructor(private http: HttpClient) {
    super();
  }

  public override personaList(p?:any): Observable<PersonaUI[]>| null | undefined {
    let payload=(p)?p:{};

    return this.http.post<GeneralDataRequest<PersonaUI[]>>(`${EndPoints.PERSONA_LIST}`,payload).pipe(map((res)=>{
      let response:PersonaUI[]=[];
      if(res.status){
        response=  res.data;

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override personaGet(id: number): Observable<PersonaUI>| null | undefined {
    let payload= {per_id:id}

    return this.http.post<GeneralDataRequest<PersonaUI[]>>(`${EndPoints.PERSONA_LIST}`,payload).pipe(map((res)=>{
      let response:PersonaUI;
      if(res.status){
        response=  res.data[0];

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

}
