import { configureStore } from '@reduxjs/toolkit'
import users from './users'

const store = configureStore({
  reducer: users,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
})

export default store