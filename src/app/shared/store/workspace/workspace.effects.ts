import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { WorkspaceService } from "@workspaces/workspaces.service";
import { catchError, exhaustMap, map, of } from "rxjs";
import { loadWorkspaces, loadWorkspacesFailure, loadWorkspacesSuccess } from "./workspace.actions";

@Injectable()
export class WorkspaceEffects {
    private workspaceService = inject(WorkspaceService);
    private actions$ = inject(Actions);

    loadWorkspaces$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadWorkspaces),
            exhaustMap(() => this.workspaceService.getAllWorkspaces()
                .pipe(
                    map((workspaces) => loadWorkspacesSuccess({ workspaces })),
                    catchError(() => of(loadWorkspacesFailure()))
                )
            )
        )
    )
}
