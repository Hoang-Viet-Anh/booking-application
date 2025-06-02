import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { WorkspaceService } from '@workspaces/workspaces.service';
import { BookingFormData } from '@shared/types/booking/BookingFormData';
import { BookingsService } from '@bookings/bookings.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'booking-application';

  constructor(
    private workspaceService: WorkspaceService,
    private bookingsService: BookingsService,
  ) { }

  ngOnInit(): void {
    this.workspaceService.fetchWorkspaces();
  }

}
