import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, Check } from 'lucide-angular';

@Component({
  standalone: true,
  imports: [
    LucideAngularModule,
    CommonModule
  ],
  selector: 'ui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {
  readonly Check = Check;

  @Input() isChecked: boolean = false;

  @Output() onCheckboxChange = new EventEmitter<boolean>();

  checkBoxChangeHandler($event: Event) {
    const target = $event.target as HTMLInputElement;
    const isChecked = target.checked;
    this.onCheckboxChange.emit(isChecked);
  }
}
