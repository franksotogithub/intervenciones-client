import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ActividadUI } from '../../shared/models/actividad/actividad.ui';
import { ActividadService } from '../../shared/services/actividad/actividad.service';

@Component({
  selector: 'app-actividad-list',
  templateUrl: './actividad-list.component.html',
  styleUrls: ['./actividad-list.component.scss'],
  providers: [ConfirmationService]
})
export class ActividadListComponent implements OnInit {


  actividades : ActividadUI[]=[];
  loading= false;
  constructor(private actividadService: ActividadService, private router:Router,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.list();
  }

  actualizar(actividad:ActividadUI){
    this.router.navigate(['maestro/actividad',actividad.act_id,'update']);
  }


  crear(){

    this.router.navigate(['maestro/actividad/create']);

  }

  eliminar(actividad:ActividadUI){

    this.confirmationService.confirm({
      message: 'Desea eliminar el Actividad?',
      accept: () => {
        const id = actividad?.lia_id;
        if (id)
          this.actividadService.actividadDelete(id)?.subscribe((res:boolean)=>{
            if(res){
              this.list();
            }


          });
      }
    });
  }

  list(){
    this.loading= true;
    this.actividadService.actividadList()?.subscribe((res)=>{
      if(res)
      {
        this.actividades = res;
      }
      this.loading= false;
    });
  }
}
