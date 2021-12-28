import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationService , MessageService} from 'primeng/api';
import { AccionModel } from '../../shared/models/accion/accion.model';
import { Constants } from '@app/global/constants';
import { AccionService } from '../../shared/services/accion/accion.service';
import { ProgramaUI } from '../../shared/models/programa/programa.ui';
import { ProgramaService } from '../../shared/services/programa/programa.service';

@Component({
  selector: 'app-accion-form',
  templateUrl: './accion-form.component.html',
  styleUrls: ['./accion-form.component.scss'],
  providers :[ConfirmationService,MessageService]
})
export class AccionFormComponent implements OnInit {

  programas : ProgramaUI[]=[];
  accionModel !:AccionModel  ;
  title :string='';
  currentPage:string ='';
  loading: boolean = false;
  display :boolean = false;
  accionFormGroup!:any ;
  constructor(
    private formBuilder: RxFormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private accionService:AccionService,
    private programaService : ProgramaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }


  ngOnInit(): void {
    this.settingPage();

    this.settingForm();

  }

  settingPage(){
    this.title = 'Nueva linea de accion';
    this.programaList();
    this.activeRouter.url
      .subscribe(response=>{
        this.currentPage = response[response.length - 1].path;



        switch (this.currentPage) {
          case  Constants.PATH_CREATE:
            this.title ='Nueva linea de accion';
            this.accionModel =new AccionModel();

            /*this.perfiles =[];*/
            break;

          case  Constants.PATH_UPDATE:
            this.title ='Actualizar linea accion';
            this.listerParams();
            break;

        }

      });
  }

  listerParams(){
    this.activeRouter.params.subscribe(params=>{
        let idaccion=params['idaccion'];
        this.accionService.accionGet(idaccion)?.subscribe(res=>{
          console.log('res>>',res)
          this.accionModel = new  AccionModel( res);

          console.log('this.accionModel>>>',this.accionModel);
        });


    });

  }



  settingForm(): void {
    this.accionFormGroup = this.formBuilder.formGroup(new AccionModel());

    this.accionFormGroup.valueChanges.subscribe((change:any) => {

      this.accionModel.is_valid = this.accionFormGroup.valid;

     });

  }

  save(){

    this.confirmationService.confirm({
      message: 'Esta seguro que desea guardar la informacion?',
      accept: () => {
        switch (this.currentPage) {
          case  Constants.PATH_UPDATE:
            this.accionService.accionUpdate(this.accionModel)?.subscribe((res)=>{
              this.messageService.add({severity:'info', summary:'Datos guardados'});

              setTimeout(()=>{ this.regresar(); }, 2000);
              //this.regresar();
            });
            break;
          case  Constants.PATH_CREATE:
            this.accionService.accionCreate(this.accionModel)?.subscribe((res)=>{
              this.messageService.add({severity:'info', summary:'Datos guardados'});
              setTimeout(()=>{ this.regresar(); }, 2000);
              //this.regresar();
            });
            break;
        }


      },
      acceptLabel: 'Si',
    });

  }

  regresar(){
    this.router.navigate(['maestro/accion']);
  }

  programaList(){

    this.programaService.programaList()?.subscribe((res)=>{
      if(res)
      {
        this.programas = res;
      }

    });
  }


}
