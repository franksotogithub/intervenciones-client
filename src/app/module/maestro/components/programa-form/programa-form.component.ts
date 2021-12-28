import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ProgramaModel } from '../../shared/models/programa/programa.model';
import { ConfirmationService , MessageService} from 'primeng/api';
import { ProgramaService } from '../../shared/services/programa/programa.service';
import { Constants } from '@app/global/constants';
@Component({
  selector: 'app-programa-form',
  templateUrl: './programa-form.component.html',
  styleUrls: ['./programa-form.component.scss'],
  providers :[ConfirmationService,MessageService]
})
export class ProgramaFormComponent implements OnInit {
  programaModel !:ProgramaModel  ;
  title :string='';
  currentPage:string ='';
  loading: boolean = false;
  display :boolean = false;
  programaFormGroup!:any ;
  constructor(
    private formBuilder: RxFormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private programaService:ProgramaService,

    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }


  ngOnInit(): void {
    this.settingPage();

    this.settingForm();
  }

  settingPage(){
    this.title = 'Nuevo Programa';
    this.activeRouter.url
      .subscribe(response=>{
        this.currentPage = response[response.length - 1].path;



        switch (this.currentPage) {
          case  Constants.PATH_CREATE:
            this.title ='Nuevo Programa';
            this.programaModel =new ProgramaModel();
            /*this.perfiles =[];*/
            break;

          case  Constants.PATH_UPDATE:
            this.title ='Actualizar programa';
            this.listerParams();
            break;

        }
        console.log('this.currentPage>>>',this.currentPage);
      });
  }

  listerParams(){
    this.activeRouter.params.subscribe(params=>{
        let idprograma=params['idPrograma'];
        this.programaService.programaGet(idprograma)?.subscribe(res=>{
          console.log('res>>',res)
          this.programaModel = new  ProgramaModel( res);

          console.log('this.programaModel>>>',this.programaModel);
        });


    });

  }



  settingForm(): void {
    this.programaFormGroup = this.formBuilder.formGroup(new ProgramaModel());

    this.programaFormGroup.valueChanges.subscribe((change:any) => {

      this.programaModel.is_valid = this.programaFormGroup.valid;

     });

  }

  save(){

    this.confirmationService.confirm({
      message: 'Esta seguro que desea guardar la informacion?',
      accept: () => {
        switch (this.currentPage) {
          case  Constants.PATH_UPDATE:
            this.programaService.programaUpdate(this.programaModel)?.subscribe((res)=>{
              this.messageService.add({severity:'info', summary:'Datos guardados'});
              setTimeout(()=>{ this.regresar(); }, 2000);
              //this.regresar();
            });
            break;
          case  Constants.PATH_CREATE:
            this.programaService.programaCreate(this.programaModel)?.subscribe((res)=>{
              this.messageService.add({severity:'info', summary:'Datos guardados'});
              setTimeout(()=>{ this.regresar(); }, 2000);
              //this.regresar();
            });
            break;
        }


        /*this.programaService.programaCreate(this.programaModel)?.subscribe((res)=>{
          this.messageService.add({severity:'info', summary:'Datos guardados'});
          this.regresar();
        });*/


      },
      acceptLabel: 'Si',
    });

  }

  regresar(){
    this.router.navigate(['maestro/programa']);
  }


}
