import { Component, OnInit } from '@angular/core';
import { Agency } from "../agency";
import { AgencyService } from "../agency.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'city', 'country', 'countryCode', 'street', 'currency', 'contactPerson'];

  agencies!: Observable<Agency[]>;

  constructor(private agencyService: AgencyService, private router: Router, private snackBar: MatSnackBar) {
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
    this.router.navigate(['/agencies', agency.id]).then(r => console.log(r));
  }

  onLogoClick() {
    let snackBarRef = this.snackBar.open('Welcome to the Agency Management System!', 'Great!', {})
  }
}
