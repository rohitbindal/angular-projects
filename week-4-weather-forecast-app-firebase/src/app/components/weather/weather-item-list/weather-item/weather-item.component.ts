import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../../../../services/data-storage/data-storage.service';
import { CurrentWeatherResponse } from '../../../../shared/common.model';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css'],
})
export class WeatherItemComponent implements OnInit {
  @Input('weatherData') weatherData!: CurrentWeatherResponse;
  @Input('index') index!: number;
  @Input('fromFirebase') firebase!: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _dataStorage: DataStorageService
  ) {}

  ngOnInit(): void {
    // console.log(this.weatherData);
  }

  onCardClick() {
    const location = this.weatherData.location.name.toLowerCase();
    this._router
      .navigate([location], {
        relativeTo: this._route,
      })
      .then(null);
  }

  onSave() {
    this._dataStorage.writeDataToDatabase(this.weatherData.location.name);
  }

  onDelete() {
    this._dataStorage.deleteData(this.index);
  }
}
