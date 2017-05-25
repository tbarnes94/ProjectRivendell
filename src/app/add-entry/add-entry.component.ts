/* 
 * Add extra form verification.
 * Figure out how to distinguish between required and optional fields
 * Add confirmation when form is submitted
 * Route to view-data page.
 */

import { Component, OnInit } from '@angular/core';
import { Entity } from 'app/Entity';
import { Forecast } from 'app/Forecast';
import { DataService } from 'app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit{
  likelihoods = ["Low", "Medium", "High"];
  model = new Entity();

  constructor(private _dataService: DataService, public router: Router) {
  }

  ngOnInit(){
    var startDate = new Date();
    var numOfMonths = 5;    
    startDate.setDate(15); // 5/31/.... + 1 month is 7/01. Setting the date 15 prevents the jump and is valid because date doesn't matter.
    this.model.Forecasts = [];
    // Prepare Forecasts for next 5 months
    for(var i = 0; i < numOfMonths; i++){
      var cast = new Forecast();
      cast.Month = startDate.getMonth() + 1; // Because months are zero indexed in Javascript
      cast.Year = startDate.getFullYear();
      cast.Value = 0;
      this.model.Forecasts.push(cast);
      startDate.setMonth(startDate.getMonth() + 1);
    }
  }

  onSubmit(){
    this._dataService.postService(this.model)
    .subscribe(result => {
      this.router.navigate(['view-data']);
    });
  }
}
