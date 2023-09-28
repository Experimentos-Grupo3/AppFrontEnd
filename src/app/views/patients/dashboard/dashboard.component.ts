import {Component, Input, OnInit} from '@angular/core';
import {SourcesService} from "../../../services/sources.service";

@Component({
  selector: 'app-dashboardDoctor',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  @Input() indicators = true;
  selectedIndex= 0;

  news: Array<any> = [];
  currentPatient: any;

  selectImage(index: number):void{
    this.selectedIndex = index;
  }
  constructor(private newsSource: SourcesService) {
  }
  ngOnInit() {
    this.currentPatient = localStorage.getItem('currentPatient');
    if (this.currentPatient) {
      this.currentPatient = JSON.parse(this.currentPatient);
    }
    console.log("User logged: ", this.currentPatient)

    this.newsSource.getSources('news').subscribe((data:any):void=>{
      this.news = data;
      console.log("News: ", this.news)
    })
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }

}
