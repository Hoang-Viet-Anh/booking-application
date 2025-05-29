import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { Availability } from '@shared/types/workspace/Availability';

@Component({
  selector: 'workspace-availability',
  imports: [CommonModule, IconComponent],
  templateUrl: './availability.component.html',
})
export class AvailabilityComponent {
  @Input() roomsAvailability?: Availability[];
  @Input() desksAvailability?: number;
}
