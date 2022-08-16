import { Component, OnInit } from '@angular/core';
import { Agency } from "../agency";
import { AgencyService } from "../agency.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'city', 'country', 'countryCode', 'street', 'currency', 'contactPerson'];

  agencies!: Observable<Agency[]>;

  constructor(private agencyService: AgencyService, private router: Router) {
  }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.agencies = this.agencyService.getAllAgencies();
  }

  onRowClick(agency: Agency) {
    console.log(agency);
    this._navigateToEdit(agency);
  }

  _navigateToEdit(agency: Agency) {
    this.router.navigate(['/agencies', agency.id]);
  }
}
