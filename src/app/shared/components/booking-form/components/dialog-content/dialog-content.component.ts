import { Component, EventEmitter, Input, Output } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { CustomDateUtil } from '@shared/utils/CustomDateUtil';
import { BookingFormService } from '../../booking-form.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../button/button.component";
import { Router } from '@angular/router';
import { WorkspaceService } from '@workspaces/workspaces.service';
import { StringFormatUtil } from '@shared/utils/StringFormatUtil';

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
  startDate$: Observable<Date | undefined>;
  endDate$: Observable<Date | undefined>;
  roomSizes$: Observable<number[] | undefined>;
  availabilityType$: Observable<string | undefined>;

  @Input() dialogSuccess: boolean = true;

  @Output() onDialogClose = new EventEmitter();

  constructor(
    private bookingFormService: BookingFormService,
    private router: Router
  ) {
    this.email$ = this.bookingFormService.bookingFormData$.pipe(map(data => data.email));
    this.startDate$ = this.bookingFormService.bookingFormData$.pipe(map(data => data.dateSlot?.startDate));
    this.endDate$ = this.bookingFormService.bookingFormData$.pipe(map(data => data.dateSlot?.endDate));
    this.roomSizes$ = this.bookingFormService.bookingFormData$.pipe(map(data => data.roomSizes));
    this.availabilityType$ = this.bookingFormService.findWorkspace().pipe(map(workspace => workspace?.availability.type));
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

  roomSizesToString(): Observable<string | undefined> {
    return this.roomSizes$.pipe(
      map(roomSizes => {
        return StringFormatUtil.roomSizesToString(roomSizes);
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
