import { Component } from '@angular/core';
import { BookingListComponent } from "./components/booking-list/booking-list.component";

@Component({
  selector: 'app-bookings',
  imports: [BookingListComponent],
  templateUrl: './bookings.component.html',
})
export class BookingsComponent {

}
