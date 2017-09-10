import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Job } from '../job';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'job-detail',
  templateUrl: './job-detail.component.html'
})
export class JobDetailComponent implements OnInit {
  @Input() job: Job;

  constructor(
    private jobService: JobsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getJob();    
  }

  getJob() {
    this.route.params.subscribe((params: any) => {
      let jobId:any = params.id;
      this.jobService.getJob(jobId)
        .subscribe(job => this.job = job); 
    });
  }

  updateJob() {
    this.jobService.updateJob(this.job)
      .subscribe(res => this.router.navigate(['/jobs']));  
  }

  goBack(): void {
    this.location.back();
  }

}
