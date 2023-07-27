import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom',
})
export class CustomPipe implements PipeTransform {
  transform(value: any): any {
    // Modify the value as needed before it is displayed in the input field
    // For example, you can add a prefix or format the value
    return value ? `Prefix: ${value}` : '';
  }

  // If you want to transform the value back before updating the model (optional)
  parse(value: any): any {
    // Remove the prefix or revert the value back to its original format
    return value ? value.replace('Prefix: ', '') : '';
  }
}
