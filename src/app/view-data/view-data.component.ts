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

  // not used... lol
  public infoMessage = '';
  public today = new Date();

  // Fields to display in table
  entityFields=["ServiceOffice", "SE", "SPL", "DMM", "DeliveryManager", "TPID", "CP_Code", "Segment", "AccountName", "CRM_ID", "External", "Likelihood", "EngagementType", "FundingSource", "Description", "Comments", "ContractValue", "DecrementAmount", "DecrementMonth", "DecrementReason", "SalesManager", "ATU", "OpName", "SalesStage", "DueDate"];
  
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
   * @Entity is obviously the entity whose forecasts we're dealing with here
   * @returns the value of the forecast for that given month.
   */
  findValueWithMonthOffset(entity: Entity, offset: number): number {    
    var forecast = entity.Forecasts.find(x => x.Month == this.today.getMonth()+offset+1 && x.Year == this.today.getFullYear());
    if (forecast == null){
      return 0;
    }
    return forecast.Value;
  }
  
  /**
   * Opens the edit modal up
   * @param id is the entityId.
   */
  openDialog(id: number) {
    this.editDataService
      .confirm(this.entities, id)
  }
  /**
   * Opens the dialog that allows you to pick which columns to hide
   */
  openColumnDialog(){
    this.columnDialogService.confirm(this.hiddenFields).subscribe();
  }

    /**
     * Simple function to find the month that is x months ahead of current month.
     * @param x the integer to add to the current month.
     */
    getMonthWithOffset(x: number): number {
        if((this.today.getMonth() + x) % 12 == 0){
            return 12;
        }
        return (this.today.getMonth() + x) % 12;
    }
    
    /**
     * Simple function to find year that is x months ahead of current month/year
     * @param x interger to add to current month.
     */
    getYearWithMonthOffset(x: number): number {
        return this.today.getFullYear() + Math.floor((this.today.getMonth() + x - 1)/ 12);
    }
}
