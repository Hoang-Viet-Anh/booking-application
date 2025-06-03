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
import { map, Observable, take } from 'rxjs';

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
  isContainId$: Observable<boolean | undefined>;

  @Input() title: string = "Book a workspace";
  @Input() nameDisabled = false;
  @Input() emailDisabled = false;

  @Output() onClickBack = new EventEmitter<Event>();

  constructor(private bookingFormService: BookingFormService) {
    this.isValidForm$ = this.bookingFormService.isFormDataValid();
    this.isContainId$ = this.bookingFormService.bookingFormData$.pipe(map(data => !!data.id));
  }

  dialogOpen = false;
  dialogSuccess = true;

  onSubmit() {
    this.isContainId$.pipe(take(1)).subscribe(isContainId => {
      if (isContainId) {
        this.bookingFormService.updateBookingRequest().subscribe(success => {
          if (success) {
            this.showDialog(true);
          } else {
            this.showDialog(false);
          }
        });
      } else {
        this.bookingFormService.createBookingRequest().subscribe(success => {
          if (success) {
            this.showDialog(true);
          } else {
            this.showDialog(false);
          }
        });
      }
    });
  }

  showDialog(isSuccess: boolean) {
    this.dialogSuccess = isSuccess;
    this.dialogOpen = true;
  }

  hideDialog() {
    this.dialogOpen = false;
  }
}
