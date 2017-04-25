import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { MdSnackBar, MdDialog } from '@angular/material';
import { IService } from 'app/iservice';
import { UpdateDataComponent } from 'app/update-data/update-data.component';

@Component({
  selector: 'view-data',
  templateUrl: './view-data.component.html'
})
export class ViewDataComponent implements OnInit {
  public pageTitle = 'Services';
  public services: Array<IService>;
  public infoMessage = '';

  constructor(private _dataService: DataService,
              private _dialog: MdDialog) { }

  ngOnInit() {
    this._dataService.getServices()
        .subscribe(
        services => this.services = services,
        error => this.infoMessage = <any>error);
  }

  openDialog(serviceId: number): void {
    let config = {width: '650px', height: '400x', position: {top: '50px'}};
    let dialogRef = this._dialog.open(UpdateDataComponent, config);
    dialogRef.componentInstance.serviceId = serviceId;
  }

  updateMessage(message: string) {
      this.infoMessage = message;
  }

}
