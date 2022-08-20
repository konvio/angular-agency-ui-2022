import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AgencyService } from "../agency.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Agency } from "../agency";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-edit-agency',
  templateUrl: './edit-agency.component.html',
  styleUrls: ['./edit-agency.component.scss']
})
export class EditAgencyComponent implements OnInit {

  agencyForm: FormGroup = this.fb.group({
    id: [{disabled: true}],
    name: ['', Validators.required],
    country: [''],
    countryCode: ['', [Validators.maxLength(5), Validators.pattern('[A-Z]+')]],
    city: [''],
    street: [''],
    settlementCurrency: ['', Validators.required],
    contactPerson: [''],
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private agencyService: AgencyService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private titleService: Title
  ) {
    this.titleService.setTitle('Edit Agency');
  }

  ngOnInit() {
    this.loadAgency();
  }

  onSubmit() {
    if (!this.agencyForm.valid) {
      return;
    }
    this.agencyService.createOrUpdateAgency(this.getAgencyFormValue())
      .subscribe((value) => {
          this.navigateToAgencies(`${value.name} updated`);
        }
      );
  }

  onDelete() {
    let agencyId = this.getAgencyIdParam();
    this.agencyService.deleteAgency(agencyId).subscribe(() => {
      this.navigateToAgencies(`Agency ID ${agencyId} deleted`);
    });
  }

  private loadAgency() {
    let agencyId = this.getAgencyIdParam();
    this.agencyService.getAgencyById(agencyId).subscribe(agency => {
      this.onAgencyLoaded(agency);
    }, error => {
      console.log(error);
      this.onAgencyNotLoaded(agencyId);
    });
  }

  private onAgencyLoaded(agency: Agency) {
    this.agencyForm.patchValue(agency);
  }

  private onAgencyNotLoaded(agencyId: string) {
    this.navigateToAgencies(`Agency ID ${agencyId} not found`);
  }

  private getAgencyIdParam(): string {
    return this.route.snapshot.paramMap.get('id') || '';
  }

  private getAgencyFormValue(): Agency {
    return this.agencyForm.value;
  }

  private navigateToAgencies(message: string) {
    this.snackBar.open(message);
    this.router.navigate(['/agencies']);
  }
}
