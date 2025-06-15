import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { addAreaCapacity, removeAreaCapacity } from '@shared/store/create-booking/create-booking.actions';
import { selectBookingWorkspace, selectCoworkingAreaCapacities, selectCreateBooking } from '@shared/store/create-booking/create-booking.selector';
import { loadBookedDates } from '@shared/store/date-time/date-time.actions';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'reservation-rooms',
  imports: [CheckboxComponent, CommonModule],
  templateUrl: './reservation-rooms.component.html',
  styleUrl: './reservation-rooms.component.css'
})
export class ReservationRoomsComponent {
  areaType$: Observable<string | undefined>;
  bookedAreaCapacity$: Observable<number[] | undefined>
  areaCapacity$: Observable<number[] | undefined>

  constructor(
    private store: Store
  ) {
    this.areaType$ = this.store.select(selectBookingWorkspace).pipe(map(workspace => workspace?.areaType));
    this.bookedAreaCapacity$ = this.store.select(selectCreateBooking).pipe(map(data => data.areaCapacity));
    this.areaCapacity$ = this.store.select(selectCoworkingAreaCapacities)
  }

  onChangeAreaCapacity(size: number, isChecked: boolean) {
    if (isChecked) {
      this.store.dispatch(addAreaCapacity({ areaCapacity: size }));
    } else {
      this.store.dispatch(removeAreaCapacity({ areaCapacity: size }));
    }
    this.store.dispatch(loadBookedDates());
  }
}
