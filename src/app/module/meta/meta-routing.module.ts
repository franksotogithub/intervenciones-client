import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramaListComponent } from '../maestro/components/programa-list/programa-list.component';
import { EjecucionFormComponent } from './components/ejecucion-form/ejecucion-form.component';
import { EjecucionListComponent } from './components/ejecucion-list/ejecucion-list.component';
import { MetaAnualFormComponent } from './components/meta-anual-form/meta-anual-form.component';
import { MetaAnualListComponent } from './components/meta-anual-list/meta-anual-list.component';
import { ProgramacionFormComponent } from './components/programacion-form/programacion-form.component';
import { ProgramacionListComponent } from './components/programacion-list/programacion-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo:'meta_anual'
  },
  {
    path: 'meta_anual',
    component: MetaAnualListComponent
  },

  {
    path: 'meta_anual/create',
    component: MetaAnualFormComponent
  },

  {
    path: 'meta_anual/:idMetaAnual/update',
    component: MetaAnualFormComponent
  },

{
    path: 'programacion',
    component: ProgramacionListComponent
  },

  {
    path: 'programacion/create',
    component: ProgramacionFormComponent
  },
  {
    path: 'programacion/:idProgramacion/update',
    component: ProgramacionFormComponent
  },
  {
    path: 'ejecucion',
    component: EjecucionListComponent
  },


  {
    path: 'ejecucion/create',
    component: EjecucionFormComponent
  },

  {
    path: 'ejecucion/:idEjecucion/update',
    component: EjecucionFormComponent
  },


];


/*maestro/meta_anual/create*/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetaRoutingModule { }
