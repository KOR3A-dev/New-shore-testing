import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http: HttpClient) {}

  getFlights() {
    return this.http.get(`https://recruiting-api.newshore.es/api/flights/2`);
  }
}
