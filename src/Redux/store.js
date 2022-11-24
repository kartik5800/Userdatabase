import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./Reducer";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configStore = () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));

  let persistor = persistStore(store);
  return { store, persistor };
};
