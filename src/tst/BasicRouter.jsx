import React from 'react'
import { BrowserRouter as Router,
Switch, Route, Link} from 'react-router-dom'

export default function BasicRouter(){
    return (<>
    <div style={{border: '1px solid black', width: '400px', margin: '100px auto', }}>
        <nav>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Users</li>
            </ul>
        </nav>
    </div>
    </>)
}