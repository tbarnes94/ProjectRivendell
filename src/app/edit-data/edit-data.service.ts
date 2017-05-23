import { Observable } from 'rxjs/Rx';
import { EditDataDialog } from './edit-data.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

import { Entity } from 'app/entity';
import { Forecast } from 'app/forecast';

@Injectable()
export class EditDataService {

    constructor(private dialog: MdDialog) { }

    public confirm(entities: Entity[], id: number): Observable<boolean> {

        let dialogRef: MdDialogRef<EditDataDialog>;

        dialogRef = this.dialog.open(EditDataDialog);
        dialogRef.componentInstance.entities = entities;
        dialogRef.componentInstance.id = id;

        return dialogRef.afterClosed();
    }
}