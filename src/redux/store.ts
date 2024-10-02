import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slice/dataSlice';
import cartReducer from './slice/cartSlice';
import userReducer from './slice/userSlice';

const store = configureStore({
  reducer: {
    data: dataReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;