import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateFilterFn, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, CalendarRange } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    LucideAngularModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule
  ],
  selector: 'ui-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {
  readonly CalendarRange = CalendarRange;

  @Input() label: string = "Select a date";
  @Input() disabled: boolean = false;
  @Input() placeholder: string = "Select a date";
  @Input() date: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() minDate: Date | null = null;

  @Input() set filterDates(dates: Date[] | null) {
    this._filterDates = dates;
    this.dateFilterFn = this.buildDateFilter(dates);
  }

  @Output() dateChange = new EventEmitter<Date>();

  dateFilterFn: DateFilterFn<Date | null> = () => true;
  private _filterDates: Date[] | null = [];

  private buildDateFilter(dates: Date[] | null): DateFilterFn<Date | null> {
    return (date: Date | null): boolean => {
      if (!date) return false;
      if (!dates) return true;

      return !dates.some(d =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
      );
    };
  }

  dateChangeHandler(newDate: Date | null) {
    if (newDate === null) {
      return;
    }
    this.dateChange.emit(newDate);
  }


}
