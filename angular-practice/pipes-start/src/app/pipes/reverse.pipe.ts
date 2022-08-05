import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform(value: string) {
    if (value.length) {
      // Reverse the string
      return value.split("").reverse().join("");
    }
    return value;
  }
}
