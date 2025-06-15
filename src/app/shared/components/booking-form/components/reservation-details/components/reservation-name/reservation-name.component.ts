import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { InputComponent } from '@shared/components/input/input.component';
import { updateBooking } from '@shared/store/create-booking/create-booking.actions';
import { selectCreateBooking } from '@shared/store/create-booking/create-booking.selector';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'reservation-name',
  imports: [InputComponent, CommonModule],
  templateUrl: './reservation-name.component.html',
  styleUrl: './reservation-name.component.css'
})
export class ReservationNameComponent {
  name$: Observable<string | undefined>;
  @Input() disabled = false;

  constructor(private store: Store) {
    this.name$ = this.store.select(selectCreateBooking).pipe(map(data => data.name));
  }

  updateName(name: string) {
    this.store.dispatch(updateBooking({ name }));
  }
}
