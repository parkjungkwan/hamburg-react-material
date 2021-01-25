import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { filterProps } from 'recharts/types/util/types'
import { SelectAllRounded } from '@material-ui/icons'


export const getAirports = data => ({type: "FETCH_AIRPORT", payload: data})

export const airportReducer = (state = [], action) => {
    switch (action.type){
        case "FETCH_AIRPORT" : return action.payload
        default: return state
    }
}

export const airportSearch = () => dispatch => {
    axios.get(`https://raw.githubusercontent.com/mwgg/Airports/master/airports.json`)
    .then( response => {
        dispatch(response.data)
    }).catch(error => {throw error})
}

export default function Airport(){
    const [airport, setAirport] = useState({})
    const [airports, setAirports] = useState([])
    const [selected, setSelected ] = useState(false)
    const [resultAvailable, setResult] = useState(false)
    return (<div>

    </div>)
}

