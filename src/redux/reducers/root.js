import { combineReducers } from "redux";
import { userReducer } from "./user";
import { realtorReducer } from "./realtor";
import { messageReducer } from "./message";

const rootReducer = combineReducers({
  userReducer,
  realtorReducer,
  messageReducer,
});

export default rootReducer;
