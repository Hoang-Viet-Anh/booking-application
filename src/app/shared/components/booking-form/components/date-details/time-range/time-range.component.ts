import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { DropdownOption } from '@shared/types/DropdownOption';
import { CustomDateUtil } from '@shared/utils/CustomDateUtil';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectDateSlot } from '@shared/store/create-booking/create-booking.selector';
import { selectEndTimePeriods, selectStartTimePeriods } from '@shared/store/date-time/date-time.selector';
import { updateBookingTime } from '@shared/store/create-booking/create-booking.actions';

@Component({
  selector: 'booking-time-range',
  imports: [DropdownComponent, CommonModule],
  templateUrl: './time-range.component.html',
  styleUrl: './time-range.component.css'
})
export class TimeRangeComponent {
  startTimePeriods$: Observable<DropdownOption[] | undefined>;
  endTimePeriods$: Observable<DropdownOption[] | undefined>;
  startDate$: Observable<Date | undefined>;
  endDate$: Observable<Date | undefined>;
  startTime$: Observable<DropdownOption | undefined>;
  endTime$: Observable<DropdownOption | undefined>;
  isStartTimeSelected$: Observable<boolean | undefined>;

  constructor(
    private store: Store
  ) {
    this.startTimePeriods$ = this.store.select(selectStartTimePeriods);
    this.endTimePeriods$ = this.store.select(selectEndTimePeriods);
    this.startDate$ = this.store.select(selectDateSlot).pipe(map(slot => slot?.startDate));
    this.endDate$ = this.store.select(selectDateSlot).pipe(map(slot => slot?.endDate));
    this.isStartTimeSelected$ = this.store.select(selectDateSlot).pipe(map(slot => slot?.isStartTimeSelected));

    this.startTime$ = this.store.select(selectDateSlot).pipe(map(slot => {
      if (!slot || !slot.startDate || !slot.isStartTimeSelected) return;
      return {
        id: slot.startDate.toISOString(),
        name: CustomDateUtil.timeFormat(slot.startDate)
      }
    }));
    this.endTime$ = this.store.select(selectDateSlot).pipe(map(slot => {
      if (!slot || !slot.endDate || !slot.isEndTimeSelected) return;
      return {
        id: slot.endDate.toISOString(),
        name: CustomDateUtil.timeFormat(slot.endDate)
      }
    }));
  }

  updateStartTime(startTime: string) {
    const time = new Date(startTime);
    this.store.dispatch(updateBookingTime({ time: { startDate: time, isStartTimeSelected: true } }));
  }

  updateEndTime(endTime: string) {
    const time = new Date(endTime);
    this.store.dispatch(updateBookingTime({ time: { endDate: time, isEndTimeSelected: true } }));
  }
}
