import { ProgramacionActividadUI } from "./programacion-actividad.ui";

export class ProgramacionActividadModel implements ProgramacionActividadUI {
  asi_meta?:number;
  asi_anio?:number;
  pac_id?:number;
  prg_id ?:number;
  asi_id ?:number;
  pac_programado ?:number;
  pro_id?:string;
  pro_nombre?:string;
  lia_id?: number;
  lia_nombre?:string;
  act_id?:number;
  act_nombre?:string;
  ind_id?:number;
  ind_nombre?:string;
  ger_id?:number;
  ger_nombre?:string;
  sge_id?:number;
  sge_nombre?:string;

  constructor(p?:ProgramacionActividadUI ){
    this.asi_meta = p?.asi_meta;
    this.asi_anio = p?.asi_anio;
    this.pac_id = p?.pac_id;
    this.prg_id = p?.prg_id;
    this.asi_id = p?.asi_id;
    this.pac_programado = p?.pac_programado;
    this.pro_id = p?.pro_id;
    this.pro_nombre = p?.pro_nombre;
    this.lia_id = p?.lia_id;
    this.lia_nombre = p?.lia_nombre;
    this.act_id = p?.act_id;
    this.act_nombre = p?.act_nombre;
    this.ind_id = p?.ind_id;
    this.ind_nombre = p?.ind_nombre;
    this.ger_id = p?.ger_id;
    this.ger_nombre = p?.ger_nombre;
    this.sge_id = p?.sge_id;
    this.sge_nombre = p?.sge_nombre;


  }

}
