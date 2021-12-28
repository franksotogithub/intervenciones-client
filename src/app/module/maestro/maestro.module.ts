import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestroRoutingModule } from './maestro-routing.module';
import { ProgramaListComponent } from './components/programa-list/programa-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { AccionListComponent } from './components/accion-list/accion-list.component';
import { ActividadListComponent } from './components/actividad-list/actividad-list.component';
import { IndicadorListComponent } from './components/indicador-list/indicador-list.component';
import { UnidadMedidaListComponent } from './components/unidad-medida-list/unidad-medida-list.component';
import { ProgramaFormComponent } from './components/programa-form/programa-form.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramaService } from './shared/services/programa/programa.service';
import { ProgramaApiService } from './shared/services/programa/programa-api.service';
import { AccionFormComponent } from './components/accion-form/accion-form.component';
import { AccionService } from './shared/services/accion/accion.service';
import { AccionApiService } from './shared/services/accion/accion-api.service';
import { ActividadService } from './shared/services/actividad/actividad.service';
import { ActividadApiService } from './shared/services/actividad/actividad-api.service';
import { IndicadorService } from './shared/services/indicador/indicador.service';
import { IndicadorApiService } from './shared/services/indicador/indicador-api.service';
import { UnidadMedidaService } from './shared/services/unidad-medida/unidad-medida.service';
import { UnidadMedidaApiService } from './shared/services/unidad-medida/unidad-medida-api.service';
import { UnidadMedidaFormComponent } from './components/unidad-medida-form/unidad-medida-form.component';
import { IndicadorFormComponent } from './components/indicador-form/indicador-form.component';
import { ActividadFormComponent } from './components/actividad-form/actividad-form.component';
import { GerenciaService } from './shared/services/gerencia/gerencia.service';
import { GerenciaApiService } from './shared/services/gerencia/gerencia-api.service';

@NgModule({
  declarations: [
    ProgramaListComponent,
    AccionListComponent,
    ActividadListComponent,
    IndicadorListComponent,
    UnidadMedidaListComponent,
    ProgramaFormComponent,
    AccionFormComponent,
    UnidadMedidaFormComponent,
    IndicadorFormComponent,
    ActividadFormComponent
  ],
  imports: [
    CommonModule,
    MaestroRoutingModule,
    SharedModule,
    RxReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[
    {
      provide: ProgramaService,
      useClass: ProgramaApiService
    },
    {
      provide: AccionService,
      useClass: AccionApiService
    },
    {
      provide: ActividadService,
      useClass: ActividadApiService
    },
    {
      provide: IndicadorService,
      useClass: IndicadorApiService
    },
    {
      provide: UnidadMedidaService,
      useClass: UnidadMedidaApiService
    },
    {
      provide: GerenciaService,
      useClass: GerenciaApiService
    },

  ]
})
export class MaestroModule { }
