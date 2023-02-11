import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { Journey } from './../interfaces/journey.interface';
import { Flight } from './../interfaces/flight.interface';
@Injectable({
  providedIn: "root",
})
export class FlightsService {
  constructor(private http: HttpClient) {}

  getJourney(origin : any, destination:any) {
    return this.http.get<Journey[]>("https://recruiting-api.newshore.es/api/flights/2").pipe(
      map((flights: any[]) => {
        const journey = this.findNextJourney(origin, destination, flights)
        const result : Journey = {
          Origin: flights[0].departureStation,
          Destination: flights[0].arrivalStation,
          Price: flights[0].price,
          Flights: flights.map(item => {
            let flight : Flight = {
              Origin: item.arrivalStation,
              Destination: item.departureStation,
              Price: item.price,
              Transport: {
                FlightCarrier: item.flightCarrier,
                FlightNumber: item.flightNumber,
              }
            }
            return flight
          }).filter(flight => flight.Origin == journey.departureStation || flight.Destination == journey.arrivalStation),
        }
        return result
      })
    );
  }

  findNextJourney(origin: any, destination: any, flights: any[]) :any {

    const filteredFlights = flights.filter(item => item.departureStation === origin)
    if (filteredFlights.length === 0) { return null }
    const nextJourney = filteredFlights[0]

    if (nextJourney.arrivalStation === destination) {
      return nextJourney
    }
    return this.findNextJourney(nextJourney.arrivalStation, destination, flights)
  }
}


