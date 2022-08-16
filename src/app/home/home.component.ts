import { Component, OnInit } from '@angular/core';
import { Agency } from "../agency";
import { AgencyService } from "../agency.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'city', 'country', 'countryCode', 'street', 'currency', 'contactPerson'];

  agencies!: Observable<Agency[]>;

  constructor(private agencyService: AgencyService) {
  }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.agencies = this.agencyService.getAllAgencies();
  }
}
