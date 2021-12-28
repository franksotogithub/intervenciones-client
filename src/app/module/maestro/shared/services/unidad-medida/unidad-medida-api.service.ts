import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { map, Observable } from "rxjs";
import { UnidadMedidaModel } from "../../models/unidad-medida/unidad-medida.model";
import { UnidadMedidaUI } from "../../models/unidad-medida/unidad-medida.ui";
import { UnidadMedidaService } from "./unidad-medida.service";



@Injectable({
  providedIn: 'root',
})
export class UnidadMedidaApiService extends UnidadMedidaService {
  constructor(private http: HttpClient) {
    super();
  }

  public override unidadMedidaList( ): Observable<UnidadMedidaUI[]>| null | undefined {
    return this.http.post<GeneralDataRequest<UnidadMedidaUI[]>>(`${EndPoints.UNIDAD_MEDIDA_LIST}`,{}).pipe(map((res)=>{
      let response:UnidadMedidaUI[]=[];
      if(res.status){
        response=  res.data;

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public override unidadMedidaGet(id:number):Observable<UnidadMedidaUI>| null | undefined{
    let payload ={ ume_id:id };
    return this.http.post<GeneralDataRequest<UnidadMedidaUI[]>>(`${EndPoints.UNIDAD_MEDIDA_LIST}`,{}).pipe(map((res)=>{
      let response:UnidadMedidaUI;
      if(res.status){
        response=  res.data[0];

      } else {
        throw new Error('No se ha logrado obtener datos del servidor');
      }
      return response;

    })
    );
  }

  public  override unidadMedidaUpdate(unidadMedida: UnidadMedidaModel):Observable<boolean>| null | undefined{
    let payload = unidadMedida;
    return this.http.post<GeneralDataRequest<any>>(`${EndPoints.UNIDAD_MEDIDA_UPDATE}`,payload).pipe(map((res)=>{
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



  public override unidadMedidaCreate(unidadMedida: UnidadMedidaModel):Observable<boolean>| null | undefined{
    unidadMedida.ume_id=0;
    let payload = unidadMedida;
    return this.http.post<GeneralDataRequest<any>>(`${EndPoints.UNIDAD_MEDIDA_UPDATE}`,payload).pipe(map((res)=>{
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


  public  override unidadMedidaDelete(id: number):Observable<boolean>| null | undefined{
    let payload = {ume_id:id};
    return this.http.post<GeneralDataRequest<any>>(`${EndPoints.UNIDAD_MEDIDA_DELETE}`,payload).pipe(map((res)=>{
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
