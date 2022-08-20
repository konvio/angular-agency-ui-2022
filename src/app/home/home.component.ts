import { Component, OnInit } from '@angular/core';
import { Agency } from "../agency";
import { AgencyService } from "../agency.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'city', 'country', 'countryCode', 'street', 'currency', 'contactPerson'];

  dataSource: MatTableDataSource<Agency> = new MatTableDataSource<Agency>();

  constructor(private agencyService: AgencyService,
              private router: Router,
              private snackBar: MatSnackBar,
              private titleService: Title
  ) {
    this.titleService.setTitle('Agency Management');
  }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.agencyService.getAllAgencies().subscribe(agencies => {
      this.dataSource.data = agencies;
    });
  }

  onRowClick(agency: Agency) {
    this._navigateToEdit(agency);
  }

  _navigateToEdit(agency: Agency) {
    this.router.navigate(['/agencies', agency.id]).then(r => console.log(r));
  }

  onLogoClick() {
    this.snackBar.open('Welcome to the Agency Management System!', 'OK', {})
  }
}
