import { ReactNode, useMemo } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector, Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import globalReducer from '@/state'
import { api } from '@/state/api'

import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import { loadState } from '@/state/localStorage'

/* REDUX PERSISTENCE */
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null)
    },
    setItem() {
      return Promise.resolve()
    },
    removeItem() {
      return Promise.resolve()
    }
  }
}

const storage = typeof window === 'undefined' ? createNoopStorage() : createWebStorage('local')

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['global']
}
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const preloadedState = loadState()

/* REDUX STORE */
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }).concat(api.middleware),
    preloadedState
  })
}

/* REDUX TYPES */
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

/* PROVIDER */
interface StoreProviderProps {
  children: ReactNode
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const memoizedStore = useMemo(() => makeStore(), [])

  return <Provider store={memoizedStore}>{children}</Provider>
}

export default StoreProvider
