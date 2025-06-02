import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Availability } from '@shared/types/workspace/Workspace';

@Component({
  selector: 'workspace-availability',
  imports: [CommonModule],
  templateUrl: './availability.component.html',
})
export class AvailabilityComponent {
  @Input() availability?: Availability;
}
