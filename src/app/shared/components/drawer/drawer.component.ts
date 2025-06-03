import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-drawer',
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent {
  @Input() open: boolean = false;

  @Output() onClose = new EventEmitter();

  onClickOutside() {
    this.onClose.emit();
  }

  onClickInside(event: Event) {
    event.stopPropagation();
  }

  hideDialog(event: Event) {
    event.stopPropagation();
    this.onClose.emit();
  }
}
