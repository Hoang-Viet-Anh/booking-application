import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingFormService } from '@shared/components/booking-form/booking-form.service';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { DropdownOption } from '@shared/types/DropdownOption';
import { WorkspaceService } from '@workspaces/workspaces.service';
import { combineLatest, map, Observable } from 'rxjs';

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
    private workspaceService: WorkspaceService,
    private bookingFormService: BookingFormService
  ) {
   // this.options$ = this.workspaceService.workspaces$.pipe(map(w => w.map(workspace => ({ id: workspace.id, name: workspace.title }))));
    // this.selectedOption$ = combineLatest([this.options$, this.bookingFormService.bookingFormData$]).pipe(
    //   map(([options, data]) => {
    //     if (!data.workspaceId) return;
    //     return options.find(o => o.id === data.workspaceId);
    //   })
    // );
  }

  updateWorkspaceType(workspaceId: string) {
    this.bookingFormService.updateWorkspaceId(workspaceId);
  }
}
