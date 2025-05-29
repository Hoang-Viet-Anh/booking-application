import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingFormService } from '@shared/components/booking-form/booking-form.service';
import { InputComponent } from '@shared/components/input/input.component';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'reservation-name',
  imports: [InputComponent, CommonModule],
  templateUrl: './reservation-name.component.html',
  styleUrl: './reservation-name.component.css'
})
export class ReservationNameComponent {
  name$: Observable<string>;

  constructor(private bookingFormService: BookingFormService) {
    this.name$ = this.bookingFormService.bookingFormData$.pipe(map((data) => data.name ?? ''));
  }

  updateName(name: string) {
    this.bookingFormService.updateForm({ name });
  }
}
