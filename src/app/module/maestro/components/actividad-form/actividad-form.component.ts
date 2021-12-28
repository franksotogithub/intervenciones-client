import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@app/global/constants';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccionUI } from '../../shared/models/accion/accion.ui';
import { ActividadModel } from '../../shared/models/actividad/actividad.model';
import { ProgramaUI } from '../../shared/models/programa/programa.ui';
import { AccionService } from '../../shared/services/accion/accion.service';
import { ActividadService } from '../../shared/services/actividad/actividad.service';
import { ProgramaService } from '../../shared/services/programa/programa.service';

@Component({
  selector: 'app-actividad-form',
  templateUrl: './actividad-form.component.html',
  styleUrls: ['./actividad-form.component.scss'],
  providers :[ConfirmationService,MessageService]
})
export class ActividadFormComponent implements OnInit {

  programas : ProgramaUI[]=[];
  accions : AccionUI[]=[];
  actividadModel !:ActividadModel  ;
  title :string='';
  currentPage:string ='';
  loading: boolean = false;
  display :boolean = false;
  actividadFormGroup!:any ;
  constructor(
    private formBuilder: RxFormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private actividadService:ActividadService,
    private programaService : ProgramaService,
    private accionService: AccionService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }


  ngOnInit(): void {
    this.settingPage();

    this.settingForm();
    this.programaList();
    /*this.accionList();*/
  }

  settingPage(){
    this.title = 'Nueva Actividad';
    this.programaList();
    this.activeRouter.url
      .subscribe(response=>{
        this.currentPage = response[response.length - 1].path;



        switch (this.currentPage) {
          case  Constants.PATH_CREATE:
            this.title ='Nueva Actividad';
            this.actividadModel =new ActividadModel();


            break;

          case  Constants.PATH_UPDATE:
            this.title ='Actualizar Actividad';
            this.listerParams();
            break;

        }

      });
  }

  listerParams(){
    this.activeRouter.params.subscribe(params=>{
        let idActividad=params['idActividad'];
        this.actividadService.actividadGet(idActividad)?.subscribe(res=>{
          this.actividadModel = new  ActividadModel(res);
          console.log('this.ActividadModel>>>',this.actividadModel);
        });


    });

  }

  changePrograma(e:any):void{
    if(this.actividadModel.prg_id){
      this.accionList(this.actividadModel.prg_id);
    }

  }

  settingForm(): void {
    this.actividadFormGroup = this.formBuilder.formGroup(new ActividadModel());

    this.actividadFormGroup.valueChanges.subscribe((change:any) => {

      this.actividadModel.is_valid = this.actividadFormGroup.valid;

     });

  }

  save(){

    this.confirmationService.confirm({
      message: 'Esta seguro que desea guardar la informacion?',
      accept: () => {
        switch (this.currentPage) {
          case  Constants.PATH_UPDATE:
            this.actividadService.actividadUpdate(this.actividadModel)?.subscribe((res)=>{
              this.messageService.add({severity:'info', summary:'Datos guardados'});

              setTimeout(()=>{ this.regresar(); }, 2000);

            });
            break;
          case  Constants.PATH_CREATE:
            this.actividadService.actividadCreate(this.actividadModel)?.subscribe((res)=>{
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
    this.router.navigate(['maestro/actividad']);
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

    this.accionService.accionList()?.subscribe((res)=>{
      if(res)
      {
        if(idPrg){
          this.accions = res.filter( (r)=> { return r.prg_id == idPrg });

        }
        else {
          this.accions = res;
        }

      }
    });
  }


}
