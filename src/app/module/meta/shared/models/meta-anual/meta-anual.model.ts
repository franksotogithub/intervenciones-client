
import { prop, required } from "@rxweb/reactive-form-validators";
import { MetaAnualUI } from "./meta-anual.ui";


export class MetaAnualModel implements MetaAnualUI{

  asi_id ?:number;

  @prop()
  @required({ message: '* Campo obligatorio' })
  asi_anio?: number;
  @prop()
  @required({ message: '* Campo obligatorio' })
  pro_id?: number;

  pro_nombre ?:string;

  @prop()
  @required({ message: '* Campo obligatorio' })
  lia_id?:number;

  lia_nombre?:string;

  @prop()
  @required({ message: '* Campo obligatorio' })
  act_id?:number;
  act_nombre?:string;

  @prop()
  @required({ message: '* Campo obligatorio' })
  ind_id?:number;
  ind_nombre?:string;


  @prop()
  @required({ message: '* Campo obligatorio' })
  ger_id?:number;
  ger_nombre?:string;

  @prop()
  @required({ message: '* Campo obligatorio' })
  sge_id?:number;
  sge_nombre?:string;
  @prop()
  @required({ message: '* Campo obligatorio' })
  asi_meta?:number;

  @prop()
  @required({ message: '* Campo obligatorio' })
  ume_id ?:number;

  ume_nombre?:string;
  is_valid?:boolean;
  constructor (m?: MetaAnualUI){
    this.asi_id= m?.asi_id;
    this.asi_anio = m?.asi_anio;
    this.pro_id = m?.pro_id;
    this.pro_nombre = m?.pro_nombre;
    this.lia_id = m?.lia_id;
    this.lia_nombre =m?.lia_nombre;
    this.act_id = m?.act_id;
    this.act_nombre = m?.act_nombre;
    this.ind_id = m?.ind_id;
    this.ind_nombre = m?.ind_nombre;
    this.ger_id = m?.ger_id;
    this.ger_nombre = m?.ger_nombre;
    this.sge_id = m?.sge_id;
    this.sge_nombre = m?.sge_nombre;
    this.asi_meta = m?.asi_meta;
    this.ume_id = m?.ume_id;

this.ume_nombre = m?.ume_nombre;
  }
}
