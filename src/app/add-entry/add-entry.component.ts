import { Component, OnInit } from '@angular/core';
import { Entity } from 'app/Entity';
import { Forecast } from 'app/Forecast';
import { DataService } from 'app/data.service'

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.componenttwo.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent{
  tiles = [
    {text: 'One', cols: 2, rows: 2, color: 'lightblue'},
    {text: 'Two', cols: 2, rows: 2, color: 'lightgreen'}
  ];

  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  likelihoods = ["Low", "Medium", "High"];
  startDateString: string;
  endDateString: string;
  forecasts = [];

  // boolean used to determine which forecast divs to show
  forecastPrepared = false;

  model = new Entity();

  constructor(private _dataService: DataService) {
  }

  onSubmit(){
    if (this.forecasts.length > 0){
      this.model.Forecasts = this.forecasts;
    }
    this.resetForecast();
    this._dataService.postService(this.model)
    .subscribe(result => {
      console.log(JSON.stringify(result));
    });
  }

  createForecastTable(){
    var startDate = new Date(this.startDateString);
    startDate.setDate(startDate.getDate() + 1); // Offset new Date("") bug where may 1st turns into apr 30th
    var endDate = new Date(this.endDateString);
    endDate.setDate(endDate.getDate() + 1); // See above
    var numOfMonths = this.calculateMonths(startDate, endDate);    
    startDate.setDate(15); // 5/31/.... + 1 month is 7/01. Setting the date 15 prevents the jump and is valid because date doesn't matter.
    // Prepare Forecasts
    for(var i = 0; i < numOfMonths; i++){
      var cast = new Forecast();
      cast.Month = startDate.getMonth() + 1;
      cast.Year = startDate.getFullYear();
      cast.Value = 0;
      this.forecasts.push(cast);
      startDate.setMonth(startDate.getMonth() + 1);
    }

    this.forecastPrepared = true;
  }

  resetForecast(){
    this.forecasts = [];
    this.startDateString = null;
    this.endDateString = null;
    this.forecastPrepared = false;
  }

  calculateMonths(start: Date, end: Date){
    if(start > end){
      throw("a fit");
    } else {
      return (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth() + 1;
    }
  }

  get diagnostic() { return this.startDateString + this.endDateString; }

}
