import {Component, OnInit} from '@angular/core';
import { AuthenticateService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
interface responseType{
    status: number
    message: string
    result: any
}
@Component({
    selector:'login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.scss'],
    providers:[AuthenticateService]
})

export class LoginComponent implements OnInit{
    constructor(
        private _service: AuthenticateService,
        private _store: Store,
        private _route: Router,
        private toast: ToastrService
    ){}

    formModel ={
        loginName:'',
        password:''
    }
    
    doLogin(form){
        if(form.valid){
            this._service.login(this.formModel)
            .subscribe((response: responseType) =>{
                if(response.status == 200 && response.result){
                    this._store.dispatch({type:'LOGIN_SUCCESS', payload: response.result});
                    localStorage.setItem('auth', JSON.stringify(response.result))
                    this._route.navigate(['/home'])
                }else{
                    this.toast.error(response.message)
                }
            })
        }

    }
    ngOnInit(){}
}