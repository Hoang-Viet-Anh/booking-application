import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { Availability } from '@shared/types/workspace/Workspace';

@Component({
  selector: 'workspace-availability',
  imports: [CommonModule, IconComponent],
  templateUrl: './availability.component.html',
})
export class AvailabilityComponent {
  @Input() availability?: Availability;

  get desksAmount(): number | undefined {
    if (!this.availability) return;
    return this.availability.type === 'desks' ? this.availability.rooms[0].roomsAmount : undefined;
  }
}
