// Angular 4 Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms';

// My Component Imports
import { AppComponent } from './app.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { routing } from "app/app.routing";
import { NavButtonsComponent } from './nav-buttons/nav-buttons.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { MonthPipe } from './month.pipe';
import { DataService } from 'app/data.service';

// My Service Imports

@NgModule({
  declarations: [
    AppComponent,
    ViewDataComponent,
    UpdateDataComponent,
    NavButtonsComponent,
    AddEntryComponent,
    MonthPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    BrowserAnimationsModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [DataService],
  entryComponents: [UpdateDataComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
