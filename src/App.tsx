import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ComposableMap, Geographies, Geography,Marker,ZoomableGroup } from "react-simple-maps";
import ReactTooltip from 'react-tooltip';
import { Tooltip } from '@mui/material';
function App() {
  type markerType={
    markerOffset: number,
    name:string,
    coordinates:[number, number]
  }[]

  const markers:markerType=[{
    markerOffset:-15,
    name: "Demo 1",
    coordinates: [78,18]
  },
  {
    markerOffset:-15,
    name: "Demo 2",
    coordinates: [-18,-18]
  }
]
const tooltipRef=useRef<any>()

const[content,setContent]=useState<string>("")
  return (
    <div className="App"
    style={{
      width: '70%',
      height: '70%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid black',
      marginLeft: '20vw',
    }}>
      
      <div className="tooltip" ref={tooltipRef} id="tooltip" style={{opacity: 0}}>
        {content}
      </div>
      
      <ComposableMap>
      <ZoomableGroup zoom={1}>
      <Geographies geography="./features.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <>
           
            <Geography key={geo.rsmKey} data-for="registerTip" geography={geo}
            
            onMouseEnter={(e)=>{
              console.log(e.clientX, e.clientY)
              tooltipRef.current.style.opacity=0.9
             tooltipRef.current.style.left = e.clientX + "px";
             tooltipRef.current.style.top = e.clientY + "px";

              const {name}=geo.properties
              setContent(`${name}`)
            }}
            onMouseLeave={()=>{
              setContent("")
              tooltipRef.current.style.opacity = 0
            }} 
            style={{
              hover: {
               fill: "cyan",
              }
            }}
            />

            </>
          ))
        }
      </Geographies>
      {
        markers.map(({markerOffset,name,coordinates}) =>(
          <Marker key={name} coordinates={coordinates}>
            <circle r={10} fill="orange" stroke="white" strokeWidth={2}/>
            <text y={markerOffset} textAnchor="middle" style={{ fontFamily:"system-ui", fill: "blue" }}>{name}</text>
          </Marker>
        )) 
      }
      </ZoomableGroup>
    </ComposableMap>
    </div>
  );
}

export default App;
