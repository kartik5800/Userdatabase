import * as ActionTypes from "../ActionTypes";


export const jsonGet = (data) => (dispatch) => {
  dispatch({ type: ActionTypes.JSON_ADD, payload: data });
};

export const jsonDelete = (id) => (dispatch) => {
  dispatch({ type: ActionTypes.JSON_DELETE, payload: id });
};
export const jsonEdit = (data) => (dispatch) => {
  dispatch({ type: ActionTypes.JSON_EDIT, payload: data });
};