import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { Job } from '../job';
import { JobsService } from '../jobs.service';

declare var $: any;

@Component({
  selector: 'new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.scss']
})
export class NewJobComponent implements OnInit {

  newJobForm: FormGroup;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  
  @ViewChild("start_location")
  public startLocationElementRef: ElementRef;
  @ViewChild("end_location")
  public endLocationElementRef: ElementRef;
  @ViewChild("proposed_start_at")
  public startDateElementRef: ElementRef;
  @ViewChild("proposed_end_at")
  public endDateElementRef: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private location: Location,
              private jobService: JobsService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }
  
  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete1 = new google.maps.places.Autocomplete(this.startLocationElementRef.nativeElement, {
        types: ["address"]
      });

      let autocomplete2 = new google.maps.places.Autocomplete(this.endLocationElementRef.nativeElement, {
        types: ["address"]
      });

      autocomplete1.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete1.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });

      autocomplete2.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete2.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

    this.newJobForm = this.formBuilder.group({
      job_key: ['', Validators.required],
      proposed_start_at: ['', Validators.required],
      start_location: ['', Validators.required],
      end_location: ['', Validators.required],
      proposed_end_at: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    // set datetime picker
    //console.log(this.startDateElementRef.nativeElement.id);
    $(this.startDateElementRef.nativeElement).datetimepicker({format: 'YYYY-MM-DD LT'});
    $(this.endDateElementRef.nativeElement).datetimepicker({format: 'YYYY-MM-DD LT'});
  }


  saveJob() {
    this.newJobForm.get('proposed_start_at').setValue(this.startDateElementRef.nativeElement.value);
    this.newJobForm.get('proposed_end_at').setValue(this.endDateElementRef.nativeElement.value);
    this.newJobForm.get('start_location').setValue(this.startLocationElementRef.nativeElement.value);
    this.newJobForm.get('end_location').setValue(this.endLocationElementRef.nativeElement.value);
  
    if (this.newJobForm.valid) {
      var job = this.newJobForm.value as Job;
      this.jobService.addJob(job)
        .subscribe(res => this.router.navigate(['/jobs']));
    }
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
