import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IconComponent } from '@shared/components/icon/icon.component';
import { selectAllWorkspaces, selectWorkspaceById } from '@shared/store/workspace/workspace.selector';
import { Availability, WorkspaceCapacity } from '@shared/types/coworking/Coworking';
import { Workspace } from '@shared/types/workspace/Workspace';
import { Observable } from 'rxjs';

@Component({
  selector: 'coworking-workspace-capacity',
  imports: [CommonModule, IconComponent],
  templateUrl: './workspace-capacity.component.html',
  styleUrl: './workspace-capacity.component.css'
})
export class WorkspaceCapacityComponent {
  @Input() workspaceCapacity?: WorkspaceCapacity[];

  constructor(private store: Store) { }

  getWorkspace(id: string): Observable<Workspace | undefined> {
    return this.store.select(selectWorkspaceById(id));
  }

  getCapacitySum(availability: Availability[]): number {
    return availability.reduce((acc, curr) => acc + curr.amounts, 0);
  }
}
