import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDailyForecastDetailComponent } from './weather-daily-forecast-detail.component';

describe('WeatherDailyForecastDetailComponent', () => {
  let component: WeatherDailyForecastDetailComponent;
  let fixture: ComponentFixture<WeatherDailyForecastDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherDailyForecastDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherDailyForecastDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
