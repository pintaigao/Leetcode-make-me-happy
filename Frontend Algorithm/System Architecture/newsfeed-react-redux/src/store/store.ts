import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { feedReducer } from './feedReducer';

const rootReducer = combineReducers({
  feed: feedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type Thunk<R = void> = (dispatch: AppDispatch, getState: () => RootState) => R;

export type AppDispatch = (action: any) => any;

const thunkMiddleware = (storeApi: { dispatch: AppDispatch; getState: () => RootState }) =>
  (next: (action: any) => any) =>
  (action: any) => {
    if (typeof action === 'function') {
      return action(storeApi.dispatch, storeApi.getState);
    }
    return next(action);
  };

// Redux DevTools (if present)
const composeEnhancers =
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
