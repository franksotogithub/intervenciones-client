import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@app/global/constants';
import { AccionUI } from '@app/module/maestro/shared/models/accion/accion.ui';
import { ActividadUI } from '@app/module/maestro/shared/models/actividad/actividad.ui';
import { GerenciaUI } from '@app/module/maestro/shared/models/gerencia/gerencia.ui';
import { IndicadorUI } from '@app/module/maestro/shared/models/indicador/indicador.ui';
import { ProgramaUI } from '@app/module/maestro/shared/models/programa/programa.ui';
import { SubGerenciaUI } from '@app/module/maestro/shared/models/subgerencia/subgerencia.ui';
import { UnidadMedidaUI } from '@app/module/maestro/shared/models/unidad-medida/unidad-medida.ui';
import { AccionService } from '@app/module/maestro/shared/services/accion/accion.service';
import { ActividadService } from '@app/module/maestro/shared/services/actividad/actividad.service';
import { GerenciaService } from '@app/module/maestro/shared/services/gerencia/gerencia.service';
import { IndicadorApiService } from '@app/module/maestro/shared/services/indicador/indicador-api.service';
import { IndicadorService } from '@app/module/maestro/shared/services/indicador/indicador.service';
import { ProgramaService } from '@app/module/maestro/shared/services/programa/programa.service';
import { SubGerenciaService } from '@app/module/maestro/shared/services/subgerencia/subgerencia.service';
import { UnidadMedidaService } from '@app/module/maestro/shared/services/unidad-medida/unidad-medida.service';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MetaAnualModel } from '../../shared/models/meta-anual/meta-anual.model';
import { MetaAnualService } from '../../shared/services/meta-anual/meta-anual.service';

@Component({
  selector: 'app-meta-anual-form',
  templateUrl: './meta-anual-form.component.html',
  styleUrls: ['./meta-anual-form.component.scss'],
  providers:[ConfirmationService,MessageService]
})
export class MetaAnualFormComponent implements OnInit {

  programas : ProgramaUI[]=[];
  accions : AccionUI[]=[];
  actividades : ActividadUI[]=[];
  indicadores : IndicadorUI[]=[];
  unidades : UnidadMedidaUI[]=[];
  gerencias: GerenciaUI[]=[];
  subgerencias: SubGerenciaUI[]=[];

  metaAnualModel !:MetaAnualModel  ;
  title :string='';
  currentPage:string ='';
  loading: boolean = false;
  display :boolean = false;
  metaAnualFormGroup!:any ;
  constructor(
    private formBuilder: RxFormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private metaAnualService:MetaAnualService,
    private programaService : ProgramaService,
    private accionService: AccionService,
    private actividadService: ActividadService,
    private indicadorService: IndicadorService,
    private unidadService: UnidadMedidaService,
    private gerenciaService: GerenciaService,
    private subgerenciaService: SubGerenciaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }


  ngOnInit(): void {
    this.settingPage();

    this.settingForm();
    this.programaList();
    this.indicadorList();
    this.unidadesList();
    this.gerenciaList();
    this.subGerenciaList();

  }

  settingPage(){
    this.title = 'Nueva MetaAnual';
    this.programaList();
    this.activeRouter.url
      .subscribe(response=>{
        this.currentPage = response[response.length - 1].path;



        switch (this.currentPage) {
          case  Constants.PATH_CREATE:
            this.title ='Nueva MetaAnual';
            this.metaAnualModel =new MetaAnualModel();
            this.metaAnualModel.asi_anio =new Date().getFullYear();
            break;

          case  Constants.PATH_UPDATE:
            this.title ='Actualizar MetaAnual';
            this.listerParams();
            break;

        }

      });
  }

  listerParams(){
    this.activeRouter.params.subscribe(params=>{
        let idMetaAnual=params['idMetaAnual'];
        this.metaAnualService.metaAnualGet(idMetaAnual)?.subscribe(res=>{
          this.metaAnualModel = new  MetaAnualModel(res);
          console.log('this.MetaAnualModel>>>',this.metaAnualModel);
        });


    });

  }

  changePrograma(e:any):void{
    if(this.metaAnualModel.pro_id){
      this.accionList(this.metaAnualModel.pro_id);
    }

  }

  changeAccion(e:any):void{
    if( this.metaAnualModel.pro_id && this.metaAnualModel.lia_id){
      this.actividadList(this.metaAnualModel.pro_id, this.metaAnualModel.lia_id)
    }
  }




  settingForm(): void {
    this.metaAnualFormGroup = this.formBuilder.formGroup(new MetaAnualModel());

    this.metaAnualFormGroup.valueChanges.subscribe((change:any) => {

      this.metaAnualModel.is_valid = this.metaAnualFormGroup.valid;

     });

  }

  save(){

    this.confirmationService.confirm({
      message: 'Esta seguro que desea guardar la informacion?',
      accept: () => {
        switch (this.currentPage) {
          case  Constants.PATH_UPDATE:
            this.metaAnualService.metaAnualUpdate(this.metaAnualModel)?.subscribe((res)=>{
              this.messageService.add({severity:'info', summary:'Datos guardados'});

              setTimeout(()=>{ this.regresar(); }, 2000);

            });
            break;
          case  Constants.PATH_CREATE:
            this.metaAnualService.metaAnualCreate(this.metaAnualModel)?.subscribe((res)=>{
              this.messageService.add({severity:'info', summary:'Datos guardados'});
              setTimeout(()=>{ this.regresar(); }, 2000);
            });
            break;
        }
      },
      acceptLabel: 'Si',
    });

  }

  regresar(){
    this.router.navigate(['meta/meta_anual']);
  }

  programaList(){

    this.programaService.programaList()?.subscribe((res)=>{
      if(res)
      {
        this.programas = res;
      }

    });
  }

  accionList(idPrg?:number){
    let payload = {prg_id:idPrg }
    this.accionService.accionList(payload)?.subscribe((res)=>{
      if(res){
        this.accions = res;
      }


    });
  }


  actividadList(idPrg?:number,idLia?:number){

    let payload = {lia_id:idLia,prg_id:idPrg }
    this.actividadService.actividadList(payload)?.subscribe((res)=>{
      if(res)
      {
        this.actividades = res;
      }
    });

  }

  indicadorList(){
    this.indicadorService.indicadorList()?.subscribe((res)=>{
      if(res)
      {
        this.indicadores = res;
      }
    });
  }


  unidadesList(){
    this.unidadService.unidadMedidaList()?.subscribe((res)=>{
      if(res)
      {
        this.unidades = res;
      }
    });
  }


  gerenciaList(){
    this.gerenciaService.gerenciaList()?.subscribe((res)=>{
      if(res){
        this.gerencias = res;
      }
    })
  }

  subGerenciaList(){
    this.subgerenciaService.subGerenciaList()?.subscribe((res)=>{
      if(res){
        this.subgerencias = res;
      }
    })
  }

}
