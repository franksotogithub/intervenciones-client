import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GeneralDataRequest } from '@app/shared/models/general/request/general-data.request';
import { ProgramaUI } from '../../models/programa/programa.ui';
import { map, Observable, of } from 'rxjs';
import { ProgramaService } from './programa.service';
import { EndPoints } from '@app/global/end-points';
import { ProgramaModel } from '../../models/programa/programa.model';
@Injectable({
  providedIn: 'root',
})
export class ProgramaApiService extends ProgramaService {
  constructor(private http: HttpClient) {
    super();
  }

  public override  programaList(): Observable<ProgramaUI[]>| null | undefined {

    return this.http.post<GeneralDataRequest<ProgramaUI[]>>(`${EndPoints.PROGRAMA_LIST}`,{}).pipe(map((res)=>{
      let response:ProgramaUI[]=[];
      if(res.status){
        response=  res.data;

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }
  public override programaGet(id:number ): Observable<ProgramaUI>| null | undefined {
    let payload = {pro_id:id};

    return this.http.post<GeneralDataRequest<ProgramaUI[]>>(`${EndPoints.PROGRAMA_LIST}`,payload).pipe(map((res)=>{
      let response:ProgramaUI;
      if(res.status){
        response=  res.data[0];

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }



  public override programaUpdate(programa: ProgramaModel):Observable<boolean>| null | undefined{
      let payload = programa;
      return this.http.post<GeneralDataRequest<any>>(`${EndPoints.PROGRAMA_UPDATE}`,payload).pipe(map((res)=>{
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

  public override programaCreate(programa: ProgramaModel):Observable<boolean>| null | undefined{
    programa.pro_id=0;
    let payload = programa;

    return this.http.post<GeneralDataRequest<any>>(`${EndPoints.PROGRAMA_UPDATE}`,payload).pipe(map((res)=>{
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

  public override programaDelete(id: number):Observable<boolean>| null | undefined{
    let payload = {pro_id:id};
    return this.http.post<GeneralDataRequest<any>>(`${EndPoints.PROGRAMA_DELETE}`,payload).pipe(map((res)=>{
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
