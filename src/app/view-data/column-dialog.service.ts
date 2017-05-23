import { Observable } from 'rxjs/Rx';
import { ColumnDialog } from './column-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class ColumnDialogService {

    constructor(private dialog: MdDialog) { }

    public confirm(): Observable<boolean> {

        let dialogRef: MdDialogRef<ColumnDialog>;
        dialogRef.componentInstance.toggleFields = {"test" : true};
        dialogRef = this.dialog.open(ColumnDialog);

        return dialogRef.afterClosed();
    }
}