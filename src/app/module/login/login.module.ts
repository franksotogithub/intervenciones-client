import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { LoginService } from './services/login.service';
import { LoginMockService } from './services/login-mock.service';
import { LoginRoutingModule } from './login-routing.module';
import { LoginApiService } from './services/login-api.service';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [

    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    SharedModule,
    LoginRoutingModule

  ],
  providers: [

    {provide: LoginService ,useClass: LoginApiService},

  ]

})
export class LoginModule { }
