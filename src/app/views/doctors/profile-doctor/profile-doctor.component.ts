import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SourcesService} from "../../../services/sources.service";

@Component({
  selector: 'app-profile-doctor',
  templateUrl: './profile-doctor.component.html',
  styleUrls: ['./profile-doctor.component.css']
})
export class ProfileDoctorComponent {
  allreviews: Array<any> = [];
  reviewsToDoctor: Array<any> = [];
  doctor: any;
  id="" ;
  currentDoctor: any;
  promedioCustomerScore: number = 0;
  constructor(private route: ActivatedRoute, private newsSource: SourcesService) {
  }
  calcularPromedioCustomerScore(reviews: any[]): number {
    if (reviews.length === 0) {
      return 0; // No hay revisiones para ese doctor, retorna 0 como promedio.
    }

    const totalCustomerScore = reviews.reduce((sum, review) => sum + review.customerScore, 0);
    const promedio = totalCustomerScore / reviews.length;

    return promedio;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.currentDoctor = localStorage.getItem('currentDoctor');
    if (this.currentDoctor){
      this.currentDoctor = JSON.parse(this.currentDoctor);
    }

    this.newsSource.getSources('reviews').subscribe((data: any): void =>{
      this.allreviews = data
      this.reviewsToDoctor = this.allreviews.filter(review => review.idDoctor == this.currentDoctor.id);
      this.promedioCustomerScore = this.calcularPromedioCustomerScore(this.reviewsToDoctor);
      console.log("Sources: ", this.reviewsToDoctor);

    console.log("User logged: ", this.currentDoctor);
    })
  }

}
