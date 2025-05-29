import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
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

  @Output() dateChange = new EventEmitter<Date>();

  dateChangeHandler(newDate: Date | null) {
    if (newDate === null) {
      return;
    }
    this.dateChange.emit(newDate);
  }
}
