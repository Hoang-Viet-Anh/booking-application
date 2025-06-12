import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingFormComponent } from '@shared/components/booking-form/booking-form.component';

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
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate([this.backRoute]);
    }
    // this.bookingsService.fetchBookingById(id!);
  }

  onClickBack() {
    this.router.navigate([this.backRoute]);
  }
}
