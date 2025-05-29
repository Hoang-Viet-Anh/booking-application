import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BookingFormService } from '@shared/components/booking-form/booking-form.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { BookingFormData } from '@shared/types/booking/BookingFormData';
import { LucideAngularModule, SquarePen, Trash } from 'lucide-angular';
import { IconComponent } from "../../../../../shared/components/icon/icon.component";
import { CustomDateUtil } from '@shared/utils/CustomDateUtil';

@Component({
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule, IconComponent],
  selector: 'my-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.css'
})
export class BookingCardComponent {
  readonly SqarePen = SquarePen;
  readonly Trash = Trash;

  @Input() imageUrl: string = "https://cdn.pixabay.com/photo/2022/04/14/14/33/sunset-7132574_1280.jpg";

  bookingData: BookingFormData = {
    name: "crocondine",
    email: "crocondine@gmail.com",
    workspaceType: "Private rooms",
    dateSlot: {
      startDate: new Date(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
      isStartTimeSelected: true,
      isEndTimeSelected: true
    },
    roomSizes: [2]
  }

  constructor(private bookingFormService: BookingFormService) { }

  roomSizesToString(): string | undefined {
    if (this.bookingData.workspaceType === "Open space") return undefined;
    return this.bookingFormService.roomSizesToString(this.bookingData.roomSizes);
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
