import {Component, OnInit} from '@angular/core';
import { SourcesService } from '../../../services/sources.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-appointments-patients',
  templateUrl: './appointments-patients.component.html',
  styleUrls: ['./appointments-patients.component.css']
})
export class AppointmentsPatientsComponent  implements OnInit {
  idPatient =""
  medicalInformation: any;
  patient: any = {};

  constructor(
    private sourcesService: SourcesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idPatient = this.route.snapshot.params['id'];
    this.sourcesService
      .getSources('patients')
      .subscribe((data: any) => {
        this.patient = data.find((patient: any) => patient.id == this.idPatient);
        console.log("Patient: ", this.patient);
      });


    this.sourcesService
      .getSources('medicalInformation')
      .subscribe((data: any) => {
        this.medicalInformation = data.find((patient: any) => patient.idPatient == this.idPatient);
        console.log("Patient: ", this.patient);
      });
  }
}
