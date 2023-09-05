import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module')
      .then( m => m.AuthModule )
  },
  {
    path:'dashboard',
    loadChildren: () => import('./todo/todo.module')
      .then( m => m.TodoModule )
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
