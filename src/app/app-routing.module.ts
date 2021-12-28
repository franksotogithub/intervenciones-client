import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    path: 'login',
    loadChildren :() => import('./module/login/login.module').then(m=> m.LoginModule),
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate:[LoginGuard],
    children:[

       {
                path: 'maestro',
                loadChildren: () => import('app/module/maestro/maestro.module')
                    .then(m => m.MaestroModule),

       },


       {
        path: 'meta',
        loadChildren: () => import('app/module/meta/meta.module')
            .then(m => m.MetaModule),

      },
    ]

  }

/*
  {
    path: '',
    loadChildren :() => import('./module/layout/layout.module').then(m=> m.LayoutModule),
    canActivate:[LoginGuard]

  },*/

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
