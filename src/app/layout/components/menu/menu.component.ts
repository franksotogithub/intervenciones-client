import { Component, OnInit } from '@angular/core';
import { AppUI } from '@app/module/login/models/ui/app.ui';
import { SessionUI } from '@app/module/login/models/ui/session.ui';
import { environment } from '@env/environment';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  aplicaciones: Array<AppUI> = [];
  session: SessionUI;

  administrador = false;
  constructor() {
    let apps = localStorage.getItem('apps');
    let l = localStorage.getItem('currentUser');
    this.session = l ? JSON.parse(l) : {};

    this.aplicaciones = apps ? JSON.parse(apps) : [];
    let admin =localStorage.getItem('administrador');
    this.administrador = admin&& parseInt(admin)==1? true:false;


  }

  ngOnInit(): void {

      this.items = [
        {
          label: 'Mantenimiento de Tablas Maestras',
          icon: 'pi pi-fw pi-map',
          items:[
            {
            label: 'Programas',
            icon: 'pi pi-fw pi-map',
            routerLink: ['/maestro/programa'],
          },
          {
            label: 'Linea de accion',
            icon: 'pi pi-fw pi-map',
            routerLink: ['/maestro/accion'],
          },
          {
            label: 'Actividad',
            icon: 'pi pi-fw pi-map',
            routerLink: ['/maestro/actividad'],
          },
          {
            label: 'Unidad de medida',
            icon: 'pi pi-fw pi-map',
            routerLink: ['/maestro/unidad'],
          },
          {
            label: 'Indicador',
            icon: 'pi pi-fw pi-map',
            routerLink: ['/maestro/indicador'],
          },

        ],


        },

{
        label: 'Monitoreo de Intervenciones',
        icon: 'pi pi-fw pi-map',
        items:[
          {
            label: 'Metas',
            icon: 'pi pi-fw pi-map',
            routerLink: ['/meta/meta_anual'],
          },
          {
            label: 'Programacion',
            icon: 'pi pi-fw pi-map',
            routerLink: ['/meta/programacion'],
          },

          {
            label: 'Ejecucion',
            icon: 'pi pi-fw pi-map',
            routerLink: ['/meta/ejecucion'],
          },
        ]
},



      ];


  }
}
