import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Entity } from "app/Entity";
import { DataService } from "app/data.service";
import { MdSnackBar } from '@angular/material';

@Component({
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css'],
  providers: [DataService]
})
export class UpdateDataComponent implements OnInit, OnDestroy {
  // Keys
  public serviceId: number;
  public testBool: boolean;
  public forecastIndex: number;

  // Objects
  public entity: Entity;
  public sub: Subscription;
  public buttonBools: Array<boolean>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dataService: DataService,
    private _snackBar: MdSnackBar) {
    this.buttonBools = [false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false];
  }

  ngOnInit(): void {
    this.getService(this.serviceId);
    console.log(this.buttonBools);
    console.log(this.forecastIndex);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  getService(id: number): void {
    this._dataService.getEntity(id).subscribe(
      service => this.entity = service,
      error => this.updateMessage(<any>error, 'Error'));
  }

  updateMessage(message: string, type: string, actionText: string = 'DISMISS') {
    if (message) {
      this._snackBar.open(`${type}: ${message}`, actionText, {
        duration: 3000
      });
    }
  }

  indexOfField(fieldStr: string): number {
    switch (fieldStr) {
      case 'ID':
        return 0;
      case 'OwnerId':
        return 1;
      case 'AccountId':
        return 2;
      case 'Likelihood':
        return 3;
      case 'Type':
        return 4;
      case 'FundingSource':
        return 5;
      case 'CP_Code':
        return 6;
      case 'Description':
        return 7;
      case 'Comments':
        return 8;
      case 'ContractValue':
        return 9;
      case 'DecrementAmount':
        return 10;
      case 'DecrementMonth':
        return 11;
      case 'DecrementReason':
        return 12;
      case 'AccountName':
        return 13;
      case 'TPID':
        return 14;
      case 'SE':
        return 15;
      case 'SalesManager':
        return 16;
      case 'ATU':
        return 17;
      case 'Segment':
        return 18;
      case 'DMMOwner':
        return 19;
      case 'OpName':
        return 20;
      case 'FR':
        return 21;
      case 'SalesStage':
        return 22;
      case 'DueDate':
        return 23;
      case 'OpValue':
        return 24;
      case 'ServiceOffice':
        return 25;
      case 'GM':
        return 26;
      case 'SPL':
        return 27;
      case 'DMM':
        return 28;
      case 'EM':
        return 29;
      case 'Forecasts':
        return 30;
      default:
        return 0; // Update Entry form should not be editable
    }
  }

  // UNSURE IF NECESSARY
  // return(): void {
  //   this._router.navigate(['']);
  // }

}
