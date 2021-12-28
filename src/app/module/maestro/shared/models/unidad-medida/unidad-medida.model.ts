import { prop, required } from "@rxweb/reactive-form-validators";
import { UnidadMedidaUI } from "./unidad-medida.ui";

export class UnidadMedidaModel implements UnidadMedidaUI{

  ume_id ?:number;
  @prop()
  @required({ message: '* Campo obligatorio' })
  ume_nombre?: string;
  @prop()
  @required({ message: '* Campo obligatorio' })
  ume_simbolo?: string;
  @prop()
  @required({ message: '* Campo obligatorio' })
  ume_tipo?:number;
  is_valid?:boolean;
  constructor(u?: UnidadMedidaUI)  {
    this.ume_id = u?.ume_id;
    this.ume_nombre = u?.ume_nombre;
    this.ume_simbolo = u?.ume_simbolo;
    this.ume_tipo =u?.ume_tipo;
  }
}
