
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { PersonaUI } from '@app/shared/models/persona/persona.ui';







@Injectable({
  providedIn: 'root',
})
export class  PersonaService {
  constructor() {

  }

  public   personaList(payload?:any): Observable<PersonaUI[]>| null | undefined {

    return null;
  }
  public   personaGet(id:number): Observable<PersonaUI>| null | undefined {

    return null;
  }


}
