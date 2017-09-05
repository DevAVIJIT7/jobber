import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Company } from './company';

@Injectable()
export class CompaniesService {

  baseUrl = 'http://localhost:3000/api/companies/';
  headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getCompany(id: number): Observable<Company> {
    const url = `${this.baseUrl}${id}`;
    return this.http.get(url)
      .map(response => response.json() as Company);
  }

  getCompanies(): Observable<Company[]> {
    const url = `${this.baseUrl}`;
    return this.http.get(url)
      .map(response => response.json() as Company[]);
  }

  addCompany(company: Company) {
    const url = `${this.baseUrl}`;
    const body = JSON.stringify(company);
    return this.http.post(url, body, {headers: this.headers})
      .map(response => response.json());
  }
}
