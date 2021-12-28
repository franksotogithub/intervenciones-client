import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { GeneralSessionUI } from '../models/ui/generalSession.ui';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  public login(data: LoginModel ): Observable<GeneralSessionUI>| null | undefined {
    return;
  }
}
