import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingFormService } from '@shared/components/booking-form/booking-form.service';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { DateSlot } from '@shared/types/booking/BookingFormData';
import { TimePeriod } from '@shared/types/booking/TimePeriod';
import { CustomDateUtil } from '@shared/utils/CustomDateUtil';
import { map, Observable, take } from 'rxjs';

@Component({
  selector: 'booking-time-range',
  imports: [DropdownComponent, CommonModule],
  templateUrl: './time-range.component.html',
  styleUrl: './time-range.component.css'
})
export class TimeRangeComponent {
  dateSlot$: Observable<DateSlot | undefined>;
  startTimePeriods$: Observable<TimePeriod[] | undefined>;
  endTimePeriods$: Observable<TimePeriod[] | undefined>;
  startTimeStrings$: Observable<string[] | undefined>;
  endTimeStrings$: Observable<string[] | undefined>;

  constructor(private bookingFormService: BookingFormService) {
    this.dateSlot$ = this.bookingFormService.bookingFormData$.pipe(map((data) => data.dateSlot));

    this.startTimePeriods$ = this.dateSlot$.pipe(map((slot) => {
      if (!slot || !slot.startDate) return;
      const timePeriods = this.generateTimePeriods(slot.startDate);
      return timePeriods;
    }));

    this.endTimePeriods$ = this.dateSlot$.pipe(map((slot) => {
      if (!slot || !slot.startDate || !slot.endDate) return;
      const timePeriods = this.generateTimePeriods(slot.endDate);

      if (CustomDateUtil.isSameDate(slot.startDate, slot.endDate)) {
        return timePeriods?.filter(p => CustomDateUtil.compareTime(p.time, slot.startDate!) > 0);
      }
      return timePeriods;
    }));

    this.endTimeStrings$ = this.endTimePeriods$.pipe(map((timePeriods) => timePeriods?.map(timePeriod => timePeriod.value)));
    this.startTimeStrings$ = this.startTimePeriods$.pipe(map((timePeriods) => timePeriods?.map(timePeriod => timePeriod.value)));
  }

  get startDate(): Observable<Date | undefined> {
    return this.dateSlot$.pipe(map(slot => slot?.startDate));
  }

  get endDate(): Observable<Date | undefined> {
    return this.dateSlot$.pipe(map(slot => slot?.endDate));
  }

  get startTime(): Observable<string | undefined> {
    return this.dateSlot$.pipe(map(slot => {
      if (!slot || !slot.startDate || !slot.isStartTimeSelected) return;
      return this.dateToTimeString(slot.startDate);
    }));
  }

  get endTime(): Observable<string | undefined> {
    return this.dateSlot$.pipe(map(slot => {
      if (!slot || !slot.endDate || !slot.isEndTimeSelected) return;
      return this.dateToTimeString(slot.endDate);
    }));
  }

  get isStartTimeSelected(): Observable<boolean | undefined> {
    return this.dateSlot$.pipe(map(slot => slot?.isStartTimeSelected));
  }

  get isEndTimeSelected(): Observable<boolean | undefined> {
    return this.dateSlot$.pipe(map(slot => slot?.isEndTimeSelected));
  }

  updateStartTime(startTime: string) {
    this.startTimePeriods$.pipe(take(1)).subscribe((periods) => {
      const found = periods?.find(p => p.value === startTime);
      if (found) {
        const time = new Date(found?.time);
        this.bookingFormService.updateTime({ startDate: time, isStartTimeSelected: true });
      }
    });
  }

  updateEndTime(endTime: string) {
    this.endTimePeriods$.pipe(take(1)).subscribe((periods) => {
      const found = periods?.find(p => p.value === endTime);
      if (found) {
        const time = new Date(found?.time);
        this.bookingFormService.updateTime({ endDate: time, isEndTimeSelected: true });
      }
    });
  }

  generateTimePeriods(date: Date): TimePeriod[] {
    const timePeriods = new Array(13).fill(0).map((_, i) => {
      const time = new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        i + 6,
        0,
      ));
      return { time, value: this.dateToTimeString(time) };
    });
    return timePeriods;
  }

  dateToTimeString(date: Date): string {
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }
}
