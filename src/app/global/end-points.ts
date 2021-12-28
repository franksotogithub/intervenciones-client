import { environment} from '@env/environment';

export class EndPoints
{
  public static get BASE_ENDPOINT():string { return environment.apiUrl};



  public static get LOGIN():string {return `${this.BASE_ENDPOINT}/login` }
  public static get PROGRAMA_LIST():string {return `${this.BASE_ENDPOINT}/sel_programa` }
  public static get PROGRAMA_UPDATE():string {return `${this.BASE_ENDPOINT}/upd_programa` }
  public static get PROGRAMA_DELETE():string {return `${this.BASE_ENDPOINT}/del_programa` }

  public static get ACTIVIDAD_LIST():string {return `${this.BASE_ENDPOINT}/sel_actividad` }
  public static get ACTIVIDAD_UPDATE():string {return `${this.BASE_ENDPOINT}/upd_actividad` }
  public static get ACTIVIDAD_DELETE():string {return `${this.BASE_ENDPOINT}/del_actividad` }

  public static get ACCION_LIST():string {return `${this.BASE_ENDPOINT}/sel_laccion` }
  public static get ACCION_UPDATE():string {return `${this.BASE_ENDPOINT}/upd_laccion` }
  public static get ACCION_DELETE():string {return `${this.BASE_ENDPOINT}/del_laccion` }



  public static get UNIDAD_MEDIDA_LIST():string {return `${this.BASE_ENDPOINT}/sel_umedida` }
  public static get UNIDAD_MEDIDA_UPDATE():string {return `${this.BASE_ENDPOINT}/upd_umedida` }
  public static get UNIDAD_MEDIDA_DELETE():string {return `${this.BASE_ENDPOINT}/del_umedida` }



  public static get INDICADOR_LIST():string {return `${this.BASE_ENDPOINT}/sel_indicador` }
  public static get INDICADOR_UPDATE():string {return `${this.BASE_ENDPOINT}/upd_indicador` }
  public static get INDICADOR_DELETE():string {return `${this.BASE_ENDPOINT}/del_indicador` }


  public static get GERENCIA_LIST():string {return `${this.BASE_ENDPOINT}/sel_gerencia`}
  public static get SUBGERENCIA_LIST():string {return `${this.BASE_ENDPOINT}/sel_subgerencia`}


  public static get METAANUAL_LIST():string{return `${this.BASE_ENDPOINT}/sel_meta_anual`}
  public static get METAANUAL_UPDATE():string{return `${this.BASE_ENDPOINT}/upd_meta_anual`}
  public static get METAANUAL_DELETE():string{return `${this.BASE_ENDPOINT}/del_meta_anual`}


  public static get PROGRAMACION_LIST():string{return `${this.BASE_ENDPOINT}/sel_programacion`}
  public static get PROGRAMACION_UPDATE():string{return `${this.BASE_ENDPOINT}/upd_programacion`}
  public static get PROGRAMACION_DELETE():string{return `${this.BASE_ENDPOINT}/del_programacion`}



  public static get PROGRAMACION_ACTIVIDAD_LIST():string{return `${this.BASE_ENDPOINT}/sel_programacion_actividad`}
  public static get PROGRAMACION_ACTIVIDAD_UPDATE():string{return `${this.BASE_ENDPOINT}/upd_programacion_actividad`}
  public static get PROGRAMACION_ACTIVIDAD_DELETE():string{return `${this.BASE_ENDPOINT}/del_programacion_actividad`}


  public static get EJECUCION_LIST():string{return `${this.BASE_ENDPOINT}/sel_ejecucion`}
  public static get EJECUCION_UPDATE():string{return `${this.BASE_ENDPOINT}/upd_ejecucion`}
  public static get EJECUCION_DELETE():string{return `${this.BASE_ENDPOINT}/del_ejecucion`}

}
