export interface SessionRequest {
  usu_id: number;
  usu_activo: true;
  usu_email: string;
  usu_ultimo_acceso: string;
  nombre: string;
  prf_id:number;
  prf_nombre:string;
  sge_id: number;
  sge_nombre: string;
  ger_id: number;
  ger_nombre: string;
  ins_id: number;
  ins_nombre_abrev: string;
  per_id: number;
  ubigeo: string;
  token: string;
}

