
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

import { AccionUI } from "../../models/accion/accion.ui";
import { EndPoints } from "@app/global/end-points";
import { GeneralDataRequest } from "@app/shared/models/general/request/general-data.request";
import { GerenciaUI } from "../../models/gerencia/gerencia.ui";


@Injectable({
  providedIn: 'root',
})
export class GerenciaService  {
  constructor() {

  }

  public   gerenciaList(): Observable<GerenciaUI[]>| null | undefined {

    return null;
  }



}
