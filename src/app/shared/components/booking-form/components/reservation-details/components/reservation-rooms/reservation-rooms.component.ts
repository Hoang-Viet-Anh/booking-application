import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingFormService } from '@shared/components/booking-form/booking-form.service';
import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { WorkspaceService } from '@workspaces/workspaces.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'reservation-rooms',
  imports: [CheckboxComponent, CommonModule],
  templateUrl: './reservation-rooms.component.html',
  styleUrl: './reservation-rooms.component.css'
})
export class ReservationRoomsComponent {
  roomType$?: Observable<string | undefined>;
  roomCapacities$?: Observable<number[] | undefined>
  roomSizes$?: Observable<number[] | undefined>

  constructor(
    private bookingFormService: BookingFormService
  ) {
    // this.roomSizes$ = this.bookingFormService.bookingFormData$.pipe(map((data) => data.roomSizes));
    // this.roomCapacities$ = this.bookingFormService.findWorkspace().pipe(map(workspace => workspace?.availability.rooms.map(r => r.capacity)));
    // this.roomType$ = this.bookingFormService.findWorkspace().pipe(map(workspace => workspace?.availability.type));
  }

  onChangeRoomSizes(size: number, isChecked: boolean) {
    if (isChecked) {
      this.bookingFormService.addRoomSize(size);
    } else {
      this.bookingFormService.removeRoomSize(size);
    }
  }
}
