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
    axios.get(`https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json`)
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
        alert(`searchAirports가 작동함, 입력한 값은  ${input}`)
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

    const handleInput = e => searchAirports( e.target.value )
    return (<div style={{outline: 'none', border: 0}}>
        <h1>공항 검색창</h1>
        
            <div  style={{outline: 'none', border: 0}}>
                <div style={{ width: '100%', display: 'block'}}>
                    <input
                        type = "text"
                        style={{ width: '50%'}}
                        placeholder = "공항이름, 코드번호, 도시명으로 검색가능합니다"
                        className = "Search"
                        onChange = { e => handleInput(e) }
                    />
                </div>    
            </div>
            <div className="Gap"></div>
            <h5 style={{ marginTop: 10, marginBottom: 10, fontSize: 15,
                        color: '#f0ad4e', textAlign: 'center'}}>
                {resultAvailable === true && "검색 결과"}   
                {selected === true && "조회된 공항 목록"}         
            </h5>
            {selected === true && 
                <div className="Results">
                    <div style={{ width: '100%', display: 'block'}}>
                        <span style={{ fontWeight: 'bold' }}>{airport.city}</span>
                        <span style={{ float: 'right'}}>{airport.icao}</span>
                    </div>
                    <p style={{ marginTop: 5, marginBottom: 0, paddingBottom: 5, color: '#777',
                borderBottom: '0.5px solid #9997'}}>{airport.name}</p>
                </div>
            }
            {selected === false && resultAvailable === true 
                && airports.map((item, i) =>  (<div className="Results">
                    <div style={{ width: '100%', display: 'block'}}>
                        <span style={{ fontWeight: 'bold' }}>{airport.city}</span>
                        <span style={{ float: 'right'}}>{airport.icao}</span>
                    </div>
                    <p style={{ marginTop: 5, marginBottom: 0, paddingBottom: 5, color: '#777',
                borderBottom: '0.5px solid #9997'}}>{airport.name}</p>
                </div>)
                )
                
            }
       
      
    </div>)
}

