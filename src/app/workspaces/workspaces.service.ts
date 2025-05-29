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
}