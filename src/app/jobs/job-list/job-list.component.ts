import { Component, OnInit } from '@angular/core';

import { Job } from '../job';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobsService) {
  }

  ngOnInit() {
    this.getJobList();
  }

  getJobList() {
    this.jobService.getJobs()
      .subscribe(jobs => this.jobs = jobs);
  }

}
