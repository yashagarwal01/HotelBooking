import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers"
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from "redux-persist/lib/storage"

const persistConfig = {key:"booking",storage,version:1}
const persistedReducer= persistReducer(persistConfig,reducer)
export const store = configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:{
        ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
      },
    })
  
})