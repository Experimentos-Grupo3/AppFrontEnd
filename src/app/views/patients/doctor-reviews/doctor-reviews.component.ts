import {Component, OnInit} from '@angular/core';
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {ActivatedRoute, Router} from "@angular/router";
import {SourcesService} from "../../../services/sources.service";

@Component({
  selector: 'app-doctor-reviews',
  templateUrl: './doctor-reviews.component.html',
  styleUrls: ['./doctor-reviews.component.css']
})
export class DoctorReviewsComponent implements OnInit{
//CONNECTING TO FAKEAPI
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  doctors: Array<any> = [];
  allreviews: Array<any> = [];
  reviewsToDoctor: Array<any> = [];
  doctor: any;
  id="" ;

  constructor(private route: ActivatedRoute, private breakpointObserver: BreakpointObserver, private newsSource: SourcesService, private router: Router) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.newsSource.getSources('doctors').subscribe((data: any): void => {
      this.doctors = data;
      this.doctor = this.doctors.find(doctor => doctor.id == this.id);

      console.log("Sources: ", this.doctor);
      console.log("Sources: ", this.id);

    });
    this.newsSource.getSources('reviews').subscribe((data: any): void =>{
      this.allreviews = data
      this.reviewsToDoctor = this.allreviews.filter(review => review.idDoctor == this.id);
      console.log("Sources: ", this.reviewsToDoctor);
    })
  }
}
