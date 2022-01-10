import { EjecucionValidacionUI } from "./ejecucion-validacion.ui";


export class EjecucionValidacionModel implements EjecucionValidacionUI{
  eva_id?: number;
  eje_id?: number;
  eva_mensaje?: string;
  eej_id?: number;
  es_enviado?:boolean;
  fecha_crea?:Date;
  eej_nombre?:string;
constructor(e?:EjecucionValidacionUI){
  this.eva_id= e?.eva_id;
  this.eej_id = e?.eej_id;
  this.eva_mensaje = e?.eva_mensaje;
  this.eje_id = e?.eje_id;


}


}
