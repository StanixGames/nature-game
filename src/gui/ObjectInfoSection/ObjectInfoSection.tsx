import React from 'react';
import {useSelector} from 'react-redux';
import {GUIStoreType} from '../../store/store.types';
import {SelectedObjectStateType} from '../../store/selected-object';
import './styles.css';

export function ObjectInfoSection() {
  const selectedObject = useSelector<GUIStoreType, SelectedObjectStateType>((state) => state.selectedObject);
  const {name, type, mass} = selectedObject;
  
  if (!name) {
    return null;
  }
  return (
    <div className="ois-wrapper">
      Entity: {type}<br />
      ID: {name}<br/>
      Mass: {mass.toFixed(2)}
    </div>
  );
}
