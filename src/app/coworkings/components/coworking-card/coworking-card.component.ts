import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Coworking } from '@shared/types/coworking/Coworking';
import { CarouselComponent } from '@workspaces/components/workspace-card/components/carousel/carousel.component';
import { WorkspaceTitleComponent } from '@workspaces/components/workspace-card/components/title/title.component';
import { WorkspaceCapacityComponent } from './components/workspace-capacity/workspace-capacity.component';
import { LocationComponent } from "./components/location/location.component";
import { Router } from '@angular/router';
import { coworkingRoute } from '@core/app.routes';

@Component({
  selector: 'app-coworking-card',
  imports: [
    CarouselComponent,
    WorkspaceTitleComponent,
    WorkspaceCapacityComponent,
    CommonModule,
    LocationComponent
  ],
  templateUrl: './coworking-card.component.html',
  styleUrl: './coworking-card.component.css'
})
export class CoworkingCardComponent {
  @Input() coworking?: Coworking;
  buttonLabel: string = "View details";

  constructor(private router: Router) { }

  onButtonClick() {
    if (!this.coworking) return;
    this.router.navigate([`${coworkingRoute}/${this.coworking.id}/workspaces`]);
  }
}
