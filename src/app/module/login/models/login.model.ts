import { LoginUI } from "./ui/login.ui";
import { prop, required, numeric, NumericValueType, maxLength, compose, RxwebValidators, digit, minNumber, email, date, custom, minLength } from '@rxweb/reactive-form-validators';

export class LoginModel implements LoginUI {

  @prop()
  @required({ message: '* Campo obligatorio' })
  username: string  | null | undefined ;
  @prop()
  @required({ message: '* Campo obligatorio' })
  @minLength({ message: '* Debe contener al menos 5 caracteres',value:5 })
  password: string  | null | undefined ;

  constructor(u?:LoginUI){
    this.username= u?.username;
    this.password = u?.password;

  }
}
