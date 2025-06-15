import { Component } from '@angular/core';
import { WorkspaceCardComponent } from './components/workspace-card/workspace-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Coworking } from '@shared/types/coworking/Coworking';
import { Store } from '@ngrx/store';
import { selectCoworkingById } from '@shared/store/coworking/coworking.selector';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Workspace } from '@shared/types/workspace/Workspace';
import { selectAllWorkspaces } from '@shared/store/workspace/workspace.selector';
import { ButtonComponent } from '@shared/components/button/button.component';
import { LucideAngularModule, ChevronLeft } from 'lucide-angular';
import { coworkingRoute } from '@core/app.routes';

@Component({
  selector: 'app-workspaces',
  imports: [WorkspaceCardComponent, CommonModule, ButtonComponent, LucideAngularModule],
  templateUrl: './workspaces.component.html',
})
export class WorkspacesComponent {
  readonly ChevronLeft = ChevronLeft;
  coworking$: Observable<Coworking | undefined> = of(undefined);
  workspaces$: Observable<readonly Workspace[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.workspaces$ = this.store.select(selectAllWorkspaces);
    this.coworking$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      tap((id) => {
        if (!id) {
          this.router.navigate([coworkingRoute]);
        }
      }),
      switchMap((id) => id ? this.store.select(selectCoworkingById(id)) : of(undefined))
    );
  }

  isInCoworking(workspaceId: string, coworking: Coworking): boolean {
    return coworking.workspacesCapacity.some(wc => wc.workspaceId === workspaceId);
  }

  onClickBack() {
    this.router.navigate([coworkingRoute]);
  }
}
