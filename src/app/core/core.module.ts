import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { HttpErrorInterceptor } from './interceptor/http-error-interceptor.service';
import { TokenInterceptor } from './interceptor/token.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  exports: [],
  providers: [
    /*
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },*/
/*
    { provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },*/
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
