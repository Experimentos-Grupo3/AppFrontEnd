import { Component, OnInit } from '@angular/core';
import { SourcesService } from '../../../services/sources.service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../../interfaces/patient';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {
  idPatient =""
  medicalInformation: any;
  currentPatient: any;
  patient: any;

  constructor(
    private sourcesService: SourcesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idPatient = this.route.snapshot.params['id'];
    this.currentPatient = localStorage.getItem('currentPatient');
    if (this.currentPatient) {
      this.currentPatient = JSON.parse(this.currentPatient);
    }
    this.sourcesService
      .getSources('medicalInformation')
      .subscribe((data: any) => {
        this.medicalInformation = data.find((medical: any) => medical.idPatient == this.idPatient);
        console.log("Medical Information: ", this.medicalInformation);
      });

  }
/*
  getMedicalHistoryByPatientId(): any[] {
    return this.medicalInformation
      .filter(history => history.idPatient === this.patientId)
      .map(history => {
        const patient = this.patients.find(p => p.id === history.idPatient);
        return { ...history, patientName: patient ? patient.name : '' };
      });
  }
  getPatientPhotoById(id: number): string {
    const patient = this.patients.find(p => p.id === id);
    return patient ? patient.photo : '';
  }*/
}
