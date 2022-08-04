import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value: Array<any>, filterString: string, filterProp: string) {
    // If the value is empty or the filter string is empty, return the value as it is
    if (!value.length || filterString === '') {
      return value;
    }
    // Return a filtered array based on status.
    return value.filter((val => val[filterProp].startsWith(filterString)))
  }
}
