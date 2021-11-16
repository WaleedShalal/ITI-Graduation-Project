import { combineReducers } from 'redux';
import * as allReducer from './shoppingcart/shoppingCartReducers';

const rootReducer = combineReducers({
  fetchedData: allReducer.fetchProductsReducer,
});

export default rootReducer;
