import { Component } from '@angular/core';
import { CarouselComponent } from './components/carousel/carousel.component';
import { WorkspaceTitleComponent } from "./components/title/title.component";
import { AmenitiesComponent } from './components/amenities/amenities.component';
import { CapacityOptionsComponent } from './components/capacity-options/capacity-options.component';
import { AvailabilityComponent } from './components/availability/availability.component';
import { Workspace } from '@shared/types/workspace/Workspace';
import { CommonModule } from '@angular/common';
import { WorkspaceService } from '@workspaces/workspaces.service';
import { Observable } from 'rxjs';

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
  availableWorkspaces$: Observable<Workspace[] | null>;

  constructor(private workspaceService: WorkspaceService) {
    this.availableWorkspaces$ = this.workspaceService.workspaces$;
  }
}