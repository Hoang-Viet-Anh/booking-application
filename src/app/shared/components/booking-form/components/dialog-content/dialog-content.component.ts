import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CustomDateUtil } from '@shared/utils/CustomDateUtil';
import { BookingFormService } from '../../booking-form.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../button/button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'booking-dialog-content',
  imports: [
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.css'
})
export class DialogContentComponent {
  email$: Observable<string | undefined>;
  workspaceType$: Observable<string | undefined>;
  startDate$: Observable<Date | undefined>;
  endDate$: Observable<Date | undefined>;
  roomSizes$: Observable<number[] | undefined>;

  @Input() dialogSuccess: boolean = true;

  @Output() onDialogClose = new EventEmitter();

  constructor(
    private bookingFormService: BookingFormService,
    private router: Router
  ) {
    this.email$ = this.bookingFormService.bookingFormData$.pipe(map(data => data.email));
    this.workspaceType$ = this.bookingFormService.bookingFormData$.pipe(map(data => data.workspaceType));
    this.startDate$ = this.bookingFormService.bookingFormData$.pipe(map(data => data.dateSlot?.startDate));
    this.endDate$ = this.bookingFormService.bookingFormData$.pipe(map(data => data.dateSlot?.endDate));
    this.roomSizes$ = this.bookingFormService.bookingFormData$.pipe(map(data => data.roomSizes));
  }



  onButtonClick(isSuccess: boolean) {
    if (isSuccess) {
      this.router.navigate(['/bookings']);
    } else {
      this.bookingFormService.updateForm({
        dateSlot: undefined,
      })
    }
    this.onDialogClose.emit();
  }

  isOpenSpace(): Observable<boolean | undefined> {
    return this.workspaceType$.pipe(map(workspaceType => workspaceType === 'Open space'));
  }

  roomSizesToString(): Observable<string | undefined> {
    return this.roomSizes$.pipe(
      map(roomSizes => {
        const text = this.bookingFormService.roomSizesToString(roomSizes);
        if (roomSizes) {
          if (roomSizes.length === 1) {
            return `room ${text}`;
          }
          return `rooms ${text}`;
        }
        return undefined;
      })
    );
  }

  startDateFormatted(): Observable<string | undefined> {
    return this.startDate$.pipe(map(date => CustomDateUtil.dateTimeFormat(date)));
  }

  endDateFormatted(): Observable<string | undefined> {
    return this.endDate$.pipe(map(date => CustomDateUtil.dateTimeFormat(date)));
  }
}
