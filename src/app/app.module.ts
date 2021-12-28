import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './core/interceptor/token.interceptor';
import { HttpErrorInterceptor } from './core/interceptor/http-error-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule

  ],
  providers: [ { provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },



  {
    provide : HTTP_INTERCEPTORS,
    useClass : HttpErrorInterceptor,
    multi: true
  }

],
  bootstrap: [AppComponent]
})
export class AppModule { }
