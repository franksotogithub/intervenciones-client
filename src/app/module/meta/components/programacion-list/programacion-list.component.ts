import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GerenciaUI } from '@app/module/maestro/shared/models/gerencia/gerencia.ui';
import { ProgramaUI } from '@app/module/maestro/shared/models/programa/programa.ui';
import { GerenciaService } from '@app/module/maestro/shared/services/gerencia/gerencia.service';
import { ProgramaService } from '@app/module/maestro/shared/services/programa/programa.service';
import { ConfirmationService } from 'primeng/api';
import { MetaAnualUI } from '../../shared/models/meta-anual/meta-anual.ui';
import { ProgramacionUI } from '../../shared/models/programacion/programacion.ui';
import { MetaAnualService } from '../../shared/services/meta-anual/meta-anual.service';
import { ProgramacionService } from '../../shared/services/programacion/programacion.service';


@Component({
  selector: 'app-programacion-list',
  templateUrl: './programacion-list.component.html',
  styleUrls: ['./programacion-list.component.scss'],
    providers:[ConfirmationService]
})
export class ProgramacionListComponent implements OnInit {
  programas : ProgramaUI[]=[];
  gerencias: GerenciaUI[]=[];
  anio=new Date().getFullYear();
  filters ={ asi_anio:this.anio ,pro_id:null,ger_id:null}
  metas : MetaAnualUI[] =[];
  programaciones : ProgramacionUI[]=[];
  loading= false;
  constructor(private programacionService: ProgramacionService, private router:Router,private confirmationService: ConfirmationService,private metaAnualService: MetaAnualService
    , private gerenciaService: GerenciaService ,
    private programaService: ProgramaService
    ) { }

  ngOnInit(): void {
    this.list();
    this.metasList();
this.programaList();
this.gerenciaList();
    }

  actualizar(programacion:ProgramacionUI){
    this.router.navigate(['meta/programacion',programacion.prg_id,'update']);
  }


  crear(){

    this.router.navigate(['meta/programacion/create']);

  }

  eliminar(Programacion:ProgramacionUI){

    this.confirmationService.confirm({
      message: 'Desea eliminar la Intervencion?',
      accept: () => {
        const id = Programacion?.prg_id;
        if (id)
          this.programacionService.programacionDelete(id)?.subscribe((res:boolean)=>{
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
    this.programacionService.programacionList(this.filters)?.subscribe((res)=>{
      if(res)
      {
        this.programaciones = res;
      }
      this.loading= false;
    });
  }

  metasList(){
    this.loading= true;
    this.metaAnualService.metaAnualList()?.subscribe((res)=>{
      if(res)
      {
        this.metas = res;
      }
      this.loading= false;
    });

  }

  programaList(){

    this.programaService.programaList()?.subscribe((res)=>{
      if(res)
      {
        this.programas = res;

      }

    });
  }

  gerenciaList(){
    this.gerenciaService.gerenciaList()?.subscribe((res)=>{
      if(res){
        this.gerencias=res;
      }
    })
  }


}
