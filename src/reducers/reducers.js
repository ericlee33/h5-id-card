import { combineReducers } from 'redux';

import auth from './module/auth';

const rootReducer = combineReducers({
    auth,
});

export default rootReducer;
