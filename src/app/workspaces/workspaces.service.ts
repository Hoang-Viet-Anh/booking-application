import { Injectable } from "@angular/core";
import { Workspace } from "@shared/types/workspace/Workspace";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class WorkspaceService {
    private workspacesSubject = new BehaviorSubject<Workspace[]>([]);

    workspaces$ = this.workspacesSubject.asObservable();

    update(workspaces: Workspace[]) {
        this.workspacesSubject.next(workspaces);
    }

    getWorkspaceImage(workspaceType: string | undefined): string | undefined {
        if (!workspaceType) return undefined;
        const workspace = this.workspacesSubject.value.find(workspace => workspace.title === workspaceType);
        return workspace?.imageUrls?.[0];
    }
}