import { Component, OnInit } from '@angular/core';
import { Entity } from 'app/Entity';
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

  likelihoods = ["Low", "Medium", "High"];
  intext = ["Internal", "External"];
  model = new Entity();

  constructor(private _dataService: DataService) {
  }

  onSubmit(){
    this._dataService.postService(this.model)
    .subscribe(result => {
      console.log(JSON.stringify(result));
    });
  }

  get diagnostic() { return JSON.stringify(this.model); }

}
