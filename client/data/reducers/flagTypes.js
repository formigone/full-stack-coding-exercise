import * as actionName from '../actions';

const defaultState = {
  items: [],
};

const FlagTypesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionName.FETCH_FLAG_TYPES_END:
      return { items: action.payload };
    default:
      return state;
  }
};

export default  FlagTypesReducer;
