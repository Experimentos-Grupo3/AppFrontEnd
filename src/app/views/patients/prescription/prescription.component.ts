/*
import {Component, OnInit} from '@angular/core';
import {Prescriptions} from "../../../interfaces/prescriptions";
import {PrescriptionsService} from "../../../services/prescriptions.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit{

  prescription !: Prescriptions;
  medicine!: any;
  meals !: any;

  constructor(
    private prescriptionsService: PrescriptionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getByIdPrescriptions();
  }

  getByIdPrescriptions(){
    const id = parseInt(<string>this.route.snapshot.paramMap.get('id'),10);
    this.prescriptionsService.getById(id).subscribe((response:any)=>{
      console.log(response);
      console.log(id);
      this.prescription = response;
      this.medicine = response["medicines"];
      this.meals = response["meals"];
      console.log(this.medicine);
    })
  }

}
*/

import {Component, OnInit} from '@angular/core';
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {ActivatedRoute, Router} from "@angular/router";
import {SourcesService} from "../../../services/sources.service";

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  prescriptions: Array<any> = [];
  prescription: any;
  id = "";
  constructor(private route: ActivatedRoute, private breakpointObserver: BreakpointObserver, private prescriptionsSource: SourcesService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.prescriptionsSource.getSources('prescriptions').subscribe((data: any): void =>{
      this.prescriptions = data;
      this.prescription = this.prescriptions.find(prescription => prescription.id == this.id);

      console.log("Sources: ", this.prescription);
      console.log("Sources: ", this.id);
    });
  }



}
