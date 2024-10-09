import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../reducers/userReducer'
//import { IUserState } from '../reducers/userReducer';

export const store = configureStore({
  reducer: {
    user: loginReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


console.log(store.dispatch)
