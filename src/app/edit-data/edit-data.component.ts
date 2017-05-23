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

    startDateString: string;
    endDateString: string;
    forecasts: Array<Forecast>;
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
        if(this.model.Forecasts.length == 0){
            this.forecastPrepared = false;
        } else {
            this.forecastPrepared = true;
        }
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