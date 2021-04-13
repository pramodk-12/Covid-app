import React, { useContext } from "react"
import { StateContext } from "../Context/Contextprovider"
import "./Info.css"
import {HorizontalBar} from 'react-chartjs-2';


function Info() {

    const context  = useContext(StateContext)
    
    // ----- All statistics about daily covid cases
    
    const selectedStates = Object.keys(context.infoData).length
    const Tested = Object.values(context.infoData).map(data => data.delta.tested).reduce(function (s, v) { return s + (v || 0); }, 0);
    const Confirmed = Object.values(context.infoData).map(data => data.delta.confirmed).reduce(function (s, v) { return s + (v || 0); }, 0);
    const Recovered = Object.values(context.infoData).map(data => data.delta.recovered).reduce(function (s, v) { return s + (v || 0); }, 0);
    const Vaccinated = Object.values(context.infoData).map(data => data.delta.vaccinated).reduce(function (s, v) { return s + (v || 0); }, 0);
    const Deceased = Object.values(context.infoData).map(data => data.delta.deceased).reduce(function (s, v) { return s + (v || 0); }, 0);

    const chartData = {
        labels: Object.keys(context.infoData).map(state => context.stateNames[state]),
        datasets: [{
            label: 'Confirmed',
            data: Object.values(context.infoData).map(data => data.delta.confirmed),
            backgroundColor: 'Orangered'
         }, {
            label: 'Recovered',
            data: Object.values(context.infoData).map(data => data.delta.recovered),
            backgroundColor: 'Green'
         },
        ]
      };

      const options =  {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
           position: 'top' // place legend on the right side of chart
        },
        scales: {
           xAxes: [{
              stacked: true // this should be set to make the bars stacked
           }],
           yAxes: [{
              stacked: true,
              maxBarThickness: 20 ,// // this also..
              barThickness: 12,  // number (pixels) or 'flex'
           }]
        }
     }
    
    

    return (
        <div className="infodiv" >
            <div className="statsdiv" >
                <div className="infostat-box" >
                    <h5 className="info-type" >Selected</h5>
                    <h5 className="info-data" >{selectedStates}</h5>
                </div>
                <div className="infostat-box" >
                    <h5 className="info-type" >Tested</h5>
                    <h5 className="info-data" >{Tested}</h5>
                </div>
                <div className="infostat-box" >
                    <h5 className="info-type" >Confirmed</h5>
                    <h5 className="info-data" >{Confirmed}</h5>
                </div>
                <div className="infostat-box" >
                    <h5 className="info-type" >Recovered</h5>
                    <h5 className="info-data" >{Recovered}</h5>
                </div>
                <div className="infostat-box" >
                    <h5 className="info-type" >Vaccinated</h5>
                    <h5 className="info-data" >{Vaccinated}</h5>
                </div>
                <div className="infostat-box" >
                    <h5 className="info-type" >Deceased</h5>
                    <h5 className="info-data" >{Deceased}</h5>
                </div>
            </div>
            <HorizontalBar
                data={chartData}
                width={200}
                height={100}
                options={options}
            />
        </div>
    )
}

export default Info