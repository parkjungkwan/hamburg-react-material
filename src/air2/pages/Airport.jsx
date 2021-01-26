import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { debounce } from 'throttle-debounce'


export const setFlux = data => ({type: "FETCH_AIRPORT", payload: data})
export const airportReducer = (state =  [], action) => {
    switch (action.type){
        case "FETCH_AIRPORT" : return action.payload
        default: return state
    }
}

export default function Airport(){
    const [airport, setAirport] = useState({})
    const [airports, setAirports] = useState([])
    const [selected, setSelected ] = useState(false)
    const [resultAvailable, setResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const handleInput = e => { 
        e.preventDefault()
        setSearch(e.target.value.trim().toLowerCase())
    }    
    const mySearch = e => {
        e.preventDefault()
        alert(`검색공항 ${search}`)
        searchAirports(search)
    }
    const selectAirport = payload => {
        setSelected(true)
        setResult(false)
        setAirport({airport: payload.name, city: payload.city, icao: payload.icao})
    }
    const dispatch = useDispatch()
    const getFlux =  useSelector(state => state.airportReducer)
    useEffect(() =>{
        if(getFlux.length == 0 ){
            alert(`1`)
            axios.get(`https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json`)
            .then( response => {
                alert(`2 카운트:  ${response.data.length}`)
                dispatch(setFlux(response.data))
               
            }).catch(error => {throw error})
        }else{
            alert(`3 카운트:  ${getFlux.length}`)
            if(getFlux.length > 0){
                changeTitle()
            }
            if(airport.city !== undefined) {
                alert(`airport.city !== undefined 인 상황`)
                changeTitle()
            }   
        }
        
    })
    
    let changeTitle = () => document.title  = `공항검색결과:   ${airport.name}`
    let searchAirports = debounce(500, input => {
        alert(`searchAirports에 전달된 검색어 ${input}`)

        if(getFlux === undefined){
            alert(`getFlux is undefined`)
        }else{
            alert(`서울에 위치한 공항 ${getFlux.length}`)

        }
        if(input.length < 0) alert(` Error `)
        
        switch (input.length){
            case 0: 
            setAirports([])
            setResult(false)
            setSelected(false) 
            break
            case 1:
                setAirports(getFlux.filter(
                    e => e.name.charAt(0).toLowerCase() === input.toLowerCase()
                || e.city.toLowerCase().includes(input.toLowerCase())
                || e.icao.toLowerCase().includes(input.toLowerCase())))
                setResult(true)
                break
            default:
                setAirports(getFlux.filter(
                    e => e.name.toLowerCase().includes(input.toLowerCase())
                || e.city.toLowerCase().includes(input.toLowerCase())
                || e.icao.toLowerCase().includes(input.toLowerCase())))
                setResult(true)
                break
        }
    })

    return (<>
    <div className="title">공항검색</div>
    <div style={{outline: 'none', border: 0}}>
        {loading === false &&
            <div  style={{outline: 'none', border: 0}}>
                <div style={{ width: '100%', display: 'block'}}>
                    <input
                        type = "text"
                        style={{ width: '50%'}}
                        placeholder = "공항이름, 코드번호, 도시명으로 검색가능합니다"
                        className = "Search"
                        onChange={ e => handleInput(e)}
                    />
                    <button onClick = { e => mySearch(e) }> 검색 </button>
                </div>    
            
            <div className="Gap"></div>
            <h5 style={{ marginTop: 10, marginBottom: 10, fontSize: 15,
                        color: '#f0ad4e', textAlign: 'center'}}>
                {resultAvailable === true && "검색 결과"}   
                {selected === true && "조회된 공항 목록"}         
            </h5>
            {selected === true && 
                <div className="Results">
                    <div style={{ marginTop: 0, padding: 10}} onClick={() => selected(true)}>
                    <div style={{ width: '100%', display: 'block'}}>
                        <span style={{ fontWeight: 'bold' }}>{airport.city}</span>
                        <span style={{ float: 'right'}}>{airport.icao}</span>
                    </div>
                    <p style={{ marginTop: 5, marginBottom: 0, paddingBottom: 5, color: '#777',
                borderBottom: '0.5px solid #9997'}}>{airport.name}</p>
                </div>
             </div>
            }
            {selected === false && resultAvailable === true && airports.map((item, i) =>  (
                <div className="Results" key={i}>
                    <div style={{ marginTop: 0, padding: 10 }} id="Select" onClick={()=>{
                        selectAirport(item)}}>
                        <div style={{ width: '100%', display: 'block'}}>
                            <span style={{ fontWeight: 'bold' }}>{airport.city}</span>
                            <span style={{ float: 'right'}}>{airport.icao}</span>
                        </div>
                        <p style={{ marginTop: 5, marginBottom: 0, paddingBottom: 5, color: '#777',
                                    borderBottom: '0.5px solid #9997'}}>{airport.name}</p>
                        </div>

                    </div>
                    ))
            }
    </div>
    }
    </div>
    </>)
}

