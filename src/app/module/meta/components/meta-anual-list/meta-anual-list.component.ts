import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GerenciaUI } from '@app/module/maestro/shared/models/gerencia/gerencia.ui';
import { ProgramaUI } from '@app/module/maestro/shared/models/programa/programa.ui';
import { GerenciaService } from '@app/module/maestro/shared/services/gerencia/gerencia.service';
import { ProgramaService } from '@app/module/maestro/shared/services/programa/programa.service';
import { ConfirmationService } from 'primeng/api';
import { MetaAnualUI } from '../../shared/models/meta-anual/meta-anual.ui';
import { MetaAnualService } from '../../shared/services/meta-anual/meta-anual.service';

@Component({
  selector: 'app-meta-anual-list',
  templateUrl: './meta-anual-list.component.html',
  styleUrls: ['./meta-anual-list.component.scss'],
  providers:[ConfirmationService]
})
export class MetaAnualListComponent implements OnInit {
  programas : ProgramaUI[]=[];
  gerencias: GerenciaUI[]=[];
  filters ={ asi_anio:2021 ,pro_id:null,ger_id:null }
  metaAnuales : MetaAnualUI[]=[];
  loading= false;
  constructor(private metaAnualService: MetaAnualService, private router:Router,private confirmationService: ConfirmationService ,private programaService : ProgramaService, private gerenciaService: GerenciaService) { }

  ngOnInit(): void {
    this.list();
    this.programaList();
    this.gerenciaList();
    }

  actualizar(MetaAnual:MetaAnualUI){
    this.router.navigate(['meta/meta_anual',MetaAnual.asi_id,'update']);
  }


  crear(){

    this.router.navigate(['meta/meta_anual/create']);

  }

  eliminar(MetaAnual:MetaAnualUI){

    this.confirmationService.confirm({
      message: 'Desea eliminar el MetaAnual?',
      accept: () => {
        const id = MetaAnual?.asi_id;
        if (id)
          this.metaAnualService.metaAnualDelete(id)?.subscribe((res:boolean)=>{
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
    this.metaAnualService.metaAnualList(this.filters)?.subscribe((res)=>{
      if(res)
      {
        this.metaAnuales = res;
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
