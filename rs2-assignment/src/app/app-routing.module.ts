import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component'
import { HomeComponent } from './modules/home/home.component'
import { LoginModule } from './modules/login/login.module';
const routes: Routes = [
  {
    path:'home',
    loadChildren: ()=> import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, 
  {
    path: 'login',
    loadChildren: ()=> import('./modules/login/login.module').then(m => m.LoginModule)
  },
  { path: '**', component: NotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
