import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'workspace-capacity-options',
  imports: [CommonModule, IconComponent],
  templateUrl: './capacity-options.component.html',
})
export class CapacityOptionsComponent {
  @Input() capacityOptions?: number[];
}
