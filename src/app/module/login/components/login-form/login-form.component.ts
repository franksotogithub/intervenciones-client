import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { LoginModel } from '../../models/login.model';
import { GeneralSessionUI } from '../../models/ui/generalSession.ui';
import { LoginService } from '../../services/login.service';
import  * as Terraformer from 'terraformer';
/*import { wktToGeoJSON } from "@terraformer/wkt"*/

declare var wktToGeoJSON:any;
declare var geojsonToWKT:any;
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginModel :LoginModel;
  loginFormGroup :any ;
  image= `${environment.subdominion}/assets/img/municipalidad.png`;
  constructor(private formBuilder: RxFormBuilder,private loginService: LoginService,private router: Router,) {
    this.loginModel = new LoginModel();
    this.loginFormGroup = this.formBuilder.formGroup(new LoginModel());

  }

  ngOnInit(): void {
    this.settingForm();
  }

  settingForm(): void {

    console.log('loginFormGroup.controls>>>',this.loginFormGroup.controls)
  }

  login():void{
    let loginService=this.loginService.login(this.loginModel);

    if(loginService){
      loginService.subscribe((res:GeneralSessionUI)=>{
        if(res){
          console.log(res);
          localStorage.setItem('currentUser', JSON.stringify(res.sesion));
          /*localStorage.setItem('apps', JSON.stringify(res.apps));*/



          /*let aplicacion = res.apps.find((e) => {
            return e.prfId == environment.prfIdAdmin;
          });*/
          let aplicacion = true;

          let administrador = aplicacion ? '1' : '0';
          localStorage.setItem('administrador',  administrador);

          this.router.navigate(['/']);
        }
      });
    }

  }

}
