import * as ActionTypes from "../ActionTypes";


export const insertUser = (data) => (dispatch) => {
  dispatch({ type: ActionTypes.INSERT_USER, payload: data });
};

export const DeleteUser = (id) => (dispatch) => {
  console.log("deleted id",id);
  dispatch({ type: ActionTypes.DELETE_USER, payload: id });
};
export const EditUser = (data) => (dispatch) => {
  dispatch({ type: ActionTypes.EDIT_USER, payload: data });
};