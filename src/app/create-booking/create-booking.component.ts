import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { coworkingRoute } from '@core/app.routes';
import { Store } from '@ngrx/store';
import { BookingFormComponent } from '@shared/components/booking-form/booking-form.component';
import { resetBooking, updateBooking } from '@shared/store/create-booking/create-booking.actions';

@Component({
  selector: 'app-create-booking',
  imports: [BookingFormComponent],
  templateUrl: './create-booking.component.html',
})
export class CreateBookingComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate([coworkingRoute]);
    }
    this.store.dispatch(resetBooking());
    this.store.dispatch(updateBooking({ coworkingId: id! }));
  }

  onClickBack() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate([coworkingRoute]);
      return;
    }
    this.router.navigate([`${coworkingRoute}/${id}/workspaces`])
  }
}
