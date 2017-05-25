import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Entity } from 'app/Entity';
import { Forecast } from "app/Forecast";
import { EditDataService } from "app/edit-data/edit-data.service"
import { ColumnDialogService } from "./column-dialog.service"

@Component({
  selector: 'view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css'],
  providers: [EditDataService, ColumnDialogService]
})

export class ViewDataComponent implements OnInit {
  public pageTitle = 'Services';
  public entities: Array<Entity>;
  public infoMessage = '';
  public today = new Date();

  entityFields=["ServiceOffice", "SE", "SPL", "DMM", "DeliveryManager", "TPID", "CP_Code", "Segment", "AccountName", "CRM_ID", "External", "Likelihood", "EngagementType", "FundingSource", "Description", "Comments", "ContractValue", "DecrementAmount", "DecrementMonth", "DecrementReason", "SalesManager", "ATU", "OpName", "SalesStage", "DueDate"]
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  hiddenFields= {};

  constructor(private _dataService: DataService,
              private _dialog: MdDialog,
              private editDataService: EditDataService,
              private columnDialogService: ColumnDialogService,
              ) {
                this.entityFields.forEach(element => {
                  this.hiddenFields[element] = false;
                });
  }

  ngOnInit() {
    this._dataService.getEntities()
        .subscribe(
        entities => this.entities = entities,
        error => this.infoMessage = <any>error);
  }

  /*
   * @number is the number of months to be added to the current month
   * @Entity is obviously the entity which forecasts we're dealing with here
   * @returns the value of the forecast for that given month.
   */
  findValueWithMonthOffset(entity: Entity, offset: number): number {    
    var forecast = entity.Forecasts.find(x => x.Month == this.today.getMonth()+offset+1 && x.Year == this.today.getFullYear());
    if (forecast == null){
      return 0;
    }
    return forecast.Value;
  }
  
  public openDialog(id: number) {
    this.editDataService
      .confirm(this.entities, id)
  }

  public openColumnDialog(){
    this.columnDialogService.confirm(this.hiddenFields).subscribe();
  }
}
