import {Component, OnInit} from '@angular/core';
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {SourcesService} from "../../../services/sources.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LogInService} from "../../../services/log-in.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.css']
})
export class ListDoctorsComponent implements OnInit{
  //CONNECTING TO FAKEAPI
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  doctors: Array<any> = [];

  constructor(private breakpointObserver: BreakpointObserver, private newsSource: SourcesService, private router: Router) {

  }
  ngOnInit() {
    this.newsSource.getSources('doctors').subscribe((data: any): void => {
      this.doctors = data;
      console.log("Sources: ", this.doctors);
    });

  }
}
