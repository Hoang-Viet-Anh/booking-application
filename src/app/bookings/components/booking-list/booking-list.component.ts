import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingCardComponent } from "./components/booking-card/booking-card.component";
import { BookingsService } from '@bookings/bookings.service';
import { Observable } from 'rxjs';
import { BookingFormData } from '@shared/types/booking/BookingFormData';

@Component({
  selector: 'my-booking-list',
  imports: [ButtonComponent, CommonModule, BookingCardComponent],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent {
  myBookings$: Observable<BookingFormData[] | undefined>;

  @Input() bookingList = true;

  constructor(
    private router: Router,
    private bookingsService: BookingsService
  ) {
    this.myBookings$ = this.bookingsService.myBookings$;
  }

  onClickWorkspaces() {
    this.router.navigate(['/workspaces']);
  }
}
