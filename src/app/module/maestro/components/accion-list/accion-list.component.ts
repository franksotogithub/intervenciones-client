import { Component, OnInit } from '@angular/core';
import { AccionUI } from '../../shared/models/accion/accion.ui';
import { ConfirmationService } from 'primeng/api';
import { AccionService } from '../../shared/services/accion/accion.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accion-list',
  templateUrl: './accion-list.component.html',
  styleUrls: ['./accion-list.component.scss'],
  providers: [ConfirmationService]
})
export class AccionListComponent implements OnInit {

  accions : AccionUI[]=[];
  loading= false;
  constructor(private accionService: AccionService, private router:Router,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.list();
  }

  actualizar(accion:AccionUI){
    this.router.navigate(['maestro/accion',accion.lia_id,'update']);
  }


  crear(){

    this.router.navigate(['maestro/accion/create']);

  }

  eliminar(accion:AccionUI){

    this.confirmationService.confirm({
      message: 'Desea eliminar el Accion?',
      accept: () => {
        const id = accion?.lia_id;
        if (id)
          this.accionService.accionDelete(id)?.subscribe((res:boolean)=>{
            if(res){
              this.list();
            }


          });
      }
    });
  }

  list(){
    this.loading= true;
    this.accionService.accionList()?.subscribe((res)=>{
      if(res)
      {
        this.accions = res;
      }
      this.loading= false;
    });
  }

}
