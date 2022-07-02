import { createStore } from "redux";
import { userReducer } from "./tokens/UserReducer";

const store = createStore(userReducer)

export default store