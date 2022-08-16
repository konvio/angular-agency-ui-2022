import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AgencyService } from "../agency.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-agency',
  templateUrl: './edit-agency.component.html',
  styleUrls: ['./edit-agency.component.scss']
})
export class EditAgencyComponent implements OnInit {

  agencyForm: FormGroup = this.fb.group({
    id: [''],
    name: [null, [Validators.required]],
    country: [null, [Validators.required]],
    countryCode: [null, [Validators.required]],
    city: [null, [Validators.required]],
    street: [null, [Validators.required]],
    settlementCurrency: [null, [Validators.required]],
    contactPerson: [null, [Validators.required]]
  });

  constructor(private route: ActivatedRoute, private agencyService: AgencyService, private fb: FormBuilder) {
  }

  ngOnInit() {
    let agencyId = this.route.snapshot.paramMap.get('id') || '';
    this.agencyService.getAgencyById(agencyId).subscribe(agency => {
      this.agencyForm.patchValue(agency);
    })
  }

  onSubmit() {
    this.agencyService.createOrUpdateAgency(this.agencyForm.value).subscribe(() => {
        console.log(this.agencyForm.value);
      }
    );
  }
}
