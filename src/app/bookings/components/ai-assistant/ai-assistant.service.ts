import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AiAssistantService {
    private baseUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    getResponseRequest(prompt: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/AiAssistant`, { prompt });
    }
}