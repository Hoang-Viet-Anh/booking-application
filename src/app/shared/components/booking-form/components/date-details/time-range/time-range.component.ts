import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvailableDateService } from '@shared/components/booking-form/available-date.service';
import { BookingFormService } from '@shared/components/booking-form/booking-form.service';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { DateSlot } from '@shared/types/booking/BookingFormData';
import { DropdownOption } from '@shared/types/DropdownOption';
import { CustomDateUtil } from '@shared/utils/CustomDateUtil';
import { combineLatest, map, Observable, take } from 'rxjs';

@Component({
  selector: 'booking-time-range',
  imports: [DropdownComponent, CommonModule],
  templateUrl: './time-range.component.html',
  styleUrl: './time-range.component.css'
})
export class TimeRangeComponent {
  dateSlot$: Observable<DateSlot | undefined>;
  startTimePeriods$: Observable<DropdownOption[] | undefined>;
  endTimePeriods$: Observable<DropdownOption[] | undefined>;

  constructor(
    private bookingFormService: BookingFormService,
    private availableDateService: AvailableDateService,
  ) {
    this.dateSlot$ = this.bookingFormService.bookingFormData$.pipe(map((data) => data.dateSlot));

    this.startTimePeriods$ = this.availableDateService.startTimeSlots$.pipe(map((slots) => {
      const timePeriods = slots.map(slot => {
        return {
          id: slot.toISOString(),
          name: this.dateToTimeString(slot)
        }
      });

      return timePeriods.slice(0, -1);
    }));

    this.endTimePeriods$ = combineLatest([this.dateSlot$, this.availableDateService.endTimeSlots$]).pipe(map(([dates, slots]) => {
      const timePeriods = slots.map(slot => {
        return {
          id: slot.toISOString(),
          name: this.dateToTimeString(slot)
        }
      });

      if (dates && dates.startDate && dates.endDate && CustomDateUtil.isSameDate(dates.startDate, dates.endDate)) {
        return timePeriods?.filter(p => {
          const time = new Date(p.id);
          return CustomDateUtil.compareTime(time, dates.startDate!) > 0;
        });
      }

      return timePeriods;
    }));

  }

  get startDate(): Observable<Date | undefined> {
    return this.dateSlot$.pipe(map(slot => slot?.startDate));
  }

  get endDate(): Observable<Date | undefined> {
    return this.dateSlot$.pipe(map(slot => slot?.endDate));
  }

  get startTime(): Observable<DropdownOption | undefined> {
    return this.dateSlot$.pipe(map(slot => {
      if (!slot || !slot.startDate || !slot.isStartTimeSelected) return;
      return {
        id: slot.startDate.toISOString(),
        name: this.dateToTimeString(slot.startDate)
      }
    }));
  }

  get endTime(): Observable<DropdownOption | undefined> {
    return this.dateSlot$.pipe(map(slot => {
      if (!slot || !slot.endDate || !slot.isEndTimeSelected) return;
      return {
        id: slot.endDate.toISOString(),
        name: this.dateToTimeString(slot.endDate)
      }
    }));
  }

  get isStartTimeSelected(): Observable<boolean | undefined> {
    return this.dateSlot$.pipe(map(slot => slot?.isStartTimeSelected));
  }

  get isEndTimeSelected(): Observable<boolean | undefined> {
    return this.dateSlot$.pipe(map(slot => slot?.isEndTimeSelected));
  }

  updateStartTime(startTime: string) {
    const time = new Date(startTime);
    this.bookingFormService.updateTime({ startDate: time, isStartTimeSelected: true });
  }

  updateEndTime(endTime: string) {
    const time = new Date(endTime);
    this.bookingFormService.updateTime({ endDate: time, isEndTimeSelected: true });
  }

  dateToTimeString(date: Date): string {
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }
}
