
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { PersonaUI } from '../../models/persona/persona.ui';
import { ArchivoService } from './archivo.service';





@Injectable({
  providedIn: 'root',
})
export class ArchivoApiService extends ArchivoService {
  constructor(private http: HttpClient) {
    super();
  }

  public override subirFoto(file:any): Observable<any>| null | undefined {
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);
    return this.http.post<GeneralDataRequest<any>>(`${EndPoints.UPLOAD}`,formData).pipe(map((res)=>{
      let response;

      if (res.status && res.data) {
        response = res.data;
      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })

    );


  }


}
