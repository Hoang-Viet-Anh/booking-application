import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BookingListComponent } from "./components/booking-list/booking-list.component";
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadBookings } from '@shared/store/booking/booking.actions';
import { AiAssistantComponent } from "./components/ai-assistant/ai-assistant.component";

@Component({
  selector: 'app-bookings',
  imports: [BookingListComponent, AiAssistantComponent],
  templateUrl: './bookings.component.html',
})
export class BookingsComponent implements OnInit {

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(loadBookings());
    }
  }

}
