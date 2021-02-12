import { ActionReducer, MetaReducer } from '@ngrx/store';
import { UserReducer } from './reducers/user.reducer';
import { CartReducer } from './reducers/cart.reducer';
// import { ProductReducer } from './reducers/product.reducer';
export const reducer = {
  user:UserReducer,
  cart: CartReducer
}
export function rootReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    switch (action.type) {
        case 'LOGOUT':
          localStorage.clear();
          state = undefined;
    }

    return reducer(state, action);
  }
}
export const metaReducers: MetaReducer<any>[] = [rootReducer];