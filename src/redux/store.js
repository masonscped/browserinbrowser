import {
    createStore
} from 'redux';

import browserReducer from './browser-reducer'

const store = createStore(browserReducer)
export default store;