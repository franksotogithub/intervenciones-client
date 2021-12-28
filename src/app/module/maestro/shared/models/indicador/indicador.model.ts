import { prop, required } from "@rxweb/reactive-form-validators";
import { IndicadorUI } from "./indicador.ui";

export class IndicadorModel implements IndicadorUI{
  ind_id?: number;
  @prop()
  @required({ message: '* Campo obligatorio' })
  ind_nombre?: string;
  is_valid ?:boolean;
  constructor( i?: IndicadorUI){
    this.ind_id = i?.ind_id;
    this.ind_nombre = i?.ind_nombre;
  }
}
