import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appReducer from "./app.reducer";
import uiReducer from "./ui.reducer";

const appPersistConfig = {
    key: 'app',
    storage,
    whitelist: ['design']
}

const rootReducer = combineReducers({
    appReducer: persistReducer(appPersistConfig, appReducer),
    uiReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
