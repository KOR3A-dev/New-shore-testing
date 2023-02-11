import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  private decimalPipe = new DecimalPipe('en-US');

  private currencySymbols: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    GBP: "£"
  };

  transform(value: number, currencyCode: string, symbolDisplay = true, digits = '1.2-2'): string {
    let currencySymbol = this.currencySymbols[currencyCode];
    let formattedValue = this.decimalPipe.transform(value, digits);
    return symbolDisplay ? `${formattedValue}` : `${currencyCode} ${formattedValue}`;
  }

}
