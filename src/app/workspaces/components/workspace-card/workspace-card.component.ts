import { Component } from '@angular/core';
import { CarouselComponent } from './components/carousel/carousel.component';
import { WorkspaceTitleComponent } from "./components/title/title.component";
import { AmenitiesComponent } from './components/amenities/amenities.component';
import { CapacityOptionsComponent } from './components/capacity-options/capacity-options.component';
import { AvailabilityComponent } from './components/availability/availability.component';
import { Workspace } from '@shared/types/Workspace';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workspace-card',
  imports: [
    CarouselComponent,
    WorkspaceTitleComponent,
    AmenitiesComponent,
    CapacityOptionsComponent,
    AvailabilityComponent,
    CommonModule
  ],
  templateUrl: './workspace-card.component.html',
})
export class WorkspaceCardComponent {
  availableWorkspaces: Workspace[] = [
    {
      title: "Open space",
      description: "A vibrant shared area perfect for freelancers or small teams who enjoy a collaborative atmosphere. Choose any available desk and get to work with flexibility and ease.",
      amenities: ["a/c", "gaming", "wifi", "coffee"],
      desksAvailability: 24,
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
      ]
    },
    {
      title: "Meeting rooms",
      description: "Designed for productive meetings, workshops, or client presentations. Equipped with screens, whiteboards, and comfortable seating to keep your sessions running smoothly.",
      amenities: ["wifi", "a/c", "headphones", "microphone"],
      capacityOptions: [10, 20],
      roomsAvailability: [
        { rooms: 4, capacity: 10 },
        { rooms: 1, capacity: 20 }
      ]
    }
  ];
}