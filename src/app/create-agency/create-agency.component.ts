import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AgencyService } from "../agency.service";

@Component({
  selector: 'app-create-agency',
  templateUrl: './create-agency.component.html',
  styleUrls: ['./create-agency.component.scss']
})
export class CreateAgencyComponent {

  agencyForm: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
    country: [null, [Validators.required]],
    countryCode: [null, [Validators.required]],
    city: [null, [Validators.required]],
    street: [null, [Validators.required]],
    settlementCurrency: [null, [Validators.required]],
    contactPerson: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder, private agencyService: AgencyService) {
  }

  onSubmit() {
    if (!this.agencyForm.valid) {
      return;
    }
    let agency = this.agencyForm.value;
    console.log(agency);
    this.agencyService.createOrUpdateAgency(agency).subscribe(() => {
      this.agencyForm.reset();
    })
  }
}
