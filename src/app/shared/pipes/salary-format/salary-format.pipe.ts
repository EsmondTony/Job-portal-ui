import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salaryFormat',
  standalone: true
})
export class SalaryFormatPipe implements PipeTransform {

  transform(value: number, currencySymbol: string = '$'): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    }

    const absValue = Math.abs(value);

    if (absValue < 1000) {
      return `${currencySymbol}${value}`;
    } else if (absValue < 1_000_000) {
      return `${currencySymbol}${(value / 1000).toFixed(1)}K`;
    } else if (absValue < 1_000_000_000) {
      return `${currencySymbol}${(value / 1_000_000).toFixed(1)}M`;
    } else {
      return `${currencySymbol}${(value / 1_000_000_000).toFixed(1)}B`;
    }
  }

}
