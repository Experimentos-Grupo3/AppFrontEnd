import {Component, Input, OnInit} from '@angular/core';
import {SourcesService} from "../../../services/sources.service";

@Component({
  selector: 'app-dashboard-doctor',
  templateUrl: './dashboard-doctor.component.html',
  styleUrls: ['./dashboard-doctor.component.css']
})
export class DashboardDoctorComponent implements OnInit{

  @Input() indicators = true;
  selectedIndex= 0;

  news: Array<any> = [];
  currentDoctor: any;

  selectImage(index: number):void{
    this.selectedIndex = index;
  }
  constructor(private newsSource: SourcesService) {
  }
  ngOnInit() {
    this.currentDoctor = localStorage.getItem('currentDoctor');
    if (this.currentDoctor) {
      this.currentDoctor = JSON.parse(this.currentDoctor);
    }

    console.log("User logged: ", this.currentDoctor)

    this.newsSource.getSources('news').subscribe((data:any):void=>{
      this.news = data;
      console.log("News: ", this.news)
    })
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }

}
