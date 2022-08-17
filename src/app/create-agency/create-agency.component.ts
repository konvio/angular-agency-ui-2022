import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AgencyService } from "../agency.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Agency } from "../agency";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-create-agency',
  templateUrl: './create-agency.component.html',
  styleUrls: ['./create-agency.component.scss']
})
export class CreateAgencyComponent {

  agencyForm: FormGroup = this.fb.group({
    name: ['My Agency', Validators.required],
    country: [''],
    countryCode: ['', [Validators.maxLength(5), Validators.pattern('[A-Z]+')]],
    city: [''],
    street: [''],
    settlementCurrency: ['USD', Validators.required],
    contactPerson: [''],
  });

  constructor(private agencyService: AgencyService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private titleService: Title
  ) {
    this.titleService.setTitle('Create Agency');
  }


  onSubmit() {
    if (!this.agencyForm.valid) {
      return;
    }

    let agency = this.agencyForm.value;

    this.agencyService.createOrUpdateAgency(agency).subscribe((value: Agency) => {
      this.snackBar.open(`${agency.name} created`, 'Edit').onAction().subscribe(() => {
        this.router.navigate(['/agencies', value.id]);
      });
      this.router.navigate(['/agencies']);
    })
  }
}
