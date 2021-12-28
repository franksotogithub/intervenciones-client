import { Component, OnInit } from '@angular/core';
import { ProgramaUI } from '../../shared/models/programa/programa.ui';
import { ConfirmationService } from 'primeng/api';
import { ProgramaService } from '../../shared/services/programa/programa.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-programa-list',
  templateUrl: './programa-list.component.html',
  styleUrls: ['./programa-list.component.scss'],
  providers: [ConfirmationService]
})
export class ProgramaListComponent implements OnInit {
  programas : ProgramaUI[]=[];
  loading= false;
  constructor(private programaService: ProgramaService, private router:Router,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.list();
  }

  actualizar(programa:ProgramaUI){
    this.router.navigate(['maestro/programa',programa.pro_id,'update']);
  }


  crear(){

    this.router.navigate(['maestro/programa/create']);

  }

  eliminar(programa:ProgramaUI){

    this.confirmationService.confirm({
      message: 'Desea eliminar el Programa?',
      accept: () => {
        const id = programa?.pro_id;
        if (id)
          this.programaService.programaDelete(id)?.subscribe((res:boolean)=>{
            if(res){
              this.list();
            }


          });
      }
    });
  }

  list(){
    this.loading= true;
    this.programaService.programaList()?.subscribe((res)=>{
      if(res)
      {
        this.programas = res;
      }
      this.loading= false;
    });
  }

}
