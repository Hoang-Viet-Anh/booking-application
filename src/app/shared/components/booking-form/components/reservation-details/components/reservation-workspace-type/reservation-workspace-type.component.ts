import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { updateWorkspaceId } from '@shared/store/create-booking/create-booking.actions';
import { selectBookingWorkspace, selectCoworkingWorkspaces } from '@shared/store/create-booking/create-booking.selector';
import { selectAllWorkspaces } from '@shared/store/workspace/workspace.selector';
import { DropdownOption } from '@shared/types/DropdownOption';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'reservation-workspace-type',
  imports: [CommonModule, DropdownComponent],
  templateUrl: './reservation-workspace-type.component.html',
  styleUrl: './reservation-workspace-type.component.css'
})
export class ReservationWorkspaceTypeComponent {
  options$?: Observable<DropdownOption[]>;
  selectedOption$?: Observable<DropdownOption | undefined>;

  constructor(
    private store: Store
  ) {
    this.options$ = this.store.select(selectCoworkingWorkspaces).pipe(map(w => w.map(workspace => ({ id: workspace.id, name: workspace.title }))));
    this.selectedOption$ = this.store.select(selectBookingWorkspace).pipe(map(workspace => {
      if (!workspace) return;
      return { id: workspace.id, name: workspace.title };
    }));
  }

  updateWorkspaceType(workspaceId: string) {
    this.store.dispatch(updateWorkspaceId({ workspaceId }));
  }
}
