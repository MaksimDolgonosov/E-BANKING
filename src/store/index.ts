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

// fetch("http://localhost:3002/api/user/login/:", {
//   method: "GET",
//   body: JSON.stringify({
//     email: "max_air@bk.ru",
//     password: "263832"
//   }),
//   headers: { "Content-Type": "application/json" }
// })
//   .then(data => console.log(data))


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;



