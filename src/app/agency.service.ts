import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Agency } from "./agency";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  private baseUrl = `${environment.apiServer}/api/v1/agencies`;

  constructor(private http: HttpClient) {
  }

  getAllAgencies(): Observable<Agency[]> {
    return this.http.get<Agency[]>(this.baseUrl);
  }

  getAgencyById(id: string): Observable<Agency> {
    return this.http.get<Agency>(`${this.baseUrl}/${id}`);
  }

  createOrUpdateAgency(agency: Agency): Observable<Agency> {
    return this.http.put<Agency>(this.baseUrl, agency);
  }

  deleteAgency(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
