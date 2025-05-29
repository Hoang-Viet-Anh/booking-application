import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationRoomsComponent } from './reservation-rooms.component';

describe('ReservationRoomsComponent', () => {
  let component: ReservationRoomsComponent;
  let fixture: ComponentFixture<ReservationRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
