import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationEmailComponent } from './reservation-email.component';

describe('ReservationEmailComponent', () => {
  let component: ReservationEmailComponent;
  let fixture: ComponentFixture<ReservationEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
