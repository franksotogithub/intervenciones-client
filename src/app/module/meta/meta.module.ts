import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetaRoutingModule } from './meta-routing.module';

import { SharedModule } from '@app/shared/shared.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MetaAnualFormComponent } from './components/meta-anual-form/meta-anual-form.component';
import { MetaAnualListComponent } from './components/meta-anual-list/meta-anual-list.component';
import { ProgramacionListComponent } from './components/programacion-list/programacion-list.component';
import { ProgramacionFormComponent } from './components/programacion-form/programacion-form.component';
import { GerenciaService } from '../maestro/shared/services/gerencia/gerencia.service';
import { GerenciaApiService } from '../maestro/shared/services/gerencia/gerencia-api.service';
import { SubGerenciaService } from '../maestro/shared/services/subgerencia/subgerencia.service';
import { SubGerenciaApiService } from '../maestro/shared/services/subgerencia/subgerencia-api.service';
import { MetaAnualService } from './shared/services/meta-anual/meta-anual.service';
import { MetaAnualApiService } from './shared/services/meta-anual/meta-anual-api.service';
import { IndicadorService } from '../maestro/shared/services/indicador/indicador.service';
import { IndicadorApiService } from '../maestro/shared/services/indicador/indicador-api.service';
import { UnidadMedidaService } from '../maestro/shared/services/unidad-medida/unidad-medida.service';
import { UnidadMedidaApiService } from '../maestro/shared/services/unidad-medida/unidad-medida-api.service';
import { ProgramaService } from '../maestro/shared/services/programa/programa.service';
import { ProgramaApiService } from '../maestro/shared/services/programa/programa-api.service';
import { ActividadService } from '../maestro/shared/services/actividad/actividad.service';
import { ActividadApiService } from '../maestro/shared/services/actividad/actividad-api.service';
import { AccionService } from '../maestro/shared/services/accion/accion.service';
import { AccionApiService } from '../maestro/shared/services/accion/accion-api.service';
import { ProgramacionService } from './shared/services/programacion/programacion.service';
import { programacionApiService } from './shared/services/programacion/programacion-api.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { ProgramacionActividadService } from './shared/services/programacion-actividad/programacion-actividad.service';
import { ProgramacionActividadApiService } from './shared/services/programacion-actividad/programacion-actividad-api.service';
import { EjecucionListComponent } from './components/ejecucion-list/ejecucion-list.component';
import { EjecucionFormComponent } from './components/ejecucion-form/ejecucion-form.component';
import { EjecucionService } from './shared/services/ejecucion/ejecucion.service';
import { EjecucionApiService } from './shared/services/ejecucion/ejecucion-api.service';
import { EjecucionActividadService } from './shared/services/ejecucion-actividad/ejecucion-actividad.service';
import { EjecucionActividadApiService } from './shared/services/ejecucion-actividad/ejecucion-actividad-api.service';

import { PersonaApiService } from '@app/shared/services/persona/persona-api.service';
import { PersonaService } from '@app/shared/services/persona/persona.service';
import { ArchivoService } from '@app/shared/services/archivo/archivo.service';
import { ArchivoApiService } from '@app/shared/services/archivo/archivo-api.service';
import { EjecucionEvidenciaService } from './shared/services/ejecucion-evidencia/ejecucion-evidencia.service';
import { EjecucionEvidenciaApiService } from './shared/services/ejecucion-evidencia/ejecucion-evidencia-api.service';
import { EjecucionValidacionService } from './shared/services/ejecucion-validacion/ejecucion-validacion.service';
import { EjecucionValidacionApiService } from './shared/services/ejecucion-validacion/ejecucion-validacion-api.service';



@NgModule({
  declarations: [

    MetaAnualListComponent,
    ProgramacionListComponent,
    MetaAnualFormComponent,
    ProgramacionFormComponent,
EjecucionListComponent,
EjecucionFormComponent
  ],
  imports: [
    CommonModule,
    MetaRoutingModule,
    SharedModule,
    RxReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletDrawModule,
    LeafletModule
  ],
  providers:[
    {
      provide: GerenciaService,
      useClass: GerenciaApiService
    },
    {
      provide: SubGerenciaService,
      useClass: SubGerenciaApiService
    },

    {
      provide: MetaAnualService,
      useClass: MetaAnualApiService
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
      provide: ProgramaService,
      useClass: ProgramaApiService
    },

    {
      provide: ActividadService,
      useClass: ActividadApiService
    },

    {
      provide: AccionService,
      useClass: AccionApiService
    },


    {
      provide: ProgramacionService,
      useClass: programacionApiService
    },

    {
      provide: ProgramacionActividadService,
      useClass: ProgramacionActividadApiService
    },


    {
      provide: EjecucionService,
      useClass: EjecucionApiService
    },
    {
      provide: EjecucionActividadService,
      useClass: EjecucionActividadApiService
    },


    {
      provide: PersonaService,
      useClass: PersonaApiService
    },


    {
      provide: ArchivoService,
      useClass: ArchivoApiService
    },


    {
      provide: EjecucionEvidenciaService,
      useClass: EjecucionEvidenciaApiService
    },

    {
      provide: EjecucionValidacionService,
      useClass: EjecucionValidacionApiService
    },
  ]

})
export class MetaModule { }
