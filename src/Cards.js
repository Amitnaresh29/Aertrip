import { React,useState } from 'react'
import json from './api-data.json'
import './Card.css'

export default function Cards() {
  const [sortOrder, setSortOrder] = useState("default");
  const [finalData, setFinalData] = useState(json);

  const fillJF = (json) => {
    let tempJ = [];
    let tempF = [];
    for (var i = 0; i < json.data.flights.length; i++) {
      tempJ.push(json.data.flights[i].results.j);
      tempF.push(json.data.flights[i].results.f);
    }
    return [tempJ, tempF];
  };

  var flightsJF = fillJF(json)
  var flightsJ = flightsJF[0], flightsF = flightsJF[1];
  console.log(sortOrder);
  let SortedJ = [];
  return <div>

    <div>
      &nbsp;&nbsp;<label htmlFor="sort-order">Sort by Price: &nbsp;</label>
      <select id="sort-order" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
        <option value="default">default</option>
        <option value="price">Price (Low to High)</option>
        <option value="departure">Departure</option>
        <option value="arrival">Arrival</option>
        <option value="duration">duration</option>
      </select>
    </div>

    {flightsJ.map((e, i) => {
      return <p>
        {e.map((eachJ, eachIndex) => {
          if (sortOrder === "price") {
            SortedJ = eachJ.sort((a, b) => {
              return a.farepr - b.farepr;
            })
            return <p>{SortedJ.leg.map((eachLeg) => {
              return <p>
                {eachLeg.flights.map((eachFlight, FlightIndex) => {
                  //  console.log(eachFlight,"eaach filghts");
                  return <div className="card">
                    Departure City : {eachFlight.fr} &nbsp;&nbsp; Departure
                    Time : {eachFlight.dt} &nbsp;&nbsp; Arrival CIty : {eachFlight.to}
                    &nbsp;&nbsp; Arrival Time : {eachFlight.at} &nbsp;&nbsp;
                    Airline : {eachFlight.al} &nbsp;&nbsp; Total Time : {eachFlight.ft} &nbsp;&nbsp; Amount : {eachJ.farepr} Rs.
                  </div>;
                })}
              </p>;
            })}</p>;
          }
          else {
            return <p>{eachJ.leg.map((eachLeg) => {
              return <p>
                {eachLeg.flights.map((eachFlight, FlightIndex) => {
                  //  console.log(eachFlight,"eaach filghts");
                  return <div className="card">
                    Departure City : {eachFlight.fr} &nbsp;&nbsp; Departure
                    Time : {eachFlight.dt} &nbsp;&nbsp; Arrival CIty : {eachFlight.to}
                    &nbsp;&nbsp; Arrival Time : {eachFlight.at} &nbsp;&nbsp;
                    Airline : {eachFlight.al} &nbsp;&nbsp; Total Time : {eachFlight.ft} &nbsp;&nbsp; Amount : {eachJ.farepr} Rs.
                  </div>;
                })}
              </p>;
            })}</p>;
          }
        })}</p>;
    })}
  </div>;
}
