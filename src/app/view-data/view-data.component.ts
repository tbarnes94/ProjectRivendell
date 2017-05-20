import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Entity } from 'app/Entity';
import { UpdateDataComponent } from 'app/update-data/update-data.component';
import { Forecast } from "app/Forecast";

@Component({
  selector: 'view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit {
  public pageTitle = 'Services';
  public entities: Array<Entity>;
  public infoMessage = '';
  public buttonBool = false;
  private buttonIndex = 0;
  private forecastIndex = 0;
  public today = new Date();

  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor(private _dataService: DataService,
              private _dialog: MdDialog) {
  }

  ngOnInit() {
    this._dataService.getEntities()
        .subscribe(
        entities => this.entities = entities,
        error => this.infoMessage = <any>error);
  }

  openDialog(serviceId: number): void {
    let config = {width: '650px', height: '400x', position: {top: '50px'}};
    let dialogRef = this._dialog.open(UpdateDataComponent, config);
    dialogRef.componentInstance.serviceId = serviceId;
    dialogRef.componentInstance.buttonBools[this.buttonIndex] = this.buttonBool;
    console.log('Pressed Button: '+this.buttonIndex);
    try {
      console.log('Forecast Button: '+this.forecastIndex);
      dialogRef.componentInstance.forecastIndex = this.forecastIndex;
    }
    catch (errMsg){
      console.log('Not a Forecast Button. '+errMsg);
    }
    this.buttonBool = false;
    this.buttonIndex = 0;
    this.forecastIndex = 0;
  }

  findValueWithMonthOffset(entity: Entity, offset: number): number {    
    var forecast = entity.Forecasts.find(x => x.Month == this.today.getMonth()+offset+1 && x.Year == this.today.getFullYear());
    if (forecast == null){
      return 0;
    }
    return forecast.Value;
  }

  updateMessage(message: string): void {
      this.infoMessage = message;
  }

  forecastButtonWasPressed(forecastIndex: number): void {
    this.forecastIndex = forecastIndex;
  }

  buttonWasPressed(buttonName: string): void {
    console.log(buttonName == "OwnerId");
    switch(buttonName) {
      case 'ID':
        this.buttonIndex = 0;
        break;
      case 'OwnerId':
        this.buttonIndex = 1;
        break;
      case 'AccountId':
        this.buttonIndex = 2;
        break;
      case 'Likelihood':
        this.buttonIndex = 3;
        break;
      case 'Type':
        this.buttonIndex = 4;
        break;
      case 'FundingSource':
        this.buttonIndex = 5;
        break;
      case 'CP_Code':
        this.buttonIndex = 6;
        break;
      case 'Description':
        this.buttonIndex = 7;
        break;
      case 'Comments':
        this.buttonIndex = 8;
        break;
      case 'ContractValue':
        this.buttonIndex = 9;
        break;
      case 'DecrementAmount':
        this.buttonIndex = 10;
        break;
      case 'DecrementMonth':
        this.buttonIndex = 11;
        break;
      case 'DecrementReason':
        this.buttonIndex = 12;
        break;
      case 'AccountName':
        this.buttonIndex = 13;
        break;
      case 'TPID':
        this.buttonIndex = 14;
        break;
      case 'SE':
        this.buttonIndex = 15;
        break;
      case 'SalesManager':
        this.buttonIndex = 16;
        break;
      case 'ATU':
        this.buttonIndex = 17;
        break;
      case 'Segment':
        this.buttonIndex = 18;
        break;
      case 'DMMOwner':
        this.buttonIndex = 19;
        break;
      case 'OpName':
        this.buttonIndex = 20;
        break;
      case 'FR':
        this.buttonIndex = 21;
        break;
      case 'SalesStage':
        this.buttonIndex = 22;
        break;
      case 'DueDate':
        this.buttonIndex = 23;
        break;
      case 'OpValue':
        this.buttonIndex = 24;
        break;
      case 'ServiceOffice':
        this.buttonIndex = 25;
        break;
      case 'GM':
        this.buttonIndex = 26;
        break;
      case 'SPL':
        this.buttonIndex = 27;
        break;
      case 'DMM':
        this.buttonIndex = 28;
        break;
      case 'EM':
        this.buttonIndex = 29;
        break;
      case 'Forecasts':
        this.buttonIndex = 30;
        break;
      default:
        this.buttonIndex = 0; // Update Entry form should not be editable
    }
    console.log(buttonName+" "+this.buttonIndex+" was pressed.");
    this.buttonBool = !this.buttonBool;
  }
  put():void{
    this._dataService.putService(17, {
      "description":"lol",
      "entityId":17,
      "ChangeReason":".",
      "Alias":"Guo"
    }).subscribe(result => {
        console.log(JSON.stringify(result));
      });
  }
}
