import {SelectedObjectActionType, SelectedObjectActions, SelectedObjectStateType} from './selected-object.types';

export const selectedSet = (name: string, type: string, mass: number): SelectedObjectActionType => ({
  type: SelectedObjectActions.SELECTED_SET,
  payload: {
    name,
    type,
    mass,
  }
});

export const selectedRemove = (): SelectedObjectActionType => ({
  type: SelectedObjectActions.SELECTED_REMOVE,
  payload: {},
});
