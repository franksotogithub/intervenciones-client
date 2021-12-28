import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProgramaModel } from '../../models/programa/programa.model';
import { ProgramaUI } from '../../models/programa/programa.ui';



@Injectable({
  providedIn: 'root',
})
export class ProgramaService {
  constructor() {}

  public programaList( ): Observable<ProgramaUI[]>| null | undefined {
    return;
  }
  public programaGet(id:number ): Observable<ProgramaUI>| null | undefined {
    return;
  }

  public programaUpdate(programa: ProgramaModel):Observable<boolean>| null | undefined{
    return;
  }
  public programaCreate(programa: ProgramaModel):Observable<boolean>| null | undefined{
    return;
  }

  public  programaDelete(id: number):Observable<boolean>| null | undefined{
    return;
  }
}
