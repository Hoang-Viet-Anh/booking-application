import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Workspace } from "@shared/types/workspace/Workspace";

export const selectWorkspacesState = createFeatureSelector<ReadonlyArray<Workspace>>('workspaces');

export const selectAllWorkspaces = createSelector(
    selectWorkspacesState,
    (state) => state
);

export const selectWorkspaceById = (id: string) => createSelector(
    selectAllWorkspaces,
    (workspaces) => workspaces?.find(workspace => workspace.id === id)
);