import {Reducer, Action} from 'redux';

export interface SelectedObjectStateType {
  name: string,
  type: string,
  mass: number,
}

export enum SelectedObjectActions {
  SELECTED_SET = 'SelectedObject/SELECTED_SET',
  SELECTED_REMOVE = 'SelectedObject/SELECTED_REMOVE',
}

export interface SelectedSetPayloadType {
  name: string,
  type: string,
  mass: number,
}

export interface SelectedObjectActionType extends Action {
  type: SelectedObjectActions,
  payload: SelectedSetPayloadType | {},
}

export type SelectedObjectReducerType = Reducer<SelectedObjectStateType, SelectedObjectActionType>;

