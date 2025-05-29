import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';

@Component({
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  selector: 'ui-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  readonly ChevronDown = ChevronDown;

  @Input() options?: string[];
  @Input() selectedOption?: string;
  @Input() placeholder: string = "Select an option";
  @Input() disabled: boolean = false;
  open: boolean = false;

  @Output() onSelectOption = new EventEmitter<string>();

  constructor(private eRef: ElementRef) { }

  closeDropdown() {
    this.open = false;
  }

  toggleDropdown() {
    this.open = !this.open;
  }

  selectOption(option: string) {
    this.onSelectOption.emit(option);
    this.closeDropdown();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }
}
