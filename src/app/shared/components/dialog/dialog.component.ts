import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule],
  selector: 'ui-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  readonly X = X;

  @Input() open: boolean = false;

  @Output() onClose = new EventEmitter();

  constructor() { }

  hideDialog(event: Event) {
    event.stopPropagation();
    this.onClose.emit();
  }
}
