import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import { Router } from '@angular/router';
@Component({
    selector:'app-nav',
    templateUrl:'./navbar.component.html',
    styleUrls:['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
    constructor(  
        private store:Store,
        private route: Router
        ){
        }

    logout(){
        this.store.dispatch({type: 'LOGOUT'});
        this.route.navigate(['/login'])
    }
    ngOnInit(){}
}