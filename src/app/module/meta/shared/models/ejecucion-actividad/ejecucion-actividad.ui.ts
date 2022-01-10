export interface EjecucionActividadUI{
  asi_id?:number;
  asi_anio ?:number;
  ger_id ?:number;
  ger_nombre?:string;
  sge_id ?:number;
  sge_nombre?:number;
  pro_id ?:number;
  pro_nombre?:string;
  lia_id?:number;
  lia_nombre?:string;
  act_id?:number;
  act_nombre?:string;
  ind_id?:number;
  ind_nombre?:string;
  ume_id?:number;
  ume_nombre?:string;
  ume_simbolo?:string;
  asi_meta?:number;
  asi_ejecutado?:number;
  asi_ejecutado_p?:number;
  asi_num_barrio_inter?:number;
  asi_num_barrio_activ?:number;
  asi_num_activ ?:number;
  asi_num_activ_total?:number;
  pac_id ?:number;
  pac_programado?:number;
  pac_ejecutado?:number;
  pac_ejecutado_p?:number;
  pac_eliminado?:boolean;
  prg_id?:number;
  prg_tipo?:string;
  prg_tipo_desc ?:string;
  prg_nombre ?:string;
  prg_direccion?:string;
  prg_referencia ?:string;
  prg_fecha_inicio ?:string;
  prg_fecha_fin?:string;
  prg_lon?:number;
  prg_lat?:number;
  eje_anio?:number;
  ubigeo?:string;
  nombdist?:string;
  eje_id?: number;
  eje_nombre?:string;
  eje_direccion?:string;
  eje_referencia?:string;
  eje_fecha_inicio?:string;
  eje_fecha_fin?:string;
  eje_geom_wkt?:string;
  eje_lon?:number;
  eje_lat?:number;
  eje_nro_beneficiados?:number;
  eej_id?:number;
  eej_nombre ?:number;
  eje_fecha_crea ?:string;
  eac_id?:number;
  eac_programado?:number;
  eac_ejecutado ?: number;
  eac_nro_beneficiados ?:number;
  eac_nombre_ejecutor?:string;
  per_id?:number;
}

