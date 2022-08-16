import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Agency } from "./agency";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  private baseUrl = 'http://localhost:8080/api/v1/agencies';

  constructor(private http: HttpClient) {
  }

  getAllAgencies(): Observable<Agency[]> {
    return this.http.get<Agency[]>(this.baseUrl);
  }

  createOrUpdateAgency(agency: Agency): Observable<Agency> {
    return this.http.put<Agency>(this.baseUrl, agency);
  }

  deleteAgency(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
