import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { Room } from '@shared/types/workspace/Workspace';

@Component({
  selector: 'workspace-capacity-options',
  imports: [CommonModule, IconComponent],
  templateUrl: './capacity-options.component.html',
})
export class CapacityOptionsComponent {
  @Input() capacityOptions: Room[] = [];

  formatCapacity(): string {
    const capacityOptions = this.capacityOptions.sort((a, b) => a.capacity - b.capacity);
    if (capacityOptions.length === 1) {
      const capacity = capacityOptions[0].capacity;
      return capacity === 1 ? capacity + ' person' : capacity + ' people';
    }
    if (capacityOptions.length === 2) {
      const capacity1 = capacityOptions[0].capacity;
      const capacity2 = capacityOptions[1].capacity;
      return capacity2 === 1 ? `${capacity1} or ${capacity2} person` : `${capacity1} or ${capacity2} people`;
    }
    const lastCapacity = capacityOptions[capacityOptions.length - 1].capacity;
    return capacityOptions.map(room => room.capacity).join(', ') + (lastCapacity === 1 ? ' person' : ' people');
  }
}
