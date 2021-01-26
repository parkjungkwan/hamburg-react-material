import './App.css';
/* import Blog from './bbs/pages/Blog' */
/* import Album from './bbs/pages/Album' */
/* import BasicRouter from './tst/BasicRouter' */
/* import Checkout from './sts/pages/Checkout' */
/* import Dashboard from './sts/pages/Dashboard' */
/* import SignInSide from './sym/pages/SignInSide' */
/* import Pricing from './uss/pages/Pricing' */
/* import SiginUp from './uss/pages/StdnJoin' */
/* import { Main } from './tst/pages' */
import { Airport } from './air/pages/index'
import { createStore, applyMiddleware  } from 'redux';
import { airportReducer } from './air/pages/Airport'
import { UserLogin } from './uss/pages/index'
import { combineReducers } from "redux"
import thunk from 'redux-thunk';
import {Provider} from'react-redux'
const rootReducer = combineReducers({
  airportReducer
})

export default function App() {
  return (
    <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
    <UserLogin/>
    </Provider>
  )
}

