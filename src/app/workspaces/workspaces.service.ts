import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Workspace } from "@shared/types/workspace/Workspace";
import { environment } from "environments/environment";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class WorkspaceService {
    private apiUrl = environment.apiUrl;

    private workspacesSubject = new BehaviorSubject<Workspace[]>([]);

    workspaces$ = this.workspacesSubject.asObservable();

    constructor(
        private httpClient: HttpClient
    ) {

    }

    update(workspaces: Workspace[]) {
        this.workspacesSubject.next(workspaces);
    }

    getWorkspaceImage(workspaceType: string | undefined): string | undefined {
        if (!workspaceType) return undefined;
        const workspace = this.workspacesSubject.value.find(workspace => workspace.title === workspaceType);
        return workspace?.imageUrls?.[0];
    }

    fetchWorkspaces() {
        this.httpClient.get<Workspace[]>(`${this.apiUrl}/Workspaces`)
            .subscribe({
                next: (workspaces) => this.workspacesSubject.next(workspaces),
                error: (err) => console.error(err)
            });
    }

    findWorkspace(id: string | undefined): Workspace | undefined {
        if (!id) return;
        return this.workspacesSubject.value.find(workspace => workspace.id === id);
    }
}