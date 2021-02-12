import { Injectable } from '@angular/core';
import { CanActivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot }    from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticateService implements CanActivate {

  private auth;
  public username;
  
  constructor(
    private router:Router ,
    private store:Store,
    private http:HttpClient,
  ){
   
    this.store.select(state=> state['user'])
    .subscribe(data=>{
      this.auth = data;
      if(data){
        this.username = data.loginName;
      }
    });
    this.checkUser();
  }
 
  login(payLoad){
    this.username = payLoad.loginName;
    return this.http
      .post('http://localhost:8080/api/v1/login', payLoad);
  }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) {
  	if(this.auth){return true};
    this.router.navigate(['/login']);
    return false;
  }

  checkUser(){
    let userData:any = localStorage.getItem('auth') || false;
    let userObj = JSON.parse(userData);
    if (!userObj) return false;
    if(userObj){
      this.username = userObj.loginName;
      this.store.dispatch({type:'LOGIN_SUCCESS', payload:userObj});
     
    }else{
      this.logout();
    }
  }

  getUsername(){
    return this.auth.username;
  }

  logout(){
    this.store.dispatch({type:'USER_LOGOUT'});
    localStorage.clear();
    this.router.navigate(['/']);
  }


}
