import { Action } from '@ngrx/store';

interface ActionWithPayload<T> extends Action {
  payload?: T;
} 
const defaultState={
    cart:[]
}
export function CartReducer(state = defaultState, action:ActionWithPayload<any>){
	switch (action.type) {
        case 'GET_CART_ITEMS_SUCCESS':
          return Object.assign({}, state, {cart: action['payload']});
        case 'ADD_TO_CART':
          return Object.assign({}, state, { cart: [...state.cart, action['payload']]})
        case 'REMOVE_ITEM_IN_CART':
          let cartItems = [...state.cart];
          const updatedCart = cartItems.filter(item => (item.id != action['payload']));
          return Object.assign({}, state, { cart: updatedCart})
        default:
			    return state;
	}
}
