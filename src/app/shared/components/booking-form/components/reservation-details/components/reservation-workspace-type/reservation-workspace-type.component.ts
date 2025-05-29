import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingFormService } from '@shared/components/booking-form/booking-form.service';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { WorkspaceService } from '@workspaces/workspaces.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'reservation-workspace-type',
  imports: [CommonModule, DropdownComponent],
  templateUrl: './reservation-workspace-type.component.html',
  styleUrl: './reservation-workspace-type.component.css'
})
export class ReservationWorkspaceTypeComponent {
  options$: Observable<string[] | null>;
  selectedOption$: Observable<string | null>;

  constructor(
    private workspaceService: WorkspaceService,
    private bookingFormService: BookingFormService
  ) {
    this.selectedOption$ = this.bookingFormService.bookingFormData$.pipe(map((data) => data.workspaceType ?? null));
    this.options$ = this.workspaceService.workspaces$.pipe(
      map((workspaces) => (workspaces ?? []).map((w) => w.title))
    );
  }

  updateWorkspaceType(workspaceType: string) {
    this.bookingFormService.updateWorkspaceType(workspaceType);
  }
}
