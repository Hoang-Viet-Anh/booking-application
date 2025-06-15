import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Workspace } from "@shared/types/workspace/Workspace";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class WorkspaceService {
    private apiUrl = environment.apiUrl;

    constructor(
        private httpClient: HttpClient,
    ) { }

    getAllWorkspaces(): Observable<Workspace[]> {
        return this.httpClient.get<Workspace[]>(`${this.apiUrl}/Workspaces`);
    }

}