import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatePickerComponent } from '@shared/components/date-picker/date-picker.component';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectBookingWorkspace, selectCreateBooking, selectDateSlot, selectMaxBookingDate } from '@shared/store/create-booking/create-booking.selector';
import { selectBookedDates } from '@shared/store/date-time/date-time.selector';
import { safeUpdateBookingDate } from '@shared/store/create-booking/create-booking.actions';
import { loadTimeSlots } from '@shared/store/date-time/date-time.actions';
import { CustomDateUtil } from '@shared/utils/CustomDateUtil';

@Component({
  selector: 'booking-date-range',
  imports: [
    DatePickerComponent,
    CommonModule
  ],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.css'
})
export class DateRangeComponent {
  areaCapacity$: Observable<number[]>;
  maxDate$: Observable<Date | undefined>;
  bookedDates$: Observable<Date[]>;
  isDatePickerEnabled$: Observable<boolean>;
  startDate$: Observable<Date | undefined>;
  endDate$: Observable<Date | undefined>;
  bookingDaysLimit$: Observable<number | undefined>;

  constructor(
    private store: Store
  ) {
    this.areaCapacity$ = this.store.select(selectCreateBooking).pipe(map(data => data.areaCapacity ?? []));
    this.maxDate$ = this.store.select(selectMaxBookingDate);
    this.bookedDates$ = this.store.select(selectBookedDates);
    this.isDatePickerEnabled$ = this.store.select(selectCreateBooking).pipe(map(data => !!(data.workspaceId && data.areaCapacity && data.areaCapacity.length > 0)));
    this.startDate$ = this.store.select(selectDateSlot).pipe(map(slot => slot?.startDate));
    this.endDate$ = this.store.select(selectDateSlot).pipe(map(slot => slot?.endDate));
    this.bookingDaysLimit$ = this.store.select(selectBookingWorkspace).pipe(map(workspace => workspace?.maxBookingDays));
  }

  updateStartDate(startDate: Date) {
    this.store.dispatch(safeUpdateBookingDate({ date: { startDate: CustomDateUtil.toUtcDate(startDate), isStartTimeSelected: false, isEndTimeSelected: false } }));
    this.store.dispatch(loadTimeSlots());
  }

  updateEndDate(endDate: Date) {
    this.store.dispatch(safeUpdateBookingDate({ date: { endDate: CustomDateUtil.toUtcDate(endDate), isStartTimeSelected: false, isEndTimeSelected: false } }));
    this.store.dispatch(loadTimeSlots())
  }

  get today(): Date {
    return new Date();
  }
}
