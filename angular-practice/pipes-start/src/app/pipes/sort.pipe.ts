import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'sortByName',
  // Making the pipe 'impure' to update the sorted data whenever the data is changed.
  pure: false
})
export class SortPipe implements PipeTransform {

  // Function to sort the array by propName
  // sorter(a,b){
  //   if(a[propName] > b[propName]){
  //     return 1
  //   }
  //   if(a[propName] < b[propName]){
  //     return -1;
  //   }
  //   return 0;
  // }

  transform(value: any, propName: string) {
    if (value.length === 0) {
      return value
    }
    // Sorting using a function
    // return value.sort(sorter);
    // Inline Sorting
    return value.sort((a, b) => (a[propName] > b[propName]) ? 1 : (a[propName] < b[propName]) ? -1 : 0);
  }
}
