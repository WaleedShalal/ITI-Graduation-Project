import { combineReducers } from 'redux';
import * as allReducer from './cartReducers';

const rootReducer = combineReducers({
  fetchedData: allReducer.fetchProductsReducer,
});

export default rootReducer;
