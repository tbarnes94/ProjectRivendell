import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { IService } from "app/iservice";
import { DataService } from "app/data.service";
import { MdSnackBar} from '@angular/material';

@Component({
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css'],
  providers: [DataService]
})
export class UpdateDataComponent implements OnInit, OnDestroy {
  // Keys
  public serviceId: number;

  // Objects
  public service: IService;
  public serv: IService;
  public services: Array<IService>;
  public sub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _dataService: DataService,
    private _snackBar: MdSnackBar) { }

  ngOnInit(): void {
    this.getServices();
    this.getService(this.serviceId);
    }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  getService(id: number): void {
    this._dataService.getService(id).subscribe(
      service => this.service = service,
      error => this.updateMessage(<any>error, 'Error'));
  }

  getServices(): void {
    this._dataService.getServices().subscribe(
      services => this.services = services,
      error => this.updateMessage (<any>error, 'Error'));
  }

  updateMessage(message:string, type:string, actionText:string = 'DISMISS') {
    if (message) {
      this._snackBar.open(`${type}: ${message}`, actionText, {
        duration: 3000
      });
    }
  }

  return(): void {
    this._router.navigate(['']);
  }

}
