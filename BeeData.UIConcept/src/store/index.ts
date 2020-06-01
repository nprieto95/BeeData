import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from "./reducers";

let loggerMiddleware = createLogger();

export default () => {
    let store = createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
    let persistor = persistStore(store);

    return { store, persistor };
};