import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BookingListComponent } from "./components/booking-list/booking-list.component";
import { BookingsService } from './bookings.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-bookings',
  imports: [BookingListComponent],
  templateUrl: './bookings.component.html',
})
export class BookingsComponent implements OnInit {

  constructor(
    private bookingsService: BookingsService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.bookingsService.fetchBookings();
    }
  }

}
