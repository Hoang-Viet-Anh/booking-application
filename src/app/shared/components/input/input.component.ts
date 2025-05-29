import { Component, EventEmitter, input, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-input',
  imports: [],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() label?: string;
  @Input() placeholder: string = "";
  @Input() type: string = "text";
  @Input() value: string = "";
  @Input() disabled?: boolean;

  @Output() onChange = new EventEmitter<string>();

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.onChange.emit(target.value);
  }
}
