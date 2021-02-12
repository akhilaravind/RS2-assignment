
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.route';

import {NavbarComponent} from './components/navbar/navbar.component';
import { DeleteConfirmation} from './components/confirmation/confirmation.component'
@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    DeleteConfirmation
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
