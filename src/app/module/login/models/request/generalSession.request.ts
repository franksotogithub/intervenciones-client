
import { AppRequest } from "./app.request";
import { SessionRequest } from "./session.request";

export interface GeneralSessionRequest {

  status :boolean;
  message :string;
  sesion : SessionRequest;
  apps : AppRequest[];


}
