import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationNameComponent } from './reservation-name.component';

describe('ReservationNameComponent', () => {
  let component: ReservationNameComponent;
  let fixture: ComponentFixture<ReservationNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
