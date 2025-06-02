import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingFormComponent } from '@shared/components/booking-form/booking-form.component';
import { BookingFormService } from '@shared/components/booking-form/booking-form.service';

@Component({
  selector: 'app-create-booking',
  imports: [BookingFormComponent],
  templateUrl: './create-booking.component.html',
})
export class CreateBookingComponent implements OnInit {
  constructor(
    private router: Router,
    private bookingFormService: BookingFormService
  ) { }

  ngOnInit(): void {
    this.bookingFormService.setBookingForm({});
  }

  onClickBack(event: Event) {
    this.router.navigate(['/workspaces']);
  }
}
