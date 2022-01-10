export interface EjecucionValidacionRequest{
  eva_id:number;

  eje_id:number;
  eva_mensaje:string;
  eej_id : number;

  fecha_crea?:Date;
  eej_nombre?:string;
}

