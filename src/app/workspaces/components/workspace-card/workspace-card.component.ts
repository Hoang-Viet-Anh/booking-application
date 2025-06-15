import { Component, Input } from '@angular/core';
import { CarouselComponent } from './components/carousel/carousel.component';
import { WorkspaceTitleComponent } from "./components/title/title.component";
import { AmenitiesComponent } from './components/amenities/amenities.component';
import { CapacityOptionsComponent } from './components/capacity-options/capacity-options.component';
import { AvailabilityComponent } from './components/availability/availability.component';
import { Workspace } from '@shared/types/workspace/Workspace';
import { CommonModule } from '@angular/common';
import { WorkspaceService } from '@workspaces/workspaces.service';
import { combineLatest, combineLatestAll, Observable } from 'rxjs';
import { Coworking, WorkspaceCapacity } from '@shared/types/coworking/Coworking';
import { Store } from '@ngrx/store';
import { selectAllWorkspaces } from '@shared/store/workspace/workspace.selector';
import { Router } from '@angular/router';
import { coworkingRoute } from '@core/app.routes';

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
  availableWorkspaces$: Observable<readonly Workspace[]>;
  @Input() coworking?: Coworking;
  @Input() workspace?: Workspace;

  buttonLabel: string = "Book now";

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.availableWorkspaces$ = this.store.select(selectAllWorkspaces);
  }

  onBookNow() {
    if (!this.coworking || !this.workspace) return;
    this.router.navigate([`${coworkingRoute}/${this.coworking.id}/workspaces/create-booking`]);
  }

  getWorkspaceCapacity(): WorkspaceCapacity | undefined {
    if (!this.coworking || !this.workspace) return;
    return this.coworking.workspacesCapacity.find(wc => wc.workspaceId === this.workspace!.id);
  }
}