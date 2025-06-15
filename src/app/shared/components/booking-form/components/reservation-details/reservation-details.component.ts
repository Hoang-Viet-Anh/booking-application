import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationNameComponent } from './components/reservation-name/reservation-name.component';
import { ReservationEmailComponent } from './components/reservation-email/reservation-email.component';
import { ReservationWorkspaceTypeComponent } from './components/reservation-workspace-type/reservation-workspace-type.component';
import { ReservationRoomsComponent } from "./components/reservation-rooms/reservation-rooms.component";

@Component({
  selector: 'booking-reservation-details',
  imports: [
    CommonModule,
    ReservationNameComponent,
    ReservationEmailComponent,
    ReservationWorkspaceTypeComponent,
    ReservationRoomsComponent
  ],
  templateUrl: './reservation-details.component.html',
})
export class ReservationDetailsComponent {
  @Input() nameDisabled: boolean = false;
  @Input() emailDisabled: boolean = false;
}
