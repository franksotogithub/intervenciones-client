import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@app/global/constants';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationService , MessageService} from 'primeng/api';
import { UnidadMedidaModel } from '../../shared/models/unidad-medida/unidad-medida.model';
import { UnidadMedidaService } from '../../shared/services/unidad-medida/unidad-medida.service';
@Component({
  selector: 'app-unidad-medida-form',
  templateUrl: './unidad-medida-form.component.html',
  styleUrls: ['./unidad-medida-form.component.scss'],
  providers :[ConfirmationService,MessageService]
})
export class UnidadMedidaFormComponent implements OnInit {

  unidadMedidaModel !:UnidadMedidaModel  ;
  title :string='';
  currentPage:string ='';
  loading: boolean = false;
  display :boolean = false;
  unidadMedidaFormGroup!:any ;

  constructor(
    private formBuilder: RxFormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private unidadMedidaService:UnidadMedidaService,

    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }


  ngOnInit(): void {
    this.settingPage();

    this.settingForm();
  }

  settingPage(){
    this.title = 'Nueva Unidad de Medida';
    this.activeRouter.url
      .subscribe(response=>{
        this.currentPage = response[response.length - 1].path;



        switch (this.currentPage) {
          case  Constants.PATH_CREATE:
            this.title ='Nueva Unidad de Medida';
            this.unidadMedidaModel =new UnidadMedidaModel();

            break;

          case  Constants.PATH_UPDATE:
            this.title ='Actualizar Unidad de Medida';
            this.listerParams();
            break;

        }
        console.log('this.currentPage>>>',this.currentPage);
      });
  }

  listerParams(){
    this.activeRouter.params.subscribe(params=>{
        let idUnidadMedida=params['idUnidadMedida'];
        this.unidadMedidaService.unidadMedidaGet(idUnidadMedida)?.subscribe(res=>{
          console.log('res>>',res)
          this.unidadMedidaModel = new  UnidadMedidaModel( res);

          console.log('this.UnidadMedidaModel>>>',this.unidadMedidaModel);
        });


    });

  }



  settingForm(): void {
    this.unidadMedidaFormGroup = this.formBuilder.formGroup(new UnidadMedidaModel());

    this.unidadMedidaFormGroup.valueChanges.subscribe((change:any) => {

      this.unidadMedidaModel.is_valid = this.unidadMedidaFormGroup.valid;

     });

  }

  save(){

    this.confirmationService.confirm({
      message: 'Esta seguro que desea guardar la informacion?',
      accept: () => {
        switch (this.currentPage) {
          case  Constants.PATH_UPDATE:
            this.unidadMedidaService.unidadMedidaUpdate(this.unidadMedidaModel)?.subscribe((res)=>{
              this.messageService.add({severity:'info', summary:'Datos guardados'});
              setTimeout(()=>{ this.regresar(); }, 2000);
              //this.regresar();
            });
            break;
          case  Constants.PATH_CREATE:
            this.unidadMedidaService.unidadMedidaCreate(this.unidadMedidaModel)?.subscribe((res)=>{
              this.messageService.add({severity:'info', summary:'Datos guardados'});
              setTimeout(()=>{ this.regresar(); }, 2000);
              //this.regresar();
            });
            break;
        }


        /*this.UnidadMedidaService.UnidadMedidaCreate(this.UnidadMedidaModel)?.subscribe((res)=>{
          this.messageService.add({severity:'info', summary:'Datos guardados'});
          this.regresar();
        });*/


      },
      acceptLabel: 'Si',
    });

  }

  regresar(){
    this.router.navigate(['maestro/unidad']);
  }



}
