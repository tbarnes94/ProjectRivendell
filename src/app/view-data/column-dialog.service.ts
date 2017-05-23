import { Observable } from 'rxjs/Rx';
import { ColumnDialog } from './column-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class ColumnDialogService {

    constructor(private dialog: MdDialog) { }

    public confirm(displayedFields: Object): Observable<boolean> {
        let dialogRef: MdDialogRef<ColumnDialog>;
        dialogRef = this.dialog.open(ColumnDialog);
        dialogRef.componentInstance.toggleFields = displayedFields;
        return dialogRef.afterClosed();
    }
}