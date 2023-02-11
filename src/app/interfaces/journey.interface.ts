import { Flight } from "./flight.interface";

export interface Journey {
  Flights : Flight[];
  Origin : string;
  Destination : string;
  Price : number;
}
