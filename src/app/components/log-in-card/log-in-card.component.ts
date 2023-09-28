import {Component, OnInit} from '@angular/core';
import {Patient} from "../../interfaces/patient";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LogInService} from "../../services/log-in.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {SourcesService} from "../../services/sources.service";
import { Router } from '@angular/router';



@Component({
  selector: 'app-log-in-card',
  templateUrl: './log-in-card.component.html',
  styleUrls: ['./log-in-card.component.css'],
  providers: [MatSnackBar]
})

export class LogInCardComponent implements OnInit{
  //CONNECTING TO FAKEAPI
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  rpassword: string='';
  patient: Patient ={ dni: '', name: '', gender:'', birthday: '', email:'', cellphone: '', password:'', photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Emblem-person-blue.svg/2048px-Emblem-person-blue.svg.png"};
  patients: Array<any> = [];
  signInForm: FormGroup;
  constructor(private breakpointObserver: BreakpointObserver, private newsSource: SourcesService, private snackBar:MatSnackBar, private loginService:LogInService, public builder:FormBuilder, private router: Router) {
    this.signInForm = this.builder.group({
      dni: ['',[Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['',[Validators.required]],
      gender: ['',[Validators.required]],
      birthday: ['',[Validators.required]],
      cellphone: ['',[Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      email: ['',[Validators.required, Validators.email]]
    })
  }

  get dni(){
    return this.signInForm.controls['dni'];
  }

  get password(){
    return this.signInForm.controls['password'];
  }

  get name(){
    return this.signInForm.controls['name'];
  }

  get email(){
    return this.signInForm.controls['email'];
  }

  get cellphone(){
    return this.signInForm.controls['cellphone'];
  }

  genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];
  register() {

    if ((this.patient.password == this.rpassword) && this.rpassword !='' && this.patient.email!=''
      && this.patient.gender !='' && this.patient.dni!='' && this.patient.cellphone!='' && this.patient.name!='' && this.patient.birthday!='') {
      this.loginService.registerPatient(this.patient).subscribe();
      this.snackBar.open('Register Succesfull', '', {duration: 1500})
    } else if (this.patient.password != this.rpassword) {
      this.snackBar.open('Password and Confirmation Password must be the same', '', {duration: 1500})
    } else {
      this.snackBar.open('Register Failed, Complete all the cells', '', {duration: 1500})
    }
    this.patient={dni: '', name: '', gender:'', birthday:'', email:'', cellphone: '', password:'', photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Emblem-person-blue.svg/2048px-Emblem-person-blue.svg.png"};
    this.rpassword='';
  }

  login(){
    //IF USER IS FOUND
    const patientFound = this.patients.find(patient => patient.dni== this.patient.dni && patient.password == this.patient.password)
    if(patientFound){
      this.snackBar.open('Login Succesfull','',{duration:1000})
      console.log(patientFound)
      localStorage.setItem('currentPatient', JSON.stringify(patientFound));
      this.router.navigate(['/dashboard'])
    }
    else{
      this.snackBar.open('Login Failed','',{duration:1000})
    }
  }

  ngOnInit() {
    this.newsSource.getSources('patients').subscribe((data: any): void => {
      this.patients = data;
      console.log("Sources: ", this.patients);
    });
  }
}
