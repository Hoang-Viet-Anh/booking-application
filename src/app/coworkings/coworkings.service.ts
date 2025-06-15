import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Coworking } from "@shared/types/coworking/Coworking";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CoworkingsService {
    private apiUrl = environment.apiUrl;

    constructor(
        private httpClient: HttpClient,
    ) { }

    getAllCoworkings(): Observable<Coworking[]> {
        return this.httpClient.get<Coworking[]>(`${this.apiUrl}/Coworkings`);
    }
}