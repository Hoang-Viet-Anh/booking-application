import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingFormComponent } from '@shared/components/booking-form/booking-form.component';

@Component({
  selector: 'app-create-booking',
  imports: [BookingFormComponent],
  templateUrl: './create-booking.component.html',
})
export class CreateBookingComponent {
  constructor(private router: Router) { }

  onClickBack(event: Event) {
    event.preventDefault();
    this.router.navigate(['/workspaces']);
  }
}
