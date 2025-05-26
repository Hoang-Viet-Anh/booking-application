import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReservationDateComponent } from './components/reservation-date/reservation-date.component';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';
import { ButtonComponent } from '../button/button.component';
import { LucideAngularModule, ChevronLeft } from 'lucide-angular';

@Component({
  standalone: true,
  imports: [
    LucideAngularModule,
    ReservationDateComponent,
    ReservationDetailsComponent,
    ButtonComponent
  ],
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
})
export class BookingFormComponent {
  readonly ChevronLeft = ChevronLeft;

  @Input() title: string = "Book a workspace";

  @Output() onClickBack = new EventEmitter<Event>();
}
