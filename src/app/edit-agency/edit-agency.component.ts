import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Agency } from "../agency";
import { AgencyService } from "../agency.service";

@Component({
  selector: 'app-edit-agency',
  templateUrl: './edit-agency.component.html',
  styleUrls: ['./edit-agency.component.scss']
})
export class EditAgencyComponent implements OnInit {

  agency$!: Observable<Agency>;

  constructor(private route: ActivatedRoute, private agencyService: AgencyService) {
  }

  ngOnInit() {
    let agencyId = this.route.snapshot.paramMap.get('id') || '';
    this.agency$ = this.agencyService.getAgencyById(agencyId);
  }
}
