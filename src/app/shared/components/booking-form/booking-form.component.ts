import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';
import { ButtonComponent } from '../button/button.component';
import { LucideAngularModule, ChevronLeft } from 'lucide-angular';
import { DateRangeComponent } from "./components/date-details/date-range/date-range.component";
import { TimeRangeComponent } from "./components/date-details/time-range/time-range.component";
import { DialogComponent } from "../dialog/dialog.component";
import { CommonModule } from '@angular/common';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { BookingFormService } from './booking-form.service';
import { map, Observable } from 'rxjs';
import { BookingFormData } from '@shared/types/booking/BookingFormData';

@Component({
  standalone: true,
  imports: [
    LucideAngularModule,
    ReservationDetailsComponent,
    ButtonComponent,
    DateRangeComponent,
    TimeRangeComponent,
    DialogComponent,
    CommonModule,
    DialogContentComponent
  ],
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
})
export class BookingFormComponent {
  readonly ChevronLeft = ChevronLeft;

  isValidForm$: Observable<boolean | undefined>;

  @Input() title: string = "Book a workspace";

  @Output() onClickBack = new EventEmitter<Event>();

  constructor(private bookingFormService: BookingFormService) {
    this.isValidForm$ = this.bookingFormService.bookingFormData$.pipe(
      map((data: BookingFormData) => {
        const { name, email, workspaceType, dateSlot, roomSizes } = data;

        const hasRequiredFields = !!name && !!email && !!workspaceType;

        const hasValidDates = !!dateSlot?.startDate && !!dateSlot?.endDate
          && dateSlot.isStartTimeSelected && dateSlot.isEndTimeSelected;

        const hasValidRoomSizes =
          workspaceType === "Open space" ? true : (roomSizes && roomSizes.length > 0);

        return hasRequiredFields && hasValidDates && hasValidRoomSizes;
      })
    );
  }

  dialogOpen = false;
  dialogSuccess = true;

  showDialog(isSuccess: boolean) {
    this.dialogSuccess = isSuccess;
    this.dialogOpen = true;
  }

  hideDialog() {
    this.dialogOpen = false;
  }
}
