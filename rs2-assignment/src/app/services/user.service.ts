import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
interface responseType{
    status: number
    result: any
    message: string
}
@Injectable()
export class UserService {

  public userId;
  
  constructor(
    private store:Store,
    private http:HttpClient,
    private _toast: ToastrService
  ){
   
    this.store.select(state=> state['user'])
    .subscribe(data=>{
      if(data){
        this.userId = data.userId;
      }
    });
  }
 
// get all the item added in the cart
 getCartItems(){
    this.http.post('http://localhost:8080/api/v1/products',{userId: this.userId})
    .subscribe((res:responseType) =>{
        if(res.status == 200 && res.result){
            this.store.dispatch({type: 'GET_CART_ITEMS_SUCCESS', payload: res.result})
        }
    })
 }

// get product by search
getProductSearch(payload){
    return this.http.get(`http://localhost:8080/api/v1/search?productName=${payload.product}&type=${payload.type}`)
}

// Update the cart with new item
updateCart(payload){
    return this.http.post('http://localhost:8080/api/v1/addtocart', Object.assign({}, payload, {userId: this.userId}))
}

// Remove the selected item from cart
removeCartItem(cartItem){
    this.http.post('http://localhost:8080/api/v1/removeFromcart', {id: cartItem.id})
    .subscribe((res: responseType)=>{
        if(res.status == 200){
            this._toast.success('Successfully removed from cart');
            this.store.dispatch({type: 'REMOVE_ITEM_IN_CART', payload: cartItem.id});
        }else{
            this._toast.error('Error in removing from cart');
        }
    })
}

}
