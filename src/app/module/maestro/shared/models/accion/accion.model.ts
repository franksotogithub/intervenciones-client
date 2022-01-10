import { prop, required } from "@rxweb/reactive-form-validators";
import { AccionUI } from "./accion.ui";

export class AccionModel implements AccionUI{
  lia_id ?:number;
  @prop()
  @required({ message: '* Campo obligatorio' })
  lia_nombre?:string;
  @prop()
  @required({ message: '* Campo obligatorio' })
  prg_id?:number;
  prg_nombre?:string;
  is_valid?:boolean;
  constructor (a?: AccionUI){
    this.lia_id = a?.lia_id;
    this.lia_nombre =a?.lia_nombre;
    this.prg_id = a?.prg_id;
    this.prg_nombre= a?.prg_nombre;
  }
}
