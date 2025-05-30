import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingFormService } from '@shared/components/booking-form/booking-form.service';
import { DatePickerComponent } from '@shared/components/date-picker/date-picker.component';
import { DateSlot } from '@shared/types/booking/BookingFormData';
import { Workspace } from '@shared/types/workspace/Workspace';
import { WorkspaceService } from '@workspaces/workspaces.service';
import { combineLatest, map, Observable } from 'rxjs';

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
  dateSlot$: Observable<DateSlot | undefined>;
  workspace$: Observable<Workspace | undefined>;
  roomSize$: Observable<number[]>;
  maxDate$: Observable<Date | undefined>;

  constructor(
    private workspaceService: WorkspaceService,
    private bookingFormService: BookingFormService
  ) {
    this.dateSlot$ = this.bookingFormService.bookingFormData$.pipe(map(data => data.dateSlot))
    this.roomSize$ = this.bookingFormService.bookingFormData$.pipe(map(data => data.roomSizes ?? []));

    this.workspace$ = combineLatest([this.bookingFormService.bookingFormData$, this.workspaceService.workspaces$]).pipe(
      map(([data, workspaces]) => {
        if (!data.workspaceType) return;
        const workspace = workspaces.find((w) => w.title.toLowerCase() === data.workspaceType?.toLowerCase());
        return workspace;
      })
    );

    this.maxDate$ = combineLatest([this.startDate, this.workspace$]).pipe(
      map(([startDate, workspace]) => {
        if (!startDate) return;
        const max = new Date(startDate);
        const daysToAdd = (workspace?.maxBookingDays ?? 1) - 1;
        max.setDate(max.getDate() + daysToAdd);
        return max;
      })
    );
  }

  isEnabled(): Observable<boolean> {
    const roomSizeSelected = this.roomSize$.pipe(map(roomSizes => roomSizes?.length > 0));
    const workspaceTypeSelected = this.workspace$.pipe(map(workspace => !!workspace));

    return combineLatest([roomSizeSelected, workspaceTypeSelected]).pipe(map(([roomSizeSelected, workspaceTypeSelected]) => {
      return (roomSizeSelected && workspaceTypeSelected);
    }));
  }

  updateStartDate(startDate: Date) {
    this.bookingFormService.updateDate({ startDate, isStartTimeSelected: false });
  }

  updateEndDate(endDate: Date) {
    this.bookingFormService.updateDate({ endDate, isEndTimeSelected: false });
  }

  get startDate(): Observable<Date | undefined> {
    return this.dateSlot$.pipe(map(slot => slot?.startDate));
  }

  get endDate(): Observable<Date | undefined> {
    return this.dateSlot$.pipe(map(slot => slot?.endDate));
  }

  get today(): Date {
    return new Date();
  }

}
