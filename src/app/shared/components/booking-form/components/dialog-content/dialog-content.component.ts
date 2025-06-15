import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../button/button.component";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBookingWorkspace, selectCreateBooking, selectDateSlot } from '@shared/store/create-booking/create-booking.selector';
import { resetBookingDate } from '@shared/store/create-booking/create-booking.actions';
import { StringFormatUtil } from '@shared/utils/StringFormatUtil';
import { CustomDateUtil } from '@shared/utils/CustomDateUtil';
import { resetBookingStatus } from '@shared/store/booking-status/booking-status.actions';

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
  areaCapacity$: Observable<number[] | undefined>;
  areaType$: Observable<string | undefined>;

  @Input() dialogSuccess: boolean = true;

  @Output() onDialogClose = new EventEmitter();

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.email$ = this.store.select(selectCreateBooking).pipe(map(data => data.email));
    this.areaCapacity$ = this.store.select(selectCreateBooking).pipe(map(data => data.areaCapacity));
    this.areaType$ = this.store.select(selectBookingWorkspace).pipe(map(data => data?.areaType));
    this.startDate$ = this.store.select(selectDateSlot).pipe(map(slot => slot?.startDate));
    this.endDate$ = this.store.select(selectDateSlot).pipe(map(slot => slot?.endDate));
  }

  onButtonClick(isSuccess: boolean) {
    this.store.dispatch(resetBookingStatus());
    if (isSuccess) {
      this.router.navigate(['/bookings']);
    } else {
      this.store.dispatch(resetBookingDate());
    }
    this.onDialogClose.emit();
  }

  areaCapacityToString(): Observable<string | undefined> {
    if (!this.areaCapacity$) return of();
    return this.areaCapacity$.pipe(
      map(areaCapacity => {
        return StringFormatUtil.areaCapacityToString(areaCapacity);
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
