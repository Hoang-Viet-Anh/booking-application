import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvailableDateService } from '@shared/components/booking-form/available-date.service';
import { BookingFormService } from '@shared/components/booking-form/booking-form.service';
import { DatePickerComponent } from '@shared/components/date-picker/date-picker.component';
import { DateSlot } from '@shared/types/booking/BookingFormData';
import { Workspace } from '@shared/types/workspace/Workspace';
import { CustomDateUtil } from '@shared/utils/CustomDateUtil';
import { combineLatest, map, Observable, take } from 'rxjs';

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
  // dateSlot$: Observable<DateSlot | undefined>;
  // maxBookingDays$: Observable<number | undefined>;
  // roomSize$: Observable<number[]>;
  // maxDate$: Observable<Date | undefined>;
  // bookedDates$: Observable<Date[]>;
  // workspace$: Observable<Workspace | undefined>;

  constructor(
    private bookingFormService: BookingFormService,
    private availableDateService: AvailableDateService,
  ) {
    // this.dateSlot$ = this.bookingFormService.bookingFormData$.pipe(map(data => data.dateSlot))
    // this.roomSize$ = this.bookingFormService.bookingFormData$.pipe(map(data => data.roomSizes ?? []));
    // this.maxBookingDays$ = this.bookingFormService.findWorkspace().pipe(map(workspace => workspace?.maxBookingDays));
    // this.bookedDates$ = this.availableDateService.bookedDates$;
    // this.workspace$ = this.bookingFormService.findWorkspace();

    // this.maxDate$ = combineLatest([this.startDate, this.maxBookingDays$, this.bookedDates$]).pipe(
    //   map(([startDate, maxBookingDays, bookedDates$]) => {
    //     if (!startDate) return;
    //     const max = new Date(startDate);
    //     const daysToAdd = (maxBookingDays ?? 1) - 1;
    //     max.setDate(max.getDate() + daysToAdd);

    //     const overlappingDate = bookedDates$.find(date => CustomDateUtil.compareDate(date, startDate) > 0 && CustomDateUtil.compareDate(date, max) < 0);
    //     if (overlappingDate) {
    //       return overlappingDate;
    //     }
    //     return max;
    //   })
    // );
  }

  // isEnabled(): Observable<boolean> {
  //   const roomSizeSelected = this.roomSize$.pipe(map(roomSizes => roomSizes?.length > 0));
  //   const workspaceTypeSelected = this.bookingFormService.findWorkspace().pipe(map(workspace => !!workspace));

  //   return combineLatest([roomSizeSelected, workspaceTypeSelected]).pipe(map(([roomSizeSelected, workspaceTypeSelected]) => {
  //     return (roomSizeSelected && workspaceTypeSelected);
  //   }));
  // }

  // updateStartDate(startDate: Date) {
  //   this.bookingFormService.updateDate({ startDate, isStartTimeSelected: false });
  //   this.bookingFormService.updateTimeSlots();
  // }

  // updateEndDate(endDate: Date) {
  //   this.bookingFormService.updateDate({ endDate, isEndTimeSelected: false });
  //   this.bookingFormService.updateTimeSlots();
  // }

  // get startDate(): Observable<Date | undefined> {
  //   return this.dateSlot$.pipe(map(slot => slot?.startDate));
  // }

  // get endDate(): Observable<Date | undefined> {
  //   return this.dateSlot$.pipe(map(slot => slot?.endDate));
  // }

  // get today(): Date {
  //   return new Date();
  // }

}
