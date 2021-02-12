import { Action } from '@ngrx/store';

interface ActionWithPayload<T> extends Action {
  payload?: T;
} 

export function UserReducer(state = false, action:ActionWithPayload<any>){
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return Object.assign({},state, action['payload']);
		case 'LOGOUT':
			return false;
		default:
			return state;

	}
}
