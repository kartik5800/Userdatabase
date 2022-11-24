import { combineReducers } from "redux";
// import { addjson } from "./json.reducer";
import { addUser } from "./user.reducer";


export let rootReducer = combineReducers({
  user: addUser,
  // json:addjson
});
