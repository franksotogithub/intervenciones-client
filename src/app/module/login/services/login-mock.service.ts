import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable, of } from 'rxjs';



import { map, catchError, switchMap } from 'rxjs/operators';
import { LoginModel } from '../models/login.model';
import { GeneralSessionUI } from '../models/ui/generalSession.ui';
import { GeneralSessionRequest } from '../models/request/generalSession.request';
import { FormatHelper } from '@app/util/format.helper';


@Injectable({
  providedIn: 'root',
})
export class LoginMockService extends LoginService {
  constructor() {
    super();
  }

  public override login(data: LoginModel ): Observable<GeneralSessionUI>| null | undefined {

let session:GeneralSessionRequest ={
  status: true,
  message: "ok",
  sesion: {
      usu_id: 1,
      usu_activo: true,
      usu_email: "desarrollo@imp.gob.pe",
      usu_ultimo_acceso: "2021-11-10T19:49:01.454Z",
      nombre: "desarrollo sistemas ",
      prf_id: 5,
      prf_nombre: "Ejecutor",
      sge_id: 1,
      sge_nombre: "SUBGERENCIA DE BIENESTAR Y PROMOCIÓN SOCIAL",
      ger_id: 2,
      ger_nombre: "GERENCIA DE DESARROLLO SOCIAL",
      ins_id: 3,
      ins_nombre_abrev: "MML",
      per_id: 1,
      ubigeo: "150101",

      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VfaWQiOjEsInVzdV9ub21icmUiOiJkZXNhcnJvbGxvIHNpc3RlbWFzICIsInBlcl9pZCI6MSwiaW5zX2lkIjozLCJnZXJfaWQiOjIsInNnZV9pZCI6MSwiaWF0IjoxNjM2NTczNzQxLCJleHAiOjE2MzY2MDI1NDF9.bb8ZnoU8-jh62IKzeoCXQ6Ey7gWFaLzo227ZUuU32VY"
  },
  apps: [
      {
          sis_id: 1,
          sis_nombre: "Seguridad Municipal",
          sis_logotipo: '',
          sis_url: '',
          prf_id: 1,
          prf_nombre: "Operador"
      },
      {
          sis_id: 2,
          sis_nombre: "Lima te cuida",
          sis_logotipo: '',
          sis_url: '',
          prf_id: 5,
          prf_nombre: "Ejecutor"
      }
  ]
}

    let sessionUI = FormatHelper.formatResponseGeneralSession(session);
    return   new Observable((observer) => {
      observer.next(sessionUI);
    });

  }
}
