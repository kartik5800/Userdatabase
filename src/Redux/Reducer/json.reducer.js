import * as ActionTypes from "../ActionTypes";


const initialValues = {
  json: [],
  error:'',
};
export const addjson = (state = initialValues, action) => {
  switch (action.type) {
    case ActionTypes.JSON_ADD:
      return {
        ...state,
        json: action.payload,
        error: '',
      };

      case ActionTypes.JSON_DELETE:
      return {
        ...state,
        json: state.json.filter((l) => l.id !== action.payload),
        error: "",
      };
      
    case ActionTypes.JSON_EDIT:
      return {
        ...state,
        json: state.json.map((m) => {
          if (m.id === action.payload.id) {
            return action.payload;
          } else {
            return m;
          }
        }),
      };


    default:
      return state;
  }
};