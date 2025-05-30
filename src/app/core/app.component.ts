import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { WorkspaceService } from '@workspaces/workspaces.service';
import { Workspace } from '@shared/types/workspace/Workspace';
import { BookingFormData } from '@shared/types/booking/BookingFormData';
import { BookingsService } from '@bookings/bookings.service';

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
    private bookingsService: BookingsService,
  ) { }

  ngOnInit(): void {
    this.workspaceService.update(this.workspacesToPush)
    this.bookingsService.update(this.myBookings)
  }

  workspacesToPush: Workspace[] = [
    {
      id: "1",
      title: "Open space",
      imageUrls: [
        "https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8MTYlM0E5fGVufDB8fDB8fHww",
      ],
      description: "A vibrant shared area perfect for freelancers or small teams who enjoy a collaborative atmosphere. Choose any available desk and get to work with flexibility and ease.",
      amenities: ["a/c", "gaming", "wifi", "coffee"],
      availability: {
        type: "desks",
        rooms: [
          {
            roomsAmount: 24,
            capacity: 1
          },
          {
            roomsAmount: 24,
            capacity: 2
          },
          {
            roomsAmount: 24,
            capacity: 4
          }
        ]
      },
      maxBookingDays: 1
    },
    {
      id: "2",
      title: "Private rooms",
      imageUrls: [
        "https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8MTYlM0E5fGVufDB8fDB8fHww"
      ],
      description: "Ideal for focused work, video calls, or small team huddles. These fully enclosed rooms offer privacy and come in a variety of sizes to fit your needs.",
      amenities: ["wifi", "a/c", "headphones"],
      availability: {
        type: "rooms",
        rooms: [
          {
            roomsAmount: 7,
            capacity: 1
          },
          {
            roomsAmount: 4,
            capacity: 2
          },
          {
            roomsAmount: 3,
            capacity: 5
          },
          {
            roomsAmount: 1,
            capacity: 10
          }
        ],
      },
      maxBookingDays: 31
    },
    {
      id: "3",
      title: "Meeting rooms",
      imageUrls: [
        "https://cdn.pixabay.com/photo/2022/04/14/14/33/sunset-7132574_1280.jpg"
      ],
      description: "Designed for productive meetings, workshops, or client presentations. Equipped with screens, whiteboards, and comfortable seating to keep your sessions running smoothly.",
      amenities: ["wifi", "a/c", "headphones", "microphone"],
      availability: {
        type: "rooms",
        rooms: [
          {
            roomsAmount: 4,
            capacity: 10
          },
          {
            roomsAmount: 1,
            capacity: 20
          }
        ]
      },
      maxBookingDays: 31
    }
  ];

  myBookings: BookingFormData[] = [
    {
      id: "1",
      name: "crocondine",
      email: "crocondine@gmail.com",
      workspaceType: "Private rooms",
      dateSlot: {
        startDate: new Date(),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
        isStartTimeSelected: true,
        isEndTimeSelected: true
      },
      roomSizes: [2]
    },
    {
      id: "1",
      name: "crocondine",
      email: "crocondine@gmail.com",
      workspaceType: "Open space",
      dateSlot: {
        startDate: new Date(),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
        isStartTimeSelected: true,
        isEndTimeSelected: true
      },
      roomSizes: [2]
    },
    {
      id: "1",
      name: "crocondine",
      email: "crocondine@gmail.com",
      workspaceType: "Meeting rooms",
      dateSlot: {
        startDate: new Date(),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
        isStartTimeSelected: true,
        isEndTimeSelected: true
      },
      roomSizes: [2]
    }
  ];
}
