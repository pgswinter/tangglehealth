import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import PostReducer from './getBillReducer'


const rootReducer = combineReducers({
  form: formReducer,
  bill: PostReducer
});

export default rootReducer;