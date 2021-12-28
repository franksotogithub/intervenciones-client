import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccionFormComponent } from './components/accion-form/accion-form.component';
import { AccionListComponent } from './components/accion-list/accion-list.component';
import { ActividadFormComponent } from './components/actividad-form/actividad-form.component';
import { ActividadListComponent } from './components/actividad-list/actividad-list.component';
import { IndicadorFormComponent } from './components/indicador-form/indicador-form.component';
import { IndicadorListComponent } from './components/indicador-list/indicador-list.component';
import { ProgramaFormComponent } from './components/programa-form/programa-form.component';
import { ProgramaListComponent } from './components/programa-list/programa-list.component';
import { UnidadMedidaFormComponent } from './components/unidad-medida-form/unidad-medida-form.component';
import { UnidadMedidaListComponent } from './components/unidad-medida-list/unidad-medida-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'programa'
  },
  {
    path: 'programa',
    component: ProgramaListComponent
  },
  {
    path: 'programa/:idPrograma/update',
    component: ProgramaFormComponent

  },

  {
    path: 'programa/create',
    component: ProgramaFormComponent

  },

  {
    path: 'accion',
    component: AccionListComponent
  },

  {
    path: 'accion/:idAccion/update',
    component: AccionFormComponent
  },

  {
    path: 'accion/create',
    component: AccionFormComponent
  },
  {
    path: 'actividad',
    component: ActividadListComponent
  },
  {
    path: 'actividad/:idActividad/update',
    component: ActividadFormComponent
  },
  {
    path: 'actividad/create',
    component: ActividadFormComponent
  },
  {
    path: 'unidad',
    component: UnidadMedidaListComponent
  },

  {
    path: 'unidad/:idUnidadMedida/update',
    component: UnidadMedidaFormComponent
  },

  {
    path: 'unidad/create',
    component: UnidadMedidaFormComponent
  },
  {
    path: 'indicador',
    component: IndicadorListComponent
  },
  {
    path: 'indicador/create',
    component: IndicadorFormComponent
  },
  {
    path: 'indicador/:idIndicador/update',
    component: IndicadorFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaestroRoutingModule { }
