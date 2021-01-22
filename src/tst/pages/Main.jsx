import React from 'react'
import {
    About, Contacts, Error, Events, 
    Home, Products
} from '../components'
import { 
    BrowserRouter as Router, Switch, Route
} from 'react-router-dom'

export default function Main(){
    return (<div>
        <Router>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/about' component={About}/>
                <Route path='/contacts' component={Contacts}/>
                <Route path='/events' component={Events}/>
                <Route path='/products' component={Products}/>
                <Route path='/events' component={Events}/>
                <Route component={Error}/>
            </Switch>
        </Router>
    </div>)
}
