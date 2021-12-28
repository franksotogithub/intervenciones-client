import { prop, required } from "@rxweb/reactive-form-validators";
import { ProgramaUI } from "./programa.ui";


export class ProgramaModel implements ProgramaUI{

  pro_id ?:number;
  @prop()
  @required({ message: '* Campo obligatorio' })
  pro_nombre?: string;
  is_valid?:boolean;
  constructor (p?: ProgramaUI){
    this.pro_id = p?.pro_id;
    this.pro_nombre = p?.pro_nombre;
  }

}
