import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SessionUI } from '@app/module/login/models/ui/session.ui';



@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(  private router: Router){}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean>  | boolean{
    let l=localStorage.getItem('currentUser');
    const currentUser : SessionUI |null= l?JSON.parse(l):null;
    const admin =localStorage.getItem('administrador');
    const administrador = admin&& parseInt(admin)==1? true:false;

    if(currentUser &&  administrador){
      return true;
    }


    this.router.navigate(['login']);
    return false;


  }

}
