import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingCardComponent } from "./components/booking-card/booking-card.component";

@Component({
  selector: 'my-booking-list',
  imports: [ButtonComponent, CommonModule, BookingCardComponent],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent {

  @Input() bookingList = true;

  constructor(private router: Router) { }

  onClickWorkspaces() {
    this.router.navigate(['/workspaces']);
  }
}
