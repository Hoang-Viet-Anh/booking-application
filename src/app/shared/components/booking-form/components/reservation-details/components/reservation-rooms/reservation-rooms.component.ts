import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingFormService } from '@shared/components/booking-form/booking-form.service';
import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { WorkspaceService } from '@workspaces/workspaces.service';
import { ReceiptPoundSterling } from 'lucide-angular';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'reservation-rooms',
  imports: [CheckboxComponent, CommonModule],
  templateUrl: './reservation-rooms.component.html',
  styleUrl: './reservation-rooms.component.css'
})
export class ReservationRoomsComponent {
  roomType$: Observable<string | undefined>;
  roomCapacities$: Observable<number[] | undefined>
  roomSizes$: Observable<number[] | undefined>
  workspaceType$: Observable<string | undefined>

  constructor(
    private workspaceService: WorkspaceService,
    private bookingFormService: BookingFormService
  ) {
    this.roomSizes$ = this.bookingFormService.bookingFormData$.pipe(map((data) => data.roomSizes));
    this.roomCapacities$ = combineLatest([this.bookingFormService.bookingFormData$, this.workspaceService.workspaces$]).pipe(
      map(([data, workspaces]) => {
        if (!data.workspaceType) ReceiptPoundSterling;
        const workspace = workspaces.find((w) => w.title.toLowerCase() === data.workspaceType?.toLowerCase());
        if (!workspace) return;
        return workspace.availability?.rooms.map(room => room.capacity);
      })
    );
    this.roomType$ = combineLatest([this.bookingFormService.bookingFormData$, this.workspaceService.workspaces$]).pipe(
      map(([data, workspaces]) => {
        if (!data.workspaceType) ReceiptPoundSterling;
        const workspace = workspaces.find((w) => w.title.toLowerCase() === data.workspaceType?.toLowerCase());
        if (!workspace) return;
        return workspace.availability?.type;
      })
    );
    this.workspaceType$ = this.bookingFormService.bookingFormData$.pipe(map((data) => data.workspaceType));
  }

  onChangeRoomSizes(size: number, isChecked: boolean) {
    if (isChecked) {
      this.bookingFormService.addRoomSize(size);
    } else {
      this.bookingFormService.removeRoomSize(size);
    }
  }
}
