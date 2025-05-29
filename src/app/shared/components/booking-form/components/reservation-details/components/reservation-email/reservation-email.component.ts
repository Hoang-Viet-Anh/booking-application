import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingFormService } from '@shared/components/booking-form/booking-form.service';
import { InputComponent } from '@shared/components/input/input.component';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'reservation-email',
  imports: [InputComponent, CommonModule],
  templateUrl: './reservation-email.component.html',
  styleUrl: './reservation-email.component.css'
})
export class ReservationEmailComponent {
  email$: Observable<string>;

  constructor(private bookingFormService: BookingFormService) {
    this.email$ = this.bookingFormService.bookingFormData$.pipe(map((data) => data.email ?? ''));
  }

  updateEmail(email: string) {
    this.bookingFormService.updateForm({ email });
  }
}
