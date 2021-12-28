import { EjecucionUI } from "./ejecucion.ui";


export class EjecucionModel implements EjecucionUI{

  eje_anio ?:number;
  ubigeo ?:string;
  nombdist ?:string;
  eje_id ?:number;
  eje_nombre ?:string;
  eje_direccion ?:string;
  eje_referencia ?:string;
  eje_fecha_inicio ?:Date;
  eje_fecha_fin ?: Date;
  eje_geom_wkt ?: number;
  eje_lon ?: number;
  eje_lat?:number;
  eej_nombre ?:string;
  eej_id?:number;
eje_nro_beneficiados?:number;

fecha_crea?:Date;

constructor(e?:EjecucionUI){
  this.eje_anio = e?.eje_anio;
  this.ubigeo = e?.ubigeo;
  this.nombdist= e?.nombdist;
  this.eje_id = e?.eje_id;
  this.eje_nombre = e?.eje_nombre;
  this.eje_direccion = e?.eje_direccion;
  this.eje_referencia = e?.eje_referencia;
  this.eje_fecha_inicio = e?.eje_fecha_inicio;
  this.eje_fecha_fin = e?.eje_fecha_fin;
  this.eje_geom_wkt = e?.eje_geom_wkt;
  this.eje_lon = e?.eje_lon;
  this.eje_lat = e?.eje_lat;
  this.eje_nro_beneficiados = e?.eje_nro_beneficiados;
  this.fecha_crea = e?.fecha_crea;
  this.eej_nombre=e?.eej_nombre;
  this.eej_id =e?.eej_id;

 }
}
