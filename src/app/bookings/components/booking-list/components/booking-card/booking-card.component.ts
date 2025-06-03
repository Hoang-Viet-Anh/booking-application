import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BookingFormService } from '@shared/components/booking-form/booking-form.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { BookingFormData } from '@shared/types/booking/BookingFormData';
import { LucideAngularModule, SquarePen, Trash } from 'lucide-angular';
import { CustomDateUtil } from '@shared/utils/CustomDateUtil';
import { map, Observable } from 'rxjs';
import { WorkspaceService } from '@workspaces/workspaces.service';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { Router } from '@angular/router';
import { StringFormatUtil } from '@shared/utils/StringFormatUtil';
import { BookingsService } from '@bookings/bookings.service';

@Component({
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule, IconComponent, DialogComponent],
  selector: 'my-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.css'
})
export class BookingCardComponent {
  readonly SqarePen = SquarePen;
  readonly Trash = Trash;

  workspaceImage$: Observable<string | undefined>;

  @Input() bookingData: BookingFormData = {};

  isDialogOpen = false;

  constructor(
    private workspaceService: WorkspaceService,
    private router: Router,
    private bookingFormService: BookingFormService,
    private bookingsService: BookingsService
  ) {
    this.workspaceImage$ = this.workspaceService.workspaces$.pipe(map(workspaces => workspaces.find(w => w.id === this.bookingData.workspaceId)?.imageUrls?.[0]));
  }

  get workspaceTitle(): string | undefined {
    return this.workspaceService.findWorkspace(this.bookingData.workspaceId)?.title;
  }

  onEditBooking() {
    this.router.navigate(['/bookings/' + this.bookingData.id]);
  }

  onDeleteBooking() {
    if (!this.bookingData.id) {
      this.closeDialog();
      return;
    }
    this.bookingFormService.deleteBookingRequest(this.bookingData.id).subscribe(success => {
      if (success) {
        this.bookingsService.fetchBookings();
        this.closeDialog();
      }
    });
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  roomSizesToString(): string | undefined {
    return StringFormatUtil.roomSizesToString(this.bookingData.roomSizes);
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
