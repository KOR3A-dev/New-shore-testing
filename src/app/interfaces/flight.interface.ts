export interface Flight {
  Origin: string;
  Destination: string;
  Price: number;
  Transport: {
    FlightCarrier: string;
    FlightNumber: string;
  };
}
