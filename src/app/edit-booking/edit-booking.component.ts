import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookingFormComponent } from '@shared/components/booking-form/booking-form.component';
import { editBooking } from '@shared/store/booking/booking.actions';
import { loadBookedDates, loadTimeSlots } from '@shared/store/date-time/date-time.actions';

@Component({
  selector: 'app-edit-booking',
  imports: [BookingFormComponent],
  templateUrl: './edit-booking.component.html',
  styleUrl: './edit-booking.component.css'
})
export class EditBookingComponent implements OnInit {
  backRoute = "/bookings";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate([this.backRoute]);
    }
    this.store.dispatch(editBooking({ id: id! }));
    this.store.dispatch(loadBookedDates());
    this.store.dispatch(loadTimeSlots());
  }

  onClickBack() {
    this.router.navigate([this.backRoute]);
  }
}
