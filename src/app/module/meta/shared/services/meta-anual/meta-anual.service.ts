
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { MetaAnualUI } from '../../models/meta-anual/meta-anual.ui';
import { MetaAnualModel } from '../../models/meta-anual/meta-anual.model';



@Injectable({
  providedIn: 'root',
})
export class  MetaAnualService {
  constructor() {

  }

  public   metaAnualList(payload?:any): Observable<MetaAnualUI[]>| null | undefined {

    return null;
  }
  public   metaAnualGet(id:number): Observable<MetaAnualUI>| null | undefined {

    return null;
  }


  public   metaAnualCreate(metaAnual:MetaAnualModel): Observable<any>| null | undefined {

    return null;
  }

  public   metaAnualUpdate(metaAnual:MetaAnualModel): Observable<any>| null | undefined {

    return null;
  }


  public   metaAnualDelete(id:number): Observable<any>| null | undefined {

    return null;
  }
}
