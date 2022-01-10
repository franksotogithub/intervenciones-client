import { prop, required } from "@rxweb/reactive-form-validators";
import { EjecucionUI } from "./ejecucion.ui";


export class EjecucionModel implements EjecucionUI{

  eje_anio ?:number;

  ubigeo ?:string;
  nombdist ?:string;
  eje_id ?:number;

  @prop()
  @required({ message: '* Campo obligatorio' })
  eje_nombre ?:string;

  @prop()
  @required({ message: '* Campo obligatorio' })
  eje_direccion ?:string;

  @prop()
  @required({ message: '* Campo obligatorio' })
  eje_referencia ?:string;

  @prop()
  @required({ message: '* Campo obligatorio' })
  eje_fecha_inicio ?:Date;

  @prop()
  @required({ message: '* Campo obligatorio' })
  eje_fecha_fin ?: Date;

  eje_geom_wkt ?: string;

@prop()
  eje_lon ?: number;
  @prop()
  eje_lat?:number;
  eej_nombre ?:string;
  eej_id?:number;
eje_nro_beneficiados?:number;

fecha_crea?:Date;
is_valid? :boolean;
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
  this.eej_id = (e && e.eej_id)?e.eej_id:1;

 }
}
