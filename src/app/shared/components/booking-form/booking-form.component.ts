import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';
import { ButtonComponent } from '../button/button.component';
import { LucideAngularModule, ChevronLeft } from 'lucide-angular';
import { DateRangeComponent } from "./components/date-details/date-range/date-range.component";
import { TimeRangeComponent } from "./components/date-details/time-range/time-range.component";
import { DialogComponent } from "../dialog/dialog.component";
import { CommonModule } from '@angular/common';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { Observable, } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsValidForm } from '@shared/store/create-booking/create-booking.selector';
import { sendBookingRequest } from '@shared/store/create-booking/create-booking.actions';
import { selectBookingStatus } from '@shared/store/booking-status/booking-status.selector';
import { resetBookingStatus } from '@shared/store/booking-status/booking-status.actions';

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
  @Input() nameDisabled = false;
  @Input() emailDisabled = false;

  @Output() onClickBack = new EventEmitter<Event>();

  constructor(private store: Store) {
    this.isValidForm$ = this.store.select(selectIsValidForm);
    this.store.select(selectBookingStatus).subscribe(status => {
      if (status.isSuccess) {
        this.showDialog(true);
        return;
      }
      if (status.isFailure) {
        this.showDialog(false);
        return;
      }
    })
  }

  dialogOpen = false;
  dialogSuccess = true;

  onSubmit() {
    this.store.dispatch(sendBookingRequest());
  }

  showDialog(isSuccess: boolean) {
    this.dialogSuccess = isSuccess;
    this.dialogOpen = true;
  }

  hideDialog() {
    this.store.dispatch(resetBookingStatus());
    this.dialogOpen = false;
  }
}
