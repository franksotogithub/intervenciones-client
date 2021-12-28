import { LoginModel } from "@app/module/login/models/login.model";

import { GeneralSessionRequest } from "@app/module/login/models/request/generalSession.request";
import { LoginRequest } from "@app/module/login/models/request/login.request";
import { SessionRequest } from "@app/module/login/models/request/session.request";

import { GeneralSessionUI } from "@app/module/login/models/ui/generalSession.ui";
import { SessionUI } from "@app/module/login/models/ui/session.ui";

import { AppUI } from "@app/module/login/models/ui/app.ui";
import { AppRequest } from "@app/module/login/models/request/app.request";
import { ProgramacionRequest } from "@app/module/meta/shared/models/programacion/programacion.request";
import { ProgramacionUI } from "@app/module/meta/shared/models/programacion/programacion.ui";
import { UtilHelper } from "./util.helper";
import { EjecucionRequest } from "@app/module/meta/shared/models/ejecucion/ejecucion.request";
import { EjecucionUI } from "@app/module/meta/shared/models/ejecucion/ejecucion.ui";



export class FormatHelper {


  public static formatRequestLogin( login: LoginModel ): LoginRequest{
    return {
      u: login.username,
      p: login.password
    } as LoginRequest;
  }



  public static formatResponseSession( session: SessionRequest ): SessionUI{
    return {

      usuId: session.usu_id,
      usuActivo: session.usu_activo,
      usuEmail: session.usu_email,
      usuUltimoAcceso: session.usu_ultimo_acceso,
      usuNombre: session.nombre,
      sgeId: session.sge_id,
      sgeNombre: session.sge_nombre,
      gerId: session.ger_id,
      gerNombre: session.ger_nombre,
      insId: session.ins_id,
      insNombreAbrev: session.ins_nombre_abrev,
      perId: session.per_id,
      ubigeo: session.ubigeo,
      token: session.token,
      prfId: session.prf_id,
      prfNombre:session.prf_nombre,

    } as SessionUI;
  }



  public static formatResponseApp( app: AppRequest ): AppUI{
    return {
      prfId : app.prf_id,
      prfNombre : app.prf_nombre,
      sisId : app.sis_id,
      sisLogotipo : app.sis_logotipo,
      sisNombre : app.sis_nombre,
      sisUrl : app.sis_url

    } as AppUI;
  }

  public static formatResponseGeneralSession(generalSession: GeneralSessionRequest) : GeneralSessionUI{


    /*let apps=generalSession.apps.map((g)=>{ return this.formatResponseApp(g) });*/
    let  session =this.formatResponseSession( generalSession.sesion);

    return {
      /*apps:apps,*/
      sesion:session,
      message:generalSession.message,
      status:generalSession.status
    } as GeneralSessionUI


  }

  public static formatRequestProgramacion(p: ProgramacionRequest): ProgramacionUI{

    return {
      prg_direccion:p.prg_direccion,
      prg_geom_wkt : p.prg_geom_wkt,
      prg_id : p.prg_id,
      prg_lat:p.prg_lat,
      prg_nombre :p.prg_nombre,
      prg_lon : p.prg_lon,
      prg_referencia:p.prg_referencia,
      prg_tipo:p.prg_tipo,
      prg_tipo_desc: p.prg_tipo_desc,
      prg_fecha_fin : UtilHelper.parseUTCDate(p.prg_fecha_fin),
      prg_fecha_inicio : UtilHelper.parseUTCDate(p.prg_fecha_inicio),
      prg_geom_json : p.prg_geom_json,
      /*prg_fecha_fin :UtilHelper.parseUTCDate(p.prg_fecha_fin),
      prg_fecha_inicio:UtilHelper.parseUTCDate(p.prg_fecha_inicio)
*/

    } as ProgramacionUI
  }

  public static formatRequestEjecucion(e:EjecucionRequest): EjecucionUI{
    return {
eje_anio:e.eje_anio,
eje_direccion:e.eje_direccion,
eje_id:e.eje_id,
eje_nombre:e.eje_nombre,
eje_nro_beneficiados:e.eje_nro_beneficiados,
ubigeo:e.ubigeo,
nombdist:e.nombdist,
eje_lat:e.eje_lat,
eje_lon:e.eje_lon,
eje_geom_wkt:e.eje_geom_wkt,
eje_referencia:e.eje_referencia,
eje_fecha_inicio :UtilHelper.parseUTCDate(e.eje_fecha_inicio),
eje_fecha_fin: UtilHelper.parseUTCDate(e.eje_fecha_fin),
eej_nombre:e.eej_nombre,
eej_id :e.eej_id
    }as EjecucionUI
  }




/*

 prg_id ?:number;
  prg_tipo ?:number;
  prg_tipo_desc ?:string;
  prg_nombre ?:string;
  prg_direccion ?:string;
  prg_referencia ?:Date;
  prg_fecha_inicio ?:Date;
  prg_fecha_fin ?:string;
  prg_geom_wkt ?: string;
  prg_lon ?: number;
  prg_lat ?: number;

*/




}
