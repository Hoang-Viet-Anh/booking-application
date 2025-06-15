import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { InputComponent } from '@shared/components/input/input.component';
import { updateBooking } from '@shared/store/create-booking/create-booking.actions';
import { selectCreateBooking } from '@shared/store/create-booking/create-booking.selector';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'reservation-email',
  imports: [InputComponent, CommonModule],
  templateUrl: './reservation-email.component.html',
  styleUrl: './reservation-email.component.css'
})
export class ReservationEmailComponent {
  email$: Observable<string | undefined>;
  @Input() disabled = false;

  constructor(private store: Store) {
    this.email$ = this.store.select(selectCreateBooking).pipe(map(data => data.email));
  }

  updateEmail(email: string) {
    this.store.dispatch(updateBooking({ email }));
  }
}
