import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

import { AuthenticateService } from '../../services/auth.service';
const routes: Routes = [
  { 
    path: '',
		component: HomeComponent,
    canActivate:[AuthenticateService]
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthenticateService]
})

export class HomeRoutingModule {}