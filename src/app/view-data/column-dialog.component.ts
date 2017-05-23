import { MdDialogRef} from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './column-dialog.component.html',
})
export class ColumnDialog implements OnInit{
    toggleFields: object;
    fields: Array<string>;
    ngOnInit(){
        this.fields = Object.keys(this.toggleFields);
    }
    constructor( public dialogRef: MdDialogRef<ColumnDialog>) {
    }
}