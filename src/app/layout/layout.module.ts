import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';

import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    HeaderComponent,
    LayoutComponent

  ],
  imports: [
    CommonModule,SharedModule
  ],
  exports:[LayoutComponent]
})
export class LayoutModule { }
