import React from 'react'
import {NavLink} from 'react-router-dom'


const selectedStyle = {
    backgroundColor: 'white', color: 'red'
}

export default function AboutMenu({match}){
    return (<nav>
            <NavLink to={"/about"} style={match.isExact && selectedStyle}>[회사]</NavLink>
            <NavLink to={"/about/history"} activeStyle={selectedStyle}>[연역]</NavLink>
            <NavLink to={"/about/location"} activeStyle={selectedStyle}>[위치]</NavLink>
            <NavLink to={"/about/service"} activeStyle={selectedStyle}>[서비스]</NavLink>
 
        </nav>)
}

