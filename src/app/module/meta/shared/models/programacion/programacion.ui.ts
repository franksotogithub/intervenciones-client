export interface ProgramacionUI{

  prg_id ?:number;
  prg_tipo ?:number;
  prg_tipo_desc ?:string;
  prg_nombre ?:string;
  prg_direccion ?:string;
  prg_referencia ?:string;
  prg_fecha_inicio ?:Date;
  prg_fecha_fin ?:Date;
  prg_geom_wkt ?: string;
  prg_lon ?: number;
  prg_lat ?: number;
  prg_geom_json ?:string;

}
