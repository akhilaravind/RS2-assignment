import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { UserService } from '../../services/user.service'
import { Observable } from 'rxjs';
import { take } from 'rxjs/Operators';

interface responseType{
    status: number
    result:any
    message:string
}
@Component({
    selector:'home',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.scss'],
    providers: [UserService]
})

export class HomeComponent implements OnInit{
    constructor(  
        private store:Store,
        private route: Router,
        private service: UserService,
        private toast:ToastrService
        ){
            this.isUserLoggedIn();
            this.cartItems = this.store.select(state => state['cart']['cart'])
        }

    // items already added in the cart
    cartItems:Observable<any>;
    selectOptions= ['Books', 'Music', 'Games'];
    searchResult=[];
    error:any;
    formModel = {
        product:'',
        type:''
    }
    itemToRemove:any;

    // Check for if the user is logged in, if the data is found in the storage, then will pass to the store
    isUserLoggedIn(){
        const auth = localStorage.getItem('auth');
        if(auth){
            this.store.dispatch({type: 'LOGIN_SUCCESS', payload: JSON.parse(auth)})
        }else{
            this.route.navigate(['/login'])
        }
    }

    // get the products added in the db
    getCartItems(){
        this.service.getCartItems()
    }

    // Search for the product based on the name and type
    searchProduct(form){
        this.error = ''
        if(form.valid){
            if(form.value.product && !(/[a-zA-Z]/).test(form.value.product)){
                this.error = 'Invalid product name';
                return false;
            }else{
                this.searchResult = []
                this.service.getProductSearch(this.formModel)
                .subscribe((res: responseType)=>{
                    if(res.status == 200 && res.result.length ){
                        const products = res.result.map(product =>{
                            product.qty = 1;
                            return product;
                        })
                        this.searchResult = products; 
                    }else if(res.status == 200 && (!res.result.length)){
                        this.toast.error('No matching products found')
                    }else{
                        this.toast.error('Something went wrong')
                    }
                })
            }
        }
    }

    // Add product to the cart
    addToCart(product){
        this.cartItems
        .pipe(take(1))
        .subscribe(products =>{
            const list = products.filter(item =>(item.productId == product.id))
            if(!list.length){                
                
                this.updateCartItem(product)
            }else{
                this.toast.error('Already in the cart')
            }
        })
    }

    // insert the item into the cart table
    updateCartItem(product){
        const payload = {
            productId: product.id,
            qty: product.qty
        };
        this.service.updateCart(payload)
        .subscribe((res: responseType)=>{
            this.store.dispatch({type: 'ADD_TO_CART', payload: Object.assign({}, product,{productId: product.id})});
            this.toast.success(res.message)
        })
    }

    // Change event on the product qty
    updateProductQty(index, event){
        this.searchResult[index]['qty'] = event.target.value;
    }

    // Remove an item from cart
    removeCartItem(cartItem){
        this.itemToRemove = cartItem;
    }

    //event from confirm delete
    removeItem(status){
        if(status){
            this.service.removeCartItem(this.itemToRemove)
        }else{
            this.itemToRemove=null;
        }

    }
    
    ngOnInit(){
        this.getCartItems();
    }
}