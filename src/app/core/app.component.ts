import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { WorkspaceService } from '@workspaces/workspaces.service';
import { Workspace } from '@shared/types/workspace/Workspace';
import { BookingFormService } from '@shared/components/booking-form/booking-form.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'booking-application';

  constructor(
    private workspaceService: WorkspaceService,
  ) { }

  ngOnInit(): void {
    this.workspaceService.update(this.workspacesToPush)
  }

  workspacesToPush: Workspace[] = [
    {
      title: "Open space",
      description: "A vibrant shared area perfect for freelancers or small teams who enjoy a collaborative atmosphere. Choose any available desk and get to work with flexibility and ease.",
      amenities: ["a/c", "gaming", "wifi", "coffee"],
      desksAvailability: 24,
      maxBookingDays: 1
    },
    {
      title: "Private rooms",
      description: "Ideal for focused work, video calls, or small team huddles. These fully enclosed rooms offer privacy and come in a variety of sizes to fit your needs.",
      amenities: ["wifi", "a/c", "headphones"],
      capacityOptions: [1, 2, 5, 10],
      roomsAvailability: [
        { rooms: 7, capacity: 1 },
        { rooms: 4, capacity: 2 },
        { rooms: 3, capacity: 5 },
        { rooms: 1, capacity: 10 }
      ],
      maxBookingDays: 31
    },
    {
      title: "Meeting rooms",
      description: "Designed for productive meetings, workshops, or client presentations. Equipped with screens, whiteboards, and comfortable seating to keep your sessions running smoothly.",
      amenities: ["wifi", "a/c", "headphones", "microphone"],
      capacityOptions: [10, 20],
      roomsAvailability: [
        { rooms: 4, capacity: 10 },
        { rooms: 1, capacity: 20 }
      ],
      maxBookingDays: 31
    }
  ];
}
