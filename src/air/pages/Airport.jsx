import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { debounce } from 'throttle-debounce'



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
        dispatch(getAirports(response.data))
    }).catch(error => {throw error})
}

export default function Airport(){
    const [airport, setAirport] = useState({})
    const [airports, setAirports] = useState([])
    const [selected, setSelected ] = useState(false)
    const [resultAvailable, setResult] = useState(false)
    const [loading, setLoading] = useState(false)

    const results = useSelector(state => airportReducer)
    const dispatch = useDispatch()

    useEffect(() =>{
        if(!results.data) fetch()
        else
        if(results.data.length > 0) changeTitle()
        if(airport.city !== undefined) changeTitle()
    })
    let fetch = () => dispatch(airportSearch())
    let fetched = () => setLoading(false)
    let changeTitle = () => document.title  = `공항검색결과: ${airport.airport}`
    let searchAirports = debounce(500, input => {
        let data = results.data
        if(input.length < 0) alert(` Error `)
        switch (input.length){
            case 0: 
            setAirports([])
            setResult(false)
            setSelected(false) 
            break
            case 1:
                setAirports(data.filter(
                    e => e.airport.charAt(0).toLowerCase() === input.toLowerCase()
                || e.city.toLowerCase().includes(input.toLowerCase())
                || e.icao.toLowerCase().includes(input.toLowerCase())))
                setResult(true)
                break
            default:
                setAirports(data.filter(
                    e => e.airport.toLowerCase().includes(input.toLowerCase())
                || e.city.toLowerCase().includes(input.toLowerCase())
                || e.icao.toLowerCase().includes(input.toLowerCase())))
                setResult(true)
                break
        }
    })
  
    return (<div>
        <h1>공항 검색창</h1>
    </div>)
}

