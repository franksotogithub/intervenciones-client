import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '@app/global/constants';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IndicadorModel } from '../../shared/models/indicador/indicador.model';
import { IndicadorService } from '../../shared/services/indicador/indicador.service';

@Component({
  selector: 'app-indicador-form',
  templateUrl: './indicador-form.component.html',
  styleUrls: ['./indicador-form.component.scss'],
  providers :[ConfirmationService,MessageService]
})
export class IndicadorFormComponent implements OnInit {
  indicadorModel !:IndicadorModel ;
  title :string='';
  currentPage:string ='';
  loading: boolean = false;
  display :boolean = false;
  indicadorFormGroup!:any ;
  constructor(
    private formBuilder: RxFormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private indicadorService:IndicadorService,

    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }


  ngOnInit(): void {
    this.settingPage();

    this.settingForm();
  }

  settingPage(){
    this.title = 'Nuevo indicador';
    this.activeRouter.url
      .subscribe(response=>{
        this.currentPage = response[response.length - 1].path;



        switch (this.currentPage) {
          case  Constants.PATH_CREATE:
            this.title ='Nuevo indicador';
            this.indicadorModel =new IndicadorModel();
            /*this.perfiles =[];*/
            break;

          case  Constants.PATH_UPDATE:
            this.title ='Actualizar indicador';
            this.listerParams();
            break;

        }
        console.log('this.currentPage>>>',this.currentPage);
      });
  }


  listerParams(){
    this.activeRouter.params.subscribe(params=>{
        let idindicador=params['idIndicador'];
        this.indicadorService.indicadorGet(idindicador)?.subscribe(res=>{
          console.log('res>>',res)
          this.indicadorModel = new  IndicadorModel( res);

          console.log('this.indicadorModel>>>',this.indicadorModel);
        });
    });

  }



  settingForm(): void {
    this.indicadorFormGroup = this.formBuilder.formGroup(new IndicadorModel());

    this.indicadorFormGroup.valueChanges.subscribe((change:any) => {

      this.indicadorModel.is_valid = this.indicadorFormGroup.valid;

     });

  }

  save(){

    this.confirmationService.confirm({
      message: 'Esta seguro que desea guardar la informacion?',
      accept: () => {
        switch (this.currentPage) {
          case  Constants.PATH_UPDATE:
            this.indicadorService.indicadorUpdate(this.indicadorModel)?.subscribe((res)=>{
              this.messageService.add({severity:'info', summary:'Datos guardados'});
              setTimeout(()=>{ this.regresar(); }, 2000);
              //this.regresar();
            });
            break;
          case  Constants.PATH_CREATE:
            this.indicadorService.indicadorCreate(this.indicadorModel)?.subscribe((res)=>{
              this.messageService.add({severity:'info', summary:'Datos guardados'});
              setTimeout(()=>{ this.regresar(); }, 2000);
              //this.regresar();
            });
            break;
        }


        /*this.indicadorService.indicadorCreate(this.indicadorModel)?.subscribe((res)=>{
          this.messageService.add({severity:'info', summary:'Datos guardados'});
          this.regresar();
        });*/


      },
      acceptLabel: 'Si',
    });

  }

  regresar(){
    this.router.navigate(['maestro/indicador']);
  }

}
