import {combineReducers} from 'redux';
import {selectedObjectReducer} from './selected-object';

export const reducer = combineReducers({
  selectedObject: selectedObjectReducer
});
