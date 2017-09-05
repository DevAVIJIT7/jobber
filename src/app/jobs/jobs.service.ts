import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Job } from './job';

@Injectable()
export class JobsService {

  baseUrl = 'http://localhost:3000/api/jobs/';
  headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getJob(id: number): Observable<Job> {
    const url = `${this.baseUrl}${id}`;
    return this.http.get(url)
      .map(response => response.json() as Job);
  }

  getJobs(): Observable<Job[]> {
    const url = `${this.baseUrl}`;
    return this.http.get(url)
      .map(response => response.json() as Job[]);
  }

  addJob(job: Job) {
    const url = `${this.baseUrl}`;
    const body = JSON.stringify(job);
    return this.http.post(url, body, {headers: this.headers})
      .map(response => response.json());
  }
}
