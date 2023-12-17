// store.ts
import { createStore, applyMiddleware, Store } from 'redux';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Actions
const ADD_MATCH = 'ADD_MATCH';
const DELETE_MATCH = 'DELETE_MATCH';
const UPDATE_MATCH = 'UPDATE_MATCH';

const addMatch = (matches: any) => ({
  type: ADD_MATCH,
  payload: matches,
});

const deleteMatch = (match: Match) => ({
  type: DELETE_MATCH,
  payload: match,
});

const updateMatch = (match: Match) => ({
  type: UPDATE_MATCH,
  payload: match,
});

// Types
type Match = {
  eventName: string;
  participants: string[];
  date: string;
  from: string;
  to: string;
};

type AppState = {
  matches: Match[];
};

// Reducers
const initialState: AppState = {
  matches: [],
};

const rootReducer = (state: AppState = initialState, action: any) => {
  switch (action.type) {
    case ADD_MATCH:
      return {
        ...state,
        matches: [...state.matches, ...action.payload],
      };
    case DELETE_MATCH:
      return {
        ...state,
        matches: state.matches.filter((match: Match) => match !== action.payload),
      };
    case UPDATE_MATCH:
      const updatedIndex = state.matches.findIndex((match: Match) => match.date === action.payload.date);
      if (updatedIndex !== -1) {
        const updatedMatches = [...state.matches];
        updatedMatches[updatedIndex] = action.payload;
        return {
          ...state,
          matches: updatedMatches,
        };
      }
      return state;
    default:
      return state;
  }
};

// Configuring Redux Persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['matches'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store and persistor
const store: Store<AppState, any, any> = createStore(persistedReducer);
const persistor: Persistor = persistStore(store);

export { store, persistor, addMatch, deleteMatch, updateMatch };
