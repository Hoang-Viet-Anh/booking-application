import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { BookingFormData } from '@shared/types/booking/BookingFormData';
import { LucideAngularModule, SquarePen, Trash } from 'lucide-angular';
import { CustomDateUtil } from '@shared/utils/CustomDateUtil';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { Router } from '@angular/router';
import { StringFormatUtil } from '@shared/utils/StringFormatUtil';
import { bookingsRoute } from '@core/app.routes';

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

  @Input() workspaceImage?: string;
  @Input() bookingData: BookingFormData = {};

  isDialogOpen = false;

  constructor(
    private router: Router,
  ) {

  }

  onEditBooking() {
    this.router.navigate([`${bookingsRoute}/${this.bookingData.id}`]);
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
