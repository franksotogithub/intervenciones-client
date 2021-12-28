import { prop, required } from "@rxweb/reactive-form-validators";
import { ActividadUI } from "./actividad.ui";

export class ActividadModel implements ActividadUI{

  act_id?: number;
  @prop()
  @required({ message: '* Campo obligatorio' })
  act_nombre?: number;

  @prop()
  @required({ message: '* Campo obligatorio' })
  lia_id?: number;

  lia_nombre?: number;
  @prop()
  @required({ message: '* Campo obligatorio' })
  prg_id?: number;

  prg_nombre?: number;
  is_valid ?:boolean;
  constructor (a?: ActividadUI){
    this.act_id = a?.act_id;
    this.act_nombre = a?.act_nombre;
    this.lia_id = a?.lia_id;
    this.lia_nombre = a?.lia_nombre;
    this.prg_id = a?.prg_id;
    this.prg_nombre = a?.prg_nombre;
  }

}
