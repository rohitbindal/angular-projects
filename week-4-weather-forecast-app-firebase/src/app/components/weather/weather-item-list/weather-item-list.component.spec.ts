import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherItemListComponent } from './weather-item-list.component';

describe('WeatherItemListComponent', () => {
  let component: WeatherItemListComponent;
  let fixture: ComponentFixture<WeatherItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherItemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
