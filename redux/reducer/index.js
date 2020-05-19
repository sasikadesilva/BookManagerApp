// Imports: Dependencies
import { combineReducers } from 'redux';
import bookItemReducer from './bookItemReducer'

// Imports: Reducers



// Redux: Root Reducer
const rootReducer = combineReducers({
    bookItemReducer : bookItemReducer,
   
});

// Exports
export default rootReducer;