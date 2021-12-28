import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndicadorUI } from '../../shared/models/indicador/indicador.ui';
import { ConfirmationService } from 'primeng/api';
import { IndicadorService } from '../../shared/services/indicador/indicador.service';
@Component({
  selector: 'app-indicador-list',
  templateUrl: './indicador-list.component.html',
  styleUrls: ['./indicador-list.component.scss'],
  providers: [ConfirmationService]
})
export class IndicadorListComponent implements OnInit {
  Indicadors : IndicadorUI[]=[];
  loading= false;
  constructor(private indicadorService: IndicadorService, private router:Router,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.list();
  }

  actualizar(Indicador:IndicadorUI){
    this.router.navigate(['maestro/indicador',Indicador.ind_id,'update']);
  }


  crear(){

    this.router.navigate(['maestro/indicador/create']);

  }

  eliminar(Indicador:IndicadorUI){

    this.confirmationService.confirm({
      message: 'Desea eliminar el Indicador?',
      accept: () => {
        const id = Indicador?.ind_id;
        if (id)
          this.indicadorService.indicadorDelete(id)?.subscribe((res:boolean)=>{
            if(res){
              this.list();
            }


          });
      }
    });
  }

  list(){
    this.loading= true;
    this.indicadorService.indicadorList()?.subscribe((res)=>{
      if(res)
      {
        this.Indicadors = res;
      }
      this.loading= false;
    });
  }
}
