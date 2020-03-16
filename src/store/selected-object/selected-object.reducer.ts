import {
  SelectedObjectReducerType,
  SelectedObjectStateType,
  SelectedObjectActionType,
  SelectedObjectActions,

  SelectedSetPayloadType,
} from './selected-object.types';

const initState: SelectedObjectStateType = {
  name: '',
  type: '',
  mass: 0,
};

export const selectedObjectReducer: SelectedObjectReducerType = (state = initState, action: SelectedObjectActionType) => {
  switch (action.type) {
    case SelectedObjectActions.SELECTED_SET: {
      const { name, type, mass } = action.payload as SelectedSetPayloadType;
      return {
        ...state,
        name,
        type,
        mass,
      };
    }
    case SelectedObjectActions.SELECTED_REMOVE: {
      return {
        ...state,
        name: '',
        type: '',
        mass: 0,
      };
    }
    default:
      return state;
  }
};
