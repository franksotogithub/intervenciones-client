import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadMedidaUI } from '../../shared/models/unidad-medida/unidad-medida.ui';
import { UnidadMedidaService } from '../../shared/services/unidad-medida/unidad-medida.service';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-unidad-medida-list',
  templateUrl: './unidad-medida-list.component.html',
  styleUrls: ['./unidad-medida-list.component.scss'],
  providers: [ConfirmationService]
})
export class UnidadMedidaListComponent implements OnInit {

  unidadMedidas : UnidadMedidaUI[]=[];
  loading= false;
  constructor(private unidadMedidaService: UnidadMedidaService, private router:Router,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.list();
  }

  actualizar(UnidadMedida:UnidadMedidaUI){
    this.router.navigate(['maestro/unidad',UnidadMedida.ume_id,'update']);
  }


  crear(){

    this.router.navigate(['maestro/unidad/create']);

  }

  eliminar(UnidadMedida:UnidadMedidaUI){

    this.confirmationService.confirm({
      message: 'Desea eliminar la Unidad de Medida?',
      accept: () => {
        const id = UnidadMedida?.ume_id;
        if (id)
          this.unidadMedidaService.unidadMedidaDelete(id)?.subscribe((res:boolean)=>{
            if(res){
              this.list();
            }


          });
      }
    });
  }

  list(){
    this.loading= true;
    this.unidadMedidaService.unidadMedidaList()?.subscribe((res)=>{
      if(res)
      {
        this.unidadMedidas = res;
      }
      this.loading= false;
    });
  }
}
