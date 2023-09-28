import {Component, OnInit} from '@angular/core';
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {SourcesService} from "../../../services/sources.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LogInService} from "../../../services/log-in.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-medical-history-list',
  templateUrl: './medical-history-list.component.html',
  styleUrls: ['./medical-history-list.component.css']
})
export class MedicalHistoryListComponent {
  //CONNECTING TO FAKEAPI
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  currentDoctor: any;
  dates: Array<any> = [];
  patientsAll: Array<any> = [];
  patients: Array<any> = [];


  constructor(private breakpointObserver: BreakpointObserver, private newsSource: SourcesService, private router: Router) {

  }
  ngOnInit() {
    this.currentDoctor = localStorage.getItem('currentDoctor');
    if (this.currentDoctor) {
      this.currentDoctor = JSON.parse(this.currentDoctor);
    }
    this.newsSource.getSources('dates').subscribe((data: any): void => {
      this.dates = data.filter((date: any) => date.doctorId == this.currentDoctor.id);
      console.log("Sources dates: ", this.dates);
      this.newsSource.getSources('patients').subscribe((data: any): void => {
        this.patientsAll = data;
        console.log("Sources all patient: ", this.patientsAll);
        // Obtener los idPatient de los objetos filtrados en dates
        const filteredPatientIds = Array.from(new Set(this.dates.map(date => date.idPatient)));

        // Filtrar los pacientes que tengan idPatient en filteredPatientIds
        this.patients = this.patientsAll.filter(patient => filteredPatientIds.includes(patient.id));
        console.log("PACIENTEEEE: ", this.patients);
      });
    });

  }
}
