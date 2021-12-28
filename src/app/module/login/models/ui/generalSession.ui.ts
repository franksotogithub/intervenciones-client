

import { AppUI } from "./app.ui";
import { SessionUI } from "./session.ui";


export interface GeneralSessionUI {

  status :boolean;
  message :string;
  sesion : SessionUI;
  /*apps :AppUI[]*/

}
