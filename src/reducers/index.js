import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import history from '../utils/history'

const rootReducer = (state, action)=>{
    const appReducer = combineReducers(
        {router: connectRouter(history)}
    )
    
    return appReducer(state, action)
}


export default rootReducer;