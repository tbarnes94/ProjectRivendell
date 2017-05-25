import { MdDialogRef} from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Entity } from 'app/entity';
import { Forecast } from 'app/forecast';
import { ChangeEntity } from 'app/changeentity';
import { DataService } from 'app/data.service';

@Component({
    selector: 'confirm-dialog',
    templateUrl: '../add-entry/add-entry.component.html',
    providers: [DataService],
})
export class EditDataDialog implements OnInit{
    
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    likelihoods = ["Low", "Medium", "High"];

    changeReason: string;
    alias: string;
    editMode = true;

    // boolean used to determine which forecast divs to show
    forecastPrepared: boolean;

    // entity is OG, model is the copy
    entities: Entity[];
    id: number;
    model: Entity;

    ngOnInit(){
        // Create copy of the entity so that if you cancelled, 
        // there wouldn't be a mismatch between angular data and backend data
        this.model = JSON.parse(JSON.stringify(this.entities.find(x=>x.EntityId == this.id)));
        console.log(this.model.Forecasts);
        var startDate = new Date();
        var numOfMonths = 5;
        startDate.setDate(15); // 5/31/.... + 1 month is 7/01. Setting the date 15 prevents the jump and is valid because date doesn't matter.        
        // Prepare Forecasts
        for(var i = 0; i < numOfMonths; i++){
            if(this.model.Forecasts.find(x => x.Month == startDate.getMonth()+1 && x.Year == startDate.getFullYear()) == null){
                var cast = new Forecast();
                cast.Month = startDate.getMonth() + 1; // Because months are zero indexed in Javascript
                cast.Year = startDate.getFullYear();
                cast.Value = 0;
                this.model.Forecasts.push(cast);
            }
            startDate.setMonth(startDate.getMonth() + 1);
        }
        console.log(this.model.Forecasts)
    }

    onSubmit(){
        this.entities[this.entities.indexOf(this.entities.find(x=>x.EntityId == this.id))] = this.model;
        var change = new ChangeEntity();
        change.Alias = this.alias;
        change.ChangeReason = this.changeReason;
        change.Entity = this.model;
        this.dataService.putService(this.model.EntityId, change).subscribe(result=>{
            this.dialogRef.close();
        });
    }

    constructor( public dialogRef: MdDialogRef<EditDataDialog>, private dataService: DataService) {
    }
}