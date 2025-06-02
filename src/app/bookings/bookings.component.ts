import { Component, OnInit } from '@angular/core';
import { BookingListComponent } from "./components/booking-list/booking-list.component";
import { BookingsService } from './bookings.service';

@Component({
  selector: 'app-bookings',
  imports: [BookingListComponent],
  templateUrl: './bookings.component.html',
})
export class BookingsComponent implements OnInit {

  constructor(
    private bookingsService: BookingsService
  ) { }

  ngOnInit(): void {
    this.bookingsService.fetchBookings();
  }

}
