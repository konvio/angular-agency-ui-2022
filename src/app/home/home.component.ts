import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Agency } from "../agency";
import { AgencyService } from "../agency.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'city', 'country', 'countryCode', 'street', 'currency', 'contactPerson'];

  agencies: MatTableDataSource<Agency> = new MatTableDataSource<Agency>();

  @ViewChild(MatSort) sort: MatSort = new MatSort()

  constructor(private agencyService: AgencyService, private router: Router, private snackBar: MatSnackBar, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit() {
    this.refreshData();
  }

  ngAfterViewInit() {
    this.agencies.sort = this.sort;
  }

  refreshData() {
    this.agencyService.getAllAgencies().subscribe(agencies => {
      this.agencies.data = agencies;
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
