import { Component } from '@angular/core';
import {Doctor} from "../../../interfaces/doctor";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LogInService} from "../../../services/log-in.service";
import {SourcesService} from "../../../services/sources.service";

@Component({
  selector: 'app-edit-profile-doctor',
  templateUrl: './edit-profile-doctor.component.html',
  styleUrls: ['./edit-profile-doctor.component.css']
})
export class EditProfileDoctorComponent {
  doctor: Doctor={dni:'', password:'', name:'', area:'', description:'', patients:0, years:0, age:0, email:'', cost:0,
    photo: "https://www.browardhealth.org/-/media/broward-health/placeholder/doctor-placeholder-male.jpg", education: [ {name: ''}],
    hoursAvailable:[{id:0, hours: "9:00 AM - 10:00 AM"}, {id:1, hours:"10:30 AM - 12:00 PM"}, {id:2, hours:"15:30 PM - 17:00 PM"}]};
  doctors: Array<any> = [];
  signInForm: FormGroup;
  currentDoctor: any;
  ngOnInit(){
    this.newsSource.getSources('doctors').subscribe((data: any): void => {
      this.doctors = data;
      console.log("Sources: ", this.doctors);
    });
    this.currentDoctor = localStorage.getItem('currentDoctor');
    if (this.currentDoctor) {
      this.currentDoctor = JSON.parse(this.currentDoctor);
    }
    console.log("User logged: ", this.currentDoctor);
  }
  constructor(private loginService: LogInService, public builder: FormBuilder, public newsSource: SourcesService) {
    this.signInForm = this.builder.group({
      dni: ['',[Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['',[Validators.required]],
      area: ['',[Validators.required]],
      age: ['',[Validators.required, Validators.min(24), Validators.max(80)]],
      email: ['',[Validators.required, Validators.email]],
      cost: ['', [Validators.required]],
      years: ['', [Validators.required]],
      description: ['', [Validators.required]],
      education:['', Validators.required]
    })
  }

  get cost(){
    return this.signInForm.controls['cost']
  }

  get years(){
    return this.signInForm.controls['years']
  }

  get education(){
    return this.signInForm.controls['education']
  }

  get description(){
    return this.signInForm.controls['description']
  }

  get name(){
    return this.signInForm.controls['name'];
  }

  get email(){
    return this.signInForm.controls['email'];
  }
  get area(){
    return this.signInForm.controls['area'];
  }

  update() {

    if (this.currentDoctor.email != '' && this.currentDoctor.area != '' && this.currentDoctor.name != '' && this.currentDoctor.years != ''
      && this.currentDoctor.cost != '' && this.currentDoctor.education != '' && this.currentDoctor.description != '') {
      this.loginService.updateDoctor(this.currentDoctor, this.currentDoctor.id).subscribe();
    }
    const doctorFound = this.doctors.find(doctor => doctor.id == this.currentDoctor.id);
    if (doctorFound) {
      console.log(111)
      console.log('Doctor found:', doctorFound);
      localStorage.setItem('currentDoctor', JSON.stringify(doctorFound));
    }

    this.currentDoctor = {
      id: this.currentDoctor.id,
      dni: this.currentDoctor.dni,
      password: this.currentDoctor.password,
      name: this.currentDoctor.name,
      area: this.currentDoctor.area,
      description: this.currentDoctor.description,
      patients: this.currentDoctor.patients,
      years: this.currentDoctor.years,
      age: this.currentDoctor.age,
      email: this.currentDoctor.email,
      cost: this.currentDoctor.cost,
      photo: "https://www.browardhealth.org/-/media/broward-health/placeholder/doctor-placeholder-male.jpg",
      education: [{name:'UPC'}] ,
      hoursAvailable:[{id:0, hours: "9:00 AM - 10:00 AM"}, {id:1, hours:"10:30 AM - 12:00 PM"}, {id:2, hours:"15:30 PM - 17:00 PM"}]
    };

  }

}
