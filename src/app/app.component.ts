import { Component } from '@angular/core';
import './rxjs-operators';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [DataService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'R I V E N D E L L';
  currentDate: number = Date.now();
}
