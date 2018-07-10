import * as actionName from '../actions';

const defaultState = {
  loading: false,
  saving: false,
  editing: {},
  items: [],
};

const FlagsReducer = (state = defaultState, action) => {
  console.log('flags reducer', { state, action });
  switch (action.type) {
    case actionName.FETCH_FLAGS_START:
      return {
        ...state,
        loading: true,
      };
    case actionName.FETCH_FLAGS_END:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case actionName.UPDATE_FLAG_PROP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.payload.property]: action.payload.value,
        },
      };
    case actionName.UPDATE_FLAG:
      return {
        ...state,
        items: state.items.map((flag) => {
          if (flag._id === action.payload._id) {
            return {
              ...action.payload,
              dateStart: new Date(action.payload.dateStart),
              dateEnd: new Date(action.payload.dateEnd),
            };
          }
          return flag;
        }),
      };
    case actionName.ADD_FLAG:
      return {
        ...state,
        editing: {},
        saving: false,
        items: [...state.items, action.payload],
      };
    case actionName.EDIT_FLAG:
      const a = state.items.reduce((acc, item) => {
        if (item.id === action.payload.id) {
          return item;
        }
        return acc;
      }, {});
      return {
        ...state,
        editing: state.items.reduce((acc, item) => {
          if (item._id === action.payload.id) {
            return item;
          }
          return acc;
        }, {}),
      };
    default:
      return state;
  }
};

export default FlagsReducer;
