import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlightsService } from './services/flights.service'
import {MatSnackBar} from '@angular/material/snack-bar'
import { map } from 'rxjs'

import { AvailableFlights } from './interfaces/availables-flights.interface'
import { Journey } from './interfaces/journey.interface'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'New Shore'
  currency = 0
  defaultCurrency = 'USD'
  search = false
  change = false
  panelOpenState : boolean = false

  available_flights = new FormGroup({
    origin: new FormControl('', [Validators.maxLength(3)] ),
    destination: new FormControl('', [Validators.maxLength(3)]),
  })

  currencyChange  = new FormGroup({
    currency : new FormControl('')
  })

  listcurrency : any = [
    {value: 'EUR'},
    {value: 'GBP'},
    {value: 'USD'}
  ]

  payload:any
  journey: any

  constructor(private flightsService: FlightsService,private _snackBar: MatSnackBar) {}

  submit(origin: AvailableFlights, destination: AvailableFlights) {
    (origin == destination || this.available_flights.value.origin.length < 3 || this.available_flights.value.destination.length < 3) ? this.openSnackBar("You cannot send the same data", "OK")  :  this.payload = { origin : this.available_flights.value.origin.toUpperCase(), destination : this.available_flights.value.destination.toUpperCase(),}
    this.flightsService.getJourney(this.payload.origin,this.payload.destination).subscribe((response:any) => {
      this.journey = response
      this.available_flights.reset()
      this.search = true
    })
  }

  currencyExchange(currency : number) {
    this.change = true
    console.log(currency)
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action)
  }
}
