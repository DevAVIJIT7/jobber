import { Component, OnInit } from '@angular/core';

import { Company } from '../company';
import { CompaniesService } from '../companies.service';

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];

  constructor(private storeService: CompaniesService) {
  }

  ngOnInit() {
    this.getCompanyList();
  }

  getCompanyList() {
    this.storeService.getCompanies()
      .subscribe(companies => this.companies = companies);
  }

}
