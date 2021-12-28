import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { EjecucionUI } from '../../shared/models/ejecucion/ejecucion.ui';
import { EjecucionService } from '../../shared/services/ejecucion/ejecucion.service';
@Component({
  selector: 'app-ejecucion-list',
  templateUrl: './ejecucion-list.component.html',
  styleUrls: ['./ejecucion-list.component.scss'],
  providers:[ConfirmationService]
})
export class EjecucionListComponent implements OnInit {

  filters ={ };

  ejecuciones : EjecucionUI[]=[];
  loading= false;
  constructor(private ejecucionService: EjecucionService, private router:Router,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.list();
    /*this.metasList();*/

    }

  actualizar(ejecucion:EjecucionUI){
    this.router.navigate(['meta/ejecucion',ejecucion.eje_id,'update']);
  }


  crear(){

    this.router.navigate(['meta/ejecucion/create']);

  }

  eliminar(Ejecucion:EjecucionUI){

    this.confirmationService.confirm({
      message: 'Desea eliminar la Intervencion?',
      accept: () => {
        const id = Ejecucion?.eje_id;
        if (id)
          this.ejecucionService.ejecucionDelete(id)?.subscribe((res:boolean)=>{
            if(res){
              this.list();
            }

          });
      }
    });
  }

changeFilter(){
  this.list();

}


  list(){
    this.loading= true;
    this.ejecucionService.ejecucionList(this.filters)?.subscribe((res)=>{
      if(res)
      {
        this.ejecuciones = res;
      }
      this.loading= false;
    });
  }

 /*metasList(){
    this.loading= true;
    this.metaAnualService.metaAnualList()?.subscribe((res)=>{
      if(res)
      {
        this.metas = res;
      }
      this.loading= false;
    });

  }
*/

}
