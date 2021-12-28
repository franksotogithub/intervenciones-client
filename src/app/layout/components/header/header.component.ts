

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionUI } from '@app/module/login/models/ui/session.ui';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  display =false;
  items : Array<any>=[];
  title:string='';
  session?: SessionUI | null;

  label='';
  constructor( private router: Router,) {


  }

  ngOnInit(): void {
    let l=localStorage.getItem('currentUser')
    this.session   = l?JSON.parse(l):{};
    this.title = 'Sistema de intervenciones LTC';
    this.items = [

      {label: 'Salir', icon: 'pi pi-exit',

      command: () => {
        this.logout();
      }

    }
  ];
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

}
