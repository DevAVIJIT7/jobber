import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Company } from '../company';
import { CompaniesService } from '../companies.service';

@Component({
  selector: 'new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
export class NewCompanyComponent implements OnInit {

  newCompanyForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private location: Location,
              private storeService: CompaniesService) {
  }

  ngOnInit() {
    this.newCompanyForm = this.formBuilder.group({
      name: ['', Validators.required],
      acronym: ['', Validators.required]
    });
  }


  saveCompany() {
    if (this.newCompanyForm.valid) {
      var company = this.newCompanyForm.value as Company;
      console.log(company);
      this.storeService.addCompany(company)
        .subscribe(res => this.router.navigate(['/companies']));
    }
  }
}
