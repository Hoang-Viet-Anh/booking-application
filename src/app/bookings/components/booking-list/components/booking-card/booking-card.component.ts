import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { BookingFormData } from '@shared/types/booking/BookingFormData';
import { LucideAngularModule, SquarePen, Trash } from 'lucide-angular';
import { CustomDateUtil } from '@shared/utils/CustomDateUtil';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { Router } from '@angular/router';
import { StringFormatUtil } from '@shared/utils/StringFormatUtil';
import { bookingsRoute } from '@core/app.routes';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectWorkspaceById } from '@shared/store/workspace/workspace.selector';
import { selectCoworkingById } from '@shared/store/coworking/coworking.selector';
import { deleteBookingRequest } from '@shared/store/create-booking/create-booking.actions';
import { selectBookingStatus } from '@shared/store/booking-status/booking-status.selector';

@Component({
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule, IconComponent, DialogComponent],
  selector: 'my-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.css'
})
export class BookingCardComponent implements OnChanges {
  readonly SqarePen = SquarePen;
  readonly Trash = Trash;

  @Input() bookingData: BookingFormData = {};

  isDialogOpen = false;

  workspaceTitle$?: Observable<string | undefined>;
  workspaceImage$?: Observable<string | undefined>;
  coworkingTitle$?: Observable<string | undefined>;
  coworkingLocation$?: Observable<string | undefined>;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.store.select(selectBookingStatus).subscribe(status => {
      this.isDialogOpen = false;
    })
  }

  ngOnChanges() {
    if (!this.bookingData) return;

    const { workspaceId, coworkingId } = this.bookingData;

    if (workspaceId) {
      this.workspaceTitle$ = this.store.select(selectWorkspaceById(this.bookingData.workspaceId)).pipe(map(workspace => workspace?.title));
      this.workspaceImage$ = this.store.select(selectWorkspaceById(this.bookingData.workspaceId)).pipe(map(workspace =>
        workspace?.imageUrls && workspace.imageUrls.length > 0 ? workspace.imageUrls[0] : undefined));
    }

    if (coworkingId) {
      this.coworkingTitle$ = this.store.select(selectCoworkingById(this.bookingData.coworkingId)).pipe(map(coworking => coworking?.title));
      this.coworkingLocation$ = this.store.select(selectCoworkingById(this.bookingData.coworkingId)).pipe(map(coworking => coworking?.location));
    }
  }

  onEditBooking() {
    this.router.navigate([`${bookingsRoute}/${this.bookingData.id}`]);
  }

  onDeleteBooking() {
    this.store.dispatch(deleteBookingRequest({ id: this.bookingData.id! }));
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  areaCapacityToString(): string | undefined {
    return StringFormatUtil.areaCapacityToString(this.bookingData.areaCapacity);
  }

  dateToString(): string | undefined {
    const startDate = this.bookingData.dateSlot?.startDate;
    const endDate = this.bookingData.dateSlot?.endDate;
    const startDateString = CustomDateUtil.dateFormat(startDate);
    const endDateString = CustomDateUtil.dateFormat(endDate);

    if (!startDate || !endDate) return undefined;

    if (CustomDateUtil.isSameDate(startDate, endDate)) {
      return startDateString;
    }
    return `${startDateString} - ${endDateString}`;
  }

  timeToString(): string | undefined {
    const startDate = this.bookingData.dateSlot?.startDate;
    const endDate = this.bookingData.dateSlot?.endDate;
    const startTimeString = CustomDateUtil.timeFormat(startDate);
    const endTimeString = CustomDateUtil.timeFormat(endDate);

    if (!startDate || !endDate) return undefined;

    return `from ${startTimeString} to ${endTimeString}`;
  }
}
