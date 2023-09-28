import {Component, OnInit} from '@angular/core';
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {ActivatedRoute, Router} from "@angular/router";
import {SourcesService} from "../../../services/sources.service";
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';

defineComponents(IgcRatingComponent);
export class RatingBasic {
  constructor() {
  }
}

new RatingBasic();
@Component({
  selector: 'app-new-review-to-doctor',
  templateUrl: './new-review-to-doctor.component.html',
  styleUrls: ['./new-review-to-doctor.component.css'],
})
export class NewReviewToDoctorComponent implements OnInit{
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  doctors: Array<any> = [];
  doctor: any;
  id="" ;
  reviews: any;
  review: any;
  selectedValue= 5;
  currentPatient: any;

  constructor(private route: ActivatedRoute, private breakpointObserver: BreakpointObserver, private newsSource: SourcesService, private router: Router) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.newsSource.getSources('doctors').subscribe((data: any): void => {
      this.doctors = data;
      this.doctor = this.doctors.find(doctor => doctor.id == this.id);

      console.log("Sources: ", this.doctor);
      console.log("Sources: ", this.id);

    });
    this.newsSource.getSources('reviews').subscribe((data: any): void => {
      this.reviews = data;
      console.log("lenght: ", this.reviews.length);
    });

    this.currentPatient = localStorage.getItem('currentPatient');
    if (this.currentPatient) {
      this.currentPatient = JSON.parse(this.currentPatient);
    }
  }
  publishReview(){
    let review = {
      "id": this.reviews.length,
      "profilePhotoUrl": "../../src/assets/images/Camila Hernández image.jpg",
      "customerName": this.currentPatient.name,
      "customerReview": this.review,
      "customerScore": this.selectedValue,
      "idPatient": this.id,
      "idDoctor": this.currentPatient.id
    }
    this.newsSource.postSources('reviews', review).subscribe((data: any): void => {
      console.log("REVIEW POST new", data)
    })
  }

  onRatingChange(event: number): void {
    this.selectedValue = event;
    console.log('Valor seleccionado:', this.selectedValue);
  }
}
