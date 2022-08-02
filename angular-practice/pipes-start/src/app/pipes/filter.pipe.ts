import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  // This property updates the output in realtime whenever new data is added.
  // This is NOT recommended due to high performance impact.
  // pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    // If the array is empty or there is no filter, return all the values
    if (value.length === 0 || filterString === '') {
      return value;
    }
    // Return the array of filtered elements based on the filterString
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
