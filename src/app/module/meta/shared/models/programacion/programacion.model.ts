import { prop, required } from "@rxweb/reactive-form-validators";
import { ProgramacionUI } from "./programacion.ui";

export class ProgramacionModel implements ProgramacionUI{


  prg_id ?:number;

  @prop()
  @required({ message: '* Campo obligatorio' })
  prg_tipo ?:number;

  prg_tipo_desc ?:string;

  @prop()
  @required({ message: '* Campo obligatorio' })
  prg_nombre ?:string;

  @prop()
  @required({ message: '* Campo obligatorio' })
  prg_direccion ?:string;

  @prop()
  prg_referencia ?:string;

  @prop()
  @required({ message: '* Campo obligatorio' })
  prg_fecha_inicio ?:Date;

  @prop()
  @required({ message: '* Campo obligatorio' })
  prg_fecha_fin ?:Date;

  prg_geom_wkt ?: string;
  prg_lon ?: number;
  prg_lat ?: number;
  is_valid?: boolean;
  prg_geom_json?:string;

  constructor(p ?: ProgramacionUI){
    this.prg_id = p?.prg_id;
    this.prg_tipo = 1;
    this.prg_nombre = p?.prg_nombre;
    this.prg_direccion = p?.prg_direccion;
    this.prg_referencia = p?.prg_referencia;
    this.prg_fecha_inicio = p?.prg_fecha_inicio;
    this.prg_fecha_fin = p?.prg_fecha_fin;
    this.prg_geom_wkt = p?.prg_geom_wkt;
    this.prg_lon = p?.prg_lon;
    this.prg_lat = p?.prg_lat;
    this.prg_geom_json =p?.prg_geom_json;

    /*this.is_valid =p?.is_valid;*/
  }


}
