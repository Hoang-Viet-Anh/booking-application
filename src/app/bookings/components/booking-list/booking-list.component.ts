import { Component } from '@angular/core';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingCardComponent } from "./components/booking-card/booking-card.component";
import { BookingsService } from '@bookings/bookings.service';
import { Observable, of } from 'rxjs';
import { BookingFormData } from '@shared/types/booking/BookingFormData';
import { Store } from '@ngrx/store';
import { selectAllBookings } from '@shared/store/booking/booking.selector';
import { coworkingRoute } from '@core/app.routes';

@Component({
  selector: 'my-booking-list',
  imports: [ButtonComponent, CommonModule, BookingCardComponent],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent {
  myBookings$: Observable<readonly BookingFormData[]> = of([]);

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.myBookings$ = this.store.select(selectAllBookings);
  }

  onClickWorkspaces() {
    this.router.navigate([coworkingRoute]);
  }
}
